'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface AnswerOptionProps {
  label: string
  text: string
  isSelected: boolean
  isCorrect: boolean
  isRevealed: boolean
  onSelect: () => void
  disabled: boolean
  explanation?: string
}

/**
 * AnswerOption Component
 * Modern, interactive answer button with animations and feedback
 */
export function AnswerOption({
  label,
  text,
  isSelected,
  isCorrect,
  isRevealed,
  onSelect,
  disabled,
  explanation,
}: AnswerOptionProps) {
  const showCorrect = isCorrect && isRevealed
  const showIncorrect = isSelected && !isCorrect && isRevealed

  // Combined animation based on state
  const getAnimation = () => {
    if (showIncorrect) {
      return {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5, type: 'tween' as const },
      }
    }
    if (showCorrect) {
      return {
        boxShadow: [
          '0 0 0 0 rgba(34, 197, 94, 0)',
          '0 0 0 8px rgba(34, 197, 94, 0.2)',
          '0 0 0 0 rgba(34, 197, 94, 0)',
        ],
        transition: { duration: 1, repeat: 2, type: 'tween' as const },
      }
    }
    return {}
  }

  const getBackgroundColor = () => {
    if (showCorrect) {
      return 'bg-gradient-to-r from-green-50 to-emerald-50'
    }
    if (showIncorrect) {
      return 'bg-gradient-to-r from-red-50 to-rose-50'
    }
    if (isSelected && !isRevealed) {
      return 'bg-gradient-to-r from-blue-50 to-indigo-50'
    }
    return 'bg-gray-50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50'
  }

  const getLabelColor = () => {
    if (showCorrect) return 'bg-green-500 text-white'
    if (showIncorrect) return 'bg-red-500 text-white'
    if (isSelected && !isRevealed) return 'bg-blue-500 text-white'
    return 'bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700'
  }

  return (
    <motion.div
      animate={getAnimation()}
      className={`rounded-xl transition-all ${getBackgroundColor()} shadow-sm hover:shadow-md`}
    >
      <button
        onClick={onSelect}
        disabled={disabled}
        className={`w-full text-left p-3 ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {/* Label Badge - Sweet spot size */}
          <div
            className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-base ${getLabelColor()}`}
          >
            {label}
          </div>

          {/* Answer Text - Sweet spot size */}
          <span className="flex-1 text-[15px] leading-normal text-gray-800 font-medium">
            {text}
          </span>

          {/* Status Icon */}
          {showCorrect && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex-shrink-0"
            >
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </motion.div>
          )}

          {showIncorrect && (
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex-shrink-0"
            >
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </motion.div>
          )}
        </div>
      </button>

      {/* Explanation - Compact but readable */}
      {isRevealed && explanation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="px-3 pb-2.5 ml-11"
        >
          <div className="text-[13px] text-gray-600 leading-snug">
            {explanation}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
