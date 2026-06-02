'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Flag, Pause, Play } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { trackQuizStart, trackQuizComplete } from '@/lib/analytics/events'
import { saveQuizResults } from '@/lib/analytics'
import { markCompleted } from '@/lib/completion'
import FeedbackPopup from '@/components/FeedbackPopup'
import { useAuth } from '@/lib/contexts/AuthContext'
import SignInPopup from '@/components/auth/SignInPopup'
import { registerQuizCompletion, recordFeedbackAction } from '@/lib/feedbackPrompt'
import { recordExamPractice } from '@/lib/pinned-exam'
import { EXAM_CONFIGS } from '@/lib/exam-configs'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
import { isActivePremium } from '@/lib/is-active-premium'
import { tieredSetQuizPageAccess } from '@/lib/premium-gates'
import { soundManager } from '@/lib/sounds/soundManager'
import { useSoundsEnabled } from '@/lib/hooks/useSoundsEnabled'
import { calculatePoints } from '@/lib/gamification/pointsCalculator'
import { ConfettiCelebration } from '@/app/css/css-practice/quiz/components/ConfettiCelebration'
import {
  GamifiedQuizShell,
  QuizFeedbackDock,
  type QuizDockPhase,
  getQuizPathProgress,
  QuizGamificationHeader,
  QuizJourneyPanel,
  QuizResultsCard,
  quizAccuracyPercent,
} from '@/components/gamified-quiz'

interface MCQ {
  id: number
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation?: string
  difficulty?: string
  tags?: string[]
  type?: string
}

const DIFFICULTY_PILL: Record<string, string> = {
  easy: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  medium: 'border-amber-200 bg-amber-50 text-amber-700',
  hard: 'border-rose-200 bg-rose-50 text-rose-700',
}
const DIFFICULTY_LABEL: Record<string, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

interface QuizInterfaceProps {
  mcqs: MCQ[]
  examSlug: string
  subjectSlug: string
  mode: string
  setNumber: number
}

type FlowState = 'default' | 'wrong' | 'correct' | 'dimmed'

function flowOptionState(
  label: string,
  correctAnswer: string,
  ctx: {
    locked?: string
    wrongPicks: string[]
    wrongChoice: string | null
  }
): FlowState {
  if (ctx.locked) {
    if (label === correctAnswer) return 'correct'
    if (label === ctx.locked) return 'wrong'
    return 'dimmed'
  }
  const triedWrong = ctx.wrongPicks.length > 0
  if (triedWrong) {
    if (ctx.wrongChoice === label) return 'wrong'
    if (ctx.wrongPicks.includes(label)) return 'dimmed'
  }
  return 'default'
}

const FLOW_OPTION: Record<FlowState, string> = {
  default: 'btn-3d border-slate-200 bg-white cursor-pointer group',
  wrong: 'btn-3d incorrect cursor-default',
  correct: 'btn-3d correct cursor-default',
  dimmed: 'btn-3d dimmed cursor-default',
}

const FLOW_BADGE: Record<FlowState, string> = {
  default: 'border-slate-200 text-slate-400 bg-slate-50 group-hover:border-indigo-300 group-hover:text-indigo-500',
  wrong: 'border-rose-300 bg-rose-100 text-rose-600',
  correct: 'border-emerald-400 bg-emerald-100 text-emerald-700',
  dimmed: 'border-slate-100 text-slate-300 bg-slate-50',
}

