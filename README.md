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
