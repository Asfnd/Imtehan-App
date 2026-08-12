/**
 * Free-tier circuit breaker: skip non-essential Supabase work when Auth/DB is dying.
 *
 * - SUPABASE_SOFT_MODE=1 / NEXT_PUBLIC_SUPABASE_SOFT_MODE=1 → force soft (counts/auth spam only)
 * - Auto-trips on timeouts for hours so Nano can recover
 * - clearSoftMode() / probeAndMaybeClearSoft() when ENV is off and DB is healthy again
 */

const ENV_ON =
  process.env.NEXT_PUBLIC_SUPABASE_SOFT_MODE === '1' ||
  process.env.SUPABASE_SOFT_MODE === '1'

/** Brief soft after boot so deploys don't stampede a recovering Nano. */
const BOOT_SOFT_MS = 5 * 60_000
const TRIP_MS = 2 * 60 * 60_000

let trippedUntil = Date.now() + BOOT_SOFT_MS
let probing = false

const FAIL_RE =
  /timeout|timed out|context deadline|503|502|504|522|524|525|overloaded|connection terminated|ECONNRESET|fetch failed|Failed to fetch|JWT|AuthRetryable|network/i

export function softMode(): boolean {
  return ENV_ON || Date.now() < trippedUntil
}

export function tripSoftMode(ms = TRIP_MS): void {
  const until = Date.now() + ms
  if (until > trippedUntil) trippedUntil = until
}

export function clearSoftMode(): void {
  if (!ENV_ON) trippedUntil = 0
}

export function noteSupabaseFailure(e: unknown): void {
  const msg = String(
    (e as { message?: string })?.message ??
      (e as { error_description?: string })?.error_description ??
      e
  )
  if (FAIL_RE.test(msg)) tripSoftMode()
}

export function wrapSoft<T>(fallback: T, run: () => Promise<T>): Promise<T> {
  if (softMode()) return Promise.resolve(fallback)
  return run().catch((e) => {
    noteSupabaseFailure(e)
    return fallback
  })
}

/** Thrown inside unstable_cache factories so soft misses do not poison the cache with zeros. */
export class SoftSkipError extends Error {
  constructor() {
    super('SOFT_SKIP')
    this.name = 'SoftSkipError'
  }
}

export function isSoftSkip(e: unknown): boolean {
  return e instanceof SoftSkipError || (e as Error)?.name === 'SoftSkipError' || String((e as Error)?.message) === 'SOFT_SKIP'
}

/**
 * Prefer warm Next.js cache (real counts) even while soft.
 * Only skips a cold DB hit — never writes zeros into the 7d cache.
 */
export async function withSoftCache<T>(fallback: T, run: () => Promise<T>): Promise<T> {
  try {
    return await run()
  } catch (e) {
    if (isSoftSkip(e)) return fallback
    noteSupabaseFailure(e)
    return fallback
  }
}

/**
 * Cheap Auth health probe. Only clears auto soft when ENV is not forcing soft.
 * Safe to call from a cron / admin / health route.
 */
export async function probeAndMaybeClearSoft(): Promise<{
  soft: boolean
  healthy: boolean
  forced: boolean
}> {
  const forced = ENV_ON
  if (forced) return { soft: true, healthy: false, forced: true }
  if (probing) return { soft: softMode(), healthy: false, forced: false }
  probing = true
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return { soft: softMode(), healthy: false, forced: false }

    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 4000)
    try {
      const res = await fetch(`${url}/auth/v1/health`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        signal: ctrl.signal,
        cache: 'no-store',
      })
      const healthy = res.ok
      if (healthy) clearSoftMode()
      else tripSoftMode()
      return { soft: softMode(), healthy, forced: false }
    } finally {
      clearTimeout(timer)
    }
  } catch (e) {
    noteSupabaseFailure(e)
    return { soft: true, healthy: false, forced: false }
  } finally {
    probing = false
  }
}

/** Soft count/stats JSON — short edge TTL so CF can absorb repeat hub hits. */
export const SOFT_API_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  'X-Imtehan-Soft': '1',
} as const
