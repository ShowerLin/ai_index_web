"use client";
import EvidenceCard from "./evidence-card";
import ChartLegend from "./chart-legend";

import SectionNotes from "./section-notes";

import { useState } from "react";
import SectionSummary from "./section-summary";
import { frontierLabsSnapshot as snapshot } from "./frontier-labs-snapshot";

type LabView = "Both" | "OpenAI" | "Anthropic";
type LabName = Exclude<LabView, "Both">;

function FrontierArrChart({ view }: { view: LabView }) {
  const shown = view === "Both" ? (["OpenAI", "Anthropic"] as const) : ([view] as const);
  const colors: Record<LabName, string> = { OpenAI: "#1d7f80", Anthropic: "#d88952" };
  const w = 960, h = 330, l = 58, r = 18, t = 24, b = 48, max = 80;
  const start = new Date("2024-12-01T00:00:00Z").valueOf();
  const end = new Date(`${snapshot.metadata.asOf}T00:00:00Z`).valueOf();
  const x = (date: string) => l + (new Date(`${date}T00:00:00Z`).valueOf() - start) * (w - l - r) / (end - start);
  const y = (v: number) => t + (max - v) * (h - t - b) / max;
  const ticks = [{date:"2024-12-31",label:"Dec-24"},{date:"2025-06-30",label:"Jun-25"},{date:"2025-12-31",label:"Dec-25"},{date:"2026-03-31",label:"Mar-26"},{date:snapshot.metadata.asOf,label:"Sep-26"}] as const;

  return <svg className="line-chart labs-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Reported annualized revenue run rate for OpenAI and Anthropic">
    <title>Reported annualized revenue run rate in US dollars billions; floors and approximate values retained</title>
    {[0, 20, 40, 60, 80].map(v => <g key={v}><line x1={l} x2={w-r} y1={y(v)} y2={y(v)} className="grid-line"/><text x={l-10} y={y(v)+4} textAnchor="end">${v}B</text></g>)}
    {shown.map(lab => {
      const observations = snapshot.labs[lab].series;
      return <g key={lab}>
        <polyline points={observations.map(item => `${x(item.date)},${y(item.value)}`).join(" ")} fill="none" stroke={colors[lab]} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
        {observations.map((item, observationIndex) => <circle key={`${lab}-${item.date}-${item.value}`} cx={x(item.date)} cy={y(item.value)} r={observationIndex===observations.length-1?6:4} fill={colors[lab]} stroke="#fbfaf5" strokeWidth="2"><title>{`${lab} ${item.label}: $${item.value}B ${item.type.toLowerCase()} · ${item.confidence} · ${item.note}`}</title></circle>)}
      </g>;
    })}
    {ticks.map(tick => <text key={tick.date} x={x(tick.date)} y={h-16} textAnchor="middle">{tick.label}</text>)}
  </svg>;
}

export default function FrontierLabs({compact=false}:{compact?:boolean}={}) {
  const [view, setView] = useState<LabView>("Both");
  const shownLabs = view === "Both" ? (["OpenAI", "Anthropic"] as const) : ([view] as const);

  if(compact) return <><EvidenceCard id="labs" title="Frontier-lab revenue run rates" unit="USD billions annualized · OpenAI / Anthropic" source="S10" legend={<ChartLegend items={[{label:"OpenAI",color:"#1d7f80"},{label:"Anthropic",color:"#d88952"}]}/>} note="Reported floors and approximate observations; annualized run rates differ from recognized revenue."><FrontierArrChart view="Both"/></EvidenceCard><details className="evidence-data"><summary>Lab observations and revenue definitions</summary><FrontierLabs/></details></>;
  return <section className="section labs-section" id="labs-detail">
    <div className="section-head labs-head">
      <div><div className="eyebrow">PAID DEMAND · FRONTIER LAB MONETIZATION</div><h2>Reported lab revenue provides evidence of paid demand.</h2></div>
      <div className="labs-switch" role="group" aria-label="Select frontier model lab">
        {(["Both", "OpenAI", "Anthropic"] as const).map(option => <button key={option} type="button" aria-pressed={view===option} className={view===option?"selected":""} onClick={()=>setView(option)}>{option}</button>)}
      </div>
    </div>

    <SectionSummary current={`The latest reports put OpenAI near a $70B annualized revenue run rate on September 29, 2026, while Anthropic’s latest observation is ${snapshot.labs.Anthropic.latest} on ${snapshot.labs.Anthropic.latestDate}. The observations cover different dates.`} conclusion="Revenue growth supports the paid-demand case; serving margins and compute commitments will determine how much of that demand becomes profit."/>

    <div className="labs-kpis">
      {shownLabs.map(lab => <article key={lab} className={`lab-card ${lab.toLowerCase()}`}>
        <header><span>{lab}</span><small>{snapshot.labs[lab].latestConfidence} confidence</small></header>
        <div className="lab-arr"><span>Latest reported ARR / run rate</span><strong>{snapshot.labs[lab].latest}</strong><small>{snapshot.labs[lab].latestDate} · <a href={snapshot.labs[lab].latestSource} target="_blank" rel="noreferrer">Source report</a></small></div>
        <div className="lab-quarter-grid"><div><span>FY2025 revenue</span><b>{snapshot.labs[lab].fy2025Revenue}</b></div><div><span>End-2025 run rate</span><b>{snapshot.labs[lab].end2025RunRate}</b></div><div><span>Growth since end-2025</span><b>+{snapshot.labs[lab].growthFromEnd2025.toFixed(1)}%</b></div></div>
      </article>)}
    </div>

    <div className="labs-layout">
      <div className="chart-panel labs-chart-panel">
        <div className="chart-meta"><div><b>Reported ARR / revenue run rate</b><span>USD billions annualized · reported floors and approximate points</span></div><div className="labs-legend">{shownLabs.map(lab=><span key={lab}><i className={lab.toLowerCase()}/>{lab}</span>)}</div></div>
        <FrontierArrChart view={view}/>

      </div>
      <aside className="labs-readthrough">
        <span className="detail-kicker">ANALYTICAL ASSESSMENT</span>
        <div><b>Scale</b><p>Reported run rates indicate substantial commercial scale, but do not establish cash available to meet cloud commitments.</p></div>
        <div><b>Acceleration</b><p>Relative to end-2025, OpenAI’s latest reported run rate is approximately {snapshot.labs.OpenAI.growthFromEnd2025.toFixed(1)}% higher, while Anthropic’s is {snapshot.labs.Anthropic.growthFromEnd2025.toFixed(1)}% higher. Different observation dates and approximate values limit direct comparison. FY2025 recognized revenue appears separately.</p></div>
        <div><b>Link to infrastructure</b><p>Lab revenue supports the demand case. Margins, cash burn and compute commitments determine how much value remains with the labs and how much flows to infrastructure providers.</p></div>
      </aside>
    </div>

    <SectionNotes section="labs" />
  </section>;
}
