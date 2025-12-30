'use client'

import { X, BookOpen } from 'lucide-react'

interface ExplanationModalProps {
  isOpen: boolean
  onClose: () => void
  explanation: string
}

/**
 * ExplanationModal Component
 * Centered modal for main explanation
 */
export function ExplanationModal({
  isOpen,
  onClose,
  explanation,
}: ExplanationModalProps) {
  if (!isOpen) return null
  // Clean up and format explanation
  const cleanExplanation = explanation
    .replace(/¥/g, '')
    .replace(/Ò/g, '"')
    .replace(/Ó/g, '"')
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    .replace(/"/g, '"')
    .replace(/"/g, '"')
    .replace(/–/g, '-')
    .replace(/—/g, '-')
    .replace(/…/g, '...')
    .trim()

  // Split into bullet points if possible
  const points = cleanExplanation
    .split(/[•\n]|(?:\d+\.)|(?:-\s)/)
    .map((point) => point.trim())
    .filter((point) => point.length > 15)

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
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <h3 className="text-base font-bold">Explanation</h3>
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
          <div className="space-y-2">
            {points.length > 1 ? (
              // Show as bullet points
              points.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1 flex-shrink-0 text-sm">•</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))
            ) : (
              // Show as paragraph
              <p className="text-sm text-gray-700 leading-relaxed">
                {cleanExplanation}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded font-semibold text-sm hover:shadow-lg transition-all"
          >
            Got it! 👍
          </button>
        </div>
      </div>
    </>
  )
}
