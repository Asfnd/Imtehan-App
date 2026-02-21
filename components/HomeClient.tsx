'use client'

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight, BookOpen, BarChart3, Users, Trophy, Target, Clock, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { InfiniteMarquee } from "@/components/InfiniteMarquee"
import { AnimatedText } from "@/components/AnimatedText"
import NavigationBar from "@/components/NavigationBar"
import { CSSExamCountdown } from "@/components/CSSExamCountdown"

const MEDICAL_CATEGORIES = [
  { key: 'mdcat', label: 'MDCAT',          href: '/mdcat' },
  { key: 'fsc',   label: 'FSc Pre-Medical', href: '/fsc'   },
]

const COMPETITIVE_CATEGORIES = [
  { key: 'national',   label: 'CSS / PMS',     href: '/css' },
  { key: 'ppsc',       label: 'PPSC',           href: '/exams?category=ppsc' },
  { key: 'fpsc',       label: 'FPSC',           href: '/exams?category=fpsc' },
  { key: 'provincial', label: 'Provincial',     href: '/exams?category=provincial' },
  { key: 'police',     label: 'Police',         href: '/exams?category=police' },
  { key: 'military',   label: 'Military',       href: '/exams?category=military' },
  { key: 'nts',        label: 'NTS',            href: '/exams?category=nts' },
  { key: 'ots',        label: 'OTS',            href: '/exams?category=ots' },
  { key: 'etea',       label: 'ETEA',           href: '/exams?category=etea' },
  { key: 'railways',   label: 'Railways',       href: '/exams?category=railways' },
  { key: 'banks',      label: 'Banks',          href: '/exams?category=banks' },
  { key: 'judiciary',  label: 'Judiciary',      href: '/exams?category=judiciary' },
  { key: 'devauth',    label: 'Dev Authority',  href: '/exams?category=devauth' },
  { key: 'rescue',     label: 'Rescue 1122',    href: '/exams?category=rescue' },
  { key: 'revenue',    label: 'Revenue Auth',   href: '/exams?category=revenue' },
]

