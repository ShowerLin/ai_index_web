from paths import DATA_ROOT, RAMP
import argparse, shutil
import requests
import concurrent.futures
import datetime
import hashlib
import json
import pathlib
import re
import subprocess

parser=argparse.ArgumentParser()
parser.add_argument('--cached',action='store_true',help='Reprocess the preserved public payload without a network request')
args=parser.parse_args()
stamp_path=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
OUT=DATA_ROOT/'data/raw/ramp/archive'/stamp_path
OUT.mkdir(parents=True,exist_ok=False)
PAGE = 'https://ramp.com/data/ai-index'

def fetch(url):
    print(f'Fetching {url}',flush=True)
    response=requests.get(url,headers={'User-Agent':'AI-Index-research/1.0'},timeout=(15,45))
    if response.status_code not in (401,403):response.raise_for_status()
    print(f'Received {response.status_code}: {len(response.content):,} bytes',flush=True)
    return response.content,response.status_code

if args.cached:
    data=json.loads((RAMP/'dashboard-data.json').read_text(encoding='utf-8'))
else:
    html, status = fetch(PAGE)
    assert status == 200
    (OUT / 'ramp-page.html').write_bytes(html)
    parts = []
    for m in re.finditer(r'self\.__next_f\.push\((\[.*?\])\)</script>', html.decode()):
        try:
            value = json.loads(m.group(1))
            if len(value) > 1 and isinstance(value[1], str):
                parts.append(value[1])
        except ValueError:
            pass
    found = []
    def walk(o):
        if isinstance(o, dict):
            if 'adoptionOverall' in o:
                found.append(o)
            for value in o.values():
                walk(value)
        elif isinstance(o, list):
            for value in o:
                walk(value)
    for line in ''.join(parts).splitlines():
        try:
            walk(json.loads(line.split(':', 1)[1]))
        except (ValueError, IndexError):
            pass
    assert len(found) == 1
    data = found[0]
version = data['filterModeBundleVersion']
urls = {
    'spend': f'{PAGE}/filter-mode/spendPerEmployee?version={version}',
    'model': f'{PAGE}/filter-mode/modelShare?version={version}',
    'documented': 'https://api.ramp.com/v1/public/ai-index/adoption?months=120',
}
if args.cached:
    responses={key:((RAMP/f'{key}-response.json').read_bytes(),200 if key!='documented' else 401) for key in urls}
else:
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        responses = dict(zip(urls, pool.map(fetch, urls.values())))
for key, (body, code) in responses.items():
    (OUT / f'{key}-response.json').write_bytes(body)
    if key != 'documented':
        assert code == 200, (key, code)
spend_filter = json.loads(responses['spend'][0])
model_filter = json.loads(responses['model'][0])
dims = ['business_office_state', 'fte_segment', 'naics_sector', 'company_financing_status']
all_spend = {r['my_date']: r for r in spend_filter if all(r[d] == 'ALL' for d in dims)}
default_spend = {r['date_month']: r for r in data['spendPerEmployee']}
share = {r['my_date']: r for r in data['spendShareData']['overall']}
monthly = []
for r in data['adoptionOverall']:
    date = r['date_month']
    # Keep dashboard Overall definitions, with separately labelled Filter ALL for the two earlier months.
    s = default_spend.get(date) or all_spend.get(date) or {}
    monthly.append([date, r['adoption_rate_pct'] / 100, r.get('mom_change_pp'), r.get('yoy_change_pp'),
                    s.get('median_pepm'), s.get('p90_pepm'), s.get('p99_pepm'),
                    s.get('top_10_percent_median_pepm'), s.get('top_1_percent_median_pepm'),
                    share.get(date, {}).get('ai_share_of_tpv'), None, None])
monthly.sort(key=lambda r: r[0])
records = []
def add(date, dataset, dimension, cohort, metric, value, unit, field, source='R1', notes=''):
    assert value is None or isinstance(value, (float, int))
    records.append([date, dataset, dimension, cohort, metric, value, unit, field, source, notes])
for key, dimension, label in [('adoptionVendor', 'Provider', 'vendor'), ('adoptionIndustry', 'Sector', 'naics_sector'), ('adoptionSize', 'Business size', 'business_size')]:
    for r in data[key]:
        add(r['date_month'], 'Paid adoption', dimension, r[label], 'Paid adoption share', r['adoption_rate_pct']/100, 'fraction', 'adoption_rate_pct / 100', notes='Provider adoption overlaps. Do not sum provider shares.' if dimension == 'Provider' else '')
        if r.get('mom_change_pp') is not None:
            add(r['date_month'], 'Paid adoption', dimension, r[label], 'MoM adoption change', r['mom_change_pp'], 'pp', 'mom_change_pp')
