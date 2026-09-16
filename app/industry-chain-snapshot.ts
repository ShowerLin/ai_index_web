import type { PriceRow } from "./industry-chain-data";

export const industryChainSnapshotMetadata = {
  source: "Indexlist.xlsx",
  priceSheet: "Supply Chain Price Value",
  financialSheet: "Supply Chain Financial Value",
  fundamentalSheet: "Financial Resilience",
  fundamentalSource: "outputs/20260825_satellite_indicators/indexlist_satellite_indicators_v1.xlsx",
  priceAsOf: "2026-09-16",
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
  MSFT:{change1m:3.686936,change3m:26.465785,changeYtd:5.781200,revenueGrowthYoy:8.591318,capexGrowthYoy:-15.954139,financialAsOf:"2026-06-30"},
  CRM:{change1m:33.869191,change3m:58.091642,changeYtd:1.327151,revenueGrowthYoy:-0.607089,capexGrowthYoy:30.62201,financialAsOf:"2026-03-31"},
  ADBE:{change1m:1.464340,change3m:24.329544,changeYtd:-22.664263,revenueGrowthYoy:3.438575,capexGrowthYoy:-56.756757,financialAsOf:"2026-06-30"},
  PLTR:{change1m:0.005794,change3m:29.500936,changeYtd:2.799951,revenueGrowthYoy:18.552257,capexGrowthYoy:-96.649101,financialAsOf:"2026-06-30"},
  AMZN:{change1m:-4.932839,change3m:0.983739,changeYtd:9.677703,revenueGrowthYoy:10.526722,capexGrowthYoy:-22.63421,financialAsOf:"2026-06-30"},
  GOOGL:{change1m:0.350072,change3m:-7.513932,changeYtd:9.677949,revenueGrowthYoy:9.453036,capexGrowthYoy:-25.929248,financialAsOf:"2026-06-30"},
  META:{change1m:17.798828,change3m:11.667581,changeYtd:3.226302,revenueGrowthYoy:7.973575,capexGrowthYoy:-58.530294,financialAsOf:"2026-06-30"},
  ORCL:{change1m:-4.295939,change3m:-25.211610,changeYtd:-27.588856,revenueGrowthYoy:11.599767,capexGrowthYoy:11.4945,financialAsOf:"2026-06-30"},
  NVDA:{change1m:-5.598457,change3m:2.412088,changeYtd:12.611702,revenueGrowthYoy:19.798318,capexGrowthYoy:-36.838006,financialAsOf:"2026-03-31"},
  AMD:{change1m:-0.355729,change3m:-0.609117,changeYtd:125.623132,revenueGrowthYoy:12.513411,capexGrowthYoy:-107.712082,financialAsOf:"2026-06-30"},
  AVGO:{change1m:-13.546368,change3m:-9.789396,changeYtd:-2.043243,revenueGrowthYoy:14.893066,capexGrowthYoy:7.6,financialAsOf:"2026-03-31"},
  MRVL:{change1m:-5.389836,change3m:-20.423294,changeYtd:148.372206,revenueGrowthYoy:8.973723,capexGrowthYoy:-36.220472,financialAsOf:"2026-03-31"},
  ASML:{change1m:-15.487065,change3m:-11.655963,changeYtd:37.423581,revenueGrowthYoy:6.3831,capexGrowthYoy:25.596421,financialAsOf:"2026-06-30"},
  AMAT:{change1m:-21.238187,change3m:-25.801196,changeYtd:57.201552,revenueGrowthYoy:15.233881,capexGrowthYoy:-11.338583,financialAsOf:"2026-06-30"},
  LRCX:{change1m:-21.222081,change3m:-26.610113,changeYtd:46.641228,revenueGrowthYoy:15.077494,capexGrowthYoy:43.064318,financialAsOf:"2026-06-30"},
  KLAC:{change1m:-18.341755,change3m:-29.124924,changeYtd:32.326181,revenueGrowthYoy:7.100219,capexGrowthYoy:-4.814115,financialAsOf:"2026-06-30"},
  MU:{change1m:-8.317274,change3m:-9.112693,changeYtd:194.265968,revenueGrowthYoy:73.746857,capexGrowthYoy:-22.530139,financialAsOf:"2026-06-30"},
  WDC:{change1m:-23.119073,change3m:-39.494706,changeYtd:119.717194,revenueGrowthYoy:12.286485,capexGrowthYoy:25.517241,financialAsOf:"2026-06-30"},
  STX:{change1m:-22.414781,change3m:-25.108595,changeYtd:169.099331,revenueGrowthYoy:16.613111,capexGrowthYoy:-16.149068,financialAsOf:"2026-06-30"},
  SNDK:{change1m:-14.324369,change3m:-23.130475,changeYtd:456.203684,revenueGrowthYoy:50.672269,capexGrowthYoy:4.444444,financialAsOf:"2026-06-30"},
  DELL:{change1m:13.276090,change3m:34.715217,changeYtd:329.227578,revenueGrowthYoy:31.346056,capexGrowthYoy:-33.564494,financialAsOf:"2026-03-31"},
  HPE:{change1m:-3.002949,change3m:15.502276,changeYtd:133.259201,revenueGrowthYoy:14.80486,capexGrowthYoy:-2.460457,financialAsOf:"2026-03-31"},
  ANET:{change1m:-4.440041,change3m:14.778880,changeYtd:44.341315,revenueGrowthYoy:12.059801,capexGrowthYoy:45.504587,financialAsOf:"2026-06-30"},
  CSCO:{change1m:-2.506643,change3m:-7.605928,changeYtd:46.058366,revenueGrowthYoy:8.907266,capexGrowthYoy:5.797101,financialAsOf:"2026-06-30"},
  EQIX:{change1m:-7.817517,change3m:-7.570783,changeYtd:33.772359,revenueGrowthYoy:7.405892,capexGrowthYoy:-25.636943,financialAsOf:"2026-06-30"},
  DLR:{change1m:-8.801979,change3m:-5.229717,changeYtd:17.986824,revenueGrowthYoy:17.665837,capexGrowthYoy:-583.026139,financialAsOf:"2026-06-30"},
  VRT:{change1m:-19.751131,change3m:-21.671639,changeYtd:33.690248,revenueGrowthYoy:23.581808,capexGrowthYoy:-53.907638,financialAsOf:"2026-06-30"},
  IRM:{change1m:-13.083910,change3m:-11.938226,changeYtd:37.662127,revenueGrowthYoy:4.798856,capexGrowthYoy:-13.547923,financialAsOf:"2026-06-30"},
  CEG:{change1m:-6.432271,change3m:-2.871111,changeYtd:-28.719401,revenueGrowthYoy:-32.53012,capexGrowthYoy:2.27451,financialAsOf:"2026-06-30"},
  VST:{change1m:-3.134625,change3m:-10.646383,changeYtd:-14.092439,revenueGrowthYoy:-28.776596,capexGrowthYoy:21.970555,financialAsOf:"2026-06-30"},
  ETN:{change1m:-13.833993,change3m:-3.519164,changeYtd:20.876657,revenueGrowthYoy:14.494699,capexGrowthYoy:-31.088083,financialAsOf:"2026-06-30"},
  PWR:{change1m:-15.084939,change3m:-14.714850,changeYtd:39.548745,revenueGrowthYoy:21.361975,capexGrowthYoy:-4.935186,financialAsOf:"2026-06-30"},
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
