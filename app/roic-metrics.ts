export type RoicQuarter = {
  period: string;
  nopat: number | null;
  cashAndShortTermInvestments: number | null;
  totalDebt: number | null;
  operatingLeaseLiabilities: number | null;
  financeLeaseLiabilitiesCurrent: number | null;
  financeLeaseLiabilitiesLongTerm: number | null;
  shareholdersEquity: number | null;
};

export type RoicCompany = {
  ticker: string;
  name: string;
  readiness: "ready";
  readinessReason: string;
  financeLeasesExcludedFromDebt: boolean | null;
  quarters: readonly RoicQuarter[];
};

const INCREMENTAL_CAPITAL_FLOOR = 0.05;

function sum(rows: readonly RoicQuarter[], field: "nopat") {
  const values = rows.map(row => row[field]);
  return values.every((value): value is number => value !== null && Number.isFinite(value))
    ? values.reduce((total, value) => total + value, 0)
    : null;
}

function consecutive(rows: readonly RoicQuarter[]) {
  return rows.every((row, index) => index === 0 || (() => {
    const days = (Date.parse(row.period) - Date.parse(rows[index - 1].period)) / 86_400_000;
    return days >= 80 && days <= 100;
  })());
}

function capital(row: RoicQuarter, includeLeases: boolean, financeLeasesExcludedFromDebt: boolean | null) {
  const required = [row.shareholdersEquity, row.totalDebt, row.cashAndShortTermInvestments];
  if (!required.every((value): value is number => value !== null && Number.isFinite(value))) return null;
  let value = row.shareholdersEquity! + row.totalDebt! - row.cashAndShortTermInvestments!;
  if (!includeLeases) return value;
  if (financeLeasesExcludedFromDebt === null || row.operatingLeaseLiabilities === null || row.financeLeaseLiabilitiesCurrent === null || row.financeLeaseLiabilitiesLongTerm === null) return null;
  value += row.operatingLeaseLiabilities;
  if (financeLeasesExcludedFromDebt) value += row.financeLeaseLiabilitiesCurrent + row.financeLeaseLiabilitiesLongTerm;
  return value;
}

function endpoint(company: RoicCompany, endIndex: number, includeLeases: boolean) {
  const rows = [...company.quarters].sort((a, b) => a.period.localeCompare(b.period));
  if (endIndex < 4) return null;
  const capitalWindow = rows.slice(endIndex - 4, endIndex + 1);
  const ttm = rows.slice(endIndex - 3, endIndex + 1);
  if (capitalWindow.length !== 5 || ttm.length !== 4 || !consecutive(capitalWindow)) return null;
  const nopat = sum(ttm, "nopat");
  if (nopat === null) return null;
  const endingCapital = capital(rows[endIndex], includeLeases, company.financeLeasesExcludedFromDebt);
  const beginningCapital = capital(rows[endIndex - 4], includeLeases, company.financeLeasesExcludedFromDebt);
  if (endingCapital === null || beginningCapital === null) return null;
  const averageCapital = (beginningCapital + endingCapital) / 2;
  return averageCapital > 0 ? { period: rows[endIndex].period, nopat, beginningCapital, endingCapital, averageCapital, roic: nopat / averageCapital } : null;
}

export function calculateRoic(company: RoicCompany, includeLeases = false) {
  const rows = [...company.quarters].sort((a, b) => a.period.localeCompare(b.period));
  let latestIndex = rows.length - 1;
  while (latestIndex >= 0 && !endpoint(company, latestIndex, false)) latestIndex -= 1;
  const latest = latestIndex >= 0 ? endpoint(company, latestIndex, includeLeases) : null;
  const priorYear = endpoint(company, latestIndex - 4, includeLeases);
  const eightQuartersAgo = endpoint(company, latestIndex - 8, includeLeases);
  if (!latest) return { status: "unavailable" as const, reason: "Insufficient consecutive, complete inputs for current TTM ROIC." };

  const roicChange = priorYear ? latest.roic - priorYear.roic : null;
  const incremental = (earlier: typeof latest, label: string) => {
    if (!earlier) return { value: null, reason: `${label} comparison is unavailable because the source history is insufficient.` };
    const deltaCapital = latest.averageCapital - earlier.averageCapital;
    if (deltaCapital <= 0) return { value: null, reason: "Change in average invested capital is non-positive." };
    if (deltaCapital < Math.abs(earlier.averageCapital) * INCREMENTAL_CAPITAL_FLOOR) return { value: null, reason: "Change in average invested capital is below the 5% materiality floor." };
    return { value: (latest.nopat - earlier.nopat) / deltaCapital, reason: "Available" };
  };
  const incremental4q = incremental(priorYear, "Four-quarter");
  const incremental8q = incremental(eightQuartersAgo, "Eight-quarter");

  return {
    status: "ready" as const, latest, priorYear, eightQuartersAgo, roicChange,
    incrementalRoic4q: incremental4q.value, incrementalRoic4qReason: incremental4q.reason,
    incrementalRoic8q: incremental8q.value, incrementalRoic8qReason: incremental8q.reason,
    includeLeases,
  };
}
