#!/usr/bin/env bash
# Quality-first MCQ factory — verify ON, top-up, wave 3+ new topics.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
PY="$ROOT/venv/bin/python3"
[[ -x "$PY" ]] || PY=python3

export AGENT_FACTORY_ENABLED=1
export AGENT_MAX_WORKERS=3
export AGENT_SEQUENTIAL=0
export AGENT_LOW_CPU=1
export AGENT_SKIP_VERIFY=0
export AGENT_TOPUP_MAX=3
export AGENT_MIN_YIELD_RATIO=0.80
export AGENT_COOLDOWN_SEC=25
export WORKERS=3
export AGENT_MCQ_PER_TOPIC=50
export AGENT_TIMEOUT_GEN=420
export AGENT_TIMEOUT_VERIFY=240

PLANS=(
  scripts/pipeline/mcp_parallel_run_wave6.json
  scripts/pipeline/mcp_parallel_run_wave5.json
  scripts/pipeline/mcp_parallel_run_wave4.json
  scripts/pipeline/mcp_parallel_run_wave3.json
  scripts/pipeline/mcp_parallel_run_wave2.json
  scripts/pipeline/mcp_parallel_run.json
)

run_plan() {
  local plan="$1"
  echo "== Factory wave: $plan ==" | tee -a logs/quality_factory.log
  nice -n 15 "$PY" -u scripts/agent_mcq_pipeline.py run --plan "$plan" --workers 3 --resume \
    2>&1 | tee -a logs/quality_factory.log
}

# Kill stale wrappers / duplicate pipelines
pkill -f "agent_mcq_pipeline.py run" 2>/dev/null || true
sleep 2

echo "Quality factory started $(date -u)" >> logs/quality_factory.log

while [[ "${AGENT_FACTORY_ENABLED:-1}" == "1" ]]; do
  for plan in "${PLANS[@]}"; do
    run_plan "$plan" || true
  done
  echo "Cycle complete $(date -u) — sleep 120s (AGENT_FACTORY_ENABLED=0 to stop)" >> logs/quality_factory.log
  sleep 120
done
