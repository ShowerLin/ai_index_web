"""Matched four-company quarterly net capacity additions per compute-equipment CapEx."""
import csv,json
from pathlib import Path
root=Path(__file__).resolve().parents[1];base=Path('/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_Index')
s=(root/'app/infrastructure-snapshot.ts').read_text();infra=json.loads(s[s.index('{'):s.rindex(' as const')]);fac={r['quarter']:r['owners'] for r in infra['deploymentHistory']}
companies=['Microsoft','Alphabet','Meta','Amazon'];raw=list(csv.DictReader((base/'epoch_ai/ai_chip_owners/chip_financial_alignment.csv').open()));rows=[]
for q in sorted({r['quarter'] for r in raw if r['quarter']>='2024Q4'}):
 rs=[r for r in raw if r['quarter']==q and r['Company'] in companies]
 if len(rs)!=4 or any(not r['compute_capex'] or not r['h100e_add_m'] for r in rs):continue
 year,n=int(q[:4]),int(q[-1]);prior=f'{year if n>1 else year-1}Q{n-1 if n>1 else 4}'
 capex=sum(float(r['compute_capex']) for r in rs);compute=sum(float(r['h100e_add_m']) for r in rs)*1e6
 mw=sum(fac[q][c]-fac[prior][c] for c in companies) if q in fac and prior in fac else None
 rows.append(dict(quarter=q,capex=capex,h100eAdded=compute,itMwAdded=mw,computeYield=None if q=="2026Q1" else compute/(capex*1000),capacityYield=None if mw is None else mw/capex,flag=compute<0))
(root/'app/capacity-yields-snapshot.ts').write_text('export const capacityYields = '+json.dumps(rows,indent=2)+' as const;\n');print(rows)
