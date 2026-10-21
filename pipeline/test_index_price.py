"""Regression checks for workbook schema drift, historical revisions and fixed calibration."""
import copy
import datetime as dt
import json
import math
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parent / 'builders'))
from index_price import load, parse, shift, signal
from paths import DATA_ROOT, BUILD_ROOT


def read(path):
    return json.JSONDecoder().raw_decode(path.read_text(encoding='utf-8').split(' = ', 1)[1].lstrip())[0]


class ParserTests(unittest.TestCase):
    config = {'headerAliases': {'TSMC Revenue': 'TSMC Monthly Revenue'}}

    def test_alias_missing_trailing_cells_and_source_errors(self):
        headers, obs = parse({'values': [['Date', 'TSMC Revenue', 'GPU'], ['DATES'], [45565, 123, '#N/A'], [45596, 234]]}, self.config)
        self.assertEqual(headers[0], 'TSMC Monthly Revenue')
        self.assertEqual(obs['2024-09']['TSMC Monthly Revenue'], 123)
        self.assertIsNone(obs['2024-09']['GPU'])
        self.assertIsNone(obs['2024-10']['GPU'])

    def test_duplicate_month_and_ambiguous_alias_fail(self):
        with self.assertRaisesRegex(ValueError, 'Duplicate index month'):
            parse({'values': [['Date', 'X'], [], [45565, 1], [45565, 2]]}, self.config)
        with self.assertRaisesRegex(ValueError, 'Duplicate index headers'):
            parse({'values': [['Date', 'TSMC Revenue', 'TSMC Monthly Revenue']]}, self.config)

    def test_historical_revisions_change_later_ttm_and_gaps_are_not_zero(self):
        obs = {shift('2024-01', i): {'X': 100.0} for i in range(24)}
        self.assertEqual(signal(obs, '2025-12', 'X'), 0)
        revised = copy.deepcopy(obs)
        revised['2025-01']['X'] = 112.0
        self.assertAlmostEqual(signal(revised, '2025-12', 'X'), 1)
        revised['2024-01']['X'] = None
        self.assertIsNone(signal(revised, '2025-12', 'X'))


class PublishedInputTests(unittest.TestCase):
    def test_current_values_and_transforms_reach_every_macro_core_row(self):
        config, _, obs, workbook_hash, _ = load()
        core = read(BUILD_ROOT / 'app/core-contribution-snapshot.ts')
        baseline = read(DATA_ROOT / 'data/reference/core-v2.1.ts')
        calibration = {r['ticker']: r for r in baseline['months'][-1]['rows']}
        self.assertEqual(core['metadata']['observationWorkbookSha256'], workbook_hash)
        self.assertEqual(core['months'][-1]['month'], config['completedMonthThrough'])
        for month in core['months']:
            for row in month['rows']:
                if row['pillar'] in ('Demand', 'Hyperscaler CapEx') or row['ticker'].startswith('RAMP'):
                    continue
                field = row['ticker'] + ' Index'
                self.assertEqual(row['level'], obs[month['month']].get(field), (month['month'], field))
                expected = row['level'] if row['pillar'] == 'Adoption' else signal(obs, month['month'], field)
                self.assertEqual(row['growth'], expected, (month['month'], field))
                for key in ('baselineMean', 'baselineStd', 'baselineCount'):
                    self.assertEqual(row[key], calibration[row['ticker']][key])
                if expected is not None:
                    score = max(0, min(100, 50 + 15 * (expected - row['baselineMean']) / row['baselineStd']))
                    self.assertAlmostEqual(row['score'], score)

    def test_context_weights_partial_rows_and_missing_tsmc_remain_explicit(self):
        source = read(BUILD_ROOT / 'app/index-price-snapshot.ts')
        self.assertEqual(len(source['series']), 19)
        self.assertTrue(any(r['partial'] for s in source['series'] for r in s['cells']))
        for series in source['series']:
            if series['pillar'] == 'Context':
                self.assertEqual(series['coreWeight'], 0)
        core = read(BUILD_ROOT / 'app/core-contribution-snapshot.ts')
        self.assertIn('2024-07', core['metadata']['tsmcBackfillMonths'])
        tsmc = next(s for s in source['series'] if s['field'] == 'TSMC Monthly Revenue')
        self.assertIsNone(next(r for r in tsmc['cells'] if r['month'] == '2024-07')['level'])
        june = next(m for m in core['months'] if m['month'] == '2026-06')
        self.assertIsNotNone(june['score'])
        for month in core['months']:
            if month['month'] > '2026-06':
                self.assertIsNone(month['score'])
                self.assertIsNone(next(r for r in month['rows'] if r['pillar'] == 'Hyperscaler CapEx')['score'])


if __name__ == '__main__':
    unittest.main()
