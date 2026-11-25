"""Adoption breadth and usage; spending belongs to Monetization paid demand."""
from math import fsum
from calendar import monthrange

from index_price import shift
from supply import reweight_month

RATE_TICKERS = ('BTOS0700', 'BTOS2400', 'RAMP_PAID_ADOPTION')
SPENDING_TICKERS = ('RAMP_MATCHED_SPENDING', 'OPENROUTER_SPENDING_PROXY')
TOKEN_GROWTH_SCALE_PCT = 50



def moving_average_growth(levels, month):
    """Month-over-month growth in the trailing three-month average."""
    window = [levels.get(shift(month, -offset)) for offset in range(4)]
    if any(value is None for value in window):
        return None
    prior = fsum(window[1:])
    return 100 * (fsum(window[:3]) / prior - 1) if prior > 0 else None


def token_growth_score(growth):
    """Center zero growth at 50 and compress larger changes toward the endpoints."""
    return 50 + 50 * (growth / (TOKEN_GROWTH_SCALE_PCT + abs(growth)))


def integrate_structure(core, tokens, ramp_indexed=False):
    assert core['metadata']['version'] == '3.3'
    windows = {row['month']: row for row in tokens['monthly']}
    token_growth = {}
    for source in ('openrouter', 'ramp'):
        levels = {month: row.get(source) for month, row in windows.items()}
        token_growth[source] = {month: moving_average_growth(levels, month) for month in windows}
    latest = {}
    for month in core['months']:
        key = month['month']
        rates = {row['ticker']: row for row in month['contextRows']}
        spending = [row for row in month['rows'] if row['ticker'] in SPENDING_TICKERS]
        assert len(spending) == 2
        for row in spending:
            row.update(pillar='Monetization', weight=.05)
            row['name'] = ('Ramp matched business paid-demand growth' if row['ticker'] == 'RAMP_MATCHED_SPENDING'
                           else 'OpenRouter estimated routed-spending growth')
            row['observationDate'] = row.get('windowEnd')
        next(row for row in month['rows'] if row['ticker'] == 'RAMP_MEDIAN_SPEND')['weight'] = .05
        adoption = []
        for ticker in RATE_TICKERS:
            row = dict(rates[ticker], pillar='Adoption', weight=.125 / 3, unit='%')
            row['observationDate'] = f"{key}-{monthrange(int(key[:4]), int(key[5:]))[1]:02}" if row['level'] is not None else None
            adoption.append(row)
        for source, ticker, name in [('openrouter', 'OPENROUTER_TOKEN_VOLUME', 'OpenRouter routed token volume'),
                                      ('ramp', 'RAMP_TOKEN_VOLUME', 'Ramp sampled token-volume index' if ramp_indexed else 'Ramp business token volume')]:
            window = windows.get(key, {})
            level = window.get(source)
            if source == 'ramp' and ramp_indexed and level is not None:
                level *= 1e12
            signal = token_growth[source].get(key)
            score = token_growth_score(signal) if signal is not None else None
            adoption.append(dict(ticker=ticker, name=name, pillar='Adoption', weight=.0625,
                level=level, growth=signal, scoringSignal=signal, score=score,
                shortMomentum=None, baselineMean=None, baselineStd=None, baselineCount=0,
                treatment=f'Month-over-month growth in trailing three-month average volume. The composite score uses 50 + 50 × growth / ({TOKEN_GROWTH_SCALE_PCT} + |growth|), with growth in percentage points.',
                scoringMethod='3M avg growth (%)',
                unit='Publisher index/day' if source == 'ramp' and ramp_indexed else 'T tokens/day',
                source='S14' if source == 'ramp' else 'S9', sourceField='Matched four-week token volume',
                windowStart=windows[shift(key, -3)]['start'] if signal is not None else None,
                windowEnd=window.get('end'), observationDate=window.get('end')))
        for row in adoption + spending:
            ticker = row['ticker']
            if row['score'] is not None:
                row['carriedForward'] = False
                latest[ticker] = dict(row)
            elif ticker in latest:
                row.update(latest[ticker], carriedForward=True)
        month['rows'].extend(adoption)
        month['contextRows'] = []
        reweight_month(month)
    core['metadata'].update(version='3.6', previousVersion='3.3', comparisonVersion='2.7',
        adoptionRateCoreWeight=.125, tokenCoreWeight=.125, spendingCoreWeight=.1, businessPaidDemandCoreWeight=.15,
        tokenGrowthScalePct=TOKEN_GROWTH_SCALE_PCT,
        method='Four equal nominal 25% pillars. Adoption combines breadth and usage. Monetization combines business paid demand, consumer paid demand and annualized lab revenue scale. Missing weights are redistributed within each pillar, then across available pillars. Source dates identify carried-forward observations.',
        adoptionMethod='Adoption assigns 12.5% of the core to current business AI use, expected business AI use and Ramp paid adoption equally, and 12.5% to OpenRouter and Ramp token volumes equally. Adoption rates use their existing level-based scores. Token volume scores apply a common curve to monthly growth in each source’s three-month moving average. Latest complete observations carry forward with source dates.',
        monetizationMethod='Monetization assigns 15% of the core to business paid demand: Ramp median AI spend per employee, Ramp matched spending growth and OpenRouter estimated spending growth at 5% each. Consumer card spending has 5%; lab annualized revenue levels share 5%. Retain the existing spending-growth and absolute lab-level calibrations.',
        tokenMethod=f'Monthly levels use matched complete four-week windows. Token growth compares the trailing three-month average with the prior month’s three-month average, requiring four consecutive monthly levels. The score is 50 + 50 × growth / ({TOKEN_GROWTH_SCALE_PCT} + |growth|), with growth in percentage points. Ramp is displayed in publisher index/day units.',
        rampMethod='Ramp paid adoption enters Adoption breadth. Ramp token activity enters Adoption usage. Ramp median spending and matched spending growth enter Monetization business paid demand. Samples and units retain their source qualifications.')
    tokens['metadata'].update(tokenCoreWeight=.125, spendingCoreWeight=.1, corePillar='Adoption')
