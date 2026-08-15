'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { PenLine, ArrowLeft, FileText, BookOpen, ClipboardList, Loader2 } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import ScoreCard from '@/components/essay/ScoreCard'
import AnnotatedEssay from '@/components/essay/AnnotatedEssay'
import PrecisChecklist from '@/components/essay/PrecisChecklist'
import { ImageTextImport } from '@/components/writing-coach/ImageTextImport'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
import {
  WRITING_COACH_PATHS,
  CSS_LONG_ANSWER_SUBJECTS,
  PMS_LONG_ANSWER_SUBJECTS,
  ESSAY_WORD_LIMITS,
  countEssayWords,
  type WritingCoachExamType,
} from '@/lib/writing-coach-config'
import { useCSRFToken } from '@/lib/hooks/useCSRFToken'

type Mode = 'essay' | 'precis' | 'long-answer'
type Phase = 'input' | 'loading' | 'results'

const MARKS_OPTIONS = [6, 10, 12, 20]
const LA_MIN_WORDS: Record<number, number> = { 6: 100, 10: 200, 12: 250, 20: 400 }

const LOADING_STEPS = [
  'Reading your writing…',
  'Checking content & knowledge…',
  'Evaluating structure & flow…',
  'Finding strengths & weaknesses…',
  'Writing examiner feedback…',
]

function wordCount(text: string): number {
  return countEssayWords(text)
}

function appendExtracted(current: string, extracted: string): string {
  const next = extracted.trim()
  if (!next) return current
  return current.trim() ? `${current.trim()}\n\n${next}` : next
}

