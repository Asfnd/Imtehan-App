#!/usr/bin/env bash
# After each agent turn: commit + push quiz-app to GitHub (background).
cat >/dev/null

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
if [[ -x "$ROOT/scripts/auto-push.sh" ]]; then
  "$ROOT/scripts/auto-push.sh" &
fi
exit 0
