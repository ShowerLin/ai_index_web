"""Load a validated dashboard build and its input files into MySQL."""

import argparse
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

from import_sources import ROOT, connect_database

SECTIONS = {
    "pulse": "core-contribution core-projection monthly-heatmap weekly-pulse",
    "adoption": "adoption-price openrouter-company openrouter-model ramp token-activity useful-task core-contribution monthly-heatmap",
    "monetization": "monetization frontier-labs",
    "hyperscalers": "hyperscaler-financial cloud-reference core-projection sustainability roic",
    "infrastructure": "infrastructure capacity-yields electricity-capacity projected-buildout index-price supply",
    "funding-recovery": "task-economics chain-economics value-chain-financials.ts core-contribution monthly-heatmap",
    "market": "semiconductor-market supply-chain-stock credit-financial-history.ts workbook-amendments core-contribution monthly-heatmap",
    "industry-chain": "industry-chain chain-economics value-chain-financials.ts",
}
EXTRA = {
    "funding-recovery": ["data/research/financing/circular-financing.json"],
}
SITE_REFERENCE = {
    "pulse": ["app/pulse-reference-data.ts", "app/market-reference-data.ts"],
    "hyperscalers": ["app/hyperscaler-reference-data.ts"],
    "funding-recovery": ["app/circular-financing-data.ts", "app/value-distribution-data.ts",
                         "data/circular-financing.json"],
    "market": ["app/market-reference-data.ts", "app/equity-basket.ts", "app/industry-chain-data.ts"],
    "industry-chain": ["app/industry-chain-data.ts", "app/chain-economics.ts"],
}
DDL = (
    """CREATE TABLE IF NOT EXISTS ai_index_dashboard_runs (
        run_id CHAR(64) CHARACTER SET ascii PRIMARY KEY,
        manifest LONGTEXT NOT NULL,
        imported_at_utc DATETIME(6) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4""",
    """CREATE TABLE IF NOT EXISTS ai_index_dashboard_datasets (
        run_id CHAR(64) CHARACTER SET ascii NOT NULL,
        section_key VARCHAR(64) NOT NULL,
        dataset_key VARCHAR(191) NOT NULL,
        content_sha256 CHAR(64) CHARACTER SET ascii NOT NULL,
        artifact LONGBLOB NOT NULL,
        payload_json LONGTEXT NULL,
        PRIMARY KEY (run_id, section_key, dataset_key),
        FOREIGN KEY (run_id) REFERENCES ai_index_dashboard_runs (run_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4""",
    """CREATE TABLE IF NOT EXISTS ai_index_dashboard_input_chunks (
        content_sha256 CHAR(64) CHARACTER SET ascii NOT NULL,
        chunk_number INT UNSIGNED NOT NULL,
        payload MEDIUMBLOB NOT NULL,
        PRIMARY KEY (content_sha256, chunk_number)
    ) ENGINE=InnoDB""",
)
CHUNK_BYTES = 512 * 1024


def digest(data):
    return hashlib.sha256(data).hexdigest()


def json_payload(path, data):
    text = data.decode("utf-8-sig")
    if path.endswith(".json"):
        return json.dumps(json.loads(text), ensure_ascii=False, allow_nan=False)
    start = re.search(r"^export const \w+ = ", text, re.MULTILINE)
    if start:
        try:
            value, end = json.JSONDecoder().raw_decode(text, start.end())
            if re.fullmatch(r"\s*(?:as const)?\s*;?\s*", text[end:]):
                return json.dumps(value, ensure_ascii=False, allow_nan=False)
        except json.JSONDecodeError:
            pass
    return None


def prepare(root, web_root=None):
    manifest = json.loads((root / "data/derived/build-manifest.json").read_text(encoding="utf-8"))
    if manifest.get("status") != "success" or manifest.get("group") != "all":
        raise ValueError("Run pipeline/run.py build --group all before importing.")
    outputs = manifest["outputHashes"]
    inputs = dict(manifest["inputHashes"])
    inputs["Indexlist.xlsx"] = manifest["workbookSha256"]
    datasets = {}
    for section, names in SECTIONS.items():
        for name in names.split():
            filename = name if name.endswith(".ts") else f"{name}-snapshot.ts"
            datasets.setdefault(filename, []).append(section)
    if set(datasets) != set(outputs):
        raise ValueError(f"Section map differs from the build outputs: {sorted(set(datasets) ^ set(outputs))}")
    rows = []
    for filename, sections in datasets.items():
        payload = (root / "data/derived/app" / filename).read_bytes()
        checksum = digest(payload)
        if checksum != outputs[filename]:
            raise ValueError(f"Snapshot differs from build manifest: {filename}")
        parsed = json_payload(filename, payload)
        rows.extend((section, filename, checksum, payload, parsed) for section in sections)
    extras = {}
    for section, filenames in EXTRA.items():
        for filename in filenames:
            payload = (root / filename).read_bytes()
            checksum = digest(payload)
            if filename in inputs and inputs[filename] != checksum:
                raise ValueError(f"Section input differs from build manifest: {filename}")
            inputs[filename] = checksum
            extras[filename] = checksum
            rows.append((section, filename, checksum, payload, json_payload(filename, payload)))
    site_files = {}
    if web_root:
        for section, filenames in SITE_REFERENCE.items():
            for filename in filenames:
                site_files.setdefault(filename, []).append(section)
        for filename, sections in datasets.items():
            path = web_root / "app" / filename
            if path.is_file() and digest(path.read_bytes()) != outputs[filename]:
                site_files[f"app/{filename}"] = sections
        for filename, sections in site_files.items():
            payload = (web_root / filename).read_bytes()
            checksum = digest(payload)
            parsed = json_payload(filename, payload)
            extras[f"website/{filename}"] = checksum
            rows.extend((section, f"website/{filename}", checksum, payload, parsed) for section in sections)
    record = dict(build=manifest, archivedInputs=inputs, supplementalDatasets=extras,
                  sections={section: sorted(row[1] for row in rows if row[0] == section) for section in SECTIONS})
    return json.dumps(record, sort_keys=True), rows, inputs


