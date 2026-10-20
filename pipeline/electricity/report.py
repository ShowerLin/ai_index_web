"""Dashboard contract and source-linked local research handoff."""
import csv,json
from collections import defaultdict
from .build import ROOT,dump,read_csv

def dashboard(folder):
    hist=read_csv(folder/'electricity_history.csv');construction=read_csv(folder/'construction_spending.csv')
    annual=[dict(year=int(r['period_start'][:4]),geography=r['geography_id'],sector=r['sector'],twh=float(r['value'])/1e6,recordId=r['record_id']) for r in hist if r['frequency']=='annual']
    monthly=[dict(period=r['period_start'][:7],sector=r['sector'],twh=float(r['value'])/1e6,provisional=r['provisional']=='True',recordId=r['record_id']) for r in hist if r['frequency']=='monthly' and r['geography_id']=='US']
    spend=[];lookup={(r['period'],r['category_label'],r['seasonal_adjustment']):float(r['value']) for r in construction if r['frequency']=='monthly'}
    periods=sorted({r['period'] for r in construction if r['frequency']=='monthly'})
    for i,p in enumerate(periods):
        current=lookup.get((p,'Data center','SAAR'));prior=lookup.get((str(int(p[:4])-1)+p[4:],'Data center','SAAR'));nsa=lookup.get((p,'Data center','NSA'))
        vals=[lookup.get((m,'Data center','NSA')) for m in periods[max(0,i-11):i+1]]
        spend.append(dict(period=p,saarBillion=None if current is None else current/1000,nsaBillion=None if nsa is None else nsa/1000,
            trailing12Billion=sum(vals)/1000 if len(vals)==12 and all(x is not None for x in vals) else None,
            yoyPct=(current/prior-1)*100 if current is not None and prior else None,officeSaarBillion=lookup.get((p,'Office','SAAR'),0)/1000))
    def numeric(rows,cols):
        return [{**r,**{k:(float(r[k]) if r.get(k) not in ('',None) else None) for k in cols}} for r in rows]
    result=dict(schemaVersion=1,cutoff='2026-10-16',coverageStatus='partial',title='Power and construction: the delivery test for AI investment',
        investmentReadthrough='Compare capital commitments with buildings delivered, power available and recurring paid usage. Tight leasing supports demand; energization delays can postpone utilization, cash generation and returns.',
        annualRetail=annual,monthlyRetail=monthly,construction=spend,
        dcEnergy=numeric(read_csv(folder/'dc_energy.csv'),['value','target_year']),
        markets=numeric(read_csv(folder/'market_pipeline.csv'),['value']),
        pjm=numeric(read_csv(folder/'pjm_forecasts.csv'),['value','target_year']),
        outlook=numeric(read_csv(folder/'electricity_outlook.csv'),['value','target_year']),
        hourlyCoverage=numeric(read_csv(folder/'hourly_coverage.csv'),['year','energy_twh','observed_max_mw','valid_hours','expected_full_year_hours']),
        scenarios=numeric(read_csv(folder/'scenario_results.csv'),['target_year','value','delay_months']),
        sources=json.loads((folder/'sources.json').read_text(encoding='utf-8')),
        gaps=read_csv(folder/'gaps.csv'),
        caveats=['Retail sales, total consumption and BA load are separate measures.','Data centers include non-AI workloads; electricity use is not AI revenue.',
            'CBRE primary US colocation markets and JLL expanded North America coverage overlap; never add them.',
            'SAAR is an annualized rate. Trailing realized construction spending sums NSA months.',
            'LBNL published scenarios remain separate from interpolated analyst paths and hypothetical cohort stress tests.',
            'PJM forecasts already include data-center adjustments. No data-center model is added to its baseline.',
            'PJM zonal/energy workbooks and third forecast vintage remain inaccessible. Core index weights are unchanged.'])
    dump(folder/'dashboard.json',result)
    (folder/'electricity-capacity-snapshot.ts').write_text('export const electricityCapacity = '+json.dumps(result,ensure_ascii=False,allow_nan=False)+' as const;\n',encoding='utf-8')
    return result

