"use client";
import {useState} from 'react';
import EvidenceCard from './evidence-card';
import {rampSnapshot} from './ramp-snapshot';
import {coreContributionSnapshot as core} from './core-contribution-snapshot';

export default function RampDemand(){
 const [basis,setBasis]=useState<'level'|'signal'>('level');
 const rows=rampSnapshot.monthly.filter(r=>r.month>='2023-09');
 const values:(number|null)[]=rows.map(r=>basis==='level'?r.medianSpend:r.spendSignal);
 const valid=values.filter((v):v is number=>v!==null);
 const low=Math.min(0,...valid),high=Math.max(1,...valid)*1.1;
 const x=(i:number)=>65+i*790/(rows.length-1),y=(v:number)=>260-(v-low)*220/(high-low);
 const path=values.map((v,i)=>v===null?'':`${i===0||values[i-1]===null?'M':'L'}${x(i)},${y(v)}`).join(' ');
 const latest=rows.at(-1)!;
 return <EvidenceCard id="ramp-spending" title="Paid AI spending intensity" unit={basis==='level'?'Median USD per employee per month':'Core scoring signal · 3M-average median spend YoY (%)'} source="S14" note={`Median spending contributes ${((core.months.at(-1)?.rows.find(r=>r.ticker==='RAMP_MEDIAN_SPEND')?.weight??0)*100).toFixed(1)}% of the core index. Latest ${latest.month}: $${latest.medianSpend?.toFixed(2)} per employee. The scoring signal compares three-month average medians with the same months a year earlier. Nominal dollars reflect prices, mix and Ramp sample composition, not profitability. Fixed baseline: November 2024–June 2026, 20 observations. September is unavailable.`}>
   <div className="contribution-mode" role="group" aria-label="Ramp spending chart basis"><button aria-pressed={basis==='level'} onClick={()=>setBasis('level')}>Monthly spending</button><button aria-pressed={basis==='signal'} onClick={()=>setBasis('signal')}>Core scoring signal</button></div>
   <svg viewBox="0 0 900 320" role="img" aria-label={`Ramp median AI spending ${basis==='level'?'levels':'three-month average year-over-year growth'}`}>
    {[0,.5,1].map(t=>{const value=low+(high-low)*t;return <g key={t}><line x1="65" x2="855" y1={y(value)} y2={y(value)} stroke="#d6d7ce"/><text x="55" y={y(value)+4} textAnchor="end" fontSize="11">{basis==='level'?'$':''}{value.toFixed(0)}{basis==='signal'?'%':''}</text></g>;})}
    <path d={path} fill="none" stroke="#315e87" strokeWidth="3"/>
    {rows.map((r,i)=>i%6===0||i===rows.length-1?<text key={r.month} x={x(i)} y="296" textAnchor="middle" fontSize="11">{r.month.slice(2)}</text>:null)}
   </svg>
 </EvidenceCard>;
}
