import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MDCATMockTest from '@/components/MDCATMockTest'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

// Must stay in sync with maxMocks values in MDCATMockTest.tsx
const MAX_MOCKS: Record<string, number> = {
  pmc:        73,
  uhs:        73,
  szabmu:     73,
  siba:       73,
  bumhs:      73,
  etea:       46,
  nums:       61,
  aku:        46,
  provincial: 73,
}

export default async function MDCATNumberedMockPage({
  params,
}: {
  params: Promise<{ variant: string; mockNumber: string }>
}) {
  const { variant, mockNumber: mockNumStr } = await params

  const maxMocks  = MAX_MOCKS[variant]
  const mockNumber = parseInt(mockNumStr)

  if (!maxMocks || isNaN(mockNumber) || mockNumber < 1 || mockNumber > maxMocks) {
    notFound()
  }

  return <MDCATMockTest variant={variant} mockNumber={mockNumber} />
}
