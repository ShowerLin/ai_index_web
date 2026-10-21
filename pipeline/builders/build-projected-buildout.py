"""Compare saved Epoch construction milestones with the approved CapEx estimates."""
import csv, datetime, hashlib, json
from paths import DATA_ROOT, BUILD_ROOT

def payload(path):
    return json.JSONDecoder().raw_decode(path.read_text().split(' = ', 1)[1].lstrip())[0]

def main():
    source = DATA_ROOT / 'data/raw/epoch-buildout/2026-10-20'
    timelines = list(csv.DictReader((source/'data_center_timelines.csv').open(encoding='utf-8-sig')))
    centers = list(csv.DictReader((source/'data_centers.csv').open(encoding='utf-8-sig')))
    mapping = {'Microsoft':'Microsoft','Google':'Alphabet','Meta':'Meta','Amazon':'Amazon','Oracle':'Oracle'}
    owners = {r['Name']: mapping.get(r['Owner'].split(' #')[0]) for r in centers}
    companies = list(mapping.values())
    capex = payload(BUILD_ROOT/'app/core-projection-snapshot.ts')
    as_of = '2026-10-20'
    def capacity(date):
        latest = {}
        for row in sorted(timelines, key=lambda r:r['Date']):
            if row['Date'] <= date: latest[row['Data center']] = row
        values = {c:0.0 for c in companies}
        for site,row in latest.items():
            if owners.get(site): values[owners[site]] += float(row['IT power (MW)'] or 0)
        return {c:round(v,2) for c,v in values.items()}
    rows = []
    previous = None
    for quarter in capex['quarters']:
        year, q = map(int,quarter['quarter'].split('Q'))
        month = q*3
        end = (datetime.date(year+month//12, month%12+1,1)-datetime.timedelta(days=1)).isoformat()
        values = capacity(end)
        total = round(sum(values.values()),2)
        rows.append({'quarter':quarter['quarter'], 'date':end,'projected':end>as_of,
                     'itMw':total,'owners':values,'additionMw':None if previous is None else round(total-previous,2),
                     'capex':quarter['total'],'capexOwners':quarter['companies'],
                     'rawCapex':sum(r['value'] for r in quarter['rawEstimates'].values())})
        previous = total
    future = [r for r in timelines if r['Date']>as_of and owners.get(r['Data center'])]
    # One construction vintage and owner cohort across the historical/forward boundary.
    capacity_history = []
    for year in range(2023, int(capex['metadata']['estimateThrough'][:4])+1):
        for q in range(1,5):
            month=q*3
            end=(datetime.date(year+month//12, month%12+1,1)-datetime.timedelta(days=1)).isoformat()
            if end > capex['metadata']['estimateThrough']:continue
            values=capacity(end)
            capacity_history.append({'period':f'{year}Q{q}','date':end,'projected':end>as_of,
                                     'itMw':round(sum(values.values()),2),'owners':values})
    current=capacity(as_of)
    capacity_history.append({'period':'Current','date':as_of,'projected':False,'itMw':round(sum(current.values()),2),'owners':current})
    capacity_history.sort(key=lambda r:r['date'])
    milestones = [{'site':r['Data center'],'owner':owners[r['Data center']],'date':r['Date'],
                   'itMw':float(r['IT power (MW)'] or 0),'notes':r['Construction status']}
                  for r in sorted(future,key=lambda r:(r['Date'],r['Data center']))]
    result = {'metadata':{'epochRetrievedAt':as_of,'capacityAsOf':as_of,'capexActualThrough':capex['metadata']['actualThrough'],
               'capexEstimateThrough':capex['metadata']['estimateThrough'],'capexWorkbookSha256':capex['metadata']['workbookSha256'],
               'source':'https://epoch.ai/data/ai-data-centers','methodology':'https://epoch.ai/data/data-centers-documentation/methodology',
               'sourceHashes':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in source.glob('*.csv')},
               'coveredOwners':companies,'futureMilestones':len(milestones),
               'method':'Latest milestone per site at each quarter end; values held until the next milestone. Fixed five-owner cohort. No probability weighting, interpolation, utilization assumption or extrapolation. CapEx uses the approved fixed accounting bridge; it is total company spending, not AI-only spending.'},
              'currentOwners':current,'capacityHistory':capacity_history,'quarters':rows,'milestones':milestones}
    target = BUILD_ROOT/'app/projected-buildout-snapshot.ts'
    target.write_text('export const projectedBuildoutSnapshot = '+json.dumps(result,indent=2)+';\n')
    print(json.dumps({'output':str(target),'quarters':len(rows),'milestones':len(milestones),'first':rows[0],'last':rows[-1]}))

if __name__ == '__main__': main()
