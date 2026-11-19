"use client";

import {useState, type ReactNode} from "react";
import {HeatmapInfoLabel} from "./heatmap-pillar-label";
import {weeklyPulse as rows} from "./weekly-pulse-snapshot";
import {weeklyPillars, weeklySignals, weeklySignalCount, type WeeklyPillar} from "./weekly-pulse-signals";
import "./weekly-pulse-heatmap.css";

type Selection = "Weekly pulse" | WeeklyPillar;

const weeks = rows.map(row => {
  const signals = weeklySignals.map(signal => {
    const score = row[signal.score];
    const weight = score === null ? 0 : 1 / row.signals_available;
    return {
      label: signal.label,
      pillar: signal.pillar,
      growth: row[signal.growth],
      score,
      weight,
      contribution: score === null ? null : (score - 50) * weight,
    };
  });
  const pillars = weeklyPillars.map(label => {
    const members = signals.filter(signal => signal.pillar === label);
    const scored = members.filter(signal => signal.score !== null);
    const weight = scored.reduce((sum, signal) => sum + signal.weight, 0);
    const contribution = scored.reduce((sum, signal) => sum + (signal.contribution ?? 0), 0);
    const score = scored.length ? scored.reduce((sum, signal) => sum + (signal.score ?? 0), 0) / scored.length : null;
    return {label, score, weight, contribution: weight ? contribution : null, available: scored.length, total: members.length};
  });
  return {row, signals, pillars};
});
type Week = typeof weeks[number];
type HeatRow = {
  label: string;
  selection: Selection;
  subtitle: ReactNode;
  description: string;
  reading: (week: Week) => {score: number | null; partial: boolean};
  constituent?: boolean;
};

const overviewRows: HeatRow[] = [
  {
    label: "Weekly pulse",
    selection: "Weekly pulse",
    subtitle: "Available signals reweighted",
    description: "Available weekly signals share equal weight. Select the pulse to see how much each pillar contributes to the score.",
    reading: ({row}) => ({score: row.pulse, partial: row.signals_available > 0 && row.signals_available < weeklySignalCount}),
  },
  ...weeklyPillars.map((pillar, index): HeatRow => {
    const count = weeklySignals.filter(signal => signal.pillar === pillar).length;
    return {
      label: pillar,
      selection: pillar,
      subtitle: `${count} weekly ${count === 1 ? "signal" : "signals"}`,
      description: "Average score of this pillar’s available weekly signals. Select the pillar to see its constituent history, scoring, and contributions.",
      reading: ({pillars}) => {
        const {score, available, total} = pillars[index];
        return {score, partial: available > 0 && available < total};
      },
    };
  }),
];

function heat(value: number | null) {
  if (value === null) return {background: "#e4e1d9", color: "#65716e"};
  const neutral = [245, 242, 233], end = value >= 50 ? [29, 127, 128] : [180, 93, 80];
  const strength = Math.abs(value - 50) / 50;
  return {background: `rgb(${neutral.map((v,i) => Math.round(v + (end[i] - v) * strength)).join(",")})`, color: strength > .65 ? "#fff" : "#183b63"};
}

const number = (value: number | null, suffix = "") => value === null ? "—" : `${value.toFixed(2)}${suffix}`;
const contributionPoints = (value: number | null) =>
  value === null ? "—" : `${value > 0 ? "+" : ""}${value.toFixed(2)} pts`;

