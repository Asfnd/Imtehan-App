#!/usr/bin/env bash
# Ultra-light MCQ factory — venv python, 1 topic at a time, 1 agent call per topic.
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

PY="$ROOT/venv/bin/python3"
if [[ ! -x "$PY" ]]; then
  echo "Create venv: python3 -m venv venv && ./venv/bin/pip install supabase python-dotenv"
  exit 1
fi

# Stop factory + free CPU from stuck runs
pkill -f "agent_mcq_pipeline.py run" 2>/dev/null || true
pkill -f "run_continuous_agent.sh" 2>/dev/null || true
sleep 2

# Kill runaway Cursor sandbox python loops (not part of factory — causes ~100% CPU)
pkill -f "dump_zsh_state" 2>/dev/null || true

export AGENT_FACTORY_ENABLED=1
export WORKERS=1
export AGENT_MAX_WORKERS=1
export AGENT_SEQUENTIAL=1
export AGENT_LOW_CPU=1
export AGENT_SKIP_VERIFY=1
export AGENT_COOLDOWN_SEC=45
export AGENT_MCQ_PER_TOPIC=30

nohup nice -n 19 bash scripts/pipeline/run_continuous_agent.sh >> logs/agent_continuous.log 2>&1 &
disown
echo "Started ULTRA-LIGHT mode:"
echo "  venv=$PY"
echo "  1 topic at a time, 45s pause between topics"
echo "  QC only (no 2nd verify agent) = ~50% less CPU"
echo "Monitor: tail -f logs/agent_mcq_pipeline.log"
