export type Company = "Aggregate" | "Microsoft" | "Alphabet" | "Meta" | "Amazon" | "Oracle";

export const capexHistory = [
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

export const proxyHistory: Record<Company, readonly (number|null)[]> = {
  Aggregate:[null,null,null,null,null,null,null,null,null,null,74.02,91.93,100.783,123.851],
  Microsoft:[null,null,5.6,5.75,7,9.5,10,11.3,10.7,12.1,17.45,25.125,21.373,27.333],
  Alphabet:[null,null,null,null,null,null,null,8.58,10.32,13.5,14.4,16.74,21.42,26.954],
  Meta:[null,null,null,null,null,null,null,9.62,8.905,11.05,12.61,14.365,12.87,20.201],
  Amazon:[null,null,null,null,null,null,13.56,16.68,15,19.32,21.06,23.7,26.52,32.863],
  Oracle:[null,null,null,null,null,null,null,null,null,null,8.5,12,18.6,16.5],
};

export const constituents = [
  {company:"Amazon",ticker:"AMZN",value:54.771,proxy:32.863,share:29.1,yoy:70.1,basis:"60% server mix; cash PP&E plus new finance-lease additions",quality:"Disclosed mix"},
  {company:"Alphabet",ticker:"GOOGL",value:44.924,proxy:26.954,share:23.9,yoy:99.7,basis:"60% server share; AI and non-AI compute",quality:"Disclosed mix"},
  {company:"Microsoft",ticker:"MSFT",value:41.0,proxy:27.333,share:21.8,yoy:69.4,basis:"Two-thirds short-lived split applied to total CapEx",quality:"Disclosed mix"},
  {company:"Meta",ticker:"META",value:31.078,proxy:20.201,share:16.5,yoy:82.8,basis:"65% equipment share is analyst-estimated",quality:"Estimated mix"},
  {company:"Oracle",ticker:"ORCL",value:16.5,proxy:16.5,share:8.8,yoy:81.3,basis:"100% equipment-heavy proxy is inferred",quality:"Inferred proxy"},
] as const;

export const latestCapexPulse = [
  {ticker:"MSFT",v:28.5},{ticker:"GOOGL",v:25.8},{ticker:"META",v:57.0},{ticker:"AMZN",v:23.9},{ticker:"ORCL",v:-11.3},
] as const;

export const chinaCapexHistory = [
  {q:"2024Q1",Tencent:5.4,Alibaba:14.7,Baidu:2.04},{q:"2024Q2",Tencent:7.2,Alibaba:11.9,Baidu:2.12},
  {q:"2024Q3",Tencent:12.0,Alibaba:17.5,Baidu:1.65},{q:"2024Q4",Tencent:36.6,Alibaba:31.8,Baidu:2.33},
  {q:"2025Q1",Tencent:27.5,Alibaba:25.7,Baidu:2.90},{q:"2025Q2",Tencent:19.1,Alibaba:38.7,Baidu:3.80},
  {q:"2025Q3",Tencent:13.0,Alibaba:31.5,Baidu:3.80},{q:"2025Q4",Tencent:19.6,Alibaba:25.4,Baidu:1.97},
  {q:"2026Q1",Tencent:31.2,Alibaba:30.6,Baidu:6.08},{q:"2026Q2",Tencent:52.8,Alibaba:67.7,Baidu:11.40},
] as const;

export const stages = [
  { id: "demand", label: "01 · Demand", value: "615.3T", metric: "30-day tokens · 7 Sep–6 Oct", signal: "Traffic is spread across models", detail: "The largest model accounts for 12.6% of this OpenRouter sample, spreading demand across competing providers." },
  { id: "price", label: "02 · Price", value: "−44%", metric: "LLM token-price index · Jun to 16 Sep", signal: "Lower prices raise the monetization hurdle", detail: "The index fell from 1.7095 in June to 0.9543. This workbook price benchmark is not realized revenue per token. If realized prices also fall, paid volume and product mix must offset that decline for revenue to grow." },
  { id: "utilization", label: "03 · Capacity", value: "77.3%", metric: "Cash CapEx / operating cash flow", signal: "The buildout is absorbing more cash", detail: "Four-company cash CapEx reached $510.7B TTM while hardware, memory and data-center activity remained expansionary." },
  { id: "returns", label: "04 · Returns", value: "5 / 5", metric: "Incremental ROIC below total ROIC", signal: "Incremental returns trail overall returns", detail: "Profit growth per additional dollar of capital trails overall ROIC in all five companies. Earnings realization needs to catch up with the growing capital base." },
] as const;

export const returns = [
  { ticker: "MSFT", roic: 29.3, incremental: 18.3 }, { ticker: "GOOGL", roic: 28.8, incremental: 16.2 },
  { ticker: "META", roic: 28.4, incremental: 15.8 }, { ticker: "AMZN", roic: 13.1, incremental: 9.8 },
  { ticker: "ORCL", roic: 12.8, incremental: 6.8 },
] as const;

export const trend = [
  { quarter: "2025Q1", tokensPerDay: 0.134, tokenCoverage: "90 / 90", capex: 71.902, roic: 31.538 },
  { quarter: "2025Q2", tokensPerDay: 0.306, tokenCoverage: "90 / 91", capex: 88.246, roic: 30.885 },
  { quarter: "2025Q3", tokensPerDay: 0.525, tokenCoverage: "91 / 92", capex: 97.271, roic: 28.356 },
  { quarter: "2025Q4", tokensPerDay: 0.814, tokenCoverage: "92 / 92", capex: 118.632, roic: 27.404 },
  { quarter: "2026Q1", tokensPerDay: 1.836, tokenCoverage: "90 / 90", capex: 129.750, roic: 26.299 },
  { quarter: "2026Q2", tokensPerDay: 4.488, tokenCoverage: "91 / 91", capex: 165.050, roic: 23.676 },
] as const;
