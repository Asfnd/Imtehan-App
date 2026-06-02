'use client'

// Quiz completion tracking for the green "completed" badge.
//
// Two layers, so it works for everyone:
//   • localStorage — instant, and the only store for guests.
//   • Supabase `quiz_completions` (via mark_completion RPC) — for signed-in users,
//     so progress syncs across devices/accounts. RLS scopes rows to the current user.
//
// Both layers are keyed the same way:
//   scope = a stable string identifying ONE list of cards
//           e.g. "mdcat:biology:easy", "mpt:live", "css:Constitutional Law"
//   item  = a stable id for a card in that list (a set number, test number, year, …)
//
// Mirrors the older per-flow keys on the /exams pages
// (imtehan_set_done_* / imtehan_mock_done_*).

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type CompletionMap = Record<string, number>

const PREFIX = 'imtehan_done_'

function storageKey(scope: string): string {
  return `${PREFIX}${scope}`
}

function clampPct(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)))
}

/** Merge two maps keeping the higher score per item. */
function mergeBest(a: CompletionMap, b: CompletionMap): CompletionMap {
  const out: CompletionMap = { ...a }
  for (const [k, v] of Object.entries(b)) {
    if (out[k] == null || v > out[k]) out[k] = v
  }
  return out
}

/** Read local completions for a scope as { [itemId]: bestScorePct }. Safe on the server. */
export function readCompletions(scope: string): CompletionMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(storageKey(scope))
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    const out: CompletionMap = {}
    for (const [k, v] of Object.entries(parsed)) {
      const n = Number(v)
      if (!Number.isNaN(n)) out[k] = n
    }
    return out
  } catch {
    return {}
  }
}

/** Fetch completions for a scope from the DB (signed-in users only). Empty for guests. */
export async function fetchRemoteCompletions(scope: string): Promise<CompletionMap> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return {}
    const { data, error } = await supabase
      .from('quiz_completions')
      .select('item, score_pct')
      .eq('scope', scope)
    if (error || !data) return {}
    const out: CompletionMap = {}
    for (const row of data) {
      const pct = Number(row.score_pct)
      out[String(row.item)] = Number.isNaN(pct) ? 0 : pct
    }
    return out
  } catch {
    return {}
  }
}

/**
 * Mark an item completed. Writes localStorage immediately (best score kept) and,
 * for signed-in users, upserts to the DB in the background (fire-and-forget).
 */
export function markCompleted(scope: string, item: string | number, scorePct: number): void {
  const id = String(item)
  const pct = clampPct(scorePct)

  if (typeof window !== 'undefined') {
    try {
      const stored = readCompletions(scope)
      if (stored[id] == null || pct > stored[id]) stored[id] = pct
      localStorage.setItem(storageKey(scope), JSON.stringify(stored))
    } catch {
      /* storage unavailable — silent */
    }
  }

  // Background DB sync; never blocks the UI and never throws.
  try {
    const supabase = createClient()
    void supabase.rpc('mark_completion', { p_scope: scope, p_item: id, p_score: pct })
  } catch {
    /* offline / no client — local copy still recorded */
  }
}

/** True if the given item has a local completion. */
export function isCompleted(scope: string, item: string | number): boolean {
  return readCompletions(scope)[String(item)] != null
}

/**
 * React hook: completions for a scope, local-first then merged with the DB.
 * Pass null to disable (e.g. before a subject is selected). Returns {} until loaded.
 */
export function useCompletions(scope: string | null | undefined): CompletionMap {
  const [map, setMap] = useState<CompletionMap>({})

  useEffect(() => {
    if (!scope) {
      setMap({})
      return
    }
    let cancelled = false
    // 1. Instant local copy.
    setMap(readCompletions(scope))
    // 2. Merge the authoritative DB copy for signed-in users.
    fetchRemoteCompletions(scope).then((remote) => {
      if (cancelled || !remote || Object.keys(remote).length === 0) return
      setMap((prev) => mergeBest(prev, remote))
    })
    return () => {
      cancelled = true
    }
  }, [scope])

  return map
}
