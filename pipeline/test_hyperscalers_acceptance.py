import datetime as dt
import json
import unittest

from accept_hyperscalers import ROOT, normalize


class AcceptanceTests(unittest.TestCase):
    def setUp(self):
        self.staged = dict(auditAsOf='2026-11-03', source='test.xlsx', sourceSha256='test',
                           sourceSheet='Value', sourceQueries=[], records=[dict(ticker='MSFT',
                           fiscalPeriod='2027 Q1', periodEnd='2026-09-30',
                           sourceRevisionDate='2026-11-03', currency=None,
                           values=dict(headline_fcf=-5, headline_revenue=123, net_debt=None),
                           sourceCells=dict(headline_fcf='G3', headline_revenue='F3', net_debt='H3'),
                           sourceRange='A3:J3')])

    def build(self):
        return normalize(self.staged, dt.date(2026, 11, 3), 'test')['records'][0]

    def test_cutoff_and_release_availability_are_separate(self):
        self.assertTrue(self.build()['observedIndexEligible'])
        self.staged['records'][0]['periodEnd'] = '2026-11-03'
        self.assertEqual(self.build()['actualEstimate'], 'actual')
        self.staged['records'][0]['periodEnd'] = '2026-11-04'
        self.assertEqual(self.build()['actualEstimate'], 'estimate')
        self.assertFalse(self.build()['observedIndexEligible'])
        self.staged['records'][0]['periodEnd'] = '2026-09-30'
        self.staged['records'][0]['sourceRevisionDate'] = '2026-11-04'
        self.assertEqual(self.build()['actualEstimate'], 'actual')
        self.assertFalse(self.build()['observedIndexEligible'])
        self.staged['records'][0]['sourceRevisionDate'] = None
        self.assertFalse(self.build()['observedIndexEligible'])

    def test_withdrawn_fcf_is_excluded_and_other_values_preserved(self):
        record = self.build()
        self.assertNotIn('fcf_quarterly_assumed', record['values'])
        self.assertNotIn('headline_fcf', record['values'])
        self.assertNotIn('headline_fcf', record['metricAvailable'])
        excluded = record['excludedSourceMetrics']['headline_fcf']
        self.assertEqual(excluded['value'], -5)
        self.assertEqual(excluded['sourceCell'], 'G3')
        self.assertFalse(excluded['calculationEligible'])
        self.assertEqual(record['values']['headline_revenue'], 123)
        self.assertIsNone(record['values']['net_debt'])
        self.assertFalse(record['metricAvailable']['net_debt'])
        self.assertEqual(record['fcfDuration'], 'unverified_issuer_specific_excluded')

    def test_duplicates_and_future_audit_rejected(self):
        self.staged['records'] *= 2
        with self.assertRaises(ValueError):
            self.build()
        self.staged['records'] = []
        with self.assertRaises(ValueError):
            normalize(self.staged, dt.date(2026, 11, 2), 'test')

    def test_saved_audit_reconciles_without_workbook_access(self):
        path = ROOT / 'data/research/hyperscalers/audits/2026-11-03-7535c5aca423.json'
        if not path.exists():
            self.skipTest('Private audit snapshot not provisioned')
        original = json.loads(path.read_text(encoding='utf-8'))
        result = normalize(original, dt.date(2026, 11, 3), 'test')
        self.assertEqual(result['summary']['records'], 140)
        self.assertEqual(result['summary']['statuses'], {'actual': 59, 'estimate': 81})
        self.assertEqual(result['summary']['missingMetricCells'], 25)
        for before, after in zip(original['records'], result['records']):
            values = dict(after['values'])
            values['headline_fcf'] = after['excludedSourceMetrics']['headline_fcf']['value']
            self.assertEqual(before['values'], values)


if __name__ == '__main__':
    unittest.main()
