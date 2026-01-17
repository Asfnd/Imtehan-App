'use client'

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight, BookOpen, BarChart3, Users, Trophy, Target, Clock } from "lucide-react"
import { useState } from "react"
import { InfiniteMarquee } from "@/components/InfiniteMarquee"
import { AnimatedText } from "@/components/AnimatedText"
import NavigationBar from "@/components/NavigationBar"
import { CSSExamCountdown } from "@/components/CSSExamCountdown"

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
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-[44px] md:text-[56px] lg:text-[64px] font-bold tracking-tight mb-8 leading-[1.2] text-black">
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

            <p className="text-[17px] md:text-[19px] text-gray-600 mb-10 leading-[1.6] max-w-2xl mx-auto font-normal">
              A comprehensive learning platform designed to help you excel in competitive examinations through effective practice, personalized insights, and proven strategies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/css">
                <Button size="lg" className="h-[52px] px-8 text-[16px] font-semibold bg-black hover:bg-gray-900 text-white rounded-xl shadow-sm w-full sm:w-auto">
                  Begin CSS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-y bg-[#FAFAFA] overflow-hidden">
        <div className="mb-6">
          <InfiniteMarquee
            direction="right"
            speed={50}
            items={[
              { text: "Islamic Studies", subtext: "500+ Questions" },
              { text: "Pakistan Affairs", subtext: "600+ Questions" },
              { text: "Current Affairs", subtext: "800+ Questions" },
              { text: "English (Précis & Composition)", subtext: "450+ Questions" },
              { text: "General Knowledge", subtext: "700+ Questions" },
              { text: "International Relations", subtext: "550+ Questions" },
            ]}
          />
        </div>
        <div>
          <InfiniteMarquee
            direction="left"
            speed={70}
            isReview={true}
            items={[
              {
                text: "Best decision for CSS prep. The practice tests mirror actual exam difficulty perfectly. Highly recommend!",
                subtext: "Ayesha Rahman, CSS 2024"
              },
              {
                text: "Past papers with detailed solutions are gold. Saved me so much time compared to academy notes.",
                subtext: "Ali Raza, PMS Officer"
              },
              {
                text: "Being able to practice anywhere on my phone was a lifesaver during my job. Finally cleared CSS!",
                subtext: "Hassan Ahmed, Karachi"
              },
              {
                text: "The subject-wise analytics showed exactly what to focus on. My scores improved dramatically.",
                subtext: "Zara Khan, Lahore"
              },
              {
                text: "Tried other platforms but this one has the most authentic CSS-style questions. Really well done.",
                subtext: "Usman Tariq, Islamabad"
              },
              {
                text: "The explanations actually help you understand concepts instead of just cramming. Worth it!",
                subtext: "Mariam Siddiqui, NUST"
              },
            ]}
          />
        </div>
      </section>

      <section id="features" className="py-24 md:py-32 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Built for serious learners</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Everything you need to prepare effectively and efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            <Link href="/css/subjects" className="group p-8 rounded-xl bg-white border hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <BookOpen className="w-5.5 h-5.5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Comprehensive library</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                10,000+ practice questions across 50+ test subjects
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-lg text-muted-foreground">Simple steps to exam success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
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

      <section className="py-24 md:py-32 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-balance">Ready to start practicing?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
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

      <footer className="border-t py-16 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-6 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">Imtehan</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Practice smarter and score higher on competitive exams
              </p>
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
            <p className="text-sm text-muted-foreground">&copy; 2025 Imtehan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
