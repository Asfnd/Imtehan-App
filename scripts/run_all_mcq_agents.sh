#!/usr/bin/env bash
# Run BOTH pipelines: core 11-table agents (light) + ISSB/CSS expansion agents.
# Sequential between pipelines to keep CPU/RAM light. Each agent uses nice -n 19.
#
# Usage:
#   ./scripts/run_all_mcq_agents.sh          # foreground
#   nohup ./scripts/run_all_mcq_agents.sh >> logs/all_agents.log 2>&1 &

set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p logs

log() { echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] $*"; }

CORE_PLAN="${CORE_PLAN:-}"
if [[ -z "$CORE_PLAN" ]]; then
  CORE_PLAN="$(python3 scripts/build_next_quality_round.py 2>/dev/null || true)"
fi
if [[ -z "$CORE_PLAN" || ! -f "$CORE_PLAN" ]]; then
  CORE_PLAN="scripts/pipeline/round37_quality_sprint.json"
fi

EXPANSION_PLAN="${EXPANSION_PLAN:-scripts/pipeline/expansion-round40.json}"

log "== ALL MCQ AGENTS (low CPU) =="
log "Core plan: $CORE_PLAN"
log "Expansion plan: $EXPANSION_PLAN"

log "→ Phase 1: core tables (light quality)"
./scripts/run_light_quality_round.sh "$CORE_PLAN" || log "WARN: core round exited non-zero"

log "→ Phase 2: ISSB + CSS expansion"
./scripts/run_expansion_agents.sh "$EXPANSION_PLAN" || log "WARN: expansion round exited non-zero"

log "== ALL AGENTS DONE =="
