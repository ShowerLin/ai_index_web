"""Calculate quarterly company financials from raw cached Excel XML values.

Read numeric XML directly: some revenue cells have erroneous Excel date formatting.
The workbook itself is not modified.
"""
import datetime,hashlib,json,math,zipfile,xml.etree.ElementTree as E
from pathlib import Path
from openpyxl.utils.cell import coordinate_from_string,column_index_from_string
from openpyxl.utils.datetime import from_excel
root=Path(__file__).resolve().parents[1]
source=Path('/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index/Indexlist.xlsx')
ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
def raw_sheet(name):
 with zipfile.ZipFile(source) as z:
  wb=E.fromstring(z.read('xl/workbook.xml'));rid=next(x for x in wb.find('s:sheets',ns) if x.get('name')==name).get('{'+ns['r']+'}id')
  target=next(x.get('Target') for x in E.fromstring(z.read('xl/_rels/workbook.xml.rels')) if x.get('Id')==rid)
  target=target.lstrip('/') if target.startswith('/') else 'xl/'+target
  strings=[''.join(x.itertext()) for x in E.fromstring(z.read('xl/sharedStrings.xml'))] if 'xl/sharedStrings.xml' in z.namelist() else []
  cells={};maxcol=0
  for c in E.fromstring(z.read(target)).findall('.//s:sheetData/s:row/s:c',ns):
   col,row=coordinate_from_string(c.get('r'));col=column_index_from_string(col)-1;maxcol=max(maxcol,col);v=c.find('s:v',ns);typ=c.get('t')
   if typ=='inlineStr':value=''.join(c.find('s:is',ns).itertext())
   elif v is None:value=None
   elif typ=='s':value=strings[int(v.text)]
   elif typ in ('e','str'):value=v.text
   else:
    try:value=float(v.text)
    except (ValueError,TypeError):value=None
   cells[row,col]=value
  return [[cells.get((r,c)) for c in range(maxcol+1)] for r in range(1,max(r for r,c in cells)+1)]
def number(v):return float(v) if isinstance(v,(int,float)) and math.isfinite(v) else None
def date(v):
 try:return from_excel(v).date().isoformat() if isinstance(v,(int,float)) else None
 except (ValueError,OverflowError):return None
def ratio(a,b):return a/b if a is not None and b is not None and b>0 else None
def growth(a,b):return (a/b-1)*100 if a is not None and b is not None and b>0 else None
financial=raw_sheet('Supply Chain Financial Value');history={};latest={}
fields=['revenue','capex','ebitdaMargin','fcfToEbitda','netDebt','ebitda','interestCoverage']
for start,id in enumerate(financial[0]):
 if not isinstance(id,str) or ' Equity' not in id:continue
 ticker=id.strip().split()[0];rows=[]
 for i,r in enumerate(financial[2:],3):
  d=date(r[0])
  if not d:continue
  item={'period':d,'sourceRange':f'{financial[0][start]}:row {i}',**{key:number(r[start+j]) for j,key in enumerate(fields)}}
  item['capex']=abs(item['capex']) if item['capex'] is not None else None
  rows.append(item)
 rows.sort(key=lambda r:r['period'])
 for i,item in enumerate(rows):
  window=rows[max(0,i-3):i+1]
  q=lambda d:int(d[:4])*4+(int(d[5:7])-1)//3
  complete=len(window)==4 and q(window[-1]['period'])-q(window[0]['period'])==3
  item['ttmEbitda']=sum(r['ebitda'] for r in window) if complete and all(r['ebitda'] is not None for r in window) else None
  item['ttmRevenue']=sum(r['revenue'] for r in window) if complete and all(r['revenue'] is not None for r in window) else None
  item['netDebtToEbitda']=ratio(item['netDebt'],item['ttmEbitda'])
  prior=next((r for r in rows if q(r['period'])==q(item['period'])-4),None)
  item['revenueGrowth']=growth(item['revenue'],prior['revenue']) if prior else None
  item['capexGrowth']=growth(item['capex'],prior['capex']) if prior else None
 history[ticker]=rows
 valid=[r for r in rows if any(r[f] is not None for f in fields)]
 latest[ticker]=valid[-1] if valid else rows[-1]
