'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, X, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ProtectedContent from '@/components/security/ProtectedContent'
import UltraProtectedContent from '@/components/security/UltraProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'

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
      const { data, error } = await supabase
        .from('mpt_mcqs')
        .select('*')
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
        <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-center max-w-2xl w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-6xl mb-4"
            >
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {timeExpired ? 'Time Up!' : 'Test Complete!'}
            </h2>
            <p className="text-gray-600 mb-6">MPT Mock Test {testNumber}</p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-6"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {score}/{mcqs.length}
              </div>
              <div className="text-lg md:text-xl">{percentage.toFixed(1)}% Correct</div>
            </motion.div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-green-50 rounded-lg p-3 md:p-4"
              >
                <div className="text-xl md:text-2xl font-bold text-green-600">{score}</div>
                <div className="text-xs md:text-sm text-gray-600">Correct</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-red-50 rounded-lg p-3 md:p-4"
              >
                <div className="text-xl md:text-2xl font-bold text-red-600">
                  {mcqs.length - score}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Incorrect</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-50 rounded-lg p-3 md:p-4"
              >
                <div className="text-xl md:text-2xl font-bold text-blue-600">
                  {formatTime(timeTaken)}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Time Taken</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <motion.button
                onClick={() => router.push('/mpt-practice')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Back to Tests
              </motion.button>
              <motion.button
                onClick={() => {
                  setShowResults(false)
                  setCurrentIndex(0)
                  setSelectedAnswers({})
                  setTimeLeft(200 * 60)
                  setTimerActive(true)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold shadow-md"
              >
                Retake Test
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </UltraProtectedContent>
    )
  }

  return (
    <UltraProtectedContent>
      <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        <div className="flex-1 flex flex-col px-4 py-4 max-w-4xl mx-auto w-full">
          {/* Compact Header */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600">
                  {answeredCount}/{mcqs.length}
                </span>
                {/* Timer */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 font-mono font-bold transition-all text-sm ${getTimerColor()}`}
                >
                  <Clock className="w-4 h-4" />
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
          <div className="flex-1 overflow-y-auto mb-3 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-5 md:p-6 shadow-lg"
              >
                <div className="mb-4">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                    Question {currentMCQ.question_number}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-5 leading-relaxed">
                  {currentMCQ.question_text}
                </h3>

                <div className="space-y-3">
                  {['A', 'B', 'C', 'D'].map((option) => {
                    const optionText = currentMCQ[
                      `option_${option.toLowerCase()}` as keyof MCQ
                    ] as string
                    const isSelected = selectedAnswers[currentIndex] === option

                    return (
                      <motion.button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold transition-all ${
                              isSelected
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {option}
                          </span>
                          <span className="text-gray-700 flex-1 text-sm md:text-base leading-relaxed pt-1">
                            {optionText}
                          </span>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation - Fixed at bottom */}
          <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100">
            <motion.button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              whileHover={{ scale: currentIndex === 0 ? 1 : 1.05 }}
              whileTap={{ scale: currentIndex === 0 ? 1 : 0.95 }}
              className="px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm text-sm font-semibold border border-gray-200"
            >
              ← Previous
            </motion.button>

            <span className="text-sm text-gray-600 font-semibold px-3">
              {currentIndex + 1} / {mcqs.length}
            </span>

            {currentIndex === mcqs.length - 1 ? (
              <motion.button
                onClick={finishTest}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md font-bold text-sm"
              >
                Finish Test ✓
              </motion.button>
            ) : (
              <motion.button
                onClick={goToNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md text-sm font-semibold"
              >
                Next →
              </motion.button>
            )}
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
