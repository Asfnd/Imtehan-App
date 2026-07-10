import type { User } from '@supabase/supabase-js'
import { parsePremiumExpiresAtMs } from '@/lib/parse-premium-expires-at'

type Meta = User['user_metadata'] & { plan?: string; expires_at?: string; is_premium?: boolean | string }

/**
 * For DB auto-downgrade: clear is_premium when access should no longer be active.
 * - Timed plans past expires_at
 * - Non-lifetime flags with missing/unparseable expires_at (orphan forever grants)
 * Skips explicit plan === 'lifetime'.
 */
export function shouldDeactivateExpiredPremiumInDb(meta: Meta | null | undefined): boolean {
  if (!meta) return false
  if (meta.plan === 'lifetime') return false
  const flag = meta.is_premium
  if (flag !== true && flag !== 'true') return false

  const expiryMs = parsePremiumExpiresAtMs(meta.expires_at)
  if (expiryMs == null) return true
  return Date.now() >= expiryMs
}

export function mergedMetadataOnDeactivate(meta: Record<string, unknown> | null | undefined): Record<string, unknown> {
  const m = (meta && typeof meta === 'object' ? { ...meta } : {}) as Record<string, unknown>
  m.is_premium = false
  m.deactivated_at = new Date().toISOString()
  m.deactivation_reason = 'expired'
  return m
}
