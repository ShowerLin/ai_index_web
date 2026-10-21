import os
"""Independent invariants for v2.6 scoring and matching."""
import copy
import importlib.util
import json
import math
from pathlib import Path
import unittest

ROOT=Path(__file__).resolve().parents[1]
FIXTURE_ROOT=Path(os.environ.get('AI_INDEX_DATA_ROOT',ROOT))
spec=importlib.util.spec_from_file_location('affordability',ROOT/'pipeline/builders/affordability.py')
a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
def read(p):return json.JSONDecoder().raw_decode(p.read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]

class AffordabilityTests(unittest.TestCase):
    def setUp(self):
        self.core=read(FIXTURE_ROOT/'data/reference/core-v2.5.ts')
        self.prices=read(FIXTURE_ROOT/'data/derived/app/adoption-price-snapshot.ts')

    def test_lower_price_raises_score_and_bounds_hold(self):
        stats={'mean':0,'std':1}
        self.assertGreater(a.affordability_score(.5,stats),a.affordability_score(1,stats))
        self.assertLess(a.affordability_score(2,stats),a.affordability_score(1,stats))
        self.assertEqual(a.affordability_score(math.exp(-20),stats),100)
        self.assertEqual(a.affordability_score(math.exp(20),stats),0)
        self.assertIsNone(a.affordability_score(0,stats))

    def test_ratio_uses_same_four_week_matched_totals(self):
        rows=a.monthly_prices(self.prices,['2026-06'])
        row=rows[0]
        weeks=[r for r in self.prices['rampWeekly'] if row['windowStart']<=r['end']<=row['windowEnd']]
        self.assertEqual(len(weeks),4)
        self.assertAlmostEqual(row['ramp'],sum(w['spendUsd'] for w in weeks)/sum(w['tokens'] for w in weeks)*1e6)
        self.assertAlmostEqual(row['ramp']*row['rampMatchedTokens']/1e6,row['rampSpendUsd'])

    def test_one_low_coverage_week_withholds_month(self):
        row=a.monthly_prices(self.prices,['2026-06'])[0]
        week=next(r for r in self.prices['rampWeekly'] if r['end']==row['windowEnd'])
        week['coverage']=.94999
        revised=a.monthly_prices(self.prices,['2026-06'])[0]
        self.assertIsNone(revised['ramp'])
        self.assertIsNone(revised['rampSpendUsd'])

    def test_weights_reconcile_and_other_pillars_unchanged(self):
        revised,_=a.integrate(self.core,self.prices)
        for old,new in zip(self.core['months'],revised['months']):
            adoption=[r for r in new['rows'] if r['pillar']=='Adoption']
            self.assertEqual(len(adoption),4)
            self.assertTrue(all(r['weight']==.05 for r in adoption))
            self.assertEqual([r for r in old['rows'] if r['pillar']!='Adoption'],[r for r in new['rows'] if r['pillar']!='Adoption'])
            self.assertAlmostEqual(sum(r['weight'] for r in new['rows']),1)
            if new['score'] is not None:
                self.assertAlmostEqual(new['score'],50+sum(r['contribution'] for r in new['rows']))
            if new['month']<'2025-12':self.assertIsNone(new['score'])

    def test_later_prices_do_not_recalibrate_history(self):
        before,_=a.integrate(self.core,self.prices)
        changed=copy.deepcopy(self.prices)
        for r in changed['siliconMonthly']:
            if r['month']>'2026-06':r['value']*=10
        after,_=a.integrate(self.core,changed)
        self.assertEqual(before['metadata']['affordabilityBaseline'],after['metadata']['affordabilityBaseline'])
        self.assertEqual([r for r in before['months'] if r['month']<='2026-06'],[r for r in after['months'] if r['month']<='2026-06'])

    def test_missing_benchmark_does_not_redistribute_weight(self):
        next(r for r in self.prices['siliconMonthly'] if r['month']=='2026-09')['complete']=False
        revised,_=a.integrate(self.core,self.prices)
        month=next(r for r in revised['months'] if r['month']=='2026-09')
        self.assertIsNone(next(r for r in month['rows'] if r['ticker']=='SDLLMTK_AFFORDABILITY')['score'])
        self.assertIsNone(month['score'])
        self.assertAlmostEqual(sum(r['weight'] for r in month['rows']),1)

    def test_missing_calibration_month_fails_closed(self):
        next(r for r in self.prices['siliconMonthly'] if r['month']=='2026-06')['complete']=False
        with self.assertRaises(AssertionError):a.integrate(self.core,self.prices)

if __name__=='__main__':unittest.main()
