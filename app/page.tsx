"use client";

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
import InvestmentSustainability from "./investment-sustainability";
import RoicAnalysis from "./roic-analysis";
import DemandToReturns from "./demand-to-returns";
import FrontierLabs from "./frontier-labs";
import SectionSummary from "./section-summary";
import { edgeRoutes, mapHeight, mapX, nodeHeight, nodePositions, nodeWidth } from "./chain-map-layout";

type Pillar = "Adoption" | "Demand" | "Investment" | "Imports" | "Hyperscaler CapEx";
type Company = "Aggregate" | "Microsoft" | "Alphabet" | "Meta" | "Amazon" | "Oracle";
type CapexCountry = "United States" | "China";
type ChinaCompany = "All companies" | "Tencent" | "Alibaba" | "Baidu";
type AiRole = "Hyperscalers" | "Accelerators & logic" | "Semiconductor equipment" | "Memory & storage" | "Systems & networking" | "Data centers" | "Power";
type ChainView = "map" | "cards" | "companies";
type AtmosphereView = "core" | "adjusted";

const atmosphereHistory = [
  ["2023-12",50],["2024-01",56.8],["2024-02",50.9],["2024-03",48.4],["2024-04",56.4],["2024-05",60.8],["2024-06",59.8],["2024-07",57.4],["2024-08",57.6],["2024-09",53.5],["2024-10",49.8],["2024-11",41.4],["2024-12",50.1],["2025-01",52.4],["2025-02",47.8],["2025-03",58.4],["2025-04",54.4],["2025-05",51.6],["2025-06",50.6],["2025-07",54.4],["2025-08",49.3],["2025-09",45.6],["2025-10",55.2],["2025-11",68.4],["2025-12",67.3],["2026-01",76.9],["2026-02",72],["2026-03",70.3],["2026-04",75.1],["2026-05",74.8],["2026-06",69.3],
] as const;

const capexHistory = [
  {q:"2023Q1",Microsoft:7.8,Alphabet:6.3,Meta:7.1,Amazon:14.2,Oracle:2.6,total:38},
  {q:"2023Q2",Microsoft:10.7,Alphabet:6.9,Meta:6.4,Amazon:11.5,Oracle:1.9,total:37.4},
  {q:"2023Q3",Microsoft:11.2,Alphabet:8.1,Meta:6.8,Amazon:12.5,Oracle:1.3,total:39.9},
  {q:"2023Q4",Microsoft:11.5,Alphabet:11,Meta:8,Amazon:14.6,Oracle:1.1,total:46.2},
  {q:"2024Q1",Microsoft:14,Alphabet:12,Meta:6.7,Amazon:14.9,Oracle:1.7,total:49.3},
  {q:"2024Q2",Microsoft:19,Alphabet:13.2,Meta:8.5,Amazon:17.6,Oracle:2.8,total:61.1},
  {q:"2024Q3",Microsoft:20,Alphabet:13.1,Meta:9.2,Amazon:22.6,Oracle:2.3,total:67.2},
  {q:"2024Q4",Microsoft:22.6,Alphabet:14.3,Meta:14.8,Amazon:27.8,Oracle:4,total:83.5},
  {q:"2025Q1",Microsoft:21.4,Alphabet:17.2,Meta:13.7,Amazon:25,Oracle:5.9,total:83.2},
  {q:"2025Q2",Microsoft:24.2,Alphabet:22.5,Meta:17,Amazon:32.2,Oracle:9.1,total:105},
  {q:"2025Q3",Microsoft:34.9,Alphabet:24,Meta:19.4,Amazon:35.1,Oracle:8.5,total:121.9},
  {q:"2025Q4",Microsoft:37.5,Alphabet:27.9,Meta:22.1,Amazon:39.5,Oracle:12,total:139},
  {q:"2026Q1",Microsoft:31.9,Alphabet:35.7,Meta:19.8,Amazon:44.2,Oracle:18.6,total:150.2},
  {q:"2026Q2",Microsoft:41.0,Alphabet:44.924,Meta:31.078,Amazon:54.771,Oracle:16.5,total:188.273},
] as const;

const proxyHistory: Record<Company, readonly (number|null)[]> = {
  Aggregate:[null,null,null,null,null,null,null,null,null,null,74.02,91.93,100.783,123.851],
  Microsoft:[null,null,5.6,5.75,7,9.5,10,11.3,10.7,12.1,17.45,25.125,21.373,27.333],
  Alphabet:[null,null,null,null,null,null,null,8.58,10.32,13.5,14.4,16.74,21.42,26.954],
  Meta:[null,null,null,null,null,null,null,9.62,8.905,11.05,12.61,14.365,12.87,20.201],
  Amazon:[null,null,null,null,null,null,13.56,16.68,15,19.32,21.06,23.7,26.52,32.863],
  Oracle:[null,null,null,null,null,null,null,null,null,null,8.5,12,18.6,16.5],
};

const pillars: Record<Pillar, { score:number; change:string; breadth:string; tone:string; note:string }> = {
  Adoption: {score:59,change:"+112% avg. YoY",breadth:"2 / 2 positive",tone:"Firm",note:"Current and expected AI use remain above their own recent momentum norms."},
  Demand: {score:89,change:"+385% YoY",breadth:"1 / 1 positive",tone:"Surging",note:"South Korea DRAM exports are the strongest pulse in the current source set."},
  Investment: {score:56,change:"+18% avg. YoY",breadth:"4 / 5 positive",tone:"Expanding",note:"Orders and construction are positive overall; information-technology orders are the exception."},
  Imports: {score:74,change:"+72% avg. YoY",breadth:"3 / 3 positive",tone:"Broad",note:"Telecom, semiconductor and computer imports all point to stronger equipment inflows."},
  "Hyperscaler CapEx": {score:60,change:"+79.3% YoY",breadth:"5 / 5 positive YoY",tone:"Accelerating",note:"Five-company total reached $188.3B in 2026Q2, a new high and 25.3% above the prior quarter."},
};

const series = [
  {pillar:"Adoption",name:"AI use — last 2 weeks",ticker:"BTOS0700",value:"21.8",yoy:120.2,status:"Included · latest"},
  {pillar:"Adoption",name:"Expected AI use — next 6 weeks",ticker:"BTOS2400",value:"25.9",yoy:85.0,status:"Included · latest"},
  {pillar:"Demand",name:"South Korea DRAM exports",ticker:"KOTCDRAM",value:"235.70",yoy:362.2,status:"Included · Aug"},
  {pillar:"Demand",name:"LLM token price",ticker:"SDLLMTK",value:"0.9543",yoy:null,status:"Context only · latest"},
  {pillar:"Investment",name:"Communication equipment orders",ticker:"DGNOCOEQ",value:"4,568",yoy:-6.8,status:"Included · Jul carry"},
  {pillar:"Investment",name:"Information technology orders",ticker:"DGNOITIN",value:"28,308",yoy:-5.8,status:"Included · Jul carry"},
  {pillar:"Investment",name:"Power equipment orders",ticker:"DGNOTGOP",value:"5,386",yoy:17.4,status:"Included · Jul carry"},
  {pillar:"Investment",name:"Data-center construction",ticker:"CNSTPRDA",value:"75,166",yoy:48.3,status:"Included · Jul carry"},
  {pillar:"Investment",name:"High-tech industry activity",ticker:"IPNEHITC",value:"199.62",yoy:14.6,status:"Included · Jul carry"},
  {pillar:"Imports",name:"Telecom equipment imports",ticker:"USIMTELE",value:"15.328",yoy:66.9,status:"Included · Jul carry"},
  {pillar:"Imports",name:"Semiconductor imports",ticker:"USIMSEMI",value:"13.048",yoy:131.4,status:"Included · Jul carry"},
  {pillar:"Imports",name:"Computer imports",ticker:"USIMCOMP",value:"26.792",yoy:140.8,status:"Included · Jul carry"},
] as const;

