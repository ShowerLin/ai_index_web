# Hyperscalers research section

Implemented locally on 23 October 2026, following Monetization and preceding Infrastructure. This reorganizes research evidence; composite constituents, weights and source observations remain unchanged. Adoption and Monetization components are preserved.

## Reading order

1. Cloud demand and investment outlook: company selector for Microsoft, Alphabet, Amazon, Oracle and Meta; separate cloud-revenue and RPO forecast charts; latest available forecast endpoint cards and forward CapEx comparison. All cloud observations are saved Bloomberg estimates, never relabeled as reported actuals. Fiscal labels and business scopes remain explicit. Meta has no comparable saved cloud-revenue/RPO data and displays unavailable values, while retaining CapEx coverage.
2. Capital commitments: original historical CapEx company table, stacked-bar/total-line chart and company selector, moved intact from Investment. Forward CapEx uses the saved next-four-complete-calendar-quarter horizon, with its accounting-basis qualification.
3. Cash generation and capital productivity: existing operating cash flow / cash CapEx chart, absorption and funding-headroom chart, company cash-flow calculations and consolidated/incremental ROIC analysis, moved intact from Financial. Oracle remains outside the matched four-company cash aggregate; ROIC coverage is separately defined.
4. Supporting usage/CapEx/ROIC comparison retained in an expandable panel.

Cloud profitability estimates and source cells remain in an expandable source-detail panel. Cloud/RPO estimates are removed from the always-visible composite overview and are available in the new research section. The selection-dependent Supply panel in the composite overview remains selection-dependent.

Physical delivery and construction/order history remain in Infrastructure. The residual Financial chapter is labeled Funding & recovery and retains training-cost and financing-dependency evidence. Primary navigation and the reading guide link to Hyperscalers. Historical anchors for individual cash and returns charts remain available.

## Sources and limits

No workbook was changed or refreshed. Cloud data come from cloud-reference-snapshot.ts; forward CapEx comes from supply-snapshot.ts; cash and ROIC charts keep their original source snapshots and calculations. Revenue is a quarterly flow and RPO a stock, so their charts use separate scales. Scope differences prevent naive issuer/segment ratios. RPO-versus-CapEx growth remains withheld pending reconciliation. Unknown source retrieval timestamps remain disclosed. No electrical-equipment inputs were added.

## Files and verification

Local website: C:/Users/yulin/Projects/AI_Index/app/page.tsx. Portable new components: pipeline/website-adapters/hyperscaler-demand.tsx and hyperscaler-demand.module.css; updated cloud-reference.tsx is also retained there. On another checkout, mount the demand component and original CapEx/cash/ROIC components in the same reading order; data sync alone does not modify page.tsx. Pre-edit page and cloud-detail backups are in backups/hyperscalers-20261023.

Production build passes. Structural checks verify one mount per moved chart and correct chapter order. Browser review verifies forecast chart layout and the Meta unavailable-data state. The broader TypeScript check retains existing unrelated errors; no clean project-wide type-check is claimed. No hosted deployment was performed.
