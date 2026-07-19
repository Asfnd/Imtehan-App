/** Shared CDN / ISR cache policy — keep SEO HTML on edge, off Vercel ISR meter. */

/** 7 days — MCQ banks change rarely; matches page revalidate. */
export const SEO_EDGE_TTL_SECONDS = 604800

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
