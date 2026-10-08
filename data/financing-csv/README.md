# Human-editable AI financing data

Open these UTF-8 CSV files in Excel, Numbers, Google Sheets or a text editor. Save edited sheets back as UTF-8 CSV, retaining the exact column headers. Keep a copy of this folder before editing. Commas and line breaks inside a cell are supported when exported with standard CSV quoting.

## Four tables

- **flows.csv** — main table: one directed financing, purchase, support or incentive relationship per row. This is where most updates go.
- **companies.csv** — company/group IDs, names, supply-chain roles and presentation side.
- **sources.csv** — original news/filing URLs, publishers and publication/review dates.
- **dataset.csv** — one row with version, information cutoff, update date and units.

To add data, add the company and source rows if needed, then add a flow row that references their IDs. Copy a nearby row to preserve the format; change the IDs, endpoints, evidence and relevant values. Never reuse a flow ID for a separate transaction. Updating an existing cumulative balance is different from adding a new investment: explain this in reconciliation_notes.

## Main flow columns

Required nonblank: flow_id, from_company_id, to_company_id, flow_type, description, amount_bound, status, timing_description, measurement_basis, news_brief, source_ids.

- **flow_id:** permanent identifier, e.g. amazon-openai-paid-amazon-oai. Retain it for corrections to the same record. Add an event/date suffix for a new transaction.
- **loop_id:** existing detailed-diagram ID when applicable. New relationships can leave this blank; importing will assign from-to, and the weighted map will show the flow without a prebuilt detailed loop.
- **from_company_id / to_company_id:** match company_id in companies.csv. They express the direction of funding, payment or obligation.
- **flow_type:** paid | commitment | purchase | guarantee | incentive.
- **description:** concise visible amount/status wording. If it includes a dollar amount, that amount must match amount_usd_billions.
- **amount_usd_billions:** plain numeric USD billions: 50 means $50 billion; 0.5 means $500 million. Do not type $, commas, B or M into this numeric field. A blank means unknown, never zero.
- **amount_bound:** exact | upper_bound | lower_bound | unknown. Blank amount requires unknown; “up to” uses upper_bound, “greater than” uses lower_bound.
- **status:** completed | announced_payment_unverified | contracted | conditional | conditional_equity_incentive | procurement_relationship | cancelled | superseded. Paid funding must be completed.
- **timing_description:** preserve readable dates, periods and conditions. Separate ISO columns record balance_as_of, announced_date, effective_date, period_start and period_end. Leave unknown dates blank; never substitute the research cutoff.
- **duration_years:** numeric or blank. **duration_basis:** contract_term | typical | maximum, or blank. **measurement_basis:** explanation such as cumulative_paid, individual_transaction, multi_year_contract or remaining_facility.
- **news_brief:** short evidence-based paraphrase shown when clicking the flow. Full article text is not required.
- **source_ids:** matching IDs from sources.csv; separate multiple IDs with semicolons, e.g. source-one;source-two. Put the preferred original announcement/filing first.
- **review_status:** proposed for new human/agent submissions; baseline | proposed | verified | disputed | superseded. Blank defaults to proposed. The map excludes disputed/superseded records and cancelled/superseded flows.
- **supersedes_flow_ids:** semicolon-separated prior IDs or blank. Retain referenced prior rows rather than deleting their history.
- **overlap_group / overlap_status / reconciliation_notes:** document aggregate/component ambiguity. overlap_status: not_assessed | unresolved | disjoint | included_in_aggregate; blank defaults to not_assessed. Do not sum NVIDIA aggregate and CoreWeave support without resolving overlap.

## Companies and sources

Company primary_role: hardware | cloud | lab | project | platform. Additional roles use semicolons in roles; blank defaults to the primary role. entity_type: company | aggregate_group | composite_group; blank defaults to company. layout_side: supplier | customer. Layout side is separate from supply-chain role. Keep existing layout_y values; a new row can leave layout_y blank. ticker is optional.

Source original_url must be HTTPS. source_type: company_announcement | regulatory_filing | news_report. article_title and publication_date may be blank if not independently verified. reviewed_through is the date the source was assessed, not the article publication date. full_text_archived: yes | no; use no unless full text was actually archived. These existing sources retain URLs and briefs, not full-text archives.

**All dates:** YYYY-MM-DD, e.g. 2026-10-05. Format ID and date columns as text in your spreadsheet to prevent automatic conversion. Empty cells become JSON null for optional fields; do not enter the literal word null. Lists use semicolons; do not paste JSON arrays.

## Import and compare

Run from the project directory:

```
python3 scripts/financing-csv.py import --folder data/financing-csv --json data/circular-financing.candidate.json
node scripts/reconcile-financing-data.mjs data/circular-financing.json data/circular-financing.candidate.json
```

If node is not on PATH, add `--node /Users/linyu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node` to the import command and use that binary for reconciliation.

The importer validates before writing, refuses to overwrite the live JSON or an existing candidate, and does not install the changes. After review, accepted changes can be applied to the canonical JSON; corresponding detailed loops, exports and revenue assumptions still require reconciliation. A new graph relationship does not automatically generate a detailed circular diagram.

To regenerate the CSVs from a newer accepted baseline:

```
python3 scripts/financing-csv.py export
```

Export overwrites these four CSVs: preserve your manual edits before exporting again. Current evidence cutoff remains 2026-10-05. Full JSON field definitions and reconciliation policy: docs/FINANCING_DATA_FORMAT.md.
