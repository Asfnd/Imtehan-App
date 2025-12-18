// Persistent usage tracker using localStorage
// Tracks anonymous user limits before sign-up
// ONE-TIME TRIAL: Never resets, maintains history across sessions
// Applies to ALL quiz types including idioms and MCQs

interface UsageData {
  cssSubjectQuizzes: number    // Subject-wise CSS quizzes
  cssIdiomsQuizzes: number     // Idioms quizzes  
  cssIdiomsRandom: number      // Random idioms
  mptMockTests: number         // MPT mock tests
  mptPastPapers: number        // MPT past papers
  officialPastPapers: number   // Official CSS past papers
  solvedPapers: number         // Solved papers
  createdAt: string
}

const STORAGE_KEY = 'quiz_usage'
// FREE TRIAL LIMITS - PERSISTENT ACROSS SESSIONS (NEVER RESET)
const MAX_CSS_SUBJECT_QUIZZES = 3    // Subject wise CSS MCQs: 3 quizzes allowed
const MAX_CSS_IDIOMS_QUIZZES = 1     // Idioms by year: 1 quiz allowed
const MAX_CSS_IDIOMS_RANDOM = 1      // Idioms random: 1 quiz allowed
const MAX_MPT_MOCK_TESTS = 1         // MPT mock tests: 1 test allowed
const MAX_MPT_PAST_PAPERS = 1        // MPT past papers: 1 access allowed
const MAX_OFFICIAL_PAST_PAPERS = 3   // Official past papers: 3 downloads allowed
const MAX_SOLVED_PAPERS = 0          // Solved papers: sign-in required (no free trial)

export const usageTracker = {
  // Get current usage from localStorage
  getUsage(): UsageData {
    if (typeof window === 'undefined') return this.initUsage()
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      // Silently handle localStorage errors in production
    }
    
    return this.initUsage()
  },

  // Initialize usage data
  initUsage(): UsageData {
    const data = {
      cssSubjectQuizzes: 0,
      cssIdiomsQuizzes: 0,
      cssIdiomsRandom: 0,
      mptMockTests: 0,
      mptPastPapers: 0,
      officialPastPapers: 0,
      solvedPapers: 0,
      createdAt: new Date().toISOString()
    }
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch (error) {
        // Silently handle localStorage errors in production
      }
    }
    
    return data
  },

  // Save usage data to localStorage
  saveUsage(data: UsageData): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      // Silently handle localStorage errors in production
    }
  },

  // Increment methods
  incrementCSSSubjectQuiz(): void {
    const usage = this.getUsage()
    usage.cssSubjectQuizzes++
    this.saveUsage(usage)
  },

  incrementCSSIdiomsQuiz(): void {
    const usage = this.getUsage()
    usage.cssIdiomsQuizzes++
    this.saveUsage(usage)
  },

  incrementCSSIdiomsRandom(): void {
    const usage = this.getUsage()
    usage.cssIdiomsRandom++
    this.saveUsage(usage)
  },

  incrementMPTMockTest(): void {
    const usage = this.getUsage()
    usage.mptMockTests++
    this.saveUsage(usage)
  },

  incrementMPTPastPaper(): void {
    const usage = this.getUsage()
    usage.mptPastPapers++
    this.saveUsage(usage)
  },

  incrementOfficialPastPaper(): void {
    const usage = this.getUsage()
    usage.officialPastPapers++
    this.saveUsage(usage)
  },

  incrementSolvedPaper(): void {
    const usage = this.getUsage()
    usage.solvedPapers++
    this.saveUsage(usage)
  },

  // Check methods
  canTakeCSSSubjectQuiz(): boolean {
    const usage = this.getUsage()
    return usage.cssSubjectQuizzes < MAX_CSS_SUBJECT_QUIZZES
  },

  canTakeCSSIdiomsQuiz(): boolean {
    const usage = this.getUsage()
    return usage.cssIdiomsQuizzes < MAX_CSS_IDIOMS_QUIZZES
  },

  canTakeCSSIdiomsRandom(): boolean {
    const usage = this.getUsage()
    return usage.cssIdiomsRandom < MAX_CSS_IDIOMS_RANDOM
  },

  canTakeMPTMockTest(): boolean {
    const usage = this.getUsage()
    return usage.mptMockTests < MAX_MPT_MOCK_TESTS
  },

  canTakeMPTPastPaper(): boolean {
    const usage = this.getUsage()
    return usage.mptPastPapers < MAX_MPT_PAST_PAPERS
  },

  canViewOfficialPastPaper(): boolean {
    const usage = this.getUsage()
    return usage.officialPastPapers < MAX_OFFICIAL_PAST_PAPERS
  },

  canViewSolvedPaper(): boolean {
    const usage = this.getUsage()
    return usage.solvedPapers < MAX_SOLVED_PAPERS
  },

  // Get remaining counts
  getRemaining() {
    const usage = this.getUsage()
    return {
      cssSubjectQuizzes: Math.max(0, MAX_CSS_SUBJECT_QUIZZES - usage.cssSubjectQuizzes),
      cssIdiomsQuizzes: Math.max(0, MAX_CSS_IDIOMS_QUIZZES - usage.cssIdiomsQuizzes),
      cssIdiomsRandom: Math.max(0, MAX_CSS_IDIOMS_RANDOM - usage.cssIdiomsRandom),
      mptMockTests: Math.max(0, MAX_MPT_MOCK_TESTS - usage.mptMockTests),
      mptPastPapers: Math.max(0, MAX_MPT_PAST_PAPERS - usage.mptPastPapers),
      officialPastPapers: Math.max(0, MAX_OFFICIAL_PAST_PAPERS - usage.officialPastPapers),
      solvedPapers: Math.max(0, MAX_SOLVED_PAPERS - usage.solvedPapers)
    }
  },

  // Get max limits (for displaying total available)
  getMaxLimits() {
    return {
      cssSubjectQuizzes: MAX_CSS_SUBJECT_QUIZZES,
      cssIdiomsQuizzes: MAX_CSS_IDIOMS_QUIZZES,
      cssIdiomsRandom: MAX_CSS_IDIOMS_RANDOM,
      mptMockTests: MAX_MPT_MOCK_TESTS,
      mptPastPapers: MAX_MPT_PAST_PAPERS,
      officialPastPapers: MAX_OFFICIAL_PAST_PAPERS,
      solvedPapers: MAX_SOLVED_PAPERS
    }
  },

  // Legacy methods for backward compatibility - always return true
  canTakeCSSQuiz(): boolean {
    return true
  },

  incrementCSSQuiz(): void {
    // No-op
  },

  canTakeMPTTest(): boolean {
    return true
  },

  incrementMPTTest(): void {
    // No-op
  },

  canViewPaper(): boolean {
    return true
  },

  incrementPaperView(): void {
    // No-op
  }
}
