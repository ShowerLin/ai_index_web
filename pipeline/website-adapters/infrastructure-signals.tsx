"use client";
import {useState} from 'react';
import {indexPriceSnapshot as data} from './index-price-snapshot';
const groups={commitments:[{title:'Equipment orders',fields:['DGNOCOEQ Index','DGNOITIN Index']}],execution:[{title:'Equipment imports',fields:['USIMTELE Index','USIMSEMI Index','USIMCOMP Index']},{title:'Data-center construction',fields:['CNSTPRDA Index']},{title:'High-tech production',fields:['IPNEHITC Index']}],tightness:[{title:'GPU rental prices',fields:['SDH100RT Index','SDB200RT Index']},{title:'DDR5 memory pricing',fields:['ISPPDR48 Index']}]};
const colors=['#237d67','#bd7738','#747cae'];
type Group={title:string;fields:string[]};
function GroupChart({group}:{group:Group}){
 const [mode,setMode]=useState<'yoy'|'indexed'>('yoy');
 const series=data.series.filter(s=>group.fields.includes(s.field));
 const months=[...new Set(series.flatMap(s=>s.cells.filter(c=>!c.partial).map(c=>c.month)))].sort().slice(-24);
 const base=months.find(m=>series.every(s=>s.cells.some(c=>c.month===m&&!c.partial&&c.level!==null&&c.level>0)));
 const observations=series.map(s=>({...s,points:months.map(month=>{const c=s.cells.find(c=>c.month===month&&!c.partial),b=s.cells.find(c=>c.month===base)?.level;return {month,level:c?.level??null,value:mode==='yoy'?c?.yoy??null:base&&month>=base&&c?.level!=null&&b?c.level/b*100:null,unchanged:c?.unchangedFromPrevious??false};})}));
 const values=observations.flatMap(s=>s.points.flatMap(p=>p.value===null?[]:[p.value]));
 const lo=Math.min(mode==='yoy'?0:100,...values),hi=Math.max(mode==='yoy'?0:100,...values),pad=Math.max((hi-lo)*.12,1),min=lo-pad,max=hi+pad;
 const x=(i:number)=>75+i*680/Math.max(1,months.length-1),y=(v:number)=>190-(v-min)/(max-min)*150;
 return <article className="evidence-card"><div style={{display:'flex',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}><h4>{group.title}</h4><label>Compare <select value={mode} onChange={e=>setMode(e.target.value as typeof mode)} aria-label={`${group.title} comparison basis`}><option value="yoy">YoY growth (%)</option><option value="indexed">Indexed levels (100)</option></select></label></div>
 <p>{mode==='yoy'?'Common axis: year-over-year change (%)':`Common axis: ${base??'unavailable'} = 100 for every series`}. Completed monthly observations · gaps remain visible.</p>
 <div style={{display:'flex',gap:18,flexWrap:'wrap'}}>{observations.map((s,j)=><span key={s.field} style={{color:colors[j],fontSize:12}}>━ {s.name}</span>)}</div>
 <svg viewBox="0 0 820 235" role="img" aria-label={`${group.title}, ${mode==='yoy'?'year-over-year growth':'indexed levels'} on a common scale`} style={{width:'100%',maxHeight:300}}>
 {[0,.25,.5,.75,1].map(f=><g key={f}><line x1="70" x2="760" y1={y(min+(max-min)*f)} y2={y(min+(max-min)*f)} stroke="#d6d7ce"/><text x="60" y={y(min+(max-min)*f)+4} textAnchor="end" fontSize="11">{(min+(max-min)*f).toFixed(1)}{mode==='yoy'?'%':''}</text></g>)}
 {observations.map((s,j)=><g key={s.field}><path d={s.points.map((p,i)=>p.value===null?'':`${i&&s.points[i-1].value!==null?'L':'M'}${x(i)},${y(p.value)}`).join(' ')} fill="none" stroke={colors[j]} strokeWidth="2.5"/>{s.points.map((p,i)=>p.value===null?null:<circle key={p.month} cx={x(i)} cy={y(p.value)} r="2.5" fill={colors[j]}><title>{`${s.name} · ${p.month}: ${p.value.toFixed(2)}${mode==='yoy'?'%':''}`}</title></circle>)}</g>)}
 {months.map((m,i)=>i%6===0||i===months.length-1?<text key={m} x={x(i)} y="220" textAnchor="middle" fontSize="11">{m}</text>:null)}</svg>
 {!values.length&&<p>No comparable observations for this basis.</p>}
 <p>Source: {data.metadata.source} / {data.metadata.sheet}. Growth and rebasing compare trends, not dollar amounts or equivalent capacity. Unchanged quotes may be carried values.</p>
 <details><summary>Source levels and monthly comparisons</summary><div style={{overflowX:'auto'}}><table><thead><tr><th>Series</th><th>Month</th><th>Native level</th><th>{mode==='yoy'?'YoY (%)':'Index'}</th><th>Unchanged</th></tr></thead><tbody>{observations.flatMap(s=>s.points.map(p=><tr key={s.field+p.month}><th>{s.name} · {s.field}</th><td>{p.month}</td><td>{p.level?.toFixed(2)??'Unavailable'}</td><td>{p.value?.toFixed(2)??'Unavailable'}</td><td>{p.unchanged?'Yes':'No'}</td></tr>))}</tbody></table></div></details></article>;
}
export default function InfrastructureSignals({stage}:{stage:keyof typeof groups}){return <div className="infrastructure-stage-signals">{groups[stage].map(group=><GroupChart key={group.title} group={group}/>)}</div>;}
