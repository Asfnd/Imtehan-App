'use client'

import { useMemo, memo } from 'react'

interface EncouragementMessageProps {
  type: 'correct' | 'incorrect' | 'milestone'
  message?: string
  show: boolean
}

const messages = {
  correct: [
    'Excellent! 🎉',
    'Perfect! ⭐',
    'Great job! 👏',
    'You got it! ✨',
    'Brilliant! 💫',
    'Outstanding! 🌟',
    'Awesome! 🚀',
    'Fantastic! 🎯',
    'Superb! 💪',
    'Well done! 🏆',
  ],
  incorrect: [
    'Keep trying! 💪',
    "You'll get the next one! 🎯",
    'Learning moment! 📚',
    'Almost there! 🔥',
    'Keep going! 🚀',
    'Try again! 💡',
    'You can do it! ⭐',
    'Stay focused! 🎓',
  ],
  milestone: [
    'Amazing streak! 🔥',
    "You're on fire! 🎊",
    'Unstoppable! ⚡',
    'Incredible! 🏆',
    'Phenomenal! 🌟',
    'Legendary! 👑',
  ],
}

/**
 * EncouragementMessage Component
 * Displays motivational messages with animations
 * Memoized to prevent unnecessary re-renders
 */
export const EncouragementMessage = memo(function EncouragementMessage({
  type,
  message,
  show,
}: EncouragementMessageProps) {
  const randomMessage = useMemo(
    () => messages[type][Math.floor(Math.random() * messages[type].length)],
    [type]
  )

  const displayMessage = message || randomMessage

  const getBackgroundColor = () => {
    switch (type) {
      case 'correct':
        return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'incorrect':
        return 'bg-gradient-to-r from-orange-500 to-amber-500'
      case 'milestone':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600'
      default:
        return 'bg-gradient-to-r from-blue-500 to-indigo-500'
    }
  }

  return (
    <>
      {show && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none animate-slide-down">
          <div className={`${getBackgroundColor()} text-white px-6 py-3 rounded-full shadow-2xl`}>
            <span className="text-lg font-bold whitespace-nowrap">
              {displayMessage}
            </span>
          </div>
        </div>
      )}
    </>
  )
})
