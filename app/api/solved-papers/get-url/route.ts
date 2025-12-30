import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()

    // 1. Validate user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // 2. Check premium status from user metadata
    const isPremium = user.user_metadata?.is_premium === true

    if (!isPremium) {
      // Log unauthorized access attempt (dev only)
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Non-premium user ${user.email} attempted to access solved papers`)
      }

      return NextResponse.json(
        { error: 'Premium subscription required' },
        { status: 403 }
      )
    }

    // 3. Get paper ID from request body
    const body = await request.json()
    const { paperId } = body

    if (!paperId) {
      return NextResponse.json(
        { error: 'Paper ID required' },
        { status: 400 }
      )
    }

    // 4. Map paper IDs to file paths (you can expand this mapping)
    const paperMapping: Record<string, string> = {
      '1': 'solved-papers/jwt_css_solved_paper_2024.pdf',
      // Add more papers as needed
    }

    const filePath = paperMapping[paperId]

    if (!filePath) {
      return NextResponse.json(
        { error: 'Invalid paper ID' },
        { status: 404 }
      )
    }

    // 5. Generate signed URL with 1-hour expiration
    const { data: signedData, error: signError } = await supabase.storage
      .from('css-solved-papers')
      .createSignedUrl(filePath, 3600) // 1 hour expiration

    if (signError || !signedData) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error generating signed URL:', signError)
      }
      return NextResponse.json(
        { error: 'Failed to generate access URL' },
        { status: 500 }
      )
    }

    // 6. Log successful access (optional: store in database for audit trail)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Premium user ${user.email} accessed solved paper: ${paperId}`)
    }

    // 7. Return signed URL
    return NextResponse.json({
      success: true,
      url: signedData.signedUrl,
      expiresIn: 3600,
      paperId
    })

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Solved papers API error:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Rate limiting metadata
export const runtime = 'edge'
export const dynamic = 'force-dynamic'
