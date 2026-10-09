"use client";
import {useState} from 'react';
import {creditFinancialHistory as data} from './credit-financial-history';
import './market.css';
type Cell={period:string;median:number|null;q25:number|null;q75:number|null;coverage:number;count:number};
type Group={name:string;kind:string;members:readonly string[];cells:readonly Cell[]};
const colors=['#237d67','#bd7738','#426d99','#916aa6','#7f863e','#b45c70','#527a82','#665849'];
function Distribution({groups,title}:{groups:readonly Group[];title:string}){
 const [highlight,setHighlight]=useState<string|null>(null);
 const dates=[...new Set(groups.flatMap(g=>g.cells.filter(p=>p.median!==null).map(p=>p.period)))].sort();
 const visible=groups.filter(g=>highlight===null||g.name===highlight);
 const values=visible.flatMap(g=>g.cells.flatMap(p=>p.q25===null||p.q75===null?[]:[p.q25,p.q75]));
 const lower=Math.min(0,...values),upper=Math.max(1,...values),pad=Math.max(.1,(upper-lower)*.1),lo=lower-pad,hi=upper+pad;
 const x=(date:string)=>68+Math.max(0,dates.indexOf(date))*762/Math.max(1,dates.length-1),y=(v:number)=>30+(hi-v)/(hi-lo)*300;
 const segments=(g:Group)=>{const result:Cell[][]=[];let current:Cell[]=[];for(const d of dates){const p=g.cells.find(c=>c.period===d);if(p?.median!==null&&p?.median!==undefined){current.push(p);}else{if(current.length)result.push(current);current=[];}}if(current.length)result.push(current);return result;};
 return <article className="market-equity-chart leverage-distribution"><h5>{title}</h5><p>Net debt / trailing-12-month EBITDA · × · median and central 50%</p>
 <svg viewBox="0 0 900 390" className="market-stock-svg" role="img" aria-label={`${title}: quarterly median leverage and interquartile range`}>
 {Array.from({length:6},(_,i)=>lo+(hi-lo)*i/5).map((v,i)=><g key={i}><line x1="68" x2="830" y1={y(v)} y2={y(v)} stroke="#dddcd3"/><text x="57" y={y(v)+5} textAnchor="end">{v.toFixed(1)}×</text></g>)}
 <line x1="68" x2="830" y1={y(0)} y2={y(0)} stroke="#8a9794" strokeDasharray="4 4"/>
 {groups.map((g,i)=><g key={g.name} opacity={highlight && highlight !== g.name ? 0.18 : 1}>{segments(g).map((segment,j)=><g key={j}>
 <path d={`M${segment.map(p=>`${x(p.period)},${y(p.q75!)}`).join(' L')} L${segment.toReversed().map(p=>`${x(p.period)},${y(p.q25!)}`).join(' L')} Z`} fill={colors[i%colors.length]} fillOpacity=".13"/>
 <path d={'M'+segment.map(p=>`${x(p.period)},${y(p.median!)}`).join(' L')} fill="none" stroke={colors[i%colors.length]} strokeWidth="2.8"/>
 {segment.map(p=><circle key={p.period} cx={x(p.period)} cy={y(p.median!)} r="4" fill={colors[i%colors.length]}><title>{`${g.name} · ${p.period}: median ${p.median!.toFixed(2)}×; central 50% ${p.q25!.toFixed(2)}–${p.q75!.toFixed(2)}×; ${p.coverage}/${p.count} issuers`}</title></circle>)}
 </g>)}</g>)}
 {dates.map(d=><text key={d} x={x(d)} y="366" textAnchor="middle">{d.slice(0,4)}Q{Math.ceil(Number(d.slice(5,7))/3)}</text>)}
 </svg><div className="credit-multi-legend">{groups.map((g,i)=>{const latest=g.cells.find(p=>p.period===dates.at(-1));return <button type="button" aria-pressed={highlight===g.name} key={g.name} onClick={()=>setHighlight(highlight===g.name?null:g.name)}><i style={{backgroundColor:colors[i%colors.length]}}/>{g.name} · {latest?.coverage??0}/{g.members.length}</button>;})}</div>
 <p className="chart-footnote">Line: median. Shading: 25th–75th percentiles across available same-period issuers. Legend counts refer to the latest plotted quarter. Click a legend to emphasize a group and rescale its axis. Single-issuer groups have zero-width bands. Negative ratios indicate net cash with positive EBITDA.</p></article>;
}
export default function LeverageDistributions(){
 const groups=data.groups as readonly Group[];
 return <div className="credit-financial-comparison"><h4>Financial leverage by sector and rating</h4><p className="amendment-summary">Compare typical leverage and its dispersion with the sector and rating CDS charts above. Financial baskets use the {data.metadata.cdsMatchedCompanies} issuers with both financial and CDS coverage; they are a subset of the CDS universe. Changes may reflect issuer finances and changes in available coverage.</p><div className="credit-financial-plots"><Distribution groups={groups.filter(g=>g.kind==='sector')} title="Sector leverage distributions"/><Distribution groups={groups.filter(g=>g.kind==='rating')} title="Rating leverage distributions"/></div>
 <p className="compact-heatmap-instruction">Source: Indexlist.xlsx. Net debt divided by four consecutive quarterly EBITDA observations; incomplete or nonpositive denominators are withheld. No financial values are carried into missing quarters. Sector and rating definitions follow the CDS charts. Ratings dated {data.metadata.ratingAsOf} are applied retrospectively, not historical ratings. Report publication dates are unavailable. Bands show issuer dispersion, not uncertainty or proof that leverage caused spread changes.</p></div>;
}
