"use client";
import {useState} from "react";
import {projectedBuildoutSnapshot as data} from "./projected-buildout-snapshot";
import EvidenceCard from "./evidence-card";
import styles from "./projected-buildout.module.css";

export default function ProjectedBuildout({id}:{id?:string}){
 const [owner,setOwner]=useState("Aggregate");
 const rows=data.quarters.map(r=>({...r,capacity:owner==="Aggregate"?r.itMw:r.owners[owner as keyof typeof r.owners],spend:owner==="Aggregate"?r.capex:r.capexOwners[owner as keyof typeof r.capexOwners]}));
 const first=rows[0],last=rows.at(-1)!;
 const current=owner==="Aggregate"?Object.values(data.currentOwners).reduce((a,b)=>a+b,0):data.currentOwners[owner as keyof typeof data.currentOwners];
 const timeline=data.capacityHistory.map(r=>({...r,value:owner==="Aggregate"?r.itMw:r.owners[owner as keyof typeof r.owners]}));
 const delivered=timeline.filter(r=>!r.projected),projected=[delivered.at(-1)!,...timeline.filter(r=>r.projected)];
 const start=Date.parse(timeline[0].date),end=Date.parse(timeline.at(-1)!.date);
 const tx=(date:string)=>72+(Date.parse(date)-start)/(end-start)*810;
 const top=Math.ceil(Math.max(...timeline.map(r=>r.value))/1000/2)*2||2;
 const ty=(mw:number)=>38+(1-mw/1000/top)*220;
 const line=(points:typeof timeline)=>points.map((r,i)=>`${i?"L":"M"}${tx(r.date)},${ty(r.value)}`).join(" ");
 const cutoff=tx(data.metadata.capacityAsOf);
 const series=[{key:"capacity" as const,label:"Quarter-end capacity",color:"#1d7f80"},{key:"spend" as const,label:"Quarterly CapEx estimate",color:"#df7658"}];
 const max=Math.max(120,...rows.flatMap(r=>series.map(s=>first[s.key]>0?r[s.key]/first[s.key]*100:0)))*1.12;
 const x=(i:number)=>78+i*780/(rows.length-1),y=(v:number)=>35+(max-v)/max*230;
 const milestones=data.milestones.filter(r=>owner==="Aggregate"||r.owner===owner);
 return <div className={styles.root} id={id}>
  <div className="section-head"><div><div className="eyebrow">CAPACITY · DELIVERED AND PROJECTED</div><h3>From delivered capacity to projected buildout</h3></div><label>Coverage <select aria-label="Capacity company" value={owner} onChange={e=>setOwner(e.target.value)}>{["Aggregate",...data.metadata.coveredOwners].map(c=><option key={c}>{c}</option>)}</select></label></div>
  <p>One Epoch construction vintage and the same five hardware owners across history and projections. Delivered capacity is a modeled estimate of operational IT power; projected capacity includes future construction milestones and is not yet delivered.</p>
  <div className={styles.metrics}><article><span>Delivered · modeled IT capacity</span><strong>{(current/1000).toFixed(2)} GW</strong><small>As of 20 Oct 2026 · solid line</small></article><article><span>Projected capacity · {last.quarter}</span><strong>{(last.capacity/1000).toFixed(2)} GW</strong><small>Dashed line · includes the delivered stock</small></article><article><span>Projected net addition from today</span><strong>{last.capacity-current>=0?"+":""}{((last.capacity-current)/1000).toFixed(2)} GW</strong><small>Future milestones · timing is uncertain</small></article></div>
  <EvidenceCard title="Delivered and projected IT capacity" unit="GW · same owner coverage and October construction vintage" source="S11" note="Solid teal line and filled points: modeled delivered capacity through 20 October 2026. Dashed orange line and hollow points: projected total capacity after that date. Future totals already include the delivered stock; do not add the two. Capacity does not establish paid utilization.">
   <svg viewBox="0 0 960 370" role="img" aria-label={`${owner}: delivered capacity followed by projected capacity, with a 20 October 2026 cutoff`}>
    <title>{`${owner}: modeled delivered and projected IT capacity`}</title>
    <rect x={cutoff} y="30" width={882-cutoff} height="228" fill="#df7658" opacity=".09"/>
    {[0,.25,.5,.75,1].map(f=>f*top).map(v=><g key={v}><line x1="72" x2="882" y1={ty(v*1000)} y2={ty(v*1000)} stroke="#d6d7ce"/><text x="60" y={ty(v*1000)+4} textAnchor="end">{v.toFixed(1)}</text></g>)}
    <text x="72" y="19">DELIVERED · MODELED</text><text x="882" y="19" textAnchor="end">PROJECTED · NOT YET DELIVERED</text>
    <line x1={cutoff} x2={cutoff} y1="30" y2="263" stroke="#69736c" strokeDasharray="3 4"/>
    <path d={line(delivered)} fill="none" stroke="#1d7f80" strokeWidth="3"/><path d={line(projected)} fill="none" stroke="#df7658" strokeWidth="3" strokeDasharray="8 5"/>
    {timeline.map(r=><circle key={r.date} cx={tx(r.date)} cy={ty(r.value)} r={r.period==="Current"?6:4} fill={r.projected?"#fff":"#1d7f80"} stroke={r.projected?"#df7658":"#1d7f80"} strokeWidth="2"><title>{`${r.date} · ${r.period}: ${(r.value/1000).toFixed(3)} GW · ${r.projected?"projected, not yet delivered":"delivered, modeled estimate"}`}</title></circle>)}
    {timeline.filter(r=>r.period!=="Current"&&(r.period.endsWith("Q4")||r===timeline[0])).map(r=><text key={r.date} x={tx(r.date)} y="282" textAnchor="middle">{r.period}{r.projected?"E":""}</text>)}
    <text x={cutoff} y="306" textAnchor="middle">20 Oct 2026 cutoff</text>
    <g transform="translate(95,345)"><line x1="0" x2="32" stroke="#1d7f80" strokeWidth="3"/><circle cx="16" r="4" fill="#1d7f80"/><text x="43" y="5">Delivered · modeled</text></g>
    <g transform="translate(495,345)"><line x1="0" x2="32" stroke="#df7658" strokeWidth="3" strokeDasharray="7 5"/><circle cx="16" r="4" fill="white" stroke="#df7658"/><text x="43" y="5">Projected total</text></g>
   </svg>
  </EvidenceCard>
  <p>Snapshot: {data.metadata.capacityAsOf}. Future milestones are unweighted construction estimates, subject to grid connection, fit-out and commissioning delays. Coverage is selected Epoch sites, not global capacity. Flat segments mean no additional recorded milestone.</p>
  <div className="infra-table"><table><caption>Delivered today versus projected end-2027 · same five owners</caption><thead><tr><th>Owner</th><th>Delivered · 20 Oct 2026 (GW)</th><th>Projected · 2027Q4 (GW)</th><th>Projected net addition (GW)</th></tr></thead><tbody>{data.metadata.coveredOwners.filter(c=>owner==="Aggregate"||c===owner).map(c=>{const now=data.currentOwners[c as keyof typeof data.currentOwners],future=data.quarters.at(-1)!.owners[c as keyof typeof data.currentOwners];return <tr key={c}><td>{c}</td><td>{(now/1000).toFixed(2)}</td><td>{(future/1000).toFixed(2)}</td><td>{((future-now)/1000).toFixed(2)}</td></tr>;})}</tbody></table></div>
  <details className="evidence-data"><summary>Historical and projected capacity observations</summary><div className="infra-table"><table><thead><tr><th>Date</th><th>Period</th><th>Status</th><th>{owner} IT capacity (GW)</th></tr></thead><tbody>{timeline.map(r=><tr key={r.date}><td>{r.date}</td><td>{r.period}</td><td>{r.projected?"Projected · not delivered":"Delivered · modeled"}</td><td>{(r.value/1000).toFixed(3)}</td></tr>)}</tbody></table></div></details>
  <details className="evidence-data"><summary>Compare projected buildout with estimated CapEx</summary>
  <EvidenceCard title="Projected buildout versus estimated CapEx" unit="2026Q3 = 100 · capacity stock versus quarterly spending flow" source="S11" note="Capacity is the latest modeled milestone at each quarter end; future points are projections. All CapEx points shown are estimates, including 2026Q3. Indexing compares trajectories, not conversion efficiency. Quarter-end capacity and quarterly spending have different timing; commissioning can lag investment.">
   <svg viewBox="0 0 960 355" role="img" aria-label={`${owner}: projected capacity and estimated CapEx indexed to 2026Q3`}><title>Projected IT capacity and quarterly estimated CapEx</title>
    {[0,.25,.5,.75,1].map(t=>t*max).map(v=><g key={v}><line x1="65" x2="885" y1={y(v)} y2={y(v)} stroke="#d6d7ce"/><text x="58" y={y(v)+4} textAnchor="end">{v.toFixed(0)}</text></g>)}
    <rect x={x(0)+18} y="24" width={885-x(0)-18} height="245" fill="#d5aa43" opacity=".06"/>
    {series.map(s=><g key={s.key}><polyline points={rows.map((r,i)=>`${x(i)},${y(first[s.key]>0?r[s.key]/first[s.key]*100:0)}`).join(" ")} fill="none" stroke={s.color} strokeWidth="3" strokeDasharray="7 5"/>{rows.map((r,i)=><circle key={r.quarter} cx={x(i)} cy={y(first[s.key]>0?r[s.key]/first[s.key]*100:0)} r="5" fill={s.key==="capacity"&&!r.projected?s.color:"white"} stroke={s.color} strokeWidth="2"><title>{`${r.quarter}: ${s.label} ${s.key==="capacity"?`${(r.capacity/1000).toFixed(2)} GW`:`$${r.spend.toFixed(1)}B`}${s.key==="capacity"&&!r.projected?" (modeled historical)":" (estimate)"}`}</title></circle>)}</g>)}
    {rows.map((r,i)=><text key={r.quarter} x={x(i)} y="294" textAnchor="middle">{r.quarter}{r.projected?"E":""}</text>)}
    {series.map((s,i)=><g key={s.key} transform={`translate(${90+i*385},325)`}><line x1="0" x2="30" y1="0" y2="0" stroke={s.color} strokeWidth="3" strokeDasharray="7 5"/><text x="40" y="4">{s.label}</text></g>)}
   </svg>
  </EvidenceCard>
  <div className="infra-table"><table><caption>{owner} · quarter-aligned capacity and spending</caption><thead><tr><th>Quarter</th><th>IT capacity (GW)</th><th>Net addition (GW)</th><th>Estimated CapEx ($B)</th></tr></thead><tbody>{rows.map((r,i)=><tr key={r.quarter}><td>{r.quarter}{r.projected?"E":" · historical capacity"}</td><td>{(r.capacity/1000).toFixed(2)}</td><td>{i?((r.capacity-rows[i-1].capacity)/1000).toFixed(2):"—"}</td><td>{r.spend.toFixed(1)}</td></tr>)}</tbody></table></div>
  <p>Future capacity is an unweighted construction pipeline. Grid connection, fit-out and chip installation can shift commissioning dates. Coverage includes selected Epoch sites; company CapEx also funds other assets and workloads. Flat capacity after the last known milestone means no additional recorded project, rather than a forecast of zero construction.</p>
  <p>Epoch data retrieved {data.metadata.epochRetrievedAt}; CapEx estimates through {data.metadata.capexEstimateThrough}. This combined capacity view uses the 20 October vintage for both historical and future milestones. Historical conversion ratios elsewhere retain their labeled September vintage. <a href="#source-S1">CapEx source S1</a> · <a href={data.metadata.methodology} target="_blank" rel="noreferrer">Epoch methodology</a></p>
  </details>
  <details className="evidence-data"><summary>Underlying future milestones ({milestones.length}) · including projects beyond the CapEx horizon</summary><div className="infra-table"><table><thead><tr><th>Estimated date</th><th>Site / owner</th><th>Site total IT MW</th><th>Evidence / assumptions</th></tr></thead><tbody>{milestones.map((r,i)=><tr key={`${r.site}-${r.date}-${i}`}><td>{r.date}</td><td>{r.site}<br/>{r.owner}</td><td>{r.itMw.toLocaleString()}</td><td>{r.notes}</td></tr>)}</tbody></table></div></details>
 </div>;
}
