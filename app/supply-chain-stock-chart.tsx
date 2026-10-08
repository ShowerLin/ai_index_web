"use client";
import './market.css';
import {useState} from 'react';
import {industryChain} from './industry-chain-data';
import {supplyChainStockSnapshot as data} from './supply-chain-stock-snapshot';
export default function SupplyChainStockChart(){
 const [sector,setSector]=useState('memory');
 const group=industryChain.find(n=>n.id===sector)!;
 const colors=['#1d7f80','#d88952','#436b9c','#957bbc','#a79235','#5c7d3a'];
 const series=data.series as Record<string,readonly {date:string;cumulativeReturn:number|null}[]>;
 const vals=group.companies.flatMap(c=>series[c.ticker].flatMap(p=>p.cumulativeReturn===null?[]:[p.cumulativeReturn]));
 const lower=Math.min(0,...vals),upper=Math.max(10,...vals),pad=(upper-lower)*.08; const lo=lower-pad,hi=upper+pad;const start=Date.parse(data.metadata.baseline),end=Date.parse(data.metadata.asOf);
 const x=(d:string)=>72+(Date.parse(d)-start)/(end-start)*790,y=(v:number)=>34+(hi-v)/(hi-lo)*330;
 return <article className="market-equity-chart"><div className="chart-meta"><div><b>Supply-chain stock performance</b><span>Cumulative compounded return since December 31, 2025 · local listings</span></div><select aria-label="Stock performance supply-chain group" value={sector} onChange={e=>setSector(e.target.value)}>{industryChain.map(n=><option key={n.id} value={n.id}>{n.title}</option>)}</select></div>
 <svg className="market-stock-svg" viewBox="0 0 920 430" role="img" aria-label={`Cumulative stock returns for ${group.title}`}>
 {Array.from({length:6},(_,i)=>lo+(hi-lo)*i/5).map(v=><g key={v}><line x1="72" x2="862" y1={y(v)} y2={y(v)} className="grid-line"/><text x="60" y={y(v)+4} textAnchor="end">{v.toFixed(0)}%</text></g>)}
 {group.companies.map((c,i)=><path key={c.ticker} d={series[c.ticker].reduce((a,p)=>{if(p.cumulativeReturn===null)return a;return {d:a.d+`${a.gap?'M':'L'}${x(p.date)},${y(p.cumulativeReturn)} `,gap:false};},{d:'',gap:true}).d} fill="none" stroke={colors[i%colors.length]} strokeWidth="2.8"><title>{c.name}</title></path>)}
 {['2025-12-31','2026-03-31','2026-06-30',data.metadata.asOf].map(d=><text key={d} x={x(d)} y="400" textAnchor="middle">{d}</text>)}
 </svg><div className="market-stock-legend">{group.companies.map((c,i)=><span key={c.ticker}><i style={{background:colors[i%colors.length]}}/>{c.name}</span>)}</div>
 <div className="market-stock-values">{group.companies.map((c,i)=><span key={c.ticker}><b style={{color:colors[i%colors.length]}}>{c.name}</b> {data.companies[c.ticker as keyof typeof data.companies].changeYtd.toFixed(1)}% <small>{data.companies[c.ticker as keyof typeof data.companies].asOf}</small></span>)}</div><p className="chart-footnote">Source: Indexlist.xlsx, Supply Chain Stock Value. Daily decimal returns are compounded; lines join available observations across non-reporting dates. Missing daily returns are not zero-filled. Trading calendars and latest dates differ; no currency conversion. Bloomberg dividend adjustment is not independently verified.</p></article>;
}
