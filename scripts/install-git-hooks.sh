#!/usr/bin/env bash
# Install git hooks for auto-push to CSS-App.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOKS_DIR="$ROOT/.git/hooks"
SRC="$ROOT/scripts/git-hooks/post-commit"

chmod +x "$ROOT/scripts/auto-push.sh"
chmod +x "$SRC"
cp "$SRC" "$HOOKS_DIR/post-commit"
chmod +x "$HOOKS_DIR/post-commit"

echo "Installed post-commit hook -> $HOOKS_DIR/post-commit"
echo "Auto-push log: $ROOT/auto-push.log"
