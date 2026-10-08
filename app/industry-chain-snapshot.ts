import type { PriceRow } from "./industry-chain-data";
import { supplyChainStockSnapshot as refreshed } from "./supply-chain-stock-snapshot";

export const industryChainSnapshotMetadata = {
  source: "Indexlist.xlsx",
  priceSheet: "Supply Chain Stock Value",
  financialSheet: "Supply Chain Financial Value",
  fundamentalSheet: "Financial Resilience",
  fundamentalSource: "outputs/20260825_satellite_indicators/indexlist_satellite_indicators_v1.xlsx",
  priceAsOf: refreshed.metadata.asOf,
  coverage: refreshed.metadata.coverage,
  q2FinancialCoverage: refreshed.metadata.q2FinancialCoverage,
  q1FinancialFallback: refreshed.metadata.q1FinancialFallback,
  oneDayAvailable: true,
} as const;



const fundamentalCompositeScores: Record<string, number> = {
  MSFT:54.8335, CRM:53.1018, ADBE:40.4348, PLTR:69.3511,
  AMZN:32.2782, GOOGL:46.1745, META:35.8551, ORCL:41.1591,
  NVDA:74.9963, AMD:44.6732, AVGO:66.1123, MRVL:36.9252,
  ASML:55.1711, AMAT:63.5498, LRCX:66.6489, KLAC:55.3717,
  MU:74.3356, WDC:72.2486, STX:65.4754, SNDK:84.7240,
  DELL:40.6295, HPE:39.9680, ANET:77.1644, CSCO:39.7366,
  EQIX:34.1028, DLR:42.2966, VRT:54.4022, IRM:31.6686,
  CEG:21.3942, VST:32.4117, ETN:28.3902, PWR:62.8172,
};

export function snapshotPriceRows(): Record<string, PriceRow> {
  return Object.fromEntries(Object.entries(refreshed.companies).map(([ticker,value])=>[ticker,{
    ...value,
    fundamentalComposite:fundamentalCompositeScores[ticker]??null,
    asOf:industryChainSnapshotMetadata.priceAsOf,
  }]));
}
