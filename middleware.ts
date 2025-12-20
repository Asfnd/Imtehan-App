import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Lightning-fast middleware with minimal overhead
 * - Only runs on specific routes (quiz pages, API routes)
 * - Uses in-memory rate limiting (no external dependencies)
 * - Graceful fallback if rate limiter fails
 * - Handles Supabase session refresh
 */

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

// Cleanup old entries every minute
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetAt < now) {
        rateLimitMap.delete(key)
      }
    }
  }, 60000)
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const limit = 30 // requests
  const window = 10000 // 10 seconds
  
  const record = rateLimitMap.get(identifier)
  
  if (!record || record.resetAt < now) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + window })
    return true
  }
  
  if (record.count < limit) {
    record.count++
    return true
  }
  
  return false
}

function getIdentifier(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  )
}

function isSuspiciousRequest(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || ''
  
  // Block requests without user agent
  if (!userAgent) return true
  
  // Block known scrapers and bots
  const suspiciousPatterns = [
    'bot', 'crawler', 'spider', 'scraper', 'wget', 'curl', 
    'python', 'requests', 'scrapy', 'selenium', 'phantomjs'
  ]
  
  return suspiciousPatterns.some(pattern => userAgent.includes(pattern))
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip rate limiting for static assets and auth callbacks
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/auth/callback'
  ) {
    return NextResponse.next()
  }

  let response = NextResponse.next()

  // Handle Supabase session refresh for authenticated routes
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
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    // Refresh session if needed
    await supabase.auth.getUser()
  } catch (error) {
    // Silently handle auth errors
    console.error('Auth middleware error:', error)
  }

  // Apply rate limiting to sensitive routes
  const shouldRateLimit =
    pathname.startsWith('/api') ||
    pathname.includes('/quiz') ||
    pathname.includes('/practice')

  // Block suspicious requests (bots, scrapers)
  if (isSuspiciousRequest(request)) {
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

  if (shouldRateLimit) {
    try {
      const identifier = getIdentifier(request)
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
  response.headers.set('X-Frame-Options', 'SAMEORIGIN') // Prevent iframe embedding
  response.headers.set('X-XSS-Protection', '1; mode=block') // XSS protection
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin') // Hide referrer
  response.headers.set('Permissions-Policy', 'interest-cohort=()') // Disable FLoC tracking
  
  // Prevent caching of sensitive content
  if (pathname.includes('/quiz') || pathname.includes('/practice') || pathname.includes('/past-papers')) {
    response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }
  
  // Preconnect to Supabase for faster API calls
  response.headers.set(
    'Link',
    '<https://qsrkkvrrxorbgvbgekew.supabase.co>; rel=preconnect; crossorigin'
  )

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
