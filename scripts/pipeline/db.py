"""Shared Supabase client and Postgres connection for pipeline scripts.

Reads SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from quiz-app/.env.local.
Use the `sb` client for ORM-style table ops, and `pg` for raw SQL.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client, Client

ROOT = Path(__file__).resolve().parents[2]  # quiz-app/
load_dotenv(ROOT / ".env.local")

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SERVICE_KEY:
    print("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local", file=sys.stderr)
    sys.exit(1)


def get_client() -> Client:
    return create_client(SUPABASE_URL, SERVICE_KEY)


sb: Client = get_client()


import json
import re

import httpx  # already installed via supabase-py

# Supabase Management API — used for raw SQL / DDL.
# Auth = Personal Access Token (sbp_...) stored in ~/.claude.json under mcpServers.supabase.env.SUPABASE_ACCESS_TOKEN
_PROJECT_REF = None
_SBP_TOKEN = None


def _load_management_creds():
    global _PROJECT_REF, _SBP_TOKEN
    if _PROJECT_REF and _SBP_TOKEN:
        return
    home_cfg = Path.home() / ".claude.json"
    cfg = json.loads(home_cfg.read_text())
    sb_mcp = cfg.get("mcpServers", {}).get("supabase", {})
    token = sb_mcp.get("env", {}).get("SUPABASE_ACCESS_TOKEN")
    args = sb_mcp.get("args", [])
    ref = None
    for a in args:
        m = re.match(r"--project-ref=(.+)", a)
        if m:
            ref = m.group(1)
            break
    if not ref:
        # also accept env override
        ref = os.environ.get("SUPABASE_PROJECT_REF")
    if not token:
        token = os.environ.get("SUPABASE_ACCESS_TOKEN")
    if not (ref and token):
        raise RuntimeError("Could not locate Supabase project-ref or personal access token")
    _PROJECT_REF = ref
    _SBP_TOKEN = token


def pg_query(sql: str) -> list[dict]:
    """Execute arbitrary SQL via the Supabase Management API.

    Returns list of row dicts. Use for DDL and any query the supabase-py SDK can't express.
    """
    _load_management_creds()
    url = f"https://api.supabase.com/v1/projects/{_PROJECT_REF}/database/query"
    resp = httpx.post(
        url,
        json={"query": sql},
        headers={"Authorization": f"Bearer {_SBP_TOKEN}"},
        timeout=180.0,
    )
    if resp.status_code >= 400:
        raise RuntimeError(f"Supabase mgmt API HTTP {resp.status_code}: {resp.text}")
    if not resp.content:
        return []
    parsed = resp.json()
    if isinstance(parsed, list):
        return parsed
    return [parsed] if parsed else []


if __name__ == "__main__":
    r = sb.table("current_affairs").select("id", count="exact").limit(1).execute()
    print(f"sb client OK: current_affairs count={r.count}")
    rows = pg_query("select count(*) as n from current_affairs;")
    print(f"pg_query OK: {rows}")
