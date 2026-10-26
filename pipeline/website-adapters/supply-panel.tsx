import {supplySnapshot as data} from "./supply-snapshot";
import {chainEconomicsSnapshot as chain} from "./chain-economics-snapshot";

const value=(n:number|null)=>n===null?"Unavailable":n.toFixed(1);
export default function SupplyPanel(){
 const latest=data.monthly.filter(r=>r.score!==null).at(-1);
 return <section className="section" id="supply">
  <div className="eyebrow">CORE PILLAR · 20% WEIGHT</div><h2>Supply</h2>
  <p className="chapter-lead">Investment momentum and hardware pricing pressure</p>
  <p>Latest complete Supply score: <b>{value(latest?.score??null)}</b> · {latest?.month}. Composite weights: CapEx 10%, DDR5 5%, H100 rentals 5%. Higher prices can indicate scarcity; this score does not measure delivered capacity.</p>
  <div className="signal-table-wrap"><table><caption>Hardware prices · completed monthly observations</caption><thead><tr><th>Series</th><th>Month</th><th>Source level</th><th>YoY</th><th>Composite weight</th></tr></thead><tbody>{data.hardware.map(s=>{const r=s.cells.filter(c=>!c.partial&&c.level!==null).at(-1);return <tr key={s.field}><th>{s.name}</th><td>{r?.month}</td><td>{value(r?.level??null)}</td><td>{value(r?.yoy??null)}%</td><td>{s.field==="SDB200RT Index"?"Context only":"5%"}</td></tr>})}</tbody></table></div>
  <h3>Forward CapEx estimates</h3><p>Next four complete calendar quarters: {data.metadata.forwardQuarters.join(" · ")}. USD billions, saved Bloomberg estimates; no lease-basis bridge. Horizon reference: {data.metadata.asOf}; source retrieval time is unknown.</p>
  <div className="signal-table-wrap"><table><thead><tr><th>Company</th>{data.metadata.forwardQuarters.map(q=><th key={q}>{q} E</th>)}<th>Four-quarter total</th></tr></thead><tbody>{data.capex.map(c=><tr key={c.ticker}><th>{c.ticker}</th>{data.metadata.forwardQuarters.map(q=><td key={q}>{value(c.quarters.find(r=>r.quarter===q)?.value??null)}</td>)}<td>{value(c.forward12m)}</td></tr>)}</tbody></table></div>
  <h3>RPO estimates and growth</h3><p>USD billions; native fiscal periods. RPO is a backlog stock, so quarters and issuers are not added together. YoY compares the same fiscal quarter one year earlier within this saved forecast vintage. A 12-month-forward calendar endpoint is withheld until fiscal alignment is verified.</p>
  <div className="signal-table-wrap"><table><thead><tr><th>Scope</th><th>Fiscal quarter</th><th>Estimated RPO</th><th>Estimated YoY</th><th>Source cell</th></tr></thead><tbody>{data.rpo.map(r=><tr key={r.entity+r.period}><th>{r.entity}</th><td>{r.period} E</td><td>{value(r.value)}</td><td>{r.yoy===null?"Unavailable":`${value(r.yoy)}%`}</td><td>{r.sourceCell}</td></tr>)}</tbody></table></div>
  <p><b>RPO growth versus CapEx growth:</b> {data.metadata.rpoGrowthVsCapexStatus}</p>
  <details><summary>Supply-chain financial context · zero additional score weight</summary><p>{chain.metadata.currencyMethod} These are company-wide financials, not physical shipments.</p><div className="signal-table-wrap"><table><thead><tr><th>Company</th><th>TTM end</th><th>Currency</th><th>Revenue · source units</th><th>EBITDA · source units</th></tr></thead><tbody>{Object.entries(chain.companies).map(([ticker,c])=>{const r=c.periods.filter(p=>p.revenue!==null).at(-1);return <tr key={ticker}><th>{ticker}</th><td>{r?.period}</td><td>{c.currency}</td><td>{value(r?.revenue??null)}</td><td>{value(r?.ebitda??null)}</td></tr>})}</tbody></table></div><p>{chain.metadata.shareMethod}</p></details>
  <details><summary>Sources and interpretation</summary><p>{data.metadata.forwardMethod}</p><p>Hardware: Indexlist.xlsx / Index Price Value. CapEx: Indexlist.xlsx / Supply Chain Financial Value. RPO: AI_Monetization.xlsx / Cloud FA Value. Forecasts and B200 carry zero score weight. Price growth uses a provisional January–June 2026 calibration. No electrical-equipment inputs have been added to Supply.</p></details>
 </section>;
}
