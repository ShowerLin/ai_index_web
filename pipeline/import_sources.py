"""Archive saved Excel workbooks and web responses in MySQL."""

import argparse
import hashlib
import io
import json
import os
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ENV = Path(os.environ.get("LOCALAPPDATA", Path.home() / ".config")) / "AI_Index" / ".env"

CREATE_IMPORTS = """
CREATE TABLE IF NOT EXISTS source_imports (
    import_id CHAR(64) CHARACTER SET ascii PRIMARY KEY,
    source_kind VARCHAR(16) NOT NULL,
    source_ref TEXT NOT NULL,
    content_sha256 CHAR(64) CHARACTER SET ascii NOT NULL,
    content_type VARCHAR(255) NOT NULL,
    payload LONGBLOB NOT NULL,
    imported_at_utc DATETIME(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
"""


def read_input(args):
    if args.url:
        import requests

        response = requests.get(args.url, timeout=(10, 60))
        response.raise_for_status()
        return "web", args.url, response.headers.get("Content-Type", "application/octet-stream"), response.content

    if args.excel:
        return read_excel(args.excel)
    return "web", args.source_url, "application/octet-stream", Path(args.web_file).expanduser().read_bytes()


def read_excel(filename):
    path = Path(filename).expanduser().resolve()
    payload = path.read_bytes()
    with zipfile.ZipFile(io.BytesIO(payload)) as workbook:
        workbook.getinfo("xl/workbook.xml")
    ref = path.relative_to(ROOT).as_posix() if path.is_relative_to(ROOT) else str(path)
    return "excel", ref, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", payload


def make_record(kind, ref, content_type, payload):
    checksum = hashlib.sha256(payload).hexdigest()
    identity = json.dumps([kind, ref, checksum]).encode()
    return hashlib.sha256(identity).hexdigest(), kind, ref, checksum, content_type, payload


def connect_database(env_file):
    import mysql.connector
    from dotenv import dotenv_values

    if not env_file.is_file():
        raise ValueError(f"Connection settings file is missing: {env_file}")
    config = dotenv_values(env_file, interpolate=False)
    required = ("MYSQL_HOST", "MYSQL_PORT", "MYSQL_DATABASE", "MYSQL_USER", "MYSQL_PASSWORD")
    missing = [key for key in required if not config.get(key)]
    if missing:
        raise ValueError("Fill in these settings: " + ", ".join(missing))
    ssl_options = {}
    if config.get("MYSQL_SSL_CA"):
        ssl_options = {
            "ssl_ca": config["MYSQL_SSL_CA"],
            "ssl_verify_cert": True,
            "ssl_verify_identity": True,
        }
    return mysql.connector.connect(
        host=config["MYSQL_HOST"], port=int(config["MYSQL_PORT"]),
        database=config["MYSQL_DATABASE"], user=config["MYSQL_USER"],
        password=config["MYSQL_PASSWORD"], connection_timeout=10, **ssl_options,
    )


def write_imports(env_file, records, *, create_table=True):
    with connect_database(env_file) as connection:
        with connection.cursor() as cursor:
            if create_table:
                cursor.execute(CREATE_IMPORTS)
            statement = """
                INSERT INTO source_imports
                    (import_id, source_kind, source_ref, content_sha256, content_type, payload, imported_at_utc)
                VALUES (%s, %s, %s, %s, %s, %s, UTC_TIMESTAMP(6))
                ON DUPLICATE KEY UPDATE import_id = import_id
            """
            for record in records:
                cursor.execute(statement, record)
        connection.commit()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    inputs = parser.add_mutually_exclusive_group(required=True)
    inputs.add_argument("--excel", help="Path to a saved .xlsx workbook")
    inputs.add_argument("--url", help="Public HTTP(S) URL to fetch")
    inputs.add_argument("--web-file", help="Path to a saved web response")
    parser.add_argument("--source-url", help="Original URL for --web-file")
    parser.add_argument("--env-file", type=Path, default=DEFAULT_ENV)
    parser.add_argument("--dry-run", action="store_true", help="Read the input without connecting to MySQL")
    args = parser.parse_args()
    if bool(args.web_file) != bool(args.source_url):
        parser.error("--web-file and --source-url must be supplied together")
    url = args.url or args.source_url
    if url:
        from urllib.parse import urlsplit

        parsed = urlsplit(url)
        if parsed.scheme not in {"http", "https"} or not parsed.hostname or parsed.username is not None:
            parser.error("Use a public HTTP(S) URL without embedded credentials")

    record = make_record(*read_input(args))
    import_id, kind, _, checksum, _, payload = record
    if not args.dry_run:
        write_imports(args.env_file.expanduser(), [record])
    print(json.dumps({
        "status": "dry-run" if args.dry_run else "stored",
        "import_id": import_id,
        "source_kind": kind,
        "content_sha256": checksum,
        "bytes": len(payload),
    }, indent=2))


if __name__ == "__main__":
    main()
