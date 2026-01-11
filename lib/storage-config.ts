/**
 * Storage URL Configuration
 * Handles custom domain routing for Supabase storage via Cloudflare
 */

// Check if running on localhost (disable custom domain for local dev)
function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
}

export const STORAGE_CONFIG = {
  // Custom domain for storage (proxied through Cloudflare Worker)
  customDomain: process.env.NEXT_PUBLIC_STORAGE_URL || null,

  // Original Supabase domain (fallback)
  supabaseDomain: process.env.NEXT_PUBLIC_SUPABASE_URL,

  // Get the active storage URL (uses direct Supabase on localhost)
  getStorageUrl: () => {
    if (isLocalhost()) {
      return STORAGE_CONFIG.supabaseDomain
    }
    return STORAGE_CONFIG.customDomain || STORAGE_CONFIG.supabaseDomain
  },

  // Check if custom domain is enabled (not on localhost)
  isCustomDomainEnabled: () => {
    return !isLocalhost() && !!STORAGE_CONFIG.customDomain
  }
}

/**
 * Convert Supabase storage URL to custom domain URL
 * Example: https://qsrkkvrrxorbgvbgekew.supabase.co/storage/...
 *       → https://storage.imtehan.com/storage/...
 *
 * On localhost, returns original URL to avoid CORS/blocking issues
 */
export function useCustomStorageUrl(supabaseUrl: string): string {
  // On localhost, use direct Supabase URL
  if (isLocalhost()) {
    return supabaseUrl
  }

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
