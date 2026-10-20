"""Immutable public-file capture. Credentials are neither required nor recorded."""
import datetime as dt
import hashlib
import json
import os
from pathlib import Path
from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup

ROOT = Path(os.environ.get('AI_INDEX_DATA_ROOT', Path(__file__).resolve().parents[2]))
NOW = dt.datetime.now(dt.timezone.utc).isoformat()

def capture(source, url, run, name=None):
    folder = ROOT / 'data/raw/electricity' / source / run
    folder.mkdir(parents=True, exist_ok=True)
    response = requests.get(url, timeout=(15, 90))
    response.raise_for_status()
    body = response.content
    name = name or url.split('/')[-1].split('?')[0] or 'page.html'
    if name.endswith(('.xlsx', '.zip')) and not body.startswith(b'PK'):
        raise ValueError('Expected ZIP/XLSX, received ' + response.headers.get('content-type', 'unknown'))
    if name.endswith('.pdf') and not body.startswith(b'%PDF'):
        raise ValueError('Expected PDF')
    if not body: raise ValueError('Empty download')
    path = folder / name
    if path.exists(): raise FileExistsError(path)
    path.write_bytes(body)
    manifest = dict(source_id=source, requested_url=url, source_url=response.url,
                    retrieved_at_utc=dt.datetime.now(dt.timezone.utc).isoformat(),
                    checksum_sha256=hashlib.sha256(body).hexdigest(), content_type=response.headers.get('content-type'),
                    raw_path=path.relative_to(ROOT).as_posix(), bytes=len(body), run_id=run)
    path.with_name(name + '.manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    return path

def links(path, url):
    return [(a.get_text(' ', strip=True), urljoin(url, a['href'])) for a in BeautifulSoup(path.read_text(encoding='utf-8'), 'html.parser').select('a[href]')]

def collect(run, selection='all'):
    gaps = []
    def get(source, url, name):
        if selection not in ('all', source): return None
        try:
            p = capture(source, url, run, name)
            print(source, name, p.stat().st_size, flush=True)
            return p
        except Exception as exc:
            gaps.append(dict(source_id=source, requested_field=name, reason=str(exc), attempted_url=url,
                             attempted_at=NOW, impact='Coverage incomplete', fallback='Public release/manual evidence where available', resolution_status='open'))
            print(source, name, type(exc).__name__, flush=True)
    for name in ('privsatime', 'privtime', 'private', 'privateha2'):
        get('CENSUS', f'https://www.census.gov/construction/c30/xlsx/{name}.xlsx', name+'.xlsx')
    get('CENSUS', 'https://www.census.gov/construction/c30/definitions.html', 'definitions.html')
    for code, file in [('861','HS861 2010-.xlsx'),('861m','HS861M 2010-.xlsx')]:
        get('EIA_RETAIL', f'https://www.eia.gov/electricity/data/state/xls/{code}/{file}', file.replace(' ', '_'))
    get('EIA_OUTLOOK', 'https://www.eia.gov/outlooks/steo/xls/STEO_m.xlsx', 'STEO_m.xlsx')
    get('EIA_OUTLOOK', 'https://www.eia.gov/outlooks/steo/report/electricity.php', 'electricity.html')
    get('EIA_OUTLOOK', 'https://www.eia.gov/outlooks/aeo/', 'aeo.html')
    get('EIA_GRID', 'https://www.eia.gov/electricity/gridmonitor/', 'gridmonitor.html')
    get('LBNL', 'https://eta-publications.lbl.gov/sites/default/files/2024-12/us_data_center_energy_usage_report_lbnl-2001637_0.pdf', '2024.pdf')
    get('LBNL', 'https://www.energy.gov/documents/united-states-data-center-energy-usage-report-2025-update', '2025-update.pdf')
    for vintage in ('2024','2025','2026'):
        url = f'https://www.pjm.com/-/media/DotCom/library/reports-notices/load-forecast/{vintage}-load-report.pdf'
        get('PJM', url, vintage+'.pdf')
    url = 'https://www.pjm.com/planning/resource-adequacy-planning/load-forecast-dev-process.aspx'
    p = get('PJM', url, 'development.html')
    if p:
        wanted = ['Tables', 'Data', 'Mid-Year', 'Adjustment', 'Accuracy', 'Supplement']
        for label, link in links(p, url):
            if any(w.lower() in label.lower() for w in wanted) and any(ext in link.lower() for ext in ('.xlsx','.xls','.pdf')):
                get('PJM', link, link.split('/')[-1].split('?')[0])
    for vintage in ('h1-2026','h2-2025','h1-2025','h2-2024','h1-2024'):
        domain = 'www.cbre.ca' if vintage=='h1-2026' else 'www.cbre.com'
        kind = 'books' if vintage=='h1-2026' else 'reports'
        get('CBRE', f'https://{domain}/insights/{kind}/north-america-data-center-trends-{vintage}', vintage+'.html')
    get('JLL', 'https://www.jll.com/en-us/insights/market-outlook/global-data-centers', '2026.html')
    get('JLL', 'https://www.jll.com/content/dam/jllcom/en/global/documents/reports/research-reports/26-research-global-data-center-outlook-new.pdf', '2026.pdf')
    out = ROOT / 'data/runs' / run / 'electricity'
    out.mkdir(parents=True, exist_ok=True)
    (out / 'acquisition_gaps.json').write_text(json.dumps(gaps, indent=2), encoding='utf-8')
    return out

if __name__ == '__main__':
    print(collect(dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%SZ')), flush=True)
