"""S3 Tier-1 verification — OpenRouter (default: free models, minimal tokens).

For each MCQ where verification_status is 'unverified' or 'needs_tier2' (re-run):
  1. Call OpenRouter (free model chain by default — $0).
  2. Insert verdict into mcq_verification.
  3. If the verifier agrees with the stored correct_answer at confidence >= 0.85,
     mark the MCQ verified directly.
  4. Otherwise mark needs_tier2 for human / stronger review.

Resumable — verified rows are skipped on re-run.

Run:
  python -m scripts.pipeline.05_verify_tier1                # all banks (free models)
  python -m scripts.pipeline.05_verify_tier1 general_math --limit 50
  ./scripts/pipeline/run_tier1_logged.sh
  tail -f logs/tier1_verify.log

Env: OPENROUTER_API_KEY. Optional: TIER1_MODEL_CHAIN=model1:free,model2:free
     TIER1_CONCURRENCY=10  TIER1_MAX_TOKENS=72  TIER1_TEXT_CAP=380
     TIER1_PAID=1 + TIER1_MODEL=google/gemini-2.0-flash-001 for paid tier.
"""
from __future__ import annotations

import asyncio
import json
import os
import sys
import time
from dataclasses import dataclass
from datetime import datetime, timezone

import httpx

from scripts.pipeline.db import sb
from scripts.pipeline.openrouter import (
    BASE_URL,
    HEADERS,
    chat_async,
    parse_json_strict,
)

DEFAULT_FREE_MODELS = [
    "openai/gpt-oss-20b:free",
    "google/gemma-4-26b-a4b-it:free",
    "deepseek/deepseek-v4-flash:free",
    "nvidia/nemotron-3-nano-30b-a3b:free",
    "qwen/qwen3-coder:free",
]

def _model_chain() -> list[str]:
    raw = os.environ.get("TIER1_MODEL_CHAIN", "").strip()
    if raw:
        return [m.strip() for m in raw.split(",") if m.strip()]
    if os.environ.get("TIER1_PAID", "").strip() in ("1", "true", "yes"):
        return [os.environ.get("TIER1_MODEL", "google/gemini-2.0-flash-001")]
    return list(DEFAULT_FREE_MODELS)


MODEL_CHAIN = _model_chain()
MODEL_LABEL = MODEL_CHAIN[0] if len(MODEL_CHAIN) == 1 else "tier1-free-chain"
CONCURRENCY = int(os.environ.get("TIER1_CONCURRENCY", "10"))
BATCH = int(os.environ.get("TIER1_BATCH", "120"))
MAX_TOKENS = int(os.environ.get("TIER1_MAX_TOKENS", "72"))
TEXT_CAP = int(os.environ.get("TIER1_TEXT_CAP", "380"))
HIGH_CONF = 0.85
PER_MCQ_TIMEOUT = float(os.environ.get("TIER1_MCQ_TIMEOUT", "90"))

# Set after first successful call in a bank run (avoids trying 5 models × every row).
_active_model: str | None = None

BANKS = [
    "current_affairs", "ethics_civics", "geography", "urdu", "english",
    "general_math", "islamiat", "basic_computer", "pakistan_studies",
    "general_knowledge", "everyday_science",
]


def _ts() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")


def log(msg: str) -> None:
    print(f"[{_ts()} UTC] {msg}", flush=True)


def count_pending(bank: str) -> int:
    r = (
        sb.table(bank)
        .select("id", count="exact")
        .in_("verification_status", ["unverified", "needs_tier2"])
        .limit(1)
        .execute()
    )
    return int(r.count or 0)


SYSTEM_PROMPT = (
    'Verify MCQ key. Reply JSON only: '
    '{"verdict":"correct|wrong|outdated|ambiguous|none_of_options",'
    '"actual_answer":"A|B|C|D|none","confidence":0.0-1.0,'
    '"time_sensitive":false,"reason":"brief"}'
)

USER_TEMPLATE = "Q:{q}\nA){a}\nB){b}\nC){c}\nD){d}\nKey:{ans}"


def _clip(text: str | None) -> str:
    s = (text or "").strip().replace("\n", " ")
    if len(s) > TEXT_CAP:
        return s[: TEXT_CAP - 3] + "..."
    return s or "?"


@dataclass
class VerifyResult:
    mcq_id: int
    bank: str
    verdict: str | None
    actual_answer: str | None
    reason: str | None
    confidence: float | None
    time_sensitive: bool
    raw: str
    cost: float
    model_used: str | None = None
    error: str | None = None


