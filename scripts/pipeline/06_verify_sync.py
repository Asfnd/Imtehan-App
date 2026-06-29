"""Fast sync-style tier-1 verification — token-lean prompts, steady progress.

Default model: openai/gpt-oss-20b:free (override with TIER1_MODEL or
TIER1_MODEL_CHAIN). Sequential batches with small async concurrency.

  python -m scripts.pipeline.06_verify_sync
  python -m scripts.pipeline.06_verify_sync general_math pakistan_studies
  python -m scripts.pipeline.06_verify_sync --limit 100

Watch: tail -f logs/tier1_verify.log
"""
from __future__ import annotations

import asyncio
import json
import os
import sys
import time
from datetime import datetime, timezone

import httpx

from scripts.pipeline.db import sb
from scripts.pipeline.openrouter import BASE_URL, HEADERS, chat_async, parse_json_strict

def _model_chain() -> list[str]:
    raw = os.environ.get("TIER1_MODEL_CHAIN", "").strip()
    if raw:
        return [x.strip() for x in raw.split(",") if x.strip()]
    single = os.environ.get("TIER1_MODEL", "").strip()
    if single:
        return [single]
    return [
        "openai/gpt-oss-20b:free",
        "google/gemma-3-27b-it:free",
        "meta-llama/llama-3.3-70b-instruct:free",
        "qwen/qwen3-4b:free",
    ]


MODEL_CHAIN = _model_chain()
MODEL_LABEL = ",".join(MODEL_CHAIN[:2]) + ("+…" if len(MODEL_CHAIN) > 2 else "")
CONCURRENCY = int(os.environ.get("TIER1_CONCURRENCY", "6"))
FETCH_SIZE = int(os.environ.get("TIER1_BATCH", "60"))
MAX_TOKENS = int(os.environ.get("TIER1_MAX_TOKENS", "52"))
TEXT_CAP = int(os.environ.get("TIER1_TEXT_CAP", "280"))
HIGH_CONF = float(os.environ.get("TIER1_HIGH_CONF", "0.82"))
CALL_TIMEOUT = float(os.environ.get("TIER1_MCQ_TIMEOUT", "50"))
PAUSE_SEC = float(os.environ.get("TIER1_PAUSE", "0.08"))
VERIFIER_STAMP = "06_sync"
_active_model: str | None = None

ALL_BANKS = [
    "general_knowledge", "pakistan_studies", "general_math",
    "everyday_science", "islamiat", "current_affairs", "ethics_civics",
    "geography", "urdu", "english", "basic_computer",
]


# ~40 tokens system — token-efficient vs long instructions
SYSTEM = (
    "MCQ key check. JSON: verdict (correct|wrong|outdated|ambiguous|none_of_options), "
    "actual_answer (A|B|C|D|none), confidence 0-1, time_sensitive bool, reason ≤6 words."
)


def log(msg: str) -> None:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts} UTC] {msg}", flush=True)


def clip(s: str | None) -> str:
    s = (s or "").strip().replace("\n", " ")
    return (s[: TEXT_CAP - 3] + "...") if len(s) > TEXT_CAP else (s or "?")


def _confidence_float(val: object) -> float:
    """Coerce model confidence to float; models sometimes return nested structures."""
    if val is None:
        return 0.0
    if isinstance(val, bool):
        return 1.0 if val else 0.0
    if isinstance(val, (int, float)):
        return float(val)
    if isinstance(val, str):
        try:
            return float(val.strip())
        except ValueError:
            return 0.0
    if isinstance(val, dict):
        for k in ("confidence", "score", "value", "p"):
            if k in val:
                return _confidence_float(val[k])
        for v in val.values():
            if isinstance(v, (int, float)) and not isinstance(v, bool):
                return float(v)
        return 0.0
    if isinstance(val, (list, tuple)) and val:
        return _confidence_float(val[0])
    return 0.0


def user_line(row: dict) -> str:
    k = (row.get("correct_answer") or "?").strip().upper()[:1]
    return (
        f"Q:{clip(row.get('question'))}\n"
        f"A){clip(row.get('option_a'))}\nB){clip(row.get('option_b'))}\n"
        f"C){clip(row.get('option_c'))}\nD){clip(row.get('option_d'))}\nKey:{k}"
    )


