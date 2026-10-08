export const distributionScenarios = {
 custom: {label:"Custom silicon heavy",shares:[25,15,20,10,20,10]},
 base: {label:"Typical buildout",shares:[35,10,20,10,15,10]},
 nvidia: {label:"NVIDIA heavy",shares:[45,5,20,10,12,8]},
} as const;
export const distributionGroups = [
 {id:"nvidia",label:"NVIDIA platform",companies:["NVDA"],other:"Compute, systems and NVIDIA networking",note:"Includes NVIDIA hardware wherever procured. Remove this content from reseller server revenue to avoid overlap."},
 {id:"custom",label:"Other AI silicon",companies:["AVGO","AMD","MRVL"],other:"TPU · Trainium · other ASICs",note:"Illustrative mixed bucket. Internally designed chips are valued at procurement cost, not hypothetical chip-designer revenue. Broadcom also participates in external networking."},
 {id:"servers",label:"Other server content",companies:["DELL","HPE","MU","WDC","STX","SNDK"],other:"Quanta · Wiwynn · Foxconn · CPUs",note:"Server value excludes accelerator content already counted above. Includes host memory, storage, CPUs, boards and integration."},
 {id:"network",label:"External networking",companies:["ANET","CSCO","AVGO","MRVL"],other:"Switches · optics · cables",note:"Excludes NVIDIA networking counted in its platform allocation. Company revenues can span several buckets; no company market share is assigned."},
 {id:"site",label:"Site & construction",companies:["EQIX","DLR","IRM","PWR"],other:"Developers · contractors · land",note:"Building and site investment. Colocation companies are ecosystem participants; this is not their rental revenue or market share."},
 {id:"power",label:"Power & cooling",companies:["VRT","ETN","PWR"],other:"Schneider Electric · cooling suppliers",note:"Upfront electrical and thermal equipment. CEG and VST participate in ongoing electricity supply, outside this capex allocation."},
] as const;
export const distributionSources = [
 {label:"NVIDIA FY27 Q2 results",url:"https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027",note:"$89B Data Center revenue; 75% consolidated gross margin; quarter ended 26 Jul 2026."},
 {label:"NVIDIA FY27 Q2 call",url:"https://investor.nvidia.com/files/content_files/TRANSCRIPT_-NVIDIA-Corp-NVDA-US-Q2-2027-Earnings-Call-26-August-2026-5_00-PM-ET.pdf",note:"$49B hyperscale revenue; $40B AI cloud / industrial / enterprise; management expects nearly $800B top-five 2026 capex."},
 {label:"Broadcom FY26 Q3 results",url:"https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial",note:"$16.7B AI semiconductor revenue; quarter ended 2 Aug 2026. Includes custom accelerators and networking."},
 {label:"Microsoft FY26 Q4 call",url:"https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4",note:"$41B capex, including leases; approximately two-thirds short-lived assets. Cloud and AI investment, not AI-only."},
 {label:"SK hynix market outlook",url:"https://news.skhynix.com/en/2026-market-outlook-focus-on-the-hbm-led-memory-supercycle/",note:"Cites historical 57% global HBM revenue share and forecast 70% Rubin HBM4 share; neither verifies current NVIDIA-wide supplier mix."},
 {label:"TSMC Q2 2026 results",url:"https://investor.tsmc.com/english/quarterly-results/2026/q2",note:"$40.2B consolidated quarterly revenue; includes non-AI businesses and multiple chip designers."},
];
