'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight } from 'lucide-react'

interface SmartCTAButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  showIcon?: boolean
}

/**
 * Smart CTA Button Component
 * Automatically routes based on authentication state:
 * - Logged in → /dashboard
 * - Not logged in → /signin
 * Improves UX by preventing redirect loops
 */
export function SmartCTAButton({
  children,
  variant = 'primary',
  className = '',
  showIcon = true,
}: SmartCTAButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check auth state on mount
    setIsChecking(true)
  }, [])

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data } = await supabase.auth.getSession()

      if (data?.session?.user) {
        // User is logged in - go to CSS resources
        router.push('/css')
      } else {
        // User is not logged in - go to signin
        router.push('/signin')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      // Default to signin on error
      router.push('/signin')
    } finally {
      setIsLoading(false)
    }
  }

  const primaryClass =
    'inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'

  const secondaryClass =
    'inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const baseClass = variant === 'primary' ? primaryClass : secondaryClass

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`${baseClass} ${className}`}
      aria-label={typeof children === 'string' ? children : 'Start practicing'}
    >
      {children}
      {showIcon && <ArrowRight className="ml-2 h-5 w-5" />}
    </button>
  )
}
