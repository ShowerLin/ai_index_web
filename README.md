# AI Investment Atmosphere — canonical local website

## Workspace rule

This folder is the canonical local website workspace. Keep the application source, scripts, tests, package files and all dependencies here, outside OneDrive.

The OneDrive `AI_Index` folder stores spreadsheets, research documents and generated static outputs only. Never install `node_modules`, package caches or other website dependencies in OneDrive. Merge approved application changes into this Projects workspace before running or reviewing the page.

The last self-contained HTML export is preserved under `static-output/`. It is an output artifact and is not the source used by the local development server.

## Included analysis

The application contains the interactive pillar heatmap, AI value chain, atmosphere pulse, global hyperscaler CapEx, Frontier Labs, demand-to-returns conversion, cash sustainability, ROIC, financial resilience, credit conditions, bond financing and methodology sections.

## Run locally

Install dependencies once:

```sh
export PATH="/Users/linyu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
pnpm install
```

Then double-click `start-local.command`, or run:

```sh
./start-local.command
```

Then open <http://localhost:8000> in a browser. Stop the server with `Ctrl+C`.

## Refresh physical infrastructure data

The physical deployment, installed compute and CapEx conversion views use a generated TypeScript snapshot. Refresh it after updating the Epoch AI CSVs or the source CapEx workbook:

```sh
pnpm run data:infrastructure
```

The script reads research inputs from the OneDrive `AI_INDEX` folder and writes only the generated snapshot inside this project.

Refresh the Frontier Labs revenue snapshot after updating `ai_companies_revenue_reports.csv`:

```sh
pnpm run data:frontier-labs
```

Refresh model-training and chip economics after downloading the latest Epoch AI model and hardware datasets:

```sh
pnpm run data:task-economics
```

The generator reads `epoch_ai/ml_models/frontier_ai_models.csv` and `epoch_ai/chip_dataset/ml_hardware.csv` from the OneDrive research-data folder.

Refresh the separate buyer-side cost-per-successful-task analysis after updating the `Cost Useful Task` sheet in `Indexlist.xlsx`:

```sh
pnpm run data:useful-task
```

Refresh Epoch's public model-version pricing table before rebuilding the useful-task analysis:

```sh
pnpm run data:epoch-pricing
pnpm run data:useful-task
```

The pricing downloader resolves the current hashed model-explorer asset and saves the embedded CSV under `epoch_ai/model_pricing` in OneDrive.

Download and normalize the official SWE-bench Verified leaderboard and its available public per-instance cost records:

```sh
pnpm run data:swebench
```

The output is stored under `swe_bench` in the OneDrive research-data folder. Leaderboard rows describe model-agent systems and should not be treated as model-only pass rates.


### Five-stage reading framework

The dashboard follows **Capability → Adoption → Utilization → Monetization → Capital Return**. Each stage states the available evidence, missing evidence and the conversion hypothesis to test. Navigation and the executive-summary reading path follow the same order. The original momentum heatmap remains above the five stages, with a direct Heatmap navigation link.

- Capability: benchmark-based successful-task economics; comparable capability history remains a gap.
- Adoption: current and expected business AI use, followed by supporting macro momentum.
- Utilization: spending and physical capacity; installed compute and training examples do not establish paid utilization.
- Monetization: lab revenue/run rates and the supporting traffic-price-return comparison; populations are not matched.
- Capital Return: consolidated/incremental ROIC, cash funding and illustrative training-cost recovery.

The industry map, financial quality and credit indicators provide supporting context. This reorganization does not add data or turn existing assumptions into observed utilization or AI-specific returns.


The main heatmap uses methodology-v2 normalized scores from July 2025 through June 2026. The pinned core line, pillar composites, constituent values and ranking all use the same generated score snapshot. Score colors refer to historical norm 50; they do not color raw growth. Selected pillar min–max shading uses actual normalized constituent scores on a shared 0–100 scale. See the treatment table and baseline limitations below.

China remains supplementary under Investment rather than being mixed into the normalized core heatmap. Macro short-term growth charts remain clearly labeled supplementary momentum and do not determine heatmap colors. Core pillar detail immediately follows the heatmap. Raw quarter-end alignment is retrospective and does not imply publication at the quarter's start.

Each of the 16 analytical sections ends with the same numbered footnote format: (1) Data source and reliability, (2) Methodology, (3) Scope and other necessary information. The shared notes component keeps source links, evidence qualifications, assumptions and limitations together; detailed accounting calculations remain available within the relevant methodology notes.

The editorial layout leads each analytical section with observations and investment implications. Repeated introductions and chart-level disclosure blocks are removed; source qualifications, calculation rules and scope limits are consolidated in numbered footnotes. Chart units, dates, estimates, partial periods and scenario labels remain visible to support accurate reading. The final reference section groups its source register, formulas and remaining limitations within the same footnote structure.

