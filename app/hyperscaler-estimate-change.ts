import {estimateHistory} from "./hyperscaler-estimate-history";

type EstimateRow = (typeof estimateHistory)[number];
const seriesByMetric = new Map<string, EstimateRow[]>();
const captures = new Map<string, string>();
for (const row of estimateHistory) {
  captures.set(row[1], row[0]);
  const key = [row[2], row[3], row[4]].join("|");
  const series = seriesByMetric.get(key) ?? [];
  series.push(row);
  seriesByMetric.set(key, series);
}
const [currentCapture, priorCapture] = [...captures.keys()].sort().reverse();
export const estimateComparison = {
  currentDate: captures.get(currentCapture),
  previousDate: captures.get(priorCapture),
};

export type EstimateRevision = {delta: number; previous: number};

export function estimateChange(ticker: string, fiscalPeriod: string, metric: string, workbookValue: number) {
  const series = seriesByMetric.get([ticker, fiscalPeriod, metric].join("|"));
  const latest = series?.at(-1);
  const scale = metric === "capex_raw" ? -1e9 : 1e9;
  // The database stores revisions only. An older row remains in effect at both imports.
  const latestValue = latest ? latest[5] / scale : undefined;
  if (latestValue === undefined || Math.abs(latestValue - workbookValue) > 1e-8) {
    return {value: workbookValue, revision: undefined};
  }
  const prior = priorCapture && series ? [...series].reverse().find(row => row[1] <= priorCapture) : undefined;
  const previous = prior ? prior[5] / scale : undefined;
  const revision = previous !== undefined ? {delta: latestValue - previous, previous} : undefined;
  return {value: latestValue, revision};
}

export function revisionLabel(revision: EstimateRevision) {
  const delta = Math.abs(revision.delta) < 1e-9 ? 0 : revision.delta;
  const amount = Math.abs(delta).toLocaleString("en-US", {maximumFractionDigits: 2});
  if (!delta) return "Unchanged";
  if (amount === "0") return delta > 0 ? "+<$0.01B" : "−<$0.01B";
  return `${delta > 0 ? "+" : "−"}$${amount}B`;
}
