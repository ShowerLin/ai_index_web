"use client";
import { adoptionTickIndices, AdoptionChartFrame, AdoptionControls, AdoptionMetric, AdoptionMetrics, AdoptionNotes, AdoptionPanel } from './adoption-widgets';
import {useState} from 'react';
import {tokenActivitySnapshot as data} from './token-activity-snapshot';

type Source="openrouter"|"ramp";
type Point={date:string;openrouter?:number|null;ramp?:number|null};
const format=(value:number|null|undefined,suffix='')=>value==null?'Unavailable':`${value.toFixed(2)}${suffix}`;
export default function TokenActivity(){
 const [frequency,setFrequency]=useState<'weekly'|'daily'>('weekly');
 const [metric,setMetric]=useState<'volume'|'change'>('volume');
 const [range,setRange]=useState<'12'|'26'|'all'>('12');
 const [source,setSource]=useState<'both'|'openrouter'|'ramp'>('both');
 const visible:Source[]=frequency==='daily'?['openrouter']:source==='both'?['openrouter','ramp']:[source];
 const openrouter=new Map<string,number|null>(frequency==='weekly'
  ? data.weekly.map(r=>[r.end,metric==='volume'?r.openrouter:r.openrouterWow] as const)
  : data.daily.map(r=>[r.date,metric==='volume'?r.openrouter:r.dayChange] as const));
 const ramp=new Map<string,number|null>(data.rampPublishedWeekly.map(r=>[r.end,metric==='volume'?r.ramp:r.rampWow] as const));
 const calendars:Record<Source,ReadonlyMap<string,number|null>>={openrouter,ramp};
 const dates=[...new Set(visible.flatMap(s=>[...calendars[s].keys()]))].sort();
 const end=Date.parse(dates.at(-1)!);
 const cutoff=end-Number(range)*7*86_400_000;
 const points:Point[]=dates.filter(date=>range==='all'||Date.parse(date)>cutoff)
  .map(date=>({date,openrouter:calendars.openrouter.get(date),ramp:calendars.ramp.get(date)}));
 const values=points.flatMap(p=>visible.map(s=>p[s]).filter((v):v is number=>v!=null));
 const lo=Math.min(0,...values),hi=Math.max(1,...values),pad=(hi-lo)*.1;
 const dual=metric==='volume'&&visible.length===2;
 const maxima={openrouter:Math.max(1,...points.map(p=>p.openrouter??0))*1.1,ramp:Math.max(1,...points.map(p=>p.ramp??0))*1.1};
 const start=Date.parse(points[0].date);
 const x=(date:string)=>95+(Date.parse(date)-start)*910/Math.max(1,end-start);
 const y=(v:number,s:'openrouter'|'ramp'=visible[0])=>dual?375-v/maxima[s]*325:375-(v-lo+pad)*325/(hi-lo+2*pad);
 const latestOr=[...data.weekly].reverse().find(r=>r.openrouter!==null)!;
 const latestRamp=data.rampPublishedWeekly.at(-1)!;
 const latestDaily=[...data.daily].reverse().find(r=>r.openrouter!==null)!;
 const colors={openrouter:'#315e87',ramp:'#237d67'};
 return <AdoptionPanel id="token-activity" headingId="token-heading">
  <div className="eyebrow">VOLUME · BUSINESS SAMPLE AND ROUTED USAGE</div><h2 id="token-heading">Adoption volume</h2>
  <AdoptionMetrics>
   {frequency==="weekly"?<><AdoptionMetric><span>OpenRouter · latest complete week</span><strong>{format(latestOr.openrouter,'T/day')}</strong><small>{latestOr.end} · {format(latestOr.openrouterWow,'% WoW')}</small></AdoptionMetric>
   <AdoptionMetric><span>Ramp · latest published week</span><strong>{format(latestRamp.ramp,'T/day')}</strong><small>{latestRamp.end} · {format(latestRamp.rampWow,'% WoW')}</small></AdoptionMetric></>:<AdoptionMetric><span>OpenRouter · latest daily bucket</span><strong>{format(latestDaily.openrouter,'T')}</strong><small>{latestDaily.date} · {format(latestDaily.dayChange,'% daily change')}</small></AdoptionMetric>}
  </AdoptionMetrics>
  <p className="adoption-chart-unit">{metric==="change"?(frequency==="weekly"?"Week-over-week change":"Day-over-day change"):frequency==="weekly"?"Trillion tokens per day · weekly averages":"Trillion tokens per UTC day"}{dual?" · separate axes":""}</p>
  <AdoptionControls>
   <label>Frequency <select aria-label="Token observation frequency" value={frequency} onChange={e=>setFrequency(e.target.value as typeof frequency)}><option value="weekly">Weekly · both sources</option><option value="daily">Daily · OpenRouter</option></select></label>
   <label>Measure <select aria-label="Token activity metric" value={metric} onChange={e=>setMetric(e.target.value as typeof metric)}><option value="volume">Token volume</option><option value="change">{frequency==='weekly'?'Weekly change':'Daily change'}</option></select></label>
   <label>History <select aria-label="Token activity history" value={range} onChange={e=>setRange(e.target.value as typeof range)}><option value="12">Last 12 weeks</option><option value="26">Last 26 weeks</option><option value="all">All observed history</option></select></label>
   {frequency==='weekly'&&<label>Source <select aria-label="Token activity source" value={source} onChange={e=>setSource(e.target.value as typeof source)}><option value="both">Both · published week ends</option><option value="openrouter">OpenRouter</option><option value="ramp">Ramp</option></select></label>}
  </AdoptionControls>
  <AdoptionChartFrame><svg viewBox="0 0 1120 460" role="img" aria-label={`${frequency} token ${metric==='volume'?'volumes':'percentage changes'} for ${visible.join(' and ')}`}>
   {dual&&<><text x="95" y="24" fill={colors.openrouter}>OpenRouter · T/day · left axis</text><text x="1005" y="24" textAnchor="end" fill={colors.ramp}>Ramp · T/day · right axis</text></>}
   {[0,.25,.5,.75,1].map(t=>{const value=lo+(hi-lo)*t,axisY=dual?375-t*325:y(value);return <g key={t}><line x1="95" x2="1005" y1={axisY} y2={axisY} stroke="#d6d7ce"/><text x="85" y={axisY+5} textAnchor="end" fill={dual?colors.openrouter:undefined}>{(dual?maxima.openrouter*t:value).toFixed(metric==='volume'?1:0)}{metric==='change'?'%':'T'}</text>{dual&&<text x="1015" y={axisY+5} fill={colors.ramp}>{(maxima.ramp*t).toFixed(1)}T</text>}</g>;})}
   {visible.map(s=>{
    const series=points.filter(p=>p[s]!==undefined);
    return <path key={s} d={series.map((p,i)=>p[s]==null?'':`${i===0||series[i-1][s]==null?'M':'L'}${x(p.date)},${y(p[s]!,s)}`).join(' ')} fill="none" stroke={colors[s]} strokeWidth="3"/>;
   })}
   {adoptionTickIndices(points.length).map(i=><text key={points[i].date} x={x(points[i].date)} y="422" textAnchor="middle">{points[i].date.slice(2)}</text>)}
  </svg></AdoptionChartFrame>
  <div className="pillar-series-legend">{visible.map(s=><span key={s} style={{color:colors[s]}}>{s==='openrouter'?'OpenRouter routed traffic':'Ramp TSM sampled-business usage'}</span>)}</div>
  <AdoptionNotes>
  <p>Sources: <a href="#source-S9">OpenRouter</a> routed traffic and <a href="#source-S14">Ramp TSM</a> business sample. OpenRouter weeks end Sunday. Ramp observations appear on Ramp’s published week-ending dates. Monthly scoring uses the separate archived Sunday-ending Ramp series. Daily values use UTC. Dual axes start at zero and scale independently. Samples may overlap; totals are never added.</p>
    <details className="evidence-data"><summary>Monthly coverage</summary><p>Both sources use the same 28-day window ending on the last completed Sunday in the calendar month. Volume and price changes combine into nominal spending growth before scoring. The six January–June 2026 growth observations form a provisional retrospective baseline. Full 28/28 OpenRouter-day and 4/4 Ramp-week coverage is required; no partial-month scaling. Provider samples differ, and overlap cannot be measured.</p><div className="signal-table-wrap"><table><thead><tr><th>Core month</th><th>Window</th><th>OpenRouter days</th><th>Ramp weeks</th><th>OpenRouter T/day</th><th>Ramp T/day</th><th>Coverage</th></tr></thead><tbody>{data.monthly.filter(r=>r.month>='2025-01').map(r=><tr key={r.month}><th>{r.month}</th><td>{r.start} – {r.end}</td><td>{r.openrouterDays}/28</td><td>{r.rampWeeks}/4</td><td>{format(r.openrouter)}</td><td>{format(r.ramp)}</td><td>{r.complete?'Complete matched window':'Withheld'}</td></tr>)}</tbody></table></div></details>
    <details className="evidence-data"><summary>Chart data and partial weeks</summary><div className="signal-table-wrap"><table><thead><tr><th>{frequency==='weekly'?'Week ending':'Date'}</th><th>OpenRouter</th>{frequency==='weekly'&&<th>Ramp</th>}</tr></thead><tbody>{points.map(p=><tr key={p.date}><th>{p.date}</th><td>{format(p.openrouter,metric==='change'?'%':'T/day')}</td>{frequency==='weekly'&&<td>{format(p.ramp,metric==='change'?'%':'T/day')}</td>}</tr>)}</tbody></table></div>{data.partialWeeks.map(r=><p key={r.start}>OpenRouter partial week {r.start} – {r.end}: {r.openrouterDays}/7 days, {r.openrouterObservedTotal.toFixed(2)}T observed. Excluded from completed-week comparisons.</p>)}</details>
 </AdoptionNotes></AdoptionPanel>;
}
