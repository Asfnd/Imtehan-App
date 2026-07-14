#!/usr/bin/env bash
# Install git hooks for auto-push to CSS-App.
# No-op on Vercel/CI (no .git) — never fail npm install in production builds.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [ ! -d "$ROOT/.git" ]; then
  echo "Skipping git-hook install (no .git — CI/Vercel)"
  exit 0
fi

HOOKS_DIR="$ROOT/.git/hooks"
SRC="$ROOT/scripts/git-hooks/post-commit"

chmod +x "$ROOT/scripts/auto-push.sh"
chmod +x "$SRC"
chmod +x "$ROOT/.cursor/hooks/"*.sh 2>/dev/null || true
cp "$SRC" "$HOOKS_DIR/post-commit"
chmod +x "$HOOKS_DIR/post-commit"

echo "Installed post-commit hook -> $HOOKS_DIR/post-commit"
echo "Auto-push log: $ROOT/auto-push.log"
echo "Cursor hooks: $ROOT/.cursor/hooks.json (sessionStart + stop)"
