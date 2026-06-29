#!/usr/bin/env bash
# Low-intensity 24/7 MCQ factory — uses project venv, 2 parallel agents max, nice priority.
# One instance only (lock file). Safe for MacBook while you work.
set -euo pipefail
if [[ "${AGENT_FACTORY_ENABLED:-1}" != "1" ]]; then
  echo "Agent factory PAUSED. Export AGENT_FACTORY_ENABLED=1 to run."
  exit 0
fi

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
mkdir -p logs scripts/pipeline
export PATH="${HOME}/.local/bin:${PATH}"
export PYTHONUNBUFFERED=1
export CURSOR_AGENT_MODEL="${CURSOR_AGENT_MODEL:-composer-2-fast}"

# Mac-friendly defaults (override: WORKERS=3 for faster)
export AGENT_MCQ_PER_TOPIC="${AGENT_MCQ_PER_TOPIC:-30}"
export AGENT_QC_PULSE_EVERY="${AGENT_QC_PULSE_EVERY:-10}"
export AGENT_LOW_CPU="${AGENT_LOW_CPU:-1}"
export AGENT_MAX_WORKERS="${AGENT_MAX_WORKERS:-1}"
export AGENT_SEQUENTIAL="${AGENT_SEQUENTIAL:-1}"
export AGENT_SKIP_VERIFY="${AGENT_SKIP_VERIFY:-1}"
export AGENT_COOLDOWN_SEC="${AGENT_COOLDOWN_SEC:-45}"
WORKERS="${WORKERS:-1}"

PY="${ROOT}/venv/bin/python3"
if [[ ! -x "$PY" ]]; then
  echo "Missing venv. Run: cd $ROOT && python3 -m venv venv && ./venv/bin/pip install -r requirements.txt"
  exit 1
fi
LOG="${ROOT}/logs/agent_continuous.log"
PIDFILE="${ROOT}/logs/agent_continuous.pid"
log() { echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] $*" | tee -a "$LOG"; }

# Prevent duplicate factories — detect actual pipeline, not this shell's pid
if pgrep -f "agent_mcq_pipeline.py run" >/dev/null 2>&1; then
  log "Pipeline already running ($(pgrep -f 'agent_mcq_pipeline.py run' | tr '\n' ' ')). Exiting."
  exit 0
fi
OTHER_WRAPPERS="$(pgrep -f "run_continuous_agent.sh" 2>/dev/null | grep -v "^$$$" || true)"
if [[ -n "$OTHER_WRAPPERS" ]]; then
  log "Another run_continuous_agent.sh is active (pids: $OTHER_WRAPPERS). Exiting."
  exit 0
fi

echo $$ > "$PIDFILE"
log "== LOW-INTENSITY FACTORY pid=$$ workers=$WORKERS python=$PY nice=15 =="

run_round() {
  local plan="$1"
  log ">> START $plan (workers=$WORKERS)"
  # venv python only; nice = lower CPU priority for your Mac
  nice -n 15 "$PY" -u scripts/agent_mcq_pipeline.py run \
    --plan "$plan" --workers "$WORKERS" --resume \
    >> "$LOG" 2>&1 || log "!! round failed: $plan (continuing)"
  log "<< END $plan"
}

WAVE=1
while true; do
  log "=== WAVE $WAVE ==="
  run_round scripts/pipeline/round18_practice.json
  run_round scripts/pipeline/round19_important.json
  run_round scripts/pipeline/round20_repeated.json

  EXTRA="scripts/pipeline/round21_practice_wave${WAVE}.json"
  if [[ ! -f "$EXTRA" ]]; then
    log "Building $EXTRA"
    nice -n 15 "$PY" scripts/agent_mcq_pipeline.py build-plan \
      --output "$EXTRA" --per-topic 25 --type practice >> "$LOG" 2>&1 || true
  fi
  [[ -f "$EXTRA" ]] && run_round "$EXTRA"

  WAVE=$((WAVE + 1))
  log "Wave $((WAVE - 1)) done — sleep 120s (cooldown)"
  sleep 120
done