### Color semantics

Blue and white define the interface and ordinary chart series. Positive signals use green; negative momentum uses yellow for mild declines above −3%, orange for declines above −10%, and red for declines of −10% or worse. Exact zero and missing observations are neutral, with missing values still labeled unavailable. Core scores use their existing 50-neutral scale rather than growth thresholds. Categorical series colors do not imply investment direction. Signed values, accessible labels and legends supplement color.

## Pillar-centered research structure

The main research reading order is Adoption, Demand, Investment, Imports and Financial. Investment brings together equipment orders/construction and hyperscaler CapEx, capacity and training costs. Financial groups cash absorption, incremental cash coverage, ROIC, the usage/returns comparison, financial resilience, credit/leverage and bond issuance. Financial is a supplementary research chapter, not an additional index weight. The official five pillars (Adoption, Demand, Investment, Imports, Hyperscaler CapEx) retain their separate 20% weights in the score and heatmap. Do not substitute chip-user capacity estimates for token consumption or infer market-wide utilization from routed traffic.

### Evidence-card layout

Use individual charts or tables as grid units through `EvidenceCard`. Chart cards share a 300px display area on desktop (280px on mobile) with aligned headings and footnotes. Use at most three columns, then two and one as width narrows. Comparison tables and the industry map span the row. Section highlights precede the chart grid; interpretation belongs to the pillar introduction. Full component views remain in expandable data/assumption disclosures. Verify actual card bounds and document overflow in the browser after layout changes.

Subsection display rules: keep charts and their comparison tables in reading order, with disclosures at the end. Investment follows commitments/spending → delivered capacity → training economics; Financial follows cash generation/absorption → capital productivity → resilience/funding. Every chart with multiple series, shading or marker categories must show a visible legend in its compact card. Legends must use the actual series colors and identify bands and point shapes; do not rely only on hover text or the expanded view.

## Core score methodology v2 (October 2026 revision)

The main score, heatmap colors, pillar summaries and constituent attribution all use the same generated `core-contribution-snapshot.ts`. Generate with the bundled Python runtime: `scripts/build-core-contributions.py --input PATH/Indexlist.xlsx.inspect.ndjson`.

| Constituent type | Core scoring signal | Supplementary short momentum |
|---|---|---|
| Current / expected adoption | Percentage level | Monthly percentage-point change |
| DRAM exports, equipment orders, imports | Latest 12-month sum / preceding 12-month sum − 1 | 3-month-average YoY growth |
| Construction and high-tech production | Latest 12-month average / preceding 12-month average − 1 | 3-month-average YoY growth |
| Company CapEx | Latest four-quarter sum / preceding four-quarter sum − 1 | Quarterly spending retained in Investment |

Annualized rates and index levels are averaged, not labeled annual totals. Constant scaling does not change the growth ratio. Nominal price effects and unconfirmed source definitions remain limitations. Source prior-value fills are retained as source observations; never silently fill additional gaps. Only complete consecutive windows are used.

Each signal is standardized using its fixed full history of valid transformed observations through June 2026 and sample standard deviation. Score = clip(50 + 15 × z, 0, 100). This is explicitly retrospective, not a real-time backtest. Adoption has a longer baseline than TTM flow signals; combined hyperscaler CapEx has only seven usable annual-growth observations. Longer raw history is needed for a robust production calibration. The current source provides complete revised core scores from November 2024 to June 2026; earlier composite scores are withheld under v2, while available constituent signals are tracked from January 2024. Heatmap colors interpolate continuously from red through neutral 50 to green; each constituent uses its own historical baseline. Missing signals remain blank and do not block other rows. Dotted quarterly pillar lines identify the assumption of carrying a quarterly observation across its months; they are not monthly measurements.

Five pillars retain 20% each; macro constituents receive equal weights within their pillars, while combined hyperscaler CapEx is one signal with 20% weight. Missing signals withhold the core; no missing-weight reallocation. Quarterly aggregate CapEx scores are held across their quarter for historical alignment, not claimed known in advance. Contributions versus 50 and monthly changes must reconcile exactly to the revised score. Legacy history is preserved only for methodology comparison, not used to calculate current colors or rankings. China, OpenRouter and Financial remain supplementary.

June 2026 revised score (v2.1): 73.57256056223142 (73.6 displayed), versus legacy 69.3. The legacy calculation window was unavailable; this revision creates a fully reproducible new methodology rather than forcing a match.

CapEx aggregation (v2.1): sum Microsoft, Alphabet, Meta, Amazon and Oracle spending in the current trailing four quarters, divide by their summed spending in the preceding four quarters, then subtract one. Normalize that single aggregate growth signal for the 20% CapEx pillar. Company growth rates remain supporting detail and are not averaged. Consolidated spending retains the underlying company accounting definitions and is not AI-only CapEx.

