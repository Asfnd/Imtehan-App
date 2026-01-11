import { NextResponse } from 'next/server'
import { generateCSRFToken } from '@/lib/security/csrf'

/**
 * SECURITY: CSRF Token Generation Endpoint
 * Provides CSRF tokens for form submissions
 */
export async function GET() {
  try {
    const token = generateCSRFToken()

    const response = NextResponse.json({ token })

    // Set token in cookie for validation
    response.cookies.set('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1 hour
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}
