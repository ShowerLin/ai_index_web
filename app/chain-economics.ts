export type ChainFinancialCompany={currency:string;periods:readonly {period:string;revenue:number|null;ebitda:number|null;sourceRange:string}[]};
export function chainShares(companies:Record<string,ChainFinancialCompany>,period:string,currency:string,metric:'revenue'|'ebitda'){
 const rows=Object.entries(companies).map(([ticker,c])=>{
  const observation=c.periods.find(p=>p.period===period);
  const amount=observation?.[metric]??null;
  return {ticker,currency:c.currency,amount,sourceRange:observation?.sourceRange??null,eligible:c.currency===currency&&amount!==null};
 });
 const eligible=rows.filter(r=>r.eligible),total=eligible.reduce((s,r)=>s+r.amount!,0);
 return {total,count:eligible.length,rows:rows.map(r=>({...r,share:r.eligible&&total>0?r.amount!/total*100:null}))};
}
