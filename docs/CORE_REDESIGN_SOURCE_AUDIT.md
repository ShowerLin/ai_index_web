# Initial constituent and financial-definition audit

Current update, 3 November 2026: the quarterly headline-FCF assumption was withdrawn by the user. Accepted intake policy v2 excludes `headline_fcf()` from calculation inputs pending a replacement Bloomberg field. The accepted date, actual/estimate and original-revenue rules remain active. Earlier assessments and decisions below are retained as history.

Reviewed 2 November 2026. Read-only review of existing project decisions, pipeline builders and saved workbook queries. No Bloomberg refresh, workbook edits, scoring changes or new source verification was performed.

## Prior decisions recovered

- `HYPERSCALERS_SECTION_2026-10-23.md`: cloud/RPO are estimates, preserve fiscal periods and scopes; Meta lacks comparable cloud/RPO observations. Existing cash analysis uses operating cash flow and cash CapEx, with Oracle outside the matched four-company aggregate.
- `SUPPLY_V2_8_2026-10-23.md`: RPO is a stock; do not sum quarters or issuers. Same-fiscal-quarter YoY is available where matching estimates exist. One saved forecast vintage is not an estimate-revision history. Exact calendar forward RPO and RPO-growth-minus-CapEx-growth remain withheld pending alignment.
- Current v2.8 is the comparison baseline. Its five research-score pillars and provisional hardware-price inputs are not automatically carried into the proposed four-pillar design.

## Verified saved Bloomberg queries

`Indexlist.xlsx`, Hyperscaler Core Data Formula!B1: operating cash flow uses `cf_cash_from_oper`; cash CapEx uses `cf_cap_expend_prpty_add`; also retrieves NOPAT, depreciation/amortization, cash, debt, leases and equity. The query is USD, BQ, fpo range(-15,6). It does not explicitly request FCFF or contain a complete independently identified FCFF build. Actual/estimate status for every relative period needs separate classification; the range alone does not prove actuals.

The active sustainability builder extracts operating cash flow and cash CapEx; it does not compute a labeled FCFF series. No explicit FCFF agreement was found in the searched project/shared docs. This is a documentation gap, not proof that no earlier conversation occurred.

Both `AI_Monetization.xlsx` and the retained `Indexlist.xlsx` Cloud FA Formula sheets use `BS_REMAINING_PERFORMANCE_OBLIG/1M` for RPO. Inspected cells B23:C25 and B27:C27 explicitly request `FA_ACT_EST_DATA=E`, `FPT=Q`, native FPR fiscal labels, `FS=MRC`, USD and `XLFILL=b`. Source amounts are USD millions; generated charts convert to billions. Query fill behavior requires review before treating repeated or missing values as fresh observations.

| Label | Source identifier | Source scope established by query | Open issue |
|---|---|---|---|
| Google Cloud RPO | SEG0000344781 Segment | Segment identifier | Confirm Bloomberg segment definition before assuming complete comparability with revenue |
| AMZN RPO | AMZN US Equity | Issuer query | Do not automatically call it AWS-only RPO |
| Microsoft commercial RPO | SEG0000225003 Segment | Segment identifier; sheet labels commercial RPO | Different scope from Intelligent Cloud revenue; confirm exact field coverage |
| Oracle RPO | ORCL US Equity | Issuer query | Different from cloud/software revenue scope; Oracle fiscal sequence starts 2Q27 versus others 3Q26 |

## Draft constituent dictionary — no weights approved

