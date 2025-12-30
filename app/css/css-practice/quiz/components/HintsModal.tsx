'use client'

import { useState, useEffect } from 'react'
import { X, Lightbulb, Lock, Unlock } from 'lucide-react'

interface HintsModalProps {
  isOpen: boolean
  onClose: () => void
  hints: string[]
}

/**
 * HintsModal Component
 * Centered modal for revealing hints one by one
 */
export function HintsModal({ isOpen, onClose, hints }: HintsModalProps) {
  const [revealedCount, setRevealedCount] = useState(1)

  // Reset to show first hint when modal opens
  useEffect(() => {
    if (isOpen) {
      setRevealedCount(1)
    }
  }, [isOpen])

  const revealNext = () => {
    if (revealedCount < hints.length) {
      setRevealedCount(revealedCount + 1)
    }
  }

  const revealAll = () => {
    setRevealedCount(hints.length)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Semi-transparent backdrop - click to close */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-[60] animate-in fade-in duration-200"
      />
      
      {/* Compact Side Panel - Positioned to avoid MCQ overlap */}
      <div className="fixed right-6 top-32 z-[70] w-80 max-h-[calc(100vh-8rem)] bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-3 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <div>
                <h3 className="text-base font-bold">Hints</h3>
                <p className="text-xs text-yellow-100">
                  {revealedCount} of {hints.length} revealed
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content - Comfortable spacing */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2.5">
            {hints.map((hint, index) => {
              const isRevealed = index < revealedCount
              return (
                <div key={index}>
                  {isRevealed ? (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded p-3">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center flex-shrink-0">
                          <Unlock className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-yellow-900 text-xs mb-1">
                            Hint {index + 1}
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {hint}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 border border-gray-300 rounded p-3 opacity-50">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center">
                          <Lock className="w-3 h-3 text-white" />
                        </div>
                        <div className="font-semibold text-gray-600 text-sm">
                          Hint {index + 1} - Locked
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Reveal Buttons */}
          {revealedCount < hints.length && (
            <div className="mt-4 space-y-2">
              <button
                onClick={revealNext}
                className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded font-semibold text-sm hover:shadow-lg transition-all"
              >
                💡 Reveal Next
              </button>
              {revealedCount < hints.length - 1 && (
                <button
                  onClick={revealAll}
                  className="w-full px-4 py-1.5 text-gray-600 hover:text-gray-900 text-xs font-medium transition-colors"
                >
                  Reveal all
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded font-semibold text-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}
