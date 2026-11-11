"""Stage saved hyperscaler cells for audit; never promote them into index inputs.

Usage: python pipeline/audit_hyperscalers.py --as-of 2026-11-03
Dates constrain possible actuals, but do not establish actual/estimate status.
"""
import argparse
from collections import Counter
import datetime as dt
import hashlib
import json
import math
from pathlib import Path
import re

import openpyxl

ROOT = Path(__file__).resolve().parents[1]
SHEET = 'Hyperscaler Financial Value'
HEADERS = ['DATES', '#Period_FQ.PERIOD', '#Period_end.PERIOD_END_DATE',
           '#Disclose_date.REVISION_DATE', '#Capex', '#Revenue', '#FCFF',
           '#Net_debt', '#EBITDA', '#ebitda_to_ir_expn']
METRICS = ['capex_raw', 'headline_revenue', 'headline_fcf', 'net_debt',
           'headline_ebitda', 'ebitda_to_interest_expense']


def date_value(value):
    if isinstance(value, dt.datetime):
        return value.date()
    if isinstance(value, dt.date):
        return value
    raise ValueError(f'Expected typed date, got {value!r}')


def temporal_class(period_end, revision_date, as_of):
    if period_end > as_of:
        return 'future_period_not_actual'
    if revision_date is None or revision_date > as_of:
        return 'availability_unconfirmed'
    if revision_date < period_end:
        return 'pre_period_end_revision_not_actual_evidence'
    return 'historical_candidate_status_unverified'


def audit(source, as_of):
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    book = openpyxl.load_workbook(source, data_only=True, read_only=True)
    records, errors, summaries, queries = [], [], [], []
    try:
        sheet = book[SHEET]
        rows = list(sheet.values)
        query_sheet = book['Hyperscaler Financial Formula']
        for row in query_sheet.values:
            for value in row:
                if isinstance(value, str) and value.lstrip().lower().startswith('for('):
                    queries.append(value)
        starts = [i for i, value in enumerate(rows[0])
                  if isinstance(value, str) and value.endswith(' US Equity')]
        tickers = [rows[0][i].split()[0] for i in starts]
        if len(starts) != 5 or set(tickers) != {'MSFT', 'META', 'AMZN', 'GOOGL', 'ORCL'}:
            raise ValueError('Expected five unique hyperscaler blocks')
        for start, ticker in zip(starts, tickers):
            first = start - 1
            if list(rows[1][first:first + 10]) != HEADERS:
                raise ValueError(f'Unexpected schema for {ticker}')
            query = [q for q in queries if f"'{ticker} US Equity'" in q]
            if len(query) != 1:
                raise ValueError(f'Expected one source query for {ticker}')
            seen, company = set(), []
            previous = None
            for rownum, row in enumerate(rows[2:], 3):
                values = row[first:first + 10]
                if all(v is None or v == '' for v in values):
                    continue
                axis, fiscal, end, revision = values[:4]
                end, axis = date_value(end), date_value(axis)
                revision = date_value(revision) if revision else None
                if not isinstance(fiscal, str) or not re.fullmatch(r'\d{4} Q[1-4]', fiscal):
                    raise ValueError(f'Invalid fiscal label {ticker} row {rownum}')
                key = (fiscal, end)
                if key in seen or any(k[0] == fiscal or k[1] == end for k in seen):
                    raise ValueError(f'Duplicate fiscal period {ticker} {fiscal}')
                seen.add(key)
                if previous is not None and not 80 <= (end - previous).days <= 100:
                    raise ValueError(f'Nonconsecutive quarter ends {ticker} {end}')
                previous = end
                if axis != end:
                    raise ValueError(f'Date-axis mismatch {ticker} row {rownum}')
                measures, cells = {}, {}
                for offset, metric in enumerate(METRICS, 4):
                    value = values[offset]
                    cell = f'{openpyxl.utils.get_column_letter(first + offset + 1)}{rownum}'
                    valid = isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)
                    measures[metric] = value if valid else None
                    cells[metric] = cell
                    if not valid:
                        errors.append(dict(ticker=ticker, fiscalPeriod=fiscal, metric=metric,
                                           cell=cell, sourceValue=value))
                if measures['capex_raw'] is not None and measures['capex_raw'] > 0:
                    raise ValueError(f'Unexpected positive CapEx {ticker} {fiscal}')
                record = dict(ticker=ticker, fiscalPeriod=fiscal, periodEnd=end.isoformat(),
                              sourceRevisionDate=revision.isoformat() if revision else None,
                              firstPublicReleaseDate=None, actualEstimate='unverified',
                              temporalClass=temporal_class(end, revision, as_of),
                              currency=None, productionEligible=False,
                              sourceRange=f'{openpyxl.utils.get_column_letter(first + 1)}{rownum}:'
                                          f'{openpyxl.utils.get_column_letter(first + 10)}{rownum}',
                              values=measures, sourceCells=cells)
                company.append(record)
                records.append(record)
            summaries.append(dict(ticker=ticker, rows=len(company), firstPeriodEnd=company[0]['periodEnd'],
                                  lastPeriodEnd=company[-1]['periodEnd'],
                                  temporalClasses=dict(Counter(r['temporalClass'] for r in company))))
    finally:
        book.close()
    if hashlib.sha256(source.read_bytes()).hexdigest() != digest:
        raise RuntimeError('Workbook changed during audit; retry')
    return dict(schemaVersion=1, auditAsOf=as_of.isoformat(), source=source.name, sourceSha256=digest,
                sourceSheet=SHEET, status='staged_not_approved_for_production',
                rules=dict(dateSemantics='CapEx revision date only; not first public release or dates for other metrics',
                           periodBasis='Native fiscal periods; row positions must not be joined across issuers',
                           actualEstimate='AE query without exported per-metric flags; temporal classes are checks, not A/E flags',
                           fcf='headline_fcf retained without FCFF relabeling; issuer-specific duration unresolved',
                           currency='Query does not explicitly select currency; raw units retained without conversion',
                           vintages='Saved cache observed in this audit, not a reconstructed historical forecast vintage'),
                sourceQueries=queries, companies=summaries, missingCells=errors, records=records)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--workbook', type=Path, default=ROOT / 'AI_Hyperscalers.xlsx')
    parser.add_argument('--as-of', type=dt.date.fromisoformat, required=True)
    parser.add_argument('--output-dir', type=Path, default=ROOT / 'data/research/hyperscalers/audits')
    args = parser.parse_args()
    result = audit(args.workbook, args.as_of)
    target = args.output_dir / f"{args.as_of}-{result['sourceSha256'][:12]}.json"
    encoded = json.dumps(result, indent=2, allow_nan=False) + '\n'
    args.output_dir.mkdir(parents=True, exist_ok=True)
    if target.exists() and target.read_text(encoding='utf-8') != encoded:
        raise FileExistsError(f'Existing audit differs; choose a separate output directory: {target}')
    target.write_text(encoded, encoding='utf-8')
    print(json.dumps(dict(output=str(target), rows=len(result['records']),
                          missingCells=len(result['missingCells']), companies=result['companies']), indent=2))


if __name__ == '__main__':
    main()
