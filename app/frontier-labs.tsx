"use client";

import { useState } from "react";
import SectionSummary from "./section-summary";

type LabView = "Both" | "OpenAI" | "Anthropic";
type LabName = Exclude<LabView, "Both">;

const periods = ["Dec-24", "Jun-25", "Oct-25", "Dec-25", "Feb-26", "Mar-26", "Jul-26", "Aug-26"] as const;
const arrSeries: Record<LabName, readonly (number | null)[]> = {
  OpenAI: [null, null, null, 20, 21.4, 25, null, 40],
  Anthropic: [1, 3, 7, 9, 14, 19.5, 65, null],
};

const labMetrics = {
  OpenAI: { latest: ">$40B", period: "Jul–Aug 2026", q1: "$5.70B", q2: "$6.70B", growth: "+17.5%", tone: "Measured acceleration" },
  Anthropic: { latest: ">$65B", period: "Jul 2026", q1: "$4.73B", q2: ">$11.50B", growth: ">+143%", tone: "Preliminary step-up" },
} as const;

function FrontierArrChart({ view }: { view: LabView }) {
  const shown = view === "Both" ? (["OpenAI", "Anthropic"] as const) : ([view] as const);
  const colors: Record<LabName, string> = { OpenAI: "#1d7f80", Anthropic: "#d88952" };
  const w = 960, h = 330, l = 58, r = 18, t = 24, b = 48, max = 70;
  const x = (i: number) => l + i * (w - l - r) / (periods.length - 1);
  const y = (v: number) => t + (max - v) * (h - t - b) / max;

  return <svg className="line-chart labs-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Reported annualized revenue run rate for OpenAI and Anthropic">
    <title>Reported annualized revenue run rate in US dollars billions; floors and approximate values retained</title>
    {[0, 20, 40, 60].map(v => <g key={v}><line x1={l} x2={w-r} y1={y(v)} y2={y(v)} className="grid-line"/><text x={l-10} y={y(v)+4} textAnchor="end">${v}B</text></g>)}
    {shown.map(lab => {
      const observations = arrSeries[lab].map((value, index) => ({ value, index })).filter((item): item is {value:number;index:number} => item.value !== null);
      return <g key={lab}>
        <polyline points={observations.map(item => `${x(item.index)},${y(item.value)}`).join(" ")} fill="none" stroke={colors[lab]} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
        {observations.map((item, observationIndex) => <circle key={`${lab}-${item.index}`} cx={x(item.index)} cy={y(item.value)} r={observationIndex===observations.length-1?6:4} fill={colors[lab]} stroke="#f7f3ea" strokeWidth="2"><title>{`${lab} ${periods[item.index]}: ${item.value}B reported run rate`}</title></circle>)}
      </g>;
    })}
    {periods.map((period, index) => <text key={period} x={x(index)} y={h-16} textAnchor="middle">{period}</text>)}
  </svg>;
}

export default function FrontierLabs() {
  const [view, setView] = useState<LabView>("Both");
  const shownLabs = view === "Both" ? (["OpenAI", "Anthropic"] as const) : ([view] as const);

  return <section className="section labs-section" id="labs">
    <div className="section-head labs-head">
      <div><div className="eyebrow">PAID DEMAND · FRONTIER LAB MONETIZATION</div><h2>Reported lab revenue provides evidence of paid demand.</h2></div>
      <div className="labs-switch" role="group" aria-label="Select frontier model lab">
        {(["Both", "OpenAI", "Anthropic"] as const).map(option => <button key={option} type="button" aria-pressed={view===option} className={view===option?"selected":""} onClick={()=>setView(option)}>{option}</button>)}
      </div>
    </div>

    <SectionSummary about="Collects reported revenue and annualized run-rate observations for OpenAI and Anthropic as evidence of paid model demand." current="Both labs report large and rapidly growing revenue run rates, but dates, definitions and disclosure quality differ." conclusion="The data strengthens the demand side of the story. Margins, cash burn and compute commitments are still needed to connect that demand to infrastructure returns."/>

    <div className="labs-kpis">
      {shownLabs.map(lab => <article key={lab} className={`lab-card ${lab.toLowerCase()}`}>
        <header><span>{lab}</span><small>{labMetrics[lab].tone}</small></header>
        <div className="lab-arr"><span>Latest reported ARR / run rate</span><strong>{labMetrics[lab].latest}</strong><small>{labMetrics[lab].period}</small></div>
        <div className="lab-quarter-grid"><div><span>Q1 2026 revenue</span><b>{labMetrics[lab].q1}</b></div><div><span>Q2 2026 revenue</span><b>{labMetrics[lab].q2}</b></div><div><span>Sequential growth</span><b>{labMetrics[lab].growth}</b></div></div>
      </article>)}
    </div>

    <div className="labs-layout">
      <div className="chart-panel labs-chart-panel">
        <div className="chart-meta"><div><b>Reported ARR / revenue run rate</b><span>USD billions annualized · reported floors and approximate points</span></div><div className="labs-legend">{shownLabs.map(lab=><span key={lab}><i className={lab.toLowerCase()}/>{lab}</span>)}</div></div>
        <FrontierArrChart view={view}/>
        <div className="chart-callout"><b>Directionally comparable, not accounting-equivalent:</b> “Greater than” values are plotted at their reported floor, and Anthropic’s $19–20B range uses its midpoint. ARR definitions have not been reconciled to recognized revenue. <a className="source-chip" href="#source-S10">S10</a></div>
      </div>
      <aside className="labs-readthrough">
        <span className="detail-kicker">ANALYTICAL ASSESSMENT</span>
        <div><b>Scale</b><p>Both labs report large revenue run rates. Different observation dates and definitions limit a direct ranking.</p></div>
        <div><b>Acceleration</b><p>Recognized quarterly revenue is the cleaner comparison: OpenAI grew 17.5% sequentially, while Anthropic’s preliminary Q2 floor implies growth above 143%.</p></div>
        <div><b>Link to infrastructure</b><p>Lab revenue supports the demand case. Margins, cash burn and compute commitments determine how much value remains with the labs and how much flows to infrastructure providers.</p></div>
      </aside>
    </div>

    <details className="labs-method">
      <summary>Definitions, comparability and limitations</summary>
      <div><p><b>ARR / run rate:</b> a point-in-time annualization that may include usage, subscriptions or contracted business; it is not treated as GAAP revenue.</p><p><b>Margins:</b> OpenAI’s compute margin and Anthropic’s estimated gross margin are excluded from the headline comparison because their cost definitions differ.</p><p><b>Required evidence:</b> quarterly revenue, cash burn, cloud commitments and contracted compute demand would improve the comparison with hyperscaler CapEx.</p></div>
    </details>
  </section>;
}
