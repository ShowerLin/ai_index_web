# Shared data pipeline and research changes

Last reviewed: 25 November 2026. The current dashboard uses methodology v3.6. Dated October sections below describe earlier versions; the current section takes precedence.

## Current dashboard — 25 November 2026

The application renders accepted, versioned TypeScript snapshots. Its normal build and page refresh do not require MySQL or company-network access. The optional `build:mysql` command exports one complete database run at build time; refreshing database rows does not change an already-built website. Rebuild and restart/deploy to install a new accepted data run. Source collection, saved-input builds, local synchronization, GitHub pushes and hosted publication remain separate actions.

Methodology v3.6 has four pillars with 25% nominal weight each.

- Adoption uses three breadth rates (BTOS current use, BTOS expected use and Ramp paid adoption), sharing 12.5% nominal core weight, and separate OpenRouter and Ramp token-volume signals at 6.25% each. The constituent heatmap shows month-over-month growth in the trailing three-month average. Each growth comparison requires four consecutive monthly inputs. Both sources use the same score curve, `50 + 50 * g / (50 + abs(g))`, with `g` expressed as a percentage. Zero growth gives 50, 50% growth gives 75 and 100% growth gives 83.3.
- Monetization uses business paid demand (Ramp median spending, Ramp matched spending growth and OpenRouter estimated spending growth, each 5%), consumer card spending (5%) and absolute annualized OpenAI/Anthropic revenue levels (sharing 5%). Lab news dates and revenue definitions are retained; available observations carry forward with provenance. Lab calibration is provisional.
- Hyperscalers uses the company-aligned trailing-four-quarter CapEx signal. Infrastructure retains its physical-demand and equipment constituents. DDR5 and H100 each use their own frozen hardware-price calibration.

The headline shows the latest available scored month. Readings after the approved four-pillar month are provisional and display their pillar coverage. The conditional CapEx composite holds Adoption, Monetization and Infrastructure at their June scores: June core + 0.25 × (conditional Hyperscalers score − June Hyperscalers score). It is a separate scenario, not an actual refreshed reading for all four pillars. The Hyperscalers row and its constituent history mark CapEx scenario scores with E. The weekly pulse keeps its own four-week scoring windows and equal weight per available signal.

Adoption places the Ramp token-volume index beside OpenRouter model volumes. OpenRouter uses stacked bars, absolute/percentage views, daily or complete-week ranges and model rankings. The daily feed names its top 50 models and supplies an aggregate Other row. Unnamed activity remains in Other; missing source days stay gaps, and incomplete weeks are withheld. Model-level allocations reconcile to the existing aggregate token signal without creating an extra score weight. Run `build --group core` or `build --group tokens` to regenerate `openrouter-model-snapshot.ts`, then sync the accepted output.

Monetization contains the spending and token-pricing panels. Nominal spending uses independent OpenRouter USD and Ramp index axes. Bloomberg token prices and OpenRouter model-weighted catalog prices are pricing context rather than extra core constituents. The Adoption analyst review precedes its rate chart.

The frozen configuration files are mirrored under `pipeline/config/`; source collectors/builders and UI installation adapters are mirrored under `pipeline/`. Raw workbooks, downloaded source archives, credentials and dependencies remain outside Git. The offline dashboard export is `index.html`; the interactive application is under `app/`.

The accepted OpenRouter model dataset runs through November 24, and Ramp’s published token series runs through the week ending November 15. The monthly Adoption token scores carry forward the complete window ending October 25 into November. Each panel shows the source dates for its own inputs.

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

## Historical core projection definitions — v2.4, superseded

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
