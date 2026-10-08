# Circular financing map — researched 5 October 2026

The value-chain page now contains ten focused circular-financing diagrams, a dated transaction ledger, existing-workbook financial context, and adjustable financing-dependence sensitivity. The source registry is `app/circular-financing-data.ts`. Every edge has a direction, status, date, explanation and evidence URL. Exports are reproducible with `node scripts/export-circular-financing.mjs`.

## Scope and classification

Paid equity is distinct from investment commitments, capacity purchases, default-triggered tenant guarantees and purchase-linked warrants. Product procurement with unknown dollars stays unknown. A commercial obligation is not proof of revenue recognition or supplier-funded customer purchases. Microsoft’s June 2026 filing confirms $11.9B funded out of $13B; the remaining $1.1B is separate. Amazon paid funding uses the June 2026 10-Q and subsequent-event disclosure rather than superseded announcements. NVIDIA’s older OpenAI $100B letter of intent is not added to $30B round participation. The $36B aggregate backstop is not added to CoreWeave’s $6.3B order because overlap is unresolved. The SB Energy project is grouped for readability; the actual guarantee beneficiary and tenant obligation are explained in its ledger.

## Estimates

All dollars are USD billions. Default return-to-supplier fraction: 35%; default disruption: 25%; assumed NVIDIA deployment period: three years. These deliberately partial stress assumptions are not measured probabilities, statistically conservative bounds, or evidence of actual cash tracing.

- NVIDIA paid-only illustration: 2 / 3 × 0.35 × 0.25 = 0.058333 annual demand stressed, or 0.019254% of 302.970 TTM revenue.
- NVIDIA broader commitments illustration: (2 + 30 + 10) / 3 × 0.35 × 0.25 = 1.225 annual demand stressed, or 0.404330% of TTM revenue. This includes unverified payment status; it is an alternative scenario, not additive to the paid-only row.
- AWS paid-only illustration: (50 / 8 + 18 / 10) × 0.35 × 0.25 = 0.704375 annual demand stressed, or 0.474633% of 148.404 TTM revenue. Contract durations are used as flat purchase-pace assumptions; actual financing deployment may differ.
- Microsoft measured customer concentration: 24.1 FY2026 OpenAI commercial revenue, inclusive of revenue share, / 331.8 total company revenue = 7.26%. This is recognized customer exposure, not funding attribution.
- AWS contract concentration illustration: (100 / 8 + 100 / 10) / 148.404 = 15.16%; Anthropic’s >100 makes this an approximate minimum flat-equivalent contract pace. Actual revenue recognition is not flat.
- NVIDIA cash-support illustration: 36 / 6 × disruption fraction / 302.970. Conditional cloud purchases are cash obligations, not GPU revenue losses. Six years is the typical contractual term, not a proven uniform payment schedule.

Historical revenue denominators and future annual equivalents differ in timing. No single aggregate percentage of unreliable revenue is supportable. Project guarantee notional, warrant fair values and the undated Azure contract are excluded from annual funding-linked estimates. Data does not cover all AI financing.

## Financial integration

Selected listed participants use the existing `value-chain-financials.ts` extraction, preserving workbook fiscal periods and source cells. These ratios are consolidated company figures; no AI segment attribution is assumed. Revenue reference figures are separately sourced from dated company reports. The formula audit appears on the page. Private labs and CoreWeave are absent from the workbook and are explicitly described as such.

## Verification

Production build; financing calculation and evidence-structure tests; existing rendered HTML checks; desktop and mobile browser inspection. Standalone SVG overview and individual exports share the same renderer as the dashboard.

## Weighted network trial — 6 October 2026

The company network uses the same 5 October evidence cutoff. Node colors distinguish chip suppliers, cloud infrastructure, frontier labs, project developers/tenants and application platforms. Multi-role companies retain activity descriptions. The layout separates financier/supplier and customer/recipient positions; these positions are not themselves supply-chain roles.

Arrow shaft width is linear at 0.22 SVG units per USD billion, with a 2-unit visibility floor. Values below $9.09B therefore hit the minimum; exact amount labels retain the distinction. Unknown dollar amounts (hardware procurement and warrants) use dotted hairlines. Separate filters distinguish paid funding, future funding, conditional support, purchases and warrants. No annual normalization is inferred. Clicking nodes narrows connections and clicking arrows reveals dated evidence. Aggregate AI-cloud support may overlap CoreWeave; the view does not provide summed amounts.

Flow-type buttons now toggle independently and can be combined. Per-edge colors, status dashes and dollar widths remain distinct; parallel and reverse connections are offset within each company pair. An empty selection displays a prompt.

## Node direction summaries and evidence panel

Every visible company card now shows separate IN and OUT summaries from the currently displayed edge set (selected flow types and company focus). Paid, future and purchase dollar figures remain grouped by kind, with maximum/lower-bound and unknown qualifiers. Support/warrant counts avoid treating potentially overlapping guarantee notionals or unvalued equity instruments as additive cash; node tooltips list the individual disclosed obligations. No grand total across types or annual normalization is inferred.

Clicking a flow opens an immediately visible non-modal announcement/filing brief with the stored transaction/disclosure timing, explanatory note, flow category, source host and original source URL. The dataset retains links and paraphrased notes, not archival full-text copies. Original publication dates are not independently available for every filing/event, so the timing field is explicitly labeled rather than presenting all dates as publication dates. The close control dismisses the panel; Escape works when focus is within it.
