'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Copy, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function PremiumPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center">
          <Link
            href="/css"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
            Choose Your Plan
          </h1>
          <p className="text-base text-gray-600">
            Unlock unlimited access to all CSS preparation resources
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {/* 3 Months */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">3 Months</h3>
                <p className="text-xs text-gray-500">Perfect to get started</p>
              </div>

              <div className="mb-5">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-gray-900">Rs. 499</span>
                </div>
                <p className="text-xs text-gray-400 line-through mb-1">Regular Rs. 1,050</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-green-600 font-semibold">Save Rs. 550</p>
                  <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold">52% OFF</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Unlimited CSS Practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Unlimited MPT Tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">All Solved Papers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Advanced Analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Priority Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">3 Months Access</span>
                </li>
              </ul>

              <Button
                variant="outline"
                className="w-full border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5"
              >
                Get Started
              </Button>
            </div>

            {/* 12 Months - Best Deal (Center) */}
            <div className="bg-white rounded-xl border-2 border-blue-500 p-6 shadow-lg relative">
              {/* Best Deal Badge */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Best Value
                </span>
              </div>

              <div className="mb-4 mt-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">12 Months</h3>
                <p className="text-xs text-gray-500">Most popular choice</p>
              </div>

              <div className="mb-5">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-gray-900">Rs. 1,499</span>
                </div>
                <p className="text-xs text-gray-400 line-through mb-1">Regular Rs. 4,200</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-blue-600 font-semibold">Save Rs. 2,701</p>
                  <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-bold">64% OFF</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Unlimited CSS Practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Unlimited MPT Tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">All Solved Papers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Advanced Analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Priority Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">12 Months Access</span>
                </li>
              </ul>

              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5"
              >
                Get Started
              </Button>
            </div>

            {/* 6 Months */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">6 Months</h3>
                <p className="text-xs text-gray-500">Great for quick prep</p>
              </div>

              <div className="mb-5">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-gray-900">Rs. 999</span>
                </div>
                <p className="text-xs text-gray-400 line-through mb-1">Regular Rs. 2,100</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-green-600 font-semibold">Save Rs. 1,101</p>
                  <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold">52% OFF</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Unlimited CSS Practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Unlimited MPT Tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">All Solved Papers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Advanced Analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Priority Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">6 Months Access</span>
                </li>
              </ul>

              <Button
                variant="outline"
                className="w-full border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                How to Activate Your Premium Plan
              </h3>
              <p className="text-sm text-gray-500 text-center mb-8">
                Fast and secure activation in 3 simple steps
              </p>

              <div className="space-y-6">
                {/* Step 1 - Payment */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-3">Transfer Payment</p>

                    {/* Bank Transfer Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3 hover:border-blue-200 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-gray-700">United Bank Limited (UBL)</p>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">Recommended</span>
                      </div>
                      <div className="space-y-2.5">
                        {/* IBAN */}
                        <div className="flex items-center justify-between group">
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-0.5">IBAN</p>
                            <p className="text-base font-medium text-gray-900 tracking-wide">PK16UNIL0109000339614961</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard('PK16UNIL0109000339614961', 'iban')}
                            className="ml-3 p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
                            title="Copy IBAN"
                          >
                            {copiedField === 'iban' ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                            )}
                          </button>
                        </div>

                        {/* Account Number */}
                        <div className="flex items-center justify-between group">
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-0.5">Account Number</p>
                            <p className="text-base font-medium text-gray-900 tracking-wide">7804339614961</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard('7804339614961', 'account')}
                            className="ml-3 p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
                            title="Copy Account Number"
                          >
                            {copiedField === 'account' ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                            )}
                          </button>
                        </div>

                        {/* Account Title */}
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Account Title</p>
                          <p className="text-sm font-medium text-gray-900">Asfandiyar Safi</p>
                        </div>
                      </div>
                    </div>

                    {/* EasyPaisa Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                      <p className="text-sm font-semibold text-gray-700 mb-2.5">EasyPaisa</p>
                      <div className="space-y-2.5">
                        {/* Account Number */}
                        <div className="flex items-center justify-between group">
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-0.5">Account Number</p>
                            <p className="text-base font-medium text-gray-900 tracking-wide">03044244421</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard('03044244421', 'easypaisa')}
                            className="ml-3 p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
                            title="Copy EasyPaisa Number"
                          >
                            {copiedField === 'easypaisa' ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                            )}
                          </button>
                        </div>

                        {/* Account Title */}
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Account Title</p>
                          <p className="text-sm font-medium text-gray-900">Asfand Yar Safi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Send Screenshot */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-3">Send Payment Screenshot</p>
                    <a
                      href="https://wa.me/923267426824?text=Hi!%20I%20just%20paid%20for%20Premium%20plan.%0A%0AEmail:%20%0APlan:%20%0AAmount:%20%0A%0A(Attaching%20screenshot)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span>Send via WhatsApp</span>
                    </a>
                    <p className="text-xs text-gray-500 mt-2.5 flex items-start gap-1.5">
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      <span>Include: Your registered email, chosen plan, and payment screenshot</span>
                    </p>
                  </div>
                </div>

                {/* Step 3 - Activation */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-2">Get Instant Activation</p>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        <div>
                          <p className="text-sm text-gray-700 font-medium">Usually activated within 30 minutes</p>
                          <p className="text-xs text-gray-600 mt-0.5">Available: 9 AM - 11 PM daily</p>
                          <p className="text-xs text-green-600 font-semibold mt-1.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Fast and reliable activation guaranteed
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Fast Activation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                    </svg>
                    <span className="font-medium">5,000+ Happy Students</span>
                  </div>
                </div>
              </div>

              {/* Copy Toast Notification */}
              {copiedField && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2 z-50">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium">Copied to clipboard!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
