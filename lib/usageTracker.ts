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
const STORAGE_KEY_SIGNED_IN = 'quiz_usage_signed_in'

// GUEST USER LIMITS - PERSISTENT ACROSS SESSIONS (NEVER RESET)
const GUEST_MAX_CSS_SUBJECT = 3
const GUEST_MAX_CSS_IDIOMS = 1
const GUEST_MAX_CSS_IDIOMS_RANDOM = 1
const GUEST_MAX_MPT_MOCK = 1
const GUEST_MAX_MPT_PAST = 1
const GUEST_MAX_OFFICIAL_PAST = 3
const GUEST_MAX_SOLVED = 0

// SIGNED-IN FREE USER LIMITS (POST SIGN-IN CREDITS)
const SIGNEDIN_MAX_CSS_SUBJECT = 2
const SIGNEDIN_MAX_CSS_IDIOMS = 1
const SIGNEDIN_MAX_CSS_IDIOMS_RANDOM = 1
const SIGNEDIN_MAX_MPT_MOCK = 1
const SIGNEDIN_MAX_MPT_PAST = 1
const SIGNEDIN_MAX_OFFICIAL_PAST = 2
const SIGNEDIN_MAX_SOLVED = 0  // Premium only

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

  // Increment methods - now accept isSignedIn parameter
  incrementCSSSubjectQuiz(isSignedIn: boolean = false): void {
    if (isSignedIn) {
      const usage = this.getSignedInUsage()
      usage.cssSubjectQuizzes++
      this.saveSignedInUsage(usage)
    } else {
      const usage = this.getUsage()
      usage.cssSubjectQuizzes++
      this.saveUsage(usage)
    }
  },

  incrementCSSIdiomsQuiz(isSignedIn: boolean = false): void {
    if (isSignedIn) {
      const usage = this.getSignedInUsage()
      usage.cssIdiomsQuizzes++
      this.saveSignedInUsage(usage)
    } else {
      const usage = this.getUsage()
      usage.cssIdiomsQuizzes++
      this.saveUsage(usage)
    }
  },

  incrementCSSIdiomsRandom(isSignedIn: boolean = false): void {
    if (isSignedIn) {
      const usage = this.getSignedInUsage()
      usage.cssIdiomsRandom++
      this.saveSignedInUsage(usage)
    } else {
      const usage = this.getUsage()
      usage.cssIdiomsRandom++
      this.saveUsage(usage)
    }
  },

  incrementMPTMockTest(isSignedIn: boolean = false): void {
    if (isSignedIn) {
      const usage = this.getSignedInUsage()
      usage.mptMockTests++
      this.saveSignedInUsage(usage)
    } else {
      const usage = this.getUsage()
      usage.mptMockTests++
      this.saveUsage(usage)
    }
  },

  incrementMPTPastPaper(isSignedIn: boolean = false): void {
    if (isSignedIn) {
      const usage = this.getSignedInUsage()
      usage.mptPastPapers++
      this.saveSignedInUsage(usage)
    } else {
      const usage = this.getUsage()
      usage.mptPastPapers++
      this.saveUsage(usage)
    }
  },

  incrementOfficialPastPaper(isSignedIn: boolean = false): void {
    if (isSignedIn) {
      const usage = this.getSignedInUsage()
      usage.officialPastPapers++
      this.saveSignedInUsage(usage)
    } else {
      const usage = this.getUsage()
      usage.officialPastPapers++
      this.saveUsage(usage)
    }
  },

  incrementSolvedPaper(isSignedIn: boolean = false): void {
    if (isSignedIn) {
      const usage = this.getSignedInUsage()
      usage.solvedPapers++
      this.saveSignedInUsage(usage)
    } else {
      const usage = this.getUsage()
      usage.solvedPapers++
      this.saveUsage(usage)
    }
  },

  // Get usage for signed-in users
  getSignedInUsage(): UsageData {
    if (typeof window === 'undefined') return this.initUsage()

    try {
      const stored = localStorage.getItem(STORAGE_KEY_SIGNED_IN)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      // Silently handle localStorage errors
    }

    return this.initUsage()
  },

  // Save signed-in user usage
  saveSignedInUsage(data: UsageData): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(STORAGE_KEY_SIGNED_IN, JSON.stringify(data))
    } catch (error) {
      // Silently handle localStorage errors
    }
  },

  // Check methods - now accept isSignedIn parameter
  canTakeCSSSubjectQuiz(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNEDIN_MAX_CSS_SUBJECT : GUEST_MAX_CSS_SUBJECT
    return usage.cssSubjectQuizzes < max
  },

  canTakeCSSIdiomsQuiz(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNEDIN_MAX_CSS_IDIOMS : GUEST_MAX_CSS_IDIOMS
    return usage.cssIdiomsQuizzes < max
  },

  canTakeCSSIdiomsRandom(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNEDIN_MAX_CSS_IDIOMS_RANDOM : GUEST_MAX_CSS_IDIOMS_RANDOM
    return usage.cssIdiomsRandom < max
  },

  canTakeMPTMockTest(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNEDIN_MAX_MPT_MOCK : GUEST_MAX_MPT_MOCK
    return usage.mptMockTests < max
  },

  canTakeMPTPastPaper(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNEDIN_MAX_MPT_PAST : GUEST_MAX_MPT_PAST
    return usage.mptPastPapers < max
  },

  canViewOfficialPastPaper(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNEDIN_MAX_OFFICIAL_PAST : GUEST_MAX_OFFICIAL_PAST
    return usage.officialPastPapers < max
  },

  canViewSolvedPaper(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNEDIN_MAX_SOLVED : GUEST_MAX_SOLVED
    return usage.solvedPapers < max
  },

  // Get remaining counts
  getRemaining(isSignedIn: boolean = false) {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const limits = isSignedIn ? {
      cssSubject: SIGNEDIN_MAX_CSS_SUBJECT,
      cssIdioms: SIGNEDIN_MAX_CSS_IDIOMS,
      cssIdiomsRandom: SIGNEDIN_MAX_CSS_IDIOMS_RANDOM,
      mptMock: SIGNEDIN_MAX_MPT_MOCK,
      mptPast: SIGNEDIN_MAX_MPT_PAST,
      officialPast: SIGNEDIN_MAX_OFFICIAL_PAST,
      solved: SIGNEDIN_MAX_SOLVED
    } : {
      cssSubject: GUEST_MAX_CSS_SUBJECT,
      cssIdioms: GUEST_MAX_CSS_IDIOMS,
      cssIdiomsRandom: GUEST_MAX_CSS_IDIOMS_RANDOM,
      mptMock: GUEST_MAX_MPT_MOCK,
      mptPast: GUEST_MAX_MPT_PAST,
      officialPast: GUEST_MAX_OFFICIAL_PAST,
      solved: GUEST_MAX_SOLVED
    }

    return {
      cssSubjectQuizzes: Math.max(0, limits.cssSubject - usage.cssSubjectQuizzes),
      cssIdiomsQuizzes: Math.max(0, limits.cssIdioms - usage.cssIdiomsQuizzes),
      cssIdiomsRandom: Math.max(0, limits.cssIdiomsRandom - usage.cssIdiomsRandom),
      mptMockTests: Math.max(0, limits.mptMock - usage.mptMockTests),
      mptPastPapers: Math.max(0, limits.mptPast - usage.mptPastPapers),
      officialPastPapers: Math.max(0, limits.officialPast - usage.officialPastPapers),
      solvedPapers: Math.max(0, limits.solved - usage.solvedPapers)
    }
  },

  // Get max limits (for displaying total available)
  getMaxLimits(isSignedIn: boolean = false) {
    return isSignedIn ? {
      cssSubjectQuizzes: SIGNEDIN_MAX_CSS_SUBJECT,
      cssIdiomsQuizzes: SIGNEDIN_MAX_CSS_IDIOMS,
      cssIdiomsRandom: SIGNEDIN_MAX_CSS_IDIOMS_RANDOM,
      mptMockTests: SIGNEDIN_MAX_MPT_MOCK,
      mptPastPapers: SIGNEDIN_MAX_MPT_PAST,
      officialPastPapers: SIGNEDIN_MAX_OFFICIAL_PAST,
      solvedPapers: SIGNEDIN_MAX_SOLVED
    } : {
      cssSubjectQuizzes: GUEST_MAX_CSS_SUBJECT,
      cssIdiomsQuizzes: GUEST_MAX_CSS_IDIOMS,
      cssIdiomsRandom: GUEST_MAX_CSS_IDIOMS_RANDOM,
      mptMockTests: GUEST_MAX_MPT_MOCK,
      mptPastPapers: GUEST_MAX_MPT_PAST,
      officialPastPapers: GUEST_MAX_OFFICIAL_PAST,
      solvedPapers: GUEST_MAX_SOLVED
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