def fetch_batch(bank: str, n: int, *, phase: str) -> list[dict]:
    """phase: unverified | tier2_fresh | tier2_retry | tier2_finalize"""
    q = (
        sb.table(bank)
        .select("id, question, option_a, option_b, option_c, option_d, correct_answer, verification_status, verifier_model")
        .order("id")
        .limit(n)
    )
    if phase == "unverified":
        q = q.eq("verification_status", "unverified")
    elif phase == "tier2_fresh":
        q = q.eq("verification_status", "needs_tier2").or_(
            "verifier_model.is.null,verifier_model.neq." + VERIFIER_STAMP
        )
    elif phase == "tier2_retry":
        q = q.eq("verification_status", "needs_tier2").eq("verifier_model", VERIFIER_STAMP)
    else:
        raise ValueError(phase)
    return q.execute().data or []


def persist(bank: str, results: list[dict], *, finalize: bool = False) -> None:
    """results: list of {id, verdict, actual_answer, reason, confidence, time_sensitive, error?}"""
    stamp = datetime.now(timezone.utc).isoformat()
    audit = []
    verified, quar, tier2, review, err_ids = [], [], [], [], []

    for r in results:
        mid = r["id"]
        if r.get("error") or not r.get("verdict"):
            err_ids.append(mid)
            audit.append({
                "source_table": bank, "mcq_id": mid, "verdict": "error",
                "actual_answer": None, "reason": (r.get("error") or "")[:200],
                "confidence": None, "model": r.get("model_used") or MODEL_LABEL, "tier": 1,
            })
            continue
        conf = _confidence_float(r.get("confidence"))
        v = r["verdict"]
        audit.append({
            "source_table": bank, "mcq_id": mid, "verdict": v,
            "actual_answer": r.get("actual_answer"),
            "reason": (r.get("reason") or "")[:240],
            "confidence": conf, "model": r.get("model_used") or MODEL_LABEL, "tier": 1,
        })
        if v == "correct" and conf >= HIGH_CONF:
            verified.append(mid)
        elif v in ("outdated", "none_of_options") and conf >= HIGH_CONF:
            quar.append(mid)
        elif finalize:
            review.append(mid)
        else:
            tier2.append(mid)

    if audit:
        sb.table("mcq_verification").insert(audit).execute()

    def upd(ids: list[int], payload: dict) -> None:
        for i in range(0, len(ids), 400):
            sb.table(bank).update(payload).in_("id", ids[i : i + 400]).execute()

    stamp_payload = {"verifier_model": VERIFIER_STAMP}
    if verified:
        upd(verified, {**stamp_payload, "verification_status": "verified", "verified_at": stamp})
    if quar:
        upd(quar, {**stamp_payload, "verification_status": "quarantined", "time_sensitive": True})
    if tier2:
        upd(tier2, {**stamp_payload, "verification_status": "needs_tier2"})
    if review:
        upd(review, {**stamp_payload, "verification_status": "needs_review"})
    if err_ids:
        if finalize:
            upd(err_ids, {**stamp_payload, "verification_status": "needs_review"})
        else:
            upd(err_ids, {**stamp_payload, "verification_status": "needs_tier2"})


async def verify_row(client: httpx.AsyncClient, bank: str, row: dict, sem: asyncio.Semaphore) -> dict:
    global _active_model
    async with sem:
        if PAUSE_SEC > 0:
            await asyncio.sleep(PAUSE_SEC)
        user = user_line(row)
        last_err = None
        models = ([_active_model] if _active_model else MODEL_CHAIN)
        for model in models:
            try:
                r = await asyncio.wait_for(
                    chat_async(
                        client, model=model, system=SYSTEM, user=user,
                        response_format={"type": "json_object"},
                        temperature=0.0, max_tokens=MAX_TOKENS,
                    ),
                    timeout=CALL_TIMEOUT,
                )
                p = parse_json_strict(r.get("content") or "") or {}
                verdict = p.get("verdict")
                if not verdict:
                    last_err = "empty verdict"
                    continue
                if not _active_model:
                    _active_model = r.get("model") or model
                aa = p.get("actual_answer")
                return {
                    "id": row["id"],
                    "verdict": verdict,
                    "actual_answer": aa.upper()[:1] if aa and str(aa).lower() != "none" else None,
                    "reason": p.get("reason"),
                    "confidence": _confidence_float(p.get("confidence")),
                    "time_sensitive": bool(p.get("time_sensitive", False)),
                    "model_used": r.get("model") or model,
                }
            except Exception as e:
                last_err = str(e)[:200]
        return {"id": row["id"], "error": last_err or "all models failed", "model_used": MODEL_LABEL}


