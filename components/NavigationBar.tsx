'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Menu, X, LayoutGrid, ChevronDown, MessageSquare, Pin } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { trackLogin } from '@/lib/analytics/events'
import { isActivePremium } from '@/lib/is-active-premium'
import { PlayStoreButton } from '@/components/PlayStoreButton'
import { INSTAGRAM_URL } from '@/lib/routes'
import { ExamBrowseMenu } from '@/components/ExamBrowseMenu'

function InstagramFollowButton({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-10 w-10' : 'h-[42px] w-[42px]'
  const icon = size === 'sm' ? 'h-[18px] w-[18px]' : 'h-5 w-5'
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex ${box} shrink-0 items-center justify-center rounded-xl border border-gray-200/90 bg-white text-[#E1306C] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-rose-200 hover:bg-rose-50 hover:text-[#C13584] hover:shadow-[0_2px_8px_rgba(225,48,108,0.12)] active:scale-[0.97]`}
      aria-label="Follow Imtehan on Instagram"
      title="Follow @imtehanofficial"
    >
      <svg className={icon} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </a>
  )
}

type PinnedExam = { key: string; label: string; href: string }

function usePinnedExam() {
  const [pinned, setPinned] = useState<PinnedExam | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pinnedExam')
      if (stored) setPinned(JSON.parse(stored))
    } catch {}

    function handler(e: Event) {
      setPinned((e as CustomEvent<PinnedExam | null>).detail)
    }
    window.addEventListener('pinnedExamChanged', handler)
    return () => window.removeEventListener('pinnedExamChanged', handler)
  }, [])

  function unpin() {
    localStorage.removeItem('pinnedExam')
    setPinned(null)
    window.dispatchEvent(new CustomEvent('pinnedExamChanged', { detail: null }))
  }

  return { pinned, unpin }
}

interface NavigationBarProps {
  showEligibilityButton?: boolean
  onEligibilityClick?: () => void
  showGuideButton?: boolean
  onGuideClick?: () => void
  guideButtonLabel?: string
  guideButtonTitle?: string
  showCenterNav?: boolean
  centerContent?: React.ReactNode
}

