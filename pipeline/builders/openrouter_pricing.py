"""Price OpenRouter's daily model volumes with dated catalog snapshots."""
from bisect import bisect_right
import datetime as dt
import json
import math

MODELS_URL = 'https://openrouter.ai/api/v1/models'
OUTPUT_SHARE = 0.20
# Rankings omit the free suffix for this preview. OpenRouter lists both rates at $0.
# https://openrouter.ai/stealth/space-bunny-alpha
FREE_PREVIEWS = {'stealth/space-bunny-alpha'}


def catalog_rates(models):
    rates = {}
    for model in models:
        model_id = model['id']
        slug = model.get('canonical_slug') or model_id
        # Batch/free routes can share a canonical slug with the standard route.
        _, separator, variant = model_id.partition(':')
        if separator and ':' not in slug:
            slug = f'{slug}:{variant}'
        pricing = model.get('pricing') or {}
        try:
            prompt = float(pricing['prompt'])
            completion = float(pricing['completion'])
        except (KeyError, TypeError, ValueError):
            continue
        if not all(math.isfinite(rate) and rate >= 0 for rate in (prompt, completion)):
            continue
        model_rates = dict(prompt=prompt, completion=completion)
        if slug in rates and rates[slug] != model_rates:
            raise ValueError(f'Conflicting OpenRouter prices for {slug}')
        rates[slug] = model_rates
    if not rates:
        raise ValueError('OpenRouter catalog contains no usable token prices')
    return rates


def load_prices(directory):
    return {
        path.stem: json.loads(path.read_text(encoding='utf-8'))['rates']
        for path in sorted(directory.glob('????-??-??.json'))
    }


def daily_spending(rows, prices):
    dates = sorted(prices)
    blended = {
        date: {slug: (1 - OUTPUT_SHARE) * rate['prompt'] + OUTPUT_SHARE * rate['completion']
               for slug, rate in rates.items()}
        for date, rates in prices.items()
    }
    daily = {}
    for row in rows:
        date, slug = row['date'], row['model_permaslug']
        if date not in daily:
            # The first vintage also provides a fixed-rate estimate for earlier dates.
            vintage = dates[max(0, bisect_right(dates, date) - 1)] if dates else None
            daily[date] = dict(total=0, priced=0, known_free=0, matched_spend=0.0, vintage=vintage)
        day = daily[date]
        tokens = int(row['total_tokens'])
        day['total'] += tokens
        price = blended.get(day['vintage'], {}).get(slug) if slug != 'other' else None
        if price is not None:
            day['priced'] += tokens
            day['matched_spend'] += tokens * price
        elif slug.endswith(':free') or slug in FREE_PREVIEWS:
            day['known_free'] += tokens
    for day in daily.values():
        unmatched = day['total'] - day['priced'] - day['known_free']
        day['unmatched'] = unmatched
        rate = day['matched_spend'] / day['priced'] if day['priced'] else None
        day['imputed_spend'] = unmatched * rate if rate is not None else (0.0 if not unmatched else None)
        day['spend'] = None if day['imputed_spend'] is None else day['matched_spend'] + day['imputed_spend']
    return daily


def window_spending(daily, end):
    days = [(end - dt.timedelta(days=i)).isoformat() for i in range(28)]
    window = [daily[day] for day in days if day in daily]
    total = sum(row['total'] for row in window) if len(window) == len(days) else None
    priced = sum(row['priced'] for row in window) if total is not None else None
    complete = total is not None and all(row['spend'] is not None for row in window)
    spend = math.fsum(row['spend'] for row in window) if complete else None
    vintages = sorted({row['vintage'] for row in window if row['vintage']}) if total is not None else []
    return dict(
        openrouterVolume=total,
        openrouterTotalVolume=total,
        openrouterPrice=spend / total * 1e6 if total and complete else None,
        openrouterSpendProxy=spend,
        openrouterMatchedSpend=math.fsum(row['matched_spend'] for row in window) if total is not None else None,
        openrouterImputedSpend=math.fsum(row['imputed_spend'] for row in window) if complete else None,
        openrouterPriceCoverage=priced / total if total else None,
        openrouterKnownFreeShare=sum(row['known_free'] for row in window) / total if total else None,
        openrouterUnmatchedShare=sum(row['unmatched'] for row in window) / total if total else None,
        openrouterPriceVintages=vintages,
        openrouterRepricedHistory=bool(vintages and days[-1] < vintages[0]),
    )
