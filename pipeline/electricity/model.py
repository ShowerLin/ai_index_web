"""Explicit energy conversion; no implicit national scaling or baseline addition."""
import calendar
import datetime as dt

def cohort_energy(mw, basis, year, online_date, utilization, pue=1, completion=1,
                  energization=1, date_states=None, retirement=None):
    if basis not in ('IT', 'facility'): raise ValueError('Unknown capacity basis blocks conversion')
    if mw < 0 or pue < 1 or any(not 0 <= x <= 1 for x in (utilization, completion, energization)):
        raise ValueError('Invalid physical/probability bound')
    states = date_states or [(online_date, 1)]
    if any(p < 0 for _, p in states) or abs(sum(p for _, p in states)-1) > 1e-9:
        raise ValueError('Commissioning states must be conditional probabilities summing to one')
    start, end = dt.date(year, 1, 1), dt.date(year+1, 1, 1)
    if retirement: end = min(end, retirement)
    hours = sum(max(0, (end-max(start, date)).days)*24*prob for date, prob in states)
    return mw * utilization * (pue if basis=='IT' else 1) * hours * completion * energization / 1e6

def replace_embedded(total, embedded, modeled):
    if embedded is None: raise ValueError('Embedded component must be documented')
    if embedded < 0 or embedded > total: raise ValueError('Invalid embedded component')
    return total - embedded + modeled
