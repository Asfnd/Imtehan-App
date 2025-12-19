/**
 * Google Analytics 4 Event Tracking
 * Custom events for CSS Practice App
 */

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
  }
}

// Quiz Events
export const trackQuizStart = (quizType: string, subject?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_start', {
      event_category: 'quiz',
      event_label: quizType,
      custom_parameter_1: subject || 'unknown'
    })
  }
}

export const trackQuizComplete = (
  quizType: string, 
  score: number, 
  totalQuestions: number,
  subject?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_complete', {
      event_category: 'quiz',
      event_label: quizType,
      value: score,
      custom_parameter_1: subject || 'unknown',
      custom_parameter_2: totalQuestions
    })
  }
}

export const trackQuizAbandoned = (quizType: string, questionsAnswered: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_abandoned', {
      event_category: 'quiz',
      event_label: quizType,
      value: questionsAnswered
    })
  }
}

// Paper Events
export const trackPaperView = (paperType: string, subject: string, year?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'paper_view', {
      event_category: 'papers',
      event_label: paperType,
      custom_parameter_1: subject,
      custom_parameter_2: year || 'unknown'
    })
  }
}

export const trackPaperDownload = (paperType: string, subject: string, year?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'paper_download', {
      event_category: 'papers',
      event_label: paperType,
      custom_parameter_1: subject,
      custom_parameter_2: year || 'unknown'
    })
  }
}

// User Journey Events
export const trackSignUp = (method: string = 'google') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up', {
      method: method
    })
  }
}

export const trackLogin = (method: string = 'google') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'login', {
      method: method
    })
  }
}

// Free Trial Events
export const trackTrialLimitReached = (featureType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'trial_limit_reached', {
      event_category: 'trial',
      event_label: featureType
    })
  }
}

export const trackTrialUpgrade = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'trial_upgrade', {
      event_category: 'conversion',
      value: 1
    })
  }
}

// Navigation Events
export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href
    })
  }
}

// Search Events
export const trackSearch = (searchTerm: string, category: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      event_category: category
    })
  }
}

// Contact Events
export const trackContactSubmit = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact_submit', {
      event_category: 'engagement'
    })
  }
}

// Error Events
export const trackError = (errorType: string, errorMessage: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: false,
      custom_parameter_1: errorType
    })
  }
}