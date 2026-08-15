/**
 * Imtehan edge proxy → Azure VM
 *
 * Free-plan + SEO:
 *  • Static = CDN → Azure (no Worker). HTML/API/SEO = Worker + Cache API.
 *  • www → apex / trailing-slash / utm strip 301s
 *  • Origin fetch uses cf.resolveOverride so orange-cloud DNS does not 1003-loop
 */
const ORIGIN_IP = '20.205.110.177'
const PUBLIC_HOST = 'imtehan.com'
const ORIGIN_BASE = `http://${PUBLIC_HOST}`
const CACHE_VER = 'v34'

const HTML_EDGE_TTL = 300
const HTML_STALE_TTL = 1800
const SEO_EDGE_TTL = 86400
const API_EDGE_TTL = 21600

const TRACKING_KEYS = new Set([
  'fbclid',
  'gclid',
  'gclsrc',
  'dclid',
  'msclkid',
  'twclid',
  'igshid',
  'li_fat_id',
  'mc_cid',
  'mc_eid',
  'vero_id',
  '_ga',
  '_gl',
  'ref',
])

const NO_CACHE_PREFIXES = [
  '/api/',
  '/auth/',
  '/signin',
  '/profile',
  '/admin',
  '/community',
  '/quiz',
  '/mpt-practice',
  '/css/css-practice',
  '/css/solved-papers/view',
  '/css/guess-papers/view',
  '/css/past-papers/view',
]

/** Interactive / noindex surfaces — never Cache API HTML (stale quiz shells). */
function isInteractiveHtmlPath(pathname) {
  if (/^\/exams\/[^/]+\/(run|attempt|mock-attempt|mocks|mock|analytics)(\/|$)/.test(pathname)) {
    return true
  }
  if (pathname.startsWith('/exams/') && pathname.includes('/batch/')) return true
  if (/^\/mdcat\/.+\/quiz(\/|$)/.test(pathname)) return true
  if (/^\/fsc\/.+\/quiz(\/|$)/.test(pathname)) return true
  return false
}

const CACHEABLE_API_PREFIXES = [
  '/api/practice/exam-hub-counts',
  '/api/practice/count',
  '/api/practice/section-stats',
  '/api/bank/topic-stats',
  '/api/css/year-stats',
  '/api/css/subject-stats',
  '/api/past-papers',
]

function isRscOrDataRequest(request) {
  if (request.headers.get('RSC') === '1') return true
  if (request.headers.get('Next-Router-Prefetch')) return true
  if (request.headers.get('Next-Router-State-Tree')) return true
  if (request.headers.get('Next-Url')) return true
  const accept = (request.headers.get('Accept') || '').toLowerCase()
  if (accept.includes('text/x-component')) return true
  if (accept.includes('application/json') && !isCacheableApi(new URL(request.url).pathname)) {
    return true
  }
  try {
    if (new URL(request.url).searchParams.has('_rsc')) return true
  } catch (_) {}
  return false
}

function isImmutableStatic(pathname) {
  return pathname.startsWith('/_next/static/')
}

function isSeoDiscovery(pathname) {
  return (
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/sitemap/') ||
    pathname === '/manifest.webmanifest' ||
    pathname === '/manifest.json' ||
    pathname === '/imtehan-indexnow-key.txt' ||
    pathname.startsWith('/.well-known/')
  )
}

function isEdgeAsset(pathname) {
  if (pathname.startsWith('/_next/image')) return true
  if (isSeoDiscovery(pathname)) return true
  if (pathname === '/favicon.ico') return true
  if (/\.(png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|mp4|webm|txt|xml|webmanifest)$/i.test(pathname)) {
    return true
  }
  return false
}

function isCacheableApi(pathname) {
  return CACHEABLE_API_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )
}

