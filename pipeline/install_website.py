"""Install lightweight data entrypoints into an existing local website checkout."""
import argparse,json,shutil,datetime
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def main():
 p=argparse.ArgumentParser();p.add_argument('--web-root',type=Path,required=True);args=p.parse_args()
 web=args.web_root.expanduser().resolve()
 if not (web/'app/page.tsx').exists() or not (web/'package.json').exists():raise ValueError('Expected existing AI Index website checkout')
 backup=ROOT/'backups'/('adapter-install-'+datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ'));backup.mkdir(parents=True)
 shutil.copy2(web/'package.json',backup/'package.json')
 if (web/'scripts').exists():shutil.copytree(web/'scripts',backup/'scripts')
 else:(web/'scripts').mkdir()
 for source in (ROOT/'pipeline/website-adapters').iterdir():
  if source.is_file():
   destination=web/('app' if source.suffix in ('.tsx','.css') else 'scripts')/source.name
   if destination.exists():
    saved=backup/destination.relative_to(web);saved.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(destination,saved)
   shutil.copy2(source,destination)
 for source in (ROOT/'pipeline/builders').glob('*.py'):
  if source.name=='paths.py':continue
  (web/'scripts'/source.name).write_text('from _shared_pipeline import dispatch\ndispatch('+repr(source.name)+', globals())\n',encoding='utf-8')
 (web/'scripts/integrate-openrouter.py').write_text('raise SystemExit("Retired workbook route: use data-pipeline.py collect openrouter, then build --group tokens.")\n',encoding='utf-8')
 (web/'scripts/integrate-ai-company-revenue.mjs').write_text('throw new Error("Retired workbook route: use the shared pipeline/research.py lab CSV importer.");\n',encoding='utf-8')
 package=json.loads((web/'package.json').read_text(encoding='utf-8'))
 commands={'data:refresh':'refresh --web-root .','data:index-price':'build --group index-price','data:build':'build --group all','data:status':'status','data:sync':'sync --web-root .','data:infrastructure':'build --group infrastructure','data:frontier-labs':'build --group labs','data:task-economics':'build --group task','data:useful-task':'build --group task','data:epoch-pricing':'collect pricing','data:swebench':'collect swebench'}
 for k,v in commands.items():package['scripts'][k]='node scripts/data-pipeline.mjs '+v
 (web/'package.json').write_text(json.dumps(package,indent=2)+'\n',encoding='utf-8')
 print('Installed adapters; set AI_INDEX_DATA_ROOT on this computer if automatic OneDrive discovery is ambiguous.')

if __name__=='__main__':main()
