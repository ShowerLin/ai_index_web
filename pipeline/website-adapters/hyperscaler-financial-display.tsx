import {estimateComparison, revisionLabel, type EstimateRevision} from "./hyperscaler-estimate-change";
import styles from "./hyperscaler-demand.module.css";

export type FinancialPoint = {
  fiscalPeriod: string;
  periodEnd?: string;
  value: number;
  status: "actual" | "estimate";
  revision?: EstimateRevision;
};

type CompanyEstimates = {
  ticker: string;
  name: string;
  actual?: FinancialPoint & {yoy: number | null};
  forecasts: readonly (FinancialPoint | undefined)[];
};

export function FinancialEstimateTable({caption, companies, showActual = false}: {
  caption: string;
  companies: readonly CompanyEstimates[];
  showActual?: boolean;
}) {
  return <div className={`${styles.scroll} ${styles.card}`}>
    <table>
      <caption>{caption} · USD billions{estimateComparison.previousDate &&
        <><br/><small>{estimateComparison.currentDate} import vs. {estimateComparison.previousDate} import</small></>}
      </caption>
      <thead><tr><th scope="col">Company</th>{showActual && <><th scope="col">Latest actual</th><th scope="col">YoY</th></>}{[1,2,3,4].map(n => <th scope="col" key={n}>Estimate Q+{n}</th>)}{showActual && <th scope="col">Next four quarters</th>}</tr></thead>
      <tbody>{companies.map(company => {
        const actual = company.actual;
        const forward = company.forecasts.slice(0, 4).filter(point => point !== undefined);
        const forwardTotal = forward.length === 4 ? forward.reduce((sum, point) => sum + point.value, 0) : null;
        const comparable = forwardTotal !== null && forward.every(point => point.revision !== undefined);
        const priorTotal = comparable ? forward.reduce((sum, point) => sum + point.revision!.previous, 0) : null;
        return <tr key={company.ticker}>
          <th scope="row">{company.name}</th>
          {showActual && <>
            <td>{actual ? <><strong>${actual.value.toFixed(1)}</strong><br/><small>FY {actual.fiscalPeriod} · {actual.periodEnd}</small></> : "—"}</td>
            <td>{actual?.yoy != null ? `${actual.yoy>=0?"+":""}${actual.yoy.toFixed(1)}%` : "—"}</td>
          </>}
          {[0,1,2,3].map(index => {
            const point = company.forecasts[index];
            const label = point?.revision ? revisionLabel(point.revision) : undefined;
            return <td key={index}>{point ? <><strong>${point.value.toFixed(1)}</strong><br/><small>{label ?? "No prior estimate"}</small><br/><small>FY {point.fiscalPeriod}{point.periodEnd && ` · ${point.periodEnd}`}</small></> : "—"}</td>;
          })}
          {showActual && <td>{forwardTotal === null ? "—" : <>
            <strong>${forwardTotal.toFixed(1)}</strong><br/>
            <small>{priorTotal === null ? "No comparable total" : revisionLabel({delta: forwardTotal - priorTotal, previous: priorTotal})}</small>
          </>}</td>}
        </tr>;
      })}</tbody>
    </table>
    <p className={styles.scope}>Changes compare the same issuer and fiscal quarter across imports.{showActual && " The four-quarter CapEx change uses the same four fiscal quarters in both imports."}</p>
  </div>;
}

const companyColors: Record<string,string> = {
  MSFT: "#237d67", GOOGL: "#426d99", AMZN: "#bd7738", META: "#895a9e", ORCL: "#a34d49",
};

export function calendarQuarter(date: string) {
  return `${date.slice(0, 4)} Q${Math.ceil(Number(date.slice(5, 7)) / 3)}`;
}

export function CapexRevisionChart({companies}: {companies: readonly CompanyEstimates[]}) {
  const points = companies.flatMap(company => company.forecasts.flatMap(point =>
    point?.periodEnd && point.revision
      ? [{ticker: company.ticker, name: company.name, quarter: calendarQuarter(point.periodEnd),
          periodEnd: point.periodEnd, revision: point.revision}]
      : []));
  if (!points.length) return null;
  const quarters = [...new Set(points.map(point => point.quarter))].sort();
  const limit = Math.max(1, ...points.map(point => Math.abs(point.revision.delta)));
  const step = 775 / quarters.length;
  const width = Math.min(26, step * .8 / companies.length);
  const center = (quarter: string) => 70 + (quarters.indexOf(quarter) + .5) * step;
  const y = (delta: number) => 120 - delta / limit * 90;
  return <article className={`${styles.card} research-card`}>
    <h4>CapEx estimate changes</h4>
    <p>USD billions · {estimateComparison.currentDate} vs. {estimateComparison.previousDate}</p>
    <div className="pillar-series-legend">{companies.map(company =>
      <span key={company.ticker} style={{color: companyColors[company.ticker]}}>■ {company.name}</span>)}</div>
    <svg viewBox="0 0 880 250" role="img" aria-label="CapEx estimate changes by company and quarter">
      {[-1,-.5,0,.5,1].map(tick => <g key={tick}>
        <line x1="70" x2="845" y1={y(limit * tick)} y2={y(limit * tick)} stroke={tick === 0 ? "#66756e" : "#d9ddd7"}/>
        <text x="60" y={y(limit * tick) + 4} textAnchor="end" fontSize="11">{(limit * tick).toFixed(1)}</text>
      </g>)}
      {quarters.map(quarter => <text key={quarter} x={center(quarter)} y="234" textAnchor="middle" fontSize="12">{quarter}</text>)}
      {points.map(point => {
        const slot = companies.findIndex(company => company.ticker === point.ticker);
        const height = Math.abs(y(point.revision.delta) - y(0));
        return <rect key={`${point.ticker}-${point.periodEnd}`} fill={companyColors[point.ticker]}
          x={center(point.quarter) + (slot - companies.length / 2) * width} width={width - 2}
          y={Math.min(y(point.revision.delta), y(0))} height={Math.max(1, height)}>
          <title>{`${point.name} · ${point.periodEnd} · ${revisionLabel(point.revision)}`}</title>
        </rect>;
      })}
    </svg>
    <p className={styles.scope}>Grouped by the calendar quarter of each issuer’s fiscal period end. Bars require estimates in both imports.</p>
  </article>;
}

