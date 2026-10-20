"use client";
import {useState} from "react";
import {electricityCapacity as data} from "./electricity-capacity-snapshot";
import styles from "./electricity-capacity.module.css";

type Line = {name:string;color:string;points:{label:string;value:number}[];dashed?:boolean};
function Lines({lines,unit,title}:{lines:Line[];unit:string;title:string}) {
  const labels=[...new Set(lines.flatMap(l=>l.points.map(p=>p.label)))].sort();
  const max=Math.max(1,...lines.flatMap(l=>l.points.map(p=>p.value)))*1.1;
  const x=(label:string)=>55+labels.indexOf(label)*650/Math.max(1,labels.length-1);
  const y=(v:number)=>210-v/max*180;
  return <><svg viewBox="0 0 740 255" role="img" aria-label={`${title}, ${unit}. Values available in tables below.`}>
    <title>{title}</title>{[0,.25,.5,.75,1].map(v=><g key={v}><line x1="55" x2="705" y1={y(v*max)} y2={y(v*max)} stroke="var(--line)"/><text x="47" y={y(v*max)+4} textAnchor="end">{(v*max).toFixed(max<20?1:0)}</text></g>)}
    {lines.map(l=><g key={l.name}><path d={l.points.map((p,i)=>`${i?'L':'M'}${x(p.label)},${y(p.value)}`).join(' ')} fill="none" stroke={l.color} strokeWidth="2.5" strokeDasharray={l.dashed?'6 4':undefined}/>{l.points.map(p=><circle key={p.label} cx={x(p.label)} cy={y(p.value)} r="3" fill={l.color}><title>{`${l.name} · ${p.label}: ${p.value.toFixed(2)} ${unit}`}</title></circle>)}</g>)}
    {labels.filter((_,i)=>labels.length<10||i%Math.ceil(labels.length/6)===0||i===labels.length-1).map(label=><text key={label} x={x(label)} y="237" textAnchor="middle">{label}</text>)}
  </svg><div className={styles.legend}>{lines.map(l=><span key={l.name}><i style={{background:l.color}}/>{l.name}{l.dashed?' · analyst path':''}</span>)}<span>{unit}</span></div></>;
}

