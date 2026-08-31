#!/bin/sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
export APP_KEY="${APP_KEY:-admin}"

exec "$ROOT_DIR/../../../../scripts/deploy-vite-app.sh" "$ROOT_DIR"
