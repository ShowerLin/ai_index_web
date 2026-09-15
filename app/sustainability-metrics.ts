export type Quarter = { period: string; cfo: number | null; capex: number | null };
export type CashPeriod = { cfo: number; capex: number };
export function cashMetrics(current: CashPeriod, previous: CashPeriod) {
  const deltaCapex = current.capex - previous.capex;
  return {
    current, previous,
    fcf: current.cfo - current.capex,
    previousFcf: previous.cfo - previous.capex,
    absorption: current.cfo > 0 ? current.capex / current.cfo : null,
    previousAbsorption: previous.cfo > 0 ? previous.capex / previous.cfo : null,
    incrementalCoverage: deltaCapex > 0 ? (current.cfo - previous.cfo) / deltaCapex : null,
    cfoGrowth: previous.cfo > 0 ? current.cfo / previous.cfo - 1 : null,
    capexGrowth: previous.capex > 0 ? current.capex / previous.capex - 1 : null,
  };
}
export function rollingCash(quarters: Quarter[]) {
  const ordered = [...quarters].sort((a, b) => a.period.localeCompare(b.period));
  return ordered.flatMap((q, i) => {
    if (i < 7) return [];
    const window = ordered.slice(i - 7, i + 1);
    if (window.some((r, j) => r.cfo === null || r.capex === null || !Number.isFinite(r.cfo) || !Number.isFinite(r.capex) || (j > 0 && (Date.parse(r.period) - Date.parse(window[j - 1].period)) / 86400000 < 80) || (j > 0 && (Date.parse(r.period) - Date.parse(window[j - 1].period)) / 86400000 > 100))) return [];
    const sum = (rows: Quarter[]) => rows.reduce((a, r) => ({ cfo: a.cfo + r.cfo!, capex: a.capex + r.capex! }), { cfo: 0, capex: 0 });
    return [{ period: q.period, ...cashMetrics(sum(window.slice(4)), sum(window.slice(0, 4))) }];
  });
}
