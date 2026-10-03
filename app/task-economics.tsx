import EvidenceCard from "./evidence-card";
import ChartLegend from "./chart-legend";
import SectionNotes from "./section-notes";
import SectionSummary from "./section-summary";
import { taskEconomicsSnapshot as snapshot } from "./task-economics-snapshot";

const labColors: Record<string,string> = {
  OpenAI: "#1d7f80", Google: "#d88952", Meta: "#927bb8", xAI: "#d5aa43",
  Anthropic: "#78955f", NVIDIA: "#183b63", Microsoft: "#bf6b63", Other: "#65716e",
};

function money(value: number, decimals = 0) {
  if (value >= 1e9) return `$${(value/1e9).toFixed(decimals)}B`;
  if (value >= 1e6) return `$${(value/1e6).toFixed(decimals)}M`;
  if (value >= 1e3) return `$${(value/1e3).toFixed(decimals)}K`;
  return `$${value.toFixed(0)}`;
}

function TrainingCostChart() {
  const data = snapshot.observations;
  const ranges = snapshot.annualRanges;
  const w = 960, h = 370, l = 76, r = 24, t = 24, b = 52;
  const start = new Date("2017-01-01T00:00:00Z").valueOf();
  const end = new Date("2025-12-31T00:00:00Z").valueOf();
  const x = (date: string) => l + (new Date(`${date}T00:00:00Z`).valueOf()-start)*(w-l-r)/(end-start);
  const y = (value: number) => t + (9-Math.log10(value))/6*(h-t-b);
  const ticks = [1e3,1e4,1e5,1e6,1e7,1e8,1e9];
  const xTicks = [2017,2019,2021,2023,2025];
  const line = (key: "median"|"p75") => ranges.map((row,index)=>`${index?"L":"M"}${x(`${row.year}-07-01`)},${y(row[key])}`).join(" ");
  const band = [
    ...ranges.map((row,index)=>`${index?"L":"M"}${x(`${row.year}-07-01`)},${y(row.p75)}`),
    ...[...ranges].reverse().map(row=>`L${x(`${row.year}-07-01`)},${y(row.p25)}`), "Z",
  ].join(" ");
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="training-cost-title training-cost-desc">
    <title id="training-cost-title">Estimated compute cost to train frontier AI models</title>
    <desc id="training-cost-desc">Epoch AI estimates show model-level training compute costs rising from thousands of dollars in 2017 to hundreds of millions for selected 2025 frontier models.</desc>
    {ticks.map(value=><g key={value}><line x1={l} x2={w-r} y1={y(value)} y2={y(value)} className="task-grid"/><text x={l-12} y={y(value)+4} textAnchor="end">{money(value)}</text></g>)}
    {xTicks.map(year=><text key={year} x={x(`${year}-07-01`)} y={h-17} textAnchor="middle">{year}</text>)}
    <path d={band} fill="#d5aa4330" stroke="none"><title>Interquartile range of reported estimates by publication year</title></path>
    <path d={line("p75")} fill="none" stroke="#d88952" strokeWidth="2.5" strokeDasharray="6 5"/>
    <path d={line("median")} fill="none" stroke="#1d7f80" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"/>
    {data.map(row=><circle key={`${row.date}-${row.model}`} cx={x(row.date)} cy={y(row.trainingCost)} r="5.5" fill={labColors[row.lab] ?? labColors.Other} stroke="#fbfaf5" strokeWidth="1.5"><title>{`${row.lab} · ${row.model} · ${row.date}: ${money(row.trainingCost,1)} estimated training compute cost · ${row.hardware}`}</title></circle>)}
  </svg>;
}

