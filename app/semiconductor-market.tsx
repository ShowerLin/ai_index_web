import {semiconductorMarket as history} from "./semiconductor-market-snapshot";

export default function SemiconductorMarket() {
  const first = history[0];
  const latest = history[history.length - 1];
  const low = Math.min(0, ...history.map(row => row.relativeReturn));
  const high = Math.max(1, ...history.map(row => row.relativeReturn));
  const x = (date: string) => 55 + 800 * (Date.parse(date) - Date.parse(first.date)) / Math.max(1, Date.parse(latest.date) - Date.parse(first.date));
  const y = (value: number) => 24 + 185 * (high - value) / (high - low);
  return <section className="research-card market-reference" aria-labelledby="semiconductor-market-title">
    <h3 id="semiconductor-market-title">Semiconductor market enthusiasm</h3>
    <p>XSOX versus S&P 500 total return (SPXT). Relative performance was {latest.relativeReturn.toFixed(1)}% since {first.date}, through {latest.date}.</p>
    <svg viewBox="0 0 910 255" width="100%" role="img" aria-label="Cumulative XSOX relative total return versus SPXT">
      <line x1="55" x2="855" y1={y(0)} y2={y(0)} stroke="gray" strokeDasharray="5 4"/>
      <text x="48" y={y(0)+4} textAnchor="end" fontSize="12">0%</text>
      <polyline points={history.map((row) => `${x(row.date)},${y(row.relativeReturn)}`).join(" ")} fill="none" stroke="#237d67" strokeWidth="3"/>
      {history.map((row) => <circle key={row.date} cx={x(row.date)} cy={y(row.relativeReturn)} r="1.5" fill="#237d67"><title>{`${row.date} · ${row.relativeReturn.toFixed(1)}%`}</title></circle>)}
      <text x="55" y="240" fontSize="12">{first.date}</text>
      <text x="855" y="240" textAnchor="end" fontSize="12">{latest.date}</text>
    </svg>
    <p>Rising relative returns can flag growing semiconductor enthusiasm. Read them alongside the core activity index when assessing possible market froth. Source: AI_Benchmark.xlsx, daily matched closes.</p>
  </section>;
}
