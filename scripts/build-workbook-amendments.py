"""Read amended source workbook without modifying it; generate supplementary research data."""
import argparse,collections,datetime,hashlib,json,math,re,statistics
from pathlib import Path
import openpyxl
from openpyxl.utils.datetime import to_excel,from_excel
p=argparse.ArgumentParser();p.add_argument('--input',type=Path,required=True);a=p.parse_args()
w=openpyxl.load_workbook(a.input,data_only=True,read_only=True)
roles={
 'Hyperscalers':['MSFT','AMZN','GOOGL','META','ORCL'],
 'Accelerators & logic':['NVDA','AMD','AVGO','INTC','TXN','MRVL'],
 'Foundry & equipment':['TSM','ASML','AMAT','KLAC'],
 'Memory & storage':['005930','000660','MU','WDC','STX'],
 'Systems & networking':['DELL','CSCO','TEL','HPE','VRT'],
 'Data centers':['EQIX','IRM','DLR'],
 'Power & infrastructure':['ETN','VST','CEG','PWR'],
 'Software':['ADBE','CRM']}
sector={t:role for role,ts in roles.items() for t in ts}
def number(x):
 # Bloomberg values in accidentally date-formatted cells retain Excel numeric serials.
 if isinstance(x,(datetime.datetime,datetime.time)):
  x=to_excel(x)
 return float(x) if isinstance(x,(int,float)) and math.isfinite(x) else None
def shift(month,n):
 k=int(month[:4])*12+int(month[5:])-1+n
 return f'{k//12:04}-{k%12+1:02}'
rows=list(w['Index Price Value'].values);headers=rows[0];obs={}
for r in rows[2:]:
 if isinstance(r[0],datetime.datetime) and r[0].day>=28:
  obs[r[0].strftime('%Y-%m')]={h:number(v) for h,v in zip(headers[1:],r[1:])}
demand=[]
for field,name in [('KOTCDRAM Index','South Korea DRAM exports'),('KOTCNAND Index','South Korea NAND exports'),('TSMC Monthly Revenue','TSMC monthly revenue')]:
 cells=[]
 for month,row in sorted(obs.items()):
  value=row.get(field);prior=obs.get(shift(month,-12),{}).get(field)
  windows=[[obs.get(shift(month,-i),{}).get(field) for i in range(offset,offset+12)] for offset in [0,12]]
  ttm=(sum(windows[0])/sum(windows[1])-1)*100 if all(v is not None for win in windows for v in win) and sum(windows[1])>0 else None
  cells.append({'month':month,'level':value,'yoy':(value/prior-1)*100 if value is not None and prior is not None and prior>0 else None,'ttmYoy':ttm})
 demand.append({'field':field,'name':name,'cells':cells,'unit':'Source-native revenue' if field.startswith('TSMC') else 'Source-native export value'})
ratings={};rating_sources={}
for r in list(w['AI CDS Issuer Rating'].values)[1:]:
 if not isinstance(r[0],str):continue
 ticker=r[0].split()[0];rating=None;source=None
 for agency,value in zip(['S&P','Fitch','Moody’s'],r[1:4]):
  if isinstance(value,str) and value not in ['WD','NR','N.A.','#N/A']:
   rating=value;source=agency;break
 clean=rating.rstrip('u') if rating else ''
 if source=='Moody’s':
  bucket='AAA / AA' if clean.startswith(('Aaa','Aa')) else 'A' if clean.startswith('A') else 'BBB' if clean.startswith('Baa') else 'Below IG' if clean else 'Unrated'
 else:bucket='AAA / AA' if clean.startswith('AA') else 'A' if clean.startswith('A') else 'BBB' if clean.startswith('BBB') else 'Below IG' if clean else 'Unrated'
 ratings[ticker]=bucket;rating_sources[ticker]={'rating':rating,'agency':source,'bucket':bucket}
rows=list(w['AI 5yrCDS Value'].values);headers=rows[0];daily=[]
for r in rows[2:]:
 if isinstance(r[0],(int,float)):
  r=(from_excel(r[0]),*r[1:])
 if not isinstance(r[0],datetime.datetime):continue
 values={h.split()[0]:number(v) for h,v in zip(headers[1:],r[1:]) if isinstance(h,str)}
 benchmark=values.pop('IBOXUMAE',None)
 daily.append({'date':r[0].strftime('%Y-%m-%d'),'benchmark':benchmark,'values':values})
