/**
 * Single place for “does this user have premium access right now?”
 * - Requires user_metadata.is_premium === true (boolean; string "true" is ignored)
 * - If expires_at is set and parses, access ends at that instant
 * - If expires_at is missing/empty/unparseable, or plan is lifetime → no time limit
 *   (unparseable dates fail OPEN so manual activations are not blocked by format quirks)
 */
import { parsePremiumExpiresAtMs } from '@/lib/parse-premium-expires-at'

export function isActivePremium(
  user: { user_metadata?: Record<string, unknown> | null } | null | undefined
): boolean {
  const m = user?.user_metadata
  if (!m || m.is_premium !== true) return false
  if (m.plan === 'lifetime') return true

  const expiryMs = parsePremiumExpiresAtMs(m.expires_at)
  if (expiryMs == null) return true
  return Date.now() < expiryMs
}