function isPublicHtmlPath(pathname) {
  if (NO_CACHE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p))) return false
  if (isInteractiveHtmlPath(pathname)) return false
  if (pathname.startsWith('/_next/')) return false
  return (
    pathname === '/' ||
    pathname.startsWith('/exams') ||
    pathname.startsWith('/mcq') ||
    pathname.startsWith('/mdcat') ||
    pathname.startsWith('/fsc') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/css') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/faq') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/terms') ||
    pathname.startsWith('/careers') ||
    pathname.startsWith('/premium')
  )
}

function shouldHtmlWorkerCache(request, url) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false
  if (isRscOrDataRequest(request)) return false
  const cookie = request.headers.get('cookie') || ''
  if (/sb-.*-auth-token/i.test(cookie)) return false
  if (request.headers.get('authorization')) return false
  const accept = (request.headers.get('Accept') || '').toLowerCase()
  // Browsers send text/html; some clients send */* — both should use HTML cache path.
  if (accept && !accept.includes('text/html') && accept !== '*/*' && !accept.startsWith('*/*')) {
    return false
  }
  return isPublicHtmlPath(url.pathname)
}

/** Pathname-only — ignores tracking/query so one HTML object per page. */
function htmlCacheKey(url) {
  return new Request(`https://${PUBLIC_HOST}/__edge/${CACHE_VER}/html${url.pathname}`, {
    method: 'GET',
    headers: { Accept: 'text/html' },
  })
}

function apiCacheKey(url) {
  return new Request(
    `https://${PUBLIC_HOST}/__edge/${CACHE_VER}/api${url.pathname}${url.search}`,
    { method: 'GET', headers: { Accept: 'application/json' } }
  )
}

function forwardHeaders(request) {
  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.set('X-Forwarded-Host', PUBLIC_HOST)
  headers.set('X-Forwarded-Proto', 'https')
  return headers
}

function fetchOrigin(request, targetUrl, { rsc = false, edgeTtl = 0, bust = false } = {}) {
  const url = new URL(targetUrl.toString(), ORIGIN_BASE)
  if (rsc) url.searchParams.set('__flight', '1')
  if (bust) url.searchParams.set('__imtehan_cv', CACHE_VER)

  const init = {
    method: request.method,
    headers: forwardHeaders(request),
    redirect: 'manual',
    cf: {
      // Connect straight to Azure — bypass orange-cloud hairpin (CF 1003).
      resolveOverride: ORIGIN_IP,
      cacheTtl: edgeTtl > 0 ? edgeTtl : 0,
      cacheEverything: edgeTtl > 0,
    },
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body
  }
  return fetch(url.toString(), init)
}

function stripCdnCacheHeaders(headers) {
  headers.delete('CDN-Cache-Control')
  headers.delete('cdn-cache-control')
  headers.delete('Cloudflare-CDN-Cache-Control')
  headers.delete('cloudflare-cdn-cache-control')
}

function withMeta(headers, { cache, rsc = false }) {
  headers.set('X-Imtehan-Cache', cache)
  headers.set('X-Imtehan-Origin', 'azure')
  headers.set('X-Imtehan-Ver', CACHE_VER)
  headers.set('X-Imtehan-RSC', rsc ? '1' : '0')
  headers.delete('x-vercel-id')
  headers.delete('x-vercel-cache')
  return headers
}

function redirectResponse(location, kind) {
  return new Response(null, {
    status: 301,
    headers: {
      Location: location,
      'Cache-Control': 'public, max-age=86400',
      'X-Imtehan-Cache': kind,
      'X-Imtehan-Ver': CACHE_VER,
      'X-Imtehan-Origin': 'azure',
    },
  })
}

function wwwToApex(request, incoming) {
  const host = (request.headers.get('host') || incoming.hostname || '').toLowerCase()
  if (host === 'www.imtehan.com' || host.startsWith('www.imtehan.com:')) {
    return redirectResponse(
      `https://${PUBLIC_HOST}${incoming.pathname}${incoming.search}`,
      'REDIRECT'
    )
  }
  return null
}