async def verify_one(client: httpx.AsyncClient, bank: str, row: dict, sem: asyncio.Semaphore) -> VerifyResult:
    global _active_model
    async with sem:
        user = USER_TEMPLATE.format(
            q=_clip(row.get("question")),
            a=_clip(row.get("option_a")),
            b=_clip(row.get("option_b")),
            c=_clip(row.get("option_c")),
            d=_clip(row.get("option_d")),
            ans=(row.get("correct_answer") or "?").strip().upper()[:1],
        )
        last_err: str | None = None
        models = ([_active_model] if _active_model else MODEL_CHAIN)
        for model in models:
            try:
                r = await asyncio.wait_for(
                    chat_async(
                        client,
                        model=model,
                        system=SYSTEM_PROMPT,
                        user=user,
                        response_format={"type": "json_object"},
                        temperature=0.0,
                        max_tokens=MAX_TOKENS,
                    ),
                    timeout=PER_MCQ_TIMEOUT,
                )
                parsed = parse_json_strict(r.get("content") or "") or {}
                verdict = parsed.get("verdict")
                if not verdict:
                    last_err = "empty verdict"
                    continue
                if not _active_model:
                    _active_model = r.get("model") or model
                cost = float(r.get("usage", {}).get("cost", 0.0) or 0.0)
                aa = parsed.get("actual_answer")
                return VerifyResult(
                    mcq_id=row["id"], bank=bank,
                    verdict=verdict,
                    actual_answer=aa.upper()[:1] if aa and str(aa).lower() != "none" else None,
                    reason=(parsed.get("reason") or "")[:240],
                    confidence=float(parsed["confidence"]) if parsed.get("confidence") is not None else None,
                    time_sensitive=bool(parsed.get("time_sensitive", False)),
                    raw=(r.get("content") or "")[:500],
                    cost=cost,
                    model_used=r.get("model") or model,
                )
            except Exception as e:
                last_err = str(e)[:200]
                continue
        return VerifyResult(
            mcq_id=row["id"], bank=bank,
            verdict=None, actual_answer=None, reason=last_err,
            confidence=None, time_sensitive=False, raw="", cost=0.0,
            error=last_err or "all models failed",
        )


def fetch_batch(bank: str, limit: int) -> list[dict]:
    r = (
        sb.table(bank)
        .select("id, question, option_a, option_b, option_c, option_d, correct_answer")
        .in_("verification_status", ["unverified", "needs_tier2"])
        .order("id")
        .limit(limit)
        .execute()
    )
    return r.data or []


def persist_results(results: list[VerifyResult]) -> None:
    if not results:
        return
    verified_stamp = datetime.now(timezone.utc).isoformat()
    # Insert verification audit rows
    audit_rows = [
        {
            "source_table": r.bank,
            "mcq_id": r.mcq_id,
            "verdict": r.verdict or "error",
            "actual_answer": r.actual_answer,
            "reason": r.reason,
            "confidence": r.confidence,
            "model": r.model_used or MODEL_LABEL,
            "tier": 1,
        }
        for r in results
    ]
    try:
        sb.table("mcq_verification").insert(audit_rows).execute()
    except Exception as e:
        log(f"PERSIST ERROR — mcq_verification insert failed ({len(audit_rows)} rows): {e!r}")
        raise

    # Apply tier-1 status updates per row.
    # High-confidence 'correct' → verified.
    # High-confidence 'outdated' or 'none_of_options' → quarantined + time_sensitive.
    # Anything else (wrong, ambiguous, low conf) → leave 'unverified' so tier-2 picks it up.
    verified_by_bank: dict[str, list[int]] = {}
    quarantined_by_bank: dict[str, list[int]] = {}
    time_sens_by_bank: dict[str, list[int]] = {}
    needs_tier2_by_bank: dict[str, list[int]] = {}

    errored_by_bank: dict[str, list[int]] = {}

    for r in results:
        if r.error or not r.verdict:
            # Mark so we do not re-fetch the same row forever on API failures.
            errored_by_bank.setdefault(r.bank, []).append(r.mcq_id)
            continue
        if r.time_sensitive:
            time_sens_by_bank.setdefault(r.bank, []).append(r.mcq_id)
        if r.verdict == "correct" and (r.confidence or 0) >= HIGH_CONF:
            verified_by_bank.setdefault(r.bank, []).append(r.mcq_id)
        elif r.verdict in ("outdated", "none_of_options") and (r.confidence or 0) >= HIGH_CONF:
            quarantined_by_bank.setdefault(r.bank, []).append(r.mcq_id)
        else:
            needs_tier2_by_bank.setdefault(r.bank, []).append(r.mcq_id)

    for bank, ids in verified_by_bank.items():
        for i in range(0, len(ids), 500):
            try:
                sb.table(bank).update(
                    {
                        "verification_status": "verified",
                        "verified_at": verified_stamp,
                        "verifier_model": MODEL_LABEL,
                    }
                ).in_("id", ids[i:i + 500]).execute()
            except Exception as e:
                log(f"PERSIST ERROR — {bank}.update verified ids={ids[i:i + 500][:3]}… : {e!r}")
                raise
    for bank, ids in quarantined_by_bank.items():
        for i in range(0, len(ids), 500):
            sb.table(bank).update(
                {"verification_status": "quarantined", "verifier_model": MODEL_LABEL, "time_sensitive": True}
            ).in_("id", ids[i:i + 500]).execute()
    for bank, ids in time_sens_by_bank.items():
        for i in range(0, len(ids), 500):
            sb.table(bank).update({"time_sensitive": True}).in_("id", ids[i:i + 500]).execute()
    for bank, ids in needs_tier2_by_bank.items():
        for i in range(0, len(ids), 500):
            sb.table(bank).update(
                {"verification_status": "needs_tier2", "verifier_model": MODEL_LABEL}
            ).in_("id", ids[i:i + 500]).execute()
    for bank, ids in errored_by_bank.items():
        for i in range(0, len(ids), 500):
            sb.table(bank).update(
                {"verification_status": "needs_tier2", "verifier_model": MODEL_LABEL}
            ).in_("id", ids[i:i + 500]).execute()


