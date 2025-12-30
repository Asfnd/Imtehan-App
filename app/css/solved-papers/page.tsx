'use client'

import dynamic from 'next/dynamic'
import SectionLoader from '@/components/loading/SectionLoader'

// Dynamically import the main solved papers component
const SolvedPapersMain = dynamic(
  () => import('./components/SolvedPapersMain'),
  {
    loading: () => (
      <SectionLoader 
        title="Solved Papers" 
        description="Loading solved examination papers..."
        color="orange"
      />
    ),
    ssr: false
  }
)

export default function SolvedPapersPage() {
  return <SolvedPapersMain />
}