'use client'

import dynamic from 'next/dynamic'
import NavigationBar from '@/components/NavigationBar'

const CSSExamCountdown = dynamic(
  () => import('@/components/CSSExamCountdown').then((m) => ({ default: m.CSSExamCountdown })),
  { ssr: false },
)

export function HomeNavStrip() {
  return (
    <>
      <NavigationBar />
      <CSSExamCountdown />
    </>
  )
}
