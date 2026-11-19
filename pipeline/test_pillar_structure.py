"""Checks for the Adoption/Monetization split and preserved scoring definitions."""
import json
import os
from pathlib import Path
import unittest

ROOT = Path(os.environ.get('AI_INDEX_DATA_ROOT', Path(__file__).resolve().parents[1]))


def read(name):
    text = (ROOT / 'data/derived/app' / name).read_text(encoding='utf-8')
    return json.JSONDecoder().raw_decode(text.split('=', 1)[1].lstrip())[0]


class PillarStructureTests(unittest.TestCase):
    def setUp(self):
        self.core = read('core-contribution-snapshot.ts')

    def test_constituents_and_nominal_weights(self):
        rates = {'BTOS0700', 'BTOS2400', 'RAMP_PAID_ADOPTION'}
        volumes = {'OPENROUTER_TOKEN_VOLUME', 'RAMP_TOKEN_VOLUME'}
        business = {'RAMP_MEDIAN_SPEND', 'RAMP_MATCHED_SPENDING', 'OPENROUTER_SPENDING_PROXY'}
        for month in self.core['months']:
            rows = {r['ticker']: r for r in month['rows']}
            self.assertEqual(len(rows), len(month['rows']))
            self.assertEqual({r['ticker'] for r in month['rows'] if r['pillar'] == 'Adoption'}, rates | volumes)
            self.assertFalse(month['contextRows'])
            for ticker in rates:
                self.assertAlmostEqual(rows[ticker]['weight'], .125 / 3)
            for ticker in volumes:
                self.assertEqual(rows[ticker]['weight'], .0625)
            for ticker in business:
                self.assertEqual(rows[ticker]['pillar'], 'Monetization')
                self.assertEqual(rows[ticker]['weight'], .05)
            self.assertEqual(rows['LAB_CARD_SPENDING']['weight'], .05)
            self.assertAlmostEqual(sum(r['weight'] for r in month['rows'] if r['ticker'].endswith('_REVENUE_RUN_RATE')), .05)

    def test_reused_rate_and_spending_scores(self):
        for month in self.core['months']:
            for row in month['rows']:
                if row['score'] is None:
                    continue
                if row['pillar'] == 'Adoption' and not row['ticker'].endswith('TOKEN_VOLUME'):
                    signal = row['level']
                elif row['ticker'] in {'RAMP_MATCHED_SPENDING', 'OPENROUTER_SPENDING_PROXY'}:
                    signal = row['growth']
                    self.assertAlmostEqual(signal, row['volumeGrowth'] + row['priceChange'] + row['interaction'])
                else:
                    continue
                expected = max(0, min(100, 50 + 15 * (signal - row['baselineMean']) / row['baselineStd']))
                self.assertAlmostEqual(row['score'], expected)
                self.assertLessEqual(row['observationDate'][:7], month['month'])

    def test_token_scores_rank_three_month_average_growth(self):
        monthly = read('token-activity-snapshot.ts')['monthly']
        windows = {entry['month']: entry for entry in monthly}
        sources = {'OPENROUTER_TOKEN_VOLUME': 'openrouter', 'RAMP_TOKEN_VOLUME': 'ramp'}
        for ticker, source in sources.items():
            calibration = self.core['metadata']['tokenGrowthCalibration'][source]
            reference = calibration['growthPct']
            self.assertTrue(reference)
            self.assertEqual(calibration['end'], self.core['metadata']['baselineEnd'])
            observed_scores = []
            for month in self.core['months']:
                row = next(item for item in month['rows'] if item['ticker'] == ticker)
                if row['score'] is None:
                    self.assertIsNone(row['growth'])
                    continue
                source_month = row['observationDate'][:7]
                year, number = map(int, source_month.split('-'))
                offsets = [year * 12 + number - 1 - offset for offset in range(4)]
                values = [windows[f'{offset // 12:04}-{offset % 12 + 1:02}'][source]
                          for offset in offsets]
                growth = 100 * (sum(values[:3]) / sum(values[1:]) - 1)
                self.assertAlmostEqual(row['growth'], growth)
                ranks = [1 if value < row['growth'] else .5 if value == row['growth'] else 0
                         for value in reference]
                self.assertAlmostEqual(row['score'], 100 * sum(ranks) / len(reference))
                if source_month <= calibration['end'] and not row['carriedForward']:
                    observed_scores.append(row['growth'])
            self.assertEqual(sorted(observed_scores), reference)

    def test_latest_sources_carry_and_score_reconciles(self):
        month = self.core['months'][-1]
        for row in month['rows']:
            if row['pillar'] in {'Adoption', 'Monetization'}:
                self.assertIsNotNone(row['score'])
        self.assertAlmostEqual(sum(r['effectiveWeight'] for r in month['rows']), 1)
        self.assertAlmostEqual(month['score'], 50 + sum(r['contribution'] for r in month['rows']))


if __name__ == '__main__':
    unittest.main()
