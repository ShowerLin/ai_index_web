#!/usr/bin/env python3
"""Download and normalize public SWE-bench leaderboard results."""

from __future__ import annotations

import csv
import hashlib
import json
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


LEADERBOARD_URL = "https://raw.githubusercontent.com/SWE-bench/swe-bench.github.io/master/data/leaderboards.json"
INSTANCE_URL = "https://raw.githubusercontent.com/SWE-bench/swe-bench.github.io/master/data/info_for_leaderboard.json"
OUTPUT_DIR = Path("/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/swe_bench")


def fetch_json(url: str) -> object:
    request = urllib.request.Request(url, headers={"User-Agent": "AI-Index-research-data/1.0"})
    with urllib.request.urlopen(request, timeout=120) as response:
        return json.load(response)


def attempts(tags: list[str] | None) -> int | None:
    for tag in tags or []:
        match = re.search(r"Attempts\s*-\s*(\d+)", tag, re.I)
        if match:
            return int(match.group(1))
    return None


def verification_status(value: object) -> str:
    if value is True:
        return "verified"
    if value is False:
        return "not verified"
    return "not stated"


def main() -> None:
    leaderboard_payload = fetch_json(LEADERBOARD_URL)
    instance_payload = fetch_json(INSTANCE_URL)
    verified = next(
        board["results"]
        for board in leaderboard_payload["leaderboards"]
        if board["name"] == "Verified"
    )

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    raw_path = OUTPUT_DIR / "leaderboards.json"
    raw_path.write_text(json.dumps(leaderboard_payload, indent=2) + "\n", encoding="utf-8")
    instance_path = OUTPUT_DIR / "public_instance_results.json"
    instance_path.write_text(json.dumps(instance_payload, indent=2) + "\n", encoding="utf-8")

    normalized = []
    for row in verified:
        normalized.append({
            "submission": row.get("name"),
            "model": row.get("model_display"),
            "model_organization": row.get("model_org"),
            "agent": row.get("agent"),
            "agent_organization": row.get("agent_org"),
            "resolved_percent": row.get("resolved"),
            "submission_date": row.get("date"),
            "attempts": attempts(row.get("tags")),
            "verification_status": verification_status(row.get("checked")),
            "open_model": row.get("os_model"),
            "open_system": row.get("os_system"),
            "reasoning_effort": row.get("reasoning_effort"),
            "aggregate_cost_usd": row.get("cost"),
            "mean_instance_cost_usd": row.get("instance_cost"),
            "mean_instance_calls": row.get("instance_calls"),
            "folder": row.get("folder"),
            "site": row.get("site"),
            "warning": row.get("warning"),
        })
    normalized.sort(key=lambda row: (-float(row["resolved_percent"]), row["submission_date"] or ""))

    csv_path = OUTPUT_DIR / "verified_leaderboard.csv"
    with csv_path.open("w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=normalized[0].keys())
        writer.writeheader()
        writer.writerows(normalized)

    systems_with_instance_data = len(instance_payload)
    manifest = {
        "retrieved_at_utc": datetime.now(timezone.utc).isoformat(),
        "leaderboard_source": LEADERBOARD_URL,
        "instance_source": INSTANCE_URL,
        "verified_submission_count": len(normalized),
        "verified_checked_count": sum(row["verification_status"] == "verified" for row in normalized),
        "submissions_with_aggregate_cost": sum(row["aggregate_cost_usd"] not in (None, "") for row in normalized),
        "systems_with_public_instance_cost_data": systems_with_instance_data,
        "sha256_verified_csv": hashlib.sha256(csv_path.read_bytes()).hexdigest(),
        "interpretation": "A leaderboard observation is a model-agent system result. Agent design, attempts, tools and token budgets are not standardized across submissions.",
    }
    (OUTPUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(
        f"Wrote {len(normalized)} Verified submissions; {manifest['verified_checked_count']} verified; "
        f"{systems_with_instance_data} systems have public per-instance cost records"
    )


if __name__ == "__main__":
    main()
