import EvidenceCard from "./evidence-card";
import ChartLegend from "./chart-legend";
import SectionNotes from "./section-notes";
import SectionSummary from "./section-summary";

const stages = [
  { id: "demand", label: "01 · Demand", value: "615.3T", metric: "30-day tokens · 7 Sep–6 Oct", signal: "Traffic is spread across models", detail: "The largest model accounts for 12.6% of this OpenRouter sample, spreading demand across competing providers." },
  { id: "price", label: "02 · Price", value: "−44%", metric: "LLM token-price index · Jun to 16 Sep", signal: "Lower prices raise the monetization hurdle", detail: "The index fell from 1.7095 in June to 0.9543. Lower prices can stimulate usage, but revenue grows only if paid volume and product mix offset the decline in realized prices." },
  { id: "utilization", label: "03 · Capacity", value: "77.3%", metric: "Cash CapEx / operating cash flow", signal: "The buildout is absorbing more cash", detail: "Four-company cash CapEx reached $510.7B TTM while hardware, memory and data-center activity remained expansionary." },
  { id: "returns", label: "04 · Returns", value: "5 / 5", metric: "Incremental ROIC below total ROIC", signal: "Incremental returns trail overall returns", detail: "Profit growth per additional dollar of capital trails overall ROIC in all five companies. Earnings realization needs to catch up with the growing capital base." },
] as const;

const returns = [
  { ticker: "MSFT", roic: 29.3, incremental: 18.3 }, { ticker: "GOOGL", roic: 28.8, incremental: 16.2 },
  { ticker: "META", roic: 28.4, incremental: 15.8 }, { ticker: "AMZN", roic: 13.1, incremental: 9.8 },
  { ticker: "ORCL", roic: 12.8, incremental: 6.8 },
] as const;

export const trend = [
  { quarter: "2025Q1", tokensPerDay: 0.134, tokenCoverage: "90 / 90", capex: 71.902, roic: 31.538 },
  { quarter: "2025Q2", tokensPerDay: 0.306, tokenCoverage: "90 / 91", capex: 88.246, roic: 30.885 },
  { quarter: "2025Q3", tokensPerDay: 0.525, tokenCoverage: "91 / 92", capex: 97.271, roic: 28.356 },
  { quarter: "2025Q4", tokensPerDay: 0.814, tokenCoverage: "92 / 92", capex: 118.632, roic: 27.404 },
  { quarter: "2026Q1", tokensPerDay: 1.836, tokenCoverage: "90 / 90", capex: 129.750, roic: 26.299 },
  { quarter: "2026Q2", tokensPerDay: 4.488, tokenCoverage: "91 / 91", capex: 165.050, roic: 23.676 },
] as const;

const trendSeries = [
  { key: "tokensPerDay", label: "OpenRouter tokens / day", color: "#1d7f80", format: (value: number) => `${value.toFixed(3)}T` },
  { key: "capex", label: "Quarterly cash CapEx", color: "#d88952", format: (value: number) => `$${value.toFixed(1)}B` },
  { key: "roic", label: "TTM consolidated ROIC", color: "#747cae", format: (value: number) => `${value.toFixed(1)}%` },
] as const;

