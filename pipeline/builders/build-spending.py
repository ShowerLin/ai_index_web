"""Apply spending methodology v2.7 after the v2.6 intermediate."""
import json
from paths import BUILD_ROOT
from spending import integrate

def read(name):return json.JSONDecoder().raw_decode((BUILD_ROOT/'app'/name).read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]
def write(name,var,data):(BUILD_ROOT/'app'/name).write_text('export const '+var+' = '+json.dumps(data,indent=2,allow_nan=False)+' as const;\n',encoding='utf-8')
def main():
    core,prices,tokens=read('core-contribution-snapshot.ts'),read('adoption-price-snapshot.ts'),read('token-activity-snapshot.ts')
    revised,monthly=integrate(core,prices,tokens)
    write('core-contribution-snapshot.ts','coreContributionSnapshot',revised)
    prices['metadata'].update(version='2.7',coreWeight=0,spendingCoreWeight=.2,scoringMethod=revised['metadata']['priceMethod'],baseline=revised['metadata']['spendingBaseline'])
    prices['spendingMonthly']=monthly
    write('adoption-price-snapshot.ts','adoptionPriceSnapshot',prices)
    tokens['metadata'].update(tokenCoreWeight=0,spendingCoreWeight=.2)
    write('token-activity-snapshot.ts','tokenActivitySnapshot',tokens)
    audit=dict(baseline=revised['metadata']['spendingBaseline'],comparison=[dict(month=m['month'],previousScore=m['previousVersionScore'],score=m['score'],delta=None if m['score'] is None or m['previousVersionScore'] is None else m['score']-m['previousVersionScore']) for m in revised['months']])
    (BUILD_ROOT/'audits/adoption-v2.7.json').write_text(json.dumps(audit,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(next(m for m in reversed(audit['comparison']) if m['score'] is not None)))
if __name__=='__main__':main()
