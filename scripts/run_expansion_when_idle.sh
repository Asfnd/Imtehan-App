#!/usr/bin/env bash
# Queue expansion agents until core MCQ pipeline is idle (one agent family at a time).
#
# Usage:
#   ./scripts/run_expansion_when_idle.sh scripts/pipeline/expansion-round40.json
#   nohup ./scripts/run_expansion_when_idle.sh >> logs/expansion_queued.log 2>&1 &

set -euo pipefail
cd "$(dirname "$0")/.."

PLAN="${1:-scripts/pipeline/expansion-round40.json}"
POLL_SEC="${AGENT_IDLE_POLL_SEC:-20}"
MAX_WAIT_MIN="${AGENT_IDLE_MAX_WAIT_MIN:-180}"

log() { echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] $*"; }

log "Waiting for core agent_mcq_pipeline.py to finish (poll ${POLL_SEC}s, max ${MAX_WAIT_MIN}m)..."
deadline=$(( $(date +%s) + MAX_WAIT_MIN * 60 ))
while pgrep -f "agent_mcq_pipeline.py" >/dev/null 2>&1; do
  if (( $(date +%s) > deadline )); then
    log "WARN: core pipeline still running after ${MAX_WAIT_MIN}m — starting expansion anyway"
    break
  fi
  sleep "$POLL_SEC"
done

if pgrep -f "agent_expansion_pipeline.py" >/dev/null 2>&1; then
  log "Expansion pipeline already running — exiting to avoid duplicate load"
  exit 0
fi

log "Core idle — starting expansion plan: $PLAN"
exec ./scripts/run_expansion_agents.sh "$PLAN"
