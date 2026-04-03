'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
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

const SUBJECT_CONFIG: Record<string, { name: string; table: string; color: string }> = {
  'biology': { name: 'Biology', table: 'mdcat_biology', color: 'from-green-600 to-emerald-700' },
  'chemistry': { name: 'Chemistry', table: 'mdcat_chemistry', color: 'from-purple-600 to-violet-700' },
  'physics': { name: 'Physics', table: 'mdcat_physics', color: 'from-blue-600 to-indigo-700' },
  'english': { name: 'English', table: 'mdcat_english', color: 'from-amber-600 to-orange-700' },
  'logical-reasoning': { name: 'Logical Reasoning', table: 'mdcat_logical_reasoning', color: 'from-rose-600 to-pink-700' },
}

interface MCQ {
  id: number
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation: string
  difficulty: string
  subtopic: string
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

export default function MDCATQuizPage() {
  const router = useRouter()
  const params = useParams()
  const subject = params.subject as string
  const topic = decodeURIComponent(params.topic as string)
  const soundsEnabled = useSoundsEnabled()

  const [mcqs, setMcqs] = useState<MCQ[]>([])
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewMCQs, setReviewMCQs] = useState<MCQ[]>([])
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [firstTryCorrect, setFirstTryCorrect] = useState<Record<number, boolean>>({})
  const [wrongChecks, setWrongChecks] = useState<Record<number, number>>({})
  const [wrongPicks, setWrongPicks] = useState<string[]>([])
  const [showWrongPanel, setShowWrongPanel] = useState(false)
  const [wrongChoice, setWrongChoice] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)
  const [totalXp, setTotalXp] = useState(0)
  const [lastXpGain, setLastXpGain] = useState(0)
  const [showXpPop, setShowXpPop] = useState(false)
  const [confettiBurst, setConfettiBurst] = useState(0)
  const quizStartedAtRef = useRef<number | null>(null)

  const subjectConfig = SUBJECT_CONFIG[subject]

  useEffect(() => {
    soundManager.preload().catch(() => {})
  }, [])

  useEffect(() => {
    async function fetchMCQs() {
      if (!subjectConfig) return

      const supabase = createClient()
      const { data, error } = await supabase
        .from(subjectConfig.table)
        .select('*')
        .eq('topic', topic)
        .limit(50)

      if (error) {
        console.error('Error fetching MCQs:', error)
        setLoading(false)
        return
      }

      const shuffled = (data || []).sort(() => Math.random() - 0.5).slice(0, 30)
      setMcqs(shuffled)
      setLoading(false)
    }

    fetchMCQs()
  }, [subject, topic, subjectConfig])

  useEffect(() => {
    if (!loading && mcqs.length > 0 && !reviewMode) {
      quizStartedAtRef.current = Date.now()
    }
  }, [loading, mcqs.length, reviewMode])

  const activeMCQs = reviewMode ? reviewMCQs : mcqs

  useEffect(() => {
    setWrongPicks([])
    setShowWrongPanel(false)
    setWrongChoice(null)
  }, [currentIndex])

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

  const finishQuiz = () => {
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
      finishQuiz()
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
    setStreak(0)
    setTotalXp(0)
    setShowResults(false)
    quizStartedAtRef.current = Date.now()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (!subjectConfig || activeMCQs.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">No MCQs found</h1>
          <button
            onClick={() => router.push(`/mdcat/${subject}`)}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to {subjectConfig?.name || 'MDCAT'}
          </button>
        </div>
      </div>
    )
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
          title={reviewMode ? 'Practice complete' : 'Topic complete'}
          subtitle={
            reviewMode
              ? `${subjectConfig.name} · ${activeMCQs.length} questions`
              : `${subjectConfig.name} · ${topic} · ${activeMCQs.length} questions`
          }
          timeElapsedSeconds={
            quizStartedAtRef.current != null
              ? Math.floor((Date.now() - quizStartedAtRef.current) / 1000)
              : 0
          }
          totalXp={totalXp}
          correct={correct}
          total={activeMCQs.length}
          improvement={improvement}
          wrongPracticeCount={!reviewMode ? wrongPracticeCount : 0}
          onPracticeMistakes={wrongPracticeCount > 0 ? practiceMistakes : undefined}
          footerExtra={
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mb-5 w-full rounded-2xl border-2 border-slate-200 py-3.5 text-[15px] font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Retry quiz
            </button>
          }
          backLabel={`Back to ${subjectConfig.name}`}
          onBack={() => router.push(`/mdcat/${subject}`)}
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
            onExit={() => router.push(`/mdcat/${subject}`)}
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
              const optionText = currentMCQ[`option_${opt.toLowerCase()}` as keyof MCQ] as string
              const state = flowOptionState(opt, currentMCQ.correct_answer, {
                locked: lockedAnswer,
                wrongPicks,
                wrongChoice,
              })
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
                  <span className="min-w-0 flex-1 leading-snug">{optionText}</span>
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
