'use client'

import { useState, useEffect } from 'react'
import { Trophy, Star, Flame, Sparkles } from 'lucide-react'
import { soundManager } from '@/lib/sounds/soundManager'
import { useAnimation, combineAnimations } from '@/lib/hooks/useAnimation'

// Custom counter component to replace react-countup
function CountUp({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
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

// CSS-based celebration - Lightweight and performant!
const UltimateCelebration = () => {
  const [showCelebration, setShowCelebration] = useState(true)

  useEffect(() => {
    // Hide celebration after 3 seconds
    const timer = setTimeout(() => setShowCelebration(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!showCelebration) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {/* CSS Confetti particles */}
      {Array.from({ length: 30 }).map((_, i) => (
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
              backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'][
                Math.floor(Math.random() * 6)
              ],
            }}
          />
        </div>
      ))}
      
      {/* Floating emojis */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`emoji-${i}`}
          className="absolute text-4xl animate-emoji-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1}s`,
          }}
        >
          {['🎉', '🎊', '⭐', '✨', '🌟', '🏆'][Math.floor(Math.random() * 6)]}
        </div>
      ))}
    </div>
  )
}

export function EnhancedResultsScreen({
  score,
  total,
  maxStreak,
  totalPoints,
  onRestart,
  onExit,
}: EnhancedResultsScreenProps) {
  const [showContent, setShowContent] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const percentage = Math.round((score / total) * 100)

  useEffect(() => {
    if (maxStreak >= 5) {
      setTimeout(() => soundManager.play('streakMilestone'), 600)
    }
    
    // Trigger celebration for good scores
    if (percentage >= 70) {
      setTimeout(() => setShowCelebration(true), 300)
    }
    
    setTimeout(() => setShowContent(true), 200)
  }, [maxStreak, percentage])

  const fadeInAnimation = useAnimation('fadeIn', { trigger: true })
  const slideUpAnimation = useAnimation('slideUp', { trigger: showContent })

  const getPerformanceData = () => {
    if (percentage >= 90) {
      return {
        emoji: '🏆',
        title: 'LEGENDARY!',
        subtitle: "Absolutely Incredible!",
        gradient: 'from-yellow-400 via-orange-500 to-red-500',
        glow: 'shadow-yellow-500/50',
      }
    } else if (percentage >= 80) {
      return {
        emoji: '🌟',
        title: 'AMAZING!',
        subtitle: 'Outstanding Work!',
        gradient: 'from-green-400 via-emerald-500 to-teal-500',
        glow: 'shadow-green-500/50',
      }
    } else if (percentage >= 70) {
      return {
        emoji: '🎯',
        title: 'EXCELLENT!',
        subtitle: 'Great Job!',
        gradient: 'from-blue-400 via-indigo-500 to-purple-500',
        glow: 'shadow-blue-500/50',
      }
    } else if (percentage >= 60) {
      return {
        emoji: '📚',
        title: 'GOOD!',
        subtitle: 'Keep Going!',
        gradient: 'from-purple-400 via-pink-500 to-rose-500',
        glow: 'shadow-purple-500/50',
      }
    } else {
      return {
        emoji: '💪',
        title: 'NICE TRY!',
        subtitle: "You'll Do Better!",
        gradient: 'from-orange-400 via-red-500 to-pink-500',
        glow: 'shadow-orange-500/50',
      }
    }
  }

  const performance = getPerformanceData()

  return (
    <>
      {/* ULTIMATE CELEBRATION - Covers entire page! */}
      {showCelebration && <UltimateCelebration />}

      {/* Main Screen - Fixed height, no scroll */}
      <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30 blur-3xl animate-spin-slow opacity-30" />
        </div>

        {/* Content Card - Compact */}
        <div className={combineAnimations('relative z-10 w-full max-w-xl', fadeInAnimation, 'animate-scale-in')}>
          <div className="bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl shadow-2xl p-6 backdrop-blur-xl border-4 border-white/50">
            {/* Emoji - Compact */}
            <div className="text-center mb-4 animate-scale-in">
              <div className="text-7xl inline-block animate-bounce">
                {performance.emoji}
              </div>
            </div>

            {/* Title - Compact */}
            <div className="text-center mb-5 animate-slide-up">
              <h1 className={`text-5xl font-black bg-gradient-to-r ${performance.gradient} bg-clip-text text-transparent mb-2`}>
                {performance.title}
              </h1>
              <p className="text-lg text-gray-600 font-bold">
                {performance.subtitle}
              </p>
            </div>

            {/* Score - Compact */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-5 animate-scale-in">
              <div className="text-center">
                <div className={`text-7xl font-black bg-gradient-to-r ${performance.gradient} bg-clip-text text-transparent mb-2`}>
                  <CountUp end={percentage} duration={2} suffix="%" />
                </div>
                <div className="text-xl text-gray-700 font-bold">
                  {score} <span className="text-gray-400">/</span> {total} <span className="text-gray-500">Correct</span>
                </div>
              </div>
            </div>

            {/* Stats - Compact */}
            {showContent && (maxStreak >= 3 || totalPoints >= 50) && (
              <div className="flex justify-center gap-3 mb-5 animate-slide-up">
                {maxStreak >= 3 && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 px-4 py-2 rounded-full shadow-lg">
                    <Flame className="w-5 h-5 text-white" />
                    <span className="font-black text-white">{maxStreak}x</span>
                  </div>
                )}
                {totalPoints >= 50 && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 rounded-full shadow-lg">
                    <Star className="w-5 h-5 text-white" fill="white" />
                    <span className="font-black text-white">{totalPoints}</span>
                  </div>
                )}
              </div>
            )}

            {/* Perfect Score Badge - Compact */}
            {percentage === 100 && (
              <div className="flex justify-center mb-5 animate-scale-in">
                <div className={`bg-gradient-to-r ${performance.gradient} text-white px-6 py-2 rounded-full font-black flex items-center gap-2 shadow-lg`}>
                  <Trophy className="w-5 h-5" />
                  PERFECT!
                </div>
              </div>
            )}

            {/* Buttons - Compact */}
            <div className="flex gap-3 animate-slide-up">
              <button
                onClick={onRestart}
                className={`relative flex-1 px-6 py-4 bg-gradient-to-r ${performance.gradient} text-white rounded-xl font-black text-lg shadow-xl overflow-hidden hover-scale transition-all`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                <span className="relative">🚀 Try Again</span>
              </button>
              
              <button
                onClick={onExit}
                className="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-black text-lg shadow-xl hover-scale transition-all"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
