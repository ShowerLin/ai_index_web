"use client";
import {useState} from 'react';
import {tokenActivitySnapshot as data} from './token-activity-snapshot';

type Point={date:string;openrouter:number|null;ramp:number|null};
const format=(value:number|null,suffix='')=>value===null?'Unavailable':`${value.toFixed(2)}${suffix}`;
export default function TokenActivity(){
 const [frequency,setFrequency]=useState<'weekly'|'daily'>('weekly');
 const [metric,setMetric]=useState<'volume'|'change'>('volume');
 const [range,setRange]=useState<'12'|'26'|'all'>('12');
 const [source,setSource]=useState<'both'|'openrouter'|'ramp'>('both');
 const weekly:Point[]=data.weekly.map(r=>({date:r.end,openrouter:metric==='volume'?r.openrouter:r.openrouterWow,ramp:metric==='volume'?r.ramp:r.rampWow}));
 const daily:Point[]=data.daily.map(r=>({date:r.date,openrouter:metric==='volume'?r.openrouter:r.dayChange,ramp:null}));
 const points=(frequency==='weekly'?weekly:daily).slice(range==='all'?0:-Number(range)*(frequency==='weekly'?1:7));
 const visible=(frequency==='daily'?['openrouter']:source==='both'?['openrouter','ramp']:[source]) as ('openrouter'|'ramp')[];
 const values=points.flatMap(p=>visible.map(s=>p[s]).filter((v):v is number=>v!==null));
 const lo=Math.min(0,...values),hi=Math.max(1,...values),pad=(hi-lo)*.1;
 const x=(i:number)=>75+i*970/Math.max(1,points.length-1),y=(v:number)=>295-(v-lo+pad)*245/(hi-lo+2*pad);
 const latestOr=[...data.weekly].reverse().find(r=>r.openrouter!==null)!;
 const latestRamp=[...data.weekly].reverse().find(r=>r.ramp!==null)!;
 const latestDaily=[...data.daily].reverse().find(r=>r.openrouter!==null)!;
 const matched=[...data.weekly].reverse().find(r=>r.openrouter!==null&&r.ramp!==null)!;
 const colors={openrouter:'#315e87',ramp:'#237d67'};
 return <section className="section token-activity" id="token-activity" aria-labelledby="token-heading">
  <div className="eyebrow">HIGH FREQUENCY · DAILY AND WEEKLY OBSERVATIONS</div><h2 id="token-heading">Token activity</h2>
  <p className="section-summary">OpenRouter tracks public routed traffic; Ramp tracks published model usage within its Token Spend Management business sample. They provide different views of usage, with possible customer overlap. Their separate volume signals contribute {(data.metadata.tokenCoreWeight*100).toFixed(1)}% of the monthly core. This panel shows observed changes without refreshing or extrapolating the slower macro inputs.</p>
  <div className="token-frequency-summary">
   <article><span>OpenRouter · latest complete week</span><strong>{format(latestOr.openrouter,'T/day')}</strong><small>{latestOr.end} · {format(latestOr.openrouterWow,'% WoW')}</small></article>
   <article><span>Ramp · latest published week</span><strong>{format(latestRamp.ramp,'T/day')}</strong><small>{latestRamp.end} · {format(latestRamp.rampWow,'% WoW')}</small></article>
   <article><span>OpenRouter · latest daily bucket</span><strong>{format(latestDaily.openrouter,'T')}</strong><small>{latestDaily.date} · {format(latestDaily.dayChange,'% daily change')}</small></article>
  </div>
  <div className="token-controls">
   <div className="contribution-mode" role="group" aria-label="Token observation frequency"><button aria-pressed={frequency==='weekly'} onClick={()=>setFrequency('weekly')}>Weekly · both sources</button><button aria-pressed={frequency==='daily'} onClick={()=>setFrequency('daily')}>Daily · OpenRouter</button></div>
   <div className="contribution-mode" role="group" aria-label="Token activity metric"><button aria-pressed={metric==='volume'} onClick={()=>setMetric('volume')}>Token volume</button><button aria-pressed={metric==='change'} onClick={()=>setMetric('change')}>{frequency==='weekly'?'Weekly change':'Daily change'}</button></div>
   <label>History <select aria-label="Token activity history" value={range} onChange={e=>setRange(e.target.value as typeof range)}><option value="12">Last 12 weeks</option><option value="26">Last 26 weeks</option><option value="all">All observed history</option></select></label>
   {frequency==='weekly'&&<label>Source <select aria-label="Token activity source" value={source} onChange={e=>setSource(e.target.value as typeof source)}><option value="both">Both, separately</option><option value="openrouter">OpenRouter</option><option value="ramp">Ramp</option></select></label>}
  </div>
  <p className="panel-source">{metric==='volume'?frequency==='weekly'?'Trillion tokens per day · average within completed Monday–Sunday weeks':'Trillion tokens in each UTC daily bucket':frequency==='weekly'?'Week-over-week change (%) · matched consecutive completed weeks':'Day-over-day change (%) · adjacent observed UTC days'}. Latest matched source week ends {matched.end}.</p>
  <div className="token-frequency-chart"><svg viewBox="0 0 1120 355" role="img" aria-label={`${frequency} token ${metric==='volume'?'volumes':'percentage changes'} for ${visible.join(' and ')}`}>
   {[0,.25,.5,.75,1].map(t=>{const value=lo+(hi-lo)*t;return <g key={t}><line x1="75" x2="1045" y1={y(value)} y2={y(value)} stroke="#d6d7ce"/><text x="65" y={y(value)+5} textAnchor="end">{value.toFixed(metric==='volume'?1:0)}{metric==='change'?'%':'T'}</text></g>;})}
   {visible.map(s=><path key={s} d={points.map((p,i)=>p[s]===null?'':`${i===0||points[i-1][s]===null?'M':'L'}${x(i)},${y(p[s]!)}`).join(' ')} fill="none" stroke={colors[s]} strokeWidth="3"/>)}
   {points.map((p,i)=>i===0||i===points.length-1||i%Math.max(1,Math.ceil(points.length/6))===0?<text key={p.date} x={x(i)} y="337" textAnchor="middle">{p.date.slice(2)}</text>:null)}
  </svg></div>
  <div className="pillar-series-legend">{visible.map(s=><span key={s} style={{color:colors[s]}}>{s==='openrouter'?'OpenRouter routed traffic':'Ramp TSM sampled-business usage'}</span>)}</div>
  <p className="panel-source">Sources <a href="#source-S9">S9 · OpenRouter</a> and <a href="#source-S14">S14 · Ramp</a>. Cached OpenRouter data through {data.metadata.openrouterThrough}; Ramp weekly data through {data.metadata.rampThrough}. Refreshing OpenRouter requires credentials, which are not configured here. Missing days and unavailable weeks break lines. Daily changes are not seasonally adjusted. Ramp daily fields contain overlapping seven-day totals for a narrower provider sample; this panel does not treat them as daily volume. Token totals reflect tokenization, cached tokens, reasoning intensity and sample changes, not revenue or useful tasks. The two totals are never added.</p>
  <details className="evidence-data"><summary>Monthly core alignment and coverage</summary><p>Both sources use the same 28-day window ending on the last completed Sunday in the calendar month. Log volume levels are normalized separately against 15 matched observations through June 2026. This short, retrospective calibration is provisional. Full 28/28 OpenRouter-day and 4/4 Ramp-week coverage is required; no partial-month scaling. Provider samples differ, and overlap cannot be measured.</p><div className="signal-table-wrap"><table><thead><tr><th>Core month</th><th>Window</th><th>OpenRouter days</th><th>Ramp weeks</th><th>OpenRouter T/day</th><th>Ramp T/day</th><th>Coverage</th></tr></thead><tbody>{data.monthly.filter(r=>r.month>='2025-01').map(r=><tr key={r.month}><th>{r.month}</th><td>{r.start} – {r.end}</td><td>{r.openrouterDays}/28</td><td>{r.rampWeeks}/4</td><td>{format(r.openrouter)}</td><td>{format(r.ramp)}</td><td>{r.complete?'Complete matched window':'Withheld'}</td></tr>)}</tbody></table></div></details>
  <details className="evidence-data"><summary>Displayed observations and partial-week coverage</summary><div className="signal-table-wrap"><table><thead><tr><th>{frequency==='weekly'?'Week ending':'Date'}</th><th>OpenRouter</th>{frequency==='weekly'&&<th>Ramp</th>}</tr></thead><tbody>{points.map(p=><tr key={p.date}><th>{p.date}</th><td>{format(p.openrouter,metric==='change'?'%':'T/day')}</td>{frequency==='weekly'&&<td>{format(p.ramp,metric==='change'?'%':'T/day')}</td>}</tr>)}</tbody></table></div>{data.partialWeeks.map(r=><p key={r.start}>OpenRouter partial week {r.start} – {r.end}: {r.openrouterDays}/7 days, {r.openrouterObservedTotal.toFixed(2)}T observed. Excluded from completed-week comparisons.</p>)}</details>
 </section>;
}
