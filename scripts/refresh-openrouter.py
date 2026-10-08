"""Fetch public OpenRouter rankings in quarterly windows; never store API keys."""
import collections, datetime as dt, getpass, json, os, pathlib, sys, time, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
ENDPOINT = 'https://openrouter.ai/api/v1/datasets/rankings-daily'
key = None if "--cached" in sys.argv else os.environ.get('OPENROUTER_API_KEY') or getpass.getpass('OpenRouter API key: ')
end = dt.datetime.now(dt.timezone.utc).date() - dt.timedelta(days=1)
start = dt.date(2025, 1, 1)
cached = json.loads((ROOT/"data/openrouter-rankings-daily.json").read_text()) if "--cached" in sys.argv else None
rows, snapshots = (cached["data"], cached["meta"]) if cached else ([], [])
while not cached and start <= end:
    next_quarter = dt.date(start.year + (start.month == 10), (start.month + 2) % 12 + 1, 1)
    stop = min(end, next_quarter - dt.timedelta(days=1))
    query = urllib.parse.urlencode(dict(start_date=start.isoformat(), end_date=stop.isoformat()))
    request = urllib.request.Request(ENDPOINT + '?' + query, headers={'Authorization': 'Bearer ' + key})
    with urllib.request.urlopen(request, timeout=60) as response:
        payload = json.load(response)
    rows.extend(payload['data']); snapshots.append(payload['meta'])
    print(f'{start}–{stop}: {len(payload["data"])} rows', flush=True)
    start = next_quarter
    time.sleep(2.1)
seen = set(); daily = collections.defaultdict(int); by_quarter = {}
for row in rows:
    date, model, tokens = row['date'], row['model_permaslug'], int(row['total_tokens'])
    assert tokens >= 0 and (date, model) not in seen
    seen.add((date, model)); daily[date] += tokens
    quarter = f'{date[:4]}Q{(int(date[5:7])-1)//3+1}'
    bucket = by_quarter.setdefault(quarter, {'dates': set(), 'authors': collections.Counter()})
    bucket['dates'].add(date)
    bucket['authors'][model.split('/')[0] if '/' in model else 'other'] += tokens
all_totals = collections.Counter()
for quarter, bucket in by_quarter.items():
    if quarter < f'{end.year}Q{(end.month-1)//3+1}' or end == dt.date(end.year, (end.month-1)//3*3+1, 1):
        all_totals.update(bucket['authors'])
authors = [a for a, _ in all_totals.most_common() if a != 'other'][:8]
labels = {'google':'Google','anthropic':'Anthropic','deepseek':'DeepSeek','openai':'OpenAI','minimax':'MiniMax','x-ai':'xAI','xiaomi':'Xiaomi','tencent':'Tencent','z-ai':'Z.ai'}
quarter_rows = []
for quarter, bucket in sorted(by_quarter.items()):
    year, q = int(quarter[:4]), int(quarter[-1]); first = dt.date(year, q*3-2, 1)
    following = dt.date(year+(q==4), q*3%12+1, 1); expected = (following-first).days
    count = len(bucket['dates']); total = sum(bucket['authors'].values())
    values = {a: bucket['authors'][a]/count/1e12 for a in authors}
    values['other'] = (total-sum(bucket['authors'][a] for a in authors))/count/1e12
    assert abs(sum(values.values())-total/count/1e12) < 1e-8
    quarter_rows.append(dict(quarter=quarter, days=count, expectedDays=expected, complete=count==expected,
                             total=total/count/1e12, values=values))
as_of = max(s['as_of'] for s in snapshots)
snapshot = dict(through=max(daily), asOf=as_of, source=ENDPOINT,
                authors=[dict(id=a,label=labels.get(a,a)) for a in authors]+[dict(id='other',label='Other / unclassified')],
                rows=[r for r in quarter_rows if r['quarter'] < f'{end.year}Q{(end.month-1)//3+1}' or r['complete']],
                partialRows=[r for r in quarter_rows if r['quarter'] == f'{end.year}Q{(end.month-1)//3+1}' and not r['complete']],
                missingDays=[(dt.date(2025,1,1)+dt.timedelta(days=i)).isoformat() for i in range((end-dt.date(2025,1,1)).days+1)
                             if (dt.date(2025,1,1)+dt.timedelta(days=i)).isoformat() not in daily])
output = ROOT/'data/openrouter-rankings-daily.json'
output.write_text(json.dumps(dict(meta=snapshots,data=rows),separators=(',',':')))
(ROOT/'app/openrouter-company-snapshot.ts').write_text('export const companyTokens = '+json.dumps(snapshot,indent=2)+' as const;\n')
print(json.dumps({k:v for k,v in snapshot.items() if k not in ['authors']},default=str),flush=True)
