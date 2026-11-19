"use client";
import { adoptionTickIndices, AdoptionChartFrame, AdoptionControls, AdoptionMetric, AdoptionMetrics, AdoptionNotes, AdoptionPanel } from './adoption-widgets';
import {useState} from 'react';
import {adoptionPriceSnapshot as data} from './adoption-price-snapshot';

export default function AdoptionPrices(){
 const [view,setView]=useState<'daily'|'monthly'>('daily');
 const silicon=data.siliconDaily.at(-1)!;
 const pricing=data.metadata.openrouterPricing;
 const openrouterDaily = data.openrouterSpendingDaily.map(row => ({
   date: row.date,
   value: row.totalTokens > 0 && row.estimatedSpendUsd !== null
     ? row.estimatedSpendUsd / row.totalTokens * 1e6 : null,
   coverage: row.totalTokens > 0 ? row.catalogMatchedTokens / row.totalTokens : 0,
 }));
 const openrouter = openrouterDaily.findLast(row => row.value !== null);
 const openrouterPoints = view === 'daily' ? openrouterDaily
   : data.spendingMonthly.map(row => ({date: row.windowEnd, value: row.openrouterPrice}));
 const rampPrices = data.rampPublicChart.blendedPriceDaily;
 const ramp = rampPrices.at(-1);
 const points=view==='daily'?data.siliconDaily.map(r=>({date:r.date,value:r.value})):data.siliconMonthly.map(r=>({date:r.month+'-01',value:r.complete?r.value:null}));
 const start=Date.parse(points[0].date),end=Math.max(Date.parse(points.at(-1)!.date),Date.parse(ramp?.date ?? points.at(-1)!.date), Date.parse(openrouter?.date ?? points.at(-1)!.date));
 const x=(date:string)=>75+(new Date(date).getTime()-start)/Math.max(1,end-start)*970;
 const rampPoints = rampPrices.filter(r => r.date >= points[0].date);
 const high = Math.max(1, ...points.map(r => r.value ?? 0), ...rampPoints.map(r => r.value ?? 0), ...openrouterPoints.map(r => r.value ?? 0)) * 1.1;
 const y = (v: number) => 375 - v / high * 330;
 const linePath = (series: readonly {date:string; value:number|null}[]) => series.map((point, index) => {
   if (point.value === null) return '';
   const previous = series[index - 1];
   const gap = !previous || previous.value === null
     || view === 'daily' && Date.parse(point.date) - Date.parse(previous.date) > 86400000;
   return `${gap ? 'M' : 'L'}${x(point.date)},${y(point.value)}`;
 }).join(' ');
 return <AdoptionPanel id="adoption-prices" headingId="price-heading">
  <div className="eyebrow">MONETIZATION · TOKEN PRICING</div><h2 id="price-heading">Token price index and model-weighted prices</h2>
  <AdoptionMetrics><AdoptionMetric><span>Silicon Data · SDLLMTK</span><strong>${silicon.value.toFixed(3)}</strong><small>Per million tokens · {silicon.date} saved value</small></AdoptionMetric>{ramp && ramp.value !== null && <AdoptionMetric><span>Ramp published blended price</span><strong>${ramp.value.toFixed(3)}</strong><small>Per million tokens · {ramp.date} · OpenAI and Anthropic</small></AdoptionMetric>}{openrouter&&<AdoptionMetric><span>OpenRouter model-weighted price</span><strong>${openrouter.value!.toFixed(3)}</strong><small>Per million routed tokens · {openrouter.date} · {(openrouter.coverage*100).toFixed(1)}% catalog matched</small></AdoptionMetric>}</AdoptionMetrics>
  <p className="adoption-chart-unit">USD per million tokens</p>
  <AdoptionControls><label>Benchmark and OpenRouter frequency <select aria-label="Token price frequency" value={view} onChange={e=>setView(e.target.value as typeof view)}><option value="daily">Daily saved values</option><option value="monthly">Monthly benchmark / matched-window prices</option></select></label></AdoptionControls>
  <AdoptionChartFrame><svg viewBox="0 0 1120 460" role="img" aria-label="Bloomberg SDLLMTK token price index, OpenRouter model-weighted price and Ramp published blended price in USD per million tokens">
   {[0,.25,.5,.75,1].map(t=><g key={t}><line x1="75" x2="1045" y1={y(high*t)} y2={y(high*t)} stroke="#d6d7ce"/><text x="65" y={y(high*t)+4} textAnchor="end">${(high*t).toFixed(2)}</text></g>)}
   <path d={linePath(points)} fill="none" stroke="#315e87" strokeWidth="3"/>
   <path d={linePath(rampPoints)} fill="none" stroke="#237d67" strokeWidth="3"/>
   <path d={linePath(openrouterPoints)} fill="none" stroke="#bd7738" strokeWidth="3" strokeDasharray="7 4"><title>OpenRouter model-weighted catalog price</title></path>
   {adoptionTickIndices(points.length).map(i=>points[i]).map(r=><text key={r.date} x={x(r.date)} y="422" textAnchor="middle">{r.date.slice(2)}</text>)}
  </svg></AdoptionChartFrame>
  <div className="pillar-series-legend"><span style={{color:'#315e87'}}>Silicon Data · {view==='daily'?'daily saved values':'monthly average'}</span><span style={{color:'#237d67'}}>Ramp · published OpenAI and Anthropic blend</span><span style={{color:'#bd7738'}}>OpenRouter · token-volume-weighted catalog estimate</span></div>
  <AdoptionNotes id="source-S15">
  <p id="openrouter-price-coverage"><strong>OpenRouter:</strong> The plotted model-weighted price divides estimated daily spending by total routed tokens, multiplied by one million. Estimated spending sums model token volume times a blended rate from the <a href={pricing.source}>OpenRouter catalog</a>. The model assumes {(1-pricing.outputShare)*100}% input and {pricing.outputShare*100}% output tokens. Identified free models and variants are priced at zero. Other unmatched tokens, including the long tail, use the same day’s token-weighted catalog-matched rate. Earlier windows are repriced using the {pricing.firstVintage} catalog. Later days use the most recent saved rates available for that day. Changes in coverage can affect estimated growth.</p>
  <details className="evidence-data"><summary>OpenRouter token prices and coverage</summary><div className="signal-table-wrap"><table><thead><tr><th>28 days ending</th><th>Effective USD per million routed tokens</th><th>Catalog match</th><th>Known free outside catalog</th><th>Blended-rate share</th><th>Catalog date(s)</th></tr></thead><tbody>{data.spendingMonthly.filter(r=>r.openrouterPriceCoverage!==null).map(r=><tr key={r.month}><th>{r.windowEnd}</th><td>{r.openrouterPrice===null?'—':r.openrouterPrice.toFixed(4)}</td><td>{(r.openrouterPriceCoverage!*100).toFixed(1)}%</td><td>{(r.openrouterKnownFreeShare!*100).toFixed(1)}%</td><td>{(r.openrouterUnmatchedShare!*100).toFixed(1)}%</td><td>{r.openrouterPriceVintages.join(', ')}{r.openrouterRepricedHistory?' · earlier volume repriced':''}</td></tr>)}</tbody></table></div></details>
  <p><strong>Silicon Data benchmark:</strong> Bloomberg SDLLMTK, saved in {data.metadata.workbook}. Daily values may carry prior quotes forward; monthly averages require a complete saved month.</p><p><strong>Ramp blended price:</strong> publisher-reported dollars per million tokens for OpenAI and Anthropic. The plotted series share a USD-per-million-token axis. Their model mixes and source populations differ. Prices provide context for the spending estimates scored in Monetization. {data.rampPublicChart.indexed && 'Ramp’s separately indexed spending and volume support relative changes. Absolute prices come from the published price series.'}</p>
    <details className="evidence-data"><summary>Volume and price breakdown</summary><p>Each change compares four completed weeks with the preceding monthly observation window. A five-week gap between endpoints leaves one week outside both windows. Ramp uses the same matched spending/token pairs within each window; changing model composition can affect growth. Growth = volume change + price change + interaction. For Ramp’s indexed feed, dividing the relative spending and volume changes gives an implied unit-cost change. The two spending-growth signals enter Monetization business paid demand at 5% nominal core weight each, using their provisional January–June 2026 baselines. Their source samples remain separate.</p><div className="signal-table-wrap"><table><thead><tr><th>Month / window end</th><th>Source</th><th>Volume change</th><th>Effective unit-cost change</th><th>Interaction (pp)</th><th>Nominal spending change</th></tr></thead><tbody>{data.spendingMonthly.flatMap(r=>[{source:'Ramp matched spending',v:r.rampVolumeGrowth,p:r.rampPriceChange,i:r.rampInteraction,g:r.rampSpendingGrowth},{source:'OpenRouter estimated spending',v:r.openrouterVolumeGrowth,p:r.openrouterPriceChange,i:r.openrouterInteraction,g:r.openrouterSpendingGrowth}].map(d=><tr key={r.month+d.source}><th>{r.month} / {r.windowEnd}</th><td>{d.source}</td><td>{d.v===null?'—':d.v.toFixed(1)+'%'}</td><td>{d.p===null?'—':d.p.toFixed(1)+'%'}</td><td>{d.i===null?'—':d.i.toFixed(2)}</td><td>{d.g===null?'Withheld':d.g.toFixed(1)+'%'}</td></tr>))}</tbody></table></div></details>
    <details className="evidence-data"><summary>Price data and coverage</summary><div className="signal-table-wrap"><table><thead><tr><th>Month</th><th>Average $/M tokens</th><th>Saved days</th><th>Status</th></tr></thead><tbody>{data.siliconMonthly.map(r=><tr key={r.month}><th>{r.month}</th><td>{r.complete?r.value.toFixed(4):'Withheld'}</td><td>{r.days}/{r.expectedDays}</td><td>{r.complete?'Complete saved grid':'Partial'}</td></tr>)}</tbody></table><table><thead><tr><th>Date</th><th>Ramp published $/M tokens</th></tr></thead><tbody>{rampPoints.map(r=><tr key={r.date}><th>{r.date}</th><td>{r.value?.toFixed(4)??'Unavailable'}</td></tr>)}</tbody></table></div></details>
 </AdoptionNotes></AdoptionPanel>;
}
