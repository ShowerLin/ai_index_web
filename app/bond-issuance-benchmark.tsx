"use client";
import {workbookAmendments as data} from './workbook-amendments-snapshot';
import EvidenceCard from './evidence-card';
import ChartLegend from './chart-legend';

export default function BondIssuanceBenchmark({start,end}:{start:string;end:string}){
 const rows=data.bondBenchmark.monthly.filter(r=>r.month>=start&&r.month<=end);
 const matched=rows.filter(r=>r.relativeSupplyPct!==null);
 const covered=matched.reduce((s,r)=>s+r.coveredAmount!,0),ig=matched.reduce((s,r)=>s+r.usIgAmount!,0);
 const last=matched.at(-1),max=Math.ceil(Math.max(1,...rows.map(r=>Math.max(r.usIgAmount??0,r.coveredAmount??0)))/50)*50;
 const maxRatio=Math.max(10,Math.ceil(Math.max(0,...rows.map(r=>r.relativeSupplyPct??0))/10)*10);
 const x=(i:number)=>68+i*654/Math.max(rows.length,1)+654/Math.max(rows.length,1)/2;
 const bar=Math.min(18,654/Math.max(rows.length,1)*.27),y=(v:number)=>260-v/max*225,yr=(v:number)=>260-v/maxRatio*225;
 const ratioLine=rows.map((r,i)=>r.relativeSupplyPct===null?'':`${i===0||rows[i-1].relativeSupplyPct===null?'M':'L'}${x(i)},${yr(r.relativeSupplyPct)}`).join(' ');
 return <EvidenceCard title="AI issuance relative to US IG supply" unit={`USD billions (left) · relative issuance (%) (right)`} source="S6" note="Ratio = all covered-company issuance / US IG corporate issuance. Countries and ratings differ, so this is relative supply scale, not an exact US IG market share. Missing covered months remain gaps; latest records may be incomplete.">
 <div className="bond-benchmark-values"><span>{last?.relativeSupplyPct?.toFixed(1)??'—'}%<small>{last?.month} · latest available</small></span><span>{ig>0?(covered/ig*100).toFixed(1):'—'}%<small>{matched.length} matched months · amount-weighted</small></span></div>
 <svg className="bond-supply-svg" viewBox="0 0 800 360" role="img" aria-label="Covered AI supply-chain issuance relative to monthly US investment-grade corporate issuance">
 <text x="58" y="17">$B</text><text x="737" y="17">%</text>
 {[0,.25,.5,.75,1].map(t=><g key={t}><line x1="60" x2="730" y1={y(max*t)} y2={y(max*t)} stroke="#d6d7ce"/><text x="52" y={y(max*t)+4} textAnchor="end">{(max*t).toFixed(0)}</text><text x="738" y={yr(maxRatio*t)+4}>{(maxRatio*t).toFixed(0)}</text></g>)}
 {rows.map((r,i)=><g key={r.month}>{r.usIgAmount!==null&&<rect x={x(i)-bar-1} y={y(r.usIgAmount)} width={bar} height={260-y(r.usIgAmount)} fill="#a3aaa6"><title>{`${r.month}: US IG issuance $${r.usIgAmount.toFixed(2)}B`}</title></rect>}{r.coveredAmount!==null&&<rect x={x(i)+1} y={y(r.coveredAmount)} width={bar} height={260-y(r.coveredAmount)} fill="#237d67"><title>{`${r.month}: covered-company issuance $${r.coveredAmount.toFixed(2)}B`}</title></rect>}{(rows.length<=18||i%3===0||i===rows.length-1)&&<text x={x(i)} y="282" textAnchor="end" transform={`rotate(-50 ${x(i)} 282)`}>{r.month}</text>}</g>)}
 <path d={ratioLine} fill="none" stroke="#c27743" strokeWidth="2.5"/>
 {rows.map((r,i)=>r.relativeSupplyPct!==null&&<circle key={r.month} cx={x(i)} cy={yr(r.relativeSupplyPct)} r="3.5" fill="#c27743" stroke="#fbfaf5" strokeWidth="1"><title>{`${r.month}: covered issuance / US IG supply ${r.relativeSupplyPct.toFixed(2)}%; $${r.coveredAmount!.toFixed(2)}B / $${r.usIgAmount!.toFixed(2)}B`}</title></circle>)}
 </svg><ChartLegend items={[{label:'US IG issuance · left axis',color:'#a3aaa6'},{label:'Covered issuance · left axis',color:'#237d67'},{label:'Relative supply ratio · right axis',color:'#c27743'}]}/>
 <details className="evidence-data"><summary>Monthly amounts and comparison scope</summary><div className="credit-table-wrap"><table><thead><tr><th>Month</th><th>Covered ($B)</th><th>US IG ($B)</th><th>Ratio</th></tr></thead><tbody>{rows.map(r=><tr key={r.month}><td>{r.month}</td><td>{r.coveredAmount?.toFixed(2)??'—'}</td><td>{r.usIgAmount?.toFixed(2)??'—'}</td><td>{r.relativeSupplyPct===null?'—':`${r.relativeSupplyPct.toFixed(1)}%`}</td></tr>)}</tbody></table></div><p>The denominator filters US country of risk, investment-grade rating and corporate asset class. The covered-issuer query has no equivalent country or rating filters, so the numerator is not a certified subset. Align both queries before interpreting this ratio as market share. The period ratio divides matched-month amount sums; it does not average monthly percentages.</p></details>
 </EvidenceCard>;
}
