"""Rebuild v2.2 from the preserved v2.1 core and current workbook demand snapshot."""
import json,statistics,copy,datetime
import openpyxl
from pathlib import Path
root=Path(__file__).resolve().parents[1]
def read(p):
 s=p.read_text();return json.loads(s[s.index('{'):s.rindex(' as const')])
x=read(root/'data/core-v2.1.ts');d=read(root/'app/workbook-amendments-snapshot.ts')
backfill={2023:[200051,163174,145408,147900,176537,156404,177616,188686,180430,243203,206026,176300],2024:[215785,181648,195211,236021,229620,207869]}
def shift(m,n):
 a=int(m[:4])*12+int(m[5:])-1+n;return f'{a//12:04}-{a%12+1:02}'
# Extend observation history while keeping June normalization baselines fixed.
w=openpyxl.load_workbook('/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/Indexlist.xlsx',read_only=True,data_only=True)
raw=list(w['Index Price Value'].values);headers=raw[0];obs={r[0].strftime('%Y-%m'):dict(zip(headers[1:],r[1:])) for r in raw[2:] if isinstance(r[0],datetime.datetime) and r[0].strftime('%Y-%m')<='2026-09'}
for month in sorted(obs):
 if month<='2026-06':continue
 prior=x['months'][-1];rows=copy.deepcopy(prior['rows'])
 for r in rows:
  r.update(score=None,contribution=None,growth=None,shortMomentum=None,level=None)
  if r['pillar']=='Demand':continue
  if r['pillar']=='Hyperscaler CapEx':continue
  field=r['ticker']+' Index';v=obs[month].get(field)
  valid=lambda v:isinstance(v,(int,float))
  r['level']=v if valid(v) else None
  if r['pillar']=='Adoption':g=v if valid(v) else None
  else:
   windows=[[obs.get(shift(month,-i),{}).get(field) for i in range(o,o+12)] for o in [0,12]]
   g=(sum(windows[0])/sum(windows[1])-1)*100 if all(valid(v) for ws in windows for v in ws) and sum(windows[1])>0 else None
  r['growth']=g;r['score']=None if g is None else max(0,min(100,50+15*(g-r['baselineMean'])/r['baselineStd']))
  r['contribution']=None if r['score'] is None else r['weight']*(r['score']-50)
 x['months'].append({'month':month,'score':None,'rows':rows,'companyCapexRows':[dict(r,level=None,growth=None) for r in prior['companyCapexRows']]})
items=[]
for s in d['demand']:
 levels={p['month']:p['level'] for p in s['cells']}
 if s['field']=='TSMC Monthly Revenue':
  for year,vals in backfill.items():
   for i,v in enumerate(vals):levels[f'{year}-{i+1:02}']=v
 history={}
 for m in sorted(levels):
  if m>'2026-09':continue
  windows=[[levels.get(shift(m,-i)) for i in range(o,o+12)] for o in [0,12]]
  if all(v is not None for w in windows for v in w) and sum(windows[1])>0:history[m]=(sum(windows[0])/sum(windows[1])-1)*100
 baseline=[v for m,v in history.items() if m<='2026-06'];mean=statistics.mean(baseline);std=statistics.stdev(baseline)
 items.append((s,levels,history,mean,std))
for m in x['months']:
 rows=[r for r in m['rows'] if r['pillar']!='Demand']
 for s,levels,h,mean,std in items:
  g=h.get(m['month']);score=None if g is None else max(0,min(100,50+15*(g-mean)/std))
  rows.insert(2+len([r for r in rows if r['pillar']=='Demand']),dict(ticker=s['field'].replace(' Index','').replace('TSMC Monthly Revenue','TSMC_REVENUE'),name=s['name'],pillar='Demand',weight=.2/3,growth=g,score=score,contribution=None if score is None else .2/3*(score-50),baselineCount=len([m for m in h if m<='2026-06']),treatment='TTM YoY growth (%)',level=levels.get(m['month']),shortMomentum=None,baselineMean=mean,baselineStd=std))
 m['rows']=rows;m['score']=sum(r['weight']*r['score'] for r in rows) if all(r['score'] is not None for r in rows) else None
x['metadata']['version']='2.2';x['metadata']['demandSourceSha256']=d['metadata']['sha256'];x['metadata']['demandMethod']='DRAM, NAND and TSMC TTM YoY, equal thirds of 20%. TSMC missing pre-July-2024 levels backfilled from official monthly revenue, NT$ millions. First TSMC transformed observation December 2024; short baseline through June 2026.'
x['metadata']['tsmcSources']=['https://investor.tsmc.com/english/monthly-revenue/2023','https://investor.tsmc.com/schinese/monthly-revenue/2024']
(root/'app/core-contribution-snapshot.ts').write_text('export const coreContributionSnapshot = '+json.dumps(x,indent=2)+' as const;\n')
print(x['months'][-1]['score']);print([(r['ticker'],r['growth'],r['score']) for r in x['months'][-1]['rows'] if r['pillar']=='Demand'])
