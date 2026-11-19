"""Add consumer spending and news-date lab run-rate signals to Monetization."""
from calendar import monthrange
from datetime import date, timedelta
from statistics import mean, stdev
import json
import math

from index_price import shift
from paths import DATA_ROOT

import openpyxl
from monetization import SOURCE, records
from supply import reweight_month


def card_observations():
    book = openpyxl.load_workbook(SOURCE, read_only=True, data_only=True)
    try:
        weeks = {day.date(): openai + anthropic
                 for day, openai, anthropic in book['App Revenue Value'].iter_rows(min_row=4, values_only=True)
                 if hasattr(day, 'date') and all(isinstance(v, (int, float)) and v >= 0 for v in (openai, anthropic))}
    finally:
        book.close()
    observations = {}
    for day in sorted(weeks):
        if day.weekday() != 6:
            continue
        window = [weeks.get(day - timedelta(weeks=i)) for i in range(8)]
        if None in window or sum(window[4:]) <= 0:
            continue
        level = sum(window[:4])
        observations[day.isoformat()[:7]] = (level, (level / sum(window[4:]) - 1) * 100, day.isoformat())
    return observations


def run_rate_observations(company, through_month, revenue_records):
    reports = [r for r in revenue_records if r.get('Company') == company
               and r.get('Scope') == 'Full company'
               and r.get('Annualized revenue type') in ('Annualized run rate', 'Annual recurring revenue (ARR)')
               and r.get('Date') and r.get('Report date')
               and isinstance(r.get('Annualized revenue (USD)'), (int, float))
               and math.isfinite(r['Annualized revenue (USD)'])
               and r['Annualized revenue (USD)'] > 0]
    if not reports:
        return {}
    monthly = {}
    month = min(r['Report date'][:7] for r in reports)
    while month <= through_month:
        end = f"{month}-{monthrange(int(month[:4]), int(month[5:]))[1]:02}"
        known = [r for r in reports if r['Report date'] <= end and r['Date'] <= end]
        if known:
            monthly[month] = max(known, key=lambda r: (r['Date'], r['Report date'], r['Id']))
        month = shift(month, 1)
    observations = {}
    previous_id = None
    signal = None
    for month, report in monthly.items():
        if report['Id'] != previous_id:
            prior = monthly.get(shift(month, -12))
            level = report['Annualized revenue (USD)']
            log_ratio = math.log(level) - math.log(prior['Annualized revenue (USD)']) if prior else None
            signal = dict(level=level, growth=100 * math.expm1(log_ratio) if prior else None,
                          logRatio=log_ratio, logLevel=math.log(level), sourceBasis=report['Annualized revenue type'],
                          observationDate=report['Report date'],
                          periodEnd=report['Date'], updateMonth=month, sourceRecordId=report['Id'],
                          sourceUrl=report.get('Source 1'), confidence=report.get('Confidence'),
                          sourceNote=report.get('Graph note'),
                          priorObservationDate=prior['Report date'] if prior else None)
            previous_id = report['Id']
        observations[month] = {**signal, 'carriedForward': month != signal['updateMonth']}
    return observations


def run_rate_row(company, weight, observation, calibration):
    observation = observation or {}
    log_level = observation.get('logLevel')
    score = None if log_level is None else max(0, min(100,
        50 + 15 * (log_level - calibration['mean']) / calibration['std']))
    return dict(ticker=company.upper()+'_REVENUE_RUN_RATE', name=company+' annualized revenue level',
                pillar='Monetization', weight=weight, level=observation.get('level'),
                growth=observation.get('growth'), score=score,
                baselineCount=calibration['count'], baselineMean=calibration['mean'],
                baselineStd=calibration['std'], baselineStart=calibration['start'],
                baselineEnd=calibration['end'], calibrationStatus='provisional',
                scoringSignal=log_level, shortMomentum=None, unit='USD annualized revenue',
                sourceBasis=observation.get('sourceBasis'),
                treatment='Absolute annualized revenue level (ARR/run rate); score uses log USD level against own frozen disclosure history through June 2026',
                source='AI_Monetization.xlsx / Lab Revenue', sourceField=company,
                observationDate=observation.get('observationDate'),
                periodEnd=observation.get('periodEnd'), carriedForward=observation.get('carriedForward', False),
                sourceRecordId=observation.get('sourceRecordId'), sourceUrl=observation.get('sourceUrl'),
                confidence=observation.get('confidence'), sourceNote=observation.get('sourceNote'),
                priorObservationDate=observation.get('priorObservationDate'))


