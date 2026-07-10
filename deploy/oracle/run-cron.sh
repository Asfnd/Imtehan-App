#!/usr/bin/env bash
# Call imtehan cron API routes (replaces Vercel crons).
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
set -a
# shellcheck disable=SC1091
source "$DIR/.env"
set +a
BASE_URL="${NEXT_PUBLIC_APP_URL:-https://imtehan.com}"
if [ -z "${CRON_SECRET:-}" ]; then
  echo "CRON_SECRET missing in $DIR/.env" >&2
  exit 1
fi
case "${1:-}" in
  deactivate)
    curl -fsS -H "Authorization: Bearer ${CRON_SECRET}" \
      "${BASE_URL}/api/cron/deactivate-expired-premium"
    echo
    ;;
  ping)
    curl -fsS -H "Authorization: Bearer ${CRON_SECRET}" \
      "${BASE_URL}/api/cron/ping-search-engines"
    echo
    ;;
  *)
    echo "Usage: $0 {deactivate|ping}" >&2
    exit 1
    ;;
esac