function ExamPicker() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2.5 h-[52px] px-8 text-[16px] font-semibold bg-black hover:bg-gray-900 text-white rounded-xl shadow-sm transition-colors"
      >
        Start Preparing
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-50 p-4 w-[92vw] max-w-[380px]">
          {/* Medical */}
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Medical</p>
          <div className="grid grid-cols-2 gap-1 mb-3">
            {MEDICAL_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => { router.push(cat.href); setOpen(false) }}
                className="text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-sm font-medium text-gray-800"
              >
                {cat.label}
              </button>
            ))}
          </div>
          {/* Competitive */}
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Competitive Exams</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {COMPETITIVE_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => { router.push(cat.href); setOpen(false) }}
                className="text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-sm font-medium text-gray-800"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Successfully subscribed!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
          Never miss new resources
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
          Get notified when we add new practice tests, past papers, or launch new exam preparations.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading' || status === 'success'}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 px-6"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </div>

          {message && (
            <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>

        <p className="text-xs text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

export function HomeClient() {
  return (
    <>
      <NavigationBar />

      {/* CSS Exam Countdown - Below Nav */}
      <CSSExamCountdown />

      <section className="relative bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 sm:pt-20 sm:pb-16 md:pt-32 md:pb-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-[28px] sm:text-[38px] md:text-[52px] lg:text-[64px] font-bold tracking-tight mb-6 sm:mb-8 leading-[1.2] text-black">
              <div className="text-center">Prepare for competitive exams</div>
              <div className="text-center mt-1 pl-0 sm:pl-12 md:pl-24">
                <span className="inline-flex items-baseline gap-3">
                  <span>with</span>
                  <AnimatedText
                    words={['confidence', 'precision', 'intelligence', 'excellence']}
                    interval={1400}
                  />
                </span>
              </div>
            </h1>

            <p className="text-[15px] sm:text-[17px] md:text-[19px] text-gray-600 mb-8 sm:mb-10 leading-[1.6] max-w-2xl mx-auto font-normal px-2 sm:px-0">
              A comprehensive learning platform designed to help you excel in competitive examinations through effective practice, personalized insights, and proven strategies.
            </p>

            <div className="flex justify-center">
              <ExamPicker />
            </div>

          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-b bg-[#FAFAFA] overflow-hidden">
        <div className="mb-6">
          <InfiniteMarquee
            direction="right"
            speed={50}
            items={[
              { text: "General Knowledge",          subtext: "8,500+ MCQs" },
              { text: "English",                    subtext: "8,000+ MCQs" },
              { text: "Pakistan Affairs",           subtext: "7,000+ MCQs" },
              { text: "Current Affairs",            subtext: "6,500+ MCQs" },
              { text: "Everyday Science",           subtext: "5,500+ MCQs" },
              { text: "Computer Science",           subtext: "5,000+ MCQs" },
              { text: "Mathematics",                subtext: "5,000+ MCQs" },
              { text: "Islamic Studies",            subtext: "4,500+ MCQs" },
              { text: "Geography",                  subtext: "3,500+ MCQs" },
              { text: "Urdu",                       subtext: "3,500+ MCQs" },
              { text: "CSS / MPT Mock Tests",       subtext: "20 per exam" },
              { text: "PPSC — 50+ Posts",           subtext: "All subjects" },
              { text: "FPSC — 15+ Posts",           subtext: "All subjects" },
              { text: "Police — All Provinces",     subtext: "SI & Constable" },
              { text: "Banks — NBP · SBP · HBL",   subtext: "Officer grade" },
            ]}
          />
        </div>
        <div>
          <InfiniteMarquee
            direction="left"
            speed={60}
            isReview={true}
            items={[
              {
                text: "Cleared PPSC Assistant BS-16 first attempt. All 20 mocks matched the actual paper structure exactly.",
                subtext: "Sana Malik, PPSC Assistant, Faisalabad"
              },
              {
                text: "Scored 138/200 in CSS MPT after 6 weeks here. The mock tests are incredibly accurate.",
                subtext: "Junaid Alam, CSS 2025 Qualifier, Lahore"
              },
              {
                text: "Analytics showed I was weak in Current Affairs. Fixed it before the Punjab Police SI test. First attempt.",
                subtext: "Bilal Hussain, Punjab Police SI, Multan"
              },
              {
                text: "NBP Officer cleared first go. The mocks here are tougher than the real exam. Ideal prep.",
                subtext: "Fareeha Tariq, NBP Officer, Karachi"
              },
              {
                text: "PPSC PST 2025 passed. Urdu and GK mocks were a near-perfect match for the actual paper.",
                subtext: "Nadia Sultana, PPSC PST 2025, Bahawalpur"
              },
              {
                text: "NTS WAPDA sets got me to 76% accuracy. Passed comfortably. Science and math focus is spot on.",
                subtext: "Asad Mehmood, WAPDA, Peshawar"
              },
              {
                text: "Cleared LHC Clerk first attempt. English-heavy mocks built the reading speed I needed.",
                subtext: "Hina Akhtar, LHC Clerk, Lahore"
              },
              {
                text: "Joined PAF using Imtehan. The 60-minute mock format matched the actual academic test perfectly.",
                subtext: "Imran Gul, PAF Airman, Rawalpindi"
              },
              {
                text: "Cleared FPSC UDC without coaching, studying during lunch breaks. Bite-sized sets work perfectly.",
                subtext: "Rabia Anwar, FPSC UDC, Islamabad"
              },
              {
                text: "Rescue 1122 Rescuer passed. Science-heavy mocks covered every emergency management question.",
                subtext: "Tariq Mehmood, Rescue 1122, Gujranwala"
              },
            ]}
          />
        </div>
      </section>

      <section id="features" className="py-14 md:py-24 lg:py-32 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-balance">Built for serious learners</h2>
            <p className="text-base sm:text-lg text-muted-foreground text-pretty">
              Everything you need to prepare effectively and efficiently
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Link href="/css/subjects" className="group p-8 rounded-xl bg-white border hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Target className="w-5.5 h-5.5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Adaptive learning</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Questions that adjust to your level for optimal learning
              </p>
            </Link>

            <Link href="/css" className="group p-8 rounded-xl bg-white border hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <BarChart3 className="w-5.5 h-5.5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Performance insights</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Track progress with detailed analytics and metrics
              </p>
            </Link>

            <Link href="/css/subjects" className="group p-8 rounded-xl bg-white border hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Trophy className="w-5.5 h-5.5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Expert-curated</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Content created by top educators with detailed explanations
              </p>
            </Link>

            <Link href="/css/past-papers" className="group p-8 rounded-xl bg-white border hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Users className="w-5.5 h-5.5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Past papers</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Official exam papers with complete solutions
              </p>
            </Link>

            <Link href="/css/subjects" className="group p-8 rounded-xl bg-white border hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Clock className="w-5.5 h-5.5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Practice anytime</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No schedules, no classes. Learn at your own pace
              </p>
            </Link>

            <Link href="/exams" className="group p-8 rounded-xl bg-white border hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <BookOpen className="w-5.5 h-5.5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Massive question bank</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                70,000+ MCQs across 195 exams — CSS, PPSC, FPSC, Police, Banks & more
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-14 md:py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">How it works</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Simple steps to exam success</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose your test</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select from CSS, MPT, or browse past papers
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Practice daily</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Work through questions with detailed explanations
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Track & improve</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Monitor your progress and master weak areas
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-24 lg:py-32 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-5 text-balance">Ready to start practicing?</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 text-pretty">
            Join thousands of students achieving their exam goals
          </p>
          <Link href="/css">
            <Button size="lg" className="h-12 px-8 text-base">
              Start CSS Practice Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <NewsletterSection />

      <footer className="border-t py-10 sm:py-16 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">Imtehan</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Practice smarter and score higher on competitive exams
              </p>

              {/* Contact Email */}
              <div className="mb-4">
                <a
                  href="mailto:info@imtehan.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@imtehan.com
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/imtehanofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61567790634598"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Practice Tests</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/css" className="text-muted-foreground hover:text-foreground transition-colors">
                    CSS
                  </Link>
                </li>
                <li>
                  <Link href="/mpt-practice" className="text-muted-foreground hover:text-foreground transition-colors">
                    MPT Practice
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Study Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Account</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/signin" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/css" className="text-muted-foreground hover:text-foreground transition-colors">
                    CSS Resources
                  </Link>
                </li>
                <li>
                  <Link href="/css/premium" className="text-muted-foreground hover:text-foreground transition-colors">
                    Premium
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Help</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 flex justify-center items-center">
            <p className="text-sm text-muted-foreground">&copy; 2026 Imtehan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
