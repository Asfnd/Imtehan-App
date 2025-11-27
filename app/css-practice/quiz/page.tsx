'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lightbulb, BookOpen, Flag } from 'lucide-react'
import { usageTracker } from '@/lib/usageTracker'
import ProtectedContent from '@/components/security/ProtectedContent'
import UltraProtectedContent from '@/components/security/UltraProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import { soundManager } from '@/lib/sounds/soundManager'
import { calculatePoints } from '@/lib/gamification/pointsCalculator'
import { SoundToggle } from './components/SoundToggle'
import { StreakCounter } from './components/StreakCounter'
import { PointsDisplay } from './components/PointsDisplay'
import { ConfettiCelebration } from './components/ConfettiCelebration'
import { EncouragementMessage } from './components/EncouragementMessage'
import { EnhancedResultsScreen } from './components/EnhancedResultsScreen'
import { AnswerOption } from './components/AnswerOption'
import { ExplanationModal } from './components/ExplanationModal'
import { HintsModal } from './components/HintsModal'
import FeedbackButton from '@/components/FeedbackButton'
import { motion, AnimatePresence } from 'framer-motion'

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

  const [mcqs, setMcqs] = useState<MCQ[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [loading, setLoading] = useState(true)
  const [wrongAttempts, setWrongAttempts] = useState<number>(0)
  const [showExplanationModal, setShowExplanationModal] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHintsModal, setShowHintsModal] = useState(false)
  const [showReportToast, setShowReportToast] = useState(false)

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
  const [user, setUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  // Check auth status and listen for changes
  useEffect(() => {
    const supabase = createClient()
    
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        setAuthChecked(true)
        setAuthLoading(false)
      } catch (error) {
        console.error('Auth check error:', error)
        setUser(null)
        setAuthChecked(true)
        setAuthLoading(false)
      }
    }
    checkUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setAuthChecked(true)
        setAuthLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchMCQs = useCallback(async () => {
    try {
      const supabase = createClient()
      const subject = searchParams.get('subject')
      const year = searchParams.get('year')

      let query = supabase
        .from('css_mcqs_enhanced')
        .select('*')

      if (subject) query = query.eq('subject', subject)
      if (year) query = query.eq('year', parseInt(year))

      const { data, error } = await query.limit(20)

      if (error) throw error

      if (!data || data.length === 0) {
        setMcqs([])
        setLoading(false)
        return
      }

      const shuffled = data.sort(() => Math.random() - 0.5)
      setMcqs(shuffled)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching MCQs:', error)
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    // Wait for auth check to complete - don't do anything until we know auth status
    if (!authChecked || authLoading) {
      return
    }

    // Only check usage limits for anonymous users (not signed in)
    if (!user) {
      if (!usageTracker.canTakeCSSQuiz()) {
        // Redirect to Google sign in
        router.push('/api/auth/signin')
        return
      }
      // Increment usage for anonymous users only
      usageTracker.incrementCSSQuiz()
    }

    // Signed-in users have unlimited access - no limits
    fetchMCQs()
    // Preload sounds
    soundManager.preload().catch((error) => {
      console.warn('Failed to preload sounds:', error)
    })
  }, [fetchMCQs, user, authLoading, authChecked])

  const handleReport = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
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
      console.error('Error reporting question:', error)
      // Show toast even on error
      setShowReportToast(true)
      setTimeout(() => setShowReportToast(false), 3000)
    }
  }

  const handleAnswer = (answer: string) => {
    if (isCorrect) return // Already got it right

    setSelectedAnswer(answer)
    const correct = answer === mcqs[currentIndex].correct_answer
    
    if (correct) {
      setIsCorrect(true)
      setAnswers([...answers, true])
      setScore(score + 1)

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

      // Gamification: Play correct sound
      soundManager.play('correct')

      // Gamification: Show confetti
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 100)

      // Gamification: Show encouragement
      if (newStreak > 0 && newStreak % 5 === 0) {
        // Milestone reached
        setEncouragementType('milestone')
        soundManager.play('streakMilestone')
      } else {
        setEncouragementType('correct')
      }
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 2000)
    } else {
      // Wrong answer - increment attempts but don't lock
      setWrongAttempts(prev => prev + 1)

      // Gamification: Reset streak
      setStreak(0)

      // Gamification: Play incorrect sound
      soundManager.play('incorrect')

      // Gamification: Show encouragement
      setEncouragementType('incorrect')
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 2000)

      // Clear selection after a moment to allow retry
      setTimeout(() => setSelectedAnswer(null), 800)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setWrongAttempts(0)
      setShowExplanationModal(false)
      setIsCorrect(false)
      setShowHintsModal(false)
    } else {
      // Quiz complete!
      soundManager.play('quizComplete')
      
      setShowResult(true)
    }
  }

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setSelectedAnswer(null)
      setWrongAttempts(0)
      setShowExplanationModal(false)
      setIsCorrect(false)
      setShowHintsModal(false)
    }
  }

  const restartQuiz = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setWrongAttempts(0)
    setShowExplanationModal(false)
    setIsCorrect(false)
    setShowHintsModal(false)
    // Reset gamification
    setStreak(0)
    setMaxStreak(0)
    setPoints(0)
    setRecentPoints(0)
    setShowRecentPoints(false)
    fetchMCQs()
  }



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading questions...</p>
        </div>
      </div>
    )
  }

  if (mcqs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-xl text-gray-700 mb-4">No MCQs found for your selection</p>
          <button
            onClick={() => router.push('/css-practice')}
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
          intensity={score / mcqs.length >= 0.8 ? 'high' : 'medium'}
        />
        <EnhancedResultsScreen
          score={score}
          total={mcqs.length}
          maxStreak={maxStreak}
          totalPoints={points}
          onRestart={restartQuiz}
          onExit={() => router.push('/css-practice')}
        />
      </>
    )
  }

  const currentMCQ = mcqs[currentIndex]
  const options = [
    { label: 'A', text: currentMCQ.option_a },
    { label: 'B', text: currentMCQ.option_b },
    { label: 'C', text: currentMCQ.option_c },
    { label: 'D', text: currentMCQ.option_d },
  ]

  const hasHints = currentMCQ.hint_1 || currentMCQ.hint_2 || currentMCQ.hint_3
  const hints = [currentMCQ.hint_1, currentMCQ.hint_2, currentMCQ.hint_3].filter(
    Boolean
  ) as string[]

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
              onClick={() => router.push('/css-practice')}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/10 active:bg-white/20 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm font-semibold text-white shadow-lg border border-white/20"
            >
              <span>←</span>
              <span className="hidden sm:inline">Exit</span>
            </button>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Question Counter */}
              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20">
                <span className="text-xs font-medium text-purple-300">Q</span>
                <span className="text-sm sm:text-base font-bold text-white">{currentIndex + 1}</span>
                <span className="text-purple-300">/</span>
                <span className="text-sm sm:text-base text-purple-200">{mcqs.length}</span>
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
              
              <div className="h-6 w-px bg-white/20 hidden sm:block"></div>
              
              <button
                onClick={previousQuestion}
                disabled={currentIndex === 0}
                className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors ${
                  currentIndex === 0
                    ? 'text-gray-500 cursor-not-allowed bg-white/5'
                    : 'text-white active:text-purple-300 active:bg-white/10 bg-white/5 shadow-sm'
                }`}
              >
                <span className="text-base sm:text-lg font-bold">←</span>
              </button>
              <button
                onClick={nextQuestion}
                disabled={!isCorrect || currentIndex === mcqs.length - 1}
                className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors ${
                  !isCorrect || currentIndex === mcqs.length - 1
                    ? 'text-gray-500 cursor-not-allowed bg-white/5'
                    : 'text-white active:text-purple-300 active:bg-white/10 bg-white/5 shadow-sm'
                }`}
              >
                <span className="text-base sm:text-lg font-bold">→</span>
              </button>
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
                style={{ width: `${((currentIndex + 1) / mcqs.length) * 100}%` }}
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
                  onSelect={() => handleAnswer(option.label)}
                  disabled={isCorrect}
                  explanation={optionExplanation}
                />
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mb-3">
          {/* Hints Button - Left side */}
          {wrongAttempts > 0 && !isCorrect && hasHints && (
            <button
              onClick={() => setShowHintsModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-shadow"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Hint</span>
            </button>
          )}

          {/* Next Button - Takes remaining space */}
          {isCorrect && (
            <button
              onClick={nextQuestion}
              className="flex-1 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold transition-colors"
            >
              {currentIndex < mcqs.length - 1 ? 'Next Question →' : 'View Results 🎉'}
            </button>
          )}

          {/* Explanation Button - Right side, visible and readable */}
          {isCorrect && currentMCQ.explanation_detailed && (
            <button
              onClick={() => setShowExplanationModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-shadow"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explanation</span>
            </button>
          )}
        </div>

          </div>
        </div>
        </UltraProtectedContent>
      </ProtectedContent>
      
      {/* Modals - Rendered outside main container for proper z-index */}
      <HintsModal
        isOpen={showHintsModal}
        onClose={() => setShowHintsModal(false)}
        hints={hints}
      />

      <ExplanationModal
        isOpen={showExplanationModal}
        onClose={() => setShowExplanationModal(false)}
        explanation={currentMCQ.explanation_detailed || ''}
      />
      
      {/* Feedback Button - Pops out from side after 2 minutes */}
      <FeedbackButton page="css-practice-quiz" />

      {/* Report Toast Notification - Top Center */}
      <AnimatePresence>
        {showReportToast && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/20">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-2xl"
              >
                ✓
              </motion.div>
              <div>
                <div className="font-bold text-lg">Question Flagged!</div>
                <div className="text-sm text-white/90">Thanks for helping us improve</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
