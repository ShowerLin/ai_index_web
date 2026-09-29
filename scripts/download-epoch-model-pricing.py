#!/usr/bin/env python3
"""Extract Epoch AI's public model-version pricing table from its model explorer."""

from __future__ import annotations

import csv
import hashlib
import html
import io
import json
import re
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


BASE_URL = "https://epoch.ai"
SEARCH_URL = f"{BASE_URL}/models/search"
OUTPUT_DIR = Path("/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/epoch_ai/model_pricing")


def fetch(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "AI-Index-research-data/1.0"})
    with urllib.request.urlopen(request, timeout=120) as response:
        return response.read().decode("utf-8")


def absolute(path: str) -> str:
    return urllib.parse.urljoin(BASE_URL, path)


def main() -> None:
    search_html = fetch(SEARCH_URL)
    model_search_match = re.search(r'component-url="([^"]*ModelSearch\.[^"]+\.js)"', search_html)
    if not model_search_match:
        raise RuntimeError("Could not locate Epoch's ModelSearch asset")
    model_search_url = absolute(html.unescape(model_search_match.group(1)))

    model_search_js = fetch(model_search_url)
    data_asset_match = re.search(r'from"(\./organizationLogos\.[^"]+\.js)"', model_search_js)
    if not data_asset_match:
        raise RuntimeError("Could not locate Epoch's embedded model-data asset")
    data_asset_url = absolute("/_astro/" + data_asset_match.group(1).removeprefix("./"))

    data_asset_js = fetch(data_asset_url)
    csv_match = re.search(r"var a=`(.*?)`,o=", data_asset_js, re.S)
    if not csv_match:
        raise RuntimeError("Could not extract the embedded model CSV")
    raw_csv = csv_match.group(1)
    rows = list(csv.DictReader(io.StringIO(raw_csv)))
    if not rows or "Input price" not in rows[0] or "Output price" not in rows[0]:
        raise RuntimeError("Epoch model CSV no longer has the expected pricing columns")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    raw_path = OUTPUT_DIR / "model_versions.csv"
    raw_path.write_text(raw_csv.rstrip() + "\n", encoding="utf-8")

    priced_rows = [row for row in rows if row["Input price"] or row["Output price"]]
    priced_path = OUTPUT_DIR / "priced_model_versions.csv"
    with priced_path.open("w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(priced_rows)

    manifest = {
        "source_page": SEARCH_URL,
        "model_search_asset": model_search_url,
        "embedded_data_asset": data_asset_url,
        "retrieved_at_utc": datetime.now(timezone.utc).isoformat(),
        "model_version_rows": len(rows),
        "priced_model_version_rows": len(priced_rows),
        "sha256_model_versions_csv": hashlib.sha256(raw_path.read_bytes()).hexdigest(),
        "note": "The public model explorer embeds this CSV in a hashed JavaScript asset. The downloader resolves current asset names from the live page.",
    }
    (OUTPUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(rows)} model versions, including {len(priced_rows)} priced versions, to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
