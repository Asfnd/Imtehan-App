#!/usr/bin/env bash
# Run tier-1 MCQ verification with live, line-buffered progress.
# Watch:  tail -f logs/tier1_verify.log
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
mkdir -p logs
export PYTHONUNBUFFERED=1
LOG="${TIER1_LOG:-$ROOT/logs/tier1_verify.log}"
echo "$(date -u '+%Y-%m-%d %H:%M:%S')Z — logging to $LOG" | tee -a "$LOG"
exec python3 -u -m scripts.pipeline.05_verify_tier1 "$@" 2>&1 | tee -a "$LOG"