export default function TaskEconomics({compact=false}:{compact?:boolean}={}) {
  const latestYear = snapshot.annualRanges.at(-1)!;
  const h100 = snapshot.hardware.find(row=>row.name.includes("H100"))!;
  const bestHardware = [...snapshot.hardware].filter(row=>row.pricePerformance).sort((a,b)=>(b.pricePerformance??0)-(a.pricePerformance??0))[0];
  const pricePerfGain = (bestHardware.pricePerformance??0)/(h100.pricePerformance??1);
  if(compact) return <><EvidenceCard id="task-economics" title="Frontier-model training costs" unit="Constant 2023 USD · logarithmic scale" source="S12" wide legend={<ChartLegend items={[{label:"Annual median",color:"#1d7f80"},{label:"Upper quartile",color:"#d88952",shape:"dash"},{label:"Interquartile range",color:"#d5aa4330",shape:"band"},...Object.entries(labColors).filter(([lab])=>snapshot.observations.some(row=>row.lab===lab)).map(([label,color])=>({label,color,shape:"dot" as const}))]}/>} note="Dots: model estimates. Lines: annual median and upper quartile. Training compute excludes full development costs."><TrainingCostChart/></EvidenceCard><details className="evidence-data"><summary>Training estimates, hardware and assumptions</summary><TaskEconomics/></details></>;
  return <section className="section task-economics-section" id="task-economics-detail">
    <div className="section-head"><div><div className="eyebrow">MODEL TRAINING ECONOMICS · SUPPLEMENTARY ANALYSIS</div><h2>Frontier training costs now reach hundreds of millions of dollars.</h2></div><p>Epoch AI dataset downloaded {snapshot.metadata.retrievedAt.slice(0,10)} <a className="source-chip" href="#source-S12">S12</a></p></div>
    <SectionSummary current={`The latest cost-bearing observation is ${snapshot.latest.model} at ${money(snapshot.latest.trainingCost,1)}; the 2025 median is ${money(latestYear.median,1)} across ${latestYear.count} disclosed estimates.`} conclusion="Model ambition is absorbing hardware efficiency gains: chip price-performance is improving, yet the most compute-intensive training runs create progressively larger monetization and capital-recovery hurdles."/>
    <div className="task-kpis">
      <article><span>Latest cost-bearing model</span><strong>{money(snapshot.latest.trainingCost,1)}</strong><small>{snapshot.latest.lab} · {snapshot.latest.model} · {snapshot.latest.date}</small></article>
      <article><span>2025 median training cost</span><strong>{money(latestYear.median,1)}</strong><small>{latestYear.count} frontier-model estimates with disclosed cost</small></article>
      <article><span>Selected chip price-performance gain</span><strong>{pricePerfGain.toFixed(1)}×</strong><small>{bestHardware.name} versus NVIDIA H100 · release-price basis</small></article>
    </div>
    <div className="task-layout">
      <div className="task-chart"><div className="task-chart-head"><div><b>Estimated frontier-model training compute cost</b><span>Constant 2023 USD · logarithmic scale · dots are individual models</span></div><div className="task-lab-legend"><span><i style={{background:"#1d7f80",width:18,height:3}}/>Annual median</span><span><i style={{background:"#d88952",width:18,height:3}}/>Upper quartile</span></div></div><TrainingCostChart/></div>
      <aside className="task-interpretation"><span>INVESTMENT INTERPRETATION</span><h3>Efficiency gains are being reinvested into larger runs.</h3><p>Faster chips lower the cost of a fixed amount of compute, but leading developers can spend that efficiency dividend on larger training runs. The result is rising model-level cost even as accelerator economics improve.</p><div><b>Commercial recovery condition</b><code>recognized revenue × contribution margin ≥ training compute + serving cost + operating expense</code></div></aside>
    </div>
    <details className="panel-detail"><summary>Training-cost recovery assumptions</summary><div className="task-sensitivity">
      <div><span>TRAINING-COST RECOVERY</span><h3>Revenue required to cover one training run</h3><p>Higher training costs increase the revenue required at each contribution margin.</p></div>
      <div className="task-table"><table><thead><tr><th>Model</th><th>Training cost</th>{snapshot.recovery.contributionMargins.map(m=><th key={m}>{Math.round(m*100)}% contribution</th>)}</tr></thead><tbody>{snapshot.recovery.models.map(row=><tr key={row.model}><td>{row.lab} · {row.model}</td><td>{money(row.trainingCost,1)}</td>{row.revenueRequired.map((value,index)=><td key={snapshot.recovery.contributionMargins[index]}>{money(value,1)}</td>)}</tr>)}</tbody></table></div>
    </div></details>
    <details className="panel-detail"><summary>Accelerator specifications</summary><div className="task-hardware"><div><span>CHIP ECONOMICS</span><h3>Selected accelerator price-performance</h3><p>Improving accelerator price-performance lowers the cost of a fixed compute workload.</p></div><div className="task-table"><table><thead><tr><th>Accelerator</th><th>Release</th><th>Release price</th><th>ML OP/s per $</th><th>vs H100</th></tr></thead><tbody>{snapshot.hardware.map(row=><tr key={row.name}><td>{row.name}</td><td>{row.releaseDate.slice(0,4)}</td><td>{row.releasePrice?money(row.releasePrice):"N/A"}</td><td>{row.pricePerformance?`${(row.pricePerformance/1e9).toFixed(1)}B`:"N/A"}</td><td>{row.pricePerformance&&h100.pricePerformance?`${(row.pricePerformance/h100.pricePerformance).toFixed(1)}×`:"N/A"}</td></tr>)}</tbody></table></div></div></details>

    <SectionNotes section="task-economics" other={<p>Training compute is neither total model-development cost nor customer API price. Covered cost observations end on {snapshot.metadata.costObservationAsOf}; model coverage extends to {snapshot.metadata.modelDatasetAsOf}. Recovery sensitivities exclude serving, research payroll, failed experiments, data, financing and overhead. Hardware comparisons exclude systems, networking, power, utilization and purchasing terms. These sensitivities are not forecasts.</p>}/>
  </section>;
}
