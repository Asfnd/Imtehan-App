import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAuthenticatedUser } from '@/lib/security/request-verification'
import { rateLimit, getClientIP } from '@/lib/security/rateLimiter'

// ─── Rate limits (lifetime, never reset) ────────────────────────────────────
const ANON_LIMIT = 1    // anonymous: 1 lifetime grading per IP
const FREE_LIMIT = 1    // free signed-in: 1 lifetime grading total
const DEV_LIMIT  = 50   // local dev: generous for testing

// ─── Supabase admin client (bypasses RLS for usage tracking) ────────────────
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

async function getUsageCount(key: string): Promise<number> {
  try {
    const { data } = await getAdminClient()
      .from('grading_usage')
      .select('count')
      .eq('key', key)
      .single()
    return (data?.count as number) ?? 0
  } catch {
    return 0 // fail open — don't block users if DB is unreachable
  }
}

async function incrementUsageCount(key: string): Promise<void> {
  try {
    const current = await getUsageCount(key)
    await getAdminClient()
      .from('grading_usage')
      .upsert(
        { key, count: current + 1, reset_date: new Date().toISOString().split('T')[0], updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      )
  } catch {
    // non-fatal — grading already completed
  }
}

// ─── Prompts ─────────────────────────────────────────────────────────────────

function buildEssayPrompt(topic: string, content: string): string {
  const wc = content.trim().split(/\s+/).length
  return `You are a senior FPSC CSS examiner with 20 years of experience marking CSS Essay papers. You have a reputation for brutal honesty — you give the same feedback you would give in an official marking session, not the encouraging feedback a tutor would give.

CSS ESSAY PAPER — OFFICIAL STANDARDS:
- Passing mark: 50/100. Most candidates who clear CSS score 55–65. A score above 70 is exceptional.
- Expected length: 1,000–1,200 words. This essay is ${wc} words.
- Paper is worth 100 marks in the CSS allocation.

WHAT FPSC EXAMINERS EXPLICITLY REWARD (mark these as strengths):
1. A specific, arguable thesis in the opening paragraph — not a definition, not "this essay will explore"
2. Topic sentences that control each body paragraph
3. Current affairs references with specifics: year, country, statistic, policy name (2022–2026)
4. Pakistan-specific analysis and examples (not just generic global points)
5. International comparisons — citing successful models from other countries with context
6. A dedicated "Way Forward" paragraph with numbered, actionable policy recommendations
7. Balanced argumentation — steelmanning the opposing view before refuting it
8. Formal register maintained throughout — no colloquialisms, no "I think/I feel/In my opinion"
9. Precise data points: GDP figures, Human Development Index rankings, literacy rates, specific legislation
10. Smooth transitions between paragraphs that show logical progression

WHAT FPSC EXAMINERS EXPLICITLY PENALISE (mark these as weaknesses):
1. Opening with a dictionary definition or "Since time immemorial…" / "In today's world…"
2. No clear thesis or a thesis that merely restates the topic
3. One-sided essay — making only one argument without acknowledging counterarguments
4. Absent or vague conclusion — "in conclusion, we must all work together"
5. No "Way Forward" section or vague recommendations without specifics
6. Using first-person ("I believe", "I think", "we should")
7. Bullet points or numbered lists inside the essay body
8. Padding — repeating the same point in different words
9. Zero statistics or data anywhere in the essay
10. Missing current affairs — a CSS essay on any topic must reference recent events
11. Generic international examples without context ("As seen in developed countries…")

GRADE BOUNDARIES (FPSC standard):
- A (80–100): Exceptional — outstanding thesis, expert analysis, rich current affairs, specific recommendations, near-perfect language
- B (65–79): Good — solid argument, some data/current affairs, decent structure, minor weaknesses
- C (50–64): Average — passes CSS, but analysis is shallow, lacks specifics, or has structural issues
- D (40–49): Below average — fails CSS, significant weaknesses in multiple criteria
- F (0–39): Failing — fundamental problems; would not pass any CSS examiner

ESSAY TOPIC: ${topic}
WORD COUNT: ${wc} words (CSS target: 1,000–1,200)

ESSAY:
${content}

GRADING INSTRUCTIONS:
1. Be brutally honest. If this essay would fail CSS, say so.
2. For annotations: quote the EXACT sentence or phrase (max 20 words). Do not paraphrase. Prioritise: the strongest sentence (strength), the weakest argument (weakness), and the most important missing element shown where it should have appeared (suggestion).
3. For missingPoints: name specific topics, statistics, policies, or events the student should have included given this topic and the current date (2025–2026). Be specific — not "add more examples" but "missing reference to Pakistan's IMF Extended Fund Facility 2023 agreement" or "no mention of Digital Pakistan policy".
4. overallFeedback must include: (a) a one-line CSS verdict — "This essay would PASS/FAIL a CSS examiner" — (b) the single most important thing to fix, (c) what was done well.

Return ONLY valid JSON, no markdown, no code fences:
{
  "score": <integer 0–100>,
  "grade": <"A"|"B"|"C"|"D"|"F">,
  "breakdown": {
    "content":   { "score": <0–40>, "max": 40, "comment": "<specific, actionable 2–3 sentence assessment>" },
    "analysis":  { "score": <0–25>, "max": 25, "comment": "<specific, actionable 2–3 sentence assessment>" },
    "structure": { "score": <0–20>, "max": 20, "comment": "<specific, actionable 2–3 sentence assessment>" },
    "language":  { "score": <0–15>, "max": 15, "comment": "<specific, actionable 2–3 sentence assessment>" }
  },
  "annotations": [
    { "quote": "<exact verbatim text from essay, max 20 words>", "type": <"strength"|"weakness"|"suggestion">, "comment": "<specific examiner comment — what this does well or how to fix it>" }
  ],
  "missingPoints": ["<specific missing content — name the actual topic/statistic/event>"],
  "overallFeedback": "<CSS verdict + most important fix + what was done well — 3–5 sentences>"
}`
}

function buildPrecisPrompt(original: string, content: string): string {
  const originalWC = original.trim().split(/\s+/).length
  const submittedWC = content.trim().split(/\s+/).length
  const targetWC = Math.round(originalWC / 3)
  const lowerBound = Math.round(targetWC * 0.95)
  const upperBound = Math.round(targetWC * 1.05)
  const wcPassed = submittedWC >= lowerBound && submittedWC <= upperBound

  return `You are a CSS English (Précis & Composition) examiner. Précis writing is a distinct skill tested in Paper I of CSS English. You mark with the same rigour as an official FPSC examiner.

CSS PRÉCIS WRITING — OFFICIAL STANDARDS:
- A précis must be exactly one-third of the original passage (±5% tolerance)
- Original: ${originalWC} words → Target: ${targetWC} words (acceptable range: ${lowerBound}–${upperBound} words)
- Student submitted: ${submittedWC} words → Word count ${wcPassed ? 'PASSED ✓' : 'FAILED ✗'}

THE SIX CSS PRÉCIS RULES — check each strictly:

RULE 1 — LENGTH (one-third ±5%):
Target range: ${lowerBound}–${upperBound} words. Student wrote ${submittedWC} words.
${wcPassed ? 'PASSED' : submittedWC < lowerBound ? `FAILED — ${lowerBound - submittedWC} words short of minimum` : `FAILED — ${submittedWC - upperBound} words over maximum`}

RULE 2 — CONTINUOUS PROSE:
The précis must be written in flowing paragraphs. ANY use of bullet points, numbered lists, subheadings, or dashes to separate points is an automatic fail for this rule.

RULE 3 — NO PERSONAL ADDITIONS:
The précis must contain ONLY ideas from the original passage. No opinions, no external facts, no elaboration not present in the original. Check for any sentence that cannot be traced to a specific part of the original.

RULE 4 — ALL KEY POINTS PRESERVED:
Identify the 5–7 central ideas of the original passage. Check whether each appears in the précis. Any missing key idea is a failure for this rule.

RULE 5 — THIRD PERSON THROUGHOUT:
Any use of "I", "we", "our", "my", "you", or "your" is a direct rule violation. The précis must report: "The author argues that…", "The passage contends…", "According to the text…" etc.

RULE 6 — ORIGINAL TITLE IN OWN WORDS:
The précis must begin with or be accompanied by a title that the student has composed themselves (not copied from the original). Evaluate: does the title capture the main theme? Is it in the student's own words?

SCORING GUIDE:
- A (80–100): All 6 rules followed, all key points captured, fluent prose
- B (65–79): 5 rules followed, minor omissions or language issues
- C (50–64): Passes with 4 rules, notable weaknesses in preservation of key ideas
- D (40–49): 3 rules, significant problems
- F (0–39): 2 or fewer rules, or word count is more than 20% off target

ORIGINAL PASSAGE (${originalWC} words):
${original}

STUDENT'S PRÉCIS (${submittedWC} words):
${content}

GRADING INSTRUCTIONS:
1. For Rule 4, explicitly list which key points from the original are missing from the précis.
2. For Rule 5, quote the exact first-person word or phrase if found.
3. For overallFeedback: include a CSS verdict ("This précis would PASS/FAIL CSS") and the single most important correction needed.

Return ONLY valid JSON, no markdown, no code fences:
{
  "score": <integer 0–100>,
  "grade": <"A"|"B"|"C"|"D"|"F">,
  "wordCount": {
    "submitted": ${submittedWC},
    "original": ${originalWC},
    "target": ${targetWC},
    "passed": ${wcPassed}
  },
  "rules": [
    { "rule": "Length — one-third of original (±5%)", "passed": <boolean>, "comment": "<specific: state actual vs target word count and what to do>" },
    { "rule": "Continuous prose — no bullets, lists, or headings", "passed": <boolean>, "comment": "<quote the violation if found, or confirm compliance>" },
    { "rule": "No personal additions or opinions", "passed": <boolean>, "comment": "<identify any added content not in original, or confirm compliance>" },
    { "rule": "All key points from original preserved", "passed": <boolean>, "comment": "<list which key ideas are missing, or confirm all captured>" },
    { "rule": "Third person throughout", "passed": <boolean>, "comment": "<quote any first-person violation found, or confirm compliance>" },
    { "rule": "Title in own words", "passed": <boolean>, "comment": "<evaluate the title's accuracy and originality, or note if absent>" }
  ],
  "missedKeyPoints": ["<direct quote or close paraphrase of key idea from original that is absent from précis>"],
  "overallFeedback": "<CSS verdict + single most important fix + what was done well — 3–4 sentences>"
}`
}

function buildLongAnswerPrompt(subject: string, question: string, marks: number, content: string): string {
  const wc = content.trim().split(/\s+/).length
  const expectedPoints = Math.ceil(marks / 2)
  const wordTargets: Record<number, string> = {
    6:  '150–200 words, 3 key points',
    10: '300–400 words, 5 key points',
    12: '400–500 words, 6 key points',
    20: '600–800 words, 8–10 key points',
  }
  const wordTarget = wordTargets[marks] ?? `${Math.round(marks * 30)}–${Math.round(marks * 40)} words, ${expectedPoints} key points`

  const subjectGuidance: Record<string, string> = {
    'International Relations':       'Cite specific treaties, UN resolutions, IR theories (Realism/Liberalism/Constructivism), and recent geopolitical events (2022–2026). Pakistan\'s foreign policy context is expected.',
    'Economics':                     'Include quantitative data: GDP figures, inflation rates, fiscal deficit %, current account balance. Pakistan Economic Survey data and IMF/World Bank assessments are expected.',
    'Political Science':             'Reference constitutional provisions, political theorists (Locke, Rousseau, Huntington), comparative politics examples, and Pakistan\'s constitutional framework.',
    'Public Administration':         'Cite administrative models (Weberian bureaucracy, NPM), Pakistan\'s administrative structure, and specific reform initiatives.',
    'Pakistan Affairs':              'Must include Pakistan-specific examples, historical context, constitutional provisions, and current affairs references.',
    'Current Affairs':               'Requires recent events (2023–2026) with specific dates, countries involved, outcomes, and Pakistan\'s position.',
    'History of Pakistan & India':   'Specific dates, personalities, treaties, and historical significance are required. Avoid vague generalisations.',
    'Sociology':                     'Reference sociological theories and theorists (Durkheim, Weber, Marx), empirical data, and Pakistan\'s social context.',
    'Law':                           'Cite specific legislation, case law where relevant, constitutional articles, and legal principles.',
    'Economics': 'Include data: GDP, inflation, fiscal/current account figures. Pakistan Economic Survey and IMF data expected.',
  }

  const subjectNote = subjectGuidance[subject] ?? `Apply ${subject}-specific terminology, cite relevant theories or frameworks, include empirical examples, and where applicable reference Pakistan\'s context.`

  return `You are a CSS ${subject} paper examiner marking a ${marks}-mark question. You apply the same rigorous standards as an FPSC official examiner.

CSS SUBJECT PAPER MARKING STANDARDS:
- A ${marks}-mark question requires: ${wordTarget}
- This answer is ${wc} words${wc < Math.round(marks * 20) ? ' — significantly under the expected length' : ''}
- CSS examiners award approximately 2 marks per well-developed key point
- Every answer must have: brief introduction establishing context, substantive body, conclusion/recommendations

SUBJECT-SPECIFIC REQUIREMENTS FOR ${subject.toUpperCase()}:
${subjectNote}

WHAT CSS EXAMINERS REWARD:
1. Introduction that directly addresses the question (not a definition dump)
2. Each point fully developed with explanation + evidence/example
3. Subject-specific terminology used correctly
4. Pakistan-specific context and examples where applicable
5. Contemporary references (2022–2026) — events, statistics, policies
6. A conclusion that synthesises the argument and suggests a way forward
7. Analytical depth — not just "what" but "why" and "so what"

WHAT CSS EXAMINERS PENALISE:
1. Lists of points without development ("Firstly... Secondly... Thirdly..." with no explanation)
2. Vague generalisations with no supporting data or examples
3. Ignoring the Pakistan dimension when clearly applicable
4. No conclusion or a one-sentence ending
5. Repeating the question in different words to pad length
6. Factual inaccuracies
7. Missing obvious key points that any ${subject} student should know

GRADE BOUNDARIES (for this ${marks}-mark question):
- A: ${Math.round(marks * 0.80)}–${marks} — exceptional, examiner-level knowledge
- B: ${Math.round(marks * 0.65)}–${Math.round(marks * 0.79)} — good, solid answer
- C: ${Math.round(marks * 0.50)}–${Math.round(marks * 0.64)} — passes CSS, but gaps in coverage or analysis
- D: ${Math.round(marks * 0.40)}–${Math.round(marks * 0.49)} — fails, significant weaknesses
- F: 0–${Math.round(marks * 0.39)} — fails badly, fundamental problems

QUESTION: ${question}

STUDENT'S ANSWER (${wc} words):
${content}

GRADING INSTRUCTIONS:
1. Be specific in comments — name the actual missing topics, statistics, or policies.
2. For annotations: quote exact phrases. Mark the best-developed point (strength), the weakest or most underdeveloped point (weakness), and the most critical missing element (suggestion).
3. missingPoints: list the specific key ideas, data points, or examples that a CSS examiner would expect but are absent. Name them explicitly.
4. overallFeedback: state the CSS verdict ("This answer would score approximately X/${marks} in a real CSS exam"), identify the single biggest gap, and note what was done well.

Return ONLY valid JSON, no markdown, no code fences:
{
  "score": <integer 0–${marks}>,
  "grade": <"A"|"B"|"C"|"D"|"F">,
  "breakdown": {
    "content":   { "score": <0–${Math.round(marks * 0.40)}>, "max": ${Math.round(marks * 0.40)}, "comment": "<specific 2–3 sentence assessment naming actual gaps>" },
    "analysis":  { "score": <0–${Math.round(marks * 0.30)}>, "max": ${Math.round(marks * 0.30)}, "comment": "<specific 2–3 sentence assessment>" },
    "structure": { "score": <0–${Math.round(marks * 0.20)}>, "max": ${Math.round(marks * 0.20)}, "comment": "<specific 2–3 sentence assessment>" },
    "language":  { "score": <0–${Math.round(marks * 0.10)}>, "max": ${Math.round(marks * 0.10)}, "comment": "<specific 2–3 sentence assessment>" }
  },
  "annotations": [
    { "quote": "<exact verbatim text, max 20 words>", "type": <"strength"|"weakness"|"suggestion">, "comment": "<specific examiner comment>" }
  ],
  "missingPoints": ["<specific missing topic/statistic/policy/event that a CSS examiner expects>"],
  "overallFeedback": "<CSS verdict with approximate score + biggest gap + what was done well — 3–5 sentences>"
}`
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // 1. Burst rate limit per IP (protects Gemini quota from hammering)
    const ip = getClientIP(request)
    const burst = rateLimit(`grade-burst:${ip}`, { maxRequests: 10, windowMs: 60_000 })
    if (!burst.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      )
    }

    // 2. Parse body early to get mode
    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { mode } = body
    if (!mode || !['essay', 'precis', 'long-answer'].includes(mode as string)) {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
    }

    // 3. Auth + daily limit logic
    const user = await getAuthenticatedUser()
    const isPremium = user?.user_metadata?.is_premium === true

    const isLocalhost = ip === '127.0.0.1' || ip === '::1' || ip === 'unknown'
    const isDev = process.env.NODE_ENV === 'development'

    let limitKey: string
    let usageLimit: number

    if (!user) {
      // Anonymous: 1 lifetime grading per mode, tracked by IP
      limitKey = `anon:${ip}:${mode as string}`
      usageLimit = isLocalhost && isDev ? DEV_LIMIT : ANON_LIMIT
    } else if (isPremium) {
      // Premium: unlimited
      limitKey = `user:${user.id}`
      usageLimit = Infinity
    } else {
      // Free signed-in: 1 lifetime grading per mode (essay / precis / long-answer)
      limitKey = `user:${user.id}:${mode as string}`
      usageLimit = isLocalhost && isDev ? DEV_LIMIT : FREE_LIMIT
    }

    // 4. Check persistent lifetime count
    const currentCount = await getUsageCount(limitKey)
    if (currentCount >= usageLimit) {
      return NextResponse.json(
        {
          error: 'Free limit reached',
          upgrade: true,
          requiresAuth: !user,
          message: !user
            ? `You've used your free try for this mode. Sign in free to get 1 try per mode on all devices, or upgrade to Premium for unlimited grading.`
            : `You've used your free try for this mode. Upgrade to Premium for unlimited grading.`,
        },
        { status: 429 }
      )
    }

    // 5. Validate Gemini key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 500 })
    }

    // 6. Build prompt
    let prompt: string
    if (mode === 'essay') {
      const { topic, content } = body
      if (!topic || !content) {
        return NextResponse.json({ error: 'Topic and essay content are required' }, { status: 400 })
      }
      if ((content as string).length > 20_000) {
        return NextResponse.json({ error: 'Essay too long (max ~2,500 words)' }, { status: 400 })
      }
      prompt = buildEssayPrompt(topic as string, content as string)
    } else if (mode === 'precis') {
      const { original, content } = body
      if (!original || !content) {
        return NextResponse.json({ error: 'Original passage and précis are required' }, { status: 400 })
      }
      prompt = buildPrecisPrompt(original as string, content as string)
    } else {
      const { subject, question, marks, content } = body
      if (!subject || !question || !marks || !content) {
        return NextResponse.json({ error: 'Subject, question, marks, and answer are required' }, { status: 400 })
      }
      prompt = buildLongAnswerPrompt(subject as string, question as string, Number(marks), content as string)
    }

    // 7. Call Gemini 2.5 Flash (35s timeout)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 35_000)

    let geminiRes: Response
    try {
      geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
          signal: controller.signal,
        }
      )
    } catch (fetchErr: unknown) {
      clearTimeout(timeoutId)
      const isTimeout =
        fetchErr instanceof Error &&
        (fetchErr.name === 'AbortError' ||
          fetchErr.message.includes('timeout') ||
          fetchErr.message.includes('Timeout'))
      return NextResponse.json(
        { error: isTimeout ? 'AI service timed out. Please try again.' : 'Could not reach AI service. Please try again.' },
        { status: 502 }
      )
    }
    clearTimeout(timeoutId)

    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      if (isDev) console.error('Gemini error:', errText)
      return NextResponse.json({ error: 'AI service error. Please try again.' }, { status: 502 })
    }

    const geminiData = await geminiRes.json()
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!rawText) {
      return NextResponse.json({ error: 'No response from AI. Please try again.' }, { status: 502 })
    }

    // 8. Parse JSON response
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

    // 9. Increment usage counter (after successful grading)
    if (!isPremium) {
      await incrementUsageCount(limitKey)
    }

    const newCount = await getUsageCount(limitKey)
    const remaining = isPremium ? null : Math.max(0, usageLimit - newCount)

    return NextResponse.json({
      success: true,
      mode,
      feedback,
      usage: {
        remaining,
        limit: isPremium ? null : usageLimit,
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
