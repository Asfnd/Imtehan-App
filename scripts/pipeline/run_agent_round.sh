#!/usr/bin/env bash
# Deploy Cursor-agent MCQ generation round (no Anthropic key).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
mkdir -p logs
export PYTHONUNBUFFERED=1
export CURSOR_AGENT_MODEL="${CURSOR_AGENT_MODEL:-composer-2-fast}"
PLAN="${1:-scripts/pipeline/round17.json}"
WORKERS="${2:-6}"
exec python3 -u scripts/agent_mcq_pipeline.py run --plan "$PLAN" --workers "$WORKERS" >> logs/agent_mcq_pipeline.log 2>&1
