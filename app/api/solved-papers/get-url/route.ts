import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getAuthenticatedUserForRoute } from '@/lib/security/request-verification'
import { useCustomStorageUrl } from '@/lib/storage-config'
import { isActivePremium } from '@/lib/is-active-premium'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUserForRoute(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const supabase = await createServerSupabaseClient()

    if (!isActivePremium(user)) {
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

    // 6. Convert to custom storage domain (storage.imtehan.com)
    const finalUrl = useCustomStorageUrl(signedData.signedUrl)

    // 7. Log successful access (optional: store in database for audit trail)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Premium user ${user.email} accessed solved paper: ${paperId}`)
      console.log(`Serving from: ${finalUrl}`)
    }

    // 8. Return signed URL (with custom domain)
    return NextResponse.json({
      success: true,
      url: finalUrl, // Now uses storage.imtehan.com
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
