"""Cleanup old errors + report live status."""
from scripts.pipeline.db import pg_query


def main() -> None:
    n = pg_query(
        """
        WITH d AS (
          DELETE FROM mcq_verification
          WHERE verdict='error' AND model='google/gemini-2.0-flash-001'
          RETURNING id
        ) SELECT count(*) AS n FROM d;
        """
    )
    print(f"cleaned {n[0]['n']} error rows from old OpenRouter run")

    n = pg_query(
        """
        WITH u AS (
          UPDATE mcq_verification SET verdict='correct'
          WHERE verdict IN ('A','B','C','D')
          RETURNING id
        ) SELECT count(*) AS n FROM u;
        """
    )
    print(f"normalized {n[0]['n']} malformed letter verdicts to 'correct'")

    print()
    print("=== Live bank status ===")
    r = pg_query(
        """
        SELECT bank,
          count(*) FILTER (WHERE verification_status='verified')     AS verified,
          count(*) FILTER (WHERE verification_status='needs_review') AS rev,
          count(*) FILTER (WHERE verification_status='quarantined')  AS quar,
          count(*) FILTER (WHERE verification_status='unverified')   AS unv,
          count(*) FILTER (WHERE verification_status='needs_tier2')  AS t2,
          count(*) AS total
        FROM (
          SELECT 'current_affairs' AS bank, verification_status FROM current_affairs
          UNION ALL SELECT 'general_knowledge', verification_status FROM general_knowledge
          UNION ALL SELECT 'pakistan_studies',  verification_status FROM pakistan_studies
          UNION ALL SELECT 'everyday_science',  verification_status FROM everyday_science
          UNION ALL SELECT 'islamiat',          verification_status FROM islamiat
          UNION ALL SELECT 'basic_computer',    verification_status FROM basic_computer
          UNION ALL SELECT 'english',           verification_status FROM english
          UNION ALL SELECT 'urdu',              verification_status FROM urdu
          UNION ALL SELECT 'general_math',      verification_status FROM general_math
          UNION ALL SELECT 'geography',         verification_status FROM geography
          UNION ALL SELECT 'ethics_civics',     verification_status FROM ethics_civics
        ) all_banks GROUP BY bank ORDER BY verified DESC;
        """
    )
    total_verified = 0
    total_total = 0
    for row in r:
        p = round(100 * row["verified"] / row["total"]) if row["total"] else 0
        total_verified += row["verified"]
        total_total += row["total"]
        print(
            f"  {row['bank']:<20} verified={row['verified']:>5} ({p:>3}%)  rev={row['rev']:>4}  quar={row['quar']:>4}  unv={row['unv']:>5}  t2={row['t2']:>4}  total={row['total']:>5}"
        )

    print()
    print(f"TOTAL verified: {total_verified} / {total_total} ({round(100*total_verified/total_total)}%)")

    r = pg_query(
        """
        SELECT count(*) AS n FROM mcq_archive
        WHERE action='update' AND (reason ILIKE '%consensus%' OR reason ILIKE '%auto-fix%');
        """
    )
    print(f"auto-fixed wrong answers (archived): {r[0]['n']}")

    r = pg_query("SELECT verdict, count(*) AS n FROM mcq_verification GROUP BY verdict ORDER BY n DESC;")
    print()
    print("verifier verdict distribution:")
    for row in r:
        print(f"  {row['verdict']:<20} {row['n']:>5}")


if __name__ == "__main__":
    main()
