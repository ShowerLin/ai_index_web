import "./design-system.css";
import { legacyAtmosphereHistory } from "./pulse-reference-data";
import { latestCapexPulse, chinaCapexHistory } from "./hyperscaler-reference-data";
import { cdsSnapshot, fundamentalSnapshot, fundamentalLeaders, bondSnapshot, bondHistory, cdsIssuers, cdsRoleQuarterly, hyperscalerDebtCapital, roleLeverageSnapshot } from "./market-reference-data";
import {coreProjectionSnapshot as capexProjection} from "./core-projection-snapshot";
"use client";
import LeverageDistributions from "./leverage-distributions";
import CreditFinancialComparison from "./credit-financial-comparison";
import SupplyChainStockChart from "./equity-market";
import SemiconductorMarket from "./semiconductor-market";
import WeeklyPulse from "./weekly-pulse";
import {workbookAmendments} from "./workbook-amendments-snapshot";
import {DemandSupplement,DemandHeatmap,CreditBenchmark,BondSectorFinancing} from "./workbook-amendments";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  chainEdges,
  industryChain,
  priceMetricLabels,
  type ChainNodeId,
  type PriceMetric,
  type PriceRow,
} from "./industry-chain-data";
import { industryChainSnapshotMetadata, snapshotPriceRows } from "./industry-chain-snapshot";
import ValueDistribution from "./value-distribution";
import CircularFinancing from "./circular-financing";
import InvestmentSustainability from "./investment-sustainability";
import RoicAnalysis from "./roic-analysis";
import DemandToReturns from "./demand-to-returns";
import Monetization from "./monetization";
import PolicyDataCenters from "./policy-data-centers";
import InfrastructureDeployment from "./infrastructure-deployment";
import ElectricityCapacity from "./electricity-capacity";
import TaskEconomics from "./task-economics";
import UsefulTaskEconomics from "./useful-task-economics";
import SectionSummary from "./section-summary";
import DataFreshness from "./data-freshness";
import SectionNotes from "./section-notes";
import EvidenceCard from "./evidence-card";
import PillarResearch from "./pillar-research";
import EvidenceGroup from "./evidence-group";
import { AdoptionMetric, AdoptionMetrics } from "./adoption-widgets";
import AdoptionPrices from "./adoption-prices";
import AdoptionSpending, { AdoptionReadthrough, RampWeeklySpending } from "./adoption-spending";
import CoreContributions from "./core-contributions";
import CloudReference from "./cloud-reference";
import HyperscalerDemand from "./hyperscaler-demand";
import HyperscalerCapexLatest from "./hyperscaler-capex-latest";
import InfrastructureSignals from "./infrastructure-signals";
import SupplyPanel from "./supply-panel";
import RampDemand from "./ramp-demand";
import TokenActivity from "./token-activity";
import {rampSnapshot} from "./ramp-snapshot";
import {coreContributionSnapshot as coreScores} from "./core-contribution-snapshot";
import CoreHeatmapChart from "./core-heatmap-chart";
import HeatmapPillarLabel from "./heatmap-pillar-label";
import { monthlyHeatmapSnapshot } from "./monthly-heatmap-snapshot";
import { edgeRoutes, mapHeight, mapX, nodeHeight, nodePositions, nodeWidth } from "./chain-map-layout";

const corePillarNames = ["Adoption", "Monetization", "Hyperscalers", "Infrastructure"] as const;
type Pillar = typeof corePillarNames[number];
type CapexCountry = "United States" | "China";
type ChinaCompany = "All companies" | "Tencent" | "Alibaba" | "Baidu";
type AiRole = "Hyperscalers" | "Accelerators & logic" | "Semiconductor equipment" | "Memory & storage" | "Systems & networking" | "Data centers" | "Power";
type ChainView = "map" | "cards" | "companies";
type AtmosphereView = "core" | "adjusted";

const atmosphereHistory = coreScores.months.filter(row=>row.score!==null&&row.month<=capexProjection.metadata.anchorMonth).map(row=>[row.month,row.score!] as const);
const latestCore = coreScores.months.filter(row=>row.score!==null&&row.month<=capexProjection.metadata.anchorMonth).at(-1)!;
const coreByPillar = Object.fromEntries(corePillarNames.map(name=>{
  const rows=latestCore.rows.filter(r=>r.pillar===name);
  const weight=rows.reduce((sum,r)=>sum+r.effectiveWeight,0);
  return [name,weight ? rows.reduce((sum,r)=>sum+(r.score??0)*r.effectiveWeight,0)/weight : 0];
}));

const pillars = Object.fromEntries(corePillarNames.map(name=>{
  const members=latestCore.rows.filter(r=>r.pillar===name);
  return [name,{score:Number(coreByPillar[name].toFixed(1)),change:"Methodology v3.0",breadth:`${members.filter(r=>r.score!==null&&r.score>50).length} / ${members.length} above norm`,tone:coreByPillar[name]>50?"Above historical norm":"Below historical norm",note:name==="Monetization"?"Business spending, consumer card spending and released lab revenue.":"Scores use constituent-specific treatments and a fixed historical baseline through June 2026."}];
}));

const heatmap = corePillarNames.map(pillar=>({pillar,source:pillar==="Hyperscalers"?"S2" as const:"S1" as const}));
type HeatmapPillar = Pillar;

// Show one quarter after the last complete actual core observation.
const actualCoreMonth = capexProjection.metadata.anchorMonth;
const heatmapEndDate = new Date(`${actualCoreMonth}-01T00:00:00Z`);
heatmapEndDate.setUTCMonth(heatmapEndDate.getUTCMonth()+3);
const heatmapEnd = heatmapEndDate.toISOString().slice(0,7);
const heatmapMonths = [...new Set([...coreScores.months.map(row=>row.month), ...capexProjection.months.map(row=>row.month)])].filter(month=>month<=heatmapEnd).sort();
const displayedCoreScore = (month:string) => atmosphereHistory.find(([date])=>date===month)?.[1] ?? capexProjection.months.find(p=>p.month===month)?.value ?? null;
const heatmapQuarters = [...new Set(heatmapMonths.map(month=>`${month.slice(0,4)} Q${Math.ceil(Number(month.slice(5))/3)}`))];
const monthlyHeatmap = heatmap.map(row => ({...row,quarterly:row.pillar==="Hyperscalers",monthlyCells:heatmapMonths.map(month=>{
 const quarter=`${month.slice(0,4)}Q${Math.ceil(Number(month.slice(5))/3)}`;
 const members=coreScores.months.find(d=>d.month===month)?.rows.filter(r=>r.pillar===row.pillar)??[];
 const weight=members.reduce((sum,r)=>sum+r.effectiveWeight,0);
 return {month,quarter,value:row.pillar==="Hyperscalers"&&month>actualCoreMonth ? capexProjection.months.find(p=>p.month===month)?.supplyScore??null : weight>0?members.reduce((s,r)=>s+(r.score??0)*r.effectiveWeight/weight,0):null,breadth:`${members.filter(r=>r.score!==null&&r.score>50).length}/${members.length}`};
})}));

const clampScore=(value:number)=>Math.max(0,Math.min(100,value));
const coreAtmosphereScore=atmosphereHistory.at(-1)![1];
const normalizedCreditScore=clampScore(50+2.5*cdsSnapshot.composite);
const fundamentalOverlayDelta=0.10*(fundamentalSnapshot.median-50);
const creditOverlayDelta=0.10*(normalizedCreditScore-50);
const financingOverlayDelta=0;
const fundamentalOverlayReady=fundamentalSnapshot.q2Coverage+fundamentalSnapshot.q1Fallback===32;
const creditOverlayReady=cdsSnapshot.coverage>=8;
const adjustedAtmosphereScore=fundamentalOverlayReady&&creditOverlayReady?clampScore(coreAtmosphereScore+fundamentalOverlayDelta+creditOverlayDelta+financingOverlayDelta):null;

const satelliteOverlay = {
  core:coreAtmosphereScore,
  fundamentalScore:fundamentalSnapshot.median,
  fundamentalDelta:fundamentalOverlayDelta,
  creditScore:normalizedCreditScore,
  creditDelta:creditOverlayDelta,
  financingDelta:financingOverlayDelta,
  adjusted:adjustedAtmosphereScore,
  ready:fundamentalOverlayReady&&creditOverlayReady,
} as const;

const aiRoles: readonly {role:AiRole;label:string;description:string}[] = [
  {role:"Hyperscalers",label:"Hyperscalers",description:"Cloud platforms, model hosting and enterprise compute capacity"},
  {role:"Accelerators & logic",label:"Accelerators & logic",description:"AI accelerators, custom silicon, foundry and diversified logic"},
  {role:"Semiconductor equipment",label:"Semiconductor equipment",description:"Lithography and wafer-fabrication equipment"},
  {role:"Memory & storage",label:"Memory & storage",description:"Memory, NAND and enterprise storage capacity"},
  {role:"Systems & networking",label:"Systems & networking",description:"Servers, networking and connectivity hardware"},
  {role:"Data centers",label:"Data centers",description:"Colocation, interconnection and physical digital infrastructure"},
  {role:"Power",label:"Power",description:"Electrical equipment and generation supporting AI loads"},
];

const cdsRoleOverview = aiRoles.map(meta=>{
  const members=cdsIssuers.filter(c=>c.role===meta.role);
  return {...meta,members,oneMonth:members.reduce((sum,c)=>sum+c.oneMonth,0)/members.length,threeMonth:members.reduce((sum,c)=>sum+c.threeMonth,0)/members.length};
});


function Source({id}:{id:"S1"|"S2"|"S3"|"S4"|"S5"|"S6"}) { return <a className="source-chip" href={`#source-${id}`}>{id}</a>; }

function scoreHeatClass(v:number|null){ return v===null?"heat-na":"heat-continuous"; }
function scoreHeatStyle(v:number|null){
 if(v===null)return undefined;
 const low=[190,86, 70],neutral=[246,243,233],high=[24,116,103];
 const t=Math.max(0,Math.min(100,v))/100;
 const from=t<=.5?low:neutral,to=t<=.5?neutral:high,f=t<=.5?t*2:(t-.5)*2;
 return {backgroundColor:`rgb(${from.map((c,i)=>Math.round(c+(to[i]-c)*f)).join(",")})`,color:t<.22||t>.78?"#fff":"#172e2b"};
}

function heatClass(v:number|null){
  if(v===null)return "heat-na";
  if(v>=30)return "heat-up-3";
  if(v>=10)return "heat-up-2";
  if(v>0)return "heat-up-1";
  if(v===0)return "heat-zero";
  if(v>-3)return "heat-down-watch";
  if(v>-10)return "heat-down-1";
  return "heat-down-2";
}

