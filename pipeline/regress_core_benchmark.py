"""Fit diagnostic core pillar weights against monthly semiconductor excess returns."""
import csv
import itertools
import json
from pathlib import Path

import numpy as np
import openpyxl

ROOT = Path(__file__).resolve().parents[1]
PILLARS = ('Adoption', 'Monetization', 'Hyperscalers', 'Infrastructure')


def month_number(month):
    year, number = map(int, month.split('-'))
    return year * 12 + number


def fit(x, y, positive=False):
    best = None
    groups = itertools.chain.from_iterable(itertools.combinations(range(x.shape[1]), n)
                                          for n in range(x.shape[1] + 1)) if positive else [tuple(range(x.shape[1]))]
    for group in groups:
        design = np.column_stack((np.ones(len(y)), x[:, list(group)]))
        coef = np.linalg.lstsq(design, y, rcond=None)[0]
        if positive and min(coef[1:], default=0) < -1e-10:
            continue
        mse = np.mean((y - design @ coef) ** 2)
        if best is None or mse < best[0]:
            slopes = np.zeros(x.shape[1])
            slopes[list(group)] = np.maximum(coef[1:], 0) if positive else coef[1:]
            best = mse, coef[0], slopes
    return best


def analyze(rows, target):
    matched = [r for r in rows if r[target] is not None]
    x = np.array([[r[p] for p in PILLARS] for r in matched])
    y = np.array([r[target] for r in matched])
    if len(y) <= len(PILLARS) + 1:
        return {'n': len(y), 'status': 'insufficient observations for four-pillar regression'}
    mse, _, beta = fit(x, y)
    constrained, _, positive = fit(x, y, positive=True)
    equal, _, _ = fit(x.mean(axis=1, keepdims=True), y)
    weights = positive / positive.sum() if positive.sum() > 0 else None
    leave_one_out = []
    for i in range(len(y)):
        mask = np.arange(len(y)) != i
        _, _, slopes = fit(x[mask], y[mask], positive=True)
        if slopes.sum() > 0:
            leave_one_out.append(slopes / slopes.sum())
    errors = {'constrained': [], 'equal_weight': [], 'historical_mean': []}
    for i in range(6, len(y)):
        for name, features, restrict in [('constrained', x, True), ('equal_weight', x.mean(axis=1, keepdims=True), False)]:
            _, intercept, slopes = fit(features[:i], y[:i], positive=restrict)
            errors[name].append((y[i] - intercept - features[i] @ slopes) ** 2)
        errors['historical_mean'].append((y[i] - y[:i].mean()) ** 2)
    return dict(n=len(y), first=matched[0]['month'], last=matched[-1]['month'],
                designRank=int(np.linalg.matrix_rank(np.column_stack((np.ones(len(y)), x)))),
                olsBeta=dict(zip(PILLARS, beta.tolist())),
                inSampleR2={k: 1-v/np.var(y) for k, v in [('ols', mse), ('constrained', constrained), ('equal_weight', equal)]},
                fittedWeights=dict(zip(PILLARS, weights.tolist())) if weights is not None else None,
                leaveOneMonthOutWeightRanges={p: [float(min(col)), float(max(col))] for p, col in zip(PILLARS, zip(*leave_one_out))},
                expandingTestMonths=len(errors['constrained']),
                expandingRmse={k: float(np.sqrt(np.mean(v))) for k, v in errors.items() if v})


def main():
    source = ROOT / 'AI_Benchmark.xlsx'
    book = openpyxl.load_workbook(source, read_only=True, data_only=True)
    prices = {}
    daily = {}
    try:
        headers = next(book['Value'].iter_rows(max_row=1, values_only=True))
        benchmark = [str(value).strip() for value in headers[1:3]]
        if benchmark != ['XSOX Index', 'SPXT Index']:
            raise ValueError(f'Expected matching total-return series, found {benchmark}')
        for day, sox, spxt in book['Value'].iter_rows(min_row=3, max_col=3, values_only=True):
            if hasattr(day, 'strftime') and all(isinstance(v, (int, float)) and v > 0 for v in (sox, spxt)):
                daily[day] = sox / spxt
                month = day.strftime('%Y-%m')
                if month not in prices or day > prices[month][0]:
                    prices[month] = (day, sox, spxt)
    finally:
        book.close()
    # The workbook's last month may be partial.
    prices.pop(max(prices))
    spread = {}
    for previous, current in itertools.pairwise(sorted(prices)):
        if month_number(current) - month_number(previous) == 1:
            _, old_sox, old_spxt = prices[previous]
            _, sox, spxt = prices[current]
            spread[current] = 100 * (sox / old_sox - spxt / old_spxt)
    path = ROOT / 'data/derived/app/core-contribution-snapshot.ts'
    core = json.JSONDecoder().raw_decode(path.read_text(encoding='utf-8').split('=', 1)[1].lstrip())[0]
    rows = []
    for month in core['months']:
        key = month['month']
        if key > '2026-06' or key not in spread:
            continue
        scores = {}
        for pillar in PILLARS:
            members = [r for r in month['rows'] if r['pillar'] == pillar and r['score'] is not None
                       and r['effectiveWeight'] > 0]
            if members:
                weight = sum(r['effectiveWeight'] for r in members)
                scores[pillar] = sum(r['effectiveWeight'] * r['score'] for r in members) / weight
        if len(scores) != 4:
            continue
        next_month = next((m for m in spread if month_number(m) == month_number(key) + 1), None)
        rows.append(dict(month=key, **scores, available_constituents=month['availableConstituents'],
                         total_constituents=len(month['rows']), same_month_spread=spread[key],
                         next_month_spread=spread.get(next_month)))
    output = ROOT / 'data/derived'
    baseline = daily[min(daily)]
    market = [dict(date=day.date().isoformat(), relativeReturn=100 * (ratio / baseline - 1))
              for day, ratio in sorted(daily.items())]
    (output / 'app/semiconductor-market-snapshot.ts').write_text(
        'export const semiconductorMarket = ' + json.dumps(market, indent=2) + ';\n', encoding='utf-8')
    if rows:
        with (output / 'core-benchmark-regression-sample.csv').open('w', newline='', encoding='utf-8') as stream:
            writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
            writer.writeheader()
            writer.writerows(rows)
    result = {target: analyze(rows, target) for target in ('same_month_spread', 'next_month_spread')}
    result['benchmark'] = benchmark
    text = json.dumps(result, indent=2)
    (output / 'core-benchmark-regression.json').write_text(text + '\n', encoding='utf-8')
    print(text)


if __name__ == '__main__':
    main()
