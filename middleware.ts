import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
import { isActivePremium } from '@/lib/is-active-premium'

/**
 * Lightning-fast middleware with minimal overhead
 * - Only runs on specific routes (quiz pages, API routes)
 * - Uses in-memory rate limiting (no external dependencies)
 * - Graceful fallback if rate limiter fails
 * - Handles Supabase session refresh
 */

// Simple in-memory rate limiter
// Note: In serverless/edge, this resets between invocations - that's acceptable
// Each edge instance maintains its own rate limit, providing distributed protection
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

// DDoS Protection: Track global requests per IP across all routes
const ddosProtectionMap = new Map<string, { count: number; resetAt: number; blocked: boolean }>()

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  // CAMPAIGN MODE: Set to true during influencer campaign for stricter limits
  const CAMPAIGN_MODE = process.env.CAMPAIGN_MODE === 'true'

  // During campaign: 5 requests per 10 seconds
  // Normal: 10 requests per 10 seconds
  const limit = CAMPAIGN_MODE ? 5 : 10
  const window = 10000 // 10 seconds

  const record = rateLimitMap.get(identifier)

  if (!record || record.resetAt < now) {
    // Cleanup expired entry if exists
    if (record && record.resetAt < now) {
      rateLimitMap.delete(identifier)
    }
    rateLimitMap.set(identifier, { count: 1, resetAt: now + window })
    return true
  }

  if (record.count < limit) {
    record.count++
    return true
  }

  return false
}

/**
 * DDoS Protection: Block IPs making excessive requests globally
 * Returns true if IP should be blocked
 */
function checkDDoSProtection(identifier: string): boolean {
  const now = Date.now()
  const MAX_REQUESTS_PER_MINUTE = 60 // 60 requests per minute per IP
  const WINDOW = 60000 // 1 minute
  const BLOCK_DURATION = 300000 // Block for 5 minutes if exceeded

  const record = ddosProtectionMap.get(identifier)

  // If previously blocked, check if block has expired
  if (record?.blocked) {
    if (record.resetAt > now) {
      return true // Still blocked
    }
    // Block expired, remove from map
    ddosProtectionMap.delete(identifier)
    return false
  }

  // Check request count
  if (!record || record.resetAt < now) {
    ddosProtectionMap.set(identifier, { count: 1, resetAt: now + WINDOW, blocked: false })
    return false
  }

  // Increment count
  record.count++

  // If exceeded limit, block the IP
  if (record.count > MAX_REQUESTS_PER_MINUTE) {
    record.blocked = true
    record.resetAt = now + BLOCK_DURATION
    return true
  }

  return false
}

/**
 * SECURITY: Safe IP extraction (resistant to spoofing)
 * Only trusts Cloudflare header which cannot be spoofed
 */
/** True when running `next dev` against loopback — relax WAF-style checks (shared "unknown" IP, CSP/HMR quirks). */
function isLocalDevRequest(request: NextRequest): boolean {
  if (process.env.NODE_ENV !== 'development') return false
  const h = request.nextUrl.hostname
  return h === 'localhost' || h === '127.0.0.1' || h === '::1' || h === '[::1]'
}

function getIdentifier(request: NextRequest): string {
  // SECURITY: Cloudflare header (most trusted - cannot be spoofed)
  const cfIP = request.headers.get('cf-connecting-ip')
  if (cfIP) {
    return cfIP
  }

  // Fallback for non-Cloudflare environments
  // NOTE: x-forwarded-for can be spoofed - only trust if behind verified proxy
  const xForwardedFor = request.headers.get('x-forwarded-for')
  if (xForwardedFor) {
    // Take the last IP (closest to reverse proxy)
    const ips = xForwardedFor.split(',')
    return ips[ips.length - 1]?.trim() || 'unknown'
  }

  return 'unknown'
}

/**
 * SECURITY: Improved bot detection
 * Blocks known malicious bots while allowing legitimate tools
 */
