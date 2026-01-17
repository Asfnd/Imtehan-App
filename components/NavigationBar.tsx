'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Button } from '@/components/ui/Button'

interface NavigationBarProps {
  showEligibilityButton?: boolean
  onEligibilityClick?: () => void
  showCenterNav?: boolean
}

export default function NavigationBar({ showEligibilityButton = false, onEligibilityClick, showCenterNav = true }: NavigationBarProps) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    // Auth state will update automatically via context subscription
    router.push('/')
    router.refresh()
  }

  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL || ''
    const currentPath = window.location.pathname

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent(currentPath)}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })
  }

  const getDisplayName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name.split(' ')[0]
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0]
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  }

  const getFullName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  }

  const getProfileImage = () => {
    // Try different possible fields for profile picture
    return user?.user_metadata?.avatar_url ||
           user?.user_metadata?.picture ||
           null
  }

  const isPremium = user?.user_metadata?.is_premium || false
  const displayName = getDisplayName()
  const fullName = getFullName()
  const profileImage = getProfileImage()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-w-0">
          <img
            src="/favicon.svg"
            alt="Imtehan Logo"
            width={32}
            height={32}
            className="w-8 h-8 flex-shrink-0 object-contain"
          />
          <span className="font-bold text-base sm:text-lg md:text-xl text-gray-900 leading-none whitespace-nowrap">Imtehan</span>
        </Link>

        {/* Centered Navigation - Desktop Only */}
        {showCenterNav && (
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <Link
              href="/css"
              className="px-4 py-2 text-[15px] font-medium text-gray-900 hover:text-gray-700 transition-colors"
            >
              CSS
            </Link>
            <div className="px-4 py-2 text-[15px] font-medium text-gray-400 cursor-not-allowed flex items-center gap-1.5">
              FPSC
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">Soon</span>
            </div>
            <div className="px-4 py-2 text-[15px] font-medium text-gray-400 cursor-not-allowed flex items-center gap-1.5">
              MDCAT
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">Soon</span>
            </div>
          </div>
        )}

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Date Sheet Button (only on CSS dashboard) */}
          {showEligibilityButton && (
            <a
              href="https://cdn.imtehan.com/Date%20Sheet%202026/2026-01-09-10-49-05-Date-Sheet-_-Written-CSS-CE-_-2026_compressed_compressed.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-background border hover:bg-muted rounded-lg transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              title="Download CSS 2026 Date Sheet"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Date Sheet</span>
            </a>
          )}

          {/* CSS Eligibility Button (only on CSS dashboard) */}
          {showEligibilityButton && (
            <button
              onClick={onEligibilityClick}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-background border hover:bg-muted rounded-lg transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              title="Check CSS 2026 Eligibility"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Eligibility</span>
            </button>
          )}

          {/* Auth Button/Profile */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <div className="relative group">
              <button className="flex items-center gap-2.5 px-3 py-1.5 bg-white hover:bg-blue-50/50 border-2 border-blue-100 hover:border-blue-300 rounded-xl transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md">
                {/* Profile Picture with Smooth Loading */}
                <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all">
                  {/* Background with initials - always visible as fallback */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  {/* Profile image overlay - fades in when loaded */}
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt={`Profile picture for ${fullName}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                      style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
                    />
                  )}
                </div>
                <span className="hidden sm:inline font-semibold text-gray-700">{displayName}</span>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="font-semibold text-gray-900">{fullName}</div>
                  <div className="text-xs text-gray-500 mt-1">{user.email}</div>
                  <div className="mt-2">
                    {isPremium ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold">
                         Premium Account
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-medium">
                        Free Trial
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => router.push('/profile')}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="ghost" size="sm" className="h-[42px] px-5 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200">
                  Sign In
                </Button>
              </Link>
              <button
                onClick={handleGoogleSignIn}
                className="h-[42px] px-6 text-[15px] font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {/* Navigation Links */}
            {showCenterNav && (
              <div className="space-y-2 pb-3 border-b border-gray-100">
                <Link
                  href="/css"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-[15px] font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  CSS
                </Link>
                <div className="px-4 py-3 text-[15px] font-medium text-gray-400 cursor-not-allowed flex items-center justify-between rounded-lg bg-gray-50">
                  <span>FPSC</span>
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">Soon</span>
                </div>
                <div className="px-4 py-3 text-[15px] font-medium text-gray-400 cursor-not-allowed flex items-center justify-between rounded-lg bg-gray-50">
                  <span>MDCAT</span>
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">Soon</span>
                </div>
              </div>
            )}

            {/* CSS Action Buttons (Date Sheet & Eligibility) */}
            {showEligibilityButton && (
              <div className="space-y-2 pb-3 border-b border-gray-100">
                <a
                  href="https://cdn.imtehan.com/Date%20Sheet%202026/2026-01-09-10-49-05-Date-Sheet-_-Written-CSS-CE-_-2026_compressed_compressed.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-[15px] font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Date Sheet</span>
                </a>
                <button
                  onClick={() => {
                    onEligibilityClick?.()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-[15px] font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Check Eligibility</span>
                </button>
              </div>
            )}

            {/* Auth Buttons or Profile */}
            {loading ? (
              <div className="w-full h-12 rounded-lg bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="space-y-2 pt-3">
                <div className="px-4 py-3 bg-blue-50 rounded-lg border-2 border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200">
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      {profileImage && (
                        <img
                          src={profileImage}
                          alt={`Profile picture for ${fullName}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">{fullName}</div>
                      <div className="text-xs text-gray-600 truncate">{user.email}</div>
                    </div>
                  </div>
                  {isPremium && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold">
                        ✨ Premium
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    router.push('/profile')
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 text-[15px] text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile
                </button>
                <button
                  onClick={() => {
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 text-[15px] text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-3">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button variant="ghost" className="w-full h-[48px] text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200">
                    Sign In
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    handleGoogleSignIn()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full h-[48px] text-[15px] font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
