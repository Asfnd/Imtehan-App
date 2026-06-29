"""S1.1 — Archive and fix the 3 MCQs from the WhatsApp feedback.

Findings (queried earlier):
  road network: 9 copies in pakistan_studies (3918, 9621, 11914, 15900, 21603,
                23896, 27882, 33585, 35878). All have correct_answer='A' = 260,000 km.
                Actual ~500,000 km is not one of the 4 options → DELETE all 9.

  China-Iran pact (variant "options Pakistan/Iran/Sri Lanka/India"):
                10 copies. 7 are already correct (B = Iran); 3 are wrong
                (D = India, in most_repeated): ids 1286, 2774, 4262 → fix to 'B'.
                Other variant (options Nepal/Bangladesh/Iran/None) has correct
                answer C = Iran on all copies → no change.

  DG ISPR: 9 copies (300, 898, 1287, 1788, 2386, 2775, 3276, 3874, 4263).
           All options are stale officers (Asif Ghafoor / Asim Saleem / Babar
           Iftikhar / None of these). Current DG ISPR since Dec 2022 is
           Lt Gen Ahmed Sharif Chaudhry — not in options → DELETE all 9.

Every destructive change is archived to mcq_archive first, so this is reversible.
"""
from __future__ import annotations

from scripts.pipeline.db import pg_query

ROAD_IDS = [3918, 9621, 11914, 15900, 21603, 23896, 27882, 33585, 35878]
DG_ISPR_IDS = [300, 898, 1287, 1788, 2386, 2775, 3276, 3874, 4263]
CHINA_INDIA_IDS = [1286, 2774, 4262]  # currently wrong correct_answer='D'

ROAD_REASON = "Reported wrong: ~260k km is outdated (true value ~500k km). No option contains the real answer."
DG_ISPR_REASON = "Reported wrong: all options are stale DG ISPRs. Current officer (Lt Gen Ahmed Sharif Chaudhry, since Dec 2022) is not an option."
CHINA_INDIA_REASON = "Reported wrong: China–Iran 25-year Strategic Cooperation Pact (Mar 2021). Stored answer was 'India' (D); fixed to 'Iran' (B)."


def archive_rows(table: str, ids: list[int], action: str, reason: str) -> int:
    if not ids:
        return 0
    ids_csv = ",".join(str(i) for i in ids)
    rows = pg_query(
        f"""
        WITH ins AS (
          INSERT INTO mcq_archive (source_table, original_id, question_number, question,
                                   option_a, option_b, option_c, option_d,
                                   correct_answer, type, created_at, action, reason)
          SELECT '{table}', id, question_number, question, option_a, option_b, option_c, option_d,
                 correct_answer, type, created_at, '{action}', $${reason}$$
          FROM {table}
          WHERE id IN ({ids_csv})
          RETURNING archive_id
        )
        SELECT count(*) AS n FROM ins;
        """
    )
    return int(rows[0]["n"])


def delete_rows(table: str, ids: list[int]) -> int:
    if not ids:
        return 0
    ids_csv = ",".join(str(i) for i in ids)
    rows = pg_query(
        f"""WITH d AS (
              DELETE FROM {table} WHERE id IN ({ids_csv}) RETURNING id
            ) SELECT count(*) AS n FROM d;"""
    )
    return int(rows[0]["n"])


def update_china_india() -> int:
    ids_csv = ",".join(str(i) for i in CHINA_INDIA_IDS)
    rows = pg_query(
        f"""WITH u AS (
              UPDATE current_affairs SET correct_answer = 'B'
              WHERE id IN ({ids_csv}) AND correct_answer = 'D'
              RETURNING id
            ) SELECT count(*) AS n FROM u;"""
    )
    return int(rows[0]["n"])


def main() -> None:
    print("== S1.1: fix 3 reported MCQs ==")

    # Road network — archive then delete
    a = archive_rows("pakistan_studies", ROAD_IDS, "delete", ROAD_REASON)
    d = delete_rows("pakistan_studies", ROAD_IDS)
    print(f"road network: archived={a} deleted={d}")

    # DG ISPR — archive then delete
    a = archive_rows("current_affairs", DG_ISPR_IDS, "delete", DG_ISPR_REASON)
    d = delete_rows("current_affairs", DG_ISPR_IDS)
    print(f"DG ISPR    : archived={a} deleted={d}")

    # China–Iran — archive then update
    a = archive_rows("current_affairs", CHINA_INDIA_IDS, "update", CHINA_INDIA_REASON)
    u = update_china_india()
    print(f"china-iran : archived={a} updated={u}")

    # Verify the fixes
    print()
    print("== verification ==")
    r = pg_query(
        "SELECT id, correct_answer, type FROM current_affairs "
        "WHERE id IN (1286, 2774, 4262) ORDER BY id;"
    )
    print(f"china-iran post-fix: {r}")
    r = pg_query(
        "SELECT count(*) AS n FROM pakistan_studies WHERE id IN ("
        + ",".join(str(i) for i in ROAD_IDS) + ");"
    )
    print(f"road network remaining: {r}")
    r = pg_query(
        "SELECT count(*) AS n FROM current_affairs WHERE id IN ("
        + ",".join(str(i) for i in DG_ISPR_IDS) + ");"
    )
    print(f"DG ISPR remaining     : {r}")


if __name__ == "__main__":
    main()
