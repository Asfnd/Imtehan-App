/**
 * Read pre-materialized MCQ sets from disk (/banks) or CDN.
 * Prefer this over live Supabase so Free Nano stays alive forever.
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
import type { QuizMcqRow } from '@/lib/set-integrity'

function banksEnabled(): boolean {
  // Default ON — set BANKS_STATIC=0 to force live Supabase reads.
  return process.env.BANKS_STATIC !== '0'
}

function allowSupabaseFallback(): boolean {
  return process.env.BANKS_FALLBACK_SUPABASE !== '0'
}

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

export { banksEnabled, allowSupabaseFallback, bankPoolId }