def archive_inputs(root, inputs, cursor=None):
    seen = set()
    stored = {}
    if cursor is not None:
        cursor.execute(
            """SELECT content_sha256, COUNT(*) FROM ai_index_dashboard_input_chunks
               GROUP BY content_sha256"""
        )
        stored = dict(cursor.fetchall())
    for filename, expected in sorted(inputs.items()):
        checksum = hashlib.sha256()
        path = root / filename
        chunk_count = (path.stat().st_size + CHUNK_BYTES - 1) // CHUNK_BYTES
        upload = cursor is not None and expected not in seen and stored.get(expected) != chunk_count
        with path.open("rb") as source:
            for number, chunk in enumerate(iter(lambda: source.read(CHUNK_BYTES), b"")):
                checksum.update(chunk)
                if upload:
                    cursor.execute(
                        """INSERT INTO ai_index_dashboard_input_chunks
                           (content_sha256, chunk_number, payload) VALUES (%s, %s, %s)
                           ON DUPLICATE KEY UPDATE chunk_number = ai_index_dashboard_input_chunks.chunk_number""",
                        (expected, number, chunk),
                    )
        if checksum.hexdigest() != expected:
            raise ValueError(f"Input differs from build manifest: {filename}. Rebuild before importing.")
        seen.add(expected)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data-root", type=Path, default=ROOT)
    parser.add_argument("--env-file", type=Path, default=ROOT / ".env")
    parser.add_argument("--web-root", type=Path, help="Also capture data embedded in the website checkout and differing snapshot copies")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--rebuild", action="store_true", help="Build and validate the dashboard from saved inputs before importing")
    parser.add_argument("--existing-tables", action="store_true")
    parser.add_argument("--run-id-file", type=Path, help="Write the committed run ID for a downstream build")
    args = parser.parse_args()
    if args.dry_run and args.run_id_file:
        parser.error("--run-id-file requires a live import")
    root = args.data_root.expanduser().resolve()
    if args.rebuild:
        import os

        subprocess.run(
            [sys.executable, str(Path(__file__).with_name("run.py")), "build", "--group", "all"],
            env={**os.environ, "AI_INDEX_DATA_ROOT": str(root)}, check=True,
        )
    manifest, datasets, inputs = prepare(root, args.web_root)
    run_id = digest(manifest.encode("utf-8"))

    if args.dry_run:
        archive_inputs(root, inputs)
    else:
        with connect_database(args.env_file.expanduser()) as connection:
            with connection.cursor() as cursor:
                if not args.existing_tables:
                    for statement in DDL:
                        cursor.execute(statement)
                archive_inputs(root, inputs, cursor)
                cursor.execute(
                    """INSERT INTO ai_index_dashboard_runs VALUES (%s, %s, UTC_TIMESTAMP(6))
                       ON DUPLICATE KEY UPDATE run_id = ai_index_dashboard_runs.run_id""",
                    (run_id, manifest),
                )
                for dataset in datasets:
                    cursor.execute(
                        """INSERT INTO ai_index_dashboard_datasets
                           (run_id, section_key, dataset_key, content_sha256, artifact, payload_json)
                           VALUES (%s, %s, %s, %s, %s, %s)
                           ON DUPLICATE KEY UPDATE run_id = ai_index_dashboard_datasets.run_id""",
                        (run_id, *dataset),
                    )
            connection.commit()
        if args.run_id_file:
            args.run_id_file.write_text(run_id, encoding="ascii")
    for section in SECTIONS:
        print(f"{section}: {sum(row[0] == section for row in datasets)} datasets")
    print(f"{'Validated' if args.dry_run else 'Imported'} {len(inputs)} input files for build {run_id}")


if __name__ == "__main__":
    main()
