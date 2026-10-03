"use client";
import {useState,useEffect,useRef} from "react";
import {workbookAmendments as data} from "./workbook-amendments-snapshot";
import EvidenceCard from "./evidence-card";
import ChartLegend from "./chart-legend";
type CreditGroup={name:string;kind:string;members:readonly string[];cells:readonly {date:string;q25:number|null;q75:number|null;relativeMedian:number|null;relativeMin:number|null;relativeMax:number|null;relativeQ25:number|null;relativeQ75:number|null;spread:number|null;median:number|null;minimum:number|null;maximum:number|null;benchmark:number|null;relativeChange:number|null;coverage:number;count:number}[]};
const credit:readonly CreditGroup[]=data.credit;
const palette=["#237d67","#bd7738","#426d99","#916aa6","#7f863e","#b45c70","#527a82","#665849","#999999"];
type Point={date:string;value:number|null};
function Lines({series,unit="bp",zero=false}:{series:{name:string;color:string;points:Point[]}[];unit?:string;zero?:boolean}){
 const dates=[...new Set(series.flatMap(s=>s.points.map(p=>p.date)))].sort();
 const values=series.flatMap(s=>s.points.flatMap(p=>p.value===null?[]:[p.value]));
 const low=Math.min(...values,zero?0:Infinity),high=Math.max(...values,zero?0:-Infinity),pad=Math.max(1,(high-low)*.1);
 const x=(i:number)=>60+i*790/Math.max(1,dates.length-1),y=(v:number)=>25+(high+pad-v)*230/(high-low+2*pad);
 const ticks=Array.from({length:5},(_,i)=>low+(high-low)*i/4);
 return <><svg viewBox="0 0 900 295" role="img" aria-label={series.map(s=>s.name).join(" versus ")+` time series (${unit})`}>
 {ticks.map((v,i)=><g key={i}><line x1="60" x2="850" y1={y(v)} y2={y(v)} stroke="#d6d7ce"/><text x="52" y={y(v)+4} textAnchor="end" fontSize="11">{v.toFixed(0)}{unit==="%"?"%":""}</text></g>)}
 {zero&&<line x1="60" x2="850" y1={y(0)} y2={y(0)} stroke="#777" strokeDasharray="3 4"/>}
 {series.map(s=>{const byDate=new Map(s.points.map(p=>[p.date,p.value]));return <path key={s.name} d={dates.map((date,i)=>{const value=byDate.get(date);return value==null?"":`${i===0||byDate.get(dates[i-1])==null?"M":"L"}${x(i)},${y(value)}`;}).join(" ")} fill="none" stroke={s.color} strokeWidth="2.3"><title>{s.name}</title></path>;})}
 {dates.filter((_,i)=>i===0||i===dates.length-1||i%Math.max(1,Math.floor(dates.length/5))===0).map(date=><text key={date} x={x(dates.indexOf(date))} y="282" textAnchor="middle" fontSize="10">{date.slice(2,7)}</text>)}
 </svg><ChartLegend items={series.map(s=>({label:s.name,color:s.color}))}/></>;
}
export function DemandSupplement(){
 const [basis,setBasis]=useState<"yoy"|"ttmYoy">("yoy");
 const series=data.demand.map((s,i)=>({name:s.name,color:palette[i],points:s.cells.filter(p=>p.month>="2024-01"&&p.month<="2026-08").map(p=>({date:p.month,value:p[basis]}))}));
 const latest=data.demand.map(s=>({name:s.name,point:[...s.cells].reverse().find(p=>p.month<="2026-08"&&p[basis]!==null)}));
 return <EvidenceCard id="demand-hardware" title="Memory exports and foundry revenue" unit="Monthly YoY growth or trailing-12-month YoY growth (%)" source="S1" note="KOTCDRAM and KOTCNAND measure South Korea nominal DRAM and NAND export values; TSMC measures monthly company revenue. Monthly YoY compares each month with the same month a year earlier; trailing-12-month YoY compares the latest 12-month sum with the preceding 12-month sum. January 2024–August 2026; unavailable comparisons are gaps. DRAM, NAND and TSMC each receive one-third of the core Demand weight. Nominal growth reflects prices, volumes and product mix, not AI-only demand."><div className="contribution-mode" role="group" aria-label="Demand comparison basis"><button aria-pressed={basis==="yoy"} onClick={()=>setBasis("yoy")}>Monthly YoY</button><button aria-pressed={basis==="ttmYoy"} onClick={()=>setBasis("ttmYoy")}>Trailing 12M YoY</button></div><Lines series={series} unit="%" zero/><div className="amendment-latest">{latest.map(s=><span key={s.name}>{s.name}<b>{s.point?.[basis]?.toFixed(1)??"n/a"}%</b><small>{s.point?.month??"Unavailable"}</small></span>)}</div></EvidenceCard>;
}
function CreditRangeChart({groups,title}:{groups:readonly CreditGroup[];title:string}){
 const [highlight,setHighlight]=useState<string|null>(null);
 const [change,setChange]=useState(true);
 const [fullRange,setFullRange]=useState(false);
 const median=(p:CreditGroup['cells'][number])=>change?p.relativeMedian:p.median;
 const lower=(p:CreditGroup['cells'][number])=>change?(fullRange?p.relativeMin:p.relativeQ25):(fullRange?p.minimum:p.q25);
 const upper=(p:CreditGroup['cells'][number])=>change?(fullRange?p.relativeMax:p.relativeQ75):(fullRange?p.maximum:p.q75);
 const benchmark=(p:CreditGroup['cells'][number])=>change?0:p.benchmark;
 const points=groups[0].cells;
 const values=groups.flatMap(g=>g.cells.flatMap(p=>[lower(p),upper(p),benchmark(p)])).filter((v):v is number=>v!==null);
 const high=Math.max(1,...values),low=Math.min(0,...values),pad=Math.max(2,(high-low)*.08);
 const x=(i:number)=>60+i*790/Math.max(1,points.length-1),y=(v:number)=>25+(high+pad-v)*350/(high-low+2*pad);
 const line=(cells:CreditGroup['cells'],field:"median"|"benchmark")=>cells.map((p,i)=>{const value=field==='median'?median(p):benchmark(p);const prior=i?field==='median'?median(cells[i-1]):benchmark(cells[i-1]):null;return value===null?"":`${i===0||prior===null?'M':'L'}${x(i)},${y(value)}`;}).join(' ');
 return <><div className="credit-view-controls"><div className="contribution-mode" role="group" aria-label={`${title} metric`}><button aria-pressed={change} onClick={()=>setChange(true)}>Change vs IG</button><button aria-pressed={!change} onClick={()=>setChange(false)}>Spread level</button></div><div className="contribution-mode" role="group" aria-label={`${title} range`}><button aria-pressed={!fullRange} onClick={()=>setFullRange(false)}>Central 50%</button><button aria-pressed={fullRange} onClick={()=>setFullRange(true)}>Full min–max</button></div></div><svg viewBox="0 0 900 420" role="img" aria-label={`${title}: all median lines and min–max ranges versus IG benchmark`}>
 {[0,.25,.5,.75,1].map(t=><g key={t}><line x1="60" x2="850" y1={y(low+(high-low)*t)} y2={y(low+(high-low)*t)} stroke="#d6d7ce"/><text x="52" y={y(low+(high-low)*t)+4} textAnchor="end" fontSize="11">{(low+(high-low)*t).toFixed(0)}</text></g>)}
 {groups.map((group,j)=>{
  const bands:number[][]=[];let current:number[]=[];
  group.cells.forEach((p,i)=>{if(lower(p)!==null&&upper(p)!==null)current.push(i);else if(current.length){bands.push(current);current=[];}});if(current.length)bands.push(current);
  return <g key={group.name} data-credit-group={group.name}>{bands.map((band,k)=><path key={k} d={`${band.map((i,n)=>`${n?'L':'M'}${x(i)},${y(upper(group.cells[i])!)}`).join(' ')} ${[...band].reverse().map(i=>`L${x(i)},${y(lower(group.cells[i])!)}`).join(' ')} Z`} fill={palette[j%palette.length]} fillOpacity={highlight===null?.09:highlight===group.name?.2:.025} stroke="none"><title>{`${group.name}: issuer distribution band`}</title></path>)}</g>;
 })}
 {groups.map((group,j)=><g key={group.name} data-credit-median={group.name}><path d={line(group.cells,'median')} fill="none" stroke={palette[j%palette.length]} strokeWidth={highlight===group.name?3.2:2.3} opacity={highlight===null||highlight===group.name?1:.3}/>{group.cells.map((p,i)=>median(p)!==null&&<circle key={p.date} cx={x(i)} cy={y(median(p)!)} r="4" fill="transparent"><title>{`${group.name} · ${p.date} · ${change?'change versus IG':'spread level'} median ${median(p)!.toFixed(1)}bp · displayed band ${lower(p)!.toFixed(1)}–${upper(p)!.toFixed(1)}bp · ${p.coverage}/${p.count} issuers`}</title></circle>)}</g>)}
 <path d={line(points,'benchmark')} fill="none" stroke="#172e2b" strokeWidth="2.7" strokeDasharray="7 4"><title>{change?"IG-relative change reference: zero":"US 5Y IG benchmark"}</title></path>
 {points.filter((_,i)=>i===0||i===points.length-1||i%Math.max(1,Math.floor(points.length/5))===0).map(p=><text key={p.date} x={x(points.indexOf(p))} y="408" textAnchor="middle" fontSize="10">{p.date.slice(2,7)}</text>)}
 </svg><div className="credit-group-legend" role="group" aria-label={`${title} legend`}>{groups.map((g,i)=><button key={g.name} type="button" aria-pressed={highlight===g.name} onClick={()=>setHighlight(highlight===g.name?null:g.name)}><i style={{backgroundColor:palette[i%palette.length]}}/>{g.name} · {g.members.length}</button>)}<span><i className="credit-ig-key"/>{change?"IG-relative reference · 0bp":"US 5Y IG benchmark"}</span></div>{<small className="credit-legend-note">{change?"Positive values mean greater widening or less tightening than IG since 31 Dec 2025.":"Actual spread levels in basis points."} {fullRange?"Band: full issuer min–max; outliers included.":"Band: 25th–75th percentiles; tail issuers lie outside this band."} Click a legend label to emphasize a group.</small>}</>;
}
export function CreditBenchmark(){
 const overall=credit.find(g=>g.name==='All covered issuers')!;
 const sectors=credit.filter(g=>g.kind==='sector'),ratings=credit.filter(g=>g.kind==='rating'&&g.name!=='All rated IG');
 const latest=overall.cells.at(-1)!;
 return <><p className="amendment-summary">Through {data.metadata.creditAsOf}, the overall issuer median is {latest.median!.toFixed(1)}bp, versus {latest.benchmark!.toFixed(1)}bp for general IG. The issuer range is {latest.minimum!.toFixed(1)}–{latest.maximum!.toFixed(1)}bp. Read the overall, sector and rating distributions together: the median describes typical financing pressure, while the range reveals dispersion and high-spread issuers.</p><div className="pillar-chart-grid">
 <EvidenceCard title="Overall issuer spreads versus IG" unit={`Daily 5Y CDS · bp · ${overall.members.length} issuers`} source="S4" note="Median line; choose central 50% or full min–max range. Overall includes below-IG issuers."><CreditRangeChart groups={[overall]} title="Overall issuer spreads"/></EvidenceCard>
 <EvidenceCard title="Sector spreads versus IG" unit={`Daily 5Y CDS · bp · all ${sectors.length} sectors`} source="S4" note="All covered sectors shown together. Colored medians and selected distribution bands; single-issuer bands have no width."><CreditRangeChart groups={sectors} title="All sectors"/></EvidenceCard>
 <EvidenceCard title="Rating spreads versus IG" unit={`Daily 5Y CDS · bp · all ${ratings.length} rating groups`} source="S4" note="All latest rating groups shown together, applied retrospectively. General IG is not a rating-matched benchmark."><CreditRangeChart groups={ratings} title="All rating groups"/></EvidenceCard></div>
 <details className="evidence-data"><summary>Issuer ratings and relative spread changes</summary><div className="credit-table-wrap"><table><thead><tr><th>Issuer</th><th>Sector</th><th>Rating / source</th><th>Latest spread</th><th>30-day change minus IG</th></tr></thead><tbody>{data.creditIssuers.map(r=><tr key={r.ticker}><td>{r.ticker}</td><td>{r.sector}</td><td>{r.rating.rating??"Unrated"} · {r.rating.agency??"n/a"}</td><td>{r.spread.toFixed(1)}bp</td><td>{r.excess30d?.toFixed(1)??"n/a"}bp</td></tr>)}</tbody></table></div></details><p className="compact-heatmap-instruction">All three charts switch between spread levels and changes versus IG. Central-50% bands reduce outlier compression; full min–max ranges remain available. Bands show issuer dispersion, not confidence intervals. Each chart uses its own labeled vertical scale. Source observations through {data.metadata.creditAsOf}; calendar-day values may carry prior observations. Fixed groups use ratings dated {data.metadata.ratingAsOf}, preferring S&amp;P, then Fitch, then Moody’s. Sector and overall baskets include below-IG issuers where covered. The benchmark is general IG, not a rating-matched or sector-matched index.</p></>;
}
export function BondSectorFinancing(){
 const [window,setWindow]=useState<"recent"|"all">("recent");
 const rows=data.bondMonthly.filter(r=>window==="all"||r.month>=data.metadata.bondWindow.slice(0,7));
 const sectors=data.bondSectors.map(r=>r.sector).filter(sector=>rows.some(r=>(r.sectors[sector]??0)>0));
 const totals=sectors.map(sector=>({sector,amount:rows.reduce((s,r)=>s+(r.sectors[sector]??0),0)})).sort((a,b)=>b.amount-a.amount);
 const total=totals.reduce((s,r)=>s+r.amount,0),max=Math.max(...rows.map(r=>r.amount),1);
 const first=rows[0].month,last=rows.at(-1)!.month;
 const monthIndex=(m:string)=>Number(m.slice(0,4))*12+Number(m.slice(5));
 const span=monthIndex(last)-monthIndex(first)+1,x=(month:string)=>65+(monthIndex(month)-monthIndex(first))*775/span,barWidth=Math.max(5,775/span*.72),y=(amount:number)=>260-amount/max*225;
 const leading=totals[0];
 return <><p className="amendment-summary">{leading.sector} account for ${(leading.amount).toFixed(1)}B, or {(leading.amount/total*100).toFixed(1)}% of observed issuance in the selected period. Sector and issuer detail show where external financing is concentrated. Issuance demonstrates access to capital; it does not establish that proceeds fund AI projects or that financing needs are unmet.</p><div className="amendment-controls"><label>Period <select aria-label="Bond financing period" value={window} onChange={e=>setWindow(e.target.value as "recent"|"all")}><option value="recent">Latest 12 calendar months · observed records</option><option value="all">All available records</option></select></label><span>{first}–{last} · ${total.toFixed(1)}B observed</span></div><div className="pillar-chart-grid">
 <EvidenceCard title="Monthly financing by issuer sector" unit="USD billions · issuer-month aggregates" source="S6" note="Missing months are gaps, not observed zero issuance. September 2026 retains the workbook’s available records; month completeness is not certified."><svg viewBox="0 0 900 350" role="img" aria-label="Monthly bond issuance stacked by issuer sector">
 {[0,.25,.5,.75,1].map(t=><g key={t}><line x1="60" x2="850" y1={y(max*t)} y2={y(max*t)} stroke="#d6d7ce"/><text x="52" y={y(max*t)+4} textAnchor="end" fontSize="11">{(max*t).toFixed(0)}</text></g>)}
 {rows.map(r=>{let base=0;return <g key={r.month}>{sectors.map((sector,i)=>{const value=r.sectors[sector]??0;const rect=<rect key={sector} x={x(r.month)} y={y(base+value)} width={barWidth} height={value/max*225} fill={palette[i%palette.length]}><title>{`${r.month} · ${sector}: $${value.toFixed(2)}B`}</title></rect>;base+=value;return rect;})}</g>})}
 {Array.from({length:span},(_,i)=>{const serial=monthIndex(first)+i,month=`${Math.floor((serial-1)/12)}-${String((serial-1)%12+1).padStart(2,"0")}`;return <text key={month} x={x(month)+barWidth/2} y="282" textAnchor="end" transform={`rotate(-50 ${x(month)+barWidth/2} 282)`} fontSize="12">{month}</text>;})}</svg><ChartLegend items={sectors.map((sector,i)=>({label:sector,color:palette[i%palette.length]}))}/></EvidenceCard>
 <EvidenceCard table title="Sector share of financing" unit={`${first}–${last} · observed amounts`} source="S6" note="Analytical supply-chain sectors. Unmapped issuers remain unclassified."><table><thead><tr><th>Sector</th><th>$B</th><th>Share</th></tr></thead><tbody>{totals.map(r=><tr key={r.sector}><td>{r.sector}</td><td>{r.amount.toFixed(1)}</td><td>{(r.amount/total*100).toFixed(1)}%</td></tr>)}</tbody></table></EvidenceCard></div>
 <details className="evidence-data"><summary>Issuer financing amounts and counts</summary><div className="credit-table-wrap"><table><thead><tr><th>Issuer</th><th>Sector</th><th>Amount ($B)</th><th>Issues</th></tr></thead><tbody>{[...new Set(data.bondRows.filter(r=>r.month>=first&&r.month<=last).map(r=>r.issuer))].map(issuer=>{const records=data.bondRows.filter(r=>r.issuer===issuer&&r.month>=first&&r.month<=last);return {issuer,sector:records[0].sector,amount:records.reduce((s,r)=>s+r.amount,0),issues:records.reduce((s,r)=>s+(r.issues??0),0)};}).sort((a,b)=>b.amount-a.amount).map(r=><tr key={r.issuer}><td>{r.issuer}</td><td>{r.sector}</td><td>{r.amount.toFixed(2)}</td><td>{r.issues}</td></tr>)}</tbody></table></div></details><p className="compact-heatmap-instruction">December 2025 is missing from the supplied issuer-month records. No complete rolling-year total or YoY growth is claimed. Sector classifications describe issuers, not the use of bond proceeds. USD-equivalent amounts follow the existing workbook convention.</p></>;
}

