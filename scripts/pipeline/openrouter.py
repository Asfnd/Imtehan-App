"""Tiny async OpenRouter client used across the verification and generation stages.

Reads OPENROUTER_API_KEY from .env.local.
"""
from __future__ import annotations

import json
import os
import time
from pathlib import Path
from typing import Any

import httpx
from dotenv import load_dotenv

# Ensure .env.local is loaded regardless of import order.
load_dotenv(Path(__file__).resolve().parents[2] / ".env.local")

BASE_URL = os.environ.get("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
API_KEY = os.environ.get("OPENROUTER_API_KEY")
APP_URL = os.environ.get("OPENROUTER_HTTP_REFERER", "https://imtehan.com")
APP_NAME = os.environ.get("OPENROUTER_APP_NAME", "imtehan-pipeline")

if not API_KEY:
    raise RuntimeError("OPENROUTER_API_KEY missing in env")


HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "HTTP-Referer": APP_URL,
    "X-Title": APP_NAME,
    "Content-Type": "application/json",
}


def chat_sync(
    model: str,
    system: str,
    user: str,
    *,
    response_format: dict | None = None,
    temperature: float = 0.0,
    max_tokens: int = 1024,
    timeout: float = 60.0,
    extra: dict | None = None,
) -> dict[str, Any]:
    """One-shot chat completion. Returns {content, raw, usage}."""
    body: dict[str, Any] = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": temperature,
        "max_tokens": max_tokens,
    }
    if response_format is not None:
        body["response_format"] = response_format
    if extra:
        body.update(extra)

    last_err: Exception | None = None
    for attempt in range(4):
        try:
            r = httpx.post(
                f"{BASE_URL}/chat/completions", json=body, headers=HEADERS, timeout=timeout
            )
            if r.status_code == 429 or r.status_code >= 500:
                # backoff and retry on rate limit / server errors
                time.sleep(2 ** attempt)
                continue
            if r.status_code >= 400:
                raise RuntimeError(f"OpenRouter HTTP {r.status_code}: {r.text[:500]}")
            data = r.json()
            choices = data.get("choices") or []
            content = ""
            if choices:
                msg = choices[0].get("message") or {}
                content = msg.get("content") or ""
            return {
                "content": content,
                "raw": data,
                "usage": data.get("usage", {}),
                "model": data.get("model", model),
            }
        except httpx.RequestError as e:
            last_err = e
            time.sleep(2 ** attempt)
    raise RuntimeError(f"OpenRouter call failed after retries: {last_err}")


async def chat_async(
    client: httpx.AsyncClient,
    model: str,
    system: str,
    user: str,
    *,
    response_format: dict | None = None,
    temperature: float = 0.0,
    max_tokens: int = 1024,
    extra: dict | None = None,
) -> dict[str, Any]:
    body: dict[str, Any] = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": temperature,
        "max_tokens": max_tokens,
    }
    if response_format is not None:
        body["response_format"] = response_format
    if extra:
        body.update(extra)

    last_err: Exception | None = None
    import asyncio
    for attempt in range(4):
        try:
            r = await client.post(
                f"{BASE_URL}/chat/completions", json=body, headers=HEADERS,
            )
            if r.status_code == 429 or r.status_code >= 500:
                await asyncio.sleep(2 ** attempt)
                continue
            if r.status_code >= 400:
                raise RuntimeError(f"OpenRouter HTTP {r.status_code}: {r.text[:500]}")
            data = r.json()
            choices = data.get("choices") or []
            content = ""
            if choices:
                msg = choices[0].get("message") or {}
                content = msg.get("content") or ""
            return {
                "content": content,
                "raw": data,
                "usage": data.get("usage", {}),
                "model": data.get("model", model),
            }
        except httpx.RequestError as e:
            last_err = e
            await asyncio.sleep(2 ** attempt)
    raise RuntimeError(f"OpenRouter call failed after retries: {last_err}")


def parse_json_strict(content: str) -> dict | None:
    """Try to parse a model's JSON response, stripping any markdown code fences."""
    s = content.strip()
    if s.startswith("```"):
        s = s.strip("`")
        first_nl = s.find("\n")
        if first_nl > 0 and s[:first_nl].lower().startswith("json"):
            s = s[first_nl + 1:]
        # also strip trailing ```
        s = s.rstrip("`").strip()
    try:
        return json.loads(s)
    except json.JSONDecodeError:
        # Try to find {...} inside the text
        i, j = s.find("{"), s.rfind("}")
        if 0 <= i < j:
            try:
                return json.loads(s[i:j + 1])
            except json.JSONDecodeError:
                return None
        return None


if __name__ == "__main__":
    from scripts.pipeline.db import sb  # noqa: F401  (ensure env loaded)

    r = chat_sync(
        model="google/gemini-2.0-flash-001",
        system="Reply with one JSON object: {\"ok\": true}",
        user="ping",
        response_format={"type": "json_object"},
        max_tokens=32,
    )
    print(f"model={r['model']}  content={r['content']!r}  usage={r['usage']}")
