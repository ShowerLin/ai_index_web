import type { PriceRow } from "./industry-chain-data";

export const industryChainSnapshotMetadata = {
  source: "Indexlist.xlsx",
  priceSheet: "Supply Chain Price Value",
  financialSheet: "Supply Chain Financial Value",
  fundamentalSheet: "Financial Resilience",
  fundamentalSource: "outputs/20260825_satellite_indicators/indexlist_satellite_indicators_v1.xlsx",
  priceAsOf: "2026-08-24",
  coverage: 32,
  q2FinancialCoverage: 26,
  q1FinancialFallback: 6,
  oneDayAvailable: false,
} as const;

type SnapshotValue = Pick<PriceRow, "change1m" | "change3m" | "changeYtd" | "revenueGrowthYoy" | "capexGrowthYoy" | "financialAsOf">;

const fundamentalCompositeScores: Record<string, number> = {
  MSFT:54.8335, CRM:53.1018, ADBE:40.4348, PLTR:69.3511,
  AMZN:32.2782, GOOGL:46.1745, META:35.8551, ORCL:41.1591,
  NVDA:74.9963, AMD:44.6732, AVGO:66.1123, MRVL:36.9252,
  ASML:55.1711, AMAT:63.5498, LRCX:66.6489, KLAC:55.3717,
  MU:74.3356, WDC:72.2486, STX:65.4754, SNDK:84.7240,
  DELL:40.6295, HPE:39.9680, ANET:77.1644, CSCO:39.7366,
  EQIX:34.1028, DLR:42.2966, VRT:54.4022, IRM:31.6686,
  CEG:21.3942, VST:32.4117, ETN:28.3902, PWR:62.8172,
};

