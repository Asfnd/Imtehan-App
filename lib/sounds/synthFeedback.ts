/**
 * Short Web Audio tones when MP3 assets are missing or still loading.
 * Respects mobile Safari: AudioContext.resume() runs after user gesture (e.g. answering).
 */

export type SynthSoundName = 'correct' | 'incorrect' | 'streakMilestone' | 'quizComplete'

type Ctx = AudioContext

function getContext(): Ctx | null {
  if (typeof window === 'undefined') return null
  const Any = window as unknown as { webkitAudioContext?: typeof AudioContext }
  const Ctor = window.AudioContext || Any.webkitAudioContext
  return Ctor ? new Ctor() : null
}

let sharedCtx: Ctx | null = null

function ensureCtx(): Ctx | null {
  if (!sharedCtx) sharedCtx = getContext()
  return sharedCtx
}

/**
 * Play a lightweight synthesized cue (non-blocking).
 */
export function playSynthFeedback(soundName: SynthSoundName, masterVolume: number): void {
  try {
    const ctx = ensureCtx()
    if (!ctx) return

    const v = Math.max(0.05, Math.min(0.35, masterVolume * 0.28))

    void ctx.resume().then(() => {
      const t0 = ctx.currentTime

      const tone = (
        freq: number,
        start: number,
        dur: number,
        type: OscillatorType = 'sine',
        peak = v,
      ) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = type
        osc.frequency.setValueAtTime(freq, start)
        g.gain.setValueAtTime(0.0001, start)
        g.gain.exponentialRampToValueAtTime(peak, start + 0.015)
        g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
        osc.connect(g)
        g.connect(ctx.destination)
        osc.start(start)
        osc.stop(start + dur + 0.02)
      }

      switch (soundName) {
        case 'correct':
          tone(523.25, t0, 0.1, 'sine', v)
          tone(659.25, t0 + 0.09, 0.12, 'sine', v * 0.95)
          break
        case 'incorrect':
          tone(185, t0, 0.14, 'triangle', v * 0.85)
          tone(155, t0 + 0.1, 0.12, 'triangle', v * 0.7)
          break
        case 'streakMilestone':
          tone(392, t0, 0.08, 'sine', v * 0.9)
          tone(523.25, t0 + 0.07, 0.08, 'sine', v * 0.9)
          tone(659.25, t0 + 0.14, 0.1, 'sine', v)
          tone(783.99, t0 + 0.22, 0.14, 'sine', v)
          break
        case 'quizComplete':
          tone(392, t0, 0.12, 'sine', v * 0.85)
          tone(493.88, t0 + 0.1, 0.12, 'sine', v * 0.85)
          tone(587.33, t0 + 0.2, 0.18, 'sine', v * 0.9)
          break
        default:
          break
      }
    })
  } catch {
    /* ignore */
  }
}
