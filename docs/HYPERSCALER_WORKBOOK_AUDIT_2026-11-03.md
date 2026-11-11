# Hyperscaler workbook audit — 3 November 2026

**Latest decision:** The user withdrew the quarterly FCF assumption. Policy v2 excludes all `headline_fcf()` values from active calculation inputs pending a replacement field. Accepted disclosure-date, actual/estimate and original-revenue rules remain in force. The subsequent-decision paragraph below describes the earlier policy v1 and is historical.

**Subsequent user decision:** The original assessment below is preserved as audit history. The user subsequently accepted Bloomberg disclosure dates as first-public dates, future period ends as estimates, unchanged Bloomberg standardized revenue, and existing FCF values as quarterly by explicit assumption. These decisions supersede the promotion restrictions arising from those four issues. See `HYPERSCALER_ACCEPTED_RULES_2026-11-03.md`. The observed Amazon TTM match remains documented evidence; the accepted duration is a user assumption. Candidate data intake is now implemented. Headline scoring remains unchanged.

Decision: retain as a staged research source, not a replacement for accepted index inputs. The workbook is structurally readable but fails comparability and availability requirements for production scoring. No source workbook, headline index, weights, website calculations or deployment was changed.

## Scope and evidence

Source: `AI_Hyperscalers.xlsx`, SHA256 recorded in `data/research/hyperscalers/audits/2026-11-03-7535c5aca423.json`. Read cached cells and saved query text only. No Bloomberg refresh or formula recalculation was attempted. Public checks below are targeted historical checks, not verification of every cached value.

Two sheets: `Hyperscaler Financial Value` and `Hyperscaler Financial Formula`. Five issuer blocks, 28 fiscal quarters each, 140 records and 840 metric cells. 815 finite numeric metric cells and 25 unavailable cells. All unavailable values remain null in staging: Meta interest coverage, 17 forecast periods; Amazon net debt, eight forecast periods. The 59 historical-period candidates have complete numeric fields, but numeric completeness does not prove correct definitions or actual status. Another 81 records have future period ends as of the audit date.

| Issuer | Fiscal-period-end coverage | Historical-period candidates | Future periods |
|---|---|---:|---:|
| MSFT | September 2023–June 2030 | 13 | 15 |
| META | March 2024–December 2030 | 11 | 17 |
| AMZN | March 2024–December 2030 | 11 | 17 |
| GOOGL | March 2024–December 2030 | 11 | 17 |
| ORCL | August 2023–May 2030 | 13 | 15 |

All blocks have unique, sequential quarterly period ends and matching local DATES/period-end columns. Native fiscal period metadata is an improvement over the prior calendar-only source. Joining issuer blocks by row or fiscal-year label would be wrong: the first row pairs Microsoft September 2023 and Oracle August 2023 with the other firms' March 2024 results. Oracle's fiscal quarter remains different from a complete calendar quarter. No monthly interpolation or cross-issuer calendar aggregate was produced.

## Findings that prevent promotion

1. **Date semantics.** Formula cells C2, M2, W2, AG2 and AQ2 request `headline_capex().revision_date as #Disclose_date`. This is a CapEx revision date, not established first-public disclosure metadata for every field. Example: Value!D16 is 2 November 2026 for Microsoft's December 2026 period (C16). Forecasts therefore have populated dates too. Preserve as `sourceRevisionDate`; do not use it as proof of a released actual or assign it to revenue/FCF/net debt/EBITDA. `fa_filing_status=LR` also requires definition verification and does not recover historical vintages. Historical revisions could differ from first-release amounts.

2. **Actual/estimate status.** All queries use `ae=AE` but export no per-metric actual/estimate flag. Classify future periods as not actual; retain past periods as historical candidates until field status is verified. Dates and rounded values are insufficient to promote them. A common June 2026 cutoff is no longer an adequate classification rule for this workbook.

