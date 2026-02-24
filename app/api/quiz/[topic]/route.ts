import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { rateLimit, getClientIP, RATE_LIMITS } from '@/lib/security/rateLimiter'
import { validateInput } from '@/lib/security/request-verification'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topic: string }> }
) {
  // SECURITY: Rate limiting to prevent data scraping
  const clientIP = getClientIP(request)
  const rateLimitResult = rateLimit(`quiz-topic:${clientIP}`, RATE_LIMITS.QUIZ_DATA)

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again later.',
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

  try {
    const supabase = await createServerSupabaseClient()
    const { topic } = await params

    // SECURITY: Validate topic parameter to prevent SQL injection
    const topicValidation = validateInput(topic, {
      minLength: 1,
      maxLength: 100,
      pattern: /^[a-zA-Z0-9\s\-&(),']+$/, // Allow letters, numbers, spaces, and common punctuation
    }, 'topic')

    if (!topicValidation.valid) {
      return NextResponse.json(
        { error: topicValidation.error || 'Invalid topic parameter' },
        { status: 400 }
      )
    }

    // Get a quiz for this topic (using validated input)
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('topic', topic)
      .limit(1)
      .single()

    if (error || !quiz) {
      return NextResponse.json(
        { error: 'Quiz not found for this topic' },
        { status: 404 }
      )
    }

    return NextResponse.json({ quiz })
  } catch (error) {
    console.error('Error fetching quiz:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz' },
      { status: 500 }
    )
  }
}
