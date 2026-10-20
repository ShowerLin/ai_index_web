"""Resolve supplemental public releases and the EIA six-month-file catalogue."""
import sys, json
from .acquire import ROOT, capture

run=sys.argv[1]
jobs=[
 ('EIA_GRID','https://www.eia.gov/electricity/gridmonitor/sixMonthFiles/EIA930_File_List_Meta.csv','catalog.csv'),
 ('JLL','https://www.jll.com/en-us/newsroom/data-center-demand-exceeds-expectations-in-h1-2026','h1-2026.html'),
 ('JLL','https://www.jll.com/en-us/newsroom/jll-north-america-data-center-report-year-end-2025','h2-2025.html'),
 ('PJM','https://insidelines.pjm.com/pjms-updated-20-year-forecast-continues-to-see-significant-long-term-load-growth/','2026-summary.html'),
 ('PJM','https://www.pjm.com/-/media/DotCom/library/reports-notices/load-forecast/2024-load-report.ashx','2024.ashx.pdf'),
]
for source,url,name in jobs:
 try:
  p=capture(source,url,run,name);print(name,p.stat().st_size,flush=True)
 except Exception as exc: print(name,str(exc)[:120],flush=True)
