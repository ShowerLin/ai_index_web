import { executiveCommentary, pillarCommentary } from "./research-commentary";
import ResearchCommentary from "./research-commentary-panel";
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
import {supplyChainStockSnapshot} from "./supply-chain-stock-snapshot";
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
import CoreContributions from "./core-contributions";
import CloudReference from "./cloud-reference";
import HyperscalerDemand from "./hyperscaler-demand";
import HyperscalerCapexLatest from "./hyperscaler-capex-latest";
import InfrastructureSignals from "./infrastructure-signals";
import SupplyPanel from "./supply-panel";
import TokenActivity from "./token-activity";
import OpenRouterModelVolume from "./openrouter-model-volume";
import {rampSnapshot} from "./ramp-snapshot";
import {frontierLabsSnapshot} from "./frontier-labs-snapshot";
import {tokenActivitySnapshot} from "./token-activity-snapshot";
import {infrastructureSnapshot} from "./infrastructure-snapshot";
import {coreContributionSnapshot as coreScores} from "./core-contribution-snapshot";
import CoreHeatmapChart from "./core-heatmap-chart";
import HeatmapPillarLabel, { HeatmapInfoLabel } from "./heatmap-pillar-label";
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

function constituentMethod(row: {treatment: string; scoringMethod?: string}) {
  if (row.scoringMethod) return row.scoringMethod;
  const treatment = row.treatment;
  if (treatment.toLowerCase().includes("adoption level")) return "Raw Z-score";
  if (treatment.includes("trailing 4Q")) return "4Q CapEx YoY Z-score";
  if (treatment.startsWith("TTM")) return "12M total YoY Z-score";
  if (treatment.startsWith("12M average")) return "12M avg YoY Z-score";
  if (treatment.startsWith("3M-average")) return "3M avg YoY Z-score";
  if (treatment.startsWith("Monthly price YoY")) return "12M log price change Z-score";
  if (treatment.startsWith("Absolute annualized revenue")) return "Log Ann revenue Z-score";
  if (treatment.startsWith("Nominal spending change")) return "28D spend growth Z-score";
  if (treatment.includes("four-week spending window")) return "4W spend growth Z-score";
  return treatment;
}

const heatmap = corePillarNames.map(pillar=>({pillar,source:pillar==="Hyperscalers"?"S2" as const:"S1" as const}));
type HeatmapPillar = Pillar;

