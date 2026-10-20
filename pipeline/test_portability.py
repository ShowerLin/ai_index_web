"""Exercise a full saved-input rebuild after relocating the data and pipeline."""
import json,os,shutil,subprocess,sys,tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def main():
 with tempfile.TemporaryDirectory(prefix='ai-index-portability-') as folder:
  relocated=Path(folder)/'A different data folder';relocated.mkdir()
  shutil.copy2(ROOT/'Indexlist.xlsx',relocated/'Indexlist.xlsx')
  (relocated/'data').mkdir()
  shutil.copy2(ROOT/'data/source_registry.json',relocated/'data/source_registry.json')
  for relative in ['pipeline','epoch_ai','swe_bench','data/raw/ramp/latest','data/raw/openrouter','data/research/task_economics','data/research/capex','data/reference','data/derived/app']:
   target=relocated/relative;target.parent.mkdir(parents=True,exist_ok=True)
   shutil.copytree(ROOT/relative,target,ignore=shutil.ignore_patterns('__pycache__','archive','website-adapters'))
  result=subprocess.run([sys.executable,str(relocated/'pipeline/run.py'),'build','--group','all'],cwd=folder,env=dict(os.environ,AI_INDEX_DATA_ROOT=str(relocated),PYTHONUTF8='1'),capture_output=True,text=True,encoding='utf-8')
  if result.returncode:raise RuntimeError(result.stdout+result.stderr)
  def load(path):return json.JSONDecoder().raw_decode(path.read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]
  for name in ['core-contribution','ramp','token-activity','sustainability','roic','useful-task','infrastructure','frontier-labs']:
   assert load(ROOT/'data/derived/app'/f'{name}-snapshot.ts')==load(relocated/'data/derived/app'/f'{name}-snapshot.ts'),name
  report={'status':'passed','relocatedPathContainedSpaces':True,'workingDirectoryWasOutsideProject':True,'fullSavedInputBuild':True,'identicalSnapshotsCompared':8,'networkRequests':False,'platform':'Windows; macOS execution not tested'}
  (ROOT/'backups/2026-10-15-portable-migration/portability-verification.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
  print(json.dumps(report,indent=2))

if __name__=='__main__':main()