const constituents = [
  {company:"Amazon",ticker:"AMZN",value:54.771,proxy:32.863,share:29.1,yoy:70.1,basis:"60% server mix; cash PP&E plus new finance-lease additions",quality:"Disclosed mix"},
  {company:"Alphabet",ticker:"GOOGL",value:44.924,proxy:26.954,share:23.9,yoy:99.7,basis:"60% server share; AI and non-AI compute",quality:"Disclosed mix"},
  {company:"Microsoft",ticker:"MSFT",value:41.0,proxy:27.333,share:21.8,yoy:69.4,basis:"Two-thirds short-lived split applied to total CapEx",quality:"Disclosed mix"},
  {company:"Meta",ticker:"META",value:31.078,proxy:20.201,share:16.5,yoy:82.8,basis:"65% equipment share is analyst-estimated",quality:"Estimated mix"},
  {company:"Oracle",ticker:"ORCL",value:16.5,proxy:16.5,share:8.8,yoy:81.3,basis:"100% equipment-heavy proxy is inferred",quality:"Inferred proxy"},
] as const;

const heatmap = [
  {pillar:"Adoption",source:"S1",cells:[{q:"2025Q3",v:13.1,b:"2/2"},{q:"2025Q4",v:66.0,b:"2/2"},{q:"2026Q1",v:5.4,b:"2/2"},{q:"2026Q2",v:7.6,b:"2/2"}]},
  {pillar:"Demand",source:"S1",cells:[{q:"2025Q3",v:13.2,b:"1/1"},{q:"2025Q4",v:49.9,b:"1/1"},{q:"2026Q1",v:101.7,b:"1/1"},{q:"2026Q2",v:41.6,b:"1/1"}]},
  {pillar:"Investment",source:"S1",cells:[{q:"2025Q3",v:6.8,b:"4/5"},{q:"2025Q4",v:10.9,b:"5/5"},{q:"2026Q1",v:1.9,b:"4/5"},{q:"2026Q2",v:-1.8,b:"3/5"}]},
  {pillar:"Imports",source:"S1",cells:[{q:"2025Q3",v:-3.9,b:"1/3"},{q:"2025Q4",v:36.5,b:"3/3"},{q:"2026Q1",v:12.7,b:"3/3"},{q:"2026Q2",v:16.8,b:"3/3"}]},
  {pillar:"Hyperscaler CapEx",source:"S2",cells:[{q:"2025Q3",v:16.1,b:"4/5"},{q:"2025Q4",v:14.0,b:"5/5"},{q:"2026Q1",v:8.1,b:"3/5"},{q:"2026Q2",v:25.3,b:"4/5"}]},
  {pillar:"China · 3-company CapEx",source:"S3",cells:[{q:"2025Q3",v:-16.8,b:"0/3"},{q:"2025Q4",v:-5.6,b:"1/3"},{q:"2026Q1",v:96.1,b:"3/3"},{q:"2026Q2",v:92.6,b:"3/3"}]},
] as const;
type HeatmapPillar = (typeof heatmap)[number]["pillar"];

const latestCapexPulse = [
  {ticker:"MSFT",v:28.5},{ticker:"GOOGL",v:25.8},{ticker:"META",v:57.0},{ticker:"AMZN",v:23.9},{ticker:"ORCL",v:-11.3},
] as const;

const chinaCapexHistory = [
  {q:"2024Q1",Tencent:5.4,Alibaba:14.7,Baidu:2.04},{q:"2024Q2",Tencent:7.2,Alibaba:11.9,Baidu:2.12},
  {q:"2024Q3",Tencent:12.0,Alibaba:17.5,Baidu:1.65},{q:"2024Q4",Tencent:36.6,Alibaba:31.8,Baidu:2.33},
  {q:"2025Q1",Tencent:27.5,Alibaba:25.7,Baidu:2.90},{q:"2025Q2",Tencent:19.1,Alibaba:38.7,Baidu:3.80},
  {q:"2025Q3",Tencent:13.0,Alibaba:31.5,Baidu:3.80},{q:"2025Q4",Tencent:19.6,Alibaba:25.4,Baidu:1.97},
  {q:"2026Q1",Tencent:31.2,Alibaba:30.6,Baidu:6.08},{q:"2026Q2",Tencent:52.8,Alibaba:67.7,Baidu:11.40},
] as const;

const cdsSnapshot = {
  asOf:"16 Sep 2026", oneMonth:1.9252, threeMonth:8.2692, composite:-5.0972, coverage:25,
} as const;

const fundamentalSnapshot = {
  asOf:"30 Jun 2026", q2Coverage:26, q1Fallback:6, median:49.6381538462,
  topQuartile1m:-11.3202337450, bottomQuartile1m:-4.6032705742, correlation1m:-0.3068002452,
} as const;

const fundamentalLeaders = [
  {rank:1,ticker:"SNDK",company:"Sandisk",score:84.7240,cohort:"2026Q2",revenue:50.7,capex:4.4},
  {rank:2,ticker:"ANET",company:"Arista Networks",score:77.1644,cohort:"2026Q2",revenue:12.1,capex:45.5},
  {rank:3,ticker:"NVDA",company:"NVIDIA",score:74.9963,cohort:"2026Q1",revenue:19.8,capex:-36.8},
  {rank:4,ticker:"MU",company:"Micron",score:74.3356,cohort:"2026Q2",revenue:73.7,capex:-22.5},
  {rank:5,ticker:"WDC",company:"Western Digital",score:72.2486,cohort:"2026Q2",revenue:12.3,capex:25.5},
] as const;

const bondSnapshot = {
  asOf:"16 Sep 2026", latest:5.739625, mom:-82.972, rolling12m:400.6744695, issues12m:174,
} as const;

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

const bondHistory = [
  {month:"Sep 25",amount:24.0,issues:11},{month:"Oct 25",amount:15.456555,issues:7},{month:"Nov 25",amount:70.00165,issues:26},
  {month:"Jan 26",amount:4.5,issues:4},{month:"Feb 26",amount:52.5064,issues:20},{month:"Mar 26",amount:82.5655515,issues:32},
  {month:"Apr 26",amount:1.0,issues:1},{month:"May 26",amount:49.03846,issues:29},{month:"Jun 26",amount:35.0198,issues:12},
  {month:"Jul 26",amount:32.877703,issues:12},{month:"Aug 26",amount:33.70835,issues:20},{month:"Sep 26*",amount:5.739625,issues:4},
] as const;

const cdsIssuers = [
  {issuer:"Microsoft",ticker:"MSFT",role:"Hyperscalers",latest:25.0,oneMonth:1.7,threeMonth:2.0},
  {issuer:"Amazon",ticker:"AMZN",role:"Hyperscalers",latest:45.1,oneMonth:-0.1,threeMonth:0.4},
  {issuer:"Alphabet",ticker:"GOOGL",role:"Hyperscalers",latest:39.1,oneMonth:0.1,threeMonth:0.0},
  {issuer:"Meta Platforms",ticker:"META",role:"Hyperscalers",latest:47.3,oneMonth:-0.2,threeMonth:8.3},
  {issuer:"Oracle",ticker:"ORCL",role:"Hyperscalers",latest:173.6,oneMonth:-4.0,threeMonth:19.1},
  {issuer:"NVIDIA",ticker:"NVDA",role:"Accelerators & logic",latest:25.0,oneMonth:1.7,threeMonth:2.0},
  {issuer:"AMD",ticker:"AMD",role:"Accelerators & logic",latest:60.7,oneMonth:2.2,threeMonth:11.4},
  {issuer:"Broadcom",ticker:"AVGO",role:"Accelerators & logic",latest:52.6,oneMonth:1.1,threeMonth:5.7},
  {issuer:"Intel",ticker:"INTC",role:"Accelerators & logic",latest:148.7,oneMonth:1.3,threeMonth:25.8},
  {issuer:"Texas Instruments",ticker:"TXN",role:"Accelerators & logic",latest:47.1,oneMonth:4.0,threeMonth:18.3},
  {issuer:"TSMC",ticker:"TSM",role:"Accelerators & logic",latest:23.8,oneMonth:-2.7,threeMonth:-4.7},
  {issuer:"ASML",ticker:"ASML",role:"Semiconductor equipment",latest:23.2,oneMonth:-0.3,threeMonth:-4.4},
  {issuer:"Applied Materials",ticker:"AMAT",role:"Semiconductor equipment",latest:80.0,oneMonth:8.5,threeMonth:36.1},
  {issuer:"Samsung Electronics",ticker:"005930",role:"Memory & storage",latest:35.8,oneMonth:-3.7,threeMonth:-6.8},
  {issuer:"SK Hynix",ticker:"000660",role:"Memory & storage",latest:38.6,oneMonth:-4.1,threeMonth:-6.7},
  {issuer:"Micron",ticker:"MU",role:"Memory & storage",latest:82.4,oneMonth:2.9,threeMonth:10.2},
  {issuer:"Western Digital",ticker:"WDC",role:"Memory & storage",latest:101.7,oneMonth:9.2,threeMonth:30.5},
  {issuer:"Seagate",ticker:"STX",role:"Memory & storage",latest:94.6,oneMonth:10.9,threeMonth:29.6},
  {issuer:"Dell",ticker:"DELL",role:"Systems & networking",latest:127.2,oneMonth:6.1,threeMonth:20.3},
  {issuer:"Cisco",ticker:"CSCO",role:"Systems & networking",latest:31.6,oneMonth:2.0,threeMonth:8.6},
  {issuer:"TE Connectivity",ticker:"TEL",role:"Systems & networking",latest:45.9,oneMonth:0.1,threeMonth:-1.1},
  {issuer:"Equinix",ticker:"EQIX",role:"Data centers",latest:41.5,oneMonth:6.9,threeMonth:-7.0},
  {issuer:"Iron Mountain",ticker:"IRM",role:"Data centers",latest:102.6,oneMonth:2.7,threeMonth:9.7},
  {issuer:"Eaton",ticker:"ETN",role:"Power",latest:58.0,oneMonth:3.6,threeMonth:3.5},
  {issuer:"Vistra",ticker:"VST",role:"Power",latest:86.9,oneMonth:-1.8,threeMonth:-4.0},
] as const;

