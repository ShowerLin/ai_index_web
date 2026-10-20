from paths import DATA_ROOT, BUILD_ROOT, REFERENCE, RAMP, OPENROUTER
"""Monthly matched token-volume core inputs and separate daily/weekly observations."""
import argparse
import calendar
import collections
import copy
import datetime as dt
import hashlib
import json
import math
import statistics
from pathlib import Path

ROOT=BUILD_ROOT
DATA=DATA_ROOT

def read_ts(path):
    text=path.read_text(encoding='utf-8');return json.loads(text[text.index('{'):text.rindex(' as const')])

def ratio(current,previous):
    return None if current is None or previous is None or previous<=0 else (current/previous-1)*100

def aggregate(openrouter,ramp):
    daily=collections.defaultdict(int);seen=set()
    for row in openrouter['data']:
        key=(row['date'],row['model_permaslug']);assert key not in seen,('Duplicate OpenRouter record',key)
        seen.add(key);value=int(row['total_tokens']);assert value>=0;daily[row['date']]+=value
    ramp_weeks=collections.defaultdict(int);seen=set()
    for row in ramp['tokenVolumes']:
        if row['metric_key']!='token_volume' or row['dimension_type']!='model':continue
        assert row['period_grain']=='weekly'
        start,end=dt.date.fromisoformat(row['period_start']),dt.date.fromisoformat(row['period_end'])
        assert start.weekday()==0 and end-start==dt.timedelta(days=6)
        key=(row['period_start'],row['series_key']);assert key not in seen,('Duplicate Ramp record',key)
        seen.add(key);value=int(row['metric_value']);assert value>=0;ramp_weeks[row['period_end']]+=value
    return dict(daily),dict(ramp_weeks)

def build_windows(daily,ramp_weeks,months):
    windows=[]
    for month in months:
        year,number=map(int,month.split('-'))
        end=dt.date(year,number,calendar.monthrange(year,number)[1]);end-=dt.timedelta(days=(end.weekday()+1)%7)
        days=[(end-dt.timedelta(days=i)).isoformat() for i in range(28)]
        weeks=[(end-dt.timedelta(days=i*7)).isoformat() for i in range(4)]
        or_days=sum(day in daily for day in days);ramp_count=sum(week in ramp_weeks for week in weeks)
        complete=or_days==28 and ramp_count==4
        windows.append(dict(month=month,start=days[-1],end=end.isoformat(),openrouterDays=or_days,rampWeeks=ramp_count,complete=complete,
            openrouter=sum(daily[d] for d in days)/28/1e12 if complete else None,
            ramp=sum(ramp_weeks[w] for w in weeks)/28/1e12 if complete else None))
    return windows

def integrate(base,windows,token_weight=.10):
    result=copy.deepcopy(base);lookup={r['month']:r for r in windows};baseline={}
    for source in ['openrouter','ramp']:
        valid=[math.log(r[source]) for r in windows if r['month']<=base['metadata']['baselineEnd'] and r[source] is not None and r[source]>0]
        assert len(valid)>=12,'Insufficient token calibration history'
        baseline[source]=dict(mean=statistics.mean(valid),std=statistics.stdev(valid),count=len(valid))
    for month in result['months']:
        window=lookup[month['month']]
        for row in month['rows']:
            if row['pillar']=='Demand':row['weight']=(.2-token_weight)/4
            row['contribution']=None if row['score'] is None else row['weight']*(row['score']-50)
        insertion=max(i for i,r in enumerate(month['rows']) if r['pillar']=='Demand')+1
        for i,(source,ticker,name,source_id) in enumerate([('openrouter','OPENROUTER_TOKEN_VOLUME','OpenRouter token volume','S9'),('ramp','RAMP_TOKEN_VOLUME','Ramp business token volume','S14')]):
            level=window[source];signal=math.log(level) if level is not None and level>0 else None
            stats=baseline[source];score=None if signal is None else max(0,min(100,50+15*(signal-stats['mean'])/stats['std']))
            weight=token_weight/2
            month['rows'].insert(insertion+i,dict(ticker=ticker,name=name,pillar='Demand',weight=weight,growth=signal,score=score,
                contribution=None if score is None else weight*(score-50),baselineCount=stats['count'],
                treatment='Log matched 4W average tokens/day',level=level,shortMomentum=None,baselineMean=stats['mean'],baselineStd=stats['std'],
                source=source_id,sourceField='published token volume',unit='T tokens/day',windowStart=window['start'],windowEnd=window['end']))
        month['score']=sum(r['weight']*r['score'] for r in month['rows']) if all(r['score'] is not None for r in month['rows']) else None
    result['metadata'].update(version='2.4',previousVersion='2.3',tokenCoreWeight=token_weight,tokenBaseline=baseline,
        tokenMethod='Separate OpenRouter routed-traffic and Ramp TSM sampled-business token signals. Each monthly observation uses the same four completed Monday-Sunday weeks ending on the last Sunday within that calendar month. Require all 28 OpenRouter days and four Ramp weekly records. Score the natural log of each positive average daily volume against its own fixed matched-month baseline through June 2026. Never add the source totals. Missing windows withhold scores and core; no partial-month scaling, interpolation or missing-weight redistribution.',
        demandMethod=f'Token volume receives {token_weight*100:g}% of the core, divided equally between two sources. DRAM, NAND, TSMC and Ramp median spending share the remaining {(0.2-token_weight)*100:g}% equally. Existing transformed signals and baselines are unchanged.',
        rampMethod='Ramp paid adoption remains one third of Adoption (6.6667% core). Ramp nominal median spending remains 3M-average YoY, with its v2.3 baseline, at the revised Demand weight. Ramp token volume is a separate TSM sample, not all Ramp AI-paying firms. Provider/sector adoption and AI spend share remain context.')
    return result

