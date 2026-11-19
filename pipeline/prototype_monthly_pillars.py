"""Compare monthly candidate coverage without assigning scores to unavailable inputs."""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / 'data/derived'


def snapshot(name):
    text = (ROOT / 'app' / f'{name}-snapshot.ts').read_text(encoding='utf-8')
    return json.JSONDecoder().raw_decode(text.split('=', 1)[1].lstrip())[0]


def main():
    ramp = {r['month']: r for r in snapshot('ramp')['monthly']}
    construction = next(s for s in snapshot('index-price')['series'] if s['field'] == 'CNSTPRDA Index')
    infrastructure = {r['month']: r for r in construction['cells'] if not r['partial']}
    with (ROOT / 'monthly-capex-coverage.csv').open(newline='', encoding='utf-8') as stream:
        capex = list(csv.DictReader(stream))
    months = sorted({r['month'] for r in capex})
    rows = []
    # Scenario lags are measured from the reference month, not estimated release dates.
    def reference_month(month, lag):
        year, number = map(int, month.split('-'))
        year, zero_based_month = divmod(year * 12 + number - 1 - lag, 12)
        return f'{year:04d}-{zero_based_month + 1:02d}'

    for month in months:
        adoption = ramp.get(month, {}).get('paidAdoption')
        construction_yoy = infrastructure.get(month, {}).get('yoy')
        issuers = [r for r in capex if r['month'] == month and r['yoy_pct'] != '']
        rows.append(dict(month=month, adoption_paid_share=adoption,
                         adoption_availability='release_date_unverified' if adoption is not None else 'missing',
                         monetization_status='no_accepted_monthly_actual',
                         capex_issuers_with_yoy=len(issuers),
                         capex_yoy_issuers_within_90_days=sum(r['within_90_days']=='True' for r in issuers),
                         capex_yoy_issuers_within_120_days=sum(r['within_120_days']=='True' for r in issuers),
                         infrastructure_construction_yoy=construction_yoy,
                         infrastructure_availability='release_date_unverified' if construction_yoy is not None else 'missing'))
        for lag in (1, 2):
            reference = reference_month(month, lag)
            rows[-1][f'assumed_lag_{lag}m_reference'] = reference
            rows[-1][f'assumed_lag_{lag}m_adoption_paid_share'] = ramp.get(reference, {}).get('paidAdoption')
            rows[-1][f'assumed_lag_{lag}m_construction_yoy'] = infrastructure.get(reference, {}).get('yoy')
    with (ROOT / 'monthly-pillar-coverage.csv').open('w', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    overlap = [r['month'] for r in rows if r['adoption_paid_share'] is not None
               and r['infrastructure_construction_yoy'] is not None and r['capex_issuers_with_yoy'] == 5]
    print(f'{len(rows)} months; {len(overlap)} with all three available candidates: {overlap}')
    for lag in (1, 2):
        for days in (90, 120):
            eligible = [r['month'] for r in rows if r[f'assumed_lag_{lag}m_adoption_paid_share'] is not None
                        and r[f'assumed_lag_{lag}m_construction_yoy'] is not None
                        and r[f'capex_yoy_issuers_within_{days}_days'] == 5]
            print(f'{lag} month assumed lag, {days} day CapEx limit: {len(eligible)} months')


if __name__ == '__main__':
    main()
