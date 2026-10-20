# Shared data pipeline and research changes

Last reviewed: 20 October 2026. This guide describes the current local implementation. Its presence in a working tree does not mean it has been committed or pushed.

## Storage and ownership

The website checkout contains application code and generated dashboard snapshots. The portable OneDrive `AI_Index` folder contains `Indexlist.xlsx`, the canonical `pipeline/` implementation, source datasets, research inputs, versioned methodology, generated snapshots, build manifests and recovery copies. Resolve it with `AI_INDEX_DATA_ROOT` or the OneDrive discovery implemented in `scripts/_shared_pipeline.py`.

OneDrive synchronization and GitHub synchronization are separate operations. The shared folder is not currently a Git repository. A versioned source mirror now lives in this repository under `pipeline/`; the runtime adapters still execute the shared-folder copy. The website's Python entrypoints now delegate to that shared pipeline; a GitHub checkout alone cannot rebuild the data. Generated TypeScript snapshots let the website display accepted data, but do not replace source provenance or the canonical build code.

Keep Python environments, Node dependencies, caches and credentials outside OneDrive. Run one writer at a time; the pipeline lock is local, not a distributed synchronization lock. Let OneDrive finish before reading a new batch. OneDrive's completion state must be checked in its client; file presence alone does not prove cloud synchronization.

## Implemented changes

| Date | Change | Data treatment |
|---|---|---|
| Oct 15 | Split the Bloomberg workbook and portable pipeline | Retained Bloomberg tabs; moved Ramp, lab notes and task observations into standalone inputs. Original workbook backed up in shared storage. |
| Oct 15 | Separate collection, build and website sync | Collection stages candidates; builds process saved inputs; sync copies approved generated outputs. None of these publishes the website. |
| Oct 15 | Anthropic Q3 revenue observation | Stored USD 16.8B as media-reported quarterly revenue, with period/report dates and source URLs. Kept separate from ARR/run-rate history. |
| Oct 16 | OneDrive folder naming fix | Renamed two generated `aux` folders to `audits`; updated builders and verified unchanged file hashes. |
| Oct 16 | Cloud estimates and RPO | Added a cloud reference builder, preserving estimate flags, fiscal labels, source cells, formulas and workbook hash. |
| Oct 16 | Bloomberg CapEx projection | Added a separate conditional core projection through December 2027, retaining actual historical scores and fixed baselines. |
| Oct 16 | Actual/estimate display and heatmap | Actual chart lines are solid through June 2026; estimates are dashed. Heatmap estimate cells carry E. Visible horizon ends September 2026, one quarter after the latest complete actual core. Full forecast data remain available underneath. |

Other local work includes electricity/data-center capacity research. It is a supplementary infrastructure view, not an additional core weight. Its research plan and inputs remain in the shared data folder.

## Current input locations, relative to the shared data root

| Input | Location | Refresh responsibility |
|---|---|---|
| Bloomberg cached values and query definitions | `Indexlist.xlsx` | Licensed Bloomberg refresh; remote Python access was reported but has not been configured/tested by this workflow |
| Ramp | `data/raw/ramp/latest/` | Public dashboard collector; undocumented filters may change |
| OpenRouter | `data/raw/openrouter/rankings-daily.json` | API collector; local environment key |
| Epoch / SWE-bench | `epoch_ai/`, `swe_bench/` | Existing public collectors; infrastructure releases still require review |
| Lab quarterly observations | `data/research/frontier_labs/quarterly_revenue.json` | Reviewed news observations with source links and qualification |
| Historical CapEx | `data/research/capex/quarterly_history.json` and `source_workbook.xlsx` | Reviewed company-specific accounting bases |
| Financing and task assumptions | `data/research/financing/`, `data/research/task_economics/` | Reviewed inputs, separate from Bloomberg |
| Baselines and accepted financial coverage | `data/reference/` | Deliberate methodology/publication review |
| Generated outputs and provenance | `data/derived/app/`, `data/derived/build-manifest.json`, `data/runs/` | Validated saved-input builds |

The machine-readable source registry and generated-file allowlist are `data/source_registry.json` and `data/generated_files.json` in shared storage. Bloomberg retrieval timestamps were not reliably recorded; workbook modification or local build time must not be presented as a new source refresh.

## Core projection definitions

The actual core has five 20% pillars and retains methodology v2.4, its June 2026 normalization baseline and missing-data rules. Latest complete actual score: June 2026, approximately 69.7251.

Post-June Bloomberg CapEx estimates come from `Supply Chain Financial Value`, not from cloud revenue/RPO. To bridge headline CapEx to the approved core's company-specific accounting bases, multiply each company's estimate by its June approved core CapEx / June source headline CapEx ratio. This fixed-ratio adjustment is a modeling assumption, not a Bloomberg lease-inclusive forecast.

Sum the five bridged estimates, calculate trailing-four-quarter total YoY growth, and apply the existing CapEx normalization and clipping. Conditional composite = June core + 0.2 × (estimated CapEx score − June CapEx score). Hold the other four pillars at June scores. Thus the dashed line is a conditional scenario, not a forecast of every pillar. Quarter scores are held across their constituent months; this is period alignment, not a real-time backtest. Missing estimates must fail rather than become zeros.

Cloud FA queries explicitly request estimates. Keep native fiscal labels; Oracle differs from the other displayed sequences. Revenue and RPO scopes are not interchangeable, so do not sum them or infer matched RPO/revenue ratios. Oracle revenue minus cost of revenue is shown as a gross-profit proxy, correcting the source row's operating-income label.

## Refresh and verification

From this website checkout, with the shared folder available:

```sh
npm run data:status
npm run data:build
npm run data:sync
```

For narrower saved-input builds:

```sh
python scripts/data-pipeline.py build --group cloud
python scripts/data-pipeline.py build --group projection
```

Use `PYTHON` to select the local runtime. Build and sync are independent from collection, Git commit/push, OneDrive synchronization, and hosted deployment. The website production build passed after the cloud and projection changes; value reconciliation, weighting identity, date horizon and actual/estimated separation were checked. Historical core scores were preserved.

## GitHub coverage and outstanding versioning gap

On 20 October, a successful fetch confirmed local HEAD and `origin/main` at `7c1d188` with zero committed divergence. There are local modified and untracked files, including the generated cloud/projection snapshots and data adapters. These changes are not on GitHub until committed and pushed.

Canonical runtime pipeline code and raw inputs live in shared storage. The portable code is now mirrored in `pipeline/`, registry/allowlist snapshots in `pipeline/config/`, and dated research change records in `docs/data-changes/`. A rebuild still requires separately provisioned private inputs; see `pipeline/README.md`. Do not publish the entire OneDrive folder or licensed raw workbook as an automatic substitute.

Detailed shared logs: `docs/CHANGELOG_2026-10-15.md`, `docs/ANTHROPIC_REVENUE_UPDATE_2026-10-15.md`, `docs/ONEDRIVE_SYNC_FIX_2026-10-16.md`, `docs/CLOUD_REFERENCE_UPDATE_2026-10-16.md`, and `docs/CORE_PROJECTION_2026-10-16.md` under `AI_INDEX_DATA_ROOT`.


## Validation for the October 20 push

Production build passed. The current data/application test selection passed 52 tests, including projection weighting and source-accounting bridge checks. Two legacy test files remain outside this passing selection: `rendered-html.test.mjs` has stale wording, metadata/date and map-count expectations; `research.test.cjs` expects a retired root `research.js` file. A full legacy-inclusive run is therefore not green. These pre-existing expectations were not silently weakened. The financing CSV test now honors `PYTHON` for Windows portability.
