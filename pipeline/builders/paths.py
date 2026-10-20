"""Portable data roots. No machine-specific paths or credentials are stored here."""
import os, shutil
from pathlib import Path

DATA_ROOT=Path(os.environ.get('AI_INDEX_DATA_ROOT',Path(__file__).resolve().parents[2])).expanduser().resolve()
if not (DATA_ROOT/'Indexlist.xlsx').is_file():
 raise FileNotFoundError(f'AI_INDEX_DATA_ROOT must contain Indexlist.xlsx: {DATA_ROOT}')
BUILD_ROOT=Path(os.environ.get('AI_INDEX_BUILD_ROOT',DATA_ROOT/'data/derived')).expanduser().resolve()
(BUILD_ROOT/'app').mkdir(parents=True,exist_ok=True)
REFERENCE=BUILD_ROOT/'data'
REFERENCE.mkdir(parents=True,exist_ok=True)
for source in (DATA_ROOT/'data/reference').glob('core-v*.ts'):
 if not (REFERENCE/source.name).exists():shutil.copy2(source,REFERENCE/source.name)
RAMP=DATA_ROOT/'data/raw/ramp/latest'
OPENROUTER=DATA_ROOT/'data/raw/openrouter/rankings-daily.json'
FINANCING=DATA_ROOT/'data/research/financing'
