import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Cookie-free anon client for public SEO / crawl reads.
 * Using cookies() via createServerSupabaseClient opts routes into dynamic
 * rendering and blocks CDN/ISR — the main Fluid Active CPU burn for Googlebot.
 */
let cached: SupabaseClient | null = null

export function createPublicSupabaseClient(): SupabaseClient {
  if (cached) return cached
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}