export default function NavigationBar({
  showEligibilityButton = false,
  onEligibilityClick,
  showGuideButton = false,
  onGuideClick,
  guideButtonLabel = 'Test Guide',
  guideButtonTitle = 'Open test guide',
  showCenterNav = true,
  centerContent,
}: NavigationBarProps) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { pinned, unpin } = usePinnedExam()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [examDropdownOpen, setExamDropdownOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const examDropdownRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (examDropdownRef.current && !examDropdownRef.current.contains(e.target as Node)) {
        setExamDropdownOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setExamDropdownOpen(false)
        setProfileOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

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
    trackLogin('google')

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

  const isPremium = isActivePremium(user)
  const displayName = getDisplayName()
  const fullName = getFullName()
  const profileImage = getProfileImage()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between">
        {/* Logo + Play Store + Pinned Exam */}
        <div className="flex items-center gap-0 flex-shrink-0 min-w-0">
          <Link href="/" className="flex items-center gap-2 min-w-0 flex-shrink-0">
            <img
              src="/favicon.svg"
              alt="Imtehan Logo"
              width={32}
              height={32}
              className="w-8 h-8 flex-shrink-0 object-contain"
            />
            <span className="font-bold text-base sm:text-lg md:text-xl text-gray-900 leading-none whitespace-nowrap">Imtehan</span>
          </Link>
          <div className="ml-2 sm:ml-3 pl-2 sm:pl-3 border-l border-gray-200 flex-shrink-0">
            <PlayStoreButton size="lg" />
          </div>
          {pinned && (
            <div className="hidden md:flex items-center gap-1.5 ml-3 pl-3 border-l border-gray-200">
              <Link
                href={pinned.href}
                className="flex items-center gap-1.5 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors max-w-[140px] truncate"
                title={pinned.label}
              >
                <Pin className="w-3 h-3 fill-current text-gray-400 shrink-0" />
                <span className="truncate">{pinned.label}</span>
              </Link>
              <button
                onClick={unpin}
                title="Unpin"
                className="text-gray-300 hover:text-gray-500 transition-colors p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Center: Browse Exams + Blog + Community, or custom centerContent */}
        <div className={`hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2 ${!showCenterNav && !centerContent ? 'invisible' : ''}`}>
          {centerContent ? centerContent : (
            <>
              {/* Browse Exams dropdown */}
              <div ref={examDropdownRef} className="relative">
                <button
                  onClick={() => setExamDropdownOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200 text-sm font-semibold whitespace-nowrap"
                >
                  <LayoutGrid className="w-4 h-4 flex-shrink-0" />
                  <span>Browse Exams</span>
                  <ChevronDown className={`w-3.5 h-3.5 opacity-80 transition-transform duration-200 ${examDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {examDropdownOpen && (
                  <div className="absolute top-full left-1/2 z-50 mt-2.5 w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl border-2 border-gray-300 bg-white p-5 shadow-xl">
                    <ExamBrowseMenu onNavigate={() => setExamDropdownOpen(false)} />
                  </div>
                )}
              </div>

              {/* Notes */}
              <Link
                href="/notes"
                className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all duration-200 text-sm font-semibold whitespace-nowrap"
              >
                Notes
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all duration-200 text-sm font-semibold whitespace-nowrap"
              >
                Blog
              </Link>

              {/* Community */}
              <Link
                href="/community"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all duration-200 text-sm font-semibold whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                Community Chat
              </Link>
            </>
          )}
        </div>

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

          {/* Test Guide Button (dynamic exam pages) */}
          {showGuideButton && (
            <button
              onClick={onGuideClick}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-background border hover:bg-muted rounded-lg transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              title={guideButtonTitle}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
              </svg>
              <span>{guideButtonLabel}</span>
            </button>
          )}

          <InstagramFollowButton />

          {/* Auth Button/Profile */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2.5 px-3 py-1.5 bg-white hover:bg-blue-50/50 border-2 border-blue-100 hover:border-blue-300 rounded-xl transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
              >
                {/* Profile Picture with Smooth Loading */}
                <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-100 transition-all">
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
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180 text-blue-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
              <div role="menu" className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
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
                <Link
                  href="/profile"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setProfileOpen(false)
                    void handleSignOut()
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
              )}
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

        {/* Mobile: Instagram + hamburger */}
        <div className="flex items-center gap-0.5 md:hidden">
          <InstagramFollowButton size="sm" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {/* Pinned Exam */}
            {pinned && (
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg border border-gray-200">
                <Link
                  href={pinned.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-800"
                >
                  <Pin className="w-3.5 h-3.5 fill-current text-gray-500 shrink-0" />
                  <span>{pinned.label}</span>
                </Link>
                <button onClick={unpin} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {/* Custom center content (e.g. Grade My Essay button) */}
            {centerContent && (
              <div className="pb-3 border-b border-gray-100">
                {centerContent}
              </div>
            )}
            {/* Navigation Links */}
            {showCenterNav && (
              <div className="pb-3 border-b border-gray-100">
                <ExamBrowseMenu compact onNavigate={() => setMobileMenuOpen(false)} className="max-h-[min(60vh,480px)] overflow-y-auto overscroll-contain" />
                <Link
                  href="/community"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 mt-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  Community Chat
                  <span className="ml-auto flex items-center gap-1 text-xs text-green-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                    Live
                  </span>
                </Link>
                <Link
                  href="/notes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Notes
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
                  </svg>
                  Blog
                </Link>
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

            {/* Dynamic Guide Button */}
            {showGuideButton && (
              <div className="space-y-2 pb-3 border-b border-gray-100">
                <button
                  onClick={() => {
                    onGuideClick?.()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-[15px] font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                  </svg>
                  <span>{guideButtonLabel}</span>
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
