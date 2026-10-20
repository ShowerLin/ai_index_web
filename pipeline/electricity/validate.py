"""Blocking integrity checks and visible source reconciliation flags."""
import calendar, datetime as dt, json, math
from collections import defaultdict
from .build import ROOT, dump, read_csv, sha

def validate(folder, forecasts=False):
    checks=[]
    def check(key, good, evidence, severity='blocking', affected=0):
        checks.append(dict(check_id=key,severity=severity,result='passed' if good else ('failed' if severity=='blocking' else 'review'),affected_records=affected,evidence=evidence,disposition='accept' if good else 'investigate'))
    manifest=json.loads((folder/'build_manifest.json').read_text(encoding='utf-8'));cutoff=manifest['cutoff']
    sources=json.loads((folder/'sources.json').read_text(encoding='utf-8'));byid={s['source_release_id']:s for s in sources}
    schema=json.loads((ROOT/'data/reference/electricity/schemas.json').read_text(encoding='utf-8'))
    for src in sources:
        p=ROOT/src['raw_path'];check('raw_sha:'+src['source_release_id'],p.is_file() and sha(p)==src['checksum_sha256'],src['raw_path'])
        check('cutoff:'+src['source_release_id'],not src['publication_date'] or src['publication_date']<=cutoff,src['publication_date'])
    for name,count in manifest['table_counts'].items():
        rows=read_csv(folder/(name+'.csv'));check('row_count:'+name,len(rows)==count,dict(expected=count,actual=len(rows)))
        ids=[r['record_id'] for r in rows];check('unique_ids:'+name,len(ids)==len(set(ids)),len(rows))
        keys=[tuple(r.get(k) for k in schema['primary_keys'][name]) for r in rows]
        check('unique_primary_key:'+name,len(keys)==len(set(keys)),schema['primary_keys'][name])
        check('schema:'+name,all(all(k in r for k in schema['required_observation_fields']) and r['status'] in schema['statuses'] for r in rows),'Required fields and allowed statuses')
        bad=[r for r in rows if not r['locator'] or r['source_release_id'] not in byid or not r['unit'] or not r['status'] or (r['value']!='' and not math.isfinite(float(r['value'])))]
        check('provenance_types:'+name,not bad,'Every numeric observation has source, locator, units and status',affected=len(bad))
    # Monthly versus annual electricity: same scope, explicitly separate file vintages.
    hist=read_csv(folder/'electricity_history.csv');monthly=defaultdict(list);annual={}
    for r in hist:
        key=(r['period_start'][:4],r['geography_id'],r['sector'])
        if r['frequency']=='monthly':monthly[key].append(float(r['value']))
        else:annual[key]=float(r['value'])
    rec=[]
    for k,v in annual.items():
        vals=monthly.get(k,[])
        if len(vals)==12 and v:
            total=sum(vals);rec.append(dict(year=k[0],geography_id=k[1],sector=k[2],annual_mwh=v,monthly_sum_mwh=total,difference_pct=(total/v-1)*100))
    from .build import write_csv
    write_csv(folder/'retail_reconciliation.csv',rec)
    flags=[r for r in rec if abs(r['difference_pct'])>.5]
    check('retail_annual_monthly',not flags,dict(compared=len(rec),over_0_5_pct=len(flags),note='Monthly/annual files may reflect different revisions'),severity='review',affected=len(flags))
    rows=read_csv(folder/'construction_spending.csv');months=defaultdict(list);published={}
    for r in rows:
        if r['seasonal_adjustment']!='NSA':continue
        key=(r['period'][:4],r['category_label'])
        if r['frequency']=='monthly':months[key].append(float(r['value']))
        else:published[key]=float(r['value'])
    rec=[]
    for key,value in published.items():
        vals=months.get(key,[])
        if len(vals)==12:rec.append(dict(year=key[0],category=key[1],published=value,sum_nsa=sum(vals),difference=sum(vals)-value))
    write_csv(folder/'census_reconciliation.csv',rec)
    bad=[r for r in rec if abs(r['difference'])>6.5]
    check('census_annual_nsa',not bad,dict(compared=len(rec),tolerance_usd_million=6.5,flags=len(bad)),severity='review',affected=len(bad))
    hourly=read_csv(folder/'hourly_load.csv');groups=defaultdict(list)
    stamps=[r['timestamp_utc'] for r in hourly]
    check('hourly_unique_utc',len(stamps)==len(set(stamps)),'UTC hour-ending timestamps; local DST columns not aggregated')
    for r in hourly:groups[r['timestamp_utc'][:4]].append(r)
    audit=[]
    for year,rows in sorted(groups.items()):
        y=int(year);expected=(8784 if calendar.isleap(y) else 8760);valid=[r for r in rows if r['value']!=''];times=sorted(r['timestamp_utc'] for r in rows)
        audit.append(dict(year=y,geography_id='PJM',expected_full_year_hours=expected,observed_hours=len(rows),valid_hours=len(valid),missing_values=len(rows)-len(valid),
            full_year_complete=len(rows)==expected and len(valid)==expected,energy_twh=sum(float(r['value']) for r in valid)/1e6,
            observed_max_mw=max(float(r['value']) for r in valid),first_utc=times[0],last_utc=times[-1],peak_warning='' if len(valid)==expected else 'Observed maximum only; incomplete year/coverage'))
    write_csv(folder/'hourly_coverage.csv',audit)
    check('hourly_coverage',all(r['full_year_complete'] for r in audit),audit,severity='review')
    markets=read_csv(folder/'market_pipeline.csv')
    check('broker_conversion_gate',not any(r.get('converted_energy_twh') for r in markets if r['capacity_basis']=='unknown'),'Unknown broker MW basis retained; no conversion or provider aggregation')
    if forecasts:
        rs=read_csv(folder/'scenario_results.csv');check('scenario_values',all(float(r['value'])>=0 and r['status']=='analyst_scenario' for r in rs),'All annual analyst outputs labeled and nonnegative')
        keys=[(r['scenario_id'],r['target_year'],r['geography_id'],r.get('delay_months')) for r in rs];check('scenario_unique',len(keys)==len(set(keys)),len(rs))
    result=dict(status='passed' if all(c['result']!='failed' for c in checks) else 'failed',coverage_status='partial',checks=checks)
    dump(folder/'qc_report.json',result)
    if result['status']=='failed':raise ValueError('Blocking validation failure; see qc_report.json')
    return result
