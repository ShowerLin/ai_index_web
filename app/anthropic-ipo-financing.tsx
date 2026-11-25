import graph from '../data/circular-financing.json';

const prospectus = graph.sources.find(source => source.id === 'source-anthropic-ipo-prospectus')!;
const closing = graph.sources.find(source => source.id === 'source-anthropic-ipo-closing')!;
const investors = new Map(graph.nodes.map(node => [node.id, node.name]));
const placements = graph.flows
  .filter(flow => flow.to === 'anth' && flow.kind === 'paid' && flow.time.basis === 'ipo_private_placement')
  .sort((a, b) => (b.amount.value ?? 0) - (a.amount.value ?? 0));
const placementTotal = placements.reduce((sum, flow) => sum + (flow.amount.value ?? 0), 0);
const largestPlacement = Math.max(1, ...placements.map(flow => flow.amount.value ?? 0));

export default function AnthropicIpoFinancing() {
  return <section className="cf-ipo" aria-labelledby="anthropic-ipo-financing">
    <h5 id="anthropic-ipo-financing">Anthropic IPO disclosures</h5>
    <div className="cf-ipo-metrics">
      <div><span>Public IPO proceeds to Anthropic</span><strong>$91.6B</strong><small>Gross primary proceeds · closed 20 Nov</small></div>
      <div><span>Strategic private placement</span><strong>${placementTotal.toFixed(1)}B</strong><small>Seven investors · closed 20 Nov</small></div>
      <div><span>Contractual spending commitments</span><strong>$900.9B</strong><small>$70.7B expected over the 12 months after 30 Sep</small></div>
    </div>
    <p>Substantially all committed spending relates to compute and infrastructure. Anthropic expects $451.6B before the end of 2030. The company-wide total includes disclosed supplier contracts shown below.</p>
    <details>
      <summary>Strategic investors and liquidity details</summary>
      <ul className="cf-ipo-placements" aria-label="Completed private placement by investor, USD billions">
        {placements.map(flow => <li key={flow.id}>
          <span>{investors.get(flow.from)}</span>
          <span className="cf-ipo-track" aria-hidden="true"><i style={{width: `${100 * (flow.amount.value ?? 0) / largestPlacement}%`}}/></span>
          <strong>${flow.amount.value}B</strong>
        </li>)}
      </ul>
      <p>Google’s $10B purchase and AMD’s $2.5B purchase reduced their existing commitments. The $15B revolving credit facility had no borrowings drawn at 30 September and $205M of standby letters of credit outstanding.</p>
      <p>Anthropic separately estimates $150B–$175B of spending under arrangements without fixed dollar commitments. The $900.9B figure excludes that estimate.</p>
    </details>
    <p className="cf-ipo-sources"><a href={closing.url} target="_blank" rel="noreferrer">IPO closing announcement ↗</a><a href={prospectus.url} target="_blank" rel="noreferrer">Final SEC prospectus ↗</a></p>
  </section>;
}
