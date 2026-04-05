'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Copy, CheckCircle2 } from 'lucide-react'
import { PREMIUM_FEATURES, PREMIUM_PLANS } from '@/lib/premium-plans'

export default function PremiumPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const paymentSectionRef = useRef<HTMLDivElement>(null)

  const scrollToPayment = (planLabel?: string) => {
    if (planLabel) setSelectedPlan(planLabel)
    paymentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch {
      /* ignore */
    }
  }

  const waText = selectedPlan
    ? `Hi!%20I%20want%20Premium%20(${encodeURIComponent(selectedPlan)}%20plan).%0A%0AEmail:%20%0AAmount:%20%0A%0A(Attaching%20payment%20screenshot)`
    : `Hi!%20I%20just%20paid%20for%20Premium.%0A%0AEmail:%20%0APlan:%20%0AAmount:%20%0A%0A(Attaching%20screenshot)`

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>
      </div>

      <div className="pt-10 pb-2 text-center px-6">
        <h1 className="text-2xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-sm text-gray-500 mt-1.5 max-w-xl mx-auto">
          All plans include the same features—full access to practice, mocks, premium materials, and analytics on
          Imtehan.
        </p>
      </div>

      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 max-w-4xl mx-auto">
            {PREMIUM_PLANS.map((plan) => (
              <div
                key={plan.label}
                className={`bg-white rounded-xl p-6 relative transition-shadow flex flex-col ${
                  plan.highlight ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-200 hover:shadow-md'
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
                  {plan.perMonth ? (
                    <p className="text-xs text-gray-500 mt-1">{plan.perMonth}</p>
                  ) : (
                    <p className="text-xs text-gray-400 mt-1">billed once</p>
                  )}
                  {plan.savings && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <p className={`text-xs font-semibold ${plan.savingsColor}`}>{plan.savings}</p>
                      {plan.badge && (
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${plan.badgeColor}`}>{plan.badge}</span>
                      )}
                    </div>
                  )}
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {PREMIUM_FEATURES.map((f) => (
                    <li key={f.text} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-blue-500' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-600 flex items-center gap-1.5 flex-wrap">
                        {f.text}
                        {f.isNew && (
                          <span className="text-[9px] font-black uppercase tracking-wide bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full leading-none">
                            New
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className="text-sm text-gray-600">{plan.label} full access</span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToPayment(plan.label)}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    plan.highlight ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-900 hover:bg-gray-700 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={paymentSectionRef} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-1 text-center">How to Activate</h3>
            <p className="text-sm text-gray-500 text-center mb-1">3 simple steps · Activated within 30 minutes</p>
            {selectedPlan && (
              <div className="flex justify-center mt-3 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  {selectedPlan} plan selected
                </span>
              </div>
            )}
            {!selectedPlan && <div className="mb-8" />}

            <div className="space-y-7">
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
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">IBAN</p>
                          <p className="text-sm font-medium text-gray-900 tracking-wide">PK16UNIL0109000339614961</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('PK16UNIL0109000339614961', 'iban')}
                          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-colors"
                        >
                          {copiedField === 'iban' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Account Number</p>
                          <p className="text-sm font-medium text-gray-900 tracking-wide">7804339614961</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('7804339614961', 'account')}
                          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-colors"
                        >
                          {copiedField === 'account' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Account Title</p>
                        <p className="text-sm font-medium text-gray-900">Asfandiyar Safi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 mb-3">Share Payment Screenshot</p>
                  <a
                    href={`https://wa.me/923267426824?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Send on WhatsApp
                  </a>
                  <p className="text-sm text-gray-600 mt-2.5 flex items-start gap-1.5">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Include your registered email, plan chosen, and payment screenshot
                  </p>
                </div>
              </div>

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

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Fast Activation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <span className="font-medium">400+ Active Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {copiedField && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium">Copied!</span>
        </div>
      )}
    </main>
  )
}
