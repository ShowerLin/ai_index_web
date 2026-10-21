"""Refresh monthly observations against frozen v2.1/v2.2 calibration parameters."""
import copy
import hashlib
import json
from index_price import load, shift, signal
from paths import DATA_ROOT, BUILD_ROOT, REFERENCE


def read(path):
    return json.JSONDecoder().raw_decode(path.read_text(encoding='utf-8').split(' = ', 1)[1].lstrip())[0]


config, headers, obs, workbook_hash, inspection_hash = load()
base = read(REFERENCE / 'core-v2.1.ts')
demand_base = read(REFERENCE / 'core-v2.2.ts')
demand = read(BUILD_ROOT / 'app/workbook-amendments-snapshot.ts')
calibration = {r['ticker']: r for m in demand_base['months'] for r in m['rows'] if r['pillar'] == 'Demand'}
template = base['months'][-1]
old_months = {m['month']: m for m in base['months']}
backfills = json.loads((DATA_ROOT / 'data/research/tsmc/monthly_backfills.json').read_text(encoding='utf-8'))
levels = {s['field']: {p['month']: p['level'] for p in s['cells']} for s in demand['demand']}
used_backfills = []
for record in backfills['observations']:
    if levels['TSMC Monthly Revenue'].get(record['month']) is None:
        levels['TSMC Monthly Revenue'][record['month']] = record['value']
        used_backfills.append(record['month'])


def score(row, growth):
    row['growth'] = growth
    row['score'] = None if growth is None else max(0, min(100, 50 + 15 * (growth - row['baselineMean']) / row['baselineStd']))
    row['contribution'] = None if row['score'] is None else row['weight'] * (row['score'] - 50)


result = []
for month in sorted(m for m in obs if '2024-01' <= m <= config['completedMonthThrough']):
    original = old_months.get(month)
    item = copy.deepcopy(original or template)
    item['month'] = month
    rows = [r for r in item['rows'] if r['pillar'] != 'Demand']
    for row in rows:
        if row['pillar'] == 'Hyperscaler CapEx':
            # Keep accepted quarterly history; no estimate becomes an actual observation.
            if original is None:
                row.update(level=None, shortMomentum=None)
                score(row, None)
            continue
        field = row['ticker'] + ' Index'
        row['level'] = obs[month].get(field)
        growth = row['level'] if row['pillar'] == 'Adoption' else signal(obs, month, field)
        prior = obs.get(shift(month, -1), {}).get(field)
        row['shortMomentum'] = (row['level'] - prior if row['level'] is not None and prior is not None else None) if row['pillar'] == 'Adoption' else signal(obs, month, field, length=3)
        score(row, growth)
    for offset, s in enumerate(demand['demand']):
        ticker = s['field'].replace(' Index', '').replace('TSMC Monthly Revenue', 'TSMC_REVENUE')
        row = copy.deepcopy(calibration[ticker])
        source = {m: {s['field']: v} for m, v in levels[s['field']].items()}
        row.update(weight=.2/3, level=levels[s['field']].get(month), shortMomentum=signal(source, month, s['field'], length=3))
        score(row, signal(source, month, s['field']))
        rows.insert(2 + offset, row)
    if original is None:
        item['companyCapexRows'] = [dict(r, level=None, growth=None) for r in item['companyCapexRows']]
    item['rows'] = rows
    item['score'] = sum(r['weight'] * r['score'] for r in rows) if all(r['score'] is not None for r in rows) else None
    result.append(item)
base['months'] = result
base['metadata'].update(version='2.2', observationWorkbookSha256=workbook_hash, observationInspectionSha256=inspection_hash,
    observationReviewedAt=config['reviewedAt'], observationThrough=config['completedMonthThrough'],
    baselinePolicy='Frozen v2.1 macro and v2.2 demand means, sample standard deviations and counts. Refresh saved observations and transformed history without recalibration.',
    baselineReferenceHashes={name: hashlib.sha256((REFERENCE/name).read_bytes()).hexdigest() for name in ['core-v2.1.ts', 'core-v2.2.ts']},
    demandSourceSha256=workbook_hash,
    demandMethod='DRAM, NAND and TSMC TTM YoY, equal thirds of 20% before Ramp/token integration. Frozen v2.2 calibration. TSMC missing levels through July 2024 retain reviewed historical backfills (NT$ millions).',
    tsmcBackfillMonths=used_backfills, tsmcBackfillSource='data/research/tsmc/monthly_backfills.json',
    tsmcSources=['https://investor.tsmc.com/english/monthly-revenue/2023', 'https://investor.tsmc.com/schinese/monthly-revenue/2024'])
(BUILD_ROOT/'app/core-contribution-snapshot.ts').write_text('export const coreContributionSnapshot = '+json.dumps(base, indent=2)+' as const;\n', encoding='utf-8')
print('Refreshed monthly inputs through', config['completedMonthThrough'], 'with frozen calibration; latest complete pre-Ramp score', next(m['score'] for m in reversed(result) if m['score'] is not None))
