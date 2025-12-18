import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { rateLimit, getClientIP, RATE_LIMITS } from '@/lib/security/rateLimiter'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - prevent spam
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`contact:${clientIP}`, RATE_LIMITS.CONTACT)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMITS.CONTACT.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
          }
        }
      )
    }

    const { name, email, subject, message, website } = await request.json()

    // Honeypot check - if 'website' field is filled, it's likely a bot
    if (website && website.trim() !== '') {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 403 }
      )
    }

    // Validate required fields
    if (!name || !email || !message || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Use server-side Supabase client
    const supabase = supabaseAdmin

    // Insert into database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          subject,
          message: message.trim(),
        }
      ])
      .select()

    if (error) {
      // Database error occurred
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Message submitted successfully',
        id: data[0]?.id 
      },
      { status: 200 }
    )
  } catch (error) {
    // Error saving contact submission
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    )
  }
}