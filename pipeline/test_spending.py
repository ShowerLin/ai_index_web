import os
"""Nominal-spending methodology regression checks."""
import datetime as dt
import json,sys,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
FIXTURE_ROOT=Path(os.environ.get('AI_INDEX_DATA_ROOT',ROOT))
sys.path.insert(0,str(ROOT/'pipeline/builders'))
import spending as s
from openrouter_pricing import catalog_rates, daily_spending, load_prices, window_spending

def read(p):return json.JSONDecoder().raw_decode(p.read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]
class SpendingTests(unittest.TestCase):
 def setUp(self):
  self.core=read(FIXTURE_ROOT/'data/reference/core-v2.6.ts')
  self.prices=read(FIXTURE_ROOT/'data/derived/app/adoption-price-snapshot.ts')
  raw=FIXTURE_ROOT/'data/raw/openrouter'
  rankings=json.loads((raw/'rankings-daily.json').read_text(encoding='utf-8'))['data']
  self.daily=daily_spending(rankings,load_prices(raw/'prices'))
 def test_growth_factors_not_score_products(self):
  self.assertAlmostEqual(s.combine_growth(20,-10),8)
  self.assertAlmostEqual(s.combine_growth(20,-30),-16)
  self.assertIsNone(s.combine_growth(None,5))
 def test_ramp_identity_and_decomposition(self):
  data=s.observations(self.core,self.prices,self.daily);prior={r['month']:r for r in data}
  for row in data:
   for source in ('ramp','openrouter'):
    growth=row[source+'SpendingGrowth']
    if growth is not None:self.assertAlmostEqual(growth,row[source+'VolumeGrowth']+row[source+'PriceChange']+row[source+'Interaction'])
   if row['rampSpendingGrowth'] is not None:
    y,m=map(int,row['month'].split('-'));p=f'{y-1}-12' if m==1 else f'{y}-{m-1:02}'
    self.assertAlmostEqual(row['rampSpendingGrowth'],(row['rampSpendUsd']/prior[p]['rampSpendUsd']-1)*100)
 def test_two_ten_percent_signals_and_other_pillars_unchanged(self):
  core,_=s.integrate(self.core,self.prices,self.daily)
  for old,new in zip(self.core['months'],core['months']):
   adoption=[r for r in new['rows'] if r['pillar']=='Adoption']
   self.assertEqual(len(adoption),2);self.assertTrue(all(r['weight']==.1 for r in adoption))
   self.assertEqual([r for r in old['rows'] if r['pillar']!='Adoption'],[r for r in new['rows'] if r['pillar']!='Adoption'])
   self.assertAlmostEqual(sum(r['weight'] for r in new['rows']),1)
   if new['score'] is not None:self.assertAlmostEqual(new['score'],50+sum(r['contribution'] for r in new['rows']))
   if new['month']<'2026-01':self.assertIsNone(new['score'])
 def test_spending_uses_exact_token_window(self):
  row=next(r for r in s.observations(self.core,self.prices,self.daily) if r['month']=='2026-01')
  values=[v for date,v in self.daily.items() if row['windowStart']<=date<=row['windowEnd']]
  self.assertEqual(len(values),28)
  self.assertAlmostEqual(row['openrouterSpendProxy'],sum(v['spend'] for v in values))
  self.assertEqual(row['openrouterVolume'],sum(v['total'] for v in values))
  self.assertAlmostEqual(row['openrouterPriceCoverage'],sum(v['priced'] for v in values)/row['openrouterVolume'])
  self.assertAlmostEqual(row['openrouterPriceCoverage']+row['openrouterKnownFreeShare']+row['openrouterUnmatchedShare'],1)
  self.assertAlmostEqual(row['openrouterMatchedSpend']+row['openrouterImputedSpend'],row['openrouterSpendProxy'])
  self.assertAlmostEqual(row['openrouterPrice']*row['openrouterVolume']/1e6,row['openrouterSpendProxy'])
 def test_missing_rankings_day_withholds_proxy(self):
  del self.daily['2026-09-15']
  row=next(r for r in s.observations(self.core,self.prices,self.daily) if r['month']=='2026-09')
  self.assertIsNone(row['openrouterSpendProxy'])
 def test_missing_baseline_fails_closed(self):
  del self.daily['2026-06-15']
  with self.assertRaises(AssertionError):s.integrate(self.core,self.prices,self.daily)
 def test_future_prices_do_not_recalibrate(self):
  before,_=s.integrate(self.core,self.prices,self.daily)
  for date,row in self.daily.items():
   if date>'2026-06-30':row['spend']*=2
  after,_=s.integrate(self.core,self.prices,self.daily)
  self.assertEqual(before['metadata']['spendingBaseline'],after['metadata']['spendingBaseline'])

class OpenRouterPricingTests(unittest.TestCase):
 def test_catalog_preserves_route_variants_and_zero_prices(self):
  rates=catalog_rates([
   dict(id='lab/model',canonical_slug='lab/model-2026',pricing=dict(prompt='0.000001',completion='0.000004')),
   dict(id='lab/model:free',canonical_slug='lab/model-2026',pricing=dict(prompt='0',completion='0')),
   dict(id='lab/unknown',pricing=dict(prompt='-1',completion='-1')),
  ])
  self.assertEqual(rates,{'lab/model-2026':{'prompt':1e-6,'completion':4e-6},
                          'lab/model-2026:free':{'prompt':0,'completion':0}})

 def test_spending_uses_daily_catalog_rate_for_unresolved_volume(self):
  prices={
   '2026-01-02':{'lab/model':dict(prompt=1e-6,completion=3e-6)},
   '2026-01-20':{'lab/model':dict(prompt=2e-6,completion=6e-6)},
  }
  rows=[dict(date=f'2026-01-{day:02}',model_permaslug=slug,total_tokens=tokens)
        for day in range(1,29) for slug,tokens in [('lab/model',100),('other',50),('lab/preview:free',30)]]
  window=window_spending(daily_spending(rows,prices),dt.date(2026,1,28))
  self.assertAlmostEqual(window['openrouterSpendProxy'],150*(19*1.4e-6+9*2.8e-6))
  self.assertAlmostEqual(window['openrouterPriceCoverage'],100/180)
  self.assertAlmostEqual(window['openrouterKnownFreeShare'],30/180)
  self.assertAlmostEqual(window['openrouterImputedSpend'],50*(19*1.4e-6+9*2.8e-6))
  self.assertEqual(window['openrouterPriceVintages'],list(prices))
  self.assertTrue(window['openrouterRepricedHistory'])

 def test_unresolved_traffic_requires_a_same_day_catalog_match(self):
  rows=[dict(date='2026-01-01',model_permaslug='other',total_tokens=100)]
  day=daily_spending(rows,{'2026-01-01':{'lab/model':dict(prompt=1e-6,completion=3e-6)}})['2026-01-01']
  self.assertIsNone(day['spend'])

if __name__=='__main__':unittest.main()
