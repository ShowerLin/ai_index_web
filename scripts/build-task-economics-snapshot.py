#!/usr/bin/env python3
"""Build the Epoch AI training-economics snapshot used by the web report."""

from __future__ import annotations

import argparse
import csv
import json
import statistics
from collections import defaultdict
from pathlib import Path


def numeric(value: str) -> float | None:
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def lab_name(organization: str) -> str:
    first = organization.split(",")[0].strip()
    aliases = {
        "Google Research": "Google", "Google Brain": "Google",
        "Google DeepMind": "Google", "DeepMind": "Google",
        "Meta AI": "Meta", "Facebook AI": "Meta", "Nvidia": "NVIDIA",
    }
    return aliases.get(first, first or "Other")


def quantile(values: list[float], probability: float) -> float:
    ordered = sorted(values)
    position = (len(ordered) - 1) * probability
    lower = int(position)
    upper = min(lower + 1, len(ordered) - 1)
    weight = position - lower
    return ordered[lower] * (1 - weight) + ordered[upper] * weight


def main() -> None:
    parser = argparse.ArgumentParser()
    source_root = Path("/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/epoch_ai")
    parser.add_argument("--models", type=Path, default=source_root / "ml_models" / "frontier_ai_models.csv")
    parser.add_argument("--hardware", type=Path, default=source_root / "chip_dataset" / "ml_hardware.csv")
    parser.add_argument("--manifest", type=Path, default=source_root / "ml_models" / "manifest.json")
    parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "app" / "task-economics-snapshot.ts")
    args = parser.parse_args()

    with args.models.open(encoding="utf-8-sig", newline="") as source:
        source_rows = list(csv.DictReader(source))

    observations = []
    for row in source_rows:
        cost = numeric(row["Training compute cost (2023 USD)"])
        publication_date = row["Publication date"].strip()
        if cost is None or not publication_date or int(publication_date[:4]) < 2017:
            continue
        observations.append({
            "date": publication_date,
            "model": row["Model"].strip(),
            "lab": lab_name(row["Organization"]),
            "organization": row["Organization"].strip(),
            "trainingCost": cost,
            "trainingCompute": numeric(row["Training compute (FLOP)"]),
            "hardware": row["Training hardware"].strip() or "Not disclosed",
            "confidence": row["Confidence"].strip() or "Not stated",
        })
    observations.sort(key=lambda item: (item["date"], item["trainingCost"]))

    by_year: dict[int, list[float]] = defaultdict(list)
    for row in observations:
        by_year[int(row["date"][:4])].append(row["trainingCost"])
    annual_ranges = [{
        "year": year,
        "count": len(values),
        "min": min(values),
        "p25": quantile(values, 0.25),
        "median": statistics.median(values),
        "p75": quantile(values, 0.75),
        "max": max(values),
    } for year, values in sorted(by_year.items())]

    with args.hardware.open(encoding="utf-8-sig", newline="") as source:
        hardware_rows = list(csv.DictReader(source))
    selected_hardware = {
        "NVIDIA H100 SXM5 80GB", "NVIDIA H200 SXM", "NVIDIA GB200",
        "NVIDIA GB300 (Blackwell Ultra)", "AMD Instinct MI300X",
        "AMD Instinct MI355X", "Google TPU v7 Ironwood",
    }
    hardware = []
    for row in hardware_rows:
        if row["Hardware name"] not in selected_hardware:
            continue
        hardware.append({
            "name": row["Hardware name"],
            "manufacturer": row["Manufacturer"],
            "releaseDate": row["Release date"],
            "releasePrice": numeric(row["Release price (USD)"]),
            "pricePerformance": numeric(row["Price-performance"]),
            "energyEfficiency": numeric(row["Energy efficiency"]),
            "memoryBytes": numeric(row["Memory (bytes)"]),
        })
    hardware.sort(key=lambda item: item["releaseDate"])

    latest = max(observations, key=lambda item: item["date"])
    highest = max(observations, key=lambda item: item["trainingCost"])
    margins = [0.30, 0.50, 0.70]
    recovery_models = []
    for row in sorted(observations, key=lambda item: item["trainingCost"], reverse=True)[:5]:
        recovery_models.append({
            "model": row["model"], "lab": row["lab"], "date": row["date"],
            "trainingCost": row["trainingCost"],
            "revenueRequired": [round(row["trainingCost"] / margin) for margin in margins],
        })

    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    payload = {
        "metadata": {
            "source": "Epoch AI — frontier_ai_models.csv and ml_hardware.csv",
            "retrievedAt": manifest["retrieved_at_utc"],
            "modelDatasetAsOf": max(row["Publication date"] for row in source_rows if row["Publication date"]),
            "costObservationAsOf": latest["date"],
            "observationCount": len(observations),
            "costBasis": "Estimated training compute cost in constant 2023 USD as reported by Epoch AI.",
        },
        "observations": observations,
        "annualRanges": annual_ranges,
        "latest": latest,
        "highest": highest,
        "hardware": hardware,
        "recovery": {
            "contributionMargins": margins,
            "models": recovery_models,
            "method": "Revenue required equals estimated training compute cost divided by assumed contribution margin.",
        },
    }
    content = "// Generated by scripts/build-task-economics-snapshot.py. Do not edit manually.\n"
    content += "export const taskEconomicsSnapshot = " + json.dumps(payload, indent=2) + " as const;\n"
    args.output.write_text(content, encoding="utf-8")
    print(f"Wrote {len(observations)} cost observations and {len(hardware)} hardware records to {args.output}")


if __name__ == "__main__":
    main()
