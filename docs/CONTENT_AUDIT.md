# Page wording and research logic audit — 9 October 2026

Scope: the current dashboard, its expandable interpretations and methodology/source notes, checked against the saved chart inputs and calculations. This is a consistency and reasoning review, not a fresh independent verification of every external disclosure. Existing index weights and underlying datasets are unchanged. The adoption source table now reads the latest available saved survey observations rather than retaining older hardcoded values, and withholds cross-break YoY comparisons.

## Evidence and narrative map

| Section | Role in the argument | Wording correction |
| --- | --- | --- |
| Executive summary | Activity → spending → cash/returns → market risk | Balanced the summary across current charts; removed the prominent single-run utilization scenario. Distinguished five-company reported CapEx from four-company cash CapEx. |
| Core index | Five equally weighted pillars, 20% each | Demand is DRAM/NAND/TSMC in equal thirds; Imports is separate. Adoption uses levels, not YoY. Complete v2.2 history starts December 2024; last complete month is June 2026. |
| Adoption | Survey breadth; usage and affordability are supporting context | Corrected expected-use horizon to six months and noted the November 2025 question break. Routed tokens are not unique users or paid retention. |
| Demand | Hardware demand and Imports; lab run rates support monetization | Replaced the Imports chart’s erroneous DRAM footnote. Run rates remain distinct from recognized revenue and cash receipts. |
| Investment | Orders/production and CapEx → delivery | Operational MW, owned chips and utilization are distinct. Incomplete Q1 chip coverage cannot demonstrate quarter-on-quarter fleet growth. Same-quarter yield charts differ from the expanded trailing-year conversion table. |
| Financial | Cash funding capacity and capital productivity | Cash coverage is not a return metric. Consolidated and incremental ROIC are not AI project returns. |
| Cost recovery | Training burden versus usage, spending and returns | Lower buyer task costs can arise from efficiency or success rates; they do not establish lower realized revenue per token or margin. Fixed-price/margin recovery calculations are scenarios. |
| Funding dependencies | Counterparty financing and purchase commitments | Existing timing, overlap, scenario and attribution caveats retained; diagrams do not measure unreliable recognized revenue. |
| Market / Credit | Market expectations, issuer dispersion and funding access | Equity moves include rates and non-AI drivers. CDS levels and issuance are cross-checks, not proof of stress. Updated descriptions of selectable dispersion bands. |
| Industry context | Financial scale across covered value-chain roles | Existing partial USD denominator and overlapping/non-AI revenue caveats remain necessary. These are company shares, not traced payment flows. |
| Source notes | Dates, definitions and reproducibility | Updated market/CDS date to October 7 while retaining the September satellite vintage; corrected core history, Demand composition, survey definitions and score-axis description. |

## Quantitative tie-out

- Core June 2026: 69.300169; pillar scores 78.985831 / 71.822157 / 66.549487 / 65.068190 / 64.075184. All five above 50. Source: core-contribution-snapshot.ts.
- Five-company Q2 CapEx: $188.273B versus $105.0B in Q2 2025, +79.3%. Company accounting bases differ. Source: page.tsx CapEx history.
- Matched four-company TTM CFO: $660.314B; cash CapEx $510.703B; absorption 77.3424%, versus 59.0605% a year earlier. Remaining cash $149.611B versus $201.957B. Source: sustainability-snapshot.ts and rollingCash.
- All five latest consolidated ROIC values are positive and exceed their eight-quarter incremental ROIC. Oracle ends March 2026; the other four end June. Source: roic-snapshot.ts and calculateRoic.
- Current rendered credit summary: October 7 issuer median 49.7bp versus general IG 57.8bp, range 20.9–169.0bp. Different issuer/rating universes prevent a like-for-like risk ranking.
- OpenRouter Q3 daily average 13.083T versus Q2 4.488T: about 2.9×. It covers a platform sample and does not establish total paid demand.

## Primary definition checks

- [Census BTOS question updates](https://www.census.gov/hfp/btos/downloads/AI%20Question%20Wording%20Updates.pdf): current use in the last two weeks; expected use in the next six months; question broadened on 17 November 2025.
- [Epoch chip-owner documentation](https://epoch.ai/data/ai-chip-owners): estimates concern ownership rather than usage. No inference of paid utilization from owned H100 equivalents.

## Remaining evidence limits

Realized revenue per token, AI-specific invested capital and paid utilization are not measured by these panels. Media/investor-reported lab run rates and financing transaction disclosures retain their source status; this review did not re-underwrite every transaction. The saved token-price comparison ends 16 September, the financial trend ends Q2, and the core normalization uses a retrospective baseline. None should be described as a common live data vintage.

Validation: production build passed; 14 existing core-score, sustainability and ROIC tests passed; rendered headline values and source links checked. No visual-layout changes were intended.
