'use client'

import { useCallback } from 'react'
import * as analytics from '@/lib/analytics/events'

/**
 * Custom hook for analytics tracking
 * Provides easy-to-use methods for tracking events
 */
export function useAnalytics() {
  const trackQuizStart = useCallback((quizType: string, subject?: string) => {
    analytics.trackQuizStart(quizType, subject)
  }, [])

  const trackQuizComplete = useCallback((
    quizType: string, 
    score: number, 
    totalQuestions: number,
    subject?: string
  ) => {
    analytics.trackQuizComplete(quizType, score, totalQuestions, subject)
  }, [])

  const trackQuizAbandoned = useCallback((quizType: string, questionsAnswered: number) => {
    analytics.trackQuizAbandoned(quizType, questionsAnswered)
  }, [])

  const trackPaperView = useCallback((paperType: string, subject: string, year?: string) => {
    analytics.trackPaperView(paperType, subject, year)
  }, [])

  const trackPaperDownload = useCallback((paperType: string, subject: string, year?: string) => {
    analytics.trackPaperDownload(paperType, subject, year)
  }, [])

  const trackSignUp = useCallback((method: string = 'google') => {
    analytics.trackSignUp(method)
  }, [])

  const trackLogin = useCallback((method: string = 'google') => {
    analytics.trackLogin(method)
  }, [])

  const trackTrialLimitReached = useCallback((featureType: string) => {
    analytics.trackTrialLimitReached(featureType)
  }, [])

  const trackTrialUpgrade = useCallback(() => {
    analytics.trackTrialUpgrade()
  }, [])

  const trackSearch = useCallback((searchTerm: string, category: string) => {
    analytics.trackSearch(searchTerm, category)
  }, [])

  const trackContactSubmit = useCallback(() => {
    analytics.trackContactSubmit()
  }, [])

  const trackError = useCallback((errorType: string, errorMessage: string) => {
    analytics.trackError(errorType, errorMessage)
  }, [])

  return {
    trackQuizStart,
    trackQuizComplete,
    trackQuizAbandoned,
    trackPaperView,
    trackPaperDownload,
    trackSignUp,
    trackLogin,
    trackTrialLimitReached,
    trackTrialUpgrade,
    trackSearch,
    trackContactSubmit,
    trackError
  }
}