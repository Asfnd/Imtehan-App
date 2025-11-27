/**
 * Sound Manager for Quiz Gamification
 * Ultra-optimized for mobile with instant playback
 */

export interface SoundConfig {
  correct: string
  incorrect: string
  streakMilestone: string
  quizComplete: string
}

export interface SoundManagerOptions {
  volume: number
  enabled: boolean
}

export type SoundName = keyof SoundConfig

class SoundManager {
  private sounds: Map<SoundName, HTMLAudioElement>
  private enabled: boolean
  private volume: number
  private isPreloaded: boolean
  private audioPool: Map<SoundName, HTMLAudioElement[]> = new Map()

  constructor(
    private config: SoundConfig,
    options: SoundManagerOptions = { volume: 0.7, enabled: true }
  ) {
    this.sounds = new Map()
    this.enabled = options.enabled
    this.volume = options.volume
    this.isPreloaded = false

    // Load enabled state from localStorage if available
    if (typeof window !== 'undefined') {
      const savedEnabled = localStorage.getItem('soundEnabled')
      if (savedEnabled !== null) {
        this.enabled = savedEnabled === 'true'
      }
    }
  }

  /**
   * Preload all sound files
   * Should be called once when the quiz page loads
   */
  async preload(): Promise<void> {
    if (this.isPreloaded) {
      return
    }

    try {
      const soundEntries = Object.entries(this.config) as [SoundName, string][]

      await Promise.all(
        soundEntries.map(([name, path]) => {
          return new Promise<void>((resolve, reject) => {
            const audio = new Audio(path)
            audio.volume = this.volume
            audio.preload = 'auto'

            // Handle successful load
            audio.addEventListener('canplaythrough', () => {
              this.sounds.set(name, audio)
              resolve()
            })

            // Handle load error
            audio.addEventListener('error', (e) => {
              console.warn(`Failed to load sound: ${name} from ${path}`, e)
              // Don't reject - allow app to continue without this sound
              resolve()
            })

            // Start loading
            audio.load()
          })
        })
      )

      this.isPreloaded = true
      console.log('✅ All sounds preloaded successfully')
    } catch (error) {
      console.error('Error preloading sounds:', error)
      // Don't throw - allow app to continue without sounds
      this.enabled = false
    }
  }

  /**
   * Play a specific sound - Ultra-optimized for instant mobile playback
   * Uses audio pooling for zero-lag playback
   */
  play(soundName: SoundName): void {
    if (!this.enabled || !this.isPreloaded) {
      return
    }

    // Get or create audio pool for this sound
    let pool = this.audioPool.get(soundName)
    if (!pool) {
      pool = []
      this.audioPool.set(soundName, pool)
    }

    // Find an available audio element from pool
    let audio = pool.find(a => a.paused || a.ended)
    
    if (!audio) {
      // Create new audio element if none available
      const original = this.sounds.get(soundName)
      if (!original) return
      
      audio = new Audio(original.src)
      audio.volume = this.volume
      audio.preload = 'auto'
      pool.push(audio)
      
      // Limit pool size to 3 per sound
      if (pool.length > 3) {
        pool.shift()
      }
    }

    // Instant playback
    audio.currentTime = 0
    audio.volume = this.volume
    audio.play().catch(() => {})
  }

  /**
   * Enable or disable all sounds
   * @param enabled - Whether sounds should be enabled
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEnabled', String(enabled))
    }
  }

  /**
   * Set the volume for all sounds
   * @param volume - Volume level (0-1)
   */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume))

    // Update volume for all loaded sounds
    this.sounds.forEach((audio) => {
      audio.volume = this.volume
    })
  }

  /**
   * Get current enabled state
   */
  isEnabled(): boolean {
    return this.enabled
  }

  /**
   * Get current volume
   */
  getVolume(): number {
    return this.volume
  }

  /**
   * Check if sounds are preloaded
   */
  isReady(): boolean {
    return this.isPreloaded
  }

  /**
   * Stop all currently playing sounds
   */
  stopAll(): void {
    this.sounds.forEach((audio) => {
      audio.pause()
      audio.currentTime = 0
    })
  }
}

// Create and export singleton instance
export const soundManager = new SoundManager(
  {
    correct: '/sounds/correct.mp3',
    incorrect: '/sounds/incorrect.mp3',
    streakMilestone: '/sounds/streak-milestone.mp3',
    quizComplete: '/sounds/quiz-complete.mp3',
  },
  {
    volume: 0.7,
    enabled: true,
  }
)

// Export the class for testing purposes
export { SoundManager }
