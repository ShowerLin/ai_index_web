"use client";
import {hyperscalerFinancialSnapshot as snapshot} from "./hyperscaler-financial-snapshot";
import {coreProjectionSnapshot as projection} from "./core-projection-snapshot";
import {estimateChange} from "./hyperscaler-estimate-change";
import {calendarQuarter, CapexRevisionChart, FinancialEstimateTable, FinancialStack, type FinancialPoint} from "./hyperscaler-financial-display";
import styles from "./hyperscaler-demand.module.css";

const companies = snapshot.companies.map(company => ({
  ...company,
  forecasts: company.forecasts.map(point => {
    const change = estimateChange(company.ticker, point.fiscalPeriod, "capex_raw", point.value);
    return {...point, value: change.value, revision: change.revision};
  }),
}));

export default function HyperscalerCapexLatest(){
  const quarter = projection.quarters[0];
  const anchor = projection.months.find(point => point.month === projection.metadata.anchorMonth);
  const reported = quarter?.availableEstimate;
  const sensitivity = reported ?? quarter;
  const impact = sensitivity && anchor ? sensitivity.composite - anchor.value : null;

  return <div className={styles.root}>
    <h3>Capital expenditure</h3>
    <p>Company-wide headline CapEx, including spending beyond AI. Source reviewed {snapshot.metadata.asOf}.</p>
    <FinancialEstimateTable caption="CapEx actuals and financial estimates" showActual companies={companies.map(company => ({
      ...company, forecasts: company.forecasts.map(point => ({...point, status: "estimate" as const})),
      actual: company.actuals.at(-1) ? {...company.actuals.at(-1)!, status: "actual" as const} : undefined,
    }))}/>
    <CapexRevisionChart companies={companies}/>
    <FinancialStack id="capex" title="Hyperscaler capital expenditure" basis="Calendar quarter of fiscal period end"
      totalLabel="Five-company total" note="Fiscal period ends differ across issuers."
      companies={companies.map(company => ({
        ...company, points: new Map([...company.actuals, ...company.forecasts].map(point => [
          calendarQuarter(point.periodEnd), {...point, status: point.status === "estimate" ? "estimate" : "actual"} satisfies FinancialPoint,
        ])),
      }))}/>
    <p className={styles.scope}>{snapshot.metadata.basis} Source: {snapshot.metadata.source}, {snapshot.metadata.sourceSheet}.</p>
    {sensitivity && anchor && impact !== null && <details className="evidence-data" id="hyperscaler-capex-sensitivity">
      <summary>CapEx sensitivity · {quarter.quarter} · {impact > 0 ? "+" : ""}{impact.toFixed(1)} core points</summary>
      <p>Holding Adoption, Monetization and Infrastructure at their {anchor.month} scores, the CapEx update moves the core from {anchor.value.toFixed(1)} to {sensitivity.composite.toFixed(1)}.</p>
      <p>{reported
        ? <>Uses reported calendar-quarter CapEx for {reported.tickers.length} of {reported.expected} companies ({reported.tickers.join(", ")}) as of {projection.metadata.reportedCapexAsOf}. Trailing growth compares the same companies in both years.</>
        : <>Uses the five-company CapEx forecast for the quarter.</>} The calculation applies the June adjustment for accounting differences and the June scoring baseline.</p>
      <div className="signal-table-wrap"><table>
        <thead><tr><th>Quarter</th><th>Adjusted CapEx ($B)</th><th>Trailing 4Q YoY</th><th>Hyperscalers score</th><th>Conditional core</th></tr></thead>
        <tbody><tr><th>{quarter.quarter}</th><td>{sensitivity.total.toFixed(1)}</td><td>{sensitivity.growth.toFixed(1)}%</td><td>{sensitivity.capexScore.toFixed(1)}</td><td>{sensitivity.composite.toFixed(1)}</td></tr></tbody>
      </table></div>
    </details>}
  </div>;
}
