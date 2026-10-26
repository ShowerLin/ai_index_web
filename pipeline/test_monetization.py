"""Source mapping and missing-data checks for the Monetization extraction."""
import importlib.util
import sys
import unittest
from pathlib import Path

BUILDERS=Path(__file__).resolve().parent/'builders'
sys.path.insert(0,str(BUILDERS))
spec=importlib.util.spec_from_file_location('build_monetization',BUILDERS/'build-monetization.py')
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)

class MonetizationTests(unittest.TestCase):
    def test_source_mapping_and_missing_values(self):
        data=module.build()
        self.assertEqual(data['metadata']['coreWeight'],0)
        for company in data['publicCompanies']:
            history=company['history']
            self.assertEqual(len({r['date'] for r in history}),len(history))
            self.assertTrue(all(r['marketCapUsd'] is None for r in history if r['date']>'2026-10-22'))
            self.assertIsNone(company['forwardPS'])
            self.assertTrue(all(r['revenueStatus']==('Reported' if r['date']<='2026-06-30' else 'Estimate') for r in history if r['revenueUsd'] is not None))
        self.assertIsNone(module.number('#N/A'))
        self.assertIsNone(module.number(float('nan')))
        self.assertEqual(module.number(0),0)
    def test_private_valuation_filters_closed_deals(self):
        for lab in module.build()['privateLabs']:
            self.assertEqual(lab['latestClosedValuation']['Status'],'Closed')
            self.assertEqual(lab['latestAnnualizedRevenue']['Scope'],'Full company')
    def test_openai_correction_overrides_superseded_comparison(self):
        rows=module.records('Lab Revenue')
        self.assertFalse(any(r['Company']=='OpenAI' and r['Annualized revenue (USD)']==70000000000 for r in rows))
        latest=next(l for l in module.build()['privateLabs'] if l['company']=='OpenAI')['latestAnnualizedRevenue']
        self.assertEqual(latest['Annualized revenue (USD)'],50000000000)
        self.assertEqual(latest['Report date'],'2026-10-08')
    def test_researched_history_and_rumors_remain_distinct(self):
        data=module.build()
        for name in ('OpenAI','Anthropic'):
            rows=[r for r in data['valuationResearch'] if r['company']==name]
            self.assertGreaterEqual(len([r for r in rows if r['status']!='Rumored']),5)
            self.assertTrue(all(r['url'].startswith('https://') and r['basis'] for r in rows))
            self.assertTrue(all(r['date']<=r['reviewed'] for r in rows))
            self.assertTrue(any(r['status']=='Rumored' for r in rows))
            completed=next(l for l in data['privateLabs'] if l['company']==name)['latestClosedValuation']
            self.assertLess(completed['Valuation (post-money)'],max(r['valueUsd'] for r in rows if r['status']=='Rumored'))

if __name__=='__main__':unittest.main()