function DemandReturnTrend({compact=false}:{compact?:boolean}={}){
  const width = 980, height = 370, left = 82, right = 142, top = 42, bottom = 52;
  const x = (index: number) => left + index * (width - left - right) / (trend.length - 1);
  const domains = { tokensPerDay: { min: 0, max: 5 }, capex: { min: 60, max: 180 }, roic: { min: 20, max: 34 } } as const;
  const y = (key: keyof typeof domains, value: number) => { const domain = domains[key]; return top + (domain.max-value)/(domain.max-domain.min)*(height-top-bottom); };
  const positions = Array.from({ length: 5 }, (_, index) => index / 4);
  const axisValue = (key: keyof typeof domains, position: number) => domains[key].max-position*(domains[key].max-domains[key].min);
  if(compact) return <EvidenceCard id="conversion" title="Usage, spending and returns" unit="Quarterly comparison · three separate axes" source="S9" legend={<ChartLegend items={trendSeries.map(s=>({label:s.label,color:s.color}))}/>} note="OpenRouter traffic and four-company financials have different coverage; comovement is not attribution." wide>    <div className="conversion-trend-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="demand-trend-title demand-trend-desc">
        <title id="demand-trend-title">OpenRouter token consumption, hyperscaler cash capital expenditure and consolidated ROIC on separate axes</title>
        <desc id="demand-trend-desc">From 2025 Q1 to 2026 Q2, average daily OpenRouter tokens rose much faster than cash capital expenditure, while aggregate consolidated ROIC declined.</desc>
        <text x={left} y="18" textAnchor="start" className="axis-token">TOKENS / DAY · T</text><text x={width-right+18} y="18" textAnchor="start" className="axis-capex">$B</text><text x={width-8} y="18" textAnchor="end" className="axis-roic">%</text>
        {positions.map(position => { const gridY=top+position*(height-top-bottom); return <g key={position}><line x1={left} x2={width-right} y1={gridY} y2={gridY} className="conversion-gridline"/><text x={left-12} y={gridY+4} textAnchor="end" className="axis-token">{axisValue("tokensPerDay",position).toFixed(1)}</text><text x={width-right+18} y={gridY+4} textAnchor="start" className="axis-capex">{axisValue("capex",position).toFixed(0)}</text><text x={width-8} y={gridY+4} textAnchor="end" className="axis-roic">{axisValue("roic",position).toFixed(1)}</text></g>; })}
        {trend.map((row,index) => <text key={row.quarter} x={x(index)} y={height-18} textAnchor="middle">{row.quarter.replace("20", "")}</text>)}
        {trendSeries.map(series => <g key={series.key}><path d={trend.map((row,index) => `${index ? "L" : "M"}${x(index)},${y(series.key,row[series.key])}`).join(" ")} fill="none" stroke={series.color} strokeWidth="3.5"/>{trend.map((row,index) => <circle key={row.quarter} cx={x(index)} cy={y(series.key,row[series.key])} r="5" fill={series.color}><title>{`${series.label} · ${row.quarter}: ${series.format(row[series.key])}`}</title></circle>)}</g>)}
      </svg>
    </div>
</EvidenceCard>;
  return <div className="conversion-trend">
    <div className="conversion-trend-head"><div><b>Are demand, investment and returns moving together?</b><span>Matched quarterly trend · four-company aggregate · each series uses its own axis</span></div><div className="conversion-trend-legend">{trendSeries.map(series => <span key={series.key}><i style={{ background: series.color }}/>{series.label}</span>)}</div></div>
    <div className="conversion-trend-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="demand-trend-title demand-trend-desc">
        <title id="demand-trend-title">OpenRouter token consumption, hyperscaler cash capital expenditure and consolidated ROIC on separate axes</title>
        <desc id="demand-trend-desc">From 2025 Q1 to 2026 Q2, average daily OpenRouter tokens rose much faster than cash capital expenditure, while aggregate consolidated ROIC declined.</desc>
        <text x={left} y="18" textAnchor="start" className="axis-token">TOKENS / DAY · T</text><text x={width-right+18} y="18" textAnchor="start" className="axis-capex">$B</text><text x={width-8} y="18" textAnchor="end" className="axis-roic">%</text>
        {positions.map(position => { const gridY=top+position*(height-top-bottom); return <g key={position}><line x1={left} x2={width-right} y1={gridY} y2={gridY} className="conversion-gridline"/><text x={left-12} y={gridY+4} textAnchor="end" className="axis-token">{axisValue("tokensPerDay",position).toFixed(1)}</text><text x={width-right+18} y={gridY+4} textAnchor="start" className="axis-capex">{axisValue("capex",position).toFixed(0)}</text><text x={width-8} y={gridY+4} textAnchor="end" className="axis-roic">{axisValue("roic",position).toFixed(1)}</text></g>; })}
        {trend.map((row,index) => <text key={row.quarter} x={x(index)} y={height-18} textAnchor="middle">{row.quarter.replace("20", "")}</text>)}
        {trendSeries.map(series => <g key={series.key}><path d={trend.map((row,index) => `${index ? "L" : "M"}${x(index)},${y(series.key,row[series.key])}`).join(" ")} fill="none" stroke={series.color} strokeWidth="3.5"/>{trend.map((row,index) => <circle key={row.quarter} cx={x(index)} cy={y(series.key,row[series.key])} r="5" fill={series.color}><title>{`${series.label} · ${row.quarter}: ${series.format(row[series.key])}`}</title></circle>)}</g>)}
      </svg>
    </div>
    <div className="conversion-trend-read"><b>Usage and spending are rising while returns are falling.</b><p>Average daily OpenRouter tokens rose to 33.5× their 2025Q1 level, versus 2.3× for quarterly cash CapEx. Aggregate ROIC declined from 31.5% to 23.7%. Capital productivity has weakened despite higher traffic.</p></div>
    <details className="conversion-trend-data"><summary>View actual values and coverage</summary><div><table><thead><tr><th>Quarter</th><th>Tokens / observed day</th><th>Token days</th><th>Cash CapEx</th><th>TTM ROIC</th></tr></thead><tbody>{trend.map(row => <tr key={row.quarter}><td>{row.quarter}</td><td>{row.tokensPerDay.toFixed(3)}T</td><td>{row.tokenCoverage}</td><td>${row.capex.toFixed(1)}B</td><td>{row.roic.toFixed(1)}%</td></tr>)}</tbody></table></div></details>
  </div>;
}

