"""Extract saved cloud estimates without modifying the Bloomberg workbook."""
import json

from cloud_estimates import read_cloud_estimates
from paths import DATA_ROOT, BUILD_ROOT

payload = read_cloud_estimates(DATA_ROOT / "AI_Hyperscalers.xlsx")
(BUILD_ROOT/'app/cloud-reference-snapshot.ts').write_text(
    'export const cloudReferenceSnapshot = '+json.dumps(payload, indent=2)+' as const;\n', encoding='utf-8')
print('Extracted', len(payload["observations"]), 'cloud estimate reference observations')
