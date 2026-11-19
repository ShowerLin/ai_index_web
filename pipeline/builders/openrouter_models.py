"""Compact, lossless model allocations from the saved public top-50 dataset."""
import datetime as dt
import hashlib
import json


def build_model_snapshot(payload, source_hash):
    models = sorted({r['model_permaslug'] for r in payload['data']} - {'other'})
    indices = {name: i for i, name in enumerate(models)}
    days, seen = {}, set()
    for row in payload['data']:
        date, model = row['date'], row['model_permaslug']
        dt.date.fromisoformat(date)
        key = date, model
        if key in seen:
            raise ValueError(f'Duplicate OpenRouter model observation: {key}')
        seen.add(key)
        value = int(row['total_tokens'])
        if value < 0 or value > 2**53 - 1:
            raise ValueError('Token count outside the exact JavaScript integer range')
        day = days.setdefault(date, dict(date=date, total=0, values=[]))
        day['total'] += value
        if day['total'] > 2**53 - 1:
            raise ValueError('Daily total outside the exact JavaScript integer range')
        if model != 'other':
            day['values'].append([indices[model], value])
    if not days:
        raise ValueError('No OpenRouter model observations')
    for day in days.values():
        day['values'].sort()
    first, last = min(days), max(days)
    start, stop = dt.date.fromisoformat(first), dt.date.fromisoformat(last)
    missing = [(start + dt.timedelta(days=i)).isoformat()
               for i in range((stop-start).days+1)
               if (start + dt.timedelta(days=i)).isoformat() not in days]
    return dict(metadata=dict(
        through=last, start=first, asOf=max(m['as_of'] for m in payload['meta']),
        source='https://openrouter.ai/rankings',
        endpoint='https://openrouter.ai/api/v1/datasets/rankings-daily',
        sourceSha256=source_hash, missingDays=missing,
        scope='Public OpenRouter prompt + completion tokens, daily UTC buckets. Model variants stay separate.',
        coverage='The feed names the top 50 models each day. Unnamed model activity remains in Other; named-model totals show only separately reported activity.',
        license='CC BY 4.0'), models=models, daily=[days[d] for d in sorted(days)])


def write_model_snapshot(source, destination):
    body = source.read_bytes()
    snapshot = build_model_snapshot(json.loads(body), hashlib.sha256(body).hexdigest())
    destination.write_text('export const openrouterModelSnapshot = ' +
                           json.dumps(snapshot, separators=(',', ':')) + ' as const;\n', encoding='utf-8')
    return snapshot
