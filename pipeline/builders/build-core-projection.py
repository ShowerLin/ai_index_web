"""Conditional CapEx projection; preserve the published historical core."""
import json, math, hashlib
import openpyxl
from paths import DATA_ROOT, BUILD_ROOT

def read(p):
    return json.JSONDecoder().raw_decode(p.read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]
core=read(BUILD_ROOT/'app/core-contribution-snapshot.ts')
anchor=next(m for m in core['months'] if m['month']=='2026-06')
cap=next(r for r in anchor['rows'] if r['pillar']=='Supply' and r['ticker'] not in ('ISPPDR48','SDH100RT'))
history=json.loads((DATA_ROOT/'data/research/capex/quarterly_history.json').read_text())
book=openpyxl.load_workbook(DATA_ROOT/'Indexlist.xlsx',read_only=True,data_only=True)
sheet=book['Supply Chain Financial Value']; data=list(sheet.values)
companies={'MSFT':'Microsoft','GOOGL':'Alphabet','AMZN':'Amazon','META':'Meta','ORCL':'Oracle'}
cols={t:next(i+1 for i,v in enumerate(data[0]) if v==t+' US Equity') for t in companies}
raw={}
for rownum,row in enumerate(data[2:],3):
    date=row[0]
    if not hasattr(date,'strftime'):continue
    q=f'{date.year}Q{(date.month-1)//3+1}'
    if q<'2026Q2' or q>'2027Q4':continue
    raw[q]={}
    for ticker,start in cols.items():
        col=next(c for c in range(start-1,start+6) if data[1][c]=='#capex')
        v=row[col]
        if not isinstance(v,(int,float)) or not math.isfinite(v) or v>=0:raise ValueError(f'Missing/invalid estimate: {q} {ticker}: {v}')
        raw[q][companies[ticker]]={'value':-v/1e9,'cell':f'{openpyxl.utils.get_column_letter(col+1)}{rownum}'}
factors={name:history['2026Q2'][name]/raw['2026Q2'][name]['value'] for name in companies.values()}
quarters=[]
for q in sorted(raw):
    if q=='2026Q2':continue
    history[q]={name:item['value']*factors[name] for name,item in raw[q].items()}
    year=int(q[:4]);quarter=int(q[-1]);ordinal=year*4+quarter-1
    window=[f'{n//4}Q{n%4+1}' for n in range(ordinal-7,ordinal+1)]
    totals=[sum(history[k].values()) for k in window]
    growth=(sum(totals[4:])/sum(totals[:4])-1)*100
    score=max(0,min(100,50+15*(growth-cap['baselineMean'])/cap['baselineStd']))
    composite=anchor['score']+cap['weight']*(score-cap['score'])
    quarters.append(dict(quarter=q,total=sum(history[q].values()),companies=history[q],rawEstimates=raw[q],growth=growth,capexScore=score,composite=composite))
assert len(quarters)==6
supply_anchor=sum(r['weight']*r['score']/.2 for r in anchor['rows'] if r['pillar']=='Supply')
for q in quarters:q['supplyScore']=supply_anchor+cap['weight']/.2*(q['capexScore']-cap['score'])
months=[dict(month='2026-06',value=anchor['score'],capexScore=cap['score'],supplyScore=supply_anchor)]
for q in quarters:
    for month in range((int(q['quarter'][-1])-1)*3+1,int(q['quarter'][-1])*3+1):
        months.append(dict(month=f"{q['quarter'][:4]}-{month:02}",value=q['composite'],capexScore=q['capexScore'],supplyScore=q['supplyScore']))
payload=dict(metadata=dict(source='Indexlist.xlsx',sheet=sheet.title,workbookSha256=hashlib.sha256((DATA_ROOT/'Indexlist.xlsx').read_bytes()).hexdigest(),actualThrough='2026-06-30',estimateThrough='2027-12-31',anchorMonth=anchor['month'],bridgeFactors=factors,
    method='Conditional composite: June 2026 composite + 10% × (projected CapEx score − June CapEx score). Other four pillars and DDR5/H100 Supply scores held at June scores. Supply projection is conditional, not a hardware-price forecast. CapEx uses five-company TTM total YoY growth and unchanged June baseline. Each company headline estimate is multiplied by its June approved-core CapEx / June source headline CapEx ratio to bridge accounting bases. This fixed-ratio bridge is an assumption, not a Bloomberg forecast of lease-inclusive spending. Quarter scores held across constituent months; retrospective period alignment.',
    sourceRetrievedAt=None),quarters=quarters,months=months)
(BUILD_ROOT/'app/core-projection-snapshot.ts').write_text('export const coreProjectionSnapshot = '+json.dumps(payload,indent=2)+' as const;\n',encoding='utf-8')
print('Projected through',months[-1]['month'],'conditional score',months[-1]['value'])
