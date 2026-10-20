> Archived shared-data change record. Paths below are relative to the OneDrive AI_Index data root. For current operation see ../DATA_PIPELINE.md.

# Cloud estimate reference integration — 16 October 2026

The user-added `Cloud FA Value` and `Cloud FA Formula` sheets are now inputs to the portable pipeline. The workbook is read without modification. The `cloud` build group emits `data/derived/app/cloud-reference-snapshot.ts`; normal website sync installs that generated snapshot. Full builds include the new group.

## Coverage and definitions

102 cached observations span six native fiscal quarters for:

- Google Cloud, AWS and Microsoft Intelligent Cloud revenue, operating income and margin.
- Oracle Cloud & Software revenue, cost of revenue, and derived profit/margin.
- Google Cloud RPO, Amazon issuer RPO, Microsoft commercial RPO and Oracle issuer RPO.

All BQL data queries explicitly request `FA_ACT_EST_DATA=E`, `FPT=Q`, `FS=MRC`, USD, and divide amounts by one million. The extractor converts these USD-million cached amounts to USD billions; margins remain fractions. These are Bloomberg estimates. Source refresh time is unknown; extraction time is recorded independently. Query text, native fiscal labels, source cells and workbook SHA-256 are retained in the snapshot.

Oracle's sequence is 2Q27–3Q28, while the other displayed sequences are 3Q26–4Q27. No calendar alignment is inferred. No sum across companies or RPO/revenue ratio is computed because scopes and periods differ. RPO is a stock of obligations, not quarterly revenue or cash.

The Oracle source row labeled Operating Income subtracts cost of revenue from revenue. The reference display correctly calls this a **gross-profit proxy**, with a corresponding gross-margin proxy. The workbook's original labels and formulas remain preserved for audit.

## Relationship to CapEx and the core

The new sheet has no CapEx rows. Its estimates appear as reference tables alongside the core contribution analysis to help assess the demand supporting infrastructure investment. Existing historical CapEx remains the separate 20% scoring pillar. Neither normalization nor core weights change. A forecast-based score would require a separately reviewed method and estimate-vintage history.

## Refresh and validation

After refreshing and saving Bloomberg values, run `python pipeline/run.py build --group cloud`, then `python pipeline/run.py sync --web-root <local-website>`. `build --group all` also includes cloud extraction. Missing or invalid numeric cache values fail extraction; source query basis and fiscal labels are checked. The workbook validator now checks required Bloomberg tabs rather than enforcing the obsolete count of 14, and requires the cloud Value/Formula sheets to occur together.

Validation passed: all 102 extracted values reconcile to source cells; every observation is marked as an estimate; Oracle profit labeling is corrected in the output; the workbook hash matches; only the cloud snapshot changed in the reference build. Website production compilation passed. The integration is local and has not been deployed to a hosted site.
