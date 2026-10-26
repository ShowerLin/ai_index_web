"""Regression checks for the Supply methodology and forecast separation."""
import copy
import json
import math
from pathlib import Path
import sys
import unittest
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'pipeline/builders'))
from supply import integrate

def load(path):return json.JSONDecoder().raw_decode(path.read_text(encoding='utf-8').split(' = ',1)[1].lstrip())[0]

class SupplyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.old=load(ROOT/'data/reference/core-v2.7.ts')
        cls.prices=load(ROOT/'data/derived/app/index-price-snapshot.ts')
        cls.new=integrate(cls.old,cls.prices)

    def test_unchanged_other_pillars_and_reconciliation(self):
        for old,new in zip(self.old['months'],self.new['months']):
            self.assertEqual([r for r in old['rows'] if r['pillar']!='Hyperscaler CapEx'],[r for r in new['rows'] if r['pillar']!='Supply'])
            self.assertAlmostEqual(sum(r['weight'] for r in new['rows']),1)
            supply=[r for r in new['rows'] if r['pillar']=='Supply']
            self.assertEqual([r['weight'] for r in supply],[.1,.05,.05])
            if new['score'] is not None:
                self.assertAlmostEqual(new['score'],50+sum(r['contribution'] for r in new['rows']))

    def test_missing_and_partial_prices_withhold(self):
        prices=copy.deepcopy(self.prices)
        field=next(s for s in prices['series'] if s['field']=='SDH100RT Index')
        next(c for c in field['cells'] if c['month']=='2025-07')['level']=None
        new=integrate(self.old,prices)
        m=next(m for m in new['months'] if m['month']=='2026-07')
        self.assertIsNone(m['score'])
        self.assertIsNone(next(r for r in m['rows'] if r['ticker']=='SDH100RT')['score'])
        ddr=next(s for s in prices['series'] if s['field']=='ISPPDR48 Index')
        next(c for c in ddr['cells'] if c['month']=='2026-07')['partial']=True
        partial=next(m for m in integrate(self.old,prices)['months'] if m['month']=='2026-07')
        self.assertIsNone(next(r for r in partial['rows'] if r['ticker']=='ISPPDR48')['level'])

    def test_post_baseline_changes_do_not_recalibrate(self):
        prices=copy.deepcopy(self.prices)
        for series in prices['series']:
            for c in series['cells']:
                if c['month']>'2026-06' and c['level'] is not None:c['level']*=2
        self.assertEqual(self.new['metadata']['supplyBaseline'],integrate(self.old,prices)['metadata']['supplyBaseline'])

    def test_forecasts_stay_out_of_score_and_projection_identity(self):
        self.assertEqual({r['ticker'] for r in self.new['months'][-1]['rows'] if r['pillar']=='Supply'},{'HYPERSCALER_TOTAL','ISPPDR48','SDH100RT'})
        p=load(ROOT/'data/derived/app/core-projection-snapshot.ts'); anchor=next(m for m in self.new['months'] if m['month']==p['metadata']['anchorMonth'])
        cap=next(r for r in anchor['rows'] if r['ticker']=='HYPERSCALER_TOTAL')
        for q in p['quarters']:self.assertAlmostEqual(q['composite'],anchor['score']+.1*(q['capexScore']-cap['score']))

if __name__=='__main__':unittest.main()
