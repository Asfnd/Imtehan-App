'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/** Humans hitting /mcq/* land on practice — SEO HTML stays sr-only in the initial response. */
export function McqHumanRedirect({ to = '/exams' }: { to?: string }) {
  const router = useRouter()

  useEffect(() => {
    router.replace(to)
  }, [router, to])

  return null
}
