#!/usr/bin/env python3
"""Build the buyer-side cost-per-successful-task snapshot from Indexlist.xlsx."""

from __future__ import annotations

import argparse
import csv
import json
import re
from datetime import date, timedelta
from pathlib import Path

from openpyxl import load_workbook


def number(value: object) -> float:
    match = re.search(r"[0-9][0-9,]*(?:\.[0-9]+)?", str(value))
    if not match:
        raise ValueError(f"No numeric value in {value!r}")
    return float(match.group(0).replace(",", ""))


def model_lab(model: str) -> str:
    labs = []
    for marker, lab in (("GPT", "OpenAI"), ("Claude", "Anthropic"), ("DeepSeek", "DeepSeek"), ("MiniMax", "MiniMax"), ("Grok", "xAI"), ("GLM", "Z.ai")):
        if marker in model and lab not in labs:
            labs.append(lab)
    return " / ".join(labs) if labs else "Other"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--workbook", type=Path, default=Path("/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/Indexlist.xlsx"))
    parser.add_argument("--epoch-pricing", type=Path, default=Path("/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/epoch_ai/model_pricing/priced_model_versions.csv"))
    parser.add_argument("--epoch-benchmark", type=Path, default=Path("/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/epoch_ai/benchmark_data/swe_bench_verified.csv"))
    parser.add_argument("--epoch-deepswe", type=Path, default=Path("/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/epoch_ai/benchmark_data/deepswe_external.csv"))
    parser.add_argument("--swebench-leaderboard", type=Path, default=Path("/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/swe_bench/verified_leaderboard.csv"))
    parser.add_argument("--proxy-output", type=Path, default=Path("/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/swe_bench/model_success_proxies.csv"))
    parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "app" / "useful-task-snapshot.ts")
    args = parser.parse_args()

    workbook = load_workbook(args.workbook, read_only=True, data_only=True)
    sheet = workbook["Cost Useful Task"]
    headers = [cell.value for cell in next(sheet.iter_rows(min_row=1, max_row=1))]
    rows = []
    for values in sheet.iter_rows(min_row=2, values_only=True):
        row = dict(zip(headers, values))
        model = str(row["Model (Series)"])
        series = "Best value" if "Best Value" in model else "Frontier"
        if model.startswith("Grok 4.5"):
            series = "Comparator"
        rows.append({
            "date": row["Date"].strftime("%Y-%m-%d"),
            "model": model.replace(" (Frontier)", "").replace(" (Best Value)", ""),
            "lab": model_lab(model),
            "series": series,
            "blendedTokenPrice": str(row["Blended Token Price ($/M)"]),
            "tokensPerAttempt": str(row["Tokens/Attempt"]),
            "rawCostPerAttempt": number(row["Raw Cost/Attempt"]),
            "successRate": number(row["SWE-Bench Success Rate"]) / 100,
            "costPerUsefulTask": number(row["Cost/Successful Task"]),
            "evidence": str(row["Label"]),
            "priceSource": "Indexlist.xlsx",
            "successSource": "Indexlist.xlsx",
            "successBenchmark": "Workbook assumption",
            "successAgent": "",
            "successAttempts": "",
            "workbookSuccessRate": number(row["SWE-Bench Success Rate"]) / 100,
        })

    # Split workbook labels that combined two labs into separate model observations.
    split_models = {
        "Claude 4.6 / GPT-5.4": ["Claude Sonnet 4.6", "GPT-5.4"],
        "GPT-5.5 / Claude Fable": ["GPT-5.5", "Claude Fable 5"],
    }
    expanded_rows = []
    for row in rows:
        models = split_models.get(row["model"], [row["model"]])
        for model in models:
            expanded = dict(row)
            expanded.update({"model": model, "lab": model_lab(model)})
            expanded_rows.append(expanded)
    rows = expanded_rows

    with args.epoch_benchmark.open(encoding="utf-8-sig", newline="") as source:
        epoch_swe = {row["Model version"]: row for row in csv.DictReader(source)}
    with args.epoch_deepswe.open(encoding="utf-8-sig", newline="") as source:
        epoch_deepswe = {row["Model version"]: row for row in csv.DictReader(source)}
    with args.swebench_leaderboard.open(encoding="utf-8-sig", newline="") as source:
        leaderboard = list(csv.DictReader(source))

    # Exact, reviewable matches only. Historical entries use the same verified,
    # single-attempt SWE-agent harness; newer entries use Epoch's standardized data.
    public_proxies = {}
    for workbook_model, leaderboard_model in {
        "GPT-4 Turbo": "GPT-4 (1106)", "Claude 3 Opus": "Claude 3 Opus", "GPT-4o": "GPT-4o",
    }.items():
        match = next((item for item in leaderboard if item["model"] == leaderboard_model and item["agent"] == "SWE-agent" and item["attempts"] == "1" and item["verification_status"] == "verified"), None)
        if match:
            public_proxies[workbook_model] = {
                "score": float(match["resolved_percent"]) / 100, "benchmark": "SWE-bench Verified",
                "source": "Official SWE-bench leaderboard", "modelVersion": leaderboard_model,
                "agent": match["agent"], "attempts": match["attempts"], "reasoningEffort": "",
                "verificationStatus": match["verification_status"], "scoreDate": match["submission_date"],
                "meanCost": "",
            }
    for workbook_model, version in {"GPT-4.1": "gpt-4.1-2025-04-14"}.items():
        match = epoch_swe.get(version)
        if match:
            public_proxies[workbook_model] = {
                "score": float(match["mean_score"]), "benchmark": "SWE-Bench Verified",
                "source": "Epoch AI benchmark data", "modelVersion": version, "agent": "Epoch Inspect harness",
                "attempts": "1", "reasoningEffort": "", "verificationStatus": "published",
                "scoreDate": match["Started at"][:10] or match["Release date"],
                "meanCost": "",
            }
    for workbook_model, version in {
        "Claude Sonnet 4.6": "claude-sonnet-4-6_high", "GPT-5.4": "gpt-5.4-2026-03-05_xhigh",
        "GPT-5.5": "gpt-5.5_xhigh", "Claude Fable 5": "claude-fable-5_xhigh",
        "Grok 4.5": "grok-4.5_high", "GPT-5.6 Sol": "gpt-5.6-sol_max", "GPT-6 Astra": "gpt-6-astra_xhigh", "GLM-5.3-Flash": "glm-5.3-flash_max",
    }.items():
        match = epoch_deepswe.get(version)
        if match:
            public_proxies[workbook_model] = {
                "score": float(match["Pass@1"]), "benchmark": "DeepSWE",
                "source": "Epoch AI DeepSWE data", "modelVersion": version, "agent": match["Harness"],
                "attempts": "1", "reasoningEffort": match["Reasoning effort"], "verificationStatus": "published",
                "scoreDate": match["Release date"],
                "meanCost": match["Mean cost (USD)"],
            }

    value_candidate_names = [
        "GLM 4.5", "MiniMax M2", "DeepSeek V3.2 Reasoner", "GLM 4.6",
        "MiniMax M2.5", "GLM 5", "DeepSeek V3.2",
    ]
    value_candidates = []
    for candidate_name in value_candidate_names:
        matches = [item for item in leaderboard if item["model"] == candidate_name and item["agent"] == "mini-SWE-agent" and item["attempts"] == "1" and item["mean_instance_cost_usd"]]
        if not matches:
            continue
        match = next((item for item in matches if item["verification_status"] == "verified"), matches[0])
        proxy = {
            "score": float(match["resolved_percent"]) / 100, "benchmark": "SWE-bench Verified",
            "source": "Official SWE-bench leaderboard", "modelVersion": candidate_name,
            "agent": match["agent"], "attempts": match["attempts"], "reasoningEffort": match["reasoning_effort"],
            "verificationStatus": match["verification_status"], "scoreDate": match["submission_date"],
            "meanCost": match["mean_instance_cost_usd"],
        }
        public_proxies[candidate_name] = proxy
        value_candidates.append((candidate_name, match, proxy))

    args.proxy_output.parent.mkdir(parents=True, exist_ok=True)
    proxy_fields = ["workbook_model", "model_version", "success_rate", "mean_run_cost_usd", "benchmark", "source", "agent", "attempts", "reasoning_effort", "verification_status", "score_date", "match_method"]
    with args.proxy_output.open("w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=proxy_fields); writer.writeheader()
        for model, proxy in public_proxies.items():
            writer.writerow({"workbook_model": model, "model_version": proxy["modelVersion"], "success_rate": proxy["score"], "mean_run_cost_usd": proxy["meanCost"], "benchmark": proxy["benchmark"], "source": proxy["source"], "agent": proxy["agent"], "attempts": proxy["attempts"], "reasoning_effort": proxy["reasoningEffort"], "verification_status": proxy["verificationStatus"], "score_date": proxy["scoreDate"], "match_method": "explicit model-version mapping"})

    for row in rows:
        proxy = public_proxies.get(row["model"])
        if proxy:
            row.update({"successRate": proxy["score"], "costPerUsefulTask": row["rawCostPerAttempt"] / proxy["score"], "successSource": proxy["source"], "successBenchmark": proxy["benchmark"], "successAgent": proxy["agent"], "successAttempts": proxy["attempts"], "successReasoningEffort": proxy["reasoningEffort"], "successModelVersion": proxy["modelVersion"]})

    with args.epoch_pricing.open(encoding="utf-8-sig", newline="") as source:
        pricing_rows = list(csv.DictReader(source))
    prices_by_group: dict[str, tuple[float, float]] = {}
    eci_by_group: dict[str, float] = {}
    release_by_group: dict[str, str] = {}
    eci_history = []
    for pricing_row in pricing_rows:
        try:
            prices = (float(pricing_row["Input price"]), float(pricing_row["Output price"]))
        except ValueError:
            continue
        current = prices_by_group.get(pricing_row["model_group"])
        if current is None or sum(prices) < sum(current):
            prices_by_group[pricing_row["model_group"]] = prices
        release = pricing_row["Version release date"]
        if release and (pricing_row["model_group"] not in release_by_group or release < release_by_group[pricing_row["model_group"]]):
            release_by_group[pricing_row["model_group"]] = release
        try:
            eci = float(pricing_row["eci"])
            eci_by_group[pricing_row["model_group"]] = eci
            if pricing_row["Version release date"]:
                eci_history.append((pricing_row["Version release date"], eci))
        except (ValueError, KeyError):
            pass
    workbook_to_epoch = {
        "GPT-4": "GPT-4 (Mar 2023)",
        "GPT-4 Turbo": "GPT-4 Turbo (Nov 2023)",
        "Claude 3 Opus": "Claude 3 Opus",
        "GPT-4o": "GPT-4o (May 2024)",
        "DeepSeek R1": "DeepSeek-R1",
        "GPT-4.1": "GPT-4.1",
        "Claude Sonnet 4.6": "Claude Sonnet 4.6",
        "GPT-5.4": "GPT-5.4",
        "GPT-5.5": "GPT-5.5",
        "Claude Fable 5": "Claude Fable 5",
        "Grok 4.5": "Grok 4.5",
        "GPT-5.6 Sol": "GPT-5.6 Sol",
        "DeepSeek V4 Flash": "DeepSeek V4 Flash 0731",
        "GLM-5.3-Flash": "GLM-5.3-Flash",
        "GPT-6 Astra": "GPT-6 Astra",
    }
    input_share, output_share = 0.66, 0.34
    enriched_count = 0
    for row in rows:
        epoch_name = workbook_to_epoch.get(row["model"])
        if not epoch_name:
            continue
        prices = prices_by_group.get(epoch_name)
        if not prices:
            continue
        input_price, output_price = prices
        blended_price = input_price * input_share + output_price * output_share
        if row["model"] in {"Claude Sonnet 4.6", "GPT-5.4", "GPT-5.5", "Claude Fable 5", "Grok 4.5", "GPT-5.6 Sol", "DeepSeek V4 Flash", "GLM-5.3-Flash", "GPT-6 Astra"}:
            row["date"] = release_by_group.get(epoch_name, row["date"])
        try:
            tokens_m = number(row["tokensPerAttempt"])
        except ValueError:
            continue
        if "K" in row["tokensPerAttempt"].upper():
            tokens_m /= 1000
        raw_cost = blended_price * tokens_m
        row.update({
            "blendedTokenPrice": f"${blended_price:.2f}",
            "rawCostPerAttempt": raw_cost,
            "costPerUsefulTask": raw_cost / row["successRate"],
            "evidence": "Epoch API price + public success proxy + workbook token-volume assumption" if row["successSource"] != "Indexlist.xlsx" else "Epoch API price + workbook task assumptions",
            "priceSource": "Epoch AI API prices",
        })
        enriched_count += 1

    # DeepSWE reports observed mean run cost. Use it instead of mixing the
    # workbook's legacy token-volume assumptions across model generations.
    for row in rows:
        proxy = public_proxies.get(row["model"])
        if not proxy or not proxy["meanCost"]:
            continue
        mean_cost = float(proxy["meanCost"])
        row.update({
            "tokensPerAttempt": "Observed DeepSWE run",
            "rawCostPerAttempt": mean_cost,
            "costPerUsefulTask": mean_cost / row["successRate"],
            "evidence": "Epoch DeepSWE mean run cost and Pass@1",
            "priceSource": "Epoch AI DeepSWE observed mean cost",
        })

    benchmark = epoch_swe.get("gpt-4o-2024-11-20")
    if benchmark:
        prices = prices_by_group.get("GPT-4o (Nov 2024)")
        if prices:
            input_price, output_price = prices
            blended_price = input_price * input_share + output_price * output_share
            tokens_m = 4.2
            success_rate = float(benchmark["mean_score"])
            raw_cost = blended_price * tokens_m
            rows.append({
                "date": benchmark["Release date"],
                "model": "GPT-4o (Nov 2024)",
                "lab": "OpenAI",
                "series": "Frontier",
                "blendedTokenPrice": f"${blended_price:.2f}",
                "tokensPerAttempt": "4.2M assumed",
                "rawCostPerAttempt": raw_cost,
                "successRate": success_rate,
                "costPerUsefulTask": raw_cost / success_rate,
                "evidence": "Epoch API price + Epoch SWE-Bench; workbook token-volume assumption",
                "priceSource": "Epoch AI API prices",
                "successSource": "Epoch AI SWE-Bench Verified",
                "successBenchmark": "SWE-Bench Verified",
                "successAgent": "Epoch Inspect harness",
                "successAttempts": "1",
                "workbookSuccessRate": success_rate,
            })
            enriched_count += 1
    for model, match, proxy in value_candidates:
        mean_cost = float(proxy["meanCost"])
        rows.append({
            "date": match["submission_date"], "model": model, "lab": model_lab(model), "series": "Best value",
            "blendedTokenPrice": "Observed run cost", "tokensPerAttempt": "Observed leaderboard run",
            "rawCostPerAttempt": mean_cost, "successRate": proxy["score"],
            "costPerUsefulTask": mean_cost / proxy["score"],
            "evidence": "Official SWE-bench mean instance cost and resolved rate",
            "priceSource": "Official SWE-bench observed mean cost", "successSource": proxy["source"],
            "successBenchmark": proxy["benchmark"], "successAgent": proxy["agent"],
            "successAttempts": proxy["attempts"], "successReasoningEffort": proxy["reasoningEffort"],
            "successModelVersion": proxy["modelVersion"], "successVerification": proxy["verificationStatus"],
            "workbookSuccessRate": proxy["score"],
        })
    rows.sort(key=lambda item: (item["date"], item["series"]))
    classification_groups = dict(workbook_to_epoch)
    classification_groups.update({
        "GPT-4o (Nov 2024)": "GPT-4o (Nov 2024)", "GLM 4.5": "GLM-4.5",
        "MiniMax M2": "MiniMax-M2", "DeepSeek V3.2 Reasoner": "DeepSeek-V3.2",
        "GLM 4.6": "GLM-4.6", "MiniMax M2.5": "MiniMax-M2.5", "GLM 5": "GLM-5",
        "DeepSeek V3.2": "DeepSeek-V3.2", "DeepSeek V4 Flash": "DeepSeek V4 Flash 0731",
        "GLM-5.3-Flash": "GLM-5.3-Flash",
    })
    legacy_frontier = {"GPT-4", "GPT-4 Turbo", "Claude 3 Opus", "GPT-4o", "GPT-4o (Nov 2024)"}
    for row in rows:
        group = classification_groups.get(row["model"])
        eci = eci_by_group.get(group) if group else None
        dated_eci = [value for release, value in eci_history if release <= row["date"]]
        frontier_eci = max(dated_eci) if dated_eci else None
        gap = frontier_eci - eci if eci is not None and frontier_eci is not None else None
        observed_cost = "observed mean cost" in row["priceSource"].lower()
        row.update({
            "eci": eci, "eciGap": gap,
            "evidenceTier": "A" if observed_cost and row["successSource"] != "Indexlist.xlsx" else ("B" if row["successSource"] != "Indexlist.xlsx" else "C"),
            "classification": "Frontier anchor" if row["model"] in legacy_frontier or (gap is not None and gap <= 5) else "Comparator",
        })

    candidate_rows = [row for row in rows if row["classification"] != "Frontier anchor" and row["evidenceTier"] == "A" and row["successRate"] >= 0.50]
    candidate_dates = sorted({row["date"] for row in candidate_rows})
    best_value_trend = []
    for date_text in candidate_dates:
        point_date = date.fromisoformat(date_text)
        window_start = point_date - timedelta(days=180)
        available = [row for row in candidate_rows if window_start <= date.fromisoformat(row["date"]) <= point_date]
        if not available:
            continue
        best = min(available, key=lambda item: item["costPerUsefulTask"])
        best_value_trend.append({"date": date_text, "costPerUsefulTask": best["costPerUsefulTask"], "model": best["model"]})
        if best["date"] == date_text:
            best["classification"] = "Best-value anchor"

    frontier_trend = []
    for date_text in sorted({row["date"] for row in rows if row["classification"] == "Frontier anchor"}):
        peers = [row for row in rows if row["date"] == date_text and row["classification"] == "Frontier anchor"]
        representative = 10 ** (sum(__import__("math").log10(row["costPerUsefulTask"]) for row in peers) / len(peers))
        frontier_trend.append({"date": date_text, "costPerUsefulTask": representative, "model": " / ".join(row["model"] for row in peers)})

    audit_path = args.proxy_output.parent / "model_classification_audit.csv"
    audit_fields = ["date", "model", "lab", "classification", "evidence_tier", "success_rate", "cost_per_successful_task", "eci", "eci_gap_to_date_frontier", "benchmark", "price_source"]
    with audit_path.open("w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=audit_fields); writer.writeheader()
        for row in rows:
            writer.writerow({"date": row["date"], "model": row["model"], "lab": row["lab"], "classification": row["classification"], "evidence_tier": row["evidenceTier"], "success_rate": row["successRate"], "cost_per_successful_task": row["costPerUsefulTask"], "eci": row["eci"], "eci_gap_to_date_frontier": row["eciGap"], "benchmark": row["successBenchmark"], "price_source": row["priceSource"]})

    latest_frontier = [row for row in rows if row["classification"] == "Frontier anchor"][-1]
    latest_best_trend = best_value_trend[-1]
    latest_best = next(row for row in reversed(rows) if row["model"] == latest_best_trend["model"] and row["date"] <= latest_best_trend["date"])
    latest = {"Frontier": latest_frontier, "Best value": latest_best}
    assumptions = {"capitalBaseB": 1, "assetLifeYears": 5, "requiredReturn": 0.10, "contributionMargins": [0.30, 0.50, 0.70]}
    annual_charge = 1_000_000_000 * (1 / assumptions["assetLifeYears"] + assumptions["requiredReturn"])
    sensitivity = [{
        "series": row["series"], "model": row["model"], "pricePerUsefulTask": row["costPerUsefulTask"],
        "tasksPerDay": [round(annual_charge / (row["costPerUsefulTask"] * margin) / 365) for margin in assumptions["contributionMargins"]],
    } for row in latest.values()]
    payload = {
        "metadata": {
            "sheet": "Cost Useful Task + Epoch AI",
            "asOf": max(row["date"] for row in rows),
            "observationCount": len(rows),
            "epochEnrichedCount": enriched_count,
            "publicSuccessProxyCount": sum(row["successSource"] != "Indexlist.xlsx" for row in rows),
            "bestValueCandidateCount": len(value_candidates),
            "classificationMethod": "Frontier anchors are within 5 ECI points of the dated capability maximum; pre-2025 GPT-4-era models use Epoch's historical frontier coverage. Best value is the lowest Tier-A observed cost per successful task among models with at least 50% success in a trailing 180-day window.",
            "successProxyMethod": "Exact model-version matches only. Historical scores use verified one-attempt SWE-agent submissions; newer scores use Epoch SWE-Bench Verified or DeepSWE Pass@1. DeepSWE variants use the stated reasoning effort.",
            "priceBlend": "66% input tokens and 34% output tokens; lowest published input/output pair when Epoch lists multiple price tiers for the same model group.",
        },
        "observations": rows, "trendLines": {"Frontier": frontier_trend, "Best value": best_value_trend}, "latest": latest, "assumptions": assumptions, "sensitivity": sensitivity,
    }
    args.output.write_text("// Generated by scripts/build-useful-task-snapshot.py. Do not edit manually.\nexport const usefulTaskSnapshot = " + json.dumps(payload, indent=2) + " as const;\n", encoding="utf-8")
    print(f"Wrote {len(rows)} useful-task observations to {args.output}")


if __name__ == "__main__":
    main()
