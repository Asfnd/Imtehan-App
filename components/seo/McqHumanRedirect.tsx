'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/** Humans hitting /mcq/* redirect instantly — no SEO text, just a brief app spinner. */
export function McqHumanRedirect({ to = '/exams' }: { to?: string }) {
  const router = useRouter()

  useEffect(() => {
    router.replace(to)
  }, [router, to])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center" aria-busy="true" aria-label="Loading">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
    </div>
  )
}