daily.sort(key=lambda r:r['date']);baseline=next(r for r in daily if r['benchmark'] is not None)
issuers=[t for t,v in baseline['values'].items() if v is not None]
groups=[('All covered issuers','overall',issuers),('All rated IG','rating',[t for t in issuers if ratings.get(t) in ['AAA / AA','A','BBB']])]
groups += [(bucket,'rating',[t for t in issuers if ratings.get(t)==bucket]) for bucket in ['AAA / AA','A','BBB','Below IG','Unrated']]
groups += [(role,'sector',[t for t in issuers if sector.get(t)==role]) for role in roles]
groups += [('Unclassified','sector',[t for t in issuers if t not in sector])]
def percentile(values,p):
 ordered=sorted(values);k=(len(ordered)-1)*p;lo=int(k);hi=min(lo+1,len(ordered)-1)
 return ordered[lo]+(ordered[hi]-ordered[lo])*(k-lo)
credit=[]
for name,kind,members in groups:
 if not members:continue
 base=statistics.mean(baseline['values'][t] for t in members);cells=[]
 for r in daily:
  vals=[r['values'].get(t) for t in members];complete=all(v is not None for v in vals) and r['benchmark'] is not None
  level=statistics.mean(vals) if complete else None
  relative_values=[r['values'][t]-baseline['values'][t]-(r['benchmark']-baseline['benchmark']) for t in members] if complete else []
  distribution={key:fn(vals) if complete else None for key,fn in [('q25',lambda v:percentile(v,.25)),('q75',lambda v:percentile(v,.75))]}
  distribution.update({key:fn(relative_values) if complete else None for key,fn in [('relativeMedian',statistics.median),('relativeMin',min),('relativeMax',max),('relativeQ25',lambda v:percentile(v,.25)),('relativeQ75',lambda v:percentile(v,.75))]})
  cells.append({**distribution,'date':r['date'],'spread':level,'median':statistics.median(vals) if complete else None,'minimum':min(vals) if complete else None,'maximum':max(vals) if complete else None,'benchmark':r['benchmark'],'relativeChange':(level-base)-(r['benchmark']-baseline['benchmark']) if complete else None,'coverage':sum(v is not None for v in vals),'count':len(members)})
 credit.append({'name':name,'kind':kind,'members':members,'cells':cells})
issuer_credit=[]
for t in issuers:
 last=next((r for r in reversed(daily) if r['values'].get(t) is not None and r['benchmark'] is not None),None)
 if not last:continue
 date=datetime.date.fromisoformat(last['date']);cut=date-datetime.timedelta(days=30)
 prior=next((r for r in reversed(daily) if r['date']<=cut.isoformat() and r['values'].get(t) is not None and r['benchmark'] is not None),None)
 issuer_credit.append({'ticker':t,'sector':sector.get(t,'Unclassified'),'rating':rating_sources.get(t,{}),'date':last['date'],'spread':last['values'][t],'benchmark':last['benchmark'],'excess30d':(last['values'][t]-prior['values'][t])-(last['benchmark']-prior['benchmark']) if prior else None})
bond_sheet=list(w['Bond Issuance Value'].values)
benchmark_month_col=next(i for i,h in enumerate(bond_sheet[0]) if h=='#US_IG_ISSUANCE')
benchmark={}
for r in bond_sheet[1:]:
 m=re.fullmatch(r'(\d{6})(?:\.0)?',str(r[benchmark_month_col-1]))
 amount=number(r[benchmark_month_col])
 if m and amount is not None and amount>0:
  month=m[1][:4]+'-'+m[1][4:]
  if month in benchmark:raise ValueError(f'Duplicate benchmark month {month}')
  benchmark[month]=amount/1e9
bonds=[]
for r in bond_sheet[1:]:
 m=re.fullmatch(r'(\d{6})(?:\.0)?:([^:]+)',str(r[0]))
 amount=number(r[1]);count=number(r[2])
 if not m or amount is None:continue
 month=m[1][:4]+'-'+m[1][4:];issuer=m[2]
 bonds.append({'month':month,'issuer':issuer,'sector':sector.get(issuer,'Unclassified'),'amount':amount/1e9,'issues':count})
