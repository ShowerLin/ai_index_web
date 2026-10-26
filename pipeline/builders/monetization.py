"""Read maintained Monetization inputs without evaluating Bloomberg queries."""
import datetime
import openpyxl
from paths import DATA_ROOT

SOURCE=DATA_ROOT/'AI_Monetization.xlsx'

def records(sheet):
    with SOURCE.open('rb') as handle:
        book=openpyxl.load_workbook(handle,read_only=True,data_only=True)
        rows=book[sheet].values
        headers=next(rows)
        result=[]
        for row in rows:
            if not any(v is not None for v in row):continue
            record={key:value for key,value in zip(headers,row) if key is not None}
            for key,value in record.items():
                if isinstance(value,(datetime.datetime,datetime.date)):
                    record[key]=value.strftime('%Y-%m-%d')
            result.append(record)
        book.close()
        if sheet=='Lab Revenue':
            corrections=records('Revenue Corrections')
            overrides={r['Id']:r for r in corrections}
            if len(overrides)!=len(corrections):raise ValueError('Duplicate revenue correction Id')
            if not set(overrides).issubset({r['Id'] for r in result}):raise ValueError('Correction must reference existing revenue Id')
            result=[overrides.get(r['Id'],r) for r in result]
        return result
