'use client'

import { useState, useEffect } from 'react'
import { Trophy, Star, Flame, Target, TrendingUp, ArrowRight, RotateCcw, Sparkles } from 'lucide-react'
import { soundManager } from '@/lib/sounds/soundManager'

// Custom counter component with smooth animation
function CountUp({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}{suffix}</span>
}

interface EnhancedResultsScreenProps {
  score: number
  total: number
  maxStreak: number
  totalPoints: number
  onRestart: () => void
  onExit: () => void
}

export function EnhancedResultsScreen({
  score,
  total,
  maxStreak,
  totalPoints,
  onRestart,
  onExit,
}: EnhancedResultsScreenProps) {
  const [mounted, setMounted] = useState(false)
  const percentage = Math.round((score / total) * 100)

  useEffect(() => {
    // Mount immediately for instant display
    setMounted(true)

    // Play celebration sound for good performance
    if (percentage >= 70) {
      setTimeout(() => soundManager.play('correct'), 100)
    }

    // Play milestone sound for streak
    if (maxStreak >= 5) {
      setTimeout(() => soundManager.play('streakMilestone'), 400)
    }
  }, [maxStreak, percentage])

  const getPerformanceData = () => {
    if (percentage >= 90) {
      return {
        emoji: '🏆',
        title: 'OUTSTANDING!',
        subtitle: "Exceptional Performance!",
        gradient: 'from-blue-600 via-indigo-600 to-purple-600',
        bgGradient: 'from-blue-50 to-indigo-50',
        iconBg: 'from-blue-500 to-indigo-600',
      }
    } else if (percentage >= 80) {
      return {
        emoji: '⭐',
        title: 'EXCELLENT!',
        subtitle: 'Great Work!',
        gradient: 'from-green-600 via-emerald-600 to-teal-600',
        bgGradient: 'from-green-50 to-emerald-50',
        iconBg: 'from-green-500 to-emerald-600',
      }
    } else if (percentage >= 70) {
      return {
        emoji: '🎯',
        title: 'WELL DONE!',
        subtitle: 'Good Job!',
        gradient: 'from-blue-600 via-cyan-600 to-teal-600',
        bgGradient: 'from-blue-50 to-cyan-50',
        iconBg: 'from-blue-500 to-cyan-600',
      }
    } else if (percentage >= 60) {
      return {
        emoji: '📚',
        title: 'GOOD EFFORT!',
        subtitle: 'Keep Practicing!',
        gradient: 'from-purple-600 via-pink-600 to-rose-600',
        bgGradient: 'from-purple-50 to-pink-50',
        iconBg: 'from-purple-500 to-pink-600',
      }
    } else {
      return {
        emoji: '💪',
        title: 'KEEP GOING!',
        subtitle: "Practice Makes Perfect!",
        gradient: 'from-orange-600 via-red-600 to-pink-600',
        bgGradient: 'from-orange-50 to-red-50',
        iconBg: 'from-orange-500 to-red-600',
      }
    }
  }

  const performance = getPerformanceData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content Card */}
        <div className="relative z-10 w-full max-w-2xl animate-scale-in">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-blue-100 overflow-hidden">
            {/* Header with gradient */}
            <div className={`bg-gradient-to-r ${performance.gradient} px-6 sm:px-8 py-8 text-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10"></div>
              <div className="relative">
                <div className="text-6xl sm:text-7xl mb-3 animate-bounce inline-block">
                  {performance.emoji}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">
                  {performance.title}
                </h1>
                <p className="text-base sm:text-lg text-white/90 font-semibold">
                  {performance.subtitle}
                </p>
              </div>
            </div>

            {/* Score Section */}
            <div className="p-6 sm:p-8">
              <div className={`bg-gradient-to-br ${performance.bgGradient} rounded-2xl p-6 sm:p-8 mb-6 border-2 border-blue-100`}>
                <div className="text-center">
                  <div className={`text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r ${performance.gradient} bg-clip-text text-transparent mb-3`}>
                    <CountUp end={percentage} duration={2} suffix="%" />
                  </div>
                  <div className="text-xl sm:text-2xl text-gray-700 font-bold">
                    {score} <span className="text-gray-400">/</span> {total} <span className="text-gray-500">Correct</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                  {/* Accuracy */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200 hover:scale-105 transition-transform">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${performance.iconBg} flex items-center justify-center`}>
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs text-gray-500 font-semibold uppercase">Accuracy</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{percentage}%</div>
                  </div>

                  {/* Streak */}
                  {maxStreak >= 3 && (
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-4 border border-orange-200 hover:scale-105 transition-transform">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                          <Flame className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-gray-500 font-semibold uppercase">Max Streak</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-900">{maxStreak}x</div>
                    </div>
                  )}

                  {/* Points */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-200 hover:scale-105 transition-transform">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" fill="white" />
                      </div>
                      <span className="text-xs text-gray-500 font-semibold uppercase">Points</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">{totalPoints}</div>
                  </div>
                </div>

              {/* Perfect Score Badge */}
              {percentage === 100 && (
                <div className="flex justify-center mb-6 animate-scale-in">
                  <div className={`bg-gradient-to-r ${performance.gradient} text-white px-6 py-3 rounded-full font-black flex items-center gap-2 shadow-lg text-sm sm:text-base`}>
                    <Trophy className="w-5 h-5" />
                    PERFECT SCORE!
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={onRestart}
                  className={`flex-1 px-6 py-4 bg-gradient-to-r ${performance.gradient} text-white rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2 group`}
                >
                  <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  Try Again
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onExit}
                  className="sm:w-32 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
