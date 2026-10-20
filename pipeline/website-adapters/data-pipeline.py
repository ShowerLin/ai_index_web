from _shared_pipeline import data_root
import os,subprocess,sys
root=data_root()
raise SystemExit(subprocess.call([sys.executable,str(root/"pipeline/run.py"),*sys.argv[1:]],env=dict(os.environ,PYTHONUTF8="1")))
