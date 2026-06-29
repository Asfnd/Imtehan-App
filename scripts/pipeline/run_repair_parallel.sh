#!/usr/bin/env bash
# Run Gemini repair per bank in parallel (one process each).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
mkdir -p logs
export PYTHONUNBUFFERED=1

BANKS=(
  pakistan_studies general_knowledge general_math islamiat ethics_civics
  everyday_science urdu basic_computer english geography current_affairs
)

echo "Starting parallel repair $(date -u '+%Y-%m-%dT%H:%M:%SZ')" | tee -a logs/repair_review.log

for bank in "${BANKS[@]}"; do
  nohup python3 -u -m scripts.pipeline.09_repair_needs_review \
    --gemini-only --bank "$bank" --batch 8 --timeout 200 \
    >> "logs/repair_${bank}.log" 2>&1 &
  echo "  launched $bank pid=$!"
done

echo "All banks launched. tail -f logs/repair_general_knowledge.log"
