"""Independent source-to-cell samples and reviewed publisher assumptions."""
import json,re,hashlib
from collections import defaultdict
from pathlib import Path
import openpyxl
from pypdf import PdfReader
from bs4 import BeautifulSoup
from .build import ROOT,read_csv,write_csv,dump,xml_rows

def review(folder):
    out=ROOT/'outputs/electricity/source-review';out.mkdir(parents=True,exist_ok=True)
    grouped=defaultdict(list)
    for name in ('electricity_history','construction_spending','electricity_outlook','dc_energy','market_pipeline','pjm_forecasts','hourly_load'):
        for r in read_csv(folder/(name+'.csv')):grouped[r['source_id']].append(r)
    checks=[];books={};texts={}
    for source,rows in grouped.items():
        rows=[r for r in rows if r['value']!='']
        if source=='EIA_RETAIL':rows=[r for r in rows if '! ' not in r['locator'] and re.match(r'.+![A-Z]+\d+$',r['locator'])]
        if source=='EIA_OUTLOOK':rows=[r for r in rows if r['source_vintage'].startswith('AEO')]
        if source in ('LBNL','CBRE','JLL','PJM'):sample=rows
        else:sample=[rows[round(i*(len(rows)-1)/9)] for i in range(10)]
        if source=='EIA_GRID':
            wanted={int(re.search(r'(\d+)$',r['locator'])[1]):r for r in sample}
            for i,cells in xml_rows(ROOT/sample[0]['raw_path']):
                if i in wanted:
                    r=wanted[i];checks.append(dict(source_id=source,record_id=r['record_id'],locator=r['locator'],value=r['value'],verified=cells.get('I')==float(r['value']),method='Independently read raw cached XML cell I'))
            continue
        for r in sample:
            path=ROOT/r['raw_path'];v=float(r['value']);verified=False;method=''
            if path.suffix=='.xlsx':
                if path not in books:books[path]=openpyxl.load_workbook(path,data_only=True,read_only=True)
                sheet,cell=r['locator'].rsplit('!',1);actual=books[path][sheet][cell].value;verified=actual==v;method='Independent raw spreadsheet cell lookup'
            elif source=='PJM':
                evidence=json.loads(path.read_text(encoding='utf-8'));item=next(x for x in evidence['rows'] if str(x[0])==r['target_year']);idx=1 if r['season']=='summer' else 3
                actual=item[idx] if r['source_vintage']=='2026' else item[idx]-item[idx+1];verified=actual==v;method='All manual source-table rows and exact revision arithmetic checked'
            else:
                if path not in texts:
                    texts[path]=' '.join(p.extract_text() for p in PdfReader(path).pages) if path.suffix=='.pdf' else BeautifulSoup(path.read_text(encoding='utf-8'),'html.parser').get_text(' ',strip=True)
                nums=[float(x.replace(',','')) for x in re.findall(r'(?<![\d.])\d[\d,]*(?:\.\d+)?',texts[path])]
                verified=v in nums;method='Numeric presence in archived source plus manual review of named source section/table; not automated semantic extraction'
            checks.append(dict(source_id=source,record_id=r['record_id'],locator=r['locator'],value=v,verified=verified,method=method))
    write_csv(out/'source_samples.csv',checks)
    assert all(r['verified'] for r in checks),[r for r in checks if not r['verified']]
    counts={s:sum(r['source_id']==s for r in checks) for s in grouped}
    dump(out/'sample_review.json',dict(status='passed',sample_counts=counts,notes='Every manual energy/broker/PJM observation reviewed; at least ten raw cell samples for EIA, Census, outlook and hourly. PDF Table 2 also visually rendered and inspected.'))
    energy=next(r for r in grouped['LBNL'] if r['source_vintage'].startswith('2025'))
    scenarios=['reference','consolidated_deployment','high_asic','low_accelerator_lifetime','high_inference_energy','compounded_low','compounded_high']
    params={'gpu_shipment_multiplier':([1,.85,1,1,1,.85,1],'ratio'), 'asic_shipment_multiplier':([1,.85,1.15,1,1,.85,1.15],'ratio'),
        'accelerator_lifetime':([5,5,5,4,5,4,5.5],'years'),'ai_idle_power_fraction':([.2,.2,.2,.2,.3,.2,.3],'fraction'),
        'training_utilization':([.8,.8,.8,.8,.8,.75,.85],'fraction'),'inference_utilization':([.2,.2,.2,.2,.3,.2,.3],'fraction')}
    assumptions=[]
    for param,(vals,unit) in params.items():
        for scenario,value in zip(scenarios,vals):
            r={k:energy[k] for k in ['source_id','source_release_id','source_vintage','publication_date','retrieved_at_utc','run_id','source_url','raw_path']}
            r.update(locator='Table 1, printed page 7 (PDF page 9)',metric=param,value=value,unit=unit,status='publisher_forecast',target_year=2030,geography_id='US',scenario=scenario,
                quality_flag='reviewed_manual_extract',notes='Inference utilization varies by year; 2030 parameter shown. Compute utilization differs from electrical load factor; idle consumption persists.')
            r['record_id']=hashlib.sha256(json.dumps([param,scenario,energy['source_vintage']]).encode()).hexdigest()[:24];assumptions.append(r)
    research=ROOT/'data/research/electricity';research.mkdir(parents=True,exist_ok=True);write_csv(research/'lbnl_publisher_assumptions.csv',assumptions)
    (research/'vintage_review.md').write_text('''# LBNL vintage review

The report titled 2025 Update was published 18 June 2026, DOI 10.71468/P1RP4F, LBNL-2001758. It revises historical estimates through 2024 and extends future scenarios to 2030. 2025 remains projected in this report because shipment inputs extend only through Q3 2025. The historical revisions reflect reduced GPU shipment counts and inference power assumptions. Both vintages are preserved; annual charts have not been digitized or silently interpolated into observations.

`lbnl_publisher_assumptions.csv` transcribes all 42 parameter cells of Table 1 (printed p7/PDF p9); the energy table retains all seven Table 2 outcomes. The 2026 update retains the 2024 facility/cooling methodology (Section 3.5), with PUE modeled across facility types rather than a universal scalar. Its conclusion says PUE and operational-power uncertainty are not varied in the update because measured/simulated data support the retained parameters. The illustrative cohort PUE of 1.20 is an analyst assumption, not the report's national average.

Annual electricity is not AI server utilization times nameplate power alone: idle power, operating scaling, hardware mix and facility overhead matter. Neither the updated data-center share of national consumption nor its NERC denominator is a share of AI revenue or an independent addition to a grid forecast.

Source: https://www.energy.gov/documents/united-states-data-center-energy-usage-report-2025-update ; raw artifacts and hashes under data/raw/electricity/LBNL/20261016T030853Z/.
''',encoding='utf-8')
    return counts
if __name__=='__main__':print(review(ROOT/'data/derived/electricity'))
