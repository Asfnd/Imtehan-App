'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

interface StreakCalendarProps {
  currentStreak: number
  longestStreak: number
  quizDates: string[] // Array of ISO date strings when quizzes were completed
}

export default function StreakCalendar({
  currentStreak,
  longestStreak,
  quizDates,
}: StreakCalendarProps) {
  // Get last 30 days
  const getLast30Days = () => {
    const days = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      days.push(date)
    }

    return days
  }

  const last30Days = getLast30Days()

  // Check if a date has a quiz
  const hasQuizOnDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return quizDates.some(qDate => qDate.startsWith(dateStr))
  }

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Activity Streak</h2>
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-500" />
          <span className="text-2xl font-bold">{currentStreak}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Current Streak
          </div>
          <div className="text-3xl font-bold text-orange-500">
            {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Longest Streak
          </div>
          <div className="text-3xl font-bold text-purple-500">
            {longestStreak} {longestStreak === 1 ? 'day' : 'days'}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Last 30 Days
        </div>
        <div className="grid grid-cols-10 gap-2">
          {last30Days.map((date, index) => {
            const hasQuiz = hasQuizOnDate(date)
            const isToday =
              date.toDateString() === new Date().toDateString()

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                className="relative group"
              >
                <div
                  className={`aspect-square rounded-lg transition-all ${
                    hasQuiz
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                      : 'bg-gray-100 dark:bg-gray-700'
                  } ${
                    isToday
                      ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800'
                      : ''
                  }`}
                  title={`${date.toLocaleDateString()} ${hasQuiz ? '✓' : ''}`}
                />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {date.toLocaleDateString()}
                  {hasQuiz && ' ✓'}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-green-400 to-emerald-500" />
            <span>Quiz completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-700" />
            <span>No activity</span>
          </div>
        </div>
      </div>

      {/* Streak Bonus Info */}
      {currentStreak > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold">Streak Bonus Active!</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You're earning{' '}
            <span className="font-bold text-orange-500">
              +{Math.min(currentStreak * 5, 25)}% XP
            </span>{' '}
            for maintaining your streak!
          </p>
        </motion.div>
      )}
    </div>
  )
}
