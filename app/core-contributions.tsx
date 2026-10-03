"use client";
import {useState} from "react";
import {coreContributionSnapshot as snapshot} from "./core-contribution-snapshot";

export default function CoreContributions({month,onMonthChange,published}:{month:string;onMonthChange:(month:string)=>void;published:number|null}) {
  const [mode,setMode]=useState<"level"|"change">("level");
  const [all,setAll]=useState(false);
  const current=snapshot.months.find(d=>d.month===month)!;
  const previous=snapshot.months[snapshot.months.indexOf(current)-1];
  const complete=current.score!==null&&(mode==="level"||previous?.score!==null&&previous!==undefined);
  const ranked=current.rows.map(row=>({...row,value:mode==="level"?row.contribution:row.contribution===null?null:row.contribution-(previous?.rows.find(r=>r.ticker===row.ticker)?.contribution??NaN)})).filter(r=>r.value!==null&&Number.isFinite(r.value)).sort((a,b)=>Math.abs(b.value!)-Math.abs(a.value!));
  const supports=ranked.filter(r=>r.value!>0).slice(0,4);
  const drags=ranked.filter(r=>r.value!<0).slice(0,4);
  const rows=all?ranked:[...supports,...drags];
  const max=Math.max(1,...ranked.map(r=>Math.abs(r.value!)));
  const sum=ranked.reduce((s,r)=>s+r.value!,0);
  const residual=published===null||current.score===null?null:published-current.score;
  const format=(v:number)=>`${v>0?"+":""}${v.toFixed(2)}`;
  return <section className="core-contributions" aria-labelledby="contribution-heading">
    <div className="contribution-head"><div><h3 id="contribution-heading">Largest supports and drags</h3><p>Methodology v2.2 contributions · index points · {mode==="level"?"relative to historical norm 50":"change from preceding month"}</p></div><label>Month <select aria-label="Contribution month" value={month} onChange={e=>onMonthChange(e.target.value)}>{snapshot.months.map(d=><option key={d.month}>{d.month}</option>)}</select></label></div>
    <div className="contribution-layout"><div className="contribution-context">
      <div className="contribution-mode" role="group" aria-label="Contribution basis"><button aria-pressed={mode==="level"} onClick={()=>setMode("level")}>Above / below norm</button><button aria-pressed={mode==="change"} onClick={()=>setMode("change")}>Monthly change</button></div>
      <dl><div><dt>Legacy core score</dt><dd>{published?.toFixed(1)??"n/a"}</dd></div><div><dt>Revised core score</dt><dd>{current.score?.toFixed(2)??"n/a"}</dd></div><div><dt>Methodology change</dt><dd>{residual===null?"n/a":format(residual)}</dd></div></dl>
      <p className="contribution-reconciliation">{complete?mode==="level"?`50 ${sum>=0?"+":"−"} ${Math.abs(sum).toFixed(2)} = ${current.score!.toFixed(2)} revised points.`:`Constituent changes sum to ${format(sum)} revised index points.`:"Insufficient matched data for attribution."}</p>
      <p>These contributions sum exactly to the revised core score. The difference from the legacy score reflects the methodology change. The baseline is retrospective through June 2026; these are not real-time backtest results.</p>
      <details><summary>Calculation and coverage</summary><table className="core-treatment-table"><thead><tr><th>Constituents</th><th>Scoring signal</th></tr></thead><tbody><tr><td>Adoption surveys</td><td>Percentage level</td></tr><tr><td>Exports, orders, imports</td><td>TTM total YoY growth</td></tr><tr><td>Construction, industrial production</td><td>12M average YoY growth</td></tr><tr><td>Hyperscaler CapEx</td><td>Sum all five companies first; trailing four-quarter total YoY growth</td></tr></tbody></table><p>{snapshot.metadata.method}</p><p>{snapshot.metadata.demandMethod} <a href="https://investor.tsmc.com/english/monthly-revenue/2023">TSMC 2023</a> · <a href="https://investor.tsmc.com/schinese/monthly-revenue/2024">TSMC 2024</a></p><p>Scores are rescaled z-scores, not percentiles. A score of 50 represents the constituent’s baseline mean; above or below 50 indicates relative strength, not positive or negative growth. Composite changes describe strengthening or weakening relative to that baseline. Financial tightening is assessed separately through credit and funding indicators.</p><p>The fixed baseline includes all valid transformed observations through June 2026 and is retrospective. Weights: Adoption 10% per survey, Demand 6.67% per series, Investment 4% per series, Imports 6.67% per series and combined hyperscaler CapEx 20%. Missing scores are not reweighted. China and financial indicators are excluded.</p><p>Short momentum: adoption changes in percentage points, and three-month-average YoY growth for monthly activity, are supplementary. Level contribution = weight × (score − 50). Monthly impact = weight × (score − previous score). Quarterly CapEx scores change only at quarter boundaries.</p></details>
    </div><div className="contribution-ranking">
      <div className="contribution-key"><span><i className="support"/>Supports {mode==="level"?"the level":"the change"}</span><span><i className="drag"/>Drags {mode==="level"?"the level":"the change"}</span></div>
      {complete&&rows.map(row=><div className="contribution-row" key={row.ticker}><div><b>{row.name}</b><small>{row.pillar} · {(row.weight*100).toFixed(2)}% weight</small></div><div className="contribution-track"><span style={{left:row.value!>=0?"50%":`${50-Math.abs(row.value!)/max*50}%`,width:`${Math.abs(row.value!)/max*50}%`}} className={row.value!>=0?"support":"drag"}/></div><strong>{format(row.value!)}</strong></div>)}
      <p className="contribution-ranking-note">{complete?`${rows.length} of ${ranked.length} constituents${all?" · ranked by absolute impact.":" · up to four strongest supports and four largest drags."} ${mode==="change"?"Zero means no score change, including held quarterly observations.":"A drag means below its own historical norm, even if raw growth is positive."}`:"Rankings withheld until every constituent has a matched score."}</p>
      {complete&&<button className="contribution-expand" aria-expanded={all} onClick={()=>setAll(!all)}>{all?"Show strongest supports and drags":"Show all constituents"}</button>}
    </div></div>
  </section>;
}
