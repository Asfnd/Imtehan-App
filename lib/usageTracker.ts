// Simple usage tracker using localStorage
// Tracks anonymous user limits before sign-up
// ONE-TIME TRIAL: Never resets, even on new days

interface UsageData {
  cssQuizzes: number
  mptTests: number
  papersViewed: number
  createdAt: string
}

const STORAGE_KEY = 'quiz_usage'
const MAX_CSS_QUIZZES = 1   // Allow 1 CSS quiz TOTAL - just enough to hook them
const MAX_MPT_TESTS = 0     // MPT completely locked - creates strong desire to sign up
const MAX_PAPERS = 2        // Allow 2 past papers TOTAL - taste but not satisfy

export const usageTracker = {
  // Get current usage
  getUsage(): UsageData {
    if (typeof window === 'undefined') {
      return { cssQuizzes: 0, mptTests: 0, papersViewed: 0, createdAt: new Date().toISOString() }
    }

    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return this.initUsage()
    }

    const data: UsageData = JSON.parse(stored)
    return data
  },

  // Initialize usage (first time only)
  initUsage(): UsageData {
    const data: UsageData = {
      cssQuizzes: 0,
      mptTests: 0,
      papersViewed: 0,
      createdAt: new Date().toISOString()
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
    return data
  },

  // Increment CSS quiz count
  incrementCSSQuiz(): void {
    const usage = this.getUsage()
    usage.cssQuizzes++
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usage))
    }
  },

  // Increment MPT test count
  incrementMPTTest(): void {
    const usage = this.getUsage()
    usage.mptTests++
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usage))
    }
  },

  // Increment papers viewed
  incrementPaperView(): void {
    const usage = this.getUsage()
    usage.papersViewed++
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usage))
    }
  },

  // Check if CSS quiz limit reached
  canTakeCSSQuiz(): boolean {
    const usage = this.getUsage()
    return usage.cssQuizzes < MAX_CSS_QUIZZES
  },

  // Check if MPT test limit reached
  canTakeMPTTest(): boolean {
    const usage = this.getUsage()
    return usage.mptTests < MAX_MPT_TESTS
  },

  // Check if can view more papers
  canViewPaper(): boolean {
    const usage = this.getUsage()
    return usage.papersViewed < MAX_PAPERS
  },

  // Get remaining counts
  getRemaining() {
    const usage = this.getUsage()
    return {
      cssQuizzes: Math.max(0, MAX_CSS_QUIZZES - usage.cssQuizzes),
      mptTests: Math.max(0, MAX_MPT_TESTS - usage.mptTests),
      papers: Math.max(0, MAX_PAPERS - usage.papersViewed)
    }
  },

  // Get max limits (for displaying total available)
  getMaxLimits() {
    return {
      cssQuizzes: MAX_CSS_QUIZZES,
      mptTests: MAX_MPT_TESTS,
      papers: MAX_PAPERS
    }
  }
}