def frequency_snapshot(daily,ramp_weeks,windows):
    first=dt.date.fromisoformat(min(daily));last=dt.date.fromisoformat(max(daily))
    def average(end,length):
        days=[(end-dt.timedelta(days=i)).isoformat() for i in range(length)]
        return sum(daily[d] for d in days)/length/1e12 if all(d in daily for d in days) else None
    dates=[first+dt.timedelta(days=i) for i in range((last-first).days+1)]
    daily_rows=[]
    for date in dates:
        iso=date.isoformat();value=daily.get(iso)
        level=None if value is None else value/1e12
        daily_rows.append(dict(date=iso,openrouter=level,average7d=average(date,7),dayChange=ratio(level,None if daily.get((date-dt.timedelta(days=1)).isoformat()) is None else daily[(date-dt.timedelta(days=1)).isoformat()]/1e12),
                              weekChange=ratio(average(date,7),average(date-dt.timedelta(days=7),7))))
    monday=first-dt.timedelta(days=first.weekday());weeks=[];partial=[]
    while monday<=last:
        sunday=monday+dt.timedelta(days=6);days=[(monday+dt.timedelta(days=i)).isoformat() for i in range(7)]
        n=sum(d in daily for d in days);observed=sum(daily.get(d,0) for d in days)
        r=ramp_weeks.get(sunday.isoformat())
        row=dict(start=monday.isoformat(),end=sunday.isoformat(),openrouter=observed/7/1e12 if n==7 else None,ramp=None if r is None else r/7/1e12,
                 openrouterDays=n,openrouterObservedTotal=observed/1e12,rampComplete=r is not None)
        if sunday>last:partial.append(row)
        else:weeks.append(row)
        monday+=dt.timedelta(days=7)
    for i,row in enumerate(weeks):
        for source in ['openrouter','ramp']:
            row[source+'Wow']=ratio(row[source],weeks[i-1][source] if i else None)
    return dict(metadata=dict(openrouterThrough=max(daily),rampThrough=max(ramp_weeks),openrouterSource='https://openrouter.ai/api/v1/datasets/rankings-daily',rampSource='https://ramp.com/data/ai-index',
             openrouterMissingDays=[r['date'] for r in daily_rows if r['openrouter'] is None],
             scope='OpenRouter public routed traffic and Ramp TSM sampled-business published model volumes. Customer overlap cannot be measured. No combined industry-token total.',
             dailyRampLimit='Ramp tokenPrices daily fields are overlapping 7-day totals for a narrower provider sample. They are neither summed nor treated as actual daily volumes.'),
             monthly=windows,weekly=weeks,daily=daily_rows,partialWeeks=partial)

def main():
    p=argparse.ArgumentParser();p.add_argument('--ramp-input',type=Path,default=RAMP/'dashboard-data.json');p.add_argument('--token-weight',type=float,default=.10);args=p.parse_args()
    assert 0<args.token_weight<.2
    current=read_ts(ROOT/'app/core-contribution-snapshot.ts');preserved=REFERENCE/'core-v2.3.ts'
    if current['metadata']['version']=='2.3':preserved.write_text('export const coreContributionSnapshot = '+json.dumps(current,indent=2)+' as const;\n')
    base=read_ts(preserved);or_path=OPENROUTER
    openrouter_data=json.loads(or_path.read_text(encoding='utf-8'))
    daily,ramp=aggregate(openrouter_data,json.loads(args.ramp_input.read_text(encoding='utf-8')))
    windows=build_windows(daily,ramp,[m['month'] for m in base['months']]);result=integrate(base,windows,args.token_weight)
    hf=frequency_snapshot(daily,ramp,windows)
    hf['metadata'].update(openrouterSha256=hashlib.sha256(or_path.read_bytes()).hexdigest(),rampSha256=hashlib.sha256(args.ramp_input.read_bytes()).hexdigest(),rampRetrieved=json.loads((RAMP/'normalized.json').read_text(encoding='utf-8'))['retrieved_utc'][:10],openrouterAsOf=max(m['as_of'] for m in openrouter_data['meta']),tokenCoreWeight=args.token_weight)
    result['metadata']['tokenSourceHashes']={s:hf['metadata'][s+'Sha256'] for s in ['openrouter','ramp']}
    (ROOT/'app/token-activity-snapshot.ts').write_text('export const tokenActivitySnapshot = '+json.dumps(hf,indent=2)+' as const;\n')
    (ROOT/'app/core-contribution-snapshot.ts').write_text('export const coreContributionSnapshot = '+json.dumps(result,indent=2)+' as const;\n')
    latest=next(m for m in reversed(result['months']) if m['score'] is not None)
    print(json.dumps(dict(latestMonth=latest['month'],score=latest['score'],baseline=result['metadata']['tokenBaseline'],completeMonths=[m['month'] for m in result['months'] if m['score'] is not None],sources=hf['metadata'])))

if __name__=='__main__':main()