export function FinancialStack({id, title, basis, note, totalLabel, companies}: {
  id?: string;
  title: string;
  basis: string;
  note: string;
  totalLabel: string;
  companies: readonly {ticker: string; name: string; points: Map<string, FinancialPoint>}[];
}) {
  const series = companies.map(company => company.points);
  const quarters = [...new Set(series.flatMap(points => [...points.keys()]))].sort();
  if (!quarters.length) return <p>Period-end dates are unavailable for {title.toLowerCase()}.</p>;
  const bars = quarters.map(period => {
    let total = 0;
    const segments = series.flatMap((points, index) => {
      const point = points.get(period);
      if (!point) return [];
      const bottom = total;
      total += point.value;
      return [{point, index, bottom}];
    });
    return {period, segments, total, estimated: segments.some(segment => segment.point.status === "estimate")};
  });
  const ceiling = Math.max(1, ...bars.map(bar => bar.total)) * 1.08;
  const step = 790 / Math.max(1, bars.length);
  const x = (i: number) => 60 + (i + .5) * step;
  const y = (v: number) => 245 - v / ceiling * 210;
  return <article id={id} className={`${styles.card} research-card`}>
    <h4>{title}</h4>
    <p>USD billions · {basis}</p>
    <div className="pillar-series-legend">
      {companies.map((company, i) => <span key={company.ticker} style={{color: companyColors[company.ticker]}}>■ {company.name}</span>)}
      <span>● {totalLabel}</span>
    </div>
    <svg viewBox="0 0 880 292" role="img" aria-label={title}>
      {[0,.25,.5,.75,1].map(f => <g key={f}><line x1="60" x2="850" y1={y(ceiling*f)} y2={y(ceiling*f)} stroke="#d9ddd7"/><text x="52" y={y(ceiling*f)+4} textAnchor="end" fontSize="11">{(ceiling*f).toFixed(0)}</text></g>)}
      {bars.map((bar,i) => <g key={bar.period}>
        {bar.segments.map(({point,index,bottom}) => <rect key={index} x={x(i)-step*.34} y={y(bottom+point.value)} width={step*.68} height={y(bottom)-y(bottom+point.value)} fill={companyColors[companies[index].ticker]} opacity={point.status==="estimate"?.45:1}>
          <title>{`${companies[index].name} · FY ${point.fiscalPeriod}${point.periodEnd ? ` · ${point.periodEnd}` : ""}: $${point.value.toFixed(1)}B · ${point.status}${point.revision ? ` · ${revisionLabel(point.revision)} vs. ${estimateComparison.previousDate}` : ""}`}</title>
        </rect>)}
        {(i % Math.ceil(bars.length/9) === 0 || i === bars.length-1) && <text x={x(i)} y="270" textAnchor="middle" fontSize="10">{bar.period}</text>}
      </g>)}
      {bars.map((bar,i) => {
        const prior = bars[i-1];
        if (bar.segments.length !== companies.length) return null;
        return <g key={bar.period}>
          {prior?.segments.length === companies.length && <line x1={x(i-1)} x2={x(i)} y1={y(prior.total)} y2={y(bar.total)} stroke="#183b63" strokeWidth="2.5" strokeDasharray={prior.estimated || bar.estimated ? "5 4" : undefined}/>}
          <circle cx={x(i)} cy={y(bar.total)} r="3" fill="#183b63"><title>{`${bar.period} total: $${bar.total.toFixed(1)}B${bar.estimated ? " · includes estimates" : ""}`}</title></circle>
        </g>;
      })}
    </svg>
    <p className={styles.scope}>Faded bars show estimates. The total line is dashed when either quarter includes estimates and is shown only when all companies in the legend have a value. {note}</p>
  </article>;
}

