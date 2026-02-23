'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Copy, CheckCircle2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const PLANS = [
  {
    label: '3 Months',
    desc: 'Try it out',
    price: 'Rs. 2,499',
    strikethrough: 'Rs. 3,000',
    savings: 'Save Rs. 501',
    badge: '17% OFF',
    badgeColor: 'bg-green-100 text-green-700',
    savingsColor: 'text-green-600',
    highlight: false,
    cta: 'Get Started',
  },
  {
    label: '12 Months',
    desc: 'Best for serious prep',
    price: 'Rs. 4,499',
    strikethrough: 'Rs. 7,200',
    savings: 'Save Rs. 2,701',
    badge: 'BEST VALUE',
    badgeColor: 'bg-blue-500 text-white',
    savingsColor: 'text-blue-600',
    highlight: true,
    cta: 'Get Started',
  },
  {
    label: '6 Months',
    desc: 'Popular choice',
    price: 'Rs. 3,499',
    strikethrough: 'Rs. 4,800',
    savings: 'Save Rs. 1,301',
    badge: '27% OFF',
    badgeColor: 'bg-green-100 text-green-700',
    savingsColor: 'text-green-600',
    highlight: false,
    cta: 'Get Started',
  },
]

const FEATURES = [
  { text: 'Unlimited practice sets — all exams & subjects' },
  { text: 'All CSS/MPT, MDCAT, FSc, PPSC & ETEA mock tests' },
  { text: 'Solved past papers (CSS, PPSC, NTS & more)' },
  { text: 'Guess papers & model questions' },
  { text: 'Priority WhatsApp support' },
]

const EXAMS_COVERED = ['CSS / MPT', 'MDCAT', 'FSc', 'PPSC', 'NTS', 'ETEA', 'NUMS', 'AKU']

export default function PremiumPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const paymentSectionRef = useRef<HTMLDivElement>(null)

  const scrollToPayment = () => {
    paymentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-10 md:py-14 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Zap className="w-3.5 h-3.5" />
            One subscription · Every exam
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Unlock Full Access
          </h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto mb-5">
            Practice without limits across every Pakistani competitive exam on the platform.
          </p>
          {/* Exams pill row */}
          <div className="flex flex-wrap justify-center gap-2">
            {EXAMS_COVERED.map((exam) => (
              <span key={exam} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                {exam}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.label}
                className={`bg-white rounded-xl p-6 relative transition-shadow ${
                  plan.highlight
                    ? 'border-2 border-blue-500 shadow-lg'
                    : 'border border-gray-200 hover:shadow-md'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      Best Value
                    </span>
                  </div>
                )}

                <div className="mb-4 mt-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-0.5">{plan.label}</h3>
                  <p className="text-xs text-gray-500">{plan.desc}</p>
                </div>

                <div className="mb-5">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <p className="text-xs text-gray-400 line-through mt-1">{plan.strikethrough}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className={`text-xs font-semibold ${plan.savingsColor}`}>{plan.savings}</p>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${plan.badgeColor}`}>{plan.badge}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {FEATURES.map((f) => (
                    <li key={f.text} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-blue-500' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-600">{f.text}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className="text-sm text-gray-600">{plan.label} access</span>
                  </li>
                </ul>

                <Button
                  onClick={scrollToPayment}
                  variant={plan.highlight ? 'default' : 'outline'}
                  className={`w-full font-medium py-2.5 ${
                    plan.highlight
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'border-2 border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Instructions */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={paymentSectionRef} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-1 text-center">
              How to Activate
            </h3>
            <p className="text-sm text-gray-500 text-center mb-8">
              3 simple steps · Activated within 30 minutes
            </p>

            <div className="space-y-7">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 mb-3">Send Payment</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-gray-700">United Bank Limited (UBL)</p>
                      <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Bank Transfer</span>
                    </div>
                    <div className="space-y-3">
                      {/* IBAN */}
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">IBAN</p>
                          <p className="text-sm font-medium text-gray-900 tracking-wide">PK16UNIL0109000339614961</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard('PK16UNIL0109000339614961', 'iban')}
                          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-colors"
                        >
                          {copiedField === 'iban'
                            ? <CheckCircle2 className="w-4 h-4 text-green-600" />
                            : <Copy className="w-4 h-4 text-gray-400" />
                          }
                        </button>
                      </div>
                      {/* Account */}
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Account Number</p>
                          <p className="text-sm font-medium text-gray-900 tracking-wide">7804339614961</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard('7804339614961', 'account')}
                          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-colors"
                        >
                          {copiedField === 'account'
                            ? <CheckCircle2 className="w-4 h-4 text-green-600" />
                            : <Copy className="w-4 h-4 text-gray-400" />
                          }
                        </button>
                      </div>
                      {/* Title */}
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Account Title</p>
                        <p className="text-sm font-medium text-gray-900">Asfandiyar Safi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 mb-3">Share Payment Screenshot</p>
                  <a
                    href="https://wa.me/923267426824?text=Hi!%20I%20just%20paid%20for%20Premium.%0A%0AEmail:%20%0APlan:%20%0AAmount:%20%0A%0A(Attaching%20screenshot)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send on WhatsApp
                  </a>
                  <p className="text-sm text-gray-600 mt-2.5 flex items-start gap-1.5">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    Include your registered email, plan, and payment screenshot
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-2">Get Activated</p>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <p className="text-sm text-gray-700 font-medium">Usually activated within 30 minutes</p>
                    <p className="text-xs text-gray-500 mt-0.5">Available 9 AM – 11 PM daily</p>
                    <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Reliable activation guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust row */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">Fast Activation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
                <span className="font-medium">400+ Active Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clipboard toast */}
      {copiedField && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium">Copied!</span>
        </div>
      )}
    </main>
  )
}
