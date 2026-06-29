#!/usr/bin/env bash
# Parallel MCQ workers — student-quality v4 + agent verify pass.
# One batch = one table + topic + type + 50 MCQs (matches MCP agent architecture).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

PY="$ROOT/venv/bin/python3"
if [[ ! -x "$PY" ]]; then
  echo "Need venv: python3 -m venv venv && ./venv/bin/pip install supabase python-dotenv"
  exit 1
fi

# Stop old factory loops
pkill -f "agent_mcq_pipeline.py run" 2>/dev/null || true
pkill -f "run_continuous_agent.sh" 2>/dev/null || true
sleep 2

export AGENT_FACTORY_ENABLED=1
export AGENT_MAX_WORKERS=4
export AGENT_SEQUENTIAL=0
export AGENT_LOW_CPU=1
export AGENT_SKIP_VERIFY=0
export AGENT_MIN_YIELD_RATIO=0.72
export AGENT_TOPUP_MAX=2
export AGENT_COOLDOWN_SEC=15
export AGENT_MCQ_PER_TOPIC=50
export CURSOR_AGENT_MODEL="${CURSOR_AGENT_MODEL:-composer-2-fast}"

PLAN="${1:-scripts/pipeline/mcp_parallel_run.json}"
WORKERS="${WORKERS:-4}"

echo "Starting parallel MCQ run"
echo "  plan=$PLAN workers=$WORKERS verify=ON cooldown=${AGENT_COOLDOWN_SEC}s"
echo "  log=logs/agent_mcq_pipeline.log"

nohup nice -n 15 "$PY" -u scripts/agent_mcq_pipeline.py run \
  --plan "$PLAN" \
  --workers "$WORKERS" \
  --resume \
  >> logs/mcp_parallel_run.log 2>&1 &

disown
sleep 2
if pgrep -f "agent_mcq_pipeline.py run" >/dev/null; then
  echo "RUNNING. Monitor: tail -f logs/agent_mcq_pipeline.log"
else
  echo "Failed to start — check logs/mcp_parallel_run.log"
  tail -20 logs/mcp_parallel_run.log 2>/dev/null || true
  exit 1
fi
