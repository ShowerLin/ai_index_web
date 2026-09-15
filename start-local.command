#!/bin/sh
set -eu
cd "$(dirname "$0")"
export PATH="/Users/linyu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
exec node ./node_modules/vinext/dist/cli.js dev --port 8000