def report(folder):
    d=json.loads((folder/'dashboard.json').read_text(encoding='utf-8'));out=ROOT/'outputs/electricity';out.mkdir(parents=True,exist_ok=True)
    us=[r for r in d['annualRetail'] if r['geography']=='US' and r['sector']=='all'];first,last=us[0],us[-1]
    us=sorted(us,key=lambda r:r['year']);first,last=us[0],us[-1]
    latest=d['construction'][-1]
    memo=f'''# Electricity and capacity research handoff

Cutoff: 16 October 2026 (Asia/Shanghai). Coverage: **partial**, with validated available evidence. This module supplements the AI investment-atmosphere research; it does not change core-index weights. No website was published.

## What the evidence says

1. **Electricity history:** U.S. retail sales rose from {first['twh']:,.1f} TWh in {first['year']} to {last['twh']:,.1f} TWh in {last['year']} ({(last['twh']/first['twh']-1)*100:.1f}%). Monthly state/sector coverage runs through {max(r['period'] for r in d['monthlyRetail'])}. Retail sales exclude direct use and must not be spliced into total consumption. Commercial sales include far more than data centers. [EIA state data](https://www.eia.gov/electricity/data/state/).
2. **Data-center energy:** the 2024 LBNL report estimated 176 TWh for 2023 and a 325-580 TWh range for 2028. The 2025 update, published 18 June 2026, revises history (192 TWh in 2024), gives a 464 TWh reference case in 2028 and 649 TWh in 2030. Its 2030 compounded range is 521-843 TWh. These are equipment/operating scenarios, not confidence intervals or electricity attributed exclusively to AI. [LBNL update](https://www.energy.gov/documents/united-states-data-center-energy-usage-report-2025-update).
3. **Construction and pipelines:** {latest['period']} private data-center construction ran at ${latest['saarBillion']:.2f} billion SAAR, {latest['yoyPct']:.1f}% above a year earlier. Realized trailing-12-month NSA spending was ${latest['trailing12Billion']:.2f} billion. These nominal building expenditures exclude racks/servers; they are not starts, completions or technology CapEx. CBRE reports 10,903 MW inventory, 7,481.1 MW under construction, 1.4% vacancy and 80.4% preleasing for eight primary U.S. wholesale colocation markets in H1 2026. [Census](https://www.census.gov/construction/c30/historical_data.html), [CBRE](https://www.cbre.ca/insights/books/north-america-data-center-trends-h1-2026).
4. **Timing and regional peaks:** PJM's January 2026 normal summer forecast is 165,567 MW for 2028 and 183,008 MW for 2030; revisions from its 2025 forecast are -4,414 MW and -875 MW. It tightened near-term commitment requirements. Delays affect delivery and the timing of earnings even when long-term demand grows. These forecasts already contain large-load/data-center adjustments. [PJM revision table](https://insidelines.pjm.com/pjms-updated-20-year-forecast-continues-to-see-significant-long-term-load-growth/).

## Connection to the investment atmosphere

Follow the chain: hyperscaler CapEx and equipment orders -> construction put in place -> commissioned and energized capacity -> recurring usage and revenue -> cash coverage and incremental returns. Construction acceleration and low vacancy support the buildout thesis, but preleasing is a commitment rather than delivered load. Energization slippage can lengthen the period between cash outlay and revenue. Existing token activity, Ramp adoption and lab revenue provide demand evidence; sustainability/ROIC charts test recovery of the expanded capital base. None establishes that a public-equity valuation is cheap or expensive.

JLL provides a deliberately separate comparison: its expanded North America universe, including owner-occupied hyperscale and frontier markets, reports 66 GW under construction in H1 2026, with 95% precommitted. Texas and Virginia have 26 GW and 13 GW of operating-plus-construction capacity respectively; these combined stages are not operating stock. The expanded year-end-2025 coverage breaks historical comparability. Do not add JLL to CBRE or treat North America as the U.S. [JLL H1 release](https://www.jll.com/en-us/newsroom/data-center-demand-exceeds-expectations-in-h1-2026).

## Scenarios and limitations

National analyst paths interpolate 192 TWh (2024), 464 TWh (central 2028) and the 2030 LBNL anchors. Compounded-low/high ratios widen gradually toward 2030. Intermediate low/high paths are analyst constructions, not reported LBNL annual values. The cohort engine independently models IT/facility MW, leap years, partial-year commissioning, conditional energization and mutually exclusive commissioning-date states. Its displayed 1 GW examples are hypothetical stress tests with explicit assumptions, not forecasts of the observed broker pipeline. Broker power basis and commissioning dates are not sufficiently established to convert their aggregates to energy. No market-to-national multiplier or dollar-per-MW bridge is used.

STEO October 2026 Table 7a and AEO2026 Table 8 are retained independently. AEO is explicitly **Counterfactual Baseline**, not a consensus forecast. Its Table 5 server end-use is not equated to total data-center facility energy. Publication days not established from the files remain null. Retrieval timestamps never substitute for release dates.

PJM EIA-930 hourly data cover July 2015 through the latest available cutoff hour, with missingness and partial years reported in `hourly_coverage.csv`. Values are hour-ending UTC. Annual observed maxima from incomplete years are not treated as full-year peaks. No national BA total is constructed.

The remaining material gaps are PJM's third annual forecast vintage, detailed zonal annual energy/seasonal tables, midyear and accuracy extracts; older STEO vintages; a national BA coverage panel; full embedded broker tables and verified capacity bases; source-calibrated delivery cohorts and true vintage backtests. Attempts and fallbacks are in `gaps.csv`. Bloomberg's forward-filled construction observation dates cannot establish matched reference periods, so no direct reconciliation is claimed.

## What would change the thesis

- Stronger: construction converts to confirmed energized capacity; recurring paid usage and recognized revenue grow alongside it; cash and incremental returns improve.
- Weaker: commissioning/energization repeatedly slips, preleasing converts poorly, or power costs grow while paid utilization and returns lag.
- Refresh: Census/EIA releases, broker editions, PJM commitment vetting and LBNL equipment/utilization assumptions. Preserve prior vintages to distinguish revisions from new actuals.

## 2028/2030 analyst checkpoint (TWh)

| Scenario | 2028 | 2030 |
|---|---:|---:|
'''
    for scenario in ('constrained','central','accelerated'):
        values={int(r['target_year']):r['value'] for r in d['scenarios'] if r['scenario_id']==scenario}
        memo+=f"| {scenario} | {values[2028]:.1f} | {values[2030]:.1f} |\n"
    (out/'research_memo.md').write_text(memo,encoding='utf-8')
    counts=json.loads((folder/'build_manifest.json').read_text(encoding='utf-8'))['table_counts']
    status='# Execution status\n\nCutoff 2026-10-16. Accepted evidence passes blocking checks; overall research coverage remains partial.\n\n| Task | Status | Evidence / remaining gap |\n|---|---|---|\n'
    for task,state,note in [('T0','passed','Portable config, baseline hashes, writable workspace and local lock check.'),('T1','partial',f"{counts['electricity_history']} retail observations; PJM hourly; STEO/AEO. National BA panel and archived outlook vintages missing."),('T2','partial','SAAR/NSA/annual history from 2014 and reconciliation delivered. Bloomberg period mapping unavailable.'),('T3','passed','Both LBNL vintages; exact table/text anchors and updated assumptions reviewed; sparse years retained.'),('T4','partial','Four CBRE editions plus JLL US state/market and separate North America panels. Full tables/power basis gaps.'),('T5','partial','2026/2025 same-target seasonal peaks from public revision table; third vintage and zonal/energy workbooks inaccessible.'),('T6','passed','Schema/provenance, hashes, reconciliation, validation and cached rebuild; research coverage flags preserved.'),('T7','partial','Three national analyst paths and hypothetical cohort delay sensitivities; no observed calibrated cohorts or vintage backtest.'),('T8','passed','Local memo, data dictionary, runbook, chart-ready JSON and website module; no publication.')]:status+=f'| {task} | {state} | {note} |\n'
    (out/'execution_status.md').write_text(status,encoding='utf-8')
    dictionary='# Data dictionary\n\nAll numeric source rows carry record ID, release ID, source/vintage/publication and retrieval dates, raw path, source URL, locator, unit, status, quality flag and notes. Null publication dates mean unknown; empty CSV numeric fields mean null, not zero.\n\n'
    for name in counts:
        rows=read_csv(folder/(name+'.csv'));dictionary+='## '+name+'\n\nGrain and columns: '+', '.join(rows[0].keys())+'.\n\n'
    dictionary+='`scenario_results`: analyst scenarios only; national interpolation and hypothetical unit-cohort outputs are different geographies. `hourly_coverage`: UTC year based on hour-ending timestamp, complete years only qualify for full-year peak comparisons. `retail_reconciliation` and `census_reconciliation` compare native files, allowing rounding/revisions. `dashboard.json`: web-facing contract retaining record IDs/full source provenance. `sources.json`: raw hashes. `gaps.csv`: access and methodology limits.\n'
    (out/'data_dictionary.md').write_text(dictionary,encoding='utf-8')
    return out
