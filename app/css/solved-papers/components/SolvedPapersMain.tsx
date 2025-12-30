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

  const handleViewPaper = async () => {
    // Check access and handle free trial limits
    const hasAccess = await requestAccess('solved')
    if (hasAccess) {
      // Navigate directly to the viewer with the paper ID
      router.push('/css/solved-papers/view?id=1')
    }
    // If requestAccess returns false, it will show the sign-in popup automatically
  }

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
        message="Sign in required to access solved papers"
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

                <h1 className="text-lg md:text-xl font-semibold text-foreground">Solved Papers</h1>

                <div className="w-32"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 py-8 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div
                className="group relative bg-white rounded-lg border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1"
                onClick={handleViewPaper}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative p-8 text-center">
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-6 shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
                    <FileText className="w-10 h-10 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                    Solved Compulsory Papers
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Comprehensive solutions for CSS subjective papers (2016-2021)
                  </p>

                  {/* Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-medium text-base flex items-center justify-center gap-2 transition-all shadow-sm group-hover:shadow-md">
                    <span>View Solutions</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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