"""Extract saved hyperscaler quarterly CapEx into MySQL source observations."""

import argparse
from datetime import date
from pathlib import Path

from audit_hyperscalers import audit
from import_sources import ROOT, connect_database, make_record, read_excel

CREATE_OBSERVATIONS = """
CREATE TABLE IF NOT EXISTS ai_index_source_observations (
    import_id CHAR(64) CHARACTER SET ascii NOT NULL,
    series_key VARCHAR(64) NOT NULL,
    ticker VARCHAR(32) NOT NULL,
    fiscal_period VARCHAR(32) NOT NULL,
    period_end DATE NOT NULL,
    value DOUBLE NULL,
    unit VARCHAR(16) NOT NULL,
    source_revision_date DATE NULL,
    source_sheet VARCHAR(128) NOT NULL,
    source_cell VARCHAR(32) NOT NULL,
    PRIMARY KEY (import_id, series_key, ticker, fiscal_period),
    FOREIGN KEY (import_id) REFERENCES source_imports (import_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
"""

INSERT_OBSERVATIONS = """
INSERT INTO ai_index_source_observations
    (import_id, series_key, ticker, fiscal_period, period_end, value,
     unit, source_revision_date, source_sheet, source_cell)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
ON DUPLICATE KEY UPDATE import_id = ai_index_source_observations.import_id
"""


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workbook", type=Path, default=ROOT / "AI_Hyperscalers.xlsx")
    parser.add_argument("--env-file", type=Path, default=ROOT / ".env")
    parser.add_argument("--as-of", type=date.fromisoformat, default=date.today())
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--existing-table", action="store_true")
    args = parser.parse_args()

    workbook = args.workbook.expanduser().resolve()
    import_id, _, _, checksum, _, _ = make_record(*read_excel(workbook))
    audited = audit(workbook, args.as_of)
    if audited["sourceSha256"] != checksum:
        parser.error("Workbook changed during extraction. Retry after Excel finishes saving.")
    rows = [
        (import_id, "hyperscaler.capex_raw", row["ticker"], row["fiscalPeriod"],
         row["periodEnd"], row["values"]["capex_raw"], row["currency"],
         row["sourceRevisionDate"], audited["sourceSheet"], row["sourceCells"]["capex_raw"])
        for row in audited["records"]
    ]
    if not rows or len({row[:4] for row in rows}) != len(rows):
        parser.error("Expected nonempty, unique ticker and fiscal-period rows.")
    if any(row[5] is not None and row[5] > 0 for row in rows):
        parser.error("Expected source CapEx to use a negative outflow sign.")

    if not args.dry_run:
        with connect_database(args.env_file.expanduser()) as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1 FROM source_imports WHERE import_id = %s", (import_id,))
                if cursor.fetchone() is None:
                    parser.error("Archive this workbook with import_excel.py before extracting observations.")
                if not args.existing_table:
                    cursor.execute(CREATE_OBSERVATIONS)
                cursor.executemany(INSERT_OBSERVATIONS, rows)
            connection.commit()
    populated = sum(row[5] is not None for row in rows)
    print(f"{'Validated' if args.dry_run else 'Imported'} {len(rows)} CapEx rows ({populated} populated).")
    print(f"Workbook import ID: {import_id}")


if __name__ == "__main__":
    main()
