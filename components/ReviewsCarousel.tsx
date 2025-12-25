'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Review {
  name: string
  role: string
  text: string
  location: string
}

interface ReviewsCarouselProps {
  reviews: Review[]
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
    }
  }, [isAutoPlay, reviews.length])

  const handlePrev = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const handleNext = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlay(false)
    setCurrentIndex(index)
  }

  // Get visible reviews (3 at a time on desktop, 1 on mobile)
  const getVisibleReviews = () => {
    const visibleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
    const visible = []
    for (let i = 0; i < visibleCount; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length])
    }
    return visible
  }

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
          Student Experiences
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Real students, real progress. See what others are saying about their preparation journey.
        </p>

        {/* Carousel Container */}
        <div className="relative">
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getVisibleReviews().map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 min-h-20">
                  "{review.text}"
                </p>

                {/* Reviewer Info */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 text-sm">{review.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{review.role}</p>
                  <p className="text-xs text-gray-400">{review.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all text-gray-700 hover:text-blue-600"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex justify-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all text-gray-700 hover:text-blue-600"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Auto-play Indicator */}
          <div className="text-center text-xs text-gray-500">
            {isAutoPlay ? 'Auto-scrolling reviews...' : 'Click to resume auto-scroll'}
          </div>
        </div>
      </div>
    </section>
  )
}
