/**
 * Browser-safe bank feature flags (no Node fs).
 * Client components must import from here, not from static-mcq-fetch.
 */

export function banksEnabled(): boolean {
  // Default ON — set BANKS_STATIC=0 to force live Supabase reads.
  return process.env.BANKS_STATIC !== '0'
}

export function allowSupabaseFallback(): boolean {
  // Default OFF — live Nano only if explicitly BANKS_FALLBACK_SUPABASE=1.
  return process.env.BANKS_FALLBACK_SUPABASE === '1'
}
