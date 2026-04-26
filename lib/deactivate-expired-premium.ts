import type { User } from '@supabase/supabase-js'

type Meta = User['user_metadata'] & { plan?: string; expires_at?: string; is_premium?: boolean | string }

/**
 * For DB auto-downgrade: set is_premium false in auth when a timed plan has ended.
 * Skips lifetime, missing expiry, and users who are not marked premium.
 */
export function shouldDeactivateExpiredPremiumInDb(meta: Meta | null | undefined): boolean {
  if (!meta) return false
  if (meta.plan === 'lifetime') return false
  const flag = meta.is_premium
  if (flag !== true && flag !== 'true') return false
  const raw = meta.expires_at
  if (raw == null || raw === '') return false
  const ms = typeof raw === 'number' ? raw : Date.parse(String(raw).trim())
  if (Number.isNaN(ms)) return false
  return Date.now() >= ms
}

export function mergedMetadataOnDeactivate(meta: Record<string, unknown> | null | undefined): Record<string, unknown> {
  const m = (meta && typeof meta === 'object' ? { ...meta } : {}) as Record<string, unknown>
  m.is_premium = false
  m.deactivated_at = new Date().toISOString()
  m.deactivation_reason = 'expired'
  return m
}
