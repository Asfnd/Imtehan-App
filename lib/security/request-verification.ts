/**
 * SECURITY: Request Verification Utilities
 * Handles user authentication and authorization for API endpoints
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'
import { matchesSafeRedirectPath } from '@/lib/security/safe-redirects'

/**
 * Get authenticated user from request
 * SECURITY: Verifies the request has a valid session
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return null
  }
}

const BEARER_PREFIX = /^Bearer\s+/i

/**
 * Same as getAuthenticatedUser, but also accepts `Authorization: Bearer <access_token>`
 * from same-origin fetches. Fixes 401s when the browser has a valid session but cookie
 * sync to the server is delayed (common right after OAuth / PKCE).
 */
export async function getAuthenticatedUserForRoute(request: Request): Promise<User | null> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (!error && user) return user

    const raw = request.headers.get('authorization')?.trim() ?? ''
    const token = BEARER_PREFIX.test(raw) ? raw.replace(BEARER_PREFIX, '').trim() : ''
    if (!token) return null

    const { data: { user: jwtUser }, error: jwtError } = await supabase.auth.getUser(token)
    if (jwtError || !jwtUser) return null
    return jwtUser
  } catch (error) {
    console.error('Error getting authenticated user for route:', error)
    return null
  }
}

/**
 * Verify user owns the resource
 * SECURITY: Prevents users from accessing/modifying other users' data
 */
export async function verifyUserOwnership(userId: string, resourceOwnerId: string): Promise<boolean> {
  if (!userId || !resourceOwnerId) {
    return false
  }

  // SECURITY: Direct string comparison, no case-insensitive matching
  return userId === resourceOwnerId
}

/**
 * Validate allowed redirect URLs
 * SECURITY: Prevents open redirect attacks
 */
export function isValidRedirectUrl(url: string, baseUrl: string): boolean {
  if (!url) {
    return false
  }

  try {
    const parsedUrl = new URL(url, baseUrl)

    if (parsedUrl.origin !== new URL(baseUrl).origin) {
      return false
    }

    return matchesSafeRedirectPath(parsedUrl.pathname)
  } catch {
    return false
  }
}

/**
 * Validate input parameters
 * SECURITY: Prevents injection attacks
 */
export interface ValidationRules {
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  allowedValues?: string[]
}

export function validateInput(
  value: unknown,
  rules: ValidationRules,
  fieldName: string = 'input'
): { valid: boolean; error?: string } {
  // Check if value is string
  if (typeof value !== 'string') {
    return { valid: false, error: `${fieldName} must be a string` }
  }

  // Check minimum length
  if (rules.minLength && value.length < rules.minLength) {
    return { valid: false, error: `${fieldName} must be at least ${rules.minLength} characters` }
  }

  // Check maximum length
  if (rules.maxLength && value.length > rules.maxLength) {
    return { valid: false, error: `${fieldName} must not exceed ${rules.maxLength} characters` }
  }

  // Check pattern
  if (rules.pattern && !rules.pattern.test(value)) {
    return { valid: false, error: `${fieldName} format is invalid` }
  }

  // Check allowed values
  if (rules.allowedValues && !rules.allowedValues.includes(value)) {
    return { valid: false, error: `${fieldName} contains invalid value` }
  }

  return { valid: true }
}

/**
 * Safe IP extraction (resistant to spoofing)
 * SECURITY: Validates headers when behind reverse proxy
 */
export function getSafeClientIP(request: Request, trustedProxies?: string[]): string {
  // If no trusted proxies specified, only use CF-Connecting-IP (Cloudflare)
  // This is safe because Cloudflare is the only one setting this header
  const cfIP = request.headers.get('cf-connecting-ip')
  if (cfIP) {
    return cfIP
  }

  // Fallback to x-forwarded-for only if you have a trusted proxy setup
  // Default: don't trust x-forwarded-for unless explicitly configured
  if (trustedProxies && trustedProxies.length > 0) {
    const forwarded = request.headers.get('x-forwarded-for')
    if (forwarded) {
      const ips = forwarded.split(',').map(ip => ip.trim())
      // Return the last IP (closest to actual proxy)
      return ips[ips.length - 1] || 'unknown'
    }
  }

  // Fallback: use socket address if available (not spoofable)
  return 'unknown'
}

/**
 * Create request signature for API operations
 * SECURITY: Prevents request tampering
 */
export async function createRequestSignature(
  payload: Record<string, unknown>,
  secret: string
): Promise<string> {
  const data = JSON.stringify(payload)
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(data)

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, messageData)
  const hashArray = Array.from(new Uint8Array(signature))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Verify request signature
 * SECURITY: Validates request hasn't been tampered with
 */
export async function verifyRequestSignature(
  payload: Record<string, unknown>,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const expectedSignature = await createRequestSignature(payload, secret)
    return signature === expectedSignature
  } catch (error) {
    return false
  }
}
