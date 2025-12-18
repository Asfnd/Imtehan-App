'use client'

import { useEffect, useState } from 'react'
import { Trophy, Clock, Target, Zap, RotateCcw, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Question, Answer, QuizResult } from '@/lib/supabase/types'

interface ResultsScreenProps {
  questions: Question[]
  answers: Answer[]
  result: QuizResult
  onRetake: () => void
  onHome: () => void
}

// CSS-based celebration component
const CelebrationEffect = ({ show, isPerfect }: { show: boolean; isPerfect: boolean }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {/* Confetti particles */}
      {Array.from({ length: isPerfect ? 40 : 25 }).map((_, i) => (
        <div
          key={`confetti-${i}`}
          className="absolute animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div
            className={`w-3 h-3 ${Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm'}`}
            style={{
              backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#fbbf24'][
                Math.floor(Math.random() * 4)
              ],
            }}
          />
        </div>
      ))}
      
      {/* Floating emojis for perfect score */}
      {isPerfect && Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`emoji-${i}`}
          className="absolute text-3xl animate-emoji-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1}s`,
          }}
        >
          {['🎉', '🏆', '⭐', '✨', '🌟'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  )
}

export default function ResultsScreen({
  questions,
  answers,
  result,
  onRetake,
  onHome,
}: ResultsScreenProps) {
  const [showCelebration, setShowCelebration] = useState(false)

  const accuracy = Math.round((result.score / result.total_questions) * 100)
  const isHighScore = accuracy >= 70
  const isPerfectScore = accuracy === 100

  useEffect(() => {
    if (isHighScore) {
      setShowCelebration(true)
      // Hide celebration after duration
      const duration = isPerfectScore ? 5000 : 3000
      setTimeout(() => setShowCelebration(false), duration)
    }
  }, [isHighScore, isPerfectScore])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      <CelebrationEffect show={showCelebration} isPerfect={isPerfectScore} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4 animate-bounce">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
              isHighScore
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                : 'bg-gradient-to-br from-blue-400 to-purple-500'
            }`}>
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2">
            {isPerfectScore 
              ? '🎉 PERFECT SCORE! 🎉' 
              : isHighScore 
                ? '✨ Excellent Work! ✨' 
                : '📚 Quiz Complete!'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isPerfectScore
              ? '🏆 Absolutely flawless! You\'re a true master! 🌟'
              : isHighScore
                ? '🚀 You crushed it! Keep up the great work! 💪'
                : '📖 Good effort! Review the explanations to improve. 💡'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-stagger">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-3xl font-bold mb-1">{accuracy}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-3xl font-bold mb-1">
              {result.score}/{result.total_questions}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-3xl font-bold mb-1">
              {formatTime(result.time_taken)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-3xl font-bold mb-1">+{result.xp_earned}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">XP Earned</div>
          </div>
        </div>

        {/* Level Up Banner */}
        {result.level_up && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-8 text-white text-center shadow-lg animate-scale-in">
            <h2 className="text-2xl font-bold mb-2">🎉 Level Up!</h2>
            <p className="text-lg">
              You've reached Level {result.new_level}!
            </p>
          </div>
        )}

        {/* Question Review */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold mb-6">Review Your Answers</h2>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const answer = answers[index]
              const isCorrect = answer?.is_correct

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-xl border-2 ${
                    isCorrect
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question_text}</p>
                      <div className="text-sm space-y-1">
                        {answer?.selected_answer && (
                          <p>
                            <span className="text-gray-600 dark:text-gray-400">
                              Your answer:
                            </span>{' '}
                            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {answer.selected_answer}
                            </span>
                          </p>
                        )}
                        {!isCorrect && (
                          <p>
                            <span className="text-gray-600 dark:text-gray-400">
                              Correct answer:
                            </span>{' '}
                            <span className="text-green-600">
                              {question.correct_answer}
                            </span>
                          </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRetake}
            size="lg"
            variant="outline"
            className="min-w-[200px]"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Another Quiz
          </Button>
          <Button
            onClick={() => {
              // Force dashboard refresh by adding a timestamp
              window.location.href = '/dashboard?refresh=' + Date.now()
            }}
            size="lg"
            className="min-w-[200px]"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}
