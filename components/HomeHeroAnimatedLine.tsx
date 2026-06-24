'use client'

import { AnimatedText } from '@/components/AnimatedText'

export function HomeHeroAnimatedLine() {
  return (
    <div className="text-center mt-1 pl-0 sm:pl-12 md:pl-24">
      <span className="inline-flex items-baseline gap-3">
        <span>with</span>
        <AnimatedText
          words={['confidence', 'precision', 'intelligence', 'excellence']}
          interval={1400}
        />
      </span>
    </div>
  )
}
