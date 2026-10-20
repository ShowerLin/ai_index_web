"""Find the synced data folder without a machine-specific checked-in path."""
import os,runpy,sys
from pathlib import Path
def data_root():
 if os.environ.get('AI_INDEX_DATA_ROOT'):
  p=Path(os.environ['AI_INDEX_DATA_ROOT']).expanduser().resolve()
  if not (p/'pipeline/run.py').is_file():raise FileNotFoundError('AI_INDEX_DATA_ROOT has no pipeline/run.py')
  return p
 candidates=[Path(os.environ[k])/'AI_Index' for k in ['OneDrive','OneDriveConsumer','OneDriveCommercial'] if os.environ.get(k)]
 candidates += [Path.home()/'OneDrive/AI_Index',Path.home()/'Library/CloudStorage/OneDrive-Personal/AI_Index']
 found=list(dict.fromkeys(p.resolve() for p in candidates if (p/'pipeline/run.py').is_file()))
 if len(found)!=1:raise RuntimeError('Set AI_INDEX_DATA_ROOT to the synced AI_Index folder on this computer')
 return found[0]
def dispatch(name,namespace):
 root=data_root();os.environ['AI_INDEX_DATA_ROOT']=str(root)
 folder=root/'pipeline/builders';sys.path.insert(0,str(folder))
 namespace.update(runpy.run_path(str(folder/name),run_name=namespace.get('__name__','__main__')))
