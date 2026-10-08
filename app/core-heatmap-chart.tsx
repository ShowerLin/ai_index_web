export type CompositePoint = { month: string; value: number | null; low: number | null; high: number | null };

export default function CoreHeatmapChart({ title, points, corePoints, official, quarterly }: {
  title: string; points: CompositePoint[]; corePoints: {month: string; value: number | null}[]; official: boolean; quarterly: boolean;
}) {
  const values = points.flatMap(point => [point.value, point.low, point.high]).filter((value): value is number => value !== null);
  const baseline = 50;
  const minimum = Math.min(baseline, ...values), maximum = Math.max(baseline, ...values);
  const padding = Math.max((maximum - minimum) * .12, 2);
  const lower = 0, upper = 100;
  const w = 1100, h = 510, left = 58, right = 58, top = 222, bottom = 46;
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
  const latestPoint = [...points].reverse().find(point=>point.value!==null);
  const latestCore = [...corePoints].reverse().find(point=>point.value!==null);
  const events = [
    {month:"2024-03",date:"18 Mar 2024",label:"Blackwell announced",url:"https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing",note:"NVIDIA announced its Blackwell computing platform, a milestone in accelerator supply."},
    {month:"2025-01",date:"20–21 Jan 2025",label:"R1 / Stargate",url:"https://deepseek.com/en/news/deepseek-r1/",note:"DeepSeek released R1 on 20 January; OpenAI announced Stargate on 21 January. Model affordability and infrastructure commitments provide context for adoption and investment."},
    {month:"2025-02",date:"24 Feb 2025",label:"Claude Code preview",url:"https://www.anthropic.com/news/claude-3-7-sonnet",note:"Anthropic introduced Claude Code in a limited research preview. Agentic coding adds repeated model calls for code inspection, editing, tool use and testing."},
    {month:"2025-04",date:"2 Apr 2025",label:"Reciprocal tariffs",url:"https://www.whitehouse.gov/presidential-actions/2025/04/regulating-imports-with-a-reciprocal-tariff-to-rectify-trade-practices-that-contribute-to-large-and-persistent-annual-united-states-goods-trade-deficits/",note:"U.S. reciprocal tariffs were announced, relevant to equipment trade and supply-chain investment."},
    {month:"2025-05",date:"16 May 2025",label:"Codex agent preview",url:"https://openai.com/index/introducing-codex/",note:"OpenAI launched the cloud software-engineering agent Codex in research preview, allowing delegated tasks to run in separate environments. This marks the agent product launch, not the earlier Codex model."},
    {month:"2026-01",date:"29 Jan 2026",label:"OpenClaw announcement",url:"https://openclaw.ai/blog/introducing-openclaw",note:"The project announced the OpenClaw name after starting as Clawd in November 2025. It reported more than 100,000 GitHub stars and 2 million visitors in a week. This is a distribution milestone for general-purpose agents, not its first release or a measure of paid usage."},
  ].filter(event=>points.some(point=>point.month===event.month));
  const laneEnds: number[] = [];
  const eventMarkers = events.map((event,index)=>{
    const anchor=x(points.findIndex(point=>point.month===event.month));
    const cardWidth=184, center=Math.max(left+cardWidth/2,Math.min(w-right-cardWidth/2,anchor));
    let lane=laneEnds.findIndex(end=>center-cardWidth/2>end+12);
    if(lane===-1) lane=laneEnds.length;
    laneEnds[lane]=center+cardWidth/2;
    const color=event.month==="2024-03"?"#315d87":event.month==="2025-01"?"#8060a0":event.month==="2025-04"?"#ac633d":"#237d67";
    return {...event,anchor,center,lane,color,number:index+1};
  });
  return <div className="composite-history-chart" aria-live="polite">
    <div className="composite-chart-heading"><div><span>{official ? "NORMALIZED CORE SCORE" : quarterly ? "NORMALIZED PILLAR SCORE · QUARTERLY HELD" : "NORMALIZED PILLAR SCORE"}</span><h3>{title}</h3></div><div className="composite-latest"><span>Latest available {official?"core":"pillar"} score</span><strong>{latestPoint?.value?.toFixed(1)??"n/a"}</strong><small>{latestPoint?.month??"Unavailable"}{latestPoint&&latestPoint.month!==points.at(-1)?.month?" · latest months incomplete":""}</small>{!official&&<small>Core: {latestCore?.value?.toFixed(1)??"n/a"} · {latestCore?.month??"unavailable"}</small>}</div></div>
    <div className="composite-chart-legend"><span><i className="core-line-key"/>Core index · {latestCore?.value?.toFixed(1)??"n/a"} · {latestCore?.month} · left axis</span>{!official && <><span><i style={quarterly?{borderTopStyle:"dotted"}:undefined}/>{title} · right axis</span><span><i className="range-key"/>Constituent min–max range</span></>}</div>
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Official core index${official ? " historical composite" : ` with ${title} historical composite and constituent range`}`}>
      <text x={left} y="14">CORE SCORE</text>{!official&&<text x={w-right} y="14" textAnchor="end">PILLAR SCORE</text>}
      {[0,25,50,75,100].map(value=><g key={value}><line x1={left} x2={w-right} y1={coreY(value)} y2={coreY(value)} className="task-grid"/><text x={left-9} y={coreY(value)+4} textAnchor="end">{value}</text></g>)}
      {!official&&Array.from({ length: 5 }, (_, index) => lower + index * (upper - lower) / 4).map(value => <text key={value} x={w-right+9} y={y(value)+4}>{value.toFixed(0)}</text>)}
      <line x1={left} x2={w - right} y1={coreY(50)} y2={coreY(50)} className="neutral-line"/>
      {eventMarkers.map(event=>{
        const cardY=24+event.lane*44;
        return <g key={event.month} className="composite-event-marker">
          <title>{`${event.date}: ${event.note} Context only; no causal attribution to monthly scores.`}</title>
          <line x1={event.anchor} x2={event.anchor} y1={top} y2={h-bottom} stroke={event.color} strokeDasharray="3 6" opacity=".35"/>
          <path d={`M${event.center},${cardY+36} L${event.anchor},${top-12} L${event.anchor},${top}`} fill="none" stroke={event.color} strokeWidth="1.2" opacity=".65"/>
          <rect x={event.center-92} y={cardY} width="184" height="36" rx="5" fill="#fbfaf5" stroke={event.color}/>
          <circle cx={event.center-78} cy={cardY+18} r="9" fill={event.color}/>
          <text className="event-number" x={event.center-78} y={cardY+21} textAnchor="middle">{event.number}</text>
          <text className="event-name" x={event.center-62} y={cardY+14}>{event.label}</text>
          <text className="event-date" x={event.center-62} y={cardY+28}>{event.date}</text>
          <circle cx={event.anchor} cy={top} r="3" fill={event.color}/>
        </g>;
      })}
      {bands.map((band, index) => <path key={index} d={`${band.map(({ point, index }, i) => `${i ? "L" : "M"}${x(index)},${y(point.high!)}`).join(" ")} ${[...band].reverse().map(({ point, index }) => `L${x(index)},${y(point.low!)}`).join(" ")} Z`} className="constituent-range"/>)}
      <path d={coreLine} className="pinned-core-line"/>
      {corePoints.map((point,index)=>point.value!==null&&<circle key={point.month} cx={x(index)} cy={coreY(point.value)} r="3.5" className="pinned-core-point"><title>{`${point.month}: official core index ${point.value.toFixed(1)}`}</title></circle>)}
      {!official&&<path d={line} className="composite-history-line" strokeDasharray={quarterly?"2 5":undefined}/>}
      {points.map((point, index) => <g key={point.month}>{index % 2 === 0 || index === points.length - 1 ? <text x={x(index)} y={h - 15} textAnchor="middle">{point.month.slice(2)}</text> : null}{!official&&point.value !== null && <circle cx={x(index)} cy={y(point.value)} r="4" className="composite-history-point"><title>{`${point.month}: ${point.value.toFixed(1)} points${point.low === null ? "" : `; constituents ${point.low.toFixed(1)} to ${point.high!.toFixed(1)}`}`}</title></circle>}</g>)}
    </svg>
    <p>Agent adoption can increase inference intensity through repeated reasoning, tool calls and longer-running tasks. The launch markers identify potential demand catalysts; the collected data do not isolate their contribution. Provider-direct agent traffic is not comprehensively captured by OpenRouter.</p>
    <details className="composite-events"><summary>Event context and sources</summary><ul>{events.map(event=><li key={event.month}><a href={event.url} target="_blank" rel="noreferrer">{events.indexOf(event)+1}. {event.date} · {event.label}</a> — {event.note}{event.month==="2025-01"&&<> <a href="https://openai.com/index/announcing-the-stargate-project/" target="_blank" rel="noreferrer">Stargate announcement</a>.</>}</li>)}</ul><p>Markers identify the event month, not an estimated effect on the index. Announcements may precede measured adoption, orders or spending; these dates do not establish causality.</p></details>
    <p>History begins in January 2024 wherever the required signal is available. Missing observations are not interpolated and do not require a composite score.{quarterly?" Dotted pillar line: quarterly observations carried across months, a retrospective timing assumption rather than monthly measurements.":" Solid lines connect available observations; gaps indicate unavailable inputs."}</p>
  </div>;
}
