"""Validate source separation and the generated datasets before promotion."""
import csv,json,math,zipfile,xml.etree.ElementTree as E
from pathlib import Path

def load_ts(path):return json.JSONDecoder().raw_decode(Path(path).read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]
def validate(root,build):
 with zipfile.ZipFile(root/'Indexlist.xlsx') as z:
  names=[x.get('name') for x in E.fromstring(z.read('xl/workbook.xml')).find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheets')]
 required={'Indexlist','Index Price Value','Index Price Formula','AI 5yrCDS Value','AI 5yrCDS Formula','AI CDS Issuer Rating','Bond Issuance Value','Bond Issuance Formula','Supply Chain Financial Value','Supply Chain Financial Formula','Supply Chain Stock Value','Supply Chain Stock Formula','Hyperscaler Core Data Value','Hyperscaler Core Data Formula'}
 assert required.issubset(names) and len(names)==len(set(names)) and not set(names)&{'Ramp AI Data','Cost Useful Task','OpenAI','Anthropic'},names
 assert ('Cloud FA Value' in names)==('Cloud FA Formula' in names),names
 ramp=json.loads((root/'data/raw/ramp/latest/normalized.json').read_text(encoding='utf-8'))
 dates=[r[0] for r in ramp['monthly']]
 assert dates==sorted(set(dates)) and all(0<=r[1]<=1 for r in ramp['monthly'])
 with (root/'data/research/task_economics/observations.csv').open(encoding='utf-8-sig') as f:assert len(list(csv.DictReader(f)))>0
 for name in ['sustainability','roic']:
  data=load_ts(build/'app'/f'{name}-snapshot.ts')
  assert len(data['companies'])==5
  for c in data['companies']:
   assert len(c['quarters'])>=8,(name,c['ticker'],'insufficient quarter history')
   periods=[r['period'] for r in c['quarters']]
   assert periods==sorted(set(periods)),(name,c['ticker'],'duplicate or unsorted quarters')
 core=load_ts(build/'app/core-contribution-snapshot.ts')
 assert core['metadata']['version']=='2.4'
 for month in core['months']:
  assert math.isclose(sum(r['weight'] for r in month['rows']),1,abs_tol=1e-10)
  complete=all(r['score'] is not None for r in month['rows'])
  assert complete==(month['score'] is not None),month['month']
  if complete:assert math.isclose(month['score'],sum(r['weight']*r['score'] for r in month['rows']),abs_tol=1e-8)
 tokens=load_ts(build/'app/token-activity-snapshot.ts')
 for row in tokens['weekly']:
  assert row['openrouter'] is None or row['openrouterDays']==7
 return {'bloombergSheets':len(names),'rampMonths':len(dates),'coreVersion':core['metadata']['version'],'coreRows':len(core['months']),'cashAndRoicCoverage':'five companies with at least eight unique quarters','status':'passed'}

if __name__=='__main__':
 root=Path(__file__).resolve().parents[1]
 print(json.dumps(validate(root,root/'data/derived'),indent=2))
