"""Export one complete MySQL dashboard run for the website build."""

import argparse
import json
from pathlib import Path

from import_dashboard import SITE_REFERENCE, digest
from import_sources import connect_database


def export(connection, output, requested_run=None):
    with connection.cursor() as cursor:
        if requested_run:
            cursor.execute(
                "SELECT run_id, manifest FROM ai_index_dashboard_runs WHERE run_id = %s",
                (requested_run,),
            )
        else:
            cursor.execute(
                """SELECT run_id, manifest FROM ai_index_dashboard_runs
                   ORDER BY imported_at_utc DESC, run_id DESC LIMIT 1"""
            )
        latest = cursor.fetchone()
        if latest is None:
            raise ValueError("No dashboard run in MySQL. Run import_dashboard.py first.")
        run_id, manifest = latest
        if digest(manifest.encode("utf-8")) != run_id:
            raise ValueError(f"Dashboard manifest checksum mismatch: {run_id}")
        manifest = json.loads(manifest)
        outputs = manifest["build"]["outputHashes"]
        if any(Path(name).name != name or not name.endswith(".ts") for name in outputs):
            raise ValueError("Dashboard manifest contains an invalid output filename.")
        expected = {f"app/{name}": checksum for name, checksum in outputs.items()}
        financing = "data/research/financing/circular-financing.json"
        expected["data/circular-financing.json"] = manifest["supplementalDatasets"][financing]
        reference_paths = {
            name for names in SITE_REFERENCE.values() for name in names
            if name.endswith(".ts")
        }
        supplemental = manifest["supplementalDatasets"]
        for name in reference_paths:
            key = f"website/{name}"
            if key in supplemental:
                expected[name] = supplemental[key]
        cursor.execute(
            """SELECT dataset_key, content_sha256, artifact FROM ai_index_dashboard_datasets
               WHERE run_id = %s""", (run_id,)
        )
        files = {}
        for name, checksum, content in cursor:
            if name.startswith("website/"):
                path = name.removeprefix("website/")
                if path not in reference_paths:
                    continue
            else:
                path = "data/circular-financing.json" if name == financing else f"app/{name}"
            if path not in expected or expected[path] != checksum or digest(content) != checksum:
                raise ValueError(f"Unexpected or altered dashboard artifact: {name}")
            files[path] = content
        if files.keys() != expected.keys():
            raise ValueError(f"Incomplete dashboard run: {sorted(expected.keys() - files.keys())}")
        cursor.execute(
            """SELECT 1 FROM information_schema.TABLES
               WHERE TABLE_SCHEMA = DATABASE()
                 AND TABLE_NAME = 'ai_index_hyperscaler_estimates'"""
        )
        estimates = []
        if cursor.fetchone():
            cursor.execute(
            """SELECT observed_on, captured_at_utc, ticker, fiscal_period, metric_key, value
               FROM ai_index_hyperscaler_estimates WHERE value IS NOT NULL
               ORDER BY observed_on, captured_at_utc, ticker, fiscal_period, metric_key"""
            )
            estimates = [
                [day.isoformat(), captured.isoformat(timespec="microseconds") + "Z", ticker, quarter, metric, value]
                for day, captured, ticker, quarter, metric, value in cursor
            ]
        files["app/hyperscaler-estimate-history.ts"] = (
            "export const estimateHistory = " + json.dumps(estimates, allow_nan=False)
            + " satisfies [string, string, string, string, string, number][];\n"
        ).encode("utf-8")
    output.mkdir(parents=True, exist_ok=True)
    for name, content in files.items():
        target = output / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(content)
    (output / "run.json").write_text(json.dumps({"run_id": run_id, "files": sorted(files)}), encoding="utf-8")
    print(f"Loaded {len(files)} website datasets from MySQL run {run_id}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--env-file", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--run-id")
    args = parser.parse_args()
    with connect_database(args.env_file) as connection:
        export(connection, args.output, args.run_id)


if __name__ == "__main__":
    main()