| Indicator | Proposed role | Frequency/status | Candidate transformation and direction | Availability/holding rule | Readiness |
|---|---|---|---|---|---|
| Ramp paid adoption | Adoption breadth | Monthly observed sample | Level; higher = broader paid adoption | Enter on known release; otherwise mark release date unknown | Existing source; proposed core role requires review against current spending-based v2.8 |
| Ramp matched spending | Adoption intensity | Published window/sample | Matched-window change; higher = stronger nominal spending | Use documented completed windows; weekly eligibility depends on source cadence | Existing; avoid duplicating spending components |
| OpenRouter token activity | Adoption intensity | Daily/weekly observed routing | Completed-window average and change | No missing-day scaling; weekly snapshot | Existing; model/sample and price effects distinct |
| Cloud revenue | Monetization | Quarterly actuals/estimates separated | Comparable-scope YoY, not mixed fiscal periods | Hold released actual; estimates in separate vintage overlay | Saved cloud queries explicitly estimates; actual history needed for observed index |
| Cloud margins | Monetization quality | Quarterly | Matched operating margin level/change | Same release and scope as income/revenue | Oracle source is gross-profit proxy, not operating profit |
| Lab quarterly revenue | Monetization context initially | Irregular reported/media observations | Comparable quarterly growth only when available | Preserve qualification and report date | Coverage too sparse for an assumed continuous monthly score |
| RPO | Forward monetization | Quarterly stock; saved estimates | Same-scope fiscal YoY; weekly same-period revision | Hold latest dated observation; archive vintages | Field identified; scope/calendar/revision history incomplete |
| Hyperscaler CapEx | Investment commitment | Quarterly actuals/estimates | Aggregate matched-company TTM YoY; higher = more spending | Released actuals held, forecast revisions separate | Existing accounting/lease bases need explicit reconciliation |
| Operating cash flow less cash CapEx | Funding capacity | Quarterly actuals | TTM balance and absorption; higher cash cushion = stronger resilience | Hold from release; not relabeled FCFF | Existing four-company matched analysis |
| FCFF | Funding/capital economics | Quarterly actual/estimate TBD | TBD after Bloomberg definition verified | No score or substitute until definition accepted | Needs exact Bloomberg field or approved build and lease/interest treatment |
| Operational IT MW | Infrastructure delivery | Irregular project updates | Comparable-sample net additions | Event/release dates; held stock visibly dated | Existing modeled coverage; deduplicate projects and statuses |
| H100-equivalent ownership | Infrastructure context | Quarterly modeled | Comparable-coverage additions only | Do not turn ownership into realized utilization | Source coverage changes; not ready for unqualified production scoring |
| Construction/orders/imports | Infrastructure/demand evidence | Monthly observed | Existing seasonality-aware transformations, subject to overlap review | Monthly releases; no weekly interpolation | Existing; assign each series once |
| Electricity/grid evidence | Infrastructure constraint | Monthly/annual/irregular | Geography-specific actuals; scenarios separate | Hold dated source, distinguish forecast | Partial coverage; may fit constraint panel better than activity composite |

## Precise remaining Bloomberg clarification

FCFF: obtain the exact Bloomberg mnemonic/BQL expression and field definition used in the prior discussion. Confirm whether it is company-reported FCF or unlevered FCFF, standalone quarter versus cumulative/TTM, currency, actual/estimate selection, and interest/lease treatment. Existing cash-flow-minus-CapEx remains usable under its current label.

RPO: no need to repeat the stock-versus-flow discussion. Remaining questions are whether AMZN issuer RPO represents AWS-only obligations and what Microsoft segment SEG0000225003 covers, plus fiscal period-end mapping and vintage retrieval timestamps. These do not prevent displaying the existing qualified series.

Next: complete actual/estimate and publication-date inventory, then propose a minimal monthly scoring basket and weekly revision overlay. Do not change baseline weights while these definitions remain open.

## Update — 3 November 2026

The new `AI_Hyperscalers.xlsx` supplies native fiscal labels, period ends and `headline_capex().revision_date`, but the date must not be generalized to first-public availability or other fields. Queries use `ae=AE` without exported per-metric status. `headline_fcf() as #FCFF` does not resolve the FCFF definition; Amazon's saved amounts match officially reported TTM FCF, preventing quarterly summation. Alphabet's headline revenue matches reported revenue less TAC. See `HYPERSCALER_WORKBOOK_AUDIT_2026-11-03.md` for cells, public-source checks, coverage, corrections and the implemented staging import. No production promotion was made.

### Subsequent accepted rules

The user explicitly accepted the saved Bloomberg date as first public, future period ends as estimates (other periods as actuals), original Bloomberg standardized revenue, and existing FCF values as quarterly by assumption. Those choices supersede the corresponding restrictions in the preceding assessment. The FCF source match is retained as evidence, while the exported duration is explicitly `quarterly_by_user_assumption`. Normalized intake is implemented in `accept_hyperscalers.py`; see `HYPERSCALER_ACCEPTED_RULES_2026-11-03.md`. Intake is accepted under user rules for candidate methodology; the v2.8 headline is unchanged.
