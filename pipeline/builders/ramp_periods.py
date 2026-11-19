"""Keep publisher-week observations separate from the matched Sunday series."""
import datetime as dt
import json
from collections import defaultdict
from pathlib import Path


def token_periods(path: Path):
    published = json.loads(path.read_text(encoding="utf-8"))["tokenVolumes"]
    sunday = []
    for row in published:
        start = dt.date.fromisoformat(row["period_start"])
        end = dt.date.fromisoformat(row["period_end"])
        if row["period_grain"] != "weekly" or end - start != dt.timedelta(days=6):
            raise ValueError(f"Invalid Ramp weekly window: {start} to {end}")
        if end.weekday() == 6:
            sunday.append(row)
    if len(sunday) == len(published):
        return published, sunday, path

    # The publisher rebucketed historical observations to Saturday–Friday.
    # The archived Monday–Sunday records still support the existing core windows.
    archive = path.parent.parent / "matched-sunday-token-volumes.json"
    matched = json.loads(archive.read_text(encoding="utf-8"))["tokenVolumes"]
    return published, matched, archive


def public_chart_data(path: Path):
    payload = json.loads(path.read_text(encoding="utf-8"))
    model_rows = [row for row in payload["tokenVolumes"] if row["dimension_type"] == "model"]
    keys = ("token_volume", "token_spend")
    # Ramp's indexed payload has a separate peak of 100 for each metric.
    indexed = all(max(row["metric_value"] for row in model_rows if row["metric_key"] == key) == 100
                  for key in keys)
    totals = defaultdict(dict)
    for row in model_rows:
        end, metric = row["period_end"], row["metric_key"]
        if metric in keys:
            totals[end][metric] = totals[end].get(metric, 0) + float(row["metric_value"])
    ordered = sorted(totals.items())
    first_spend = next(values["token_spend"] for _, values in ordered if values.get("token_spend", 0) > 0)
    weekly = []
    for end, values in ordered:
        volume = values.get("token_volume")
        spend = values.get("token_spend")
        prior = totals.get((dt.date.fromisoformat(end) - dt.timedelta(weeks=1)).isoformat(), {})
        previous_volume = prior.get("token_volume")
        weekly.append({
            "end": end,
            "volume": None if volume is None else volume if indexed else volume / (7 * 1e12),
            "volumeWow": (volume / previous_volume - 1) * 100 if volume is not None and previous_volume else None,
            "spendingIndex": None if spend is None else spend if indexed else spend / first_spend * 100,
        })
    price_rows = [row for row in payload["tokenPrices"] if row["token_type"] == "all_tokens"]
    prices = {row["usage_date"]: row["price_per_million"]
              for row in price_rows if row.get("series_key") == "blend"}
    if not prices:
        legacy = defaultdict(dict)
        for row in price_rows:
            maker = row.get("model_maker")
            if maker in ("anthropic", "openai"):
                legacy[row["usage_date"]][maker] = row
        for date, makers in legacy.items():
            if len(makers) == 2:
                volume = sum(row["token_count_7d"] for row in makers.values())
                if volume > 0:
                    prices[date] = sum(row["token_cost_usd_7d"] for row in makers.values()) / volume * 1e6
    prices = [{"date": date, "value": value} for date, value in sorted(prices.items())]
    return {"indexed": indexed, "weekly": weekly, "blendedPriceDaily": prices}