const actualCoreMonth = capexProjection.metadata.anchorMonth;
const heatmapEnd = coreScores.metadata.heatmapThrough;
const coreByMonth = new Map<string, (typeof coreScores.months)[number]>(coreScores.months.map(row => [row.month, row]));
const heatmapMonths = coreScores.months.map(row => row.month).filter(month => month <= heatmapEnd);
const displayedCoreScore = (month:string) => coreByMonth.get(month)?.score ?? null;
const calendarQuarter = (month:string) => `${month.slice(0,4)} Q${Math.ceil(Number(month.slice(5))/3)}`;
const heatmapQuarters = [...new Set(heatmapMonths.map(calendarQuarter))];
const capexScenarioByQuarter = new Map<string, (typeof capexProjection.quarters)[number]>(
  capexProjection.quarters.map(point => [point.quarter, point]),
);
const monthlyHeatmap = heatmap.map(row => {
  const quarterly = row.pillar === "Hyperscalers";
  const monthlyCells = heatmapMonths.map(month => {
    const quarter = calendarQuarter(month).replace(" ", "");
    const members = coreByMonth.get(month)?.rows.filter(member => member.pillar === row.pillar) ?? [];
    const weight = members.reduce((sum, member) => sum + member.effectiveWeight, 0);
    const observed = weight > 0
      ? members.reduce((sum, member) => sum + (member.score ?? 0) * member.effectiveWeight / weight, 0)
      : null;
    const scenario = observed === null && quarterly && month > actualCoreMonth
      ? capexScenarioByQuarter.get(quarter)
      : undefined;
    const capexEstimate = scenario?.capexScore == null ? undefined : scenario;
    return {month, quarter, value: observed ?? capexEstimate?.capexScore ?? null, estimated: !!capexEstimate, capexEstimate};
  });
  return {...row, quarterly, monthlyCells};
});
const estimatedHeatmapMonths = new Set(monthlyHeatmap.flatMap(row =>
  row.monthlyCells.filter(cell => cell.estimated).map(cell => cell.month)));

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
      } else if (location.hash === "#heatmap" || location.hash === "#pulse") {
        setPulseTab("monthly");
      }
    };
    syncPulseTab();
    window.addEventListener("hashchange", syncPulseTab);
    return () => window.removeEventListener("hashchange", syncPulseTab);
  }, []);
  const [contributionMonth,setContributionMonth]=useState<string>(actualCoreMonth);
  const [compositeSelection,setCompositeSelection]=useState<HeatmapPillar | "Official core index">("Official core index");
  const [capexCountry,setCapexCountry]=useState<CapexCountry>("United States");
  const [chinaCompany,setChinaCompany]=useState<ChinaCompany>("All companies");
  const [priceMetric,setPriceMetric]=useState<PriceMetric>("change1m");
  const [chainView,setChainView]=useState<ChainView>("map");
  const [atmosphereView,setAtmosphereView]=useState<AtmosphereView>("core");
  const [selectedChainNodeId,setSelectedChainNodeId]=useState<ChainNodeId>("platforms");
  const [priceRows,setPriceRows]=useState<Record<string,PriceRow>>(()=>snapshotPriceRows());
  const [priceStatus,setPriceStatus]=useState("Indexlist.xlsx snapshot");
  const heatmapPillar = compositeSelection === "Official core index" ? undefined : compositeSelection;
  const selectedPillarHeatmap = monthlyHeatmap.find(row => row.pillar === heatmapPillar);
  const selectedCoreMonth=coreScores.months.find(row=>row.month===contributionMonth)??latestCore;
  const selectedPillarRows = selectedCoreMonth.rows.filter(row => row.pillar === heatmapPillar);
  const selectedCapexEstimate = selectedPillarHeatmap?.monthlyCells.find(cell => cell.month === selectedCoreMonth.month)?.capexEstimate;
  const heatmapDetails = selectedPillarRows
    .map(row => {
      if (row.ticker === "HYPERSCALER_TOTAL" && selectedCapexEstimate) {
        return {
          name: row.name,
          ticker: row.ticker,
          isTokens: false,
          isRunRate: false,
          latest: `$${selectedCapexEstimate.total.toFixed(2)}B (est.)`,
          change: selectedCapexEstimate.growth,
          signalUnit: "%",
          basis: row.treatment,
          status: `Estimated score ${selectedCapexEstimate.capexScore.toFixed(1)} · ${selectedCapexEstimate.quarter} five-company CapEx scenario`,
        };
      }
      const isTokens = row.ticker.endsWith("TOKEN_VOLUME");
      const isRate = ["BTOS0700", "BTOS2400", "RAMP_PAID_ADOPTION"].includes(row.ticker);
      const indexedTokens = isTokens && "unit" in row && row.unit === "Publisher index/day";
      const isRunRate = row.ticker.endsWith("_REVENUE_RUN_RATE");
      const isLogScore = isRunRate || row.treatment.includes("log price ratio");
      const sourceDate = "observationDate" in row ? row.observationDate : null;
      const sourceLabel = isRunRate ? "news" : isRate || row.ticker === "RAMP_MEDIAN_SPEND" ? "source month ending" : "window ending";
      const carried = "carriedForward" in row && row.carriedForward;
      let momentumDetail = "";
      if (row.shortMomentum !== null) {
        const unit = isRate ? " pp" : "%";
        momentumDetail = `; short momentum ${row.shortMomentum.toFixed(2)}${unit}`;
      }
      if (isTokens) momentumDetail = "; growth percentile";
      return {
        name: row.name,
        ticker: row.ticker,
        isTokens,
        isRunRate,
        latest: row.level === null ? "n/a" : isRunRate ? `$${(row.level / 1e9).toFixed(2)}B annualized` : `${row.level.toFixed(2)}${isTokens ? indexedTokens ? " publisher-index/day" : "T/day" : isRate ? "%" : ""}`,
        change: isLogScore && "scoringSignal" in row ? row.scoringSignal : row.growth,
        signalUnit: isLogScore ? "" : "%",
        basis: row.treatment,
        status: `Score ${row.score?.toFixed(1) ?? "n/a"}; ${(row.effectiveWeight * 100).toFixed(2)}% effective weight${momentumDetail}${sourceDate ? ` · ${sourceLabel} ${sourceDate}${carried ? " · carried forward" : ""}` : ""}`,
      };
    });
  const constituentHistory = (coreScores.months.at(-1)?.rows.filter(row => row.pillar === heatmapPillar) ?? [])
    .map(row => ({
      name: row.name,
      ticker: row.ticker,
      method: constituentMethod(row),
      treatment: row.treatment,
      cells: heatmapMonths.map((month, index) => {
        const point = coreByMonth.get(month)?.rows.find(r => r.ticker === row.ticker);
        const capexEstimate = row.ticker === "HYPERSCALER_TOTAL" ? selectedPillarHeatmap?.monthlyCells[index]?.capexEstimate : undefined;
        const revenueLevel = row.ticker.endsWith("_REVENUE_RUN_RATE");
        const signalValue = revenueLevel ? point?.level : point?.growth;
        const tokenVolume = row.ticker.endsWith("TOKEN_VOLUME");
        const signalLabel = signalValue == null ? "Unavailable" : revenueLevel
          ? `$${(signalValue / 1e9).toFixed(2)}B Ann` : tokenVolume ? `${signalValue.toFixed(2)}% MoM · 3M avg` : `${signalValue.toFixed(2)}%`;
        return {
          month,
          level: point?.level ?? null,
          value: point?.score ?? capexEstimate?.capexScore ?? null,
          capexEstimate,
          treatment: point?.treatment ?? "",
          signalLabel,
          observationDate: point && "observationDate" in point ? point.observationDate : null,
          sourceBasis: point && "sourceBasis" in point ? point.sourceBasis : null,
          sourceLabel: row.ticker.endsWith("_REVENUE_RUN_RATE") ? "news disclosure" : ["BTOS0700", "BTOS2400", "RAMP_PAID_ADOPTION", "RAMP_MEDIAN_SPEND"].includes(row.ticker) ? "source month ending" : "window ending",
          carriedForward: !!(point && "carriedForward" in point && point.carriedForward),
        };
      }),
    }));
  const compositePoints = heatmapMonths.map((month,index) => {
    if (compositeSelection === "Official core index") return {month,value:displayedCoreScore(month),low:null,high:null};
    const values=constituentHistory.flatMap(row=>{
      const cell = row.cells[index];
      return cell.value === null || cell.capexEstimate ? [] : [cell.value];
    });
    const cell = selectedPillarHeatmap?.monthlyCells[index];
    return {month,value:cell?.value??null,estimated:cell?.estimated,low:values.length?Math.min(...values):null,high:values.length?Math.max(...values):null};
  });
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
        <h1>AI investment is expanding.<br/><em>Growth is slowing. Can profits catch up?</em></h1>
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
        <h2 id="guide-title">AI investment expands as growth slows and the earnings test becomes more demanding.</h2>
        <p className="panel-source">Analyst review · 17 November 2026 · changes versus the prior saved November 10 data snapshot</p>
        {executiveCommentary.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <div className="guide-conclusion"><b>Investment conclusion</b><span>Confirmation requires sustained paid-spending growth, stronger cloud profit and operating cash flow catching up with investment. Further cost pressure, repeated CapEx estimate cuts or renewed credit widening would weaken the outlook. Improving cash coverage and incremental ROIC would strengthen it.</span></div>
      </div>
      <ol className="guide-path" aria-label="Research reading path">
        <li><a href="#adoption"><span>01</span><div><b>Adoption</b><small>Business-use surveys, Ramp paid-adoption breadth, and separate sampled token volumes.</small></div></a></li>
        <li><a href="#monetization"><span>02</span><div><b>Monetization</b><small>Business paid demand, consumer spending and annualized frontier-lab revenue scale.</small></div></a></li>
        <li><a href="#hyperscalers"><span>03</span><div><b>Hyperscalers</b><small>Cloud revenue, RPO, capital spending, cash funding and returns.</small></div></a></li>
        <li><a href="#utilization"><span>04</span><div><b>Infrastructure</b><small>Equipment commitments, facilities and installed compute track physical delivery.</small></div></a></li>
        <li><a href="#financial"><span>05</span><div><b>Funding & recovery</b><small>Training costs and financing dependencies frame recovery.</small></div></a></li>
        <li><a href="#market"><span>06</span><div><b>Market</b><small>Equity returns, credit spreads and financing demand.</small></div></a></li>
      </ol>
      <p className="guide-orientation"><a href="#chain">Explore the industry value chain.</a> <a href="#heatmap">Track the core index and momentum heatmap.</a> <a href="#hyperscalers">Assess cloud demand, cash generation and returns.</a></p>
    </section>

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
      <div className="heatmap-head"><div><div className="eyebrow">MONTHLY CONSTITUENT SCORE HEATMAP</div><h2 id="heatmap-title">Adoption breadth and usage alongside paid demand and revenue scale</h2><p>{heatmapMonths[0]} to {heatmapEnd} · each constituent compared with its own history · 50 = historical norm · relative strength, not zero growth</p></div><div className="heat-legend continuous-legend" aria-label="Continuous heatmap legend"><div className="continuous-scale"><i/><span>0 · Below norm</span><span>50 · Norm</span><span>100 · Above norm</span></div><span><i className="heat-na"/>Unavailable</span></div></div>
      <SectionSummary current={`Methodology v${coreScores.metadata.version} puts the June core score at ${latestCore.score?.toFixed(1)}. Adoption scores ${coreByPillar.Adoption.toFixed(1)} and Infrastructure ${coreByPillar.Infrastructure.toFixed(1)}. Adoption scores adoption rates and token-volume growth percentiles. Monetization scores business paid demand, consumer spending and absolute annualized lab revenue levels. Available pillars share the index equally.`} conclusion="The buildout remains broad. The next test is whether paid usage, cash generation and incremental returns justify the expanding capital base."/>
      <div className="core-heatmap-workbench" id="pulse">
      <div className="compact-heatmap-panel">
        <p className="compact-heatmap-instruction">Read each row across time: greener cells show scores farther above the historical norm of 50, while redder cells show scores farther below it. Completed monthly workbook inputs run through {monthlyHeatmapSnapshot.metadata.completedMonthThrough}. The heatmap shows available pillar scores through {heatmapEnd}. P marks a provisional composite after {actualCoreMonth}, based on the pillars with data. E marks a Hyperscalers estimate based on the five-company CapEx scenario. The headline uses the last approved four-pillar month. Available constituents are reweighted within pillars and available pillars share the index equally. The normalization baseline remains fixed through June. Select a pillar to inspect its constituents.</p>
      <div className="heat-table-wrap"><table
        className="heat-table monthly-heat-table compact-heat-table"
        style={{"--heatmap-months": heatmapMonths.length, "--heatmap-estimate-months": estimatedHeatmapMonths.size} as React.CSSProperties}
      >
        <colgroup>
          <col/>
          {heatmapMonths.map(month => <col key={month} className={estimatedHeatmapMonths.has(month) ? "heatmap-estimate-column" : undefined}/>)}
        </colgroup>

        <thead><tr><th rowSpan={2}>Pillar / scoring basis</th>{heatmapQuarters.map(quarter=><th key={quarter} colSpan={heatmapMonths.filter(month=>calendarQuarter(month)===quarter).length}>{quarter}</th>)}</tr>
          <tr>{heatmapMonths.map(month=><th key={month}>{new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US",{month:"short",timeZone:"UTC"})}</th>)}</tr></thead>
        <tbody><tr className={`core-score-row ${compositeSelection==="Official core index"?"selected":""}`}><th><button type="button" onClick={()=>setCompositeSelection("Official core index")} aria-pressed={compositeSelection==="Official core index"}>Core index<small>P = available pillars, provisional</small></button></th>{heatmapMonths.map((month,index)=>{const score=displayedCoreScore(month);const provisional=month>actualCoreMonth;return <td key={month} style={scoreHeatStyle(score)} className={scoreHeatClass(score)}><button type="button" onClick={()=>{setCompositeSelection("Official core index");setContributionMonth(month);}} aria-pressed={compositeSelection==="Official core index"} aria-label={`${provisional?"Provisional core score":"Official core index"}, ${month}: ${score??"unavailable"}`} title={`${month} · ${provisional?`Available-pillar score (${coreByMonth.get(month)?.availablePillars ?? 0}/4 pillars)`:"Actual core"} ${score??"unavailable"}`}>{score===null?"":`${score.toFixed(0)}${provisional?" P":""}`}</button></td>})}</tr>{monthlyHeatmap.map(row=><tr key={row.pillar} className={compositeSelection===row.pillar?"selected":""}>
          <th scope="row"><HeatmapPillarLabel pillar={row.pillar} quarterly={row.quarterly} selected={compositeSelection===row.pillar} onSelect={()=>setCompositeSelection(row.pillar)}/><Source id={row.source}/></th>
          {row.monthlyCells.map(cell=><td key={cell.month} style={scoreHeatStyle(cell.value)} className={scoreHeatClass(cell.value)}><button
            type="button"
            onClick={()=>{setCompositeSelection(row.pillar);setContributionMonth(cell.month);}}
            aria-label={`${row.pillar}, ${cell.month}: ${cell.value === null ? "unavailable" : `${cell.value.toFixed(1)} ${cell.estimated ? "estimated " : ""}score`}, ${row.quarterly ? `${cell.quarter} trailing-four-quarter score held within quarter` : "normalized constituent score"}`}
            aria-pressed={compositeSelection===row.pillar}
            title={`${cell.month} · ${row.quarterly ? `${cell.quarter} ${cell.estimated ? "estimated" : "normalized"} TTM score` : "Normalized score"} · ${cell.value === null ? "unavailable" : `${cell.value.toFixed(1)} points`}`}
          >{cell.value?.toFixed(cell.estimated ? 1 : 0)}{cell.estimated && <sup aria-hidden="true">E</sup>}</button></td>)}
        </tr>)}</tbody>
      </table></div>
      </div>
      <CoreHeatmapChart title={compositeSelection} corePoints={heatmapMonths.map(month=>({month,value:displayedCoreScore(month)}))} points={compositePoints} official={compositeSelection==="Official core index"} quarterly={compositeSelection==="Hyperscalers"}/>
      </div>

      <CoreContributions month={contributionMonth} onMonthChange={setContributionMonth} pillar={heatmapPillar}/>

      {heatmapPillar && <details className="constituent-history" open><summary>Historical constituent trends · {heatmapPillar}</summary>
        <div className="constituent-history-heading"><h3>{heatmapPillar} · monthly constituent history</h3><p>{"Core pillar · 25% nominal weight"} · normalized constituent scores · 50 = historical norm · relative strength, not zero growth. Row labels show the latest scored input date.{heatmapPillar === "Hyperscalers" && " E marks a CapEx scenario estimate held across the quarter’s months."}</p></div>
        <div className="heat-table-wrap"><table className="heat-table monthly-heat-table constituent-heat-table"><thead><tr><th>Underlying signal</th>{heatmapMonths.map(month=><th key={month}>{month.slice(2)}</th>)}</tr></thead><tbody>{constituentHistory.map(row => {
          const latest = row.cells.findLast(cell => cell.value !== null && !cell.capexEstimate && (cell.observationDate || !cell.carriedForward));
          const date = latest?.observationDate ?? latest?.month;
          return <tr key={row.ticker}><th scope="row"><HeatmapInfoLabel
          label={row.name} subtitle={<>{row.ticker}{date && <> · <time dateTime={date}>{date}</time></>}</>} className="constituent-method-trigger"
          description={row.treatment} heading={row.method === row.treatment ? undefined : row.method}
        /></th>{row.cells.map(cell => {
          const estimate = cell.capexEstimate;
          const title = estimate
            ? `${row.name} · ${cell.month} · ${estimate.quarter} five-company CapEx scenario · ${estimate.capexScore.toFixed(1)} estimated score · $${estimate.total.toFixed(2)}B estimated quarterly CapEx · ${estimate.growth.toFixed(2)}% trailing 4Q YoY growth`
            : `${cell.treatment} · signal ${cell.signalLabel} · ${row.name} · ${cell.month} · ${cell.value===null?"Missing input":`${cell.value.toFixed(1)} score`} · source level ${cell.level??"unavailable"}${cell.observationDate ? ` · ${cell.sourceLabel} ${cell.observationDate}${cell.sourceBasis ? ` · ${cell.sourceBasis}` : ""}${cell.carriedForward ? " · carried forward" : ""}` : ""}`;
          return <td key={cell.month} style={scoreHeatStyle(cell.value)} className={scoreHeatClass(cell.value)} title={title}>
            <strong>{cell.value?.toFixed(1)}{estimate && <sup aria-label="Estimate"> E</sup>}{cell.value !== null && cell.carriedForward && <sup>†</sup>}</strong>
          </td>;
        })}</tr>;
        })}</tbody></table></div>
        {heatmapPillar === "Adoption" && <p>Adoption breadth and token usage each receive half the pillar weight. The three rates share 12.5% nominal core weight, while OpenRouter and Ramp token volumes share 12.5%. Each token score ranks the month-over-month growth of the trailing three-month average against its own baseline through June 2026. † Latest complete source reading carried forward. Ramp token activity uses an indexed publisher feed; source populations are kept separate.</p>}
        {heatmapPillar === "Monetization" && <p>† Latest available source observation carried forward. Hover a cell for its source date and revenue definition. Lab scores use absolute annualized revenue levels on a log scale, with independent frozen level baselines through June 2026. Revenue growth is context. Business paid demand combines Ramp median spending with Ramp matched and OpenRouter estimated spending growth. Latest complete spending observations carry forward with their source dates; consumer spending uses its latest complete four-week window. Available lab signals share 5% nominal core weight, with missing weights redistributed under the core coverage policy. Lab calibration remains provisional.</p>}
      </details>}
      <div className="core-research-extension"><b>Additional evidence around the core pillars</b><p>Follow the demand and capacity evidence behind the investment thesis.</p><div><a href="#token-activity">Demand: daily and weekly token activity</a><a href="#labs">Monetization: US frontier-lab revenue and run rates</a><a href="#useful-task-economics">Adoption: successful-task affordability</a><a href="#infrastructure">Investment: operational capacity and installed compute</a></div></div>
      {heatmapPillar && <div className="heatmap-drilldown" aria-live="polite">
        <div className="heatmap-drilldown-head"><div><span>SELECTED PILLAR · CONSTITUENTS</span><h3>{heatmapPillar}</h3></div><p>{selectedCoreMonth.month} · {selectedPillarRows.filter(row => row.score !== null).length} of {selectedPillarRows.length} scored{selectedCapexEstimate && " · 1 estimate shown"}</p></div>
        <div className="heatmap-detail-wrap"><table><thead><tr><th>Constituent</th><th>Ticker</th><th>Source level</th><th>Scoring signal</th><th>Score / supplementary momentum</th></tr></thead><tbody>{heatmapDetails.map(item=><tr key={item.ticker}><td><b>{item.name}</b></td><td><code>{item.ticker}</code></td><td>{item.latest}</td><td className={item.isRunRate?"":item.change===null?"muted":item.isTokens?"":item.change>=0?"positive":"negative"}>{item.isRunRate?`${item.latest} · ${item.basis}`:item.change===null?"n/a":`${item.change>0?"+":""}${item.change.toFixed(1)}${item.signalUnit} · ${item.basis}`}</td><td>{item.status}</td></tr>)}</tbody></table></div>
      </div>}
      {heatmapPillar==="Hyperscalers"&&<details className="evidence-data"><summary>Last approved company CapEx breakdown · 2026 Q2</summary><div className="heatmap-detail-wrap"><table><caption>Company detail · supplementary to the combined CapEx signal</caption><thead><tr><th>Company</th><th>2026Q2 CapEx ($B)</th><th>Trailing 4Q YoY growth</th></tr></thead><tbody>{latestCore.companyCapexRows.map(row=><tr key={row.ticker}><td>{row.name}</td><td>{row.level?.toFixed(2)??"n/a"}</td><td>{row.growth===null?"n/a":`${row.growth.toFixed(1)}%`}</td></tr>)}</tbody></table><p>Combined growth = total spending in the latest four quarters ÷ total spending in the preceding four quarters − 1. Company growth rates are not averaged. Consolidated CapEx includes spending beyond AI.</p></div></details>}
      {heatmapPillar==="Hyperscalers"&&<details className="evidence-data"><summary>CapEx and RPO forecasts, hardware prices, and supply-chain financials</summary><SupplyPanel/></details>}
      <div className="current-pulse"><div><span>Latest complete CapEx quarter</span><strong>2026Q2 constituent QoQ</strong></div>{latestCapexPulse.map(c=><div key={c.ticker} className={c.v>=0?"pulse-up":"pulse-down"}><span>{c.ticker}</span><b>{c.v>0?"+":""}{c.v.toFixed(1)}%</b></div>)}</div>

      <SectionNotes section="heatmap"/>
      </div>
      <div role="tabpanel" id="pulse-panel-weekly" aria-labelledby="pulse-tab-weekly" hidden={pulseTab !== "weekly"}>
        <WeeklyPulse/>
      </div>
    </section>

    <PillarResearch id="adoption" number="01" pillar="Adoption" title={pillarCommentary.adoption.title} summary={pillarCommentary.adoption.summary} review={<ResearchCommentary section="adoption"/>} historyFooter={<><AdoptionMetrics label="Business adoption observations"><AdoptionMetric><span>Current business AI use</span><strong>{latestCore.rows.find(r=>r.ticker==="BTOS0700")?.level?.toFixed(1)}%</strong><small>June 2026 · BTOS0700 · scored adoption breadth</small></AdoptionMetric><AdoptionMetric><span>Expected business AI use</span><strong>{latestCore.rows.find(r=>r.ticker==="BTOS2400")?.level?.toFixed(1)}%</strong><small>June 2026 · BTOS2400 · scored adoption breadth</small></AdoptionMetric>
      <AdoptionMetric><span>Ramp paid business AI adoption</span><strong>{rampSnapshot.monthly.at(-1)?.paidAdoption?.toFixed(1)}%</strong><small>{rampSnapshot.metadata.through} · scored paid-adoption breadth</small></AdoptionMetric>
      </AdoptionMetrics><SectionNotes section="adoption"/>
    </>}>
    <DataFreshness section="adoption"/>
    <EvidenceGroup title="Token activity" description="OpenRouter routed traffic and Ramp sampled usage each carry 6.25% nominal core weight. Each score ranks month-over-month growth in its trailing three-month average."/>
    <div className="adoption-volume-comparison"><TokenActivity rampOnly/><OpenRouterModelVolume/></div>
    <EvidenceGroup title="Task affordability" description="Successful-task costs complement token prices."/>
    <div className="adoption-task-context"><UsefulTaskEconomics compact/></div>

    </PillarResearch>


    <Monetization/>

    <section className="section hyperscalers-section" id="hyperscalers" aria-labelledby="hyperscalers-title">
      <div className="eyebrow">03 · HYPERSCALERS</div><h2 id="hyperscalers-title">Hyperscalers</h2>
      <p className="chapter-lead">{pillarCommentary.hyperscalers.title}</p>
      <p className="section-summary">{pillarCommentary.hyperscalers.summary}</p>
      <ResearchCommentary section="hyperscalers"/>
      <DataFreshness section="hyperscalers"/>
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



    <PillarResearch id="utilization" number="04" pillar="Infrastructure" history={false} classification="PHYSICAL INFRASTRUCTURE" title={pillarCommentary.infrastructure.title} summary={pillarCommentary.infrastructure.summary}>
      <ResearchCommentary section="infrastructure"/>
      <DataFreshness section="utilization"/>
      <InfrastructureBrowser/>
      <details className="evidence-data"><summary>Shared semiconductor and foundry context</summary><InfrastructureSignals stage="shared"/><DemandSupplement/><DemandHeatmap/></details>
    </PillarResearch>



    <PolicyDataCenters/>

    <PillarResearch id="financial" number="05" pillar="Funding & recovery" classification="SUPPLEMENTARY RESEARCH" title={pillarCommentary.funding.title} summary={pillarCommentary.funding.summary} history={false}>
    <ResearchCommentary section="funding"/>
    <DataFreshness section="financial"/>
    <span id="capital-return" className="legacy-section-anchor"/>
    <p className="pillar-crosslink"><a href="#hyperscalers">Review cloud demand, investment, cash generation and returns ↑</a></p>
    <EvidenceGroup title="Cost escalation and monetization pressure" description="Estimated training costs set a recovery hurdle; usage, cash CapEx and consolidated ROIC test whether activity and returns move together. Read with task affordability in Adoption and US frontier-lab revenue in Monetization. Lower buyer costs can stimulate use, but do not establish lower realized revenue per token or lower margins."/>
    <div className="related-evidence-row economics-evidence-row">
      <div className="evidence-column"><TaskEconomics compact/></div>

    </div>
    <EvidenceGroup title="Funding dependencies" description="Supplier financing can support customer demand; test exposure to that funding separately from realized revenue."/>
    <div className="funding-dependencies"><CircularFinancing/><p className="pillar-crosslink"><a href="#chain">Compare reported financial scale across the industry value chain ↓</a></p></div>


    </PillarResearch>

    <PillarResearch id="market" number="06" pillar="Market" classification="EQUITY & CREDIT · SUPPLEMENTARY RESEARCH" title={pillarCommentary.market.title} summary={pillarCommentary.market.summary} history={false}>
    <ResearchCommentary section="market"/>
    <DataFreshness section="market"/>
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
      <div className="method-title"><div className="eyebrow">METHODOLOGY & DATA DISCLOSURES</div><h2>Signal construction and analytical scope.</h2><p>The core index measures investment momentum. The supplementary overlay adds financial quality and credit conditions. The core includes frontier-lab annualized revenue levels in Monetization. Cash coverage and ROIC provide supplementary evidence on sustainability and returns.</p></div>
<SectionNotes section="methodology" source={<><div className="sources"><article id="source-S14"><span>S14</span><div><b>Ramp AI Index — paid adoption and spending</b><p>Saved data from <a href="https://ramp.com/data/ai-index">Ramp’s public dashboard</a>, retrieved {rampSnapshot.metadata.retrieved}. Monthly observations through {rampSnapshot.metadata.through}. Paid adoption is the share of Ramp businesses with observed AI payments, not all U.S. businesses. Median spending is nominal USD per employee per month. Website JSON routes are undocumented; the supported API requires credentials. Provider adoption can overlap. Token volumes come from the separate Ramp TSM sample, aggregated from published model series. Daily rolling-seven-day fields cover a narrower provider sample and are not treated as daily observations. Spend-share and sector/provider breakdowns remain context. Spending calibration has 20 observations through June 2026. The publisher’s weekly token series runs through {tokenActivitySnapshot.metadata.rampThrough}. The matched index retains the archived Sunday-ending series through {tokenActivitySnapshot.metadata.rampMatchedThrough}.</p></div></article><article id="source-S1"><span>S1</span><div><b>Indexlist.xlsx — Index Price Value</b><p>Completed workbook inputs through {monthlyHeatmapSnapshot.metadata.completedMonthThrough}. DRAM and NAND exports, TSMC revenue, equipment orders, imports, construction and high-tech activity feed Infrastructure. The constituent rows show each series’ latest scored input date.</p></div></article><article id="source-S2"><span>S2</span><div><b>Consolidated U.S. hyperscaler CapEx workbook</b><p>The last approved combined CapEx score uses the calendar quarter ending {capexProjection.metadata.actualThrough}. The five-company scenario uses accounting-basis adjustments to project the score. The heatmaps mark these projections with E.</p></div></article><article id="source-S3"><span>S3</span><div><b>China cloud CapEx source collection</b><p>Tencent operating CapEx, Alibaba quarterly CapEx and Baidu cash CapEx through 2026Q2. RMB is primary; approximate values, inferred AI shares and issuer-specific definitions remain labeled.</p></div></article><article id="source-S4"><span>S4</span><div><b>Indexlist.xlsx — AI 5yrCDS Value</b><p>Bloomberg-implied issuer 5Y CDS through {workbookAmendments.metadata.creditAsOf} and the IBOXUMAE Curncy benchmark through {workbookAmendments.metadata.creditBenchmarkAsOf}, with latest issuer ratings dated {workbookAmendments.metadata.ratingAsOf}. The daily analysis compares spreads only where the benchmark is available; the supplementary credit adjustment and value-chain signals retain their labeled 16 Sep vintage.</p></div></article><article id="source-S5"><span>S5</span><div><b>Indexlist.xlsx — Supply Chain Financial Value</b><p>Latest reported financial metrics for 36 issuers, including TSMC, SK hynix, Samsung Electronics and Tokyo Electron. Stock observations use Supply Chain Stock Value daily returns and USD market caps through {supplyChainStockSnapshot.metadata.asOf}. Market sector returns use lagged daily cap weights; the treemap uses latest caps. Three missing opening caps use first available proxies; their partial opening return histories are disclosed. Missing interim reports are labeled and receive no freshness penalty.</p></div></article><article id="source-S6"><span>S6</span><div><b>Indexlist.xlsx — Bond Issuance Value</b><p>Saved issuer-month amounts and issue counts through {workbookAmendments.bondMonthly.at(-1)?.month}, with matched US IG corporate issuance through {workbookAmendments.bondBenchmark.latestMatchedMonth}. Both queries use USD amounts. Covered issuers include other countries and ratings, so the displayed ratio measures relative issuance scale rather than a strict US IG market share. Missing issuer-month records are shown as gaps. The most recent month may be partial.</p></div></article><article id="source-S11"><span>S11</span><div><b>Epoch AI — AI chip owners, users and data centers</b><p>Owner-level chip estimates through 2026Q1, year-end 2025 lab-use estimates and {infrastructureSnapshot.metadata.facilityCount} facility records as of {infrastructureSnapshot.metadata.dataCenterAsOf}. H100e, power and workload values are modeled estimates rather than measures of realized utilization or financial return.</p></div></article></div><div className="sources"><article id="source-S9"><span>S9</span><div><b>OpenRouter daily rankings</b><p>Source: OpenRouter (openrouter.ai/rankings), saved as of {tokenActivitySnapshot.metadata.openrouterAsOf.slice(0,10)}. The daily API history runs from January 2025 through {tokenActivitySnapshot.metadata.openrouterThrough}, with model-level top-50 rows and an aggregate long-tail bucket. Adoption scores growth in routed volume across complete matched windows. Monetization uses estimated spending growth based on catalog rates and a daily blended rate for unresolved traffic. The dashboard retains source coverage dates for both signals. OpenRouter covers traffic routed through its platform. <a href="https://openrouter.ai/docs/api/api-reference/datasets/get-rankings-daily">Dataset methodology</a></p></div></article><article id="source-S10"><span>S10</span><div><b>Epoch AI and sourced disclosures — OpenAI and Anthropic</b><p>Latest saved run-rate disclosure dated {frontierLabsSnapshot.metadata.asOf}. The core scores each lab’s log annualized revenue level using its own disclosure history. The research charts distinguish ARR, run rates and recognized quarterly revenue.</p></div></article><article id="source-S12"><span>S12</span><div><b>Epoch AI — frontier models and machine-learning hardware</b><p>Frontier-model training-cost estimates in constant 2023 dollars and selected accelerator specifications. Models without cost estimates are excluded. <a href="https://epoch.ai/data">Dataset documentation</a></p></div></article><article id="source-S13"><span>S13</span><div><b>Task observations and Epoch AI — cost per successful task</b><p>Model-version prices are combined with benchmark success rates and assumed tokens per attempt. Protocol and model-class differences limit direct comparison.</p></div></article></div></>} methodology={<>      <div className="method-steps">
        <article><span>01</span><h3>Prepare the scoring signals</h3><p>Adoption rates use percentage levels. Token usage compares each source’s trailing three-month average with the previous month’s three-month average. Other signals use their specified spending, growth, price or revenue-level measure.</p></article>
        <article><span>02</span><h3>Normalize to 0–100</h3><p>OpenRouter and Ramp token growth use source-specific percentile ranks. Other signals use 50 + 15 × z-score, bounded to 0–100. A score of 50 is the baseline median for token growth and the baseline mean for the other signals. Monthly calibration uses saved history through {coreScores.metadata.baselineEnd}.</p></article>
        <article><span>03</span><h3>Combine four pillars</h3><p>Each pillar has 25% nominal core weight. Adoption splits its weight equally between breadth and usage. Monetization allocates 60% of its pillar weight to business paid demand, 20% to consumer card spending growth and 20% to lab revenue scale. Hyperscalers scores combined CapEx growth. Infrastructure scores physical activity and hardware pricing. Available constituents absorb missing weight within each pillar. Available pillars share the core weight equally.</p></article>
        <article><span>04</span><h3>Apply the supplementary adjustment</h3><p>The adjusted score adds bounded fundamental and credit deltas to the core when both coverage thresholds are met. Bond issuance carries zero weight in the adjustment.</p></article>
      </div>
<div className="note-formulas"><b>SUPPLEMENTARY ADJUSTMENT FORMULA</b><p><code>Adjusted = clamp(Core + Fundamental Δ + Credit Δ, 0, 100)</code></p><p><code>Fundamental Δ = 10% × (median Fundamental Composite − 50)</code></p><p><code>Credit score = clamp(50 + 2.5 × CDS Change Signal, 0, 100)</code></p><p><code>Credit Δ = 10% × (Credit score − 50)</code></p><p>Each satellite delta is bounded to ±5 points. The supplementary adjustment uses fixed multipliers. The adjusted score is withheld below financial/CDS coverage thresholds.</p></div></>} other={      <div className="limitations"><h3>Limits that matter for interpretation</h3><ul><li>Preserve Bloomberg units, seasonal-adjustment flags, release dates and point-in-time vintages.</li><li>Replace PREV-filled observations with explicit freshness and stale-value controls.</li><li>Backfill January 2026 bond issuance before publishing rolling-12-month YoY.</li><li>Add sector-neutral and size-neutral tests to the financial screen; cap extreme CapEx ranks only after sensitivity analysis.</li><li>Run alternative pillar weights, outlier controls and benchmark-relative backtests before integrating satellites.</li><li>Separate actual and forecast atmosphere indices before adding forward quarters.</li><li>A global aggregate requires consistent FX conversion, CapEx definitions, constituent weights and missing-proxy rules.</li></ul></div>}/>
    </section>

    <footer className="site-footer"><div className="brand"><span className="brand-mark">AIA</span><span>AI Investment<br/>Atmosphere</span></div><p>U.S. and China views use separate accounting definitions and currencies.</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
