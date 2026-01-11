'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to manage CSRF tokens for form submissions
 * Automatically fetches and refreshes tokens
 */
export function useCSRFToken() {
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchToken = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/csrf-token', {
        method: 'GET',
        credentials: 'include', // Include cookies
      })

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token')
      }

      const data = await response.json()
      setToken(data.token)
    } catch (err) {
      console.error('Error fetching CSRF token:', err)
      setError('Failed to load security token')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Fetch token on mount
    fetchToken()

    // Refresh token every 30 minutes (token is valid for 1 hour)
    const interval = setInterval(() => {
      fetchToken()
    }, 30 * 60 * 1000) // 30 minutes

    return () => clearInterval(interval)
  }, [])

  return { token, loading, error, refetch: fetchToken }
}
