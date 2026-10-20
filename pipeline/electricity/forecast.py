"""Publisher anchors and clearly separate illustrative analyst scenarios."""
import datetime as dt, hashlib, json
from .build import dump, read_csv, write_csv
from .model import cohort_energy

def forecast(folder):
    assumptions=[];results=[]
    # Only exact published anchors are used. No digitized annual publisher series.
    for scenario,endpoint in [('constrained',521),('central',649),('accelerated',843)]:
        assumptions.append(dict(scenario_id=scenario,parameter='2030_national_anchor',value=endpoint,unit='TWh',target_year=2030,
            evidence_or_rationale='LBNL June 2026 Table 2: compounded low / reference / compounded high. Intermediate years are analyst paths, not publisher forecasts.',
            assumption_status='publisher_anchor; analyst_interpolation',sensitivity_low=521,sensitivity_high=843))
        for y in range(2024,2031):
            central=192*(464/192)**((y-2024)/4) if y<=2028 else 464*(649/464)**((y-2028)/2)
            # Spread widens from zero at the historical anchor to publisher bounds at 2030.
            value=central*(endpoint/649)**((y-2024)/6)
            results.append(dict(scenario_id=scenario,target_year=y,geography_id='US',metric='dc_electricity',value=round(value,6),unit='TWh',
                status='analyst_scenario',baseline_vintage='LBNL June 2026',model_version='1.0',coverage_basis='US data centers excluding crypto; benchmark interpolation, no grid-total addition'))
    # A hypothetical 1 GW IT cohort shows physical sensitivities without converting unknown broker MW.
    for scenario,completion,energization,util,pue,date in [
      ('constrained',.75,.8,.45,1.15,dt.date(2028,7,1)),
      ('central',.9,.9,.6,1.2,dt.date(2027,7,1)),
      ('accelerated',1,1,.75,1.25,dt.date(2027,1,1))]:
        for param,val,unit in [('completion',completion,'probability'),('energization_given_completion',energization,'probability'),('utilization',util,'fraction'),('pue',pue,'ratio'),('nameplate_it_mw',1000,'MW'),('commissioning_date',date.isoformat(),'date')]:
            assumptions.append(dict(scenario_id='illustrative_'+scenario,parameter=param,value=val,unit=unit,target_year=None,
                evidence_or_rationale='Illustrative stress-test assumptions, not calibrated to an observed project or broker pipeline; constant utilization after commissioning; no retirement through 2030.',
                assumption_status='analyst_assumption',sensitivity_low=None,sensitivity_high=None))
        for delay in (0,6,12,24):
            shifted_year=date.year+(date.month-1+delay)//12;shifted_month=(date.month-1+delay)%12+1
            commissioning=date.replace(year=shifted_year,month=shifted_month)
            for y in range(2026,2031):
                value=cohort_energy(1000,'IT',y,commissioning,util,pue,completion,energization)
                results.append(dict(scenario_id='illustrative_'+scenario,target_year=y,geography_id='hypothetical_1GW_IT_cohort',metric='facility_energy',value=round(value,6),unit='TWh',
                    status='analyst_scenario',baseline_vintage='none; hypothetical cohort',model_version='1.0',delay_months=delay,
                    coverage_basis='1 GW hypothetical IT cohort only; excludes operating stock; never added to national or PJM forecasts'))
    digest=hashlib.sha256(json.dumps(assumptions,sort_keys=True).encode()).hexdigest()
    for r in results:r['assumptions_hash']=digest
    write_csv(folder/'scenario_assumptions.csv',assumptions);write_csv(folder/'scenario_results.csv',results)
    dump(folder/'scenario_metadata.json',dict(model_version='1.0',assumptions_hash=digest,
        limitation='National scenarios interpolate sparse publisher anchors. Cohort sensitivities are hypothetical unit examples; observed market cohort model and vintage backtests remain gaps. No probability/confidence interpretation.'))
