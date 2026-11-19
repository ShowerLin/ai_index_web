"""Adoption v2.5: separate sampled volumes; zero-weight price context."""
import collections, copy, json, math
from silicon_prices import read_silicon_prices
from paths import DATA_ROOT, BUILD_ROOT, RAMP
from ramp_periods import public_chart_data, token_periods

def read(name):
    return json.JSONDecoder().raw_decode((BUILD_ROOT/'app'/name).read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]

def write(name, variable, data):
    (BUILD_ROOT/'app'/name).write_text('export const '+variable+' = '+json.dumps(data,indent=2,allow_nan=False)+' as const;\n',encoding='utf-8')

def weekly_effective_cost(rows):
    weeks=collections.defaultdict(dict)
    for r in rows:
        if r['dimension_type']!='model' or r['metric_key'] not in ('token_spend','token_volume'):continue
        assert r['period_grain']=='weekly'
        item=weeks[r['period_end']].setdefault(r['series_key'],{})
        assert r['metric_key'] not in item
        value=float(r['metric_value']);assert math.isfinite(value) and value>=0
        item[r['metric_key']]=value
    effective=[]
    for end,models in sorted(weeks.items()):
        matched=[v for v in models.values() if 'token_spend' in v and v.get('token_volume',0)>0]
        total=sum(v.get('token_volume',0) for v in models.values());volume=sum(v['token_volume'] for v in matched)
        spend=sum(v['token_spend'] for v in matched)
        effective.append(dict(end=end,value=spend/volume*1e6 if volume else None,coverage=volume/total if total else 0,matchedModels=len(matched),totalModels=len(models),spendUsd=spend,tokens=volume))
    return effective

def main():
    core=read('core-contribution-snapshot.ts')
    assert core['metadata']['version']=='2.4', 'Run the v2.4 dependency chain first'
    previous=copy.deepcopy(core)
    for month in core['months']:
        month['contextRows']=[dict(r,weight=0,contribution=0) for r in month['rows'] if r['pillar']=='Adoption']
        month['rows']=[r for r in month['rows'] if r['pillar']!='Adoption']
        for row in month['rows']:
            if row['ticker'].endswith('TOKEN_VOLUME'):
                row.update(pillar='Adoption',weight=.1)
            elif row['pillar']=='Demand': row['weight']=.05
            row['contribution']=None if row['score'] is None else row['weight']*(row['score']-50)
        month['score']=sum(r['weight']*r['score'] for r in month['rows']) if all(r['score'] is not None for r in month['rows']) else None
    core['metadata'].update(version='2.5',previousVersion='2.4',tokenCoreWeight=.2,
        method='Five equal 20% pillars. Adoption scores two separate matched-window log token volumes (10% each). Demand scores DRAM, NAND, TSMC and Ramp median spending (5% each). Other transformations and frozen sample-standard-deviation baselines through June 2026 are unchanged. Clip 50 + 15*z to 0–100. Missing scores withhold the composite without redistributing weights. Survey breadth and prices are zero-weight context. Retrospective calibration is not a point-in-time backtest.',
        adoptionMethod='Volume-only scoring: Ramp TSM business sample and OpenRouter routed traffic each receive 10% of the whole core. Preserve v2.4 matched 28-day windows and frozen separate log-volume calibration. Survey and Ramp paid-adoption breadth retained as zero-weight context. Prices have zero weight.',
        demandMethod='DRAM exports, NAND exports, TSMC revenue and Ramp median spending each receive 5% of the whole core. Existing transformations and calibration unchanged.',
        rampMethod='Ramp TSM token volume is 10% of the core in Adoption; Ramp median spending is 5% in Demand. Ramp paid adoption is zero-weight breadth context. Samples differ.',
        priceMethod='SDLLMTK daily saved Bloomberg values and matched-model Ramp spending/token unit costs are separate zero-weight context. Neither is a constant-quality price index. No current list prices applied to past usage.')
    write('core-contribution-snapshot.ts','coreContributionSnapshot',core)
    tokens=read('token-activity-snapshot.ts');tokens['metadata'].update(tokenCoreWeight=.2,corePillar='Adoption')
    write('token-activity-snapshot.ts','tokenActivitySnapshot',tokens)
    price_metadata,daily,monthly=read_silicon_prices(DATA_ROOT)
    published,matched,_=token_periods(RAMP/'dashboard-data.json')
    effective=weekly_effective_cost(matched)
    payload=dict(metadata=dict(**price_metadata,unit='USD per million tokens',coreWeight=0,
        siliconMethod='Saved daily Bloomberg px_last with fill=PREV. Carried dates are not independently verified fresh quotes. Monthly values are arithmetic calendar-day averages, not the old monthly sampled endpoints. Partial months excluded from completed-month comparisons.',
        rampMethod='Sum spending divided by sum tokens for identical model/week pairs with positive volume, multiplied by one million. Coverage is matched tokens / all published model tokens. No price shown below 95% coverage. Sample effective unit cost includes model mix, caching and commercial terms; not a pure repricing index.',
        derivedListPriceStatus='Deferred: historical dated model prices, input/output/cache weights and complete model mapping are not established. No synthetic history or assumed input/output ratio.'),siliconDaily=daily,siliconMonthly=monthly,rampWeekly=effective,rampPublishedWeekly=weekly_effective_cost(published))
    payload['rampPublicChart'] = public_chart_data(RAMP/'dashboard-data.json')
    write('adoption-price-snapshot.ts','adoptionPriceSnapshot',payload)
    audit=[]
    for old,new in zip(previous['months'],core['months']):
        audit.append(dict(month=new['month'],previousScore=old['score'],score=new['score'],delta=None if old['score'] is None or new['score'] is None else new['score']-old['score']))
    (BUILD_ROOT/'audits').mkdir(exist_ok=True)
    (BUILD_ROOT/'audits/adoption-v2.5.json').write_text(json.dumps(audit,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(dict(priceDays=len(daily),through=price_metadata["through"],rampWeeks=len(effective),latestComplete=next(r for r in reversed(audit) if r['score'] is not None))))

if __name__=='__main__':main()
