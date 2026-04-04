#!/usr/bin/env python3
"""
Unified AI MCQ generator for all major exam families in this repo.

Providers (OpenAI-compatible API):
  - Groq (default):  LLM_BASE_URL=https://api.groq.com/openai/v1
  - OpenRouter:      LLM_BASE_URL=https://openrouter.ai/api/v1
                     Optional: OPENROUTER_HTTP_REFERER, OPENROUTER_APP_NAME

Auth: set ONE of
  LLM_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY

Model: LLM_MODEL (e.g. meta-llama/llama-3.3-70b-versatile, openai/gpt-4o-mini)

Examples:
  python scripts/exam_mcq_factory.py list --exam css
  python scripts/exam_mcq_factory.py generate --exam css --subject English \\
      --topic "Parts of speech" --mcq-type most_repeated --batch-size 15

  python scripts/exam_mcq_factory.py generate --exam mdcat --subject Biology \\
      --topic Enzymes --mcq-type topic_wise --batch-size 20

  python scripts/exam_mcq_factory.py generate --exam engineering \\
      --subject Mathematics --topic Differentiation --mcq-type past_paper_pattern

Outputs:
  css      → AI_MCQ_Output/css/{most_repeated|most_important|practice}/<Subject>.csv
  mdcat    → MDCAT_Master_Bank/<Subject>/<Topic>/mcqs.csv  (same as mdcat_factory)
  engineering → Engineering_Master_Bank/.../mcqs.csv (same as engineering_factory)
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path
from typing import Any, Literal

import pandas as pd
from pydantic import BaseModel, Field
from openai import OpenAI

REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPTS_DIR = Path(__file__).resolve().parent
for p in (REPO_ROOT, SCRIPTS_DIR):
    if str(p) not in sys.path:
        sys.path.insert(0, str(p))

from exam_mcq_profiles import (  # noqa: E402
    CSS_PPSC_SUBJECT_TOPICS,
    ENGINEERING_STYLE_CYCLE,
    MCQ_TYPE_BRIEF,
)

# ── Optional: MDCAT / Engineering syllabi from existing factories ─────────────


def _load_mdcat():
    import mdcat_factory as m

    return m


def _load_engineering():
    import engineering_factory as e

    return e


# ── Schema (shared) ───────────────────────────────────────────────────────────


class MCQ(BaseModel):
    question: str = Field(description="Exam-style stem; avoid lazy 'which is correct' shells.")
    option_a: str = Field(description="Distinct plausible distractor or correct.")
    option_b: str = Field(description="Distinct plausible distractor or correct.")
    option_c: str = Field(description="Distinct plausible distractor or correct.")
    option_d: str = Field(description="Distinct plausible distractor or correct.")
    correct_answer: Literal["A", "B", "C", "D"]
    explanation: str = Field(description="Why correct + why best wrong option tempts.")
    subtopic: str = Field(description="Fine label inside the topic.")
    difficulty: Literal["Easy", "Medium", "Hard"]


class MCQBatch(BaseModel):
    mcqs: list[MCQ]


def get_llm_client() -> tuple[OpenAI, str]:
    key = (
        os.environ.get("LLM_API_KEY")
        or os.environ.get("GROQ_API_KEY")
        or os.environ.get("OPENROUTER_API_KEY")
    )
    if not key:
        print(
            "Missing API key. Set LLM_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY.",
            file=sys.stderr,
        )
        sys.exit(1)

    base = os.environ.get("LLM_BASE_URL")
    if not base:
        base = "https://api.groq.com/openai/v1"

    headers: dict[str, str] = {}
    ref = os.environ.get("OPENROUTER_HTTP_REFERER")
    app = os.environ.get("OPENROUTER_APP_NAME")
    if ref:
        headers["HTTP-Referer"] = ref
    if app:
        headers["X-Title"] = app

    model = os.environ.get("LLM_MODEL", "meta-llama/llama-3.3-70b-versatile")
    client = OpenAI(api_key=key, base_url=base, default_headers=headers or None)
    return client, model


_BANNED = {"all of the above", "none of the above", "all of these", "none of these"}


def quality_filter(mcqs: list[MCQ]) -> tuple[list[MCQ], int]:
    clean, dropped = [], 0
    for mcq in mcqs:
        stem = mcq.question.strip().lower()
        opts = [
            mcq.option_a.strip().lower(),
            mcq.option_b.strip().lower(),
            mcq.option_c.strip().lower(),
            mcq.option_d.strip().lower(),
        ]
        expl = mcq.explanation.strip()
        if len(stem.split()) < 5:
            dropped += 1
            continue
        if any(o in _BANNED for o in opts):
            dropped += 1
            continue
        if len(set(opts)) < 4:
            dropped += 1
            continue
        if len(expl.split()) < 6:
            dropped += 1
            continue
        clean.append(mcq)
    return clean, dropped


def build_user_prompt(
    *,
    exam_label: str,
    subject: str,
    topic: str,
    mcq_type: str,
    batch_size: int,
    extra_rules: str = "",
    style_tag: str | None = None,
) -> str:
    type_line = MCQ_TYPE_BRIEF.get(mcq_type, MCQ_TYPE_BRIEF["practice"])
    style_line = f"\nExam / style tag: {style_tag}\n" if style_tag else ""
    return f"""You are a senior item writer for: {exam_label}.

