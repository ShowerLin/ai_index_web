"""v2.7 nominal-spending growth from aligned volume and price changes."""
import copy
import datetime as dt
import math
import statistics
from affordability import monthly_prices

SPECS=[('ramp','RAMP_MATCHED_SPENDING','Ramp matched spending growth','S14'),
       ('openrouter','OPENROUTER_SPENDING_PROXY','OpenRouter estimated spending growth','S9 + S15')]

def combine_growth(volume_growth,price_change):
    if volume_growth is None or price_change is None:return None
    return ((1+volume_growth/100)*(1+price_change/100)-1)*100


def observations(core,prices,tokens):
    monthly=monthly_prices(prices,[m['month'] for m in core['months']])
    daily={r['date']:r['value'] for r in prices['siliconDaily']}
    volumes={r['month']:r for r in tokens['monthly']}
    result=[]
    for row in monthly:
        end=dt.date.fromisoformat(row['windowEnd'])
        days=[(end-dt.timedelta(days=i)).isoformat() for i in range(28)]
        benchmark=sum(daily[d] for d in days)/28 if all(d in daily for d in days) else None
        traffic=volumes.get(row['month'],{})
        volume=traffic.get('openrouter') if traffic.get('complete') else None
        row.update(openrouterPrice=benchmark,openrouterVolume=None if volume is None else volume*28*1e12,
                   rampVolume=row['rampMatchedTokens'],rampPrice=row['ramp'])
        row['openrouterSpendProxy']=row['openrouterVolume']*benchmark/1e6 if row['openrouterVolume'] is not None and benchmark is not None else None
        result.append(row)
    lookup={r['month']:r for r in result}
    for row in result:
        year,num=map(int,row['month'].split('-'));previous=f'{year-1}-12' if num==1 else f'{year}-{num-1:02}'
        prior=lookup.get(previous,{})
        for source,*_ in SPECS:
            v,p=row[source+'Volume'],row[source+'Price'];pv,pp=prior.get(source+'Volume'),prior.get(source+'Price')
            vg=(v/pv-1)*100 if v is not None and pv and pv>0 else None
            pc=(p/pp-1)*100 if p is not None and pp and pp>0 else None
            growth=combine_growth(vg,pc)
            row[source+'VolumeGrowth']=vg;row[source+'PriceChange']=pc;row[source+'SpendingGrowth']=growth
            row[source+'Interaction']=vg*pc/100 if vg is not None and pc is not None else None
            key='rampSpendUsd' if source=='ramp' else 'openrouterSpendProxy'
            if growth is not None:
                assert math.isclose(growth,(row[key]/prior[key]-1)*100,abs_tol=1e-8)
    return result


def integrate(core,prices,tokens):
    assert core['metadata']['version']=='2.6'
    data=observations(core,prices,tokens);lookup={r['month']:r for r in data}
    expected=[f'2026-{m:02}' for m in range(1,7)]
    calibration=[r for r in data if r['month'] in expected]
    assert [r['month'] for r in calibration]==expected
    baseline={}
    for source,*_ in SPECS:
        values=[r[source+'SpendingGrowth'] for r in calibration]
        assert all(v is not None and math.isfinite(v) for v in values),'All six January–June growth calibration months required'
        std=statistics.stdev(values);assert std>0
        baseline[source]=dict(mean=statistics.mean(values),std=std,count=6,start='2026-01',end='2026-06',provisional=True)
    result=copy.deepcopy(core)
    for month in result['months']:
        month['previousVersionScore']=month['score']
        month['rows']=[r for r in month['rows'] if r['pillar']!='Adoption']
        obs=lookup[month['month']]
        for source,ticker,name,source_id in SPECS:
            growth=obs[source+'SpendingGrowth'];stats=baseline[source]
            score=None if growth is None else max(0,min(100,50+15*(growth-stats['mean'])/stats['std']))
            level=obs['rampSpendUsd' if source=='ramp' else 'openrouterSpendProxy']
            month['rows'].append(dict(ticker=ticker,name=name,pillar='Adoption',weight=.1,growth=growth,score=score,
                contribution=None if score is None else .1*(score-50),baselineCount=6,baselineMean=stats['mean'],baselineStd=stats['std'],
                level=level,shortMomentum=None,unit='USD / 28-day window',treatment='Nominal spending change vs preceding monthly 28-day window',
                source=source_id,sourceField='Matched Ramp model spending' if source=='ramp' else 'OpenRouter volume × external Bloomberg price benchmark; proxy',
                windowStart=obs['windowStart'],windowEnd=obs['windowEnd'],volumeGrowth=obs[source+'VolumeGrowth'],priceChange=obs[source+'PriceChange'],interaction=obs[source+'Interaction']))
        month['score']=sum(r['weight']*r['score'] for r in month['rows']) if all(r['score'] is not None for r in month['rows']) else None
    result['metadata'].update(version='2.7',previousVersion='2.6',comparisonVersion='2.6',tokenCoreWeight=0,priceCoreWeight=0,spendingCoreWeight=.2,spendingBaseline=baseline,
        method='Five equal 20% pillars. Adoption scores Ramp matched nominal spending growth and OpenRouter estimated nominal spending growth at 10% each. Combine raw growth factors before standardizing: (1 + volume growth) × (1 + price change) − 1. Price declines reduce nominal growth. Other pillars unchanged. Six-month January–June 2026 calibration is provisional and retrospective. Missing scores withhold the composite, without redistributing weights.',
        adoptionMethod='Two nominal spending growth scores at 10% each. Ramp uses matched spending and tokens; OpenRouter volume times an external price benchmark is a rough proxy, not observed revenue.',
        priceMethod='Price has no standalone score or inverse-price reward. Bloomberg daily saved values are averaged over the same complete 28-day window as OpenRouter tokens. Ramp effective price is matched spending divided by matched tokens. Volume and price changes use the preceding monthly observation window.',
        tokenMethod='Volume and price are diagnostic drivers of spending growth, not additional weighted scores. Ramp uses matched-model tokens, not all published tokens; both price and volume use the identical matched set within each window.',
        rampMethod='Ramp matched spending growth carries 10% in Adoption; median spend per employee remains 5% in Demand. Samples differ. Changing model/sample composition affects matched spending growth.',
        earliestScoringMonth='2026-01')
    result['metadata'].pop('affordabilityBaseline',None)
    return result,data
