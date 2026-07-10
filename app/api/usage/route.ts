import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getAuthenticatedUserForRoute } from '@/lib/security/request-verification'
import { isActivePremium } from '@/lib/is-active-premium'
import {
  SIGNED_IN_LIMITS,
  USAGE_TYPE_TO_DB_COLUMN,
  type FreeTrialUsageType,
} from '@/lib/free-trial-limits'
import { NextRequest, NextResponse } from 'next/server'

const LIMITS = SIGNED_IN_LIMITS

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUserForRoute(request)
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const supabase = await createServerSupabaseClient()

    const { data: usage, error: usageError } = await supabase.rpc('get_or_create_user_usage', {
      p_user_id: user.id,
    })

    if (usageError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching usage:', usageError)
      }
      return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 })
    }

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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUserForRoute(request)
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    if (isActivePremium(user)) {
      return NextResponse.json({ success: true, premium: true })
    }

    const supabase = await createServerSupabaseClient()
    const body = await request.json()
    const type = body?.type as FreeTrialUsageType | undefined

    if (!type || !(type in USAGE_TYPE_TO_DB_COLUMN)) {
      return NextResponse.json({ error: 'Usage type required' }, { status: 400 })
    }

    const limit = LIMITS[type]
    if (limit <= 0) {
      return NextResponse.json(
        { error: 'Premium required', code: 'PREMIUM_REQUIRED' },
        { status: 403 }
      )
    }

    const column = USAGE_TYPE_TO_DB_COLUMN[type as Exclude<FreeTrialUsageType, 'guessPapers'>]

    const { data: currentUsage, error: fetchError } = await supabase.rpc('get_or_create_user_usage', {
      p_user_id: user.id,
    })

    if (fetchError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching usage:', fetchError)
      }
      return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 })
    }

    const currentValue = currentUsage[column] || 0
    if (currentValue >= limit) {
      return NextResponse.json(
        { error: 'Free trial limit reached', code: 'LIMIT_REACHED' },
        { status: 403 }
      )
    }

    const newValue = currentValue + 1

    const { error: updateError } = await supabase
      .from('user_usage_tracking')
      .update({ [column]: newValue })
      .eq('user_id', user.id)

    if (updateError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error updating usage:', updateError)
      }
      return NextResponse.json({ error: 'Failed to update usage' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      [column]: newValue,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Usage increment API error:', error)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
