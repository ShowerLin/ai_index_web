# Hyperscaler chart refresh — 3 November 2026

Updated the local website's Hyperscalers section from a fresh read of `AI_Hyperscalers.xlsx`, SHA256 `b4c6945aeee1` (prefix). This source differs from the earlier audit's file hash; native period coverage remains the same. Read saved values only; did not refresh Bloomberg or modify the workbook.

- Latest headline CapEx table, YoY growth and company selector now use released actuals through September 2026 for MSFT, GOOGL, AMZN and META; August 2026 for ORCL.
- Company chart shows all available actuals plus the next four fiscal-quarter estimates, with distinct actual/estimate styling and source-cell details.
- Existing forward CapEx card and comparison table now use this same source. The horizon is the next four native fiscal quarter ends after 3 November, including the current incomplete quarter. It differs from the prior next-four-complete-calendar-quarter horizon; dates and method are explicitly displayed. Oracle remains on its native calendar.
- Earlier lease-adjusted CapEx, aggregate and compute-proxy charts remain separately accessible in a collapsed reference section frozen through 2026Q2. No splice or recalculated compute share was introduced.
- Cash-funding and ROIC source snapshots remain unchanged because the updated workbook lacks CFO, NOPAT and invested-capital components. Their retained coverage is labeled. Cloud segment revenue and RPO also retain their separate source vintage; issuer headline revenue is not substituted for cloud revenue.
- Withdrawn headline FCF is absent from chart calculation inputs. Core v2.8, projections and original financial definitions are unchanged. No deployment or Git push was performed.

Rebuild from saved workbook using the intended review date:

```powershell
python -B pipeline/accept_hyperscalers.py --as-of 2026-11-03
python -B pipeline/build_hyperscaler_charts.py
python -B pipeline/run.py sync --web-root C:/Users/yulin/Projects/AI_Index
```

The chart build is a dedicated command, not part of the existing `all` group. The generated snapshot is included in the sync allowlist. Application component changes are mirrored in `pipeline/website-adapters/`; data sync alone does not install new components.

Validation: saved-value reconciliation and horizon/missingness tests, acceptance-policy tests, production build and browser review including company selection. Repository-wide TypeScript checking reports existing errors in unrelated components and adapter sources; the changed app components have no reported type errors. The production build passes.
