"use client";
import {useState} from 'react';
import {adoptionPriceSnapshot as data} from './adoption-price-snapshot';

type View='indexed'|'usd'|'growth';
type Source='ramp'|'openrouter';
const names={ramp:'Ramp matched spending',openrouter:'OpenRouter estimate · external price'};
const colors={ramp:'#237d67',openrouter:'#315e87'};
const dollars=(value:number)=>'$'+(value/1e6).toLocaleString('en-US',{maximumFractionDigits:2})+'M';

export default function AdoptionSpending(){
 const [view,setView]=useState<View>('indexed');
 const [source,setSource]=useState<'both'|Source>('both');
 const baseline=data.spendingMonthly.find(r=>r.rampSpendUsd!==null&&r.rampSpendUsd>0&&r.openrouterSpendProxy!==null&&r.openrouterSpendProxy>0);
 if(!baseline)return <p>Spending charts are withheld until both sources have a complete common window.</p>;
 const rows=data.spendingMonthly.filter(r=>r.month>=baseline.month);
 const selected:Source[]=source==='both'?['ramp','openrouter']:[source];
 const amount=(r:typeof rows[number],s:Source)=>s==='ramp'?r.rampSpendUsd:r.openrouterSpendProxy;
 const value=(r:typeof rows[number],s:Source)=>{
  const level=amount(r,s);
  if(view==='growth')return s==='ramp'?r.rampSpendingGrowth:r.openrouterSpendingGrowth;
  return level===null?null:view==='usd'?level/1e6:level/amount(baseline,s)!*100;
 };
 const values=rows.flatMap(r=>selected.map(s=>value(r,s))).filter((v):v is number=>v!==null);
 const low=view==='growth'?Math.min(0,...values):0;
 const high=Math.max(1,...values);
 const pad=(high-low)*.08;
 const min=view==='growth'?low-pad:0,max=high+pad;
 const first=Date.parse(rows[0].windowEnd),last=Date.parse(rows.at(-1)!.windowEnd);
 const x=(date:string)=>90+(Date.parse(date)-first)/Math.max(1,last-first)*940;
 const y=(v:number)=>285-(v-min)/Math.max(1,max-min)*240;
 const path=(s:Source)=>rows.map((r,i)=>{const v=value(r,s);return v===null?'':`${i===0||value(rows[i-1],s)===null?'M':'L'}${x(r.windowEnd)},${y(v)}`;}).join(' ');
 const unit=view==='indexed'?`${baseline.month} = 100`:view==='usd'?'USD millions / 28-day window':'% vs previous monthly window';
 return <section className="token-activity adoption-spending" id="adoption-spending" aria-labelledby="spending-heading">
  <div className="eyebrow">CALCULATED NOMINAL SPENDING</div><h2 id="spending-heading">Spending activity</h2>
  <p className="section-summary">Ramp matched spending and the OpenRouter estimate show how volume and unit costs combine. Start with a common-base comparison, or inspect dollar levels and spending growth. The two source totals are never added.</p>
  <div className="adoption-observations">{(['ramp','openrouter'] as Source[]).map(s=>{const row=[...rows].reverse().find(r=>amount(r,s)!==null);if(!row)return null;return <div key={s}><span>{names[s]}</span><strong>{dollars(amount(row,s)!)}</strong><small>28 days ending {row.windowEnd} · {value(row,s)===null?'growth unavailable':view==='growth'?value(row,s)!.toFixed(1)+'% window change':s==='ramp'?'matched published sample':'rough benchmark-based estimate'}</small></div>;})}</div>
  <div className="token-controls"><label>Spending view <select aria-label="Spending chart view" value={view} onChange={e=>setView(e.target.value as View)}><option value="indexed">Common base · {baseline.month} = 100</option><option value="usd">Spending · USD millions</option><option value="growth">Spending change · %</option></select></label><label>Source <select aria-label="Spending chart source" value={source} onChange={e=>setSource(e.target.value as typeof source)}><option value="both">Both, separately</option><option value="ramp">Ramp matched spending</option><option value="openrouter">OpenRouter estimate</option></select></label></div>
  <p className="panel-source">{unit} · monthly observations at completed 28-day window endpoints. Hover a point for the amount and date.</p>
  <div className="token-frequency-chart"><svg viewBox="0 0 1120 350" role="img" aria-label={`Calculated spending line chart: ${unit}; Ramp matched spending and OpenRouter estimated spending`}>
   {[0,.25,.5,.75,1].map(t=>{const v=min+(max-min)*t;return <g key={t}><line x1="90" x2="1030" y1={y(v)} y2={y(v)} stroke="#d6d7ce"/><text x="78" y={y(v)+4} textAnchor="end">{view==='usd'?'$':''}{v.toFixed(view==='usd'?1:0)}{view==='growth'?'%':''}</text></g>;})}
   {view==='growth'&&<line x1="90" x2="1030" y1={y(0)} y2={y(0)} stroke="#8c969c" strokeDasharray="5 4"/>}
   {selected.map(s=><g key={s}><path d={path(s)} fill="none" stroke={colors[s]} strokeWidth="3" strokeDasharray={s==='openrouter'?'7 4':undefined}/>{rows.map(r=>{const v=value(r,s);return v===null?null:<circle key={r.month} cx={x(r.windowEnd)} cy={y(v)} r="4" fill={colors[s]}><title>{`${names[s]} · ${r.month} · window ending ${r.windowEnd}: ${dollars(amount(r,s)!)}; ${v.toFixed(2)} ${unit}`}</title></circle>;})}</g>)}
   {rows.filter((_,i)=>i===0||i===rows.length-1||i%Math.max(1,Math.ceil(rows.length/6))===0).map(r=><text key={r.month} x={x(r.windowEnd)} y="320" textAnchor="middle">{r.month.slice(2)}</text>)}
  </svg></div>
  <div className="pillar-series-legend">{selected.map(s=><span key={s} style={{color:colors[s]}}>{names[s]} · {s==='ramp'?'solid':'dashed proxy'}</span>)}</div>
  <p className="panel-source">Sources: <a href="#source-S14">Ramp</a>, <a href="#source-S9">OpenRouter</a> and <a href="#source-S15">Bloomberg SDLLMTK</a>. Ramp totals include identical model/week pairs with spending and tokens; every week requires 95% token coverage. OpenRouter dollars are token volume × an external price benchmark averaged over the same 28 days, not observed billing or provider revenue. Missing observations break lines. A common base compares relative changes, not market size. Sample and model mix can change. Windows are not calendar-month spending; growth is not seasonally adjusted. Coverage ends at the latest complete generated window, even when newer weekly raw data exist.</p>
 </section>;
}
