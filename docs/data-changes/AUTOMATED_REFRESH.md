# Whole-website refresh runner

Implemented 21 October 2026. Entry point: `pipeline/refresh.py`, also exposed as
`python pipeline/run.py refresh`. It composes the existing source collectors,
all-group dependency graph, validators and allowlisted website sync.

## Run

From this data folder, using the local Python environment with the pipeline requirements:

```powershell
# Inspect the exact plan: no writes or network calls.
python pipeline/refresh.py --dry-run

# Collect all five supported sources, then build and validate all page snapshots.
python pipeline/refresh.py

# Also install validated snapshots into an existing local website checkout.
python pipeline/refresh.py --web-root "C:/path/to/local/ai_index"

# Explicitly keep saved OpenRouter data when an API credential is unavailable.
python pipeline/refresh.py --skip-openrouter

# Rebuild all pages from saved inputs; no external requests.
python pipeline/refresh.py --saved-only

# Collect only selected sources, then rebuild every page from the combined inputs.
python pipeline/refresh.py --sources ramp pricing --web-root "C:/path/to/local/ai_index"
```

The existing website adapter accepts `node scripts/data-pipeline.mjs refresh --web-root .`.
Reinstalling adapters with `pipeline/install_website.py` adds `npm run data:refresh`.
The script does not require a website path when only updating the shared data.
Supply `OPENROUTER_API_KEY` in the local process environment; never put it in shared files.

## Mechanism

1. Load the source registry and construct the plan. Acquire the same local lock as
   individual collect/build/sync commands for the entire execution.
2. Preflight the OpenRouter credential and optional destination checkout.
3. Collect Ramp, OpenRouter, Epoch models/hardware/benchmarks, Epoch prices and
   SWE-bench sequentially. Each existing collector stages files and preserves
   overwritten inputs in its own run folder. Default: two attempts per source;
   `--attempts 1`, `2` or `3` controls retries, with a two-second delay. Each
   attempt has a hard 180-second process deadline; use `--source-timeout 300`
   for slow connections. The deadline kills the collector and prevents staged
   files from being promoted. Public downloaders use explicit connection/read
   timeouts and the requests HTTP client (already in pipeline requirements).
4. Run `build --group all` internally: build candidate snapshots in dependency
   order, validate, record hashes and promote accepted generated data.
5. If supplied, sync only allowlisted data to the website and retain replacement
   backups. Collection or build failure prevents this step.
6. Write `data/runs/refresh-<UTC timestamp>/result.json` with stage statuses,
   attempts, saved-source boundaries and the successful build manifest.
   Stage starts, retries and log paths print immediately to the console. The
   report records the active stage before the network request starts.
   Existing collector/build folders contain detailed logs. Exit code 0 means
   success; a nonzero code means failure or a lock/preflight error.

Raw collections are accepted per source, not as one transaction. If a later
source fails, earlier collected inputs remain available, but this execution does
not proceed to build or sync. Rerun after resolving the error. Sync is a backed-up
file-copy operation, not an atomic directory switch; interrupted sync can leave
mixed files and should be rerun or restored from the website-sync backup.
Preflight and lock errors occur before a refresh report is created; capture the
scheduler's console output as well. A forcibly terminated run may retain its lock
and a `running` report. Confirm no active process before removing a stale lock.

## Coverage and freshness

Automatic collection covers the five implemented collectors only. Every page's
builder runs, but Bloomberg workbook values, physical infrastructure, pinned
buildout vintages, CapEx, lab disclosures, financing, task assumptions, methodology
and the electricity research workflow retain their previously accepted inputs.
The report names these manual or separate-workflow sources. No research claim,
publication cutoff, core weight or financial definition is automatically accepted.
`--skip-openrouter`, `--sources` and `--saved-only` explicitly reuse the other
saved inputs; success never means every source observation is current. Consult
source metadata and the build manifest for dates and provenance.

## Unattended execution

This script is ready for an operating-system scheduler; no recurring job is
installed by creating it. On Windows, configure Task Scheduler with:

- Program: the absolute path to the local environment's `python.exe`.
- Arguments: `"C:\Users\yulin\OneDrive\AI_Index\pipeline\refresh.py" --web-root "C:\path\to\local\ai_index"`.
- Start in: `C:\Users\yulin\OneDrive\AI_Index` (optional; paths resolve independently).
- Environment: provide the API credential locally to the account running the task.
- Settings: do not start another instance; run on one computer only; ensure this
  OneDrive folder is available offline and synchronized before execution.

Choose the actual interval and local checkout path when installing the job.
For macOS/Linux use the same Python invocation with absolute paths in the local
scheduler. Dependencies and credentials belong outside OneDrive. OneDrive does
not provide a distributed lock across computers.

Website compilation, tests, commit/push and hosted deployment remain separate
steps after data sync. This runner updates the website's data inputs; it does
not publish the hosted site or refresh licensed Bloomberg Excel queries.

## Verification

`python -m unittest discover -s pipeline -p test_refresh.py` checks successful
stage order, collection retry exhaustion, recovery from transient failures,
validation failure blocking sync, credential preflight, a write-free dry run,
active-stage reporting, timeout validation and no promotion after a deadline.
These tests use temporary inputs and mocked collectors; live endpoint health is
not certified by them.

## Troubleshooting fixes verified on 21 October 2026

A live `--skip-openrouter` run exposed slow/stalled HTTP downloads and a changed
Epoch pricing asset name. Public collectors now use requests with explicit
connection/read timeouts; collection attempts also have a hard process deadline.
The pricing resolver supports both the previous organizationLogos asset and the
current models asset. Progress and active-stage reports are written immediately.

Live collection was subsequently successful for Ramp, Epoch datasets, Epoch
pricing and SWE-bench across troubleshooting runs. The final all-page build and
validation succeeded against the refreshed inputs. OpenRouter retained saved
inputs; no website sync or publication was performed. Thirteen regression checks
passed, including actual stalled-child termination and old/new pricing layouts.
Detailed successful final build: `data/runs/20261021T083451953183Z/`.
