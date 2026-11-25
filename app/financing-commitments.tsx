"use client";

import { useId, useState } from "react";
import graph from "../data/circular-financing.json";

const types = {
  purchase: { label: "Purchase", color: "#365e88" },
  commitment: { label: "Funding", color: "#217661" },
  guarantee: { label: "Guarantee / backstop", color: "#a35a1c" },
  incentive: { label: "Warrant", color: "#86519c" },
  procurement: { label: "Procurement", color: "#60758b" },
};

type Flow = (typeof graph.flows)[number];
type Point = { x: number; y: number };
const width = 166;
const nodeHeight = 42;

function flowType(flow: Flow) {
  if (flow.status === "procurement_relationship") return "procurement";
  return flow.kind as Exclude<keyof typeof types, "procurement">;
}

const flows = graph.flows.filter(flow =>
  flow.kind !== "paid" &&
  !["cancelled", "superseded"].includes(flow.status) &&
  !["disputed", "superseded"].includes(flow.reconciliation.status),
).sort((a, b) => Object.keys(types).indexOf(flowType(a)) - Object.keys(types).indexOf(flowType(b)));
const connected = new Set(flows.flatMap(flow => [flow.from, flow.to]));
const names = new Map(graph.nodes.map(node => [node.id, node.name]));
const columns = [0, 1, 2].map(column => graph.nodes.filter(node => {
  if (!connected.has(node.id)) return false;
  const roleColumn = node.role === "cloud" ? 2 : node.role === "lab" || node.role === "platform" ? 1 : 0;
  return roleColumn === column;
}));
const height = Math.max(404, 100 * Math.max(...columns.map(column => column.length)));
const nodes = columns.flatMap((column, index) => column.map((node, row) => ({
  ...node,
  x: 24 + 260 * index,
  y: column.length === 1 ? height / 2 : 34 + (height - 72) * row / (column.length - 1),
})));
const nodeById = new Map(nodes.map(node => [node.id, node]));

function amountLabel(flow: Flow) {
  if (flow.amount.value === null) return flow.kind === "incentive" ? flow.label.split(" · ")[0] : "Undisclosed";
  const prefix = flow.amount.bound === "upper_bound" ? "Up to " : flow.amount.bound === "lower_bound" ? ">" : "";
  return `${prefix}$${flow.amount.value}B`;
}

function termLabel(flow: Flow) {
  if (flow.time.durationYears) {
    const prefix = flow.kind === "guarantee"
      ? flow.amount.bound === "upper_bound" ? "Up to " : "Typically "
      : "";
    return `${prefix}${flow.time.durationYears} years`;
  }
  if (flow.time.periodEnd) return `To ${flow.time.periodEnd}`;
  if (flow.kind === "commitment") return flow.label.includes("contingent") ? "Contingent facility" : "Payment unverified";
  if (flow.kind === "incentive") return "Purchase-linked";
  return flow.status === "procurement_relationship" ? "Timing varies" : "Term undisclosed";
}

function geometry(flow: Flow): [Point, Point, Point, Point] {
  const from = nodeById.get(flow.from)!;
  const to = nodeById.get(flow.to)!;
  if (from.x === to.x) {
    const start = { x: from.x, y: from.y };
    const end = { x: to.x, y: to.y };
    return [start, { x: 8, y: start.y }, { x: 8, y: end.y }, end];
  }
  const forward = from.x < to.x;
  const peers = flows.filter(edge =>
    (edge.from === flow.from && edge.to === flow.to) || (edge.from === flow.to && edge.to === flow.from));
  const offset = (peers.indexOf(flow) - (peers.length - 1) / 2) * 13;
  const start = { x: from.x + (forward ? width : 0), y: from.y + offset };
  const end = { x: to.x + (forward ? 0 : width), y: to.y + offset };
  const distance = (end.x - start.x) * .58;
  return [start, { x: start.x + distance, y: start.y }, { x: end.x - distance, y: end.y }, end];
}

function pointOnCurve(curve: [Point, Point, Point, Point], t: number) {
  const u = 1 - t;
  const weights = [u ** 3, 3 * u * u * t, 3 * u * t * t, t ** 3];
  return {
    x: curve.reduce((total, point, index) => total + point.x * weights[index], 0),
    y: curve.reduce((total, point, index) => total + point.y * weights[index], 0),
  };
}

const labelPositions: Point[] = [];
const edges = flows.map((flow, i) => {
  const curve = geometry(flow);
  const [start, a, b, end] = curve;
  const candidates = [.5, .4, .6, .3, .7, .2, .8].map(t => pointOnCurve(curve, t));
  const label = candidates.find(point =>
    labelPositions.every(other => Math.hypot(point.x - other.x, point.y - other.y) >= 20) &&
    nodes.every(node => point.x < node.x - 10 || point.x > node.x + width + 10 || Math.abs(point.y - node.y) > nodeHeight / 2 + 10),
  ) ?? candidates[0];
  labelPositions.push(label);
  return { flow, label, number: i + 1, type: flowType(flow),
    path: `M ${start.x} ${start.y} C ${a.x} ${a.y} ${b.x} ${b.y} ${end.x} ${end.y}` };
});