def scoring_row(ticker, name, weight, observation, treatment):
    level, growth, disclosed, baseline = observation or (None, None, None, [])
    average, spread = (mean(baseline), stdev(baseline)) if baseline else (None, None)
    score = None if growth is None else max(0, min(100, 50 + 15 * (growth - average) / spread))
    return dict(ticker=ticker, name=name, pillar='Monetization', weight=weight, level=level,
                growth=growth, score=score, baselineCount=len(baseline), baselineMean=average,
                baselineStd=spread, shortMomentum=None, unit='USD', treatment=treatment,
                source='AI_Monetization.xlsx', sourceField=ticker, observationDate=disclosed)


def integrate_monetization(core):
    cards = card_observations()
    baseline = [cards[f'2026-{m:02}'][1] for m in range(1, 7)]
    revenue_records = records('Lab Revenue')
    labs = {company: run_rate_observations(company, max(m['month'] for m in core['months']), revenue_records)
            for company in ('OpenAI', 'Anthropic')}
    calibration = json.loads((DATA_ROOT / 'data/reference/lab_annualized_level_calibration.json').read_text(encoding='utf-8'))['series']
    latest_ramp = None
    for month in core['months']:
        key = month['month']
        ramp = next(r for r in month['rows'] if r['ticker'] == 'RAMP_MEDIAN_SPEND')
        if ramp['score'] is not None:
            ramp['observationDate'] = f"{key}-{monthrange(int(key[:4]), int(key[5:]))[1]:02}"
            ramp['carriedForward'] = False
            latest_ramp = dict(ramp)
        elif latest_ramp is not None:
            ramp.update(latest_ramp, carriedForward=True)
        ramp['weight'] = .15
        card_month = max((m for m in cards if m <= key), default=None)
        card = cards.get(card_month)
        card_row = scoring_row('LAB_CARD_SPENDING', 'OpenAI and Anthropic consumer card spending',
            .05, (*card, baseline) if card else None,
            'Latest available complete four-week spending window versus prior four weeks')
        card_row['carriedForward'] = card is not None and card[2][:7] != key
        month['rows'].append(card_row)
        eligible = sum(rows.get(key, {}).get('logLevel') is not None for rows in labs.values())
        for company, rows in labs.items():
            observation = rows.get(key)
            has_score = observation is not None and observation['logLevel'] is not None
            weight = .05 / eligible if has_score else 0 if eligible else .025
            month['rows'].append(run_rate_row(company, weight, observation, calibration[company]))
        reweight_month(month)
    core['metadata']['version'] = '3.3'
    core['metadata']['method'] = core['metadata']['method'].replace(
        'Monetization uses Ramp median AI spending per employee as a paid-spending proxy.',
        'Monetization allocates 15% of the core to Ramp business spending, 5% to consumer card spending, and 5% to absolute annualized lab revenue levels shared by eligible labs. Latest available Ramp and consumer-card observations are carried forward with their source dates.')
    core['metadata']['labRunRateBaseline'] = calibration
    core['metadata']['labRevenueMethod'] = (
        'OpenAI and Anthropic use saved full-company absolute annualized revenue levels, retaining each source ARR '
        'or annualized-run-rate definition. Observations enter on their news report dates and carry forward until '
        'a newer economic observation is disclosed. Scores standardize log USD levels against each lab own '
        'frozen disclosure-level history through June 2026, labeled provisional. Slowing growth alone does not '
        'reduce this scale score. YoY changes are retained as context. Available lab signals share 5% nominal '
        'core weight. Ramp uses the latest available monthly scored observation. Consumer cards use the latest '
        'available complete four-week window against the preceding four weeks. Source dates and held values are shown.')
