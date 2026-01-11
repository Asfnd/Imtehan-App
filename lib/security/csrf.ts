import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const CSRF_SECRET = process.env.CSRF_SECRET || crypto.randomBytes(32).toString('hex')

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
  const timestamp = Date.now().toString()
  const random = crypto.randomBytes(16).toString('hex')
  const token = `${timestamp}.${random}`

  // Sign the token
  const hmac = crypto.createHmac('sha256', CSRF_SECRET)
  hmac.update(token)
  const signature = hmac.digest('hex')

  return `${token}.${signature}`
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false

  const parts = token.split('.')
  if (parts.length !== 3) return false

  const [timestamp, random, signature] = parts

  // Check token age (valid for 1 hour)
  const tokenAge = Date.now() - parseInt(timestamp)
  if (tokenAge > 3600000) return false // 1 hour

  // Verify signature
  const expectedToken = `${timestamp}.${random}`
  const hmac = crypto.createHmac('sha256', CSRF_SECRET)
  hmac.update(expectedToken)
  const expectedSignature = hmac.digest('hex')

  return signature === expectedSignature
}

/**
 * CSRF middleware for API routes
 */
export function csrfProtection(request: NextRequest): NextResponse | null {
  // Skip for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return null
  }

  const token = request.headers.get('x-csrf-token')

  if (!token || !validateCSRFToken(token)) {
    return NextResponse.json(
      { error: 'Invalid or missing CSRF token' },
      { status: 403 }
    )
  }

  return null // Valid
}