function LineChart({data,neutral}:{data:readonly (readonly [string,number])[];neutral?:number}) {
  const w=960,h=330,l=46,r=18,t=24,b=42;
  const vals=data.map(d=>d[1]); const min=Math.min(...vals,neutral??Infinity); const max=Math.max(...vals,neutral??-Infinity);
  const pad=(max-min)*.16||1; const lo=Math.max(0,min-pad),hi=max+pad;
  const x=(i:number)=>l+i*(w-l-r)/(data.length-1); const y=(v:number)=>t+(hi-v)*(h-t-b)/(hi-lo);
  const points=data.map((d,i)=>`${x(i)},${y(d[1])}`).join(" ");
  return <svg className="line-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Monthly AI investment atmosphere signal">
    <title>{"Monthly AI investment atmosphere signal, December 2023 to June 2026"}</title>
    {[40,50,60,70,80].filter(v=>v>=lo&&v<=hi).map(v=><g key={v}><line x1={l} x2={w-r} y1={y(v)} y2={y(v)} className={v===neutral?"neutral-line":"grid-line"}/><text x={l-10} y={y(v)+4} textAnchor="end">{v}</text></g>)}
    <path d={`M${x(0)},${y(neutral??50)} L${x(data.length-1)},${y(neutral??50)}`} className="area-baseline"/>
    <polyline points={points} className="signal-line"/>
    {data.map((d,i)=><g key={d[0]}><circle cx={x(i)} cy={y(d[1])} r={i===data.length-1?6:3} className="signal-point"><title>{`${d[0]}: ${d[1]}`}</title></circle>{(i%6===0||i===data.length-1)&&<text x={x(i)} y={h-14} textAnchor="middle">{d[0]}</text>}</g>)}
  </svg>;
}

function ChinaCapexChart({company}:{company:ChinaCompany}) {
  const companies = company==="All companies" ? ["Tencent","Alibaba","Baidu"] as const : [company] as const;
  const colors = {Tencent:"#b65045",Alibaba:"#d88952",Baidu:"#1d7f80"} as const;
  const maxValue=Math.max(...chinaCapexHistory.flatMap(d=>companies.map(item=>d[item])));
  const w=960,h=330,l=58,r=18,t=22,b=44,max=Math.ceil(maxValue/15)*15;
  const x=(i:number)=>l+i*(w-l-r)/(chinaCapexHistory.length-1), y=(v:number)=>t+(max-v)*(h-t-b)/max;
  return <svg className="line-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Tencent, Alibaba and Baidu quarterly capital expenditure in renminbi billions">
    <title>{"Tencent operating CapEx, Alibaba reported CapEx and Baidu cash CapEx in RMB billions"}</title>
    {[0,15,30,45,60,75].map(v=><g key={v}><line x1={l} x2={w-r} y1={y(v)} y2={y(v)} className="grid-line"/><text x={l-10} y={y(v)+4} textAnchor="end">¥{v}B</text></g>)}
    {companies.map(company=>{
      const points=chinaCapexHistory.map((d,i)=>`${x(i)},${y(d[company])}`).join(" ");
      return <g key={company}><polyline points={points} fill="none" stroke={colors[company]} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>{chinaCapexHistory.map((d,i)=><circle key={`${company}-${d.q}`} cx={x(i)} cy={y(d[company])} r={i===chinaCapexHistory.length-1?5.5:3.5} fill={colors[company]}><title>{`${company} ${d.q}: RMB ${d[company].toFixed(2)}B`}</title></circle>)}</g>;
    })}
    {chinaCapexHistory.map((d,i)=>(i%2===0||i===chinaCapexHistory.length-1)&&<text key={d.q} x={x(i)} y={h-14} textAnchor="middle">{d.q.replace("20","")}</text>)}
  </svg>;
}

function BondChart(){
  const w=960,h=300,l=48,r=18,t=22,b=46,max=Math.max(...bondHistory.map(d=>d.amount))*1.14;
  const slot=(w-l-r)/bondHistory.length, y=(v:number)=>t+(max-v)*(h-t-b)/max;
  return <svg className="line-chart bond-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Monthly AI-related bond issuance, September 2025 to partial September 2026">
    <title>{"Monthly AI-related bond issuance in US dollars billions"}</title>
    {[0,20,40,60].map(v=><g key={v}><line x1={l} x2={w-r} y1={y(v)} y2={y(v)} className="grid-line"/><text x={l-9} y={y(v)+4} textAnchor="end">${v}B</text></g>)}
    {bondHistory.map((d,i)=>{const x=l+i*slot+slot*.15,width=slot*.7,height=h-b-y(d.amount);return <g key={d.month}><rect x={x} y={y(d.amount)} width={width} height={height} className={i===bondHistory.length-1?"bond-bar latest":"bond-bar"}><title>{`${d.month}: $${d.amount.toFixed(1)}B · ${d.issues} issues`}</title></rect><text x={x+width/2} y={h-17} textAnchor="middle">{d.month}</text></g>;})}
  </svg>;
}

function CdsRoleDebtChart(){
  const w=960,h=510,l=72,r=34,top=34,upperBottom=278,lowerTop=350,lowerBottom=462;
  const roles=["Hyperscalers","Accelerators & logic","Semiconductor equipment","Memory & storage","Systems & networking","Data centers","Power"] as const;
  const colors:Record<(typeof roles)[number],string>={Hyperscalers:"#1d7f80","Accelerators & logic":"#d88952","Semiconductor equipment":"#b49a3a","Memory & storage":"#7f6ea8","Systems & networking":"#b45d50","Data centers":"#4f79a7",Power:"#719a45"};
  const x=(i:number)=>l+i*(w-l-r)/(cdsRoleQuarterly.length-1);
  const cdsIndex=(role:(typeof roles)[number],value:number)=>value/cdsRoleQuarterly[0][role]*100;
  const yCds=(v:number)=>top+(185-v)*(upperBottom-top)/125;
  const yDebt=(v:number)=>lowerTop+(34-v)*(lowerBottom-lowerTop)/12;
  return <div className="cds-role-figure">
    <div className="cds-role-legend">{roles.map(role=><span key={role}><i style={{background:colors[role]}}/>{role}</span>)}</div>
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="cds-role-title cds-role-desc">
      <title id="cds-role-title">Indexed quarter-end median CDS by AI supply-chain role and hyperscaler debt-to-capital ratio</title>
      <desc id="cds-role-desc">The upper subplot indexes each role's median five-year CDS spread to 100 in 2025 Q4 so changes can be compared despite different spread levels. The lower subplot shows median debt to total capital for five hyperscalers through 2026 Q2.</desc>
      {[60,100,140,180].map(v=><g key={`c${v}`}><line x1={l} x2={w-r} y1={yCds(v)} y2={yCds(v)} className="grid-line"/><text x={l-12} y={yCds(v)+4} textAnchor="end">{v}</text></g>)}
      <text x={l} y="17" className="subplot-label">MEDIAN 5Y CDS INDEX · 2025Q4 = 100</text>
      {roles.map(role=><g key={role}><path d={cdsRoleQuarterly.map((row,i)=>`${i?"L":"M"}${x(i)},${yCds(cdsIndex(role,row[role]))}`).join(" ")} fill="none" stroke={colors[role]} strokeWidth="3"/>{cdsRoleQuarterly.map((row,i)=><circle key={row.quarter} cx={x(i)} cy={yCds(cdsIndex(role,row[role]))} r="4.5" fill={colors[role]}><title>{`${role} · ${row.quarter}: ${row[role].toFixed(1)} bp · index ${cdsIndex(role,row[role]).toFixed(0)}`}</title></circle>)}</g>)}
      {[24,28,32,34].map(v=><g key={`d${v}`}><line x1={l} x2={w-r} y1={yDebt(v)} y2={yDebt(v)} className="grid-line"/><text x={l-12} y={yDebt(v)+4} textAnchor="end">{v}%</text></g>)}
      <text x={l} y={lowerTop-18} className="subplot-label">HYPERSCALER MEDIAN DEBT / (DEBT + EQUITY)</text>
      <path d={hyperscalerDebtCapital.map((row,i)=>`${i?"L":"M"}${x(i)},${yDebt(row.value)}`).join(" ")} fill="none" stroke={colors.Hyperscalers} strokeWidth="3.5"/>
      {hyperscalerDebtCapital.map((row,i)=><circle key={row.quarter} cx={x(i)} cy={yDebt(row.value)} r="5" fill={colors.Hyperscalers}><title>{`${row.quarter}: ${row.value.toFixed(1)}%`}</title></circle>)}
      <line x1={x(2)} x2={x(3)} y1={yDebt(30.1)} y2={yDebt(30.1)} className="pending-line"/><text x={x(3)} y={yDebt(30.1)-10} textAnchor="middle" className="pending-label">Q3 balance sheet pending</text>
      {cdsRoleQuarterly.map((row,i)=><text key={row.quarter} x={x(i)} y={h-16} textAnchor="middle">{row.quarter}</text>)}
    </svg>
  </div>;
}

function parseCsvLine(line:string){
  const cells:string[]=[]; let value=""; let quoted=false;
  for(let i=0;i<line.length;i+=1){
    const char=line[i];
    if(char==='"'&&quoted&&line[i+1]==='"'){value+='"';i+=1;continue;}
    if(char==='"'){quoted=!quoted;continue;}
    if(char===","&&!quoted){cells.push(value.trim());value="";continue;}
    value+=char;
  }
  cells.push(value.trim());
  return cells;
}

function parseNumber(value:string|undefined){
  if(!value?.trim())return null;
  const parsed=Number(value.replace(/[%,$]/g,"").replaceAll(",",""));
  return Number.isFinite(parsed)?parsed:null;
}

function parsePriceCsv(csv:string){
  const lines=csv.replace(/^\uFEFF/,"").split(/\r?\n/).filter(line=>line.trim());
  if(lines.length<2)return [] as PriceRow[];
  const headers=parseCsvLine(lines[0]).map(header=>header.trim().toLowerCase());
  const read=(cells:string[],name:string)=>cells[headers.indexOf(name)] ?? "";
  return lines.slice(1).map(line=>{
    const cells=parseCsvLine(line);
    return {
      ticker:read(cells,"ticker").toUpperCase(),
      price:parseNumber(read(cells,"price")),
      currency:read(cells,"currency")||"USD",
      change1d:parseNumber(read(cells,"change_1d")),
      change1m:parseNumber(read(cells,"change_1m")),
      change3m:parseNumber(read(cells,"change_3m")),
      changeYtd:parseNumber(read(cells,"change_ytd")),
      asOf:read(cells,"as_of"),
      revenueGrowthYoy:parseNumber(read(cells,"revenue_growth_yoy")),
      capexGrowthYoy:parseNumber(read(cells,"capex_growth_yoy")),
      fundamentalComposite:parseNumber(read(cells,"fundamental_composite")),
      financialAsOf:read(cells,"financial_as_of"),
    };
  }).filter(row=>row.ticker);
}

