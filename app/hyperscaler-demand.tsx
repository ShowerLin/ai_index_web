import {cloudReferenceSnapshot as cloud} from "./cloud-reference-snapshot";
import {hyperscalerFinancialSnapshot as financials} from "./hyperscaler-financial-snapshot";
import {estimateChange} from "./hyperscaler-estimate-change";
import {calendarQuarter, FinancialEstimateTable, FinancialStack} from "./hyperscaler-financial-display";
import styles from "./hyperscaler-demand.module.css";

const companies=[
 {ticker:"MSFT",name:"Microsoft",revenue:"MSFT Intelligent Cloud",rpo:"MSFT Commerical RPO"},
 {ticker:"GOOGL",name:"Alphabet",revenue:"Google Cloud",rpo:"Google Cloud RPO"},
 {ticker:"AMZN",name:"Amazon",revenue:"AWS",rpo:"AMZN RPO"},
 {ticker:"ORCL",name:"Oracle",revenue:"ORCL Cloud&Software",rpo:"Oracle RPO"},
 {ticker:"META",name:"Meta",revenue:"",rpo:""},
] as const;

const metrics = [
  {name: "Cloud revenue", sourceMetric: "Revenue", entity: "revenue", databaseMetric: "cloud_revenue"},
  {name: "Remaining performance obligations (RPO)", sourceMetric: "RPO", entity: "rpo", databaseMetric: "cloud_rpo"},
] as const;

function CloudMetric({metric, today}: {metric: typeof metrics[number]; today: string}) {
  const rows = companies.map(company => {
    const observations = cloud.observations
      .filter(row => row.entity === company[metric.entity] && row.metric === metric.sourceMetric)
      .map(row => {
        const fiscalPeriod = `20${row.fiscalPeriod.slice(2)} Q${row.fiscalPeriod[0]}`;
        const periodEnd = "periodEnd" in row && typeof row.periodEnd === "string" ? row.periodEnd : undefined;
        const status = periodEnd && periodEnd <= today ? "actual" as const : "estimate" as const;
        const change = status === "estimate"
          ? estimateChange(company.ticker, fiscalPeriod, metric.databaseMetric, row.value)
          : {value: row.value, revision: undefined};
        return {fiscalPeriod, periodEnd, ...change, status};
      });
    const quarters = financials.companies.find(row => row.ticker === company.ticker)?.forecasts ?? [];
    const forecasts = quarters.filter(quarter => quarter.periodEnd > today).slice(0,4).map(quarter => {
      const point = observations.find(row => row.periodEnd
        ? row.periodEnd === quarter.periodEnd
        : row.fiscalPeriod === quarter.fiscalPeriod);
      return point && {...point, periodEnd: point.periodEnd ?? quarter.periodEnd};
    });
    const points = new Map(observations.flatMap(point => point.periodEnd
      ? [[calendarQuarter(point.periodEnd), point] as const]
      : []));
    return {...company, forecasts, points};
  });

  return <section className={styles.root}>
    <h3>{metric.name}</h3>
    <p>{metric.sourceMetric === "Revenue"
      ? "Quarterly revenue for each issuer’s covered cloud or cloud and software segment."
      : "Contracted backlog at quarter end. Coverage ranges from cloud segments to broader issuer obligations."}</p>
    <FinancialEstimateTable caption={`${metric.sourceMetric === "Revenue" ? "Cloud revenue" : "RPO"} financial estimates`} companies={rows}/>
    <FinancialStack title={`${metric.sourceMetric === "Revenue" ? "Cloud revenue" : "RPO"} by company`}
      basis="Calendar quarter of workbook period end"
      totalLabel="Total for covered companies"
      note="Hover over a bar segment for the issuer’s exact period end. Totals can include different period-end dates within the same calendar quarter."
      companies={rows.filter(row => row.points.size > 0)}/>
  </section>;
}

export default function HyperscalerDemand() {
  const today = financials.metadata.asOf;
  return <div className={styles.root}>
    {metrics.map(metric => <CloudMetric key={metric.sourceMetric} metric={metric} today={today}/>)}
    <p className={styles.scope}>Source: {cloud.metadata.source}, {cloud.metadata.sheet}, The chart shades estimates for periods ending after {today}. The workbook pulls Bloomberg’s estimate field for all periods. Meta has no comparable cloud revenue or RPO series in this dataset.</p>
  </div>;
}
