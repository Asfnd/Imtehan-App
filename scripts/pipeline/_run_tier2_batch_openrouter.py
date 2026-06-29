"""Tier-2 style verifier: fetch offset/limit unverified rows (GK default), parallel OpenRouter calls, write via 11_verify_helper."""
from __future__ import annotations

import asyncio
import importlib.util
import json
import os
import sys
from dataclasses import dataclass
from pathlib import Path

import httpx
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env.local")
sys.path.insert(0, str(ROOT))


def _load_verify_helper():
    path = Path(__file__).parent / "11_verify_helper.py"
    spec = importlib.util.spec_from_file_location("vh11", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


vh = _load_verify_helper()
from scripts.pipeline.openrouter import BASE_URL, HEADERS, chat_async, parse_json_strict


CONCURRENCY = int(os.environ.get("TIER2_CONCURRENCY", "10"))
PER_TIMEOUT = float(os.environ.get("TIER2_MCQ_TIMEOUT", "90"))

SYSTEM_PROMPT = (
    "Verify MCQ answer key for PPSC general knowledge. Reply JSON only: "
    '{"verdict":"correct|wrong|outdated|ambiguous|none_of_options",'
    '"actual_answer":"A|B|C|D|none","confidence":0.0-1.0,'
    '"time_sensitive":false,"reason":"max twelve words"} '
    "Be strict; use ambiguous with confidence <0.85 if unsure."
)

USER_TEMPLATE = "Q:{q}\nA){a}\nB){b}\nC){c}\nD){d}\nStored key:{ans}"

TEXT_CAP = int(os.environ.get("TIER2_TEXT_CAP", "500"))


def _clip(text: str | None) -> str:
    s = (text or "").strip().replace("\n", " ")
    if len(s) > TEXT_CAP:
        return s[: TEXT_CAP - 3] + "..."
    return s or "?"


def _clip_reason(s: str, max_words: int = 12) -> str:
    w = (s or "").split()[:max_words]
    return " ".join(w)


def _norm_aa(x: str | None) -> str:
    if not x:
        return "none"
    t = str(x).strip().upper()
    if t.startswith("NONE") or t not in ("A", "B", "C", "D"):
        return "none"
    return t


@dataclass
class RowOut:
    bank: str
    mcq_id: int
    verdict: str
    actual_answer: str
    confidence: float
    time_sensitive: bool
    reason: str


def row_flat(bank: str, r: dict) -> dict:
    return {
        "id": r["id"],
        "question": r["question"],
        "option_a": r["options"]["A"],
        "option_b": r["options"]["B"],
        "option_c": r["options"]["C"],
        "option_d": r["options"]["D"],
        "correct_answer": r["stored_correct"],
    }


async def verify_one(
    client: httpx.AsyncClient, model: str, bank: str, r: dict, sem: asyncio.Semaphore
) -> RowOut:
    row = row_flat(bank, r)
    async with sem:
        user = USER_TEMPLATE.format(
            q=_clip(row.get("question")),
            a=_clip(row.get("option_a")),
            b=_clip(row.get("option_b")),
            c=_clip(row.get("option_c")),
            d=_clip(row.get("option_d")),
            ans=(row.get("correct_answer") or "?").strip().upper()[:1],
        )
        try:
            resp = await asyncio.wait_for(
                chat_async(
                    client,
                    model=model,
                    system=SYSTEM_PROMPT,
                    user=user,
                    response_format={"type": "json_object"},
                    temperature=0.0,
                    max_tokens=220,
                ),
                timeout=PER_TIMEOUT,
            )
            parsed = parse_json_strict(resp.get("content") or "") or {}
        except Exception:
            parsed = {}
        verdict = (parsed.get("verdict") or "ambiguous").lower()
        if verdict not in ("correct", "wrong", "outdated", "ambiguous", "none_of_options"):
            verdict = "ambiguous"
        aa_raw = parsed.get("actual_answer")
        aa = _norm_aa(aa_raw)
        try:
            conf = float(parsed["confidence"])
        except (TypeError, KeyError, ValueError):
            conf = 0.7
        ts = bool(parsed.get("time_sensitive"))
        reason = _clip_reason(str(parsed.get("reason") or ""))
        return RowOut(
            bank=bank,
            mcq_id=int(row["id"]),
            verdict=verdict,
            actual_answer=aa,
            confidence=conf,
            time_sensitive=ts,
            reason=reason or "no reason given",
        )


async def run_bank(bank: str, out_path: Path, limit: int, model: str) -> tuple[int, int]:
    offset = 0
    batches = 0
    with out_path.open("w", encoding="utf-8") as f:
        timeout = httpx.Timeout(120.0, connect=15.0)
        limits = httpx.Limits(max_keepalive_connections=CONCURRENCY, max_connections=CONCURRENCY)
        sem = asyncio.Semaphore(CONCURRENCY)
        async with httpx.AsyncClient(timeout=timeout, limits=limits, headers=HEADERS, base_url=BASE_URL) as client:
            while True:
                rows = vh.fetch_unverified(bank, offset, limit)
                if not rows:
                    break
                batches += 1
                tasks = [verify_one(client, model, bank, r, sem) for r in rows]
                results = await asyncio.gather(*tasks)
                for o in results:
                    f.write(
                        json.dumps(
                            {
                                "bank": o.bank,
                                "mcq_id": o.mcq_id,
                                "verdict": o.verdict,
                                "actual_answer": o.actual_answer,
                                "confidence": o.confidence,
                                "time_sensitive": o.time_sensitive,
                                "reason": o.reason,
                            },
                            ensure_ascii=False,
                        )
                        + "\n"
                    )
                n = len(rows)
                offset += n
                print(f"batch {batches}  +{n}  offset_now={offset}", flush=True)
    return batches, offset


def main() -> None:
    bank = sys.argv[1] if len(sys.argv) > 1 else "general_knowledge"
    out_path = Path(sys.argv[2] if len(sys.argv) > 2 else "/tmp/verify_gk.jsonl")
    limit = int(os.environ.get("TIER2_BATCH", "35"))
    model = os.environ.get("TIER2_VERIFY_MODEL", "openai/gpt-oss-20b:free")

    batches, lines = asyncio.run(run_bank(bank, out_path, limit, model))
    print(json.dumps({"batches": batches, "out": str(out_path), "lines": lines}, indent=2))
    summary = vh.write_decisions(
        json.loads(ln) for ln in out_path.read_text(encoding="utf-8").splitlines() if ln.strip()
    )
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
