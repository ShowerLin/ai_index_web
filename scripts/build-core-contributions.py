"""Build methodology-v2 core scores and exact constituent attribution."""
import argparse, hashlib, json, math, re, statistics
from datetime import datetime, timedelta
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--input',type=Path,required=True);args=p.parse_args()
root=Path(__file__).resolve().parents[1]
raw=args.input.read_bytes()
table=next(d for line in raw.decode().splitlines() if (d:=json.loads(line)).get('kind')=='table' and d.get('sheet')=='Index Price Value')
values=table['values'];headers=values[0];observations={}
for row in values[2:]:
 if isinstance(row[0],(int,float)):
  month=(datetime(1899,12,30)+timedelta(days=row[0])).strftime('%Y-%m')
  if month<='2026-06': observations[month]=dict(zip(headers[1:],row[1:]))
groups={'Adoption':['BTOS0700','BTOS2400'],'Demand':['KOTCDRAM'],'Investment':['DGNOCOEQ','DGNOITIN','DGNOTGOP','CNSTPRDA','IPNEHITC'],'Imports':['USIMTELE','USIMSEMI','USIMCOMP']}
names=['Current business AI use','Expected business AI use','South Korea DRAM exports','Communication equipment orders','IT equipment orders','Power equipment orders','Data-center construction','High-tech industry activity','Telecom imports','Semiconductor imports','Computer imports']
labels=dict(zip(sum(groups.values(),[]),names));series={}
valid=lambda v:isinstance(v,(int,float)) and math.isfinite(v)
def shift_month(month,offset):
 n=int(month[:4])*12+int(month[5:])-1+offset
 return f'{n//12:04}-{n%12+1:02}'
for pillar,tickers in groups.items():
 for ticker in tickers:
  history={}; source={}; short={}
  treatment='Adoption level (%)' if pillar=='Adoption' else '12M average YoY growth (%)' if ticker in ['IPNEHITC','CNSTPRDA'] else 'TTM YoY growth (%)'
  for month,row in sorted(observations.items()):
   a=row.get(ticker+' Index'); source[month]=a if valid(a) else None
   if pillar=='Adoption':
    if valid(a):history[month]=a
    b=observations.get(shift_month(month,-1),{}).get(ticker+' Index')
    short[month]=a-b if valid(a) and valid(b) else None
   else:
    windows=[[observations.get(shift_month(month,-i),{}).get(ticker+' Index') for i in range(offset,offset+12)] for offset in [0,12]]
    if all(valid(v) for window in windows for v in window) and sum(windows[1])>0:
     history[month]=(sum(windows[0])/sum(windows[1])-1)*100
    recent=[[observations.get(shift_month(month,-i),{}).get(ticker+' Index') for i in range(offset,offset+3)] for offset in [0,12]]
    short[month]=(sum(recent[0])/sum(recent[1])-1)*100 if all(valid(v) for w in recent for v in w) and sum(recent[1])>0 else None
  series[ticker]={'pillar':pillar,'name':labels[ticker],'weight':.2/len(tickers),'history':history,'source':source,'short':short,'treatment':treatment}
# Parse the same saved quarterly company series used by the page, once per quarter.
page=(root/'app/page.tsx').read_text();block=page.split('const capexHistory = [',1)[1].split('] as const;',1)[0]
quarters={}
for row in re.finditer(r'\{q:"(\d{4}Q[1-4])",([^}]+)\}',block):
 quarters[row[1]]={k:float(v) for k,v in re.findall(r'(Microsoft|Alphabet|Meta|Amazon|Oracle):([\d.]+)',row[2])}
quarter_keys=list(quarters)
for company in ['Microsoft','Alphabet','Meta','Amazon','Oracle']:
 history={}
 for i,quarter in enumerate(quarter_keys):
  if i>=7:
   current=sum(quarters[q][company] for q in quarter_keys[i-3:i+1]);prior=sum(quarters[q][company] for q in quarter_keys[i-7:i-3])
   if prior>0:history[quarter]=(current/prior-1)*100
 series[company]={'pillar':'Hyperscaler CapEx','name':company+' CapEx','weight':.04,'history':history,'source':{q:quarters[q][company] for q in quarter_keys},'short':{},'treatment':'Trailing 4Q YoY growth (%)'}
