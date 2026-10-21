"""Portable refresh entrypoint. Build saved inputs separately from collection and sync."""
import argparse,datetime,hashlib,json,os,shutil,subprocess,sys
from pathlib import Path
from export_bloomberg import export
from validate import validate

ROOT=Path(os.environ.get('AI_INDEX_DATA_ROOT',Path(__file__).resolve().parents[1])).expanduser().resolve()
BUILDERS=Path(__file__).resolve().parent/'builders'
DERIVED=ROOT/'data/derived'
INDEX_PRICE=['build-index-price.py','build-workbook-amendments.py','build-monthly-heatmap.py','update-demand-core.py','integrate-ramp-core.py','integrate-token-core.py','build-adoption.py','build-affordability.py','build-spending.py','build-core-projection.py','build-projected-buildout.py']
GROUPS={
 'index-price':INDEX_PRICE,
 'bloomberg':['build-index-price.py','build-workbook-amendments.py','build-value-chain-financials.py','build-supply-chain-stock.py','build-chain-economics.py','extract-sustainability.py','extract-roic.py','build-monthly-heatmap.py',*INDEX_PRICE[3:]],
 'ramp':INDEX_PRICE,
 'tokens':['refresh-openrouter.py',*INDEX_PRICE],
 'task':['build-task-economics-snapshot.py','build-useful-task-snapshot.py'],
 'infrastructure':['build-infrastructure-snapshot.py','build-capacity-yields.py','build-electricity-capacity.py','build-projected-buildout.py'],
 'labs':['build-frontier-labs-snapshot.py'],
 'cloud':['build-cloud-reference.py'],
 'core':INDEX_PRICE,
 'projection':['build-core-projection.py','build-projected-buildout.py'],
}
COLLECTORS={'ramp':'fetch-ramp.py','openrouter':'refresh-openrouter.py','epoch':'download-epoch-datasets.py','pricing':'download-epoch-model-pricing.py','swebench':'download-swebench-results.py'}
stamp=lambda:datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def dump(path,obj):path.write_text(json.dumps(obj,indent=2)+'\n',encoding='utf-8')
def input_hashes(source_ids=None):
 registry=json.loads((ROOT/'data/source_registry.json').read_text(encoding='utf-8'));files=set()
 for row in registry['sources']:
  if source_ids is not None and row['id'] not in source_ids:continue
  for relative in row['paths']:
   p=ROOT/relative
   files.update([p] if p.is_file() else (q for q in p.rglob('*') if q.is_file() and 'archive' not in q.parts and '__pycache__' not in q.parts))
 return {p.relative_to(ROOT).as_posix():sha(p) for p in sorted(files)}
def invoke(script,args,build,log,data_root=ROOT,timeout=None):
 env=dict(os.environ,AI_INDEX_DATA_ROOT=str(data_root),AI_INDEX_BUILD_ROOT=str(build),PYTHONUTF8='1',PYTHONUNBUFFERED='1')
 print(f'Running {script}; log: {log}',flush=True)
 with log.open('w',encoding='utf-8') as output:
  completed=subprocess.run([sys.executable,str(BUILDERS/script),*map(str,args)],env=env,cwd=ROOT,stdout=output,stderr=subprocess.STDOUT,timeout=timeout)
 if completed.returncode:
  raise RuntimeError(f'{script} failed. See {log}\n'+log.read_text(encoding='utf-8')[-3500:])
 print('Completed '+script,flush=True)

