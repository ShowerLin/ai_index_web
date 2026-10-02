"use client";

import SectionNotes from "./section-notes";

import { useState } from "react";
import { sustainabilitySnapshot } from "./sustainability-snapshot";
import { rollingCash } from "./sustainability-metrics";

const companies = sustainabilitySnapshot.companies.map(c => ({ ...c, history: rollingCash(c.quarters) }));
const matched = companies.filter(c => c.ticker !== "ORCL");
const aggregateQuarters = matched[0].quarters.map(q => {
  const rows = matched.map(c => c.quarters.find(r => r.period === q.period));
  const complete = rows.every(r => r && r.cfo !== null && r.capex !== null);
  return { period: q.period, cfo: complete ? rows.reduce((s, r) => s + r!.cfo!, 0) : null, capex: complete ? rows.reduce((s, r) => s + r!.capex!, 0) : null };
});
const aggregate = { ticker: "Aggregate", name: "Four-company aggregate", history: rollingCash(aggregateQuarters) };
const money = (n: number) => `${n < 0 ? "−" : ""}$${Math.abs(n).toFixed(1)}B`;
const percent = (n: number | null) => n === null ? "n/a" : `${(n * 100).toFixed(1)}%`;
const period = (date: string) => `${date.slice(0, 4)}Q${Math.ceil(Number(date.slice(5, 7)) / 3)}`;

export default function InvestmentSustainability() {
  const [selected, setSelected] = useState("Aggregate");
  const view = selected === "Aggregate" ? aggregate : companies.find(c => c.ticker === selected)!;
  const latest = view.history.at(-1);
  if (!latest) return <section className="section sustainability-section" id="sustainability"><h2>Investment sustainability</h2><p>Unavailable: eight consecutive quarters of cash flow and cash capex are required.</p></section>;
  const max = Math.max(...view.history.flatMap(r => [r.current.cfo, r.current.capex]), 1);
  const deltaFcf = latest.fcf - latest.previousFcf;
  return <section className="section sustainability-section" id="sustainability">
    <div className="section-head"><div><div className="eyebrow">INVESTMENT SUSTAINABILITY · CASH FLOW</div><h2>Investment is absorbing more operating cash.</h2></div><div className="select-wrap"><label htmlFor="sustainability-company">Company</label><select id="sustainability-company" value={selected} onChange={e => setSelected(e.target.value)}><option value="Aggregate">Four-company aggregate</option>{companies.map(c => <option key={c.ticker} value={c.ticker}>{c.name}</option>)}</select></div></div>
    <p className="sustainability-context">{view.name} · TTM ending {latest.period} · USD billions · latest available data <a className="source-chip" href="#source-S7">S7</a></p>
    <div className="sustainability-thesis"><b>{deltaFcf < 0 ? "Cash left after investment is shrinking." : "Cash left after investment is increasing."}</b><p>Operating cash flow grew {percent(latest.cfoGrowth)} and cash capex grew {percent(latest.capexGrowth)} versus the preceding 12 months. Cash remaining after investment {deltaFcf < 0 ? "fell" : "rose"} by {money(Math.abs(deltaFcf))}. {latest.fcf < 0 ? "Investment exceeded operating cash generation over this period." : "Operating cash generation still covered cash investment, but the remaining cushion has narrowed."}</p></div>
    <div className="sustainability-kpis">
      <article><span>Investment absorption</span><strong>{percent(latest.absorption)}</strong><small>Previously {percent(latest.previousAbsorption)}<br/>TTM cash capex / operating cash flow</small></article>
      <article><span>Incremental cash coverage</span><strong>{percent(latest.incrementalCoverage)}</strong><small>Change in TTM operating cash flow / change in TTM cash capex</small></article>
      <article><span>Cash remaining after investment</span><strong className={latest.fcf < 0 ? "negative" : ""}>{money(latest.fcf)}</strong><small>Previously {money(latest.previousFcf)}<br/>FCF proxy = operating cash flow − cash capex</small></article>
    </div>
    <div className="sustainability-chart"><div className="chart-meta"><div><b>Cash generation and investment</b><span>Trailing 12 months · common dollar scale</span></div><div className="sustainability-legend"><span><i/>Operating cash flow</span><span><i/>Cash capex</span></div></div>
      <div className="cash-trend">{view.history.map(row => <div className="cash-trend-row" key={row.period}><b>{period(row.period)}</b><div>{(["cfo", "capex"] as const).map(metric => <div className={`cash-bar ${metric}`} key={metric}><span style={{width: `${row.current[metric] / max * 100}%`}}/><small>{money(row.current[metric])}</small></div>)}</div><span className={row.fcf < 0 ? "negative" : ""}>FCF {money(row.fcf)}</span></div>)}</div>
    </div>
    <div className="signal-table-wrap sustainability-table" tabIndex={0} role="region" aria-label="Scrollable company cash coverage comparison"><table><caption>Company comparison · latest available TTM; Oracle has an earlier period</caption><thead><tr><th>Company / TTM end</th><th>Cash flow growth</th><th>Cash capex growth</th><th>Capex / cash flow<br/>Prior → latest</th><th>Incremental coverage</th><th>FCF proxy</th></tr></thead><tbody>{companies.map(c => {
      const r = c.history.at(-1);
      return <tr key={c.ticker}><td><b>{c.name}</b><span className="company-label">{r?.period ?? "Unavailable"}{c.ticker === "ORCL" ? " · calendarized" : ""}</span></td>{r ? <><td>{percent(r.cfoGrowth)}</td><td>{percent(r.capexGrowth)}</td><td>{percent(r.previousAbsorption)} → {percent(r.absorption)}</td><td>{percent(r.incrementalCoverage)}</td><td className={r.fcf < 0 ? "negative" : ""}>{money(r.fcf)}</td></> : <td colSpan={5}>Insufficient consecutive quarterly data</td>}</tr>;
    })}</tbody></table></div>



    <SectionNotes section="sustainability" methodology={<><p>TTM sums use four consecutive quarters and compare with the preceding four. Cash CapEx outflows become positive spending. Absorption = CapEx / operating cash flow; incremental coverage = change in cash flow / change in CapEx. Aggregate dollar sums, not company ratios; withhold nonpositive denominators.</p><details><summary>Source cell checks</summary><p>{sustainabilitySnapshot.source}, “{sustainabilitySnapshot.sheet}”; cash flow and cash CapEx columns E:F, P:Q, AA:AB, AL:AM and AW:AX.</p></details></>}/>
  </section>;
}