3. **FCF is mislabeled FCFF and has mixed durations.** Queries retrieve `headline_fcf() as #FCFF`. This does not establish unlevered FCFF. More decisively, Value!AA3:AA6 contains Amazon FCF of 50.149, 52.973, 47.747 and 38.219 billion for the 2024 quarter ends. Amazon's official supplemental table labels those exact amounts **FCF — TTM**. Summing these quarterly rows would repeatedly count overlapping 12-month flows. Preserve as source headline FCF; verify each issuer's duration and definition. Do not sum or derive a quarterly funding-coverage ratio from it. No automatic differencing was applied because the required common definition is not established.

   Evidence: [Amazon Q1 2025 release, supplemental FCF table](https://ir.aboutamazon.com/news-release/news-release-details/2025/Amazon-com-Announces-First-Quarter-Results/), and [Q1 2024 release](https://ir.aboutamazon.com/news-release/news-release-details/2024/Amazon-com-Announces-First-Quarter-Results-68b9258cd/). Q1 2024's 50.149 billion is explicitly a trailing-12-month figure.

4. **Revenue scope differs.** Value!AJ3 is 67.593 billion for Alphabet March 2024. The official release reports total revenue of 80.539 billion and TAC of 12.946 billion. Their difference is exactly 67.593 billion. This supports an ex-TAC interpretation of the saved headline number, rather than consolidated reported revenue. It also is not Google Cloud revenue. Amazon Value!Z3 is 143.313 billion, matching consolidated net sales, not AWS revenue. Do not aggregate or label these as comparable cloud revenue. Verify headline revenue definitions across actuals and forecasts before any ratio or growth implementation.

   Evidence: [Alphabet Q1 2024 release, consolidated revenue and TAC](https://www.sec.gov/Archives/edgar/data/1652044/000165204424000047/googexhibit991q12024.htm); [Amazon Q1 2024 release](https://ir.aboutamazon.com/news-release/news-release-details/2024/Amazon-com-Announces-First-Quarter-Results-68b9258cd/).

5. **CapEx accounting bridge remains open.** `headline_capex()` values are negative outflows; the staging import preserves that sign. The field's cash/lease/total-investment treatment is not established by its alias. It cannot silently replace the existing accepted series with different company-specific treatments. Currency is not explicitly selected in the query. Retain raw amounts, verify currency and units, then reconcile matched fiscal periods against accepted cash CapEx and disclosed lease-inclusive investment. Do not assume that a sign reversal completes the bridge.

6. **Funding definitions and coverage are incomplete.** Net debt and EBITDA need Bloomberg field definitions, lease scope and duration checks. Interest coverage is a ratio and must not be summed or averaged as aggregate coverage; verify numerator, denominator and duration before reconstructing aggregate coverage. This workbook does not provide CFO, dividends, buybacks, separate interest expense, NOPAT or invested-capital components. Existing cash sustainability and ROIC inputs therefore cannot be replaced wholesale. Cloud segments and RPO are also absent.

## Implemented now

`pipeline/audit_hyperscalers.py` reads this workbook without editing it, validates the schema, unique issuer/period keys, consecutive quarter ends, dates and CapEx signs, and creates a source-hashed JSON audit snapshot. It retains exact cell references, native fiscal periods, raw measures and source query text. Missing cells remain null with original errors logged separately. Revision dates and first-public dates are separate fields. Actual/estimate status stays unverified and production eligibility stays false. The snapshot is outside the existing build inputs and is not synced to the public website.

Re-run after a saved workbook refresh:

```powershell
python pipeline/audit_hyperscalers.py --as-of 2026-11-03
python -m unittest discover -s pipeline -p test_hyperscalers_audit.py
```

Use the review date for a new audit. The date identifies review, not Bloomberg retrieval or forecast availability. Different source contents create distinct filenames. An existing snapshot with different output is not overwritten.

## Minimum correction before implementation

- Export actual/estimate status per metric, explicit currency/scale, fiscal period end, source refresh time and field-specific revision metadata. Obtain first-public dates separately where release-date histories are required. A current revision timestamp cannot reconstruct prior forecast vintages.
- Replace the FCFF alias with the verified FCF label and explicit issuer-level duration; obtain a comparable standalone-quarter series or a consistently defined TTM series. Obtain FCFF separately only if its definition is accepted.
- Choose consistent consolidated revenue definitions for funding analysis, and separate cloud-segment revenue for monetization. Correct the Alphabet gross/ex-TAC distinction.
- Verify the CapEx cash/lease definition for each issuer and reconcile the proposed replacement to the existing series on matching periods before changing it.
- Retain the existing CFO/ROIC sources. Add missing capital-return inputs if dividends/buybacks remain part of the proposed investment-and-funding section.

These corrections are data-definition work. No new index weights or scoring taxonomy is needed to complete them. Preserve v2.8 while the candidate methodology is developed.
