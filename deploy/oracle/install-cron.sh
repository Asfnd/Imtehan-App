#!/usr/bin/env bash
# Install host crontab for imtehan (daily premium cleanup, weekly search ping).
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
chmod +x "$DIR/run-cron.sh"
CRON_MARK="# imtehan-oracle-cron"
TMP="$(mktemp)"
crontab -l 2>/dev/null | grep -v "$CRON_MARK" | grep -v "run-cron.sh" >"$TMP" || true
{
  cat "$TMP"
  echo "0 2 * * * $DIR/run-cron.sh deactivate $CRON_MARK"
  echo "0 6 * * 0 $DIR/run-cron.sh ping $CRON_MARK"
  # Clear soft-mode once Auth/DB is healthy (Free Nano recovery).
  echo "*/30 * * * * curl -sf --max-time 20 http://127.0.0.1/api/health/supabase >/dev/null 2>&1 $CRON_MARK"
} | crontab -
rm -f "$TMP"
echo "Crontab installed:"
crontab -l | grep imtehan || true
