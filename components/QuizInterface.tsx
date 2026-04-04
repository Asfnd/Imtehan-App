'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { trackQuizStart, trackQuizComplete } from '@/lib/analytics/events'
import { saveQuizResults } from '@/lib/analytics'
import FeedbackPopup from '@/components/FeedbackPopup'
import { useAuth } from '@/lib/contexts/AuthContext'
import SignInPopup from '@/components/auth/SignInPopup'
import { registerQuizCompletion, recordFeedbackAction } from '@/lib/feedbackPrompt'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
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
}

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
  const isPremium = !!user?.user_metadata?.is_premium
  const soundsEnabled = useSoundsEnabled()

  const [showSignIn, setShowSignIn] = useState(false)
  const [streak, setStreak] = useState(0)
  const [totalXp, setTotalXp] = useState(0)
  const [lastXpGain, setLastXpGain] = useState(0)
  const [showXpPop, setShowXpPop] = useState(false)
  const [confettiBurst, setConfettiBurst] = useState(0)

  useEffect(() => {
    if (authLoading) return
    if (setNumber >= 4 && !isPremium) {
      router.replace(PREMIUM_PAGE_PATH)
    } else if (setNumber === 3 && !user) {
      setShowSignIn(true)
    }
  }, [authLoading, user, isPremium, setNumber, router])

  const backUrl = `/exams/${examSlug}/${subjectSlug}/${mode}`

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [firstTryCorrect, setFirstTryCorrect] = useState<Record<number, boolean>>({})
  const [wrongChecks, setWrongChecks] = useState<Record<number, number>>({})
  const [wrongPicks, setWrongPicks] = useState<string[]>([])
  const [showWrongPanel, setShowWrongPanel] = useState(false)
  const [wrongChoice, setWrongChoice] = useState<string | null>(null)

  const [showResults, setShowResults] = useState(false)
  const [startTime] = useState(Date.now())
  const [, setSaving] = useState(false)

  const [reviewMode, setReviewMode] = useState(false)
  const [reviewMCQs, setReviewMCQs] = useState<MCQ[]>([])
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)

  const [showFeedback, setShowFeedback] = useState(false)
  const [resultPct, setResultPct] = useState(0)

  useEffect(() => {
    trackQuizStart(`${examSlug}/${mode}`, subjectSlug)
  }, [examSlug, mode, subjectSlug])

  useEffect(() => {
    soundManager.preload().catch(() => {})
  }, [])

  useEffect(() => {
    setWrongPicks([])
    setShowWrongPanel(false)
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
    if (lockedAnswer || !currentMCQ) return
    if (wrongPicks.includes(label)) return

    if (label === currentMCQ.correct_answer) {
      const prevWrong = wrongChecks[currentIndex] ?? 0
      setFirstTryCorrect((prev) => ({ ...prev, [currentIndex]: prevWrong === 0 }))
      setAnswers((p) => ({ ...p, [currentIndex]: label }))
      setShowWrongPanel(false)
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

    setWrongChecks((p) => ({ ...p, [currentIndex]: (p[currentIndex] ?? 0) + 1 }))
    setWrongPicks((prev) => [...prev, label])
    setWrongChoice(label)
    setShowWrongPanel(true)
    setStreak(0)
    if (soundsEnabled) soundManager.play('incorrect')
  }

  const goNext = () => {
    if (currentIndex < activeMCQs.length - 1) setCurrentIndex((i) => i + 1)
  }

  const handleSubmit = async () => {
    setSaving(true)
    const correct = firstTryScore
    const wrong = activeMCQs.length - correct
    const skipped = 0
    const detailedAnswers = activeMCQs.map((mcq, idx) => {
      const ua = answers[idx]
      return {
        questionId: mcq.id,
        userAnswer: ua || null,
        correctAnswer: mcq.correct_answer,
        isCorrect: !!firstTryCorrect[idx],
      }
    })
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)
    const modeToType: Record<string, 'subject' | 'past-paper' | 'practice'> = {
      'most-repeated': 'subject',
      'most-important': 'subject',
      'past-papers': 'past-paper',
      practice: 'practice',
    }
    try {
      const supabase = createClient()
      const { data: { user: u } } = await supabase.auth.getUser()
      if (u) {
        await supabase.from('quiz_attempts').insert({
          user_id: u.id,
          exam_slug: examSlug,
          subject_slug: subjectSlug,
          mode,
          set_number: setNumber,
          score: correct,
          total_questions: activeMCQs.length,
          time_taken: timeTaken,
          answers: detailedAnswers,
        })
      }
    } catch (_) { /* silent */ }
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
    setSaving(false)
    trackQuizComplete(`${examSlug}/${mode}`, correct, activeMCQs.length, subjectSlug)
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
    setShowWrongPanel(false)
    setWrongChoice(null)
    setShowResults(false)
  }

  if (showResults) {
    const correct = firstTryScore
    const percentage = quizAccuracyPercent(correct, activeMCQs.length)
    const wrongPracticeCount = activeMCQs.filter((_, idx) => firstTryCorrect[idx] === false).length

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
  if (isQuestionSolved) dockPhase = 'correct'
  else if (showWrongPanel) dockPhase = 'wrong'

  const bottomPad = dockPhase === 'wrong' || dockPhase === 'correct' ? 'pb-40' : 'pb-6'

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
          />
        </div>

        <main
          className={`mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col overflow-hidden px-3 pb-3 sm:px-5 sm:pb-4 ${bottomPad}`}
        >
          <div className="mb-2 flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-500 sm:mb-3 sm:text-sm">
            <span aria-hidden>★</span>
            <span>Level {level}</span>
          </div>

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
                  disabled={!!lockedAnswer || wrongPicks.includes(label)}
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
        correct
        title={dockPhase === 'wrong' ? 'Not quite' : 'Excellent!'}
        subtitle={
          dockPhase === 'correct'
            ? (currentMCQ.explanation || '').slice(0, 220) || 'Great job — keep going!'
            : undefined
        }
        continueLabel="Continue"
        onContinue={dockContinue}
        isLastStep={currentIndex === activeMCQs.length - 1}
      />
    </>
  )
}