async def _run_phase(
    client: httpx.AsyncClient,
    bank: str,
    sem: asyncio.Semaphore,
    phase: str,
    *,
    finalize: bool,
    max_rows: int | None,
    done_so_far: int,
) -> tuple[int, int, int, int]:
    """Returns (processed, verified, other, done_so_far)."""
    verified_n = other_n = 0
    t0 = time.time()
    processed = 0
    while True:
        limit = FETCH_SIZE if not max_rows else min(FETCH_SIZE, max_rows - done_so_far - processed)
        if limit <= 0:
            break
        rows = fetch_batch(bank, limit, phase=phase)
        if not rows:
            break
        results = await asyncio.gather(*[verify_row(client, bank, r, sem) for r in rows])
        persist(bank, results, finalize=finalize)
        processed += len(results)
        for r in results:
            if r.get("error") or not (
                r.get("verdict") == "correct" and _confidence_float(r.get("confidence")) >= HIGH_CONF
            ):
                other_n += 1
            else:
                verified_n += 1
        rate = processed / max(time.time() - t0, 0.1)
        tag = "finalize" if finalize else phase
        log(f"[{bank}:{tag}] +{len(results)} phase={processed} verified={verified_n} other={other_n} {rate:.2f}/s")
    return processed, verified_n, other_n, done_so_far + processed


async def run_bank(bank: str, max_rows: int | None) -> dict:
    global _active_model
    _active_model = None
    sem = asyncio.Semaphore(CONCURRENCY)
    timeout = httpx.Timeout(CALL_TIMEOUT + 10, connect=15.0)
    done = verified_n = other_n = 0
    t0 = time.time()

    async with httpx.AsyncClient(timeout=timeout, headers=HEADERS, base_url=BASE_URL) as client:
        for phase in ("unverified", "tier2_fresh", "tier2_retry"):
            finalize = phase == "tier2_retry"
            p, v, o, done = await _run_phase(
                client, bank, sem, phase, finalize=finalize, max_rows=max_rows, done_so_far=done
            )
            verified_n += v
            other_n += o
            if max_rows and done >= max_rows:
                break

    rate = done / max(time.time() - t0, 0.1)
    log(f"[{bank}] DONE total={done} verified={verified_n} other={other_n} {rate:.2f}/s")
    return {"bank": bank, "done": done, "verified": verified_n, "other": other_n}


async def main() -> None:
    argv = sys.argv[1:]
    max_rows = None
    banks: list[str] = []
    i = 0
    while i < len(argv):
        a = argv[i]
        if a.startswith("--limit="):
            max_rows = int(a.split("=", 1)[1])
        elif a == "--limit" and i + 1 < len(argv):
            max_rows = int(argv[i + 1])
            i += 1
        elif not a.startswith("--"):
            banks.append(a)
        i += 1
    if not banks:
        pending_pairs: list[tuple[str, int]] = []
        for b in ALL_BANKS:
            n = (
                sb.table(b)
                .select("id", count="exact")
                .in_("verification_status", ["unverified", "needs_tier2"])
                .limit(1)
                .execute()
                .count
                or 0
            )
            if n:
                pending_pairs.append((b, n))
        pending_pairs.sort(key=lambda x: -x[1])
        banks = [b for b, _ in pending_pairs]

    log(f"== sync verify models={MODEL_CHAIN} concurrency={CONCURRENCY} batch={FETCH_SIZE} ==")
    for b in banks:
        pending = (
            sb.table(b).select("id", count="exact")
            .in_("verification_status", ["unverified", "needs_tier2"])
            .limit(1).execute().count or 0
        )
        log(f"  {b}: {pending} pending")
        if pending == 0:
            continue
        log(f"--- {b} ---")
        s = await run_bank(b, max_rows)
        log(f"--- done {b}: {s}")

    log("== SYNC VERIFY COMPLETE ==")


if __name__ == "__main__":
    asyncio.run(main())
