import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUserForRoute } from '@/lib/security/request-verification'
import { isActivePremium } from '@/lib/is-active-premium'
import {
  attachGuestCookie,
  consumeDemo,
  decidePracticeAccess,
  getOrCreateGuestToken,
} from '@/lib/demo-access'
import {
  cachedFetchMCQsBySet,
  cachedFetchMCQsByDifficultySet,
  cachedFetchMCQsByTopicSet,
  cachedMdcatRangeSet,
} from '@/lib/cached-quiz-fetch'
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
  subtopicField?: string
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
    userId: user?.id,
    setOrMockNumber: setNumber,
  })

  if (!decision.allow) {
    const status = decision.code === 'PREMIUM_REQUIRED' ? 403 : 401
    return deny(decision.code, status, setCookie ? guestToken : undefined)
  }

  try {
    let mcqs

    if (body.source === 'difficulty') {
      if (!body.dbTable || !body.difficulty) {
        return NextResponse.json({ error: 'Missing difficulty params' }, { status: 400 })
      }
      mcqs = await cachedFetchMCQsByDifficultySet({
        dbTable: body.dbTable,
        difficulty: body.difficulty,
        setNumber,
        subjectField: body.subjectField,
        examSlug: body.examSlug,
      })
    } else if (body.source === 'topic') {
      if (!body.dbTable || !body.tag) {
        return NextResponse.json({ error: 'Missing topic params' }, { status: 400 })
      }
      mcqs = await cachedFetchMCQsByTopicSet({
        dbTable: body.dbTable,
        tag: body.tag,
        useTagsArray: !!body.useTagsArray,
        setNumber,
        examSlug: body.examSlug,
      })
    } else if (body.source === 'mdcat' || body.source === 'fsc') {
      if (!body.dbTable) {
        return NextResponse.json({ error: 'Missing dbTable' }, { status: 400 })
      }
      mcqs = await cachedMdcatRangeSet({
        dbTable: body.dbTable,
        setNumber,
        difficulty: body.difficulty,
        topic: body.tag,
      })
    } else {
      let dbTable = body.dbTable
      let subjectField = body.subjectField
      let subtopicField = body.subtopicField
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
        subtopicField = section.subtopicField
        noTypeFilter = section.noTypeFilter
        if (body.mode === 'past-papers' && config.pastPapersExam) {
          targetExam = config.pastPapersExam
        }
        modeType = MODE_TYPE[body.mode ?? 'practice'] ?? 'mixed'
      }

      if (!dbTable) {
        return NextResponse.json({ error: 'Missing dbTable' }, { status: 400 })
      }

      const sectionCfg =
        body.examSlug && body.subjectSlug
          ? getExamConfig(body.examSlug)?.sections.find((s) => s.slug === body.subjectSlug)
          : undefined

      mcqs = await cachedFetchMCQsBySet({
        dbTable,
        setNumber,
        mode: (modeType as 'practice' | 'most_repeated' | 'most_important' | 'mixed') || 'mixed',
        noTypeFilter: !!noTypeFilter,
        subjectField,
        subtopicField: subtopicField ?? sectionCfg?.subtopicField,
        targetExam,
        examSlug: body.examSlug,
        questionNeedles: sectionCfg?.questionNeedles,
      })
    }

    if (!mcqs?.length) {
      return NextResponse.json({ error: 'Set not found' }, { status: 404 })
    }

    if (decision.consumeDemo) {
      await consumeDemo({
        guestToken,
        userId: user?.id,
        consumeAs: decision.consumeAs,
        kind: `set:${body.source ?? 'exam'}:${body.examSlug ?? body.dbTable}:${setNumber}`,
      })
    }

    const res = NextResponse.json({
      ok: true,
      mcqs,
      setNumber,
      demoConsumed: decision.consumeDemo,
      isDemo: decision.consumeDemo,
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