# Sum company spending before computing growth; never average company growth rates.
aggregate_history={};aggregate_source={}
for i,quarter in enumerate(quarter_keys):
 aggregate_source[quarter]=sum(quarters[quarter][company] for company in ['Microsoft','Alphabet','Meta','Amazon','Oracle'])
 if i>=7:
  current=sum(sum(quarters[q].values()) for q in quarter_keys[i-3:i+1])
  prior=sum(sum(quarters[q].values()) for q in quarter_keys[i-7:i-3])
  if prior>0:aggregate_history[quarter]=(current/prior-1)*100
company_series={company:series.pop(company) for company in ['Microsoft','Alphabet','Meta','Amazon','Oracle']}
series['HYPERSCALER_TOTAL']={'pillar':'Hyperscaler CapEx','name':'Combined hyperscaler CapEx','weight':.2,'history':aggregate_history,'source':aggregate_source,'short':{},'treatment':'Combined trailing 4Q YoY growth (%)'}
# Fixed historical baseline is explicit. It is not asserted to be the legacy baseline.
for item in [*series.values(),*company_series.values()]:
 sample=list(item['history'].values());item['mean']=statistics.mean(sample);item['std']=statistics.stdev(sample) if len(sample)>=2 else 0;item['count']=len(sample)
months=sorted(month for month in observations if month>='2024-01')
result=[]
for month in months:
 rows=[]
 for ticker,item in series.items():
  key=f'{month[:4]}Q{(int(month[5:])-1)//3+1}' if item['pillar']=='Hyperscaler CapEx' else month
  growth=item['history'].get(key);score=None if growth is None or item['std']==0 else max(0,min(100,50+15*(growth-item['mean'])/item['std']))
  rows.append({'ticker':ticker,'name':item['name'],'pillar':item['pillar'],'weight':item['weight'],'growth':growth,'score':score,'contribution':None if score is None else item['weight']*(score-50),'baselineCount':item['count'],'treatment':item['treatment'],'level':item['source'].get(key),'shortMomentum':item['short'].get(key),'baselineMean':item['mean'],'baselineStd':item['std']})
 complete=all(r['score'] is not None for r in rows)
 company_rows=[{'ticker':company,'name':company+' CapEx','level':item['source'].get(f'{month[:4]}Q{(int(month[5:])-1)//3+1}'),'growth':item['history'].get(f'{month[:4]}Q{(int(month[5:])-1)//3+1}')} for company,item in company_series.items()]
 result.append({'month':month,'companyCapexRows':company_rows,'score':sum(r['weight']*r['score'] for r in rows) if complete else None,'rows':rows})
output={'metadata':{'version':'2.1','sourceSha256':hashlib.sha256(raw).hexdigest(),'method':'Adoption levels; TTM YoY growth for monthly flows; 12M-average YoY growth for construction and industrial-production indices; trailing-four-quarter YoY growth of summed five-company CapEx. Score = clip(50 + 15 × z, 0, 100). Five 20% pillars; equal constituent weights within macro pillars, one combined CapEx signal. Company growth is supplementary.', 'limitation':'Fixed per-series baseline uses all valid transformed observations through June 2026. Retrospective scores, not real-time backtests. Sample standard deviation; quarterly values held within quarter. Missing scores withhold the core; no reweighting. Macro source definitions and nominal price effects remain limitations.','baselineEnd':'2026-06'},'months':result}
(root/'app/core-contribution-snapshot.ts').write_text('export const coreContributionSnapshot = '+json.dumps(output,indent=2)+' as const;\n')
print('Generated',len(result),'months,',len(series),'constituents; June methodology-v2 score:',result[-1]['score'])
