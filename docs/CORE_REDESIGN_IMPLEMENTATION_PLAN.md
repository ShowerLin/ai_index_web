# Monthly index and weekly monitor — implementation plan

Recorded 2 November 2026. User authorized documenting the sequence and starting the definition/source audit. This is a proposed redesign, not an approved scoring-method change. Preserve the current v2.8 index while developing and comparing candidates.

## Objective

Organize research around Adoption, Monetization, Investment and funding (hyperscaler CapEx, cash flow and capital returns), and Infrastructure delivery. Cloud revenue and RPO belong primarily to Monetization, with links to hyperscaler funding. The user’s proposed section names and the final scoring taxonomy/weights still require agreement. Research sections do not automatically become weighted pillars.

Produce a monthly observed index and a weekly current-conditions monitor from a shared constituent dictionary. Keep weekly estimate revisions distinct from changes in reported activity. Do not infer that carried quarterly data are new weekly observations.

## Implementation sequence

1. **Approve the constituent dictionary.** Record each indicator’s pillar, definition, frequency, transformation, direction, source, release date, estimate flag and permitted holding period. Identify scoring versus contextual inputs and avoid double counting across pillars.
2. **Audit source readiness.** Verify actual/estimate separation, cloud fiscal alignment, FCFF inputs, RPO scope and infrastructure duplicates. Search prior decisions and saved Bloomberg definitions before asking the user to clarify. Do not relabel operating cash flow less cash CapEx as FCFF without verification.
3. **Build the monthly methodology.** Test historical coverage, overlapping signals, transformations and alternative weights. Equal pillar weights are a candidate, not an approved decision. Preserve v2.8 history; do not splice differently defined methodologies.
4. **Build weekly snapshots.** Capture Bloomberg forecast vintages, update weekly activity, and attribute each change to a new release, source revision or estimate revision. Compare the same forecast fiscal period between vintages. Keep held values visibly dated; missing is different from held.
5. **Run both beside v2.8.** Inspect historical behavior and multiple weekly updates before replacing the headline. Distinguish retrospective reference-period analysis from release-date backtests. Do not invent publication dates where unavailable.
6. **Update the website.** Present the monthly observed index and weekly monitor together, followed by common pillar details, actual/estimate labels and freshness/coverage. Publish only after methodology implementation and validation are complete under the project workflow.

## First deliverable

An indicator table: Indicator | pillar | actual/estimate | frequency | transformation | direction | release-date rule | holding policy | scoring/context | source readiness.

Prioritize hyperscaler financial definitions, then map existing adoption/monetization/infrastructure inputs. Keep FCFF, RPO and Bloomberg query decisions in the accompanying audit. Do not recollect or change licensed workbooks merely to prepare this plan.

## Operational rules

Canonical website: Projects/AI_INDEX_Web. Shared research inputs and pipeline: OneDrive AI_Index. No Node/Python environments, credentials or dependency caches in OneDrive. Preserve existing uncommitted work. Collection, build, sync, Git push and hosted deployment are separate operations.

## Status

Current FCF status (3 November 2026): the user withdrew the quarterly `headline_fcf()` assumption after confirming the Amazon TTM issue. Policy v2 removes all 140 FCF records from active calculation inputs, retaining raw amounts only as excluded evidence pending a replacement field. Disclosure-date, period-end classification and unchanged Bloomberg revenue rules remain accepted. Earlier notes below describe the decision history.

- Plan recorded in project docs and copied to shared OneDrive docs.
- Steps 1–2 started: prior-definition review and saved-source audit.
- No new weights, transformations, holding-period limits or FCFF definition approved yet.
- No website calculation changes or deployment made by this planning task.

### 3 November 2026 workbook review

Audited the updated `AI_Hyperscalers.xlsx`; see `HYPERSCALER_WORKBOOK_AUDIT_2026-11-03.md`. Native fiscal periods and CapEx revision dates are now available, but promotion is withheld: exported actual/estimate flags are absent, revision dates are not verified first-public dates, Amazon headline FCF is TTM, and Alphabet headline revenue matches an ex-TAC basis. A read-only audit importer stages all 140 company-quarter records with source-cell provenance and null missing values. Existing index inputs and v2.8 calculations are unchanged.

Subsequently, the user accepted Bloomberg disclosure dates as first-public dates, period-end-based actual/estimate classification, existing FCF values as quarterly by assumption, and unchanged Bloomberg standardized revenue. Those decisions supersede the four corresponding intake restrictions above. `pipeline/accept_hyperscalers.py` now builds normalized candidate inputs: 59 actual records, 81 estimates and 25 missing metric cells. The locked workbook required explicit reuse of the preceding audited cache. See `HYPERSCALER_ACCEPTED_RULES_2026-11-03.md`. Headline methodology and website calculations remain unchanged; next is candidate transformation/coverage work using these accepted rules.
