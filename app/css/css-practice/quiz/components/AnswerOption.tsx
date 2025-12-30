'use client'

import { Check, X } from 'lucide-react'
import { useAnimation, useHoverAnimation, combineAnimations } from '@/lib/hooks/useAnimation'
import { useState, useEffect } from 'react'

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
  const [showShake, setShowShake] = useState(false)
  const [showPulse, setShowPulse] = useState(false)
  const showCorrect = isCorrect && isRevealed
  const showIncorrect = isSelected && !isCorrect && isRevealed

  // Trigger animations based on state
  useEffect(() => {
    if (showIncorrect) {
      setShowShake(true)
      const timer = setTimeout(() => setShowShake(false), 500)
      return () => clearTimeout(timer)
    }
    if (showCorrect) {
      setShowPulse(true)
      const timer = setTimeout(() => setShowPulse(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showIncorrect, showCorrect])

  const fadeInAnimation = useAnimation('fadeIn', { trigger: true })
  const hoverAnimation = useHoverAnimation('scaleSm')

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
    <div
      className={combineAnimations(
        'rounded-xl transition-all shadow-sm hover:shadow-md',
        fadeInAnimation,
        hoverAnimation,
        showShake ? 'animate-shake' : '',
        showPulse ? 'animate-pulse-green' : '',
        getBackgroundColor()
      )}
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
            <div className="flex-shrink-0 animate-scale-in">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </div>
          )}

          {showIncorrect && (
            <div className="flex-shrink-0 animate-scale-in">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </div>
          )}
        </div>
      </button>

      {/* Explanation - Compact but readable */}
      {isRevealed && explanation && (
        <div className="px-3 pb-2.5 ml-11 animate-fade-in">
          <div className="text-[13px] text-gray-600 leading-snug">
            {explanation}
          </div>
        </div>
      )}
    </div>
  )
}
