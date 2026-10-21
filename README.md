# AI Investment Atmosphere — canonical local website

Current data architecture and changes are documented in [Data pipeline](docs/DATA_PIPELINE.md). This covers the OneDrive source split, Bloomberg estimates, conditional composite, actual/estimate display rules and GitHub reproducibility limits. Older dated sections below describe historical vintages; use the current guide for operating instructions.

## Workspace rule

This folder is the canonical local website workspace. Keep application components, tests, package files and installed dependencies here, outside OneDrive. Canonical data collectors/builders now live in the synced OneDrive AI_Index/pipeline folder; this checkout contains lightweight compatibility adapters.

The OneDrive `AI_Index` folder is authoritative for Bloomberg inputs, public/researched data, methodology references, portable refresh code and generated snapshots. See its `README.md`, `docs/DATA_PIPELINE.md` and `docs/CHANGELOG_2026-10-15.md`. Never install `node_modules`, package caches or other website dependencies in OneDrive. Merge approved application changes into this Projects workspace before running or reviewing the page.

Publish from the complete canonical local application, including circular financing and value distribution. Sync application source and public assets to the configured local publishing checkout before publishing; preserve its hosting, Worker and build configuration. Do not assemble a partial page from an older Sites version. Market groups equity returns, CDS and bond financing; Financial retains operating cash generation and capital returns.

The last self-contained HTML export is preserved under `static-output/`. It is an output artifact and is not the source used by the local development server.

## Shared data workflow — 15 October 2026

The workbook is now Bloomberg-only. Ramp, task observations, lab notes, OpenRouter and financing research live in separate files in OneDrive. Set `AI_INDEX_DATA_ROOT` on this computer if automatic OneDrive discovery does not find the shared folder. Keep credentials in the local environment only.

```sh
npm run data:status
npm run data:build
npm run data:sync
```

Use `PYTHON` to select the local Python environment. Collection, saved-input build and website sync are separate operations. `data:sync` installs only generated data and accepted financing records into this checkout; it does not publish. Older `scripts/*.py` data entrypoints delegate to the shared implementation and write OneDrive outputs, so follow them with `data:sync` when updating this website.

The shared refresh guide is authoritative for all data commands below. Historical methodology descriptions remain useful; their dates describe stored vintages.

## Included analysis

Refresh equity returns and USD market caps with `python3 scripts/build-supply-chain-stock.py`. The importer reads interleaved return/cap columns. Market chapter sector performance compounds daily returns weighted by lagged USD caps; treemap area uses latest caps. The three Asian listings with missing opening caps use first available cap proxies, with their partial opening return coverage disclosed. Do not retrospectively weight the historical series with today’s caps. Equal weights remain a comparison option.

Refresh monthly US IG issuance alongside covered-company issuance with `python3 scripts/build-workbook-amendments.py --input /path/to/Indexlist.xlsx`. The ratio is relative issuance scale until the numerator also filters US country of risk and issue-level IG rating; it is not an exact US IG market share. Missing covered months and benchmark-only partial months do not become zero percentages.

Refresh the wide quarterly financial sheet with `python3 scripts/build-value-chain-financials.py`, then `python3 scripts/build-supply-chain-stock.py`, using the bundled Python runtime. Net debt/EBITDA requires four consecutive quarterly EBITDA observations. Revenue and positive CapEx spending growth compare the same quarter a year earlier. Do not reuse single-quarter leverage or period-to-period growth. CDS alignment is retrospective because report publication dates are unavailable. The importer reads raw cached numeric XML to avoid corrupting revenue cells with incorrect date formatting.

The application contains the interactive pillar heatmap, AI value chain, atmosphere pulse, global hyperscaler CapEx, Frontier Labs, demand-to-returns conversion, cash sustainability, ROIC, financial resilience, credit conditions, bond financing and methodology sections.

## Run locally

Install dependencies once:

