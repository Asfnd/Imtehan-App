'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import { Trophy, Star, Flame, Sparkles } from 'lucide-react'
import { soundManager } from '@/lib/sounds/soundManager'

interface EnhancedResultsScreenProps {
  score: number
  total: number
  maxStreak: number
  totalPoints: number
  onRestart: () => void
  onExit: () => void
}

// OPTIMIZED CELEBRATION - Smooth performance!
const UltimateCelebration = () => {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const allParticles: any[] = []

    // 1. CONFETTI (60 pieces - optimized)
    const confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8']
    for (let wave = 0; wave < 2; wave++) {
      for (let i = 0; i < 30; i++) {
        allParticles.push({
          id: `confetti-${wave}-${i}`,
          type: 'confetti',
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          shape: ['square', 'circle'][Math.floor(Math.random() * 2)],
          delay: wave * 300 + i * 8,
          angle: Math.random() * Math.PI * 2,
          velocity: 250 + Math.random() * 200,
        })
      }
    }

    // 2. EMOJIS (40 - optimized)
    const emojis = ['🎉', '🎊', '⭐', '✨', '🌟', '🏆']
    for (let i = 0; i < 40; i++) {
      allParticles.push({
        id: `emoji-${i}`,
        type: 'emoji',
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        delay: 200 + i * 50,
        x: Math.random() * 100,
      })
    }

    // 3. FIREWORKS (8 - optimized)
    for (let i = 0; i < 8; i++) {
      allParticles.push({
        id: `firework-${i}`,
        type: 'firework',
        delay: 400 + i * 250,
        x: 15 + Math.random() * 70,
        targetY: 15 + Math.random() * 30,
      })
    }

    setParticles(allParticles)

    // Clear after 3 seconds
    const timer = setTimeout(() => setParticles([]), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => {
        // CONFETTI
        if (particle.type === 'confetti') {
          const tx = Math.cos(particle.angle) * particle.velocity
          const ty = Math.sin(particle.angle) * particle.velocity - 100
          
          return (
            <motion.div
              key={particle.id}
              initial={{ x: '50vw', y: '50vh', rotate: 0, scale: 0, opacity: 1 }}
              animate={{
                x: `calc(50vw + ${tx}px)`,
                y: `calc(50vh + ${ty}px + ${Math.abs(ty) * 0.5}px)`,
                rotate: Math.random() * 720,
                scale: [0, 1.2, 1],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 2.5, delay: particle.delay / 1000, ease: [0.36, 0, 0.66, -0.56] }}
              className="absolute"
              style={{
                width: particle.shape === 'rectangle' ? '15px' : '10px',
                height: particle.shape === 'rectangle' ? '5px' : '10px',
                backgroundColor: particle.color,
                borderRadius: particle.shape === 'circle' ? '50%' : '2px',
                boxShadow: `0 0 10px ${particle.color}`,
              }}
            />
          )
        }

        // EMOJI
        if (particle.type === 'emoji') {
          return (
            <motion.div
              key={particle.id}
              initial={{ x: `${particle.x}vw`, y: '-10vh', rotate: 0, scale: 0 }}
              animate={{
                y: '110vh',
                rotate: Math.random() * 1080 - 540,
                scale: [0, 1.5, 1, 0.8],
                x: `calc(${particle.x}vw + ${Math.sin(particle.delay / 100) * 50}px)`,
              }}
              transition={{ duration: 3, delay: particle.delay / 1000, ease: 'linear' }}
              className="absolute text-4xl"
            >
              {particle.emoji}
            </motion.div>
          )
        }

        // FIREWORK (optimized - 25 particles each)
        if (particle.type === 'firework') {
          return (
            <motion.div
              key={particle.id}
              initial={{ x: `${particle.x}vw`, y: '100vh' }}
              animate={{ y: `${particle.targetY}vh` }}
              transition={{ duration: 0.6, delay: particle.delay / 1000, ease: 'easeOut' }}
              className="absolute"
            >
              {Array.from({ length: 25 }).map((_, i) => {
                const angle = (i / 25) * Math.PI * 2
                const distance = 50 + Math.random() * 50
                const colors = ['#fbbf24', '#60a5fa', '#f472b6', '#4ade80']
                const color = colors[Math.floor(Math.random() * colors.length)]
                
                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      scale: [0, 1.2, 0],
                      opacity: [1, 1, 0],
                    }}
                    transition={{ duration: 1.2, delay: (particle.delay + 600) / 1000, ease: 'easeOut' }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                  />
                )
              })}
            </motion.div>
          )
        }

        return null
      })}
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
      <AnimatePresence>
        {showCelebration && <UltimateCelebration />}
      </AnimatePresence>

      {/* Main Screen - Fixed height, no scroll */}
      <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30 blur-3xl"
          />
        </div>

        {/* Content Card - Compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="relative z-10 w-full max-w-xl"
        >
          <div className="bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl shadow-2xl p-6 backdrop-blur-xl border-4 border-white/50">
            {/* Emoji - Compact */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
              className="text-center mb-4"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-7xl inline-block"
              >
                {performance.emoji}
              </motion.div>
            </motion.div>

            {/* Title - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-5"
            >
              <h1 className={`text-5xl font-black bg-gradient-to-r ${performance.gradient} bg-clip-text text-transparent mb-2`}>
                {performance.title}
              </h1>
              <p className="text-lg text-gray-600 font-bold">
                {performance.subtitle}
              </p>
            </motion.div>

            {/* Score - Compact */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-5"
            >
              <div className="text-center">
                <div className={`text-7xl font-black bg-gradient-to-r ${performance.gradient} bg-clip-text text-transparent mb-2`}>
                  <CountUp end={percentage} duration={2} suffix="%" />
                </div>
                <div className="text-xl text-gray-700 font-bold">
                  {score} <span className="text-gray-400">/</span> {total} <span className="text-gray-500">Correct</span>
                </div>
              </div>
            </motion.div>

            {/* Stats - Compact */}
            {showContent && (maxStreak >= 3 || totalPoints >= 50) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-3 mb-5"
              >
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
              </motion.div>
            )}

            {/* Perfect Score Badge - Compact */}
            {percentage === 100 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="flex justify-center mb-5"
              >
                <div className={`bg-gradient-to-r ${performance.gradient} text-white px-6 py-2 rounded-full font-black flex items-center gap-2 shadow-lg`}>
                  <Trophy className="w-5 h-5" />
                  PERFECT!
                </div>
              </motion.div>
            )}

            {/* Buttons - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <motion.button
                onClick={onRestart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex-1 px-6 py-4 bg-gradient-to-r ${performance.gradient} text-white rounded-xl font-black text-lg shadow-xl overflow-hidden`}
              >
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                <span className="relative">🚀 Try Again</span>
              </motion.button>
              
              <motion.button
                onClick={onExit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-black text-lg shadow-xl"
              >
                Exit
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
