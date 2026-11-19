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
import financing from "../data/circular-financing.json";

const latestOpenRouterSpend = adoptionPriceSnapshot.openrouterSpendingDaily.findLast(row => row.estimatedSpendUsd !== null);
const latestCapexActual = hyperscalerFinancialSnapshot.companies.flatMap(company =>
  company.actuals.map(point => point.periodEnd)).sort().at(-1);
const latestSemiconductors = semiconductorMarket.reduce<string>(
  (latest, row) => row.date > latest ? row.date : latest, "",
);

const sourceDates = {
  adoption: [
    ["Ramp paid adoption through", rampSnapshot.metadata.through],
    ["Ramp publisher token weeks through", tokenActivitySnapshot.metadata.rampThrough],
    ["OpenRouter activity through", tokenActivitySnapshot.metadata.openrouterThrough],
  ],
  monetization: [
    ["Ramp business spending through", rampSnapshot.metadata.through],
    ["OpenRouter spending and weighted price through", latestOpenRouterSpend?.date],
    ["Bloomberg token price through", adoptionPriceSnapshot.metadata.through],
    ["OpenRouter price catalog date", adoptionPriceSnapshot.metadata.openrouterPricing.latestVintage],
    ["Reported public-company revenue through", monetizationSnapshot.metadata.reportedThrough],
    ["Frontier lab snapshot as of", frontierLabsSnapshot.metadata.asOf],
    ["Lab quarterly revenue reviewed", frontierLabsSnapshot.metadata.quarterlyReviewedOn],
    ["Consumer card spending through", monetizationSnapshot.appSpending.history.at(-1)?.date],
  ],
  hyperscalers: [
    ["CapEx workbook reviewed", hyperscalerFinancialSnapshot.metadata.asOf],
    ["Latest reported CapEx quarter end across issuers", latestCapexActual],
    ["Latest CapEx, cloud financials and RPO estimate import", estimateComparison.currentDate],
    ["Prior import used for revisions", estimateComparison.previousDate],
  ],
  utilization: [
    ["Data centers as of", infrastructureSnapshot.metadata.dataCenterAsOf],
    ["Chip deployment as of", infrastructureSnapshot.metadata.chipAsOf],
    ["Electricity research cutoff", electricityCapacity.cutoff],
  ],
  financial: [
    ["Financing information cutoff", financing.informationCutoff],
    ["Training model dataset as of", taskEconomicsSnapshot.metadata.modelDatasetAsOf],
  ],
  market: [
    ["Supply-chain equities as of", supplyChainStockSnapshot.metadata.asOf],
    ["Semiconductor series through", latestSemiconductors],
    ["Issuer CDS through", workbookAmendments.metadata.creditAsOf],
    ["IG benchmark through", workbookAmendments.metadata.creditBenchmarkAsOf],
    ["Matched bond issuance through", workbookAmendments.bondBenchmark.latestMatchedMonth],
  ],
} as const;

export default function DataFreshness({ section }: { section: keyof typeof sourceDates }) {
  return (
    <details className="section-coverage">
      <summary>Source dates</summary>
      <dl>
        {sourceDates[section].map(([source, date]) => (
          <div key={source}>
            <dt>{source}</dt>
            <dd>{date ? <time dateTime={date}>{date}</time> : "Unavailable"}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
