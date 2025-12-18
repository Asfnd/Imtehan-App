'use client'

import { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard'
import { useAnimation } from '@/lib/hooks/useAnimation'
import Timer from './Timer'
import { Button } from '@/components/ui/Button'
import type { Question, Answer } from '@/lib/supabase/types'

interface QuizArenaProps {
  questions: Question[]
  onComplete: (answers: Answer[], timeTaken: number) => void
  onExit: () => void
}

export default function QuizArena({ questions, onComplete, onExit }: QuizArenaProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [startTime] = useState(Date.now())
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [totalXP, setTotalXP] = useState(0)
  const [showXPAnimation, setShowXPAnimation] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return

    setSelectedAnswer(answer)
    setShowResult(true)

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
    const isCorrect = answer === currentQuestion.correct_answer

    const newAnswer: Answer = {
      question_id: currentQuestion.id,
      selected_answer: answer,
      is_correct: isCorrect,
      time_spent: timeSpent,
    }

    setAnswers(prev => [...prev, newAnswer])

    // Award XP immediately for correct answers
    if (isCorrect) {
      const xpEarned = 10 // 10 XP per correct answer
      setTotalXP(prev => prev + xpEarned)
      setShowXPAnimation(true)
      
      // Hide animation after 2 seconds
      setTimeout(() => setShowXPAnimation(false), 2000)
    }
  }

  const handleTimeUp = () => {
    if (showResult) return

    // Auto-select no answer (mark as incorrect)
    const timeSpent = 15
    const newAnswer: Answer = {
      question_id: currentQuestion.id,
      selected_answer: '',
      is_correct: false,
      time_spent: timeSpent,
    }

    setAnswers(prev => [...prev, newAnswer])
    setShowResult(true)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      const totalTime = Math.floor((Date.now() - startTime) / 1000)
      
      // Calculate bonus XP for completion
      const score = answers.filter(a => a.is_correct).length
      const bonusXP = score === questions.length ? 50 : score >= questions.length * 0.8 ? 25 : 0
      
      onComplete(answers, totalTime)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowXPAnimation(false)
      setQuestionStartTime(Date.now())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* XP Animation */}
        {showXPAnimation && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-2xl font-bold text-2xl">
              +10 XP! 🎉
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={onExit}
            className="text-sm"
          >
            Exit Quiz
          </Button>

          <div className="flex items-center gap-4">
            {/* XP Counter */}
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">XP: </span>
              <span className="text-lg font-bold text-yellow-500">{totalXP}</span>
            </div>

            <div className="flex-1 max-w-xs">
              <Timer
                duration={15}
                onTimeUp={handleTimeUp}
                isPaused={showResult}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          key={currentQuestionIndex}
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          showResult={showResult}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />

        {/* Next Button */}
        {showResult && (
          <div className="flex justify-center mt-8 animate-slide-up">
            <Button
              onClick={handleNext}
              size="lg"
              className="min-w-[200px]"
            >
              {isLastQuestion ? 'View Results' : 'Next Question'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
