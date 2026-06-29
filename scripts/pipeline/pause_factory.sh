#!/usr/bin/env bash
# Stop MCQ factory and any in-flight generation agents.
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

export AGENT_FACTORY_ENABLED=0
pkill -f "agent_mcq_pipeline.py" 2>/dev/null || true
pkill -f "run_continuous_agent.sh" 2>/dev/null || true
pkill -f "start_factory.sh" 2>/dev/null || true
# Orphan agent children (MCQ prompts only — does not kill IDE agents)
pkill -f "item-writer for Pakistani civil service" 2>/dev/null || true

sleep 1
if pgrep -f "agent_mcq_pipeline.py" >/dev/null 2>&1; then
  echo "Warning: pipeline still running — try: pkill -9 -f agent_mcq_pipeline"
else
  echo "Factory PAUSED."
  echo "  AGENT_FACTORY_ENABLED=0"
  echo "Resume: bash scripts/pipeline/start_factory.sh"
fi
