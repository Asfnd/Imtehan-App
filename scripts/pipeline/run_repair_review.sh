#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
mkdir -p logs
export PYTHONUNBUFFERED=1
echo "" >> logs/repair_review.log
echo "======== $(date -u '+%Y-%m-%dT%H:%M:%SZ') ========" >> logs/repair_review.log
export REPAIR_ENGINE="${REPAIR_ENGINE:-cursor}"
export CURSOR_REPAIR_MODEL="${CURSOR_REPAIR_MODEL:-composer-2-fast}"
exec python3 -u -m scripts.pipeline.09_repair_needs_review \
  --engine cursor --batch 12 --timeout 120 "$@" >> logs/repair_review.log 2>&1
