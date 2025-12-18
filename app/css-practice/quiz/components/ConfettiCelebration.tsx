'use client'

import { useEffect, useState } from 'react'

interface ConfettiCelebrationProps {
  trigger: boolean
  intensity?: 'low' | 'medium' | 'high'
}

/**
 * ConfettiCelebration Component
 * CSS-based confetti animations for correct answers and milestones
 * Lightweight and performant on all devices
 */
export function ConfettiCelebration({
  trigger,
  intensity = 'medium',
}: ConfettiCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (trigger) {
      setShowConfetti(true)
      
      // Hide confetti after animation duration
      const duration = intensity === 'high' ? 3000 : intensity === 'medium' ? 2000 : 1500
      setTimeout(() => setShowConfetti(false), duration)
    }
  }, [trigger, intensity])

  if (!showConfetti) return null

  const particleCount = {
    low: 15,
    medium: 25,
    high: 40,
  }[intensity]

  const colors = {
    low: ['#9333ea', '#3b82f6', '#10b981'],
    medium: ['#9333ea', '#3b82f6', '#10b981', '#f59e0b'],
    high: ['#9333ea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  }[intensity]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {/* CSS Confetti particles */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <div
          key={`confetti-${i}`}
          className="absolute animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1.5 + Math.random() * 1}s`,
          }}
        >
          <div
            className={`w-2 h-2 ${Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm'}`}
            style={{
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            }}
          />
        </div>
      ))}
      
      {/* Extra particles for high intensity */}
      {intensity === 'high' && Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`extra-${i}`}
          className="absolute text-2xl animate-emoji-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${0.2 + Math.random() * 0.3}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  )
}