for r in data['spendPerEmployeeCurated']:
    for field, metric in [('median_pepm', 'Median AI spend per employee'), ('p99_winsorized_weighted_pepm', 'Legacy winsorized weighted AI spend per employee')]:
        add(r['date_month'], 'AI spend per employee', r['dimension_type'], r['dimension_label'], metric, r.get(field), 'USD/employee/month', field,
            notes='Legacy winsorized measure is distinct from a top-cohort median.' if field.startswith('p99_') else '')
for r in data['spendShareData']['sector']:
    add(r['my_date'], 'AI share of business spend', 'Sector', r['naics_sector'], 'AI share of observed payment volume', r['ai_share_of_tpv'], 'fraction', 'ai_share_of_tpv', notes='Ramp payment-volume denominator. Missing values remain blank.')
for r in data['modelBreakdown']:
    add(r['date_month'], 'Model spend share', 'Provider/model', r['ai_provider'] + ' / ' + r['model_label'], 'Model spend share', r['model_share'], 'fraction', 'model_share', notes=r['model_spend_type'] + '. Dashboard Overall series; filter ALL is a separate source.')
# Include single-dimension filter cohorts, preserving the full joint-filter archive outside the workbook.
for r in spend_filter:
    selected = [d for d in dims if r[d] != 'ALL']
    if len(selected) > 1:
        continue
    dim = selected[0] if selected else 'Overall ALL'
    cohort = r[dim] if selected else 'ALL'
    for field in ['median_pepm', 'p90_pepm', 'p99_pepm', 'top_10_percent_median_pepm', 'top_1_percent_median_pepm']:
        if field in r:
            add(r['my_date'], 'Filtered AI spend per employee', dim, cohort, field, r[field], 'USD/employee/month', field, 'R2',
                'Latest complete month' if r['is_latest_complete_month'] else 'Historical month. Filter cohort series kept separate from dashboard Overall.')
records.sort(key=lambda r: (r[1], r[2], r[3], r[4], r[0]))
keys = [(r[0], r[1], r[2], r[3], r[4]) for r in records]
assert len(keys) == len(set(keys)), 'Duplicate source keys'
for row in monthly:
    assert 0 <= row[1] <= 1
    if row[9] is not None:
        assert 0 <= row[9] <= 1
stamp = json.loads((RAMP/'normalized.json').read_text(encoding='utf-8'))['retrieved_utc'] if args.cached else datetime.datetime.now(datetime.timezone.utc).isoformat()
sources = [
    ['R1', 'Public dashboard payload', 200, PAGE, 'Adoption, spend per employee, spend share, provider/model and sector series.'],
    ['R2', 'Undocumented website JSON', responses['spend'][1], urls['spend'], 'Spend per employee with state, size, sector and financing filters.'],
    ['R3', 'Undocumented website JSON', responses['model'][1], urls['model'], 'Provider/model spend-share joint filters. Full response archived; default model series in detail table.'],
    ['R4', 'Documented API requires key', responses['documented'][1], urls['documented'], 'No documented API data retrieved. No credentials supplied.'],
]
payload = {'retrieved_utc': stamp, 'version': version, 'monthly': monthly, 'records': records, 'sources': sources,
           'counts': {k: len(v) for k, v in data.items() if isinstance(v, list)},
           'filter_spend_rows': len(spend_filter), 'filter_model_rows': len(model_filter),
           'collection_mode': 'cached' if args.cached else 'network'}
(OUT / 'dashboard-data.json').write_text(json.dumps(data))
(OUT / 'normalized.json').write_text(json.dumps(payload))
print(json.dumps({'monthly_rows': len(monthly), 'detail_rows': len(records), 'latest': monthly[-1], 'sources': sources, 'retrieved_utc': stamp}))

# Validate the complete response set before promoting the latest snapshot.
for filename in ['dashboard-data.json','normalized.json','spend-response.json','model-response.json','documented-response.json']:
    source=OUT/filename
    json.loads(source.read_text(encoding='utf-8'))
for filename in ['dashboard-data.json','normalized.json','spend-response.json','model-response.json','documented-response.json']:
    target=RAMP/filename
    temporary=target.with_suffix('.tmp')
    shutil.copyfile(OUT/filename,temporary)
    temporary.replace(target)
