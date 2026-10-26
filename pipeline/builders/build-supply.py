"""Build Supply and its saved forward context without inventing historical forecasts."""
import datetime as dt
import hashlib
import json
import openpyxl
from paths import DATA_ROOT, BUILD_ROOT
from supply import integrate

def read(name): return json.JSONDecoder().raw_decode((BUILD_ROOT/'app'/name).read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]
def write(name, var, data): (BUILD_ROOT/'app'/name).write_text('export const '+var+' = '+json.dumps(data,indent=2,allow_nan=False)+' as const;\n',encoding='utf-8')

def main():
    core, prices, cloud = read('core-contribution-snapshot.ts'), read('index-price-snapshot.ts'), read('cloud-reference-snapshot.ts')
    revised = integrate(core, prices)
    write('core-contribution-snapshot.ts','coreContributionSnapshot',revised)
    # Calendar quarter ends in the saved CapEx table; next four full quarters after the as-of quarter.
    config=json.loads((DATA_ROOT/'data/reference/supply_config.json').read_text(encoding='utf-8'))
    asof = dt.date.fromisoformat(config['horizonAsOf'])
    start = asof.year*4+(asof.month-1)//3+1
    targets = [f'{n//4}Q{n%4+1}' for n in range(start,start+4)]
    book = openpyxl.load_workbook(DATA_ROOT/'Indexlist.xlsx',read_only=True,data_only=True)
    rows = list(book['Supply Chain Financial Value'].values)
    capex = []
    for ticker in ['MSFT','GOOGL','AMZN','META','ORCL']:
        col = next(i+1 for i,v in enumerate(rows[0]) if v == ticker+' US Equity')
        col = next(i for i in range(col-1,col+6) if rows[1][i]=='#capex')
        observations = []
        for rn,row in enumerate(rows[2:],3):
            date = row[0]
            if not isinstance(date,dt.datetime): continue
            q=f'{date.year}Q{(date.month-1)//3+1}'
            if q not in targets: continue
            value=row[col]
            assert isinstance(value,(int,float)) and value<0,(ticker,q,value)
            observations.append(dict(quarter=q,value=-value/1e9,cell=f'{openpyxl.utils.get_column_letter(col+1)}{rn}'))
        capex.append(dict(ticker=ticker,quarters=observations,forward12m=sum(r['value'] for r in observations) if len(observations)==4 else None))
    rpo=[]
    for entity in sorted({r['entity'] for r in cloud['observations'] if r['metric']=='RPO'}):
        observations=[r for r in cloud['observations'] if r['metric']=='RPO' and r['entity']==entity]
        lookup={r['fiscalPeriod']:r for r in observations}
        for row in observations:
            previous=lookup.get(row['fiscalPeriod'][:2]+str(int(row['fiscalPeriod'][2:])-1))
            rpo.append(dict(entity=entity,period=row['fiscalPeriod'],value=row['value'],sourceCell=row['sourceCell'],
                yoy=None if previous is None else (row['value']/previous['value']-1)*100))
    payload=dict(metadata=dict(version='2.8',asOf=asof.isoformat(),coreWeight=.2,forwardQuarters=targets,
        sourceRetrievedAt=None,workbookSha256=hashlib.sha256((DATA_ROOT/'Indexlist.xlsx').read_bytes()).hexdigest(),
        cloudWorkbookSha256=cloud['metadata']['workbookSha256'],
        forwardMethod='CapEx: next four complete calendar quarters after the as-of quarter, raw saved Bloomberg estimates in USD billions. Not a day-exact rolling horizon and not lease-bridged. RPO: native fiscal-period stock estimates, never summed across quarters or issuers.',
        rpoGrowthVsCapexStatus='Withheld: RPO fiscal-calendar alignment, comparable scope and matched historical/forward growth bases are not verified. No fabricated historical estimates or revisions.',
        limitations=cloud['metadata']['limitations']+['Forecast vintage retrieval time is unknown. As-of date defines the requested horizon, not source freshness.','Single forecast vintage cannot support historical estimate revisions.','No electrical-equipment shipment, order or lead-time inputs added to Supply.']),
        capex=capex,rpo=rpo,
        hardware=[s for s in prices['series'] if s['field'] in ['ISPPDR48 Index','SDH100RT Index','SDB200RT Index']],
        monthly=[dict(month=m['month'],score=None if any(r['score'] is None for r in m['rows'] if r['pillar']=='Supply') else sum(r['weight']*r['score']/.2 for r in m['rows'] if r['pillar']=='Supply')) for m in revised['months']])
    write('supply-snapshot.ts','supplySnapshot',payload)
    (BUILD_ROOT/'audits').mkdir(exist_ok=True)
    (BUILD_ROOT/'audits/supply-v2.8.json').write_text(json.dumps(dict(baseline=revised['metadata']['supplyBaseline'],comparison=[dict(month=m['month'],previous=m['previousVersionScore'],score=m['score']) for m in revised['months']]),indent=2)+'\n',encoding='utf-8')
    print('Supply v2.8 built; latest complete:',next((m['month'],m['score']) for m in reversed(revised['months']) if m['score'] is not None))
if __name__=='__main__': main()
