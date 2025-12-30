'use client'

import { useEffect, useState } from 'react'

interface ConfettiCelebrationProps {
  trigger: boolean
  intensity?: 'low' | 'medium' | 'high'
}

/**
 * ConfettiCelebration Component
 * Full-screen celebration with confetti, emojis, and particles
 * Optimized for smooth 60 FPS performance
 */
export function ConfettiCelebration({
  trigger,
  intensity = 'medium',
}: ConfettiCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (trigger && !mounted) {
      setShowConfetti(true)
      setMounted(true)

      // Hide confetti after animation duration
      const duration = intensity === 'high' ? 3500 : intensity === 'medium' ? 2500 : 1500
      setTimeout(() => setShowConfetti(false), duration)
    }
  }, [trigger, intensity, mounted])

  // Reset when trigger changes
  useEffect(() => {
    if (!trigger) {
      setShowConfetti(false)
      setMounted(false)
    }
  }, [trigger])

  if (!showConfetti) return null

  const particleCount = {
    low: 20,
    medium: 35,
    high: 50,
  }[intensity]

  const colors = {
    low: ['#3b82f6', '#6366f1', '#10b981'],
    medium: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ec4899'],
    high: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
  }[intensity]

  const emojis = {
    low: ['⭐', '✨'],
    medium: ['🎉', '⭐', '✨', '💫'],
    high: ['🎉', '🎊', '⭐', '✨', '💫', '🌟', '🏆', '🔥'],
  }[intensity]

  return (
    <>
      {/* Full-screen overlay with higher z-index */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* Confetti particles - optimized with GPU acceleration */}
        {Array.from({ length: particleCount }).map((_, i) => {
          const startX = Math.random() * 100
          const rotation = Math.random() * 720
          const delay = Math.random() * 0.5
          const duration = 1.8 + Math.random() * 1.2

          return (
            <div
              key={`confetti-${i}-${Date.now()}`}
              className="absolute will-change-transform"
              style={{
                left: `${startX}%`,
                top: '-10vh',
                animation: `confettiFall ${duration}s linear forwards`,
                animationDelay: `${delay}s`,
                transform: 'translateZ(0)', // GPU acceleration
              }}
            >
              <div
                className={`${Math.random() > 0.5 ? 'w-3 h-3 rounded-full' : 'w-2 h-4 rounded-sm'}`}
                style={{
                  backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                  boxShadow: `0 0 ${Math.random() * 10}px ${colors[Math.floor(Math.random() * colors.length)]}`,
                  transform: `rotate(${rotation}deg)`,
                }}
              />
            </div>
          )
        })}

        {/* Emoji particles for medium and high intensity */}
        {(intensity === 'medium' || intensity === 'high') &&
          Array.from({ length: intensity === 'high' ? 15 : 8 }).map((_, i) => {
            const startX = 10 + Math.random() * 80
            const emoji = emojis[Math.floor(Math.random() * emojis.length)]
            const delay = Math.random() * 0.6

            return (
              <div
                key={`emoji-${i}-${Date.now()}`}
                className="absolute text-3xl sm:text-4xl will-change-transform"
                style={{
                  left: `${startX}%`,
                  top: '-10vh',
                  animation: `emojiFloat ${2.5 + Math.random()}s ease-out forwards`,
                  animationDelay: `${delay}s`,
                  transform: 'translateZ(0)',
                  textShadow: '0 0 10px rgba(255,255,255,0.8)',
                }}
              >
                {emoji}
              </div>
            )
          })
        }

        {/* Sparkle bursts for high intensity */}
        {intensity === 'high' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`burst-${i}`}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  animation: `sparkBurst 1.5s ease-out forwards`,
                  animationDelay: `${i * 0.1}s`,
                  transform: `rotate(${i * 60}deg)`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Custom animations for extra effects */}
      <style jsx>{`
        @keyframes sparkBurst {
          0% {
            transform: scale(0) translate(0, 0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1) translate(150px, 0);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
