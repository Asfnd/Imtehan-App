'use client'

import { motion } from 'framer-motion'
import { Trophy, Zap, Target, TrendingUp } from 'lucide-react'
import type { User } from '@/lib/supabase/types'

interface StatsOverviewProps {
  user: User
  accuracy?: number
}

export default function StatsOverview({ user, accuracy = 0 }: StatsOverviewProps) {
  const xpForNextLevel = Math.pow(user.level, 2) * 100
  const xpProgress = (user.total_xp / xpForNextLevel) * 100

  const stats = [
    {
      icon: Trophy,
      label: 'Total Quizzes',
      value: user.total_quizzes,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      icon: Zap,
      label: 'Total XP',
      value: user.total_xp.toLocaleString(),
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: `${Math.round(accuracy)}%`,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: TrendingUp,
      label: 'Current Streak',
      value: `${user.current_streak} days`,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Level Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm opacity-90 mb-1">Current Level</div>
            <div className="text-5xl font-bold">Level {user.level}</div>
          </div>
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <Trophy className="w-10 h-10" />
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2 opacity-90">
            <span>{user.total_xp} XP</span>
            <span>{xpForNextLevel} XP</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(xpProgress, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="text-sm mt-2 opacity-90">
            {xpForNextLevel - user.total_xp} XP to Level {user.level + 1}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-2xl p-4 shadow-lg`}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
