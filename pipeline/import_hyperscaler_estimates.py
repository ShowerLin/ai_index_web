"""Archive a daily vintage of saved Bloomberg hyperscaler estimates."""

import argparse
from datetime import date
from pathlib import Path

from audit_hyperscalers import METRICS, audit
from builders.cloud_estimates import read_cloud_estimates
from import_sources import ROOT, connect_database, make_record, read_excel, write_imports

# The workbook does not export metric-level actual/estimate flags. Restrict
# the history to quarters that were still open on the observation date.
ESTIMATE_METRICS = tuple(metric for metric in METRICS if metric != "headline_fcf")
CLOUD_ENTITIES = {
    "MSFT Intelligent Cloud": "MSFT", "MSFT Commerical RPO": "MSFT",
    "Google Cloud": "GOOGL", "Google Cloud RPO": "GOOGL",
    "AWS": "AMZN", "AMZN RPO": "AMZN",
    "ORCL Cloud&Software": "ORCL", "Oracle RPO": "ORCL",
}

CREATE_HISTORY = """
CREATE TABLE IF NOT EXISTS ai_index_hyperscaler_estimates (
    observed_on DATE NOT NULL,
    import_id CHAR(64) CHARACTER SET ascii NOT NULL,
    ticker VARCHAR(16) NOT NULL,
    fiscal_period CHAR(7) NOT NULL,
    period_end DATE NOT NULL,
    metric_key VARCHAR(48) NOT NULL,
    value DOUBLE NULL,
    capex_revision_date DATE NULL,
    source_sheet VARCHAR(128) NOT NULL,
    source_cell VARCHAR(16) NOT NULL,
    captured_at_utc DATETIME(6) NOT NULL,
    PRIMARY KEY (observed_on, captured_at_utc, ticker, fiscal_period, metric_key),
    KEY estimate_history (ticker, metric_key, period_end, observed_on),
    FOREIGN KEY (import_id) REFERENCES source_imports (import_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
"""

INSERT_HISTORY = """
INSERT INTO ai_index_hyperscaler_estimates
    (observed_on, import_id, ticker, fiscal_period, period_end, metric_key,
     value, capex_revision_date, source_sheet, source_cell, captured_at_utc)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, UTC_TIMESTAMP(6))
"""


def changed_rows(cursor, rows, observed_on):
    cursor.execute(
        """SELECT observed_on, ticker, period_end, metric_key, value
           FROM ai_index_hyperscaler_estimates
           WHERE value IS NOT NULL
           ORDER BY observed_on, captured_at_utc"""
    )
    previous = {}
    for day, ticker, period_end, metric, value in cursor:
        if day.isoformat() > observed_on:
            raise ValueError("Capture dates must be recorded in chronological order.")
        previous[ticker, period_end.isoformat(), metric] = value
    return [
        row for row in rows
        if row[6] is not None and previous.get((row[2], row[4], row[5])) != row[6]
    ]


def cloud_rows(cloud, audited, import_id, observed_on):
    period_ends = {(item["ticker"], item["fiscalPeriod"]): item["periodEnd"] for item in audited["records"]}
    rows = []
    for item in cloud["observations"]:
        ticker = CLOUD_ENTITIES.get(item["entity"])
        if ticker is None or item["metric"] not in {"Revenue", "RPO"} or item["basis"] != "Bloomberg estimate":
            continue
        quarter = item["fiscalPeriod"]
        fiscal_period = f"20{quarter[2:]} Q{quarter[0]}"
        period_end = item.get("periodEnd") or period_ends.get((ticker, fiscal_period))
        if not period_end or period_end <= observed_on:
            continue
        rows.append((
            observed_on, import_id, ticker, fiscal_period, period_end,
            "cloud_revenue" if item["metric"] == "Revenue" else "cloud_rpo",
            item["value"] * 1e9, None, cloud["metadata"]["sheet"], item["sourceCell"],
        ))
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workbook", type=Path, default=ROOT / "AI_Hyperscalers.xlsx")
    parser.add_argument("--env-file", type=Path, default=ROOT / ".env")
    parser.add_argument("--observed-on", type=date.fromisoformat, default=date.today(),
                        help="Date this workbook vintage was captured in Excel (default: today)")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--existing-tables", action="store_true")
    args = parser.parse_args()
    if args.observed_on > date.today():
        parser.error("--observed-on cannot be in the future")

    archive = make_record(*read_excel(args.workbook))
    import_id, _, _, checksum, _, _ = archive
    audited = audit(args.workbook, args.observed_on)
    cloud = read_cloud_estimates(args.workbook)
    if checksum != audited["sourceSha256"] or checksum != cloud["metadata"]["workbookSha256"]:
        parser.error("Workbook changed during extraction. Retry after Excel finishes saving.")

    observed_on = args.observed_on.isoformat()
    rows = []
    for item in audited["records"]:
        if item["periodEnd"] <= observed_on:
            continue
        for metric in ESTIMATE_METRICS:
            rows.append((
                observed_on, import_id, item["ticker"], item["fiscalPeriod"],
                item["periodEnd"], metric, item["values"][metric],
                item["sourceRevisionDate"] if metric == "capex_raw" else None,
                audited["sourceSheet"], item["sourceCells"][metric],
            ))
    rows.extend(cloud_rows(cloud, audited, import_id, observed_on))
    populated = sum(row[6] is not None for row in rows)
    if not populated:
        parser.error("No numeric future-quarter estimates found in the saved workbook.")

    changes = []
    if not args.dry_run:
        env_file = args.env_file.expanduser()
        write_imports(env_file, [archive], create_table=not args.existing_tables)
        with connect_database(env_file) as connection:
            with connection.cursor() as cursor:
                if not args.existing_tables:
                    cursor.execute(CREATE_HISTORY)
                cursor.execute("SELECT GET_LOCK('ai_index_hyperscaler_estimate_capture', 15)")
                if cursor.fetchone()[0] != 1:
                    raise RuntimeError("Another estimate capture is running. Retry shortly.")
                changes = changed_rows(cursor, rows, observed_on)
                if changes:
                    cursor.executemany(INSERT_HISTORY, changes)
            connection.commit()

    if args.dry_run:
        print(f"Validated {populated} numeric estimates across {len(rows)} cells on {observed_on}.")
    else:
        print(f"Recorded {len(changes)} new or revised estimates out of {populated} numeric values on {observed_on}.")
    print(f"Workbook import ID: {import_id}")


if __name__ == "__main__":
    main()
