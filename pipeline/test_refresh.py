"""Failure-boundary tests for unattended refresh (no network or real data writes)."""
import argparse
import contextlib
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import refresh


class RefreshTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / 'data/derived').mkdir(parents=True)
        (self.root / 'data/source_registry.json').write_text(json.dumps({'sources': [{'id': 'bloomberg'}]}))
        (self.root / 'data/derived/build-manifest.json').write_text('{"status":"success"}')
        self.web = self.root / 'web'
        (self.web / 'app').mkdir(parents=True)
        (self.web / 'package.json').write_text('{}')
        (self.web / 'app/page.tsx').write_text('')
        self.args = argparse.Namespace(sources=['ramp'], saved_only=False, skip_openrouter=False,
                                       web_root=self.web, dry_run=False, attempts=2, source_timeout=180)
        self.stack = contextlib.ExitStack()
        self.addCleanup(self.stack.close)
        self.stack.enter_context(patch.object(refresh.pipeline, 'ROOT', self.root))
        self.stack.enter_context(patch.object(refresh.pipeline, 'DERIVED', self.root / 'data/derived'))
        self.stack.enter_context(contextlib.redirect_stdout(io.StringIO()))

    def result(self):
        return json.loads(next((self.root / 'data/runs').glob('refresh-*/result.json')).read_text())

    def test_success_order(self):
        calls = []
        with patch.object(refresh.pipeline, 'collect', side_effect=lambda s, **kw: calls.append(s)), \
             patch.object(refresh.pipeline, 'build', side_effect=lambda g: calls.append(g)), \
             patch.object(refresh.pipeline, 'sync', side_effect=lambda w: calls.append('sync')):
            refresh.execute(self.args)
        self.assertEqual(calls, ['ramp', 'all', 'sync'])
        self.assertTrue(self.result()['websiteSynced'])

    def test_collection_failure_blocks_build_and_sync(self):
        with patch.object(refresh.pipeline, 'collect', side_effect=RuntimeError('failure')) as collect, \
             patch.object(refresh.pipeline, 'build') as build, patch.object(refresh.pipeline, 'sync') as sync, \
             patch.object(refresh.time, 'sleep'):
            with self.assertRaises(RuntimeError): refresh.execute(self.args)
        self.assertEqual(collect.call_count, 2)
        build.assert_not_called()
        sync.assert_not_called()
        self.assertEqual(self.result()['status'], 'failed')

    def test_build_failure_blocks_sync(self):
        self.args.saved_only = True
        with patch.object(refresh.pipeline, 'collect') as collect, \
             patch.object(refresh.pipeline, 'build', side_effect=RuntimeError('validation')), \
             patch.object(refresh.pipeline, 'sync') as sync:
            with self.assertRaises(RuntimeError): refresh.execute(self.args)
        collect.assert_not_called()
        sync.assert_not_called()

    def test_credentials_preflight(self):
        self.args.sources = ['openrouter']
        with patch.dict(refresh.os.environ, {}, clear=True), patch.object(refresh.pipeline, 'collect') as collect:
            with self.assertRaises(ValueError): refresh.execute(self.args)
        collect.assert_not_called()
        self.assertFalse((self.root / 'data/runs').exists())

    def test_dry_run_has_no_writes(self):
        self.args.dry_run = True
        refresh.execute(self.args)
        self.assertFalse((self.root / 'data/runs').exists())

    def test_transient_failure_recovers(self):
        with patch.object(refresh.pipeline, 'collect', side_effect=[RuntimeError(), None]) as collect, \
             patch.object(refresh.pipeline, 'build'), patch.object(refresh.pipeline, 'sync'), \
             patch.object(refresh.time, 'sleep'):
            refresh.execute(self.args)
        self.assertEqual(collect.call_count, 2)
        self.assertEqual(self.result()['status'], 'success')

    def test_running_stage_is_saved_before_network_call(self):
        def collect(source, **kwargs):
            report = self.result()
            self.assertEqual(report['stages'][0]['status'], 'running')
            self.assertEqual(report['stages'][0]['attempts'], 1)
            self.assertEqual(kwargs['timeout'], 180)
        with patch.object(refresh.pipeline, 'collect', side_effect=collect), \
             patch.object(refresh.pipeline, 'build'), patch.object(refresh.pipeline, 'sync'):
            refresh.execute(self.args)

    def test_collection_timeout_is_recorded_without_promotion(self):
        (self.root / 'Indexlist.xlsx').write_bytes(b'saved workbook')
        with patch.object(refresh.pipeline, 'invoke', side_effect=refresh.subprocess.TimeoutExpired('collector', 1)):
            with self.assertRaises(TimeoutError):
                refresh.pipeline.collect('ramp', timeout=1)
        result = json.loads(next((self.root / 'data/runs').glob('*/result.json')).read_text())
        self.assertEqual(result['status'], 'failed')
        self.assertEqual(result['errorType'], 'TimeoutExpired')
        self.assertEqual(result['promotedFiles'], [])
        self.assertFalse((self.root / 'data/raw/ramp').exists())

    def test_hard_deadline_terminates_a_stalled_child(self):
        script = self.root / 'stalled.py'
        script.write_text('import time; time.sleep(30)')
        started = refresh.time.monotonic()
        with patch.object(refresh.pipeline, 'BUILDERS', self.root):
            with self.assertRaises(refresh.subprocess.TimeoutExpired):
                refresh.pipeline.invoke('stalled.py', [], self.root, self.root / 'child.log', timeout=0.1)
        self.assertLess(refresh.time.monotonic() - started, 5)

    def test_timeout_must_be_positive(self):
        with self.assertRaises(argparse.ArgumentTypeError): refresh.positive_seconds('0')


if __name__ == '__main__': unittest.main()
