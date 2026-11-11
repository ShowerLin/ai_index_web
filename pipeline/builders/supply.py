"""Supply v2.8: investment momentum and hardware pricing; forecasts stay separate."""
import copy
import statistics

SPECS = [('ISPPDR48 Index', 'DDR5 spot price momentum'), ('SDH100RT Index', 'H100 rental price momentum')]

def growth(cells, month):
    from index_price import shift
    now, prior = cells.get(month), cells.get(shift(month, -12))
    return (now / prior - 1) * 100 if now is not None and prior is not None and prior > 0 else None

def reweight_month(month):
    rows = month['rows']
    available = [r for r in rows if r['weight'] > 0 and r['score'] is not None]
    active_pillars = {r['pillar'] for r in available}
    nominal = {p: sum(r['weight'] for r in rows if r['pillar'] == p) for p in active_pillars}
    eligible = {p: sum(r['weight'] for r in available if r['pillar'] == p) for p in active_pillars}
    total = sum(nominal.values())
    for row in rows:
        p = row['pillar']
        weight = row['weight'] / eligible[p] * nominal[p] / total if row in available else 0
        row['effectiveWeight'] = weight
        row['contribution'] = weight * (row['score'] - 50) if row in available else 0
    month['score'] = sum(r['effectiveWeight'] * r['score'] for r in available) if available else None
    month['availableConstituents'] = len(available)
    month['availablePillars'] = len(active_pillars)


def integrate(core, prices):
    assert core['metadata']['version'] == '2.7'
    result = copy.deepcopy(core)
    baseline, histories = {}, {}
    for field, name in SPECS:
        series = next(s for s in prices['series'] if s['field'] == field)
        cells = {r['month']: r['level'] for r in series['cells'] if not r['partial']}
        histories[field] = cells
        values = [growth(cells, f'2026-{m:02}') for m in range(1, 7)]
        assert all(v is not None for v in values), field
        baseline[field] = dict(mean=statistics.mean(values), std=statistics.stdev(values), count=6, start='2026-01', end='2026-06')
        assert baseline[field]['std'] > 0
    for month in result['months']:
        month['previousVersionScore'] = month['score']
        cap = next(r for r in month['rows'] if r['pillar'] == 'Hyperscaler CapEx')
        cap.update(pillar='Supply', weight=.10)
        if cap['score'] is not None: cap['contribution'] = .10 * (cap['score'] - 50)
        for field, name in SPECS:
            stats = baseline[field]
            g = growth(histories[field], month['month'])
            score = None if g is None else max(0, min(100, 50 + 15 * (g - stats['mean']) / stats['std']))
            month['rows'].append(dict(ticker=field.split()[0], name=name, pillar='Supply', weight=.05,
                growth=g, score=score, contribution=None if score is None else .05*(score-50),
                baselineCount=6, baselineMean=stats['mean'], baselineStd=stats['std'],
                level=histories[field].get(month['month']), shortMomentum=None, unit='Source-native price index',
                treatment='Monthly price level YoY growth; higher means stronger pricing pressure', source='Indexlist.xlsx', sourceField=field))
        for row in month['rows']:
            if row['ticker'] == 'RAMP_MEDIAN_SPEND':
                row['pillar'] = 'Monetization'
            elif row['ticker'] == 'HYPERSCALER_TOTAL':
                row['pillar'] = 'Hyperscalers'
            elif row['pillar'] != 'Adoption':
                row['pillar'] = 'Infrastructure'
        for pillar in {row['pillar'] for row in month['rows']}:
            members = [row for row in month['rows'] if row['pillar'] == pillar]
            total = sum(row['weight'] for row in members)
            for row in members:
                row['weight'] *= .25 / total
        reweight_month(month)
    result['metadata'].update(version='2.9', previousVersion='2.7', comparisonVersion='2.7', supplyCoreWeight=.2, supplyBaseline=baseline,
        method='Four equal nominal pillars: Adoption, Monetization, Hyperscalers and Infrastructure. Monetization uses Ramp median AI spending per employee as a paid-spending proxy. Missing constituent weight is redistributed proportionally within its pillar. If an entire pillar is unavailable, the available pillars share the index equally. The score is unavailable only when no scoring constituent is available. Context indicators carry zero weight.',
        missingWeightPolicy='within-pillar-then-across-available-pillars',
        supplyMethod='Price signals use YoY growth and fixed January–June 2026 sample mean/stdev; provisional six-month retrospective calibration. CapEx retains its existing baseline. Price increases may indicate scarcity; falling H100 prices may reflect hardware substitution. No electrical-equipment series is added to Supply. Existing Investment inputs are unchanged.')
    return result
