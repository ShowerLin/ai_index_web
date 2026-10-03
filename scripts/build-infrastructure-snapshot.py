#!/usr/bin/env python3
"""Build the physical-infrastructure snapshot used by the web dashboard."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import pandas as pd


COMPANY_MAP = {
    "Microsoft": "Microsoft",
    "Google": "Alphabet",
    "Meta": "Meta",
    "Amazon": "Amazon",
    "Oracle": "Oracle",
}
COMPANY_ORDER = ["Microsoft", "Alphabet", "Meta", "Amazon", "Oracle"]


def quarter_label(value: pd.Timestamp) -> str:
    return f"{value.year}Q{value.quarter}"


def clean_owner(value: object) -> str:
    return str(value).split(" #", 1)[0] if pd.notna(value) else ""


def rounded(value: object, digits: int = 1) -> float:
    return round(float(value), digits)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--data-root",
        type=Path,
        default=Path("/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index"),
    )
    parser.add_argument("--as-of", default="2026-09-28")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "app" / "infrastructure-snapshot.ts",
    )
    args = parser.parse_args()
    cutoff = pd.Timestamp(args.as_of)

    epoch_root = args.data_root / "epoch_ai"
    chip_path = epoch_root / "ai_chip_owners" / "cumulative_by_designer.csv"
    center_path = epoch_root / "data_centers" / "data_centers.csv"
    timeline_path = epoch_root / "data_centers" / "data_center_timelines.csv"
    capex_path = args.data_root / "outputs" / "ai_index_source" / "ai_index_source_workbook.xlsx"
    chip_users_path = epoch_root / "ai_chip_users" / "year_end_by_lab.csv"
    models_path = args.data_root / "epoch_ai" / "ml_models" / "frontier_ai_models.csv"

    chips = pd.read_csv(chip_path)
    chips["End date"] = pd.to_datetime(chips["End date"])
    chips = chips[chips["Owner"].isin(COMPANY_MAP)].copy()
    chips["company"] = chips["Owner"].map(COMPANY_MAP)
    chip_quarters = (
        chips.groupby(["End date", "company"], as_index=False)
        .agg(
            h100e=("Compute estimate in H100e (median)", "sum"),
            low=("H100e (5th percentile)", "sum"),
            high=("H100e (95th percentile)", "sum"),
            chip_mw=("Power in MW (median)", "sum"),
        )
        .sort_values(["End date", "company"])
    )
    chip_as_of = chip_quarters["End date"].max()

    compute_history = []
    for date, frame in chip_quarters.groupby("End date"):
        if date < pd.Timestamp("2024-03-31"):
            continue
        compute_history.append(
            {
                "quarter": quarter_label(date),
                "h100e": rounded(frame["h100e"].sum() / 1_000_000, 3),
                "low": rounded(frame["low"].sum() / 1_000_000, 3),
                "high": rounded(frame["high"].sum() / 1_000_000, 3),
                "chipMw": rounded(frame["chip_mw"].sum(), 1),
            }
        )

    latest_compute = chip_quarters[chip_quarters["End date"] == chip_as_of].set_index("company")
    prior_compute = chip_quarters[chip_quarters["End date"] == chip_as_of - pd.DateOffset(years=1)].set_index("company")
    compute_by_owner = []
    for company in COMPANY_ORDER:
        row = latest_compute.loc[company]
        prior = prior_compute.loc[company]
        compute_by_owner.append(
            {
                "company": company,
                "h100e": rounded(row.h100e / 1_000_000, 3),
                "low": rounded(row.low / 1_000_000, 3),
                "high": rounded(row.high / 1_000_000, 3),
                "chipMw": rounded(row.chip_mw, 1),
                "yoy": rounded((row.h100e / prior.h100e - 1) * 100, 1),
            }
        )

    centers = pd.read_csv(center_path)
    centers["owner_clean"] = centers["Owner"].map(clean_owner)
    centers["company"] = centers["owner_clean"].map(COMPANY_MAP)
    timeline = pd.read_csv(timeline_path)
    timeline["Date"] = pd.to_datetime(timeline["Date"])
    center_owner = centers.set_index("Name")["company"]
    timeline["company"] = timeline["Data center"].map(center_owner)

    quarter_ends = list(pd.date_range("2023-03-31", cutoff, freq="QE"))
    if not quarter_ends or quarter_ends[-1] != cutoff:
        quarter_ends.append(cutoff)
    deployment_history = []
    previous_it_mw = None
    for quarter_end in quarter_ends:
        eligible = timeline[timeline["Date"] <= quarter_end]
        latest = eligible.sort_values("Date").groupby("Data center").tail(1)
        covered = latest[latest["company"].notna()]
        it_mw = float(covered["IT power (MW)"].fillna(0).sum())
        all_it_mw = float(latest["IT power (MW)"].fillna(0).sum())
        h100e = float(covered["H100 equivalents"].fillna(0).sum())
        deployment_history.append(
            {
                "quarter": quarter_label(quarter_end) + ("*" if quarter_end == cutoff and not quarter_end.is_quarter_end else ""),
                "itMw": rounded(it_mw, 1),
                "owners": {company: rounded(covered.loc[covered["company"] == company, "IT power (MW)"].fillna(0).sum(), 1) for company in COMPANY_ORDER},
                "additionMw": None if previous_it_mw is None else rounded(it_mw - previous_it_mw, 1),
                "allCoveredMw": rounded(all_it_mw, 1),
                "h100e": rounded(h100e / 1_000_000, 3),
            }
        )
        previous_it_mw = it_mw

    current_centers = centers[centers["company"].notna()].copy()
    deployment_by_owner = []
    for company in COMPANY_ORDER:
        frame = current_centers[current_centers["company"] == company]
        deployment_by_owner.append(
            {
                "company": company,
                "sites": int(len(frame)),
                "itMw": rounded(frame["Current power (MW)"].fillna(0).sum(), 1),
                "h100e": rounded(frame["Current H100 equivalents"].fillna(0).sum() / 1_000_000, 3),
                "capital": rounded(frame["Current total capital cost (2025 USD billions)"].fillna(0).sum(), 1),
            }
        )

    capex = pd.read_excel(capex_path, sheet_name="Hyperscaler CapEx", header=5)
    capex = capex[capex["Company"].isin(COMPANY_ORDER)].copy()
    trailing_quarters = {"2025Q2", "2025Q3", "2025Q4", "2026Q1"}
    trailing_capex = (
        capex[capex["Calendar Quarter"].isin(trailing_quarters)]
        .groupby("Company")["Compute Equipment Proxy ($B)"]
        .sum(min_count=4)
    )

    def facility_at(date: pd.Timestamp) -> pd.DataFrame:
        eligible = timeline[timeline["Date"] <= date]
        return eligible.sort_values("Date").groupby("Data center").tail(1)

    facility_latest = facility_at(chip_as_of)
    facility_prior = facility_at(chip_as_of - pd.DateOffset(years=1))
    latest_mw = facility_latest.groupby("company")["IT power (MW)"].sum()
    prior_mw = facility_prior.groupby("company")["IT power (MW)"].sum()
    conversion = []
    for company in COMPANY_ORDER:
        capex_value = float(trailing_capex.get(company, float("nan")))
        h100e_delta = float(latest_compute.loc[company].h100e - prior_compute.loc[company].h100e)
        mw_delta = float(latest_mw.get(company, 0) - prior_mw.get(company, 0))
        has_complete_capex = pd.notna(capex_value)
        conversion.append(
            {
                "company": company,
                "computeCapex": rounded(capex_value, 3) if has_complete_capex else None,
                "h100eAdded": rounded(h100e_delta / 1_000_000, 3),
                "itMwAdded": rounded(mw_delta, 1),
                "capexPerMillionH100e": rounded(capex_value / (h100e_delta / 1_000_000), 1) if has_complete_capex and h100e_delta > 0 else None,
                "capexPerMw": rounded(capex_value * 1_000 / mw_delta, 1) if has_complete_capex and mw_delta > 0 else None,
            }
        )

    chip_users = pd.read_csv(chip_users_path)
    latest_user_year = int(chip_users["Year"].max())
    latest_users = chip_users[chip_users["Year"] == latest_user_year].copy()
    lab_compute = {
        row["Lab"]: float(row["h100e_med"])
        for _, row in latest_users.iterrows()
    }
    models = pd.read_csv(models_path)
    training_examples = []
    example_map = {
        "OpenAI": "GPT-4.5",
        "Meta Superintelligence Labs": "Llama 4 Behemoth (preview)",
        "SpaceXAI": "Grok 4",
    }
    h100_fp8_ops = 1.979e15
    seconds_per_year = 365.25 * 24 * 60 * 60
    assumed_utilization = 0.30
    for lab, model_name in example_map.items():
        match = models[models["Model"] == model_name]
        if match.empty or lab not in lab_compute:
            continue
        training_compute = float(match.iloc[0]["Training compute (FLOP)"])
        h100e_years = training_compute / (h100_fp8_ops * seconds_per_year * assumed_utilization)
        training_examples.append({
            "lab": lab,
            "model": model_name,
            "labH100e": rounded(lab_compute[lab], 0),
            "trainingH100eYears": rounded(h100e_years, 0),
            "fleetYearSharePct": rounded(h100e_years / lab_compute[lab] * 100, 2),
        })

    payload = {
        "metadata": {
            "dataCenterAsOf": args.as_of,
            "chipAsOf": chip_as_of.strftime("%Y-%m-%d"),
            "coveredOwners": 5,
            "facilityCount": int(len(centers)),
            "timelineRows": int(len(timeline)),
            "method": "Facility capacity uses the latest milestone on or before each quarter end. Conversion uses trailing-four-quarter compute CapEx divided by the change from 2025Q1 to 2026Q1.",
        },
        "deploymentHistory": deployment_history,
        "deploymentByOwner": deployment_by_owner,
        "computeHistory": compute_history,
        "computeByOwner": compute_by_owner,
        "conversion": conversion,
        "usageBridge": {
            "year": latest_user_year,
            "coveredLabH100e": rounded(latest_users["h100e_med"].sum() / 1_000_000, 3),
            "coveredLabCount": int(len(latest_users)),
            "assumedUtilization": assumed_utilization,
            "trainingExamples": training_examples,
            "interpretation": "Illustrative H100e-years use Epoch's 1.979 PFLOP/s FP8 H100-equivalent definition and 30% effective utilization. Ownership, lab use, and training compute are distinct modeled datasets.",
        },
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    content = "// Generated by scripts/build-infrastructure-snapshot.py. Do not edit manually.\n"
    content += "export const infrastructureSnapshot = " + json.dumps(payload, indent=2) + " as const;\n"
    args.output.write_text(content, encoding="utf-8")


if __name__ == "__main__":
    main()
