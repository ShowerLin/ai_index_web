"use client";

import SectionNotes from "./section-notes";

import { useState } from "react";
import { infrastructureSnapshot as snapshot } from "./infrastructure-snapshot";
import SectionSummary from "./section-summary";

type View = "deployment" | "compute" | "conversion" | "usage";

const companyColors: Record<string, string> = {
  Microsoft: "#0f4c81",
  Alphabet: "#d5aa43",
  Meta: "#927bb8",
  Amazon: "#df7658",
  Oracle: "#78955f",
};

function DeploymentChart() {
  const data = snapshot.deploymentHistory;
  const w = 960, h = 330, l = 58, r = 20, t = 24, b = 48;
  const max = Math.ceil(Math.max(...data.map(d => d.itMw)) / 2000) * 2000;
  const maxAddition = Math.max(...data.map(d => d.additionMw ?? 0));
  const x = (i: number) => l + i * (w - l - r) / (data.length - 1);
  const y = (v: number) => t + (max - v) * (h - t - b) / max;
  const barWidth = Math.min(35, (w - l - r) / data.length * .48);
  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.itMw)}`).join(" ");
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="deployment-title deployment-desc">
    <title id="deployment-title">Operational IT power and quarterly additions at the five covered hyperscalers</title>
    <desc id="deployment-desc">Operational IT power rises from 127 megawatts in early 2023 to more than eight gigawatts in 2026. Bars show quarterly additions.</desc>
    {[0, 2000, 4000, 6000, 8000].filter(v => v <= max).map(v => <g key={v}><line x1={l} x2={w-r} y1={y(v)} y2={y(v)} className="infra-grid"/><text x={l-10} y={y(v)+4} textAnchor="end">{v === 0 ? "0" : `${v/1000}GW`}</text></g>)}
    {data.map((d, i) => {
      const addition = d.additionMw ?? 0;
      const height = addition / maxAddition * 82;
      return <rect key={`bar-${d.quarter}`} x={x(i)-barWidth/2} y={h-b-height} width={barWidth} height={height} className="infra-addition"><title>{`${d.quarter}: ${addition.toLocaleString()} MW added`}</title></rect>;
    })}
    <path d={`${line} L${x(data.length-1)},${h-b} L${x(0)},${h-b} Z`} className="infra-area"/>
    <path d={line} className="infra-line"/>
    {data.map((d, i) => <g key={d.quarter}><circle cx={x(i)} cy={y(d.itMw)} r={i === data.length-1 ? 6 : 3.5} className="infra-point"><title>{`${d.quarter}: ${d.itMw.toLocaleString()} operational IT MW`}</title></circle>{(i%2===0 || i===data.length-1) && <text x={x(i)} y={h-16} textAnchor="middle">{d.quarter.replace("20", "")}</text>}</g>)}
  </svg>;
}

function ComputeChart() {
  const data = snapshot.computeHistory;
  const w = 960, h = 330, l = 54, r = 20, t = 24, b = 48;
  const max = 20;
  const x = (i: number) => l + i * (w-l-r) / (data.length-1);
  const y = (v: number) => t + (max-v) * (h-t-b) / max;
  const median = data.map((d,i) => `${i ? "L" : "M"}${x(i)},${y(d.h100e)}`).join(" ");
  const band = [
    ...data.map((d,i) => `${i ? "L" : "M"}${x(i)},${y(d.high)}`),
    ...[...data].reverse().map((d,index) => `L${x(data.length-1-index)},${y(d.low)}`),
    "Z",
  ].join(" ");
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="compute-title compute-desc">
    <title id="compute-title">Estimated installed compute owned by the five covered hyperscalers</title>
    <desc id="compute-desc">Median H100-equivalent stock with the sum of source five-to-ninety-five percent ranges.</desc>
    {[0,5,10,15,20].map(v => <g key={v}><line x1={l} x2={w-r} y1={y(v)} y2={y(v)} className="infra-grid"/><text x={l-10} y={y(v)+4} textAnchor="end">{v}M</text></g>)}
    <path d={band} className="compute-band"/>
    <path d={median} className="compute-line"/>
    {data.map((d,i) => <g key={d.quarter}><circle cx={x(i)} cy={y(d.h100e)} r={i===data.length-1?6:4} className="compute-point"><title>{`${d.quarter}: ${d.h100e.toFixed(2)}M H100e; range ${d.low.toFixed(2)}M–${d.high.toFixed(2)}M`}</title></circle><text x={x(i)} y={h-16} textAnchor="middle">{d.quarter.replace("20", "")}</text></g>)}
  </svg>;
}

function OwnerBars({metric}:{metric:"deployment"|"compute"}) {
  const rows = metric === "deployment"
    ? snapshot.deploymentByOwner.map(row => ({company:row.company,value:row.itMw}))
    : snapshot.computeByOwner.map(row => ({company:row.company,value:row.h100e}));
  const max = Math.max(...rows.map(row => row.value));
  return <div className="infra-owner-bars">{rows.map(row => {
    const value = row.value;
    return <div className="infra-owner-row" key={row.company}>
      <b>{row.company}</b>
      <div><span style={{width:`${value/max*100}%`, background:companyColors[row.company]}}/></div>
      <strong>{metric === "deployment" ? `${value.toLocaleString()} MW` : `${value.toFixed(2)}M`}</strong>
    </div>;
  })}</div>;
}

function ConversionTable() {
  return <div className="infra-table"><table>
    <thead><tr><th>Company</th><th>Compute CapEx</th><th>H100e added</th><th>IT MW added</th><th>CapEx / 1M H100e</th><th>CapEx / MW</th></tr></thead>
    <tbody>{snapshot.conversion.map(row => <tr key={row.company}>
      <td><i style={{background:companyColors[row.company]}}/><b>{row.company}</b></td>
      <td>{row.computeCapex === null ? "n/a" : `$${row.computeCapex.toFixed(1)}B`}</td>
      <td>{row.h100eAdded.toFixed(2)}M</td>
      <td>{row.itMwAdded.toLocaleString()} MW</td>
      <td>{row.capexPerMillionH100e === null ? "n/a" : `$${row.capexPerMillionH100e.toFixed(1)}B`}</td>
      <td>{row.capexPerMw === null ? "n/a" : `$${row.capexPerMw.toFixed(1)}M`}</td>
    </tr>)}</tbody>
  </table></div>;
}

export default function InfrastructureDeployment() {
  const [view,setView] = useState<View>("deployment");
  const latestDeployment = snapshot.deploymentHistory.at(-1)!;
  const latestCompute = snapshot.computeHistory.at(-1)!;
  return <section className="section infrastructure-section" id="infrastructure">
    <div className="section-head"><div><div className="eyebrow">PHYSICAL INFRASTRUCTURE · SUPPLEMENTARY ANALYSIS</div><h2>How quickly is spending becoming compute capacity?</h2></div><p>Facilities through {snapshot.metadata.dataCenterAsOf} · chips through {snapshot.metadata.chipAsOf} <a className="source-chip" href="#source-S11">S11</a></p></div>
    <SectionSummary current={`${snapshot.metadata.coveredOwners} covered hyperscalers have ${latestDeployment.itMw.toLocaleString()} MW of modeled operational IT capacity and ${latestCompute.h100e.toFixed(1)} million estimated H100 equivalents.`} conclusion="The expanding capacity base raises the revenue and workload volume needed to earn an adequate return."/>
    <div className="infra-tabs" role="tablist" aria-label="Physical buildout views">
      {([['deployment','Physical deployment'],['compute','Installed compute'],['conversion','CapEx conversion'],['usage','Capacity use']] as const).map(([id,label]) => <button key={id} role="tab" aria-selected={view===id} className={view===id?"selected":""} onClick={()=>setView(id)}>{label}</button>)}
    </div>

    {view === "deployment" && <div role="tabpanel" className="infra-panel">
      <div className="infra-kpis"><article><span>Operational IT capacity</span><strong>{(latestDeployment.itMw/1000).toFixed(2)} GW</strong><small>Five covered hyperscalers · latest milestone snapshot</small></article><article><span>Latest period addition</span><strong>+{(latestDeployment.additionMw!/1000).toFixed(2)} GW</strong><small>{latestDeployment.quarter} change · *partial quarter through 28 Sep</small></article><article><span>Current modeled project cost</span><strong>${snapshot.deploymentByOwner.reduce((sum,row)=>sum+row.capital,0).toFixed(1)}B</strong><small>2025 USD · current facility estimates</small></article></div>
      <div className="infra-layout"><div className="infra-chart"><div className="infra-chart-head"><div><b>Operational capacity</b><span>IT MW · bars show quarterly additions</span></div><span><i className="line-key"/>Capacity <i className="bar-key"/>Additions</span></div><DeploymentChart/></div><aside className="infra-ranking"><span>OWNER SNAPSHOT</span><h3>Alphabet has the largest covered footprint.</h3><OwnerBars metric="deployment"/></aside></div>
    </div>}

    {view === "compute" && <div role="tabpanel" className="infra-panel">
      <div className="infra-kpis"><article><span>Estimated installed compute</span><strong>{latestCompute.h100e.toFixed(2)}M</strong><small>H100 equivalents · median estimate</small></article><article><span>Estimate range</span><strong>{latestCompute.low.toFixed(1)}–{latestCompute.high.toFixed(1)}M</strong><small>Sum of owner-level 5th–95th percentile estimates</small></article><article><span>Chip thermal load</span><strong>{(latestCompute.chipMw/1000).toFixed(2)} GW</strong><small>Accelerator thermal design power</small></article></div>
      <div className="infra-layout"><div className="infra-chart"><div className="infra-chart-head"><div><b>Installed compute stock</b><span>Millions of H100 equivalents · shaded estimate range</span></div></div><ComputeChart/></div><aside className="infra-ranking"><span>OWNER SNAPSHOT</span><h3>Estimated compute remains concentrated.</h3><OwnerBars metric="compute"/></aside></div>
    </div>}

    {view === "conversion" && <div role="tabpanel" className="infra-panel">
      <div className="infra-conversion-intro"><div><span>TRAILING FOUR QUARTERS TO 2026Q1</span><h3>CapEx conversion varies widely by company and denominator.</h3></div><p>Different spending-to-capacity ratios highlight the importance of delivery and commissioning lags when assessing capital productivity.</p></div>
      <ConversionTable/>
    </div>}

    {view === "usage" && <div role="tabpanel" className="infra-panel">
      <div className="infra-conversion-intro"><div><span>CAPACITY-TO-WORKLOAD BRIDGE</span><h3>A single frontier training run absorbs only a small share of annual lab compute.</h3></div><p>Epoch estimates {snapshot.usageBridge.coveredLabH100e.toFixed(2)} million H100 equivalents used by {snapshot.usageBridge.coveredLabCount} covered frontier labs at year-end {snapshot.usageBridge.year}. Inference and other recurring workloads therefore matter most to fleet economics.</p></div>
      <div className="infra-usage-grid">{snapshot.usageBridge.trainingExamples.map(row=><article key={row.model}><span>{row.lab}</span><h3>{row.model}</h3><strong>{row.fleetYearSharePct.toFixed(2)}%</strong><p>of one year of estimated lab capacity for one training run at 30% effective utilization</p><small>{Math.round(row.trainingH100eYears).toLocaleString()} H100e-years / {Math.round(row.labH100e).toLocaleString()} H100e fleet</small></article>)}</div>
      <div className="infra-method"><b>Investment interpretation</b><p>Training runs alone do not explain the installed fleet. Inference, experiments, fine-tuning, concurrent development and cloud customers must absorb most capacity. The economically useful next metric is revenue or tokens per utilized H100e-hour.</p></div>
    </div>}
    <SectionNotes section="infrastructure" />
  </section>;
}