function mergePriceRow(base:PriceRow,override:PriceRow):PriceRow{
  return {
    ticker:override.ticker,
    price:override.price??base.price,
    currency:override.currency||base.currency,
    change1d:override.change1d??base.change1d,
    change1m:override.change1m??base.change1m,
    change3m:override.change3m??base.change3m,
    changeYtd:override.changeYtd??base.changeYtd,
    asOf:override.asOf||base.asOf,
    revenueGrowthYoy:override.revenueGrowthYoy??base.revenueGrowthYoy,
    capexGrowthYoy:override.capexGrowthYoy??base.capexGrowthYoy,
    fundamentalComposite:override.fundamentalComposite??base.fundamentalComposite,
    financialAsOf:override.financialAsOf||base.financialAsOf,
  };
}

function formatReturn(value:number|null){
  if(value===null)return "—";
  return `${value>0?"+":""}${value.toFixed(1)}%`;
}

function returnClass(value:number|null){
  if(value===null)return "awaiting";
  return value>=0?"positive":"negative";
}

type SignalTone = "good" | "neutral" | "bad" | "na";
type OverviewSignal = { label:string; tone:SignalTone };

function marketSignal(value:number|null):OverviewSignal{
  if(value===null)return {label:"Unavailable",tone:"na"};
  if(value>=10)return {label:"Strong",tone:"good"};
  if(value>=3)return {label:"Constructive",tone:"good"};
  if(value>-3)return {label:"Mixed",tone:"neutral"};
  return {label:"Weak",tone:"bad"};
}

function fundamentalSignal(value:number|null):OverviewSignal{
  if(value===null)return {label:"Unavailable",tone:"na"};
  if(value>=65)return {label:"Strong",tone:"good"};
  if(value>=50)return {label:"Resilient",tone:"good"};
  if(value>=35)return {label:"Mixed",tone:"neutral"};
  return {label:"Fragile",tone:"bad"};
}

function creditSignal(value:number|null):OverviewSignal{
  if(value===null)return {label:"Not covered",tone:"na"};
  if(value>=3)return {label:"Pressure rising",tone:"bad"};
  if(value<=-3)return {label:"Pressure easing",tone:"good"};
  return {label:"Stable / mixed",tone:"neutral"};
}

function formatScore(value:number|null){return value===null?"—":value.toFixed(0);}
function formatBp(value:number|null){return value===null?"—":`${value>0?"+":""}${value.toFixed(1)} bp`;}
function formatIndex(value:number|null){return value===null?"Unavailable":value.toFixed(1);}

const infrastructureAreas = [
  {name:"Data centers", status:"Epoch estimates 9.18 GW of operational IT capacity across five owners.", outlook:"CBRE tracked 7.48 GW under construction in eight U.S. markets in H1 2026, 80.4% preleased."},
  {name:"Power & electricity", status:"LBNL estimates U.S. data centers used 192 TWh in 2024.", outlook:"LBNL’s 2026 update puts its 2028 reference at 464 TWh. PJM revisions show regional load expectations."},
  {name:"Compute & networking", status:"Epoch estimates 13.34 million H100 equivalents owned in Q1 2026, with partial coverage.", outlook:"Follow equipment orders and GPU rents for procurement and near-term tightness."},
  {name:"Memory & storage", status:"DDR5 and NAND spot prices are available daily. DRAM and NAND exports are monthly.", outlook:"Compare spot prices with export growth to see whether pricing and shipments move together."},
] as const;

function InfrastructureBrowser() {
  const [grouping, setGrouping] = useState<"area" | "type">("area");
  const [selection, setSelection] = useState(0);
  const byArea = [
    {name:"Data centers", content:<><ElectricityCapacity part="facilities"/><InfrastructureDeployment compact part="facilities"/></>},
    {name:"Power & electricity", content:<ElectricityCapacity part="power"/>},
    {name:"Compute & networking", content:<><InfrastructureSignals stage="commitments"/><InfrastructureSignals stage="execution"/><InfrastructureDeployment compact part="compute"/><InfrastructureSignals stage="tightness"/></>},
    {name:"Memory & storage", content:<><InfrastructureSignals stage="memoryExports"/><InfrastructureSignals stage="memoryPrices"/></>},
  ];
  const byType = [
    {name:"Orders", content:<InfrastructureSignals stage="commitments"/>},
    {name:"Imports & exports", content:<><InfrastructureSignals stage="execution"/><InfrastructureSignals stage="memoryExports"/></>},
    {name:"Construction & leasing", content:<ElectricityCapacity part="facilities"/>},
    {name:"Installed capacity", content:<InfrastructureDeployment compact/>},
    {name:"Prices", content:<><InfrastructureSignals stage="tightness"/><InfrastructureSignals stage="memoryPrices"/><p><a href="#weekly-pulse">View weekly GPU rental and memory price signals ↑</a></p></>},
    {name:"Electricity demand", content:<ElectricityCapacity part="power" powerView="demand"/>},
    {name:"Forecasts & scenarios", content:<ElectricityCapacity part="power" powerView="outlook"/>},
  ];
  const groups = grouping === "area" ? byArea : byType;
  const active = groups[selection];
  return <div className="infra-browser">
    <h3>Status &amp; outlook</h3>
    <div className="infra-overview">
      {infrastructureAreas.map((area,index) => <article className="research-card" key={area.name}>
        <h4><button type="button" onClick={() => {setGrouping("area");setSelection(index);document.getElementById("infra-evidence")?.scrollIntoView();}}>{area.name}</button></h4>
        <p><strong>Status.</strong> {area.status}</p>
        <p><strong>Outlook.</strong> {area.outlook}</p>
      </article>)}
    </div>
    <div id="infra-evidence">
      <h3>Infrastructure evidence</h3>
      <div className="pulse-frequency-tabs" role="group" aria-label="Group infrastructure charts">
        <button type="button" aria-pressed={grouping === "area"} onClick={() => {setGrouping("area");setSelection(0);}}>By area</button>
        <button type="button" aria-pressed={grouping === "type"} onClick={() => {setGrouping("type");setSelection(0);}}>By data type</button>
      </div>
      <div className="pulse-frequency-tabs" role="group" aria-label="Select evidence category">
        {groups.map((group,index) => <button key={group.name} type="button" aria-pressed={selection === index} onClick={() => setSelection(index)}>{group.name}</button>)}
      </div>
      <div key={grouping+active.name} aria-label={active.name}>{active.content}</div>
    </div>
  </div>;
}

