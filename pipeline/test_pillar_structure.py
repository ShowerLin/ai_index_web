"""Checks for the Adoption/Monetization split and preserved scoring definitions."""
import json
import os
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parent / 'builders'))
from pillar_structure import token_growth_score

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

    def test_token_scores_use_three_month_average_growth(self):
        monthly = read('token-activity-snapshot.ts')['monthly']
        windows = {entry['month']: entry for entry in monthly}
        sources = {'OPENROUTER_TOKEN_VOLUME': 'openrouter', 'RAMP_TOKEN_VOLUME': 'ramp'}
        scale = self.core['metadata']['tokenGrowthScalePct']
        for ticker, source in sources.items():
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
                self.assertAlmostEqual(row['score'], 50 + 50 * growth / (scale + abs(growth)))
                self.assertLessEqual(source_month, month['month'])

    def test_token_growth_above_fifty_retains_score_differences(self):
        self.assertEqual(token_growth_score(-50), 25)
        self.assertEqual(token_growth_score(0), 50)
        self.assertEqual(token_growth_score(50), 75)
        self.assertAlmostEqual(token_growth_score(100), 83 + 1 / 3)
        self.assertLess(token_growth_score(100), token_growth_score(200))
        self.assertLess(token_growth_score(200), 100)

    def test_latest_sources_carry_and_score_reconciles(self):
        month = self.core['months'][-1]
        for row in month['rows']:
            if row['pillar'] in {'Adoption', 'Monetization'}:
                self.assertIsNotNone(row['score'])
        self.assertAlmostEqual(sum(r['effectiveWeight'] for r in month['rows']), 1)
        self.assertAlmostEqual(month['score'], 50 + sum(r['contribution'] for r in month['rows']))


if __name__ == '__main__':
    unittest.main()
