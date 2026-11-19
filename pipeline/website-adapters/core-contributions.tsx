"use client";

import {useState} from "react";
import {coreContributionSnapshot as snapshot} from "./core-contribution-snapshot";

type Month = (typeof snapshot.months)[number];
type Contribution = {name: string; weight: number; points: number};

function attribution(month: Month, pillar?: string) {
  const rows = pillar ? month.rows.filter(row => row.pillar === pillar) : month.rows;
  const weight = rows.reduce((total, row) => total + row.effectiveWeight, 0);
  const entries = new Map<string, Contribution>();
  for (const row of rows) {
    const key = pillar ? row.ticker : row.pillar;
    const entry = entries.get(key) ?? {name: pillar ? row.name : row.pillar, weight: 0, points: 0};
    entry.weight += weight ? row.effectiveWeight / weight : 0;
    entry.points += weight ? (row.contribution ?? 0) / weight : 0;
    entries.set(key, entry);
  }
  const score = pillar
    ? weight ? 50 + [...entries.values()].reduce((total, entry) => total + entry.points, 0) : null
    : month.score;
  return {entries, score, available: rows.filter(row => row.effectiveWeight > 0).length, total: rows.length};
}

const format = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(2)}`;

export default function CoreContributions({month, onMonthChange, pillar}: {
  month: string;
  onMonthChange: (month: string) => void;
  pillar?: string;
}) {
  const [mode, setMode] = useState<"level" | "change">("level");
  const [all, setAll] = useState(false);
  const current = snapshot.months.find(row => row.month === month)!;
  const previousDate = new Date(`${month}-01T00:00:00Z`);
  previousDate.setUTCMonth(previousDate.getUTCMonth() - 1);
  const previous = snapshot.months.find(row => row.month === previousDate.toISOString().slice(0, 7));
  const now = attribution(current, pillar);
  const prior = previous && attribution(previous, pillar);
  const complete = now.score !== null && (mode === "level" || prior?.score != null);
  const ranked = [...now.entries].map(([key, entry]) => {
    const previousEntry = prior?.entries.get(key);
    const available = entry.weight > 0 || (mode === "change" && (previousEntry?.weight ?? 0) > 0);
    const value = available ? entry.points - (mode === "change" ? previousEntry?.points ?? 0 : 0) : null;
    return {...entry, key, value};
  }).sort((a, b) => (Math.abs(b.value ?? 0) - Math.abs(a.value ?? 0)));
  const changed = ranked.filter(row => row.value !== null && row.value !== 0);
  const rows = !pillar || all || changed.length === 0 ? ranked : [
    ...changed.filter(row => row.value! > 0).slice(0, 4),
    ...changed.filter(row => row.value! < 0).slice(0, 4),
  ];
  const max = Math.max(1, ...ranked.map(row => Math.abs(row.value ?? 0)));
  const sum = ranked.reduce((total, row) => total + (row.value ?? 0), 0);
  const residual = current.previousVersionScore === null || current.score === null
    ? null : current.score - current.previousVersionScore;
  const unit = pillar ? "pillar points" : "index points";
  const supports = mode === "level" ? "the level" : "the change";

  return <section className="core-contributions" aria-labelledby="contribution-heading">
    <div className="contribution-head">
      <div><h3 id="contribution-heading">Largest supports and drags</h3>
        <p>{pillar ?? "Core Index by pillar"} · {unit} · {mode === "level" ? "relative to 50" : "change from preceding month"}</p></div>
      <label>Month <select aria-label="Contribution month" value={month} onChange={e => onMonthChange(e.target.value)}>
        {snapshot.months.map(row => <option key={row.month}>{row.month}</option>)}
      </select></label>
    </div>
    <p>{now.available} of {now.total} constituents available{pillar ? ` in ${pillar}` : ` across ${current.availablePillars} of 4 pillars`}.</p>
    <div className="contribution-layout"><div className="contribution-context">
      <div className="contribution-mode" role="group" aria-label="Contribution basis">
        <button aria-pressed={mode === "level"} onClick={() => setMode("level")}>Above / below norm</button>
        <button aria-pressed={mode === "change"} onClick={() => setMode("change")}>Monthly change</button>
      </div>
      {pillar ? <dl>
        <div><dt>{pillar} score</dt><dd>{now.score?.toFixed(2) ?? "n/a"}</dd></div>
        <div><dt>Previous month</dt><dd>{prior?.score?.toFixed(2) ?? "n/a"}</dd></div>
      </dl> : <dl>
        <div><dt>Previous v2.7 score</dt><dd>{current.previousVersionScore?.toFixed(2) ?? "n/a"}</dd></div>
        <div><dt>Revised core score</dt><dd>{current.score?.toFixed(2) ?? "n/a"}</dd></div>
        <div><dt>Methodology change</dt><dd>{residual === null ? "n/a" : format(residual)}</dd></div>
      </dl>}
      <p className="contribution-reconciliation">{complete
        ? mode === "level"
          ? `50 ${sum >= 0 ? "+" : "−"} ${Math.abs(sum).toFixed(2)} = ${now.score!.toFixed(2)} ${unit}.`
          : `Contributions sum to ${format(sum)} ${unit} of monthly change.`
        : mode === "level" ? "A scored observation is required for attribution." : "Both months need a score for attribution."}</p>
      <details><summary>Calculation and coverage</summary><table className="core-treatment-table"><thead><tr><th>Constituents</th><th>Scoring signal</th></tr></thead><tbody><tr><td>Adoption breadth</td><td>Current business use, expected use and Ramp paid adoption levels; 4.1667% nominal core weight each</td></tr><tr><td>Ramp median AI spend per employee</td><td>YoY growth of the trailing three-month average median</td></tr><tr><td>OpenRouter and Ramp token volume</td><td>Percentile rank of month-over-month growth in the trailing three-month average. Each source carries 6.25% nominal core weight in Adoption.</td></tr><tr><td>Monetization business paid demand</td><td>Ramp median spending, Ramp matched spending growth and OpenRouter estimated routed-spending growth; 5% nominal core weight each. Spending-growth calibration remains provisional</td></tr><tr><td>Exports, orders, imports</td><td>TTM total YoY growth</td></tr><tr><td>Construction, industrial production</td><td>12M average YoY growth</td></tr><tr><td>Supply</td><td>Five-company CapEx TTM YoY growth (10%); DDR5 and H100 price momentum uses independently calibrated log YoY ratios (5% each). Forecasts and supplier financials are context.</td></tr></tbody></table><p>{snapshot.metadata.method}</p><p>{snapshot.metadata.supplyMethod}</p><p>{snapshot.metadata.demandMethod} <a href="https://investor.tsmc.com/english/monthly-revenue/2023">TSMC 2023</a> · <a href="https://investor.tsmc.com/schinese/monthly-revenue/2024">TSMC 2024</a></p><p>{snapshot.metadata.tokenMethod} The spending-growth baselines contain six observations each, January–June 2026; calibration is provisional.</p><p>{snapshot.metadata.rampMethod} Spending prices, mix and sample composition affect interpretation; 20 calibration observations limit robustness.</p><p>Token-volume scores are growth percentiles, with 50 at the median rank. Other constituent scores are rescaled z-scores, with 50 at the baseline mean. Composite changes describe strengthening or weakening relative to that baseline. Financial tightening is assessed separately through credit and funding indicators.</p><p>The card-spending baseline is January–June 2026. Nominal pillar weights are 25% each. {snapshot.metadata.adoptionMethod} {snapshot.metadata.monetizationMethod} Missing weights are redistributed within each pillar, then across available pillars.</p><p>{snapshot.metadata.labRevenueMethod} Frozen level baselines use {snapshot.metadata.labRunRateBaseline.OpenAI.count} OpenAI disclosures and {snapshot.metadata.labRunRateBaseline.Anthropic.count} Anthropic disclosures.</p><p>Short momentum: contextual adoption-rate changes in percentage points, and three-month-average YoY growth for monthly activity, are supplementary. Level contribution uses the effective weight multiplied by the score minus 50. Core attribution sums constituent contributions by pillar. Within a selected pillar, constituent weights are normalized to that pillar. Monthly impact is the change in contribution, including weight changes. The CapEx component changes at quarter boundaries; hardware prices change monthly.</p></details>
    </div><div className="contribution-ranking">
      <div className="contribution-key">
        <span><i className="support"/>Supports {supports}</span><span><i className="drag"/>Drags {supports}</span>
      </div>
      {(complete || (!pillar && mode === "level")) && rows.map(row => <div className="contribution-row" key={row.key}>
        <div><b>{row.name}</b><small>{(row.weight * 100).toFixed(2)}% weight</small></div>
        <div className="contribution-track">
          {row.value !== null && <span style={{
            left: row.value >= 0 ? "50%" : `${50 - Math.abs(row.value) / max * 50}%`,
            width: `${Math.abs(row.value) / max * 50}%`,
          }} className={row.value >= 0 ? "support" : "drag"}/>}
        </div>
        <strong>{row.value === null ? "—" : format(row.value)}</strong>
      </div>)}
      {complete && pillar && rows.length < ranked.length &&
        <p className="contribution-ranking-note">{rows.length} of {ranked.length} constituents · up to four supports and four drags.</p>}
      {complete && pillar && changed.length > 0 && (all || rows.length < ranked.length || ranked.length > 8) &&
        <button className="contribution-expand" aria-expanded={all} onClick={() => setAll(!all)}>
          {all ? "Show strongest supports and drags" : "Show all constituents"}
        </button>}
    </div></div>
  </section>;
}
