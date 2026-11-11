import { estimateHistory } from "./hyperscaler-estimate-history";

const histories = new Map<string, typeof estimateHistory>();
for (const row of estimateHistory) {
  const key = [row[2], row[3], row[4]].join("|");
  const series = histories.get(key);
  if (series) series.push(row);
  else histories.set(key, [row]);
}

export function estimateChange(ticker: string, fiscalPeriod: string, metric: string, workbookValue?: number) {
  const series = histories.get([ticker, fiscalPeriod, metric].join("|"));
  const latest = series?.at(-1);
  const previous = series?.at(-2);
  const scale = metric === "capex_raw" ? -1e9 : 1e9;
  const latestValue = latest ? latest[5] / scale : undefined;
  if (latest && latestValue !== undefined && workbookValue !== undefined &&
      Math.abs(workbookValue - latestValue) > 1e-8) {
    return {
      value: workbookValue,
      revision: {delta: workbookValue - latestValue, date: latest[0], workbook: true},
    };
  }
  return {
    value: latestValue,
    revision: latest && previous ? {
      delta: (latest[5] - previous[5]) / scale,
      date: latest[0],
      workbook: false,
    } : undefined,
  };
}

export function revisionLabel(revision: NonNullable<ReturnType<typeof estimateChange>["revision"]>) {
  const direction = revision.delta > 0 ? "↑" : revision.delta < 0 ? "↓" : "→";
  const amount = Math.abs(revision.delta).toLocaleString("en-US", { maximumSignificantDigits: 4 });
  const dateLabel = revision.workbook ? `prior capture ${revision.date}` : revision.date;
  return `${direction} ${amount}B vs prior recorded estimate · ${dateLabel}`;
}
