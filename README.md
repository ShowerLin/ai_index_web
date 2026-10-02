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


The momentum heatmap uses monthly columns from July 2025 through June 2026. Adoption, Demand, Investment and Imports show equal-weight constituent MoM changes from the saved Index Price Value inspection. U.S. and China CapEx retain QoQ changes, repeated unchanged in all three months of each quarter. This historical alignment does not imply the quarter was known at its start. The official atmosphere score is unchanged.

Regenerate macro heatmap data with `python scripts/build-monthly-heatmap.py --input PATH/Indexlist.xlsx.inspect.ndjson`.


The core index chart and its monthly score row sit with the pillar heatmap. Selecting a pillar reveals historical constituent growth on the same calendar, including each U.S./China company's quarterly CapEx held across the quarter. Core pillar detail immediately follows the heatmap. China and newer traffic, revenue, task-cost and physical-capacity evidence are supplemental and do not change core weights. Normalized YoY core scores are distinguished from raw MoM/QoQ heatmap changes.


The monthly heatmap and selected historical chart share a row on desktop. Heatmap cells are color-only with accessible labels and hover values. Selecting a pillar charts its growth composite with constituent min–max shading; detailed historical values are collapsed below. The official core index uses its normalized score history and has no inferred band, because normalized historical constituent scores are unavailable. Layout stacks on smaller screens.

The official core-index line remains visible for every category selection on a fixed 0–100 left axis. Selected pillar growth and constituent range use the separately labeled right axis.

Each of the 16 analytical sections ends with the same numbered footnote format: (1) Data source and reliability, (2) Methodology, (3) Scope and other necessary information. The shared notes component keeps source links, evidence qualifications, assumptions and limitations together; detailed accounting calculations remain available within the relevant methodology notes.

The editorial layout leads each analytical section with observations and investment implications. Repeated introductions and chart-level disclosure blocks are removed; source qualifications, calculation rules and scope limits are consolidated in numbered footnotes. Chart units, dates, estimates, partial periods and scenario labels remain visible to support accurate reading. The final reference section groups its source register, formulas and remaining limitations within the same footnote structure.

### Color semantics

Blue and white define the interface and ordinary chart series. Positive signals use green; negative momentum uses yellow for mild declines above −3%, orange for declines above −10%, and red for declines of −10% or worse. Exact zero and missing observations are neutral, with missing values still labeled unavailable. Core scores use their existing 50-neutral scale rather than growth thresholds. Categorical series colors do not imply investment direction. Signed values, accessible labels and legends supplement color.
