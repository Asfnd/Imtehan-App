/**
 * Simple in-memory rate limiter for API routes
 * Prevents abuse and scraping attempts
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 100, windowMs: 60 * 1000 }
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetTime) {
    // First request or window expired
    const resetTime = now + config.windowMs
    rateLimitMap.set(identifier, { count: 1, resetTime })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime
    }
  }

  if (entry.count >= config.maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime
    }
  }

  // Increment count
  entry.count++
  rateLimitMap.set(identifier, entry)

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime
  }
}

export function getClientIP(request: Request): string {
  // Try to get real IP from headers (for production behind proxy)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()
  
  // Fallback to a generic identifier
  return 'unknown'
}

// Specific rate limits for different endpoints
export const RATE_LIMITS = {
  // Contact form - prevent spam
  CONTACT: { maxRequests: 5, windowMs: 60 * 1000 }, // 5 per minute
  
  // Quiz data - prevent scraping
  QUIZ_DATA: { maxRequests: 50, windowMs: 60 * 1000 }, // 50 per minute
  
  // Past papers - prevent bulk downloading
  PAST_PAPERS: { maxRequests: 20, windowMs: 60 * 1000 }, // 20 per minute
  
  // Quiz submission - prevent abuse
  QUIZ_SUBMIT: { maxRequests: 30, windowMs: 60 * 1000 }, // 30 per minute
  
  // General API - default limit
  GENERAL: { maxRequests: 100, windowMs: 60 * 1000 } // 100 per minute
} as const