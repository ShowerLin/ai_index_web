"""Additional discovered file endpoints; failures remain visible."""
import datetime as dt
import json
from .acquire import ROOT, capture

def collect(run):
    jobs = [
      ('EIA_OUTLOOK','https://www.eia.gov/outlooks/aeo/excel/aeotab8.xlsx','aeotab8.xlsx'),
      ('EIA_OUTLOOK','https://www.eia.gov/outlooks/aeo/excel/aeotab5.xlsx','aeotab5.xlsx'),
      ('EIA_OUTLOOK','https://www.eia.gov/outlooks/steo/archives/2025/oct25.xlsx','STEO_oct25.xlsx'),
      ('PJM','https://www.pjm.com/-/media/DotCom/planning/res-adeq/load-forecast/2026-load-report-tables.xlsx','2026-load-report-tables.xlsx'),
      ('PJM','https://www.pjm.com/-/media/DotCom/library/reports-notices/load-forecast/2025-load-report-tables.xlsx','2025-load-report-tables.xlsx'),
      ('PJM','https://www.pjm.com/-/media/DotCom/library/reports-notices/load-forecast/2024-load-report-data.xlsx','2024-load-report-data.xlsx'),
    ]
    folder=ROOT/'data/runs'/run/'electricity';folder.mkdir(parents=True,exist_ok=True)
    gaps=json.loads((folder/'acquisition_gaps.json').read_text()) if (folder/'acquisition_gaps.json').exists() else []
    for source,url,name in jobs:
      try:
        p=capture(source,url,run,name);print(p.name,p.stat().st_size,flush=True)
      except Exception as exc:
        print(name,str(exc)[:100],flush=True)
        gaps.append(dict(source_id=source,requested_field=name,reason=str(exc),attempted_url=url,attempted_at=dt.datetime.now(dt.timezone.utc).isoformat(),impact='Missing supporting history',fallback='Published public summaries',resolution_status='open'))
    (folder/'acquisition_gaps.json').write_text(json.dumps(gaps,indent=2),encoding='utf-8')
if __name__=='__main__':
    import sys
    collect(sys.argv[1])
