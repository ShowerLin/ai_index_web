import WeeklyPulseHeatmap from "./weekly-pulse-heatmap";
import {weeklySignalCount} from "./weekly-pulse-signals";
import {weeklyPulse as rows} from "./weekly-pulse-snapshot";
import {adoptionPriceSnapshot} from "./adoption-price-snapshot";
import {tokenActivitySnapshot} from "./token-activity-snapshot";

function WeeklyChart({title, field, reference}: {
  title: string;
  field: "pulse" | "xsox_vs_spxt_4w_pct";
  reference: number;
}) {
  const isPulse = field === "pulse";
  const values = rows.flatMap(row => row[field] === null ? [] : [row[field]]);
  const low = isPulse ? 0 : Math.min(0, ...values);
  const high = isPulse ? 100 : Math.max(1, ...values);
  const step = 795 / Math.max(1, rows.length - 1);
  const x = (i: number) => 54 + step * i;
  const y = (value: number) => 18 + 140 * (high - value) / (high - low);
  const unit = isPulse ? "" : "%";
  const color = isPulse ? "#237d67" : "#426d99";
  const paths: {start: number; end: number; partial: boolean; d: string}[] = [];
  for (let i = 1; i < rows.length; i++) {
    const previous = rows[i - 1];
    const row = rows[i];
    const startValue = previous[field];
    const endValue = row[field];
    if (startValue === null || endValue === null) continue;

    const partial = isPulse && Math.min(previous.signals_available, row.signals_available) < weeklySignalCount;
    const end = `L${x(i)},${y(endValue)}`;
    const path = paths.at(-1);
    if (path && path.end === i - 1 && path.partial === partial) {
      path.d += ` ${end}`;
      path.end = i;
    } else {
      paths.push({start: i - 1, end: i, partial, d: `M${x(i - 1)},${y(startValue)} ${end}`});
    }
  }
  return <article className="research-card">
    <h4>{title}</h4>
    <svg viewBox="0 0 890 195" width="100%" role="img" aria-label={title}>
      <line x1="54" x2="849" y1={y(reference)} y2={y(reference)} stroke="#777" strokeDasharray="5 4"/>
      <text x="47" y={y(reference) + 4} textAnchor="end" fontSize="11">{reference}{unit}</text>
      {paths.map(path => <path key={path.start} d={path.d} fill="none" stroke={color} strokeWidth="2" strokeDasharray={path.partial ? "4 3" : undefined}/>)}
      {rows.map((row, i) => {
        const value = row[field];
        if (value === null) return null;
        return <rect key={row.week_end} x={x(i) - step / 2} y={18} width={step} height={140} fill="transparent">
          <title>{`${row.week_end} · ${value.toFixed(2)}${unit}${isPulse ? ` · ${row.signals_available}/${weeklySignalCount} signals` : ` · close ${row.market_close}`}`}</title>
        </rect>;
      })}
      <text x="54" y="182" fontSize="11">{rows[0].week_end}</text>
      <text x="849" y="182" textAnchor="end" fontSize="11">{rows[rows.length - 1].week_end}</text>
    </svg>
  </article>;
}

export default function WeeklyPulse() {
  const latest = rows.filter(row => row.pulse !== null).at(-1);
  const ramp = adoptionPriceSnapshot.rampPublicChart.weekly.findLast(row => row.spendingIndex !== null);
  const market = rows.filter(row => row.xsox_vs_spxt_4w_pct !== null).at(-1);
  const latestFull = rows.findLast(row => row.signals_available === weeklySignalCount);
  return <section className="research-reference" id="weekly-pulse" aria-labelledby="weekly-pulse-title">
    <h3 id="weekly-pulse-title">Weekly AI activity pulse</h3>
    <p>Higher-frequency reference. Latest activity reading <strong>{latest?.pulse?.toFixed(1) ?? "Unavailable"}</strong> for the week ended {latest?.week_end} ({latest?.signals_available}/{weeklySignalCount} signals). XSOX relative return versus SPXT was <strong>{market?.xsox_vs_spxt_4w_pct?.toFixed(1)}%</strong> over four weeks through {market?.market_close}.</p>
    {ramp && <p>Ramp’s latest published week ends <strong>{ramp.end}</strong> with a spending index of <strong>{ramp.spendingIndex?.toFixed(1)}</strong>. The scored pulse uses comparable Sunday-ending Ramp weeks through {tokenActivitySnapshot.metadata.rampMatchedThrough}.</p>}
    <p>Latest week with all signals: <strong>{latestFull?.week_end ?? "Unavailable"}</strong>.</p>
    <WeeklyPulseHeatmap/>
    <WeeklyChart title="AI activity momentum · 0–100" field="pulse" reference={50}/>
    <WeeklyChart title="XSOX versus SPXT · four-week relative total return" field="xsox_vs_spxt_4w_pct" reference={0}/>
    <p>The pulse compares the latest four completed weeks with the previous four for OpenRouter token volume, Ramp matched spending, observed U.S. card spending on OpenAI and Anthropic, token affordability, GPU rentals, and memory spot prices. Available signals share equal weight. A score of 50 represents typical momentum in each signal’s calibration period. Dashed segments indicate partial coverage. Gaps mark weeks without qualifying signals.</p>
  </section>;
}
