import type { ReactNode } from "react";

type Note = { sources: string[]; source: string; methodology: string; other: string; anchor?: string };

const notes: Record<string, Note> = {
  heatmap: {
    sources: ["S1", "S2", "S3"],
    source: "Saved Bloomberg monthly workbook observations and U.S./China CapEx collections. Macro inputs may contain prior-value fills; CapEx accounting definitions vary. These are cached observations rather than a live feed.",
    methodology: "Methodology v2: adoption levels; TTM YoY growth for exports, orders and imports; 12M-average YoY growth for construction and high-tech production; trailing-four-quarter YoY growth for company CapEx. Normalize against each transformed series’ fixed history through June 2026 using sample standard deviation, and clip 50 + 15 × z to 0–100. Equal weights within five 20% pillars. Heatmap and attribution use these same scores.",
    other: "The core line uses a fixed 0–100 left axis; selected growth uses the right axis. The range is not a confidence interval. Revised core history runs from November 2024 through June 2026; earlier periods lack full trailing windows. The baseline is retrospective, not a real-time backtest. Quarterly scores are held within quarter. Nominal price effects remain. Traffic, lab revenue, task cost and installed capacity provide supplementary context outside the core score. Historical quarterly alignment does not imply the data was published at the quarter’s start. China is supplementary.",
  },
  pulse: {
    sources: ["S1", "S2"],
    source: "Bloomberg macro workbook and consolidated U.S. hyperscaler CapEx. Later observations mix source periods and may contain carried values; the official score remains at the last complete comparable month.",
    methodology: "Series receive equal weights within pillars; Adoption, Demand, Investment, Imports and Hyperscaler CapEx each receive 20%. Signal scores use the methodology-v2 constituent treatments and are capped at 0–100; 50 is each signal’s historical norm.",
    other: "Latest pillar cards are diagnostic snapshots, not the June score decomposition. They must not be averaged to reconstruct the held official index. Token prices remain context rather than a core input.",
  },
  adoption: {
    sources: ["S1"], source: "Cached business AI-use survey series BTOS0700 and BTOS2400 in the Bloomberg workbook. Expected use is a survey intention; later values may be carried forward.",
    methodology: "Show current use in the last two weeks and expected use in the next six weeks as source-reported percentages.",
    other: "These measures describe business adoption breadth; they do not identify paid customers, retention, workload intensity or paid compute utilization.",
  },
  capex: {
    sources: ["S2", "S3"], source: "U.S. five-company CapEx workbook and separate China company collection through 2026Q2. Company disclosures, analyst estimates and inferred compute shares have different reliability; their labels are retained.",
    methodology: "U.S. total CapEx and compute proxy are separate series. The proxy applies disclosed or inferred short-lived compute shares; aggregate history requires usable coverage for all five companies. Incomplete or estimate-heavy aggregate quarters are excluded. China retains issuer-specific RMB definitions and is not added to the U.S. total. Inferred AI shares and different accounting bases prevent an additive AI-only China total.",
    other: "Compute proxies include AI and non-AI workloads. Tencent uses operating CapEx, Alibaba reported CapEx and Baidu cash CapEx. Missing proxy constituents are not zero-filled. Spending does not establish operational capacity, utilization or return.",
  },
  infrastructure: {
    sources: ["S11"], source: "Epoch AI chip-owner, chip-user and data-center datasets. H100-equivalent capacity, facility power and ownership allocations are modeled estimates rather than measured workloads. Coverage and source dates differ. Facility records cover identified projects rather than the complete global fleet. The 2026Q1 compute decline reflects estimate revisions and fleet-mix changes rather than observed disposals.",
    methodology: "Compare CapEx, operational IT capacity and estimated installed H100 equivalents. Training workloads are expressed as H100e-years; fleet-year shares assume 30% effective utilization. CapEx conversion divides trailing-four-quarter compute spending by YoY additions in estimated H100e or operational MW. Owner estimate ranges sum 5th–95th percentile values; chip thermal load is accelerator TDP, not measured electricity consumption.",
    other: "Owned-chip and facility views overlap and are not added. Spending, delivery and commissioning lags limit conversion-ratio comparisons. CapEx per H100e is not a chip quote; CapEx per MW is not a construction quote. Oracle conversion is withheld without four comparable quarters. Epoch uses CapEx in some allocations, so ownership-to-CapEx correlation is not an independent validation. Installed capacity is not a measure of paid workload utilization. Inference, experiments and cloud workloads remain unmeasured.",
  },
  labs: {
    sources: ["S10"], source: "Workbook records for OpenAI and Anthropic compiled from media reports and investor disclosures. Run rates are estimates, not audited recognized revenue; reported floors and approximations remain labeled.",
    methodology: "Separate full-company recognized revenue from ARR and annualized run rate; FY2025 recognized revenue appears separately in the cards. Compare growth from end-2025. OpenAI’s September 29, 2026 observation is plotted at approximately $70B, based on Reuters and Axios reporting around DevDay, not a verified official DevDay revenue disclosure. Earlier floors remain floor observations. Excludes product/division records and period-interpolation observations.",
    other: "ARR annualizes a point-in-time pace and is neither recognized revenue nor cash collection. Reporting dates and definitions limit direct ranking. Audited quarterly revenue, margins, cash burn and contracted compute demand are needed to connect lab revenue with infrastructure economics.",
  },
  "task-economics": {
    sources: ["S12"], source: "Epoch AI frontier-model and accelerator datasets. Training costs are compute estimates in constant 2023 USD; disclosure is sparse and the latest model records may lack costs.",
    methodology: "Plot cost-bearing model observations and annual median/interquartile range; shading shows the interquartile range of covered estimates. Compare accelerator release-price performance. Training-cost recovery divides estimated compute cost by the illustrated contribution-margin assumptions.",
    other: "Covered observations do not represent every frontier model. Recovery sensitivities exclude serving costs, research payroll, failed experiments, data, financing and overhead. Hardware comparisons exclude systems, networking, power, utilization and purchasing terms. Sensitivities are not forecasts.",
  },
  "useful-task-economics": {
    sources: ["S13"], source: "Workbook prices/run costs, Epoch model coverage and exact model matches to SWE-bench Verified or DeepSWE Pass@1. Benchmark results are system-and-harness observations; unmatched records retain explicit workbook assumptions.",
    methodology: "Estimate cost per successful task from attempt cost and benchmark success. Frontier anchors lie within five ECI points of the dated capability leader, with historical Epoch coverage for legacy models. Best value is the lowest Tier-A observed cost among models with at least 50% success in a trailing 180-day window. Recovery sensitivity assumes a five-year asset life, 10% required return and the displayed margin scenarios: tasks × price × contribution margin ≥ depreciation + required return.",
    other: "This is a derived buyer-side price-performance measure; task expenditure is not infrastructure-owner revenue or profit. Benchmark success is a proxy, not production reliability. Model, harness, reasoning and token assumptions limit comparability. MiniMax, DeepSeek and GLM candidates begin in August 2025 because earlier collected observations lack both comparable success and run cost. The shaded frontier/value gap is not an uncertainty interval.",
  },
  conversion: {
    sources: ["S9", "S1", "S8"], source: "OpenRouter daily rankings refreshed 7 October 2026 through 6 October. Adoption usage includes Q3; comparisons with reported financials remain through Q2. Workbook token prices and company fundamentals retain their own vintages. Coverage is platform-specific. Macro and price inputs have different frequencies and may contain carried values.",
    methodology: "Compare platform traffic, token prices, capital spending and consolidated ROIC over matched displayed periods. Series use separately labeled axes and different units; line steepness does not compare growth rates.",
    other: "Traffic, lab revenue and hyperscaler returns cover different populations. This comparison cannot attribute revenue or NOPAT to a unit of usage, and does not establish causality. Required evidence is cloud revenue, segment profit and realized model spending; price-index × token volume does not establish revenue. It is excluded from the atmosphere scores.",
  },
  roic: {
    sources: [], anchor: "source-S8", source: "S8 · Indexlist.xlsx — Hyperscaler Core Data Value. Cached Bloomberg quarterly NOPAT, equity, debt, cash and lease fields for five companies. Long-term investments are unavailable; lease/debt overlap needs confirmation.",
    methodology: "TTM NOPAT divided by average invested capital, defined as equity + interest-bearing debt − cash and short-term investments. Incremental ROIC compares changes over eight quarters; four quarters is diagnostic. Withhold nonpositive or immaterial capital increases. Add leases only once after confirming debt treatment.",
    other: "Consolidated returns include mature businesses and non-AI investment. Full cash deduction is a simplifying assumption. Lease sensitivity does not add implied lease interest back to NOPAT. Without an AI capital allocation or cost of capital, these measures cannot establish AI value creation. Excluded from the atmosphere scores.",
  },
  sustainability: {
    sources: [], anchor: "source-S7", source: "S7 · Indexlist.xlsx — Hyperscaler Core Data Value. Cached Bloomberg cash flow and cash CapEx; four companies through June 2026 and Oracle through March 2026. Publication dates and actual/estimate flags are not supplied, limiting point-in-time analysis.",
    methodology: "TTM sums use four consecutive quarters; comparisons use the preceding four. CapEx outflows become positive spending. Cash absorption is CapEx / operating cash flow; incremental coverage is incremental cash flow / incremental CapEx. Aggregate dollar sums rather than company ratios; withhold invalid denominators.",
    other: "The aggregate includes Microsoft, Alphabet, Amazon and Meta with matching periods. Oracle is separate and appears calendarized. Missing observations are not zero-filled. Cash CapEx excludes noncash financed assets. Cash funding is not AI-specific ROIC; lease liabilities are balances rather than new financed-asset additions. Excluded from both atmosphere scores.",
  },
  chain: {
    sources: ["S1", "S4", "S5"], source: "Workbook daily stock returns and financial observations for 36 companies. Returns are compounded from December 31, 2025; no FX conversion. Missing daily values remain gaps. Credit coverage remains a smaller separate universe. Historical fundamental scores retain their original 32-company coverage and vintage.",
    methodology: "Market returns, fundamental composites and credit pressure are summarized within each industry role with their displayed equal-weight rules, thresholds and coverage. Structural edges describe industry relationships.",
    other: "Industry connections do not establish supplier contracts or portfolio weights. Different coverage can affect comparisons. Prices, resilience and credit conditions are separate signals; none alone proves capital return.",
  },
  fundamentals: {
    sources: ["S5"], source: "Bloomberg workbook financial screen for 32 companies: 26 at 2026Q2 and six at 2026Q1 fallback. Earlier reports are labeled; no freshness penalty is applied.",
    methodology: "Fundamental composite combines 80% financial resilience and 20% CapEx momentum. Resilience weights revenue growth 20%, EBITDA margin 25%, FCF/EBITDA 25%, inverse net debt/EBITDA 20% and interest coverage 10%. Missing interest coverage is excluded and the remaining resilience weights are renormalized. Return correlations are cross-sectional diagnostics.",
    other: "The screen measures reported financial quality rather than AI-specific profitability. Sector, size, outliers and expectations can affect comparisons. Historical association with stock returns is not validation of predictive timing.",
  },
  credit: {
    sources: ["S4"], source: "Bloomberg-implied issuer 5Y CDS and IBOXUMAE Curncy daily benchmark observations through 7 October 2026. Latest issuer ratings are dated 30 September 2026. Quotes and comparable issuer coverage limit representativeness.",
    methodology: "Daily relative change = change in the equal-weight fixed issuer basket minus change in the general IG benchmark since 31 December 2025. Thirty-day issuer comparisons use matched dates. Latest rating groups are retrospective, not historical ratings. Displayed overall, sector and rating charts use median spread lines with observed minimum–maximum bands and the general IG benchmark. Overall and sector baskets include covered below-IG issuers.",
    other: "Credit spreads reflect market-implied risk and financing conditions rather than observed defaults or AI project returns. Quarterly leverage uses covered issuers with four consecutive EBITDA quarters. Rates, issuer mix, equity volatility and event risk may also move CDS; role comparisons do not establish causality. Issuer and role coverage are shown; the credit adjustment is separate from the five-pillar core index.",
  },
  financing: {
    sources: ["S6"], source: "Bloomberg workbook issuer-month bond issuance amount and count through September 2026, plus US investment-grade corporate issuance through partial October. Both queries use USD amounts. December 2025 has no covered records; latest-month completeness is not certified.",
    methodology: "Sum covered issuer-month amounts into supply-chain sectors. Relative supply = covered issuance / US IG issuance × 100 on matched months. The period ratio divides sums, not average percentages. The numerator includes countries and ratings excluded from the benchmark, so this is not an exact market-share measure. Leave missing numerator months blank and exclude benchmark-only partial October.",
    other: "Issuance measures access to funding, not issuer-specific AI use of proceeds or returns. Supply intensity alongside stable leverage can be consistent with absorption pressure, but issuance cannot identify the cause of CDS changes. A partial month cannot be compared directly with a full month. Bond issuance retains zero weight in the supplementary adjustment until coverage and normalization are resolved.",
  },
  methodology: {
    sources: [], source: "The source register records workbook sheets, company collections, periods and modeled datasets. Cached, estimated and carried observations have different evidence limits.",
    methodology: "Keep the five-pillar core, supplementary fundamental/credit adjustment and separate return analyses distinct. Do not renormalize missing weights or treat missing values as observed zero. Preserve source units, dates and revision vintages.",
    other: "Resolve stale-value controls, incomplete bond history, accounting/FX definitions and robustness tests before changing weights or introducing forward estimates. Current strength in one dimension does not establish profitability across the full investment cycle.",
  },
};

export default function SectionNotes({ section, source, methodology, other }: {
  section: string; source?: ReactNode; methodology?: ReactNode; other?: ReactNode;
}) {
  const note = notes[section];
  if (!note) throw new Error(`Missing section notes: ${section}`);
  return <footer className="section-notes" aria-label={`${section} notes`} data-section-notes={section}>
    <p className="panel-source">Source: {note.sources.length ? note.sources.map(id=><a key={id} className="source-chip" href={`#source-${id}`}>{id}</a>) : "Source register"}</p>
    <details><summary>Sources, methodology and scope</summary><ol>
      <li id={note.anchor}><h4>(1) Data source and reliability</h4><div>{source ?? <p>{note.source}</p>}{note.sources.length > 0 && <p className="section-note-sources">{note.sources.map(id=><a key={id} className="source-chip" href={`#source-${id}`}>{id}</a>)}</p>}</div></li>
      <li><h4>(2) Methodology</h4><div>{methodology ?? <p>{note.methodology}</p>}</div></li>
      <li><h4>(3) Scope and other necessary information</h4><div>{other ?? <p>{note.other}</p>}</div></li>
    </ol></details>
  </footer>;
}