/**
 * SEO URL hygiene (document navigations only — never RSC/API):
 * trailing slash → bare path; strip utm/fbclid/gclid/ref noise.
 */
function seoCleanRedirect(request, incoming) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null
  if (isRscOrDataRequest(request)) return null
  if (incoming.pathname.startsWith('/api/')) return null
  if (incoming.pathname.startsWith('/_next/')) return null
  if (isSeoDiscovery(incoming.pathname)) return null

  let changed = false
  let pathname = incoming.pathname
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.replace(/\/+$/, '') || '/'
    changed = true
  }

  const params = new URLSearchParams(incoming.search)
  for (const key of [...params.keys()]) {
    const lower = key.toLowerCase()
    if (lower.startsWith('utm_') || TRACKING_KEYS.has(lower)) {
      params.delete(key)
      changed = true
    }
  }

  if (!changed) return null
  const qs = params.toString()
  return redirectResponse(
    `https://${PUBLIC_HOST}${pathname}${qs ? `?${qs}` : ''}`,
    'SEO-REDIRECT'
  )
}

function attachCanonical(headers, pathname) {
  const path = pathname === '/' ? '' : pathname
  headers.set('Link', `<https://${PUBLIC_HOST}${path}>; rel="canonical"`)
}

function noStoreHtmlHeaders(headers) {
  stripCdnCacheHeaders(headers)
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
  headers.set('Cloudflare-CDN-Cache-Control', 'no-store')
  headers.set('CDN-Cache-Control', 'no-store')
  headers.set('Vary', 'Accept, RSC')
}

async function handleStatic(request, incoming, target, ctx) {
  const immutable = isImmutableStatic(incoming.pathname)
  const seo = isSeoDiscovery(incoming.pathname)
  const originTtl = immutable ? 31536000 : seo ? 0 : 86400
  const storeTtl = immutable ? 31536000 : seo ? SEO_EDGE_TTL : 86400
  const cache = caches.default
  const key = new Request(
    `https://${PUBLIC_HOST}/__edge/${CACHE_VER}/asset${incoming.pathname}${incoming.search}`,
    { method: 'GET' }
  )

  const hit = await cache.match(key)
  if (hit) {
    const headers = withMeta(new Headers(hit.headers), { cache: 'ASSET' })
    if (immutable) headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return new Response(hit.body, { status: hit.status, headers })
  }

  let fetchTarget = target
  if (seo) {
    fetchTarget = new URL(target.toString())
    fetchTarget.searchParams.set('__cv', CACHE_VER)
  }
  const resp = await fetchOrigin(request, fetchTarget, { edgeTtl: originTtl })
  const headers = withMeta(new Headers(resp.headers), { cache: 'ASSET' })
  if (immutable) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (seo) {
    headers.set(
      'Cache-Control',
      `public, max-age=${SEO_EDGE_TTL}, s-maxage=${SEO_EDGE_TTL}, stale-while-revalidate=604800`
    )
  } else if (!headers.get('Cache-Control')) {
    headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  }

  if (resp.ok) {
    const storeHeaders = new Headers({
      'Content-Type': resp.headers.get('content-type') || 'application/octet-stream',
      'Cache-Control': `public, s-maxage=${storeTtl}`,
    })
    ctx.waitUntil(
      cache.put(key, new Response(resp.clone().body, { status: resp.status, headers: storeHeaders }))
    )
  }

  return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers })
}

async function putHtmlCache(cache, key, resp) {
  const storeHeaders = new Headers({
    'Content-Type': resp.headers.get('content-type') || 'text/html; charset=utf-8',
    'Cache-Control': `public, s-maxage=${HTML_STALE_TTL}`,
    'X-Imtehan-Origin': 'azure',
    'X-Imtehan-Ver': CACHE_VER,
    'X-Imtehan-Stored-At': String(Date.now()),
  })
  await cache.put(
    key,
    new Response(await resp.clone().arrayBuffer(), {
      status: resp.status,
      headers: storeHeaders,
    })
  )
}

