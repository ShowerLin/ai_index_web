"""Supply v2.8: investment momentum and hardware pricing; forecasts stay separate."""
import copy
import json
import math

from paths import DATA_ROOT
from index_price import shift

SPECS = [('ISPPDR48 Index', 'DDR5 spot price momentum'), ('SDH100RT Index', 'H100 rental price momentum')]

def growth(cells, month):
    now, prior = cells.get(month), cells.get(shift(month, -12))
    return (now / prior - 1) * 100 if now is not None and prior is not None and now > 0 and prior > 0 else None

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
    calibration = json.loads((DATA_ROOT / "data/reference/hardware_price_calibration.json").read_text(encoding="utf-8"))
    baseline = calibration["series"]
    histories = {}
    series_source = {}
    for field, name in SPECS:
        series = next(s for s in prices['series'] if s['field'] == field)
        cells = {r['month']: r['level'] for r in series['cells']
                 if not r['partial'] or r['month'] <= core['metadata'].get('heatmapThrough', '')}
        histories[field] = cells
        series_source[field] = series['source']
        stats = baseline[field]
        if stats['count'] < 2 or stats['std'] <= 0:
            raise ValueError(f'Invalid frozen hardware price calibration for {field}')
    for month in result['months']:
        month['previousVersionScore'] = month['score']
        cap = next(r for r in month['rows'] if r['pillar'] == 'Hyperscaler CapEx')
        cap.update(pillar='Supply', weight=.10)
        if cap['score'] is not None: cap['contribution'] = .10 * (cap['score'] - 50)
        for field, name in SPECS:
            stats = baseline[field]
            g = growth(histories[field], month['month'])
            log_ratio = None if g is None else math.log(histories[field][month['month']]) - math.log(histories[field][shift(month['month'], -12)])
            score = None if log_ratio is None else max(0, min(100, 50 + 15 * (log_ratio - stats['mean']) / stats['std']))
            month['rows'].append(dict(ticker=field.split()[0], name=name, pillar='Supply', weight=.05,
                growth=g, score=score, contribution=None if score is None else .05*(score-50),
                baselineCount=stats['count'], baselineMean=stats['mean'], baselineStd=stats['std'],
                baselineStart=stats['start'], baselineEnd=stats['end'], calibrationStatus=stats['status'], scoringSignal=log_ratio,
                level=histories[field].get(month['month']), shortMomentum=None, unit='Source-native price index',
                treatment='Monthly price YoY; score uses log price ratio and independent frozen history through June 2026', source=series_source[field], sourceField=field))
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
        supplyMethod='DDR5 and H100 are calibrated independently using log(current price / price 12 months earlier). Frozen sample means and standard deviations use each series available history through June 2026: DDR5 October 2024-June 2026 (21 observations), H100 September 2025-June 2026 (10 observations). Both calibrations are provisional. Score = clip(50 + 15 * z, 0, 100). Displayed levels and YoY percentages retain their source units. Higher scores indicate stronger pricing pressure relative to each series own history. CapEx uses its existing calibration.')
    return result
