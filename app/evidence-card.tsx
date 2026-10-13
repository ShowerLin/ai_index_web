import type { ReactNode } from 'react';
export default function EvidenceCard({id,title,unit,source,note,children,wide=false,table=false,legend}:{id?:string;title:string;unit:string;source:string;note:string;children:ReactNode;wide?:boolean;table?:boolean;legend?:ReactNode}){
 return <article id={id} className={`evidence-card${wide?' evidence-wide':''}${table?' evidence-table':''}`}><header><h4>{title}</h4><p>{unit}</p></header><div className="evidence-display">{children}</div>{legend&&<div className="evidence-legend">{legend}</div>}<footer><a href={`#source-${source}`}>Source {source}</a><span>{note}</span></footer></article>;
}
