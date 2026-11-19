"""Save the first public model catalog price snapshot of each UTC day."""
import datetime as dt
import json
from pathlib import Path
from tempfile import NamedTemporaryFile
from urllib.request import urlopen

from openrouter_pricing import MODELS_URL, catalog_rates
from paths import OPENROUTER_PRICES


def main():
    retrieved = dt.datetime.now(dt.timezone.utc)
    date = retrieved.date().isoformat()
    target = OPENROUTER_PRICES / f'{date}.json'
    if target.exists():
        print(f'OpenRouter prices already saved for {date}')
        return
    with urlopen(MODELS_URL, timeout=30) as response:
        rates = catalog_rates(json.load(response)['data'])
    OPENROUTER_PRICES.mkdir(parents=True, exist_ok=True)
    payload = dict(source=MODELS_URL, retrievedAtUtc=retrieved.isoformat(),
                   unit='USD per token', rates=rates)
    with NamedTemporaryFile(dir=OPENROUTER_PRICES, delete=False) as temp:
        temp.write((json.dumps(payload, indent=2, sort_keys=True) + '\n').encode('utf-8'))
    Path(temp.name).replace(target)
    print(f'Saved prices for {len(rates)} OpenRouter models on {date}')


if __name__ == '__main__':
    main()