const snapshotValues: Record<string, SnapshotValue> = {
  MSFT:{change1m:26.841486,change3m:16.374769,changeYtd:2.827703,revenueGrowthYoy:8.591318,capexGrowthYoy:-15.954139,financialAsOf:"2026-06-30"},
  CRM:{change1m:27.80765,change3m:17.111306,changeYtd:-17.095245,revenueGrowthYoy:-0.607089,capexGrowthYoy:30.62201,financialAsOf:"2026-03-31"},
  ADBE:{change1m:22.295767,change3m:14.474614,changeYtd:-17.40174,revenueGrowthYoy:3.438575,capexGrowthYoy:-56.756757,financialAsOf:"2026-06-30"},
  PLTR:{change1m:46.387895,change3m:31.727672,changeYtd:7.196473,revenueGrowthYoy:18.552257,capexGrowthYoy:-96.649101,financialAsOf:"2026-06-30"},
  AMZN:{change1m:11.425617,change3m:-2.51046,changeYtd:14.18543,revenueGrowthYoy:10.526722,capexGrowthYoy:-22.63421,financialAsOf:"2026-06-30"},
  GOOGL:{change1m:7.843873,change3m:-11.27628,changeYtd:9.555865,revenueGrowthYoy:9.453036,capexGrowthYoy:-25.929248,financialAsOf:"2026-06-30"},
  META:{change1m:-7.609335,change3m:-10.117508,changeYtd:-15.307734,revenueGrowthYoy:7.973575,capexGrowthYoy:-58.530294,financialAsOf:"2026-06-30"},
  ORCL:{change1m:27.376294,change3m:-23.862671,changeYtd:-24.431352,revenueGrowthYoy:11.599767,capexGrowthYoy:11.4945,financialAsOf:"2026-06-30"},
  NVDA:{change1m:3.809708,change3m:0.0491,changeYtd:13.834816,revenueGrowthYoy:19.798318,capexGrowthYoy:-36.838006,financialAsOf:"2026-03-31"},
  AMD:{change1m:-9.330396,change3m:-6.080692,changeYtd:111.773392,revenueGrowthYoy:12.513411,capexGrowthYoy:-107.712082,financialAsOf:"2026-06-30"},
  AVGO:{change1m:-3.526917,change3m:-12.546919,changeYtd:6.381845,revenueGrowthYoy:14.893066,capexGrowthYoy:7.6,financialAsOf:"2026-03-31"},
  MRVL:{change1m:22.040879,change3m:13.848225,changeYtd:165.55773,revenueGrowthYoy:8.973723,capexGrowthYoy:-36.220472,financialAsOf:"2026-03-31"},
  ASML:{change1m:0.515166,change3m:8.217492,changeYtd:52.299883,revenueGrowthYoy:6.3831,capexGrowthYoy:25.596421,financialAsOf:"2026-06-30"},
  AMAT:{change1m:-8.094015,change3m:8.343961,changeYtd:83.758258,revenueGrowthYoy:15.233881,capexGrowthYoy:-11.338583,financialAsOf:"2026-06-30"},
  LRCX:{change1m:2.879984,change3m:-2.622355,changeYtd:69.990572,revenueGrowthYoy:15.077494,capexGrowthYoy:43.064318,financialAsOf:"2026-06-30"},
  KLAC:{change1m:-12.504434,change3m:-8.423694,changeYtd:44.903543,revenueGrowthYoy:7.100219,capexGrowthYoy:-4.814115,financialAsOf:"2026-06-30"},
  MU:{change1m:4.976383,change3m:7.930444,changeYtd:206.695192,revenueGrowthYoy:73.746857,capexGrowthYoy:-22.530139,financialAsOf:"2026-06-30"},
  WDC:{change1m:-11.612159,change3m:-12.403569,changeYtd:144.96348,revenueGrowthYoy:12.286485,capexGrowthYoy:25.517241,financialAsOf:"2026-06-30"},
  STX:{change1m:-0.198429,change3m:0.576201,changeYtd:196.361063,revenueGrowthYoy:16.613111,capexGrowthYoy:-16.149068,financialAsOf:"2026-06-30"},
  SNDK:{change1m:11.104305,change3m:0.410808,changeYtd:479.886644,revenueGrowthYoy:50.672269,capexGrowthYoy:4.444444,financialAsOf:"2026-06-30"},
  DELL:{change1m:1.046857,change3m:45.132138,changeYtd:249.124992,revenueGrowthYoy:31.346056,capexGrowthYoy:-33.564494,financialAsOf:"2026-03-31"},
  HPE:{change1m:12.078004,change3m:40.849799,changeYtd:123.115677,revenueGrowthYoy:14.80486,capexGrowthYoy:-2.460457,financialAsOf:"2026-03-31"},
  ANET:{change1m:8.425772,change3m:19.391178,changeYtd:41.20509,revenueGrowthYoy:12.059801,capexGrowthYoy:45.504587,financialAsOf:"2026-06-30"},
  CSCO:{change1m:-2.741526,change3m:-5.814953,changeYtd:47.345517,revenueGrowthYoy:8.907266,capexGrowthYoy:5.797101,financialAsOf:"2026-06-30"},
  EQIX:{change1m:-1.267801,change3m:-0.662194,changeYtd:41.531844,revenueGrowthYoy:7.405892,capexGrowthYoy:-25.636943,financialAsOf:"2026-06-30"},
  DLR:{change1m:-4.249548,change3m:-0.925419,changeYtd:24.608831,revenueGrowthYoy:17.665837,capexGrowthYoy:-583.026139,financialAsOf:"2026-06-30"},
  VRT:{change1m:-9.784406,change3m:-19.112567,changeYtd:49.230393,revenueGrowthYoy:23.581808,capexGrowthYoy:-53.907638,financialAsOf:"2026-06-30"},
  IRM:{change1m:-4.90219,change3m:-4.31865,changeYtd:48.777126,revenueGrowthYoy:4.798856,capexGrowthYoy:-13.547923,financialAsOf:"2026-06-30"},
  CEG:{change1m:-0.376829,change3m:-9.368913,changeYtd:-25.15661,revenueGrowthYoy:-32.53012,capexGrowthYoy:2.27451,financialAsOf:"2026-06-30"},
  VST:{change1m:-16.629942,change3m:-17.114433,changeYtd:-17.321635,revenueGrowthYoy:-28.776596,capexGrowthYoy:21.970555,financialAsOf:"2026-06-30"},
  ETN:{change1m:3.998744,change3m:4.241244,changeYtd:29.132252,revenueGrowthYoy:14.494699,capexGrowthYoy:-31.088083,financialAsOf:"2026-06-30"},
  PWR:{change1m:2.157101,change3m:-13.842772,changeYtd:45.461968,revenueGrowthYoy:21.361975,capexGrowthYoy:-4.935186,financialAsOf:"2026-06-30"},
};

export function snapshotPriceRows(): Record<string, PriceRow> {
  return Object.fromEntries(Object.entries(snapshotValues).map(([ticker,value])=>[ticker,{
    ticker,
    price:null,
    currency:"USD",
    change1d:null,
    ...value,
    fundamentalComposite:fundamentalCompositeScores[ticker]??null,
    asOf:industryChainSnapshotMetadata.priceAsOf,
  }]));
}