async def run_bank(bank: str, max_rows: int | None) -> dict:
    global _active_model
    _active_model = None
    sem = asyncio.Semaphore(CONCURRENCY)
    timeout = httpx.Timeout(60.0, connect=10.0)
    limits = httpx.Limits(max_keepalive_connections=CONCURRENCY, max_connections=CONCURRENCY)

    total_done = 0
    total_cost = 0.0
    verified = needs_tier2 = quarantined = errored = 0
    start = time.time()

    async with httpx.AsyncClient(timeout=timeout, limits=limits, headers=HEADERS, base_url=BASE_URL) as client:
        while True:
            rows = fetch_batch(bank, BATCH if not max_rows else min(BATCH, max_rows - total_done))
            if not rows:
                break
            tasks = [verify_one(client, bank, r, sem) for r in rows]
            results = await asyncio.gather(*tasks)
            persist_results(results)

            total_done += len(results)
            total_cost += sum(r.cost for r in results)
            for r in results:
                if r.error:
                    errored += 1
                elif r.verdict == "correct" and (r.confidence or 0) >= HIGH_CONF:
                    verified += 1
                elif r.verdict in ("outdated", "none_of_options") and (r.confidence or 0) >= HIGH_CONF:
                    quarantined += 1
                else:
                    needs_tier2 += 1

            rate = total_done / max(time.time() - start, 0.1)
            log(
                f"[{bank}] batch done={total_done:>5}  cumulative verified={verified:>5}  "
                f"tier2={needs_tier2:>5}  quar={quarantined:>4}  err={errored:>3}  "
                f"cost=${total_cost:.4f}  {rate:.1f} mcq/s"
            )
            if max_rows and total_done >= max_rows:
                break

    return {
        "bank": bank, "done": total_done, "verified": verified,
        "needs_tier2": needs_tier2, "quarantined": quarantined,
        "errored": errored, "cost": total_cost,
    }


def preflight_openrouter() -> None:
    """One cheap call per model chain entry; fail fast on auth / no working model."""
    from scripts.pipeline.openrouter import chat_sync

    ping_user = "Q:2+2? A)3 B)4 C)5 D)6 Key:B"
    for model in MODEL_CHAIN:
        try:
            r = chat_sync(
                model=model,
                system=SYSTEM_PROMPT,
                user=ping_user,
                response_format={"type": "json_object"},
                max_tokens=MAX_TOKENS,
                timeout=45.0,
            )
            content = (r.get("content") or "").strip()
            parsed = parse_json_strict(content) or {}
            if parsed.get("verdict") or content.startswith("{"):
                log(f"preflight OK — model chain ready (first hit: {model})")
                return
            log(f"preflight weak response from {model}, trying next…")
        except RuntimeError as e:
            msg = str(e)
            log(f"preflight failed {model}: {msg[:120]}")
            if "402" in msg and os.environ.get("TIER1_PAID"):
                log("Paid model needs credits: https://openrouter.ai/settings/credits")
                raise SystemExit(2) from e
    log("WARNING: preflight could not confirm a model; continuing anyway (free tier may be rate-limited).")


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
        banks = list(BANKS)

    preflight_openrouter()

    banks = sorted(banks, key=lambda b: count_pending(b), reverse=True)

    log(f"== Tier-1 verifier start — models: {MODEL_CHAIN} ==")
    log(f"Banks (pending-first): {banks}")
    log(
        f"Max rows/bank: {max_rows or 'all'}  |  concurrency: {CONCURRENCY}  |  "
        f"batch: {BATCH}  |  max_tokens: {MAX_TOKENS}  |  text_cap: {TEXT_CAP}"
    )

    pending_rows: list[tuple[str, int]] = []
    for b in banks:
        n = count_pending(b)
        pending_rows.append((b, n))
        log(f"  pending {b}: {n}")
    total_pending = sum(n for _, n in pending_rows)
    log(f"TOTAL pending (unverified + needs_tier2): {total_pending}")

    grand = {"done": 0, "verified": 0, "needs_tier2": 0, "quarantined": 0, "errored": 0, "cost": 0.0}
    for b in banks:
        pending = count_pending(b)
        if pending == 0:
            log(f"--- skip {b} (0 pending) ---")
            continue
        log(f"--- starting bank: {b} ({pending} pending) ---")
        s = await run_bank(b, max_rows)
        for k in grand:
            grand[k] += s[k]
        log(f"--- finished bank: {b} — {s}")

    log("== TIER1 COMPLETE — summary ==")
    log(json.dumps(grand, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
