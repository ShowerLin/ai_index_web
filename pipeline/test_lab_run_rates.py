"""Regression checks for news-date lab signals and carry-forward provenance."""
import math
from copy import deepcopy
from datetime import datetime, timedelta
from unittest.mock import MagicMock, patch
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parent / 'builders'))
from monetization_core import run_rate_observations, run_rate_row, card_observations, integrate_monetization


def report(identifier, period, released, value, basis='Annualized run rate'):
    return {'Id': identifier, 'Company': 'OpenAI', 'Scope': 'Full company',
            'Date': period, 'Report date': released,
            'Annualized revenue (USD)': value, 'Annualized revenue type': basis}


class LabRunRateTests(unittest.TestCase):
    def setUp(self):
        self.records = [
            report('initial', '2023-01-01', '2023-01-10', 1e9),
            report('june', '2024-05-31', '2024-06-15', 3e9),
            report('october', '2024-08-31', '2024-10-18', 4e9),
            report('late-old-period', '2022-12-31', '2024-11-01', 100e9),
            report('future', '2025-03-01', '2025-04-15', 50e9),
        ]

    def test_report_date_and_carry_forward(self):
        rows = run_rate_observations('OpenAI', '2024-11', self.records)
        self.assertEqual(rows['2024-05']['level'], 1e9)
        self.assertEqual(rows['2024-06']['level'], 3e9)
        self.assertEqual(rows['2024-09']['level'], 3e9)
        self.assertEqual(rows['2024-10']['level'], 4e9)
        self.assertEqual(rows['2024-11']['sourceRecordId'], 'october')
        self.assertEqual(rows['2024-09']['observationDate'], '2024-06-15')
        self.assertTrue(rows['2024-09']['carriedForward'])
        self.assertFalse(rows['2024-10']['carriedForward'])
        self.assertAlmostEqual(rows['2024-06']['logRatio'], math.log(3))
        self.assertEqual(rows['2024-06']['logRatio'], rows['2024-09']['logRatio'])

    def test_arr_is_used_and_recognized_revenue_remains_separate(self):
        arr = report('arr', '2024-11-01', '2024-11-02', 1000e9, 'Annual recurring revenue (ARR)')
        recognized = report('recognized', '2024-11-01', '2024-11-03', 2000e9, None)
        original = run_rate_observations('OpenAI', '2024-11', self.records)
        self.assertEqual(original, run_rate_observations('OpenAI', '2024-11', self.records + [recognized]))
        updated = run_rate_observations('OpenAI', '2024-11', self.records + [arr, recognized])
        self.assertEqual(updated['2024-11']['sourceRecordId'], 'arr')
        self.assertEqual(updated['2024-11']['sourceBasis'], 'Annual recurring revenue (ARR)')

    def test_future_disclosure_cannot_change_earlier_months(self):
        before = run_rate_observations('OpenAI', '2024-11', self.records[:-1])
        self.assertEqual(before, run_rate_observations('OpenAI', '2024-11', self.records))

    def test_absolute_level_score_is_held_and_does_not_require_growth(self):
        rows = run_rate_observations('OpenAI', '2024-11', self.records)
        calibration = {'mean': math.log(2e9), 'std': 1, 'count': 5, 'start': '2024-01', 'end': '2026-06'}
        first = run_rate_row('OpenAI', .025, rows['2024-06'], calibration)
        carried = run_rate_row('OpenAI', .025, rows['2024-09'], calibration)
        self.assertEqual(first['score'], carried['score'])
        lower_growth = {**rows['2024-06'], 'growth': -50, 'logRatio': math.log(.5)}
        self.assertEqual(first['score'], run_rate_row('OpenAI', .025, lower_growth, calibration)['score'])
        initial = run_rate_row('OpenAI', .025, rows['2023-01'], calibration)
        self.assertIsNone(initial['growth'])
        self.assertIsNotNone(initial['score'])
        self.assertLess(initial['score'], first['score'])

    def test_card_spending_uses_latest_complete_window_in_current_month(self):
        end = datetime(2026, 11, 8)
        weeks = [(end - timedelta(weeks=i), 100 + i, 50 + i) for i in reversed(range(8))]
        book = MagicMock()
        book.__getitem__.return_value.iter_rows.return_value = weeks
        with patch('monetization_core.openpyxl.load_workbook', return_value=book):
            observations = card_observations()
        self.assertIn('2026-11', observations)
        self.assertEqual(observations['2026-11'][2], '2026-11-08')

    def test_latest_ramp_and_card_data_fill_current_heatmap(self):
        ramp = {'ticker': 'RAMP_MEDIAN_SPEND', 'pillar': 'Monetization', 'weight': .25,
                'score': 70, 'level': 20, 'growth': 8}
        other = [{'ticker': p, 'pillar': p, 'weight': .25, 'score': 50}
                 for p in ['Adoption', 'Hyperscalers', 'Infrastructure']]
        core = {'metadata': {'method': ''}, 'months': [
            {'month': '2026-10', 'rows': [deepcopy(ramp), *deepcopy(other)]},
            {'month': '2026-11', 'rows': [{**ramp, 'score': None, 'level': None, 'growth': None}, *deepcopy(other)]},
        ]}
        cards = {f'2026-{m:02}': (100, m, f'2026-{m:02}-28') for m in range(1, 7)}
        cards['2026-11'] = (110, 3, '2026-11-08')
        with patch('monetization_core.card_observations', return_value=cards), patch('monetization_core.records', return_value=self.records):
            integrate_monetization(core)
        rows = {r['ticker']: r for r in core['months'][-1]['rows']}
        self.assertEqual(rows['RAMP_MEDIAN_SPEND']['score'], 70)
        self.assertEqual(rows['RAMP_MEDIAN_SPEND']['observationDate'], '2026-10-31')
        self.assertTrue(rows['RAMP_MEDIAN_SPEND']['carriedForward'])
        self.assertEqual(rows['LAB_CARD_SPENDING']['observationDate'], '2026-11-08')
        self.assertIsNotNone(rows['LAB_CARD_SPENDING']['score'])
        self.assertFalse(rows['LAB_CARD_SPENDING']['carriedForward'])


if __name__ == '__main__':
    unittest.main()
