"""Read and validate the saved Bloomberg cloud estimate grid."""
import datetime, hashlib, math, re

import openpyxl


def read_cloud_estimates(source):
    values = openpyxl.load_workbook(source, read_only=True, data_only=True)
    formulas = openpyxl.load_workbook(source, read_only=True, data_only=False)
    sheet, query = values['Cloud FA Value'], formulas['Cloud FA Formula']
    records, excluded = [], []
    # Each block has a fiscal header, metric rows, and optionally a saved date row.
    dated = any(str(row[0]).strip() == 'Period End Date' for row in sheet.values)
    blocks = (
        [(1, [2, 3, 4], 5), (7, [8, 9, 10], 11), (13, [14, 15, 16], 17),
         (19, [20, 21, 22, 23], 24), (26, [27], 28), (26, [30], 31),
         (26, [33], 34), (36, [37], 38)]
        if dated else
        [(1, [2, 3, 4], None), (6, [7, 8, 9], None), (11, [12, 13, 14], None),
         (16, [17, 18, 19, 20], None), (22, [23, 24, 25], None), (26, [27], None)]
    )
    rpo_header = 26 if dated else 22
    for header, rows, date_row in blocks:
        if date_row is not None and str(sheet.cell(date_row, 1).value).strip() != 'Period End Date':
            raise ValueError(f'Missing Period End Date label at A{date_row}')
        for row in rows:
            label = str(sheet.cell(row, 1).value).strip()
            entity = str(sheet.cell(header, 1).value or 'Oracle').strip()
            if header >= rpo_header:
                entity, metric = label, 'RPO'
            elif entity == 'ORCL Cloud&Software' and label == 'Operating Income':
                metric = 'Gross profit proxy'
            elif entity == 'ORCL Cloud&Software' and label == 'Operating Margin':
                metric = 'Gross margin proxy'
            else:
                metric = label
            previous_end = None
            for col in range(2, sheet.max_column + 1):
                cell = sheet.cell(row, col)
                value = cell.value
                if value is None or value == "": continue
                if not isinstance(value, (int, float)) or not math.isfinite(value):
                    raise ValueError(f'Invalid cached value at {cell.coordinate}: {value}')
                period = sheet.cell(header, col).value
                if not re.fullmatch(r'\d{4}Q[1-4]', str(period)):
                    raise ValueError(f'Invalid fiscal period: {period}')
                formula = query.cell(row, col).value
                formula = getattr(formula, 'text', formula)
                direct = isinstance(formula, str) and 'BQL(' in formula
                if direct and ('FA_ACT_EST_DATA=E' not in formula or 'CURRENCY=USD' not in formula or '/1M' not in formula):
                    raise ValueError(f'Unexpected query basis at {cell.coordinate}')
                revenue_formula = query.cell(rows[0], col).value if entity == 'AWS' and 'Margin' in label else formula
                revenue_formula = getattr(revenue_formula, 'text', revenue_formula)
                fixed = re.search(r'FPR=(\d{4}Q[1-4])', str(revenue_formula))
                if fixed and fixed[1] != period:
                    excluded.append(dict(cell=cell.coordinate, headerPeriod=period, queriedPeriod=fixed[1]))
                    continue
                period = f'{period[-1]}Q{period[2:4]}'
                margin = 'Margin' in label
                period_end = None
                if date_row is not None:
                    date_cell = sheet.cell(date_row, col)
                    date_value = date_cell.value
                    if isinstance(date_value, datetime.datetime):
                        date_value = date_value.date()
                    if not isinstance(date_value, datetime.date) or (previous_end and date_value <= previous_end):
                        raise ValueError(f'Invalid or out-of-order period end at {date_cell.coordinate}: {date_value}')
                    previous_end = date_value
                    period_end = date_value.isoformat()
                records.append(dict(entity=entity, metric=metric, sourceLabel=label,
                    fiscalPeriod=period, periodEnd=period_end, value=value if margin else value / 1000,
                    unit='fraction' if margin else 'USD billions', estimate=True,
                    sourceCell=cell.coordinate, formula=formula,
                    basis='Bloomberg estimate' if direct else 'Derived from Bloomberg estimates'))
    assert records and len({(r["entity"], r["metric"], r["fiscalPeriod"]) for r in records}) == len(records)
    payload = dict(metadata=dict(source='AI_Hyperscalers.xlsx', sheet=sheet.title,
        formulaSheet=query.title, workbookSha256=hashlib.sha256(source.read_bytes()).hexdigest(),
        extractedAtUtc=datetime.datetime.now(datetime.timezone.utc).isoformat(),
        sourceRetrievedAt=None, role='Core index reference; no scoring weight',
        periodBasis='Issuer period ends from Cloud FA Value' if dated else 'Native fiscal periods; period ends unavailable',
        limitations=['All queried observations explicitly request estimates (FA_ACT_EST_DATA=E).',
            'Revenue and RPO scopes differ: Google Cloud segment, AWS revenue versus AMZN issuer RPO, Intelligent Cloud versus Microsoft commercial RPO, Oracle cloud/software revenue versus issuer RPO.',
            'Oracle revenue less cost of revenue is a gross-profit proxy, despite the source operating-income label.',
            'RPO is a stock of contracted obligations at period end. Calendar-quarter chart totals can combine different issuer period ends.',
            'This sheet contains no CapEx observations. Existing historical CapEx remains the scoring input.']),
        excluded=excluded, observations=records)
    values.close()
    formulas.close()
    return payload
