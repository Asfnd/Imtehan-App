#!/usr/bin/env bash
# Commit tracked + new source changes in quiz-app (web) and push to origin.
# Skips untracked tmp/scripts junk — only whitelisted app paths.
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

stage_safe_changes() {
  # Modified/deleted tracked files
  git add -u

  # New files under source trees (not tmp/, logs/, AI_MCQ_Output/, etc.)
  local paths=(
    app
    components
    lib
    public
    supabase/migrations
    scripts/auto-push.sh
    scripts/install-git-hooks.sh
    scripts/git-hooks
    scripts/ping-search-engines.ts
    .cursor/hooks.json
    .cursor/hooks
    next.config.ts
    middleware.ts
    package.json
    package-lock.json
    tsconfig.json
    vercel.json
    README.md
  )
  for p in "${paths[@]}"; do
    [[ -e "$p" ]] && git add "$p" 2>/dev/null || true
  done
}

if [[ -n "$(git status --porcelain)" ]]; then
  stage_safe_changes
  if git diff --cached --quiet; then
    log_line "skip: only untracked changes outside safe paths"
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
