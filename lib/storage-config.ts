/**
 * Storage URL Configuration
 * Handles custom domain routing for Supabase storage via Cloudflare
 */

export const STORAGE_CONFIG = {
  // Custom domain for storage (proxied through Cloudflare Worker)
  customDomain: process.env.NEXT_PUBLIC_STORAGE_URL || null,

  // Original Supabase domain (fallback)
  supabaseDomain: process.env.NEXT_PUBLIC_SUPABASE_URL,

  // Get the active storage URL
  getStorageUrl: () => {
    return STORAGE_CONFIG.customDomain || STORAGE_CONFIG.supabaseDomain
  },

  // Check if custom domain is enabled
  isCustomDomainEnabled: () => {
    return !!STORAGE_CONFIG.customDomain
  }
}

/**
 * Convert Supabase storage URL to custom domain URL
 * Example: https://qsrkkvrrxorbgvbgekew.supabase.co/storage/...
 *       → https://storage.imtehan.com/storage/...
 */
export function useCustomStorageUrl(supabaseUrl: string): string {
  if (!STORAGE_CONFIG.customDomain || !STORAGE_CONFIG.supabaseDomain) {
    return supabaseUrl // No custom domain, return original
  }

  // Replace Supabase domain with custom domain
  return supabaseUrl.replace(
    STORAGE_CONFIG.supabaseDomain,
    STORAGE_CONFIG.customDomain
  )
}

/**
 * Get storage base URL for building custom paths
 */
export function getStorageBaseUrl(): string {
  return STORAGE_CONFIG.getStorageUrl() || ''
}

/**
 * Build a complete storage URL for a given path
 */
export function buildStorageUrl(bucket: string, path: string): string {
  const baseUrl = getStorageBaseUrl()
  return `${baseUrl}/storage/v1/object/public/${bucket}/${path}`
}