async function refreshHtml(request, target, key) {
  try {
    const resp = await fetchOrigin(request, target, { rsc: false, edgeTtl: 0, bust: true })
    const ct = (resp.headers.get('content-type') || '').toLowerCase()
    if (resp.ok && ct.includes('text/html')) {
      await putHtmlCache(caches.default, key, resp)
    }
  } catch (_) {}
}

async function handleHtml(request, incoming, target, ctx) {
  const cache = caches.default
  const key = htmlCacheKey(incoming)

  const hit = await cache.match(key)
  if (hit) {
    if (!hit.ok) {
      try {
        ctx.waitUntil(cache.delete(key))
      } catch (_) {}
    } else {
      const storedAt = Number(hit.headers.get('X-Imtehan-Stored-At') || 0)
      const ageMs = storedAt ? Date.now() - storedAt : HTML_EDGE_TTL * 1000
      const stale = ageMs > HTML_EDGE_TTL * 1000
      // Exam hubs change often after deploys — never serve a stale shell (breaks first soft-nav).
      const examBrowse = incoming.pathname === '/exams' || incoming.pathname.startsWith('/exams/')
      if (stale && examBrowse) {
        try {
          ctx.waitUntil(cache.delete(key))
        } catch (_) {}
      } else if (stale) {
        ctx.waitUntil(refreshHtml(request, target, key))
        const headers = withMeta(new Headers(hit.headers), { cache: 'STALE' })
        noStoreHtmlHeaders(headers)
        attachCanonical(headers, incoming.pathname)
        return new Response(hit.body, { status: hit.status, headers })
      } else {
        const headers = withMeta(new Headers(hit.headers), { cache: 'HIT' })
        noStoreHtmlHeaders(headers)
        attachCanonical(headers, incoming.pathname)
        return new Response(hit.body, { status: hit.status, headers })
      }
    }
  }

  const resp = await fetchOrigin(request, target, { rsc: false, edgeTtl: 0, bust: true })
  const ct = (resp.headers.get('content-type') || '').toLowerCase()
  const headers = withMeta(new Headers(resp.headers), { cache: 'MISS' })
  noStoreHtmlHeaders(headers)
  attachCanonical(headers, incoming.pathname)

  if (resp.ok && ct.includes('text/html')) {
    try {
      await putHtmlCache(cache, key, resp)
      headers.set('X-Imtehan-Put', 'ok')
    } catch (e) {
      headers.set('X-Imtehan-Put', 'err')
      headers.set('X-Imtehan-Put-Err', String(e && e.message ? e.message : e).slice(0, 80))
    }
  } else if (!resp.ok) {
    // Never poison the edge with soft/hard 404 HTML shells.
    try {
      ctx.waitUntil(cache.delete(key))
    } catch (_) {}
    headers.set('Cache-Control', 'private, no-store')
  }

  return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers })
}

async function handlePublicApi(request, incoming, target, ctx) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return handleBypass(request, target)
  }
  const cache = caches.default
  const key = apiCacheKey(incoming)

  const hit = await cache.match(key)
  if (hit && hit.ok) {
    const headers = withMeta(new Headers(hit.headers), { cache: 'API-HIT' })
    stripCdnCacheHeaders(headers)
    headers.set(
      'Cache-Control',
      `public, max-age=300, s-maxage=${API_EDGE_TTL}, stale-while-revalidate=86400`
    )
    headers.set('Cloudflare-CDN-Cache-Control', 'no-store')
    headers.set('CDN-Cache-Control', 'no-store')
    return new Response(hit.body, { status: hit.status, headers })
  }

  const resp = await fetchOrigin(request, target, { edgeTtl: 0 })
  const ct = (resp.headers.get('content-type') || '').toLowerCase()
  const headers = withMeta(new Headers(resp.headers), { cache: 'API-MISS' })
  stripCdnCacheHeaders(headers)
  headers.set('Cloudflare-CDN-Cache-Control', 'no-store')
  headers.set('CDN-Cache-Control', 'no-store')
  headers.set(
    'Cache-Control',
    `public, max-age=300, s-maxage=${API_EDGE_TTL}, stale-while-revalidate=86400`
  )

  if (resp.ok && ct.includes('application/json')) {
    const storeHeaders = new Headers({
      'Content-Type': resp.headers.get('content-type') || 'application/json',
      'Cache-Control': `public, s-maxage=${API_EDGE_TTL}`,
    })
    ctx.waitUntil(
      cache.put(
        key,
        new Response(await resp.clone().arrayBuffer(), {
          status: resp.status,
          headers: storeHeaders,
        })
      )
    )
  }

  return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers })
}

