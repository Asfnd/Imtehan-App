import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAuthenticatedUserForRoute } from '@/lib/security/request-verification'
import { csrfProtection } from '@/lib/security/csrf'
import { rateLimit, getClientIP } from '@/lib/security/rateLimiter'
import { runGradingJsonPrompt } from '@/lib/ai/runGradingCompletion'
import { isActivePremium } from '@/lib/is-active-premium'
import {
  buildCssPrecisPrompt,
  buildEssayPrompt,
  buildLongAnswerPrompt,
  buildPmsEssayPrompt,
  buildPmsPrecisPrompt,
} from '@/lib/grading/writingCoachPrompts'
import { countEssayWords, ESSAY_WORD_LIMITS } from '@/lib/writing-coach-config'

// ─── Rate limits (lifetime, never reset) ────────────────────────────────────
const ANON_LIMIT = 1    // anonymous: 1 lifetime grading per IP
const FREE_LIMIT = 1    // free signed-in: 1 lifetime grading total
const PREMIUM_DAILY_LIMIT = Number(process.env.PREMIUM_DAILY_GRADE_CAP ?? '20')
const DEV_LIMIT  = 50   // local dev: generous for testing

/** Reject oversized JSON bodies (DoS / accidental paste bombs). */
const MAX_GRADE_BODY_BYTES = 320 * 1024 // ~320 KiB

// ─── Supabase admin client (bypasses RLS for usage tracking) ────────────────
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

async function getUsageCount(key: string): Promise<number | null> {
  try {
    const { data, error } = await getAdminClient()
      .from('grading_usage')
      .select('count')
      .eq('key', key)
      .maybeSingle()
    if (error) return null
    return (data?.count as number) ?? 0
  } catch {
    return null // fail closed: block grading if metering DB is unreachable
  }
}

