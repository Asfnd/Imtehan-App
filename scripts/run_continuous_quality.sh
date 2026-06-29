#!/usr/bin/env bash
# Continuous high-quality MCQ generation: build next round plan → run → repeat (no stop).
#
# Quality: verifier ON, batch metrics, frequent DB pulse, strict yield, zero cooldown.
#
# Usage:
#   ./scripts/run_continuous_quality.sh
#   # Stop: kill the process or Ctrl+C in the terminal running it.
#
# Logs: logs/continuous_quality.log (orchestrator) + logs/agent_mcq_pipeline.log (batches)

set -euo pipefail
cd "$(dirname "$0")/.."

export AGENT_SKIP_VERIFY="${AGENT_SKIP_VERIFY:-0}"
export AGENT_SEQUENTIAL="${AGENT_SEQUENTIAL:-1}"
export AGENT_MAX_WORKERS="${AGENT_MAX_WORKERS:-2}"
export AGENT_COOLDOWN_SEC="${AGENT_COOLDOWN_SEC:-0}"
export AGENT_MIN_YIELD_RATIO="${AGENT_MIN_YIELD_RATIO:-0.86}"
export AGENT_TOPUP_MAX="${AGENT_TOPUP_MAX:-4}"
export AGENT_BATCH_METRICS="${AGENT_BATCH_METRICS:-1}"
export AGENT_QC_PULSE_EVERY="${AGENT_QC_PULSE_EVERY:-5}"

CONT_LOG="${CONT_LOG:-logs/continuous_quality.log}"
mkdir -p logs

log() {
  echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] $*" | tee -a "$CONT_LOG"
}

log "== CONTINUOUS QUALITY MCQ RUNNER =="
log "verify=$AGENT_SKIP_VERIFY yield=$AGENT_MIN_YIELD_RATIO metrics=$AGENT_BATCH_METRICS pulse=$AGENT_QC_PULSE_EVERY cooldown=${AGENT_COOLDOWN_SEC}s"

while true; do
  PLAN="$(python3 scripts/build_next_quality_round.py)"
  log "→ Starting $PLAN"
  if ! python3 scripts/agent_mcq_pipeline.py run --plan "$PLAN" --workers "${AGENT_MAX_WORKERS}"; then
    log "WARN: pipeline exited non-zero for $PLAN — continuing after 30s"
    sleep 30
  else
    log "✓ Finished $PLAN"
  fi
  sleep 2
done
