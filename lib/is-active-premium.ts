/**
 * Single place for “does this user have premium access right now?”
 * - Requires user_metadata.is_premium === true
 * - If expires_at is set and parses, access ends at that instant (compare with Date.now())
 * - If expires_at is missing/empty, or plan is lifetime → no time limit
 */
export function isActivePremium(
  user: { user_metadata?: Record<string, unknown> | null } | null | undefined
): boolean {
  const m = user?.user_metadata
  if (!m || m.is_premium !== true) return false
  if (m.plan === 'lifetime') return true

  const raw = m.expires_at
  if (raw == null || raw === '') return true

  const ms = typeof raw === 'number' ? raw : Date.parse(String(raw).trim())
  if (Number.isNaN(ms)) return false
  return Date.now() < ms
}
