import {coreContributionSnapshot} from "./core-contribution-snapshot";
import EvidenceCard from "./evidence-card";
import EvidenceGroup from "./evidence-group";
import { monthlyHeatmapSnapshot } from "./monthly-heatmap-snapshot";

const names: Record<string,string> = {BTOS0700:"Current business AI use",BTOS2400:"Expected business AI use",KOTCDRAM:"South Korea DRAM exports",DGNOCOEQ:"Communication equipment orders",DGNOITIN:"IT equipment orders",DGNOTGOP:"Power equipment orders",CNSTPRDA:"Data-center construction",IPNEHITC:"High-tech industry activity",USIMTELE:"Telecom imports",USIMSEMI:"Semiconductor imports",USIMCOMP:"Computer imports"};

export default function PillarResearch({id,number,pillar,title,summary,history=true,historyPillar=pillar,classification="CORE PILLAR · 20% WEIGHT",historyCompanion,children}:{id:string;number:string;pillar:string;title:string;summary:string;history?:boolean;historyPillar?:string;classification?:string;historyCompanion?:import("react").ReactNode;children?:import("react").ReactNode}) {
  const adoption=historyPillar==="Adoption";
  const months=adoption?coreContributionSnapshot.months.map(r=>r.month):monthlyHeatmapSnapshot.months;
  const row=adoption?{constituents:["BTOS0700","BTOS2400"].map(ticker=>({ticker,cells:coreContributionSnapshot.months.map(r=>({month:r.month,value:r.rows.find(c=>c.ticker===ticker)?.level??null}))}))}:monthlyHeatmapSnapshot.rows.find(row=>row.pillar===historyPillar);
  const colors=["#237d67","#bd7738","#426d99","#916aa6","#7f863e"];
  const values=row?.constituents.flatMap(c=>c.cells.map(d=>d.value).filter((v):v is number=>v!==null))??[];
  const lo=Math.min(0,...values),hi=Math.max(1,...values),pad=Math.max(2,(hi-lo)*.1);
  const x=(i:number)=>65+i*790/Math.max(1,months.length-1),y=(v:number)=>35+(hi+pad-v)*235/(hi-lo+2*pad);
  return <section className="section pillar-research" id={id}>
    <div className="eyebrow">{number} · {classification}</div><h2>{pillar}</h2><p className="chapter-lead">{title}</p><p className="section-summary">{summary}</p>
    <div className="pillar-chart-grid">
    {pillar==="Adoption"&&<EvidenceGroup title="Business adoption" description="Survey levels show the breadth of business AI use."/>}
    {pillar==="Demand"&&<EvidenceGroup title="Equipment imports" description="Monthly imports show equipment demand across telecom, semiconductors and computers."/>}
    {pillar==="Investment"&&<EvidenceGroup title="Commitments and spending" description="Equipment orders and construction track commitments; quarterly company CapEx shows the scale and breadth of spending."/>}
    {history&&row&&<MomentumRow companion={historyCompanion}><EvidenceCard title={adoption?"Business AI adoption":`${historyPillar} constituent momentum`} unit={adoption?"January 2024–September 2026 · businesses reporting AI use (%)":"July 2025–June 2026 · monthly change (%)"} source="S1" note={adoption?"Raw survey levels underlying the heatmap. November 2025 question change breaks comparability; the lines are split at that boundary.":pillar==="Demand"?"KOTCDRAM: South Korea nominal DRAM export value. Monthly change = (current month / preceding month − 1) × 100, without seasonal adjustment. July 2025–June 2026; missing comparisons are gaps. This chart contains DRAM only; NAND and TSMC appear in the adjacent comparison. The core heatmap instead normalizes trailing-12-month YoY growth. Export values reflect prices and volumes, not AI-only demand.":"Raw monthly changes, not normalized scores. Missing observations appear as gaps."}><div className="constituent-plot">
      <svg viewBox="0 0 900 315" role="img" aria-label={adoption?"Business AI adoption percentage levels underlying the heatmap":`${historyPillar} constituent monthly growth histories`}>
        {[lo,0,hi].filter((v,i,a)=>a.indexOf(v)===i).map(v=><g key={v}><line x1="65" x2="855" y1={y(v)} y2={y(v)} stroke="#d6d7ce"/><text x="55" y={y(v)+4} textAnchor="end" fontSize="11">{v.toFixed(0)}%</text></g>)}
        {row.constituents.map((c,j)=><path key={c.ticker} d={c.cells.map((d,i)=>d.value===null?"":`${i===0||c.cells[i-1].value===null||adoption&&d.month==="2025-11"?"M":"L"}${x(i)},${y(d.value)}`).join(" ")} fill="none" stroke={colors[j%colors.length]} strokeWidth="2.5"/>)}
        {adoption&&<g><line x1={x(months.indexOf("2025-11"))} x2={x(months.indexOf("2025-11"))} y1="35" y2="270" stroke="#777" strokeDasharray="4 4"/><text x={x(months.indexOf("2025-11"))-8} y="25" textAnchor="end" fontSize="13">Question change</text></g>}
        {months.map((m,i)=>!adoption||i%6===0||i===months.length-1?<text key={m} x={x(i)} y="303" textAnchor="middle" fontSize="10">{m.slice(2)}</text>:null)}
      </svg>
      <div className="pillar-series-legend">{row.constituents.map((c,j)=><span key={c.ticker} style={{color:colors[j%colors.length]}}>{names[c.ticker]??c.ticker}</span>)}</div>
      </div></EvidenceCard></MomentumRow>}{history&&row&&<details className="evidence-data"><summary>{adoption?"Adoption percentages and coverage":"Constituent values and coverage"}</summary><div className="signal-table-wrap"><table><thead><tr><th>Constituent</th>{months.map(m=><th key={m}>{m}</th>)}</tr></thead><tbody>{row.constituents.map(c=><tr key={c.ticker}><th>{names[c.ticker]??c.ticker}</th>{c.cells.map(d=><td key={d.month}>{d.value===null?"n/a":`${d.value.toFixed(1)}%`}</td>)}</tr>)}</tbody></table></div></details>
    }
    {children}</div>
  </section>;
}

function MomentumRow({companion,children}:{companion?:import("react").ReactNode;children:import("react").ReactNode}) {
  return companion ? <div className="investment-momentum-row">{children}{companion}</div> : <>{children}</>;
}
