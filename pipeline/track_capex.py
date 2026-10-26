"""Track saved Bloomberg capex observations without modifying the source workbook."""
import argparse, datetime as dt, hashlib, math, sqlite3, warnings
from pathlib import Path
import openpyxl
ROOT = Path(__file__).resolve().parents[1]

def collect(path):
    with warnings.catch_warnings():
        warnings.simplefilter('ignore', UserWarning)
        book = openpyxl.load_workbook(path, data_only=True, read_only=True)
    try:
        rows = list(book['Hyperscaler Core Data Value'].values)
        ticker = None
        columns = []
        for col, label in enumerate(rows[1]):
            if rows[0][col]:
                ticker = rows[0][col]
            if label == '#cash_capex':
                columns.append((col, ticker))
        if len(columns) != 5:
            raise ValueError('Expected five capex columns; inspect workbook layout.')
        result = []
        for row in rows[2:]:
            period = row[0]
            if not isinstance(period, (dt.date, dt.datetime)):
                continue
            for col, ticker in columns:
                value = row[col]
                if not isinstance(value, (int, float)) or not math.isfinite(value):
                    raise ValueError(f'Missing/invalid capex: {ticker} {period}')
                result.append((ticker, period.strftime('%Y-%m-%d'), float(value)))
        if not result:
            raise ValueError('No capex observations found')
        return result
    finally:
        book.close()

def record(db, values, source, digest):
    now = dt.datetime.now(dt.timezone(dt.timedelta(hours=8))).isoformat()
    with sqlite3.connect(db, timeout=30) as con:
        con.execute('CREATE TABLE IF NOT EXISTS runs(id INTEGER PRIMARY KEY, observed_at TEXT, source TEXT, sha256 TEXT)')
        con.execute('CREATE TABLE IF NOT EXISTS changes(id INTEGER PRIMARY KEY, run_id INTEGER, ticker TEXT, period TEXT, field TEXT, currency TEXT, value REAL, previous_value REAL)')
        run = con.execute('INSERT INTO runs(observed_at,source,sha256) VALUES(?,?,?)', (now, source, digest)).lastrowid
        count = 0
        for ticker, period, value in values:
            old = con.execute('SELECT value FROM changes WHERE ticker=? AND period=? ORDER BY id DESC LIMIT 1', (ticker, period)).fetchone()
            if old is None or old[0] != value:
                con.execute('INSERT INTO changes(run_id,ticker,period,field,currency,value,previous_value) VALUES(?,?,?,?,?,?,?,?)', (run,ticker,period,'cf_cap_expend_prpty_add','USD',value,None if old is None else old[0]))
                count += 1
    return count

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--workbook', type=Path, default=ROOT/'Indexlist.xlsx')
    p.add_argument('--database', type=Path, default=ROOT/'data/capex_estimates.sqlite')
    args = p.parse_args()
    raw = args.workbook.read_bytes()
    values = collect(args.workbook)
    if hashlib.sha256(args.workbook.read_bytes()).digest() != hashlib.sha256(raw).digest():
        raise RuntimeError('Workbook changed during collection; retry')
    args.database.parent.mkdir(parents=True, exist_ok=True)
    count = record(args.database, values, 'saved_workbook_cache', hashlib.sha256(raw).hexdigest())
    print(f'{len(values)} observations checked; {count} baseline/change records saved. Source: saved workbook cache, not verified live Bloomberg.')
if __name__ == '__main__':
    main()
