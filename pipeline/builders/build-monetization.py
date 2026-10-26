"""Extract public AI-company Bloomberg observations with explicit source lineage.

Blended-quarter revenue is retained at native grain until its accounting basis
and reported/estimate classification have been reviewed. Never infer either
from observation dates alone.
"""
import datetime
import hashlib
import json
import math
import openpyxl
from paths import DATA_ROOT, BUILD_ROOT
from monetization import SOURCE, records

CONFIG=DATA_ROOT/'data/reference/monetization_config.json'

def number(value):
    return value if isinstance(value,(int,float)) and not isinstance(value,bool) and math.isfinite(value) else None

def build():
    config=json.loads(CONFIG.read_text(encoding='utf-8'))
    book=openpyxl.load_workbook(SOURCE,read_only=True,data_only=True)
    sheet=book['Public Value']
    formula=openpyxl.load_workbook(SOURCE,read_only=True,data_only=False)
    query=formula['Public Formula']['I1'].value
    if not isinstance(query,str) or "currency = 'USD'" not in query or 'fpt=BQ' not in query:
        raise ValueError('Review changed Bloomberg currency or period query before rebuilding')
    companies=[]
    for company in config['companies']:
        col=company['revenueColumn']
        if sheet.cell(1,col).value!=company['ticker']:
            raise ValueError('Public Value ticker/column mapping changed')
        history=[];seen=set()
        for r in range(3,sheet.max_row+1):
            date=sheet.cell(r,1).value
            if not isinstance(date,datetime.datetime):continue
            date=date.strftime('%Y-%m-%d')
            revenue=number(sheet.cell(r,col).value);cap=number(sheet.cell(r,col+1).value)
            if revenue is None and cap is None:continue
            if date in seen:raise ValueError(f'Duplicate observation: {company["name"]} {date}')
            seen.add(date)
            status=('Reported' if date<=config['reportedThrough'] else 'Estimate') if revenue is not None else None
            history.append(dict(date=date,revenueUsd=revenue,marketCapUsd=cap,revenueStatus=status,
                revenueCell=f'{sheet.title}!{sheet.cell(r,col).coordinate}' if revenue is not None else None,
                marketCapCell=f'{sheet.title}!{sheet.cell(r,col+1).coordinate}' if cap is not None else None))
        history.sort(key=lambda r:r['date'])
        caps=[r for r in history if r['marketCapUsd'] is not None]
        companies.append(dict(name=company['name'],ticker=company['ticker'],currency='USD',
            revenueBasis=company['revenueBasis'],history=history,
            latestMarketCap={'date':caps[-1]['date'],'value':caps[-1]['marketCapUsd']} if caps else None,
            forwardPS=None,forwardPSStatus='Annual revenue denominator pending period-basis review'))
        revenues={r['date']:r for r in history if r['revenueUsd'] is not None}
        for row in history:
            previous=revenues.get(str(int(row['date'][:4])-1)+row['date'][4:])
            row['revenueYoY']=row['revenueUsd']/previous['revenueUsd']-1 if row['revenueUsd'] is not None and previous and previous['revenueUsd']>0 else None
        reported=[r for r in history if r['revenueStatus']=='Reported']
        companies[-1]['latestReportedRevenue']=reported[-1] if reported else None
    book.close();formula.close()
    research=records('Valuation Research')
    for row in research:
        assert row['company'] in ('OpenAI','Anthropic') and number(row['valueUsd']) and row['url'].startswith('https://')
    funding=records('Funding Valuations')
    private=[]
    for name in ('OpenAI','Anthropic'):
        eligible=[r for r in funding if r['Company']==name and r['Status']=='Closed'
            and number(r['Valuation (post-money)']) is not None and r.get('Close date')]
        eligible.sort(key=lambda r:r['Close date'])
        annualized=[r for r in records('Lab Revenue') if r['Company']==name and r['Scope']=='Full company'
            and r['Annualized revenue type'] in ('Annualized run rate','Annual recurring revenue (ARR)')
            and number(r['Annualized revenue (USD)']) is not None]
        annualized.sort(key=lambda r:(r['Date'],r.get('Report date') or ''))
        private.append(dict(company=name,latestAnnualizedRevenue=annualized[-1] if annualized else None,
            latestClosedValuation=eligible[-1] if eligible else None,
            note='Private valuation and annualized revenue have different observation dates; no public forward P/S implied.'))
    return dict(metadata=dict(source='AI_Monetization.xlsx',workbookSha256=hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
        currency='USD',sourceUnit='USD',coreWeight=0,classificationStatus='User-confirmed reported/estimate cutoff',reportedThrough=config['reportedThrough'],
        query=query,limitations=['BQ field values are retained without annualization or summation.',
        'Repeated adjacent quarter values may reflect source blending or reporting cadence.',
        'Public Value query text differs from Public Formula; Formula query describes the saved forecast extent.',
        'Source values are saved Bloomberg observations, not independently refreshed figures.']),
        publicCompanies=companies,privateLabs=private,valuationResearch=research)

if __name__=='__main__':
    payload=build()
    (BUILD_ROOT/'app/monetization-snapshot.ts').write_text('export const monetizationSnapshot = '+json.dumps(payload,indent=2,allow_nan=False)+' as const;\n',encoding='utf-8')
    out=BUILD_ROOT/'monetization';out.mkdir(exist_ok=True)
    (out/'snapshot.json').write_text(json.dumps(payload,indent=2,allow_nan=False)+'\n',encoding='utf-8')
    print('Extracted public-company observations and private-lab source records')