const cdsRoleQuarterly = [
  {quarter:"2025Q4",Hyperscalers:25.6,"Accelerators & logic":52.2,"Semiconductor equipment":31.8,"Memory & storage":78.7,"Systems & networking":39.5,"Data centers":78.5,Power:81.5},
  {quarter:"2026Q1",Hyperscalers:40.2,"Accelerators & logic":51.1,"Semiconductor equipment":36.1,"Memory & storage":77.8,"Systems & networking":48.6,"Data centers":64.2,Power:69.7},
  {quarter:"2026Q2",Hyperscalers:39.5,"Accelerators & logic":42.9,"Semiconductor equipment":37.3,"Memory & storage":64.2,"Systems & networking":48.2,"Data centers":64.9,Power:72.3},
  {quarter:"2026Q3*",Hyperscalers:45.1,"Accelerators & logic":49.8,"Semiconductor equipment":51.6,"Memory & storage":82.4,"Systems & networking":45.9,"Data centers":72.1,Power:72.4},
] as const;

const hyperscalerDebtCapital = [
  {quarter:"2025Q4",value:28.1},{quarter:"2026Q1",value:26.3},{quarter:"2026Q2",value:30.1},
] as const;

const roleLeverageSnapshot = [
  {role:"Hyperscalers",value:1.0,coverage:"5 / 5"},{role:"Accelerators & logic",value:-1.9,coverage:"3 / 6"},
  {role:"Semiconductor equipment",value:-1.0,coverage:"2 / 2"},{role:"Memory & storage",value:-0.2,coverage:"3 / 5"},
  {role:"Systems & networking",value:2.9,coverage:"2 / 3"},{role:"Data centers",value:21.1,coverage:"2 / 2"},{role:"Power",value:9.5,coverage:"2 / 2"},
] as const;

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

const companyColors: Record<Exclude<Company,"Aggregate">,string> = {Microsoft:"#57a9bd",Alphabet:"#e2b659",Meta:"#9f8ac7",Amazon:"#e77c5d",Oracle:"#84a46b"};

function Source({id}:{id:"S1"|"S2"|"S3"|"S4"|"S5"|"S6"}) { return <a className="source-chip" href={`#source-${id}`}>{id}</a>; }

