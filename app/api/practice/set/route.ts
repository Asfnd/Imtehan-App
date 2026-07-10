import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUserForRoute } from '@/lib/security/request-verification'
import { isActivePremium } from '@/lib/is-active-premium'
import {
  attachGuestCookie,
  consumeGuestDemo,
  decidePracticeAccess,
  getOrCreateGuestToken,
} from '@/lib/demo-access'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import {
  fetchMCQsBySet,
  fetchMCQsByDifficultySet,
  fetchMCQsByTopicSet,
} from '@/lib/quiz-fetcher'
import { getExamConfig } from '@/lib/exam-configs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Body = {
  source?: 'exam' | 'mdcat' | 'fsc' | 'difficulty' | 'topic'
  examSlug?: string
  subjectSlug?: string
  mode?: string
  setNumber?: number
  dbTable?: string
  difficulty?: string
  tag?: string
  useTagsArray?: boolean
  subjectField?: string
  noTypeFilter?: boolean
  targetExam?: string
  modeType?: string
}

const MODE_TYPE: Record<string, string> = {
  'most-repeated': 'most_repeated',
  'most-important': 'most_important',
  'past-papers': 'practice',
  practice: 'mixed',
}

function deny(code: string, status: number, setCookie?: string) {
  const res = NextResponse.json({ error: code, code }, { status })
  if (setCookie) attachGuestCookie(res, setCookie)
  return res
}

export async function POST(request: NextRequest) {
  let body: Body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const setNumber = Number(body.setNumber)
  if (!Number.isFinite(setNumber) || setNumber < 1) {
    return NextResponse.json({ error: 'Invalid setNumber' }, { status: 400 })
  }

  const user = await getAuthenticatedUserForRoute(request)
  const premium = isActivePremium(user)
  const { token: guestToken, setCookie } = await getOrCreateGuestToken()

  const decision = await decidePracticeAccess({
    isSignedIn: !!user,
    isPremium: premium,
    guestToken,
    setOrMockNumber: setNumber,
  })

  if (!decision.allow) {
    const status = decision.code === 'REQUIRE_SIGN_IN' || decision.code === 'DEMO_USED' ? 401 : 403
    return deny(decision.code, status, setCookie ? guestToken : undefined)
  }

  try {
    const admin = createAdminSupabaseClient()
    let mcqs

    if (body.source === 'difficulty') {
      if (!body.dbTable || !body.difficulty) {
        return NextResponse.json({ error: 'Missing difficulty params' }, { status: 400 })
      }
      mcqs = await fetchMCQsByDifficultySet(admin, {
        dbTable: body.dbTable,
        difficulty: body.difficulty,
        setNumber,
        subjectField: body.subjectField,
      })
    } else if (body.source === 'topic') {
      if (!body.dbTable || !body.tag) {
        return NextResponse.json({ error: 'Missing topic params' }, { status: 400 })
      }
      mcqs = await fetchMCQsByTopicSet(admin, {
        dbTable: body.dbTable,
        tag: body.tag,
        useTagsArray: !!body.useTagsArray,
        setNumber,
      })
    } else if (body.source === 'mdcat' || body.source === 'fsc') {
      if (!body.dbTable) {
        return NextResponse.json({ error: 'Missing dbTable' }, { status: 400 })
      }
      const offset = (setNumber - 1) * 20
      const cols =
        'id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, topic, subtopic'
      let query = admin.from(body.dbTable).select(cols)
      if (body.difficulty) query = query.eq('difficulty', body.difficulty)
      else if (body.tag) query = query.eq('topic', body.tag)
      const { data, error } = await query.order('id').range(offset, offset + 19)
      if (error) throw new Error(error.message)
      mcqs = (data ?? []).map((row: Record<string, unknown>) => ({
        id: Number(row.id),
        question: String(row.question),
        option_a: String(row.option_a),
        option_b: String(row.option_b),
        option_c: String(row.option_c),
        option_d: String(row.option_d),
        correct_answer: String(row.correct_answer).charAt(0).toUpperCase(),
        explanation: row.explanation ? String(row.explanation) : undefined,
      }))
    } else {
      // exam / mdcat / fsc mode sets
      let dbTable = body.dbTable
      let subjectField = body.subjectField
      let noTypeFilter = body.noTypeFilter
      let targetExam = body.targetExam
      let modeType = body.modeType

      if (!dbTable && body.examSlug && body.subjectSlug) {
        const config = getExamConfig(body.examSlug)
        const section = config?.sections.find((s) => s.slug === body.subjectSlug)
        if (!config || !section) {
          return NextResponse.json({ error: 'Unknown exam/subject' }, { status: 404 })
        }
        dbTable = section.dbTable
        subjectField = section.subjectField
        noTypeFilter = section.noTypeFilter
        if (body.mode === 'past-papers' && config.pastPapersExam) {
          targetExam = config.pastPapersExam
        }
        modeType = MODE_TYPE[body.mode ?? 'practice'] ?? 'mixed'
      }

      if (!dbTable) {
        return NextResponse.json({ error: 'Missing dbTable' }, { status: 400 })
      }

      mcqs = await fetchMCQsBySet(admin, {
        dbTable,
        setNumber,
        mode: (modeType as 'practice' | 'most_repeated' | 'most_important' | 'mixed') || 'mixed',
        noTypeFilter: !!noTypeFilter,
        subjectField,
        targetExam,
      })
    }

    if (!mcqs?.length) {
      return NextResponse.json({ error: 'Set not found' }, { status: 404 })
    }

    if (decision.consumeDemo) {
      await consumeGuestDemo(
        guestToken,
        `set:${body.source ?? 'exam'}:${body.examSlug ?? body.dbTable}:${setNumber}`
      )
    }

    const res = NextResponse.json({
      ok: true,
      mcqs,
      setNumber,
      demoConsumed: decision.consumeDemo,
    })
    if (setCookie) attachGuestCookie(res, guestToken)
    return res
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('practice/set error', e)
    }
    return NextResponse.json({ error: 'Failed to load set' }, { status: 500 })
  }
}
