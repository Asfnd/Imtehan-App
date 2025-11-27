import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validateInput, botDetectionSchema } from '@/lib/validation/schemas'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = validateInput(botDetectionSchema, body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    const { score, details } = result.data

    // Get client info
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               null

    const fingerprint = request.headers.get('x-fingerprint') || null

    // Store bot score
    const { error: botError } = await supabase
      .from('bot_scores')
      .insert({
        fingerprint: fingerprint || 'unknown',
        score,
        details,
      })

    if (botError) {
      console.error('Failed to store bot score:', botError)
    }

    // Log security event if high score
    if (score > 0.7) {
      await supabase
        .from('security_logs')
        .insert({
          event_type: 'bot_detected',
          severity: score > 0.9 ? 'high' : 'medium',
          ip_address: ip,
          details: {
            score,
            ...details,
            fingerprint,
          },
        })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Bot detection error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
