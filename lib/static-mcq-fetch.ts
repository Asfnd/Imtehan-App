/**
 * Read pre-materialized MCQ sets from disk (/banks) or CDN.
 * Prefer this over live Supabase so Free Nano stays alive forever.
 *
 * Server / Node only. Client code must import flags from `@/lib/banks-flags`.
 */

import { promises as fs } from 'fs'
import path from 'path'
import {
  BANKS_VERSION,
  bankManifestUrl,
  bankPoolId,
  bankSetUrl,
  banksBaseUrl,
  type BankManifest,
  type BankPoolKey,
  type BankSetFile,
} from '@/lib/banks-pool'
import { allowSupabaseFallback, banksEnabled } from '@/lib/banks-flags'
import type { QuizMcqRow } from '@/lib/set-integrity'

function diskRoot(): string {
  return (
    process.env.BANKS_DIR ||
    path.join(process.cwd(), 'public', 'banks', BANKS_VERSION)
  )
}

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 12_000)
    try {
      const res = await fetch(url, {
        signal: ctrl.signal,
        headers: { Accept: 'application/json' },
        next: { revalidate: 604800 },
      } as RequestInit)
      if (!res.ok) return null
      return (await res.json()) as T
    } finally {
      clearTimeout(t)
    }
  } catch {
    return null
  }
}

export async function loadStaticBankSet(
  key: BankPoolKey,
  setNumber: number
): Promise<QuizMcqRow[] | null> {
  if (!banksEnabled() || setNumber < 1) return null
  const poolId = bankPoolId(key)

  const diskPath = path.join(diskRoot(), poolId, 's', `${setNumber}.json`)
  const fromDisk = await readJsonFile<BankSetFile>(diskPath)
  if (fromDisk?.mcqs?.length) return fromDisk.mcqs as QuizMcqRow[]

  const fromNet = await fetchJson<BankSetFile>(bankSetUrl(poolId, setNumber, banksBaseUrl()))
  if (fromNet?.mcqs?.length) return fromNet.mcqs as QuizMcqRow[]

  return null
}

export async function loadStaticBankManifest(key: BankPoolKey): Promise<BankManifest | null> {
  if (!banksEnabled()) return null
  const poolId = bankPoolId(key)

  const diskPath = path.join(diskRoot(), poolId, 'manifest.json')
  const fromDisk = await readJsonFile<BankManifest>(diskPath)
  if (fromDisk) return fromDisk

  return fetchJson<BankManifest>(bankManifestUrl(poolId, banksBaseUrl()))
}

export async function loadBankSetPreferStatic(
  key: BankPoolKey,
  setNumber: number,
  fallback: () => Promise<QuizMcqRow[]>
): Promise<QuizMcqRow[]> {
  const staticRows = await loadStaticBankSet(key, setNumber)
  if (staticRows && staticRows.length > 0) return staticRows
  if (!allowSupabaseFallback()) return []
  return fallback()
}

const PAGE = 20

/** Contiguous stem-deduped slice from set pages (MDCAT mocks / custom sizes). */
export async function loadStaticBankSlice(
  key: BankPoolKey,
  startIndex: number,
  count: number
): Promise<QuizMcqRow[] | null> {
  if (!banksEnabled() || count < 1 || startIndex < 0) return null
  const firstPage = Math.floor(startIndex / PAGE) + 1
  const lastPage = Math.floor((startIndex + count - 1) / PAGE) + 1
  const pages: QuizMcqRow[] = []
  for (let n = firstPage; n <= lastPage; n++) {
    const set = await loadStaticBankSet(key, n)
    if (!set?.length) return pages.length ? pages : null
    pages.push(...set)
  }
  const offsetInFirst = startIndex % PAGE
  const slice = pages.slice(offsetInFirst, offsetInFirst + count)
  return slice.length ? slice : null
}

/** First N unique MCQs from static pages (exam mock oversample for hash-pick). */
export async function loadStaticBankPrefix(
  key: BankPoolKey,
  need: number
): Promise<QuizMcqRow[] | null> {
  if (!banksEnabled() || need < 1) return null
  const man = await loadStaticBankManifest(key)
  if (!man?.setCount || !man.total) return null
  const pagesNeeded = Math.min(man.setCount, Math.ceil(need / PAGE) + 2)
  const out: QuizMcqRow[] = []
  for (let n = 1; n <= pagesNeeded && out.length < need; n++) {
    const set = await loadStaticBankSet(key, n)
    if (!set?.length) break
    out.push(...set)
  }
  return out.length >= Math.min(need, PAGE) ? out : null
}

export async function loadBankCountPreferStatic(
  key: BankPoolKey,
  fallback: () => Promise<number>
): Promise<number> {
  const man = await loadStaticBankManifest(key)
  // total===0 means a bad/empty export — never poison counts; fall through.
  if (man && Number.isFinite(man.total) && man.total > 0) return man.total
  if (!allowSupabaseFallback()) return man?.total ?? 0
  return fallback()
}

export { banksEnabled, allowSupabaseFallback } from '@/lib/banks-flags'
export { bankPoolId }
