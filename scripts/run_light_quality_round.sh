#!/usr/bin/env bash
# Lightweight, quality-heavy MCQ rounds (smaller batches, more checkpoints, extra metrics logs).
#
# Typical use: iterate fast on verifier + QA without tying up the DB with huge payloads.
#
# PLAN may list count=26 per topic — AGENT_CLAMP_BATCH_SIZE (or AGENT_LITE_MODE) trims it.
#
# Usage:
#   ./scripts/run_light_quality_round.sh
#   AGENT_CLAMP_BATCH_SIZE=22 ./scripts/run_light_quality_round.sh scripts/pipeline/round21_quality_sprint.json

set -euo pipefail
cd "$(dirname "$0")/.."

export AGENT_SKIP_VERIFY="${AGENT_SKIP_VERIFY:-0}"
export AGENT_SEQUENTIAL="${AGENT_SEQUENTIAL:-1}"
export AGENT_MAX_WORKERS="${AGENT_MAX_WORKERS:-1}"
export AGENT_COOLDOWN_SEC="${AGENT_COOLDOWN_SEC:-14}"

export AGENT_LITE_MODE="${AGENT_LITE_MODE:-1}"
# Cap each plan batch unless you unset LITE_MODE and leave CLAMP empty.
export AGENT_CLAMP_BATCH_SIZE="${AGENT_CLAMP_BATCH_SIZE:-18}"
export AGENT_MIN_YIELD_RATIO="${AGENT_MIN_YIELD_RATIO:-0.88}"
export AGENT_TOPUP_MAX="${AGENT_TOPUP_MAX:-4}"
export AGENT_QC_PULSE_EVERY="${AGENT_QC_PULSE_EVERY:-1}"

export AGENT_BATCH_METRICS="${AGENT_BATCH_METRICS:-1}"

PLAN="${1:-scripts/pipeline/round_light_11.json}"

echo "→ Light quality plan: $PLAN"
echo "  clamp=$AGENT_CLAMP_BATCH_SIZE lite=$AGENT_LITE_MODE metrics=$AGENT_BATCH_METRICS min_yield=$AGENT_MIN_YIELD_RATIO pulse_every=${AGENT_QC_PULSE_EVERY} cooldown=${AGENT_COOLDOWN_SEC}s"
exec python3 scripts/agent_mcq_pipeline.py run --plan "$PLAN" --workers "${AGENT_MAX_WORKERS}"
