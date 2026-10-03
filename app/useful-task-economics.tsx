import EvidenceCard from "./evidence-card";
import ChartLegend from "./chart-legend";
import SectionNotes from "./section-notes";
import SectionSummary from "./section-summary";
import { usefulTaskSnapshot as snapshot } from "./useful-task-snapshot";

const labColors = { OpenAI: "#1d7f80", Anthropic: "#d88952", DeepSeek: "#927bb8", MiniMax: "#b45f74", xAI: "#d5aa43", "Z.ai": "#78955f", "OpenAI / Anthropic": "#183b63", Other: "#65716e" } as const;
const seriesColors = { Frontier: "#1d7f80", "Best value": "#d88952" } as const;

function UsefulTaskChart() {
  const data = snapshot.observations;
  const w=960,h=350,l=76,r=24,t=24,b=52;
  const start=new Date(`${data[0].date}T00:00:00Z`).valueOf(), end=new Date(`${data.at(-1)!.date}T00:00:00Z`).valueOf();
  const x=(date:string)=>l+(new Date(`${date}T00:00:00Z`).valueOf()-start)*(w-l-r)/(end-start);
  const y=(value:number)=>t+(4-Math.log10(value))/6*(h-t-b);
  const ticks=[10000,1000,100,10,1,.1,.01], years=["2023-03-01","2024-03-01","2025-03-01","2026-03-01"];
  const series=(Object.keys(seriesColors) as (keyof typeof seriesColors)[]).map(name=>({name,points:snapshot.trendLines[name]}));
  const frontier=series.find(item=>item.name==="Frontier")!.points, bestValue=series.find(item=>item.name==="Best value")!.points;
  const rangeDates=[...new Set(data.filter(row=>row.date>=bestValue[0].date).map(row=>row.date))].sort();
  const interpolate=(points:ReadonlyArray<{date:string;costPerUsefulTask:number}>,date:string)=>{
    const target=new Date(`${date}T00:00:00Z`).valueOf();
    const before=[...points].reverse().find(row=>new Date(`${row.date}T00:00:00Z`).valueOf()<=target)!;
    const after=points.find(row=>new Date(`${row.date}T00:00:00Z`).valueOf()>=target)!;
    if(!before) return after.costPerUsefulTask;
    if(!after) return before.costPerUsefulTask;
    if(before.date===after.date) return before.costPerUsefulTask;
    const bt=new Date(`${before.date}T00:00:00Z`).valueOf(),at=new Date(`${after.date}T00:00:00Z`).valueOf();
    return 10**(Math.log10(before.costPerUsefulTask)+(target-bt)/(at-bt)*(Math.log10(after.costPerUsefulTask)-Math.log10(before.costPerUsefulTask)));
  };
  const band=[...rangeDates.map((date,index)=>`${index?"L":"M"}${x(date)},${y(interpolate(frontier,date))}`),...[...rangeDates].reverse().map(date=>`L${x(date)},${y(interpolate(bestValue,date))}`),"Z"].join(" ");
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="useful-task-title useful-task-desc">
    <title id="useful-task-title">Cost per successful software task</title><desc id="useful-task-desc">Derived buyer-side cost per successful SWE-Bench task for frontier and best-value model series.</desc>
    {ticks.map(value=><g key={value}><line x1={l} x2={w-r} y1={y(value)} y2={y(value)} className="task-grid"/><text x={l-12} y={y(value)+4} textAnchor="end">{value>=1?`$${value.toLocaleString()}`:`$${value}`}</text></g>)}
    {years.map(date=><text key={date} x={x(date)} y={h-17} textAnchor="middle">{date.slice(0,4)}</text>)}
    <path d={band} fill="#d5aa4330" stroke="none"/>
    {series.map(item=><path key={item.name} d={item.points.map((row,index)=>`${index?"L":"M"}${x(row.date)},${y(row.costPerUsefulTask)}`).join(" ")} fill="none" stroke={seriesColors[item.name]} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"/>)}
    {data.map(row=>{const publicSuccess=row.successSource!=="Indexlist.xlsx",cx=x(row.date),cy=y(row.costPerUsefulTask),fill=labColors[row.lab as keyof typeof labColors]??labColors.Other;const tip=`${row.lab} · ${row.model}: $${row.costPerUsefulTask.toLocaleString()} per successful task · ${Math.round(row.successRate*1000)/10}% proxy success · ${row.classification} · evidence tier ${row.evidenceTier} · ${row.successBenchmark}`;return <g key={`${row.date}-${row.model}`}>{row.classification==="Best-value anchor"?<polygon points={`${cx},${cy-8} ${cx+8},${cy} ${cx},${cy+8} ${cx-8},${cy}`} fill={fill} stroke="#183b63" strokeWidth="2.5"><title>{tip}</title></polygon>:<circle cx={cx} cy={cy} r={row.classification==="Frontier anchor"?7:4.5} fill={fill} opacity={row.classification==="Comparator"?.72:1} stroke={publicSuccess?"#183b63":"#fbfaf5"} strokeWidth={row.classification==="Frontier anchor"?2.8:1.5}><title>{tip}</title></circle>}</g>})}
  </svg>;
}

function formatTasks(value:number){return value>=1_000_000?`${(value/1_000_000).toFixed(2)}M`:`${Math.round(value/1_000)}K`;}

export default function UsefulTaskEconomics({compact=false}:{compact?:boolean}={}){
  const frontier=snapshot.latest.Frontier,bestValue=snapshot.latest["Best value"];
  if(compact) return <><EvidenceCard id="useful-task-economics" title="Cost per successful task" unit="USD · logarithmic scale" source="S13" legend={<ChartLegend items={[{label:"Frontier line",color:seriesColors.Frontier},{label:"Best-value envelope",color:seriesColors["Best value"]},{label:"Gap between lines",color:"#d5aa4330",shape:"band"},{label:"Value anchor",color:"#65716e",shape:"diamond"},{label:"Frontier anchor (large circle)",color:"#65716e",shape:"anchor"},{label:"Comparator (small circle)",color:"#65716e",shape:"dot"},...Object.entries(labColors).filter(([lab])=>snapshot.observations.some(row=>row.lab===lab)).map(([label,color])=>({label,color,shape:"dot" as const}))]}/>} note="Benchmark success is a proxy; model protocols differ. Lines: frontier and best value; dots: individual models."><UsefulTaskChart/></EvidenceCard><details className="evidence-data"><summary>Model observations and task-cost assumptions</summary><UsefulTaskEconomics/></details></>;
  return <section className="section task-economics-section" id="useful-task-economics-detail">
    <div className="section-head"><div><div className="eyebrow">COST PER SUCCESSFUL TASK · DERIVED ANALYSIS</div><h2>Lower task prices require much higher paid volume.</h2></div><p>Workbook and Epoch observations through {snapshot.metadata.asOf} <a className="source-chip" href="#source-S13">S13</a></p></div>
    <SectionSummary current={`Latest estimated costs per successful task are $${frontier.costPerUsefulTask.toFixed(3)} for Frontier and $${bestValue.costPerUsefulTask.toFixed(3)} for Best Value.`} conclusion="Falling task prices strengthen demand potential but raise the utilization hurdle for infrastructure owners: a fixed capital base must support many more paid tasks to earn the same contribution dollars."/>
    <div className="task-kpis"><article><span>Latest frontier task</span><strong>${frontier.costPerUsefulTask.toFixed(3)}</strong><small>{frontier.model} · {Math.round(frontier.successRate*100)}% proxy success</small></article><article><span>Latest best-value task</span><strong>${bestValue.costPerUsefulTask.toFixed(3)}</strong><small>{bestValue.model} · {Math.round(bestValue.successRate*100)}% proxy success</small></article><article><span>Public success proxies</span><strong>{snapshot.metadata.publicSuccessProxyCount} / {snapshot.metadata.observationCount}</strong><small>Exact model matches to SWE-bench Verified or DeepSWE</small></article></div>
    <div className="task-layout"><div className="task-chart"><div className="task-chart-head"><div><b>Cost per successful task and observed model range</b><span>USD · logarithmic scale</span></div><div className="task-lab-legend"><span><i style={{background:seriesColors.Frontier,width:18,height:3}}/>Frontier line</span><span><i style={{background:seriesColors["Best value"],width:18,height:3}}/>Best-value envelope</span><span><i style={{background:"#1d7f80",borderRadius:"50%"}}/>Frontier anchor</span><span><i style={{background:"#d88952",transform:"rotate(45deg)"}}/>Value anchor</span><span><i style={{background:"#65716e",borderRadius:"50%",opacity:.65}}/>Comparator</span></div></div><UsefulTaskChart/></div><aside className="task-interpretation"><span>LINK TO CAPITAL RETURNS</span><h3>Price compression shifts the burden to utilization.</h3><p>As useful output becomes cheaper, capital recovery depends more on recurring paid volume and contribution margin. Infrastructure owners need enough task-level profit to cover depreciation and the required return.</p></aside></div>
    <details className="panel-detail"><summary>Capital-recovery assumptions and sensitivity</summary><div className="task-sensitivity"><div><span>CAPITAL RECOVERY SENSITIVITY</span><h3>Daily successful tasks required per $1B of capital</h3><p>Lower task prices require greater paid volume to recover the same capital at each contribution margin.</p></div><div className="task-table"><table><thead><tr><th>Series</th><th>Model</th><th>Price / task</th>{snapshot.assumptions.contributionMargins.map(m=><th key={m}>{Math.round(m*100)}% margin</th>)}</tr></thead><tbody>{snapshot.sensitivity.map(row=><tr key={row.series}><td>{row.series}</td><td>{row.model}</td><td>${row.pricePerUsefulTask.toFixed(row.pricePerUsefulTask<.1?3:2)}</td>{row.tasksPerDay.map((value,index)=><td key={snapshot.assumptions.contributionMargins[index]}>{formatTasks(value)}</td>)}</tr>)}</tbody></table></div></div></details>

    <SectionNotes section="useful-task-economics"/>
  </section>;
}
