'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
// lucide icons removed — 3D button style handles correct/wrong visuals
import { useAuth } from '@/lib/contexts/AuthContext'
import SignInPopup from '@/components/auth/SignInPopup'
import { saveQuizResults } from '@/lib/analytics'
import FeedbackPopup from '@/components/FeedbackPopup'
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
  topic?: string
  subtopic?: string
}

interface Props {
  mcqs: MCQ[]
  examSlug: string
  subject: string
  subjectName: string
  subjectGradient: string
  difficulty: string  // could be 'easy'/'medium'/'hard' OR an actual topic name
  setNumber: number
  totalSets?: number  // if provided, "Next Set" is hidden on the last set
  theme?: 'blue' | 'green'
  backPath?: string  // optional back URL override
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

const THEME = {
  blue: {
    pageBg:      'from-slate-50 via-blue-50 to-indigo-50',
    header:      'from-slate-800 via-blue-900 to-slate-800 border-blue-500/30',
    progress:    'from-blue-400 to-blue-600',
    badge:       'bg-blue-500/20 text-blue-200 border-blue-500/30',
    optHover:    'hover:border-blue-400 hover:bg-blue-50/50',
    btn:         'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
    qBadge:      'from-blue-600 to-blue-700',
    resultIcon:  'from-blue-600 to-blue-700',
    resultScore: 'bg-blue-50 border-blue-200',
    resultText:  'text-blue-700',
    resultSub:   'text-blue-600',
  },
  green: {
    pageBg:      'from-slate-50 via-emerald-50 to-teal-50',
    header:      'from-slate-800 via-emerald-900 to-slate-800 border-emerald-500/30',
    progress:    'from-emerald-400 to-emerald-600',
    badge:       'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
    optHover:    'hover:border-emerald-400 hover:bg-emerald-50/50',
    btn:         'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800',
    qBadge:      'from-emerald-600 to-emerald-700',
    resultIcon:  'from-emerald-600 to-emerald-700',
    resultScore: 'bg-emerald-50 border-emerald-200',
    resultText:  'text-emerald-700',
    resultSub:   'text-emerald-600',
  },
}

export default function MDCATSetQuiz({ mcqs, examSlug, subject, subjectName, difficulty, setNumber, totalSets, theme = 'blue', backPath }: Props) {
  const router  = useRouter()
  const t       = THEME[theme]
  const backUrl = backPath ?? `/mdcat/${subject}/${encodeURIComponent(difficulty)}`

  const { user, loading: authLoading } = useAuth()
  const isPremium = !!user?.user_metadata?.is_premium
  const soundsEnabled = useSoundsEnabled()

  const [showSignIn, setShowSignIn] = useState(false)
  const [streak, setStreak] = useState(0)
  const [totalXp, setTotalXp] = useState(0)
  const [lastXpGain, setLastXpGain] = useState(0)
  const [showXpPop, setShowXpPop] = useState(false)
  const [confettiBurst, setConfettiBurst] = useState(0)

  // Access gate: sets 1-2 = free, set 3 = sign-in required, set 4+ = premium page
  useEffect(() => {
    if (authLoading) return
    if (setNumber >= 4 && !isPremium) {
      router.replace(PREMIUM_PAGE_PATH)
    } else if (setNumber === 3 && !user) {
      setShowSignIn(true)
    }
  }, [authLoading, user, isPremium, setNumber])

  const [currentIndex, setCurrentIndex]   = useState(0)
  const [answers, setAnswers]             = useState<Record<number, string>>({})
  const [firstTryCorrect, setFirstTryCorrect] = useState<Record<number, boolean>>({})
  const [wrongChecks, setWrongChecks]     = useState<Record<number, number>>({})
  const [wrongPicks, setWrongPicks]       = useState<string[]>([])
  const [showWrongPanel, setShowWrongPanel] = useState(false)
  const [wrongChoice, setWrongChoice]     = useState<string | null>(null)
  const [showResults, setShowResults]     = useState(false)
  const [showFeedback, setShowFeedback]   = useState(false)
  const [resultPct, setResultPct]         = useState(0)
  const [reviewMode, setReviewMode]       = useState(false)
  const [reviewMCQs, setReviewMCQs]       = useState<MCQ[]>([])
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)
  const startTimeRef                      = useRef(Date.now())

  useEffect(() => {
    soundManager.preload().catch(() => {})
  }, [])

  const activeMCQs = reviewMode ? reviewMCQs : mcqs

  useEffect(() => {
    setWrongPicks([])
    setShowWrongPanel(false)
    setWrongChoice(null)
  }, [currentIndex])

  const firstTryScore = activeMCQs.reduce((n, _, idx) => n + (firstTryCorrect[idx] ? 1 : 0), 0)

