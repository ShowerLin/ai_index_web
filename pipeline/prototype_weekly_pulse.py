"""Build a retrospective weekly AI activity pulse and separate market comparison."""
import csv
import json
import statistics
import sys
from datetime import date, timedelta
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parents[1]
DERIVED = ROOT / 'data/derived'
sys.path.insert(0, str(ROOT / 'pipeline/builders'))
from index_price import read_infrastructure

HARDWARE = {
    'h100_rental': 'SDH100RT Index',
    'b200_rental': 'SDB200RT Index',
    'ddr5_spot': 'ISPPDR48 Index',
    'nand_spot': 'ISPPN512 Index',
}


def hardware_weeks():
    prices = read_infrastructure(ROOT / 'AI_Infra.xlsx')
    result = {}
    for name, field in HARDWARE.items():
        buckets = {}
        for day, value in prices[field].items():
            if day.weekday() < 5:
                end = day + timedelta(days=6 - day.weekday())
                buckets.setdefault(end, []).append(value)
        latest = max(prices[field])
        result[name] = {end: statistics.mean(values) for end, values in buckets.items()
                        if end <= latest and len(values) >= 4}
    return result


def snapshot(name):
    text = (DERIVED / 'app' / name).read_text(encoding='utf-8')
    return json.JSONDecoder().raw_decode(text.split('=', 1)[1].lstrip())[0]


def momentum(values, end):
    window = [values.get(end - timedelta(weeks=i)) for i in range(8)]
    if any(value is None for value in window) or sum(window[4:]) <= 0:
        return None
    return 100 * (sum(window[:4]) / sum(window[4:]) - 1)


def market_levels():
    workbook = openpyxl.load_workbook(ROOT / 'AI_Benchmark.xlsx', read_only=True, data_only=True)
    try:
        sheet = workbook['Value']
        assert tuple(cell.value for cell in sheet[1][1:3]) == ('XSOX Index', 'SPXT Index')
        return {day.date(): sox / spxt for day, sox, spxt in sheet.iter_rows(min_row=3, max_col=3, values_only=True)
                if hasattr(day, 'date') and all(isinstance(v, (int, float)) and v > 0 for v in (sox, spxt))}
    finally:
        workbook.close()


def main():
    tokens = snapshot('token-activity-snapshot.ts')['weekly']
    prices = snapshot('adoption-price-snapshot.ts')
    ramp = prices['rampWeekly']
    daily_price = {date.fromisoformat(r['date']): r['value'] for r in prices['siliconDaily']
                   if r['value'] is not None and r['value'] > 0}
    weekly_price = {}
    for day in daily_price:
        if day.weekday() != 6:
            continue
        week = [daily_price.get(day - timedelta(days=i)) for i in range(7)]
        if all(value is not None for value in week):
            weekly_price[day] = statistics.mean(week)
    usage = {date.fromisoformat(r['end']): r['openrouter'] for r in tokens if r['openrouterDays'] == 7}
    spending = {date.fromisoformat(r['end']): r['spendUsd'] for r in ramp
                if r['value'] is not None and r['coverage'] >= .95}
    card_source = json.loads((DERIVED / 'monetization/snapshot.json').read_text(encoding='utf-8'))
    card_spending = {date.fromisoformat(r['date']): r['openai'] + r['anthropic']
                     for r in card_source['appSpending']['history']
                     if r['openai'] is not None and r['anthropic'] is not None}
    hardware = hardware_weeks()
    levels = market_levels()
    trading_dates = sorted(levels)
    end = min(usage.keys() | spending.keys())
    last_market = trading_dates[-1]
    last_completed_market_week = last_market - timedelta(days=last_market.weekday() + 1)
    last = max(max(usage.keys() | spending.keys() | card_spending.keys() | weekly_price.keys() | set().union(*(weeks.keys() for weeks in hardware.values()))), last_completed_market_week)
    rows = []
    while end <= last:
        recent = next((d for d in reversed(trading_dates) if d <= end), None)
        prior = next((d for d in reversed(trading_dates) if d <= end - timedelta(weeks=4)), None)
        relative = (100 * (levels[recent] / levels[prior] - 1)
                    if recent and prior and (end - recent).days <= 7
                    and (end - timedelta(weeks=4) - prior).days <= 7 else None)
        price_growth = momentum(weekly_price, end)
        affordability = 100 * (1 / (1 + price_growth / 100) - 1) if price_growth is not None else None
        rows.append(dict(week_end=end.isoformat(), openrouter_momentum_pct=momentum(usage, end),
                         ramp_spending_momentum_pct=momentum(spending, end),
                         consumer_card_momentum_pct=momentum(card_spending, end),
                         token_affordability_momentum_pct=affordability,
                         xsox_vs_spxt_4w_pct=relative, market_close=recent.isoformat() if recent else None))
        rows[-1].update({f'{name}_momentum_pct': momentum(weeks, end) for name, weeks in hardware.items()})
        end += timedelta(weeks=1)

    fields = ('openrouter_momentum_pct', 'ramp_spending_momentum_pct')
    baseline_rows = [r for r in rows if r['week_end'][:4] == '2025' and all(r[f] is not None for f in fields)]
    baseline = {f: (statistics.mean(r[f] for r in baseline_rows), statistics.stdev(r[f] for r in baseline_rows)) for f in fields}
    card_field = 'consumer_card_momentum_pct'
    card_baseline = [r[card_field] for r in rows if r['week_end'] <= '2026-10-04'
                     and r[card_field] is not None and all(r[f] is not None for f in fields)]
    baseline[card_field] = (statistics.mean(card_baseline), statistics.stdev(card_baseline))
    price_field = 'token_affordability_momentum_pct'
    price_baseline = [r[price_field] for r in rows if r['week_end'] <= '2026-10-18'
                      and r[price_field] is not None]
    baseline[price_field] = (statistics.mean(price_baseline), statistics.stdev(price_baseline))
    fields += (card_field, price_field)
    for name in hardware:
        field = f'{name}_momentum_pct'
        history = [r[field] for r in rows if r['week_end'] <= '2026-11-01' and r[field] is not None]
        baseline[field] = (statistics.mean(history), statistics.stdev(history))
        fields += (field,)
        print(f'{name} calibration weeks: {len(history)}')
    print('Token affordability calibration weeks:', len(price_baseline))
    for row in rows:
        scores = []
        for field in fields:
            value = row[field]
            mean, stdev = baseline[field]
            score = max(0, min(100, 50 + 15 * (value - mean) / stdev)) if value is not None else None
            row[field.replace('_momentum_pct', '_score')] = score
            if score is not None:
                scores.append(score)
        row['signals_available'] = len(scores)
        row['pulse'] = round(statistics.mean(scores), 2) if scores else None
    output = DERIVED / 'weekly-ai-pulse.csv'
    with output.open('w', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    (DERIVED / 'app/weekly-pulse-snapshot.ts').write_text(
        'export const weeklyPulse = ' + json.dumps(rows, indent=2, allow_nan=False) + ';\n', encoding='utf-8')
    print('Matched 2025 calibration weeks:', len(baseline_rows))
    print('Latest full-coverage week:', next(r for r in reversed(rows) if r['signals_available'] == len(fields)))
    print('Latest operating reading:', next(r for r in reversed(rows) if r['pulse'] is not None))
    print('Latest market week:', rows[-1])


if __name__ == '__main__':
    main()