function heatClass(v:number|null){
  if(v===null)return "heat-na";
  if(v>=30)return "heat-up-3";
  if(v>=10)return "heat-up-2";
  if(v>=0)return "heat-up-1";
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

function CapexChart({company}:{company:Company}) {
  const totalValues=capexHistory.map(d=>company==="Aggregate"?d.total:d[company]);
  const proxyValues=[...proxyHistory[company]];
  const total=totalValues.map((v,i)=>({v,i}));
  const proxy=proxyValues.map((v,i)=>({v,i})).filter((d):d is {v:number;i:number}=>d.v!==null);
  const w=960,h=330,l=52,r=18,t=22,b=44,max=Math.max(...totalValues,...proxy.map(d=>d.v))*1.15;
  const x=(i:number)=>l+i*(w-l-r)/(totalValues.length-1), y=(v:number)=>t+(max-v)*(h-t-b)/max;
  const totalPoints=total.map(d=>`${x(d.i)},${y(d.v)}`).join(" ");
  const proxyPoints=proxy.map(d=>`${x(d.i)},${y(d.v)}`).join(" ");
  const totalColor=company==="Aggregate"?"#1d7f80":companyColors[company];
  const proxyColor="#d88952";
  return <svg className="line-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${company} quarterly total capital expenditure and AI-related compute proxy`}>
    <title>{`${company} quarterly total capital expenditure and AI-related compute equipment proxy in US dollars billions`}</title>
    {[0,.25,.5,.75,1].map(p=>max*p).map(v=><g key={v}><line x1={l} x2={w-r} y1={y(v)} y2={y(v)} className="grid-line"/><text x={l-10} y={y(v)+4} textAnchor="end">${v.toFixed(0)}B</text></g>)}
    <polyline points={totalPoints} fill="none" stroke={totalColor} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
    <polyline points={proxyPoints} fill="none" stroke={proxyColor} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
    {total.map(d=><g key={`total-${capexHistory[d.i].q}`}><circle cx={x(d.i)} cy={y(d.v)} r={d.i===totalValues.length-1?6:3.5} fill={totalColor}><title>{`${capexHistory[d.i].q} total CapEx: $${d.v.toFixed(1)}B`}</title></circle></g>)}
    {proxy.map(d=><g key={`proxy-${capexHistory[d.i].q}`}><circle cx={x(d.i)} cy={y(d.v)} r={d.i===proxyValues.length-1?6:3.5} fill={proxyColor}><title>{`${capexHistory[d.i].q} compute proxy: $${d.v.toFixed(1)}B`}</title></circle></g>)}
    {capexHistory.map((d,i)=>(i%2===0||i===capexHistory.length-1)&&<text key={d.q} x={x(i)} y={h-14} textAnchor="middle">{d.q.replace("20","")}</text>)}
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

export default function Home(){
  const [pillar,setPillar]=useState<Pillar>("Demand");
  const [heatmapPillar,setHeatmapPillar]=useState<HeatmapPillar>("Hyperscaler CapEx");
  const [company,setCompany]=useState<Company>("Aggregate");
  const [capexCountry,setCapexCountry]=useState<CapexCountry>("United States");
  const [chinaCompany,setChinaCompany]=useState<ChinaCompany>("All companies");
  const [priceMetric,setPriceMetric]=useState<PriceMetric>("change1m");
  const [chainView,setChainView]=useState<ChainView>("map");
  const [atmosphereView,setAtmosphereView]=useState<AtmosphereView>("adjusted");
  const [selectedChainNodeId,setSelectedChainNodeId]=useState<ChainNodeId>("platforms");
  const [priceRows,setPriceRows]=useState<Record<string,PriceRow>>(()=>snapshotPriceRows());
  const [priceStatus,setPriceStatus]=useState("Indexlist.xlsx snapshot");
  const heatmapDetails=heatmapPillar==="Hyperscaler CapEx"
    ? constituents.map(company=>({name:company.company,ticker:company.ticker,latest:`$${company.value.toFixed(1)}B`,change:latestCapexPulse.find(item=>item.ticker===company.ticker)!.v,basis:"QoQ",status:company.quality}))
    : heatmapPillar==="China · 3-company CapEx"
      ? [
          {name:"Tencent",ticker:"0700 HK",latest:"RMB 52.8B",change:69.2,basis:"QoQ",status:"Operating CapEx"},
          {name:"Alibaba",ticker:"9988 HK",latest:"RMB 67.7B",change:121.2,basis:"QoQ",status:"Reported CapEx"},
          {name:"Baidu",ticker:"9888 HK",latest:"RMB 11.4B",change:87.5,basis:"QoQ",status:"Cash CapEx"},
        ]
      : series.filter(item=>item.pillar===heatmapPillar).map(item=>({name:item.name,ticker:item.ticker,latest:item.value,change:item.yoy,basis:"YoY",status:item.status}));
  const visibleSeries=useMemo(()=>series.filter(s=>s.pillar===pillar),[pillar]);
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
      <nav aria-label="Primary"><a href="#guide">Executive summary</a><a href="#chain">AI value chain</a><a href="#pulse">Momentum</a><a href="#capex">Capital spending</a><a href="#labs">Monetization</a><a href="#sustainability">Cash funding</a><a href="#roic">Returns</a><a href="#fundamentals">Financial quality</a></nav>
      <div className="asof"><span className="live-dot"/>Data through · 16 Sep 2026</div>
    </header>

    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">AI INVESTMENT ATMOSPHERE · PUBLIC EQUITY RESEARCH</div>
        <h1>AI buildout is still expanding.<br/><em>Can profits catch up?</em></h1>
        <p>Spending is accelerating, but it is leaving less operating cash behind. Follow the evidence from AI usage and lab revenue to investment, cash coverage and corporate returns.</p>
        <div className="atmosphere-switch" aria-label="Atmosphere score view">{([{"id":"core","label":"Core","score":satelliteOverlay.core},{"id":"adjusted","label":"Satellite-adjusted","score":satelliteOverlay.adjusted}] as const).map(view=><button key={view.id} className={atmosphereView===view.id?"selected":""} onClick={()=>setAtmosphereView(view.id)} aria-pressed={atmosphereView===view.id} disabled={view.id==="adjusted"&&!satelliteOverlay.ready}><span>{view.label}</span><b>{formatIndex(view.score)}</b></button>)}</div>
        <div className="hero-foot">Market data through 16 Sep 2026; fundamentals through latest available 2026Q2 / Q1 reporting periods <Source id="S1"/><Source id="S5"/> · CDS through 16 Sep 2026 <Source id="S4"/></div>
      </div>
      <div className="gauge" aria-label={`${atmosphereView==="core"?"Core":"Satellite-adjusted"} AI investment atmosphere score ${formatIndex(selectedAtmosphereScore)}${selectedAtmosphereScore===null?"":" out of 100"}`} style={{"--score":`${selectedAtmosphereScore??0}%`} as React.CSSProperties}>
        <div><span>{atmosphereView==="core"?"CORE":"ADJUSTED"}</span><strong>{formatIndex(selectedAtmosphereScore)}</strong><small>{selectedAtmosphereScore===null?"WITHHELD":"EXPANSIONARY"}</small></div>
      </div>
    </section>

    <section className="overlay-bridge" aria-label="Satellite overlay bridge">
      <article><span>Core atmosphere</span><strong>{satelliteOverlay.core.toFixed(1)}</strong><small>Last complete comparable month · June</small></article>
      <article><span>Fundamentals overlay</span><strong className={satelliteOverlay.fundamentalDelta>=0?"positive":"negative"}>{satelliteOverlay.fundamentalDelta>=0?"+":""}{satelliteOverlay.fundamentalDelta.toFixed(1)}</strong><small>Median score {satelliteOverlay.fundamentalScore.toFixed(1)} · 32 issuers</small></article>
      <article><span>Credit overlay</span><strong className={satelliteOverlay.creditDelta>=0?"positive":"negative"}>{satelliteOverlay.creditDelta>=0?"+":""}{satelliteOverlay.creditDelta.toFixed(1)}</strong><small>Normalized score {satelliteOverlay.creditScore.toFixed(1)} · 25 issuers</small></article>
      <article><span>Bond issuance</span><strong>0.0</strong><small>Separate funding signal · September is partial</small></article>
      <article className="adjusted-card"><span>Adjusted view</span><strong>{formatIndex(satelliteOverlay.adjusted)}</strong><small>{satelliteOverlay.ready?"Core plus financial and credit signals":"Unavailable with current coverage"}</small></article>
    </section>

    <section className="heatmap-overview" aria-labelledby="heatmap-title">
      <div className="heatmap-head"><div><div className="eyebrow">CURRENT STATUS · QUARTER-OVER-QUARTER</div><h2 id="heatmap-title">Spending accelerated across four of five hyperscalers.</h2><p>Quarter-end change in underlying source levels; pillar cells show the simple average across included series.</p></div><div className="heat-legend" aria-label="Heatmap legend"><span><i className="heat-down-2"/>Contracting</span><span><i className="heat-up-1"/>Moderate</span><span><i className="heat-up-3"/>Strong</span></div></div>
      <SectionSummary about="Compares quarter-over-quarter momentum across adoption, demand, investment, imports and hyperscaler capital spending; the China CapEx row remains a separate market view." current="Hyperscaler CapEx rose 25.3% in 2026Q2, with four of five U.S. companies increasing spending. Investment indicators were softer, with three of five underlying signals positive." conclusion="The buildout remains broad, but uneven investment indicators reinforce the need to test whether usage, cash generation and incremental returns are catching up."/>
      <div className="heat-table-wrap"><table className="heat-table"><thead><tr><th>Pillar</th><th>2025Q3</th><th>2025Q4</th><th>2026Q1</th><th>2026Q2</th></tr></thead><tbody>{heatmap.map(row=><tr key={row.pillar} className={heatmapPillar===row.pillar?"selected":""}><th><button type="button" onClick={()=>setHeatmapPillar(row.pillar)} aria-pressed={heatmapPillar===row.pillar}>{row.pillar}<small>View constituents</small></button><Source id={row.source}/></th>{row.cells.map(cell=><td key={cell.q} className={heatClass(cell.v)}><button type="button" onClick={()=>setHeatmapPillar(row.pillar)} aria-label={`${row.pillar}, ${cell.q}: ${cell.v===null?"unavailable":`${cell.v>0?"plus ":""}${cell.v.toFixed(1)} percent`}`} aria-pressed={heatmapPillar===row.pillar}>{cell.v===null?<strong>n/a</strong>:<strong>{cell.v>0?"+":""}{cell.v.toFixed(1)}%</strong>}<span>{cell.v===null?"incomplete quarter":`${cell.b} signals positive`}</span></button></td>)}</tr>)}</tbody></table></div>
      <div className="heatmap-drilldown" aria-live="polite">
        <div className="heatmap-drilldown-head"><div><span>SELECTED PILLAR · CONSTITUENTS</span><h3>{heatmapPillar}</h3></div><p>Latest source observations; change basis is shown for each row.</p></div>
        <div className="heatmap-detail-wrap"><table><thead><tr><th>Constituent</th><th>Ticker</th><th>Latest</th><th>Change</th><th>Data basis</th></tr></thead><tbody>{heatmapDetails.map(item=><tr key={item.ticker}><td><b>{item.name}</b></td><td><code>{item.ticker}</code></td><td>{item.latest}</td><td className={item.change===null?"muted":item.change>=0?"positive":"negative"}>{item.change===null?"n/a":`${item.change>0?"+":""}${item.change.toFixed(1)}% ${item.basis}`}</td><td>{item.status}</td></tr>)}</tbody></table></div>
      </div>
      <div className="current-pulse"><div><span>Latest complete CapEx quarter</span><strong>2026Q2 constituent QoQ</strong></div>{latestCapexPulse.map(c=><div key={c.ticker} className={c.v>=0?"pulse-up":"pulse-down"}><span>{c.ticker}</span><b>{c.v>0?"+":""}{c.v.toFixed(1)}%</b></div>)}</div>
      <div className="heatmap-note"><b>Investment implication:</b> Quarterly CapEx rose 25.3% in 2026Q2, with four of five companies increasing spending. The breadth of the expansion raises the importance of the subsequent cash-coverage and ROIC analysis.</div>
    </section>

    <section className="snapshot" aria-label="Headline indicators">
      <article><span>Official macro pulse</span><strong>69.3</strong><small>June · last complete comparable month</small></article>
      <article><span>Latest signal mix</span><strong>Mixed</strong><small>adoption and imports firm; orders uneven</small></article>
      <article><span>Quarterly CapEx</span><strong>$188.3B</strong><small className="up">+79.3% YoY</small></article>
      <article><span>Fundamental screen</span><strong>49.6</strong><small>median · 32 issuers</small></article>
    </section>

    <section className="reader-guide" id="guide" aria-labelledby="guide-title">
      <div className="guide-intro">
        <div className="eyebrow">EXECUTIVE SUMMARY · INVESTMENT CONCLUSION</div>
        <h2 id="guide-title">Demand remains firm. Markets are becoming less willing to reward spending alone.</h2>
        <p>The official 69.3 core score still describes the last complete comparable month, not a September nowcast. Newer data show strong adoption, DRAM exports and equipment imports, while communications and IT orders have softened. Quarterly hyperscaler CapEx remains at a record $188.3B and absorbs 77.3% of operating cash flow across Microsoft, Alphabet, Amazon and Meta.</p>
        <p>Credit stress has eased, but equity pricing has rotated against the strongest fundamental cohort: the top financial-quality quartile returned −11.3% over the latest month versus −4.6% for the bottom quartile. Together with falling token prices and incremental ROIC below total ROIC for all five hyperscalers, the evidence suggests the debate is moving from capacity growth toward monetization and capital productivity.</p>
        <div className="guide-conclusion"><b>Investment conclusion</b><span>The buildout remains funded, but the next leg of performance increasingly requires profit conversion and improving incremental ROIC—not another increase in CapEx alone.</span></div>
      </div>
      <ol className="guide-path" aria-label="Suggested reading path">
        <li><a href="#pulse"><span>01</span><div><b>Is activity expanding?</b><small>The pulse summarizes momentum and breadth.</small></div></a></li>
        <li><a href="#capex"><span>02</span><div><b>How much is being built?</b><small>Compare hyperscaler spending and its compute proxy.</small></div></a></li>
        <li><a href="#labs"><span>03</span><div><b>Is paid demand appearing?</b><small>Read model traffic and lab revenue as demand evidence.</small></div></a></li>
        <li><a href="#sustainability"><span>04</span><div><b>Can companies fund it?</b><small>Track cash absorption and cash left after investment.</small></div></a></li>
        <li><a href="#roic"><span>05</span><div><b>Are profits keeping pace?</b><small>Compare total and incremental corporate returns.</small></div></a></li>
      </ol>
      <p className="guide-orientation"><a href="#chain">The AI value-chain map defines the industry structure.</a> The <a href="#fundamentals">fundamental and financing analysis</a> then compares resilience across companies.</p>
    </section>

    <section className="section chain-section" id="chain">
      <div className="section-head chain-head"><div><div className="eyebrow">01 · AI INDUSTRY VALUE CHAIN</div><h2>See how demand becomes physical capacity.</h2></div><p>{latestPriceDate?`Market data through ${latestPriceDate}`:"Market date unavailable"}</p></div>
      <SectionSummary about="Maps the listed companies that connect AI applications, models, chips, data centers and power." current="Market signals are uneven: applications lead the latest one-month returns, while data-center and power groups lag." conclusion="The map shows where demand, bottlenecks and financial pressure may appear; it identifies the path of the buildout rather than proving its return."/>
      <div className="chain-toolbar">
        <div className="chain-control-stack">
          <div className="view-switch" aria-label="Industry chain view">{([{"id":"map","label":"Map"},{"id":"cards","label":"Cards"},{"id":"companies","label":"Companies"}] as const).map(view=><button key={view.id} className={chainView===view.id?"selected":""} onClick={()=>setChainView(view.id)} aria-pressed={chainView===view.id}>{view.label}</button>)}</div>
          <div className="metric-switch" aria-label="Price return period">{(Object.keys(priceMetricLabels) as PriceMetric[]).map(metric=>{
            const available=Object.values(priceRows).some(row=>row[metric]!==null);
            return <button key={metric} className={priceMetric===metric?"selected":""} onClick={()=>setPriceMetric(metric)} aria-pressed={priceMetric===metric} disabled={!available} title={available?undefined:`${priceMetricLabels[metric]} is unavailable in the current snapshot`}>{priceMetricLabels[metric]}</button>;
          })}</div>
        </div>
        <div className="data-actions"><span><b>{importedCount}</b> / 32 covered · {priceStatus}</span><label className="data-button">Import price CSV<input type="file" accept=".csv,text/csv" onChange={handlePriceUpload}/></label><a className="data-button secondary" href="/ai-industry-chain-price-template.csv" download>Download template</a>{priceStatus!=="Indexlist.xlsx snapshot"&&<button className="data-button ghost" onClick={clearPriceData}>Reset snapshot</button>}</div>
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
      <div className="chain-note"><b>Signal definitions:</b> Market is the equal-weight selected-period return (Strong ≥10%, Constructive ≥3%, Mixed &gt;−3%, otherwise Weak). Fundamental is the equal-weight composite from the <code>{industryChainSnapshotMetadata.fundamentalSheet}</code> company screen (Strong ≥65, Resilient ≥50, Mixed ≥35, otherwise Fragile). CDS pressure averages 1M and 3M spread changes for covered issuers only (Rising ≥+3 bp, Easing ≤−3 bp); coverage is always shown. One-day returns are unavailable because the current source reports zero for all 32 companies. Structural links represent industry relationships rather than company-level supplier contracts or index weights.</div>
    </section>

    <section className="section" id="pulse">
      <div className="section-head"><div><div className="eyebrow">02 · ATMOSPHERE PULSE</div><h2>Momentum remains above neutral.</h2></div><p>Within-series YoY momentum · 50 = own-history neutral</p></div>
      <SectionSummary about="Combines adoption, demand, investment, imports and hyperscaler CapEx into a momentum view." current="The official pulse remains 69.3 for the last complete comparable month. Newer observations show firm adoption and imports, but several July macro readings are carried forward into September." conclusion="The expansion remains visible, but the mixed-frequency nowcast is not a valid replacement for the complete-month index. Later sections test monetization and payback."/>
      <div className="chart-panel"><div className="chart-meta"><div><b>Monthly macro pulse</b><span>Composite through the last complete comparable month</span></div><div className="legend"><i/>Expansionary threshold</div></div><LineChart data={atmosphereHistory} neutral={50}/><div className="chart-callout"><b>Official score held at June.</b> The workbook now contains observations through 16 September, but several series are prior-value fills and Q3 hyperscaler CapEx is not yet available; the page therefore does not manufacture a mixed-frequency September score. <Source id="S1"/></div></div>

      <div className="pillar-layout">
        <div className="pillar-grid" role="list" aria-label="Atmosphere pillars">{(Object.keys(pillars) as Pillar[]).map(name=><button key={name} className={`pillar-card ${pillar===name?"selected":""}`} onClick={()=>setPillar(name)} aria-pressed={pillar===name}>
          <div className="pillar-top"><span>{name}</span><strong>{pillars[name].score}</strong></div><div className="score-track"><i style={{width:`${pillars[name].score}%`}}/></div><div className="pillar-bottom"><b>{pillars[name].tone}</b><span>{pillars[name].change}</span></div>
        </button>)}</div>
        <aside className="pillar-detail"><div><span className="detail-kicker">SELECTED PILLAR</span><h3>{pillar}</h3><p>{pillars[pillar].note}</p></div><div className="detail-stat"><span>Breadth</span><strong>{pillars[pillar].breadth}</strong></div></aside>
      </div>

      {pillar!=="Hyperscaler CapEx"&&<div className="signal-table-wrap"><table><thead><tr><th>Underlying signal</th><th>Ticker</th><th>Latest</th><th>YoY</th><th>Role in index</th></tr></thead><tbody>{visibleSeries.map(s=><tr key={s.ticker}><td>{s.name}</td><td><code>{s.ticker}</code></td><td>{s.value}</td><td className={s.yoy===null?"muted":s.yoy>=0?"positive":"negative"}>{s.yoy===null?"n/a":`${s.yoy>0?"+":""}${s.yoy.toFixed(1)}%`}</td><td><span className={s.status==="Included"?"status included":"status context"}>{s.status}</span></td></tr>)}</tbody></table></div>}
    </section>

    <section className="section capex-section" id="capex">
      <div className="section-head"><div><div className="eyebrow">03 · GLOBAL HYPERSCALER BUILDOUT</div><h2>Compare capital deployment by market.</h2></div><div className="capex-controls"><div className="select-wrap"><label htmlFor="capex-country">Country</label><select id="capex-country" value={capexCountry} onChange={e=>setCapexCountry(e.target.value as CapexCountry)}><option>United States</option><option>China</option></select></div><div className="select-wrap"><label htmlFor="company">View series</label>{capexCountry==="United States"?<select id="company" value={company} onChange={e=>setCompany(e.target.value as Company)}><option>Aggregate</option>{["Microsoft","Alphabet","Meta","Amazon","Oracle"].map(c=><option key={c}>{c}</option>)}</select>:<select id="company" value={chinaCompany} onChange={e=>setChinaCompany(e.target.value as ChinaCompany)}><option>All companies</option>{["Tencent","Alibaba","Baidu"].map(c=><option key={c}>{c}</option>)}</select>}</div></div></div>
      <SectionSummary about="Tracks how much major U.S. and Chinese cloud companies are investing in infrastructure." current="U.S. hyperscaler CapEx reached $188.3B in 2026Q2, up 79.3% year over year; four of five companies increased spending from the prior quarter." conclusion="The buildout is accelerating and raises the amount of future profit needed to preserve cash flow and capital returns."/>
      <div className={`chart-panel ${capexCountry==="China"?"china-chart":""}`}>
        {capexCountry==="United States"?<><div className="chart-meta"><div><b>{company}</b><span>Quarterly capital expenditure · USD billions</span></div><div className="capex-series-summary"><span><i className="total-swatch"/>Total CapEx <strong>${(company==="Aggregate"?capexHistory.at(-1)!.total:capexHistory.at(-1)![company]).toFixed(1)}B</strong></span><span><i className="proxy-swatch"/>AI-related compute proxy <strong>${proxyHistory[company].at(-1)!.toFixed(1)}B</strong></span></div></div><CapexChart company={company}/><div className="chart-callout"><b>Proxy—not disclosed AI CapEx:</b> The orange series applies disclosed or inferred short-lived compute shares to total CapEx. It includes AI and non-AI workloads; aggregate proxy history begins only when all five companies have usable coverage. Incomplete or estimate-heavy aggregate quarters are excluded, and missing constituents are never treated as zero. <Source id="S2"/></div></>:<><div className="chart-meta"><div><b>{chinaCompany==="All companies"?"China cloud leaders":chinaCompany}</b><span>Quarterly issuer CapEx · RMB billions · definitions differ</span></div><div className="china-legend">{(["Tencent","Alibaba","Baidu"] as const).filter(item=>chinaCompany==="All companies"||item===chinaCompany).map(item=><span key={item}><i className={`${item.toLowerCase()}-dot`}/>{item}</span>)}</div></div><ChinaCapexChart company={chinaCompany}/><div className="chart-callout"><b>Comparable direction, not an additive total:</b> Tencent uses operating CapEx, Alibaba uses reported CapEx and Baidu uses cash CapEx. The chart keeps RMB as the primary unit and does not label the full amounts as AI-only spending. <Source id="S3"/></div></>}
      </div>

      {capexCountry==="United States"?<><div className="constituent-grid">{constituents.map(c=><button key={c.company} onClick={()=>setCompany(c.company as Company)} className={company===c.company?"constituent selected":"constituent"}><div><span>{c.ticker}</span><small>{c.company}</small></div><strong>${c.value.toFixed(1)}B</strong><div className="share-track"><i style={{width:`${c.share}%`}}/></div><footer><span>{c.share}% share</span><b>+{c.yoy.toFixed(1)}% YoY</b></footer></button>)}</div><div className="signal-table-wrap"><table><thead><tr><th>Constituent</th><th>2026Q2 total</th><th>Compute proxy</th><th>Share</th><th>YoY total</th><th>Compute-proxy basis</th><th>Evidence</th></tr></thead><tbody>{constituents.map(c=><tr key={c.ticker}><td><b>{c.ticker}</b><span className="company-label">{c.company}</span></td><td>${c.value.toFixed(1)}B</td><td>${c.proxy.toFixed(1)}B</td><td>{c.share.toFixed(1)}%</td><td className="positive">+{c.yoy.toFixed(1)}%</td><td>{c.basis}</td><td><span className={`quality ${c.quality.startsWith("Inferred")?"inferred":c.quality.startsWith("Estimated")?"estimated":""}`}>{c.quality}</span></td></tr>)}</tbody></table></div></>:<><div className="china-snapshot"><article><span>Tencent · 2026Q2 operating CapEx</span><strong>RMB 52.8B</strong><small className="up">+69.2% QoQ · +176.4% YoY</small></article><article><span>Alibaba · 2026Q2 CapEx</span><strong>RMB 67.7B</strong><small className="up">+121.2% QoQ · +74.9% YoY</small></article><article><span>Baidu · 2026Q2 cash CapEx</span><strong>RMB 11.4B</strong><small className="up">+87.5% QoQ · +200.0% YoY</small></article></div><div className="china-readthrough"><div><span>Observed trend</span><p>All three issuers increased CapEx sequentially in 2026Q1 and again in 2026Q2. Alibaba recorded the highest Q2 level, while Baidu showed the fastest YoY growth from a smaller base.</p></div><div><span>Analytical limitation</span><p>The full RMB amounts cannot be classified as AI CapEx. AI-share fields in the source workbook are inferred, and the accounting bases are not fully harmonized.</p></div><div><span>Treatment in analysis</span><p>The three companies form a separate China breadth and momentum series. Their levels are not aggregated because currencies, accounting definitions and estimated AI shares are not directly comparable.</p></div></div></>}
    </section>

    <FrontierLabs/>
    <DemandToReturns/>
    <InvestmentSustainability/>
    <RoicAnalysis/>

    <section className="section fundamentals-section" id="fundamentals">
      <div className="section-head"><div><div className="eyebrow">04 · FINANCIAL RESILIENCE · SATELLITE</div><h2>Which companies can sustain the spending?</h2></div><p>Latest reported period · point-in-time screen · as of {fundamentalSnapshot.asOf} <Source id="S5"/></p></div>
      <SectionSummary about="Compares growth, margins, cash conversion, leverage and interest coverage across 32 listed companies." current="The median score remains 49.6, but its correlation with one-month returns fell to −0.31. The strongest fundamental quartile underperformed the weakest quartile over the latest month." conclusion="The reversal looks more like an expectations and positioning reset than a collapse in reported fundamentals. Resilience remains useful for selection, but it is not a timing signal."/>
      <div className="fundamental-snapshot">
        <article><span>Universe</span><strong>32</strong><small>{fundamentalSnapshot.q2Coverage} in 2026Q2 · {fundamentalSnapshot.q1Fallback} Q1 fallback</small></article>
        <article><span>Median composite</span><strong>{fundamentalSnapshot.median.toFixed(1)}</strong><small>0–100 cross-sectional score</small></article>
        <article><span>Top quartile 1M return</span><strong className={fundamentalSnapshot.topQuartile1m>=0?"positive":"negative"}>{fundamentalSnapshot.topQuartile1m>0?"+":""}{fundamentalSnapshot.topQuartile1m.toFixed(1)}%</strong><small>vs. {fundamentalSnapshot.bottomQuartile1m>0?"+":""}{fundamentalSnapshot.bottomQuartile1m.toFixed(1)}% bottom quartile</small></article>
        <article><span>Score / 1M correlation</span><strong>{fundamentalSnapshot.correlation1m.toFixed(2)}</strong><small>weak · quality screen, not timing model</small></article>
      </div>
      <div className="fundamental-layout">
        <div className="leaderboard"><div className="credit-panel-head"><div><b>Fundamental composite leaders</b><span>80% resilience + 20% CapEx momentum</span></div><span className="quality">CROSS-SECTIONAL</span></div>{fundamentalLeaders.map(row=><article key={row.ticker}><span className="leader-rank">0{row.rank}</span><div><b>{row.ticker}</b><small>{row.company} · {row.cohort}</small></div><div className="leader-metrics"><span>Revenue <b className={row.revenue>=0?"positive":"negative"}>{row.revenue>0?"+":""}{row.revenue.toFixed(1)}%</b></span><span>CapEx <b className={row.capex>=0?"positive":"negative"}>{row.capex>0?"+":""}{row.capex.toFixed(1)}%</b></span></div><strong>{row.score.toFixed(1)}</strong></article>)}</div>
        <aside className="fundamental-method"><span className="detail-kicker">SCORING METHODOLOGY</span><h3>Financial resilience carries the greater weight.</h3><p>Resilience combines revenue growth (20%), EBITDA margin (25%), FCF / EBITDA (25%), inverse net debt / EBITDA (20%) and interest coverage (10%). Missing interest coverage is excluded and the remaining weights are renormalized.</p><div><b>Reporting period</b><p>Companies without an interim report remain on 2026-03-31. They receive no freshness penalty; the reporting cohort remains disclosed.</p></div><div><b>Interpretation</b><p>The screen compares financial capacity across the supply chain. Strong spending growth alone does not establish an attractive prospective return.</p></div></aside>
      </div>
    </section>

    <section className="section credit-section" id="credit">
      <div className="section-head"><div><div className="eyebrow">05 · CREDIT CONDITIONS · SATELLITE</div><h2>Broader coverage reveals renewed credit caution.</h2></div><p>USD senior 5Y CDS · basis-point change · as of {cdsSnapshot.asOf} <Source id="S4"/></p></div>
      <SectionSummary about="Uses credit-default-swap spreads to track how bond markets price financing risk across the AI supply chain." current="The expanded 25-issuer basket widened 1.9bp over one month and 8.3bp over three months. Semiconductor equipment, memory and systems contain the largest issuer-level deteriorations." conclusion="The wider universe weakens the earlier conclusion that funding stress had stabilized. Credit pressure is not uniform, but it now extends beyond hyperscalers into capital-intensive suppliers."/>
      <div className="credit-snapshot">
        <article><span>Equal-weight 1M change</span><strong className={cdsSnapshot.oneMonth<=0?"positive":"negative"}>{cdsSnapshot.oneMonth>0?"+":""}{cdsSnapshot.oneMonth.toFixed(1)} bp</strong><small>{cdsSnapshot.oneMonth<=0?"Tightening · improving":"Widening · deteriorating"}</small></article>
        <article><span>Equal-weight 3M change</span><strong className={cdsSnapshot.threeMonth<=0?"positive":"negative"}>{cdsSnapshot.threeMonth>0?"+":""}{cdsSnapshot.threeMonth.toFixed(1)} bp</strong><small>{cdsSnapshot.threeMonth<=0?"Tightening · improving":"Widening · deteriorating"}</small></article>
        <article><span>Composite credit signal</span><strong className="negative">{cdsSnapshot.composite.toFixed(1)}</strong><small>Higher is better · bp-equivalent</small></article>
        <article><span>Coverage</span><strong>{cdsSnapshot.coverage} / 12</strong><small>READY · complete 1M and 3M observations</small></article>
      </div>
      <div className="cds-debt-panel">
        <div className="credit-panel-head"><div><b>CDS and leverage by supply-chain role</b><span>25 issuers · quarter-end role medians · Q3 CDS through 16 Sep · debt data through Q2</span></div><span className="quality">MATCHED DIRECTION, NOT CAUSALITY</span></div>
        <CdsRoleDebtChart/>
        <div className="role-leverage-strip">{roleLeverageSnapshot.map(row=><article key={row.role}><span>{row.role}</span><strong>{row.value===null?"n/a":`${row.value.toFixed(1)}×`}</strong><small>Latest median net debt / EBITDA · {row.coverage}</small></article>)}</div>
        <div className="cds-debt-readthrough"><div><b>What the matched history shows</b><p>Hyperscaler median debt-to-capital rose from 26.3% in 2026Q1 to 30.1% in Q2, while median CDS moved from 40.2bp to 39.5bp and then widened to 45.1bp in partial Q3. Semiconductor-equipment CDS also rose sharply in Q3, led by Applied Materials, without high current net leverage.</p></div><div><b>What remains unproven</b><p>Data-center issuers carry the highest latest net debt/EBITDA and their CDS widened in Q3, but the workbook does not contain quarterly leverage history for non-hyperscaler roles. Rates, issuer mix, equity volatility and event risk can also move CDS. The chart supports a monitoring hypothesis, not a causal conclusion.</p></div></div>
      </div>
      <div className="role-overview" aria-label="CDS issuers grouped by AI-industry role">{cdsRoleOverview.map(group=><article key={group.role}>
        <div className="role-top"><span>{group.label}</span><b>{group.members.length}</b></div>
        <p>{group.description}</p>
        <div className="role-tickers">{group.members.map(c=><code key={c.ticker}>{c.ticker}</code>)}</div>
        <footer><span>1M <b className={group.oneMonth<=0?"positive":"negative"}>{group.oneMonth>0?"+":""}{group.oneMonth.toFixed(1)} bp</b></span><span>3M <b className={group.threeMonth<=0?"positive":"negative"}>{group.threeMonth>0?"+":""}{group.threeMonth.toFixed(1)} bp</b></span></footer>
      </article>)}</div>
      <div className="credit-layout">
        <div className="credit-panel">
          <div className="credit-panel-head"><div><b>Issuer CDS movement</b><span>Latest spread and matched 1M / 3M changes</span></div><div className="credit-legend"><span><i className="tightening-dot"/>Tightening</span><span><i className="widening-dot"/>Widening</span></div></div>
          <div className="credit-table-wrap"><table><thead><tr><th>Issuer</th><th>AI-industry role</th><th>Latest 5Y CDS</th><th>1M change</th><th>3M change</th><th>1M direction</th></tr></thead><tbody>{cdsIssuers.map(c=><tr key={c.ticker}><td><b>{c.ticker}</b><span>{c.issuer}</span></td><td><span className="role-chip">{c.role}</span></td><td>{c.latest.toFixed(1)} bp</td><td className={c.oneMonth<=0?"positive":"negative"}>{c.oneMonth>0?"+":""}{c.oneMonth.toFixed(1)} bp</td><td className={c.threeMonth<=0?"positive":"negative"}>{c.threeMonth>0?"+":""}{c.threeMonth.toFixed(1)} bp</td><td><span className={c.oneMonth<=0?"credit-status tightening":"credit-status widening"}>{c.oneMonth<=0?"Tightening":"Widening"}</span></td></tr>)}</tbody></table></div>
        </div>
        <aside className="credit-readthrough"><div><span className="detail-kicker">CREDIT ASSESSMENT</span><h3>Credit caution is broadening beyond hyperscalers.</h3><p>The 25-issuer basket widened 1.9bp over one month and 8.3bp over three months. Applied Materials, Western Digital, Seagate and Intel are the largest three-month wideners; TSMC, ASML, Samsung and SK Hynix tightened.</p></div><div className="credit-method"><b>Methodology</b><p>The indicator gives equal weight to one-month and three-month spread changes. A positive score indicates improving credit conditions. Results are reported when at least eight issuers have comparable data.</p></div></aside>
      </div>
    </section>

    <section className="section financing-section" id="financing">
      <div className="section-head"><div><div className="eyebrow">06 · BOND ISSUANCE · SATELLITE</div><h2>Debt issuance provides another source of funding.</h2></div><p>Aggregate AI-related bond issuance · as of {bondSnapshot.asOf} <Source id="S6"/></p></div>
      <SectionSummary about="Tracks access to debt capital as companies finance infrastructure beyond internally generated cash." current="Reported issuance totaled $400.7B from September 2025 through August 2026, including $33.7B in August. September adds $5.7B through the 16th, but the partial month should not be read as a slowdown." conclusion="Open primary markets help the buildout continue as cash absorption rises, but greater financing capacity does not answer whether the investment earns an adequate return."/>
      <div className="financing-snapshot">
        <article><span>September month-to-date</span><strong>${bondSnapshot.latest.toFixed(1)}B</strong><small>Partial month through 16 Sep · not comparable to full August</small></article>
        <article><span>Reported Sep–Aug issuance</span><strong>${bondSnapshot.rolling12m.toFixed(1)}B</strong><small>Full months through Aug 2026 · Dec unavailable</small></article>
        <article><span>Rolling 12M issues</span><strong>{bondSnapshot.issues12m}</strong><small>transaction count</small></article>
        <article><span>Rolling 12M YoY</span><strong>n/a</strong><small className="down">Dec 2025 is unavailable</small></article>
      </div>
      <div className="financing-layout"><div className="chart-panel"><div className="chart-meta"><div><b>Monthly issuance activity</b><span>USD billions · September is month-to-date; hover for issue count</span></div></div><BondChart/><div className="chart-callout"><b>Financing conditions:</b> the $5.7B September bar covers only the first 16 days and should not be compared with a full month. The series measures market access, not issuer-specific debt attribution or the return earned on new capital.</div></div><aside className="financing-note"><span className="detail-kicker">DATA QUALIFICATION</span><h3>Partial September and missing December limit comparisons.</h3><p>September is incomplete and December 2025 is absent. The report therefore presents observed issuance levels through August plus September month-to-date, without treating either the gap or the partial month as zero.</p><div><b>Required evidence</b><p>Restoring December 2025 and completing September would permit consistent rolling-window and month-on-month comparisons.</p></div></aside></div>
    </section>

    <section className="section methodology" id="methodology">
      <div className="method-title"><div className="eyebrow">07 · METHODOLOGY & DATA DISCLOSURES</div><h2>Signal construction and analytical scope.</h2><p>The core index measures investment momentum. The supplementary overlay adds financial quality and credit conditions. Cash coverage, lab revenue and ROIC provide separate evidence on sustainability and returns.</p></div>
      <SectionSummary about="Defines the core score, supplementary adjustments, source definitions and missing-data rules." current={`The core index remains 69.3 for the last complete comparable month; improved credit conditions lift the supplementary view to ${formatIndex(satelliteOverlay.adjusted)}.`} conclusion="Separating momentum, financial resilience and returns prevents a strong signal in one dimension from being interpreted as evidence that the full investment cycle is profitable."/>
      <div className="method-steps">
        <article><span>01</span><h3>Normalize momentum</h3><p>Each included series is converted to YoY change, then standardized against its own available history. This avoids adding incomparable source-native units.</p></article>
        <article><span>02</span><h3>Score each pillar</h3><p>Signal score = 50 + 15 × z-score, capped at 0–100. Series are equally weighted within each pillar.</p></article>
        <article><span>03</span><h3>Build the atmosphere</h3><p>Adoption, Demand, Investment, Imports and Hyperscaler CapEx receive equal 20% pillar weights. A score above 50 indicates above-history momentum.</p></article>
        <article><span>04</span><h3>Add satellites separately</h3><p>The adjusted score adds bounded fundamental and credit deltas to the core. Bond issuance stays at zero weight until December 2025 is restored, September is complete and historical normalization is resolved. Token pricing remains context because comparable YoY history is insufficient.</p></article>
      </div>
      <div className="overlay-methodology">
        <div><span>SUPPLEMENTARY ADJUSTMENT FORMULA</span><h3>Adjusted = Core + Fundamental Δ + Credit Δ</h3><p><code>Fundamental Δ = 10% × (median Fundamental Composite − 50)</code></p><p><code>Credit score = clamp(50 + 2.5 × CDS Change Signal, 0, 100)</code></p><p><code>Credit Δ = 10% × (Credit score − 50)</code></p></div>
        <div className="overlay-method-grid"><article><span>Core</span><strong>{satelliteOverlay.core.toFixed(1)}</strong><small>Five-pillar index result</small></article><article><span>Fundamental Δ</span><strong>{satelliteOverlay.fundamentalDelta.toFixed(1)}</strong><small>Bounded to ±5 points by construction</small></article><article><span>Credit Δ</span><strong>{satelliteOverlay.creditDelta.toFixed(1)}</strong><small>Bounded to ±5 points by construction</small></article><article><span>Adjusted</span><strong>{formatIndex(satelliteOverlay.adjusted)}</strong><small>{satelliteOverlay.ready?"Clamped to 0–100":"Coverage threshold not met"}</small></article></div>
        <footer><b>Missing-data rule:</b> weights are not renormalized and missing values are not treated as observed zeros. The adjusted score is withheld when financial or CDS coverage falls below the stated threshold. Bond issuance currently carries zero weight by methodology, rather than an assumption of neutral issuance activity.</footer>
      </div>
      <div className="limitations"><h3>Limits that matter for interpretation</h3><ul><li>Preserve Bloomberg units, seasonal-adjustment flags, release dates and point-in-time vintages.</li><li>Replace PREV-filled observations with explicit freshness and stale-value controls.</li><li>Backfill December 2025 bond issuance before publishing rolling-12-month YoY.</li><li>Add sector-neutral and size-neutral tests to the financial screen; cap extreme CapEx ranks only after sensitivity analysis.</li><li>Run alternative pillar weights, outlier controls and benchmark-relative backtests before integrating satellites.</li><li>Separate actual and forecast atmosphere indices before adding forward quarters.</li><li>For a global aggregate, approve FX conversion, CapEx-definition normalization, constituent weights and missing-proxy rules.</li></ul></div>
      <div className="sources"><article id="source-S1"><span>S1</span><div><b>Indexlist.xlsx — Index Price Value</b><p>Bloomberg monthly PX_LAST snapshot through 16 Sep 2026. Several macro fields are prior-value fills from July or August; the official composite therefore remains at the latest complete comparable month.</p></div></article><article id="source-S2"><span>S2</span><div><b>Consolidated U.S. hyperscaler CapEx workbook</b><p>Microsoft, Alphabet, Meta, Amazon and Oracle through calendar 2026Q2; company-specific accounting bases, actual/estimate status and proxy confidence preserved.</p></div></article><article id="source-S3"><span>S3</span><div><b>China cloud CapEx source collection</b><p>Tencent operating CapEx, Alibaba quarterly CapEx and Baidu cash CapEx through 2026Q2. RMB is primary; approximate values, inferred AI shares and issuer-specific definitions remain labeled.</p></div></article><article id="source-S4"><span>S4</span><div><b>Indexlist.xlsx — AI 5yrCDS Value</b><p>Bloomberg-implied 5Y CDS for 25 AI and infrastructure issuers across seven supply-chain roles through 16 Sep 2026. Changes use matched observations on or before one and three calendar months earlier.</p></div></article><article id="source-S5"><span>S5</span><div><b>Indexlist.xlsx — Supply Chain Financial Value</b><p>Latest reported financial metrics for 32 issuers: 26 at 2026Q2 and six at 2026Q1 fallback. Missing interim reports are labeled and receive no freshness penalty.</p></div></article><article id="source-S6"><span>S6</span><div><b>Indexlist.xlsx — Bond Issuance Value</b><p>Monthly aggregate amount and issue count through 16 Sep 2026. September is explicitly treated as partial; the rolling 12-month total uses full months through August.</p></div></article></div>
    </section>

    <div className="sources sources-addendum"><article id="source-S9"><span>S9</span><div><b>OpenRouter demand snapshot — not refreshed in this workbook</b><p>The retained snapshot covers daily top-50 model token usage for the trailing 30 days through 10 Sep 2026, plus the long-tail bucket. The updated workbook no longer contains the OpenRouter sheet, so this module is deliberately held at its prior vintage. OpenRouter measures routed adoption, not model quality, provider-direct traffic or revenue. <a href="https://openrouter.ai/docs/api/api-reference/datasets/get-rankings-daily">Dataset methodology</a></p></div></article><article id="source-S10"><span>S10</span><div><b>Indexlist.xlsx — OpenAI and Anthropic</b><p>Media-reported and investor-disclosed operating observations through September 2026. The analysis separates recognized revenue from ARR, preserves floors and approximate values, and excludes incomparable margin definitions from the headline comparison.</p></div></article></div>
    <footer className="site-footer"><div className="brand"><span className="brand-mark">AIA</span><span>AI Investment<br/>Atmosphere</span></div><p>U.S. and China views use separate accounting definitions and currencies.</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
