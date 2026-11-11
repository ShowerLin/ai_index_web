"use client";
import {useState} from 'react';
import {monetizationSnapshot as data} from './monetization-snapshot';
import styles from './monetization.module.css';
import {frontierLabsSnapshot as labs} from './frontier-labs-snapshot';
import PillarResearch from './pillar-research';
import EvidenceCard from './evidence-card';
import EvidenceGroup from './evidence-group';
import ChartLegend from './chart-legend';
import SectionNotes from './section-notes';

const money=(v:number|null,scale=1e6)=>v===null?'Unavailable':(v/scale).toLocaleString('en-US',{maximumFractionDigits:1});
function Trend({rows,metric}:{rows:readonly {date:string;revenueUsd:number|null;marketCapUsd:number|null;revenueStatus:string|null}[];metric:'revenueUsd'|'marketCapUsd'}){
 const points=rows.filter(r=>r[metric]!==null);const max=Math.max(...points.map(r=>r[metric] as number),1);
 const minDate=Date.parse(rows[0].date),span=Math.max(1,Date.parse(rows[rows.length-1].date)-minDate);
 const x=(r:typeof rows[number])=>70+(Date.parse(r.date)-minDate)/span*620;
 const y=(r:typeof rows[number])=>215-(r[metric] as number)/max*165;
 const actual=points.filter(r=>metric==='marketCapUsd'||r.revenueStatus==='Reported');
 const estimates=points.filter(r=>metric==='revenueUsd'&&r.revenueStatus==='Estimate');
 const path=(rs:typeof points)=>rs.map(r=>`${x(r)},${y(r)}`).join(' ');
 return <svg viewBox="0 0 760 280" role="img" aria-label={metric==='revenueUsd'?'Revenue observations: solid reported, dashed estimates':'Market capitalization in USD billions'}>
 {[0,.5,1].map(n=><g key={n}><line x1="70" x2="705" y1={215-165*n} y2={215-165*n} stroke="#dce3e8"/><text x="60" y={220-165*n} textAnchor="end" fontSize="20">{money(max*n,metric==='revenueUsd'?1e6:1e9)}</text></g>)}
 <polyline points={path(actual)} fill="none" stroke="#185e87" strokeWidth="3"/>
 <polyline points={path(estimates.length&&actual.length?[actual[actual.length-1],...estimates]:estimates)} fill="none" stroke="#bd782c" strokeWidth="3" strokeDasharray="7 5"/>
 {points.map(r=><circle key={r.date} cx={x(r)} cy={y(r)} r="4" fill={r.revenueStatus==='Estimate'&&metric==='revenueUsd'?'#bd782c':'#185e87'}><title>{`${r.date}: ${money(r[metric],metric==='revenueUsd'?1e6:1e9)} USD ${metric==='revenueUsd'?'mn':'bn'} ${metric==='revenueUsd'?r.revenueStatus:''}`}</title></circle>)}
 {[rows[0],rows[Math.floor(rows.length/2)],rows[rows.length-1]].map(r=><text key={r.date} x={x(r)} y="250" textAnchor="middle" fontSize="20">{r.date.slice(0,7)}</text>)}
 </svg>;
}
function LabPlot({view,valuation=false}:{view:string;valuation?:boolean}){
 const names=(['OpenAI','Anthropic'] as const).filter(n=>view==='Both'||n===view);
 const series=names.map(name=>({name,color:name==='OpenAI'?'#1d7f80':'#d88952',points:valuation?data.valuationResearch.filter(r=>r.company===name).map(r=>({date:r.date,value:r.valueUsd/1e9,rumor:r.status==='Rumored',label:`${r.event} · ${r.basis} · ${r.status} · ${r.note}`})):labs.labs[name].series.map(r=>({date:r.date,value:r.value,rumor:false,label:r.note}))}));
 const all=series.flatMap(s=>s.points),lo=Math.min(...all.map(r=>Date.parse(r.date))),hi=Math.max(...all.map(r=>Date.parse(r.date))),max=Math.max(...all.map(r=>r.value))*1.08;
 const x=(d:string)=>48+(Date.parse(d)-lo)/Math.max(1,hi-lo)*390,y=(v:number)=>218-v/max*185;
 return <svg viewBox="0 0 480 270" role="img" aria-label={valuation?'Historical valuations; hollow dots indicate rumors':'Annualized revenue run-rate history'}>{[0,.5,1].map(n=><g key={n}><line x1="48" x2="442" y1={y(max*n)} y2={y(max*n)} stroke="#d6d7ce"/><text x="40" y={y(max*n)+4} textAnchor="end" fontSize="12">{(max*n).toFixed(0)}</text></g>)}{series.map(s=><g key={s.name}><polyline points={s.points.filter(p=>!p.rumor).map(p=>`${x(p.date)},${y(p.value)}`).join(' ')} fill="none" stroke={s.color} strokeWidth="2.5"/>{s.points.map((p,i)=><circle key={i} cx={x(p.date)} cy={y(p.value)} r={p.rumor?5:3.5} fill={p.rumor?'#fbfaf5':s.color} stroke={s.color} strokeWidth="2"><title>{`${s.name} · ${p.date} · $${p.value}B · ${p.label}`}</title></circle>)}</g>)}{[lo,(lo+hi)/2,hi].map(t=><text key={t} x={x(new Date(t).toISOString().slice(0,10))} y="249" textAnchor="middle" fontSize="12">{new Date(t).toISOString().slice(0,7)}</text>)}</svg>;
}
function FilingRevenuePlot(){
 const rows=data.anthropicFiling.quarterlyRevenue,max=Math.max(...rows.map(r=>r.value))/1000*1.15, step=405/rows.length;
 const latest=rows.at(-1)!, previous=rows.at(-2)!;
 return <><p>Latest quarter: {latest.period} · ${(latest.value/1000).toFixed(3)}B · +{((latest.value/previous.value-1)*100).toFixed(1)}% QoQ</p><svg viewBox="0 0 480 270" role="img" aria-label="Anthropic recognized quarterly revenue from S-1/A, USD billions">{[0,.5,1].map(n=><g key={n}><line x1="45" x2="450" y1={220-n*180} y2={220-n*180} stroke="#d6d7ce"/><text x="38" y={224-n*180} fontSize="12" textAnchor="end">{(max*n).toFixed(1)}</text></g>)}{rows.map((r,i)=><g key={r.period}><rect x={45+(i+.5)*step-19} y={220-r.value/1000/max*180} width="38" height={r.value/1000/max*180} fill="#d88952"/><text x={45+(i+.5)*step} y={212-r.value/1000/max*180} textAnchor="middle" fontSize="12">{(r.value/1000).toFixed(2)}</text><text x={45+(i+.5)*step} y="246" textAnchor="middle" fontSize="11">{r.period.slice(2)}</text><title>{`${r.period}: $${r.value}M recognized revenue; S-1/A`}</title></g>)}</svg></>;
}
function AppSpendingPlot(){
 const [indexed,setIndexed]=useState(false);
 const rows=data.appSpending.history,keys=['openai','anthropic'] as const;
 const first=keys.map(k=>rows.find(r=>r[k]!==null&&r[k]!>0)!),max=Math.max(...keys.flatMap((k,j)=>rows.filter(r=>r[k]!==null).map(r=>(indexed?r[k]!/first[j][k]!*100:r[k]!/1e6))))*1.1;
 const x=(i:number)=>48+i*390/Math.max(1,rows.length-1),y=(v:number)=>220-v/max*185;
 return <div><label htmlFor="card-spending-view">Display </label><select id="card-spending-view" value={indexed?'index':'usd'} onChange={e=>setIndexed(e.target.value==='index')}><option value="usd">Observed spend · USD millions</option><option value="index">Growth index · first week = 100</option></select><svg viewBox="0 0 480 270" role="img" aria-label="Weekly US consumer panel card spending">{[0,.5,1].map(n=><g key={n}><line x1="48" x2="440" y1={y(max*n)} y2={y(max*n)} stroke="#d6d7ce"/><text x="40" y={y(max*n)+4} textAnchor="end" fontSize="12">{indexed?Math.round(max*n):(max*n).toFixed(1)}</text></g>)}{keys.map((k,j)=><g key={k}><path d={rows.map((r,i)=>r[k]===null?'':`${i===0||rows[i-1][k]===null?'M':'L'}${x(i)},${y((indexed?r[k]!/first[j][k]!*100:r[k]!/1e6))}`).join(' ')} fill="none" stroke={j?'#d88952':'#1d7f80'} strokeWidth="2.5"/>{rows.map((r,i)=>r[k]!==null?<circle key={r.date} cx={x(i)} cy={y((indexed?r[k]!/first[j][k]!*100:r[k]!/1e6))} r="2.5" fill={j?'#d88952':'#1d7f80'}><title>{`${k} · ${r.date} · index ${((indexed?r[k]!/first[j][k]!*100:r[k]!/1e6)).toFixed(1)}`}</title></circle>:null)}</g>)}{[0,Math.floor(rows.length/2),rows.length-1].map(i=><text key={i} x={x(i)} y="250" textAnchor="middle" fontSize="12">{rows[i].date.slice(0,7)}</text>)}</svg></div>;
}
function MultiplePlot({view}:{view:string}){
 const rows=data.privateLabs.filter(l=>view==='Both'||view===l.company).flatMap(l=>{
  const history=data.valuationResearch.filter(r=>r.company===l.company),completed=history.filter(r=>r.status.startsWith('Completed')).at(-1)!,rumor=history.filter(r=>r.status==='Rumored').at(-1)!;
  const revenue=l.latestAnnualizedRevenue!;
  return [completed,rumor].map(r=>({company:l.company,value:r.valueUsd/revenue['Annualized revenue (USD)'],rumor:r.status==='Rumored',date:r.date,revenueDate:revenue.Date,basis:r.basis}));
 });
 const max=Math.max(...rows.map(r=>r.value))*1.2;
 return <svg viewBox="0 0 480 270" role="img" aria-label="Valuation divided by latest collected annualized revenue run rate; dates differ">{rows.map((r,i)=><g key={i}><text x="12" y={42+i*53} fontSize="12">{r.company} · {r.rumor?'rumored':'completed'}</text><rect x="190" y={26+i*53} width={200*r.value/max} height="23" fill={r.company==='OpenAI'?'#1d7f80':'#d88952'} opacity={r.rumor?.45:1}/><text x={197+200*r.value/max} y={43+i*53} fontSize="13">{r.value.toFixed(1)}×</text><title>{`Valuation ${r.date} (${r.basis}) / run rate ${r.revenueDate}; indicative cross-date ratio, not forward P/S.`}</title></g>)}</svg>;
}
export default function Monetization(){
 const [selected,setSelected]=useState(0);const c=data.publicCompanies[selected];
 const [revenueView,setRevenueView]=useState('runRate');
 const [labView,setLabView]=useState<'Both'|'OpenAI'|'Anthropic'>('Both');
 return <PillarResearch id="monetization" number="03" pillar="Monetization" history={false} classification="CORE PILLAR · 25% NOMINAL WEIGHT" title="US frontier-lab revenue tracks the conversion of AI activity into commercial scale." summary="OpenAI and Anthropic anchor the initial Monetization coverage. Follow their reported revenue run rates, recognized revenue and dated funding valuations to assess commercial growth. Sparse disclosures and different observation dates limit comparability; margins and cash generation are needed to assess how much revenue becomes profit. Chinese model companies provide supplementary market context. Nominal core weights are 15% for Ramp business spending, 5% for consumer card spending and 5% shared by eligible lab revenue updates.">
 <span id="model-monetization" aria-hidden="true"/>
 <EvidenceGroup title="US frontier labs" description="OpenAI and Anthropic are the primary coverage. Annualized revenue run rates and recognized revenue remain distinct."/>
 <div className={`pillar-controls ${styles.fullWidth}`}><label htmlFor="monetization-lab">Frontier lab </label><select id="monetization-lab" value={labView} onChange={e=>setLabView(e.target.value as typeof labView)}><option>Both</option><option>OpenAI</option><option>Anthropic</option></select></div>
 <div className={styles.threeCharts}>
 <EvidenceCard id="labs" title="Revenue scale" unit={revenueView==='runRate'?'USD billions annualized · media reports':'USD billions per quarter · Anthropic S-1'} source={revenueView==='runRate'?'S10':'S17'} legend={revenueView==='runRate'?<ChartLegend items={[{label:'OpenAI',color:'#1d7f80'},{label:'Anthropic',color:'#d88952'}]}/>:undefined} note={revenueView==='runRate'?'Run rate is not recognized revenue. The S-1 does not supply a newer run rate.':'Reported quarterly sales; not annualized. OpenAI filing data unavailable.'}><div><label htmlFor="monetization-revenue">Revenue measure </label><select id="monetization-revenue" value={revenueView} onChange={e=>setRevenueView(e.target.value)}><option value="runRate">Annualized run rate</option><option value="filing">Anthropic reported quarterly revenue</option></select>{revenueView==='runRate'?<LabPlot view={labView}/>:<FilingRevenuePlot/>}</div></EvidenceCard>
 <EvidenceCard title="Commercial scale and growth" unit="USD billions · latest collected run rate" source="S10" table note="Reported net/gross partner-sales treatments differ. Growth uses each lab’s end-2025 run rate; these are not audited comparable financials."><div className={styles.compactSummary}>{(['OpenAI','Anthropic'] as const).filter(l=>labView==='Both'||labView===l).map(l=><div key={l}><strong>{l}</strong><dl><div><dt>Run rate</dt><dd><a href={labs.labs[l].latestSource} target="_blank" rel="noreferrer">{labs.labs[l].latest}</a></dd></div><div><dt>Observed</dt><dd>{labs.labs[l].latestDate}</dd></div><div><dt>Since end-2025</dt><dd>+{labs.labs[l].growthFromEnd2025.toFixed(1)}%</dd></div><div><dt>FY2025 revenue</dt><dd>{l==='Anthropic'?`$${(data.anthropicFiling.annualRevenue['2025']/1000).toFixed(3)}B`:labs.labs[l].fy2025Revenue}</dd></div>{l==='Anthropic'&&<><div><dt>9M 2026 revenue</dt><dd><a href="#source-S17">${(data.anthropicFiling.nineMonthRevenue2026/1000).toFixed(3)}B</a></dd></div><div><dt>Q3 operating income (loss)</dt><dd>{data.anthropicFiling.q3OperatingIncome2026 < 0 ? "−" : ""}${Math.abs(data.anthropicFiling.q3OperatingIncome2026)}M</dd></div></>}</dl></div>)}</div></EvidenceCard>
 <EvidenceCard title="Latest valuations" unit="USD billions · completed vs prospective" source="S16" table note="Rumored funding / IPO valuations are unconfirmed. Values and run rates have different dates."><div className={styles.compactSummary}>{data.privateLabs.filter(l=>labView==='Both'||labView===l.company).map(l=>{const rs=data.valuationResearch.filter(r=>r.company===l.company),closed=rs.filter(r=>r.status.startsWith('Completed')).at(-1)!,rumor=rs.filter(r=>r.status==='Rumored').at(-1)!;return <div key={l.company}><strong>{l.company}</strong><dl><div><dt>Completed</dt><dd><a href={closed.url} target="_blank" rel="noreferrer">${money(closed.valueUsd,1e9)}B</a></dd></div><div><dt>Post-money</dt><dd>{closed.date}</dd></div><div><dt>{l.company==='OpenAI'?'Funding rumor':'Investor IPO view'}</dt><dd><a href={rumor.url} target="_blank" rel="noreferrer">{l.company==='OpenAI'?'>':'~'}${money(rumor.valueUsd,1e9)}B</a></dd></div><div><dt>Reported</dt><dd>{rumor.date}</dd></div></dl></div>})}</div></EvidenceCard>
 </div>
 <p className={`${styles.note} ${styles.fullWidth}`}>OpenAI: approximately $50B end-September run rate, reported 8 October; replaces the earlier ~$70B comparison-adjusted estimate. Partner-sales accounting differs from Anthropic, so the revenue levels and multiples are not directly comparable.</p>
 <p id="source-S17" className={`${styles.note} ${styles.fullWidth}`}><a href={data.anthropicFiling.sourceUrl} target="_blank" rel="noreferrer">S17 · Anthropic S-1/A · filed {data.anthropicFiling.filingDate}</a>. Unaudited quarterly results, MD&A p. 161. IPO price and share count are pending. The $65B July run rate above remains media-reported; IPO valuation remains prospective. Run rate annualizes 28-day consumption fees and monthly subscriptions, not recognized annual sales.</p>
 <EvidenceGroup title="Anthropic’s cost of serving demand" description="After revenue and valuation, the filing shows what Anthropic spent on compute and what it committed to pay in future periods."/>
 <EvidenceCard id="anthropic-compute-demand" title="Anthropic compute expense and commitments" unit="USD billions · company disclosure" source="S17" wide table note="Quarterly expense measures costs incurred. Purchase commitments cover future payments across multiple years and exclude agreements without fixed or minimum amounts. This evidence carries no index weight.">
        <div className="signal-table-wrap"><table>
          <thead><tr><th>Period</th><th>Metric</th><th>USD bn</th><th>Basis</th></tr></thead>
          <tbody>{data.anthropicComputeDemand.observations.filter(row =>
            (row.period === "2026 Q3" && row.metric === "Compute and infrastructure expense") ||
            (row.period === "2026-09-30" && row.metric === "Fixed or minimum guaranteed commitments")
          ).map(row => <tr key={row.metric}><td>{row.period}</td><th scope="row">{row.metric}</th><td>{(row.usdMillions/1000).toFixed(row.period === "2026 Q3" ? 3 : 1)}</td><td>{row.basis}</td></tr>)}</tbody>
        </table></div>
      </EvidenceCard>
 <EvidenceGroup title="U.S. consumer card spending" description="High-frequency consumer monetization evidence · saved Bloomberg observations, separate from company revenue."/>
 <EvidenceCard title="OpenAI and Anthropic observed consumer spending" unit="Weekly USD · observed transactions in a U.S. consumer panel" source="S18" wide legend={<ChartLegend items={[{label:'OpenAI',color:'#1d7f80'},{label:'Anthropic',color:'#d88952'}]}/>} note="The chart shows each lab separately. The core scores combined spending growth with a 5% nominal weight."><AppSpendingPlot/></EvidenceCard>
 <p id="source-S18" className={`${styles.note} ${styles.fullWidth}`}>S18 · Bloomberg observed_sales, per=w; saved in AI_Monetization.xlsx / App Revenue Value and App Revenue Formula. Coverage: {data.appSpending.history[0].date}–{data.appSpending.history.at(-1)!.date}. {data.appSpending.basis} Not an iOS / Google Play revenue series. Excludes business spending, non-U.S. accounts and non-card payments; no receipt-level information. Transactions must be mappable to the selected company or brand. The core uses the last complete weekly observation each month and compares four weeks with the previous four.</p>
 <div className={styles.twoCharts}>
 <EvidenceCard title="Valuation history" unit="USD billions · dated observations" source="S16" legend={<ChartLegend items={[{label:'OpenAI',color:'#1d7f80'},{label:'Anthropic',color:'#d88952'}]}/>} note="Hollow dots: rumors / IPO targets; solid: historical financing observations. Bases differ."><LabPlot view={labView} valuation/></EvidenceCard>
 <EvidenceCard title="Valuation / revenue run rate" unit="Indicative multiple · latest collected run rate" source="S16" note="Dark: completed; pale: latest rumor. Dates and accounting bases differ; not forward P/S."><MultiplePlot view={labView}/></EvidenceCard>
 </div>
 <details className={`evidence-data ${styles.fullWidth}`}><summary>Valuation observations and source history</summary><div className="signal-table-wrap"><table><thead><tr><th>Lab / date</th><th>USD bn</th><th>Basis</th><th>Status / event</th><th>Evidence</th></tr></thead><tbody>{data.valuationResearch.filter(r=>labView==='Both'||labView===r.company).map((r,i)=><tr key={i}><th>{r.company}<br/>{r.date}</th><td>{money(r.valueUsd,1e9)}</td><td>{r.basis}</td><td>{r.status}<br/>{r.event}</td><td><a href={r.url} target="_blank" rel="noreferrer">{r.source}</a><br/>{r.note}</td></tr>)}</tbody></table></div></details>
 <p id="source-S16" className={`${styles.note} ${styles.fullWidth}`}>S16 · AI_Monetization.xlsx / Valuation Research. Company announcements, AP, Reuters reporting and Forge historical financing data; reviewed 22 October 2026. Rumors are unconfirmed. Pre-money, post-money, secondary and IPO valuations are identified separately. Ratios divide valuation by the latest collected lab run rate with different dates; they are not forward sales multiples.</p>
 <div className={styles.fullWidth}><SectionNotes section="labs"/></div>
 <div className={styles.fullWidth}>
 <EvidenceGroup title="China market comparison" description="Z.AI and MiniMax provide listed-market context. Their Bloomberg revenue observations and forecasts do not enter the US frontier-lab view or the core score."/>
 <div className="pillar-controls"><label htmlFor="monetization-china">Company </label><select id="monetization-china" value={selected} onChange={e=>setSelected(Number(e.target.value))}>{data.publicCompanies.map((x,i)=><option value={i} key={x.ticker}>{x.name}</option>)}</select></div>
 <div className={styles.threeCharts}>{data.publicCompanies.map(company=><EvidenceCard key={company.ticker} title={`${company.name} revenue`} unit="USD millions · solid reported / dashed estimate" source="S15" note="Reported through June 2026; estimates from September. BQ basis retained."><Trend rows={company.history} metric="revenueUsd"/></EvidenceCard>)}<EvidenceCard title={`${c.name} market capitalization`} unit="USD billions · select company above" source="S15" note="Saved market observations; revenue forecasts do not apply to market capitalization."><Trend rows={c.history} metric="marketCapUsd"/></EvidenceCard></div>
 <p className={styles.note}>Repeated BQ values remain intact. Annual totals and forward P/S require a confirmed annual revenue denominator. These market observations are supplementary and carry no index weight.</p>
 <details className="evidence-data"><summary>China observations and forecast coverage</summary><div className="signal-table-wrap"><table><thead><tr><th>Date</th><th>Revenue basis</th><th>Revenue (USD mn)</th><th>YoY, same BQ basis</th><th>Market cap (USD bn)</th></tr></thead><tbody>{c.history.map(r=><tr key={r.date}><td>{r.date}</td><td>{r.revenueStatus??'—'}</td><td>{money(r.revenueUsd)}</td><td>{r.revenueYoY===null?'—':`${(r.revenueYoY*100).toFixed(1)}%`}</td><td>{money(r.marketCapUsd,1e9)}</td></tr>)}</tbody></table></div></details>
 <p id="source-S15" className={styles.note}>S15 · AI_Monetization.xlsx / Public Value and Public Formula. User-collected Bloomberg data in USD; reported/estimate cutoff confirmed by the user. Z.AI: 2513 HK Equity; MiniMax: 100 HK Equity.</p>
 </div>
 </PillarResearch>;
}




