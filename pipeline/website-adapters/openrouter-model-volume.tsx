"use client";
import {useMemo,useState,type PointerEvent} from 'react';
import {adoptionTickIndices,AdoptionChartFrame,AdoptionControls,AdoptionMetric,AdoptionMetrics,AdoptionNotes,AdoptionPanel} from './adoption-widgets';
import {openrouterModelSnapshot} from './openrouter-model-snapshot';
import {buildModelSeries,type ModelOptions,type ModelSnapshot} from './openrouter-model-series';
import './openrouter-model-volume.css';

const data:ModelSnapshot=openrouterModelSnapshot;
const palette=['#315e87','#237d67','#bd7738','#916aa6','#a5454a','#667a36','#3394a5','#947047','#6b73af','#b16484','#c6cbc6'];
const name=(id:string)=>id==='Other'?'Other models / source aggregate':id.slice(id.indexOf('/')+1);
const tokens=(v:number)=>v>=1e12?`${(v/1e12).toFixed(2)}T`:v>=1e9?`${(v/1e9).toFixed(1)}B`:`${(v/1e6).toFixed(1)}M`;

export default function OpenRouterModelVolume(){
 const [range,setRange]=useState<ModelOptions['range']>('30');
 const [frequency,setFrequency]=useState<ModelOptions['frequency']>('daily');
 const [measure,setMeasure]=useState<'volume'|'share'>('volume');
 const [count,setCount]=useState<5|10>(10);
 const [active,setActive]=useState<number|null>(null);
 const view=useMemo(()=>buildModelSeries(data,{range,frequency,count}),[range,frequency,count]);
 const {buckets,series}=view;
 const focus=Math.max(0,Math.min(active??buckets.length-1,buckets.length-1)),selected=buckets[focus];
 const maximum=measure==='share'?100:Math.max(1,...buckets.map(p=>p.total??0))*1.08;
 const step=910/Math.max(1,buckets.length);
 const x=(i:number)=>95+(i+.5)*step;
 const barWidth=Math.min(100,step*.82);
 const y=(value:number)=>375-value/maximum*320;
 const allocation=(i:number,j:number)=>{
  const row=buckets[i];
  if(row.values===null)return null;
  const raw=row.values[j];return measure==='share'?(row.total!>0?raw/row.total!*100:0):raw;
 };
 const cumulative=(i:number,j:number)=>series.slice(0,j).reduce((sum,_,k)=>sum+(allocation(i,k)??0),0);
 const reset=()=>setActive(null);
 const hover=(event:PointerEvent<SVGSVGElement>)=>{
  const box=event.currentTarget.getBoundingClientRect();
  setActive(Math.max(0,Math.min(buckets.length-1,Math.floor(((event.clientX-box.left)/box.width*1120-95)/step))));
 };
 const unit=measure==='share'?'Share of public routed tokens (%)':frequency==='daily'?'Trillion tokens per UTC day':'Trillion tokens per day · complete Monday–Sunday weekly averages';
 const focusLabel=selected?(frequency==='daily'?selected.end:`${selected.start} – ${selected.end}`):'No complete weeks in this period';
 return <AdoptionPanel id="openrouter-model-volume" headingId="openrouter-model-heading">
  <div className="volume-card-heading"><div className="eyebrow">OPENROUTER · MODEL MIX</div><h2 id="openrouter-model-heading">Token volume by model</h2>
  <p className="adoption-chart-unit">Public prompt + completion tokens · data through {data.metadata.through} · models ranked over the displayed period</p>
  </div>
  <AdoptionMetrics>
   <AdoptionMetric><span>Displayed-period routed volume</span><strong>{view.coveredDays?tokens(view.totalTokens):'Unavailable'}</strong><small>{view.start} – {view.end} · {view.coveredDays}/{view.expectedDays} days covered</small></AdoptionMetric>
   <AdoptionMetric><span>Largest separately reported model</span><strong className="model-leader">{series.find(s=>!s.other)?name(series[0].id):'Unavailable'}</strong><small>{view.totalTokens>0?`${(series[0].tokens/view.totalTokens*100).toFixed(1)}% of displayed volume`:''}</small></AdoptionMetric>
   <AdoptionMetric><span>Top {count} named models</span><strong>{view.totalTokens>0?`${(series.filter(s=>!s.other).reduce((sum,s)=>sum+s.tokens,0)/view.totalTokens*100).toFixed(1)}%`:'Unavailable'}</strong><small>Remaining routed volume stays in Other</small></AdoptionMetric>
  </AdoptionMetrics>
  <AdoptionControls>
   <label>History <select aria-label="Model volume history" value={range} onChange={e=>{setRange(e.target.value as typeof range);reset();}}><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="all">All observed history</option></select></label>
   <label>Frequency <select aria-label="Model volume frequency" value={frequency} onChange={e=>{setFrequency(e.target.value as typeof frequency);reset();}}><option value="daily">Daily</option><option value="weekly">Complete weeks · daily average</option></select></label>
   <label>Measure <select aria-label="Model volume measure" value={measure} onChange={e=>setMeasure(e.target.value as typeof measure)}><option value="volume">Absolute volume</option><option value="share">Percentage share</option></select></label>
   <label>Models <select aria-label="Model volume model count" value={count} onChange={e=>{setCount(Number(e.target.value) as 5|10);reset();}}><option value="5">Top 5 + Other</option><option value="10">Top 10 + Other</option></select></label>
  </AdoptionControls>
  <p className="adoption-chart-unit">{unit}. Hover or tap to inspect; use arrow keys when the chart is focused.</p>
  <AdoptionChartFrame><svg viewBox="0 0 1120 460" role="img" aria-label={`OpenRouter stacked bar chart of token volume by model: ${unit}`} tabIndex={0} onPointerMove={hover} onPointerDown={hover} onPointerLeave={reset} onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();setActive(Math.max(0,Math.min(buckets.length-1,focus+(e.key==='ArrowLeft'?-1:1))));}}}>
   {[0,.25,.5,.75,1].map(t=><g key={t}><line x1="95" x2="1005" y1={y(maximum*t)} y2={y(maximum*t)} stroke="#d6d7ce"/><text x="85" y={y(maximum*t)+5} textAnchor="end">{(maximum*t).toFixed(measure==='share'?0:1)}{measure==='share'?'%':'T'}</text></g>)}
   {buckets.map((row,i)=>row.values===null?null:<g key={row.end} data-model-bucket={row.end}>{series.map((s,j)=>{
    const v=allocation(i,j)??0;if(v<=0)return null;
    const bottom=cumulative(i,j),top=bottom+v;
    return <rect key={s.id} x={x(i)-barWidth/2} y={y(top)} width={barWidth} height={Math.max(0,y(bottom)-y(top))} fill={palette[s.other?10:j]} fillOpacity=".88"><title>{`${s.id} · ${row.end} · ${measure==='share'?v.toFixed(1)+'%':v.toFixed(2)+'T/day'}`}</title></rect>;
   })}</g>)}
   {selected&&active!==null&&<line x1={x(focus)} x2={x(focus)} y1="55" y2="375" stroke="var(--ink)" strokeDasharray="4 4"/>}
   {adoptionTickIndices(buckets.length).map(i=><text key={buckets[i].end} x={x(i)} y="422" textAnchor="middle">{buckets[i].end.slice(2)}</text>)}
  </svg></AdoptionChartFrame>
  <div className="volume-card-detail">
  <div className="model-volume-inspector" aria-label="Model volume chart reading"><strong>{focusLabel}{selected?.total!=null?` · ${selected.total.toFixed(2)}T/day`:''}</strong>
   <div className="model-volume-legend">{series.map((s,j)=><span key={s.id} title={s.id}><i style={{background:palette[s.other?10:j]}}/><span>{name(s.id)}</span><b>{selected?.values&&selected.total!==null?(!s.other&&selected.values[j]===0?'Not named':measure==='share'?`${(selected.total>0?selected.values[j]/selected.total*100:0).toFixed(1)}%`:`${selected.values[j].toFixed(2)}T`):'Unavailable'}</b></span>)}</div>
  </div>
  {view.excludedEdgeDays>0&&<p className="adoption-chart-unit">{view.excludedEdgeDays} edge days excluded to show complete Monday–Sunday weeks.</p>}
  <details className="evidence-data model-volume-ranking"><summary>Model rankings and displayed-period token totals</summary><div className="signal-table-wrap"><table><thead><tr><th>Rank</th><th>Model variant</th><th>Reported tokens</th><th>Share of total</th></tr></thead><tbody>{series.map((s,j)=><tr key={s.id}><td>{s.other?'—':j+1}</td><th>{s.id}</th><td>{tokens(s.tokens)}</td><td>{view.totalTokens>0?`${(s.tokens/view.totalTokens*100).toFixed(1)}%`:'Unavailable'}</td></tr>)}</tbody></table></div></details>
  <p className="adoption-chart-unit">The feed names the top 50 models each day. Activity outside that daily list is included in Other, so a model’s named history shows its separately reported tokens.</p>
  <AdoptionNotes>
   <p>Source: <a href="https://openrouter.ai/rankings" target="_blank" rel="noreferrer">OpenRouter (openrouter.ai/rankings)</a>, as of {data.metadata.asOf}. Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a>.</p>
   <p>Prompt and completion tokens are counted using each provider’s tokenizer. This is routed usage on OpenRouter; it does not measure users or the entire AI market. Free and dated model variants stay separate. Other includes the source’s aggregated long tail plus every named model outside the selected top {count}. Missing daily source buckets appear as gaps; weekly averages require all seven days. Model detail breaks down the existing OpenRouter volume signal without adding another core constituent.</p>
   <p>Daily ranges end at the latest saved complete UTC day. Weekly ranges end at the last completed Sunday and use only whole Monday–Sunday weeks, so their dates can differ from OpenRouter’s trailing-seven-day leaderboard. “Not named” means a model was not separately reported in that bucket; any tokens remain in Other. Named-model totals can understate full model usage when a model falls below the source’s daily top 50.</p>
  </AdoptionNotes>
  </div>
 </AdoptionPanel>;
}
