"""Quick status for needs_review repair run."""
from scripts.pipeline.db import sb

BANKS = [
    "pakistan_studies", "general_knowledge", "general_math", "islamiat",
    "ethics_civics", "everyday_science", "urdu", "basic_computer",
    "english", "geography", "current_affairs",
]

def main() -> None:
    rev = ver = total = 0
    print("Bank                  needs_review   verified   total")
    for b in BANKS:
        r = sb.table(b).select("id", count="exact").eq("verification_status", "needs_review").limit(1).execute().count or 0
        v = sb.table(b).select("id", count="exact").eq("verification_status", "verified").limit(1).execute().count or 0
        t = sb.table(b).select("id", count="exact").limit(1).execute().count or 0
        rev += r
        ver += v
        total += t
        if r:
            print(f"  {b:<22} {r:>6}   {v:>6}   {t:>6}")
    print(f"\n  {'TOTAL':<22} {rev:>6}   {ver:>6}   {total:>6}")
    print(f"  Verified overall: {ver}/{total} ({round(100*ver/total)}%)")


if __name__ == "__main__":
    main()
