// Persistent usage tracker using localStorage
// Tracks anonymous user limits before sign-up
// ONE-TIME TRIAL: Never resets, maintains history across sessions
// Funnel: 1 demo credit → sign-in → premium (signed-in free has 0 local credits)

import { GUEST_LIMITS, SIGNED_IN_LIMITS } from '@/lib/free-trial-limits'

interface UsageData {
  cssSubjectQuizzes: number
  cssIdiomsQuizzes: number
  cssIdiomsRandom: number
  mptMockTests: number
  mptPastPapers: number
  officialPastPapers: number
  solvedPapers: number
  createdAt: string
}

const STORAGE_KEY = 'quiz_usage'
const STORAGE_KEY_SIGNED_IN = 'quiz_usage_signed_in'

export const usageTracker = {
  getUsage(): UsageData {
    if (typeof window === 'undefined') return this.initUsage()

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // ignore
    }

    return this.initUsage()
  },

  initUsage(): UsageData {
    const data = {
      cssSubjectQuizzes: 0,
      cssIdiomsQuizzes: 0,
      cssIdiomsRandom: 0,
      mptMockTests: 0,
      mptPastPapers: 0,
      officialPastPapers: 0,
      solvedPapers: 0,
      createdAt: new Date().toISOString(),
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch {
        // ignore
      }
    }

    return data
  },

  saveUsage(data: UsageData): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // ignore
    }
  },

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

  getSignedInUsage(): UsageData {
    if (typeof window === 'undefined') return this.initUsage()

    try {
      const stored = localStorage.getItem(STORAGE_KEY_SIGNED_IN)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // ignore
    }

    return this.initUsage()
  },

  saveSignedInUsage(data: UsageData): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(STORAGE_KEY_SIGNED_IN, JSON.stringify(data))
    } catch {
      // ignore
    }
  },

  canTakeCSSSubjectQuiz(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNED_IN_LIMITS.cssSubject : GUEST_LIMITS.cssSubject
    return usage.cssSubjectQuizzes < max
  },

  canTakeCSSIdiomsQuiz(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNED_IN_LIMITS.cssIdioms : GUEST_LIMITS.cssIdioms
    return usage.cssIdiomsQuizzes < max
  },

  canTakeCSSIdiomsRandom(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNED_IN_LIMITS.cssIdiomsRandom : GUEST_LIMITS.cssIdiomsRandom
    return usage.cssIdiomsRandom < max
  },

  canTakeMPTMockTest(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNED_IN_LIMITS.mptMock : GUEST_LIMITS.mptMock
    return usage.mptMockTests < max
  },

  canTakeMPTPastPaper(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNED_IN_LIMITS.mptPast : GUEST_LIMITS.mptPast
    return usage.mptPastPapers < max
  },

  canViewOfficialPastPaper(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNED_IN_LIMITS.officialPast : GUEST_LIMITS.officialPast
    return usage.officialPastPapers < max
  },

  canViewSolvedPaper(isSignedIn: boolean = false): boolean {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const max = isSignedIn ? SIGNED_IN_LIMITS.solved : GUEST_LIMITS.solved
    return usage.solvedPapers < max
  },

  getRemaining(isSignedIn: boolean = false) {
    const usage = isSignedIn ? this.getSignedInUsage() : this.getUsage()
    const limits = isSignedIn ? SIGNED_IN_LIMITS : GUEST_LIMITS

    return {
      cssSubjectQuizzes: Math.max(0, limits.cssSubject - usage.cssSubjectQuizzes),
      cssIdiomsQuizzes: Math.max(0, limits.cssIdioms - usage.cssIdiomsQuizzes),
      cssIdiomsRandom: Math.max(0, limits.cssIdiomsRandom - usage.cssIdiomsRandom),
      mptMockTests: Math.max(0, limits.mptMock - usage.mptMockTests),
      mptPastPapers: Math.max(0, limits.mptPast - usage.mptPastPapers),
      officialPastPapers: Math.max(0, limits.officialPast - usage.officialPastPapers),
      solvedPapers: Math.max(0, limits.solved - usage.solvedPapers),
    }
  },

  getMaxLimits(isSignedIn: boolean = false) {
    const limits = isSignedIn ? SIGNED_IN_LIMITS : GUEST_LIMITS
    return {
      cssSubjectQuizzes: limits.cssSubject,
      cssIdiomsQuizzes: limits.cssIdioms,
      cssIdiomsRandom: limits.cssIdiomsRandom,
      mptMockTests: limits.mptMock,
      mptPastPapers: limits.mptPast,
      officialPastPapers: limits.officialPast,
      solvedPapers: limits.solved,
    }
  },

  canTakeCSSQuiz(): boolean {
    return true
  },

  incrementCSSQuiz(): void {},

  canTakeMPTTest(): boolean {
    return true
  },

  incrementMPTTest(): void {},

  canViewPaper(): boolean {
    return true
  },

  incrementPaperView(): void {},
}