function Card({title,unit,note,children}:{title:string;unit:string;note:string;children:React.ReactNode}) {
  return <article className={`evidence-card ${styles.card}`}><header><h4>{title}</h4><p>{unit}</p></header><div className={styles.body}>{children}</div><footer><a href="#power-sources">Sources</a><span>{note}</span></footer></article>;
}
export default function ElectricityCapacity() {
  const [geo,setGeo]=useState('US'),[sector,setSector]=useState('all');
  const [spend,setSpend]=useState<'saarBillion'|'trailing12Billion'>('saarBillion');
  const [delay,setDelay]=useState(0);
  const history=data.annualRetail.filter(r=>r.geography===geo&&r.sector===sector).sort((a,b)=>a.year-b.year);
  const latest=data.construction[data.construction.length-1];
  const national=data.scenarios.filter(r=>r.geography_id==='US');
  const scenarios=['constrained','central','accelerated'];const colors=['#78955f','#1d7f80','#d88952'];
  const peaks=data.pjm.filter(r=>r.season==='summer'&&(r.target_year??0)<=2030);
  const geographyNames:Record<string,string>={US:'United States',VA:'Virginia',TX:'Texas',GA:'Georgia',AZ:'Arizona',CA:'California',IL:'Illinois',OH:'Ohio',OR:'Oregon'};
  return <section id="electricity-capacity" className={styles.section} aria-labelledby="power-title">
    <header className={`evidence-group ${styles.heading}`}><h3 id="power-title">Power and construction</h3><p>Electricity demand, construction and leasing test whether capital commitments can become energized capacity. Compare delivery with <a href="#token-activity">token activity</a>, <a href="#labs">lab revenue</a> and <a href="#financial">cash generation and returns</a>.</p></header>
    <div className={styles.grid}>
      <Card title="Electricity demand" unit="Annual retail sales · TWh · 2010–2025" note="EIA annual retail sales, 2010–2025; excludes direct use. State commercial sales are not a measurement of data-center electricity. Monthly national and state/sector data through July 2026 are retained in the research dataset. Publication day unknown for downloaded EIA workbooks.">
        <div className={styles.controls}><label>Geography <select value={geo} onChange={e=>setGeo(e.target.value)}>{Object.entries(geographyNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></label><label>Sector <select value={sector} onChange={e=>setSector(e.target.value)}>{['all','commercial','residential','industrial','transportation'].map(s=><option key={s}>{s}</option>)}</select></label></div>
        <Lines lines={[{name:`${geographyNames[geo]} · ${sector}`,color:'#1d7f80',points:history.map(r=>({label:String(r.year),value:r.twh}))}]} unit="TWh" title="Annual retail electricity sales"/>
        <details><summary>Annual values</summary><table><thead><tr><th>Year</th><th>TWh</th></tr></thead><tbody>{history.map(r=><tr key={r.year}><th>{r.year}</th><td>{r.twh.toFixed(2)}</td></tr>)}</tbody></table></details>
      </Card>
      <Card title="Data-center construction" unit="Nominal USD billions · Jan 2014–Aug 2026" note="Census private data-center value put in place, Jan 2014–Aug 2026. SAAR is an annualized monthly rate; trailing 12 months sums NSA spending. Nominal USD; racks and servers excluded. Census publication day is not established in the downloaded workbook.">
        <label className={styles.controls}>Measure <select value={spend} onChange={e=>setSpend(e.target.value as typeof spend)}><option value="saarBillion">SAAR · annual pace</option><option value="trailing12Billion">Trailing 12 months · NSA realized</option></select></label>
        <Lines title="Private data-center construction" unit="USD billions" lines={[{name:spend==='saarBillion'?'SAAR':'NSA trailing 12 months',color:'#1d7f80',points:data.construction.filter(r=>r[spend]!==null).map(r=>({label:r.period,value:r[spend] as number}))}]}/>
        <p>{latest.period}: ${latest.saarBillion?.toFixed(1)}B SAAR, up {latest.yoyPct?.toFixed(1)}% YoY; ${latest.trailing12Billion?.toFixed(1)}B realized over the last 12 months.</p>
      </Card>
      <Card title="Data-center energy outlook" unit="U.S. facility electricity · TWh · analyst paths" note="LBNL 2024: 176 TWh (2023 estimate), 325–580 TWh (2028 forecast). June 2026 update: 192 TWh (2024 estimate), 464 TWh (2028 reference), 649 TWh (2030 reference). Lines below are analyst interpolations toward published anchors; bounds are not a confidence interval. Includes non-AI data centers; excludes crypto.">
        <Lines title="Analyst energy paths anchored to LBNL" unit="TWh" lines={scenarios.map((name,i)=>({name,color:colors[i],dashed:true,points:national.filter(r=>r.scenario_id===name).map(r=>({label:String(r.target_year),value:r.value??0}))}))}/>
        <details><summary>2028 / 2030 scenario values</summary><table><thead><tr><th>Analyst path</th><th>2028</th><th>2030</th></tr></thead><tbody>{scenarios.map(name=><tr key={name}><th>{name}</th>{[2028,2030].map(y=><td key={y}>{national.find(r=>r.scenario_id===name&&r.target_year===y)?.value?.toFixed(0)} TWh</td>)}</tr>)}</tbody></table></details>
      </Card>
      <Card title="PJM load-forecast revisions" unit="Normal summer peak · GW · fixed target years" note="January 2026 versus 2025 normal summer peak forecasts. 2025 levels reconstructed from PJM’s published revision table; these are retrospective vintage comparisons. Forecasts include data-center adjustments; no model is added. Detailed zonal/energy workbooks and a third vintage remain access gaps.">
        <Lines title="PJM normal summer peak forecasts" unit="GW" lines={['2025','2026'].map((v,i)=>({name:`January ${v} vintage`,color:['#927bb8','#1d7f80'][i],points:peaks.filter(r=>r.source_vintage===v).map(r=>({label:String(r.target_year),value:(r.value??0)/1000}))}))}/>
        <p>2028 revised down 4.41 GW; 2030 down 0.88 GW. Stricter near-term commitments shift delivery expectations.</p>
      </Card>
      <Card title="Market pipeline and leasing" unit="H1 2026 · separate broker coverage · GW / %" note="CBRE H1 2026, released Aug 27: wholesale colocation in eight U.S. primary markets. JLL H1 2026, released Aug 11: expanded North America including owner-occupied hyperscale and frontier markets. Capacity basis remains unverified for energy conversion. Never add providers or preleasing to construction.">
        <table><thead><tr><th>Separate coverage</th><th>Under construction</th><th>Preleased</th></tr></thead><tbody><tr><th>CBRE · eight U.S. markets</th><td>7.48 GW</td><td>80.4%</td></tr><tr><th>JLL · North America</th><td>66 GW</td><td>95%</td></tr></tbody></table>
        <p>CBRE vacancy: 1.4%. JLL’s U.S. state observations show Texas at 26 GW and Virginia at 13 GW of <b>operating plus under-construction</b> capacity. These are combined stages.</p>
        <details><summary>CBRE construction history · same primary-market scope</summary><table><thead><tr><th>Edition</th><th>Under construction</th></tr></thead><tbody>{data.markets.filter(r=>r.source_id==='CBRE'&&r.market_id==='US_primary_8'&&r.metric==='under_construction').map(r=><tr key={r.record_id}><th>{r.as_of}</th><td>{((r.value??0)/1000).toFixed(2)} GW</td></tr>)}</tbody></table><p>Published vintages may contain revisions; no identical-vintage growth rate is inferred.</p></details>
      </Card>
      <Card title="Delivery-delay sensitivity" unit="Hypothetical 1 GW IT cohort · facility TWh" note="Illustrative central 1 GW IT cohort only: 90% completion, 90% conditional energization, 60% constant load factor, PUE 1.20, commissioning July 2027. Conditional probabilities are multiplied once. No operating stock, retirements or grid-total addition. These assumptions are not a forecast of observed broker capacity.">
        <label className={styles.controls}>Commissioning delay <select value={delay} onChange={e=>setDelay(Number(e.target.value))}>{[0,6,12,24].map(m=><option key={m} value={m}>{m} months</option>)}</select></label>
        <Lines title="Hypothetical 1 GW IT cohort energy" unit="TWh" lines={[{name:`${delay}-month delay`,color:'#1d7f80',dashed:true,points:data.scenarios.filter(r=>r.scenario_id==='illustrative_central'&&r.delay_months===delay).map(r=>({label:String(r.target_year),value:r.value??0}))}]}/>
      </Card>
    </div>
    <details className={`evidence-data ${styles.sources}`} id="power-sources"><summary>Power and construction · sources, methodology and coverage</summary><p>Research cutoff: 16 October 2026. Partial source coverage; supplementary evidence.</p><ul>{[
      ['EIA electricity state data','https://www.eia.gov/electricity/data/state/'],['Census construction history','https://www.census.gov/construction/c30/historical_data.html'],
      ['LBNL June 2026 update','https://www.energy.gov/documents/united-states-data-center-energy-usage-report-2025-update'],['CBRE H1 2026','https://www.cbre.ca/insights/books/north-america-data-center-trends-h1-2026'],
      ['JLL H1 2026','https://www.jll.com/en-us/newsroom/data-center-demand-exceeds-expectations-in-h1-2026'],['PJM fixed-target revisions','https://insidelines.pjm.com/pjms-updated-20-year-forecast-continues-to-see-significant-long-term-load-growth/']
    ].map(([name,url])=><li key={url}><a href={url} target="_blank" rel="noreferrer">{name}</a></li>)}</ul>
    <p>Available data pass blocking integrity checks. Remaining gaps: national hourly BA coverage; archived outlooks; PJM detailed energy, zones, third vintage and accuracy tables; complete broker tables and power definitions; source-calibrated delivery cohorts and vintage backtests. Annual EIA versus monthly sums have revision flags, concentrated in 2025; both series remain separate. Hourly PJM missing values remain null. The core index retains its existing weights.</p></details>
  </section>;
}
