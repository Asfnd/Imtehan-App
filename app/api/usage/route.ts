import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getAuthenticatedUserForRoute } from '@/lib/security/request-verification'
import { isActivePremium } from '@/lib/is-active-premium'
import { NextRequest, NextResponse } from 'next/server'

// Usage limits (must match usageTracker.ts)
const LIMITS = {
  cssSubject: 2,
  cssIdioms: 1,
  cssIdiomsRandom: 1,
  mptMock: 1,
  mptPast: 1,
  officialPast: 2,
  solved: 0, // Premium only
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUserForRoute(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // 2. Get or create user usage record
    const { data: usage, error: usageError } = await supabase
      .rpc('get_or_create_user_usage', { p_user_id: user.id })

    if (usageError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching usage:', usageError)
      }
      return NextResponse.json(
        { error: 'Failed to fetch usage' },
        { status: 500 }
      )
    }

    // 3. Return usage data
    return NextResponse.json({
      usage: {
        cssSubjectQuizzes: usage.css_subject_quizzes || 0,
        cssIdiomsQuizzes: usage.css_idioms_quizzes || 0,
        cssIdiomsRandom: usage.css_idioms_random || 0,
        mptMockTests: usage.mpt_mock_tests || 0,
        mptPastPapers: usage.mpt_past_papers || 0,
        officialPastPapers: usage.official_past_papers || 0,
        solvedPapers: usage.solved_papers || 0,
      },
      limits: LIMITS,
      isPremium: isActivePremium(user),
    })

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Usage API error:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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

    // 2. Get request body
    const body = await request.json()
    const { type } = body

    if (!type) {
      return NextResponse.json(
        { error: 'Usage type required' },
        { status: 400 }
      )
    }

    // 3. Map type to database column
    const columnMap: Record<string, string> = {
      cssSubject: 'css_subject_quizzes',
      cssIdioms: 'css_idioms_quizzes',
      cssIdiomsRandom: 'css_idioms_random',
      mptMock: 'mpt_mock_tests',
      mptPast: 'mpt_past_papers',
      officialPast: 'official_past_papers',
      solved: 'solved_papers',
    }

    const column = columnMap[type]
    if (!column) {
      return NextResponse.json(
        { error: 'Invalid usage type' },
        { status: 400 }
      )
    }

    // 4. Get current usage
    const { data: currentUsage, error: fetchError } = await supabase
      .rpc('get_or_create_user_usage', { p_user_id: user.id })

    if (fetchError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching usage:', fetchError)
      }
      return NextResponse.json(
        { error: 'Failed to fetch usage' },
        { status: 500 }
      )
    }

    // 5. Increment the usage
    const newValue = (currentUsage[column] || 0) + 1

    const { error: updateError } = await supabase
      .from('user_usage_tracking')
      .update({ [column]: newValue })
      .eq('user_id', user.id)

    if (updateError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error updating usage:', updateError)
      }
      return NextResponse.json(
        { error: 'Failed to update usage' },
        { status: 500 }
      )
    }

    // 6. Return updated usage
    return NextResponse.json({
      success: true,
      [column]: newValue,
    })

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Usage increment API error:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Edge runtime for better performance
export const runtime = 'edge'
export const dynamic = 'force-dynamic'
