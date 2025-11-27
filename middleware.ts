import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Lightning-fast middleware with minimal overhead
 * - Only runs on specific routes (quiz pages, API routes)
 * - Uses in-memory rate limiting (no external dependencies)
 * - Graceful fallback if rate limiter fails
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

  // Apply rate limiting to sensitive routes
  const shouldRateLimit =
    pathname.startsWith('/api') ||
    pathname.includes('/quiz') ||
    pathname.includes('/practice')

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
      console.error('Middleware error:', error)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
