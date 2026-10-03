import EvidenceCard from "./evidence-card";
import ChartLegend from "./chart-legend";
import { companyTokens } from "./openrouter-company-snapshot";

const colors=["#237d67","#315e87","#bd7840","#88609c","#b34558","#688a3e","#3b969d","#b89938","#a3a5a0"];
export default function AdoptionUsage(){
  const rows=companyTokens.rows, max=Math.ceil(Math.max(...rows.map(r=>r.total))),x=(i:number)=>85+i*750/rows.length,y=(v:number)=>260-v/max*220,width=750/rows.length*.62;
  return <EvidenceCard id="adoption-usage" title="OpenRouter token consumption" unit="Trillion tokens per observed day · quarterly average" source="S9" legend={<ChartLegend items={companyTokens.authors.map((a,i)=>({label:a.label,color:colors[i]}))}/>} note="Model developers, not hosting providers. Eight largest developers by total routed tokens over the displayed period; remaining developers and unclassified traffic grouped as Other. Retained data through 2026Q2; missing days excluded. Routing share and reasoning intensity affect volumes.">
    <svg viewBox="0 0 900 320" role="img" aria-label="OpenRouter token usage from 2025Q1 through 2026Q2, stacked by model developer">
      {[0,.25,.5,.75,1].map(t=><g key={t}><line x1="65" x2="835" y1={y(max*t)} y2={y(max*t)} stroke="#d6d7ce"/><text x="50" y={y(max*t)+4} textAnchor="end" fontSize="11">{(max*t).toFixed(1)}T</text></g>)}
      {rows.map((r,i)=>{let base=0;return <g key={r.quarter}>{companyTokens.authors.map((a,j)=>{const value=r.values[a.id],bottom=base;base+=value;return <rect key={a.id} x={x(i)} y={y(base)} width={width} height={y(bottom)-y(base)} fill={colors[j]}><title>{`${r.quarter} · ${a.label}: ${value.toFixed(3)}T per observed day (${(value/r.total*100).toFixed(1)}%); ${r.days} days covered`}</title></rect>;})}<text x={x(i)+width/2} y={y(r.total)-12} textAnchor="middle" fontSize="12">{r.total.toFixed(3)}T</text><text x={x(i)+width/2} y="294" textAnchor="middle" fontSize="11">{r.quarter}</text></g>;})}
    </svg>
  </EvidenceCard>;
}
