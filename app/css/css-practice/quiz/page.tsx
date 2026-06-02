'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
// Flag removed — report button no longer in question card
import dynamic from 'next/dynamic'
import { useFreeTrial } from '@/lib/hooks/useFreeTrial'
import { useAnalytics } from '@/lib/hooks/useAnalytics'
import { useLazyLoadMCQs } from '@/lib/hooks/useLazyLoadMCQs'
import { useSoundsEnabled } from '@/lib/hooks/useSoundsEnabled'
import { saveQuizResults } from '@/lib/analytics'
import { markCompleted } from '@/lib/completion'
import ProtectedContent from '@/components/security/ProtectedContent'
import UltraProtectedContent from '@/components/security/UltraProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import { soundManager } from '@/lib/sounds/soundManager'
import { calculatePoints } from '@/lib/gamification/pointsCalculator'
import { SoundToggle } from './components/SoundToggle'
import { EncouragementMessage } from './components/EncouragementMessage'
import FeedbackButton from '@/components/FeedbackButton'

// Optimized imports - reduce dynamic loading for better performance
import { ConfettiCelebration } from './components/ConfettiCelebration'
import { AnswerOption } from './components/AnswerOption'
import {
  GamifiedQuizShell,
  QuizFeedbackDock,
  type QuizDockPhase,
  getQuizPathProgress,
  QuizGamificationHeader,
  QuizJourneyPanel,
} from '@/components/gamified-quiz'
import type { AnswerOptionAppearance } from './components/AnswerOption'

// Only lazy load the heavy components that are used conditionally
const EnhancedResultsScreen = dynamic(() => import('./components/EnhancedResultsScreen').then(mod => ({ default: mod.EnhancedResultsScreen })), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading results...</p>
      </div>
    </div>
  ),
  ssr: false
})

