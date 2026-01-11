import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { rateLimit, getClientIP, RATE_LIMITS } from '@/lib/security/rateLimiter'
import { csrfProtection } from '@/lib/security/csrf'

export async function POST(request: NextRequest) {
  // SECURITY: Rate limiting to prevent spam subscriptions
  const clientIP = getClientIP(request)
  const rateLimitResult = rateLimit(`newsletter:${clientIP}`, RATE_LIMITS.CONTACT)

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: 'Too many subscription attempts. Please try again later.',
        retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000))
        }
      }
    )
  }

  // SECURITY: CSRF protection
  const csrfError = csrfProtection(request)
  if (csrfError) return csrfError

  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      )
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase(),
        subscribed_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('Newsletter subscription error:', insertError)
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter!'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
