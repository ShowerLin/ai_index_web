import os
"""Nominal-spending methodology regression checks."""
import copy,importlib.util,json,math,sys,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
FIXTURE_ROOT=Path(os.environ.get('AI_INDEX_DATA_ROOT',ROOT))
sys.path.insert(0,str(ROOT/'pipeline/builders'))
import spending as s

def read(p):return json.JSONDecoder().raw_decode(p.read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]
class SpendingTests(unittest.TestCase):
 def setUp(self):
  self.core=read(FIXTURE_ROOT/'data/reference/core-v2.6.ts');self.prices=read(FIXTURE_ROOT/'data/derived/app/adoption-price-snapshot.ts');self.tokens=read(FIXTURE_ROOT/'data/derived/app/token-activity-snapshot.ts')
 def test_growth_factors_not_score_products(self):
  self.assertAlmostEqual(s.combine_growth(20,-10),8)
  self.assertAlmostEqual(s.combine_growth(20,-30),-16)
  self.assertIsNone(s.combine_growth(None,5))
 def test_ramp_identity_and_decomposition(self):
  data=s.observations(self.core,self.prices,self.tokens);prior={r['month']:r for r in data}
  for row in data:
   for source in ('ramp','openrouter'):
    growth=row[source+'SpendingGrowth']
    if growth is not None:self.assertAlmostEqual(growth,row[source+'VolumeGrowth']+row[source+'PriceChange']+row[source+'Interaction'])
   if row['rampSpendingGrowth'] is not None:
    y,m=map(int,row['month'].split('-'));p=f'{y-1}-12' if m==1 else f'{y}-{m-1:02}'
    self.assertAlmostEqual(row['rampSpendingGrowth'],(row['rampSpendUsd']/prior[p]['rampSpendUsd']-1)*100)
 def test_two_ten_percent_signals_and_other_pillars_unchanged(self):
  core,_=s.integrate(self.core,self.prices,self.tokens)
  for old,new in zip(self.core['months'],core['months']):
   adoption=[r for r in new['rows'] if r['pillar']=='Adoption']
   self.assertEqual(len(adoption),2);self.assertTrue(all(r['weight']==.1 for r in adoption))
   self.assertEqual([r for r in old['rows'] if r['pillar']!='Adoption'],[r for r in new['rows'] if r['pillar']!='Adoption'])
   self.assertAlmostEqual(sum(r['weight'] for r in new['rows']),1)
   if new['score'] is not None:self.assertAlmostEqual(new['score'],50+sum(r['contribution'] for r in new['rows']))
   if new['month']<'2026-01':self.assertIsNone(new['score'])
 def test_benchmark_uses_exact_token_window(self):
  row=next(r for r in s.observations(self.core,self.prices,self.tokens) if r['month']=='2026-01')
  values=[r['value'] for r in self.prices['siliconDaily'] if row['windowStart']<=r['date']<=row['windowEnd']]
  self.assertEqual(len(values),28);self.assertAlmostEqual(row['openrouterPrice'],sum(values)/28)
 def test_missing_price_day_withholds_proxy(self):
  self.prices['siliconDaily']=[r for r in self.prices['siliconDaily'] if r['date']!='2026-09-15']
  row=next(r for r in s.observations(self.core,self.prices,self.tokens) if r['month']=='2026-09')
  self.assertIsNone(row['openrouterSpendingGrowth'])
 def test_missing_baseline_fails_closed(self):
  self.prices['siliconDaily']=[r for r in self.prices['siliconDaily'] if r['date']!='2026-06-15']
  with self.assertRaises(AssertionError):s.integrate(self.core,self.prices,self.tokens)
 def test_future_prices_do_not_recalibrate(self):
  before,_=s.integrate(self.core,self.prices,self.tokens)
  for r in self.prices['siliconDaily']:
   if r['date']>'2026-06-30':r['value']*=2
  after,_=s.integrate(self.core,self.prices,self.tokens)
  self.assertEqual(before['metadata']['spendingBaseline'],after['metadata']['spendingBaseline'])
if __name__=='__main__':unittest.main()