```sh
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

Refresh the separate buyer-side cost-per-successful-task analysis after updating `data/research/task_economics/observations.csv` in the shared data folder:

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
python scripts/data-pipeline.py build --group bloomberg
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


## Ramp integration — methodology v2.3 (13 October 2026)

The active core snapshot adds observed paid adoption and nominal spending intensity from the standalone Ramp public-data files in OneDrive. The previous v2.2 snapshot is preserved in the shared `data/reference/core-v2.2.ts` for comparison. All headline scores, heatmap cells, pillar summaries and contribution rankings read the new shared snapshot.

- Adoption retains 20% overall, split equally between current BTOS use, expected BTOS use and Ramp paid adoption (6.6667% each). Ramp paid adoption uses its percentage level, calibrated on 42 monthly observations from January 2023 through June 2026. Ramp's business sample differs from Census surveys.
- Demand retains 20% overall, split equally between DRAM exports, NAND exports, TSMC revenue and Ramp spending intensity (5% each). Ramp intensity is `(mean of last 3 monthly median spending observations / mean of corresponding 3 months a year earlier - 1) × 100`. This averages monthly medians, not business-wide total spending. Only dashboard Overall spending from September 2023 is used; earlier Filter ALL observations are excluded. The transformed baseline contains 20 observations, November 2024–June 2026. Nominal prices, model mix and sample composition affect spending. It does not measure returns.
- Other constituents retain their v2.2 scores and baselines. All five pillars still weigh 20%. Scores remain clipped rescaled z-scores using sample standard deviation, calibrated retrospectively through June 2026. Missing observations withhold the composite without reweighting or extrapolation.
- Ramp source ends August 2026. September Ramp heatmap cells remain blank. June remains the last complete composite, revised from 69.3002 to 69.9236 (+0.6234 index points). This is a methodology revision, not a newly observed monthly increase.
- Provider/sector adoption, AI share of payment volume, token traffic and other spending percentiles are supporting data, not extra core constituents. Provider adoption overlaps and must not be summed.
- The source was retrieved 13 October 2026 from the public Ramp dashboard. Website JSON filters are undocumented. The supported adoption API requires credentials. No live refresh is implied. Source S14 documents definitions and access.

Regenerate the original core and hardware-demand stage first, then run `scripts/integrate-ramp-core.py --input PATH/data/raw/ramp/latest/normalized.json` with the bundled Python runtime. Repeated Ramp runs use the preserved v2.2 input, so they do not compound weight changes. The builder validates source-month continuity when computing YoY spending and records the standalone Ramp source SHA-256 separately from existing macro-source vintages.


## Token volume and high-frequency view — methodology v2.4 (13 October 2026)

The active core now includes separate OpenRouter and Ramp token-volume signals. OpenRouter is public routed traffic; Ramp is the published model-token series for businesses using its Token Spend Management product and connected provider usage data. The collection mechanisms differ, but customer overlap cannot be measured. Neither source is market-wide demand, and their totals are not added. Ramp's TSM sample is separate from its broader paid-adoption sample. Tokenization, caching, reasoning intensity and sample composition affect interpretation.

Demand remains 20% of the core: OpenRouter and Ramp token volumes receive 5% each, while DRAM, NAND, TSMC and median spending receive 2.5% each. Adoption remains three equal constituents within 20%. Other pillar weights are unchanged. The pillar heatmap now uses weighted constituent sums, consistent with headline scores and attribution. The previous v2.3 snapshot is preserved in `data/core-v2.3.ts`.

For each core calendar month, both token series use the same four completed Monday–Sunday weeks ending on that month's last Sunday. OpenRouter is the exact sum of 28 daily buckets divided by 28. Ramp is the sum of four published, non-overlapping model-token weekly totals divided by 28. Require 28/28 OpenRouter days and 4/4 published Ramp weeks for a matched observation. This is an explicitly dated 28-day sampling window, not a calendar-month token total or proof of complete firm coverage. No week is prorated, no missing day is imputed and no partial month is scaled up. The rest of the core retains its existing slower-frequency rules.

The natural log of each source's positive average daily token volume is normalized to that source's own fixed matched-month baseline through June 2026. Log levels temper the rapidly expanding scale without presenting a short, unstable YoY-growth baseline. Each baseline has only 15 observations, February 2025–June 2026 with gaps, and remains provisional and retrospective. June's revised core is 69.7251, compared with v2.3's 69.9236. A methodology revision is not a newly observed monthly change. This is an activity score, not a bubble-pressure or profitability score.

Complete v2.4 core history begins February 2025. June–July 2025 are withheld because the matched OpenRouter windows include the missing 15 June and 15 July buckets. Earlier v2.3 history remains in its archive, not spliced into a differently defined current score. Later incomplete macro/CapEx periods remain blank. The last complete core month remains June 2026.

The standalone Token activity section provides weekly comparisons for both sources and actual daily OpenRouter volume/change. Source/history/metric controls do not change core weights. Weekly changes require consecutive completed weeks. Missing days/weeks break lines. Partial weeks are excluded and disclosed. Ramp's daily `tokenPrices` fields are overlapping seven-day totals for a narrower two-provider sample; these are neither summed nor treated as actual daily volumes. The raw weekly model-volume data is the Ramp core source.

Cached source dates: OpenRouter through 6 October 2026 (snapshot 7 October); Ramp weekly model volume through 27 September 2026 (public page retrieved 13 October). An unauthenticated OpenRouter refresh returned HTTP 401 and no credential is configured. The high-frequency panel displays source timestamps and does not imply a live feed. Ramp website routes are undocumented. No new automation or deployment is configured.

Generation order: existing core/hardware stage → `scripts/integrate-ramp-core.py` → `scripts/integrate-token-core.py`. The token builder accepts `--ramp-input PATH/dashboard-data.json` and `--token-weight 0.10`; reruns start from the preserved v2.3 input rather than compounding weight changes. Tests reconcile daily source sums, missing-window treatment, source-specific weekly gaps, fixed baselines and weighted core attribution.

## Current refresh and spending methodology

The accepted composite is [v2.7 nominal spending growth](docs/data-changes/ADOPTION_V2_7_2026-10-21.md). [Refresh instructions](docs/data-changes/AUTOMATED_REFRESH.md) cover collection, validation and website sync. The Adoption spending chart supports indexed, dollar and growth views.

Pipeline fixture-based tests require the provisioned private data root via `AI_INDEX_DATA_ROOT`; workbooks, credentials, raw research inputs and run logs remain outside this repository.
