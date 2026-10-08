import type {FlowKind} from './circular-financing-data';
export type SummaryEdge={from:string;to:string;kind:FlowKind;amount:number|null;label:string;amountBound?:string};
export type SummaryRow={kind:FlowKind;short:string;value:string;count:number};
export const summaryKinds:{kind:FlowKind;short:string}[]=[{kind:'paid',short:'Paid'},{kind:'commitment',short:'Future'},{kind:'guarantee',short:'Support'},{kind:'purchase',short:'Purchases'},{kind:'incentive',short:'Warrants'}];
const number=(n:number)=>Number(n.toFixed(3)).toString();
export function summarizeNode(edges:SummaryEdge[],node:string,direction:'in'|'out'):SummaryRow[]{
 const relevant=edges.filter(e=>direction==='in'?e.to===node:e.from===node);
 return summaryKinds.flatMap<SummaryRow>(({kind,short})=>{
 const group=relevant.filter(e=>e.kind===kind);if(!group.length)return [];
 const known=group.filter(e=>e.amount!==null),unknown=group.length-known.length;
 if(kind==='guarantee'||kind==='incentive')return [{kind,short,value:`${group.length} ${kind==='incentive'?'warrant':'support'}${group.length===1?'':'s'}`,count:group.length}];
 const sum=known.reduce((a,e)=>a+e.amount!,0),upper=known.some(e=>e.amountBound==='upper_bound'||(!e.amountBound&&e.label.includes('Up to'))),lower=known.some(e=>e.amountBound==='lower_bound'||(!e.amountBound&&e.label.includes('>')));
 const prefix=upper&&lower?'~':upper?'≤':lower?'>':'';
 return [{kind,short,value:known.length?`${prefix}$${number(sum)}B${unknown?' + ?':''}`:'$ unknown',count:group.length}];
 });
}
