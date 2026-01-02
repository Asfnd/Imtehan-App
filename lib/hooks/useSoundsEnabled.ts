'use client'

import { usePathname } from 'next/navigation'

/**
 * Hook to determine if sounds should be enabled based on quiz type
 * Sounds are enabled for all MCQ quizzes EXCEPT MPT mock tests
 *
 * Returns true if sounds should be played, false if disabled
 */
export function useSoundsEnabled(): boolean {
  const pathname = usePathname()

  // Disable sounds for MPT mock tests
  // Enable sounds for all other quizzes (CSS, General, etc.)
  const isMPTMockTest = pathname.includes('/mpt-practice/')

  return !isMPTMockTest
}
