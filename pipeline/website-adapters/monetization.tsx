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
 const [labView,setLabView]=useState<'Both'|'OpenAI'|'Anthropic'>('Both');
 return <PillarResearch id="monetization" number="03" pillar="Monetization" history={false} classification="FUTURE CORE PILLAR · NOT YET WEIGHTED" title="US frontier-lab revenue tracks the conversion of AI activity into commercial scale." summary="OpenAI and Anthropic anchor the initial Monetization coverage. Follow their reported revenue run rates, recognized revenue and dated funding valuations to assess commercial growth. Sparse disclosures and different observation dates limit comparability; margins and cash generation are needed to assess how much revenue becomes profit. Chinese model companies provide supplementary market context. Scoring and index weight remain undefined.">
 <span id="model-monetization" aria-hidden="true"/>
 <EvidenceGroup title="US frontier labs" description="OpenAI and Anthropic are the primary coverage. Annualized revenue run rates and recognized revenue remain distinct."/>
 <div className={`pillar-controls ${styles.fullWidth}`}><label htmlFor="monetization-lab">Frontier lab </label><select id="monetization-lab" value={labView} onChange={e=>setLabView(e.target.value as typeof labView)}><option>Both</option><option>OpenAI</option><option>Anthropic</option></select></div>
 <div className={styles.threeCharts}>
 <EvidenceCard id="labs" title="Revenue run rates" unit="USD billions annualized" source="S10" legend={<ChartLegend items={[{label:'OpenAI',color:'#1d7f80'},{label:'Anthropic',color:'#d88952'}]}/>} note="Reported floors and approximations; not recognized revenue."><LabPlot view={labView}/></EvidenceCard>
 <EvidenceCard title="Commercial scale and growth" unit="USD billions · latest collected run rate" source="S10" table note="Reported net/gross partner-sales treatments differ. Growth uses each lab’s end-2025 run rate; these are not audited comparable financials."><div className={styles.compactSummary}>{(['OpenAI','Anthropic'] as const).filter(l=>labView==='Both'||labView===l).map(l=><div key={l}><strong>{l}</strong><dl><div><dt>Run rate</dt><dd><a href={labs.labs[l].latestSource} target="_blank" rel="noreferrer">{labs.labs[l].latest}</a></dd></div><div><dt>Observed</dt><dd>{labs.labs[l].latestDate}</dd></div><div><dt>Since end-2025</dt><dd>+{labs.labs[l].growthFromEnd2025.toFixed(1)}%</dd></div><div><dt>FY2025 revenue</dt><dd>{labs.labs[l].fy2025Revenue}</dd></div></dl></div>)}</div></EvidenceCard>
 <EvidenceCard title="Latest valuations" unit="USD billions · completed vs prospective" source="S16" table note="Rumored funding / IPO valuations are unconfirmed. Values and run rates have different dates."><div className={styles.compactSummary}>{data.privateLabs.filter(l=>labView==='Both'||labView===l.company).map(l=>{const rs=data.valuationResearch.filter(r=>r.company===l.company),closed=rs.filter(r=>r.status.startsWith('Completed')).at(-1)!,rumor=rs.filter(r=>r.status==='Rumored').at(-1)!;return <div key={l.company}><strong>{l.company}</strong><dl><div><dt>Completed</dt><dd><a href={closed.url} target="_blank" rel="noreferrer">${money(closed.valueUsd,1e9)}B</a></dd></div><div><dt>Post-money</dt><dd>{closed.date}</dd></div><div><dt>{l.company==='OpenAI'?'Funding rumor':'Investor IPO view'}</dt><dd><a href={rumor.url} target="_blank" rel="noreferrer">{l.company==='OpenAI'?'>':'~'}${money(rumor.valueUsd,1e9)}B</a></dd></div><div><dt>Reported</dt><dd>{rumor.date}</dd></div></dl></div>})}</div></EvidenceCard>
 </div>
 <p className={`${styles.note} ${styles.fullWidth}`}>OpenAI: approximately $50B end-September run rate, reported 8 October; replaces the earlier ~$70B comparison-adjusted estimate. Partner-sales accounting differs from Anthropic, so the revenue levels and multiples are not directly comparable.</p>
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



