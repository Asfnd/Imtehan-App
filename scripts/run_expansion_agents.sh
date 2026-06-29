#!/usr/bin/env bash
# Low-CPU ISSB + CSS practice agent expansion (staging JSON → expand-mcqs-safe.ts).
#
# Usage:
#   ./scripts/run_expansion_agents.sh
#   ./scripts/run_expansion_agents.sh scripts/pipeline/expansion-round38.json

set -euo pipefail
cd "$(dirname "$0")/.."

export AGENT_LOW_CPU="${AGENT_LOW_CPU:-1}"
export AGENT_SKIP_VERIFY="${AGENT_SKIP_VERIFY:-0}"
export AGENT_LITE_MODE="${AGENT_LITE_MODE:-1}"
export AGENT_CLAMP_BATCH_SIZE="${AGENT_CLAMP_BATCH_SIZE:-12}"
export AGENT_COOLDOWN_SEC="${AGENT_COOLDOWN_SEC:-14}"
export AGENT_MIN_YIELD_RATIO="${AGENT_MIN_YIELD_RATIO:-0.75}"
export CURSOR_AGENT_MODEL="${CURSOR_AGENT_MODEL:-composer-2.5-fast}"

PLAN="${1:-scripts/pipeline/expansion-round38.json}"
mkdir -p logs data/expansion

echo "→ Expansion agents | plan=$PLAN | low_cpu=$AGENT_LOW_CPU skip_verify=$AGENT_SKIP_VERIFY clamp=$AGENT_CLAMP_BATCH_SIZE model=$CURSOR_AGENT_MODEL"
exec python3 scripts/agent_expansion_pipeline.py run --plan "$PLAN"
