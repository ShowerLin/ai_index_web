> Archived shared-data change record. Paths below are relative to the OneDrive AI_Index data root. For current operation see ../DATA_PIPELINE.md.

# Bloomberg CapEx conditional core projection

Latest display update: the compact heatmap now shows available normalized scores numerically, including July–September conditional core and CapEx estimates with an `E` suffix. Other missing inputs remain blank. The heatmap and its companion line chart stop in September 2026, one quarter after the last complete actual core observation (June 2026). The underlying projection dataset still retains the full December 2027 horizon for research. This display limit supersedes earlier descriptions of the visible chart extending through 2027.

Display convention: solid lines show actual core and pillar observations through June 2026. Post-cutoff values are excluded from actual line segments. The estimated conditional composite is dashed in the same orange as the actual core; estimated CapEx is dashed in the pillar color. The estimate region is shaded and the legend explicitly identifies actual versus estimated. The headline score remains the latest complete actual composite.

The user identifies observations after calendar June 30, 2026 as Bloomberg estimates. `Supply Chain Financial Value` now supplies all five companies through December 2027. `Hyperscaler Core Data Value` has missing forecast cash CapEx for four companies, so it is not used for the projection.

`pipeline/run.py build --group projection` generates `core-projection-snapshot.ts`; the core and full build groups include it. Website sync installs it. The core line chart extends through December 2027 with a green dashed conditional composite and, when the CapEx pillar is selected, an amber dashed pillar score. The source workbook is unchanged.

## Calculation

Historical core scores and the June baseline remain fixed. Historical approved CapEx uses company-specific lease/accounting treatments, whereas the new source contains headline CapEx. To avoid a mechanical accounting jump, each company's estimated headline spending is multiplied by its June 2026 approved core amount divided by its June headline amount. This fixed bridge is a modeling assumption; it is not a Bloomberg estimate of lease-inclusive spending. Source amounts, source cells, factors, adjusted amounts and workbook hash are retained.

Sum adjusted five-company amounts, calculate trailing four-quarter total YoY growth, and apply the existing June baseline mean, standard deviation, clipping and 20% weight. The other four pillars remain at their last complete June 2026 scores. Conditional composite = June composite + 0.2 × (projected CapEx score − June CapEx score). Quarterly scores are held across their three calendar months, using the source's existing calendar-period alignment. This is a retrospective scenario alignment, not a publication-date backtest.

The line is therefore a CapEx-driven conditional scenario, not an independent forecast of adoption, demand, imports and investment. Projected quarters do not become historical official core observations. No missing company estimate is treated as zero. Changing lease intensity, the fiscal/calendar conversion, forecast revisions and the short seven-observation calibration baseline limit the projection.

## Validation

All six estimated quarters contain five companies. Checks passed for horizon, finite negative source spending converted to positive amounts, composite weighting identity, score bounds and continuity at the June anchor. The reference build changed only the new projection snapshot. Website production build passed. Source retrieval time is unknown; the workbook hash and local build timestamp provide provenance. Local website response is checked separately.
