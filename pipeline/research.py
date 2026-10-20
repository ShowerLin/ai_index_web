"""Collect source documents and import reviewed lab observations into standalone CSV.

Capture does not turn a webpage into an accepted data point. Reviewed CSV records
must retain source URLs, dates and metric definitions before explicit acceptance.
"""
import argparse,csv,datetime,hashlib,json,os,shutil,urllib.request,urllib.parse
from pathlib import Path
ROOT=Path(os.environ.get('AI_INDEX_DATA_ROOT',Path(__file__).resolve().parents[1])).expanduser().resolve()
def main():
 p=argparse.ArgumentParser(description=__doc__);sub=p.add_subparsers(dest='command',required=True)
 c=sub.add_parser('capture');c.add_argument('--url',required=True);c.add_argument('--title',required=True)
 i=sub.add_parser('import-labs');i.add_argument('--input',type=Path,required=True);i.add_argument('--accept',action='store_true')
 args=p.parse_args();stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
 if args.command=='capture':
  if urllib.parse.urlparse(args.url).scheme not in ('https','http'):raise ValueError('Expected a public HTTP(S) source URL')
  request=urllib.request.Request(args.url,headers={'User-Agent':'AI-Index-research/1.0'})
  with urllib.request.urlopen(request,timeout=45) as response:body=response.read();content_type=response.headers.get('Content-Type','');final_url=response.url
  folder=ROOT/'data/research/news/sources'/stamp;folder.mkdir(parents=True)
  (folder/'source.bin').write_bytes(body)
  (folder/'metadata.json').write_text(json.dumps({'url':args.url,'finalUrl':final_url,'title':args.title,'retrievedUtc':stamp,'contentType':content_type,'sha256':hashlib.sha256(body).hexdigest(),'reviewStatus':'unreviewed'},indent=2),encoding='utf-8')
  print(folder);return
 target=ROOT/'epoch_ai/ai_companies/ai_companies_revenue_reports.csv'
 with target.open(encoding='utf-8-sig',newline='') as f:reader=csv.DictReader(f);fields=reader.fieldnames;existing=list(reader)
 with args.input.open(encoding='utf-8-sig',newline='') as f:
  reader=csv.DictReader(f)
  if reader.fieldnames!=fields:raise ValueError('Candidate must use the existing revenue CSV headers in the same order')
  rows=list(reader)
 if not rows:raise ValueError('Candidate has no observations')
 for row in rows:
  for field in ['Company','Date','Report date','Scope','Source 1']:
   if not row[field]:raise ValueError('Missing '+field)
  for field in ['Date','Report date']:datetime.date.fromisoformat(row[field])
  if urllib.parse.urlparse(row['Source 1']).scheme not in ('http','https'):raise ValueError('Source 1 must be a source URL')
  if not row['Period revenue'] and not row['Annualized revenue (USD)']:raise ValueError('Missing observed revenue value')
  if row['Annualized revenue (USD)'] and not row['Annualized revenue type']:raise ValueError('Specify ARR versus annualized run rate')
 keys=lambda r:(r['Company'],r['Date'],r['Report date'],r['Scope'],r['Period type'],r['Annualized revenue type'])
 prior={keys(r):r for r in existing}
 for r in rows:
  if keys(r) in prior and prior[keys(r)]!=r:raise ValueError('Conflicting existing observation; reconcile the disclosure explicitly before importing')
  prior[keys(r)]=r
 print(json.dumps({'candidateRows':len(rows),'newRows':len(prior)-len(existing),'accepted':args.accept}))
 if not args.accept:return
 archive=ROOT/'data/research/news/accepted'/stamp;archive.mkdir(parents=True)
 shutil.copy2(target,archive/'revenue-before.csv');shutil.copy2(args.input,archive/'reviewed-input.csv')
 temp=target.with_suffix('.tmp')
 with temp.open('w',encoding='utf-8-sig',newline='') as f:writer=csv.DictWriter(f,fieldnames=fields);writer.writeheader();writer.writerows(prior.values())
 temp.replace(target)

if __name__=='__main__':main()