export default function QuizInterface({
  mcqs,
  examSlug,
  subjectSlug,
  mode,
  setNumber,
}: QuizInterfaceProps) {
  const router = useRouter()

  const { user, loading: authLoading } = useAuth()
  const isPremium = isActivePremium(user)
  const soundsEnabled = useSoundsEnabled()

  const [showSignIn, setShowSignIn] = useState(false)
  const [streak, setStreak] = useState(0)
  const [totalXp, setTotalXp] = useState(0)
  const [lastXpGain, setLastXpGain] = useState(0)
  const [showXpPop, setShowXpPop] = useState(false)
  const [confettiBurst, setConfettiBurst] = useState(0)

  useEffect(() => {
    if (authLoading) return
    const gate = tieredSetQuizPageAccess(setNumber, !!user, isPremium)
    if (gate === 'require_premium') router.replace(PREMIUM_PAGE_PATH)
    else if (gate === 'require_sign_in') setShowSignIn(true)
  }, [authLoading, user, isPremium, setNumber, router])

  const backUrl = `/exams/${examSlug}/${subjectSlug}/${mode}`

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [firstTryCorrect, setFirstTryCorrect] = useState<Record<number, boolean>>({})
  const [wrongChecks, setWrongChecks] = useState<Record<number, number>>({})
  const [wrongPicks, setWrongPicks] = useState<string[]>([])
  const [wrongChoice, setWrongChoice] = useState<string | null>(null)

  const [showResults, setShowResults] = useState(false)
  const [startTime] = useState(Date.now())
  const [, setSaving] = useState(false)

  const [reviewMode, setReviewMode] = useState(false)
  const [reviewMCQs, setReviewMCQs] = useState<MCQ[]>([])
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)

  const [isPaused, setIsPaused] = useState(false)

  const [showFeedback, setShowFeedback] = useState(false)
  const [resultPct, setResultPct] = useState(0)
  const [showReportToast, setShowReportToast] = useState(false)

  useEffect(() => {
    trackQuizStart(`${examSlug}/${mode}`, subjectSlug)
  }, [examSlug, mode, subjectSlug])

  useEffect(() => {
    soundManager.preload().catch(() => {})
  }, [])

  useEffect(() => {
    setWrongPicks([])
    setWrongChoice(null)
  }, [currentIndex])

  const activeMCQs = reviewMode ? reviewMCQs : mcqs
  const currentMCQ = activeMCQs[currentIndex]
  const lockedAnswer = answers[currentIndex]
  const isQuestionSolved = lockedAnswer === currentMCQ?.correct_answer

  const firstTryScore = activeMCQs.reduce((n, _, idx) => n + (firstTryCorrect[idx] ? 1 : 0), 0)
  const pathProgress = getQuizPathProgress(
    activeMCQs.length,
    currentIndex,
    isQuestionSolved,
    wrongPicks.length
  )
  const progressPct = pathProgress * 100
  const questionPositionLabel = `${currentIndex + 1}/${activeMCQs.length}`

  useEffect(() => {
    if (!showResults || reviewMode) return
    const pct = quizAccuracyPercent(firstTryScore, activeMCQs.length)
    setResultPct(pct)
    if (registerQuizCompletion(pct)) {
      const t = setTimeout(() => setShowFeedback(true), 1500)
      return () => clearTimeout(t)
    }
  }, [showResults, reviewMode, firstTryScore, activeMCQs.length])

  const pickOption = (label: string) => {
    if (isPaused || lockedAnswer || !currentMCQ) return
    if (wrongPicks.includes(label)) return

    if (label === currentMCQ.correct_answer) {
      const prevWrong = wrongChecks[currentIndex] ?? 0
      setFirstTryCorrect((prev) => ({ ...prev, [currentIndex]: prevWrong === 0 }))
      setAnswers((p) => ({ ...p, [currentIndex]: label }))
      setWrongChoice(null)
      setWrongPicks([])

      const newStreak = streak + 1
      setStreak(newStreak)
      const xp = calculatePoints(true, newStreak, prevWrong)
      setTotalXp((t) => t + xp)
      setLastXpGain(xp)
      setShowXpPop(true)
      setTimeout(() => setShowXpPop(false), 1500)
      setConfettiBurst((c) => c + 1)
      if (soundsEnabled) soundManager.play('correct')
      return
    }

    setFirstTryCorrect((prev) => ({ ...prev, [currentIndex]: false }))
    setAnswers((p) => ({ ...p, [currentIndex]: label }))
    setWrongChecks((p) => ({ ...p, [currentIndex]: (p[currentIndex] ?? 0) + 1 }))
    setWrongPicks((prev) => [...prev, label])
    setWrongChoice(label)
    setStreak(0)
    if (soundsEnabled) soundManager.play('incorrect')
  }

  const goNext = () => {
    if (currentIndex < activeMCQs.length - 1) setCurrentIndex((i) => i + 1)
  }

  const handleReportQuestion = useCallback(async () => {
    if (!currentMCQ) return
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      await supabase.from('question_reports').insert({
        question_id: currentMCQ.id,
        question_type: examSlug,
        subject: subjectSlug,
        user_id: user?.id || null,
        report_sequence: currentIndex + 1,
        quiz_length: activeMCQs.length,
        mock_number: setNumber,
      })
    } catch {
      /* silent */
    }
    setShowReportToast(true)
    setTimeout(() => setShowReportToast(false), 3200)
  }, [activeMCQs.length, currentIndex, currentMCQ, examSlug, setNumber, subjectSlug])

  const handleSubmit = async () => {
    setSaving(true)
    const correct = firstTryScore
    const wrong = activeMCQs.length - correct
    const skipped = 0
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)
    const modeToType: Record<string, 'subject' | 'past-paper' | 'practice'> = {
      'most-repeated': 'subject',
      'most-important': 'subject',
      'past-papers': 'past-paper',
      practice: 'practice',
    }
    await saveQuizResults({
      quizType: modeToType[mode] ?? 'practice',
      examSlug,
      subject: subjectSlug,
      totalQuestions: activeMCQs.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      skippedAnswers: skipped,
      timeInSeconds: timeTaken,
    })
    try {
      const pct = Math.round(quizAccuracyPercent(correct, activeMCQs.length))
      const key = `imtehan_set_done_${examSlug}_${subjectSlug}_${mode}`
      const stored = JSON.parse(localStorage.getItem(key) || '{}')
      if (stored[setNumber] == null || pct > stored[setNumber]) stored[setNumber] = pct
      localStorage.setItem(key, JSON.stringify(stored))
      // Shared store (local + DB sync for signed-in users), keyed like every other flow.
      markCompleted(`exams-set:${examSlug}:${subjectSlug}:${mode}`, setNumber, pct)
    } catch { /* storage unavailable */ }
    setSaving(false)
    trackQuizComplete(`${examSlug}/${mode}`, correct, activeMCQs.length, subjectSlug)
    recordExamPractice({
      key: examSlug,
      label: EXAM_CONFIGS[examSlug]?.name ?? examSlug,
      href: `/exams/${examSlug}`,
    })
    if (soundsEnabled) {
      soundManager.stopAll()
      setTimeout(() => soundManager.play('quizComplete'), 120)
    }
    setShowResults(true)
  }

  const practiceMistakes = () => {
    const wrong = activeMCQs.filter((_, idx) => firstTryCorrect[idx] === false)
    setOriginalScore({ correct: firstTryScore, total: activeMCQs.length })
    setReviewMCQs(wrong)
    setReviewMode(true)
    setCurrentIndex(0)
    setAnswers({})
    setFirstTryCorrect({})
    setWrongChecks({})
    setWrongPicks([])
    setWrongChoice(null)
    setShowResults(false)
  }

  if (showResults) {
    const correct = firstTryScore
    const percentage = quizAccuracyPercent(correct, activeMCQs.length)
    const wrongPracticeCount = activeMCQs.filter((_, idx) => firstTryCorrect[idx] === false).length

    const weakTopics = (() => {
      if (reviewMode) return []
      const wrongMCQs = activeMCQs.filter((_, idx) => firstTryCorrect[idx] === false)
      const freq = wrongMCQs.flatMap(m => m.tags ?? []).reduce<Record<string, number>>(
        (acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {}
      )
      return Object.entries(freq).sort(([, a], [, b]) => b - a).slice(0, 4).map(([t]) => t.replace(/_/g, ' '))
    })()

    const improvement =
      reviewMode && originalScore
        ? (() => {
            const beforePct = quizAccuracyPercent(originalScore.correct, originalScore.total)
            return {
              original: beforePct,
              current: percentage,
              improved: percentage > beforePct,
              diff: percentage - beforePct,
            }
          })()
        : null

    return (
      <>
        <ConfettiCelebration
          trigger
          burstKey={correct + activeMCQs.length}
          intensity="high"
          mode="results"
        />
        <QuizResultsCard
          title={reviewMode ? 'Practice complete' : 'Set finished'}
          subtitle={
            reviewMode
              ? `${activeMCQs.length} questions reviewed`
              : `Set ${setNumber} · ${activeMCQs.length} questions`
          }
          timeElapsedSeconds={Math.floor((Date.now() - startTime) / 1000)}
          totalXp={totalXp}
          correct={correct}
          total={activeMCQs.length}
          improvement={improvement}
          wrongPracticeCount={!reviewMode ? wrongPracticeCount : 0}
          onPracticeMistakes={wrongPracticeCount > 0 ? practiceMistakes : undefined}
          weakTopics={weakTopics.length > 0 ? weakTopics : undefined}
          backLabel="Back to sets"
          onBack={() => router.push(`/exams/${examSlug}/${subjectSlug}/${mode}`)}
          onAnalytics={() => router.push(`/exams/${examSlug}/analytics`)}
        />
        <FeedbackPopup
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
          onAction={recordFeedbackAction}
          examSlug={examSlug}
          quizType="quiz"
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

  const level = Math.min(99, Math.max(1, 1 + Math.floor(totalXp / 250)))
  const journeyFootnote = isQuestionSolved ? 'Nice — onward.' : undefined

  const dockContinue = () => {
    if (currentIndex < activeMCQs.length - 1) {
      goNext()
    } else {
      void handleSubmit()
    }
  }

  let dockPhase: QuizDockPhase = 'hidden'
  if (lockedAnswer) dockPhase = 'correct'

  const bottomPad = dockPhase === 'correct' ? 'pb-40' : 'pb-6'

  return (
    <>
      <ConfettiCelebration
        trigger={confettiBurst > 0}
        burstKey={confettiBurst}
        intensity="medium"
        mode="answer"
      />
      <SignInPopup
        isOpen={showSignIn}
        onClose={() => {
          setShowSignIn(false)
          router.push(backUrl)
        }}
      />
      <GamifiedQuizShell
        journey={
          <QuizJourneyPanel
            totalSteps={activeMCQs.length}
            currentIndex={currentIndex}
            pathProgress={pathProgress}
            isQuestionSolved={isQuestionSolved}
            footnote={journeyFootnote}
          />
        }
      >
        <div className="mx-auto w-full max-w-2xl shrink-0 px-3 pb-2 pt-1 sm:px-5 sm:pb-3 sm:pt-2">
          <QuizGamificationHeader
            progressPct={progressPct}
            progressLabel={questionPositionLabel}
            streak={streak}
            totalXp={totalXp}
            lastXpGain={lastXpGain}
            showXpPop={showXpPop}
            onExit={() => router.back()}
            endSlot={
              <button
                type="button"
                onClick={() => setIsPaused(true)}
                aria-label="Pause quiz"
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.97]"
              >
                <Pause className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs font-semibold">Pause</span>
              </button>
            }
          />
        </div>

        <main
          className={`mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col overflow-hidden px-3 pb-3 sm:px-5 sm:pb-4 ${bottomPad}`}
        >
          <div className="mb-2 flex shrink-0 items-center justify-between gap-2 sm:mb-3">
            <div className="flex min-w-0 items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-500 sm:text-sm">
              <span aria-hidden>★</span>
              <span>Level {level}</span>
            </div>
            <button
              type="button"
              onClick={handleReportQuestion}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-rose-300 bg-rose-50 px-2 text-rose-600 shadow-sm transition hover:border-rose-400 hover:bg-rose-100 hover:text-rose-700 active:scale-[0.98] sm:h-9 sm:gap-2 sm:px-2.5"
              title="Tell us if this question is wrong or unclear"
              aria-label="Report a problem with this question"
            >
              <Flag className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2.25} />
              <span className="text-[10px] font-bold uppercase tracking-wide text-rose-700 sm:text-xs">
                Report
              </span>
            </button>
          </div>

          {(currentMCQ.difficulty || currentMCQ.type === 'most_repeated') && (
            <div className="mb-2.5 flex shrink-0 flex-wrap items-center gap-1.5 sm:mb-3">
              {currentMCQ.difficulty && DIFFICULTY_PILL[currentMCQ.difficulty] && (
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${DIFFICULTY_PILL[currentMCQ.difficulty]}`}>
                  {DIFFICULTY_LABEL[currentMCQ.difficulty]}
                </span>
              )}
              {currentMCQ.type === 'most_repeated' && (
                <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-700">
                  🔥 Real Exam Q
                </span>
              )}
            </div>
          )}

          <h1
            className="mb-3 line-clamp-[8] shrink-0 text-pretty break-words text-base font-bold leading-snug text-slate-800 sm:mb-4 sm:line-clamp-[10] sm:text-lg md:text-xl"
            title={currentMCQ.question}
          >
            {currentMCQ.question}
          </h1>

          <div className="flex min-h-0 w-full flex-1 flex-col justify-start gap-2 overflow-hidden pt-0.5 sm:gap-3 sm:pt-1">
            {options.map(({ label, text }) => {
              const st = flowOptionState(label, currentMCQ.correct_answer, {
                locked: lockedAnswer,
                wrongPicks,
                wrongChoice,
              })
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => pickOption(label)}
                  disabled={!!lockedAnswer}
                  className={`relative flex min-h-[48px] w-full items-center gap-3 overflow-hidden rounded-xl border-2 p-3 text-left text-base font-semibold text-slate-700 sm:gap-4 sm:rounded-2xl sm:p-4 sm:text-lg sm:font-bold ${FLOW_OPTION[st]}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 text-sm transition-colors sm:rounded-lg ${FLOW_BADGE[st]}`}
                  >
                    {label}
                  </div>
                  <span className="min-w-0 flex-1 leading-snug">{text}</span>
                </button>
              )
            })}
          </div>
        </main>
      </GamifiedQuizShell>

      <QuizFeedbackDock
        phase={dockPhase}
        correct={isQuestionSolved}
        title={isQuestionSolved ? 'Excellent!' : 'Incorrect!'}
        subtitle={isQuestionSolved ? (currentMCQ.explanation || 'Great job — keep going!') : undefined}
        continueLabel="Continue"
        onContinue={dockContinue}
        isLastStep={currentIndex === activeMCQs.length - 1}
      />

      {showReportToast && currentMCQ && (
        <div className="fixed left-1/2 top-6 z-[100] -translate-x-1/2 px-3">
          <div className="flex max-w-[min(100vw-24px,22rem)] items-center gap-3 rounded-2xl border-2 border-white/20 bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3 text-white shadow-2xl">
            <span className="text-xl">✓</span>
            <div className="min-w-0">
              <div className="font-bold">Question flagged</div>
              <div className="text-xs text-white/90">
                Q{currentIndex + 1} of {activeMCQs.length} · Set {setNumber} · ID {currentMCQ.id}
              </div>
            </div>
          </div>
        </div>
      )}

      {isPaused && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mx-auto">
              <Pause className="h-7 w-7 text-indigo-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-800">Quiz paused</h2>
            <p className="mb-6 text-sm text-slate-500">Take a breather — your progress is saved.</p>
            <button
              type="button"
              onClick={() => setIsPaused(false)}
              className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              <Play className="mr-2 inline h-4 w-4" />
              Resume quiz
            </button>
          </div>
        </div>
      )}
    </>
  )
}
