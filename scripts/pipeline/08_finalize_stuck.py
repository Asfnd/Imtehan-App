"""Move tier-2 rows already processed by 06_sync into needs_review (clears infinite queue)."""
from __future__ import annotations

from scripts.pipeline.db import sb

BANKS = [
    "general_knowledge", "pakistan_studies", "general_math",
    "everyday_science", "islamiat", "current_affairs", "ethics_civics",
    "geography", "urdu", "english", "basic_computer",
]
# Rows already adjudicated by these models — re-running free tier-1 is wasteful.
FINALIZE_MODELS = ("06_sync", "claude-subagent", "tier1-free-chain")


def main() -> None:
    total = 0
    for bank in BANKS:
        offset = 0
        moved = 0
        while True:
            r = (
                sb.table(bank)
                .select("id")
                .eq("verification_status", "needs_tier2")
                .in_("verifier_model", list(FINALIZE_MODELS))
                .order("id")
                .range(offset, offset + 499)
                .execute()
            )
            ids = [row["id"] for row in (r.data or [])]
            if not ids:
                break
            sb.table(bank).update({"verification_status": "needs_review"}).in_("id", ids).execute()
            moved += len(ids)
            offset += len(ids)
            if len(ids) < 500:
                break
        if moved:
            print(f"  {bank}: {moved} → needs_review")
        total += moved
    print(f"TOTAL finalized: {total}")


if __name__ == "__main__":
    main()
