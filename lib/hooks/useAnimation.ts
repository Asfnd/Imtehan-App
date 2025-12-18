/**
 * CSS Animation Hook - Replacement for Framer Motion
 * Provides easy access to CSS animation classes
 */

import { useEffect, useState } from 'react'

export type AnimationType = 
  | 'fadeIn' 
  | 'fadeInSlow'
  | 'slideUp' 
  | 'slideDown' 
  | 'slideLeft' 
  | 'slideRight'
  | 'scaleIn' 
  | 'scaleOut' 
  | 'bounce' 
  | 'pulse' 
  | 'spin'
  | 'modalIn'
  | 'modalOut'
  | 'backdropIn'
  | 'backdropOut'

export type HoverType = 
  | 'scale' 
  | 'scaleSm' 
  | 'lift' 
  | 'liftLg'

export type TransitionType = 
  | 'all' 
  | 'fast' 
  | 'slow'

interface UseAnimationOptions {
  delay?: number
  duration?: number
  trigger?: boolean
}

/**
 * Hook to get CSS animation class names
 */
export function useAnimation(
  type: AnimationType, 
  options: UseAnimationOptions = {}
): string {
  const { delay = 0, trigger = true } = options
  const [shouldAnimate, setShouldAnimate] = useState(!trigger)

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setShouldAnimate(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [trigger, delay])

  if (!shouldAnimate) {
    return ''
  }

  const animationMap: Record<AnimationType, string> = {
    fadeIn: 'animate-fade-in',
    fadeInSlow: 'animate-fade-in-slow',
    slideUp: 'animate-slide-up',
    slideDown: 'animate-slide-down',
    slideLeft: 'animate-slide-left',
    slideRight: 'animate-slide-right',
    scaleIn: 'animate-scale-in',
    scaleOut: 'animate-scale-out',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    modalIn: 'animate-modal-in',
    modalOut: 'animate-modal-out',
    backdropIn: 'animate-backdrop-in',
    backdropOut: 'animate-backdrop-out',
  }

  return animationMap[type] || ''
}

/**
 * Hook for hover animations
 */
export function useHoverAnimation(type: HoverType): string {
  const hoverMap: Record<HoverType, string> = {
    scale: 'hover-scale',
    scaleSm: 'hover-scale-sm',
    lift: 'hover-lift',
    liftLg: 'hover-lift-lg',
  }

  return hoverMap[type] || ''
}

/**
 * Hook for transition classes
 */
export function useTransition(type: TransitionType): string {
  const transitionMap: Record<TransitionType, string> = {
    all: 'transition-all',
    fast: 'transition-fast',
    slow: 'transition-slow',
  }

  return transitionMap[type] || ''
}

/**
 * Hook for staggered animations (for lists)
 */
export function useStaggerAnimation(): string {
  return 'animate-stagger'
}

/**
 * Utility function to combine animation classes
 */
export function combineAnimations(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Hook for conditional animations based on state
 */
export function useConditionalAnimation(
  condition: boolean,
  trueAnimation: AnimationType,
  falseAnimation?: AnimationType
): string {
  const trueClass = useAnimation(trueAnimation, { trigger: condition })
  const falseClass = falseAnimation ? useAnimation(falseAnimation, { trigger: !condition }) : ''
  
  return condition ? trueClass : falseClass
}