export const cdsSnapshot = {
  asOf:"16 Sep 2026", oneMonth:1.9252, threeMonth:8.2692, composite:-5.0972, coverage:25,
} as const;

export const fundamentalSnapshot = {
  asOf:"30 Jun 2026", q2Coverage:26, q1Fallback:6, median:49.6381538462,
  topQuartile1m:-11.3202337450, bottomQuartile1m:-4.6032705742, correlation1m:-0.3068002452,
} as const;

export const fundamentalLeaders = [
  {rank:1,ticker:"SNDK",company:"Sandisk",score:84.7240,cohort:"2026Q2",revenue:50.7,capex:4.4},
  {rank:2,ticker:"ANET",company:"Arista Networks",score:77.1644,cohort:"2026Q2",revenue:12.1,capex:45.5},
  {rank:3,ticker:"NVDA",company:"NVIDIA",score:74.9963,cohort:"2026Q1",revenue:19.8,capex:-36.8},
  {rank:4,ticker:"MU",company:"Micron",score:74.3356,cohort:"2026Q2",revenue:73.7,capex:-22.5},
  {rank:5,ticker:"WDC",company:"Western Digital",score:72.2486,cohort:"2026Q2",revenue:12.3,capex:25.5},
] as const;

export const bondSnapshot = {
  asOf:"16 Sep 2026", latest:5.739625, mom:-82.972, rolling12m:400.6744695, issues12m:174,
} as const;

export const bondHistory = [
  {month:"Sep 25",amount:24.0,issues:11},{month:"Oct 25",amount:15.456555,issues:7},{month:"Nov 25",amount:70.00165,issues:26},
  {month:"Jan 26",amount:4.5,issues:4},{month:"Feb 26",amount:52.5064,issues:20},{month:"Mar 26",amount:82.5655515,issues:32},
  {month:"Apr 26",amount:1.0,issues:1},{month:"May 26",amount:49.03846,issues:29},{month:"Jun 26",amount:35.0198,issues:12},
  {month:"Jul 26",amount:32.877703,issues:12},{month:"Aug 26",amount:33.70835,issues:20},{month:"Sep 26*",amount:5.739625,issues:4},
] as const;

export const cdsIssuers = [
  {issuer:"Microsoft",ticker:"MSFT",role:"Hyperscalers",latest:25.0,oneMonth:1.7,threeMonth:2.0},
  {issuer:"Amazon",ticker:"AMZN",role:"Hyperscalers",latest:45.1,oneMonth:-0.1,threeMonth:0.4},
  {issuer:"Alphabet",ticker:"GOOGL",role:"Hyperscalers",latest:39.1,oneMonth:0.1,threeMonth:0.0},
  {issuer:"Meta Platforms",ticker:"META",role:"Hyperscalers",latest:47.3,oneMonth:-0.2,threeMonth:8.3},
  {issuer:"Oracle",ticker:"ORCL",role:"Hyperscalers",latest:169.3,oneMonth:-4.0,threeMonth:19.1},
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

export const cdsRoleQuarterly = [
  {quarter:"2025Q4",Hyperscalers:25.6,"Accelerators & logic":52.2,"Semiconductor equipment":31.8,"Memory & storage":78.7,"Systems & networking":39.5,"Data centers":78.5,Power:81.5},
  {quarter:"2026Q1",Hyperscalers:40.2,"Accelerators & logic":51.1,"Semiconductor equipment":36.1,"Memory & storage":77.8,"Systems & networking":48.6,"Data centers":64.2,Power:69.7},
  {quarter:"2026Q2",Hyperscalers:39.5,"Accelerators & logic":42.9,"Semiconductor equipment":37.3,"Memory & storage":64.2,"Systems & networking":48.2,"Data centers":64.9,Power:72.3},
  {quarter:"2026Q3*",Hyperscalers:45.1,"Accelerators & logic":49.8,"Semiconductor equipment":51.6,"Memory & storage":82.4,"Systems & networking":45.9,"Data centers":72.1,Power:72.4},
] as const;

export const hyperscalerDebtCapital = [
  {quarter:"2025Q4",value:28.1},{quarter:"2026Q1",value:26.3},{quarter:"2026Q2",value:30.1},
] as const;

export const roleLeverageSnapshot = [
  {role:"Hyperscalers",value:1.0,coverage:"5 / 5"},{role:"Accelerators & logic",value:-1.9,coverage:"3 / 6"},
  {role:"Semiconductor equipment",value:-1.0,coverage:"2 / 2"},{role:"Memory & storage",value:-0.2,coverage:"3 / 5"},
  {role:"Systems & networking",value:2.9,coverage:"2 / 3"},{role:"Data centers",value:21.1,coverage:"2 / 2"},{role:"Power",value:9.5,coverage:"2 / 2"},
] as const;