credit=raw_sheet('AI 5yrCDS Value');daily={};benchmarkCol=next(i for i,v in enumerate(credit[0]) if v=='IBOXUMAE Curncy')
for col,id in enumerate(credit[0]):
 if not isinstance(id,str) or ' Equity' not in id:continue
 ticker=id.strip().split()[0];ticker={'TSM':'2330'}.get(ticker,ticker)
 if ticker not in history:continue
 values=[]
 for r in credit[2:]:
  d=date(r[0]);spread=number(r[col]);benchmark=number(r[benchmarkCol])
  if d:values.append({'date':d,'spread':spread,'benchmark':benchmark,'excess':spread-benchmark if spread is not None and benchmark is not None else None})
 daily[ticker]=values
metadata={'source':'Indexlist.xlsx','sheet':'Supply Chain Financial Value','sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'extractedAt':'2026-10-07','method':'Net debt / sum of four consecutive quarterly EBITDA observations. Withhold nonpositive or incomplete TTM EBITDA. Revenue and CapEx growth compare the same source quarter a year earlier; cash CapEx is expressed as positive spending. Interest coverage and margin remain source-period ratios. Report publication dates are unavailable; retrospective period alignment is not a real-time backtest. Raw amounts retain source currency.','companies':len(latest),'cdsMatchedCompanies':len(daily)}
spreadtext=(root/'app/workbook-amendments-snapshot.ts').read_text()
spreads=json.loads(spreadtext[spreadtext.index('{'):spreadtext.rindex('}')+1])
def quantile(values,p):
 ordered=sorted(values);k=(len(ordered)-1)*p;lower=int(k);upper=min(lower+1,len(ordered)-1)
 return ordered[lower]+(ordered[upper]-ordered[lower])*(k-lower)
periods=sorted({r['period'] for rows in history.values() for r in rows})
groups=[]
for group in spreads['credit']:
 if group['kind'] not in ('sector','rating') or group['name']=='All rated IG':continue
 members=list(dict.fromkeys({'TSM':'2330'}.get(t,t) for t in group['members'] if {'TSM':'2330'}.get(t,t) in daily))
 if not members:continue
 cells=[]
 for period in periods:
  observations=[{'ticker':t,'value':next((r['netDebtToEbitda'] for r in history[t] if r['period']==period),None)} for t in members]
  eligible=[r for r in observations if r['value'] is not None];values=[r['value'] for r in eligible]
  cells.append({'period':period,'median':quantile(values,.5) if values else None,'q25':quantile(values,.25) if values else None,'q75':quantile(values,.75) if values else None,'coverage':len(values),'count':len(members),'observations':eligible})
 groups.append({'name':group['name'],'kind':group['kind'],'members':members,'cells':cells})
metadata['ratingAsOf']=spreads['metadata']['ratingAsOf']
metadata['groupMethod']='Same sector/rating memberships as CDS charts, restricted to matched financial issuers. Latest ratings applied retrospectively. Each period uses available same-period leverage without forward-fill; coverage can vary. Bands are cross-sectional 25th–75th percentiles, not confidence intervals.'
(root/'app/value-chain-financials.ts').write_text('export const valueChainFinancials = '+json.dumps({**metadata,'companies':latest},indent=2)+' as const;\n')
(root/'app/credit-financial-history.ts').write_text('export const creditFinancialHistory = '+json.dumps({'metadata':metadata,'companies':latest,'history':history,'credit':daily,'groups':groups},separators=(',',':'))+' as const;\n')
print(json.dumps({'companies':len(latest),'matchedCDS':len(daily),'MSFT':latest['MSFT']},indent=2))
