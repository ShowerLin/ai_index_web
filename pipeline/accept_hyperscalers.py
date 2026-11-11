"""Build normalized hyperscaler inputs under the user's 3 November 2026 rules.

This prepares candidate-methodology data; it does not change index weights.
Use --audit-snapshot explicitly to reuse an audited cache while Excel locks the source.
"""
import argparse
from collections import Counter
import datetime as dt
import hashlib
import json
from pathlib import Path

from audit_hyperscalers import ROOT, audit

POLICY = {
    'id': 'hyperscalers-user-rules-2026-11-03-v2',
    'authority': 'Explicit user instructions in chat on 3 November 2026',
    'disclosureDate': 'Use saved Bloomberg disclosure/revision date as first public date',
    'actualEstimate': 'Estimate when period end is later than as-of date; actual otherwise',
    'fcf': 'Quarterly assumption withdrawn by user; exclude headline_fcf from calculation inputs pending replacement field',
    'fcfEvidence': 'Prior audit matched Amazon values to reported TTM FCF; retain original amounts only in excludedSourceMetrics',
    'revenue': 'Preserve original Bloomberg standardized headline revenue; no TAC adjustment',
    'periodBasis': 'Keep native fiscal periods and period ends; do not join issuers by row',
    'currency': 'Raw source amounts; no unverified conversion or cross-issuer aggregation',
}


def normalize(staged, as_of, input_mode):
    if dt.date.fromisoformat(staged['auditAsOf']) > as_of:
        raise ValueError('Cannot use an audit snapshot reviewed after the requested as-of date')
    records, seen = [], set()
    for original in staged['records']:
        key = (original['ticker'], original['fiscalPeriod'])
        if key in seen:
            raise ValueError(f'Duplicate company/fiscal period: {key}')
        seen.add(key)
        end = dt.date.fromisoformat(original['periodEnd'])
        disclosure = original['sourceRevisionDate']
        released = disclosure is not None and dt.date.fromisoformat(disclosure) <= as_of
        status = 'estimate' if end > as_of else 'actual'
        values = dict(original['values'])
        excluded_fcf = values.pop('headline_fcf')
        cells = dict(original['sourceCells'])
        excluded_fcf_cell = cells.pop('headline_fcf')
        records.append(dict(ticker=original['ticker'], fiscalPeriod=original['fiscalPeriod'],
                            periodEnd=end.isoformat(), firstPublicDate=disclosure,
                            firstPublicDateBasis='user_accepted_bloomberg_date',
                            actualEstimate=status, availableAsOf=released,
                            observedIndexEligible=status == 'actual' and released,
                            metricAvailable={k: v is not None for k, v in values.items()},
                            fcfDuration='unverified_issuer_specific_excluded',
                            excludedSourceMetrics={'headline_fcf': dict(value=excluded_fcf,
                                sourceCell=excluded_fcf_cell, calculationEligible=False,
                                reason='Quarterly assumption withdrawn; replacement field pending')},
                            currency=original['currency'], values=values, sourceCells=cells,
                            sourceRange=original['sourceRange']))
    return dict(schemaVersion=2, asOf=as_of.isoformat(), policy=POLICY,
                source=staged['source'], sourceSha256=staged['sourceSha256'],
                sourceSheet=staged['sourceSheet'], sourceAuditAsOf=staged['auditAsOf'],
                inputMode=input_mode, sourceRefreshed=False,
                status='accepted_under_user_rules_for_candidate_methodology',
                headlineIndexChanged=False,
                availabilityNote='Record eligibility requires a released actual; each metric must also be present. Current saved values and accepted dates do not reconstruct prior vintages.',
                summary=dict(records=len(records), statuses=dict(Counter(r['actualEstimate'] for r in records)),
                             observedEligibleRecords=sum(r['observedIndexEligible'] for r in records),
                             excludedFcfRecords=len(records),
                             missingMetricCells=sum(v is None for r in records for v in r['values'].values())),
                sourceQueries=staged['sourceQueries'], records=records)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--workbook', type=Path, default=ROOT / 'AI_Hyperscalers.xlsx')
    parser.add_argument('--audit-snapshot', type=Path)
    parser.add_argument('--as-of', type=dt.date.fromisoformat, required=True)
    parser.add_argument('--output-dir', type=Path, default=ROOT / 'data/derived/hyperscalers')
    args = parser.parse_args()
    if args.audit_snapshot:
        staged = json.loads(args.audit_snapshot.read_text(encoding='utf-8'))
        mode = 'explicit_reuse_of_audited_saved_cache'
    else:
        staged = audit(args.workbook, args.as_of)
        mode = 'saved_workbook_read'
    result = normalize(staged, args.as_of, mode)
    text = json.dumps(result, indent=2, allow_nan=False) + '\n'
    archive = args.output_dir / 'snapshots' / f"{args.as_of}-{result['sourceSha256'][:12]}-{POLICY['id']}.json"
    archive.parent.mkdir(parents=True, exist_ok=True)
    # Input mode records how this result was read; preserve any different result.
    if archive.exists() and archive.read_text(encoding='utf-8') != text:
        archive = archive.with_name(archive.stem + '-' + hashlib.sha256(text.encode()).hexdigest()[:12] + '.json')
    archive.write_text(text, encoding='utf-8')
    latest = args.output_dir / 'financials.json'
    temporary = latest.with_suffix('.tmp')
    temporary.write_text(text, encoding='utf-8')
    temporary.replace(latest)
    print(json.dumps(dict(output=str(latest), archive=str(archive), **result['summary']), indent=2))


if __name__ == '__main__':
    main()
