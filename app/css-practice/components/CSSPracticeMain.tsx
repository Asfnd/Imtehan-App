'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, MessageSquare, ArrowLeft } from 'lucide-react'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'
import { useFreeTrial } from '@/lib/hooks/useFreeTrial'

export default function CSSPracticeMain() {
  const router = useRouter()
  const { user, loading, showSignInPopup, setShowSignInPopup } = useFreeTrial()
  const [stats, setStats] = useState({
    subjects: '5,500+',
    idioms: '4,500+'
  })

  useEffect(() => {
    // Load real-time statistics
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      // Use fixed numbers as requested
      setStats({
        subjects: '5,500+',
        idioms: '4,500+'
      })
    } catch (error) {
      console.error('Error loading statistics:', error)
      // Keep fallback values
    }
  }

  const practiceTypes = [
    {
      id: 'subjects',
      title: 'Subject Wise Past CSS MCQs',
      description: 'Practice previous official CSS MCQS by subjects and years',
      icon: BookOpen,
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      route: '/css-practice/subjects',
      stats: `${stats.subjects} Questions`
    },
    {
      id: 'idioms',
      title: 'Practice Past Official Idioms',
      description: 'Practice past official English idioms',
      icon: MessageSquare,
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      route: '/css-practice/idioms',
      stats: `${stats.idioms} Official MCQs`
    }
  ]

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-purple-400 border-t-purple-200 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-purple-200 text-sm">Loading...</p>
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
        <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 z-10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="flex items-center gap-2 px-3 py-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-all active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back</span>
                </button>
                
                <div className="text-center">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Choose Your Practice Mode</h1>
                </div>
                
                <div className="w-16"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-6xl mx-auto">
              {/* Title Section */}
              <div className="text-center mb-8">
              </div>

              {/* Practice Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto animate-fade-in">
                {practiceTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <div
                      key={type.id}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 hover:shadow-purple-500/25 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.01] h-80"
                      onClick={() => router.push(type.route)}
                    >
                      <div className="text-center h-full flex flex-col justify-center">
                        <div className={`inline-flex p-4 bg-gradient-to-br ${type.gradient} rounded-2xl shadow-lg mb-5 group-hover:scale-105 transition-all duration-300 mx-auto`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <h3 className="text-xl font-black text-white mb-2">{type.title}</h3>
                        <p className="text-purple-200 mb-6 text-sm">{type.description}</p>
                        
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-6 border border-purple-400/30">
                          <div className="text-2xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-1">
                            {type.stats.split(' ')[0]}
                          </div>
                          <div className="text-xs text-purple-200 font-semibold">{type.stats.split(' ').slice(1).join(' ')}</div>
                        </div>
                        
                        <button className={`w-full bg-gradient-to-r ${type.gradient} hover:shadow-lg text-white py-3 px-6 rounded-xl font-bold transition-all active:scale-95 shadow-lg hover:shadow-xl`}>
                          Start Practice
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <FeedbackButton page="css-practice" />
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