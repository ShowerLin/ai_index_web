#!/usr/bin/env python3
"""Download selected public Epoch AI datasets into the static-data workspace."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import shutil
import tempfile
import urllib.request
import zipfile
from datetime import datetime, timezone
from pathlib import Path


DATASETS = {
    "ml_models": {
        "url": "https://epoch.ai/data/ai_models.zip",
        "source_page": "https://epoch.ai/data/ai-models-documentation/downloads",
        "description": "Epoch AI's public AI-model database and curated model subsets.",
    },
    "chip_dataset": {
        "url": "https://epoch.ai/data/ml_hardware.zip",
        "source_page": "https://epoch.ai/data/machine-learning-hardware-documentation",
        "description": "Epoch AI's specifications for processors used to develop and deploy ML models.",
    },
    "benchmark_data": {
        "url": "https://epoch.ai/data/benchmark_data.zip",
        "source_page": "https://epoch.ai/benchmarks/use-this-data",
        "description": "Epoch AI benchmark results used to match model API prices with SWE-Bench Verified success rates.",
        "members": ["swe_bench_verified.csv", "deepswe_external.csv", "model_metadata.csv", "README.md"],
    },
}


def file_metadata(path: Path) -> dict[str, object]:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)

    row_count = None
    columns: list[str] | None = None
    if path.suffix.lower() == ".csv":
        with path.open("r", encoding="utf-8-sig", newline="") as source:
            reader = csv.reader(source)
            columns = next(reader, [])
            row_count = sum(1 for _ in reader)

    return {
        "file": path.name,
        "bytes": path.stat().st_size,
        "sha256": digest.hexdigest(),
        "rows_excluding_header": row_count,
        "columns": columns,
    }


def download_dataset(name: str, spec: dict[str, str], output_root: Path) -> None:
    destination = output_root / name
    destination.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="epoch-ai-") as temporary_directory:
        archive = Path(temporary_directory) / f"{name}.zip"
        request = urllib.request.Request(
            spec["url"], headers={"User-Agent": "AI-Index-research-data/1.0"}
        )
        with urllib.request.urlopen(request, timeout=120) as response:
            with archive.open("wb") as target:
                shutil.copyfileobj(response, target)

        with zipfile.ZipFile(archive) as package:
            for member in package.infolist():
                member_path = Path(member.filename)
                if member.is_dir() or member_path.name.startswith("."):
                    continue
                if member_path.suffix.lower() not in {".csv", ".md"}:
                    continue
                selected_members = spec.get("members")
                if selected_members and member_path.name not in selected_members:
                    continue
                target_path = destination / member_path.name
                with package.open(member) as source, target_path.open("wb") as target:
                    shutil.copyfileobj(source, target)

    files = [
        file_metadata(path)
        for path in sorted(destination.iterdir())
        if path.is_file() and path.name not in {"manifest.json", "SOURCE.md"}
    ]
    retrieved_at = datetime.now(timezone.utc).isoformat()
    manifest = {
        "dataset": name,
        "description": spec["description"],
        "source_url": spec["url"],
        "source_page": spec["source_page"],
        "retrieved_at_utc": retrieved_at,
        "license": "CC BY; externally sourced fields may retain their original licenses.",
        "files": files,
    }
    (destination / "manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    (destination / "SOURCE.md").write_text(
        f"# {name.replace('_', ' ').title()}\n\n"
        f"{spec['description']}\n\n"
        f"- Source page: {spec['source_page']}\n"
        f"- Download: {spec['url']}\n"
        f"- Retrieved: {retrieved_at}\n"
        "- License: CC BY; externally sourced fields may retain their original licenses.\n"
        "- Retrieval: `python3 scripts/download-epoch-datasets.py` from the website project.\n",
        encoding="utf-8",
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--output-root",
        type=Path,
        default=Path.home()
        / "Library/CloudStorage/OneDrive-Personal/AI_Index/epoch_ai",
    )
    parser.add_argument("--dataset", action="append", choices=sorted(DATASETS), help="Download only the named dataset; repeat to select more than one.")
    args = parser.parse_args()
    args.output_root.mkdir(parents=True, exist_ok=True)
    selected = args.dataset or list(DATASETS)
    for name in selected:
        spec = DATASETS[name]
        download_dataset(name, spec, args.output_root)
        print(f"Downloaded {name} to {args.output_root / name}")


if __name__ == "__main__":
    main()
