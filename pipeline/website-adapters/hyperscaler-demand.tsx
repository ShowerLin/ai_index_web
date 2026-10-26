"use client";
import {useState} from "react";
import {cloudReferenceSnapshot as cloud} from "./cloud-reference-snapshot";
import {supplySnapshot as supply} from "./supply-snapshot";
import styles from "./hyperscaler-demand.module.css";

const companies=[
 {ticker:"MSFT",name:"Microsoft",revenue:"MSFT Intelligent Cloud",rpo:"MSFT Commerical RPO",scope:"Intelligent Cloud revenue versus Microsoft commercial RPO; their scopes differ."},
 {ticker:"GOOGL",name:"Alphabet",revenue:"Google Cloud",rpo:"Google Cloud RPO",scope:"Google Cloud revenue and cloud RPO; consolidated CapEx also funds other businesses."},
 {ticker:"AMZN",name:"Amazon",revenue:"AWS",rpo:"AMZN RPO",scope:"AWS revenue versus Amazon issuer RPO; their scopes differ."},
 {ticker:"ORCL",name:"Oracle",revenue:"ORCL Cloud&Software",rpo:"Oracle RPO",scope:"Cloud and software revenue versus issuer RPO. Gross-profit proxies are not operating profit."},
 {ticker:"META",name:"Meta",revenue:"",rpo:"",scope:"Meta is included in capital investment and cash/return analysis. Comparable cloud revenue and RPO are not available in this saved dataset."},
] as const;
type Point={period:string;value:number;cell:string};
function ForecastChart({title,points,color}:{title:string;points:Point[];color:string}){
 if(!points.length)return <article className={styles.card}><h4>{title}</h4><p>No comparable saved observations.</p></article>;
 const max=Math.max(...points.map(p=>p.value))*1.15||1;
 const x=(i:number)=>60+i*480/Math.max(1,points.length-1),y=(v:number)=>185-v/max*145;
 return <article className={styles.card}><div className={styles.chartHead}><h4>{title}</h4><span>USD billions · estimates</span></div>
 <svg viewBox="0 0 590 235" role="img" aria-label={`${title}, saved estimates by native fiscal quarter`}>
 {[0,.5,1].map(f=><g key={f}><line x1="55" x2="550" y1={y(max*f)} y2={y(max*f)} stroke="#d9ddd7"/><text x="45" y={y(max*f)+4} textAnchor="end" fontSize="11">{(max*f).toFixed(0)}</text></g>)}
 <path d={points.map((p,i)=>`${i?"L":"M"}${x(i)},${y(p.value)}`).join(" ")} fill="none" stroke={color} strokeWidth="3" strokeDasharray="7 5"/>
 {points.map((p,i)=><g key={p.period}><circle cx={x(i)} cy={y(p.value)} r="4" fill={color}><title>{`${p.period} E: $${p.value.toFixed(1)}B · ${p.cell}`}</title></circle><text x={x(i)} y="215" textAnchor="middle" fontSize="11">{p.period} E</text></g>)}
 </svg><details><summary>Values and source cells</summary><table><thead><tr><th>Fiscal quarter</th><th>USD B</th><th>Source cell</th></tr></thead><tbody>{points.map(p=><tr key={p.period}><td>{p.period} E</td><td>{p.value.toFixed(1)}</td><td>{p.cell}</td></tr>)}</tbody></table></details></article>;
}
export default function HyperscalerDemand(){
 const [ticker,setTicker]=useState<string>("MSFT");
 const company=companies.find(c=>c.ticker===ticker)!;
 const points=(entity:string,metric:string):Point[]=>cloud.observations.filter(r=>r.entity===entity&&r.metric===metric).map(r=>({period:r.fiscalPeriod,value:r.value,cell:`${cloud.metadata.sheet}!${r.sourceCell}`}));
 const revenues=points(company.revenue,"Revenue"),rpos=points(company.rpo,"RPO");
 const capex=supply.capex.find(c=>c.ticker===ticker);
 const last=revenues.at(-1);
 const rpoGrowth=supply.rpo.filter(r=>r.entity===company.rpo&&r.yoy!==null).at(-1);
 return <div className={styles.root}>
 <div className={styles.toolbar}><div><h3>Cloud demand and investment outlook</h3><p>Saved forecast vintage · revenue is a quarterly flow; RPO is a backlog stock.</p></div><label>Company <select value={ticker} onChange={e=>setTicker(e.target.value)} aria-label="Hyperscaler company">{companies.map(c=><option key={c.ticker} value={c.ticker}>{c.name}</option>)}</select></label></div>
 <p className={styles.scope}>{company.scope} Native fiscal labels are retained; dates are not aligned across issuers. Source retrieval time is unknown.</p>
 <div className={styles.kpis}>
 <article><span>Cloud revenue estimate</span><strong>{last?`$${last.value.toFixed(1)}B`:"Unavailable"}</strong><small>{last?`${last.period} fiscal · quarterly revenue`:"No comparable saved cloud segment"}</small></article>
 <article><span>RPO estimate</span><strong>{rpos.length?`$${rpos.at(-1)!.value.toFixed(1)}B`:"Unavailable"}</strong><small>{rpos.length?`${rpos.at(-1)!.period} fiscal · backlog stock`:"No comparable saved RPO"}</small></article>
 <article><span>Forward CapEx</span><strong>{capex?.forward12m!=null?`$${capex.forward12m.toFixed(1)}B`:"Unavailable"}</strong><small>{supply.metadata.forwardQuarters[0]}–{supply.metadata.forwardQuarters.at(-1)} calendar · four-quarter total</small></article>
 </div>
 <div className={styles.charts}><ForecastChart title={`${company.name} cloud revenue`} points={revenues} color="#237d67"/><ForecastChart title={`${company.name} RPO`} points={rpos} color="#bd7738"/></div>
 <p className={styles.scope}>Each chart uses its own dollar scale. Revenue and RPO levels cannot be compared directly. {rpoGrowth?`Within-vintage estimated RPO YoY growth: ${rpoGrowth.yoy!.toFixed(1)}% in ${rpoGrowth.period}. `:""}RPO is never summed across quarters. Growth versus CapEx is withheld until fiscal periods, growth bases and business scopes are reconciled.</p>
 <details className={styles.estimates}><summary>Forward capital expenditure · five-company comparison</summary><p>Next four complete calendar quarters after the reviewed horizon reference {supply.metadata.asOf}; not a day-exact next-12-month forecast. Raw saved estimates, without a lease-basis bridge. These amounts can differ from the approved historical CapEx definition.</p><div className={styles.scroll}><table><thead><tr><th>Company</th>{supply.metadata.forwardQuarters.map(q=><th key={q}>{q} E</th>)}<th>Total · USD B</th></tr></thead><tbody>{supply.capex.map(c=><tr key={c.ticker}><th>{c.ticker}</th>{supply.metadata.forwardQuarters.map(q=><td key={q}>{c.quarters.find(r=>r.quarter===q)?.value.toFixed(1)??"Unavailable"}</td>)}<td>{c.forward12m?.toFixed(1)??"Unavailable"}</td></tr>)}</tbody></table></div></details>
 </div>;
}
