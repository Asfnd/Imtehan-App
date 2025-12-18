'use client'

import { FileText, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'
import { useFreeTrial } from '@/lib/hooks/useFreeTrial'

export default function SolvedPapersMain() {
  const router = useRouter()
  const { user, loading, showSignInPopup, setShowSignInPopup, requestAccess } = useFreeTrial()

  const handleViewPaper = () => {
    // Check access and handle free trial limits
    if (requestAccess('solved')) {
      // Navigate directly to the viewer with the paper ID
      router.push('/solved-papers/view?id=1')
    }
    // If requestAccess returns false, it will show the sign-in popup automatically
  }

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
        message="Sign in required to access solved papers"
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
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Solved Papers</h1>
                </div>
                
                <div className="w-16"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl mx-auto">
              <div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 hover:shadow-purple-500/25 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.01]"
                onClick={handleViewPaper}
              >
                <div className="text-center">
                  <div className="inline-flex p-6 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl shadow-lg mb-6 group-hover:scale-105 transition-all duration-300">
                    <FileText className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-3">Solved Subjective Compulsory Papers</h3>
                  <p className="text-purple-200 mb-6 text-sm">2016 - 2021 Solved Papers</p>
                  
                  <button className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:shadow-lg text-white py-4 px-8 rounded-xl font-bold transition-all active:scale-95 shadow-lg hover:shadow-xl text-lg">
                    View Solved Paper
                  </button>
                </div>
              </div>
            </div>
          </div>

          <FeedbackButton page="solved-papers" />
        </div>
        
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
          
          .backdrop-blur-xl {
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
          }
        `}</style>
      </ProtectedContent>
    </>
  )
}