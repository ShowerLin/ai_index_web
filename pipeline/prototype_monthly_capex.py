"""Generate a month-end CapEx coverage panel from the accepted saved snapshot."""
import csv
import json
from calendar import monthrange
from collections import Counter
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def build(snapshot):
    cutoff = date.fromisoformat(snapshot['asOf'])
    tickers = sorted({r['ticker'] for r in snapshot['records']})
    actuals = [r for r in snapshot['records'] if r['observedIndexEligible']
               and r['actualEstimate'] == 'actual' and r['firstPublicDate']
               and r['values']['capex_raw'] is not None]
    month = date.fromisoformat(min(r['periodEnd'] for r in actuals)).replace(day=1)
    panel = []
    while True:
        end = month.replace(day=monthrange(month.year, month.month)[1])
        if end > cutoff:
            break
        for ticker in tickers:
            available = [r for r in actuals if r['ticker'] == ticker
                         and max(r['firstPublicDate'], r['periodEnd']) <= end.isoformat()]
            latest = max(available, key=lambda r: r['periodEnd'], default=None)
            entry = dict(month=month.strftime('%Y-%m'), ticker=ticker, status='missing',
                         fiscal_period='', period_end='', release_date='', age_days='',
                         capex_source_units='', yoy_pct='', within_90_days=False, within_120_days=False)
            if latest:
                release = date.fromisoformat(latest['firstPublicDate'])
                age = (end - release).days
                year, quarter = latest['fiscalPeriod'].split()
                prior = next((r for r in available if r['fiscalPeriod'] == f'{int(year)-1} {quarter}'), None)
                capex = -latest['values']['capex_raw']
                yoy = (capex / -prior['values']['capex_raw'] - 1) * 100 if prior and prior['values']['capex_raw'] < 0 else None
                entry.update(status='released' if release >= month else 'carried',
                             fiscal_period=latest['fiscalPeriod'], period_end=latest['periodEnd'],
                             release_date=release.isoformat(), age_days=age,
                             capex_source_units=capex, yoy_pct=round(yoy, 4) if yoy is not None else '',
                             within_90_days=age <= 90, within_120_days=age <= 120)
            panel.append(entry)
        month = date(month.year + (month.month == 12), month.month % 12 + 1, 1)
    return panel


if __name__ == '__main__':
    source = ROOT / 'data/derived/hyperscalers/financials.json'
    panel = build(json.loads(source.read_text(encoding='utf-8')))
    output = ROOT / 'data/derived/monthly-capex-coverage.csv'
    with output.open('w', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(panel[0]))
        writer.writeheader()
        writer.writerows(panel)
    months = sorted({r['month'] for r in panel})
    print(months[0], months[-1], len(months), Counter(r['status'] for r in panel))
    for field in ('within_90_days', 'within_120_days', 'yoy_pct'):
        complete = [m for m in months if all(r[field] != '' and r[field] is not False
                    for r in panel if r['month'] == m)]
        print(field, len(complete), complete[:1], complete[-1:])
    print(output)
