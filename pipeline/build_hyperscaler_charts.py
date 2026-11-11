"""Build chart-only CapEx inputs from accepted hyperscaler financials; no core changes."""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NAMES = {'MSFT': 'Microsoft', 'GOOGL': 'Alphabet', 'AMZN': 'Amazon', 'META': 'Meta', 'ORCL': 'Oracle'}


def build(data):
    companies = []
    for ticker, name in NAMES.items():
        rows = sorted((r for r in data['records'] if r['ticker'] == ticker), key=lambda r: r['periodEnd'])
        lookup = {r['fiscalPeriod']: r for r in rows}
        points = []
        for row in rows:
            value = row['values']['capex_raw']
            if value is None or not row['availableAsOf']:
                continue
            if value > 0:
                raise ValueError('Expected negative source CapEx')
            year, quarter = row['fiscalPeriod'].split()
            prior = lookup.get(f'{int(year)-1} {quarter}')
            prior_value = prior['values']['capex_raw'] if prior and prior['availableAsOf'] else None
            points.append(dict(periodEnd=row['periodEnd'], fiscalPeriod=row['fiscalPeriod'],
                               status=row['actualEstimate'], value=-value / 1e9,
                               yoy=(value / prior_value - 1) * 100 if prior_value is not None and prior_value < 0 else None,
                               disclosedAt=row['firstPublicDate'], cell=row['sourceCells']['capex_raw']))
        actuals = [p for p in points if p['status'] == 'actual']
        forecasts = [p for p in points if p['status'] == 'estimate'][:4]
        companies.append(dict(ticker=ticker, name=name, actuals=actuals, forecasts=forecasts,
                              forwardTotal=sum(p['value'] for p in forecasts) if len(forecasts) == 4 else None))
    return dict(metadata=dict(asOf=data['asOf'], source=data['source'], sourceSheet=data['sourceSheet'],
                             sourceSha256=data['sourceSha256'], policyId=data['policy']['id'],
                             unit='USD billions (issuer reporting currency)', coreWeight=0,
                             basis='Saved Bloomberg headline CapEx; positive spending shown by reversing source outflow sign. No lease bridge or compute-share estimates.',
                             forwardMethod='Next four native fiscal quarters with period ends after the review date. Includes the current incomplete quarter; not a calendar-year or exact next-12-month total.',
                             fcf='Excluded pending replacement field'), companies=companies)


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--input', type=Path, default=ROOT / 'data/derived/hyperscalers/financials.json')
    p.add_argument('--output', type=Path, default=ROOT / 'data/derived/app/hyperscaler-financial-snapshot.ts')
    args = p.parse_args()
    result = build(json.loads(args.input.read_text(encoding='utf-8')))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text('export const hyperscalerFinancialSnapshot = ' + json.dumps(result, indent=2, allow_nan=False) + ' as const;\n', encoding='utf-8')
    print(json.dumps(dict(output=str(args.output), companies=[dict(ticker=c['ticker'], actualThrough=c['actuals'][-1]['periodEnd'], forwardTotal=c['forwardTotal']) for c in result['companies']]), indent=2))


if __name__ == '__main__':
    main()
