/**
 * Sound Manager for Quiz Gamification
 * Ultra-optimized for mobile with instant playback.
 * Uses MP3s from /public/sounds when present; otherwise Web Audio synth cues.
 */

import { playSynthFeedback } from './synthFeedback'

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
      // Keep enabled — synth fallback still works without MP3 files
    }
  }

  /**
   * Play a specific sound - Ultra-optimized for instant mobile playback
   * Uses audio pooling for zero-lag playback
   */
  play(soundName: SoundName): void {
    if (!this.enabled) {
      return
    }

    const original = this.sounds.get(soundName)

    // MP3 loaded — use pooled playback (works best after preload, but not required)
    if (original) {
      let pool = this.audioPool.get(soundName)
      if (!pool) {
        pool = []
        this.audioPool.set(soundName, pool)
      }

      let audio = pool.find(a => a.paused || a.ended)

      if (!audio) {
        audio = new Audio(original.src)
        audio.volume = this.volume
        audio.preload = 'auto'
        pool.push(audio)
        if (pool.length > 3) {
          pool.shift()
        }
      }

      audio.currentTime = 0
      audio.volume = this.volume
      audio.play().catch(() => {
        playSynthFeedback(soundName, this.volume)
      })
      return
    }

    // No file (missing / still loading) — immediate synth feedback
    playSynthFeedback(soundName, this.volume)
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
   * Stop all currently playing sounds (including audio pool instances)
   */
  stopAll(): void {
    // Stop main sounds
    this.sounds.forEach((audio) => {
      audio.pause()
      audio.currentTime = 0
    })

    // Stop all audio pool instances
    this.audioPool.forEach((pool) => {
      pool.forEach((audio) => {
        audio.pause()
        audio.currentTime = 0
      })
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
