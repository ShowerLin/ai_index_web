"""Check MySQL login and source_imports read access."""

import argparse
from pathlib import Path

import mysql.connector
from dotenv import dotenv_values


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--env-file", type=Path, default=Path(".env"))
    args = parser.parse_args()

    config = dotenv_values(args.env_file, interpolate=False)
    keys = ("host", "port", "database", "user", "password")
    missing = [f"MYSQL_{key.upper()}" for key in keys if not config.get(f"MYSQL_{key.upper()}")]
    if missing:
        parser.error("Missing settings: " + ", ".join(missing))
    options = {key: config[f"MYSQL_{key.upper()}"] for key in keys}
    options["port"] = int(options["port"])
    if config.get("MYSQL_SSL_CA"):
        options.update(ssl_ca=config["MYSQL_SSL_CA"], ssl_verify_cert=True, ssl_verify_identity=True)

    stage = "Login"
    try:
        with mysql.connector.connect(**options, connection_timeout=8) as connection:
            with connection.cursor() as cursor:
                stage = "Session check"
                cursor.execute("SELECT USER(), CURRENT_USER(), DATABASE()")
                client, account, database = cursor.fetchone()
                print(f"Connected as {client}; matched account {account}; database {database}")
                stage = "Read source_imports"
                cursor.execute("SELECT 1 FROM source_imports LIMIT 1")
                print("Read succeeded. " + ("Table has rows." if cursor.fetchone() else "Table is empty."))
    except mysql.connector.Error as error:
        parser.exit(1, f"{stage} failed. {error}\n")


if __name__ == "__main__":
    main()
