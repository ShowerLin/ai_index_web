"use client";
import {useState} from 'react';
import {creditFinancialHistory as data} from './credit-financial-history';
import {industryChain} from './industry-chain-data';
import './market.css';
type Financial={period:string;netDebt:number|null;ebitda:number|null;ttmEbitda:number|null;netDebtToEbitda:number|null;interestCoverage:number|null};
type Credit={date:string;excess:number|null;spread:number|null;benchmark:number|null};
const history=data.history as Record<string,readonly Financial[]>;
const credit=data.credit as Record<string,readonly Credit[]>;
const names=Object.fromEntries(industryChain.flatMap(g=>g.companies.map(c=>[c.ticker,c.name])));
function Plot({points,start,end,color,unit,title}:{points:{date:string;value:number|null}[];start:string;end:string;color:string;unit:string;title:string}){
 const valid=points.filter((p):p is {date:string;value:number}=>p.value!==null&&p.date>=start);
 const values=valid.map(p=>p.value),lower=Math.min(0,...values),upper=Math.max(unit==='×'?1:10,...values),pad=(upper-lower)*.1,lo=lower-pad,hi=upper+pad;
 const x=(d:string)=>65+(Date.parse(d)-Date.parse(start))/(Date.parse(end)-Date.parse(start))*765,y=(v:number)=>30+(hi-v)/(hi-lo)*270;
 return <svg className="market-stock-svg" viewBox="0 0 900 355" role="img" aria-label={title}>
 {Array.from({length:5},(_,i)=>lo+(hi-lo)*i/4).map(v=><g key={v}><line x1="65" x2="830" y1={y(v)} y2={y(v)} stroke="#dddcd3"/><text x="55" y={y(v)+5} textAnchor="end">{v.toFixed(1)}{unit}</text></g>)}
 <line x1="65" x2="830" y1={y(0)} y2={y(0)} stroke="#9aaca5" strokeDasharray="4 4"/>
 <path d={points.reduce((a,p)=>p.date<start?a:p.value===null?{...a,gap:true}:{d:a.d+`${a.gap?'M':'L'}${x(p.date)},${y(p.value)} `,gap:false},{d:'',gap:true}).d} stroke={color} strokeWidth="2.6" fill="none"/>
 {unit==='×'&&valid.map(p=><circle key={p.date} cx={x(p.date)} cy={y(p.value)} r="4" fill={color}><title>{`${p.date}: ${p.value.toFixed(2)}×`}</title></circle>)}
 {['2025-09-30','2025-12-31','2026-03-31','2026-06-30','2026-09-30'].filter(d=>d>=start&&d<=end).map(d=><text key={d} x={x(d)} y="337" textAnchor="middle">{d.slice(2,7)}</text>)}
 {!valid.length&&<text x="440" y="155" textAnchor="middle">No comparable observations</text>}
 </svg>;
}
export default function CreditFinancialComparison(){
 const [ticker,setTicker]=useState('MSFT');
 const financial=history[ticker],cds=credit[ticker]??[],latest=financial.filter(r=>r.netDebtToEbitda!==null).at(-1),lastCds=cds.filter(r=>r.excess!==null).at(-1);
 const first=financial.find(r=>r.netDebtToEbitda!==null)?.period??'2025-09-30',start=first<'2025-09-30'?'2025-09-30':first;
 const end=Object.values(credit).flatMap(r=>r.map(p=>p.date)).sort().at(-1)??'2026-10-07';
 const previous=financial.filter(r=>r.netDebtToEbitda!==null).at(-2);
 return <div className="credit-financial-comparison">
 <div className="chart-meta"><div><h3>Does credit widening accompany financial deterioration?</h3><p>Quarterly leverage and daily issuer CDS minus general IG · matched company</p></div><label>Company<select aria-label="Credit and financial comparison company" value={ticker} onChange={e=>setTicker(e.target.value)}>{Object.keys(history).map(t=><option key={t} value={t}>{names[t]??t}{credit[t]?'':' · no CDS coverage'}</option>)}</select></label></div>
 <p className="amendment-summary">{names[ticker]??ticker}: latest net debt / TTM EBITDA {latest?`${latest.netDebtToEbitda!.toFixed(2)}× at ${latest.period}`:'unavailable'}{previous?`, versus ${previous.netDebtToEbitda!.toFixed(2)}× in the preceding comparable quarter`:''}. Latest issuer spread minus IG {lastCds?`${lastCds.excess!.toFixed(1)}bp at ${lastCds.date}`:'unavailable'}. These are different observation dates; simultaneous changes do not establish causation.</p>
 <div className="credit-financial-plots"><article className="market-equity-chart"><b>Net debt / trailing-12-month EBITDA</b><small>Quarterly observations · ×</small><Plot points={financial.map(r=>({date:r.period,value:r.netDebtToEbitda}))} start={start} end={end} color="#1d7f80" unit="×" title="Quarterly net debt divided by TTM EBITDA"/><p className="chart-footnote">Four consecutive quarterly EBITDA values are required. Nonpositive or incomplete denominators are withheld. Negative leverage denotes net cash when EBITDA is positive. Lines join quarter observations; they are not monthly financial estimates.</p></article>
 <article className="market-equity-chart"><b>Issuer CDS minus general IG</b><small>Daily 5Y spreads · basis points</small><Plot points={cds.map(r=>({date:r.date,value:r.excess}))} start={start} end={end} color="#bd7738" unit="bp" title="Daily issuer CDS spread minus general investment-grade benchmark"/><p className="chart-footnote">Benchmark: IBOXUMAE Curncy. General IG is not matched to issuer rating or sector. Source uses prior-value fills. Publication dates for financial reports are absent, so this comparison is retrospective, not a real-time or causal test.</p></article></div>
 <details className="evidence-data"><summary>Quarterly financial inputs and interest coverage</summary><div className="credit-table-wrap"><table><thead><tr><th>Source period</th><th>Net debt</th><th>Quarterly EBITDA</th><th>TTM EBITDA</th><th>Leverage</th><th>Interest coverage</th></tr></thead><tbody>{financial.map(r=><tr key={r.period}><td>{r.period}</td>{[r.netDebt,r.ebitda,r.ttmEbitda].map((v,i)=><td key={i}>{v===null?'—':(v/1e9).toFixed(2)}</td>)}<td>{r.netDebtToEbitda===null?'—':`${r.netDebtToEbitda.toFixed(2)}×`}</td><td>{r.interestCoverage===null?'—':`${r.interestCoverage.toFixed(1)}×`}</td></tr>)}</tbody></table></div><p>Amounts in billions of source currency, without FX conversion. Interest coverage retains the source-period definition. Source: Indexlist.xlsx, Supply Chain Financial Value and AI 5yrCDS Value. {data.metadata.cdsMatchedCompanies} of {data.metadata.companies} financial companies have matched CDS history. TSM ADR CDS is mapped to TSMC’s local financial listing; this is issuer credit, not an equity-return comparison.</p></details>
 </div>;
}
