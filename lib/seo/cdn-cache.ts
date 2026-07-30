/** Shared CDN / ISR cache policy — keep SEO HTML on edge, off Vercel ISR meter. */

/** 7 days — MCQ banks change rarely; matches page revalidate. */
export const SEO_EDGE_TTL_SECONDS = 604800

/** Origin + browser: never cache interactive or API JSON at CDN (use unstable_cache server-side). */
export const ORIGIN_NO_STORE_CACHE_CONTROL =
  'private, no-cache, no-store, must-revalidate, max-age=0'

/**
 * CF "Cache Everything" can ignore private/no-store alone — also set CDN + Cloudflare
 * directives so interactive exam HTML is never edge-cached again.
 */
export const ORIGIN_NO_STORE_HEADERS = [
  { key: 'Cache-Control', value: ORIGIN_NO_STORE_CACHE_CONTROL },
  { key: 'CDN-Cache-Control', value: 'no-store' },
  { key: 'Cloudflare-CDN-Cache-Control', value: 'no-store' },
  { key: 'Surrogate-Control', value: 'no-store' },
  { key: 'Pragma', value: 'no-cache' },
  { key: 'Expires', value: '0' },
] as const

/** JSON API responses — same policy, single object for route handlers. */
export const API_JSON_NO_STORE_HEADERS = {
  'Cache-Control': ORIGIN_NO_STORE_CACHE_CONTROL,
} as const

/** Browser can hold a copy; revalidate in background after edge refresh. */
export const SEO_BROWSER_CACHE_CONTROL = `public, max-age=0, s-maxage=${SEO_EDGE_TTL_SECONDS}, stale-while-revalidate=${SEO_EDGE_TTL_SECONDS}`

/** Cloudflare ignores Vercel CDN-Cache-Control; use standard Cache-Control too. */
export const SEO_CLOUDFLARE_CACHE_CONTROL = `public, max-age=${SEO_EDGE_TTL_SECONDS}, s-maxage=${SEO_EDGE_TTL_SECONDS}, stale-while-revalidate=86400`

export const SEO_CDN_CACHE_HEADERS = [
  { key: 'Cache-Control', value: SEO_CLOUDFLARE_CACHE_CONTROL },
  { key: 'CDN-Cache-Control', value: `public, max-age=${SEO_EDGE_TTL_SECONDS}` },
] as const

export const SITEMAP_CACHE_CONTROL =
  'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'

export const ROBOTS_CACHE_CONTROL = 'public, max-age=300, s-maxage=3600'
