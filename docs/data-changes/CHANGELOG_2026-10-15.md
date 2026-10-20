> Archived shared-data change record. Paths below are relative to the OneDrive AI_Index data root. For current operation see ../DATA_PIPELINE.md.

# 15 October 2026 — portable data and workbook separation

## Requested change

Keep most data in OneDrive for use across computers, retain only Bloomberg-related inputs in `Indexlist.xlsx`, separate public/researched data into script-updatable files, and document the new operating model.

## Implemented

| Before | After |
|---|---|
| 18-tab mixed-source workbook | 14-tab Bloomberg workbook; query definitions, lists and cached values retained |
| Ramp tab written through a one-time workbook appender | Standalone normalized JSON, original dashboard payload and response archives under `data/raw/ramp` |
| Task-cost assumptions embedded in workbook | `data/research/task_economics/observations.csv`; 13 original rows, ISO dates |
| OpenAI and Anthropic workbook notes | Separate CSV/JSON exports under `data/research/frontier_labs`; empty OpenAI sheet explicitly preserved as empty |
| OpenRouter raw cache only in website checkout | Canonical cache under `data/raw/openrouter`; environment credential for collection |
| Financing JSON/CSV only in website checkout | Canonical research records under `data/research/financing`; website JSON is a synced copy |
| Active CapEx source buried in historical outputs | Copy promoted to `data/research/capex/source_workbook.xlsx`; historical original retained |
| Builders depend on a page's embedded CapEx array | Portable quarterly history JSON for the core builder |
| Mac-specific data and interpreter paths | Portable `pipeline/` code plus optional per-machine environment settings |
| Generated snapshots only in local application | OneDrive `data/derived/app`, with explicit local website sync and backups |
| Stale saved workbook inspection used by heatmap | Fresh cached-XML export during each saved-input build |
| Cash/ROIC extractor files missing from canonical website | Restored portable builders, numeric Excel date support and explicit publication coverage |

Existing Epoch and SWE-bench folders remain in place to avoid unnecessary moves and broken research references. Website dependencies remain local. No scheduled automation was created.

## Data preservation and numerical effects

The removed tabs are `Cost Useful Task`, `OpenAI`, `Anthropic` and `Ramp AI Data`. The original workbook was backed up before editing. All 14 retained worksheet XML parts are byte-for-byte identical to the original. Styles, shared strings, external links and Bloomberg formula caches were preserved. Only sheet membership, associated removed parts and related workbook metadata were changed. Unused shared strings may remain in the package to avoid rewriting retained cells.

The spreadsheet tool's documented API did not expose sheet deletion. A narrow OOXML package edit was used instead, with dependency checks and package/worksheet verification. Bloomberg formulas were not recalculated outside Bloomberg.

The Ramp transfer contains 44 monthly rows and 8,556 detail rows as recorded in the preparation evidence. The legacy note exports preserve text without upgrading it into confirmed revenue observations. Task dates were normalized from numeric Excel serials to ISO dates; monetary estimates were not revised.

Index v2.4 scores/weights, Ramp inputs, tokens, task-cost economics, published cash values, equity/credit figures, lab snapshots and infrastructure figures remain numerically unchanged. Cash/ROIC source-cell locations now point to the current workbook rows. The explicit coverage reference preserves formerly withheld periods/fields even where the current workbook contains additional values; expanding coverage requires accounting/period review.

Two sets of saved-data corrections were identified. Eight ROIC inputs differ from the old snapshot: two Alphabet debt observations and six NOPAT observations across Alphabet, Amazon and Meta. The restored builder now reads those current saved workbook values; this can change their calculated ROIC slightly. MSFT and the published Oracle cutoff retain their tested values. The 75 numeric source-row changes are location corrections, not financial values.

For the macro heatmap: 14 numeric fields changed because its old extraction was stale relative to the saved workbook. For example, the construction level previously read as 70,755 now reads 72,695, and its displayed monthly change moves from 7.7% to 10.7%. The corresponding Investment pillar heatmap value changes from 13.4 to 14.0. These are saved-workbook reconciliation changes, not fresh external observations or a change to core normalization. Historical core baseline provenance remains distinct from the refreshed heatmap provenance.

## Validation

- Full source workbook backup and sheet-dependency inspection before removal.
- Retained worksheet byte comparison, ZIP integrity, removed membership and associated-part checks.
- Successful build of all 16 main saved-input processing steps, with pre-promotion coverage/weight/missingness checks.
- Ramp cached payload successfully normalized without reading or writing Excel.
- 49 website tests passed, including rendered output, core, Ramp/tokens, cash/ROIC, infrastructure, task economics, equities, credit and issuance.
- Website production build passed; existing large-bundle warnings remain.
- Financing CSV candidate passed validation and reconciliation: no changes or warnings.
- Full rebuild after relocation to a different folder with spaces, using a working directory outside the project. Eight key snapshots matched exactly.
- No live Bloomberg refresh, authenticated OpenRouter fetch, fresh news underwriting or actual macOS execution performed.

Detailed evidence is in `backups/2026-10-15-portable-migration/`: `preparation.json`, `workbook-verification.json`, `snapshot-comparison.json`, and `portability-verification.json`. Build logs and manifests are under `data/runs/` and `data/derived/`.

## Remaining work, outside this migration

Physical-infrastructure and AI-company dataset downloads still need recurring collectors. The core still uses versioned historical bases and fixed cutoffs. Some website CapEx/narrative constants and dated PDF scripts still require coordinated updates when their data changes. These limits are recorded in the [refresh guide](DATA_PIPELINE.md); this change does not claim a fully automatic research or publishing process.
