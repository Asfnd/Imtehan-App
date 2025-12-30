'use client'

import { Target, Flame, TrendingUp, Award, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface AnalyticsTeaserProps {
  onSignIn: () => void
}

export default function AnalyticsTeaser({ onSignIn }: AnalyticsTeaserProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-8 shadow-2xl border-2 border-white/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="text-sm font-semibold text-white">Unlock Your Potential</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Track Your Progress Like a Pro
          </h2>
          <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto">
            Sign in to unlock powerful analytics that transform your CSS preparation
          </p>
        </div>

        {/* Feature Preview Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Stats Preview */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Real-Time Statistics</h3>
                <p className="text-sm text-white/80 mb-3">
                  Track questions solved, tests completed, and your average score
                </p>
                {/* Mock Stats */}
                <div className="flex gap-2">
                  <div className="px-3 py-2 bg-white/10 rounded-lg border border-white/20">
                    <div className="text-xs text-white/60">Questions</div>
                    <div className="text-xl font-bold text-white">156</div>
                  </div>
                  <div className="px-3 py-2 bg-white/10 rounded-lg border border-white/20">
                    <div className="text-xs text-white/60">Score</div>
                    <div className="text-xl font-bold text-white">78%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Streak Counter Preview */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Daily Streak System</h3>
                <p className="text-sm text-white/80 mb-3">
                  Build consistent study habits with our addictive streak tracker
                </p>
                {/* Mock Streak */}
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-black text-white">7</div>
                  <div>
                    <div className="text-sm font-semibold text-white">days strong!</div>
                    <div className="text-xs text-white/70">Top 10% of learners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weak Subjects Preview */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Weak Subject Detection</h3>
                <p className="text-sm text-white/80 mb-3">
                  AI identifies your weak areas and prioritizes what to study
                </p>
                {/* Mock Weak Subject */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg border border-white/20">
                    <span className="text-sm font-medium text-white">Economics</span>
                    <span className="text-sm text-red-300">45% • Practice Now</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg border border-white/20">
                    <span className="text-sm font-medium text-white">English</span>
                    <span className="text-sm text-orange-300">62% • Improve</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Recommendations Preview */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Smart Recommendations</h3>
                <p className="text-sm text-white/80 mb-3">
                  Get personalized daily study suggestions based on your performance
                </p>
                {/* Mock Recommendation */}
                <div className="p-3 bg-gradient-to-r from-white/15 to-white/10 rounded-lg border border-white/30">
                  <div className="text-xs text-white/70 mb-1">Today's Focus</div>
                  <div className="text-sm font-bold text-white">Pakistan Affairs</div>
                  <div className="text-xs text-white/60 mt-1">Not practiced in 5 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-black text-white mb-1">100%</div>
              <div className="text-sm text-white/80">Free Forever</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">Auto</div>
              <div className="text-sm text-white/80">Tracked Progress</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">AI</div>
              <div className="text-sm text-white/80">Personalized Tips</div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={onSignIn}
            size="lg"
            className="bg-white text-purple-700 hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 group"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Sign in with Google to Start Tracking</span>
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-sm text-white/70 mt-4">
            ✨ No credit card required • Takes 2 seconds • Join 1,000+ CSS aspirants
          </p>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
