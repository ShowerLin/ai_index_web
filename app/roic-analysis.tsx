"use client";
import EvidenceCard from "./evidence-card";

import SectionNotes from "./section-notes";

import { useState } from "react";
import { calculateRoic, type RoicCompany } from "./roic-metrics";
import { roicSnapshot } from "./roic-snapshot";
import SectionSummary from "./section-summary";

const companies = roicSnapshot.companies as unknown as readonly RoicCompany[];
const percent = (value: number | null) => value === null ? "n/a" : `${(value * 100).toFixed(1)}%`;
const points = (value: number | null) => value === null ? "n/a" : `${value >= 0 ? "+" : "−"}${Math.abs(value * 100).toFixed(1)} pp`;
const money = (value: number) => `$${value.toFixed(1)}B`;

export default function RoicAnalysis({compact=false}:{compact?:boolean}={}) {
  const [selected, setSelected] = useState("MSFT");
  const company = companies.find(item => item.ticker === selected)!;
  const core = calculateRoic(company);
  const leaseSensitivity = calculateRoic(company, true);

  if(compact) return <><EvidenceCard id="roic" title="Hyperscaler capital returns" unit="Latest complete TTM · company comparison" source="S8" note="Consolidated and eight-quarter incremental ROIC; this is not AI-specific project ROIC." table><div className="roic-readiness"><table><caption>Hyperscaler return comparison</caption><thead><tr><th>Company</th><th>TTM end</th><th>ROIC</th><th>Change</th><th>8Q incremental ROIC</th></tr></thead><tbody>{companies.map(item => {
      const result = calculateRoic(item);
      return <tr key={item.ticker}><td><b>{item.ticker}</b><span>{item.name}</span></td>{result.status === "ready" ? <><td>{result.latest.period}</td><td>{percent(result.latest.roic)}</td><td className={result.roicChange !== null && result.roicChange < 0 ? "negative" : "positive"}>{points(result.roicChange)}</td><td>{percent(result.incrementalRoic8q)}</td></> : <td colSpan={4}>{result.reason}</td>}</tr>;
    })}</tbody></table></div></EvidenceCard><details className="evidence-data"><summary>Company ROIC calculations and capital definitions</summary><RoicAnalysis/></details></>;
  return <section className="section roic-section" id="roic-detail">
    <div className="section-head"><div><div className="eyebrow">RETURN ON INVESTED CAPITAL · SUPPLEMENTARY ANALYSIS</div><h2>Is profit keeping pace with the capital base?</h2></div><div className="select-wrap"><label htmlFor="roic-company">Company</label><select id="roic-company" value={selected} onChange={event => setSelected(event.target.value)}>{companies.map(item => <option value={item.ticker} key={item.ticker}>{item.name}</option>)}</select></div></div>
    <p className="roic-context">Consolidated company measure · latest available quarterly fundamentals · USD billions · <a className="source-chip" href="#source-S8">S8</a></p>
    <SectionSummary current="All five companies generate positive total ROIC, but their preferred eight-quarter incremental ROIC is lower than total ROIC." conclusion="Weaker incremental returns point to slower earnings realization relative to capital deployment."/>
    {core.status === "ready" ? <>
      <div className="roic-thesis"><b>{company.name} generated a {percent(core.latest.roic)} consolidated return on its simplified capital base.</b><p>ROIC {core.roicChange === null ? "has no preceding-year comparison" : `${core.roicChange >= 0 ? "increased" : "declined"} by ${Math.abs(core.roicChange * 100).toFixed(1)} percentage points from the preceding TTM`}. The eight-quarter incremental return is {percent(core.incrementalRoic8q)}; the four-quarter comparison is {percent(core.incrementalRoic4q)}.</p></div>
      <div className="roic-kpis">
        <article><span>Consolidated ROIC</span><strong>{percent(core.latest.roic)}</strong><small>TTM Bloomberg NOPAT / average core invested capital</small></article>
        <article><span>ROIC change</span><strong className={core.roicChange !== null && core.roicChange < 0 ? "negative" : "positive"}>{points(core.roicChange)}</strong><small>Versus the preceding TTM</small></article>
        <article><span>8Q incremental ROIC</span><strong>{percent(core.incrementalRoic8q)}</strong><small>Longer horizon; 4Q comparison: {percent(core.incrementalRoic4q)}</small></article>
        <article><span>Lease-inclusive sensitivity</span><strong>{leaseSensitivity.status === "ready" ? percent(leaseSensitivity.latest.roic) : "n/a"}</strong><small>{leaseSensitivity.status === "ready" ? "Approximate denominator sensitivity" : "Debt and finance-lease overlap not confirmed"}</small></article>
      </div>
      <div className="roic-bridge">
        <div><span>TTM Bloomberg NOPAT</span><strong>{money(core.latest.nopat)}</strong></div><i>÷</i><div><span>Average invested capital</span><strong>{money(core.latest.averageCapital)}</strong></div><i>=</i><div><span>Consolidated ROIC</span><strong>{percent(core.latest.roic)}</strong></div>
      </div>
    </> : <div className="roic-gate"><span>RETURN ESTIMATE UNAVAILABLE</span><h3>{company.name} does not yet have a reliable comparison.</h3><p>{core.reason}</p></div>}

    <div className="roic-readiness"><table><caption>Hyperscaler return comparison</caption><thead><tr><th>Company</th><th>TTM end</th><th>ROIC</th><th>Change</th><th>8Q incremental ROIC</th></tr></thead><tbody>{companies.map(item => {
      const result = calculateRoic(item);
      return <tr key={item.ticker}><td><b>{item.ticker}</b><span>{item.name}</span></td>{result.status === "ready" ? <><td>{result.latest.period}</td><td>{percent(result.latest.roic)}</td><td className={result.roicChange !== null && result.roicChange < 0 ? "negative" : "positive"}>{points(result.roicChange)}</td><td>{percent(result.incrementalRoic8q)}</td></> : <td colSpan={4}>{result.reason}</td>}</tr>;
    })}</tbody></table></div>




    <SectionNotes section="roic" other={<><p>Consolidated ROIC includes mature businesses and non-AI investment. Without attributable AI capital, NOPAT and a cost of capital, it cannot establish AI value creation. Excluded from both atmosphere scores.</p><p><b>{company.name}:</b> {company.readinessReason}</p></>} source={<p><b>S8 · Indexlist.xlsx — Hyperscaler Core Data Value.</b> Cached Bloomberg quarterly NOPAT, equity, debt, cash and lease fields for all five companies. Core results use equity + debt − cash and short-term investments. Long-term investments are not available in this sheet. Snapshot hash: <code>{roicSnapshot.sha256.slice(0, 12)}…</code></p>} methodology={<div className="roic-method-grid">
      <article><b>Profit numerator</b><p>NOPAT is net operating profit after tax. Four consecutive Bloomberg quarterly observations form the trailing-year profit numerator.</p></article>
      <article><b>Core invested capital</b><p>Shareholders’ equity + interest-bearing debt − cash and short-term investments. Beginning and ending balances are averaged. Full cash deduction is a simplifying assumption, not an estimate of excess cash.</p></article>
      <article><b>Incremental return</b><p>Change in TTM Bloomberg NOPAT divided by change in average invested capital. Eight quarters is the preferred horizon; four quarters remains diagnostic. Results are withheld for non-positive capital changes or increases below 5% of the earlier capital base.</p></article>
      <article><b>Lease sensitivity</b><p>Operating and finance lease liabilities are added once when debt treatment is confirmed. The sensitivity is approximate because implied lease interest is not added back to NOPAT.</p></article>
    </div>}/>
  </section>;
}