export default function Home(){
  const [pulseTab, setPulseTab] = useState<"monthly" | "weekly">("monthly");
  useEffect(() => {
    const syncPulseTab = () => {
      if (location.hash === "#weekly-pulse") {
        setPulseTab("weekly");
        requestAnimationFrame(() => document.getElementById("heatmap")?.scrollIntoView());
      } else if (location.hash === "#heatmap") {
        setPulseTab("monthly");
      }
    };
    syncPulseTab();
    window.addEventListener("hashchange", syncPulseTab);
    return () => window.removeEventListener("hashchange", syncPulseTab);
  }, []);
  const [contributionMonth,setContributionMonth]=useState("2026-06");
  const [pillar,setPillar]=useState<Pillar>("Infrastructure");
  const [compositeSelection,setCompositeSelection]=useState<HeatmapPillar | "Official core index">("Official core index");
  const [heatmapPillar,setHeatmapPillar]=useState<HeatmapPillar>("Infrastructure");
  const [capexCountry,setCapexCountry]=useState<CapexCountry>("United States");
  const [chinaCompany,setChinaCompany]=useState<ChinaCompany>("All companies");
  const [priceMetric,setPriceMetric]=useState<PriceMetric>("change1m");
  const [chainView,setChainView]=useState<ChainView>("map");
  const [atmosphereView,setAtmosphereView]=useState<AtmosphereView>("core");
  const [selectedChainNodeId,setSelectedChainNodeId]=useState<ChainNodeId>("platforms");
  const [priceRows,setPriceRows]=useState<Record<string,PriceRow>>(()=>snapshotPriceRows());
  const [priceStatus,setPriceStatus]=useState("Indexlist.xlsx snapshot");
  const heatmapDetails=latestCore.rows.filter(row=>row.pillar===heatmapPillar).map(row=>({name:row.name,ticker:row.ticker,isTokens:row.ticker.endsWith("TOKEN_VOLUME"),latest:row.level===null?"n/a":`${row.level.toFixed(2)}${row.ticker.endsWith("TOKEN_VOLUME")?"T/day":""}`,change:row.growth,basis:row.treatment,status:`Score ${row.score?.toFixed(1)??"n/a"}; ${(row.weight*100).toFixed(2)}% weight${row.ticker.endsWith("TOKEN_VOLUME")?"; matched completed 4W window":`; short momentum ${row.shortMomentum?.toFixed(2)??"n/a"}${row.pillar==="Adoption"?" pp":"%"}`}`}));
  const constituentHistory = (coreScores.months.at(-1)?.rows.filter(row=>row.pillar===heatmapPillar)??[]).map(row=>({name:row.name,ticker:row.ticker,cells:heatmapMonths.map(month=>{const point=coreScores.months.find(d=>d.month===month)?.rows.find(r=>r.ticker===row.ticker);return {month,level:point?.level??null,value:point?.score??null,treatment:point?.treatment??"",signal:point?.growth??null};})}));
  function selectHeatmapPillar(name: HeatmapPillar) { setHeatmapPillar(name); setCompositeSelection(name); }
  const compositePoints = heatmapMonths.map((month,index) => {
    if (compositeSelection === "Official core index") return {month,value:atmosphereHistory.find(([date])=>date===month)?.[1]??null,low:null,high:null};
    const values=constituentHistory.map(row=>row.cells[index].value as number|null).filter((value):value is number=>value!==null);
    return {month,value:monthlyHeatmap.find(row=>row.pillar===compositeSelection)?.monthlyCells[index].value??null,low:values.length?Math.min(...values):null,high:values.length?Math.max(...values):null};
  });
  const visibleSeries=latestCore.rows.filter(r=>r.pillar===pillar).map(r=>({name:r.name,ticker:r.ticker,value:r.level?.toFixed(2)??"n/a",yoy:r.growth,status:`${(r.effectiveWeight*100).toFixed(2)}% effective weight`}));
  const chainStats=useMemo(()=>industryChain.map(node=>{
    const values=node.companies.map(c=>priceRows[c.ticker]?.[priceMetric] ?? null).filter((value):value is number=>value!==null);
    const fundamentalValues=node.companies.map(c=>priceRows[c.ticker]?.fundamentalComposite ?? null).filter((value):value is number=>value!==null);
    const creditMembers=cdsIssuers.filter(issuer=>node.companies.some(companyItem=>companyItem.ticker===issuer.ticker));
    const creditValues=creditMembers.flatMap(issuer=>[issuer.oneMonth,issuer.threeMonth]);
    const average=values.length?values.reduce((sum,value)=>sum+value,0)/values.length:null;
    const fundamentalAverage=fundamentalValues.length?fundamentalValues.reduce((sum,value)=>sum+value,0)/fundamentalValues.length:null;
    const creditPressure=creditValues.length?creditValues.reduce((sum,value)=>sum+value,0)/creditValues.length:null;
    return {
      id:node.id,
      average,
      covered:values.length,
      positive:values.filter(value=>value>0).length,
      marketSignal:marketSignal(average),
      fundamentalAverage,
      fundamentalCovered:fundamentalValues.length,
      fundamentalSignal:fundamentalSignal(fundamentalAverage),
      creditPressure,
      creditCovered:creditMembers.length,
      creditSignal:creditSignal(creditPressure),
    };
  }),[priceMetric,priceRows]);
  const importedCount=Object.values(priceRows).filter(row=>row.price!==null||row.change1d!==null||row.change1m!==null||row.change3m!==null||row.changeYtd!==null).length;
  const latestPriceDate=Object.values(priceRows).map(row=>row.asOf).filter(Boolean).sort().at(-1);
  const selectedChainNode=industryChain.find(node=>node.id===selectedChainNodeId)!;
  const selectedChainStats=chainStats.find(item=>item.id===selectedChainNodeId)!;
  const selectedConnections=chainEdges.filter(edge=>edge.source===selectedChainNodeId||edge.target===selectedChainNodeId);
  const connectedNodeIds=new Set(selectedConnections.flatMap(edge=>[edge.source,edge.target]));
  const selectedAtmosphereScore=atmosphereView==="core"?satelliteOverlay.core:satelliteOverlay.adjusted;

  useEffect(()=>{
    try{
      const saved=window.localStorage.getItem("aia-industry-chain-prices");
      if(!saved)return;
      const parsed=JSON.parse(saved) as Record<string,PriceRow>;
      const overrides=Object.values(parsed).filter(row=>row&&(row.price!==null||row.change1d!==null||row.change1m!==null||row.change3m!==null||row.changeYtd!==null||row.revenueGrowthYoy!==null||row.capexGrowthYoy!==null||row.fundamentalComposite!==null));
      if(!overrides.length){window.localStorage.removeItem("aia-industry-chain-prices");return;}
      setPriceRows(current=>{
        const next={...current};
        overrides.forEach(row=>{if(next[row.ticker])next[row.ticker]=mergePriceRow(next[row.ticker],row);});
        return next;
      });
      setPriceStatus("Local CSV override");
    }catch{
      window.localStorage.removeItem("aia-industry-chain-prices");
    }
  },[]);

  async function handlePriceUpload(event:ChangeEvent<HTMLInputElement>){
    const file=event.target.files?.[0];
    if(!file)return;
    const parsed=parsePriceCsv(await file.text());
    const current=snapshotPriceRows();
    let matched=0;
    parsed.forEach(row=>{if(current[row.ticker]){current[row.ticker]=mergePriceRow(current[row.ticker],row);matched+=1;}});
    setPriceRows(current);
    window.localStorage.setItem("aia-industry-chain-prices",JSON.stringify(current));
    setPriceStatus(`${matched} / ${Object.keys(current).length} tickers imported`);
    event.target.value="";
  }

  function clearPriceData(){
    setPriceRows(snapshotPriceRows());
    window.localStorage.removeItem("aia-industry-chain-prices");
    setPriceStatus("Indexlist.xlsx snapshot");
  }
  return <main id="top">
    <header className="topbar">
      <a className="brand" href="#top"><span className="brand-mark">AIA</span><span>AI Investment<br/>Atmosphere</span></a>
      <nav aria-label="Primary"><a href="#guide">Overview</a><a href="#heatmap" onClick={() => setPulseTab("monthly")}>Core index</a><a href="#adoption">Adoption</a><a href="#monetization">Monetization</a><a href="#hyperscalers">Hyperscalers</a><a href="#utilization">Infrastructure</a><a href="#market">Market</a><details className="nav-more"><summary>More</summary><div><a href="#policy">Policy</a><a href="#financial">Funding &amp; recovery</a><a href="#chain">Industry context</a><a href="#methodology">Methodology &amp; sources</a></div></details></nav>
      <div className="asof"><span className="live-dot"/>Market data · {workbookAmendments.metadata.creditAsOf}</div>
    </header>

    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">AI INVESTMENT ATMOSPHERE · PUBLIC EQUITY RESEARCH</div>
        <h1>AI spending is rising.<br/><em>Can profits catch up?</em></h1>
        <p>Four equally weighted pillars track adoption, monetization, hyperscalers and infrastructure. The research follows that activity into capacity, monetization, cash generation and returns, then tests it against equity and credit markets.</p>
        <div className="atmosphere-switch" aria-label="Atmosphere score view">{([{"id":"core","label":"Core","score":satelliteOverlay.core},{"id":"adjusted","label":"Satellite-adjusted","score":satelliteOverlay.adjusted}] as const).map(view=><button key={view.id} className={atmosphereView===view.id?"selected":""} onClick={()=>setAtmosphereView(view.id)} aria-pressed={atmosphereView===view.id} disabled={view.id==="adjusted"&&!satelliteOverlay.ready}><span>{view.label}</span><b>{formatIndex(view.score)}</b></button>)}</div>
        <div className="hero-foot">Core score: June 2026 <Source id="S1"/> · Equity and CDS observations through {workbookAmendments.metadata.creditAsOf} <Source id="S4"/><Source id="S5"/> · Financial periods vary by company; supplementary score adjustments retain their 16 Sep vintage.</div>
      </div>
      <div className="gauge" aria-label={`${atmosphereView==="core"?"Core":"Satellite-adjusted"} AI investment atmosphere score ${formatIndex(selectedAtmosphereScore)}${selectedAtmosphereScore===null?"":" out of 100"}`} style={{"--score":`${selectedAtmosphereScore??0}%`} as React.CSSProperties}>
        <div><span>{atmosphereView==="core"?"CORE":"ADJUSTED"}</span><strong>{formatIndex(selectedAtmosphereScore)}</strong><small>{selectedAtmosphereScore===null?"WITHHELD":selectedAtmosphereScore>50?"ABOVE HISTORICAL NORM":selectedAtmosphereScore<50?"BELOW HISTORICAL NORM":"AT HISTORICAL NORM"}</small></div>
      </div>
    </section>

    <section className="reader-guide" id="guide" aria-labelledby="guide-title">
      <div className="guide-intro">
        <div className="eyebrow">EXECUTIVE SUMMARY · INVESTMENT CONCLUSION</div>
        <h2 id="guide-title">AI capacity is arriving faster than evidence of capital productivity.</h2>
        <p>The revised June core index stands at {latestCore.score?.toFixed(1)} (methodology v3.0), using separate Ramp business-sample and OpenRouter routed-volume signals for Adoption; volume and price changes combine into nominal spending growth; adoption breadth provides context. Hyperscaler CapEx reached a record $188.3B in 2026Q2. The five covered hyperscalers owned an estimated 13.34 million H100 equivalents by 2026Q1, and cash investment absorbed 77.3% of operating cash flow across Microsoft, Alphabet, Amazon and Meta.</p>
        <p>Epoch estimates 6.15 million H100 equivalents in use across five frontier labs at year-end 2025. Under a 30% effective-utilization scenario, one frontier training run represents 0.28%–4.20% of a covered lab&apos;s annual compute capacity. Fleet economics therefore depend on recurring inference, experimentation and external cloud workloads.</p>
        <p>The core index places the covered signals above their historical norms; it does not establish an expansion or contraction threshold. Hyperscalers brings together cloud revenue, RPO, capital spending, cash coverage and returns. Infrastructure follows equipment commitments into delivered capacity. These research groupings preserve the five underlying index weights.</p>
        <div className="guide-conclusion"><b>Investment conclusion</b><span>The investment case depends on paid utilization and cloud profit catching up with the capital base. Improving incremental ROIC and cash coverage would provide the clearest confirmation.</span></div>
      </div>
      <ol className="guide-path" aria-label="Research reading path">
        <li><a href="#adoption"><span>01</span><div><b>Adoption</b><small>Business-sample and routed token volumes; volume and price changes combine into nominal spending growth; adoption breadth provides context.</small></div></a></li>
        <li><a href="#demand"><span>02</span><div><b>Business spending</b><small>Supporting demand context.</small></div></a></li>
        <li><a href="#monetization"><span>03</span><div><b>Monetization</b><small>US frontier-lab revenue and valuations; China is a supplementary overlay. Business and consumer spending plus released lab revenue contribute to the core.</small></div></a></li>
        <li><a href="#hyperscalers"><span>03</span><div><b>Hyperscalers</b><small>Cloud revenue, RPO, capital spending, cash funding and returns.</small></div></a></li>
        <li><a href="#utilization"><span>04</span><div><b>Infrastructure</b><small>Equipment commitments, facilities and installed compute track physical delivery.</small></div></a></li>
        <li><a href="#financial"><span>05</span><div><b>Funding & recovery</b><small>Training costs and financing dependencies frame recovery.</small></div></a></li>
        <li><a href="#market"><span>06</span><div><b>Market</b><small>Equity returns, credit spreads and financing demand.</small></div></a></li>
      </ol>
      <p className="guide-orientation"><a href="#chain">Explore the industry value chain.</a> <a href="#heatmap">Track the core index and momentum heatmap.</a> <a href="#hyperscalers">Assess cloud demand, cash generation and returns.</a> <a href="#data-freshness">Check data freshness by section.</a></p>
    </section>

    <section className="snapshot" aria-label="Headline indicators">
      <article><span>Core activity score</span><strong>{formatIndex(coreAtmosphereScore)}</strong><small>June · latest observed month</small></article>
      <article><span>June activity breadth</span><strong>Broad</strong><small>pillar scores relative to historical norms</small></article>
      <article><span>Quarterly CapEx</span><strong>$188.3B</strong><small className="up">+79.3% YoY</small></article>
      <article><span>Core pillars above historical norm</span><strong>{Object.values(coreByPillar).filter(v=>v>50).length} / 4</strong><small>methodology v2 · June pillar scores</small></article>
    </section>

    <details className="overlay-disclosure"><summary>View supplementary financial and credit adjustment · excluded from the four-pillar core</summary><section className="overlay-bridge" aria-label="Supplementary satellite overlay bridge">
      <article><span>Core atmosphere</span><strong>{satelliteOverlay.core.toFixed(1)}</strong><small>Last complete comparable month · June</small></article>
      <article><span>Fundamentals overlay</span><strong className={satelliteOverlay.fundamentalDelta>=0?"positive":"negative"}>{satelliteOverlay.fundamentalDelta>=0?"+":""}{satelliteOverlay.fundamentalDelta.toFixed(1)}</strong><small>Median score {satelliteOverlay.fundamentalScore.toFixed(1)} · 32 issuers</small></article>
      <article><span>Credit overlay</span><strong className={satelliteOverlay.creditDelta>=0?"positive":"negative"}>{satelliteOverlay.creditDelta>=0?"+":""}{satelliteOverlay.creditDelta.toFixed(1)}</strong><small>Normalized score {satelliteOverlay.creditScore.toFixed(1)} · 25 issuers</small></article>
      <article><span>Bond issuance</span><strong>0.0</strong><small>Separate funding signal · latest coverage incomplete</small></article>
      <article className="adjusted-card"><span>Adjusted view</span><strong>{formatIndex(satelliteOverlay.adjusted)}</strong><small>{satelliteOverlay.ready?"Core plus financial and credit signals":"Unavailable with current coverage"}</small></article>
    </section></details>

    <DataFreshness/>
    <section className="heatmap-overview" id="heatmap" aria-label="AI activity pulse">
      <div className="pulse-frequency-tabs" role="tablist" aria-label="Pulse frequency" onKeyDown={event => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? "monthly" : event.key === "End" ? "weekly" : pulseTab === "monthly" ? "weekly" : "monthly";
        setPulseTab(next);
        document.getElementById(`pulse-tab-${next}`)?.focus();
      }}>
        {(["monthly", "weekly"] as const).map(tab => <button key={tab} type="button" role="tab" id={`pulse-tab-${tab}`} aria-controls={`pulse-panel-${tab}`} aria-selected={pulseTab === tab} tabIndex={pulseTab === tab ? 0 : -1} onClick={() => setPulseTab(tab)}>{tab === "monthly" ? "Monthly core index" : "Weekly pulse"}</button>)}
      </div>
      <div role="tabpanel" id="pulse-panel-monthly" aria-labelledby="pulse-tab-monthly" hidden={pulseTab !== "monthly"}>
      <div className="heatmap-head"><div><div className="eyebrow">MONTHLY CONSTITUENT SCORE HEATMAP</div><h2 id="heatmap-title">Adoption and demand are strong; capital spending remains above its historical norm.</h2><p>January 2024–September 2026 · each constituent compared with its own history · 50 = historical norm · relative strength, not zero growth</p></div><div className="heat-legend continuous-legend" aria-label="Continuous heatmap legend"><div className="continuous-scale"><i/><span>0 · Below norm</span><span>50 · Norm</span><span>100 · Above norm</span></div><span><i className="heat-na"/>Unavailable</span></div></div>
      <SectionSummary current={`Methodology v3.0 puts the June core score at ${latestCore.score?.toFixed(1)}. Adoption scores ${coreByPillar.Adoption.toFixed(1)} and Infrastructure ${coreByPillar.Infrastructure.toFixed(1)}. Nominal spending growth drives Adoption; surveys and paid-adoption rates provide breadth context. Monetization includes business spending, consumer card spending and released lab revenue. Available pillars share the index equally.`} conclusion="The buildout remains broad. The next test is whether paid usage, cash generation and incremental returns justify the expanding capital base."/>
      <div className="core-heatmap-workbench">
      <div className="compact-heatmap-panel">
        <p className="compact-heatmap-instruction">Read each row across time: a shift toward green indicates a rising signal; toward red, a falling signal. Colors use a continuous scale relative to each constituent’s own history. Available constituent observations extend through September 2026; some source values may be carried forward. CapEx and conditional core estimates fill July–September cells and carry an E label. The display stops one quarter after the last complete actual core observation; other missing cells stay blank. The headline uses the approved actual cutoff, June 2026. Available constituents are reweighted within pillars and available pillars share the index equally. The normalization baseline remains fixed through June. Select a pillar to inspect its constituents.</p>
      <div className="heat-table-wrap"><table className="heat-table monthly-heat-table compact-heat-table">

        <thead><tr><th rowSpan={2}>Pillar / scoring basis</th>{heatmapQuarters.map(quarter=><th key={quarter} colSpan={3}>{quarter}</th>)}</tr>
          <tr>{heatmapMonths.map((month,index)=><th key={month} className={index%3===0?"quarter-start":""}>{new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US",{month:"short",timeZone:"UTC"})}</th>)}</tr></thead>
        <tbody><tr className={`core-score-row ${compositeSelection==="Official core index"?"selected":""}`}><th><button type="button" onClick={()=>setCompositeSelection("Official core index")} aria-pressed={compositeSelection==="Official core index"}>Core index / estimate<small>Solid history · E = conditional estimate</small></button></th>{heatmapMonths.map((month,index)=>{const score=displayedCoreScore(month);const estimated=month>actualCoreMonth;return <td key={month} style={scoreHeatStyle(score)} className={`${scoreHeatClass(score)} ${index%3===0?"quarter-start":""}`}><button type="button" onClick={()=>{setCompositeSelection("Official core index");setContributionMonth(month>actualCoreMonth?actualCoreMonth:month);}} aria-pressed={compositeSelection==="Official core index"} aria-label={`Official core index, ${month}: ${score??"unavailable"}`} title={`${month} · ${estimated?"Conditional estimate; other pillars held at June scores":"Actual core"} ${score??"unavailable"}`}>{score===null?"":`${score.toFixed(0)}${estimated?" E":""}`}</button></td>})}</tr>{monthlyHeatmap.map(row=><tr key={row.pillar} className={compositeSelection===row.pillar?"selected":""}>
          <th scope="row"><HeatmapPillarLabel pillar={row.pillar} quarterly={row.quarterly} selected={compositeSelection===row.pillar} onSelect={()=>selectHeatmapPillar(row.pillar)}/><Source id={row.source}/></th>
          {row.monthlyCells.map((cell,index)=><td key={cell.month} style={scoreHeatStyle(cell.value)} className={`${scoreHeatClass(cell.value)} ${index%3===0?"quarter-start":""}`}><button type="button" onClick={()=>{selectHeatmapPillar(row.pillar);setContributionMonth(cell.month);}} aria-label={`${row.pillar}, ${cell.month}: ${cell.value===null?"unavailable":`${cell.value.toFixed(1)} score`}, ${row.quarterly?`${cell.quarter} trailing-four-quarter score held within quarter`:"normalized constituent score"}`} aria-pressed={compositeSelection===row.pillar} title={`${cell.month} · ${row.quarterly?`${cell.quarter} normalized TTM score held`:"Normalized score"} · ${cell.value===null?"unavailable":`${cell.value.toFixed(1)} points`}`}>{cell.value===null?"":`${cell.value.toFixed(0)}${row.quarterly&&cell.month>actualCoreMonth?" E":""}`}</button></td>)}
        </tr>)}</tbody>
      </table></div>
      </div>
      <CoreHeatmapChart title={compositeSelection} corePoints={heatmapMonths.map(month=>({month,value:atmosphereHistory.find(([date])=>date===month)?.[1]??null}))} points={compositePoints} official={compositeSelection==="Official core index"} quarterly={compositeSelection==="Hyperscalers"}/>
      </div>

      {heatmapPillar==="Infrastructure"&&<DemandHeatmap/>}

      <CoreContributions month={contributionMonth} onMonthChange={setContributionMonth} published={legacyAtmosphereHistory.find(([month])=>month===contributionMonth)?.[1]??null}/>

      <details className="constituent-history" open><summary>Historical constituent trends · {heatmapPillar}</summary>
        <div className="constituent-history-heading"><h3>{heatmapPillar} · monthly constituent history</h3><p>{"Core pillar · 25% nominal weight"} · normalized constituent scores · 50 = historical norm · relative strength, not zero growth</p></div>
        <div className="heat-table-wrap"><table className="heat-table monthly-heat-table constituent-heat-table"><thead><tr><th>Underlying signal</th>{heatmapMonths.map(month=><th key={month}>{month.slice(2)}</th>)}</tr></thead><tbody>{constituentHistory.map(row=><tr key={row.ticker}><th>{row.name}<small>{row.ticker}</small></th>{row.cells.map((cell,index)=><td key={cell.month} style={scoreHeatStyle(cell.value)} className={`${scoreHeatClass(cell.value)} ${index%3===0?"quarter-start":""}`} title={`${cell.treatment} · signal ${cell.signal?.toFixed(2)??"n/a"} · ${row.name} · ${cell.month} · ${cell.value===null?"Missing input":`${cell.value.toFixed(1)} score`} · source level ${cell.level??"unavailable"}`}><strong>{cell.value===null?"":cell.value.toFixed(1)}</strong></td>)}</tr>)}</tbody></table></div>
      </details>
      <div className="core-research-extension"><b>Additional evidence around the core pillars</b><p>Follow the demand and capacity evidence behind the investment thesis.</p><div><a href="#token-activity">Demand: daily and weekly token activity</a><a href="#labs">Monetization: US frontier-lab revenue and run rates</a><a href="#useful-task-economics">Adoption: successful-task affordability</a><a href="#infrastructure">Investment: operational capacity and installed compute</a></div></div>
      <div className="heatmap-drilldown" aria-live="polite">
        <div className="heatmap-drilldown-head"><div><span>SELECTED PILLAR · CONSTITUENTS</span><h3>{heatmapPillar}</h3></div><p>June 2026 · source level and scoring transformation</p></div>
        <div className="heatmap-detail-wrap"><table><thead><tr><th>Constituent</th><th>Ticker</th><th>Latest</th><th>Scoring signal</th><th>Score / supplementary momentum</th></tr></thead><tbody>{heatmapDetails.map(item=><tr key={item.ticker}><td><b>{item.name}</b></td><td><code>{item.ticker}</code></td><td>{item.latest}</td><td className={item.change===null?"muted":item.isTokens?"":item.change>=0?"positive":"negative"}>{item.change===null?"n/a":`${item.change>0?"+":""}${item.change.toFixed(1)}${item.isTokens?"":"%"} ${item.basis}`}</td><td>{item.status}</td></tr>)}</tbody></table></div>
      </div>
      {heatmapPillar==="Hyperscalers"&&<details className="evidence-data"><summary>Company CapEx breakdown · 2026 Q2</summary><div className="heatmap-detail-wrap"><table><caption>Company detail · supplementary to the combined CapEx signal</caption><thead><tr><th>Company</th><th>2026Q2 CapEx ($B)</th><th>Trailing 4Q YoY growth</th></tr></thead><tbody>{latestCore.companyCapexRows.map(row=><tr key={row.ticker}><td>{row.name}</td><td>{row.level?.toFixed(2)??"n/a"}</td><td>{row.growth===null?"n/a":`${row.growth.toFixed(1)}%`}</td></tr>)}</tbody></table><p>Combined growth = total spending in the latest four quarters ÷ total spending in the preceding four quarters − 1. Company growth rates are not averaged. Consolidated CapEx includes spending beyond AI.</p></div></details>}
      {compositeSelection==="Hyperscalers"&&<details className="evidence-data"><summary>CapEx and RPO forecasts, hardware prices, and supply-chain financials</summary><SupplyPanel/></details>}
      <div className="current-pulse"><div><span>Latest complete CapEx quarter</span><strong>2026Q2 constituent QoQ</strong></div>{latestCapexPulse.map(c=><div key={c.ticker} className={c.v>=0?"pulse-up":"pulse-down"}><span>{c.ticker}</span><b>{c.v>0?"+":""}{c.v.toFixed(1)}%</b></div>)}</div>

      <SectionNotes section="heatmap"/>
      </div>
      <div role="tabpanel" id="pulse-panel-weekly" aria-labelledby="pulse-tab-weekly" hidden={pulseTab !== "weekly"}>
        <WeeklyPulse/>
      </div>
    </section>

    <section className="section" id="pulse">
      <div className="section-head"><div><div className="eyebrow">CORE INDEX · PILLAR DETAIL</div><h2>Demand is strong across the equipment buildout.</h2></div><p>Core pillar scores · supporting demand evidence</p></div>
      <SectionSummary current={`The revised core index is ${latestCore.score?.toFixed(1)} for June (methodology v3.0). Paid adoption and median spending add evidence of business willingness to pay. Cash generation and capital returns provide the next economic test.`} conclusion="Equipment demand remains broad; the next test is whether the buildout converts into cash generation and higher incremental returns."/>


      <div className="pillar-layout">
        <div className="pillar-grid" role="list" aria-label="Atmosphere pillars">{(Object.keys(pillars) as Pillar[]).map(name=><button key={name} className={`pillar-card ${pillar===name?"selected":""}`} onClick={()=>setPillar(name)} aria-pressed={pillar===name}>
          <div className="pillar-top"><span>{name}</span><strong>{pillars[name].score}</strong></div><div className="score-track"><i style={{width:`${pillars[name].score}%`}}/></div><div className="pillar-bottom"><b>{pillars[name].tone}</b><span>{pillars[name].change}</span></div>
        </button>)}</div>
        <aside className="pillar-detail"><div><span className="detail-kicker">SELECTED PILLAR</span><h3>{pillar}</h3><p>{pillars[pillar].note}</p></div><div className="detail-stat"><span>Core breadth</span><strong>{pillars[pillar].breadth}</strong></div></aside>
      </div>

      {<div className="signal-table-wrap"><table><thead><tr><th>Underlying signal</th><th>Ticker</th><th>Latest</th><th>YoY</th><th>Role in index</th></tr></thead><tbody>{visibleSeries.map(s=><tr key={s.ticker}><td>{s.name}</td><td><code>{s.ticker}</code></td><td>{s.value}</td><td className={s.yoy===null?"muted":s.yoy>=0?"positive":"negative"}>{s.yoy===null?"n/a":`${s.yoy>0?"+":""}${s.yoy.toFixed(1)}%`}</td><td><span className={s.status.startsWith("Included")?"status included":"status context"}>{s.status}</span></td></tr>)}</tbody></table></div>}

      <SectionNotes section="pulse"/>
    </section>

    <PillarResearch id="adoption" number="01" pillar="Adoption" title="From token usage to dollar spending" summary="Volume shows how much compute is used. Unit cost shows how much of that usage translates into spending." historyFooter={<><AdoptionMetrics label="Business adoption observations"><AdoptionMetric><span>Current business AI use</span><strong>{latestCore.contextRows.find(r=>r.ticker==="BTOS0700")?.level?.toFixed(1)}%</strong><small>June 2026 · BTOS0700 · zero score weight</small></AdoptionMetric><AdoptionMetric><span>Expected business AI use</span><strong>{latestCore.contextRows.find(r=>r.ticker==="BTOS2400")?.level?.toFixed(1)}%</strong><small>June 2026 · BTOS2400 · zero score weight</small></AdoptionMetric>
      <AdoptionMetric><span>Ramp paid business AI adoption</span><strong>{latestCore.contextRows.find(r=>r.ticker==="RAMP_PAID_ADOPTION")?.level?.toFixed(1)}%</strong><small>June 2026 · zero score weight · latest month: {rampSnapshot.monthly.at(-1)?.paidAdoption?.toFixed(1)}%</small></AdoptionMetric>
      </AdoptionMetrics><SectionNotes section="adoption"/>
    </>}>
    <AdoptionReadthrough/>
    <div className="adoption-panel-row"><TokenActivity/><AdoptionPrices/></div>
    <div className="adoption-panel-row adoption-spending-row"><RampWeeklySpending/><AdoptionSpending/></div>
    <EvidenceGroup title="Task affordability" description="Successful-task costs complement token prices."/>
    <div className="adoption-task-context"><UsefulTaskEconomics compact/></div>

    </PillarResearch>


    <span id="imports" aria-hidden="true"/>
    <details className="section evidence-data" id="demand"><summary>Business spending · supporting demand context</summary><RampDemand/></details>

    <Monetization/>

    <section className="section hyperscalers-section" id="hyperscalers" aria-labelledby="hyperscalers-title">
      <div className="eyebrow">03 · HYPERSCALERS</div><h2 id="hyperscalers-title">Hyperscalers</h2>
      <p className="chapter-lead">Does cloud demand support the investment—and can cash generation fund it?</p>
      <p className="section-summary">Read cloud revenue and contracted demand alongside capital commitments, then test cash funding and capital productivity. Forecasts describe the outlook; reported cash flow and consolidated returns provide the funding and payback evidence. Company-wide measures include businesses beyond AI.</p>
      <nav className="pillar-crosslink" aria-label="Hyperscalers reading path"><a href="#hyperscaler-demand">Cloud demand</a> · <a href="#hyperscaler-investment">Capital investment</a> · <a href="#sustainability">Cash funding</a> · <a href="#roic">Capital returns</a></nav>
      <div id="hyperscaler-demand"><HyperscalerDemand/></div><CloudReference/>
      <div id="hyperscaler-investment"><EvidenceGroup title="Capital commitments" description="Compare Bloomberg headline CapEx, upcoming fiscal quarter estimates, and the five-company spending trend."/>
      <HyperscalerCapexLatest/>
      </div>
    <section className="hyperscaler-cash-returns" aria-label="Cash generation and capital productivity">
    <EvidenceGroup title="Cash generation and capital productivity" description="Compare cash generation with investment, assess funding headroom, then test whether the expanding capital base earns adequate returns."/>
    <p className="section-summary">Retained source coverage: cash funding and ROIC through June 2026 for Microsoft, Alphabet, Amazon and Meta; Oracle through March 2026. The latest CapEx workbook does not contain the operating cash flow, NOPAT or invested-capital inputs needed to extend these charts. Cloud revenue and RPO above retain their separately dated source vintage.</p>
    <div className="financial-cash-return-row">
    <InvestmentSustainability compact/>
    <RoicAnalysis compact/>
    </div>
      <details className="evidence-data"><summary>Usage, investment and returns · trends and interpretation</summary><DemandToReturns/></details>
    </section>
      <details className="evidence-data"><summary>China capital expenditure · supplementary market comparison</summary><ChinaCapexChart company={chinaCompany}/><p>Source S3 · RMB billions · issuer definitions differ.</p><SectionNotes section="capex"/></details>
      <p className="pillar-crosslink"><a href="#utilization">Follow investment into physical infrastructure ↓</a></p>
      <p>Research organization only: existing composite weights are unchanged. Cloud revenue and RPO estimates remain unweighted until fiscal periods and business scopes are reconciled.</p>
    </section>



    <PillarResearch id="utilization" number="04" pillar="Infrastructure" history={false} classification="PHYSICAL INFRASTRUCTURE" title="From procurement to operating capacity." summary="Track what is being ordered, built, and brought online.">
      <InfrastructureBrowser/>
      <details className="evidence-data"><summary>Shared semiconductor and foundry context</summary><InfrastructureSignals stage="shared"/><DemandSupplement/></details>
    </PillarResearch>



    <PolicyDataCenters/>

    <PillarResearch id="financial" number="05" pillar="Funding & recovery" classification="SUPPLEMENTARY RESEARCH" title="Cost recovery and funding dependencies frame the wider investment cycle." summary="Training costs and supplier financing frame the recovery challenge. Cash coverage and consolidated returns now sit with cloud demand and capital commitments in Hyperscalers. Market evidence examines equity performance, credit and bond issuance separately." history={false}>
    <span id="capital-return" className="legacy-section-anchor"/>
    <p className="pillar-crosslink"><a href="#hyperscalers">Review cloud demand, investment, cash generation and returns ↑</a></p>
    <EvidenceGroup title="Cost escalation and monetization pressure" description="Estimated training costs set a recovery hurdle; usage, cash CapEx and consolidated ROIC test whether activity and returns move together. Read with task affordability in Adoption and US frontier-lab revenue in Monetization. Lower buyer costs can stimulate use, but do not establish lower realized revenue per token or lower margins."/>
    <div className="related-evidence-row economics-evidence-row">
      <div className="evidence-column"><TaskEconomics compact/></div>

    </div>
    <EvidenceGroup title="Funding dependencies" description="Supplier financing can support customer demand; test exposure to that funding separately from realized revenue."/>
    <div className="funding-dependencies"><CircularFinancing/><p className="pillar-crosslink"><a href="#chain">Compare reported financial scale across the industry value chain ↓</a></p></div>


    </PillarResearch>

    <PillarResearch id="market" number="06" pillar="Market" classification="EQUITY & CREDIT · SUPPLEMENTARY RESEARCH" title="Equity returns price the opportunity; credit spreads price financing risk." summary="Market-cap-weighted performance across 36 supply-chain companies tracks market expectations across the value chain, alongside interest rates and non-AI business drivers. Compare sector size and returns with issuer CDS spreads, leverage and covered issuance relative to US IG bond supply. Equity strength can coexist with rising financing pressure; neither establishes realized operating returns. The market evidence supplements the core activity index." history={false}>
    <EvidenceGroup title="Equity performance" description="Compare market-cap-weighted sector returns and latest market capitalization, then examine credit conditions and financing demand."/>
    <p><a href="#weekly-pulse">View the weekly AI activity pulse ↑</a></p>
    <SemiconductorMarket/>
    <SupplyChainStockChart/>
    <section className="credit-section" id="credit">
      <EvidenceGroup title="Credit" description="CDS spreads, leverage and bond issuance assess financing risk, balance-sheet capacity and external funding demand."/>
    <section className="credit-subsection" aria-label="CDS spreads">
      <div className="section-head"><div><div className="eyebrow">MARKET · CREDIT & LEVERAGE</div><p className="credit-subsection-title">CDS spreads relative to the broader IG market</p></div><p>Daily issuer spreads and IBOXUMAE benchmark <Source id="S4"/></p></div>
      <CreditBenchmark/>
    </section>
    <section className="credit-subsection" aria-label="Leverage">
      <LeverageDistributions/>
      <details className="evidence-data"><summary>Individual issuer leverage and CDS comparison</summary><CreditFinancialComparison/></details>

      <SectionNotes section="credit"/>
    </section>
    <section className="credit-subsection financing-section" id="financing">
      <div className="section-head"><div><div className="eyebrow">MARKET · EXTERNAL FUNDING</div><h4 className="credit-subsection-title">AI bond issuance in the broader bond market</h4></div><p>Bond issuance by month, issuer and sector <Source id="S6"/></p></div>
      <BondSectorFinancing/>
      <SectionNotes section="financing"/>
    </section>
    </section>

    </PillarResearch>

    <section className="section chain-section" id="chain">
      <div className="section-head chain-head"><div><div className="eyebrow">SUPPORTING CONTEXT · AI INDUSTRY VALUE CHAIN</div><h2>How is economic activity distributed across the chain?</h2></div><p>{latestPriceDate?`Market data through ${latestPriceDate}`:"Market date unavailable"}</p></div>
      <ValueDistribution/>
      <details className="vd-legacy"><summary>Explore the existing market signals and industry relationship map</summary>
      <div className="chain-toolbar">
        <div className="chain-control-stack">
          <div className="view-switch" aria-label="Industry chain view">{([{"id":"map","label":"Map"},{"id":"cards","label":"Cards"},{"id":"companies","label":"Companies"}] as const).map(view=><button key={view.id} className={chainView===view.id?"selected":""} onClick={()=>setChainView(view.id)} aria-pressed={chainView===view.id}>{view.label}</button>)}</div>
          <div className="metric-switch" aria-label="Price return period">{(Object.keys(priceMetricLabels) as PriceMetric[]).map(metric=>{
            const available=Object.values(priceRows).some(row=>row[metric]!==null);
            return <button key={metric} className={priceMetric===metric?"selected":""} onClick={()=>setPriceMetric(metric)} aria-pressed={priceMetric===metric} disabled={!available} title={available?undefined:`${priceMetricLabels[metric]} is unavailable in the current snapshot`}>{priceMetricLabels[metric]}</button>;
          })}</div>
        </div>
        <div className="data-actions"><span><b>{importedCount}</b> / {industryChainSnapshotMetadata.coverage} covered · {priceStatus}</span><label className="data-button">Import price CSV<input type="file" accept=".csv,text/csv" onChange={handlePriceUpload}/></label><a className="data-button secondary" href="/ai-industry-chain-price-template.csv" download>Download template</a>{priceStatus!=="Indexlist.xlsx snapshot"&&<button className="data-button ghost" onClick={clearPriceData}>Reset snapshot</button>}</div>
      </div>
      {chainView==="map"&&<div className="chain-map-layout">
        <div className="chain-map-panel">
        <p className="chain-map-scroll-hint" id="chain-map-scroll-hint">Scroll horizontally to explore the map, or choose Cards for a stacked view.</p>
        <div className="chain-map-scroll" tabIndex={0} role="region" aria-label="Scrollable supply chain map" aria-describedby="chain-map-scroll-hint">
          <div className="chain-map-canvas" style={{height:mapHeight}} role="group" aria-label="AI industry chain relationship map">
            <div className="map-axis"><span>Demand & monetization</span><span>Compute stack</span><span>Deployment</span><span>Physical constraints</span></div>
            <div className="map-legend" role="group" aria-label="Relationship legend"><span><i className="demand"/>Demand signal</span><span><i className="dependency"/>Production dependency</span><span><i className="constraint"/>Capacity constraint</span></div>
            <svg className="map-connections" width="100%" height={mapHeight} aria-hidden="true">
            <defs>{(["demand","dependency","constraint"] as const).map(relation=><marker key={relation} id={`map-arrow-${relation}`} className={`map-arrow ${relation}`} markerWidth="8" markerHeight="10" refX="8" refY="5" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M0,0 L8,5 L0,10 Z"/></marker>)}</defs>
            {chainEdges.map(edge=>{
              const active=edge.source===selectedChainNodeId||edge.target===selectedChainNodeId;
              const route=edgeRoutes[edge.id];
              const start=route[0],end=route[route.length-1];
              return <g key={edge.id} className={`map-edge ${edge.id} ${edge.relation} ${edge.direction} ${active?"active":"muted-edge"}`}>
                <title>{edge.label}</title>
                {route.slice(1).map((point,index)=><line key={index} x1={mapX(route[index][0])} y1={route[index][1]} x2={mapX(point[0])} y2={point[1]} markerEnd={index===route.length-2?`url(#map-arrow-${edge.relation})`:undefined} markerStart={index===0&&edge.direction==="two-way"?`url(#map-arrow-${edge.relation})`:undefined}/>)}
                <text x={mapX(edge.relation==="constraint"?902:(start[0]+end[0])/2)} y={(start[1]+end[1])/2-10} textAnchor="middle" writingMode={edge.relation==="constraint"?"vertical-rl":undefined}>{edge.label}</text>
              </g>;
            })}
            </svg>
            {industryChain.map(node=>{
              const stats=chainStats.find(item=>item.id===node.id)!;
              const isSelected=node.id===selectedChainNodeId;
              const isConnected=connectedNodeIds.has(node.id);
              return <button key={node.id} style={{left:mapX(nodePositions[node.id][0]),top:nodePositions[node.id][1],width:mapX(nodeWidth),height:nodeHeight}} className={`map-node map-node-${node.id} ${isSelected?"selected":isConnected?"connected":"muted-node"}`} onClick={()=>setSelectedChainNodeId(node.id)} aria-pressed={isSelected}>
                <span className="map-node-stage">{node.order} · {node.stage}</span>
                <span className="map-node-title">{node.title}</span>
                <span className="map-node-tickers">{node.companies.map(companyItem=><b key={companyItem.ticker}>{companyItem.ticker}</b>)}</span>
                <span className="map-node-signals">
                  <span className={`signal-${stats.marketSignal.tone}`} title={`${priceMetricLabels[priceMetric]} market signal: ${stats.marketSignal.label}`}><small>MKT</small><b>{formatReturn(stats.average)}</b></span>
                  <span className={`signal-${stats.fundamentalSignal.tone}`} title={`Fundamental composite: ${stats.fundamentalSignal.label}`}><small>FIN</small><b>{formatScore(stats.fundamentalAverage)}</b></span>
                  <span className={`signal-${stats.creditSignal.tone}`} title={`${stats.creditSignal.label}; ${stats.creditCovered} of 4 issuers covered`}><small>CDS</small><b>{stats.creditCovered?formatBp(stats.creditPressure):"n/a"}</b></span>
                </span>
              </button>;
            })}
          </div>
        </div>
        </div>
        <aside className="chain-map-detail" aria-live="polite">
          <div className="detail-heading"><span>{selectedChainNode.order} · {selectedChainNode.stage}</span><strong className={returnClass(selectedChainStats.average)}>{formatReturn(selectedChainStats.average)}</strong></div>
          <h3>{selectedChainNode.title}</h3>
          <p>{selectedChainNode.description}</p>
          <div className="detail-overview"><span>THREE-SIGNAL OVERVIEW</span><p>Price momentum is <b>{selectedChainStats.marketSignal.label.toLowerCase()}</b> and fundamentals are <b>{selectedChainStats.fundamentalSignal.label.toLowerCase()}</b>. {selectedChainStats.creditCovered?<>CDS pressure is <b>{selectedChainStats.creditSignal.label.toLowerCase().replace("pressure ", "")}</b> across {selectedChainStats.creditCovered} of 4 covered issuers.</>:<>Current CDS coverage does not support a financing-pressure conclusion.</>}</p></div>
          <div className="detail-signals" aria-label="Market, fundamental and CDS pressure overview">
            <div className={`signal-${selectedChainStats.marketSignal.tone}`}><span>Market · {priceMetricLabels[priceMetric]}</span><strong>{formatReturn(selectedChainStats.average)}</strong><small>{selectedChainStats.marketSignal.label}</small></div>
            <div className={`signal-${selectedChainStats.fundamentalSignal.tone}`}><span>Fundamental</span><strong>{formatScore(selectedChainStats.fundamentalAverage)}</strong><small>{selectedChainStats.fundamentalSignal.label} · {selectedChainStats.fundamentalCovered}/4</small></div>
            <div className={`signal-${selectedChainStats.creditSignal.tone}`}><span>CDS pressure</span><strong>{formatBp(selectedChainStats.creditPressure)}</strong><small>{selectedChainStats.creditSignal.label} · {selectedChainStats.creditCovered}/4</small></div>
          </div>
          <div className="detail-companies">{selectedChainNode.companies.map(companyItem=>{
            const row=priceRows[companyItem.ticker];
            const performance=row?.[priceMetric]??null;
            return <button key={companyItem.ticker} onClick={()=>setChainView("companies")} title="Open the company table">
              <span><b>{companyItem.ticker}</b><small>{companyItem.name}</small></span><strong className={returnClass(performance)}>{formatReturn(performance)}</strong>
            </button>;
          })}</div>
          <div className="detail-operating"><span>OPERATING CHECK</span><p>{selectedChainNode.operatingKpi}</p></div>
          <div className="detail-connections"><span>STRUCTURAL CONNECTIONS</span>{selectedConnections.map(edge=>{
            const outbound=edge.source===selectedChainNodeId;
            const otherId=outbound?edge.target:edge.source;
            const otherNode=industryChain.find(node=>node.id===otherId)!;
            const direction=edge.direction==="two-way"?"↔":outbound?"→":"←";
            return <button key={edge.id} onClick={()=>setSelectedChainNodeId(otherId)}><i className={edge.relation}/><span><b>{direction} {otherNode.title}</b><small>{edge.label}</small></span></button>;
          })}</div>
          <footer><span>{selectedChainStats.covered} / 4 covered</span><b>{selectedChainStats.covered?`${selectedChainStats.positive} positive`:"Awaiting data"}</b></footer>
        </aside>
      </div>}
      {chainView==="cards"&&<><div className="chain-guide"><span>End-market demand</span><i/><span>Compute capacity</span><i/><span>Physical constraints</span></div>
      <div className="chain-grid" aria-label="AI industry chain nodes">{industryChain.map(node=>{
        const stats=chainStats.find(item=>item.id===node.id)!;
        return <article className="chain-node" key={node.id}>
          <div className="node-top"><span>{node.order} · {node.stage}</span><b className={returnClass(stats.average)}>{formatReturn(stats.average)}</b></div>
          <h3>{node.title}</h3><p>{node.description}</p>
          <div className="node-tickers">{node.companies.map(companyItem=>{
            const performance=priceRows[companyItem.ticker]?.[priceMetric] ?? null;
            return <div key={companyItem.ticker}><span><b>{companyItem.ticker}</b><small>{companyItem.name}</small></span><strong className={returnClass(performance)}>{formatReturn(performance)}</strong></div>;
          })}</div>
          <div className="node-kpi"><span>OPERATING CHECK</span><p>{node.operatingKpi}</p></div>
          <footer><span>Equal-weight {priceMetricLabels[priceMetric]}</span><b>{stats.covered?`${stats.positive} / ${stats.covered} positive`:"Awaiting data"}</b></footer>
        </article>;
      })}</div></>}
      {chainView==="companies"&&<div className="chain-table-wrap"><table><thead><tr><th>Node</th><th>Company</th><th>Ticker</th><th>{priceMetricLabels[priceMetric]} return</th><th>Market as of</th><th>Fundamental score</th><th>Revenue YoY</th><th>CapEx YoY</th><th>Financial period</th></tr></thead><tbody>{industryChain.flatMap(node=>node.companies.map(companyItem=>{
        const row=priceRows[companyItem.ticker]; const performance=row?.[priceMetric] ?? null;
        return <tr key={companyItem.ticker}><td><span className="node-label">{node.order}</span>{node.title}</td><td>{companyItem.name}</td><td><code>{companyItem.ticker}</code></td><td className={returnClass(performance)}>{formatReturn(performance)}</td><td>{row?.asOf||"—"}</td><td>{formatScore(row?.fundamentalComposite??null)}</td><td className={returnClass(row?.revenueGrowthYoy??null)}>{formatReturn(row?.revenueGrowthYoy??null)}</td><td className={returnClass(row?.capexGrowthYoy??null)}>{formatReturn(row?.capexGrowthYoy??null)}</td><td>{row?.financialAsOf||"—"}</td></tr>;
      }))}</tbody></table></div>}


      <SectionNotes section="chain" methodology={<div className="chain-note"><b>Signal definitions:</b> Market is the equal-weight selected-period return (Strong ≥10%, Constructive ≥3%, Mixed &gt;−3%, otherwise Weak). Fundamental is the equal-weight composite from the <code>{industryChainSnapshotMetadata.fundamentalSheet}</code> company screen (Strong ≥65, Resilient ≥50, Mixed ≥35, otherwise Fragile). CDS pressure averages 1M and 3M spread changes for covered issuers only (Rising ≥+3 bp, Easing ≤−3 bp); coverage is always shown. Stock returns are compounded from observed daily returns since December 31, 2025; missing observations are not zero-filled. Local listings use different trading calendars and retain individual observation dates. Structural links represent industry relationships rather than company-level supplier contracts or index weights.</div>}/>
      </details>
    </section>



    <section className="section methodology" id="methodology">
      <div className="method-title"><div className="eyebrow">METHODOLOGY & DATA DISCLOSURES</div><h2>Signal construction and analytical scope.</h2><p>The core index measures investment momentum. The supplementary overlay adds financial quality and credit conditions. Cash coverage, lab revenue and ROIC provide separate evidence on sustainability and returns.</p></div>
<SectionNotes section="methodology" source={<><div className="sources"><article id="source-S14"><span>S14</span><div><b>Ramp AI Index — paid adoption and spending</b><p>Saved Ramp public dashboard data, retrieved 13 October 2026 from <a href="https://ramp.com/data/ai-index">Ramp’s public dashboard</a>, through August 2026. Paid adoption is the share of Ramp businesses with observed AI payments, not all U.S. businesses. Median spending is nominal USD per employee per month. Website JSON routes are undocumented; the supported API requires credentials. Provider adoption can overlap. Token volumes come from the separate Ramp TSM sample, aggregated from published model series. Daily rolling-seven-day fields cover a narrower provider sample and are not treated as daily observations. Spend-share and sector/provider breakdowns remain context. Spending calibration has 20 observations through June 2026. Monthly paid adoption/spending end in August, while token weeks run through 27 September. No live refresh is inferred.</p></div></article><article id="source-S1"><span>S1</span><div><b>Indexlist.xlsx — Index Price Value</b><p>Core monthly snapshot through June 2026, with retained Bloomberg data vintage of 16 Sep. The amended workbook supplies NAND exports and TSMC monthly revenue for supplementary demand comparisons through August; September export values carry prior observations. DRAM, NAND and TSMC are core Demand constituents; Ramp spending is added under methodology v3.0.</p></div></article><article id="source-S2"><span>S2</span><div><b>Consolidated U.S. hyperscaler CapEx workbook</b><p>Microsoft, Alphabet, Meta, Amazon and Oracle through calendar 2026Q2; company-specific accounting bases, actual/estimate status and proxy confidence preserved.</p></div></article><article id="source-S3"><span>S3</span><div><b>China cloud CapEx source collection</b><p>Tencent operating CapEx, Alibaba quarterly CapEx and Baidu cash CapEx through 2026Q2. RMB is primary; approximate values, inferred AI shares and issuer-specific definitions remain labeled.</p></div></article><article id="source-S4"><span>S4</span><div><b>Indexlist.xlsx — AI 5yrCDS Value</b><p>Bloomberg-implied issuer 5Y CDS and IBOXUMAE Curncy daily observations through 7 Oct 2026, with latest issuer ratings dated 30 Sep 2026. The daily benchmark analysis is refreshed; the supplementary credit adjustment and value-chain signals retain their labeled 16 Sep vintage.</p></div></article><article id="source-S5"><span>S5</span><div><b>Indexlist.xlsx — Supply Chain Financial Value</b><p>Latest reported financial metrics for 36 issuers, including TSMC, SK hynix, Samsung Electronics and Tokyo Electron. Stock observations use Supply Chain Stock Value daily returns and USD market caps through 7 October 2026. Market sector returns use lagged daily cap weights; the treemap uses latest caps. Three missing opening caps use first available proxies; their partial opening return histories are disclosed. Missing interim reports are labeled and receive no freshness penalty.</p></div></article><article id="source-S6"><span>S6</span><div><b>Indexlist.xlsx — Bond Issuance Value</b><p>Issuer-month amounts and issue counts from January 2024 through September 2026, plus monthly US IG corporate issuance through partial October. Both queries use USD amounts. Covered issuers include other countries and ratings, so the displayed ratio measures relative issuance scale rather than a strict US IG market share. January 2026 has no covered records and remains a gap. Latest-month completeness is not certified.</p></div></article><article id="source-S11"><span>S11</span><div><b>Epoch AI — AI chip owners, users and data centers</b><p>Owner-level chip estimates through 2026Q1, year-end 2025 lab-use estimates and 93 facility records through September 2026. H100e, power and workload values are modeled estimates rather than measures of realized utilization or financial return.</p></div></article></div><div className="sources"><article id="source-S9"><span>S9</span><div><b>OpenRouter daily rankings — refreshed 7 October 2026</b><p>Source: OpenRouter (openrouter.ai/rankings), as of 2026-10-07T08:18:10.306Z. The daily API history runs from January 2025 through 6 October 2026, with model-level top-50 rows and an aggregate long-tail bucket. The adoption chart includes Q3 with 92/92 days; Q4 remains partial and is excluded. Historical missing days are excluded from observed-day averages. Financial trend comparisons remain matched through Q2 because Q3 financial observations are unavailable. OpenRouter measures routed adoption, not model quality, provider-direct traffic or revenue. <a href="https://openrouter.ai/docs/api/api-reference/datasets/get-rankings-daily">Dataset methodology</a></p></div></article><article id="source-S10"><span>S10</span><div><b>Epoch AI and sourced disclosures — OpenAI and Anthropic</b><p>Media-reported and investor-disclosed operating observations through September 2026. The analysis separates recognized revenue from ARR, preserves floors and approximate values, and excludes incomparable margin definitions from the headline comparison.</p></div></article><article id="source-S12"><span>S12</span><div><b>Epoch AI — frontier models and machine-learning hardware</b><p>Frontier-model training-cost estimates in constant 2023 dollars and selected accelerator specifications. Models without cost estimates are excluded. <a href="https://epoch.ai/data">Dataset documentation</a></p></div></article><article id="source-S13"><span>S13</span><div><b>Task observations and Epoch AI — cost per successful task</b><p>Model-version prices are combined with benchmark success rates and assumed tokens per attempt. Protocol and model-class differences limit direct comparison.</p></div></article></div></>} methodology={<>      <div className="method-steps">
        <article><span>01</span><h3>Normalize momentum</h3><p>Each included series is converted to YoY change, then standardized against its own available history. This avoids adding incomparable source-native units.</p></article>
        <article><span>02</span><h3>Score each pillar</h3><p>Signal score = 50 + 15 × z-score, capped at 0–100. Macro series are equally weighted within their pillars. The CapEx pillar scores the growth of combined five-company spending.</p></article>
        <article><span>03</span><h3>Build the atmosphere</h3><p>Adoption, Monetization, Hyperscalers and Infrastructure each have a nominal 25% weight. Adoption scores nominal spending growth. Monetization combines Ramp business spending, consumer card spending and comparable lab revenue updates. Hyperscalers scores CapEx growth. Infrastructure includes equipment, construction and hardware pricing. A score above 50 indicates a stronger signal than its historical norm.</p></article>
        <article><span>04</span><h3>Add satellites separately</h3><p>The adjusted score adds bounded fundamental and credit deltas to the core. Bond issuance stays at zero weight until January 2026 is restored, September is complete and historical normalization is resolved. Nominal token spending growth enters Adoption at 20%, using a provisional six-month baseline. OpenRouter spending is estimated using an external benchmark; Ramp spending is matched within each window.</p></article>
      </div>
<div className="note-formulas"><b>SUPPLEMENTARY ADJUSTMENT FORMULA</b><p><code>Adjusted = clamp(Core + Fundamental Δ + Credit Δ, 0, 100)</code></p><p><code>Fundamental Δ = 10% × (median Fundamental Composite − 50)</code></p><p><code>Credit score = clamp(50 + 2.5 × CDS Change Signal, 0, 100)</code></p><p><code>Credit Δ = 10% × (Credit score − 50)</code></p><p>Each satellite delta is bounded to ±5 points. Core and satellite weights are not renormalized; missing values are not observed zeros. The adjusted score is withheld below financial/CDS coverage thresholds.</p></div></>} other={      <div className="limitations"><h3>Limits that matter for interpretation</h3><ul><li>Preserve Bloomberg units, seasonal-adjustment flags, release dates and point-in-time vintages.</li><li>Replace PREV-filled observations with explicit freshness and stale-value controls.</li><li>Backfill January 2026 bond issuance before publishing rolling-12-month YoY.</li><li>Add sector-neutral and size-neutral tests to the financial screen; cap extreme CapEx ranks only after sensitivity analysis.</li><li>Run alternative pillar weights, outlier controls and benchmark-relative backtests before integrating satellites.</li><li>Separate actual and forecast atmosphere indices before adding forward quarters.</li><li>A global aggregate requires consistent FX conversion, CapEx definitions, constituent weights and missing-proxy rules.</li></ul></div>}/>
    </section>

    <footer className="site-footer"><div className="brand"><span className="brand-mark">AIA</span><span>AI Investment<br/>Atmosphere</span></div><p>U.S. and China views use separate accounting definitions and currencies.</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
