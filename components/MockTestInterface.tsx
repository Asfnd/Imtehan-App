'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Flag, Check, X, Pause, Play } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { trackQuizStart, trackQuizComplete } from '@/lib/analytics/events'
import { saveQuizResults } from '@/lib/analytics'
import { markCompleted } from '@/lib/completion'
import FeedbackPopup from '@/components/FeedbackPopup'
import { registerQuizCompletion, recordFeedbackAction } from '@/lib/feedbackPrompt'
import { autoPinExam } from '@/lib/pinned-exam'
import { EXAM_CONFIGS } from '@/lib/exam-configs'
import {
  GamifiedQuizShell,
  ExamMockHeader,
  ExamQuestionPickerModal,
  ExamQuestionPickerTrigger,
  QuizResultsCard,
} from '@/components/gamified-quiz'

interface MCQ {
  id: number
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  subject: string
  explanation?: string
}

interface MockTestInterfaceProps {
  mcqs: MCQ[]
  examName: string
  duration: number
  passingPercentage: number
  negativeMarking?: boolean
  negativeMarkingValue?: number
  examSlug: string
  mockNumber?: number
  mockTitle?: string
}

function shuffleOptions(mcq: MCQ): MCQ {
  const opts = [
    { label: 'A', text: mcq.option_a },
    { label: 'B', text: mcq.option_b },
    { label: 'C', text: mcq.option_c },
    { label: 'D', text: mcq.option_d },
  ]
  const correctText = opts.find(o => o.label === mcq.correct_answer)?.text
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[opts[i], opts[j]] = [opts[j], opts[i]]
  }
  const newIdx = opts.findIndex(o => o.text === correctText)
  return {
    ...mcq,
    option_a: opts[0].text,
    option_b: opts[1].text,
    option_c: opts[2].text,
    option_d: opts[3].text,
    correct_answer: newIdx >= 0 ? (['A', 'B', 'C', 'D'][newIdx] as string) : mcq.correct_answer,
  }
}

function formatTimeLeft(s: number): string {
  const t = Math.max(0, Math.floor(s))
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const sec = t % 60
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  return `${m}:${sec.toString().padStart(2, '0')}`
}

type RevealState = 'default' | 'correct' | 'wrong' | 'dimmed'
type ExamVisual = RevealState | 'selected'

function getRevealOptionState(
  option: string,
  userAnswer: string | undefined,
  correctAnswer: string
): RevealState {
  if (!userAnswer) {
    if (option === correctAnswer) return 'correct'
    return 'dimmed'
  }
  if (option === correctAnswer) return 'correct'
  if (option === userAnswer) return 'wrong'
  return 'dimmed'
}

function getOptionVisual(
  label: string,
  userAnswer: string | undefined,
  correctAnswer: string,
  ctx: { reviewMode: boolean; hasSubmitted: boolean; showResults: boolean }
): ExamVisual {
  const { reviewMode, hasSubmitted, showResults } = ctx
  if (hasSubmitted && !showResults) {
    return getRevealOptionState(label, userAnswer, correctAnswer)
  }
  if (reviewMode && userAnswer) {
    return getRevealOptionState(label, userAnswer, correctAnswer)
  }
  if (reviewMode && !userAnswer) return 'default'
  if (userAnswer === label) return 'selected'
  return 'default'
}

const EXAM_OPTION: Record<ExamVisual, string> = {
  default: 'btn-3d border-slate-200 bg-white cursor-pointer group',
  selected: 'btn-3d selected cursor-pointer group',
  correct: 'btn-3d correct cursor-default',
  wrong: 'btn-3d incorrect cursor-default',
  dimmed: 'btn-3d dimmed cursor-default',
}

const EXAM_BADGE: Record<ExamVisual, string> = {
  default:
    'border-slate-200 text-slate-400 bg-slate-50 group-hover:border-indigo-300 group-hover:text-indigo-500',
  selected: 'border-indigo-400 bg-indigo-50 text-indigo-700',
  correct: 'border-emerald-400 bg-emerald-100 text-emerald-700',
  wrong: 'border-rose-300 bg-rose-100 text-rose-600',
  dimmed: 'border-slate-100 text-slate-300 bg-slate-50',
}

