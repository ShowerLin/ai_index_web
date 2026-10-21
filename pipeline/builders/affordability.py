"""v2.6 activity/affordability scoring, isolated from data collection."""
import calendar
import copy
import datetime as dt
import math
import statistics

PRICE_SPECS = [('silicon', 'SDLLMTK_AFFORDABILITY', 'Bloomberg token affordability', 'S15'),
               ('ramp', 'RAMP_TOKEN_AFFORDABILITY', 'Ramp effective token affordability', 'S14')]


def monthly_prices(prices, months):
    silicon = {r['month']: r for r in prices['siliconMonthly']}
    weekly = {r['end']: r for r in prices['rampWeekly']}
    results = []
    for month in months:
        year, number = map(int, month.split('-'))
        end = dt.date(year, number, calendar.monthrange(year, number)[1])
        end -= dt.timedelta(days=(end.weekday()+1) % 7)
        dates = [(end-dt.timedelta(weeks=i)).isoformat() for i in range(4)]
        rows = [weekly[d] for d in dates if d in weekly]
        valid = len(rows) == 4 and all(r['coverage'] >= .95 and r['value'] is not None for r in rows)
        spend = sum(r['spendUsd'] for r in rows) if valid else None
        volume = sum(r['tokens'] for r in rows) if valid else None
        benchmark = silicon.get(month, {})
        results.append(dict(month=month, windowStart=(end-dt.timedelta(days=27)).isoformat(),
                            windowEnd=end.isoformat(), silicon=benchmark.get('value') if benchmark.get('complete') else None,
                            ramp=spend/volume*1e6 if volume and spend is not None else None,
                            rampSpendUsd=spend, rampMatchedTokens=volume,
                            rampWeeks=len(rows), rampCoverage=min((r['coverage'] for r in rows), default=0)))
    lookup = {r['month']: r for r in results}
    for row in results:
        year, number = map(int, row['month'].split('-'))
        prev = f'{year-1}-12' if number == 1 else f'{year}-{number-1:02}'
        prior = lookup.get(prev, {}).get('rampSpendUsd')
        yoy = lookup.get(f'{year-1}-{number:02}', {}).get('rampSpendUsd')
        row['rampSpendingMom'] = (row['rampSpendUsd']/prior-1)*100 if row['rampSpendUsd'] is not None and prior and prior > 0 else None
        row['rampSpendingYoy'] = (row['rampSpendUsd']/yoy-1)*100 if row['rampSpendUsd'] is not None and yoy and yoy > 0 else None
    return results


def affordability_score(price, baseline):
    if price is None or price <= 0 or not math.isfinite(price):
        return None
    return max(0, min(100, 50+15*(-math.log(price)-baseline['mean'])/baseline['std']))


def integrate(core, prices):
    assert core['metadata']['version'] == '2.5'
    result = copy.deepcopy(core)
    observations = monthly_prices(prices, [m['month'] for m in core['months']])
    cutoff = core['metadata']['baselineEnd']
    matched = [r for r in observations if r['month'] <= cutoff and all(r[s] is not None and r[s] > 0 for s in ('silicon', 'ramp'))]
    expected = ['2025-12'] + [f'2026-{m:02}' for m in range(1,7)]
    assert [r['month'] for r in matched] == expected, 'All seven accepted December 2025–June 2026 price calibration months are required'
    baseline = {}
    for source, *_ in PRICE_SPECS:
        values = [-math.log(r[source]) for r in matched]
        std = statistics.stdev(values)
        assert std > 0 and math.isfinite(std), 'Invalid affordability calibration'
        baseline[source] = dict(mean=statistics.mean(values), std=std, count=len(values),
                                start=matched[0]['month'], end=matched[-1]['month'], provisional=True)
    lookup = {r['month']: r for r in observations}
    for month in result['months']:
        month['previousVersionScore'] = month['score']
        obs = lookup[month['month']]
        for row in month['rows']:
            if row['pillar'] == 'Adoption': row['weight'] = .05
        for source, ticker, name, source_id in PRICE_SPECS:
            value = obs[source]
            stats = baseline[source]
            score = affordability_score(value, stats)
            month['rows'].append(dict(ticker=ticker, name=name, pillar='Adoption', weight=.05,
                                     growth=-math.log(value) if value is not None and value > 0 else None,
                                     score=score, contribution=None, level=value, shortMomentum=None,
                                     baselineMean=stats['mean'], baselineStd=stats['std'], baselineCount=stats['count'],
                                     treatment='Negative log unit cost; lower price raises score',
                                     source=source_id, sourceField='SDLLMTK Index' if source == 'silicon' else 'matched model/week spending divided by tokens',
                                     unit='USD/M tokens', windowStart=month['month']+'-01' if source == 'silicon' else obs['windowStart'],
                                     windowEnd=f"{month['month']}-{calendar.monthrange(int(month['month'][:4]),int(month['month'][5:]))[1]}" if source == 'silicon' else obs['windowEnd']))
        for row in month['rows']:
            row['contribution'] = None if row['score'] is None else row['weight']*(row['score']-50)
        month['score'] = sum(r['weight']*r['score'] for r in month['rows']) if all(r['score'] is not None for r in month['rows']) else None
    result['metadata'].update(version='2.6', previousVersion='2.5', tokenCoreWeight=.1, priceCoreWeight=.1,
        affordabilityBaseline=baseline,
        method='Five equal 20% pillars. Adoption: OpenRouter volume, Ramp volume, Bloomberg token affordability and Ramp effective token affordability each 5%. Volume scores retain separate frozen log-volume calibration. Price scores use negative log unit cost, so lower prices raise the score. Price calibration uses matched complete months through June 2026 and is provisional. Missing scores withhold the composite; no reweighting or backfilled price history. Other pillars unchanged.',
        adoptionMethod='Activity and affordability: two volumes at 5% each plus two inverse-price signals at 5% each. Survey breadth stays at zero weight. Lower effective costs may reflect model mix, caching and commercial terms, not constant-quality repricing.',
        priceMethod='Score = clip(50 + 15 * (-ln(price) - baseline mean) / baseline sample standard deviation, 0, 100). Bloomberg uses complete calendar-month averages. Ramp uses ratio of matched spending/token totals over four completed weeks, requiring 95% coverage in every week. Common matched price baseline through June 2026 is provisional and retrospective.',
        rampMethod='Ramp token volume 5%, effective affordability 5%, and median spending 5% in Demand. Matched spending growth is a separate zero-weight nominal-activity diagnostic; never multiply unrelated provider samples.',
        earliestPriceMonth=matched[0]['month'], comparisonVersion='2.5')
    return result, observations
