#!/usr/bin/env bash
# High-quality MCQ generation: sequential workers, verifier ON, sane cooldown.
# Prerequisites: Cursor CLI (`agent`) on PATH; .env.local with Supabase + working agent auth.
#
# Usage:
#   ./scripts/run_quality_mcq_round.sh
#   ./scripts/run_quality_mcq_round.sh scripts/pipeline/round21_quality_sprint.json

set -euo pipefail
cd "$(dirname "$0")/.."

export AGENT_SKIP_VERIFY="${AGENT_SKIP_VERIFY:-0}"
export AGENT_SEQUENTIAL="${AGENT_SEQUENTIAL:-1}"
# Slightly tighter yield gate (still top-up capped by AGENT_TOPUP_MAX).
export AGENT_MIN_YIELD_RATIO="${AGENT_MIN_YIELD_RATIO:-0.82}"
export AGENT_COOLDOWN_SEC="${AGENT_COOLDOWN_SEC:-18}"
export AGENT_MAX_WORKERS="${AGENT_MAX_WORKERS:-2}"
# If Cursor verifier returns malformed JSON, set AGENT_VERIFY_FAIL_OPEN=1 to fall back (less strict QA).

PLAN="${1:-scripts/pipeline/round21_quality_sprint.json}"

echo "→ Plan: $PLAN | verify_skip=$AGENT_SKIP_VERIFY sequential=$AGENT_SEQUENTIAL min_yield=$AGENT_MIN_YIELD_RATIO cooldown=${AGENT_COOLDOWN_SEC}s"
exec python3 scripts/agent_mcq_pipeline.py run --plan "$PLAN" --workers "${AGENT_MAX_WORKERS}"
