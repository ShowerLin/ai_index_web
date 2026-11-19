"""Read dated SDLLMTK values from the saved Adoption workbook."""
from calendar import monthrange
from collections import defaultdict
from datetime import date
from hashlib import sha256
from math import isfinite

import openpyxl


def read_silicon_prices(data_root):
    candidates = [data_root / name for name in ('AI_Adoption.xlsx', 'AI_Aoption.xlsx')
                  if (data_root / name).is_file()]
    if len(candidates) != 1:
        raise ValueError('Expected exactly one Adoption price workbook')
    path = candidates[0]
    checksum = sha256(path.read_bytes()).hexdigest()
    workbook = openpyxl.load_workbook(path, read_only=True, data_only=True)
    try:
        rows = iter(workbook['Value'].values)
        if next(rows)[1] != 'SDLLMTK Index':
            raise ValueError('Expected SDLLMTK Index in column B of the Value sheet')
        next(rows)
        daily = []
        for rownum, row in enumerate(rows, 3):
            day, value = row[:2]
            if not isinstance(day, date) or not isinstance(value, (int, float)):
                continue
            if not isfinite(value) or value <= 0:
                raise ValueError(f'Invalid SDLLMTK value at B{rownum}')
            daily.append(dict(date=day.strftime('%Y-%m-%d'), value=value, cell=f'B{rownum}'))
    finally:
        workbook.close()
    days = [row['date'] for row in daily]
    if not days or days != sorted(set(days)):
        raise ValueError('Expected unique SDLLMTK dates in chronological order')
    if sha256(path.read_bytes()).hexdigest() != checksum:
        raise ValueError('Adoption workbook changed during the price read')
    by_month = defaultdict(list)
    for row in daily:
        by_month[row['date'][:7]].append(row['value'])
    monthly = []
    for month, values in by_month.items():
        expected = monthrange(*map(int, month.split('-')))[1]
        monthly.append(dict(month=month, value=sum(values) / len(values), days=len(values),
                            expectedDays=expected, complete=len(values) == expected, endValue=values[-1]))
    return dict(workbook=path.name, sheet='Value', ticker='SDLLMTK Index',
                workbookSha256=checksum, through=days[-1]), daily, monthly
