'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ArrowLeft, Check, X, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ProtectedContent from '@/components/security/ProtectedContent'
import UltraProtectedContent from '@/components/security/UltraProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'

// Lazy load heavy components for better performance
const QuizTimer = dynamic(() => Promise.resolve(() => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-bold">
    <Clock className="w-4 h-4" />
    <span id="timer-display">Loading...</span>
  </div>
)), {
  loading: () => (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
      <div className="w-4 h-4 bg-gray-300 animate-pulse rounded"></div>
      <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
    </div>
  ),
  ssr: false
})

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
  
  const [mcqs, setMcqs] = useState<MCQ[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(200 * 60) // 200 minutes in seconds
  const [timerActive, setTimerActive] = useState(false)
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({}) // Track which questions show feedback

  useEffect(() => {
    const supabase = createClient()
    if (testNumber) {
      loadTest()
    }
  }, [testNumber])

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

  // Start timer when test loads
  useEffect(() => {
    if (mcqs.length > 0 && !loading) {
      setTimerActive(true)
    }
  }, [mcqs, loading])

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
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: answer
    })
    // Enable feedback for this question
    setShowFeedback({
      ...showFeedback,
      [currentIndex]: true
    })
  }

  const goToNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const finishTest = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    mcqs.forEach((mcq, index) => {
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
    if (percentLeft > 50) return 'text-green-600 bg-green-50 border-green-200'
    if (percentLeft > 20) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    )
  }

  if (mcqs.length === 0) {
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

  const currentMCQ = mcqs[currentIndex]
  const progress = ((currentIndex + 1) / mcqs.length) * 100
  const answeredCount = Object.keys(selectedAnswers).length

  if (showResults) {
    const score = calculateScore()
    const percentage = (score / mcqs.length) * 100
    const timeTaken = (200 * 60) - timeLeft
    const timeExpired = timeLeft === 0

    return (
      <UltraProtectedContent>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-3 sm:px-4 py-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl text-center max-w-2xl w-full animate-scale-in">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 animate-bounce">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              {timeExpired ? 'Time Up!' : 'Test Complete!'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">MPT Mock Test {testNumber}</p>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 sm:p-6 text-white mb-4 sm:mb-6 animate-slide-up">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {score}/{mcqs.length}
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
                  {mcqs.length - score}
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

  return (
    <UltraProtectedContent>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        <div className="flex-1 flex flex-col px-3 sm:px-4 py-3 sm:py-4 max-w-4xl mx-auto w-full">
          {/* Compact Header */}
          <div className="mb-3 flex-shrink-0">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Back
              </button>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-gray-600">
                  {answeredCount}/{mcqs.length}
                </span>
                {/* Timer */}
                <div
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border-2 font-mono font-bold transition-all text-xs sm:text-sm ${getTimerColor()}`}
                >
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card - Scrollable content */}
          <div className="flex-1 overflow-y-auto mb-3 min-h-0 overscroll-contain">
            <div
              key={currentIndex}
              className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg animate-slide-left"
            >
                <div className="mb-3 sm:mb-4">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    Question {currentMCQ.question_number}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-4 sm:mb-5 leading-relaxed">
                  {currentMCQ.question_text}
                </h3>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                  {['A', 'B', 'C', 'D'].map((option) => {
                    const optionText = currentMCQ[
                      `option_${option.toLowerCase()}` as keyof MCQ
                    ] as string
                    const isSelected = selectedAnswers[currentIndex] === option
                    const isCorrect = option === currentMCQ.correct_answer
                    const shouldShowFeedback = showFeedback[currentIndex]
                    const showAsCorrect = shouldShowFeedback && isCorrect
                    const showAsWrong = shouldShowFeedback && isSelected && !isCorrect

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
                          showAsCorrect
                            ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md'
                            : showAsWrong
                            ? 'border-red-500 bg-gradient-to-r from-red-50 to-rose-50 shadow-md animate-shake'
                            : isSelected
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 active:border-blue-300 active:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span
                            className={`flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold transition-all text-sm sm:text-base ${
                              showAsCorrect
                                ? 'bg-green-500 text-white shadow-lg'
                                : showAsWrong
                                ? 'bg-red-500 text-white shadow-lg'
                                : isSelected
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {option}
                          </span>
                          <span className={`flex-1 text-xs sm:text-sm md:text-base leading-relaxed pt-0.5 sm:pt-1 ${
                            showAsCorrect ? 'text-green-900 font-semibold' :
                            showAsWrong ? 'text-red-900' :
                            'text-gray-700'
                          }`}>
                            {optionText}
                          </span>
                          {/* Check/X icons */}
                          {showAsCorrect && (
                            <span className="flex-shrink-0">
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" strokeWidth={3} />
                              </div>
                            </span>
                          )}
                          {showAsWrong && (
                            <span className="flex-shrink-0">
                              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                <X className="w-4 h-4 text-white" strokeWidth={3} />
                              </div>
                            </span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Navigation - Inside card, right after options */}
                <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-gray-100">
                  <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm text-sm sm:text-base font-semibold hover-scale-sm"
                  >
                    ← Previous
                  </button>

                  <span className="text-sm sm:text-base text-gray-600 font-semibold px-3">
                    {currentIndex + 1} / {mcqs.length}
                  </span>

                  {currentIndex === mcqs.length - 1 ? (
                    <button
                      onClick={finishTest}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 active:from-green-700 active:to-emerald-800 transition-all shadow-lg hover:shadow-xl font-bold text-sm sm:text-base hover-scale-sm"
                    >
                      Finish Test ✓
                    </button>
                  ) : (
                    <button
                      onClick={goToNext}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base font-semibold hover-scale-sm"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
          </div>
        </div>
      </div>
    </UltraProtectedContent>
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
