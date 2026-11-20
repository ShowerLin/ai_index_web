"use client";

import {useEffect, useId, useRef, useState} from "react";
import {coreProjectionSnapshot as projection} from "./core-projection-snapshot";
export type CompositePoint = { month: string; value: number | null; low: number | null; high: number | null; estimated?: boolean };

export default function CoreHeatmapChart({ title, points: historicalPoints, corePoints: historicalCorePoints, official, quarterly }: {
  title: string; points: CompositePoint[]; corePoints: {month: string; value: number | null}[]; official: boolean; quarterly: boolean;
}) {
  const tooltipId = useId();
  const [activeEventUrl, setActiveEventUrl] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (activeEventUrl === null) return;
    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveEventUrl(null);
    }
    window.addEventListener("keydown", dismissOnEscape);
    return () => {
      window.clearTimeout(closeTimer.current);
      window.removeEventListener("keydown", dismissOnEscape);
    };
  }, [activeEventUrl]);

  function showEvent(url: string) {
    window.clearTimeout(closeTimer.current);
    setActiveEventUrl(url);
  }

  function scheduleEventClose() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveEventUrl(null), 160);
  }

  const displayEndDate = new Date(`${projection.metadata.anchorMonth}-01T00:00:00Z`);
  displayEndDate.setUTCMonth(displayEndDate.getUTCMonth()+3);
  const displayEnd = displayEndDate.toISOString().slice(0,7);
  const displayedProjection = quarterly ? projection.months.filter(p => p.month <= displayEnd) : [];
  const displayQuarter = `${displayEnd.slice(0,4)}Q${Math.ceil(Number(displayEnd.slice(5))/3)}`;
  const coverage = projection.quarters.find(q => q.quarter === displayQuarter)?.availableEstimate;
  const projectionEnd = displayedProjection.at(-1);
  const pillarDescriptions: Record<string, string> = {
    Adoption: "Adoption combines current and expected business AI use, Ramp paid adoption and two independently normalized token-volume signals. Breadth and usage each receive half the pillar weight.",
    Monetization: "Monetization combines business paid demand, consumer card spending and absolute annualized lab revenue levels. Business paid demand covers Ramp spending intensity, Ramp matched spending growth and OpenRouter estimated routed-spending growth. Source dates identify latest available observations.",
    Infrastructure: "Infrastructure combines supplier sales, equipment orders and imports, construction, industrial activity, and independently calibrated DDR5 and H100 price momentum.",
    Hyperscalers: "Hyperscalers tracks trailing-four-quarter CapEx growth across the five covered companies. Quarterly scores are held across the months of each quarter.",
  };
  const futureMonths = displayedProjection.filter(p => p.month > historicalPoints.at(-1)!.month);
  const points: CompositePoint[] = [...historicalPoints.map(p => p.estimated ? {...p,value:null,low:null,high:null} : p), ...futureMonths.map(p => ({month:p.month,value:null,low:null,high:null}))];
  const corePoints = points.map(p => ({month:p.month,value:p.month <= projection.metadata.anchorMonth ? historicalCorePoints.find(h => h.month === p.month)?.value ?? null : null}));
  const provisionalCore = points.map(p => ({month:p.month,
    value:p.month >= projection.metadata.anchorMonth ? historicalCorePoints.find(h => h.month === p.month)?.value ?? null : null}));
  const lower = 0, upper = 100;
  const w = 1100, h = 344, left = 58, right = 58, top = 56, bottom = 46;
  const x = (index: number) => left + index * (w - left - right) / Math.max(points.length - 1, 1);
  const y = (value: number) => top + (upper - value) * (h - top - bottom) / (upper - lower);
  const coreY = (value: number) => top + (100 - value) * (h - top - bottom) / 100;
  const projectedPillarLine = displayedProjection.map((point,index) => `${index ? "L" : "M"}${x(points.findIndex(p => p.month === point.month))},${y(point.supplyScore)}`).join(" ");
  const coreLine = corePoints.map((point,index)=>point.value===null?"":`${index===0||corePoints[index-1].value===null?"M":"L"}${x(index)},${coreY(point.value)}`).join(" ");
  const provisionalLine = provisionalCore.map((point,index)=>point.value===null?"":`${index===0||provisionalCore[index-1].value===null?"M":"L"}${x(index)},${coreY(point.value)}`).join(" ");
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
    {month:"2026-11",date:"11 Nov 2026",label:"NVIDIA CEO resignation",url:"https://www.sec.gov/Archives/edgar/data/1045810/000104581026000082/nvda-20261111.htm",note:"NVIDIA’s board accepted Jensen Huang’s resignation effective November 11 and named Colette Kress interim CEO. NVIDIA announced the transition on November 12.",color:"#315d87"},
    {month:"2026-11",date:"19 Nov 2026",label:"Anthropic IPO debut (expected)",url:"https://www.anthropic.com/news/anthropic-prices-initial-public-offering",note:"Anthropic priced its IPO at $83 a share on November 18 and said ANT was expected to begin trading on Nasdaq on November 19.",color:"#237d67"},
  ].filter(event => points.some(point => point.month === event.month));
  const eventMonths = [...new Set(events.map(event => event.month))];
  const eventMarkers = eventMonths.flatMap(month => {
    const anchor = x(points.findIndex(point => point.month === month));
    const monthEvents = events.filter(event => event.month === month);
    return monthEvents.map((event, index) => ({
      ...event,
      x: anchor + (index - (monthEvents.length - 1) / 2) * 24,
      color: event.color ?? (month === "2024-03" ? "#315d87" : month === "2025-01" ? "#8060a0" : month === "2025-04" ? "#ac633d" : "#237d67"),
      number: events.indexOf(event) + 1,
    }));
  });
  const activeEvent = eventMarkers.find(event => event.url === activeEventUrl);
  return <div className="composite-history-chart" aria-live="polite">
    <div className="composite-chart-heading"><div><span>{official ? "NORMALIZED CORE SCORE" : quarterly ? "NORMALIZED HYPERSCALER SCORE · CONDITIONAL FORECAST" : "NORMALIZED PILLAR SCORE"}</span><h3>{title}</h3></div><div className="composite-latest"><span>Latest available {official?"core":"pillar"} score</span><strong>{latestPoint?.value?.toFixed(1)??"n/a"}</strong><small>{latestPoint?.month??"Unavailable"}{latestPoint&&latestPoint.month>projection.metadata.anchorMonth?" · provisional":""}{latestPoint&&latestPoint.month!==points.at(-1)?.month?" · last available":""}</small>{!official&&<small>Core: {latestCore?.value?.toFixed(1)??"n/a"} · {latestCore?.month??"unavailable"}</small>}</div></div>
    <div className="composite-chart-legend">
      <span><i className="core-line-key"/>Actual core · solid · {latestCore?.value?.toFixed(1)??"n/a"} · {latestCore?.month}{!official && " · left axis"}</span>
      <span><i style={{borderTopStyle:"dotted",borderTopColor:"#315d87"}}/>Provisional core · available pillars</span>
      {!official && <><span><i/>{title} · right axis</span><span><i className="range-key"/>Constituent min–max range</span></>}
      {projectionEnd && <span><i style={{borderTopStyle:"dashed"}}/>Conditional Hyperscalers score · right axis</span>}
    </div>
    <p>{official
      ? "The core combines Adoption, Monetization, Hyperscalers and Infrastructure with equal nominal pillar weights. The dotted blue line uses the available pillars in each month."
      : <>{pillarDescriptions[title]} The solid teal line shows the {title} score on the right axis, with its constituent score range shaded. {latestPoint && <>The latest available reading is {latestPoint.value!.toFixed(1)} for {latestPoint.month}. </>}</>}
      {projectionEnd && <> The dashed teal line shows the conditional Hyperscalers score of {projectionEnd.capexScore.toFixed(1)} through {displayEnd}. {coverage && <>Released calendar-quarter CapEx covers {coverage.tickers.length} of {coverage.expected} companies ({coverage.tickers.join(", ")}) as of {projection.metadata.reportedCapexAsOf}. Trailing growth compares the same companies in both years.</>}</>}
    </p>
    <div className="composite-event-chart">
    <svg viewBox={`0 0 ${w} ${h}`} role="group" aria-label={`Official core index${official ? " historical composite" : ` with ${title} historical composite and constituent range`}`}>
      <text x={left} y="14">CORE SCORE</text>{!official&&<text x={w-right} y="14" textAnchor="end">PILLAR SCORE</text>}
      {[0,25,50,75,100].map(value=><g key={value}><line x1={left} x2={w-right} y1={coreY(value)} y2={coreY(value)} className="task-grid"/><text x={left-9} y={coreY(value)+4} textAnchor="end">{value}</text></g>)}
      {!official&&Array.from({ length: 5 }, (_, index) => lower + index * (upper - lower) / 4).map(value => <text key={value} x={w-right+9} y={y(value)+4}>{value.toFixed(0)}</text>)}
      <line x1={left} x2={w - right} y1={coreY(50)} y2={coreY(50)} className="neutral-line"/>
      {eventMonths.map(month => {
        const anchor = x(points.findIndex(point => point.month === month));
        return <line key={month} x1={anchor} x2={anchor} y1={top} y2={h-bottom}
          stroke="currentColor" strokeDasharray="3 6" opacity=".22" />;
      })}
      {bands.map((band, index) => <path key={index} d={`${band.map(({ point, index }, i) => `${i ? "L" : "M"}${x(index)},${y(point.high!)}`).join(" ")} ${[...band].reverse().map(({ point, index }) => `L${x(index)},${y(point.low!)}`).join(" ")} Z`} className="constituent-range"/>)}
      {projectionEnd && <path d={projectedPillarLine} fill="none" stroke="#1d7f80" strokeWidth="2" strokeDasharray="8 5"><title>Conditional Hyperscalers score</title></path>}
      <path d={coreLine} className="pinned-core-line" style={{strokeDasharray:'none'}}/>
      {corePoints.map((point,index)=>point.value!==null&&<circle key={point.month} cx={x(index)} cy={coreY(point.value)} r="3.5" className="pinned-core-point"><title>{`${point.month}: official core index ${point.value.toFixed(1)}`}</title></circle>)}
      <path d={provisionalLine} fill="none" stroke="#315d87" strokeWidth="2.5" strokeDasharray="2 4"/>
      {provisionalCore.map((point,index)=>point.month>projection.metadata.anchorMonth&&point.value!==null&&
        <circle key={point.month} cx={x(index)} cy={coreY(point.value)} r="4" fill="white" stroke="#315d87" strokeWidth="2">
          <title>{`${point.month}: provisional core score ${point.value.toFixed(1)} from available pillars`}</title>
        </circle>)}
      {!official&&<path d={line} className="composite-history-line" style={{strokeDasharray:'none'}}/>}
      {points.map((point, index) => <g key={point.month}>{index % 2 === 0 || index === points.length - 1 ? <text x={x(index)} y={h - 15} textAnchor="middle">{point.month.slice(2)}</text> : null}{!official&&point.value !== null && <circle cx={x(index)} cy={y(point.value)} r="4" className="composite-history-point"><title>{`${point.month}: ${point.value.toFixed(1)} points${point.low === null ? "" : `; constituents ${point.low.toFixed(1)} to ${point.high!.toFixed(1)}`}`}</title></circle>}</g>)}
      {eventMarkers.map(event => <a key={event.url} href={event.url} target="_blank" rel="noreferrer"
        className="composite-event-marker" aria-label={`Event ${event.number}: ${event.label}, ${event.date}`}
        aria-describedby={activeEvent === event ? tooltipId : undefined}
        onPointerEnter={() => showEvent(event.url)}
        onPointerLeave={pointer => {
          if (pointer.currentTarget !== document.activeElement) scheduleEventClose();
        }}
        onFocus={() => showEvent(event.url)}
        onBlur={() => setActiveEventUrl(null)}>
        <circle cx={event.x} cy="28" r="9" fill={event.color}/>
        <text className="event-number" x={event.x} y="31" textAnchor="middle" aria-hidden="true">{event.number}</text>
      </a>)}
    </svg>
    {activeEvent && <div id={tooltipId} className="composite-event-tooltip" role="tooltip"
      onPointerEnter={() => window.clearTimeout(closeTimer.current)}
      onPointerLeave={scheduleEventClose}
      style={{
        left: `clamp(0px, calc(${activeEvent.x / w * 100}% - 9rem), max(0px, calc(100% - 18rem)))`,
        top: `calc(${37 / h * 100}% + .3rem)`,
        borderTopColor: activeEvent.color,
      }}>
      <strong>{activeEvent.label}</strong>
      <small>{activeEvent.date}</small>
      <span>{activeEvent.note}</span>
    </div>}
    </div>
    <p>Agent adoption can increase inference intensity through repeated reasoning, tool calls and longer-running tasks. Launch events provide demand context; the collected data do not isolate their contribution. Provider-direct agent traffic is not comprehensively captured by OpenRouter.</p>
    <details className="composite-events"><summary>Chart events and sources</summary><ol>{events.map(event=><li key={event.url}><a href={event.url} target="_blank" rel="noreferrer">{event.date} · {event.label}</a> — {event.note}{event.month==="2025-01"&&<> <a href="https://openai.com/index/announcing-the-stargate-project/" target="_blank" rel="noreferrer">Stargate announcement</a>.</>}</li>)}</ol><p>Numbered markers show event months. Each marker links to its source.</p></details>
    <p>History begins in January 2024 wherever the required signal is available. Missing observations are not interpolated and do not require a composite score.{quarterly?" Actual pillar observations are solid; only the CapEx component is held across quarter months. Estimates are dashed.":" Solid lines connect available observations; gaps indicate unavailable inputs."}</p>
  </div>;
}
