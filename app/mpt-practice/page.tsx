'use client'

import dynamic from 'next/dynamic'
import SectionLoader from '@/components/loading/SectionLoader'

// Dynamically import the main MPT practice component
const MPTPracticeMain = dynamic(
  () => import('./components/MPTPracticeMain'),
  {
    loading: () => (
      <SectionLoader 
        title="MPT Practice" 
        description="Loading mock tests and past papers..."
        color="blue"
      />
    ),
    ssr: false
  }
)

export default function MPTPracticePage() {
  return <MPTPracticeMain />
}