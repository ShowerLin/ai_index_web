"""Restore archived commentary after checking for intervening edits. Defaults to preview."""
import argparse
import json
from pathlib import Path
from import_sources import connect_database

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--import-id', required=True)
parser.add_argument('--web-root', type=Path, required=True)
parser.add_argument('--env-file', type=Path, default=Path('.env'))
parser.add_argument('--apply', action='store_true')
args = parser.parse_args()
with connect_database(args.env_file) as connection:
    with connection.cursor() as cursor:
        cursor.execute('SELECT payload FROM source_imports WHERE import_id=%s AND source_kind=%s', (args.import_id, 'commentary'))
        record = cursor.fetchone()
        if not record:
            parser.error('Commentary revision was not found.')
revision = json.loads(record[0])
changes = []
for name, values in revision['files'].items():
    target = (args.web_root / name).resolve()
    if not target.is_relative_to(args.web_root.resolve()):
        parser.error('Invalid archived path.')
    current = target.read_text() if target.exists() else None
    if current == values['before']:
        continue
    if current != values['after']:
        parser.error(f'Later edits exist in {name}. Reconcile before restoring.')
    changes.append((target, values['before']))
print(f'{len(changes)} files ready to restore.')
if args.apply:
    for target, previous in changes:
        if previous is None:
            target.unlink()
        else:
            temporary = target.with_suffix(target.suffix + '.restore')
            temporary.write_text(previous)
            temporary.replace(target)
    print('Commentary restored.')
