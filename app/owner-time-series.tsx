const owners = ["Microsoft", "Alphabet", "Meta", "Amazon", "Oracle"] as const;
const colors: Record<string,string> = {Microsoft:"#1d7f80",Alphabet:"#d5aa43",Meta:"#927bb8",Amazon:"#df7658",Oracle:"#78955f"};
type Row = {period:string;total:number;owners:Record<string,number>};

export default function OwnerTimeSeries({data,title,unit,money=false,selected="Aggregate"}:{data:Row[];title:string;unit:string;money?:boolean;selected?:string}) {
  const w=960,h=370,l=64,r=24,t=18,b=100;
  const max=Math.ceil(Math.max(...data.map(d=>d.total))*1.12/(money?20:2000))*(money?20:2000);
  const slot=(w-l-r)/data.length, x=(i:number)=>l+slot*(i+.5), y=(v:number)=>t+(1-v/max)*(h-t-b);
  const format=(v:number)=>`${money?"$":""}${v.toLocaleString(undefined,{maximumFractionDigits:1})}${money?"B":" MW"}`;
  return <svg className="line-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${title}: stacked company bars and five-company total line, ${unit}`}>
    <title>{title}</title><desc>Bars show each company's contribution. The dark line shows the total of the five covered hyperscalers on the same scale.</desc>
    {[0,.25,.5,.75,1].map(p=>p*max).map(v=><g key={v}><line x1={l} x2={w-r} y1={y(v)} y2={y(v)} className="grid-line"/><text x={l-9} y={y(v)+4} textAnchor="end">{money?`$${v}B`:v.toLocaleString()}</text></g>)}
    {data.map((d,i)=>{let cumulative=0;return <g key={d.period}>{owners.map(owner=>{
      const value=d.owners[owner]??0,base=cumulative;cumulative+=value;
      return <rect key={owner} x={x(i)-slot*.32} y={y(cumulative)} width={slot*.64} height={Math.max(0,y(base)-y(cumulative))} fill={colors[owner]} opacity={selected==="Aggregate"||selected===owner?1:.18}><title>{`${d.period} · ${owner}: ${format(value)}`}</title></rect>;
    })}{(i%2===0||i===data.length-1)&&<text x={x(i)} y={h-b+24} textAnchor="middle">{d.period.replace("20","")}</text>}</g>})}
    <polyline points={data.map((d,i)=>`${x(i)},${y(d.total)}`).join(" ")} fill="none" stroke="#243746" strokeWidth="3"/>
    {data.map((d,i)=><circle key={d.period} cx={x(i)} cy={y(d.total)} r="3.5" fill="#243746"><title>{`${d.period} · total: ${format(d.total)}`}</title></circle>)}
    {owners.map((owner,i)=><g key={owner} transform={`translate(${l+(i%3)*285},${h-42+Math.floor(i/3)*25})`}><rect width="12" height="12" fill={colors[owner]}/><text x="19" y="11">{owner}</text></g>)}
    <g transform={`translate(${l+570},${h-17})`}><line x1="0" x2="15" y1="6" y2="6" stroke="#243746" strokeWidth="3"/><text x="22" y="11">Total</text></g>
  </svg>;
}