async function incrementUsageCount(key: string): Promise<void> {
  try {
    const current = (await getUsageCount(key)) ?? 0
    await getAdminClient()
      .from('grading_usage')
      .upsert(
        { key, count: current + 1, reset_date: new Date().toISOString().split('T')[0], updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      )
  } catch {
    // non-fatal: grading already completed
  }
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // 1. Burst rate limit per IP (protects AI API quota from hammering)
    const ip = getClientIP(request)
    const burst = rateLimit(`grade-burst:${ip}`, { maxRequests: 10, windowMs: 60_000 })
    if (!burst.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      )
    }

    // 2. CSRF (same pattern as contact/newsletter: protects cookie session + AI quota)
    const csrfError = csrfProtection(request)
    if (csrfError) return csrfError

    // 3. Parse body with size cap
    const len = request.headers.get('content-length')
    if (len && Number.parseInt(len, 10) > MAX_GRADE_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 })
    }
    let body: Record<string, unknown>
    try {
      const raw = await request.text()
      if (raw.length > MAX_GRADE_BODY_BYTES) {
        return NextResponse.json({ error: 'Request too large' }, { status: 413 })
      }
      body = JSON.parse(raw) as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { mode } = body
    if (!mode || !['essay', 'precis', 'long-answer'].includes(mode as string)) {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
    }

    const examType: 'css' | 'pms' = body.examType === 'pms' ? 'pms' : 'css'
    const examSuffix = examType === 'pms' ? ':pms' : ''

    // 4. Auth + daily limit logic
    const user = await getAuthenticatedUserForRoute(request)
    const isPremium = isActivePremium(user ?? null)

    const isLocalhost = ip === '127.0.0.1' || ip === '::1' || ip === 'unknown'
    const isDev = process.env.NODE_ENV === 'development'

    let limitKey: string
    let usageLimit: number

    if (!user) {
      // Anonymous: 1 lifetime grading per mode per exam type (CSS vs PMS), tracked by IP
      limitKey = `anon:${ip}:${mode as string}${examSuffix}`
      usageLimit = isLocalhost && isDev ? DEV_LIMIT : ANON_LIMIT
    } else if (isPremium) {
      // Premium: soft daily ceiling (protect OpenRouter / Free Nano metering)
      const day = new Date().toISOString().slice(0, 10)
      limitKey = `user:${user.id}:premium:${day}`
      usageLimit = isLocalhost && isDev ? DEV_LIMIT : PREMIUM_DAILY_LIMIT
    } else {
      // Free signed-in: 1 lifetime grading per mode (essay / precis / long-answer) per exam type
      limitKey = `user:${user.id}:${mode as string}${examSuffix}`
      usageLimit = isLocalhost && isDev ? DEV_LIMIT : FREE_LIMIT
    }

    // 5. Check persistent count (fail closed if metering DB is down)
    const currentCount = await getUsageCount(limitKey)
    if (currentCount == null) {
      return NextResponse.json(
        { error: 'Grading temporarily unavailable. Please try again shortly.' },
        { status: 503 },
      )
    }
    if (currentCount >= usageLimit) {
      return NextResponse.json(
        {
          error: 'Free limit reached',
          upgrade: true,
          requiresAuth: !user,
          message: !user
            ? `You've used your free try for this mode. Sign in free to get 1 try per mode on all devices, or upgrade to Premium for more grading.`
            : isPremium
              ? `Daily grading limit reached. Try again tomorrow.`
              : `You've used your free try for this mode. Upgrade to Premium for more grading.`,
        },
        { status: 429 }
      )
    }

    // 6. OpenRouter (free-model chain by default; see lib/ai/runGradingCompletion.ts)
    if (!process.env.OPENROUTER_API_KEY?.trim()) {
      return NextResponse.json(
        { error: 'AI service not configured. Set OPENROUTER_API_KEY.' },
        { status: 500 }
      )
    }

    // 7. Build prompt
    let prompt: string
    if (mode === 'essay') {
      const { topic, content } = body
      if (!topic || !content) {
        return NextResponse.json({ error: 'Topic and essay content are required' }, { status: 400 })
      }
      const essayText = content as string
      const limits = ESSAY_WORD_LIMITS[examType]
      const words = countEssayWords(essayText)
      if (essayText.length > 48_000 || words > limits.max) {
        return NextResponse.json(
          {
            error:
              examType === 'pms'
                ? `Essay too long (${words} words). PMS essays are about ${limits.lo}-${limits.hi} words (max ${limits.max} to grade).`
                : `Essay too long (${words} words). CSS essays are ${limits.lo}-${limits.hi} words (max ${limits.max} to grade).`,
          },
          { status: 400 }
        )
      }
      prompt =
        examType === 'pms'
          ? buildPmsEssayPrompt(topic as string, content as string)
          : buildEssayPrompt(topic as string, content as string)
    } else if (mode === 'precis') {
      const { original, content } = body
      if (!original || !content) {
        return NextResponse.json({ error: 'Original passage and précis are required' }, { status: 400 })
      }
      prompt =
        examType === 'pms'
          ? buildPmsPrecisPrompt(original as string, content as string)
          : buildCssPrecisPrompt(original as string, content as string)
    } else {
      const { subject, question, marks, content } = body
      if (!subject || !question || !marks || !content) {
        return NextResponse.json({ error: 'Subject, question, marks, and answer are required' }, { status: 400 })
      }
      prompt = buildLongAnswerPrompt(subject as string, question as string, Number(marks), content as string, examType)
    }

    // 8. OpenRouter free-model chain (override with OPENROUTER_MODEL_CHAIN)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 55_000)

    let rawText: string
    let gradingProvider: string | undefined
    try {
      const run = await runGradingJsonPrompt(prompt, controller.signal, { examType })
      rawText = run.rawText
      gradingProvider = run.provider
      if (isDev) console.info(`[grading] used ${run.provider}`)
    } catch (fetchErr: unknown) {
      clearTimeout(timeoutId)
      const isTimeout =
        fetchErr instanceof Error &&
        (fetchErr.name === 'AbortError' ||
          fetchErr.message.includes('timeout') ||
          fetchErr.message.includes('Timeout'))
      if (isDev) console.error('[grading] all providers failed:', fetchErr)
      return NextResponse.json(
        {
          error: isTimeout
            ? 'AI service timed out. Please try again.'
            : 'Could not get a grading response. Please try again in a moment.',
        },
        { status: 502 }
      )
    }
    clearTimeout(timeoutId)

    if (!rawText?.trim()) {
      return NextResponse.json({ error: 'No response from AI. Please try again.' }, { status: 502 })
    }

    // 9. Parse JSON response
    let feedback: Record<string, unknown>
    try {
      feedback = JSON.parse(rawText)
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/)
      if (!match) {
        return NextResponse.json({ error: 'Invalid AI response format. Please try again.' }, { status: 502 })
      }
      try {
        feedback = JSON.parse(match[0])
      } catch {
        return NextResponse.json({ error: 'Could not parse AI response. Please try again.' }, { status: 502 })
      }
    }

    // 10. Increment usage counter (after successful grading) — all tiers
    await incrementUsageCount(limitKey)

    const newCount = (await getUsageCount(limitKey)) ?? currentCount + 1
    const remaining = Math.max(0, usageLimit - newCount)

    return NextResponse.json({
      success: true,
      mode,
      feedback,
      ...(isDev && gradingProvider ? { debugProvider: gradingProvider } : {}),
      usage: {
        remaining,
        limit: usageLimit,
        isPremium,
        isAnon: !user,
        signInBonus: !user ? FREE_LIMIT - ANON_LIMIT : 0,
      },
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Grade API error:', error)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // seconds: requires Vercel Pro (Hobby plan caps at 10s)
