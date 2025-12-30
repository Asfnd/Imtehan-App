'use client'

import dynamic from 'next/dynamic'
import SectionLoader from '@/components/loading/SectionLoader'

// Dynamically import the main CSS practice component
const CSSPracticeMain = dynamic(
  () => import('./components/CSSPracticeMain'),
  {
    loading: () => (
      <SectionLoader 
        title="CSS Practice" 
        description="Loading practice modules..."
        color="purple"
      />
    ),
    ssr: false
  }
)

export default function CSSPracticePage() {
  return <CSSPracticeMain />
}