export function WritingCoachClient({ variant }: { variant: WritingCoachExamType }) {
  const router = useRouter()
  const paths = WRITING_COACH_PATHS[variant]
  const examType = variant
  const { token: csrfToken, loading: csrfLoading, error: csrfError } = useCSRFToken()

  const subjects = useMemo(
    () => (variant === 'css' ? [...CSS_LONG_ANSWER_SUBJECTS] : [...PMS_LONG_ANSWER_SUBJECTS]),
    [variant],
  )

  const { min: essayMin, lo: essayLo, hi: essayHi, max: essayMax } = ESSAY_WORD_LIMITS[variant]

  const [mode, setMode] = useState<Mode>('essay')
  const [phase, setPhase] = useState<Phase>('input')
  const [loadingStep, setLoadingStep] = useState(0)

  const [essayTopic, setEssayTopic] = useState('')
  const [essayContent, setEssayContent] = useState('')

  const [precisOriginal, setPrecisOriginal] = useState('')
  const [precisContent, setPrecisContent] = useState('')

  const [laSubject, setLaSubject] = useState<string>(subjects[0] ?? '')
  const [laQuestion, setLaQuestion] = useState('')
  const [laMarks, setLaMarks] = useState<number>(10)
  const [laContent, setLaContent] = useState('')

  const [result, setResult] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [usageInfo, setUsageInfo] = useState<{
    remaining: number | null
    limit: number | null
    isPremium: boolean
    isAnon: boolean
    signInBonus: number
  } | null>(null)

  useEffect(() => {
    setLaSubject(subjects[0] ?? '')
  }, [subjects])

  useEffect(() => {
    if (phase !== 'loading') return
    setLoadingStep(0)
    const id = setInterval(() => setLoadingStep(s => Math.min(s + 1, LOADING_STEPS.length - 1)), 3000)
    return () => clearInterval(id)
  }, [phase])

  const canSubmit = () => {
    if (mode === 'essay') {
      const wc = wordCount(essayContent)
      return essayTopic.trim().length > 0 && wc >= essayMin && wc <= essayMax
    }
    if (mode === 'precis') return wordCount(precisOriginal) >= 100 && wordCount(precisContent) >= 30
    return laQuestion.trim().length > 0 && wordCount(laContent) >= (LA_MIN_WORDS[laMarks] ?? 100)
  }

  const submitHint = () => {
    if (mode === 'essay') {
      if (!essayTopic.trim()) return 'Enter the essay topic'
      const wc = wordCount(essayContent)
      if (wc < essayMin) {
        return variant === 'pms'
          ? `Write at least ${essayMin} words (${wc} written). PMS essays are about ${essayLo}-${essayHi} words`
          : `Write at least ${essayMin} words (${wc} written). CSS essays are ${essayLo}-${essayHi} words`
      }
      if (wc > essayMax) {
        return variant === 'pms'
          ? `Trim to ${essayMax} words or fewer (${wc} written). PMS target is ${essayLo}-${essayHi}`
          : `Trim to ${essayMax} words or fewer (${wc} written). CSS official length is ${essayLo}-${essayHi}`
      }
    }
    if (mode === 'precis') {
      if (wordCount(precisOriginal) < 100) return 'Original passage must be at least 100 words'
      if (wordCount(precisContent) < 30) return 'Your précis must be at least 30 words'
    }
    if (mode === 'long-answer') {
      if (!laQuestion.trim()) return 'Enter the question'
      const min = LA_MIN_WORDS[laMarks] ?? 100
      const wc = wordCount(laContent)
      if (wc < min) return `Write at least ${min} words for a ${laMarks}-mark answer (${wc} written)`
    }
    return null
  }

  const handleSubmit = async () => {
    setError(null)
    let token = csrfToken
    if (!token) {
      try {
        const tr = await fetch('/api/csrf-token', { credentials: 'include' })
        const td = await tr.json()
        if (tr.ok && td.token) token = td.token as string
      } catch {
        /* fall through */
      }
    }
    if (!token) {
      setError('Security token not ready. Please wait a moment and try again.')
      return
    }

    setPhase('loading')

    let body: Record<string, unknown> = { mode, examType }
    if (mode === 'essay') body = { ...body, topic: essayTopic, content: essayContent }
    else if (mode === 'precis') body = { ...body, original: precisOriginal, content: precisContent }
    else body = { ...body, subject: laSubject, question: laQuestion, marks: laMarks, content: laContent }

    const nextParam = encodeURIComponent(paths.pagePath)

    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': token,
        },
        body: JSON.stringify(body),
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 429 && data.upgrade) {
          router.push(data.requiresAuth ? `/signin?next=${nextParam}` : PREMIUM_PAGE_PATH)
          setPhase('input')
          return
        }
        if (res.status === 403) {
          setError(data.error || 'Session security check failed. Refresh the page and try again.')
          setPhase('input')
          return
        }
        setError(data.error || 'Something went wrong. Please try again.')
        setPhase('input')
        return
      }

      setResult(data.feedback as Record<string, unknown>)
      setUsageInfo(data.usage)
      setPhase('results')
    } catch {
      setError('Network error. Please check your connection and try again.')
      setPhase('input')
    }
  }

  const handleReset = () => {
    setPhase('input')
    setResult(null)
    setError(null)
  }

  const modeLabel = mode === 'essay' ? 'Essay' : mode === 'precis' ? 'Précis' : 'Long Answer'

  const title = variant === 'pms' ? 'PMS Writing Coach' : 'Writing Coach'
  const subtitle =
    variant === 'pms'
      ? 'PMS English: provincial examiner-style feedback'
      : 'CSS examiner-level feedback'

  const essayTabMeta = variant === 'pms' ? '1400-1600 words' : '2500-3000 words'

  const essayWcBadge = (() => {
    const wc = wordCount(essayContent)
    const inGreen = wc >= essayLo && wc <= essayHi
    const over = wc > essayHi
    const near = wc >= essayLo - 200
    return {
      className: inGreen
        ? 'bg-green-100 text-green-700'
        : over || wc > essayMax
          ? 'bg-red-100 text-red-700'
          : near
            ? 'bg-amber-100 text-amber-700'
            : wc >= essayMin
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-400',
      label: `${wc} / ${essayLo}-${essayHi} words`,
    }
  })()

  const modeTabs = [
    { key: 'essay' as const, label: 'Essay', icon: FileText, meta: essayTabMeta },
    { key: 'precis' as const, label: 'Précis', icon: BookOpen, meta: '⅓ of original' },
    {
      key: 'long-answer' as const,
      label: 'Long Answer',
      icon: ClipboardList,
      meta: variant === 'pms' ? 'Optional papers' : 'Subject papers',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavigationBar showCenterNav={false} />

      <div
        className={
          variant === 'pms'
            ? 'bg-gradient-to-r from-slate-800 via-emerald-900 to-slate-800 border-b border-emerald-500/30'
            : 'bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 border-b border-blue-500/30'
        }
      >
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push(paths.backHref)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <PenLine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">{title}</h1>
              <p className={`text-xs ${variant === 'pms' ? 'text-emerald-200' : 'text-blue-300'}`}>{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {usageInfo && phase === 'results' && !usageInfo.isPremium && (
          <div
            className={`rounded-xl p-3.5 flex items-center justify-between gap-3 border ${
              usageInfo.isAnon ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'
            }`}
          >
            {usageInfo.isAnon ? (
              <>
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Sign in</span> to save your free tries across devices · Unlimited with
                  Premium
                </p>
                <button
                  type="button"
                  onClick={() => router.push(`/signin?next=${encodeURIComponent(paths.pagePath)}`)}
                  className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-amber-800">
                  <span className="font-semibold">{usageInfo.remaining}</span> free try
                  {usageInfo.remaining !== 1 ? 's' : ''} left for this mode
                </p>
                {usageInfo.remaining === 0 && (
                  <button
                    type="button"
                    onClick={() => router.push(PREMIUM_PAGE_PATH)}
                    className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors flex-shrink-0"
                  >
                    Upgrade
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3.5">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {phase === 'input' && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {modeTabs.map(({ key, label, icon: Icon, meta }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMode(key)}
                    className={`flex-1 flex flex-col items-center gap-0.5 pt-3.5 pb-3 px-2 text-center relative transition-colors ${
                      mode === key ? 'text-blue-700' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-bold mt-0.5">{label}</span>
                    <span className="text-[10px] text-gray-400">{meta}</span>
                    {mode === key && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-4">
                {mode === 'essay' && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                        Essay Topic
                      </label>
                      <input
                        type="text"
                        value={essayTopic}
                        onChange={e => setEssayTopic(e.target.value)}
                        placeholder="e.g. The Role of Technology in Pakistan's Development"
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Essay</label>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums ${essayWcBadge.className}`}>
                          {essayWcBadge.label}
                        </span>
                      </div>
                      <textarea
                        value={essayContent}
                        onChange={e => setEssayContent(e.target.value)}
                        rows={14}
                        placeholder="Paste, type, or import from a photo of your handwritten essay…"
                        className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none leading-relaxed bg-gray-50/50"
                      />
                      <p className="text-[11px] text-gray-500 mt-1.5">
                        {variant === 'pms'
                          ? `PMS English Essay is about ${essayLo}-${essayHi} words.`
                          : `FPSC CSS Essay is ${essayLo}-${essayHi} words.`}
                      </p>
                      <div className="mt-3">
                        <ImageTextImport
                          csrfToken={csrfToken}
                          disabled={csrfLoading || !!csrfError}
                          hasExistingText={essayContent.trim().length > 0}
                          onAppend={text => setEssayContent(prev => appendExtracted(prev, text))}
                        />
                      </div>
                    </div>
                  </>
                )}

                {mode === 'precis' && (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Original Passage</label>
                        <span className="text-[11px] text-gray-400 tabular-nums">{wordCount(precisOriginal)} words</span>
                      </div>
                      <textarea
                        value={precisOriginal}
                        onChange={e => setPrecisOriginal(e.target.value)}
                        rows={8}
                        placeholder="Paste the original passage here, or import from a photo…"
                        className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none leading-relaxed bg-gray-50/50"
                      />
                      <div className="mt-3">
                        <ImageTextImport
                          csrfToken={csrfToken}
                          disabled={csrfLoading || !!csrfError}
                          hasExistingText={precisOriginal.trim().length > 0}
                          onAppend={text => setPrecisOriginal(prev => appendExtracted(prev, text))}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Précis</label>
                        {(() => {
                          const target = precisOriginal ? Math.round(wordCount(precisOriginal) / 3) : null
                          const wc = wordCount(precisContent)
                          const inRange = target && Math.abs(wc - target) <= Math.round(target * 0.05)
                          return (
                            <span
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums ${
                                inRange
                                  ? 'bg-green-100 text-green-700'
                                  : target && wc >= Math.round(target * 0.85)
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-gray-100 text-gray-400'
                              }`}
                            >
                              {wc} {target ? `/ ~${target} (±5%)` : 'words'}
                            </span>
                          )
                        })()}
                      </div>
                      <textarea
                        value={precisContent}
                        onChange={e => setPrecisContent(e.target.value)}
                        rows={6}
                        placeholder="Write your précis here, or import from a photo. Must be ⅓ of original length…"
                        className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none leading-relaxed bg-gray-50/50"
                      />
                      <div className="mt-3">
                        <ImageTextImport
                          csrfToken={csrfToken}
                          disabled={csrfLoading || !!csrfError}
                          hasExistingText={precisContent.trim().length > 0}
                          onAppend={text => setPrecisContent(prev => appendExtracted(prev, text))}
                        />
                      </div>
                    </div>
                  </>
                )}

                {mode === 'long-answer' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                          Subject
                        </label>
                        <select
                          value={laSubject}
                          onChange={e => setLaSubject(e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-gray-50/50"
                        >
                          {subjects.map(s => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                          Marks
                        </label>
                        <div className="flex gap-1.5">
                          {MARKS_OPTIONS.map(m => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setLaMarks(m)}
                              className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition-all ${
                                laMarks === m
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                        Question
                      </label>
                      <textarea
                        value={laQuestion}
                        onChange={e => setLaQuestion(e.target.value)}
                        rows={3}
                        placeholder="Paste the exam question here…"
                        className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Answer</label>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums ${
                            wordCount(laContent) >= (LA_MIN_WORDS[laMarks] ?? 100)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {wordCount(laContent)} / min {LA_MIN_WORDS[laMarks] ?? 100} words
                        </span>
                      </div>
                      <textarea
                        value={laContent}
                        onChange={e => setLaContent(e.target.value)}
                        rows={10}
                        placeholder="Write, paste, or import from a photo of your answer…"
                        className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none leading-relaxed bg-gray-50/50"
                      />
                      <div className="mt-3">
                        <ImageTextImport
                          csrfToken={csrfToken}
                          disabled={csrfLoading || !!csrfError}
                          hasExistingText={laContent.trim().length > 0}
                          onAppend={text => setLaContent(prev => appendExtracted(prev, text))}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {variant === 'pms' && (
              <p className="text-center text-[11px] text-gray-500 px-1">
                Syllabus details vary by province (PPSC, KPPSC, etc.). Use this coach for practice, but always confirm paper
                format from your latest commission advertisement.
              </p>
            )}

            {csrfError && (
              <p className="text-center text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                {csrfError}. Refresh the page if this persists.
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit() || csrfLoading || !!csrfError}
              className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                canSubmit() && !csrfLoading && !csrfError
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <PenLine className="w-4 h-4" />
              {csrfLoading ? 'Preparing…' : 'Get Feedback'}
            </button>

            {!canSubmit() && submitHint() && <p className="text-center text-xs text-gray-400">{submitHint()}</p>}
            {canSubmit() && csrfLoading && (
              <p className="text-center text-xs text-gray-400">Loading security token…</p>
            )}
            {canSubmit() && !usageInfo && (
              <p className="text-center text-xs text-gray-400">
                1 free try per mode · Sign in to save your quota across devices · Unlimited with Premium
              </p>
            )}
          </>
        )}

        {phase === 'loading' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-12 px-6 flex flex-col items-center gap-5">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-4 border-blue-100" />
              <Loader2 className="w-14 h-14 text-blue-600 animate-spin absolute inset-0" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800 transition-all">{LOADING_STEPS[loadingStep]}</p>
              <p className="text-xs text-gray-400 mt-1">Usually takes 10-20 seconds</p>
            </div>
            <div className="flex gap-1.5">
              {LOADING_STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i <= loadingStep ? 'bg-blue-500' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
        )}

        {phase === 'results' && result && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{modeLabel} Feedback</h2>
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> New submission
              </button>
            </div>

            {mode === 'precis' ? (
              <PrecisChecklist
                score={(result.score as number) || 0}
                grade={(result.grade as string) || 'F'}
                wordCount={
                  (result.wordCount as { submitted: number; original: number; target: number; passed: boolean }) || {
                    submitted: 0,
                    original: 0,
                    target: 0,
                    passed: false,
                  }
                }
                rules={(result.rules as Array<{ rule: string; passed: boolean; comment: string }>) || []}
                missedKeyPoints={result.missedKeyPoints as string[] | undefined}
                overallFeedback={(result.overallFeedback as string) || ''}
              />
            ) : (
              <>
                <ScoreCard
                  score={(result.score as number) || 0}
                  grade={(result.grade as string) || 'F'}
                  breakdown={(result.breakdown as Record<string, { score: number; max: number; comment: string }>) || {}}
                  overallFeedback={(result.overallFeedback as string) || ''}
                  missingPoints={result.missingPoints as string[] | undefined}
                  mode={mode}
                  marks={mode === 'long-answer' ? laMarks : undefined}
                />
                {result.annotations && (result.annotations as unknown[]).length > 0 && (
                  <>
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Annotated Text</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <AnnotatedEssay
                      text={mode === 'essay' ? essayContent : laContent}
                      annotations={
                        result.annotations as Array<{
                          quote: string
                          type: 'strength' | 'weakness' | 'suggestion'
                          comment: string
                        }>
                      }
                    />
                  </>
                )}
              </>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Grade Another Piece
            </button>
          </>
        )}
      </div>
    </div>
  )
}
