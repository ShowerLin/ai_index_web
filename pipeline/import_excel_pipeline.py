"""Archive the project workbooks and load the mapped CapEx observations."""

import argparse
import subprocess
import sys
from pathlib import Path

from import_sources import ROOT


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--env-file", type=Path, default=ROOT / ".env")
    parser.add_argument("--dry-run", action="store_true", help="Check workbook inputs without connecting to MySQL")
    parser.add_argument("--existing-tables", action="store_true", help="Use both existing MySQL tables without issuing CREATE")
    args = parser.parse_args()

    options = ["--env-file", str(args.env_file.expanduser().resolve())]
    if args.dry_run:
        options.append("--dry-run")
    elif not Path(options[1]).is_file():
        parser.error(f"Connection settings file is missing: {options[1]}")
    if args.existing_tables:
        options.append("--existing-table")

    for script in ("import_excel.py", "import_capex.py"):
        print(f"Running {script}", flush=True)
        result = subprocess.run(
            [sys.executable, str(Path(__file__).with_name(script)), *options],
            check=False,
        )
        if result.returncode:
            parser.exit(1, f"Pipeline stopped at {script}.\n")


if __name__ == "__main__":
    main()
