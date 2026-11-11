import json
import unittest
from build_hyperscaler_charts import ROOT, build


class ChartTests(unittest.TestCase):
    def test_chart_points_reconcile_and_fcf_is_absent(self):
        source = ROOT / 'data/derived/hyperscalers/financials.json'
        if not source.exists():
            self.skipTest('Private normalized inputs not provisioned')
        data = json.loads(source.read_text(encoding='utf-8'))
        result = build(data)
        lookup = {(r['ticker'], r['periodEnd']): r for r in data['records']}
        for c in result['companies']:
            self.assertEqual(len(c['forecasts']), 4)
            self.assertAlmostEqual(c['forwardTotal'], sum(r['value'] for r in c['forecasts']))
            for p in c['actuals'] + c['forecasts']:
                raw = lookup[c['ticker'], p['periodEnd']]
                self.assertEqual(p['value'], -raw['values']['capex_raw']/1e9)
                self.assertEqual(p['fiscalPeriod'], raw['fiscalPeriod'])
                self.assertTrue(raw['availableAsOf'])
                self.assertEqual(p['status'] == 'estimate', p['periodEnd'] > data['asOf'])
                self.assertNotIn('headline_fcf', p)

    def test_missing_forecast_does_not_become_zero_or_fill_horizon(self):
        source = ROOT / 'data/derived/hyperscalers/financials.json'
        if not source.exists():
            self.skipTest('Private normalized inputs not provisioned')
        data = json.loads(source.read_text(encoding='utf-8'))
        data['records'] = [r for r in data['records'] if r['actualEstimate'] == 'actual']
        for c in build(data)['companies']:
            self.assertEqual(c['forecasts'], [])
            self.assertIsNone(c['forwardTotal'])


if __name__ == '__main__':
    unittest.main()
