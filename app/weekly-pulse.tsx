import WeeklyPulseHeatmap, {weeklySignalCount} from "./weekly-pulse-heatmap";
import {weeklyPulse as rows} from "./weekly-pulse-snapshot";
import {adoptionPriceSnapshot} from "./adoption-price-snapshot";
import {tokenActivitySnapshot} from "./token-activity-snapshot";

function WeeklyChart({title, field, reference}: {
  title: string;
  field: "pulse" | "xsox_vs_spxt_4w_pct";
  reference: number;
}) {
  const values = rows.flatMap(row => row[field] === null ? [] : [row[field]]);
  const low = field === "pulse" ? 0 : Math.min(0, ...values);
  const high = field === "pulse" ? 100 : Math.max(1, ...values);
  const x = (i: number) => 54 + 795 * i / Math.max(1, rows.length - 1);
  const y = (value: number) => 18 + 140 * (high - value) / (high - low);
  const unit = field === "pulse" ? "" : "%";
  return <article className="research-card">
    <h4>{title}</h4>
    <svg viewBox="0 0 890 195" width="100%" role="img" aria-label={title}>
      <line x1="54" x2="849" y1={y(reference)} y2={y(reference)} stroke="#777" strokeDasharray="5 4"/>
      <text x="47" y={y(reference) + 4} textAnchor="end" fontSize="11">{reference}{unit}</text>
      {rows.map((row, i) => {
        const value = row[field];
        if (value === null) return null;
        const previous = rows[i - 1]?.[field];
        const partial = field === "pulse" && row.signals_available < weeklySignalCount;
        const color = field === "pulse" ? "#237d67" : "#426d99";
        return <g key={row.week_end}>
          {previous != null && <line x1={x(i - 1)} x2={x(i)} y1={y(previous)} y2={y(value)} stroke={color} strokeWidth="2" strokeDasharray={field === "pulse" && (partial || rows[i - 1].signals_available < weeklySignalCount) ? "4 3" : undefined}/>}
          <circle cx={x(i)} cy={y(value)} r={partial ? 3.5 : 2.5} fill={partial ? "white" : color} stroke={color}>
            <title>{`${row.week_end} · ${value.toFixed(2)}${unit}${field === "pulse" ? ` · ${row.signals_available}/${weeklySignalCount} signals` : field === "xsox_vs_spxt_4w_pct" ? ` · close ${row.market_close}` : ""}`}</title>
          </circle>
        </g>;
      })}
      <text x="54" y="182" fontSize="11">{rows[0].week_end}</text>
      <text x="849" y="182" textAnchor="end" fontSize="11">{rows[rows.length - 1].week_end}</text>
    </svg>
  </article>;
}

export default function WeeklyPulse() {
  const latest = rows.filter(row => row.pulse !== null).at(-1);
  const ramp = adoptionPriceSnapshot.rampPublishedWeekly.findLast(row=>row.value!==null&&row.coverage>=.95);
  const market = rows.filter(row => row.xsox_vs_spxt_4w_pct !== null).at(-1);
  return <section className="research-reference" id="weekly-pulse" aria-labelledby="weekly-pulse-title">
    <h3 id="weekly-pulse-title">Weekly AI activity pulse</h3>
    <p>Higher-frequency reference. Latest activity reading <strong>{latest?.pulse?.toFixed(1) ?? "Unavailable"}</strong> for the week ended {latest?.week_end} ({latest?.signals_available}/{weeklySignalCount} signals). XSOX relative return versus SPXT was <strong>{market?.xsox_vs_spxt_4w_pct?.toFixed(1)}%</strong> over four weeks through {market?.market_close}.</p>
    {ramp && <p>Ramp’s latest published week ends <strong>{ramp.end}</strong> with <strong>${(ramp.spendUsd/1e6).toFixed(1)}M</strong> in matched-model spending. The scored pulse uses comparable Sunday-ending Ramp weeks through {tokenActivitySnapshot.metadata.rampMatchedThrough}.</p>}
    <WeeklyPulseHeatmap/>
    <WeeklyChart title="AI activity momentum · 0–100" field="pulse" reference={50}/>
    <WeeklyChart title="XSOX versus SPXT · four-week relative total return" field="xsox_vs_spxt_4w_pct" reference={0}/>
    <p>The pulse compares the latest four completed weeks with the previous four for OpenRouter token volume, Ramp matched spending, observed U.S. card spending on OpenAI and Anthropic, token affordability, GPU rentals, and memory spot prices. Available signals share equal weight. A score of 50 represents typical momentum in each signal’s calibration period. Hollow points mark incomplete coverage. Gaps mark weeks without qualifying signals.</p>
  </section>;
}
