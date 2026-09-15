export type PriceMetric = "change1d" | "change1m" | "change3m" | "changeYtd";

export type PriceRow = {
  ticker: string;
  price: number | null;
  currency: string;
  change1d: number | null;
  change1m: number | null;
  change3m: number | null;
  changeYtd: number | null;
  asOf: string;
  revenueGrowthYoy: number | null;
  capexGrowthYoy: number | null;
  fundamentalComposite: number | null;
  financialAsOf: string;
};

export const priceMetricLabels: Record<PriceMetric, string> = {
  change1d: "1D",
  change1m: "1M",
  change3m: "3M",
  changeYtd: "YTD",
};

export const industryChain = [
  {
    id: "applications",
    order: "01",
    stage: "Demand & monetization",
    title: "AI applications & software",
    description: "Enterprise adoption, workflow automation and application-layer monetization.",
    operatingKpi: "AI revenue / ARR · seat growth · net retention",
    companies: [
      { ticker: "MSFT", name: "Microsoft" },
      { ticker: "CRM", name: "Salesforce" },
      { ticker: "ADBE", name: "Adobe" },
      { ticker: "PLTR", name: "Palantir" },
    ],
  },
  {
    id: "platforms",
    order: "02",
    stage: "Models & distribution",
    title: "Cloud & model platforms",
    description: "Training, inference, model access and the cloud control plane that distributes AI.",
    operatingKpi: "Cloud growth · backlog / RPO · AI capacity utilization",
    companies: [
      { ticker: "AMZN", name: "Amazon" },
      { ticker: "GOOGL", name: "Alphabet" },
      { ticker: "META", name: "Meta Platforms" },
      { ticker: "ORCL", name: "Oracle" },
    ],
  },
  {
    id: "silicon",
    order: "03",
    stage: "Compute",
    title: "Accelerators & custom silicon",
    description: "GPUs, AI ASICs, networking silicon and the highest-value compute components.",
    operatingKpi: "Data-center revenue · gross margin · bookings / backlog",
    companies: [
      { ticker: "NVDA", name: "NVIDIA" },
      { ticker: "AMD", name: "AMD" },
      { ticker: "AVGO", name: "Broadcom" },
      { ticker: "MRVL", name: "Marvell" },
    ],
  },
  {
    id: "equipment",
    order: "04",
    stage: "Capacity formation",
    title: "Semiconductor equipment",
    description: "Lithography, deposition, etch and process control enabling leading-edge capacity.",
    operatingKpi: "WFE demand · systems revenue · service mix · China exposure",
    companies: [
      { ticker: "ASML", name: "ASML" },
      { ticker: "AMAT", name: "Applied Materials" },
      { ticker: "LRCX", name: "Lam Research" },
      { ticker: "KLAC", name: "KLA" },
    ],
  },
  {
    id: "memory",
    order: "05",
    stage: "Memory & storage",
    title: "Memory & data storage",
    description: "HBM, DRAM and storage capacity required to keep accelerators fed with data.",
    operatingKpi: "HBM mix · DRAM pricing · bit shipments · inventory days",
    companies: [
      { ticker: "MU", name: "Micron" },
      { ticker: "WDC", name: "Western Digital" },
      { ticker: "STX", name: "Seagate" },
      { ticker: "SNDK", name: "Sandisk" },
    ],
  },
  {
    id: "systems",
    order: "06",
    stage: "Deployment",
    title: "Servers & networking",
    description: "Rack-scale systems, switches and networking that turn chips into usable clusters.",
    operatingKpi: "AI server backlog · networking growth · orders · margins",
    companies: [
      { ticker: "DELL", name: "Dell" },
      { ticker: "HPE", name: "HPE" },
      { ticker: "ANET", name: "Arista Networks" },
      { ticker: "CSCO", name: "Cisco" },
    ],
  },
  {
    id: "datacenters",
    order: "07",
    stage: "Physical infrastructure",
    title: "Data centers & cooling",
    description: "Powered shells, colocation, interconnection and thermal management for dense racks.",
    operatingKpi: "MW capacity · bookings · occupancy · cooling backlog",
    companies: [
      { ticker: "EQIX", name: "Equinix" },
      { ticker: "DLR", name: "Digital Realty" },
      { ticker: "VRT", name: "Vertiv" },
      { ticker: "IRM", name: "Iron Mountain" },
    ],
  },
  {
    id: "power",
    order: "08",
    stage: "Energy constraint",
    title: "Power, grid & generation",
    description: "Generation, electrical equipment and grid construction supporting incremental AI load.",
    operatingKpi: "Load growth · contracted capacity · backlog · utility CapEx",
    companies: [
      { ticker: "CEG", name: "Constellation Energy" },
      { ticker: "VST", name: "Vistra" },
      { ticker: "ETN", name: "Eaton" },
      { ticker: "PWR", name: "Quanta Services" },
    ],
  },
] as const;

export type ChainNodeId = (typeof industryChain)[number]["id"];
export type ChainRelation = "demand" | "dependency" | "constraint";

export type ChainEdge = {
  id: string;
  source: ChainNodeId;
  target: ChainNodeId;
  relation: ChainRelation;
  direction: "one-way" | "two-way";
  label: string;
};

export const chainEdges = [
  { id: "edge-app-platform", source: "applications", target: "platforms", relation: "demand", direction: "one-way", label: "usage & monetization" },
  { id: "edge-platform-datacenter", source: "platforms", target: "datacenters", relation: "demand", direction: "one-way", label: "capacity demand" },
  { id: "edge-platform-silicon", source: "platforms", target: "silicon", relation: "demand", direction: "one-way", label: "compute demand" },
  { id: "edge-equipment-memory", source: "equipment", target: "memory", relation: "dependency", direction: "one-way", label: "fab capacity" },
  { id: "edge-equipment-silicon", source: "equipment", target: "silicon", relation: "dependency", direction: "one-way", label: "process enablement" },
  { id: "edge-memory-silicon", source: "memory", target: "silicon", relation: "dependency", direction: "one-way", label: "data throughput" },
  { id: "edge-silicon-systems", source: "silicon", target: "systems", relation: "dependency", direction: "one-way", label: "cluster building blocks" },
  { id: "edge-systems-datacenter", source: "systems", target: "datacenters", relation: "dependency", direction: "one-way", label: "deployment" },
  { id: "edge-datacenter-power", source: "datacenters", target: "power", relation: "constraint", direction: "two-way", label: "load & capacity constraint" },
] as const satisfies readonly ChainEdge[];

export const chainTickers = industryChain.flatMap((node) =>
  node.companies.map((company) => company.ticker),
);

export function emptyPriceRows(): Record<string, PriceRow> {
  return Object.fromEntries(
    chainTickers.map((ticker) => [
      ticker,
      {
        ticker,
        price: null,
        currency: "USD",
        change1d: null,
        change1m: null,
        change3m: null,
        changeYtd: null,
        asOf: "",
        revenueGrowthYoy: null,
        capexGrowthYoy: null,
        fundamentalComposite: null,
        financialAsOf: "",
      },
    ]),
  );
}
