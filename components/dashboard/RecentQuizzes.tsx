'use client'

import { motion } from 'framer-motion'
import { Clock, Target, Calendar } from 'lucide-react'
import type { QuizHistory } from '@/lib/supabase/types'

interface RecentQuizzesProps {
  quizzes: QuizHistory[]
}

export default function RecentQuizzes({ quizzes }: RecentQuizzesProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (quizzes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
        <div className="text-gray-400 mb-2">
          <Calendar className="w-12 h-12 mx-auto mb-3" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No quizzes yet</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Start your first quiz to see your history here!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Recent Quizzes</h2>

      <div className="space-y-3">
        {quizzes.map((quiz, index) => {
          const accuracy = Math.round((quiz.score / quiz.total_questions) * 100)
          const isGoodScore = accuracy >= 70

          return (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {/* Score Badge */}
              <div
                className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
                  isGoodScore
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                    : 'bg-gradient-to-br from-orange-400 to-red-500'
                } text-white`}
              >
                <div className="text-2xl font-bold">{accuracy}%</div>
              </div>

              {/* Quiz Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg mb-1 truncate">{quiz.topic}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>
                      {quiz.score}/{quiz.total_questions}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(quiz.time_taken)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(quiz.completed_at)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
