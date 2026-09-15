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
