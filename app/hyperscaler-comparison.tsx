"use client";
import {useState} from "react";
import styles from "./hyperscaler-demand.module.css";
type Series={name:string;points:{period:string;value:number;estimate:boolean;revision?:string}[]};
const colors=["#237d67","#426d99","#bd7738","#895a9e","#a34d49"];
export default function HyperscalerComparison({title,series,note}:{title:string;series:Series[];note:string}){
 const [hidden,setHidden]=useState<string[]>([]);
 const periods=[...new Set(series.flatMap(s=>s.points.map(p=>p.period)))].sort();
 const visible=series.filter(s=>!hidden.includes(s.name));
 const max=Math.max(1,...visible.flatMap(s=>s.points.map(p=>p.value)))*1.1;
 const x=(p:string)=>65+periods.indexOf(p)*760/Math.max(1,periods.length-1),y=(v:number)=>245-v/max*210;
 return <article className={`${styles.card} research-card`}><h4>{title}</h4><p className={styles.scope}>USD billions · {note}</p>
 <div>{series.map((s,i)=><button key={s.name} aria-pressed={!hidden.includes(s.name)} onClick={()=>setHidden(hidden.includes(s.name)?hidden.filter(n=>n!==s.name):[...hidden,s.name])} style={{margin:"4px",padding:"8px",border:`2px solid ${colors[i]}`,background:"transparent",opacity:hidden.includes(s.name)?.4:1}}>{s.name}{s.points.length?"":" · unavailable"}</button>)}</div>
 <svg viewBox="0 0 890 300" role="img" aria-label={title}>
 {[0,.25,.5,.75,1].map(f=><g key={f}><line x1="55" x2="845" y1={y(max*f)} y2={y(max*f)} stroke="#d9ddd7"/><text x="48" y={y(max*f)+4} textAnchor="end" fontSize="11">{(max*f).toFixed(0)}</text></g>)}
 {series.map((s,i)=>hidden.includes(s.name)?null:<g key={s.name}>{s.points.slice(1).map((p,j)=>{const prev=s.points[j];return <line key={p.period} x1={x(prev.period)} x2={x(p.period)} y1={y(prev.value)} y2={y(p.value)} stroke={colors[i]} strokeWidth="2.5" strokeDasharray={p.estimate?"6 4":undefined}/>;})}{s.points.map(p=><g key={p.period}>
   <title>{`${s.name} · ${p.period} · ${p.estimate?"estimate":"actual"}: $${p.value.toFixed(2)}B${p.revision ? ` · ${p.revision}` : ""}`}</title>
   <circle cx={x(p.period)} cy={y(p.value)} r="3.5" fill={colors[i]}/>
   {p.revision && <text x={x(p.period)} y={y(p.value)-8} fill={colors[i]} textAnchor="middle" fontSize="12">{p.revision[0]}</text>}
 </g>)}</g>)}
 {periods.map((p,i)=>(i%Math.max(1,Math.ceil(periods.length/8))===0||i===periods.length-1)&&<text key={p} x={x(p)} y="277" textAnchor="middle" fontSize="10">{p}</text>)}
 </svg><p className={styles.scope}>Select a company in the legend to show or hide it. Solid lines: actuals; dashed lines: estimates. Missing series are unavailable, not zero.</p></article>;
}
