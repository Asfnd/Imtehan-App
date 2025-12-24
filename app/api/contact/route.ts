import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { rateLimit, getClientIP, RATE_LIMITS } from '@/lib/security/rateLimiter'
import {
  isValidEmail,
  validateName,
  validateSubject,
  validateMessage,
  detectSuspiciousPatterns,
} from '@/lib/security/input-validation'

/**
 * SECURITY: Contact Submission Endpoint
 * - Rate limiting to prevent spam
 * - Comprehensive input validation
 * - Length limits on all fields
 * - Attack pattern detection
 */
export async function POST(request: NextRequest) {
  try {
    // SECURITY: Rate limiting - prevent spam
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
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          },
        }
      )
    }

    const body = await request.json()
    const { name, email, subject, message, website } = body as {
      name?: unknown
      email?: unknown
      subject?: unknown
      message?: unknown
      website?: unknown
    }

    // SECURITY: Honeypot check - if 'website' field is filled, it's likely a bot
    if (website && typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 403 }
      )
    }

    // SECURITY: Validate all fields are present and correct type
    if (typeof name !== 'string' || typeof email !== 'string' ||
        typeof subject !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      )
    }

    // SECURITY: Validate name
    const nameValidation = validateName(name)
    if (!nameValidation.valid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400 }
      )
    }

    // SECURITY: Validate email (RFC 5322 compliant)
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // SECURITY: Validate subject
    const subjectValidation = validateSubject(subject)
    if (!subjectValidation.valid) {
      return NextResponse.json(
        { error: subjectValidation.error },
        { status: 400 }
      )
    }

    // SECURITY: Validate message
    const messageValidation = validateMessage(message)
    if (!messageValidation.valid) {
      return NextResponse.json(
        { error: messageValidation.error },
        { status: 400 }
      )
    }

    // SECURITY: Detect suspicious patterns in message
    const suspiciousPatterns = detectSuspiciousPatterns(message)
    if (suspiciousPatterns.length > 0) {
      console.warn('Suspicious patterns detected in contact form:', {
        ip: clientIP,
        patterns: suspiciousPatterns,
      })
      return NextResponse.json(
        { error: 'Message contains suspicious content' },
        { status: 400 }
      )
    }

    // SECURITY: Use server-side Supabase client (not from user)
    const supabase = await createServerSupabaseClient()

    // SECURITY: Insert into database with validated/sanitized data
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: nameValidation.sanitized || name.trim(),
          email: email.trim().toLowerCase(),
          subject: subjectValidation.sanitized || subject.trim(),
          message: messageValidation.sanitized || message.trim(),
        },
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