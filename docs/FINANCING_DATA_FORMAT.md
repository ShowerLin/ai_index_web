# AI financing data handoff — format 1.0.0

## Files and ownership

- `data/circular-financing.json`: authoritative data for the weighted company network, node IN/OUT summaries and clicked-flow news panel. Edit a candidate copy, not the live baseline.
- `data/circular-financing.schema.json`: JSON Schema (draft 2020-12), including required fields, enums and types.
- `scripts/validate-financing-data.mjs`: validates IDs, endpoints, sources, units, bounds and basic timing/status constraints.
- `scripts/reconcile-financing-data.mjs`: read-only baseline/candidate comparison with added, changed and removed records, their before/after values, and baseline SHA-256.
- `app/circular-financing-data.ts`: legacy detailed loop diagrams and revenue/sensitivity references. Those are separately maintained and have not been automatically rewritten from this graph JSON. After accepting a change, reconcile affected detailed-loop records, headline cutoff, source exports and sensitivity inputs too. The old CSV is a loop-description export, not the canonical network exchange dataset.

Current graph: 10 nodes, 19 flows, 14 sources. Information cutoff is 2026-10-05; the format was organized on 2026-10-06. This reorganization introduces no new market research.

## How another agent should submit research

Copy the complete baseline into `data/circular-financing.candidate.json` and modify that copy while retaining stable IDs. Return the candidate plus a short research memo explaining each material change and its primary-source evidence. Validate it, then run the comparison command below. Reconciliation reports are proposals: the comparison tool never installs the candidate or silently changes the page.

```
node scripts/validate-financing-data.mjs data/circular-financing.candidate.json
node scripts/reconcile-financing-data.mjs data/circular-financing.json data/circular-financing.candidate.json
```

Use the bundled Node binary if `node` is not on PATH. A JSON Schema validator may additionally validate the schema; the supplied CLI focuses on cross-record and financial integrity checks and is not a full JSON Schema engine.

## Record meanings

**Nodes:** stable `id`; company/group `name`; primary `role` plus `roles`; description `label`; `ticker` or null; `entityType` distinguishes companies from aggregate/composite graph nodes. NVIDIA is `nv`, Amazon/AWS `amazon`, Microsoft/Azure `ms`, AMD `amd`, OpenAI `oai`, Anthropic `anth`, CoreWeave `cw`, Meta `meta`. `aggregate` is an unnamed AI-cloud group; `sbe` combines SB Energy and its OpenAI project for presentation. Do not treat these groups as separate incorporated companies or assume they are disjoint. Coordinates are presentation hints: retain existing values; x=50 is supplier/financier side, x=850 customer/recipient side. y is recomputed by the UI. Role and column position are separate concepts.

**Flows:** stable semantic ID, e.g. `amazon-openai-paid-amazon-oai`; `loopId` connects to an existing detailed loop. `from` and `to` reference node IDs and express the economic direction. `kind` drives the user filters: paid, commitment, purchase, guarantee or incentive. `status` refines completion/conditions; `label` is a concise user-facing description.

**Amounts:** numeric `value` in USD **billions**, currency/unit explicit. `$50B` is 50, not 50000000000. Null means undisclosed/unvalued, not zero, and must use bound=unknown. `exact` denotes a disclosed point amount, `upper_bound` an “up to” amount, `lower_bound` a “greater than” amount. Preserve source wording in `label`. Bound metadata drives the visual amount qualifiers and IN/OUT summaries. Never convert GW, shares or warrant exercise price into estimated dollar fair value without a separately documented valuation; retain null for those graph amounts.

**Time:** `label` preserves human-readable timing and caveats. ISO date fields separately distinguish announcement, effectiveness, balance/disclosure as-of, and contract start/end. Unknown dates stay null. Do not substitute the dataset cutoff for an unknown payment or publication date. `basis` distinguishes cumulative paid capital, one transaction, remaining facility, multi-year contract, aggregate obligation and warrant mechanism. Duration basis identifies contractual, typical or maximum terms; six-year typical backstops are not a uniform six-year payment schedule. A $50B investment cumulatively funded and a future $100B eight-year contract are different measurement periods.

**Sources:** normalized source records referenced through `sourceIds`. Keep the original HTTPS URL, publisher, source type and review cutoff. Put the preferred original source first in sourceIds; the clicked-flow panel currently opens that first source, while additional references remain in the dataset. Title and publication date are null when not independently recorded; do not fabricate them from a transaction date. `newsBrief` is a paraphrased evidence note for the clicked-flow panel. `archivedFullText=false` means the source URL is retained but no full article/filing copy is archived. Add supporting sources rather than discarding prior evidence.

**Reconciliation:** use proposed for agent submissions and verified only after checking evidence. `supersedes` links replaced record IDs; `overlapGroup`, `overlapStatus` and notes preserve aggregate/component ambiguity. The NVIDIA $36B aggregate and CoreWeave $6.3B capacity order share `nvidia-capacity-backstops`; they must not be added into one financing total until overlap is reconciled. The old OpenAI $100B LOI is not another paid NVIDIA investment. Leave disputed payment status explicit.

## Reconciliation rules

1. Retain IDs for corrections to the same measured disclosure. Add an event/period suffix for a genuinely new transaction or observation; do not silently accumulate snapshots of the same cumulative balance.
2. Compare matching company, counterparty, instrument, measurement basis and as-of date. Headline amounts alone are not transaction keys.
3. Prefer filings and original company announcements over secondary reports. Record conflicting claims and explain the chosen interpretation rather than averaging them.
4. Preserve prior records for genuinely superseded disclosures with supersedes links and reconciliation status; the weighted network excludes flows marked cancelled/superseded and reconciliation records marked disputed/superseded. Do not relabel these records as live without explicit review.
5. Never mix paid cash, financing commitments, purchase contracts, guarantee notionals and equity incentives into a grand total. IN/OUT dollar summaries group eligible visible flows by type; support/warrants remain counts because dollar additivity is not established.
6. Mark dataset cutoff and source review dates honestly. When refreshing data, explicitly assess related detailed loops, static SVG/CSV exports, revenue denominators and sensitivity assumptions; graph updates do not automatically reconcile those separate modules.

## Human CSV editing

Editable tables are in data/financing-csv (flows.csv, companies.csv, sources.csv, dataset.csv). Read data/financing-csv/README.md for columns, allowed values and import commands. scripts/financing-csv.py exports the accepted JSON and imports manual CSV edits into a validated candidate without installing them. Blank optional cells map to null; semicolons separate lists. The initial CSV round trip preserves all baseline records.
