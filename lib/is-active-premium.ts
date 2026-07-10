/**
 * Single place for “does this user have premium access right now?”
 * - Requires user_metadata.is_premium === true (boolean; string "true" is ignored)
 * - plan === 'lifetime' → always active (explicit lifetime only)
 * - Timed plans require a parseable expires_at in the future
 * - Missing / empty / unparseable expires_at → NOT premium (fail closed)
 *   so one-time activations without expiry cannot grant forever access by accident
 */
import { parsePremiumExpiresAtMs } from '@/lib/parse-premium-expires-at'

export function isActivePremium(
  user: { user_metadata?: Record<string, unknown> | null } | null | undefined
): boolean {
  const m = user?.user_metadata
  if (!m || m.is_premium !== true) return false
  if (m.plan === 'lifetime') return true

  const expiryMs = parsePremiumExpiresAtMs(m.expires_at)
  if (expiryMs == null) return false
  return Date.now() < expiryMs
}
