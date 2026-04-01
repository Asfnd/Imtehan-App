'use client'

import Link from 'next/link'
import { X, Crown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'

interface PremiumPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function PremiumPopup({ isOpen, onClose }: PremiumPopupProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Full-screen blocking overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />

      {/* Popup content */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Crown className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
              </div>
            </div>
            <p className="text-white/90 text-sm">
              You've reached your free limit. Unlock unlimited access now!
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Unlimited Practice Sets</p>
                  <p className="text-xs text-gray-500">All exams, subjects, and modes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Mock tests & simulations</p>
                  <p className="text-xs text-gray-500">Timed practice across supported exams</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Advanced Analytics</p>
                  <p className="text-xs text-gray-500">Track your progress & weak areas</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Priority Support</p>
                  <p className="text-xs text-gray-500">Get help when you need it</p>
                </div>
              </div>
            </div>

            {/* Pricing highlight */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <p className="text-center text-sm text-gray-600 mb-1">Plans from</p>
              <p className="text-center text-3xl font-bold text-gray-900">
                Rs. 1,999
                <span className="text-sm font-normal text-gray-500"> / month</span>
              </p>
              <p className="text-center text-xs text-gray-500 mt-1">Better value on 3- and 12-month plans</p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2">
              <Link href={PREMIUM_PAGE_PATH} className="block">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg"
                >
                  View Pricing Plans
                </Button>
              </Link>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
