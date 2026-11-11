"""Shared cached-XML reader for monthly index inputs; never modify the workbook."""
import datetime as dt
import hashlib
import json
import math
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from export_bloomberg import export, read_tables
from paths import DATA_ROOT, BUILD_ROOT


def number(value):
    return float(value) if isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value) else None


def shift(month, offset):
    n = int(month[:4]) * 12 + int(month[5:]) - 1 + offset
    return f'{n // 12:04}-{n % 12 + 1:02}'


def parse(table, config):
    values = table['values']
    headers = [config['headerAliases'].get(h, h) for h in values[0][1:]]
    if len(headers) != len(set(headers)):
        raise ValueError('Duplicate index headers after alias normalization')
    missing = set(config.get('requiredCoreFields', [])) - set(headers)
    if missing:
        raise ValueError(f'Missing monthly core fields: {sorted(missing)}')
    observations = {}
    for row in values[2:]:
        if not row or number(row[0]) is None:
            continue
        date = dt.datetime(1899, 12, 30) + dt.timedelta(days=row[0])
        month = date.strftime('%Y-%m')
        if month in observations:
            raise ValueError(f'Duplicate index month: {month}')
        observations[month] = {h: number(row[i + 1]) if i + 1 < len(row) else None for i, h in enumerate(headers)}
    if not observations:
        raise ValueError('No monthly index observations')
    return headers, dict(sorted(observations.items()))


INFRA_SHEETS = ('Monthly Data Value', 'High Freq Data Value')
INFRA_FIELDS = (
    ('DGNOCOEQ', 'DGNOITIN', 'USIMTELE', 'USIMCOMP', 'KOTCDRAM', 'KOTCNAND', 'USIMSEMI', 'IPNEHITC'),
    ('SDH100RT', 'SDB200RT', 'ISPPDR48', 'ISPPN512'),
)


def read_infrastructure(source):
    tables = {table['sheet']: table['values'] for table in read_tables(source, INFRA_SHEETS)}
    series = {}
    for sheet, tickers in zip(INFRA_SHEETS, INFRA_FIELDS):
        values = tables[sheet]
        for ticker in tickers:
            field = f'{ticker} Index'
            column = values[0].index(field)
            points = {}
            for row in values[2:]:
                if len(row) <= column or number(row[3]) is None or number(row[column]) is None:
                    continue
                date = dt.date(1899, 12, 30) + dt.timedelta(days=row[3])
                if date in points or row[column] <= 0:
                    raise ValueError(f'Invalid or duplicate {field} observation on {date}')
                points[date] = row[column]
            if not points:
                raise ValueError(f'No cached values for {field} in {sheet}')
            series[field] = dict(sorted(points.items()))
    return series


def overlay_infrastructure(observations, source):
    series = read_infrastructure(source)
    for row in observations.values():
        for field in series:
            row[field] = None
    for field, points in series.items():
        for date, value in points.items():
            month = date.strftime('%Y-%m')
            if month not in observations:
                observations[month] = dict.fromkeys(next(iter(observations.values())))
            observations[month][field] = value
    return dict(sorted(observations.items()))


def load(source=None, inspection=None):
    config = json.loads((DATA_ROOT / 'data/reference/index_price_config.json').read_text(encoding='utf-8'))
    source = Path(source or DATA_ROOT / 'Indexlist.xlsx')
    inspection = Path(inspection or BUILD_ROOT / 'bloomberg.inspect.ndjson')
    workbook_hash = hashlib.sha256(source.read_bytes()).hexdigest()
    tables = [json.loads(line) for line in inspection.read_text(encoding='utf-8').splitlines()] if inspection.exists() else []
    table = next((r for r in tables if r.get('sheet') == 'Index Price Value'), None)
    if table is None or table.get('sourceSha256') != workbook_hash:
        export(source, inspection)
        table = next(json.loads(line) for line in inspection.read_text(encoding='utf-8').splitlines() if json.loads(line).get('sheet') == 'Index Price Value')
    headers, observations = parse(table, config)
    infra = DATA_ROOT / 'AI_Infra.xlsx'
    if infra.exists():
        observations = overlay_infrastructure(observations, infra)
        config['infrastructureSha256'] = hashlib.sha256(infra.read_bytes()).hexdigest()
    return config, headers, observations, workbook_hash, hashlib.sha256(inspection.read_bytes()).hexdigest()


def signal(observations, month, field, offsets=(0, 12), length=12):
    windows = [[observations.get(shift(month, -i), {}).get(field) for i in range(o, o + length)] for o in offsets]
    return (sum(windows[0]) / sum(windows[1]) - 1) * 100 if all(v is not None for w in windows for v in w) and sum(windows[1]) > 0 else None
