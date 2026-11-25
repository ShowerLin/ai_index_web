"use client";
import { adoptionTickIndices, AdoptionChartFrame, AdoptionControls, AdoptionMetric, AdoptionMetrics, AdoptionNotes, AdoptionPanel } from './adoption-widgets';
import {useState} from 'react';
import {adoptionPriceSnapshot as data} from './adoption-price-snapshot';

type View='indexed'|'usd'|'growth';
type Source='ramp'|'openrouter';
type SpendingWindow = {
  month: string;
  windowEnd: string;
  rampSpendUsd: number | null;
  rampSpendingGrowth: number | null;
  openrouterSpendProxy: number | null;
  openrouterSpendingGrowth: number | null;
  openrouterPriceCoverage: number | null;
  rolling?: boolean;
};
const names={ramp:'Ramp matched spending',openrouter:'OpenRouter estimated spending'};
const rampChart = data.rampPublicChart;
const rampSpendingUnit = rampChart.indexed ? 'Index points · sum of model indexes' : 'Index · first published week = 100';
const colors={ramp:'#237d67',openrouter:'#315e87'};
const dollars=(value:number)=>'$'+(value/1e6).toLocaleString('en-US',{maximumFractionDigits:2})+'M';

const signedPct=(v:number)=>`${v>0?'+':''}${v.toFixed(1)}%`;

export function AdoptionReadthrough(){
 const row=[...data.spendingMonthly].reverse().find(r=>r.rampVolumeGrowth!==null&&r.rampPriceChange!==null&&r.rampSpendingGrowth!==null&&r.openrouterVolumeGrowth!==null&&r.openrouterSpendingGrowth!==null);
 if(!row)return null;
 return <aside className="adoption-readthrough" aria-label="Business paid-demand research takeaway">
  <div className="eyebrow">MATCHED RAMP AND OPENROUTER WINDOW · 28 DAYS ENDING {row.windowEnd}</div>
  <h3>{row.rampVolumeGrowth!>0&&row.rampPriceChange!<0?'Lower unit costs temper Ramp spending':'What drove spending in the latest comparable window?'}</h3>
  <p>Ramp: volume {signedPct(row.rampVolumeGrowth!)}, implied unit cost {signedPct(row.rampPriceChange!)}, spending {signedPct(row.rampSpendingGrowth!)} versus the prior window. OpenRouter routed volume moved {signedPct(row.openrouterVolumeGrowth!)} and estimated spending moved {signedPct(row.openrouterSpendingGrowth!)}. The catalog matched {((row.openrouterPriceCoverage ?? 0)*100).toFixed(1)}% of routed tokens.</p>
 </aside>;
}
export function RampWeeklySpending() {
 const rows = rampChart.weekly;
 const values = rows.map(row => row.spendingIndex);
 const latest = rows.findLast(row => row.spendingIndex !== null);
 const ceiling=Math.max(1,...values.map(value=>value??0));
 const first=Date.parse(rows[0].end),last=Date.parse(rows.at(-1)!.end);
 const x=(date:string)=>100+900*(Date.parse(date)-first)/Math.max(1,last-first);
 const y=(value:number)=>375-320*value/ceiling;
 return <AdoptionPanel headingId="ramp-weekly-spending-heading">
  <div className="eyebrow">WEEKLY BUSINESS SAMPLE</div><h2 id="ramp-weekly-spending-heading">Ramp spending index</h2>
  {latest&&<AdoptionMetrics><AdoptionMetric><span>Latest published week</span><strong>{latest.spendingIndex?.toFixed(1)}</strong><small>Week ending {latest.end}</small></AdoptionMetric></AdoptionMetrics>}
  <p className="adoption-chart-unit">{rampSpendingUnit}</p>
  <AdoptionChartFrame><svg viewBox="0 0 1120 460" role="img" aria-label="Weekly Ramp spending index">
   {[0,.25,.5,.75,1].map(f=><g key={f}><line x1="100" x2="1000" y1={y(ceiling*f)} y2={y(ceiling*f)} stroke="#d6d7ce"/><text x="88" y={y(ceiling*f)+4} textAnchor="end">{(ceiling*f).toFixed(0)}</text></g>)}
   <path d={rows.map((row,i)=>{const value=values[i];return value===null?'':`${i===0||values[i-1]===null?'M':'L'}${x(row.end)},${y(value)}`;}).join(' ')} fill="none" stroke={colors.ramp} strokeWidth="2"/>
   {rows.map((row,i)=>{const value=values[i];return value===null?null:<circle key={row.end} cx={x(row.end)} cy={y(value)} r="2.5" fill={colors.ramp}><title>{`${row.end} · ${value.toFixed(1)} index points`}</title></circle>;})}
   <text x="100" y="422">{rows[0].end}</text><text x="1000" y="422" textAnchor="end">{rows.at(-1)!.end}</text>
  </svg></AdoptionChartFrame>
  <div className="pillar-series-legend"><span style={{color:colors.ramp}}>Ramp matched spending</span></div>
  <div className="adoption-spending-options">
  <AdoptionNotes><p>The weekly index sums Ramp’s published model-level spending series. Changes track relative spending in the published sample.</p></AdoptionNotes>
  </div>
 </AdoptionPanel>;
}

