"""Export labeled research charts from accepted dashboard data."""
import json,sys
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from .build import ROOT

def charts(folder):
    d=json.loads((folder/'dashboard.json').read_text(encoding='utf-8'));out=ROOT/'outputs/electricity/charts';out.mkdir(parents=True,exist_ok=True)
    plt.rcParams.update({'font.family':'DejaVu Sans','axes.spines.top':False,'axes.spines.right':False,'axes.titleweight':'bold','figure.facecolor':'white','axes.grid':True,'grid.alpha':.18})
    def fig(title,ylabel,source):
        f,a=plt.subplots(figsize=(10,5.6));a.set_title(title,loc='left',pad=18);a.set_ylabel(ylabel);f.text(.1,.025,source+' | Cutoff 2026-10-16 | Coverage partial',fontsize=8,color='#5b6d79');f.subplots_adjust(bottom=.2);return f,a
    def save(f,name):f.savefig(out/(name+'.png'),dpi=160);plt.close(f)
    f,a=fig('U.S. retail electricity sales by sector','TWh','EIA annual file, retrieved Oct 16 2026; publication day unknown; excludes direct use')
    for sector in ['all','commercial','residential','industrial']:
        rs=sorted([r for r in d['annualRetail'] if r['geography']=='US' and r['sector']==sector],key=lambda r:r['year']);a.plot([r['year'] for r in rs],[r['twh'] for r in rs],label=sector)
    a.legend(frameon=False);save(f,'national-sector-retail')
    f,a=fig('Commercial electricity sales in selected states','TWh','EIA annual file; commercial is not a direct data-center measure; retrieved Oct 16 2026')
    for geo in ['VA','TX','GA','AZ','OH','OR']:
        rs=sorted([r for r in d['annualRetail'] if r['geography']==geo and r['sector']=='commercial'],key=lambda r:r['year']);a.plot([r['year'] for r in rs],[r['twh'] for r in rs],label=geo)
    a.legend(frameon=False,ncols=3);save(f,'state-commercial-retail')
    f,a=fig('Private data-center construction spending','Nominal USD billions','Census October capture; building value put in place; equipment exclusions apply')
    for key,label in [('saarBillion','SAAR annual pace'),('trailing12Billion','NSA trailing 12 months realized')]:
        rs=[r for r in d['construction'] if r[key] is not None];a.plot([r['period'] for r in rs],[r[key] for r in rs],label=label)
    ticks=range(0,len(d['construction']),24);a.set_xticks(list(ticks),[d['construction'][i]['period'] for i in ticks]);a.legend(frameon=False);save(f,'construction-saar-and-realized')
    f,a=fig('LBNL estimates and publisher forecasts: preserve vintages','TWh','LBNL Dec 2024 and June 2026 update; sparse anchors; scenarios are not confidence intervals')
    for i,r in enumerate(d['dcEnergy']):
        c='#2776a1' if r['source_vintage'].startswith('2025') else '#b58d4c';a.scatter(r['target_year'],r['value'],color=c,s=40)
        if r['scenario'] in ('reference','historical','compounded_low','compounded_high','low','high'):a.annotate(f"{r['value']:.0f} {r['scenario']}",(r['target_year'],r['value']),xytext=(5,5 if i%2 else -13),textcoords='offset points',fontsize=8)
    a.set_xticks([2023,2024,2028,2030]);a.margins(x=.25,y=.18);save(f,'lbnl-publisher-anchors')
    f,a=fig('CBRE eight U.S. primary markets: construction pipeline','GW','CBRE H1 2024, H2 2024, H1 2025, H1 2026; published vintages; not national inventory')
    rs=[r for r in d['markets'] if r['source_id']=='CBRE' and r['market_id']=='US_primary_8' and r['metric']=='under_construction'];a.bar([r['as_of'] for r in rs],[r['value']/1000 for r in rs],color='#26749e');save(f,'cbre-primary-market-pipeline')
    f,a=fig('JLL: U.S. observations with explicitly different stages','GW','JLL Feb/Aug 2026 releases; expanded coverage; do not sum these observations or add CBRE')
    rs=[r for r in d['markets'] if r['source_id']=='JLL' and r['country']=='US' and r['metric'] in ('under_construction','operating_plus_under_construction')];labels=[r['market_id']+'\n'+r['as_of']+'\n'+('operating + construction' if r['metric'].startswith('operating') else 'construction') for r in rs];a.bar(labels,[r['value'] for r in rs],color=['#b98a51' if r['metric'].startswith('operating') else '#26749e' for r in rs]);a.tick_params(axis='x',labelsize=8);save(f,'jll-us-stage-comparison')
    f,a=fig('PJM fixed-target summer forecast revisions','GW','PJM Jan 2026 public revision table; 2025 reconstructed from published differences; DC already included')
    for vintage in ('2025','2026'):
        rs=[r for r in d['pjm'] if r['source_vintage']==vintage and r['season']=='summer'];a.plot([r['target_year'] for r in rs],[r['value']/1000 for r in rs],marker='o',label=vintage)
    a.legend(frameon=False);a.set_xticks([2027,2028,2029,2030,2031]);save(f,'pjm-fixed-target-revisions')
    f,a=fig('National analyst energy paths anchored to LBNL','TWh','Analyst interpolation, not publisher annual forecasts; LBNL June 2026 anchors; no grid baseline addition')
    for scenario in ('constrained','central','accelerated'):
        rs=[r for r in d['scenarios'] if r['scenario_id']==scenario];a.plot([r['target_year'] for r in rs],[r['value'] for r in rs],linestyle='--',marker='o',label=scenario)
    a.legend(frameon=False);save(f,'national-analyst-scenarios')
    f,a=fig('Hypothetical 1 GW IT cohort: delay sensitivity','Expected facility TWh','Illustrative central assumptions: p(completion)=.9, p(energized|complete)=.9, load factor=.6, PUE=1.2')
    for delay in (0,6,12,24):
        rs=[r for r in d['scenarios'] if r['scenario_id']=='illustrative_central' and r['delay_months']==delay];a.plot([r['target_year'] for r in rs],[r['value'] for r in rs],marker='o',label=str(delay)+'-month delay')
    a.legend(frameon=False);a.set_xticks(range(2026,2031));save(f,'illustrative-delay-sensitivity')
    return out
if __name__=='__main__':print(charts(Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'data/derived/electricity'))