export default function FinancingCommitments() {
  const uid = useId();
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected === null ? undefined : edges[selected - 1];
  const source = active && graph.sources.find(item => item.id === active.flow.sourceIds[0]);

  function toggle(number: number) {
    setSelected(current => current === number ? null : number);
  }

  return <>
    <div className="cf-commitments">
      <section className="cf-commitment-card" aria-labelledby={`${uid}-map`}>
        <h5 id={`${uid}-map`}>Counterparty network</h5>
        <p className="cf-commitment-scroll-hint">Scroll across the map to see all counterparties.</p>
        <div className="cf-commitment-map" tabIndex={0} role="region" aria-label="Scrollable counterparty map">
          <svg viewBox={`0 0 734 ${height}`} role="group" aria-label="Arrows match the numbered commitments in the table">
            <defs>{Object.entries(types).map(([key, type]) => <marker key={key} id={`${uid}-${key}`} viewBox="0 0 10 10"
              refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill={type.color}/></marker>)}</defs>
            {edges.map(edge => {
              const {color} = types[edge.type];
              const label = `${edge.number}. ${names.get(edge.flow.from)} to ${names.get(edge.flow.to)}, ${edge.flow.label}`;
              return <g key={edge.flow.id} className="cf-commitment-edge" role="button" tabIndex={0} aria-label={label}
                aria-pressed={selected === edge.number} onClick={() => toggle(edge.number)}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggle(edge.number);
                  }
                }}>
                <title>{label}</title>
                <path d={edge.path} stroke="transparent" strokeWidth="14" fill="none"/>
                <path d={edge.path} fill="none" stroke={color} strokeWidth={selected === edge.number ? 3.5 : 1.8}
                  strokeDasharray={edge.type === "commitment" || edge.type === "procurement" ? "5 4" : undefined}
                  markerEnd={`url(#${uid}-${edge.type})`}/>
              </g>;
            })}
            {nodes.map(node => <g key={node.id} pointerEvents="none">
              <rect className="cf-commitment-node" x={node.x} y={node.y - nodeHeight / 2} width={width} height={nodeHeight} rx="6"/>
              <text x={node.x + 10} y={node.y} dominantBaseline="middle">{node.id === "sbe" ? "SB Energy / project" : node.name}</text>
            </g>)}
            {edges.map(edge => <g key={edge.flow.id} transform={`translate(${edge.label.x},${edge.label.y})`}
              className="cf-commitment-number" data-selected={selected === edge.number} aria-hidden="true"
              onClick={() => toggle(edge.number)}>
              <circle r="9" stroke={types[edge.type].color}/>
              <text dominantBaseline="central" textAnchor="middle" fill={types[edge.type].color}>{edge.number}</text>
            </g>)}
          </svg>
        </div>
        <div className="cf-commitment-legend">{Object.entries(types).map(([key, type]) =>
          <span key={key}><i style={{backgroundColor:type.color}}/>{type.label}</span>)}</div>
      </section>
      <section className="cf-commitment-card" aria-labelledby={`${uid}-table`}>
        <h5 id={`${uid}-table`}>Key commitments <small>USD billions unless stated</small></h5>
        <p className="cf-commitment-scroll-hint">Scroll across the table for terms and types.</p>
        <div className="cf-commitment-scroll" tabIndex={0} role="region" aria-label="Scrollable commitments table">
          <table>
            <thead><tr><th scope="col">#</th><th scope="col">Direction</th><th scope="col">Amount / scale</th><th scope="col">Term / status</th><th scope="col">Type</th></tr></thead>
            <tbody>{edges.map(({flow, number, type}) => <tr key={flow.id} data-selected={selected === number}>
              <td><button type="button" className="cf-commitment-pick" aria-pressed={selected === number}
                aria-label={`Inspect commitment ${number}`} onClick={() => toggle(number)} style={{color:types[type].color}}>{number}</button></td>
              <th scope="row">{names.get(flow.from)} → {names.get(flow.to)}</th>
              <td>{amountLabel(flow)}</td><td>{termLabel(flow)}</td><td style={{color:types[type].color}}>{types[type].label}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
    {active && <aside className="cf-commitment-inspector" aria-live="polite">
      <strong>{active.number}. {names.get(active.flow.from)} → {names.get(active.flow.to)} · {active.flow.label}</strong>
      <p>{active.flow.time.label}. {active.flow.newsBrief}</p>
      {source && <a href={source.url} target="_blank" rel="noreferrer">Read the original disclosure ↗</a>}
    </aside>}
    <p className="cf-commitment-scope">Select an arrow or its table number for the dated disclosure. The map shows future obligations, including contingent support. NVIDIA’s aggregate backstop may overlap CoreWeave’s. Funding, contract values, guarantees and warrants measure different obligations.</p>
  </>;
}
