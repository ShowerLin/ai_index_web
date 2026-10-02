"""Build monthly macro momentum from the saved workbook inspection JSON.

Usage: python scripts/build-monthly-heatmap.py --input PATH/Indexlist.xlsx.inspect.ndjson
Quarterly CapEx is displayed separately by the page and is never interpolated.
"""
import argparse
import hashlib
import json
from datetime import datetime, timedelta
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--input', type=Path, required=True)
args = parser.parse_args()
raw = args.input.read_bytes()
table = next(item for line in raw.decode('utf-8').splitlines()
             if (item := json.loads(line)).get('kind') == 'table'
             and item.get('sheet') == 'Index Price Value')
values = table['values']
headers = values[0]
observations = {}
for row in values[2:]:
    if isinstance(row[0], (int, float)):
        date = datetime(1899, 12, 30) + timedelta(days=row[0])
        observations[date.strftime('%Y-%m')] = dict(zip(headers[1:], row[1:]))
groups = {
    'Adoption': ['BTOS0700', 'BTOS2400'],
    'Demand': ['KOTCDRAM'],
    'Investment': ['DGNOCOEQ', 'DGNOITIN', 'DGNOTGOP', 'CNSTPRDA', 'IPNEHITC'],
    'Imports': ['USIMTELE', 'USIMSEMI', 'USIMCOMP'],
}
months = [f'{year}-{month:02}' for year, month in
          [(2025, m) for m in range(7, 13)] + [(2026, m) for m in range(1, 7)]]
rows = []
for pillar, tickers in groups.items():
    cells = []
    constituents = [{'ticker': ticker, 'cells': []} for ticker in tickers]
    for month in months:
        year, number = map(int, month.split('-'))
        previous = f'{year if number > 1 else year-1}-{number-1 if number > 1 else 12:02}'
        changes = []
        for ticker, constituent in zip(tickers, constituents):
            current = observations.get(month, {}).get(f'{ticker} Index')
            prior = observations.get(previous, {}).get(f'{ticker} Index')
            valid = isinstance(current, (int, float)) and isinstance(prior, (int, float)) and prior > 0
            change = (current / prior - 1) * 100 if valid else None
            if valid:
                changes.append(change)
            constituent['cells'].append({'month': month, 'value': round(change, 1) if valid else None,
                                         'level': current if isinstance(current, (int, float)) else None,
                                         'priorLevel': prior if isinstance(prior, (int, float)) else None})
        complete = len(changes) == len(tickers)
        cells.append({'month': month, 'value': round(sum(changes)/len(changes), 1) if complete else None,
                      'breadth': f'{sum(value > 0 for value in changes)}/{len(tickers)}',
                      'coverage': f'{len(changes)}/{len(tickers)}'})
    rows.append({'pillar': pillar, 'cells': cells, 'constituents': constituents})
snapshot = {'metadata': {'source': 'Indexlist.xlsx — Index Price Value (saved inspection)',
                         'sourceSha256': hashlib.sha256(raw).hexdigest(),
                         'method': 'Equal-weight mean of constituent month-over-month percentage changes; incomplete pillars withheld. Token price excluded from Demand.',
                         'window': '2025-07 through 2026-06'}, 'months': months, 'rows': rows}
output = Path(__file__).resolve().parents[1] / 'app' / 'monthly-heatmap-snapshot.ts'
output.write_text('export const monthlyHeatmapSnapshot = ' + json.dumps(snapshot, indent=2) + ' as const;\n', encoding='utf-8')
print(f'Generated {len(rows)} monthly macro rows across {len(months)} months.')
