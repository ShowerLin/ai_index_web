"use client";
import EvidenceCard from "./evidence-card";
import ChartLegend from "./chart-legend";

import SectionNotes from "./section-notes";

import { useState } from "react";
import { sustainabilitySnapshot } from "./sustainability-snapshot";
import { rollingCash } from "./sustainability-metrics";

const companies = sustainabilitySnapshot.companies.map(c => ({ ...c, history: rollingCash(c.quarters) }));
const matched = companies.filter(c => c.ticker !== "ORCL");
const aggregateQuarters = matched[0].quarters.map(q => {
  const rows = matched.map(c => c.quarters.find(r => r.period === q.period));
  const complete = rows.every(r => r && r.cfo !== null && r.capex !== null);
  return { period: q.period, cfo: complete ? rows.reduce((s, r) => s + r!.cfo!, 0) : null, capex: complete ? rows.reduce((s, r) => s + r!.capex!, 0) : null };
});
const aggregate = { ticker: "Aggregate", name: "Four-company aggregate", history: rollingCash(aggregateQuarters) };
const money = (n: number) => `${n < 0 ? "−" : ""}$${Math.abs(n).toFixed(1)}B`;
const percent = (n: number | null) => n === null ? "n/a" : `${(n * 100).toFixed(1)}%`;
const period = (date: string) => `${date.slice(0, 4)}Q${Math.ceil(Number(date.slice(5, 7)) / 3)}`;

function CashTimeSeries({history}:{history:ReturnType<typeof rollingCash>}) {
 const series=[{key:"cfo",label:"Operating cash flow",color:"#237d67"},{key:"capex",label:"Cash CapEx",color:"#bd7738"}] as const;
 const value=(r:typeof history[number],key:typeof series[number]["key"])=>r.current[key];
 const low=Math.min(0,...history.map(r=>r.fcf)),high=Math.max(1,...history.map(r=>r.current.cfo),...history.map(r=>r.current.capex)),pad=(high-low)*.08;
 const x=(i:number)=>105+i*690/Math.max(1,history.length-1),y=(v:number)=>30+(high+pad-v)*225/(high-low+2*pad);
 return <><svg viewBox="0 0 900 320" role="img" aria-label="Operating cash flow, cash capital expenditure and cash flow after CapEx over time">
 {Array.from({length:5},(_,i)=>low+(high-low)*i/4).map((v,i)=><g key={i}><line x1="75" x2="825" y1={y(v)} y2={y(v)} stroke="#d6d7ce"/><text x="65" y={y(v)+4} textAnchor="end">{v.toFixed(0)}</text></g>)}
 <path d={history.map((r,i)=>`${i?"L":"M"}${x(i)},${y(r.current.cfo)}`).join(" ")+" "+[...history].reverse().map((r,i)=>`L${x(history.length-1-i)},${y(r.current.capex)}`).join(" ")+" Z"} fill="#426d99" fillOpacity=".16"><title>Gap between operating cash flow and cash CapEx: cash remaining after investment</title></path>
 {history.map((r,i)=>{const step=750/Math.max(1,history.length),width=Math.min(24,step*.22);return <g key={r.period}>{series.map((s,j)=>{const v=value(r,s.key),barX=x(i)+(j-.5)*(width+3)-width/2;return <rect key={s.key} x={barX} y={Math.min(y(v),y(0))} width={width} height={Math.abs(y(v)-y(0))} fill={s.color}><title>{`${period(r.period)} · ${s.label}: ${money(v)}`}</title></rect>;})}</g>;})}
 {series.map(s=><path key={s.key} d={history.map((r,i)=>`${i?"L":"M"}${x(i)},${y(value(r,s.key))}`).join(" ")} fill="none" stroke={s.color} strokeWidth="2.2"/>)}
 {history.map((r,i)=><circle key={r.period} cx={x(i)} cy={(y(r.current.cfo)+y(r.current.capex))/2} r="9" fill="transparent"><title>{`${period(r.period)} · Cash remaining after CapEx: ${money(r.fcf)}`}</title></circle>)}
 {history.map((r,i)=><text key={r.period} x={x(i)} y="292" textAnchor="middle">{period(r.period)}</text>)}
 </svg><ChartLegend items={[...series.map(s=>({label:s.label,color:s.color})),{label:"Shaded gap · cash remaining after CapEx",color:"#426d99"}]}/></>;
}

