'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface FeedbackPopupProps {
  isOpen: boolean
  onClose: () => void
  examSlug: string
  quizType: 'quiz' | 'mock'
  scorePct?: number
  onAction?: (action: 'submitted' | 'skipped' | 'dismissed') => void
}

export default function FeedbackPopup({ isOpen, onClose, examSlug, quizType, scorePct, onAction }: FeedbackPopupProps) {
  const [rating, setRating]       = useState(0)
  const [hovered, setHovered]     = useState(0)
  const [comment, setComment]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!rating) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const { error } = await supabase.from('feedback').insert({
        page:       `${examSlug}: ${quizType}`,
        rating,
        message:    comment.trim() || `Score: ${scorePct ?? '?'}%`,
        user_email: user?.email ?? null,
      })
      if (error) throw error
      setSubmitted(true)
      onAction?.('submitted')
      setTimeout(onClose, 1500)
    } catch (error) {
      console.error('Failed to submit feedback:', error)
      setSubmitError('Could not submit feedback. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 pointer-events-auto animate-in fade-in zoom-in duration-200">
          {!submitted ? (
            <>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">How was your experience?</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Your feedback helps us improve</p>
                </div>
                <button
                  onClick={() => {
                    onAction?.('dismissed')
                    onClose()
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-3 flex-shrink-0 mt-0.5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center gap-4 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                  >
                    <span className={`text-4xl transition-colors ${star <= (hovered || rating) ? 'text-yellow-400' : 'text-gray-200'}`}>
                      ★
                    </span>
                  </button>
                ))}
              </div>

              {/* Optional comment */}
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Any suggestions? (optional)"
                rows={4}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 mb-4"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onAction?.('skipped')
                    onClose()
                  }}
                  className="flex-1 py-2.5 text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-xl transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!rating || submitting}
                  className="flex-1 py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending…' : 'Submit'}
                </button>
              </div>
              {submitError && <p className="mt-3 text-xs text-red-600">{submitError}</p>}
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-5xl mb-3">🙏</div>
              <h3 className="text-lg font-bold text-gray-900">Thank you!</h3>
              <p className="text-sm text-gray-500 mt-1">Your feedback means a lot to us</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
