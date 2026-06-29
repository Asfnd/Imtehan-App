#!/usr/bin/env bash
# Generate dispatch prompts for parallel Cursor MCP agents (does not launch agents).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

PY="${ROOT}/venv/bin/python3"
if [[ ! -x "$PY" ]]; then
  PY=python3
fi

"$PY" scripts/pipeline/generate_mcp_agent_prompts.py "$@"

echo ""
echo "Open each file in logs/mcp_agent_dispatches/ in a separate Cursor Agent tab."
echo "Prerequisites: Supabase MCP enabled, auto-run without confirmation."