Subject: {subject}
Topic / sub-focus: {topic}
Generation brief (MCQ type): {type_line}
{style_line}
{extra_rules}

Generate exactly {batch_size} four-option MCQs.
Rules:
- One unambiguous correct answer (letter A–D).
- Distractors same conceptual family as the key; no "All/None of the above".
- Explanations: correct rationale + why the strongest wrong option tempts.
- Tag each item with subtopic and difficulty (Easy/Medium/Hard).
- Return ONLY valid JSON object with key "mcqs" and an array of objects with keys:
  question, option_a, option_b, option_c, option_d, correct_answer, explanation, subtopic, difficulty.
"""


def call_model(client: OpenAI, model: str, user_prompt: str) -> list[MCQ]:
    res = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": "Return ONLY valid JSON — no markdown fences, no preamble.",
            },
            {"role": "user", "content": user_prompt},
        ],
        response_format={"type": "json_object"},
        temperature=0.72,
        max_tokens=8192,
    )
    content = res.choices[0].message.content
    if not content:
        raise ValueError("Empty model response")
    return MCQBatch.model_validate_json(content).mcqs


# ── Output paths ──────────────────────────────────────────────────────────────


def css_output_path(mcq_type: str, subject: str) -> Path:
    safe = re.sub(r"[^\w\-]+", "_", mcq_type)
    folder = REPO_ROOT / "AI_MCQ_Output" / "css" / safe
    folder.mkdir(parents=True, exist_ok=True)
    return folder / f"{subject}.csv"


def load_css_seen(path: Path) -> set[str]:
    if not path.exists():
        return set()
    try:
        df = pd.read_csv(path)
        col = next((c for c in df.columns if c.lower() == "question"), None)
        if not col:
            return set()
        return set(df[col].dropna().astype(str).str.strip().str.lower().str[:80])
    except Exception:
        return set()


def append_css_csv(path: Path, rows: list[dict[str, Any]], mcq_type: str) -> None:
    for r in rows:
        r["Mcq_type"] = mcq_type
    df = pd.DataFrame(rows)
    # Match import-mcqs-to-supabase.ts expectations
    rename = {
        "question": "Question",
        "option_a": "Option_A",
        "option_b": "Option_B",
        "option_c": "Option_C",
        "option_d": "Option_D",
        "correct_answer": "Correct_Answer",
        "explanation": "Explanation",
        "subtopic": "Subtopic",
        "difficulty": "Difficulty",
    }
    out = df.rename(columns={k: v for k, v in rename.items() if k in df.columns})
    mode = "a" if path.exists() else "w"
    out.to_csv(path, mode=mode, header=(mode == "w"), index=False, encoding="utf-8-sig")


def append_mdcat(mcqs: list[MCQ], subject: str, topic: str) -> None:
    m = _load_mdcat()
    rows = []
    for x in mcqs:
        d = x.model_dump()
        d["subject"] = subject
        d["topic"] = topic
        rows.append(d)
    df = pd.DataFrame(rows)
    df.columns = [c.capitalize() for c in df.columns]
    p = Path(m.topic_path(subject, topic))
    p.parent.mkdir(parents=True, exist_ok=True)
    mode = "a" if p.exists() else "w"
    df.to_csv(p, mode=mode, header=(mode == "w"), index=False)


def append_engineering(
    mcqs: list[MCQ], subject: str, topic: str, style: str, mcq_type: str
) -> None:
    e = _load_engineering()
    rows = []
    for x in mcqs:
        rows.append(
            {
                "Question": e.sanitize_for_excel(x.question),
                "Option_a": e.sanitize_for_excel(x.option_a),
                "Option_b": e.sanitize_for_excel(x.option_b),
                "Option_c": e.sanitize_for_excel(x.option_c),
                "Option_d": e.sanitize_for_excel(x.option_d),
                "Correct_answer": x.correct_answer,
                "Explanation": e.sanitize_for_excel(x.explanation),
                "Target_exam": style,
                "Question_type": f"{mcq_type}:{x.subtopic}",
                "Difficulty": x.difficulty,
                "Subject": subject,
                "Topic": topic,
            }
        )
    df = pd.DataFrame(rows)
    p = Path(e.topic_path(subject, topic))
    p.parent.mkdir(parents=True, exist_ok=True)
    mode = "a" if p.exists() else "w"
    df.to_csv(p, mode=mode, header=(mode == "w"), index=False, encoding="utf-8-sig")


# ── Commands ──────────────────────────────────────────────────────────────────


def cmd_list(args: argparse.Namespace) -> None:
    exam = args.exam
    if exam == "css":
        for sub, tops in sorted(CSS_PPSC_SUBJECT_TOPICS.items()):
            print(f"\n{sub}")
            for t in tops:
                print(f"  - {t}")
    elif exam == "mdcat":
        m = _load_mdcat()
        for sub, tops in m.SYLLABUS.items():
            print(f"\n{sub} ({len(tops)} topics)")
            for t in tops:
                tgt = m.TOPIC_TARGETS.get(t, "?")
                print(f"  - {t}  (bank target ~{tgt})")
    elif exam == "engineering":
        e = _load_engineering()
        for sub, tops in e.SYLLABUS.items():
            print(f"\n{sub} ({len(tops)} topics)")
            for t in tops:
                print(f"  - {t}")
    else:
        print("Unknown exam", file=sys.stderr)
        sys.exit(1)


def cmd_generate(args: argparse.Namespace) -> None:
    client, model = get_llm_client()
    exam = args.exam
    batch_size = args.batch_size
    mcq_type = args.mcq_type
    subject = args.subject
    topic = args.topic

    if exam == "css":
        if subject not in CSS_PPSC_SUBJECT_TOPICS:
            print(f"Unknown CSS subject. Choose one of: {list(CSS_PPSC_SUBJECT_TOPICS)}", file=sys.stderr)
            sys.exit(1)
        exam_label = "PPSC / FPSC / CSS compulsory MCQ (Pakistan)"
        extra = (
            "Use Pakistan-specific context where relevant (institutions, spelling, conventions). "
            "English stems in formal register unless the subject is Urdu."
        )
        if subject == "Urdu":
            extra += " For Urdu subject, stems and options may be in Urdu script where natural."
        path = css_output_path(mcq_type, subject)
        seen = load_css_seen(path)
        prompt = build_user_prompt(
            exam_label=exam_label,
            subject=subject.replace("_", " "),
            topic=topic,
            mcq_type=mcq_type,
            batch_size=batch_size,
            extra_rules=extra,
        )
        raw = call_model(client, model, prompt)
        good, dropped = quality_filter(raw)
        rows_out = []
        for x in good:
            key = x.question.strip().lower()[:80]
            if key in seen:
                continue
            seen.add(key)
            rows_out.append(x.model_dump())
        if rows_out:
            append_css_csv(path, rows_out, mcq_type)
        print(f"Saved {len(rows_out)} rows to {path} ({dropped} quality-dropped in batch)")

    elif exam == "mdcat":
        m = _load_mdcat()
        if subject not in m.SYLLABUS:
            print("Unknown MDCAT subject", file=sys.stderr)
            sys.exit(1)
        if topic not in m.SYLLABUS[subject]:
            print("Unknown topic for subject", file=sys.stderr)
            sys.exit(1)
        strat = m.SUBJECT_STRATS.get(subject, m.SUBJECT_STRATS["Biology"])[0]
        user = m.build_prompt(subject, topic, strat, 1, m.TOPIC_TARGETS.get(topic, 200))
        user = user.replace(f"exactly {m.BATCH_SIZE} high-yield", f"exactly {batch_size} high-yield")
        user += "\n\nADDITIONAL BATCH FOCUS:\n" + MCQ_TYPE_BRIEF.get(mcq_type, MCQ_TYPE_BRIEF["practice"])
        res = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Return ONLY valid JSON — no markdown.\n"
                        '{"mcqs": [{"question","option_a","option_b","option_c","option_d",'
                        '"correct_answer","explanation","subtopic","difficulty"}, ...]}'
                    ),
                },
                {"role": "user", "content": user},
            ],
            response_format={"type": "json_object"},
            temperature=0.75,
            max_tokens=8192,
        )
        content = res.choices[0].message.content or ""
        raw = MCQBatch.model_validate_json(content).mcqs
        good, dropped = quality_filter(raw)
        append_mdcat(good[:batch_size], subject, topic)
        print(f"Appended {min(len(good), batch_size)} MCQs via MDCAT pipeline ({dropped} dropped). Model={model}")

    elif exam == "engineering":
        e = _load_engineering()
        if subject not in e.SYLLABUS:
            print("Unknown engineering subject", file=sys.stderr)
            sys.exit(1)
        if topic not in e.SYLLABUS[subject]:
            print("Unknown topic", file=sys.stderr)
            sys.exit(1)
        style = args.engineering_style or ENGINEERING_STYLE_CYCLE[0]
        exam_label = f"Pakistan engineering entrance ({style})"
        extra = MCQ_TYPE_BRIEF.get(mcq_type, "") + "\n" + (
            "No LaTeX; use plain math symbols. Space fractions like '1 / 2' for CSV safety."
        )
        prompt = build_user_prompt(
            exam_label=exam_label,
            subject=subject,
            topic=topic,
            mcq_type=mcq_type,
            batch_size=batch_size,
            extra_rules=extra,
            style_tag=style,
        )
        raw = call_model(client, model, prompt)
        good, dropped = quality_filter(raw)
        append_engineering(good[:batch_size], subject, topic, style, mcq_type)
        print(f"Appended {min(len(good), batch_size)} rows ({dropped} dropped). Style={style} Model={model}")

    else:
        print("Unknown exam", file=sys.stderr)
        sys.exit(1)

    time.sleep(1)


def main() -> None:
    p = argparse.ArgumentParser(description="Unified exam MCQ generator (Groq or OpenRouter).")
    sub = p.add_subparsers(dest="cmd", required=True)

    pl = sub.add_parser("list", help="List subjects/topics for an exam")
    pl.add_argument("--exam", required=True, choices=["css", "mdcat", "engineering"])
    pl.set_defaults(func=cmd_list)

    pg = sub.add_parser("generate", help="Generate one batch")
    pg.add_argument("--exam", required=True, choices=["css", "mdcat", "engineering"])
    pg.add_argument("--subject", required=True, help="Subject key (e.g. English, Biology, Mathematics)")
    pg.add_argument("--topic", required=True, help="Topic or subtopic label")
    pg.add_argument(
        "--mcq-type",
        default="practice",
        choices=list(MCQ_TYPE_BRIEF.keys()),
        help="Aligns with app types: most_repeated, most_important, practice; plus past_paper_pattern, topic_wise",
    )
    pg.add_argument("--batch-size", type=int, default=20)
    pg.add_argument(
        "--engineering-style",
        choices=ENGINEERING_STYLE_CYCLE,
        help="NET / ECAT / GIKI_PIEAS / LUMS_SAT (engineering only)",
    )
    pg.set_defaults(func=cmd_generate)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
