#!/usr/bin/env bash
# Commit tracked-file changes in quiz-app (web) and push to origin.
# Skips untracked tmp/scripts junk via `git add -u` only.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

git rev-parse --git-dir >/dev/null 2>&1 || exit 0

branch="$(git branch --show-current)"
remote="origin"
log="$ROOT/auto-push.log"

log_line() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >>"$log"
}

if ! git remote get-url "$remote" >/dev/null 2>&1; then
  log_line "skip: no remote $remote"
  exit 0
fi

# Stage tracked edits plus auto-push hook files (never scoop untracked tmp/ artifacts).
if [[ -n "$(git status --porcelain)" ]]; then
  git add -u
  git add scripts/auto-push.sh scripts/install-git-hooks.sh scripts/git-hooks/post-commit 2>/dev/null || true
  if git diff --cached --quiet; then
    log_line "skip: only untracked changes present"
  else
    msg="chore: auto-sync web app ($(date '+%Y-%m-%d %H:%M'))"
    git commit -m "$msg"
    log_line "committed: $msg"
  fi
fi

if git push -u "$remote" "$branch" >>"$log" 2>&1; then
  log_line "pushed: $branch -> $remote"
else
  log_line "push failed for $branch (see log)"
  exit 1
fi
