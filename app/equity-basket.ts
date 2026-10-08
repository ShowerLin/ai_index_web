export type EquityObservation = {date:string;dailyReturn:number|null;cumulativeReturn:number|null;marketCap:number|null};
export type EquityHolding = {openingMarketCap:number|null;rows:readonly EquityObservation[]};

// Daily sector returns use caps known at the preceding valuation date. Never
// weight earlier returns with the latest cap or average already compounded YTDs.
export function equityBasket(holdings:EquityHolding[],dates:readonly string[],weighting:"cap"|"equal") {
 const pointers=holdings.map(()=>0),caps=holdings.map(h=>h.openingMarketCap),cumulative=holdings.map(()=>0);
 let wealth=1,validHistory=true;
 return dates.map((date,index)=>{
  const priorCaps=[...caps],daily=holdings.map(()=>0);
  holdings.forEach((holding,i)=>{
   while(pointers[i]<holding.rows.length&&holding.rows[pointers[i]].date<=date){
    const row=holding.rows[pointers[i]++];
    if(row.date===date&&row.dailyReturn!==null)daily[i]=row.dailyReturn;
    if(row.cumulativeReturn!==null)cumulative[i]=row.cumulativeReturn;
    if(row.marketCap!==null&&row.marketCap>0)caps[i]=row.marketCap;
   }
  });
  const complete=priorCaps.every(cap=>cap!==null&&cap>0);
  if(!complete)validHistory=false;
  const total=priorCaps.reduce<number>((sum,cap)=>sum+(cap??0),0);
  if(index>0&&complete)wealth*=1+daily.reduce((sum,ret,i)=>sum+ret*priorCaps[i]!/total,0)/100;
  return {date,value:weighting==="equal"?cumulative.reduce((a,b)=>a+b,0)/holdings.length:complete&&validHistory?(wealth-1)*100:null};
 });
}

export function latestEquityObservation(rows:readonly EquityObservation[],end:string){
 let marketCap:number|null=null,marketCapDate:string|null=null,cumulativeReturn:number|null=null,returnDate:string|null=null;
 for(const row of rows){
  if(row.date>end)break;
  if(row.marketCap!==null&&row.marketCap>0){marketCap=row.marketCap;marketCapDate=row.date;}
  if(row.cumulativeReturn!==null){cumulativeReturn=row.cumulativeReturn;returnDate=row.date;}
 }
 return {marketCap,marketCapDate,cumulativeReturn,returnDate};
}
