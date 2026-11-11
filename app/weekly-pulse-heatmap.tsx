"use client";

import {useState} from "react";
import {weeklyPulse as rows} from "./weekly-pulse-snapshot";
import "./weekly-pulse-heatmap.css";

const signals = [
  {label: "OpenRouter token volume", score: "openrouter_score", growth: "openrouter_momentum_pct"},
  {label: "Ramp matched spending", score: "ramp_spending_score", growth: "ramp_spending_momentum_pct"},
  {label: "U.S. consumer card spending", score: "consumer_card_score", growth: "consumer_card_momentum_pct"},
  {label: "Token affordability", score: "token_affordability_score", growth: "token_affordability_momentum_pct"},
  {label: "H100 rental", score: "h100_rental_score", growth: "h100_rental_momentum_pct"},
  {label: "B200 rental", score: "b200_rental_score", growth: "b200_rental_momentum_pct"},
  {label: "DDR5 spot price", score: "ddr5_spot_score", growth: "ddr5_spot_momentum_pct"},
  {label: "NAND spot price", score: "nand_spot_score", growth: "nand_spot_momentum_pct"},
] as const;
const heatRows = [{label: "Weekly pulse", score: "pulse"}, ...signals] as const;
export const weeklySignalCount = signals.length;
const signalCount = weeklySignalCount;
function heat(value: number | null) {
  if (value === null) return {background: "#e4e1d9", color: "#65716e"};
  const neutral = [245, 242, 233], end = value >= 50 ? [29, 127, 128] : [180, 93, 80];
  const strength = Math.abs(value - 50) / 50;
  return {background: `rgb(${neutral.map((v,i) => Math.round(v + (end[i] - v) * strength)).join(",")})`, color: strength > .65 ? "#fff" : "#183b63"};
}
const number = (v: number | null, suffix = "") => v === null ? "—" : `${v.toFixed(2)}${suffix}`;
export default function WeeklyPulseHeatmap() {
  const [selected, setSelected] = useState(rows.filter(r => r.pulse !== null).at(-1)!.week_end);
  const [window, setWindow] = useState("26");
  const visible = window === "all" ? rows : rows.slice(-Number(window));
  const row = rows.find(r => r.week_end === selected)!;
  const contributions = signals.map(s => ({...s, value: row[s.score], weight: row[s.score] === null ? 0 : 1 / row.signals_available}));
  const net = contributions.reduce((sum,s) => sum + (s.value === null ? 0 : (s.value - 50) * s.weight), 0);
  return <div className="weekly-decomposition research-card">
    <div className="weekly-heatmap-heading"><div><h4>Weekly pulse · signal breakdown</h4><p>Normalized scores · 50 = typical momentum · select a week to inspect its calculation</p></div>
      <label>History <select aria-label="Weekly heatmap history" value={window} onChange={e=>setWindow(e.target.value)}><option value="13">Latest 13 weeks</option><option value="26">Latest 26 weeks</option><option value="all">All weeks</option></select></label>
    </div>
    <div className="weekly-heat-key"><span>0 · below norm</span><i aria-hidden="true"/><span>50 · norm</span><span>100 · above norm</span><span>— unavailable · * partial coverage</span></div>
    <div className="weekly-table-scroll" role="region" aria-label="Weekly pulse heatmap" tabIndex={0}>
      <table className="weekly-heat-table"><caption>Week ending · {visible[0].week_end.slice(0,4)}–{visible.at(-1)!.week_end.slice(0,4)}</caption><thead><tr><th scope="col">Signal / nominal weight</th>{visible.map(r=><th scope="col" key={r.week_end}><span>{r.week_end.slice(0,4)}</span>{r.week_end.slice(5)}</th>)}</tr></thead>
        <tbody>{heatRows.map(s=><tr key={s.score}><th scope="row">{s.label}<small>{s.score === "pulse" ? "Available signals reweighted" : "12.5% when all available"}</small></th>{visible.map(r=><td key={r.week_end}><button type="button" style={heat(r[s.score])} aria-pressed={r.week_end===selected} aria-label={`${s.label}, ${r.week_end}: ${number(r[s.score])}${r.signals_available>0&&r.signals_available<signalCount ? ', partial coverage' : ''}`} onClick={()=>setSelected(r.week_end)}>{r[s.score]===null ? "—" : r[s.score]!.toFixed(0)}{s.score==="pulse"&&r.signals_available>0&&r.signals_available<signalCount ? "*" : ""}</button></td>)}</tr>)}
        <tr className="weekly-coverage"><th scope="row">Signals available</th>{visible.map(r=><td key={r.week_end}>{r.signals_available}/{signalCount}</td>)}</tr></tbody>
      </table>
    </div>
    <div className="weekly-calculation" aria-live="polite">
      <div className="weekly-heatmap-heading"><h4>Calculation · week ended {row.week_end}</h4><label>Week <select aria-label="Weekly pulse calculation week" value={selected} onChange={e=>setSelected(e.target.value)}>{[...rows].reverse().map(r=><option key={r.week_end} value={r.week_end}>{r.week_end}{r.signals_available>0&&r.signals_available<signalCount ? " · partial" : r.signals_available===0 ? " · unavailable" : ""}</option>)}</select></label></div>
      <p>{row.pulse===null ? "No qualifying signals this week. The pulse is unavailable." : `50 ${net < 0 ? '−' : '+'} ${Math.abs(net).toFixed(2)} = ${row.pulse.toFixed(2)} pulse points · ${row.signals_available}/${signalCount} signals available.`}</p>
      <div className="weekly-table-scroll"><table className="weekly-calculation-table"><thead><tr><th scope="col">Signal</th><th scope="col">4W vs prior 4W</th><th scope="col">Score</th><th scope="col">Effective weight</th><th scope="col">Contribution vs 50</th></tr></thead><tbody>{contributions.map(s=><tr key={s.score}><th scope="row">{s.label}</th><td>{number(row[s.growth], "%")}</td><td>{number(s.value)}</td><td>{Number((s.weight*100).toFixed(1))}%</td><td>{s.value===null ? "—" : `${(s.value-50)*s.weight>=0 ? '+' : ''}${((s.value-50)*s.weight).toFixed(2)} pts`}</td></tr>)}</tbody></table></div>
      <p className="research-note">Positive contributions lift the pulse above its historical norm; negative contributions pull it below. A below-normal score can still accompany positive growth. Missing signals receive zero weight; available signals share the weight equally. Displayed contributions may differ by 0.01 due to rounding.</p>
    </div>
    <details><summary>Scoring and coverage</summary><p>Each signal compares four completed weeks with the prior four, requiring all eight observations. OpenRouter requires seven covered days per week; Ramp requires at least 95% matched-price coverage. OpenRouter and Ramp use 31 matched weeks in 2025. Card spending uses 45 matched weeks from November 30, 2025 through October 4, 2026. Token affordability measures the change in tokens per dollar implied by the Bloomberg SDLLMTK price proxy. It uses 39 calibration weeks through October 18, 2026. Each price week requires seven saved daily values, which can include carried quotes. Hardware prices use Bloomberg observations from AI_Infra.xlsx. Weekly averages require at least four saved weekdays in a completed week. Rising prices score as stronger pricing momentum. Hardware baselines use qualifying weeks through November 1, 2026. Each score uses 50 + 15 × (growth − baseline mean) / sample standard deviation, bounded to 0–100. This retrospective calibration is not a real-time backtest.</p><p>XSOX versus SPXT is shown separately as a market reference.</p></details>
  </div>;
}
