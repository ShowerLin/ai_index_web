#!/usr/bin/env python3
"""Lossless CSV exchange for the financing graph; import creates a candidate only."""
import argparse,csv,json,subprocess,tempfile
from datetime import date
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
FIELDS={
 'dataset':['schema_version','dataset_id','information_cutoff','updated_at','currency','amount_unit'],
 'companies':['company_id','company_name','primary_role','description','layout_side','layout_y','entity_type','roles','ticker'],
 'sources':['source_id','original_url','publisher','article_title','publication_date','reviewed_through','source_type','full_text_archived'],
 'flows':['flow_id','loop_id','from_company_id','to_company_id','flow_type','description','amount_usd_billions','amount_bound','status','timing_description','balance_as_of','announced_date','effective_date','period_start','period_end','duration_years','measurement_basis','duration_basis','news_brief','source_ids','review_status','supersedes_flow_ids','overlap_group','overlap_status','reconciliation_notes']}
def write_csv(path,kind,rows):
 with path.open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=FIELDS[kind]);w.writeheader();w.writerows(rows)
def read_csv(folder,kind):
 path=folder/(kind+'.csv')
 with path.open(encoding='utf-8-sig',newline='') as f:
  r=csv.DictReader(f)
  if not r.fieldnames or len(r.fieldnames)!=len(set(r.fieldnames)):raise ValueError(f'{path}: missing or duplicate headers')
  missing=set(FIELDS[kind])-set(r.fieldnames);extra=set(r.fieldnames)-set(FIELDS[kind])
  if missing or extra:raise ValueError(f'{path}: missing columns {sorted(missing)}; unexpected columns {sorted(extra)}')
  rows=[]
  for line,row in enumerate(r,2):
   if None in row or any(v is None for v in row.values()):raise ValueError(f'{path}:{line}: wrong number of fields')
   if not any(v.strip() for v in row.values()):continue
   cleaned={k:v.strip() for k,v in row.items()}
   required={'dataset':FIELDS['dataset'],'companies':['company_id','company_name','primary_role','description','layout_side'],'sources':['source_id','original_url','publisher','reviewed_through','source_type','full_text_archived'],'flows':['flow_id','from_company_id','to_company_id','flow_type','description','amount_bound','status','timing_description','measurement_basis','news_brief','source_ids']}[kind]
   for key in required:
    if not cleaned[key]:raise ValueError(f'{path}:{line}: {key} is required')
   for key in ['information_cutoff','updated_at','publication_date','reviewed_through','balance_as_of','announced_date','effective_date','period_start','period_end']:
    if cleaned.get(key):
     try:
      if date.fromisoformat(cleaned[key]).isoformat()!=cleaned[key]:raise ValueError()
     except ValueError:raise ValueError(f'{path}:{line}: {key} must be a valid YYYY-MM-DD date')
   rows.append(cleaned)
  return rows
def split(v):return [s.strip() for s in v.split(';') if s.strip()]
def nullable(v):return v or None
def numeric(v,field,default=None):
 if v=='':return default
 try:return float(v)
 except ValueError:raise ValueError(f'{field}: expected a plain number, got {v!r}')
def export(source,folder):
 d=json.loads(source.read_text());folder.mkdir(parents=True,exist_ok=True)
 write_csv(folder/'dataset.csv','dataset',[dict(zip(FIELDS['dataset'],[d[k] for k in ['schemaVersion','datasetId','informationCutoff','updatedAt','currency','amountUnit']]))])
 write_csv(folder/'companies.csv','companies',[dict(zip(FIELDS['companies'],[n['id'],n['name'],n['role'],n['label'],'supplier' if n['x']==50 else 'customer',n['y'],n['entityType'],';'.join(n['roles']),n['ticker']])) for n in d['nodes']])
 write_csv(folder/'sources.csv','sources',[dict(zip(FIELDS['sources'],[s['id'],s['url'],s['publisher'],s['title'],s['publishedAt'],s['reviewedThrough'],s['sourceType'],'yes' if s['archivedFullText'] else 'no'])) for s in d['sources']])
 rows=[]
 for f in d['flows']:
  a,t,r=f['amount'],f['time'],f['reconciliation']
  rows.append(dict(zip(FIELDS['flows'],[f['id'],f['loopId'],f['from'],f['to'],f['kind'],f['label'],a['value'],a['bound'],f['status'],t['label'],t['asOf'],t['announcedAt'],t['effectiveAt'],t['periodStart'],t['periodEnd'],t['durationYears'],t['basis'],t['durationBasis'],f['newsBrief'],';'.join(f['sourceIds']),r['status'],';'.join(r['supersedes']),r['overlapGroup'],r['overlapStatus'],r['notes']])))
 write_csv(folder/'flows.csv','flows',rows)
 print(f'Exported editable CSVs to {folder}')
