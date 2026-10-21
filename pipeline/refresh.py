"""Scheduler-friendly whole-website data refresh; never publishes the website."""
import argparse
import datetime
import json
import os
from pathlib import Path
import subprocess
import sys
import time

import run as pipeline

SOURCES = tuple(pipeline.COLLECTORS)
SOURCE_IDS = {'ramp': 'ramp', 'openrouter': 'openrouter',
              'epoch': 'epoch-models-hardware-benchmarks',
              'pricing': 'epoch-pricing', 'swebench': 'swebench'}


def positive_seconds(value):
    seconds = int(value)
    if seconds < 1:
        raise argparse.ArgumentTypeError('timeout must be a positive number of seconds')
    return seconds


def configure(parser):
    parser.description = __doc__
    parser.add_argument('--sources', nargs='+', choices=SOURCES, default=list(SOURCES))
    parser.add_argument('--saved-only', action='store_true', help='Build saved inputs without collection')
    parser.add_argument('--web-root', type=Path, help='Existing local website checkout to sync after validation')
    parser.add_argument('--dry-run', action='store_true', help='Print plan without writes or network access')
    parser.add_argument('--attempts', type=int, choices=range(1, 4), default=2,
                        help='Collection attempts per source (1-3); builds are never retried')
    parser.add_argument('--source-timeout', type=positive_seconds, default=180,
                        help='Hard timeout in seconds for each collection attempt (default: 180)')
    parser.add_argument('--skip-openrouter', action='store_true',
                        help='Explicitly reuse saved OpenRouter data even when collecting other sources')


def plan(args):
    registry = json.loads((pipeline.ROOT / 'data/source_registry.json').read_text(encoding='utf-8'))
    selected = [] if args.saved_only else list(dict.fromkeys(args.sources))
    if args.skip_openrouter:
        selected = [s for s in selected if s != 'openrouter']
    automatic = set(SOURCE_IDS.values())
    return {
        'collect': selected,
        'reuseSavedSources': [SOURCE_IDS[s] for s in SOURCES if s not in selected],
        'manualOrSeparateWorkflow': [r['id'] for r in registry['sources'] if r['id'] not in automatic],
        'buildGroup': 'all',
        'syncWebRoot': str(args.web_root.expanduser().resolve()) if args.web_root else None,
        'publishesWebsite': False,
        'freshnessNote': 'Build time is not source freshness. Reviewed and licensed inputs retain their saved vintages.'}


def execute(args):
    details = plan(args)
    if args.dry_run:
        print(json.dumps(details, indent=2))
        return
    # Check required credentials and destination before any collector changes inputs.
    if 'openrouter' in details['collect'] and not os.environ.get('OPENROUTER_API_KEY'):
        raise ValueError('OPENROUTER_API_KEY is required. Supply it locally or explicitly use --skip-openrouter.')
    if args.web_root:
        web = Path(details['syncWebRoot'])
        if not (web / 'package.json').is_file() or not (web / 'app/page.tsx').is_file():
            raise ValueError('Not an existing AI Index website checkout')
    run_dir = pipeline.ROOT / 'data/runs' / ('refresh-' + pipeline.stamp())
    run_dir.mkdir(parents=True)
    report = dict(details, status='running', startedAtUtc=datetime.datetime.now(datetime.timezone.utc).isoformat(),
                  stages=[], websiteSynced=False)
    report_path = run_dir / 'result.json'
    pipeline.dump(report_path, report)
    print('Refresh started. OpenRouter: ' + ('collect' if 'openrouter' in details['collect'] else 'reuse saved data'), flush=True)
    print(f'Report: {report_path}', flush=True)
    try:
        for source in details['collect']:
            stage = {'stage': 'collect', 'source': source, 'status': 'running', 'attempts': 0}
            report['stages'].append(stage)
            for attempt in range(1, args.attempts + 1):
                stage['attempts'] = attempt
                pipeline.dump(report_path, report)
                print(f'Collecting {source} (attempt {attempt}/{args.attempts}; timeout {args.source_timeout}s)', flush=True)
                try:
                    pipeline.collect(source, timeout=args.source_timeout)
                    stage['status'] = 'success'
                    break
                except Exception as exc:
                    # Keep provider responses in the collector log; do not copy possible secrets to summaries.
                    stage['errorType'] = type(exc).__name__
                    pipeline.dump(report_path, report)
                    print(f'{source} failed: {type(exc).__name__}. See collection log above.', flush=True)
                    if attempt == args.attempts:
                        stage['status'] = 'failed'
                        raise
                    print(f'Retrying {source} in 2 seconds...', flush=True)
                    time.sleep(2)
            pipeline.dump(report_path, report)
        stage = {'stage': 'build-and-validate', 'status': 'running'}
        report['stages'].append(stage)
        pipeline.dump(report_path, report)
        print('Building and validating all page data...', flush=True)
        pipeline.build('all')
        stage['status'] = 'success'
        report['buildManifest'] = json.loads((pipeline.DERIVED / 'build-manifest.json').read_text(encoding='utf-8'))
        pipeline.dump(report_path, report)
        if args.web_root:
            stage = {'stage': 'website-sync', 'status': 'running'}
            report['stages'].append(stage)
            pipeline.dump(report_path, report)
            print('Syncing validated data to website...', flush=True)
            pipeline.sync(details['syncWebRoot'])
            stage['status'] = 'success'
            report['websiteSynced'] = True
        report['status'] = 'success'
    except (Exception, KeyboardInterrupt) as exc:
        report['status'] = 'failed'
        report['errorType'] = type(exc).__name__
        if report['stages'] and report['stages'][-1]['status'] == 'running':
            report['stages'][-1]['status'] = 'failed'
        raise
    finally:
        report['finishedAtUtc'] = datetime.datetime.now(datetime.timezone.utc).isoformat()
        pipeline.dump(report_path, report)
        print(json.dumps({'status': report['status'], 'report': str(report_path)}, indent=2), flush=True)


if __name__ == '__main__':
    # Delegate to the shared entrypoint so the same pipeline lock covers the entire run.
    raise SystemExit(subprocess.call([sys.executable, str(Path(__file__).with_name('run.py')),
                                      'refresh', *sys.argv[1:]],
                                     env=dict(os.environ, PYTHONUTF8='1')))