export default function InvestmentSustainability({compact=false}:{compact?:boolean}={}) {
  const [selected, setSelected] = useState("Aggregate");
  const view = selected === "Aggregate" ? aggregate : companies.find(c => c.ticker === selected)!;
  const latest = view.history.at(-1);
  if (!latest) return <section className="section sustainability-section" id="sustainability-detail"><h2>Investment sustainability</h2><p>Unavailable: eight consecutive quarters of cash flow and cash capex are required.</p></section>;
  const max = Math.max(...view.history.flatMap(r => [r.current.cfo, r.current.capex]), 1);
  const deltaFcf = latest.fcf - latest.previousFcf;
  if(compact) return <><EvidenceCard id="sustainability" title="Cash generation and investment" unit="USD billions · aggregate trailing 12 months" source="S7" note="Four-company aggregate; operating cash flow and cash CapEx share a dollar scale. Shading between their trend lines shows cash remaining after CapEx at each quarter." ><div className="sustainability-chart"><div className="chart-meta"><div><b>Cash generation and investment</b><span>Trailing 12 months · common dollar scale</span></div></div>
      <CashTimeSeries history={view.history}/>
    </div></EvidenceCard>
    <EvidenceCard title="Cash absorption and funding headroom" unit={`Four-company aggregate · TTM to ${period(latest.period)}`} source="S7" note="Cash CapEx / operating cash flow; Oracle remains outside the matched aggregate.">
      <div className="financial-cash-metrics">
        <div><span>Investment absorption</span><strong>{percent(latest.absorption)}</strong><small>Previously {percent(latest.previousAbsorption)}</small></div>
        <div><span>Incremental cash coverage</span><strong>{percent(latest.incrementalCoverage)}</strong><small>Δ operating cash flow / Δ cash CapEx</small></div>
        <div><span>Cash remaining after investment</span><strong>{money(latest.fcf)}</strong><small>Previously {money(latest.previousFcf)}</small></div>
      </div>
    </EvidenceCard><details className="evidence-data"><summary>Company cash flows and absorption calculations</summary><InvestmentSustainability/></details></>;
  return <section className="section sustainability-section" id="sustainability-detail">
    <div className="section-head"><div><div className="eyebrow">INVESTMENT SUSTAINABILITY · CASH FLOW</div><h2>Investment is absorbing more operating cash.</h2></div><div className="select-wrap"><label htmlFor="sustainability-company">Company</label><select id="sustainability-company" value={selected} onChange={e => setSelected(e.target.value)}><option value="Aggregate">Four-company aggregate</option>{companies.map(c => <option key={c.ticker} value={c.ticker}>{c.name}</option>)}</select></div></div>
    <p className="sustainability-context">{view.name} · TTM ending {latest.period} · USD billions · latest available data <a className="source-chip" href="#source-S7">S7</a></p>
    <div className="sustainability-thesis"><b>{deltaFcf < 0 ? "Cash left after investment is shrinking." : "Cash left after investment is increasing."}</b><p>Operating cash flow grew {percent(latest.cfoGrowth)} and cash capex grew {percent(latest.capexGrowth)} versus the preceding 12 months. Cash remaining after investment {deltaFcf < 0 ? "fell" : "rose"} by {money(Math.abs(deltaFcf))}. {latest.fcf < 0 ? "Investment exceeded operating cash generation over this period." : "Operating cash generation still covered cash investment, but the remaining cushion has narrowed."}</p></div>
    <div className="sustainability-kpis">
      <article><span>Investment absorption</span><strong>{percent(latest.absorption)}</strong><small>Previously {percent(latest.previousAbsorption)}<br/>TTM cash capex / operating cash flow</small></article>
      <article><span>Incremental cash coverage</span><strong>{percent(latest.incrementalCoverage)}</strong><small>Change in TTM operating cash flow / change in TTM cash capex</small></article>
      <article><span>Cash remaining after investment</span><strong className={latest.fcf < 0 ? "negative" : ""}>{money(latest.fcf)}</strong><small>Previously {money(latest.previousFcf)}<br/>FCF proxy = operating cash flow − cash capex</small></article>
    </div>
    <div className="sustainability-chart"><div className="chart-meta"><div><b>Cash generation and investment</b><span>Trailing 12 months · common dollar scale</span></div></div>
      <CashTimeSeries history={view.history}/>
    </div>
    <details className="panel-detail"><summary>Company cash-flow comparison</summary><div className="signal-table-wrap sustainability-table" tabIndex={0} role="region" aria-label="Scrollable company cash coverage comparison"><table><caption>Company comparison · latest available TTM; Oracle has an earlier period</caption><thead><tr><th>Company / TTM end</th><th>Cash flow growth</th><th>Cash capex growth</th><th>Capex / cash flow<br/>Prior → latest</th><th>Incremental coverage</th><th>FCF proxy</th></tr></thead><tbody>{companies.map(c => {
      const r = c.history.at(-1);
      return <tr key={c.ticker}><td><b>{c.name}</b><span className="company-label">{r?.period ?? "Unavailable"}{c.ticker === "ORCL" ? " · calendarized" : ""}</span></td>{r ? <><td>{percent(r.cfoGrowth)}</td><td>{percent(r.capexGrowth)}</td><td>{percent(r.previousAbsorption)} → {percent(r.absorption)}</td><td>{percent(r.incrementalCoverage)}</td><td className={r.fcf < 0 ? "negative" : ""}>{money(r.fcf)}</td></> : <td colSpan={5}>Insufficient consecutive quarterly data</td>}</tr>;
    })}</tbody></table></div></details>



    <SectionNotes section="sustainability" methodology={<><p>TTM sums use four consecutive quarters and compare with the preceding four. Cash CapEx outflows become positive spending. Absorption = CapEx / operating cash flow; incremental coverage = change in cash flow / change in CapEx. Aggregate dollar sums, not company ratios; withhold nonpositive denominators.</p><details><summary>Source cell checks</summary><p>{sustainabilitySnapshot.source}, “{sustainabilitySnapshot.sheet}”; cash flow and cash CapEx columns E:F, P:Q, AA:AB, AL:AM and AW:AX.</p></details></>}/>
  </section>;
}
