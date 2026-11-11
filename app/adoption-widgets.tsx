import type { ReactNode } from "react";

export function AdoptionMetrics({children,label}: {children: ReactNode;label?:string}) {
 return <div className="adoption-metrics" role={label?"group":undefined} aria-label={label}>{children}</div>;
}
export function AdoptionMetric({children}: {children: ReactNode}) {
 return <div className="adoption-metric">{children}</div>;
}
export function AdoptionChartFrame({children}: {children: ReactNode}) {
 return <div className="token-frequency-chart adoption-chart-frame">{children}</div>;
}
export function AdoptionControls({children}: {children: ReactNode}) {
 return <div className="token-controls">{children}</div>;
}
export function AdoptionNotes({children,id}: {children: ReactNode; id?:string}) {
 return <details className="adoption-notes" id={id}><summary>Sources &amp; methodology</summary><div className="adoption-notes-body">{children}</div></details>;
}
export function AdoptionPanel({children,id,headingId}: {children:ReactNode;id?:string;headingId:string}) {
 return <section id={id} className="token-activity adoption-panel" aria-labelledby={headingId}>{children}</section>;
}

export function adoptionTickIndices(count:number, limit=6) {
 const ticks=Math.min(count,limit);
 return Array.from({length:ticks},(_,i)=>Math.round(i*(count-1)/Math.max(1,ticks-1)));
}
