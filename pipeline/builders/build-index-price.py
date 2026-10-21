"""Publish all monthly workbook fields, with source and partial-period qualifications."""
import json
from index_price import load, shift
from paths import BUILD_ROOT

config, headers, obs, workbook_hash, inspection_hash = load()
core = {
    'BTOS0700 Index': ('Context', 'Current business AI use', 0),
    'BTOS2400 Index': ('Context', 'Expected business AI use', 0),
    'KOTCDRAM Index': ('Demand', 'South Korea DRAM exports', .05),
    'KOTCNAND Index': ('Demand', 'South Korea NAND exports', .05),
    'TSMC Monthly Revenue': ('Demand', 'TSMC monthly revenue', .05),
    'DGNOCOEQ Index': ('Investment', 'Communication equipment orders', .04),
    'DGNOITIN Index': ('Investment', 'Information technology orders', .04),
    'DGNOTGOP Index': ('Investment', 'Power equipment orders', .04),
    'CNSTPRDA Index': ('Investment', 'Data-center construction', .04),
    'IPNEHITC Index': ('Investment', 'High-tech industry activity', .04),
    'USIMTELE Index': ('Imports', 'Telecom equipment imports', .2 / 3),
    'USIMSEMI Index': ('Imports', 'Semiconductor imports', .2 / 3),
    'USIMCOMP Index': ('Imports', 'Computer equipment imports', .2 / 3),
}
context = {'SDLLMTK Index': 'LLM price per million tokens', 'ISPPDR48 Index': 'DDR5 spot price index', 'ISPPN512 Index': 'TLC 512Gb spot price index', 'SDH100RT Index': 'Silicon H100 rental price index', 'SDB200RT Index': 'Silicon B200 rental price index (non-hyperscale)', 'KOEISEU Index': 'South Korea semiconductor export price (USD)'}
series = []
for field in headers:
    pillar, name, weight = core.get(field, ('Context', context.get(field, field), 0))
    cells = []
    for month, row in obs.items():
        value = row[field]
        previous = obs.get(shift(month, -1), {}).get(field)
        prior_year = obs.get(shift(month, -12), {}).get(field)
        cells.append(dict(month=month, level=value, yoy=(value / prior_year - 1) * 100 if value is not None and prior_year is not None and prior_year > 0 else None,
                          unchangedFromPrevious=value is not None and previous is not None and value == previous,
                          partial=month > config['completedMonthThrough']))
    series.append(dict(field=field, name=name, pillar=pillar, coreWeight=weight, unit='Source-native; verify Bloomberg field units before cross-series comparisons', cells=cells))
payload = dict(metadata=dict(source='Indexlist.xlsx', sheet='Index Price Value', workbookSha256=workbook_hash, inspectionSha256=inspection_hash,
    reviewedAt=config['reviewedAt'], completedMonthThrough=config['completedMonthThrough'], gridThrough=max(obs),
    headerAliases=config['headerAliases'], labelsSource='Saved Indexlist descriptions; field units require independent verification', limitations=config['note'], sourceRetrievedAt=None), series=series)
(BUILD_ROOT / 'app/index-price-snapshot.ts').write_text('export const indexPriceSnapshot = ' + json.dumps(payload, indent=2) + ' as const;\n', encoding='utf-8')
print(f'Published {len(series)} monthly fields; completed-row cutoff {config["completedMonthThrough"]}; partial rows retained as context.')
