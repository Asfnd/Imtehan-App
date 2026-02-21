'use client'

import { useState, useEffect } from 'react'
import { Trophy, Target, Flame, Star, ArrowRight, RotateCcw, BookOpen, TrendingUp } from 'lucide-react'
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
  wrongQuestionIds: number[]
  onRestart: () => void
  onPracticeMistakes: () => void
  onExit: () => void
  reviewMode?: boolean
  originalScore?: { correct: number; total: number } | null
}

export function EnhancedResultsScreen({
  score,
  total,
  maxStreak,
  totalPoints,
  wrongQuestionIds,
  onRestart,
  onPracticeMistakes,
  onExit,
  reviewMode = false,
  originalScore = null,
}: EnhancedResultsScreenProps) {
  const [mounted, setMounted] = useState(false)
  const percentage = Math.round((score / total) * 100)
  const wrongCount = wrongQuestionIds.length

  // Calculate improvement if in review mode
  const improvement = reviewMode && originalScore
    ? {
        originalPercentage: Math.round((originalScore.correct / originalScore.total) * 100),
        newPercentage: percentage,
        improved: percentage > Math.round((originalScore.correct / originalScore.total) * 100),
        difference: percentage - Math.round((originalScore.correct / originalScore.total) * 100)
      }
    : null

  useEffect(() => {
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
    if (percentage === 100) {
      return {
        emoji: '🏆',
        title: 'PERFECT SCORE!',
        subtitle: "Absolutely Flawless!",
        gradient: 'from-blue-600 to-indigo-600',
        ringColor: 'from-blue-500 to-indigo-500',
      }
    } else if (percentage >= 90) {
      return {
        emoji: '⭐',
        title: 'OUTSTANDING!',
        subtitle: "Exceptional Work!",
        gradient: 'from-blue-600 to-indigo-600',
        ringColor: 'from-blue-500 to-indigo-500',
      }
    } else if (percentage >= 80) {
      return {
        emoji: '🎯',
        title: 'EXCELLENT!',
        subtitle: 'Great Performance!',
        gradient: 'from-indigo-600 to-blue-600',
        ringColor: 'from-indigo-500 to-blue-500',
      }
    } else if (percentage >= 70) {
      return {
        emoji: '💪',
        title: 'WELL DONE!',
        subtitle: 'Good Job!',
        gradient: 'from-blue-600 to-sky-600',
        ringColor: 'from-blue-500 to-sky-500',
      }
    } else if (percentage >= 60) {
      return {
        emoji: '📚',
        title: 'NICE TRY!',
        subtitle: 'Keep Practicing!',
        gradient: 'from-blue-600 to-cyan-600',
        ringColor: 'from-blue-500 to-cyan-500',
      }
    } else {
      return {
        emoji: '🚀',
        title: 'KEEP GOING!',
        subtitle: "You're Improving!",
        gradient: 'from-slate-700 to-blue-700',
        ringColor: 'from-slate-600 to-blue-600',
      }
    }
  }

  const performance = getPerformanceData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/40 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

          {/* Header Section - Minimalistic */}
          <div className="px-8 pt-10 pb-6 text-center">
            <div className="text-7xl mb-4 animate-bounce inline-block">
              {performance.emoji}
            </div>
            <h1 className={`text-3xl font-black bg-gradient-to-r ${performance.gradient} bg-clip-text text-transparent mb-2`}>
              {performance.title}
            </h1>
            <p className="text-gray-600 font-medium">
              {performance.subtitle}
            </p>
          </div>

          {/* Score Circle - Minimalistic & Modern */}
          <div className="px-8 pb-6">
            <div className="relative w-48 h-48 mx-auto mb-6">
              {/* Background ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 553} 553`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className="text-blue-500" stopColor="currentColor" />
                    <stop offset="100%" className={`${performance.gradient.includes('indigo-600') ? 'text-indigo-500' : 'text-blue-500'}`} stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-5xl font-black bg-gradient-to-r ${performance.gradient} bg-clip-text text-transparent`}>
                  <CountUp end={percentage} duration={1.5} suffix="%" />
                </div>
                <div className="text-sm text-gray-500 font-medium mt-1">
                  {score}/{total} correct
                </div>
              </div>
            </div>

            {/* Improvement Comparison - Only in Review Mode */}
            {reviewMode && improvement && (
              <div className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200/50">
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
                    <div className="text-xs text-gray-500 font-semibold mb-1">Review</div>
                    <div className="text-2xl font-bold text-green-700">{improvement.newPercentage}%</div>
                  </div>
                </div>
              </div>
            )}

            {/* Compact Stats - Clean Layout */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-3 border border-blue-200/50">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-2">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mb-1">Accuracy</div>
                  <div className="text-lg font-bold text-blue-900">{percentage}%</div>
                </div>
              </div>

              {maxStreak >= 3 && (
                <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-3 border border-orange-200/50">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-2">
                      <Flame className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-xs text-gray-500 font-semibold mb-1">Streak</div>
                    <div className="text-lg font-bold text-orange-900">{maxStreak}x</div>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-blue-50 to-indigo-100/50 rounded-2xl p-3 border border-blue-200/50">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-2">
                    <Star className="w-4 h-4 text-white" fill="white" />
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mb-1">Points</div>
                  <div className="text-lg font-bold text-blue-900">{totalPoints}</div>
                </div>
              </div>
            </div>

            {/* Practice Mistakes Section - Prominent if mistakes exist (hide in review mode) */}
            {wrongCount > 0 && !reviewMode && (
              <div className="mb-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-900">Master Your Mistakes</div>
                    <div className="text-xs text-gray-600">{wrongCount} {wrongCount === 1 ? 'question' : 'questions'} to review</div>
                  </div>
                </div>
                <button
                  onClick={onPracticeMistakes}
                  className="w-full px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <BookOpen className="w-4 h-4" />
                  Practice {wrongCount} {wrongCount === 1 ? 'Mistake' : 'Mistakes'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Action Buttons - Clean & Minimalistic */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onRestart}
                className={`w-full px-6 py-4 bg-gradient-to-r ${performance.gradient} text-white rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group`}
              >
                <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExit}
                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
              >
                Exit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