async function handleRsc(request, target) {
  let resp = await fetchOrigin(request, target, { rsc: true, edgeTtl: 0 })
  let ct = (resp.headers.get('content-type') || '').toLowerCase()

  if (ct.includes('text/html')) {
    const bust = new URL(target.toString())
    bust.searchParams.set('__rsc_bust', String(Date.now()))
    resp = await fetchOrigin(request, bust, { rsc: true, edgeTtl: 0 })
    ct = (resp.headers.get('content-type') || '').toLowerCase()
  }

  const headers = withMeta(new Headers(resp.headers), { cache: 'BYPASS', rsc: true })
  stripCdnCacheHeaders(headers)
  if (ct.includes('text/html')) headers.set('X-Imtehan-Bust', 'fail')
  headers.set('Cache-Control', 'private, no-store')
  headers.set('Cloudflare-CDN-Cache-Control', 'no-store')
  headers.set('CDN-Cache-Control', 'no-store')
  headers.set('Vary', 'Accept, RSC, Cookie')
  return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers })
}

async function handleBypass(request, target) {
  const bust = request.method === 'GET' || request.method === 'HEAD'
  const resp = await fetchOrigin(request, target, { edgeTtl: 0, bust })
  const headers = withMeta(new Headers(resp.headers), { cache: 'BYPASS' })
  stripCdnCacheHeaders(headers)
  headers.set('Cache-Control', 'private, no-store')
  headers.set('Cloudflare-CDN-Cache-Control', 'no-store')
  headers.set('CDN-Cache-Control', 'no-store')
  return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers })
}

export default {
  async fetch(request, env, ctx) {
    try {
      const incoming = new URL(request.url)

      const www = wwwToApex(request, incoming)
      if (www) return www

      // Old slug URL was CDN-poisoned with a 404 before Azure deploy; send to canonical.
      if (incoming.pathname === '/exams/police-ict-assistant') {
        return redirectResponse(
          `https://${PUBLIC_HOST}/exams/police-islamabad-assistant${incoming.search}`,
          'REDIRECT',
        )
      }

      const clean = seoCleanRedirect(request, incoming)
      if (clean) return clean

      const target = new URL(incoming.pathname + incoming.search, ORIGIN_BASE)

      if (
        isSeoDiscovery(incoming.pathname) ||
        isImmutableStatic(incoming.pathname) ||
        isEdgeAsset(incoming.pathname)
      ) {
        return handleStatic(request, incoming, target, ctx)
      }

      if (isCacheableApi(incoming.pathname)) {
        return handlePublicApi(request, incoming, target, ctx)
      }

      if (isRscOrDataRequest(request)) {
        return handleRsc(request, target)
      }

      if (shouldHtmlWorkerCache(request, incoming)) {
        return handleHtml(request, incoming, target, ctx)
      }

      return handleBypass(request, target)
    } catch (err) {
      return new Response('worker error: ' + (err && err.message ? err.message : String(err)), {
        status: 502,
        headers: { 'content-type': 'text/plain', 'cache-control': 'no-store' },
      })
    }
  },
}
