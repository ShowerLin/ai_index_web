"""Electricity research CLI: collect -> cached build -> forecast -> validate -> promote -> report."""
import argparse,datetime as dt,json,os,shutil
from pathlib import Path
from .acquire import ROOT,collect
from .build import Build,dump,sha
from .forecast import forecast
from .validate import validate
from .report import dashboard,report

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('command',choices=['collect','build','forecast','validate','promote','report'])
    p.add_argument('--config',default='data/reference/electricity/config.json');p.add_argument('--source',default='all');p.add_argument('--cached',action='store_true');p.add_argument('--candidate');p.add_argument('--include-forecasts',action='store_true');p.add_argument('--accepted',action='store_true')
    args=p.parse_args();config=json.loads((ROOT/args.config).read_text(encoding='utf-8'));accepted=ROOT/config['derived_path']
    candidate=Path(args.candidate).resolve() if args.candidate else ROOT/'data/runs'/config['raw_run']/'electricity/candidate'
    lock=ROOT/'data/.pipeline-lock';lock.mkdir()
    try:
        if args.command=='collect':
            run=dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%SZ');print(collect(run,args.source));return
        if args.command=='build':
            if not args.cached:raise ValueError('Use --cached; collection is a separate command')
            Build(config,candidate).build();print(candidate);return
        if args.command=='forecast':forecast(candidate);print('Scenario outputs staged');return
        if args.command=='validate':print(validate(candidate,args.include_forecasts)['status']);return
        if args.command=='promote':
            validate(candidate,True);dashboard(candidate)
            tmp=accepted.with_name('electricity-candidate-'+dt.datetime.now(dt.timezone.utc).strftime('%H%M%S%f'))
            shutil.copytree(candidate,tmp)
            for path in tmp.glob('*'):
                if path.is_file() and sha(path)!=sha(candidate/path.name):raise ValueError('Staged copy mismatch')
            backup=candidate.parent/'before'/dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')/'electricity'
            moved=False
            if accepted.exists():backup.parent.mkdir(parents=True);shutil.move(str(accepted),str(backup));moved=True
            try:tmp.rename(accepted)
            except Exception:
                if moved:shutil.move(str(backup),str(accepted))
                raise
            dump(accepted/'promotion_manifest.json',dict(schema_version=1,coverage_status='partial',candidate=str(candidate.relative_to(ROOT)),backup=str(backup.relative_to(ROOT)) if moved else None,
                output_hashes={p.name:sha(p) for p in accepted.glob('*') if p.is_file()}))
            print('Validated evidence promoted; research coverage partial');return
        if args.command=='report':print(report(accepted if args.accepted else candidate))
    finally:lock.rmdir()

if __name__=='__main__':main()