function flowOptionState(
  label: string,
  correctAnswer: string,
  ctx: {
    locked?: string
    wrongPicks: string[]
    wrongChoice: string | null
  }
): AnswerOptionAppearance {
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

interface MCQ {
  id: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  subject: string
  year: number
  explanation_detailed?: string
  explanation_a?: string
  explanation_b?: string
  explanation_c?: string
  explanation_d?: string
  hint_1?: string
  hint_2?: string
  hint_3?: string
  topic?: string
  difficulty?: string
}

function CSSQuizContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading: authLoading, checkAccess } = useFreeTrial()
  const analytics = useAnalytics()
  const soundsEnabled = useSoundsEnabled()

  // Get subject and year for lazy loading detection
  const subject = searchParams.get('subject') || undefined
  const year = searchParams.get('year') || undefined
  const paper_type = searchParams.get('paper_type') || undefined
  const reviewMode = searchParams.get('reviewMode') === 'true'

  // Determine if we should enable lazy loading (only for subject+year specific paths, and not in review mode)
  const enableLazyLoad = Boolean(subject && year && !reviewMode)

  // Use the new lazy loading hook
  const {
    mcqs: lazyLoadedMcqs,
    totalCount,
    loading: lazyLoading,
    error: lazyError,
    isLoadingNextBatch,
    hasMoreToLoad,
    checkAndTriggerNextBatch,
  } = useLazyLoadMCQs({
    subject,
    year,
    paper_type,
    enableLazyLoad,
  })

  // Local state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lockedAnswers, setLockedAnswers] = useState<Record<number, string>>({})
  const [firstTryCorrect, setFirstTryCorrect] = useState<Record<number, boolean>>({})
  const [wrongChecks, setWrongChecks] = useState<Record<number, number>>({})
  const [wrongPicks, setWrongPicks] = useState<string[]>([])
  const [showWrongPanel, setShowWrongPanel] = useState(false)
  const [wrongChoice, setWrongChoice] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now())

  // Review mode state
  const [reviewMCQs, setReviewMCQs] = useState<MCQ[]>([])
  const [reviewLoading, setReviewLoading] = useState(false)
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)

  // Gamification state
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [points, setPoints] = useState(0)
  const [recentPoints, setRecentPoints] = useState(0)
  const [showRecentPoints, setShowRecentPoints] = useState(false)
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [encouragementType, setEncouragementType] = useState<
    'correct' | 'incorrect' | 'milestone'
  >('correct')
  /** Increment on each correct answer to re-fire confetti */
  const [confettiBurst, setConfettiBurst] = useState(0)

  // Determine which MCQs to use (review or regular)
  const activeMCQs = reviewMode ? reviewMCQs : lazyLoadedMcqs
  const activeLoading = reviewMode ? reviewLoading : lazyLoading

  // Memoized values to prevent unnecessary recalculations
  const currentMCQ = useMemo(
    () => activeMCQs[currentIndex],
    [activeMCQs, currentIndex]
  )

  const lockedAnswer = lockedAnswers[currentIndex]
  const isQuestionSolved = lockedAnswer === currentMCQ?.correct_answer

  const firstTryScore = useMemo(
    () => activeMCQs.reduce((n, _, i) => n + (firstTryCorrect[i] ? 1 : 0), 0),
    [activeMCQs, firstTryCorrect]
  )

  const wrongQuestionIds = useMemo(
    () =>
      activeMCQs
        .map((m, i) => (firstTryCorrect[i] === false ? m.id : null))
        .filter((x): x is number => x != null),
    [activeMCQs, firstTryCorrect]
  )

  const pathProgress = useMemo(
    () =>
      getQuizPathProgress(
        activeMCQs.length,
        currentIndex,
        isQuestionSolved,
        wrongPicks.length
      ),
    [activeMCQs.length, currentIndex, isQuestionSolved, wrongPicks.length]
  )
  const progressPct = pathProgress * 100
  const questionPositionLabel = `${currentIndex + 1}/${activeMCQs.length}`

  useEffect(() => {
    setWrongPicks([])
    setShowWrongPanel(false)
    setWrongChoice(null)
  }, [currentIndex])

  const isLastQuestion = useMemo(
    () => currentIndex === activeMCQs.length - 1,
    [currentIndex, activeMCQs.length]
  )

  // Memoized answer options array
  const options = useMemo(() => [
    { label: 'A', text: currentMCQ?.option_a || '' },
    { label: 'B', text: currentMCQ?.option_b || '' },
    { label: 'C', text: currentMCQ?.option_c || '' },
    { label: 'D', text: currentMCQ?.option_d || '' },
  ], [currentMCQ])

  // Handle auth check and access validation
  useEffect(() => {
    // Wait for auth check to complete
    if (authLoading) {
      return
    }

    // Check if user has access (handles both signed-in users and free trial limits)
    if (!user && !checkAccess('cssSubject')) {
      // Redirect back to subjects page - the hook will show sign-in popup
      router.push('/css/subjects')
      return
    }

    // Preload sounds when component mounts
    soundManager.preload().catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to preload sounds:', error)
      }
    })
  }, [user, authLoading, checkAccess, router])

  // Load review mode MCQs if in review mode
  useEffect(() => {
    if (reviewMode) {
      const loadReviewMCQs = async () => {
        try {
          setReviewLoading(true)

          // Get wrong question IDs from session storage
          const storedIds = sessionStorage.getItem('practiceWrongQuestions')
          if (!storedIds) {
            setReviewLoading(false)
            router.back()
            return
          }

          const questionIds = JSON.parse(storedIds) as number[]
          if (questionIds.length === 0) {
            setReviewLoading(false)
            router.back()
            return
          }

          // Get original score from session storage (for comparison later)
          const storedScore = sessionStorage.getItem('originalQuizScore')
          if (storedScore) {
            setOriginalScore(JSON.parse(storedScore))
          }

          // Fetch MCQs by IDs
          const supabase = createClient()
          const { data, error } = await supabase
            .from('css_mcqs_enhanced')
            .select('*')
            .in('id', questionIds)

          if (error) {
            console.error('Error loading review MCQs:', error)
            setReviewLoading(false)
            router.back()
            return
          }

          if (!data || data.length === 0) {
            setReviewLoading(false)
            router.back()
            return
          }

          // Shuffle the questions
          const shuffled = [...data].sort(() => Math.random() - 0.5)
          setReviewMCQs(shuffled as MCQ[])

          // CRITICAL: Reset all quiz state to start fresh
          setCurrentIndex(0)
          setLockedAnswers({})
          setFirstTryCorrect({})
          setWrongChecks({})
          setWrongPicks([])
          setShowWrongPanel(false)
          setWrongChoice(null)
          setShowResult(false)
          setStreak(0)
          setMaxStreak(0)
          setPoints(0)
          setRecentPoints(0)
          setShowRecentPoints(false)
          setQuizStartTime(Date.now())

          setReviewLoading(false)

        } catch (error) {
          console.error('Error in review mode:', error)
          setReviewLoading(false)
          router.back()
        }
      }

      loadReviewMCQs()
    }
  }, [reviewMode, router])

  // Track quiz start when MCQs are loaded
  useEffect(() => {
    const mcqsToCheck = reviewMode ? reviewMCQs : lazyLoadedMcqs
    const loadingToCheck = reviewMode ? reviewLoading : lazyLoading

    if (mcqsToCheck.length > 0 && !loadingToCheck) {
      const quizSubject = subject || 'General'
      analytics.trackQuizStart(reviewMode ? 'css-mcq-review' : 'css-mcq', quizSubject)
    }
  }, [lazyLoadedMcqs.length, lazyLoading, reviewMCQs.length, reviewLoading, subject, analytics, reviewMode])

  const pickOption = (label: string) => {
    if (!currentMCQ || lockedAnswer) return
    if (wrongPicks.includes(label)) return

    if (label === currentMCQ.correct_answer) {
      const prevWrong = wrongChecks[currentIndex] ?? 0
      setFirstTryCorrect((prev) => ({ ...prev, [currentIndex]: prevWrong === 0 }))
      setLockedAnswers((p) => ({ ...p, [currentIndex]: label }))
      setShowWrongPanel(false)
      setWrongChoice(null)
      setWrongPicks([])

      const newStreak = streak + 1
      setStreak(newStreak)
      if (newStreak > maxStreak) setMaxStreak(newStreak)

      const earnedPoints = calculatePoints(true, newStreak, prevWrong)
      setPoints((p) => p + earnedPoints)
      setRecentPoints(earnedPoints)
      setShowRecentPoints(true)
      setTimeout(() => setShowRecentPoints(false), 1500)

      if (soundsEnabled) soundManager.play('correct')
      setConfettiBurst((k) => k + 1)

      if (newStreak > 0 && newStreak % 5 === 0) {
        setEncouragementType('milestone')
        if (soundsEnabled) soundManager.play('streakMilestone')
      } else {
        setEncouragementType('correct')
      }
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 2000)
      return
    }

    setWrongChecks((p) => ({ ...p, [currentIndex]: (p[currentIndex] ?? 0) + 1 }))
    setWrongPicks((prev) => [...prev, label])
    setWrongChoice(label)
    setShowWrongPanel(true)
    setStreak(0)
    if (soundsEnabled) soundManager.play('incorrect')
    setEncouragementType('incorrect')
    setShowEncouragement(true)
    setTimeout(() => setShowEncouragement(false), 2000)
  }

  const goNext = () => {
    if (currentIndex < activeMCQs.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      if (enableLazyLoad && !reviewMode) {
        checkAndTriggerNextBatch(nextIndex)
      }
    }
  }

  const completeQuiz = () => {
    if (soundsEnabled) {
      soundManager.stopAll()
      setTimeout(() => {
        soundManager.play('quizComplete')
      }, 100)
    }

    const completionSubject = subject || 'General'
    const timeInSeconds = Math.floor((Date.now() - quizStartTime) / 1000)

    // Persist completion locally so the green badge shows on year/subject cards (guests too).
    if (!reviewMode && year) {
      const pct = activeMCQs.length ? (firstTryScore / activeMCQs.length) * 100 : 0
      markCompleted(`css:${completionSubject}`, year, pct)
    }

    analytics.trackQuizComplete(
      reviewMode ? 'css-mcq-review' : 'css-mcq',
      firstTryScore,
      activeMCQs.length,
      completionSubject
    )

    if (!reviewMode) {
      saveQuizResults({
        quizType: 'subject',
        examSlug: 'css',
        subject: completionSubject,
        totalQuestions: activeMCQs.length,
        correctAnswers: firstTryScore,
        wrongAnswers: activeMCQs.length - firstTryScore,
        skippedAnswers: 0,
        timeInSeconds,
      })
        .then((response) => {
          if (response && process.env.NODE_ENV === 'development') {
            console.log('✅ Quiz saved to analytics!', {
              score: `${firstTryScore}/${activeMCQs.length}`,
              time: `${Math.floor(timeInSeconds / 60)}m ${timeInSeconds % 60}s`,
              streak: `${response.streak} days 🔥`,
              subject: completionSubject,
            })
            if (response.streak > 0) {
              console.log(`🔥 Current streak: ${response.streak} days!`)
            }
          }
        })
        .catch((error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('❌ Error saving quiz to analytics:', error)
          }
        })
    }

    setShowResult(true)
  }

  const dockContinue = () => {
    if (currentIndex < activeMCQs.length - 1) {
      goNext()
    } else {
      completeQuiz()
    }
  }

  const practiceMistakes = () => {
    sessionStorage.setItem('practiceWrongQuestions', JSON.stringify(wrongQuestionIds))

    sessionStorage.setItem(
      'originalQuizScore',
      JSON.stringify({
        correct: firstTryScore,
        total: activeMCQs.length,
      })
    )

    // Navigate to quiz with review mode
    const params = new URLSearchParams()
    if (subject) params.append('subject', subject)
    if (year) params.append('year', year.toString())
    params.append('reviewMode', 'true')

    // Reload with review mode
    router.push(`/css/css-practice/quiz?${params.toString()}`)
  }

  const restartQuiz = () => {
    setCurrentIndex(0)
    setLockedAnswers({})
    setFirstTryCorrect({})
    setWrongChecks({})
    setWrongPicks([])
    setShowWrongPanel(false)
    setWrongChoice(null)
    setShowResult(false)
    setQuizStartTime(Date.now())
    setStreak(0)
    setMaxStreak(0)
    setPoints(0)
    setRecentPoints(0)
    setShowRecentPoints(false)
    router.refresh()
  }

  if (activeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{reviewMode ? 'Loading practice questions...' : 'Loading questions...'}</p>
        </div>
      </div>
    )
  }

  if (lazyError && !reviewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-xl text-gray-700 mb-4">Error: {lazyError}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (activeMCQs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-xl text-gray-700 mb-4">No MCQs found for your selection</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <>
        <ConfettiCelebration
          trigger={true}
          burstKey={firstTryScore + activeMCQs.length}
          intensity="high"
          mode="results"
        />
        <EnhancedResultsScreen
          score={firstTryScore}
          total={activeMCQs.length}
          maxStreak={maxStreak}
          totalPoints={points}
          wrongQuestionIds={wrongQuestionIds}
          onRestart={restartQuiz}
          onPracticeMistakes={practiceMistakes}
          onExit={() => router.back()}
          reviewMode={reviewMode}
          originalScore={originalScore}
          quizDurationSeconds={Math.floor((Date.now() - quizStartTime) / 1000)}
        />
      </>
    )
  }

  const level = Math.min(99, Math.max(1, 1 + Math.floor(points / 250)))
  const journeyFootnote = isQuestionSolved ? 'Nice — onward.' : undefined

  let dockPhase: QuizDockPhase = 'hidden'
  if (isQuestionSolved) dockPhase = 'correct'
  else if (showWrongPanel) dockPhase = 'wrong'

  const bottomPad = dockPhase === 'wrong' || dockPhase === 'correct' ? 'pb-40' : 'pb-6'

  return (
    <>
      <DevToolsWarning />
      <ConfettiCelebration
        trigger={confettiBurst > 0}
        burstKey={confettiBurst}
        intensity="medium"
        mode="answer"
      />
      <EncouragementMessage
        type={encouragementType}
        show={showEncouragement}
      />
      <ProtectedContent>
        <UltraProtectedContent>
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
                totalXp={points}
                lastXpGain={recentPoints}
                showXpPop={showRecentPoints}
                onExit={() => router.back()}
                endSlot={<SoundToggle />}
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
                title={currentMCQ.question_text}
              >
                {currentMCQ.question_text}
              </h1>

              <div className="flex min-h-0 w-full flex-1 flex-col justify-start gap-2 overflow-hidden pt-0.5 sm:gap-3 sm:pt-1">
                {options.map((option) => {
                  const appearance = flowOptionState(option.label, currentMCQ.correct_answer, {
                    locked: lockedAnswer,
                    wrongPicks,
                    wrongChoice,
                  })
                  const optionExplanation = currentMCQ[
                    `explanation_${option.label.toLowerCase()}` as keyof MCQ
                  ] as string | undefined

                  return (
                    <AnswerOption
                      key={option.label}
                      label={option.label}
                      text={option.text}
                      appearance={appearance}
                      isSelected={false}
                      isCorrect={false}
                      isRevealed={false}
                      onSelect={() => pickOption(option.label)}
                      disabled={!!lockedAnswer || wrongPicks.includes(option.label)}
                      explanation={optionExplanation}
                    />
                  )
                })}
              </div>
            </main>
          </GamifiedQuizShell>
        </UltraProtectedContent>
      </ProtectedContent>

      <QuizFeedbackDock
        phase={dockPhase}
        correct
        title={dockPhase === 'wrong' ? 'Not quite' : 'Excellent!'}
        subtitle={
          dockPhase === 'correct'
            ? currentMCQ.explanation_detailed?.slice(0, 220) || 'Great job — keep going!'
            : undefined
        }
        continueLabel="Continue"
        onContinue={dockContinue}
        isLastStep={isLastQuestion}
      />

      {/* Feedback Button - Pops out from side after 2 minutes */}
      <FeedbackButton page="css-practice-quiz" />

    </>
  )
}

export default function CSSQuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    }>
      <CSSQuizContent />
    </Suspense>
  )
}
