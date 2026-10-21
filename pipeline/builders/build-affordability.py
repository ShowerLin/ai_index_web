"""Apply v2.6 after the reproducible v2.5 dependency chain."""
import json
from paths import BUILD_ROOT
from affordability import integrate


def read(name):
    return json.JSONDecoder().raw_decode((BUILD_ROOT/'app'/name).read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]


def write(name, variable, data):
    (BUILD_ROOT/'app'/name).write_text('export const '+variable+' = '+json.dumps(data,indent=2,allow_nan=False)+' as const;\n',encoding='utf-8')


def main():
    core=read('core-contribution-snapshot.ts'); prices=read('adoption-price-snapshot.ts')
    revised,monthly=integrate(core,prices)
    write('core-contribution-snapshot.ts','coreContributionSnapshot',revised)
    prices['metadata'].update(coreWeight=.1, version='2.6', scoringMethod=revised['metadata']['priceMethod'],baseline=revised['metadata']['affordabilityBaseline'])
    prices['monthlyScoring']=monthly
    write('adoption-price-snapshot.ts','adoptionPriceSnapshot',prices)
    tokens=read('token-activity-snapshot.ts');tokens['metadata']['tokenCoreWeight']=.1
    write('token-activity-snapshot.ts','tokenActivitySnapshot',tokens)
    audit=[dict(month=m['month'],previousScore=m['previousVersionScore'],score=m['score'],delta=m['score']-m['previousVersionScore'] if m['score'] is not None and m['previousVersionScore'] is not None else None) for m in revised['months']]
    (BUILD_ROOT/'audits/adoption-v2.6.json').write_text(json.dumps(dict(baseline=revised['metadata']['affordabilityBaseline'],comparison=audit),indent=2)+'\n',encoding='utf-8')
    print(json.dumps(next(m for m in reversed(audit) if m['score'] is not None)))

if __name__=='__main__':main()
