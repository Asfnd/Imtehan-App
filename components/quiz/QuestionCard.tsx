'use client'

import { Check, X } from 'lucide-react'
import type { Question } from '@/lib/supabase/types'
import { useAnimation, useHoverAnimation, useTransition } from '@/lib/hooks/useAnimation'

interface QuestionCardProps {
  question: Question
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
  showResult: boolean
  questionNumber: number
  totalQuestions: number
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  showResult,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.correct_answer
  const slideAnimation = useAnimation('slideLeft')
  const transitionClass = useTransition('all')

  return (
    <div className={`w-full max-w-3xl mx-auto ${slideAnimation}`}>
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-blue-500 to-purple-500 ${transitionClass}`}
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-6">{question.question_text}</h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option
            const isCorrectOption = option === question.correct_answer
            const showCorrect = showResult && isCorrectOption
            const showIncorrect = showResult && isSelected && !isCorrect

            return (
              <button
                key={index}
                onClick={() => !showResult && onSelectAnswer(option)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                  !showResult ? 'hover-scale-sm active:scale-95' : ''
                } ${
                  showCorrect
                    ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300'
                    : showIncorrect
                    ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300'
                    : isSelected
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && (
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                  )}
                  {showIncorrect && (
                    <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Explanation (shown after answer) */}
      {showResult && (
        <div
          className={`rounded-2xl p-6 animate-slide-up ${
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            ) : (
              <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-3">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h3>
              <div className="text-gray-700 dark:text-gray-300 space-y-2">
                {(() => {
                  const explanation = question.explanation || ''
                  
                  // Split by various delimiters: bullet points, newlines, numbered lists
                  let points = explanation
                    .split(/[•\n]|(?:\d+\.)|(?:-\s)/)
                    .map(point => point.trim())
                    .filter(point => point.length > 10) // Filter out very short fragments
                  
                  // If no clear structure, split by sentences
                  if (points.length <= 1) {
                    points = explanation
                      .split(/(?<=[.!?])\s+/)
                      .map(point => point.trim())
                      .filter(point => point.length > 10)
                  }
                  
                  // If still just one point, display as is
                  if (points.length <= 1) {
                    return <p>{explanation}</p>
                  }
                  
                  return points.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5 font-bold flex-shrink-0">•</span>
                      <span className="flex-1">{point}</span>
                    </div>
                  ))
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