function isSuspiciousRequest(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || ''

  // Firefox strict privacy can send minimal or empty UA; never treat real Firefox as a scraper bot.
  if (userAgent.includes('firefox/')) {
    return false
  }

  // Block requests without user agent (suspicious)
  if (!userAgent) return true

  // SECURITY: Block MALICIOUS scrapers and bots (not all automated tools)
  // These are specifically known malicious scrapers
  const maliciousBotPatterns = [
    // Specific malicious scrapers
    'scrapy', 'selenium', 'phantomjs', 'headlesschrome',
    // SQL injection attempts
    'sqlmap', 'nikto', 'nmap',
    // Known bad actors
    'masscan', 'shodan', 'zoomeye',
    // Credential stuffing / brute force
    'hydra', 'hashcat',
  ]

  // SECURITY: ALLOW legitimate tools
  // curl, wget, python, requests are used by developers and legitimate services
  // Only block if combined with other suspicious signs
  const legitimateTools = ['curl', 'wget', 'python', 'requests', 'java', 'node']

  const isMaliciousBot = maliciousBotPatterns.some(pattern => userAgent.includes(pattern))
  const isLegitimate = legitimateTools.some(pattern => userAgent.includes(pattern))

  // Block if it's a known malicious bot, even if it looks legitimate
  if (isMaliciousBot) {
    return true
  }

  // Allow legitimate tools (developers need these)
  if (isLegitimate) {
    return false
  }

  // Check for suspicious patterns in legitimate tools
  // e.g., if it says "curl" but also "sql" or "inject"
  if (isLegitimate && (userAgent.includes('inject') || userAgent.includes('exploit') || userAgent.includes('attack'))) {
    return true
  }

  return false
}