### Amended demand, benchmark credit and sector financing

Refresh the supplementary charts directly from the current workbook (the workbook is read only):

```sh
/Users/linyu/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/build-workbook-amendments.py --input /absolute/path/Indexlist.xlsx
```

The generated `workbook-amendments-snapshot.ts` records the workbook SHA-256 and source dates. DRAM/NAND export values and TSMC monthly revenue supplement Demand without silently changing index weights. Monthly YoY and trailing-12-month YoY comparisons use matched source history, leaving gaps where unavailable. September macro values may be carried from August; the chart ends in August 2026. TSMC history begins July 2024.

Credit charts use daily issuer observations and IBOXUMAE Curncy through September 22, 2026. Relative widening equals basket spread change minus IG benchmark change from December 31, 2025. Fixed baskets use latest ratings (September 30) retrospectively; S&P is preferred, then Fitch, then Moody’s. Overall and sector distribution charts include covered below-IG issuers; rating groups distinguish them explicitly. General IG is not a rating- or sector-matched benchmark. Calendar observations include prior-value carries. Original value-chain/overlay credit signals retain their separately labeled September 16 vintage.

Bond issuer-month records are grouped into analytical supply-chain sectors, with an explicit Unclassified bucket for unmapped tickers (currently ZENLIN). Observed monthly totals, sector shares and issuer detail reconcile. December 2025 has no records and remains a gap. No complete rolling-year or YoY claim is made; September completeness is not certified. Amounts follow the existing workbook USD-equivalent convention; no currency conversion is introduced. Issuer sectors do not establish AI use of proceeds.

The heatmap’s Demand drilldown includes an updated DRAM/NAND/TSMC growth table with monthly YoY and trailing-12-month switches. Actual growth percentages appear in cells; continuous colors use each row’s displayed historical minimum and maximum, separately from official normalized scores. It is initially visible and reopens when Demand is selected.

Credit distribution charts show daily issuer minimum–maximum bands, median lines and the general IG benchmark for the overall basket, all sectors together and all rating groups together. Ranges are cross-issuer dispersion, not confidence intervals. Single-member groups collapse to a line. Complete fixed-cohort coverage is required; missing inputs split lines and bands. Vertical scales are labeled individually.

Sector and rating credit charts display every group simultaneously, with a distinct median line and lightly shaded min–max band for each. A dashed general IG line appears once per chart. Legend buttons emphasize a group without removing others.

Adoption displays raw percentage levels from the same constituent snapshot as the core heatmap, from January 2024 through June 2026. Its lines split at the November 2025 survey wording change. Summary cards use the same June vintage. Adoption, token consumption and successful-task cost are three equal-width desktop chart cards, with shared plot heights and responsive wrapping.

Credit plots have taller 380px display areas. Default: issuer change minus IG change from end-2025, with a central 25th–75th percentile band. Changes are calculated per issuer before aggregating medians and ranges. Full min–max bands and actual spread levels remain selectable. Quantiles use linear interpolation; central bands exclude the outer 50% and are not confidence intervals.

Research layout: equipment imports are grouped within Demand alongside memory exports, TSMC revenue and frontier-lab revenue. The industry value-chain map is supporting context within Investment. The core index still has five separate 20% weights, including Imports; this presentation change does not combine or recalculate scores. Main research chapters are Adoption, Demand, Investment and Financial.

Methodology v2.2: run `python3 scripts/update-demand-core.py`. Preserved v2.1 inputs live in data/core-v2.1.ts; new Demand uses current workbook-amendments-snapshot plus official TSMC January 2023–June 2024 backfill. DRAM, NAND and TSMC each carry 20%/3, TTM YoY normalized to their own valid transformed history through June 2026. TSMC has only 19 baseline observations, December 2024–June 2026; disclose this short baseline. Missing constituents withhold the composite, without reweighting. Other pillar calculations remain unchanged. June core is 69.3 and Demand 71.8. The old build-core-contributions.py produces the legacy v2.1 stage; update-demand-core.py must run afterward for the published v2.2 snapshot.

The core heatmap extends through September 2026 from current workbook observations. Scoring baselines remain fixed through June. Missing monthly observations and unavailable Q3 CapEx stay blank; no quarter is carried forward beyond its own quarter. Headline score and pillar cards refer to the last complete composite month. Workbook PREV-filled source cells remain a source-vintage limitation.

Score interpretation: 50 is the historical baseline reference, not a validated expansion/contraction boundary. The core uses clipped rescaled z-scores, not percentiles. Describe readings as above/below historical norm and changes as strengthening/weakening. Reserve tightening for financial/credit conditions.