export function DemandHeatmap(){
 const historyScroll=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(historyScroll.current)historyScroll.current.scrollLeft=historyScroll.current.scrollWidth;},[]);
 const [basis,setBasis]=useState<"yoy"|"ttmYoy">("yoy");
 const months=data.demand[0].cells.filter(p=>p.month>="2024-01"&&p.month<="2026-08").map(p=>p.month);
 const color=(value:number|null,low:number,high:number)=>{
  if(value===null)return undefined;
  const t=high===low ? .5 : Math.max(0,Math.min(1,(value-low)/(high-low)));
  const from=t<=.5?[190,86,70]:[246,243,233],to=t<=.5?[246,243,233]:[24,116,103],f=t<=.5?t*2:(t-.5)*2;
  return {backgroundColor:`rgb(${from.map((v,i)=>Math.round(v+(to[i]-v)*f)).join(',')})`,color:t<.22||t>.78?'#fff':'#172e2b'};
 };
 return <section id="heatmap-demand-evidence" className="heatmap-demand-evidence" aria-label="Demand constituent comparisons"><div className="constituent-history-heading"><h3>Demand · DRAM, NAND and TSMC revenue</h3><p>Actual growth percentages · January 2024–August 2026 · updated workbook</p></div><div className="contribution-mode" role="group" aria-label="Demand heatmap comparison basis"><button aria-pressed={basis==="yoy"} onClick={()=>setBasis("yoy")}>Monthly YoY</button><button aria-pressed={basis==="ttmYoy"} onClick={()=>setBasis("ttmYoy")}>Trailing 12M YoY</button></div><div className="heat-table-wrap" ref={historyScroll}><table className="heat-table monthly-heat-table constituent-heat-table"><thead><tr><th>Demand indicator</th>{months.map(month=><th key={month}>{month.slice(2)}</th>)}</tr></thead><tbody>{data.demand.map(series=>{
 const observations=series.cells.filter(p=>months.includes(p.month));const values=observations.flatMap(p=>p[basis]===null?[]:[p[basis]!]);const low=Math.min(...values),high=Math.max(...values);
 return <tr key={series.field}><th>{series.name}<small>{series.field==='KOTCDRAM Index'?'Core Demand · equal weight':'Core Demand · equal weight'}</small></th>{observations.map(p=><td key={p.month} className={p[basis]===null?'heat-na':'heat-continuous'} style={color(p[basis],low,high)} title={`${series.name} · ${p.month} · ${basis==='yoy'?'Monthly YoY':'Trailing 12M YoY'}: ${p[basis]?.toFixed(2)??'unavailable'}% · source level ${p.level??'unavailable'}`}><strong>{p[basis]===null?'n/a':`${p[basis].toFixed(1)}%`}</strong></td>)}</tr>;
 })}</tbody></table></div><p className="compact-heatmap-instruction">Read across each row. Colors vary continuously from its lowest to highest available growth rate in the displayed window; cell values are percentages, not composite scores. A green cell does not necessarily mean positive growth. Monthly YoY compares the same month a year earlier; trailing 12M compares two consecutive 12-month totals. Missing history stays blank. NAND and TSMC supplement the DRAM core signal without changing index weights. <a href="#source-S1">Source S1</a></p></section>;
}