  // Trigger feedback popup with adaptive cadence (first-try score)
  useEffect(() => {
    if (!showResults || reviewMode) return
    const pct = activeMCQs.length > 0 ? Math.round((firstTryScore / activeMCQs.length) * 100) : 0
    setResultPct(pct)
    if (registerQuizCompletion(pct)) {
      const t = setTimeout(() => setShowFeedback(true), 1500)
      return () => clearTimeout(t)
    }
  }, [showResults, reviewMode, firstTryScore, activeMCQs.length])

  // Guard: parent page should prevent this, but protect against empty data
  if (!activeMCQs || activeMCQs.length === 0) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${t.pageBg} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-slate-500 mb-4">No questions available for this set.</p>
          <button onClick={() => router.push(backUrl)} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            ← Back to Sets
          </button>
        </div>
      </div>
    )
  }

  const currentMCQ = activeMCQs[currentIndex]
  const lockedAnswer = answers[currentIndex]
  const isQuestionSolved = lockedAnswer === currentMCQ?.correct_answer

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
      setTotalXp((v) => v + xp)
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

  const pathProgress = getQuizPathProgress(
    activeMCQs.length,
    currentIndex,
    isQuestionSolved,
    wrongPicks.length
  )
  const progressPct = pathProgress * 100
  const questionPositionLabel = `${currentIndex + 1}/${activeMCQs.length}`

  const finishQuiz = async () => {
    if (!reviewMode) {
      const timeInSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const correct = mcqs.reduce((n, _, idx) => n + (firstTryCorrect[idx] ? 1 : 0), 0)
      await saveQuizResults({
        quizType: 'subject',
        examSlug: examSlug,
        subject: subjectName,
        totalQuestions: mcqs.length,
        correctAnswers: correct,
        wrongAnswers: mcqs.length - correct,
        skippedAnswers: 0,
        timeInSeconds,
      })
    }
    if (soundsEnabled) {
      soundManager.stopAll()
      setTimeout(() => soundManager.play('quizComplete'), 120)
    }
    setShowResults(true)
  }

  const dockContinue = () => {
    if (currentIndex < activeMCQs.length - 1) {
      goNext()
    } else {
      void finishQuiz()
    }
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

  // Results screen
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
              ? `${subjectName} · ${activeMCQs.length} questions`
              : `${subjectName} · Set ${setNumber} · ${activeMCQs.length} questions`
          }
          timeElapsedSeconds={Math.floor((Date.now() - startTimeRef.current) / 1000)}
          totalXp={totalXp}
          correct={correct}
          total={activeMCQs.length}
          improvement={improvement}
          wrongPracticeCount={!reviewMode ? wrongPracticeCount : 0}
          onPracticeMistakes={wrongPracticeCount > 0 ? practiceMistakes : undefined}
          footerExtra={
            !reviewMode && (!totalSets || setNumber < totalSets) ? (
              <button
                type="button"
                onClick={() => router.push(`${backUrl}/set/${setNumber + 1}`)}
                className={`mb-5 w-full rounded-2xl bg-gradient-to-r ${t.btn} py-3.5 text-[15px] font-bold text-white shadow-md transition hover:opacity-95 active:scale-[0.99]`}
              >
                Next Set →
              </button>
            ) : null
          }
          backLabel="Back to sets"
          onBack={() => router.push(backUrl)}
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

  const level = Math.min(99, Math.max(1, 1 + Math.floor(totalXp / 250)))
  const journeyFootnote = isQuestionSolved
    ? 'Impressive! Moving right along.'
    : 'Tap the correct answer — keep trying until you get it.'

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
      {/* Access gate popups */}
      <SignInPopup
        isOpen={showSignIn}
        onClose={() => { setShowSignIn(false); router.push(backUrl) }}
      />
      <GamifiedQuizShell
        mobileRail={
          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-indigo-900/80">
            <span>{subjectName}</span>
            <span>{questionPositionLabel}</span>
          </div>
        }
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
            onExit={() => router.push(backUrl)}
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
            {(['A', 'B', 'C', 'D'] as const).map((opt) => {
              const state = flowOptionState(opt, currentMCQ.correct_answer, {
                locked: lockedAnswer,
                wrongPicks,
                wrongChoice,
              })
              const optText = currentMCQ[`option_${opt.toLowerCase()}` as keyof MCQ] as string
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => pickOption(opt)}
                  disabled={!!lockedAnswer || wrongPicks.includes(opt)}
                  className={`relative flex min-h-[48px] w-full items-center gap-3 overflow-hidden rounded-xl border-2 p-3 text-left text-base font-semibold text-slate-700 sm:gap-4 sm:rounded-2xl sm:p-4 sm:text-lg sm:font-bold ${FLOW_OPTION[state]}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 text-sm transition-colors sm:rounded-lg ${FLOW_BADGE[state]}`}
                  >
                    {opt}
                  </div>
                  <span className="min-w-0 flex-1 leading-snug">{optText}</span>
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
