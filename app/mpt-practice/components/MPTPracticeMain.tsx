'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Target, FileText, ArrowLeft } from 'lucide-react'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'
import { createClient } from '@/lib/supabase/client'
import { useFreeTrial } from '@/lib/hooks/useFreeTrial'

export default function MPTPracticeMain() {
  const router = useRouter()
  const { user, showSignInPopup, setShowSignInPopup } = useFreeTrial()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    pastPapers: '600+',
    liveTests: '3'
  })

  useEffect(() => {
    // Load real-time statistics
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      const supabase = createClient()
      
      // Get MPT past papers count
      const { count: mptCount } = await supabase
        .from('css_mcqs_enhanced')
        .select('*', { count: 'exact', head: true })
        .eq('subject', 'MPT Past Papers')
      
      setStats({
        pastPapers: mptCount ? `${Math.floor(mptCount / 100) * 100}+` : '600+',
        liveTests: '3' // Static for now
      })
    } catch (error) {
      console.error('Error loading statistics:', error)
      // Keep fallback values
    } finally {
      setLoading(false)
    }
  }

  const practiceTypes = [
    {
      id: 'live',
      title: 'MPT Mock Tests',
      description: 'Timed mock exams with real conditions',
      icon: Target,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      route: '/mpt-practice/live',
      stats: `${stats.liveTests} Mock Tests`
    },
    {
      id: 'past-papers',
      title: 'Past MPT Papers',
      description: 'Previous year MPT questions (2022-2025)',
      icon: FileText,
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      route: '/mpt-practice/past-papers',
      stats: `${stats.pastPapers} Questions`
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <DevToolsWarning />
      <SignInPopup
        isOpen={showSignInPopup}
        onClose={() => setShowSignInPopup(false)}
        message="Sign in to continue practicing"
      />
      <ProtectedContent>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
          {/* Clean Header */}
          <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push('/css')}
                  className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium text-sm">Back to Dashboard</span>
                </button>

                <h1 className="text-lg md:text-xl font-semibold text-foreground">MPT Practice</h1>

                <div className="w-32"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 py-8 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Title Section */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                  MPT Practice Modes
                </h2>
                <p className="text-gray-600">Choose how you want to practice for MPT</p>
              </div>

              {/* Practice Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {practiceTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <div
                      key={type.id}
                      className="group relative bg-white rounded-lg border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
                      onClick={() => router.push(type.route)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative p-8 text-center">
                        {/* Icon */}
                        <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">{type.title}</h3>
                        <p className="text-gray-600 mb-6 text-sm">{type.description}</p>

                        {/* Stats */}
                        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                          <div className="text-2xl font-semibold text-blue-600 mb-1">
                            {type.stats.split(' ')[0]}
                          </div>
                          <div className="text-xs text-gray-600 font-medium">{type.stats.split(' ').slice(1).join(' ')}</div>
                        </div>

                        {/* Button */}
                        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all shadow-sm hover:shadow-md">
                          Start Practice
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <FeedbackButton page="mpt-practice" />
        </div>
        
        {/* Custom Styles */}
        <style jsx global>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
          
          /* Smooth performance optimizations */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .backdrop-blur-xl {
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
          }
          
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }
        `}</style>
      </ProtectedContent>
    </>
  )
}