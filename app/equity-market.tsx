"use client";
import './market.css';
import {useState} from 'react';
import {industryChain} from './industry-chain-data';
import {supplyChainStockSnapshot as data} from './supply-chain-stock-snapshot';
import {equityBasket,latestEquityObservation,type EquityObservation} from './equity-basket';
const colors=['#88609c','#315e87','#bd7840','#688a3e','#237d67','#b34558','#3b969d','#a78830','#666ea7'];
const labels=['Applications & software','Cloud & model platforms','Accelerators & silicon','Semiconductor equipment','Memory & storage','Foundry & packaging','Servers & networking','Data centers & cooling','Power & grid'];
const series=data.series as Record<string,readonly EquityObservation[]>;
const companies=data.companies as Record<string,{asOf:string;openingMarketCap:number|null}>;
const end=Object.values(companies).map(c=>c.asOf).sort()[0];
const dates=[data.metadata.baseline,...Array.from(new Set(Object.values(series).flatMap(s=>s.filter(p=>p.date>data.metadata.baseline&&p.date<=end&&p.cumulativeReturn!==null).map(p=>p.date)))).sort()];
const sectors=industryChain.map((group,index)=>{
 const holdings=group.companies.map(c=>({openingMarketCap:companies[c.ticker].openingMarketCap,rows:series[c.ticker]}));
 const members=group.companies.map(c=>({...c,...latestEquityObservation(series[c.ticker],end)}));
 const cap=members.every(c=>c.marketCap!==null)?members.reduce((s,c)=>s+c.marketCap!,0):null;
 return {...group,label:labels[index],color:colors[index],members,cap,points:{cap:equityBasket(holdings,dates,'cap'),equal:equityBasket(holdings,dates,'equal')}};
});
const totalCap=sectors.reduce((s,g)=>s+(g.cap??0),0);
type Tile={index:number;x:number;y:number;w:number;h:number};
function partition(indices:number[],x=0,y=0,w=100,h=100):Tile[]{
 if(indices.length===1)return [{index:indices[0],x,y,w,h}];
 const total=indices.reduce((a,i)=>a+sectors[i].cap!,0);
 let split=1,sum=sectors[indices[0]].cap!;
 while(split<indices.length-1&&sum<total/2){sum+=sectors[indices[split]].cap!;split++;}
 const ratio=sum/total;
 return w>=h?[...partition(indices.slice(0,split),x,y,w*ratio,h),...partition(indices.slice(split),x+w*ratio,y,w*(1-ratio),h)]:[...partition(indices.slice(0,split),x,y,w,h*ratio),...partition(indices.slice(split),x,y+h*ratio,w,h*(1-ratio))];
}
const tiles=partition(sectors.map((_,i)=>i).filter(i=>sectors[i].cap!==null&&sectors[i].cap!>0).sort((a,b)=>sectors[b].cap!-sectors[a].cap!));
const format=(v:number|null)=>v===null?'Unavailable':`${v>=0?'+':''}${v.toFixed(1)}%`;
const capFormat=(v:number|null)=>v===null?'Unavailable':v>=1e12?`$${(v/1e12).toFixed(2)}T`:`$${(v/1e9).toFixed(1)}B`;
export default function EquityMarket(){
 const [selected,setSelected]=useState<string|null>(null),[hover,setHover]=useState<number|null>(null),[weighting,setWeighting]=useState<'cap'|'equal'>('cap');
 const select=(id:string)=>setSelected(selected===id?null:id);
 const all=sectors.flatMap(s=>s.points[weighting].flatMap(p=>p.value===null?[]:[p.value])),lower=Math.min(0,...all),upper=Math.max(10,...all),pad=(upper-lower)*.08,lo=lower-pad,hi=upper+pad;
 const x=(date:string)=>58+(Date.parse(date)-Date.parse(data.metadata.baseline))/(Date.parse(end)-Date.parse(data.metadata.baseline))*550,y=(value:number)=>28+(hi-value)/(hi-lo)*302;
 const group=sectors.find(s=>s.id===selected);
 const latest=(s:typeof sectors[number])=>s.points[weighting].at(-1)!.value;
 const colorLimit=Math.max(50,Math.ceil(Math.max(...sectors.map(s=>Math.abs(latest(s)??0)))/50)*50);
 const tileColor=(value:number|null)=>{const t=Math.min(1,Math.abs(value??0)/colorLimit),target=(value??0)>=0?[35,125,103]:[174,62,70],base=[241,238,230];return `rgb(${base.map((b,i)=>Math.round(b+(target[i]-b)*t)).join(',')})`;};
 return <div className="market-equity-section"><p className="market-panel-lead">Equity performance across the AI supply chain</p><p className="amendment-summary">Market-cap weighting shows which parts of the supply chain contribute most to sector returns. The treemap combines the same sector returns with their latest size. Both panels cover {data.metadata.coverage} companies through {end}, with {capFormat(totalCap)} in reported market capitalization. Applications return {format(sectors[0].points.cap.at(-1)!.value)} on cap weights versus {format(sectors[0].points.equal.at(-1)!.value)} on equal weights; accelerators return {format(sectors[2].points.cap.at(-1)!.value)} versus {format(sectors[2].points.equal.at(-1)!.value)}. These differences separate the influence of the largest firms from broader participation.</p>
 <div className="amendment-controls"><label>Return weighting <select aria-label="Equity return weighting" value={weighting} onChange={e=>setWeighting(e.target.value as 'cap'|'equal')}><option value="cap">Market cap · lagged daily weights</option><option value="equal">Equal weight · fixed opening basket</option></select></label><span>Click a sector to highlight its line and inspect its constituents.</span></div>
 <div className="market-equity-panels">
 <article className="market-equity-chart"><h4>Observed sector YTD performance</h4><p className="equity-chart-unit">{weighting==='cap'?'Market-cap weighted':'Equal weighted'} cumulative return (%) · 31 December 2025 = 0%</p>
 <svg className="equity-series-svg" viewBox="0 0 640 380" role="img" aria-label="YTD cumulative equity performance by sector">
 {Array.from({length:6},(_,i)=>lo+(hi-lo)*i/5).map(v=><g key={v}><line x1="58" x2="608" y1={y(v)} y2={y(v)} stroke="#dddcd3"/><text x="49" y={y(v)+4} textAnchor="end">{v.toFixed(0)}%</text></g>)}
 <line x1="58" x2="608" y1={y(0)} y2={y(0)} stroke="#738580" strokeDasharray="4 4"/>
 {sectors.map(s=><path key={s.id} d={s.points[weighting].map((p,i)=>p.value===null?'':`${i&&s.points[weighting][i-1].value!==null?'L':'M'}${x(p.date)},${y(p.value)}`).join(' ')} fill="none" stroke={s.color} strokeWidth={selected===s.id?3.5:2} opacity={selected===null||selected===s.id?1:.15}><title>{`${s.label}: ${format(latest(s))} through ${end}`}</title></path>)}
 {[data.metadata.baseline,'2026-03-31','2026-06-30','2026-09-30'].filter(d=>d<=end).map(d=><text key={d} x={x(d)} y="358" textAnchor="middle">{d===data.metadata.baseline?'Dec 31':'Q'+Math.ceil(Number(d.slice(5,7))/3)}</text>)}
 {hover!==null&&<line x1={x(dates[hover])} x2={x(dates[hover])} y1="28" y2="330" stroke="#738580" strokeDasharray="3 3"/>}
 <rect x="58" y="28" width="550" height="302" fill="transparent" onMouseLeave={()=>setHover(null)} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect(),time=Date.parse(data.metadata.baseline)+(e.clientX-r.left)/r.width*(Date.parse(end)-Date.parse(data.metadata.baseline));setHover(dates.reduce((best,d,i)=>Math.abs(Date.parse(d)-time)<Math.abs(Date.parse(dates[best])-time)?i:best,0));}}/>
 </svg>
 <div className="equity-sector-legend">{sectors.map(s=><button type="button" key={s.id} aria-pressed={selected===s.id} onClick={()=>select(s.id)}><i style={{background:s.color}}/><span>{s.label}</span><b>{format(s.points[weighting][hover??dates.length-1].value)}</b></button>)}</div><p className="equity-hover-date">{hover===null?`Latest: ${end}`:`Cursor date: ${dates[hover]}`}</p>
 <p className="chart-footnote">Source: Indexlist.xlsx, Supply Chain Stock Value. {weighting==='cap'?'Daily sector return = sum of constituent daily returns × previous valuation’s USD market-cap weights; daily sector returns are then compounded.':'Sector return is the mean of constituent compounded returns, equivalent to a fixed equal-weight opening basket.'} Last observed caps and valuations are held on non-reporting dates. Returns retain local-listing currency exposure and are not USD total returns. Opening coverage is partial for three Asian listings; the disclosure below identifies them. Dividend adjustment is not independently verified.</p></article>
 <article className="market-equity-chart"><h4>Sector size and YTD return</h4><p className="equity-chart-unit">As of {end} · color: {weighting==='cap'?'cap-weighted':'equal-weighted'} return · area: USD market cap</p>
 <div className="equity-treemap" aria-label="Sector treemap sized by USD market capitalization and colored by YTD return">{tiles.map(tile=>{const s=sectors[tile.index],value=latest(s),small=tile.w*tile.h<400||tile.h<26||tile.w<20,tiny=tile.h<13||tile.w<10;return <button type="button" className={tiny?'equity-small-tile equity-tiny-tile':small?'equity-small-tile':undefined} key={s.id} aria-label={`${s.label}: ${format(value)} YTD; ${capFormat(s.cap)} market cap`} aria-pressed={selected===s.id} onClick={()=>select(s.id)} style={{left:`${tile.x}%`,top:`${tile.y}%`,width:`${tile.w}%`,height:`${tile.h}%`,background:tileColor(value),color:Math.abs(value??0)/colorLimit>.55?'#fff':'#183b60'}} title={`${s.label}: ${format(value)}; ${capFormat(s.cap)}; ${(s.cap!/totalCap*100).toFixed(1)}% of covered market cap; ${end}`}><span>{small?String(tile.index+1).padStart(2,'0'):s.label}</span>{!tiny&&<strong>{format(value)}</strong>}{!small&&<small>{capFormat(s.cap)} · {(s.cap!/totalCap*100).toFixed(1)}%</small>}</button>;})}</div>
 <div className="equity-color-scale"><span>−{colorLimit}%</span><i style={{background:`linear-gradient(90deg,${tileColor(-colorLimit)},${tileColor(0)},${tileColor(colorLimit)})`}}/><span>+{colorLimit}%</span></div><p className="equity-hover-date">Neutral color = 0% YTD return · smaller tiles use numbered sector labels</p>
 <div className="equity-cap-legend">{sectors.map((s,i)=><button type="button" key={s.id} onClick={()=>select(s.id)} aria-pressed={selected===s.id}><span>{String(i+1).padStart(2,'0')} · {s.label}</span><b>{capFormat(s.cap)}</b></button>)}</div>
 <p className="chart-footnote">Source: Indexlist.xlsx. Bloomberg supplies USD market caps, including local Asian listings. Areas sum constituent caps at the common date; colors match the selected return method in the line chart. Full-company capitalization is used, without a free-float adjustment. These are covered research baskets, not broad sector indices.</p></article></div>
 {weighting==='cap'&&<details className="evidence-data"><summary>Opening market-cap estimates and weighting method</summary><p>Opening caps for {data.metadata.inferredOpeningCaps.join(', ')} are unavailable on 31 December. Their first available USD caps proxy the opening weights. SK hynix and Samsung return histories begin on 5 January; Tokyo Electron begins on 6 January. Earlier session returns are unavailable and are not recovered from cap changes, so these sectors have partial opening coverage. Subsequent weights use observed caps from the previous valuation date. Latest weights never determine earlier returns. Missing cap histories are not silently renormalized. Market caps are not equity-index free-float weights.</p></details>}
 {group&&<div className="equity-member-detail"><h4>{group.label} · {format(latest(group))} YTD · {capFormat(group.cap)}</h4><div className="credit-table-wrap"><table><thead><tr><th>Company</th><th>Ticker</th><th>YTD return</th><th>Market cap ($B)</th><th>Latest sector weight</th><th>Return / cap dates</th></tr></thead><tbody>{[...group.members].sort((a,b)=>(b.marketCap??0)-(a.marketCap??0)).map(c=><tr key={c.ticker}><td>{c.name}</td><td>{c.ticker}</td><td>{format(c.cumulativeReturn)}</td><td>{c.marketCap===null?'—':(c.marketCap/1e9).toFixed(1)}</td><td>{c.marketCap!==null&&group.cap!==null?`${(c.marketCap/group.cap*100).toFixed(1)}%`:'—'}</td><td>{c.returnDate} / {c.marketCapDate}</td></tr>)}</tbody></table></div></div>}</div>;
}
