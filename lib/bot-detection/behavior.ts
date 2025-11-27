'use client'

interface UserEvent {
  type: 'mousemove' | 'click' | 'keypress' | 'scroll' | 'focus' | 'blur'
  timestamp: number
  position?: { x: number; y: number }
  key?: string
}

interface BotScore {
  score: number
  isBot: boolean
  details: {
    mouseMovements: number
    clickPatterns: number
    typingSpeed: number
    navigationPattern: number
    timeOnPage: number
  }
}

export class BehaviorAnalyzer {
  private events: UserEvent[] = []
  private startTime: number = Date.now()
  private maxEvents: number = 1000

  constructor() {
    if (typeof window !== 'undefined') {
      this.attachListeners()
    }
  }

  private attachListeners() {
    // Track mouse movements
    document.addEventListener('mousemove', (e) => {
      this.trackEvent({
        type: 'mousemove',
        timestamp: Date.now(),
        position: { x: e.clientX, y: e.clientY },
      })
    }, { passive: true })

    // Track clicks
    document.addEventListener('click', (e) => {
      this.trackEvent({
        type: 'click',
        timestamp: Date.now(),
        position: { x: e.clientX, y: e.clientY },
      })
    })

    // Track key presses
    document.addEventListener('keypress', (e) => {
      this.trackEvent({
        type: 'keypress',
        timestamp: Date.now(),
        key: e.key,
      })
    })

    // Track scrolling
    document.addEventListener('scroll', () => {
      this.trackEvent({
        type: 'scroll',
        timestamp: Date.now(),
      })
    }, { passive: true })
  }

  trackEvent(event: UserEvent) {
    this.events.push(event)
    
    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents)
    }
  }

  analyze(): BotScore {
    const details = {
      mouseMovements: this.analyzeMouseMovements(),
      clickPatterns: this.analyzeClickPatterns(),
      typingSpeed: this.analyzeTypingSpeed(),
      navigationPattern: this.analyzeNavigation(),
      timeOnPage: this.analyzeTimeOnPage(),
    }

    const totalScore = Object.values(details).reduce((a, b) => a + b, 0) / 5
    
    return {
      score: totalScore,
      isBot: totalScore > 0.7, // 70% confidence threshold
      details,
    }
  }

  private analyzeMouseMovements(): number {
    const movements = this.events.filter(e => e.type === 'mousemove')
    
    if (movements.length < 10) {
      return 0.8 // Suspicious - too few movements
    }

    // Calculate entropy of movements
    const positions = movements
      .filter(m => m.position)
      .map(m => m.position!)

    if (positions.length < 5) return 0.8

    // Check for linear patterns (bots often move in straight lines)
    let linearCount = 0
    for (let i = 2; i < positions.length; i++) {
      const dx1 = positions[i-1].x - positions[i-2].x
      const dy1 = positions[i-1].y - positions[i-2].y
      const dx2 = positions[i].x - positions[i-1].x
      const dy2 = positions[i].y - positions[i-1].y

      // Check if movement is too linear
      const angle1 = Math.atan2(dy1, dx1)
      const angle2 = Math.atan2(dy2, dx2)
      const angleDiff = Math.abs(angle1 - angle2)

      if (angleDiff < 0.1) { // Very similar angles
        linearCount++
      }
    }

    const linearRatio = linearCount / positions.length
    return linearRatio > 0.7 ? 0.9 : 0.1
  }

  private analyzeClickPatterns(): number {
    const clicks = this.events.filter(e => e.type === 'click')
    
    if (clicks.length < 2) return 0.5

    // Calculate intervals between clicks
    const intervals: number[] = []
    for (let i = 1; i < clicks.length; i++) {
      intervals.push(clicks[i].timestamp - clicks[i-1].timestamp)
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
    const variance = this.calculateVariance(intervals)

    // Bots click too fast or with perfect timing
    if (avgInterval < 100) return 0.9 // Too fast
    if (variance < 50) return 0.9 // Too consistent

    return 0.1
  }

  private analyzeTypingSpeed(): number {
    const keypresses = this.events.filter(e => e.type === 'keypress')
    
    if (keypresses.length < 5) return 0.5

    // Calculate intervals between key presses
    const intervals: number[] = []
    for (let i = 1; i < keypresses.length; i++) {
      intervals.push(keypresses[i].timestamp - keypresses[i-1].timestamp)
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length

    // Bots type too fast or too consistently
    if (avgInterval < 50) return 0.9 // Superhuman speed
    if (avgInterval > 2000) return 0.7 // Too slow

    const variance = this.calculateVariance(intervals)
    if (variance < 20) return 0.8 // Too consistent

    return 0.1
  }

  private analyzeNavigation(): number {
    const timeOnPage = Date.now() - this.startTime
    const eventCount = this.events.length

    // Bots often have very few events or leave immediately
    if (timeOnPage < 2000 && eventCount < 5) {
      return 0.8
    }

    // Normal users have varied interactions
    const eventTypes = new Set(this.events.map(e => e.type))
    if (eventTypes.size < 2) {
      return 0.7 // Only one type of interaction
    }

    return 0.1
  }

  private analyzeTimeOnPage(): number {
    const timeOnPage = Date.now() - this.startTime
    
    // Bots often leave very quickly
    if (timeOnPage < 1000) return 0.9
    if (timeOnPage < 3000) return 0.6

    return 0.1
  }

  private calculateVariance(numbers: number[]): number {
    if (numbers.length === 0) return 0
    
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length
    const squaredDiffs = numbers.map(n => Math.pow(n - mean, 2))
    return squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length
  }

  getEventCount(): number {
    return this.events.length
  }

  getTimeOnPage(): number {
    return Date.now() - this.startTime
  }

  destroy() {
    this.events = []
  }
}

// Singleton instance
let analyzerInstance: BehaviorAnalyzer | null = null

export function getBehaviorAnalyzer(): BehaviorAnalyzer {
  if (!analyzerInstance && typeof window !== 'undefined') {
    analyzerInstance = new BehaviorAnalyzer()
  }
  return analyzerInstance!
}