months=sorted(set(r['month'] for r in bonds));bond_sectors=sorted(set(r['sector'] for r in bonds));monthly=[]
for month in months:
 records=[r for r in bonds if r['month']==month]
 monthly.append({'month':month,'amount':sum(r['amount'] for r in records),'issues':sum(r['issues'] or 0 for r in records),'sectors':{s:sum(r['amount'] for r in records if r['sector']==s) for s in bond_sectors}})
latest=months[-1];start=shift(latest,-11);window=[r for r in bonds if start<=r['month']<=latest]
monthly_by_month={r['month']:r for r in monthly}
bond_market=[{'month':m,'usIgAmount':benchmark.get(m),'coveredAmount':monthly_by_month.get(m,{}).get('amount'),'relativeSupplyPct':monthly_by_month[m]['amount']/benchmark[m]*100 if m in monthly_by_month and m in benchmark else None} for m in sorted(set(months)|set(benchmark))]
matched=[r for r in bond_market if start<=r['month']<=latest and r['relativeSupplyPct'] is not None]
bond_benchmark={'monthly':bond_market,'latestMatchedMonth':max(r['month'] for r in bond_market if r['relativeSupplyPct'] is not None),'benchmarkAsOf':max(benchmark),'matchedWindowRatio':sum(r['coveredAmount'] for r in matched)/sum(r['usIgAmount'] for r in matched)*100,'matchedMonths':len(matched),'numeratorScope':'All recorded covered-company bonds, across countries and ratings. Includes non-US and below-IG issuers. AI use of proceeds is not identified.','denominatorScope':'US country-of-risk, investment-grade corporate bonds, amounts converted to USD in the source BQL query.','interpretation':'Relative issuance scale, not a strict share of US IG issuance. The numerator query lacks the denominator country-of-risk and issue-level IG filters. Missing covered months remain null; October has benchmark-only month-to-date data.'}
sector_totals=[{'sector':s,'amount':sum(r['amount'] for r in window if r['sector']==s),'issues':sum(r['issues'] or 0 for r in window if r['sector']==s),'issuers':sorted(set(r['issuer'] for r in window if r['sector']==s))} for s in bond_sectors]
sector_totals.sort(key=lambda r:-r['amount'])
issuer_totals=[{'issuer':t,'sector':sector.get(t,'Unclassified'),'amount':sum(r['amount'] for r in window if r['issuer']==t)} for t in sorted(set(r['issuer'] for r in window))];issuer_totals.sort(key=lambda r:-r['amount'])
result={'metadata':{'source':'Indexlist.xlsx','sha256':hashlib.sha256(a.input.read_bytes()).hexdigest(),'creditAsOf':daily[-1]['date'],'creditBaseline':baseline['date'],'ratingAsOf':'2026-09-30','bondWindow':start+' through '+latest,'bondMissingMonths':[shift(start,i) for i in range(12) if shift(start,i) not in months],'limitations':'Supplementary indicators do not alter core weights. CDS uses Bloomberg implied issuer spreads versus the workbook IG benchmark, not a rating-matched index. Fixed groups use latest ratings retrospectively; no historical rating adjustment. Sector baskets include covered issuers across ratings, including below IG. Calendar-day values can carry prior observations. Bond amounts follow the existing USD-equivalent workbook convention; no new FX conversion. Absent issuer-month entries are no recorded issuance, not independently verified zeros. Unknown issuers remain unclassified.'},'demand':demand,'credit':credit,'creditIssuers':issuer_credit,'bondRows':bonds,'bondMonthly':monthly,'bondSectors':sector_totals,'bondIssuers':issuer_totals}
result['bondBenchmark']=bond_benchmark
root=Path(__file__).resolve().parents[1];(root/'app/workbook-amendments-snapshot.ts').write_text('export const workbookAmendments = '+json.dumps(result,indent=2)+' as const;\n')
print(json.dumps({'demandSeries':len(demand),'creditDays':len(daily),'creditGroups':len(credit),'bondRecords':len(bonds),'bondWindow':result['metadata']['bondWindow'],'missingBondMonths':result['metadata']['bondMissingMonths'],'largestSector':sector_totals[0]},indent=2))
