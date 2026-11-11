"use client";
import {hyperscalerFinancialSnapshot as snapshot} from "./hyperscaler-financial-snapshot";
import {estimateChange} from "./hyperscaler-estimate-change";
import {calendarQuarter, FinancialEstimateTable, FinancialStack, type FinancialPoint} from "./hyperscaler-financial-display";
import styles from "./hyperscaler-demand.module.css";

const companies = snapshot.companies.map(company => ({
  ...company,
  forecasts: company.forecasts.map(point => {
    const change = estimateChange(company.ticker, point.fiscalPeriod, "capex_raw", point.value);
    return {...point, value: change.value ?? point.value, revision: change.revision};
  }),
}));

export default function HyperscalerCapexLatest(){
  return <div className={styles.root}>
    <h3>Capital expenditure</h3>
    <p>Company-wide headline CapEx, including spending beyond AI. Source reviewed {snapshot.metadata.asOf}.</p>
    <FinancialEstimateTable caption="CapEx actuals and financial estimates" showActual companies={companies.map(company => ({
      ...company, forecasts: company.forecasts.map(point => ({...point, status: "estimate" as const})),
      actual: company.actuals.at(-1) ? {...company.actuals.at(-1)!, status: "actual" as const} : undefined,
    }))}/>
    <FinancialStack id="capex" title="Hyperscaler capital expenditure" basis="Calendar quarter of fiscal period end"
      totalLabel="Five-company total" note="Fiscal period ends differ across issuers."
      companies={companies.map(company => ({
        ...company, points: new Map([...company.actuals, ...company.forecasts].map(point => [
          calendarQuarter(point.periodEnd), {...point, status: point.status === "estimate" ? "estimate" : "actual"} satisfies FinancialPoint,
        ])),
      }))}/>
    <p className={styles.scope}>{snapshot.metadata.basis} Source: {snapshot.metadata.source}, {snapshot.metadata.sourceSheet}.</p>
  </div>;
}