export default function AdoptionSpending(){
 const [view,setView]=useState<View>('usd');
 const [source,setSource]=useState<'both'|Source>('both');
 const latestDaily=data.openrouterSpendingDaily.findLast(r=>r.estimatedSpendUsd!==null);
 const baseline=data.spendingMonthly.find(r=>r.rampSpendUsd!==null&&r.rampSpendUsd>0&&r.openrouterSpendProxy!==null&&r.openrouterSpendProxy>0);
 if(!baseline)return <p id="adoption-spending">Spending charts are withheld until both sources have a complete common window.</p>;
 const selected:Source[]=source==='both'?['ramp','openrouter']:[source];
 const usesDollars=(s:Source)=>view==='usd'&&(s==='openrouter'||!rampChart.indexed);
 const amount=(r:SpendingWindow,s:Source)=>s==='ramp'?r.rampSpendUsd:r.openrouterSpendProxy;
 const value=(r:SpendingWindow,s:Source)=>{
  const level=amount(r,s);
  if(view==='growth')return s==='ramp'?r.rampSpendingGrowth:r.openrouterSpendingGrowth;
  return level===null?null:usesDollars(s)?level/1e6:level/amount(baseline,s)!*100;
 };
 const monthly=data.spendingMonthly.filter(r=>r.month>=baseline.month);
 const latestMonth=monthly.findLast(r=>r.openrouterSpendProxy!==null);
 const latestWindow=data.openrouterLatestWindow;
 const rolling:SpendingWindow|null=latestWindow&&(!latestMonth||latestWindow.windowEnd>latestMonth.windowEnd)
   ? {...latestWindow,month:latestWindow.windowEnd.slice(0,7),rampSpendUsd:null,rampSpendingGrowth:null,rolling:true}
   : null;
 const allWindows:SpendingWindow[]=rolling
   ? [...monthly,rolling].sort((a,b)=>a.windowEnd.localeCompare(b.windowEnd))
   : monthly;
 const through=allWindows.findLast(r=>selected.some(s=>amount(r,s)!==null))?.windowEnd??baseline.windowEnd;
 const rows=allWindows.filter(r=>r.windowEnd<=through);
 const dual=view==='usd'&&selected.length===2;
 const left:Source=dual?'openrouter':selected[0];
 const bounds=(sources:Source[])=>{
  const values=rows.flatMap(r=>sources.map(s=>value(r,s))).filter((v):v is number=>v!==null);
  const low=view==='growth'?Math.min(0,...values):0,high=Math.max(1,...values),pad=(high-low)*.08;
  return {min:view==='growth'?low-pad:0,max:high+pad};
 };
 const shared=bounds(selected),scales={ramp:dual?bounds(['ramp']):shared,openrouter:dual?bounds(['openrouter']):shared};
 const first=Date.parse(rows[0].windowEnd),last=Date.parse(rows.at(-1)!.windowEnd);
 const x=(date:string)=>100+(Date.parse(date)-first)/Math.max(1,last-first)*900;
 const y=(v:number,s:Source=left)=>285-(v-scales[s].min)/Math.max(1,scales[s].max-scales[s].min)*230;
 const rollingValue=rolling&&selected.includes('openrouter')?value(rolling,'openrouter'):null;
 const monthlyValue=latestMonth?value(latestMonth,'openrouter'):null;
 const path=(s:Source)=>rows.map((r,i)=>{const v=value(r,s);return v===null||r.rolling?'':`${i===0||rows[i-1].rolling||value(rows[i-1],s)===null?'M':'L'}${x(r.windowEnd)},${y(v,s)}`;}).join(' ');
 const sourceUnit=(s:Source,rolling=false)=>usesDollars(s)?'USD millions / 28-day window':view==='growth'?rolling?'% vs prior 28 days':'% vs previous monthly window':`Index · ${baseline.month} = 100`;
 const axisUnit=(s:Source)=>usesDollars(s)?'USD M':view==='growth'?'%':`Index (${baseline.month}=100)`;
 const tickLabel=(v:number,s:Source)=>`${usesDollars(s)?'$':''}${v.toFixed(usesDollars(s)?1:0)}${view==='growth'?'%':''}`;
 const unit=dual?`Left · OpenRouter USD millions · right · Ramp ${rampChart.indexed?'spending index':'USD millions'}`:sourceUnit(left);
 return <AdoptionPanel id="adoption-spending" headingId="spending-heading">
  <div className="eyebrow">CALCULATED NOMINAL SPENDING</div><h2 id="spending-heading">Nominal spending</h2>



  <AdoptionMetrics>{(['ramp','openrouter'] as Source[]).map(s=>{const row=allWindows.findLast(r=>amount(r,s)!==null);if(!row)return null;return <AdoptionMetric key={s}><span>{names[s]}</span><strong>{s==='ramp'&&rampChart.indexed ? view==='growth' ? row.rampSpendingGrowth===null?'Unavailable':signedPct(row.rampSpendingGrowth) : `${value(row,s)!.toFixed(1)} index` : dollars(amount(row,s)!)}</strong><small>{row.rolling?'Rolling 28':'28'} days ending {row.windowEnd} · {value(row,s)===null?'growth unavailable':view==='growth'?`${signedPct(value(row,s)!)} ${row.rolling?'vs prior 28 days':'vs previous monthly window'}`:s==='ramp'?(rampChart.indexed?`${baseline.month} = 100`:'matched published sample'):`${((row.openrouterPriceCoverage ?? 0)*100).toFixed(1)}% of routed tokens matched to catalog`}</small></AdoptionMetric>;})}{latestDaily&&<AdoptionMetric><span>OpenRouter daily estimate</span><strong>{dollars(latestDaily.estimatedSpendUsd!)}</strong><small>{latestDaily.date} UTC · {dollars(latestDaily.imputedSpendUsd!)} estimated from unmatched tokens</small></AdoptionMetric>}</AdoptionMetrics>
  <p className="adoption-chart-unit">{unit}{dual?" · separate axes":""}</p>
  <AdoptionControls><label>Spending view <select aria-label="Spending chart view" value={view} onChange={e=>setView(e.target.value as View)}><option value="indexed">Common base · {baseline.month} = 100</option><option value="usd">{rampChart.indexed?'Native levels · Ramp index / OpenRouter USD':'Native spending levels · USD millions'}</option><option value="growth">Spending change · %</option></select></label><label>Source <select aria-label="Spending chart source" value={source} onChange={e=>setSource(e.target.value as typeof source)}><option value="both">Both, separately</option><option value="ramp">Ramp matched spending</option><option value="openrouter">OpenRouter estimate</option></select></label></AdoptionControls>
  <AdoptionChartFrame><svg viewBox="0 0 1120 460" role="img" aria-label={`Calculated spending line chart: ${unit}; Ramp matched spending and OpenRouter estimated spending`}>
   <text x="100" y="25" style={{fill:colors[left]}}>{left==='openrouter'?'OpenRouter estimate':'Ramp'} · {axisUnit(left)} · left axis</text>
   {dual&&<text x="1000" y="25" textAnchor="end" style={{fill:colors.ramp}}>Ramp · {axisUnit("ramp")} · right axis</text>}
   {[0,.25,.5,.75,1].map(t=>{const axis=scales[left],v=axis.min+(axis.max-axis.min)*t;return <g key={t}><line x1="100" x2="1000" y1={y(v)} y2={y(v)} stroke="#d6d7ce"/><text x="88" y={y(v)+4} textAnchor="end" style={{fill:colors[left]}}>{tickLabel(v,left)}</text>{dual&&<text x="1012" y={y(v)+4} style={{fill:colors.ramp}}>{tickLabel(scales.ramp.min+(scales.ramp.max-scales.ramp.min)*t,'ramp')}</text>}</g>;})}
   {view==='growth'&&<line x1="100" x2="1000" y1={y(0)} y2={y(0)} stroke="#8c969c" strokeDasharray="5 4"/>}
   {rolling&&latestMonth&&rollingValue!==null&&monthlyValue!==null&&<line
     x1={x(latestMonth.windowEnd)} y1={y(monthlyValue,'openrouter')}
     x2={x(rolling.windowEnd)} y2={y(rollingValue,'openrouter')}
     stroke={colors.openrouter} strokeWidth="3" strokeDasharray="1 6" strokeLinecap="round">
     <title>{`OpenRouter spending · monthly window ending ${latestMonth.windowEnd} to rolling window ending ${rolling.windowEnd}`}</title>
   </line>}
   {selected.map(s=><g key={s}><path d={path(s)} fill="none" stroke={colors[s]} strokeWidth="3" strokeDasharray={s==='openrouter'?'7 4':undefined}/>{rows.map(r=>{const v=value(r,s);return v===null?null:<circle key={r.windowEnd} cx={x(r.windowEnd)} cy={y(v,s)} r={r.rolling?6:4} fill={r.rolling?'var(--card)':colors[s]} stroke={r.rolling?colors[s]:undefined} strokeWidth={r.rolling?2:undefined}><title>{`${names[s]} · ${r.rolling?'rolling 28 days':r.month} · window ending ${r.windowEnd}: ${s==='ramp'&&rampChart.indexed?'Ramp indexed sample':dollars(amount(r,s)!)}; ${v.toFixed(2)} ${sourceUnit(s, r.rolling)}`}</title></circle>;})}</g>)}
   {adoptionTickIndices(rows.length).map(i=>rows[i]).map(r=><text key={r.windowEnd} x={x(r.windowEnd)} y="422" textAnchor="middle">{r.rolling?r.windowEnd.slice(5):r.month.slice(2)}</text>)}
  </svg></AdoptionChartFrame>
  <div className="pillar-series-legend">{selected.map(s=><span key={s} style={{color:colors[s]}}>{names[s]} · {s==='ramp'?'solid':'dashed proxy'}{dual?` · ${s==='ramp'?'right':'left'} axis`:''}</span>)}{rollingValue!==null&&<span style={{color:colors.openrouter}}>○ Latest rolling 28 days{monthlyValue!==null?' · dotted extension':''}</span>}</div>
  <div className="adoption-spending-options">
  <AdoptionNotes><p>The two spending-growth signals enter Monetization business paid demand at 5% nominal core weight each. The monthly series uses complete 28-day windows ending on the last Sunday of each month. Ramp requires 95% matched token coverage each week. The hollow OpenRouter point uses the latest 28 consecutive priced days and compares growth with the prior 28 days. The core score uses the monthly series.</p><p>Known free routes are priced at zero. Other unmatched tokens use that day’s average rate across catalog-matched tokens. See the <a href="#openrouter-price-coverage">rates and coverage</a>. When both sources are selected, the native levels use separate axes. {rampChart.indexed ? "Ramp’s indexed feed uses the first common window as 100 on the right, and OpenRouter estimated spending uses USD millions on the left." : "OpenRouter and Ramp spending each use their own USD-million scale, on the left and right axes respectively."}</p></AdoptionNotes></div>
 </AdoptionPanel>;
}
