'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Flag, Check, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { trackQuizStart, trackQuizComplete } from '@/lib/analytics/events'
import { saveQuizResults } from '@/lib/analytics'
import FeedbackPopup from '@/components/FeedbackPopup'
import { registerQuizCompletion, recordFeedbackAction } from '@/lib/feedbackPrompt'
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
  examSlug: string
  mockNumber?: number
  mockTitle?: string
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
  examSlug,
  mockNumber,
  mockTitle,
}: MockTestInterfaceProps) {
  const router = useRouter()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  /** Timer runs as soon as the mock page loads (pattern / start is handled on the exam dashboard only). */
  const [timerActive, setTimerActive] = useState(true)

  const [reviewMode, setReviewMode] = useState(false)
  const [reviewMCQs, setReviewMCQs] = useState<MCQ[]>([])
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [showQuestionPicker, setShowQuestionPicker] = useState(false)
  const [showReportToast, setShowReportToast] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [resultPct, setResultPct] = useState(0)

  const handleSubmitRef = useRef<() => void>(() => {})

  const activeMCQs = reviewMode ? reviewMCQs : mcqs
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

  const goNext = () => {
    if (currentIndex < activeMCQs.length - 1) setCurrentIndex(i => i + 1)
  }
  const goPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1)
  }

  const handleReport = useCallback(async () => {
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
      })
    } catch {
      /* silent */
    }
    setShowReportToast(true)
    setTimeout(() => setShowReportToast(false), 3000)
  }, [currentMCQ, examSlug])

  const calcScore = () => {
    let correct = 0
    let incorrect = 0
    let unanswered = 0
    activeMCQs.forEach((mcq, idx) => {
      if (answers[idx] === undefined) unanswered++
      else if (answers[idx] === mcq.correct_answer) correct++
      else incorrect++
    })
    const obtained = negativeMarking ? correct - incorrect * 0.25 : correct
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
    const { correct, incorrect, unanswered } = calcScore()
    const timeTaken = totalDurationSeconds - timeLeft
    saveQuizResults({
      quizType: 'mock',
      examSlug,
      subject: mockTitle || examSlug,
      totalQuestions: activeMCQs.length,
      correctAnswers: correct,
      wrongAnswers: incorrect,
      skippedAnswers: unanswered,
      timeInSeconds: timeTaken,
    })
    trackQuizComplete(mockTitle || examSlug, correct, activeMCQs.length, 'mock-test')
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
          />

          <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col overflow-hidden px-4 sm:max-w-3xl sm:px-6">
            <div
              key={currentIndex}
              className="flex min-h-0 flex-1 flex-col gap-3 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] pt-3 sm:gap-4 sm:pb-28 sm:pt-4"
            >
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
                  <button
                    type="button"
                    onClick={handleReport}
                    className="inline-flex h-10 items-center gap-1.5 rounded-full border border-rose-100 bg-rose-50/90 px-3 text-xs font-semibold text-rose-800 transition hover:bg-rose-100 sm:h-11 sm:px-3.5 sm:text-sm"
                    title="Report an issue"
                  >
                    <Flag className="h-4 w-4" />
                    <span className="hidden sm:inline">Report</span>
                  </button>
                </div>
              </div>

              <h3 className="line-clamp-[6] shrink-0 text-base font-bold leading-[1.45] tracking-tight text-slate-900 sm:line-clamp-[7] sm:text-lg sm:leading-[1.5] md:text-xl md:leading-snug">
                {currentMCQ.question}
              </h3>

              <div className="flex min-h-0 flex-1 flex-col justify-center gap-2 sm:gap-2.5">
                {options.map(({ label, text }) => {
                  const visual = getOptionVisual(label, userAnswer, currentMCQ.correct_answer, visualCtx)
                  const showIcons = visual === 'correct' || visual === 'wrong'
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleAnswer(label)}
                      disabled={optionDisabled}
                      className={`group relative flex min-h-[52px] w-full items-start gap-3 overflow-hidden rounded-xl border-2 p-3 text-left text-base font-semibold leading-snug text-slate-800 sm:min-h-[56px] sm:gap-3.5 sm:rounded-2xl sm:p-4 sm:text-lg ${EXAM_OPTION[visual]}`}
                    >
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-bold transition-colors sm:h-9 sm:w-9 sm:rounded-xl sm:text-base ${EXAM_BADGE[visual]}`}
                      >
                        {showIcons && visual === 'correct' ? (
                          <Check className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={3} />
                        ) : showIcons && visual === 'wrong' ? (
                          <X className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={3} />
                        ) : (
                          label
                        )}
                      </div>
                      <span className="min-w-0 flex-1 line-clamp-3 leading-snug">{text}</span>
                    </button>
                  )
                })}
              </div>

              {showExplanation ? (
                <div className="shrink-0 rounded-xl border border-indigo-100 bg-indigo-50/90 px-3.5 py-2.5 sm:px-4 sm:py-3">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-600 sm:text-xs">
                    Explanation
                  </p>
                  <p className="line-clamp-4 text-sm leading-relaxed text-slate-700 sm:text-base">
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
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-2xl border-2 border-white/20 bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-white shadow-2xl">
            <span className="text-xl">✓</span>
            <div>
              <div className="font-bold">Question flagged</div>
              <div className="text-xs text-white/90">Thanks for helping us improve</div>
            </div>
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