def build(group):
 run=ROOT/'data/runs'/stamp();run.mkdir(parents=True)
 staging=run/'build';(staging/'app').mkdir(parents=True)
 for p in (DERIVED/'app').glob('*.ts'):shutil.copy2(p,staging/'app'/p.name)
 shutil.copytree(ROOT/'data/reference',staging/'data')
 inspection=staging/'bloomberg.inspect.ndjson';export(ROOT/'Indexlist.xlsx',inspection)
 selected=list(dict.fromkeys(s for g in (list(GROUPS) if group=='all' else [group]) for s in GROUPS[g]))
 # The v2.2 -> v2.3 -> v2.4 core chain must run last, in that order.
 if group=='all':
  selected=[s for s in selected if s not in INDEX_PRICE]+INDEX_PRICE
 try:
  for script in selected:
   args=[]
   if script=='build-workbook-amendments.py':args=['--input',ROOT/'Indexlist.xlsx']
   elif script=='build-monthly-heatmap.py':args=['--input',inspection]
   elif script=='refresh-openrouter.py':args=['--cached']
   invoke(script,args,staging,run/(script+'.log'))
  files=list((staging/'app').glob('*.ts'))
  for file in files:
   if (DERIVED/'app'/file.name).exists() and sha(file)==sha(DERIVED/'app'/file.name):continue
   text=file.read_text(encoding='utf-8');payload=json.JSONDecoder().raw_decode(text.split(' = ',1)[1].lstrip())[0]
   assert isinstance(payload,(dict,list)),file
  changed=[p.name for p in files if not (DERIVED/'app'/p.name).exists() or sha(p)!=sha(DERIVED/'app'/p.name)]
  checks=validate(ROOT,staging)
  report={'status':'success','group':group,'builtAtUtc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'workbookSha256':sha(ROOT/'Indexlist.xlsx'),'scripts':selected,'changedOutputs':changed,'outputHashes':{p.name:sha(p) for p in files},'sourceRegistry':'data/source_registry.json','note':'Saved-input rebuild; source observation dates are not refreshed by this command.'}
  report['validation']=checks
  # A focused rebuild must not hydrate unrelated OneDrive-only archives merely
  # to hash them. These groups read the same explicitly listed source families.
  source_ids=['bloomberg','index-price-monthly','adoption-price','ramp','openrouter','core-reference','capex','epoch-projected-buildout'] if group in ('index-price','core','bloomberg','ramp','tokens') else None
  report['inputSourceIds']=source_ids
  report['inputHashes']=input_hashes(source_ids)
  report['builderHashes']={s:sha(BUILDERS/s) for s in selected}
  if 'build-spending.py' in selected:report['builderHashes']['spending.py']=sha(BUILDERS/'spending.py')
  if 'build-affordability.py' in selected:report['builderHashes']['affordability.py']=sha(BUILDERS/'affordability.py')
  if any(s in selected for s in ('build-index-price.py','build-workbook-amendments.py','build-monthly-heatmap.py','update-demand-core.py')):
   report['builderHashes']['index_price.py']=sha(BUILDERS/'index_price.py')
   report['pipelineHashes']={s:sha(Path(__file__).parent/s) for s in ('run.py','export_bloomberg.py','validate.py')}
  for file in files:
   temp=DERIVED/'app'/(file.name+'.tmp');shutil.copyfile(file,temp);temp.replace(DERIVED/'app'/file.name)
  if (staging/'audits').exists():shutil.copytree(staging/'audits',DERIVED/'audits',dirs_exist_ok=True)
  shutil.copyfile(inspection,DERIVED/'bloomberg.inspect.ndjson')
  dump(run/'result.json',report);dump(DERIVED/'build-manifest.json',report)
  print(json.dumps({'status':'success','changedOutputs':changed,'run':str(run)},indent=2))
 except (Exception, KeyboardInterrupt) as exc:
  dump(run/'result.json',{'status':'failed','error':str(exc),'promoted':False});raise

def sync(web):
 web=Path(web).expanduser().resolve()
 if not (web/'package.json').is_file() or not (web/'app/page.tsx').is_file():raise ValueError('Not an existing AI Index website checkout')
 backup=ROOT/'backups'/('website-sync-'+stamp());backup.mkdir(parents=True)
 allowed=set(json.loads((ROOT/'data/generated_files.json').read_text(encoding='utf-8')))
 pairs=[(p,web/'app'/p.name) for p in (DERIVED/'app').glob('*.ts') if p.name in allowed]
 pairs.append((ROOT/'data/research/financing/circular-financing.json',web/'data/circular-financing.json'))
 installed=[]
 for source,target in pairs:
  if target.exists() and (sha(source)==sha(target) or source.read_text(encoding='utf-8')==target.read_text(encoding='utf-8')):continue
  if target.exists():
   saved=backup/target.relative_to(web);saved.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(target,saved)
  # OneDrive can expose source files as executable on macOS. Preserve website
  # permissions rather than copying that unrelated filesystem metadata.
  target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,target);installed.append(str(target.relative_to(web)))
 dump(backup/'sync.json',{'installed':installed,'webRoot':str(web)})
 print(json.dumps({'installed':installed,'backup':str(backup)},indent=2))