export default function WeeklyPulseHeatmap() {
  const [selected, setSelected] = useState(rows.findLast(row => row.pulse !== null)!.week_end);
  const [selection, setSelection] = useState<Selection>("Weekly pulse");
  const [history, setHistory] = useState("26");
  const visible = history === "all" ? weeks : weeks.slice(-Number(history));
  const {row, signals, pillars} = weeks.find(week => week.row.week_end === selected)!;
  const showPillars = selection === "Weekly pulse";
  const net = signals.reduce((sum, signal) => sum + (signal.contribution ?? 0), 0);

  const constituentRows = weeklySignals.filter(signal => signal.pillar === selection).map((signal): HeatRow => {
    const latest = rows.findLast(row => row[signal.score] !== null)?.week_end;
    return {
      label: signal.label,
      selection: signal.pillar,
      subtitle: latest ? <>Through <time dateTime={latest}>{latest}</time></> : "Awaiting scored week",
      description: signal.method,
      reading: ({row}) => ({score: row[signal.score], partial: false}),
      constituent: true,
    };
  });
  const heatmapRows = overviewRows.flatMap(item =>
    item.selection === selection ? [item, ...constituentRows] : [item]);

  const contributions = (showPillars ? pillars : signals.filter(signal => signal.pillar === selection))
    .toSorted((a, b) => Math.abs(b.contribution ?? 0) - Math.abs(a.contribution ?? 0));
  const selectedPillar = pillars.find(pillar => pillar.label === selection);

  return <div className="weekly-decomposition research-card">
    <div className="weekly-heatmap-heading">
      <div><h4>Weekly pulse · pillar heatmap</h4><p>Select a pillar to see its weekly signals. Hyperscaler CapEx is tracked on the monthly tab using quarterly reports.</p></div>
      <label>History <select aria-label="Weekly heatmap history" value={history} onChange={e => setHistory(e.target.value)}>
        <option value="13">Latest 13 weeks</option><option value="26">Latest 26 weeks</option><option value="all">All weeks</option>
      </select></label>
    </div>
    <div className="weekly-heat-key"><span>0 · below norm</span><i aria-hidden="true"/><span>50 · norm</span><span>100 · above norm</span><span>— unavailable · * partial coverage</span></div>
    <div className="weekly-table-scroll" role="region" aria-label="Weekly pulse heatmap" tabIndex={0}>
      <table className="weekly-heat-table">
        <caption>Weeks ending {visible[0].row.week_end} through {visible.at(-1)!.row.week_end}</caption>
        <thead><tr><th scope="col">Pillar / signal</th>{visible.map(({row}) => <th scope="col" key={row.week_end}><span>{row.week_end.slice(0,4)}</span>{row.week_end.slice(5)}</th>)}</tr></thead>
        <tbody>
          {heatmapRows.map(item => <tr key={item.label} className={item.constituent ? "weekly-constituent" : undefined}>
            <th scope="row"><HeatmapInfoLabel
              label={item.label}
              subtitle={item.subtitle}
              description={item.description}
              heading={item.constituent ? "4W vs prior 4W · Z-score" : undefined}
              className="weekly-row-label"
              selected={item.constituent ? undefined : selection === item.selection}
              onSelect={item.constituent ? undefined : () => setSelection(item.selection)}
            /></th>
            {visible.map(week => {
              const {week_end: date} = week.row;
              const {score, partial} = item.reading(week);
              return <td key={date}><button
                type="button"
                style={heat(score)}
                aria-pressed={date === selected && selection === item.selection}
                aria-label={`${item.label}, ${date}: ${number(score)}${partial ? ", partial coverage" : ""}`}
                onClick={() => {setSelection(item.selection); setSelected(date);}}
              >{score === null ? "—" : score.toFixed(0)}{partial ? "*" : ""}</button></td>;
            })}
          </tr>)}
          <tr className="weekly-coverage"><th scope="row">Signals available</th>{visible.map(({row}) => <td key={row.week_end}>{row.signals_available}/{weeklySignalCount}</td>)}</tr>
        </tbody>
      </table>
    </div>
    <div className="weekly-calculation" aria-live="polite">
      <div className="weekly-heatmap-heading">
        <div><h4>{showPillars ? "Largest supports and drags" : `${selection} · selected constituents`}</h4>
          <p>{selectedPillar
            ? `${selectedPillar.available}/${selectedPillar.total} weekly signals · ${number(selectedPillar.weight * 100, "%")} effective pulse weight`
            : "Weekly pulse by pillar · contributions relative to 50"}</p></div>
        <label>Week <select aria-label="Weekly pulse calculation week" value={selected} onChange={e => setSelected(e.target.value)}>
          {rows.toReversed().map(row => <option key={row.week_end} value={row.week_end}>{row.week_end}{row.signals_available === 0 ? " · unavailable" : row.signals_available < weeklySignalCount ? " · partial" : ""}</option>)}
        </select></label>
      </div>
      <p>{row.pulse === null
        ? "No qualifying signals this week. The pulse is unavailable."
        : `50 ${net < 0 ? "−" : "+"} ${Math.abs(net).toFixed(2)} = ${row.pulse.toFixed(2)} pulse points · ${row.signals_available}/${weeklySignalCount} signals available.`}</p>
      <div className="weekly-table-scroll">
        <table className="weekly-calculation-table">
          <thead><tr><th scope="col">{showPillars ? "Pillar" : "Signal"}</th>{!showPillars && <th scope="col">4W vs prior 4W</th>}<th scope="col">Score</th><th scope="col">Effective pulse weight</th><th scope="col">Contribution vs 50</th></tr></thead>
          <tbody>{contributions.map(item => <tr key={item.label}>
            <th scope="row">{item.label}</th>
            {"growth" in item && <td>{number(item.growth, "%")}</td>}
            <td>{number(item.score)}</td>
            <td>{number(item.weight * 100, "%")}</td>
            <td className={item.contribution === null || item.contribution === 0 ? undefined : item.contribution > 0 ? "positive" : "negative"}>{contributionPoints(item.contribution)}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="research-note">Pillar contributions sum their weekly signals’ contributions. Each available signal has equal weight in the pulse. The number of available signals determines each pillar’s weight.</p>
    </div>
    <details><summary>Scoring and coverage</summary><p>Each signal compares four completed weeks with the prior four, requiring all eight observations. OpenRouter requires seven covered days per week; Ramp requires at least 95% matched-price coverage. OpenRouter and Ramp use 31 matched weeks in 2025. Card spending uses 45 matched weeks from November 30, 2025 through October 4, 2026. Token affordability measures the change in tokens per dollar implied by the Bloomberg SDLLMTK price proxy. It uses 39 calibration weeks through October 18, 2026. Each price week requires seven saved daily values, which can include carried quotes. Hardware prices use Bloomberg observations from AI_Infra.xlsx. Weekly averages require at least four saved weekdays in a completed week. Rising prices score as stronger pricing momentum. Hardware baselines use qualifying weeks through November 1, 2026. Each score uses 50 + 15 × (growth − baseline mean) / sample standard deviation, bounded to 0–100. This retrospective calibration is not a real-time backtest.</p><p>XSOX versus SPXT is shown separately as a market reference.</p></details>
  </div>;
}
