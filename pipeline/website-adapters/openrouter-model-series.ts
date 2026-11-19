export type ModelSnapshot = {
 metadata:{through:string;start:string;asOf:string;source:string;coverage:string};
 models:readonly string[];
 daily:readonly {date:string;total:number;values:ReadonlyArray<readonly [number,number]>}[];
};
export type ModelOptions={range:'7'|'30'|'90'|'all';frequency:'daily'|'weekly';count:5|10};
export type ModelBucket={start:string;end:string;days:number;total:number|null;values:number[]|null};
const DAY=86_400_000;
const iso=(time:number)=>new Date(time).toISOString().slice(0,10);

export function buildModelSeries(data:ModelSnapshot,options:ModelOptions){
 const latest=Date.parse(data.metadata.through),first=Date.parse(data.metadata.start);
 const end=options.frequency==='weekly'?latest-new Date(latest).getUTCDay()*DAY:latest;
 const start=options.range==='all'?first:Math.max(first,end-(Number(options.range)-1)*DAY);
 const calendar=new Map(data.daily.map(day=>[day.date,day]));
 const periods:{start:number;end:number}[]=[];
 if(options.frequency==='daily'){
  for(let day=start;day<=end;day+=DAY)periods.push({start:day,end:day});
 }else{
  const weekday=new Date(start).getUTCDay();
  const monday=start+((8-weekday)%7)*DAY;
  for(let day=monday;day+6*DAY<=end;day+=7*DAY)periods.push({start:day,end:day+6*DAY});
 }
 const included=periods.map(p=>{
  const dates=Array.from({length:Math.round((p.end-p.start)/DAY)+1},(_,i)=>iso(p.start+i*DAY));
  const rows=dates.map(date=>calendar.get(date));
  return {period:p,dates,rows,complete:rows.every(row=>row!==undefined)};
 });
 const totals=new Map<number,number>();
 for(const p of included){if(!p.complete)continue;for(const row of p.rows){for(const [id,tokens] of row!.values)totals.set(id,(totals.get(id)??0)+tokens);}}
 const top=[...totals].filter(([,tokens])=>tokens>0).sort((a,b)=>b[1]-a[1]||data.models[a[0]].localeCompare(data.models[b[0]])).slice(0,options.count);
 const ids=top.map(([id])=>id),lookup=new Map(ids.map((id,i)=>[id,i]));
 const buckets:ModelBucket[]=included.map(p=>{
  const base={start:iso(p.period.start),end:iso(p.period.end),days:p.dates.length};
  if(!p.complete)return {...base,total:null,values:null};
  let total=0;const values=Array(ids.length+1).fill(0) as number[];
  for(const row of p.rows){total+=row!.total;for(const [id,tokens] of row!.values){const i=lookup.get(id);if(i!==undefined)values[i]+=tokens;}}
  values[ids.length]=total-values.reduce((sum,v)=>sum+v,0);
  if(values[ids.length]<0)throw Error('Model allocations exceed the published total');
  return {...base,total:total/base.days/1e12,values:values.map(v=>v/base.days/1e12)};
 });
 const valid=buckets.filter(p=>p.total!==null);
 const totalTokens=valid.reduce((sum,p)=>sum+p.total!*1e12*p.days,0);
 const coveredDays=valid.reduce((sum,p)=>sum+p.days,0);
 const expectedDays=buckets.reduce((sum,p)=>sum+p.days,0);
 const series=top.map(([id,tokens])=>({id:data.models[id],tokens,other:false}));
 series.push({id:'Other',tokens:totalTokens-top.reduce((sum,[,tokens])=>sum+tokens,0),other:true});
 return {buckets,series,totalTokens,coveredDays,expectedDays,
  start:buckets[0]?.start??iso(start),end:buckets.at(-1)?.end??iso(end),
  excludedEdgeDays:Math.round((end-start)/DAY)+1-expectedDays};
}