def collect(source_name,cached=False,timeout=180):
 if cached and source_name not in ('ramp','openrouter'):raise ValueError('--cached supports Ramp and OpenRouter only')
 run=ROOT/'data/runs'/stamp();run.mkdir(parents=True)
 paths={'ramp':['data/raw/ramp'],'openrouter':['data/raw/openrouter'],'epoch':['epoch_ai/ml_models','epoch_ai/chip_dataset','epoch_ai/benchmark_data'],'pricing':['epoch_ai/model_pricing'],'swebench':['swe_bench']}[source_name]
 candidate=run/'candidate';candidate.mkdir();shutil.copy2(ROOT/'Indexlist.xlsx',candidate/'Indexlist.xlsx')
 for relative in paths:
  source=ROOT/relative;target=candidate/relative;target.parent.mkdir(parents=True,exist_ok=True)
  if source.exists():shutil.copytree(source,target,ignore=shutil.ignore_patterns('archive'))
 try:
  invoke(COLLECTORS[source_name],['--cached'] if cached else [],candidate/'data/derived',run/'collection.log',candidate,timeout=timeout)
 except (Exception,KeyboardInterrupt) as exc:
  dump(run/'result.json',{'status':'failed','source':source_name,'errorType':type(exc).__name__,'log':str(run/'collection.log'),'promotedFiles':[]})
  if isinstance(exc,subprocess.TimeoutExpired):
   raise TimeoutError(f'{source_name} exceeded {timeout}s. No files promoted. Log: {run/"collection.log"}') from exc
  raise
 promoted=[]
 for relative in paths:
  for source in (candidate/relative).rglob('*'):
   if not source.is_file():continue
   target=ROOT/source.relative_to(candidate)
   if target.exists() and sha(target)==sha(source):continue
   if target.exists():
    backup=run/'before'/source.relative_to(candidate);backup.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(target,backup)
   target.parent.mkdir(parents=True,exist_ok=True);temporary=target.with_suffix(target.suffix+'.tmp');shutil.copyfile(source,temporary);temporary.replace(target);promoted.append(str(source.relative_to(candidate)))
 dump(run/'result.json',{'status':'success','source':source_name,'cached':cached,'promotedFiles':promoted,'note':'Collection is separate from build and website sync.'})

def main():
 p=argparse.ArgumentParser(description=__doc__);sub=p.add_subparsers(dest='command',required=True)
 sub.add_parser('status')
 from refresh import configure, execute
 configure(sub.add_parser('refresh'))
 b=sub.add_parser('build');b.add_argument('--group',choices=['all',*GROUPS],default='all')
 c=sub.add_parser('collect');c.add_argument('source',choices=COLLECTORS);c.add_argument('--cached',action='store_true')
 s=sub.add_parser('sync');s.add_argument('--web-root',required=True)
 args=p.parse_args()
 if args.command=='refresh' and args.dry_run:
  execute(args);return
 if args.command=='status':
  registry=json.loads((ROOT/'data/source_registry.json').read_text(encoding='utf-8'))
  for row in registry['sources']:print(row['id'],row['update_method'],all((ROOT/v).exists() for v in row['paths']))
  return
 lock=ROOT/'data/.pipeline-lock'
 try:lock.mkdir()
 except FileExistsError:raise SystemExit('Pipeline lock exists. Finish the other run before proceeding. See documentation for interrupted runs.')
 try:
  if args.command=='refresh':execute(args)
  elif args.command=='build':build(args.group)
  elif args.command=='sync':sync(args.web_root)
  else:
   collect(args.source,args.cached)
 finally:lock.rmdir()

if __name__=='__main__':main()
