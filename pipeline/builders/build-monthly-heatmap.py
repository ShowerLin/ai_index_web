from paths import DATA_ROOT, BUILD_ROOT, REFERENCE, RAMP, OPENROUTER
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
from index_price import load, shift
config, headers, observations, workbook_hash, inspection_hash = load(inspection=args.input)

groups = {
    'Adoption': ['BTOS0700', 'BTOS2400'],
    'Demand': ['KOTCDRAM'],
    'Investment': ['DGNOCOEQ', 'DGNOITIN', 'DGNOTGOP', 'CNSTPRDA', 'IPNEHITC'],
    'Imports': ['USIMTELE', 'USIMSEMI', 'USIMCOMP'],
}
months = sorted(m for m in observations if shift(config['completedMonthThrough'], -11) <= m <= config['completedMonthThrough'])
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
                         'sourceSha256': inspection_hash,
                         'sourceWorkbookSha256': workbook_hash,
                         'method': 'Equal-weight mean of constituent month-over-month percentage changes; incomplete pillars withheld. Token price excluded from Demand.',
                         'reviewedAt': config['reviewedAt'], 'completedMonthThrough': config['completedMonthThrough'], 'window': f'{months[0]} through {months[-1]}'}, 'months': months, 'rows': rows}
output = BUILD_ROOT / 'app' / 'monthly-heatmap-snapshot.ts'
output.write_text('export const monthlyHeatmapSnapshot = ' + json.dumps(snapshot, indent=2) + ' as const;\n', encoding='utf-8')
print(f'Generated {len(rows)} monthly macro rows across {len(months)} months.')
