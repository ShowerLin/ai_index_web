"""Build model-level volume without fetching or changing the core signal."""
import json
from paths import BUILD_ROOT, OPENROUTER
from openrouter_models import write_model_snapshot

snapshot = write_model_snapshot(OPENROUTER, BUILD_ROOT/'app/openrouter-model-snapshot.ts')
print(json.dumps(dict(through=snapshot['metadata']['through'], models=len(snapshot['models']),
                     days=len(snapshot['daily']), missingDays=snapshot['metadata']['missingDays'])))
