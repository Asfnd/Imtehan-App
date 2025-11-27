/**
 * Lightning-fast rate limiter with graceful fallback
 * - Uses Upstash Redis when available (production)
 * - Falls back to in-memory cache (development)
 * - Zero performance impact with async operations
 * - Automatic cleanup to prevent memory leaks
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// In-memory fallback for development
class MemoryStore {
  private store = new Map<string, { count: number; resetAt: number }>()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Auto-cleanup every 60 seconds
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000)
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, value] of this.store.entries()) {
      if (value.resetAt < now) {
        this.store.delete(key)
      }
    }
  }

  async check(key: string, limit: number, window: number): Promise<boolean> {
    const now = Date.now()
    const record = this.store.get(key)

    if (!record || record.resetAt < now) {
      // New window
      this.store.set(key, { count: 1, resetAt: now + window })
      return true
    }

    if (record.count < limit) {
      record.count++
      return true
    }

    return false
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    this.store.clear()
  }
}

// Singleton instances
let redisRateLimiter: Ratelimit | null = null
let memoryStore: MemoryStore | null = null

/**
 * Initialize rate limiter (call once on startup)
 */
function initRateLimiter() {
  // Try to use Redis if configured
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })

      redisRateLimiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, '10 s'), // 20 requests per 10 seconds
        analytics: false, // Disable for speed
        prefix: 'rl',
      })

      console.log('✅ Rate limiter: Using Upstash Redis')
    } catch (error) {
      console.warn('⚠️  Redis connection failed, using in-memory fallback')
      redisRateLimiter = null
    }
  }

  // Fallback to in-memory
  if (!redisRateLimiter) {
    memoryStore = new MemoryStore()
    console.log('✅ Rate limiter: Using in-memory store (development mode)')
  }
}

/**
 * Check rate limit for an identifier (IP, user ID, etc.)
 * Returns true if request is allowed, false if rate limited
 */
export async function checkRateLimit(identifier: string): Promise<boolean> {
  // Lazy initialization
  if (!redisRateLimiter && !memoryStore) {
    initRateLimiter()
  }

  try {
    // Use Redis if available
    if (redisRateLimiter) {
      const { success } = await redisRateLimiter.limit(identifier)
      return success
    }

    // Fallback to memory store
    if (memoryStore) {
      return await memoryStore.check(identifier, 20, 10000) // 20 req per 10s
    }

    // If both fail, allow request (fail open for availability)
    return true
  } catch (error) {
    console.error('Rate limit check error:', error)
    // Fail open - allow request if rate limiter fails
    return true
  }
}

/**
 * Get identifier from request (IP address with fallbacks)
 */
export function getIdentifier(request: Request): string {
  // Try multiple headers for IP (Vercel, Cloudflare, etc.)
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip',
    'x-client-ip',
  ]

  for (const header of headers) {
    const value = request.headers.get(header)
    if (value) {
      // Take first IP if comma-separated
      return value.split(',')[0].trim()
    }
  }

  // Fallback to a default (shouldn't happen in production)
  return 'unknown'
}

/**
 * Cleanup on shutdown (optional, for graceful shutdown)
 */
export function cleanup() {
  if (memoryStore) {
    memoryStore.destroy()
    memoryStore = null
  }
}
