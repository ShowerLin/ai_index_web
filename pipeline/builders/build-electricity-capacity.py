"""Install the separately validated electricity research snapshot into a build."""
import hashlib,json,shutil
from paths import DATA_ROOT,BUILD_ROOT
accepted=DATA_ROOT/'data/derived/electricity'
if accepted.exists():
    manifest=json.loads((accepted/'promotion_manifest.json').read_text(encoding='utf-8'))
    for name,digest in manifest['output_hashes'].items():
        p=accepted/name
        if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=digest:
            raise ValueError('Incomplete or altered electricity promotion: '+name)
    shutil.copy2(accepted/'electricity-capacity-snapshot.ts',BUILD_ROOT/'app/electricity-capacity-snapshot.ts')
    print('Electricity evidence snapshot installed; research coverage remains partial')
else:
    print('Electricity research not yet accepted; no snapshot installed')
