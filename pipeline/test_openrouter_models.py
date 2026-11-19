import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent/'builders'))
from openrouter_models import build_model_snapshot


class ModelSnapshotTests(unittest.TestCase):
    def payload(self):
        return dict(meta=[dict(as_of='2026-11-18T00:00:00Z')], data=[
            dict(date='2026-11-15', model_permaslug='lab/model', total_tokens='120'),
            dict(date='2026-11-15', model_permaslug='lab/model:free', total_tokens='30'),
            dict(date='2026-11-15', model_permaslug='other', total_tokens='50'),
            dict(date='2026-11-17', model_permaslug='lab/model', total_tokens='90')])

    def test_variants_and_other_reconcile_without_inventing_individual_counts(self):
        out = build_model_snapshot(self.payload(), 'saved-hash')
        self.assertEqual(out['models'], ['lab/model', 'lab/model:free'])
        self.assertEqual(out['daily'][0], dict(date='2026-11-15', total=200, values=[[0,120],[1,30]]))
        self.assertEqual(out['daily'][1]['values'], [[0,90]])
        self.assertEqual(out['metadata']['missingDays'], ['2026-11-16'])
        self.assertEqual(out['metadata']['sourceSha256'], 'saved-hash')

    def test_reject_duplicate_and_unsafe_token_counts(self):
        p = self.payload();p['data'].append(p['data'][0])
        with self.assertRaisesRegex(ValueError, 'Duplicate'):
            build_model_snapshot(p, '')
        p = self.payload();p['data'][0]['total_tokens'] = str(2**53)
        with self.assertRaisesRegex(ValueError, 'integer range'):
            build_model_snapshot(p, '')


if __name__ == '__main__':
    unittest.main()