export default function DemandToReturns({compact=false}:{compact?:boolean}={}){
  if(compact) return <><DemandReturnTrend compact/><details className="evidence-data"><summary>Cross-pillar interpretation and coverage</summary><DemandToReturns/></details></>;
  return <section className="section conversion-section" id="conversion-detail">
    <div className="section-head conversion-head"><div><div className="eyebrow">DEMAND-TO-RETURNS CONVERSION</div><h2>Demand is visible. Value capture is the unresolved question.</h2></div><p>OpenRouter daily API through 6 Oct 2026 · financials through latest available TTM <a className="source-chip" href="#source-S9">S9</a></p></div>
    <SectionSummary current="The refreshed OpenRouter history shows routed traffic rising through Q3; the refreshed token-price index has fallen 44% since June, while incremental ROIC remains below total ROIC for all five hyperscalers." conclusion="Realized revenue and profit per workload remain the core uncertainty in the capital-recovery thesis."/>
    <div className="conversion-flow" aria-label="AI demand to return conversion framework">{stages.map((stage,index)=><article key={stage.id} className={`conversion-stage ${stage.id}`}><span>{stage.label}</span><strong>{stage.value}</strong><small>{stage.metric}</small><h3>{stage.signal}</h3><p>{stage.detail}</p>{index<stages.length-1&&<i aria-hidden="true">→</i>}</article>)}</div>
    <DemandReturnTrend/>
    <div className="conversion-detail">
      <div className="return-gap"><div className="conversion-subhead"><div><b>Return gap by hyperscaler</b><span>Consolidated ROIC versus preferred eight-quarter incremental ROIC</span></div><div className="return-legend"><span><i/>ROIC</span><span><i/>Incremental</span></div></div><div className="return-gap-rows">{returns.map(company=><div className="return-gap-row" key={company.ticker}><b>{company.ticker}</b><div><span className="return-total" style={{width:`${company.roic/32*100}%`}}/><span className="return-incremental" style={{width:`${company.incremental/32*100}%`}}/></div><span>{company.roic.toFixed(1)}% <small>vs</small> {company.incremental.toFixed(1)}%</span></div>)}</div></div>
      <aside className="conversion-gates"><span className="detail-kicker">THESIS MONITORING</span><div><b>Evidence of improving capital productivity</b><p>Cloud revenue and profit rise as capacity comes online, incremental ROIC improves, and cash coverage strengthens. An improvement driven primarily by lower spending would provide less support for the monetization thesis.</p></div><div><b>Evidence of persistent return pressure</b><p>Usage rises while segment margins, incremental ROIC and cash remaining after investment weaken. A sustained divergence would challenge the economic case for further expansion.</p></div></aside>
    </div>

    <SectionNotes section="conversion"/>
  </section>;
}
