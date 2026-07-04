/**
 * Parse premium expires_at from auth user_metadata.
 * Handles ISO strings, epoch ms, and Postgres timestamps like
 * "2026-08-04 17:08:29.276166+00" (Safari/Hermes reject these without normalization).
 * Returns null when absent or unparseable (caller treats null as no expiry limit).
 */
export function parsePremiumExpiresAtMs(raw: unknown): number | null {
  if (raw == null || raw === '') return null
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null

  const s = String(raw).trim()
  if (!s) return null
  if (/^\d+$/.test(s)) {
    const n = Number(s)
    return Number.isFinite(n) ? n : null
  }

  let t = Date.parse(s)
  if (!Number.isNaN(t)) return t

  let iso = s.replace(' ', 'T')
  iso = iso.replace(/(\.\d{3})\d+/, '$1')
  iso = iso.replace(/([+-]\d{2})(\d{2})$/, '$1:$2')
  iso = iso.replace(/([+-]\d{2})$/, '$1:00')
  t = Date.parse(iso)
  return Number.isNaN(t) ? null : t
}
