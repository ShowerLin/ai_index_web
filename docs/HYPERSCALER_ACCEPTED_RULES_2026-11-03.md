# Accepted hyperscaler data rules — 3 November 2026

The user explicitly authorized the following interpretation of `AI_Hyperscalers.xlsx` after reviewing the initial audit. These rules govern candidate-methodology data intake. The quarterly FCF assumption was subsequently withdrawn; policy v2 excludes that field pending replacement. The accepted date, actual/estimate and revenue rules remain active.

| Item | Accepted implementation |
|---|---|
| First-public date | Use the saved Bloomberg disclosure/revision date as the record's first-public date. Preserve the underlying source date and its accepted basis. |
| Actual/estimate | Period end later than the supplied as-of date = estimate. Otherwise = actual under the user's rule. |
| Availability | A record is available only when its accepted first-public date is present and no later than the as-of date. Observed inputs require both actual classification and availability. Missing metrics remain unavailable independently. |
| FCF | Quarterly assumption withdrawn. Remove FCF from calculation values, availability flags and input cell mappings. Retain original `headline_fcf()` amounts only in `excludedSourceMetrics`, with `calculationEligible=false`, pending a verified replacement. Do not calculate FCF or FCFF from this field. |
| Revenue | Preserve Bloomberg standardized headline revenue exactly. Do not gross up Alphabet revenue or otherwise restate source amounts. This is issuer headline revenue, not cloud-segment revenue. |
| Fiscal periods | Retain native fiscal labels and period ends. Do not join company blocks by row or automatically calendarize Oracle. |
| Missing values | Preserve null, distinguish missing from zero, and retain cell provenance. |

## Implemented data intake

`pipeline/accept_hyperscalers.py` produces `data/derived/hyperscalers/financials.json` and a dated policy/source-hashed snapshot under its `snapshots/` directory. The policy is embedded in the output. It retains all 140 records, classifies 59 as actual and 81 as estimate as of 3 November 2026, and preserves 25 missing metric cells. All 59 actual records have accepted first-public dates no later than that date.

The workbook was locked by another application during implementation. This build explicitly reused the exact source-hashed cache captured in the preceding audit: `data/research/hyperscalers/audits/2026-11-03-7535c5aca423.json`. It does not assert a fresh read or refresh of the workbook. The original snapshot and source workbook were not modified. Output metadata records the reused cache and its original review date.

Normal saved-workbook rebuild, when readable:

```powershell
python -B pipeline/accept_hyperscalers.py --as-of 2026-11-03
```

Explicit reuse of the already audited cache:

```powershell
python -B pipeline/accept_hyperscalers.py --as-of 2026-11-03 --audit-snapshot data/research/hyperscalers/audits/2026-11-03-7535c5aca423.json
```

Supply the intended review date for subsequent runs. The supplied date is a classification cutoff, not evidence that source values were refreshed. Current saved data and the accepted first-public dates do not reconstruct previous value vintages or forecast revisions.

Validation: four tests passed, covering cutoff equality, future periods, future/missing disclosure dates, negative FCF preservation, unchanged revenue, null preservation, duplicate rejection, future-audit rejection and all-record value reconciliation to the original audit.

Policy v2 additionally verifies that FCF is absent from calculation inputs and retained solely as excluded source evidence. The active `financials.json` was rebuilt from the original audited cache. The earlier policy-v1 snapshot remains historical only and must not be used as the current input. All 140 FCF records are excluded. No replacement Bloomberg field was selected or substituted.

This completes intake under the accepted rules. New composite weights and transformations remain a separate methodology step in the implementation plan. No headline index calculation, website publication or scoring weight changed. No aggregate currency conversion, lease bridge, cloud-revenue substitution or new FCFF calculation was introduced.
