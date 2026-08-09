import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { noteSupabaseFailure, softMode } from '@/lib/supabase-soft'

const SOFT_REFRESH_TTL_MS = 30 * 60 * 1000
const JWT_REFRESH_SKEW_MS = 10 * 60 * 1000
let lastHardRefreshAt = 0

function jwtNeedsRefresh(expiresAtSec: number | undefined): boolean {
  if (!expiresAtSec) return false
  return expiresAtSec * 1000 - Date.now() < JWT_REFRESH_SKEW_MS
}

/**
 * Return the signed-in user. Soft by default (cached session) to avoid Auth
 * refresh storms that burn free-tier limits. Pass `{ forceRefresh: true }` on
 * premium / paywall surfaces when metadata must be re-read from Auth.
 */
export async function getFreshAuthUser(opts?: {
  forceRefresh?: boolean
}): Promise<User | null> {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    // Soft mode: never cold-call getUser() when Auth/DB is overloaded.
    if (softMode()) return null
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) noteSupabaseFailure(error)
      return user ?? null
    } catch (e) {
      noteSupabaseFailure(e)
      return null
    }
  }

  // Soft mode: trust local JWT only — no refresh / getUser round-trips.
  if (softMode()) return session.user

  const force = !!opts?.forceRefresh
  const stale = Date.now() - lastHardRefreshAt > SOFT_REFRESH_TTL_MS
  const expiring = jwtNeedsRefresh(session.expires_at)

  if (force || stale || expiring) {
    lastHardRefreshAt = Date.now()
    try {
      const { data: refreshed, error } = await supabase.auth.refreshSession()
      if (!error && refreshed.session?.user) {
        return refreshed.session.user
      }
      if (error) noteSupabaseFailure(error)
      const { data: { user }, error: userErr } = await supabase.auth.getUser()
      if (userErr) noteSupabaseFailure(userErr)
      return user ?? session.user ?? null
    } catch (e) {
      noteSupabaseFailure(e)
      return session.user
    }
  }

  return session.user
}
