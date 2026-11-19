"""Checks for the Adoption/Monetization split and preserved scoring definitions."""
import json
import math
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


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

    def test_reused_rate_volume_and_spending_scores(self):
        for month in self.core['months']:
            for row in month['rows']:
                if row['score'] is None:
                    continue
                if row['pillar'] == 'Adoption':
                    signal = math.log(row['level']) if row['ticker'].endswith('TOKEN_VOLUME') else row['level']
                elif row['ticker'] in {'RAMP_MATCHED_SPENDING', 'OPENROUTER_SPENDING_PROXY'}:
                    signal = row['growth']
                    self.assertAlmostEqual(signal, row['volumeGrowth'] + row['priceChange'] + row['interaction'])
                else:
                    continue
                expected = max(0, min(100, 50 + 15 * (signal - row['baselineMean']) / row['baselineStd']))
                self.assertAlmostEqual(row['score'], expected)
                self.assertLessEqual(row['observationDate'][:7], month['month'])

    def test_latest_sources_carry_and_score_reconciles(self):
        month = self.core['months'][-1]
        for row in month['rows']:
            if row['pillar'] in {'Adoption', 'Monetization'}:
                self.assertIsNotNone(row['score'])
        self.assertAlmostEqual(sum(r['effectiveWeight'] for r in month['rows']), 1)
        self.assertAlmostEqual(month['score'], 50 + sum(r['contribution'] for r in month['rows']))


if __name__ == '__main__':
    unittest.main()
