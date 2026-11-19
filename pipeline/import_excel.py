"""Archive the saved AI Index workbooks in one MySQL transaction."""

import argparse
from pathlib import Path

from import_sources import DEFAULT_ENV, ROOT, make_record, read_excel, write_imports

WORKBOOKS = (
    "Indexlist.xlsx",
    "AI_Infra.xlsx",
    "AI_Monetization.xlsx",
    "AI_Benchmark.xlsx",
    "AI_Hyperscalers.xlsx",
    "AI_Aoption.xlsx",
    "AI data.xlsx",
)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workbooks", nargs="*", type=Path, help="Optional workbook paths. Defaults to the project workbook set.")
    parser.add_argument("--env-file", type=Path, default=DEFAULT_ENV)
    parser.add_argument("--existing-table", action="store_true", help="Use source_imports without attempting to create it")
    parser.add_argument("--dry-run", action="store_true", help="Check the saved workbooks without connecting to MySQL")
    args = parser.parse_args()

    paths = args.workbooks or [ROOT / name for name in WORKBOOKS]
    records = [make_record(*read_excel(path)) for path in paths]
    if not args.dry_run:
        write_imports(args.env_file.expanduser(), records, create_table=not args.existing_table)

    for _, _, ref, checksum, _, payload in records:
        print(f"{ref}  {len(payload):,} bytes  SHA-256 {checksum}")
    print(f"{'Validated' if args.dry_run else 'Imported'} {len(records)} workbook(s).")


if __name__ == "__main__":
    main()
