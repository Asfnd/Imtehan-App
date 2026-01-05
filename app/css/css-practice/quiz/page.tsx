'use client'

import { useState, useEffect, useCallback, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Flag } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useFreeTrial } from '@/lib/hooks/useFreeTrial'
import { useAnalytics } from '@/lib/hooks/useAnalytics'
import { useLazyLoadMCQs } from '@/lib/hooks/useLazyLoadMCQs'
import { useSoundsEnabled } from '@/lib/hooks/useSoundsEnabled'
import { saveQuizResults } from '@/lib/analytics'
import ProtectedContent from '@/components/security/ProtectedContent'
import UltraProtectedContent from '@/components/security/UltraProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import { soundManager } from '@/lib/sounds/soundManager'
import { calculatePoints } from '@/lib/gamification/pointsCalculator'
import { SoundToggle } from './components/SoundToggle'
import { PointsDisplay } from './components/PointsDisplay'
import { EncouragementMessage } from './components/EncouragementMessage'
import FeedbackButton from '@/components/FeedbackButton'

// Optimized imports - reduce dynamic loading for better performance
import { StreakCounter } from './components/StreakCounter'
import { ConfettiCelebration } from './components/ConfettiCelebration'
import { AnswerOption } from './components/AnswerOption'

// Only lazy load the heavy components that are used conditionally
const EnhancedResultsScreen = dynamic(() => import('./components/EnhancedResultsScreen').then(mod => ({ default: mod.EnhancedResultsScreen })), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading results...</p>
      </div>
    </div>
  ),
  ssr: false
})


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
    enableLazyLoad,
  })

  // Local state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [wrongAttempts, setWrongAttempts] = useState<number>(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showReportToast, setShowReportToast] = useState(false)
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now())
  const [wrongOptions, setWrongOptions] = useState<Set<string>>(new Set())
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [wrongQuestionIds, setWrongQuestionIds] = useState<number[]>([])

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
  const [showConfetti, setShowConfetti] = useState(false)

  // Determine which MCQs to use (review or regular)
  const activeMCQs = reviewMode ? reviewMCQs : lazyLoadedMcqs
  const activeLoading = reviewMode ? reviewLoading : lazyLoading

  // Memoized values to prevent unnecessary recalculations
  const currentMCQ = useMemo(
    () => activeMCQs[currentIndex],
    [activeMCQs, currentIndex]
  )

  const progressPercentage = useMemo(
    () => ((currentIndex + 1) / activeMCQs.length) * 100,
    [currentIndex, activeMCQs.length]
  )

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

  // Wrap handler with useCallback to prevent unnecessary re-renders
  const handleReport = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!currentMCQ) return

      await supabase.from('question_reports').insert({
        question_id: currentMCQ.id,
        question_type: 'css',
        subject: currentMCQ.subject,
        user_id: user?.id || null
      })

      // Show toast notification
      setShowReportToast(true)
      setTimeout(() => setShowReportToast(false), 3000)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error reporting question:', error)
      }
      // Show toast even on error
      setShowReportToast(true)
      setTimeout(() => setShowReportToast(false), 3000)
    }
  }, [currentMCQ])

  const handleAnswer = (answer: string) => {
    // Lock answer after first selection
    if (selectedAnswer) return

    setSelectedAnswer(answer)
    const correct = answer === activeMCQs[currentIndex].correct_answer

    if (correct) {
      setIsCorrect(true)
      setAnswers([...answers, true])
      setScore(score + 1)
      setShowCorrectAnswer(true)

      // Gamification: Update streak
      const newStreak = streak + 1
      setStreak(newStreak)
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak)
      }

      // Gamification: Calculate and add points
      const earnedPoints = calculatePoints(true, newStreak, wrongAttempts)
      setPoints(points + earnedPoints)
      setRecentPoints(earnedPoints)
      setShowRecentPoints(true)
      setTimeout(() => setShowRecentPoints(false), 1500)

      // Gamification: Play correct sound (only if sounds enabled for this quiz type)
      if (soundsEnabled) {
        soundManager.play('correct')
      }

      // Gamification: Show encouragement
      if (newStreak > 0 && newStreak % 5 === 0) {
        // Milestone reached
        setEncouragementType('milestone')
        if (soundsEnabled) {
          soundManager.play('streakMilestone')
        }
      } else {
        setEncouragementType('correct')
      }
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 2000)
    } else {
      // Wrong answer - track it and show correct answer
      setWrongOptions(prev => new Set(prev).add(answer))
      setShowCorrectAnswer(true) // Show correct answer when wrong one is clicked
      setWrongAttempts(prev => prev + 1)
      setAnswers([...answers, false])

      // Track wrong question ID for review (only in normal mode, not review mode)
      if (!reviewMode) {
        setWrongQuestionIds(prev => [...prev, activeMCQs[currentIndex].id])
      }

      // Gamification: Reset streak
      setStreak(0)

      // Gamification: Play incorrect sound (only if sounds enabled for this quiz type)
      if (soundsEnabled) {
        soundManager.play('incorrect')
      }

      // Gamification: Show encouragement
      setEncouragementType('incorrect')
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 2000)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < activeMCQs.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setSelectedAnswer(null)
      setWrongAttempts(0)
      setIsCorrect(false)
      setWrongOptions(new Set())
      setShowCorrectAnswer(false)

      // Smart trigger: Check if we need to load next batch (only in non-review mode)
      if (enableLazyLoad && !reviewMode) {
        checkAndTriggerNextBatch(nextIndex)
      }
    } else {
      // Quiz complete! Stop other sounds first, then play completion sound
      if (soundsEnabled) {
        soundManager.stopAll()
        // Small delay to ensure clean audio transition
        setTimeout(() => {
          soundManager.play('quizComplete')
        }, 100)
      }

      const finalScore = score + (isCorrect ? 1 : 0)
      const completionSubject = subject || 'General'

      // Calculate actual time taken
      const timeInSeconds = Math.floor((Date.now() - quizStartTime) / 1000)

      // Track quiz completion (Google Analytics)
      analytics.trackQuizComplete(reviewMode ? 'css-mcq-review' : 'css-mcq', finalScore, activeMCQs.length, completionSubject)

      // Save quiz results to Supabase for analytics dashboard (only for non-review mode)
      if (!reviewMode) {
        saveQuizResults({
          quizType: 'subject',
          subject: completionSubject,
          totalQuestions: activeMCQs.length,
          correctAnswers: finalScore,
          wrongAnswers: activeMCQs.length - finalScore,
          skippedAnswers: 0,
          timeInSeconds
        }).then(response => {
          if (response && process.env.NODE_ENV === 'development') {
            console.log('✅ Quiz saved to analytics!', {
              score: `${finalScore}/${activeMCQs.length}`,
              time: `${Math.floor(timeInSeconds / 60)}m ${timeInSeconds % 60}s`,
              streak: `${response.streak} days 🔥`,
              subject: completionSubject
            })

            // Optionally show streak notification
            if (response.streak > 0) {
              console.log(`🔥 Current streak: ${response.streak} days!`)
            }
          }
        }).catch(error => {
          if (process.env.NODE_ENV === 'development') {
            console.error('❌ Error saving quiz to analytics:', error)
          }
        })
      }

      setShowResult(true)
    }
  }

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setSelectedAnswer(null)
      setWrongAttempts(0)
      setIsCorrect(false)
      setWrongOptions(new Set())
      setShowCorrectAnswer(false)
    }
  }

  const practiceMistakes = () => {
    // Store wrong question IDs in session storage
    sessionStorage.setItem('practiceWrongQuestions', JSON.stringify(wrongQuestionIds))

    // Store original score for comparison
    sessionStorage.setItem('originalQuizScore', JSON.stringify({
      correct: score,
      total: activeMCQs.length
    }))

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
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setWrongAttempts(0)
    setIsCorrect(false)
    setQuizStartTime(Date.now()) // Reset start time
    // Reset gamification
    setStreak(0)
    setMaxStreak(0)
    setPoints(0)
    setRecentPoints(0)
    setShowRecentPoints(false)
    // For lazy loading, reload page to start fresh
    router.refresh()
  }

  if (activeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{reviewMode ? 'Loading practice questions...' : 'Loading questions...'}</p>
        </div>
      </div>
    )
  }

  if (lazyError && !reviewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-xl text-gray-700 mb-4">Error: {lazyError}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (activeMCQs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-xl text-gray-700 mb-4">No MCQs found for your selection</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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
          intensity={score / activeMCQs.length >= 0.8 ? 'high' : 'medium'}
        />
        <EnhancedResultsScreen
          score={score}
          total={activeMCQs.length}
          maxStreak={maxStreak}
          totalPoints={points}
          wrongQuestionIds={wrongQuestionIds}
          onRestart={restartQuiz}
          onPracticeMistakes={practiceMistakes}
          onExit={() => router.back()}
          reviewMode={reviewMode}
          originalScore={originalScore}
        />
      </>
    )
  }

  return (
    <>
      <DevToolsWarning />
      <ConfettiCelebration trigger={showConfetti} intensity="medium" />
      <EncouragementMessage
        type={encouragementType}
        show={showEncouragement}
      />
      <ProtectedContent>
        <UltraProtectedContent>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-2 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto">
        {/* Modern Dark Header - Mobile Responsive */}
        <div className="bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 rounded-xl sm:rounded-2xl shadow-2xl p-2 sm:p-3 mb-2 sm:mb-3 border border-purple-500/30">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/10 active:bg-white/20 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm font-semibold text-white shadow-lg border border-white/20"
            >
              <span>←</span>
              <span className="hidden sm:inline">Exit</span>
            </button>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Question Counter - Shows total or dynamic count if lazy loading */}
              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20">
                <span className="text-xs font-medium text-purple-300">Q</span>
                <span className="text-sm sm:text-base font-bold text-white">{currentIndex + 1}</span>
                <span className="text-purple-300">/</span>
                <span className="text-sm sm:text-base text-purple-200">
                  {reviewMode ? activeMCQs.length : (totalCount ?? activeMCQs.length)}
                </span>
                {/* Show loading indicator if next batch is being fetched */}
                {isLoadingNextBatch && !reviewMode && (
                  <span className="ml-2 text-xs text-purple-300 animate-pulse">
                    Loading...
                  </span>
                )}
              </div>
              
              <div className="hidden sm:block">
                <StreakCounter streak={streak} maxStreak={maxStreak} />
              </div>
              
              <PointsDisplay
                points={points}
                recentPoints={recentPoints}
                showRecent={showRecentPoints}
              />
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <SoundToggle />
            </div>
          </div>

          {/* Streak on mobile - below header */}
          <div className="sm:hidden mt-2 flex justify-center">
            <StreakCounter streak={streak} maxStreak={maxStreak} />
          </div>

          {/* Modern Progress Bar */}
          <div className="mt-2 sm:mt-3">
            <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2 shadow-inner border border-white/10">
              <div
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 h-1.5 sm:h-2 rounded-full shadow-lg transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / activeMCQs.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card - Mobile Responsive */}
        <div
          key={currentIndex}
          className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-3.5 mb-2 sm:mb-2.5 border-2 border-gray-100 active:border-purple-200 transition-colors"
        >
            {/* Topic & Report */}
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              {currentMCQ.topic ? (
                <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                  <span className="text-xs sm:text-sm">🏷️</span>
                  <span className="text-xs sm:text-sm">
                    {currentMCQ.topic
                      .replace(/_/g, ' ')
                      .split(' ')
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(' ')}
                  </span>
                </span>
              ) : (
                <div />
              )}

              {/* Report Button */}
              <button
                onClick={handleReport}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-50 text-red-600 active:bg-red-100 rounded-full text-xs font-semibold transition-colors border border-red-200"
                title="Report an issue"
              >
                <Flag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Report</span>
                <span className="sm:hidden">⚠️</span>
              </button>
            </div>

            {/* Question */}
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-2.5 leading-normal">
              {currentMCQ.question_text}
            </h3>

          {/* Options */}
          <div className="space-y-1.5">
            {options.map((option) => {
              const isSelected = selectedAnswer === option.label
              const isOptionCorrect = option.label === currentMCQ.correct_answer
              const isWrongOption = wrongOptions.has(option.label)
              const optionExplanation = currentMCQ[
                `explanation_${option.label.toLowerCase()}` as keyof MCQ
              ] as string | undefined

              return (
                <AnswerOption
                  key={option.label}
                  label={option.label}
                  text={option.text}
                  isSelected={isSelected}
                  isCorrect={isOptionCorrect}
                  isRevealed={isCorrect}
                  isWrong={isWrongOption}
                  showCorrectAnswer={showCorrectAnswer}
                  onSelect={() => handleAnswer(option.label)}
                  disabled={!!selectedAnswer}
                  explanation={optionExplanation}
                />
              )
            })}
          </div>
        </div>

        {/* Navigation - Compact Professional Style like MPT Mock */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t-2 border-gray-100 mb-3">
          <button
            onClick={previousQuestion}
            disabled={currentIndex === 0}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm text-sm sm:text-base font-semibold"
          >
            ← Previous
          </button>

          <span className="text-sm sm:text-base text-gray-600 font-semibold px-2 sm:px-3">
            {currentIndex + 1} / {activeMCQs.length}
          </span>

          {isLastQuestion ? (
            <button
              onClick={nextQuestion}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 active:from-green-700 active:to-emerald-800 transition-all shadow-lg hover:shadow-xl font-bold text-sm sm:text-base"
            >
              Finish Test ✓
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base font-semibold"
            >
              Next →
            </button>
          )}
        </div>

          </div>
        </div>
        </UltraProtectedContent>
      </ProtectedContent>

      {/* Feedback Button - Pops out from side after 2 minutes */}
      <FeedbackButton page="css-practice-quiz" />

      {/* Report Toast Notification - Top Center */}
      {showReportToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/20">
            <div className="text-2xl animate-pulse">
              ✓
            </div>
            <div>
              <div className="font-bold text-lg">Question Flagged!</div>
              <div className="text-sm text-white/90">Thanks for helping us improve</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function CSSQuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    }>
      <CSSQuizContent />
    </Suspense>
  )
}
