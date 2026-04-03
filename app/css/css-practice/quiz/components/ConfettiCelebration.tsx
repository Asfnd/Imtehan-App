'use client'

import { useEffect, useLayoutEffect, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'

interface ConfettiCelebrationProps {
  trigger: boolean
  burstKey?: number
  intensity?: 'low' | 'medium' | 'high'
  /**
   * `answer` — burst from lower third (above bottom edge), upward fountain.
   * `results` — bottom fountain, long arc, high particle count.
   */
  mode?: 'answer' | 'results'
}

const COLORS = [
  '#6366f1',
  '#818cf8',
  '#a78bfa',
  '#c4b5fd',
  '#e879f9',
  '#f472b6',
  '#fb923c',
  '#fbbf24',
  '#4ade80',
  '#5eead4',
  '#38bdf8',
  '#fcd34d',
  '#f9a8d4',
]

type Shape = 'square' | 'diamond' | 'circle' | 'rect'

function randomShape(): Shape {
  const shapes: Shape[] = ['square', 'diamond', 'circle', 'rect']
  return shapes[Math.floor(Math.random() * shapes.length)]
}

const CENTER = 'translate3d(-50%, -50%, 0)'

/** Flat fills + tiny inset highlight — keeps paint cost low with 100+ particles (smooth 60fps). */
function shapeStyle(shape: Shape, color: string, sizeMul: number): React.CSSProperties {
  const base: React.CSSProperties = {
    backgroundColor: color,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
    border: '1px solid rgba(255,255,255,0.35)',
    transform: CENTER,
  }
  const s = sizeMul
  switch (shape) {
    case 'square':
      return { ...base, width: 9 * s, height: 9 * s, borderRadius: 2 * s }
    case 'diamond':
      return {
        ...base,
        width: 8 * s,
        height: 8 * s,
        borderRadius: 2 * s,
        transform: `${CENTER} rotate(45deg) translateZ(0)`,
      }
    case 'circle':
      return { ...base, width: 8 * s, height: 8 * s, borderRadius: '50%' }
    case 'rect':
      return { ...base, width: 6 * s, height: 11 * s, borderRadius: 2 * s }
  }
}

interface Particle {
  id: number
  color: string
  shape: Shape
  tx: number
  ty: number
  duration: number
  delay: number
  spin: number
}

/** Piecewise-linear keyframes: use linear timing between stops for smooth motion. */
const TIMING_LINEAR = 'linear'
const REDUCED_EASE = 'cubic-bezier(0.33, 1, 0.68, 1)'
/** Softer decel for reduced-motion results */
const EASE_SOFT = 'cubic-bezier(0.19, 1, 0.22, 1)'

export function ConfettiCelebration({
  trigger,
  burstKey = 0,
  intensity = 'medium',
  mode: modeProp,
}: ConfettiCelebrationProps) {
  const mode = modeProp ?? (intensity === 'high' ? 'results' : 'answer')

  const [showConfetti, setShowConfetti] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [portalReady, setPortalReady] = useState(false)

  useLayoutEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!trigger) {
      setShowConfetti(false)
      return
    }
    setShowConfetti(true)
    const base =
      mode === 'results'
        ? intensity === 'high'
          ? 7200
          : intensity === 'medium'
            ? 6400
            : 5400
        : intensity === 'high'
          ? 2400
          : intensity === 'medium'
            ? 2000
            : 1650
    const duration = reduceMotion ? Math.min(base, 900) : base
    const t = window.setTimeout(() => setShowConfetti(false), duration)
    return () => window.clearTimeout(t)
  }, [trigger, burstKey, intensity, reduceMotion, mode])

  const particles = useMemo<Particle[]>(() => {
    const isResults = mode === 'results'
    const count = reduceMotion
      ? isResults
        ? intensity === 'high'
          ? 26
          : 18
        : 12
      : isResults
        ? intensity === 'high'
          ? 120
          : intensity === 'medium'
            ? 92
            : 68
        : intensity === 'high'
          ? 72
          : intensity === 'medium'
            ? 52
            : 36

    return Array.from({ length: count }, (_, i) => {
      let tx: number
      let ty: number
      let dist: number
      let spinAmp: number

      if (isResults) {
        const phase = count > 1 ? i / (count - 1) : 0.5
        const angleDeg = -82 + phase * 164 + (Math.random() - 0.5) * 16
        const rad = (angleDeg * Math.PI) / 180
        dist = 340 + Math.random() * 560 + (i % 6) * 26
        spinAmp = 360 + Math.random() * 80
        const spread = (Math.random() - 0.5) * 100
        tx = Math.sin(rad) * dist + spread
        ty = -Math.cos(rad) * dist * (0.9 + Math.random() * 0.1)
      } else {
        const maxAngleDeg = 62
        const angleDeg = (Math.random() - 0.5) * 2 * maxAngleDeg + (Math.random() - 0.5) * 10
        const rad = (angleDeg * Math.PI) / 180
        dist = 175 + Math.random() * 265 + (i % 6) * 12
        spinAmp = 200 + Math.random() * 160
        tx = Math.sin(rad) * dist + (Math.random() - 0.5) * 36
        ty = -Math.cos(rad) * dist * (0.94 + Math.random() * 0.06)
      }

      const duration = reduceMotion
        ? 0.55 + Math.random() * 0.2
        : isResults
          ? 2.05 + Math.random() * 0.55
          : 0.78 + Math.random() * 0.38

      const delay = reduceMotion
        ? i * 0.02
        : isResults
          ? i * 0.0065 + Math.random() * 0.11
          : i * 0.0032 + Math.random() * 0.036

      const spin = (Math.random() - 0.5) * spinAmp

      return {
        id: i,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: randomShape(),
        tx,
        ty,
        duration,
        delay,
        spin,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burstKey, intensity, reduceMotion, mode])

  if (!showConfetti || !portalReady) return null

  const animName = reduceMotion
    ? 'confettiBurstReduced'
    : mode === 'results'
      ? 'confettiRiseGrand'
      : 'confettiRiseAnswer'

  const particleAnchorClass =
    mode === 'results'
      ? 'absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2'
      : // Low fountain: anchored above the bottom edge (dock / options zone), not screen center
        'absolute bottom-[clamp(4.25rem,17vh,11.5rem)] left-1/2 h-0 w-0 -translate-x-1/2'

  const timingFn =
    reduceMotion ? REDUCED_EASE : mode === 'results' ? TIMING_LINEAR : TIMING_LINEAR

  const shapeScale = mode === 'answer' ? 1.1 : 1

  const layer = (
    <div
      className="confetti-burst-root pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
      style={{ isolation: 'isolate' }}
      aria-hidden
    >
      {mode === 'results' && !reduceMotion ? (
        <div
          className="confetti-ambient-glow absolute inset-0 bg-[radial-gradient(ellipse_130%_75%_at_50%_100%,rgba(255,255,255,0.55)_0%,rgba(199,210,254,0.18)_38%,transparent_65%)]"
          style={{
            animation: `confettiAmbient 2.4s ${EASE_SOFT} forwards`,
            willChange: 'opacity',
          }}
        />
      ) : null}
      {particles.map((p) => (
        <div key={`${p.id}-${burstKey}`} className={particleAnchorClass}>
          <div
            className="confetti-particle-inner"
            style={{
              opacity: 0,
              animation: `${animName} ${p.duration}s ${timingFn} ${p.delay}s forwards`,
              ['--tx' as string]: `${p.tx}px`,
              ['--ty' as string]: `${p.ty}px`,
              ['--spin' as string]: `${p.spin}deg`,
            }}
          >
            <div style={shapeStyle(p.shape, p.color, shapeScale)} />
          </div>
        </div>
      ))}
    </div>
  )

  return createPortal(layer, document.body)
}