def import_csv(folder,output,node):
 if output.resolve()==(ROOT/'data/circular-financing.json').resolve():raise ValueError('Import must create a candidate; overwriting the live baseline is not allowed.')
 if output.exists():raise ValueError(f'Output already exists: {output}. Choose a new candidate filename.')
 meta=read_csv(folder,'dataset')
 if len(meta)!=1:raise ValueError('dataset.csv must contain exactly one metadata row')
 m=meta[0];d=dict(zip(['schemaVersion','datasetId','informationCutoff','updatedAt','currency','amountUnit'],[m[k] for k in FIELDS['dataset']]))
 d['nodes']=[]
 for i,r in enumerate(read_csv(folder,'companies')):
  if r['layout_side'] not in ['supplier','customer']:raise ValueError(f"{r['company_id']}: layout_side must be supplier or customer")
  d['nodes'].append(dict(id=r['company_id'],name=r['company_name'],role=r['primary_role'],label=r['description'],x=50 if r['layout_side']=='supplier' else 850,y=numeric(r['layout_y'],'layout_y',110+i*180),entityType=r['entity_type'] or 'company',roles=split(r['roles']) or [r['primary_role']],ticker=nullable(r['ticker'])))
 d['sources']=[]
 for r in read_csv(folder,'sources'):
  if r['full_text_archived'].lower() not in ['yes','no','true','false']:raise ValueError('full_text_archived must be yes or no')
  d['sources'].append(dict(id=r['source_id'],url=r['original_url'],publisher=r['publisher'],title=nullable(r['article_title']),publishedAt=nullable(r['publication_date']),reviewedThrough=r['reviewed_through'],sourceType=r['source_type'],archivedFullText=r['full_text_archived'].lower() in ['yes','true']))
 d['flows']=[]
 for r in read_csv(folder,'flows'):
  d['flows'].append(dict(id=r['flow_id'],loopId=r['loop_id'] or f"{r['from_company_id']}-{r['to_company_id']}",**{'from':r['from_company_id'],'to':r['to_company_id']},kind=r['flow_type'],label=r['description'],amount=dict(value=numeric(r['amount_usd_billions'],'amount_usd_billions'),currency=m['currency'],unit=m['amount_unit'],bound=r['amount_bound']),status=r['status'],time=dict(label=r['timing_description'],asOf=nullable(r['balance_as_of']),announcedAt=nullable(r['announced_date']),effectiveAt=nullable(r['effective_date']),periodStart=nullable(r['period_start']),periodEnd=nullable(r['period_end']),durationYears=numeric(r['duration_years'],'duration_years'),basis=r['measurement_basis'],durationBasis=nullable(r['duration_basis'])),newsBrief=r['news_brief'],sourceIds=split(r['source_ids']),reconciliation=dict(status=r['review_status'] or 'proposed',supersedes=split(r['supersedes_flow_ids']),overlapGroup=nullable(r['overlap_group']),overlapStatus=r['overlap_status'] or 'not_assessed',notes=nullable(r['reconciliation_notes']))))
 # Validate before emitting the candidate; failures never change the baseline.
 with tempfile.TemporaryDirectory(prefix='financing-csv-') as temp:
  staging=Path(temp)/'candidate.json';staging.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
  subprocess.run([node,str(ROOT/'scripts/validate-financing-data.mjs'),str(staging)],check=True,cwd=ROOT)
  output.parent.mkdir(parents=True,exist_ok=True)
  with output.open('x',encoding='utf-8') as f:f.write(staging.read_text())
 print(f'Created validated candidate: {output}; live JSON unchanged.')
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('mode',choices=['export','import']);p.add_argument('--folder',type=Path,default=ROOT/'data/financing-csv');p.add_argument('--json',type=Path,help='Export input or import candidate output');p.add_argument('--node',default='node');args=p.parse_args()
 target=args.json or ROOT/('data/circular-financing.json' if args.mode=='export' else 'data/circular-financing.candidate.json')
 try:
  if args.mode=='export':export(target,args.folder)
  else:import_csv(args.folder,target,args.node)
 except (ValueError,subprocess.CalledProcessError,FileNotFoundError) as e:p.exit(1,f'Error: {e}\n')
if __name__=='__main__':main()
