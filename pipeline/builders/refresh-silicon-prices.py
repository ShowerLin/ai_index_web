"""Refresh Bloomberg price context independently of the core scoring chain."""
import json

from paths import BUILD_ROOT, DATA_ROOT
from silicon_prices import read_silicon_prices

path = BUILD_ROOT / 'app/adoption-price-snapshot.ts'
data = json.JSONDecoder().raw_decode(path.read_text(encoding='utf-8').split(' = ', 1)[1].lstrip())[0]
metadata, daily, monthly = read_silicon_prices(DATA_ROOT)
if data['metadata']['workbookSha256'] != metadata['workbookSha256']:
    data['metadata'].update(metadata)
    data['siliconDaily'] = daily
    data['siliconMonthly'] = monthly
    path.write_text('export const adoptionPriceSnapshot = ' + json.dumps(data, indent=2, allow_nan=False)
                    + ' as const;\n', encoding='utf-8')
print('Saved Bloomberg token prices through', metadata['through'])
