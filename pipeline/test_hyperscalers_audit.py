"""Check temporal boundaries and provenance for the saved-cache audit."""
import datetime as dt
import unittest

from audit_hyperscalers import ROOT, audit, temporal_class


class HyperscalerAuditTests(unittest.TestCase):
    def test_date_is_not_an_actual_flag(self):
        cutoff = dt.date(2026, 11, 3)
        self.assertEqual(temporal_class(dt.date(2026, 12, 31), dt.date(2026, 11, 2), cutoff),
                         'future_period_not_actual')
        self.assertEqual(temporal_class(dt.date(2026, 9, 30), None, cutoff), 'availability_unconfirmed')
        self.assertEqual(temporal_class(dt.date(2026, 9, 30), dt.date(2026, 11, 4), cutoff),
                         'availability_unconfirmed')
        self.assertEqual(temporal_class(dt.date(2026, 9, 30), dt.date(2026, 9, 1), cutoff),
                         'pre_period_end_revision_not_actual_evidence')
        self.assertEqual(temporal_class(cutoff, cutoff, cutoff), 'historical_candidate_status_unverified')

    def test_saved_workbook_preserves_native_periods_and_missingness(self):
        source = ROOT / 'AI_Hyperscalers.xlsx'
        if not source.exists():
            self.skipTest('Private source workbook is not provisioned')
        result = audit(source, dt.date(2026, 11, 3))
        records = result['records']
        self.assertTrue(records)
        self.assertFalse(any(r['productionEligible'] for r in records))
        self.assertTrue(all(r['firstPublicReleaseDate'] is None for r in records))
        self.assertEqual(len({(r['ticker'], r['fiscalPeriod']) for r in records}), len(records))
        for missing in result['missingCells']:
            record = next(r for r in records if r['ticker'] == missing['ticker']
                          and r['fiscalPeriod'] == missing['fiscalPeriod'])
            self.assertIsNone(record['values'][missing['metric']])
        for r in records:
            if r['periodEnd'] > result['auditAsOf']:
                self.assertEqual(r['temporalClass'], 'future_period_not_actual')
            self.assertEqual(r['actualEstimate'], 'unverified')


if __name__ == '__main__':
    unittest.main()
