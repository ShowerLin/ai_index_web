"use client";
import { adoptionTickIndices, AdoptionChartFrame, AdoptionControls, AdoptionMetric, AdoptionMetrics, AdoptionNotes, AdoptionPanel } from './adoption-widgets';
import {useState} from 'react';
import {adoptionPriceSnapshot as data} from './adoption-price-snapshot';

export default function AdoptionPrices(){
 const [view,setView]=useState<'daily'|'monthly'>('daily');
 const silicon=data.siliconDaily.at(-1)!;
 const ramp=[...data.rampPublishedWeekly].reverse().find(r=>r.coverage>=.95&&r.value!==null)!;
 const points=view==='daily'?data.siliconDaily.map(r=>({date:r.date,value:r.value})):data.siliconMonthly.map(r=>({date:r.month+'-01',value:r.complete?r.value:null}));
 const start=Date.parse(points[0].date),end=Math.max(Date.parse(points.at(-1)!.date),Date.parse(data.rampPublishedWeekly.at(-1)!.end));
 const x=(date:string)=>75+(new Date(date).getTime()-start)/Math.max(1,end-start)*970;
 const high=Math.max(1,...points.map(r=>r.value??0),...data.rampPublishedWeekly.map(r=>r.coverage>=.95?r.value??0:0))*1.1;
 const y=(v:number)=>375-v/high*330;
 const rampPoints=data.rampPublishedWeekly.filter(r=>r.end>=points[0].date);
 return <AdoptionPanel id="adoption-prices" headingId="price-heading">
  <div className="eyebrow">PRICE · INPUT TO SPENDING GROWTH</div><h2 id="price-heading">Token prices and effective cost</h2>
  <AdoptionMetrics><AdoptionMetric><span>Silicon Data · SDLLMTK</span><strong>${silicon.value.toFixed(3)}</strong><small>Per million tokens · {silicon.date} saved value</small></AdoptionMetric><AdoptionMetric><span>Ramp effective cost</span><strong>${ramp.value!.toFixed(3)}</strong><small>Per million tokens · week ending {ramp.end}</small></AdoptionMetric></AdoptionMetrics>
  <p className="adoption-chart-unit">USD per million tokens</p>
  <AdoptionControls><label>Benchmark frequency <select aria-label="Token price frequency" value={view} onChange={e=>setView(e.target.value as typeof view)}><option value="daily">Daily saved values</option><option value="monthly">Completed calendar-month averages</option></select></label></AdoptionControls>
  <AdoptionChartFrame><svg viewBox="0 0 1120 460" role="img" aria-label="Silicon Data token benchmark and Ramp sample effective token costs in USD per million tokens">
   {[0,.25,.5,.75,1].map(t=><g key={t}><line x1="75" x2="1045" y1={y(high*t)} y2={y(high*t)} stroke="#d6d7ce"/><text x="65" y={y(high*t)+4} textAnchor="end">${(high*t).toFixed(2)}</text></g>)}
   <path d={points.map((r,i)=>r.value===null?'':`${i===0||points[i-1].value===null?'M':'L'}${x(r.date)},${y(r.value)}`).join(' ')} fill="none" stroke="#315e87" strokeWidth="3"/>
   <path d={rampPoints.map((r,i)=>r.value===null||r.coverage<.95?'':`${i===0||rampPoints[i-1].coverage<.95||rampPoints[i-1].value===null?'M':'L'}${x(r.end)},${y(r.value)}`).join(' ')} fill="none" stroke="#237d67" strokeWidth="3"/>
   {adoptionTickIndices(points.length).map(i=>points[i]).map(r=><text key={r.date} x={x(r.date)} y="422" textAnchor="middle">{r.date.slice(2)}</text>)}
  </svg></AdoptionChartFrame>
  <div className="pillar-series-legend"><span style={{color:'#315e87'}}>Silicon Data · {view==='daily'?'daily saved values':'monthly average'}</span><span style={{color:'#237d67'}}>Ramp · weekly effective unit cost</span></div>
  <AdoptionNotes id="source-S15">
  <p><strong>Silicon Data benchmark:</strong> Bloomberg SDLLMTK, saved in {data.metadata.workbook}. Daily values may carry prior quotes forward; monthly averages require a complete saved month.</p><p><strong>Ramp effective cost:</strong> matched weekly model spending ÷ matched tokens × 1,000,000. We require at least 95% of published tokens to match to spending. Model mix, caching and commercial terms can move the result.</p>
    <details className="evidence-data"><summary>Volume and price breakdown</summary><p>Each change compares four completed weeks with the preceding monthly observation window. A five-week gap between endpoints leaves one week outside both windows. Ramp uses the same matched spending/token pairs within each window; changing model composition can affect growth. Growth = volume change + price change + interaction. The sources are scored separately against a provisional January–June 2026 baseline, and their dollar estimates are never added.</p><div className="signal-table-wrap"><table><thead><tr><th>Month / window end</th><th>Source</th><th>Volume change</th><th>Price change</th><th>Interaction (pp)</th><th>Nominal spending change</th></tr></thead><tbody>{data.spendingMonthly.flatMap(r=>[{source:'Ramp matched spending',v:r.rampVolumeGrowth,p:r.rampPriceChange,i:r.rampInteraction,g:r.rampSpendingGrowth},{source:'OpenRouter estimate · external price',v:r.openrouterVolumeGrowth,p:r.openrouterPriceChange,i:r.openrouterInteraction,g:r.openrouterSpendingGrowth}].map(d=><tr key={r.month+d.source}><th>{r.month} / {r.windowEnd}</th><td>{d.source}</td><td>{d.v===null?'—':d.v.toFixed(1)+'%'}</td><td>{d.p===null?'—':d.p.toFixed(1)+'%'}</td><td>{d.i===null?'—':d.i.toFixed(2)}</td><td>{d.g===null?'Withheld':d.g.toFixed(1)+'%'}</td></tr>))}</tbody></table></div></details>
    <details className="evidence-data"><summary>Price data and coverage</summary><div className="signal-table-wrap"><table><thead><tr><th>Month</th><th>Average $/M tokens</th><th>Saved days</th><th>Status</th></tr></thead><tbody>{data.siliconMonthly.map(r=><tr key={r.month}><th>{r.month}</th><td>{r.complete?r.value.toFixed(4):'Withheld'}</td><td>{r.days}/{r.expectedDays}</td><td>{r.complete?'Complete saved grid':'Partial'}</td></tr>)}</tbody></table><table><thead><tr><th>Week ending</th><th>Ramp $/M tokens</th><th>Token coverage</th><th>Matched models</th></tr></thead><tbody>{data.rampPublishedWeekly.map(r=><tr key={r.end}><th>{r.end}</th><td>{r.coverage>=.95&&r.value!==null?r.value.toFixed(4):'Withheld'}</td><td>{(r.coverage*100).toFixed(2)}%</td><td>{r.matchedModels}/{r.totalModels}</td></tr>)}</tbody></table></div></details>
 </AdoptionNotes></AdoptionPanel>;
}
