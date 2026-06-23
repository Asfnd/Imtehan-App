#!/usr/bin/env bash
# Re-install git post-commit hook each session.
cat >/dev/null

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
if [[ -x "$ROOT/scripts/install-git-hooks.sh" ]]; then
  "$ROOT/scripts/install-git-hooks.sh" >>"$ROOT/auto-push.log" 2>&1 || true
fi
exit 0
