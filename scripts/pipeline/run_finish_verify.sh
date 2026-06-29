#!/usr/bin/env bash
# Finish all pending tier-1 verification (unverified + needs_tier2).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
mkdir -p logs
export PYTHONUNBUFFERED=1
export TIER1_CONCURRENCY="${TIER1_CONCURRENCY:-16}"
export TIER1_BATCH="${TIER1_BATCH:-100}"
export TIER1_PAUSE="${TIER1_PAUSE:-0.03}"
export TIER1_HIGH_CONF="${TIER1_HIGH_CONF:-0.82}"
export TIER1_MCQ_TIMEOUT="${TIER1_MCQ_TIMEOUT:-55}"
LOG="${TIER1_LOG:-$ROOT/logs/tier1_verify.log}"
echo "" >> "$LOG"
echo "======== FINISH RUN $(date -u '+%Y-%m-%dT%H:%M:%SZ') ========" >> "$LOG"
exec python3 -u -m scripts.pipeline.06_verify_sync >> "$LOG" 2>&1
