import { monthlyHeatmapSnapshot } from "./monthly-heatmap-snapshot";
import { coreProjectionSnapshot } from "./core-projection-snapshot";
import { weeklyPulse } from "./weekly-pulse-snapshot";
import { weeklySignalCount } from "./weekly-pulse-signals";
import { adoptionPriceSnapshot } from "./adoption-price-snapshot";
import { tokenActivitySnapshot } from "./token-activity-snapshot";
import { rampSnapshot } from "./ramp-snapshot";
import { monetizationSnapshot } from "./monetization-snapshot";
import { frontierLabsSnapshot } from "./frontier-labs-snapshot";
import { hyperscalerFinancialSnapshot } from "./hyperscaler-financial-snapshot";
import { estimateComparison } from "./hyperscaler-estimate-change";
import { infrastructureSnapshot } from "./infrastructure-snapshot";
import { electricityCapacity } from "./electricity-capacity-snapshot";
import { taskEconomicsSnapshot } from "./task-economics-snapshot";
import { workbookAmendments } from "./workbook-amendments-snapshot";
import { supplyChainStockSnapshot } from "./supply-chain-stock-snapshot";
import { semiconductorMarket } from "./semiconductor-market-snapshot";
import { industryChainSnapshotMetadata } from "./industry-chain-snapshot";
import financing from "../data/circular-financing.json";

export default function DataFreshness() {
  const latestPulse = weeklyPulse.findLast(row => row.pulse !== null);
  const fullPulse = weeklyPulse.findLast(row => row.signals_available === weeklySignalCount);
  const latestMarket = weeklyPulse.findLast(row => row.xsox_vs_spxt_4w_pct !== null);
  const latestOpenRouterSpend = adoptionPriceSnapshot.openrouterSpendingDaily.findLast(row => row.estimatedSpendUsd !== null);
  const latestCapexActual = hyperscalerFinancialSnapshot.companies.flatMap(company =>
    company.actuals.map(point => point.periodEnd)).sort().at(-1);
  const latestSemiconductors = semiconductorMarket.reduce<string>(
    (latest, row) => row.date > latest ? row.date : latest, "",
  );
  const sections = [
    ["heatmap", "Pulse", [
      ["Core projection baseline", coreProjectionSnapshot.metadata.anchorMonth],
      ["Completed monthly workbook inputs through", monthlyHeatmapSnapshot.metadata.completedMonthThrough],
      [`Latest scored week · ${latestPulse?.signals_available ?? 0}/${weeklySignalCount} signals`, latestPulse?.week_end],
      ["Latest week with all pulse signals", fullPulse?.week_end],
      ["Pulse market comparison close", latestMarket?.market_close],
    ]],
    ["adoption", "Adoption", [
      ["Ramp paid adoption through", rampSnapshot.metadata.through],
      ["Ramp publisher token weeks through", tokenActivitySnapshot.metadata.rampThrough],
      ["OpenRouter activity through", tokenActivitySnapshot.metadata.openrouterThrough],
    ]],
    ["monetization", "Monetization", [
      ["Ramp business spending through", rampSnapshot.metadata.through],
      ["OpenRouter spending and weighted price through", latestOpenRouterSpend?.date],
      ["Bloomberg token price through", adoptionPriceSnapshot.metadata.through],
      ["OpenRouter price catalog date", adoptionPriceSnapshot.metadata.openrouterPricing.latestVintage],
      ["Reported public-company revenue through", monetizationSnapshot.metadata.reportedThrough],
      ["Frontier lab snapshot as of", frontierLabsSnapshot.metadata.asOf],
      ["Lab quarterly revenue reviewed", frontierLabsSnapshot.metadata.quarterlyReviewedOn],
      ["Consumer card spending through", monetizationSnapshot.appSpending.history.at(-1)?.date],
    ]],
    ["hyperscalers", "Hyperscalers", [
      ["CapEx workbook reviewed", hyperscalerFinancialSnapshot.metadata.asOf],
      ["Latest reported CapEx quarter end across issuers", latestCapexActual],
      ["Latest CapEx, cloud financials and RPO estimate import", estimateComparison.currentDate],
      ["Prior import used for revisions", estimateComparison.previousDate],
    ]],
    ["utilization", "Infrastructure", [
      ["Data centers as of", infrastructureSnapshot.metadata.dataCenterAsOf],
      ["Chip deployment as of", infrastructureSnapshot.metadata.chipAsOf],
      ["Electricity research cutoff", electricityCapacity.cutoff],
    ]],
    ["financial", "Funding & recovery", [
      ["Financing information cutoff", financing.informationCutoff],
      ["Training model dataset as of", taskEconomicsSnapshot.metadata.modelDatasetAsOf],
    ]],
    ["market", "Market", [
      ["Supply-chain equities as of", supplyChainStockSnapshot.metadata.asOf],
      ["Semiconductor series through", latestSemiconductors],
      ["Issuer CDS through", workbookAmendments.metadata.creditAsOf],
      ["IG benchmark through", workbookAmendments.metadata.creditBenchmarkAsOf],
      ["Matched bond issuance through", workbookAmendments.bondBenchmark.latestMatchedMonth],
    ]],
    ["chain", "Industry chain", [
      ["Market prices as of", industryChainSnapshotMetadata.priceAsOf],
    ]],
  ] as const;

  return (
    <section className="section data-freshness" id="data-freshness" aria-labelledby="data-freshness-title">
      <h2 id="data-freshness-title">Dashboard data freshness</h2>
      <p>Source dates and coverage cutoffs for the data shown in each section. Series within a section can update on different schedules.</p>
      <div className="data-freshness-scroll" tabIndex={0} role="region" aria-label="Data freshness by section">
        <table>
          <thead><tr><th scope="col">Section</th><th scope="col">Source or coverage</th><th scope="col">Date</th></tr></thead>
          {sections.map(([id, label, sources]) => (
            <tbody key={id}>{sources.map(([source, date], index) => (
              <tr key={source}>
                {index === 0 && <th scope="rowgroup" rowSpan={sources.length}><a href={`#${id}`}>{label}</a></th>}
                <td>{source}</td>
                <td>{date ? <time dateTime={date}>{date}</time> : "Unavailable"}</td>
              </tr>
            ))}</tbody>
          ))}
        </table>
      </div>
    </section>
  );
}
