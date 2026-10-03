export type LegendItem = {label:string;color:string;shape?:"line"|"dash"|"dot"|"diamond"|"band"|"anchor"};
export default function ChartLegend({items}:{items:LegendItem[]}) {
  return <div className="chart-legend" role="list" aria-label="Chart legend">{items.map(item=><span role="listitem" key={item.label}><i aria-hidden="true" className={`legend-symbol legend-${item.shape??"line"}`} style={{"--legend-color":item.color} as import("react").CSSProperties}/>{item.label}</span>)}</div>;
}
