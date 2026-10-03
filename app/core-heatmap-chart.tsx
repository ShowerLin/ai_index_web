export type CompositePoint = { month: string; value: number | null; low: number | null; high: number | null };

export default function CoreHeatmapChart({ title, points, corePoints, official, quarterly }: {
  title: string; points: CompositePoint[]; corePoints: {month: string; value: number | null}[]; official: boolean; quarterly: boolean;
}) {
  const values = points.flatMap(point => [point.value, point.low, point.high]).filter((value): value is number => value !== null);
  const baseline = 50;
  const minimum = Math.min(baseline, ...values), maximum = Math.max(baseline, ...values);
  const padding = Math.max((maximum - minimum) * .12, 2);
  const lower = 0, upper = 100;
  const w = 560, h = 340, left = 52, right = 58, top = 32, bottom = 46;
  const x = (index: number) => left + index * (w - left - right) / Math.max(points.length - 1, 1);
  const y = (value: number) => top + (upper - value) * (h - top - bottom) / (upper - lower);
  const coreY = (value: number) => top + (100 - value) * (h - top - bottom) / 100;
  const coreLine = corePoints.map((point,index)=>point.value===null?"":`${index===0||corePoints[index-1].value===null?"M":"L"}${x(index)},${coreY(point.value)}`).join(" ");
  const line = points.map((point, index) => point.value === null ? "" : `${index === 0 || points[index - 1].value === null ? "M" : "L"}${x(index)},${y(point.value)}`).join(" ");
  // Separate bands at missing inputs rather than connecting across a gap.
  const bands: { point: CompositePoint; index: number }[][] = [];
  let current: { point: CompositePoint; index: number }[] = [];
  points.forEach((point, index) => {
    if (point.low !== null && point.high !== null) current.push({ point, index });
    else if (current.length) { bands.push(current); current = []; }
  });
  if (current.length) bands.push(current);
  const latest = points.at(-1)?.value;
  return <div className="composite-history-chart" aria-live="polite">
    <div className="composite-chart-heading"><div><span>{official ? "NORMALIZED CORE SCORE" : quarterly ? "NORMALIZED PILLAR SCORE · QUARTERLY HELD" : "NORMALIZED PILLAR SCORE"}</span><h3>{title}</h3></div><strong>{latest == null ? "n/a" : `${latest.toFixed(1)}`}</strong></div>
    <div className="composite-chart-legend"><span><i className="core-line-key"/>Core index · {corePoints.at(-1)?.value?.toFixed(1)??"n/a"} · left axis</span>{!official && <><span><i style={quarterly?{borderTopStyle:"dotted"}:undefined}/>{title} · right axis</span><span><i className="range-key"/>Constituent min–max range</span></>}</div>
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Official core index${official ? " historical composite" : ` with ${title} historical composite and constituent range`}`}>
      <text x={left} y="14">CORE SCORE</text>{!official&&<text x={w-right} y="14" textAnchor="end">PILLAR SCORE</text>}
      {[0,25,50,75,100].map(value=><g key={value}><line x1={left} x2={w-right} y1={coreY(value)} y2={coreY(value)} className="task-grid"/><text x={left-9} y={coreY(value)+4} textAnchor="end">{value}</text></g>)}
      {!official&&Array.from({ length: 5 }, (_, index) => lower + index * (upper - lower) / 4).map(value => <text key={value} x={w-right+9} y={y(value)+4}>{value.toFixed(0)}</text>)}
      <line x1={left} x2={w - right} y1={coreY(50)} y2={coreY(50)} className="neutral-line"/>
      {bands.map((band, index) => <path key={index} d={`${band.map(({ point, index }, i) => `${i ? "L" : "M"}${x(index)},${y(point.high!)}`).join(" ")} ${[...band].reverse().map(({ point, index }) => `L${x(index)},${y(point.low!)}`).join(" ")} Z`} className="constituent-range"/>)}
      <path d={coreLine} className="pinned-core-line"/>
      {corePoints.map((point,index)=>point.value!==null&&<circle key={point.month} cx={x(index)} cy={coreY(point.value)} r="3.5" className="pinned-core-point"><title>{`${point.month}: official core index ${point.value.toFixed(1)}`}</title></circle>)}
      {!official&&<path d={line} className="composite-history-line" strokeDasharray={quarterly?"2 5":undefined}/>}
      {points.map((point, index) => <g key={point.month}>{index % 2 === 0 || index === points.length - 1 ? <text x={x(index)} y={h - 15} textAnchor="middle">{point.month.slice(2)}</text> : null}{!official&&point.value !== null && <circle cx={x(index)} cy={y(point.value)} r="4" className="composite-history-point"><title>{`${point.month}: ${point.value.toFixed(1)} points${point.low === null ? "" : `; constituents ${point.low.toFixed(1)} to ${point.high!.toFixed(1)}`}`}</title></circle>}</g>)}
    </svg>
    <p>History begins in January 2024 wherever the required signal is available. Missing observations are not interpolated and do not require a composite score.{quarterly?" Dotted pillar line: quarterly observations carried across months, a retrospective timing assumption rather than monthly measurements.":" Solid lines connect available observations; gaps indicate unavailable inputs."}</p>
  </div>;
}