export default function MockTestInterface({
  mcqs,
  examName,
  duration,
  passingPercentage,
  negativeMarking = false,
  negativeMarkingValue = 0.25,
  examSlug,
  mockNumber,
  mockTitle,
}: MockTestInterfaceProps) {
  const router = useRouter()

  // Shuffle options once per session to eliminate answer-position bias
  const [shuffledMCQs] = useState(() => mcqs.map(shuffleOptions))

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [timerActive, setTimerActive] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const [reviewMode, setReviewMode] = useState(false)
  const [reviewMCQs, setReviewMCQs] = useState<MCQ[]>([])
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [showQuestionPicker, setShowQuestionPicker] = useState(false)
  const [showReportToast, setShowReportToast] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [resultPct, setResultPct] = useState(0)

  const handleSubmitRef = useRef<() => void>(() => {})

  const activeMCQs = reviewMode ? reviewMCQs : shuffledMCQs
  const currentMCQ = activeMCQs[currentIndex]
  const userAnswer = answers[currentIndex]
  const progressPct = ((currentIndex + 1) / activeMCQs.length) * 100
  const totalDurationSeconds = duration * 60

  const answeredIndices = useMemo(
    () => new Set(Object.keys(answers).map(Number)),
    [answers]
  )

  useEffect(() => {
    trackQuizStart(mockTitle || examSlug, 'mock-test')
  }, [examSlug, mockTitle])

  useEffect(() => {
    if (!timerActive || showResults || reviewMode) return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimerActive(false)
          setTimeout(() => handleSubmitRef.current(), 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timerActive, showResults, reviewMode])

  const handleAnswer = (option: string) => {
    if (showResults) return
    if (hasSubmitted && !showResults) return
    if (reviewMode && userAnswer) return
    setAnswers(prev => ({ ...prev, [currentIndex]: option }))
  }

  const handlePause = () => {
    setIsPaused(true)
    setTimerActive(false)
  }
  const handleResume = () => {
    setIsPaused(false)
    setTimerActive(true)
  }

  const goNext = () => {
    if (currentIndex < activeMCQs.length - 1) setCurrentIndex(i => i + 1)
  }
  const goPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1)
  }

  const handleReportQuestion = useCallback(async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      await supabase.from('question_reports').insert({
        question_id: currentMCQ.id,
        question_type: examSlug,
        subject: currentMCQ.subject,
        user_id: user?.id || null,
        report_sequence: currentIndex + 1,
        quiz_length: activeMCQs.length,
        mock_number: mockNumber ?? null,
      })
    } catch {
      /* silent */
    }
    setShowReportToast(true)
    setTimeout(() => setShowReportToast(false), 3200)
  }, [activeMCQs.length, currentIndex, currentMCQ, examSlug, mockNumber])

  const calcScore = () => {
    let correct = 0
    let incorrect = 0
    let unanswered = 0
    activeMCQs.forEach((mcq, idx) => {
      if (answers[idx] === undefined) unanswered++
      else if (answers[idx] === mcq.correct_answer) correct++
      else incorrect++
    })
    const obtained = negativeMarking ? correct - incorrect * negativeMarkingValue : correct
    const pct = Math.round((Math.max(0, obtained) / activeMCQs.length) * 100)
    return {
      correct,
      incorrect,
      unanswered,
      obtained: Math.max(0, obtained),
      pct,
      passed: pct >= passingPercentage,
    }
  }

  const handleSubmit = useCallback(() => {
    setHasSubmitted(true)
    setTimerActive(false)
    const { correct, incorrect, unanswered, pct } = calcScore()
    const timeTaken = totalDurationSeconds - timeLeft
    saveQuizResults({
      quizType: 'mock',
      examSlug,
      subject: mockNumber != null ? `mock-${mockNumber}` : (mockTitle || examSlug),
      totalQuestions: activeMCQs.length,
      correctAnswers: correct,
      wrongAnswers: incorrect,
      skippedAnswers: unanswered,
      timeInSeconds: timeTaken,
    })
    // Persist completion locally so the badge shows even without auth
    if (mockNumber != null) {
      try {
        const key = `imtehan_mock_done_${examSlug}`
        const stored = JSON.parse(localStorage.getItem(key) || '{}')
        if (stored[mockNumber] == null || pct > stored[mockNumber]) {
          stored[mockNumber] = pct
        }
        localStorage.setItem(key, JSON.stringify(stored))
      } catch { /* storage unavailable: silent */ }
      // Shared store (local + DB sync for signed-in users), keyed like every other flow.
      markCompleted(`exams-mock:${examSlug}`, mockNumber, pct)
    }
    trackQuizComplete(mockTitle || examSlug, correct, activeMCQs.length, 'mock-test')
    autoPinExam({
      key: examSlug,
      label: EXAM_CONFIGS[examSlug]?.name ?? examSlug,
      href: `/exams/${examSlug}`,
    })
    setShowResults(true)
  }, [
    activeMCQs,
    answers,
    examSlug,
    mockTitle,
    timeLeft,
    totalDurationSeconds,
    passingPercentage,
    negativeMarking,
    negativeMarkingValue,
  ])

  handleSubmitRef.current = handleSubmit

  useEffect(() => {
    if (!showResults || reviewMode) return
    const pct = activeMCQs.length > 0 ? calcScore().pct : 0
    setResultPct(pct)
    if (registerQuizCompletion(pct)) {
      const t = setTimeout(() => setShowFeedback(true), 1500)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run when results screen opens
  }, [showResults, reviewMode, activeMCQs.length])

  const practiceMistakes = () => {
    const wrong = activeMCQs.filter((mcq, idx) => {
      const ua = answers[idx]
      return !!ua && ua !== mcq.correct_answer
    })
    let correct = 0
    activeMCQs.forEach((mcq, idx) => {
      if (answers[idx] === mcq.correct_answer) correct++
    })
    setOriginalScore({ correct, total: activeMCQs.length })
    setReviewMCQs(wrong)
    setReviewMode(true)
    setHasSubmitted(false)
    setCurrentIndex(0)
    setAnswers({})
    setShowResults(false)
    setTimerActive(false)
  }

  if (showResults) {
    const score = calcScore()
    const timeTaken = totalDurationSeconds - timeLeft
    const timeExpired = timeLeft === 0 && !reviewMode

    const wrongCount = activeMCQs.filter((mcq, idx) => {
      const ua = answers[idx]
      return !!ua && ua !== mcq.correct_answer
    }).length

    const improvement =
      reviewMode && originalScore
        ? {
            original: Math.round((originalScore.correct / originalScore.total) * 100),
            current: score.pct,
            improved: score.pct > Math.round((originalScore.correct / originalScore.total) * 100),
            diff: score.pct - Math.round((originalScore.correct / originalScore.total) * 100),
          }
        : null

    return (
      <>
        <QuizResultsCard
          title={
            timeExpired
              ? "Time's up"
              : reviewMode
                ? 'Practice complete'
                : 'Test complete'
          }
          subtitle={`${examName}${mockTitle ? ` · ${mockTitle}` : ''}`}
          correct={score.correct}
          total={activeMCQs.length}
          timeElapsedSeconds={timeTaken}
          improvement={improvement}
          wrongPracticeCount={wrongCount}
          onPracticeMistakes={!reviewMode && wrongCount > 0 ? practiceMistakes : undefined}
          examBreakdown={
            !reviewMode ? { wrong: score.incorrect, skipped: score.unanswered } : null
          }
          footerExtra={
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex(0)
                  setShowResults(false)
                }}
                className="w-full rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                Review answers
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex(0)
                  setAnswers({})
                  setShowResults(false)
                  setHasSubmitted(false)
                  setTimeLeft(duration * 60)
                  setTimerActive(true)
                  setReviewMode(false)
                  setReviewMCQs([])
                }}
                className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
              >
                Retake test
              </button>
            </div>
          }
          backLabel="Back to exam"
          onBack={() => router.push(`/exams/${examSlug}`)}
        />
        <FeedbackPopup
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
          onAction={recordFeedbackAction}
          examSlug={examSlug}
          quizType="mock"
          scorePct={resultPct}
        />
      </>
    )
  }

  const options = [
    { label: 'A', text: currentMCQ.option_a },
    { label: 'B', text: currentMCQ.option_b },
    { label: 'C', text: currentMCQ.option_c },
    { label: 'D', text: currentMCQ.option_d },
  ]
  const answeredCount = Object.keys(answers).length
  const visualCtx = { reviewMode, hasSubmitted, showResults }
  const optionDisabled =
    showResults || (hasSubmitted && !showResults) || (reviewMode && !!userAnswer)

  const showExplanation =
    currentMCQ.explanation &&
    ((hasSubmitted && !showResults) || (reviewMode && !!userAnswer))

  const metaLine =
    !reviewMode && !hasSubmitted
      ? `${answeredCount} answered · ${activeMCQs.length - answeredCount} remaining`
      : undefined

  return (
    <>
      <GamifiedQuizShell
        variant="single"
        mobileRail={
          <span className="text-sm font-bold tabular-nums text-indigo-900">
            Q {currentIndex + 1} / {activeMCQs.length}
          </span>
        }
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <ExamMockHeader
            onExit={() => router.back()}
            progressPct={progressPct}
            progressLabel={`${currentIndex + 1} / ${activeMCQs.length}`}
            metaLine={metaLine}
            timeLeftSeconds={timeLeft}
            totalDurationSeconds={totalDurationSeconds}
            reviewMeta={
              hasSubmitted && !showResults
                ? 'Review'
                : reviewMode
                  ? `${answeredCount} answered`
                  : null
            }
            onPause={!reviewMode && !hasSubmitted ? handlePause : undefined}
            isPaused={isPaused}
          />

          <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col overflow-hidden px-4 sm:max-w-3xl sm:px-6">
            <div className="flex min-h-0 flex-1 flex-col gap-3 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] pt-3 sm:gap-4 sm:pb-28 sm:pt-4">
              <div className="flex shrink-0 items-center justify-between gap-2">
                <span className="inline-flex max-w-[52%] items-center truncate rounded-full border border-indigo-100 bg-indigo-50/90 px-3 py-1.5 text-xs font-semibold text-indigo-900 sm:max-w-[60%] sm:px-3.5 sm:py-2 sm:text-sm">
                  {currentMCQ.subject}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <ExamQuestionPickerTrigger
                    total={activeMCQs.length}
                    currentIndex={currentIndex}
                    onClick={() => setShowQuestionPicker(true)}
                  />
                </div>
              </div>

              <div className="flex shrink-0 gap-2 text-left">
                <h3 className="min-w-0 flex-1 text-pretty line-clamp-[6] text-base font-bold leading-[1.5] tracking-tight text-slate-900 [overflow-wrap:anywhere] sm:line-clamp-[7] sm:text-lg sm:leading-[1.55] md:text-xl md:leading-snug">
                  {currentMCQ.question}
                </h3>
                <button
                  type="button"
                  onClick={handleReportQuestion}
                  className="mt-0.5 inline-flex h-8 shrink-0 items-center gap-1.5 self-start rounded-lg border border-rose-300 bg-rose-50 px-2 text-rose-600 shadow-sm transition hover:border-rose-400 hover:bg-rose-100 hover:text-rose-700 active:scale-[0.98] sm:h-9 sm:gap-2 sm:px-2.5"
                  title="Tell us if this question is wrong or unclear"
                  aria-label="Report a problem with this question"
                >
                  <Flag className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2.25} />
                  <span className="text-[10px] font-bold uppercase tracking-wide text-rose-700 sm:text-xs">
                    Report
                  </span>
                </button>
              </div>

              {/* No flex-1 justify-center: options stay fixed under the stem so layout does not shift by question length */}
              <div className="flex flex-col gap-2 sm:gap-2.5">
                {options.map(({ label, text }) => {
                  const visual = getOptionVisual(label, userAnswer, currentMCQ.correct_answer, visualCtx)
                  const showIcons = visual === 'correct' || visual === 'wrong'
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleAnswer(label)}
                      disabled={optionDisabled}
                      className={`group relative grid w-full grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-3 overflow-hidden rounded-xl border-2 p-3 text-left sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:rounded-2xl sm:p-4 ${EXAM_OPTION[visual]}`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-bold tabular-nums leading-none transition-colors sm:h-9 sm:w-9 sm:rounded-xl sm:text-base ${EXAM_BADGE[visual]}`}
                      >
                        {showIcons && visual === 'correct' ? (
                          <Check className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={3} />
                        ) : showIcons && visual === 'wrong' ? (
                          <X className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={3} />
                        ) : (
                          label
                        )}
                      </div>
                      <span className="min-w-0 pt-0.5 text-left text-base font-semibold leading-snug text-slate-800 [overflow-wrap:anywhere] sm:pt-[0.1875rem] sm:text-lg">
                        <span className="line-clamp-4">{text}</span>
                      </span>
                    </button>
                  )
                })}
              </div>

              {showExplanation ? (
                <div className="shrink-0 rounded-xl border border-indigo-100 bg-indigo-50/90 px-3.5 py-2.5 text-left sm:px-4 sm:py-3">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-600 sm:text-xs">
                    Explanation
                  </p>
                  <p className="text-pretty line-clamp-4 text-sm leading-relaxed text-slate-700 [overflow-wrap:anywhere] sm:text-base">
                    {currentMCQ.explanation}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-20 w-full border-t border-slate-100 bg-white/95 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 sm:static sm:border-t-0 sm:bg-transparent sm:px-6 sm:py-0 sm:backdrop-blur-none">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-2 sm:max-w-3xl sm:pb-5">
              <button
                type="button"
                onClick={goPrevious}
                disabled={currentIndex === 0}
                className="min-h-[48px] rounded-full border border-slate-200 bg-white px-4 py-2.5 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-[52px] sm:px-5"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(true)}
                className="min-h-[48px] shrink rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:min-h-[52px] sm:px-4 sm:text-base"
              >
                Submit early
              </button>
              {currentIndex === activeMCQs.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="min-h-[48px] rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-base font-bold text-white shadow-md transition hover:opacity-95 sm:min-h-[52px] sm:px-5"
                >
                  Finish
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  className="min-h-[48px] rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-base font-semibold text-white shadow-md transition hover:opacity-95 sm:min-h-[52px] sm:px-5"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </GamifiedQuizShell>

      <ExamQuestionPickerModal
        open={showQuestionPicker}
        onClose={() => setShowQuestionPicker(false)}
        total={activeMCQs.length}
        currentIndex={currentIndex}
        answeredIndices={answeredIndices}
        onJump={setCurrentIndex}
      />

      {showReportToast && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 px-3">
          <div className="flex max-w-[min(100vw-24px,22rem)] items-center gap-3 rounded-2xl border-2 border-white/20 bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3 text-white shadow-2xl">
            <span className="text-xl">✓</span>
            <div className="min-w-0">
              <div className="font-bold">Question flagged</div>
              <div className="text-xs text-white/90">
                Q{currentIndex + 1} of {activeMCQs.length} · ID {currentMCQ.id}
                {mockNumber != null ? ` · Mock ${mockNumber}` : ''}
              </div>
            </div>
          </div>
        </div>
      )}

      {isPaused && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xs rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
              <Pause className="h-6 w-6 text-indigo-500" />
            </div>
            <h2 className="mb-1 text-xl font-bold text-gray-900">Test Paused</h2>
            <p className="mb-6 text-sm text-gray-500">
              <span className="font-mono font-semibold text-gray-700">{formatTimeLeft(timeLeft)}</span> remaining
            </p>
            <button
              type="button"
              onClick={handleResume}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
            >
              <Play className="h-4 w-4" />
              Resume Test
            </button>
          </div>
        </div>
      )}

      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="mb-2 text-lg font-bold text-gray-900">Submit test early?</h3>
            <p className="mb-1 text-sm text-gray-600">
              {Object.keys(answers).length} of {activeMCQs.length} questions answered.
            </p>
            {activeMCQs.length - Object.keys(answers).length > 0 && (
              <p className="text-sm font-medium text-amber-600">
                {activeMCQs.length - Object.keys(answers).length} unanswered will count as wrong.
              </p>
            )}
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 rounded-xl border-2 border-gray-200 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitConfirm(false)
                  handleSubmit()
                }}
                className="flex-1 rounded-xl bg-red-600 py-2.5 font-semibold text-white hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
