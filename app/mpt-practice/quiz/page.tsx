'use client'

import { useEffect, useState, useRef, Suspense, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Clock, Flag } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ProtectedContent from '@/components/security/ProtectedContent'
import UltraProtectedContent from '@/components/security/UltraProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import { saveQuizResults } from '@/lib/analytics'
import FeedbackPopup from '@/components/FeedbackPopup'

interface MCQ {
  id: number
  test_number: number
  question_number: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
}

function MPTQuizContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const testNumber = searchParams.get('test')
  const startTimeRef = useRef<number>(Date.now())
  
  const [mcqs, setMcqs] = useState<MCQ[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(200 * 60) // 200 minutes in seconds
  const [timerActive, setTimerActive] = useState(false)
  const [wrongQuestionIds, setWrongQuestionIds] = useState<number[]>([]) // Track wrong questions for review
  const [showReportToast, setShowReportToast] = useState(false)

  // Review mode state
  const reviewMode = searchParams.get('reviewMode') === 'true'
  const [reviewMCQs, setReviewMCQs] = useState<MCQ[]>([])
  const [reviewLoading, setReviewLoading] = useState(false)
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)

  // Determine which MCQs to use (review or regular)
  const activeMCQs = reviewMode ? reviewMCQs : mcqs
  const activeLoading = reviewMode ? reviewLoading : loading

  useEffect(() => {
    const supabase = createClient()
    if (testNumber && !reviewMode) {
      loadTest()
    }
  }, [testNumber, reviewMode])

  // Load review mode MCQs if in review mode
  useEffect(() => {
    if (reviewMode) {
      const loadReviewMCQs = async () => {
        try {
          setReviewLoading(true)

          // Get wrong question IDs from session storage
          const storedIds = sessionStorage.getItem('mptPracticeWrongQuestions')
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

          // Get original score from session storage
          const storedScore = sessionStorage.getItem('mptOriginalQuizScore')
          if (storedScore) {
            setOriginalScore(JSON.parse(storedScore))
          }

          // Fetch MCQs by IDs
          const supabase = createClient()
          const { data, error } = await supabase
            .from('mpt_mcqs')
            .select('*')
            .in('id', questionIds)
            .order('question_number')

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

          setReviewMCQs(data as MCQ[])

          // Reset all quiz state
          setCurrentIndex(0)
          setSelectedAnswers({})
          setShowResults(false)
          setWrongQuestionIds([])
          setTimeLeft(200 * 60) // Reset timer for review
          setTimerActive(false) // Don't auto-start timer in review mode

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

  // Timer effect
  useEffect(() => {
    if (!timerActive || showResults || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResults(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerActive, showResults, timeLeft])

  // Start timer when test loads (not in review mode)
  useEffect(() => {
    if (activeMCQs.length > 0 && !activeLoading && !reviewMode) {
      setTimerActive(true)
    }
  }, [activeMCQs, activeLoading, reviewMode])

  // Trigger feedback popup every 7th quiz
  useEffect(() => {
    if (!showResults || reviewMode) return
    try {
      if (typeof window !== 'undefined') {
        const count = parseInt(localStorage.getItem('quiz_complete_count') || '0', 10) + 1
        localStorage.setItem('quiz_complete_count', String(count))
        if (count % 7 === 0) {
          const t = setTimeout(() => setShowFeedback(true), 1500)
          return () => clearTimeout(t)
        }
      }
    } catch { /* private browsing — skip */ }
  }, [showResults, reviewMode])

  const loadTest = async () => {
    try {
      const supabase = createClient()
      // Select only required columns to reduce egress
      const { data, error } = await supabase
        .from('mpt_mcqs')
        .select('id, test_number, question_number, question_text, option_a, option_b, option_c, option_d, correct_answer')
        .eq('test_number', parseInt(testNumber!))
        .order('question_number')

      if (error) throw error

      setMcqs(data || [])
    } catch (error) {
      console.error('Error loading test:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (answer: string) => {
    // Lock answer after first selection for this question
    if (selectedAnswers[currentIndex]) return

    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: answer
    })

    // Track wrong answers (only in normal mode, not review mode)
    if (!reviewMode) {
      const isCorrect = answer === activeMCQs[currentIndex].correct_answer
      if (!isCorrect) {
        setWrongQuestionIds(prev => [...prev, activeMCQs[currentIndex].id])
      }
    }
  }

  const goToNext = () => {
    if (currentIndex < activeMCQs.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const practiceMistakes = () => {
    // Include wrong answers + unanswered questions
    const unansweredIds = activeMCQs
      .filter((_, idx) => !selectedAnswers[idx])
      .map((mcq) => mcq.id)
    const allPracticeIds = [...new Set([...wrongQuestionIds, ...unansweredIds])]
    sessionStorage.setItem('mptPracticeWrongQuestions', JSON.stringify(allPracticeIds))

    // Store original score for comparison
    const score = calculateScore()
    sessionStorage.setItem('mptOriginalQuizScore', JSON.stringify({
      correct: score,
      total: activeMCQs.length
    }))

    // Navigate to quiz with review mode
    const params = new URLSearchParams()
    if (testNumber) params.append('test', testNumber)
    params.append('reviewMode', 'true')

    router.push(`/mpt-practice/quiz?${params.toString()}`)
  }

  const finishTest = async () => {
    const correct = calculateScore()
    const wrong   = activeMCQs.filter((_, i) => selectedAnswers[i] && selectedAnswers[i] !== activeMCQs[i].correct_answer).length
    const skipped = activeMCQs.filter((_, i) => !selectedAnswers[i]).length
    await saveQuizResults({
      examSlug: 'mpt',
      quizType: 'past-paper',
      subject: `MPT Test ${testNumber ?? ''}`.trim(),
      totalQuestions: activeMCQs.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      skippedAnswers: skipped,
      timeInSeconds: Math.round((Date.now() - startTimeRef.current) / 1000),
    })
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    activeMCQs.forEach((mcq, index) => {
      if (selectedAnswers[index] === mcq.correct_answer) {
        correct++
      }
    })
    return correct
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTimerColor = () => {
    const percentLeft = (timeLeft / (200 * 60)) * 100
    if (percentLeft > 50) return 'text-green-400'
    if (percentLeft > 20) return 'text-yellow-400'
    return 'text-red-400 animate-pulse'
  }

  const handleReport = useCallback(async () => {
    if (!activeMCQs[currentIndex]) return
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('question_reports').insert({
        question_id:   activeMCQs[currentIndex].id,
        question_type: 'mpt',
        subject:       'MPT',
        user_id:       user?.id || null,
      })
    } catch (_) { /* silent */ }
    setShowReportToast(true)
    setTimeout(() => setShowReportToast(false), 3000)
  }, [activeMCQs, currentIndex])

  if (activeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{reviewMode ? 'Loading practice questions...' : 'Loading test...'}</p>
        </div>
      </div>
    )
  }

  if (activeMCQs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Test not found</p>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const currentMCQ = activeMCQs[currentIndex]
  const progress = ((currentIndex + 1) / activeMCQs.length) * 100
  const answeredCount = Object.keys(selectedAnswers).length

  // Calculate improvement if in review mode
  const improvement = reviewMode && originalScore
    ? {
        originalPercentage: Math.round((originalScore.correct / originalScore.total) * 100),
        newPercentage: Math.round((calculateScore() / activeMCQs.length) * 100),
        improved: Math.round((calculateScore() / activeMCQs.length) * 100) > Math.round((originalScore.correct / originalScore.total) * 100),
        difference: Math.round((calculateScore() / activeMCQs.length) * 100) - Math.round((originalScore.correct / originalScore.total) * 100)
      }
    : null

  if (showResults) {
    const score = calculateScore()
    const percentage = (score / activeMCQs.length) * 100
    const timeTaken = (200 * 60) - timeLeft
    const timeExpired = timeLeft === 0
    const wrongCount = wrongQuestionIds.length + activeMCQs.filter((_, idx) => !selectedAnswers[idx]).length

    return (
      <UltraProtectedContent>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-3 sm:px-4 py-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl text-center max-w-2xl w-full animate-scale-in">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 animate-bounce">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              {timeExpired ? 'Time Up!' : reviewMode ? 'Practice Complete!' : 'Test Complete!'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {reviewMode ? 'Practice Session' : `MPT Mock Test ${testNumber}`}
            </p>

            {/* Improvement Comparison - Only in Review Mode */}
            {reviewMode && improvement && (
              <div className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200/50 animate-slide-up">
                <div className="text-center mb-3">
                  <div className="text-2xl mb-2">{improvement.improved ? '🎉' : '💪'}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {improvement.improved ? 'Great Improvement!' : 'Keep Practicing!'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {improvement.improved
                      ? `You improved by ${improvement.difference}%!`
                      : "You're getting better with each attempt"
                    }
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-500 font-semibold mb-1">Original</div>
                    <div className="text-2xl font-bold text-gray-700">{improvement.originalPercentage}%</div>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-500 font-semibold mb-1">Practice</div>
                    <div className="text-2xl font-bold text-green-700">{improvement.newPercentage}%</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 sm:p-6 text-white mb-4 sm:mb-6 animate-slide-up">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {score}/{activeMCQs.length}
              </div>
              <div className="text-base sm:text-lg md:text-xl">{percentage.toFixed(1)}% Correct</div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 animate-stagger">
              <div className="bg-green-50 rounded-lg p-2 sm:p-3 md:p-4 animate-slide-up">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">{score}</div>
                <div className="text-xs md:text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-red-50 rounded-lg p-2 sm:p-3 md:p-4 animate-slide-up">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
                  {activeMCQs.length - score}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2 sm:p-3 md:p-4 animate-slide-up">
                <div className="text-base sm:text-lg md:text-xl font-bold text-blue-600">
                  {formatTime(timeTaken)}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Time</div>
              </div>
            </div>

            {/* Practice Mistakes Button - Only if there are wrong questions and not in review mode */}
            {wrongCount > 0 && !reviewMode && (
              <div className="mb-6 animate-slide-up">
                <button
                  onClick={practiceMistakes}
                  className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>📚</span>
                  Practice {wrongCount} Incorrect {wrongCount === 1 ? 'Question' : 'Questions'}
                  <span>→</span>
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center animate-slide-up">
              <button
                onClick={() => router.back()}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm sm:text-base hover-scale-sm"
              >
                Back to Tests
              </button>
              <button
                onClick={() => {
                  setShowResults(false)
                  setCurrentIndex(0)
                  setSelectedAnswers({})
                  setTimeLeft(200 * 60)
                  setTimerActive(true)
                }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold shadow-md text-sm sm:text-base hover-scale-sm"
              >
                Retake Test
              </button>
            </div>
          </div>
        </div>
      </UltraProtectedContent>
    )
  }

  // Answer state helpers (same design as CSS quiz)
  const getOptionState = (option: string) => {
    const ua = selectedAnswers[currentIndex]
    if (!ua) return 'default'
    if (option === currentMCQ.correct_answer) return 'correct'
    if (option === ua) return 'wrong'
    return 'dimmed'
  }
  const OPTION_STYLES: Record<string, string> = {
    default: 'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer',
    correct: 'border-green-500 bg-green-50 cursor-default',
    wrong:   'border-red-500 bg-red-50 cursor-default',
    dimmed:  'border-gray-200 bg-gray-50 opacity-50 cursor-default',
  }
  const BADGE_STYLES: Record<string, string> = {
    default: 'bg-gray-100 text-gray-600',
    correct: 'bg-green-500 text-white',
    wrong:   'bg-red-500 text-white',
    dimmed:  'bg-gray-100 text-gray-400',
  }

  return (
    <>
      <UltraProtectedContent>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-2 px-2 sm:px-4">
          <div className="max-w-3xl mx-auto">

            {/* Dark Blue Header */}
            <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 rounded-xl sm:rounded-2xl shadow-2xl p-2 sm:p-3 mb-2 sm:mb-3 border border-blue-500/30">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/10 active:bg-white/20 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm font-semibold text-white shadow-lg border border-white/20"
                >
                  <span>←</span>
                  <span className="hidden sm:inline">Exit</span>
                </button>

                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20">
                  <span className="text-xs font-medium text-blue-300">Q</span>
                  <span className="text-sm sm:text-base font-bold text-white">{currentIndex + 1}</span>
                  <span className="text-blue-300">/</span>
                  <span className="text-sm sm:text-base text-blue-200">{activeMCQs.length}</span>
                </div>

                {!reviewMode ? (
                  <div className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-lg sm:rounded-xl border border-white/20 font-mono font-bold text-xs sm:text-sm ${getTimerColor()}`}>
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                ) : (
                  <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-lg sm:rounded-xl border border-white/20 text-xs text-blue-200">
                    {answeredCount} answered
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-2 sm:mt-3">
                <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2 shadow-inner border border-white/10">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 sm:h-2 rounded-full shadow-lg transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div
              key={currentIndex}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 mb-2 sm:mb-3 border-2 border-gray-100"
            >
              {/* Q label + Report */}
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full border border-blue-200">
                  Question {currentMCQ.question_number}
                </span>
                <button
                  onClick={handleReport}
                  className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-50 text-red-600 active:bg-red-100 rounded-full text-xs font-semibold transition-colors border border-red-200"
                  title="Report an issue"
                >
                  <Flag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Report</span>
                  <span className="sm:hidden">⚠️</span>
                </button>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 leading-relaxed">
                {currentMCQ.question_text}
              </h3>

              <div className="space-y-2">
                {(['A', 'B', 'C', 'D'] as const).map((option) => {
                  const optionText = currentMCQ[`option_${option.toLowerCase()}` as keyof MCQ] as string
                  const state = getOptionState(option)
                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      disabled={!!selectedAnswers[currentIndex]}
                      className={`w-full text-left p-3 sm:p-3.5 rounded-xl border-2 transition-all duration-150 ${OPTION_STYLES[state]}`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${BADGE_STYLES[state]}`}>
                          {option}
                        </span>
                        <span className="flex-1 text-xs sm:text-sm leading-relaxed pt-0.5 sm:pt-1 text-gray-700">
                          {optionText}
                        </span>
                        {state === 'correct' && <span className="text-green-500 text-base flex-shrink-0 mt-0.5">✓</span>}
                        {state === 'wrong'   && <span className="text-red-500 text-base flex-shrink-0 mt-0.5">✗</span>}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-1 sm:pt-2 mb-3">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm text-sm sm:text-base font-semibold"
              >
                ← Previous
              </button>

              <span className="text-sm sm:text-base text-gray-600 font-semibold px-2 sm:px-3">
                {currentIndex + 1} / {activeMCQs.length}
              </span>

              {currentIndex === activeMCQs.length - 1 ? (
                <button
                  onClick={finishTest}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg font-bold text-sm sm:text-base"
                >
                  {reviewMode ? 'Finish Practice ✓' : 'Finish Test ✓'}
                </button>
              ) : (
                <button
                  onClick={goToNext}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg text-sm sm:text-base font-semibold"
                >
                  Next →
                </button>
              )}
            </div>

          </div>
        </div>
      </UltraProtectedContent>

      {/* Report Toast */}
      {showReportToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/20">
            <span className="text-xl">✓</span>
            <div>
              <div className="font-bold">Question Flagged!</div>
              <div className="text-xs text-white/90">Thanks for helping us improve</div>
            </div>
          </div>
        </div>
      )}
      <FeedbackPopup
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        examSlug="mpt"
        quizType="mock"
        scorePct={Math.round((calculateScore() / activeMCQs.length) * 100)}
      />
    </>
  )
}

export default function MPTQuizPage() {
  return (
    <>
      <DevToolsWarning />
      <ProtectedContent>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
        }>
          <MPTQuizContent />
        </Suspense>
      </ProtectedContent>
    </>
  )
}