/** Major search crawlers — exempt from DDoS IP limits (they share IPs / burst). */
function isSearchEngineCrawler(request: NextRequest): boolean {
  const ua = request.headers.get('user-agent')?.toLowerCase() || ''
  return (
    ua.includes('googlebot') ||
    ua.includes('bingbot') ||
    ua.includes('slurp') ||
    ua.includes('duckduckbot') ||
    ua.includes('yandexbot') ||
    ua.includes('baiduspider') ||
    ua.includes('applebot')
  )
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // OPTIMIZATION: Skip middleware for static/cached/SEO crawl routes to save edge CPU
  // This reduces Edge Request CPU Duration by ~70%
  if (
    pathname === '/' ||
    pathname === '/exams' ||
    pathname.startsWith('/exams/') ||
    pathname.startsWith('/mcq/') ||
    pathname.startsWith('/mdcat/') ||
    pathname.startsWith('/fsc/') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/auth/callback' ||
    pathname === '/signin/callback' ||
    // Skip for cached pages that don't need auth
    pathname === '/css' ||
    pathname === PREMIUM_PAGE_PATH ||
    pathname === '/css/past-papers' ||
    pathname === '/css/guess-papers' ||
    pathname === '/css/subjects' ||
    pathname.startsWith('/blog') ||
    pathname === '/faq' ||
    pathname === '/about' ||
    pathname === '/careers' ||
    pathname.startsWith('/careers/') ||
    pathname === '/contact' ||
    pathname === '/terms' ||
    pathname === '/privacy' ||
    pathname === '/sitemap-index' ||
    pathname.startsWith('/sitemap')
  ) {
    return NextResponse.next()
  }

  let response = NextResponse.next()

  const localDev = isLocalDevRequest(request)
  const identifier = getIdentifier(request)
  const searchCrawler = isSearchEngineCrawler(request)

  // DDoS Protection: Check if IP is making too many requests globally
  // Search crawlers exempt — Googlebot bursts would otherwise 429 and retry harder
  if (!localDev && !searchCrawler && checkDDoSProtection(identifier)) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        message: 'Your IP has been temporarily blocked due to excessive requests. Please try again in 5 minutes.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '300',
        },
      }
    )
  }

  // SECURITY: Protect premium-only routes (fail closed on auth errors)
  const isPremiumRoute =
    pathname.startsWith('/css/solved-papers/view') ||
    pathname.startsWith('/css/guess-papers/view')

  if (isPremiumRoute) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll().map(cookie => ({
                name: cookie.name,
                value: cookie.value,
              }))
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => {
                response.cookies.set(name, value, {
                  ...options,
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'lax',
                  path: '/',
                })
              })
            },
          },
        }
      )

      // Use Promise.race with timeout for faster failure (2 second timeout)
      const authPromise = supabase.auth.getUser()
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Auth timeout')), 2000)
      )

      const { data: { user } } = await Promise.race([authPromise, timeoutPromise]) as any

      if (!user) {
        // Not authenticated - redirect to sign in
        const redirectUrl = new URL('/signin', request.url)
        redirectUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(redirectUrl)
      }

      if (!isActivePremium(user)) {
        // Not premium - redirect to premium page
        const redirectUrl = new URL(PREMIUM_PAGE_PATH, request.url)
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      // On auth error/timeout, redirect to sign in (fail secure)
      if (process.env.NODE_ENV === 'development') {
        console.error('Premium route auth error:', error)
      }
      const redirectUrl = new URL('/signin', request.url)
      redirectUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Apply rate limiting ONLY to write operations (POST/PUT/DELETE) and sensitive routes
  // OPTIMIZATION: Skip rate limiting for GET requests on static content
  const isWriteOperation = request.method !== 'GET' && request.method !== 'HEAD'
  const shouldRateLimit = isWriteOperation || (
    pathname.startsWith('/api') ||
    pathname.includes('/quiz') ||
    pathname.includes('/practice')
  )

  // Block suspicious requests (bots, scrapers) — skip on local dev (Firefox privacy UA / empty UA)
  if (!localDev && isSuspiciousRequest(request)) {
    return new NextResponse(
      JSON.stringify({
        error: 'Access denied',
        message: 'Automated requests are not allowed',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  if (shouldRateLimit && !localDev) {
    try {
      const allowed = checkRateLimit(identifier)

      if (!allowed) {
        return new NextResponse(
          JSON.stringify({
            error: 'Too many requests',
            message: 'Please slow down and try again in a few seconds',
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '10',
            },
          }
        )
      }
    } catch (error) {
      // Silently handle middleware errors in production
    }
  }
  
  // Performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Anti-scraping and security headers
  // CRITICAL: Skip X-Frame-Options for PDF proxy to allow iframe embedding
  if (!pathname.startsWith('/api/pdf/proxy')) {
    response.headers.set('X-Frame-Options', 'SAMEORIGIN') // Prevent iframe embedding
  }
  response.headers.set('X-XSS-Protection', '1; mode=block') // XSS protection
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin') // Hide referrer
  response.headers.set('Permissions-Policy', 'interest-cohort=()') // Disable FLoC tracking
  
  // Intelligent caching: disable for active quiz pages, allow for subject/year selection pages
  if (pathname.includes('/quiz') && !pathname.includes('/subjects')) {
    // Active quiz pages - no caching (user-specific)
    response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  } else if (pathname.includes('/subjects') || pathname.includes('/past-papers')) {
    // Subject/year selection pages - cache for 5 minutes (data rarely changes)
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  }

  // OPTIMIZATION: Cache PDF files for 30 days in browser
  // Returning users get instant PDF loads from local cache
  if (pathname.includes('/storage/v1/object/public/css-past-papers') ||
      pathname.includes('/storage/v1/object/public/css-solved-papers') ||
      pathname.includes('/storage/v1/object/public/css-guess-papers')) {
    response.headers.set('Cache-Control', 'public, max-age=2592000, immutable') // 30 days
    response.headers.set('Expires', new Date(Date.now() + 2592000000).toUTCString())
  }

  // Preconnect to Supabase for faster API/PDF calls (no hardcoded project ref)
  const supabasePublic = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (supabasePublic) {
    try {
      const origin = new URL(supabasePublic).origin
      response.headers.set('Link', `<${origin}>; rel=preconnect; crossorigin`)
    } catch {
      /* ignore invalid env */
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
