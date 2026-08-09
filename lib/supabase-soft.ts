/**
 * Free-tier circuit breaker: skip non-essential Supabase work when Auth/DB is dying.
 * Env NEXT_PUBLIC_SUPABASE_SOFT_MODE=1 forces soft mode. Otherwise auto-trips on timeouts.
 */

const ENV_ON =
  process.env.NEXT_PUBLIC_SUPABASE_SOFT_MODE === '1' ||
  process.env.SUPABASE_SOFT_MODE === '1'

/** Start soft for 45m after each deploy so Nano can recover from count storms. */
let trippedUntil = Date.now() + 45 * 60_000

const FAIL_RE =
  /timeout|timed out|context deadline|503|502|504|522|524|525|overloaded|connection terminated|ECONNRESET|fetch failed|Failed to fetch|JWT|AuthRetryable|network/i

export function softMode(): boolean {
  return ENV_ON || Date.now() < trippedUntil
}

export function tripSoftMode(ms = 20 * 60_000): void {
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
