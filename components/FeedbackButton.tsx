'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Star } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAnimation, useHoverAnimation, combineAnimations } from '@/lib/hooks/useAnimation'

interface FeedbackButtonProps {
  page: string
}

export default function FeedbackButton({ page }: FeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptDismissed, setPromptDismissed] = useState(false)
  const supabase = createClientComponentClient()

  // Show feedback prompt after 2 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!promptDismissed) {
        setShowPrompt(true)
        // Auto-hide after 10 seconds
        setTimeout(() => setShowPrompt(false), 10000)
      }
    }, 120000) // 2 minutes

    return () => clearTimeout(timer)
  }, [promptDismissed])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || rating === 0) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('feedback').insert({
        page,
        rating,
        message: message.trim(),
        user_email: email.trim() || null,
      })

      if (error) throw error

      setSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        setRating(0)
        setMessage('')
        setEmail('')
      }, 2000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating Feedback Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Prompt Tooltip */}
        {showPrompt && !isOpen && (
          <div className="absolute bottom-full right-0 mb-4 bg-white rounded-2xl shadow-2xl p-4 w-64 border-2 border-purple-200 animate-slide-right">
              <button
                onClick={() => {
                  setShowPrompt(false)
                  setPromptDismissed(true)
                }}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-sm font-semibold text-gray-900 mb-2">
                💭 Enjoying the app?
              </p>
              <p className="text-xs text-gray-600 mb-3">
                Share your thoughts and help us improve!
              </p>
              <button
                onClick={() => {
                  setShowPrompt(false)
                  setIsOpen(true)
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg text-sm font-bold hover:shadow-lg transition-all"
              >
                Give Feedback
              </button>
            </div>
          )}

        <button
          onClick={() => {
            setIsOpen(true)
            setShowPrompt(false)
          }}
          className={combineAnimations(
            'bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover-scale',
            'animate-scale-in',
            showPrompt ? 'animate-pulse-purple' : ''
          )}
          title="Send Feedback"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Feedback Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-backdrop-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-modal-in"
          >
              {submitted ? (
                <div className="text-center py-8 animate-scale-in">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="animate-scale-in text-2xl text-green-600 font-bold">
                      ✓
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your feedback helps us improve</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Send Feedback
                    </h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-600 hover-scale transition-all"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        How would you rate your experience?
                      </label>
                      <div className="flex gap-1 justify-center">
                        {[1, 2, 3, 4, 5].map((starIndex) => {
                          const displayRating = hoverRating || rating
                          const isFullStar = starIndex <= displayRating
                          const isHalfStar = starIndex === Math.ceil(displayRating) && displayRating % 1 !== 0
                          
                          return (
                            <div
                              key={starIndex}
                              className="relative cursor-pointer"
                              onMouseLeave={() => setHoverRating(0)}
                            >
                              {/* Left half - for half star */}
                              <button
                                type="button"
                                onClick={() => setRating(starIndex - 0.5)}
                                onMouseEnter={() => setHoverRating(starIndex - 0.5)}
                                className="absolute left-0 top-0 w-1/2 h-full z-10 focus:outline-none hover-scale transition-all"
                              />
                              
                              {/* Right half - for full star */}
                              <button
                                type="button"
                                onClick={() => setRating(starIndex)}
                                onMouseEnter={() => setHoverRating(starIndex)}
                                className="absolute right-0 top-0 w-1/2 h-full z-10 focus:outline-none hover-scale transition-all"
                              />
                              
                              {/* Star visual */}
                              <div className="relative w-12 h-12">
                                {/* Background star (gray) */}
                                <Star className="absolute inset-0 w-12 h-12 fill-gray-200 text-gray-300 transition-all duration-200" />
                                
                                {/* Foreground star (yellow) with clip */}
                                <div
                                  className="absolute inset-0 overflow-hidden transition-all duration-200 ease-out"
                                  style={{
                                    width: isFullStar ? '100%' : isHalfStar ? '50%' : '0%',
                                  }}
                                >
                                  <Star className="w-12 h-12 fill-yellow-400 text-yellow-400 drop-shadow-[0_2px_8px_rgba(250,204,21,0.6)]" />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      {rating > 0 && (
                        <p className="text-center text-sm font-semibold text-gray-600 mt-2 animate-slide-up">
                          {rating} out of 5 stars
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Feedback *
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you think..."
                        required
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                      />
                    </div>

                    {/* Email (optional) */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !message.trim() || rating === 0}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover-scale-sm transition-all"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Feedback
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
    </>
  )
}
