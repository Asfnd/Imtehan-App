import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Scale, FileText, Shield, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service',
  description: 'Read our terms of service. Understand the rules and conditions for using Imtehan CSS Practice Platform.',
  keywords: 'terms of service, conditions of use, user agreement'
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/favicon.svg"
              alt="Imtehan logo"
              width={32}
              height={32}
              className="w-8 h-8 flex-shrink-0 object-contain"
            />
            <span className="font-semibold text-lg">Imtehan</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="h-9">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-6">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance leading-[1.1]">
              Terms of
              <br />
              <span className="text-muted-foreground">Service</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 text-pretty leading-relaxed max-w-2xl mx-auto">
              Please read these terms carefully before using our platform
            </p>
            <p className="text-sm text-muted-foreground">Last updated: November 26, 2025</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {/* Section 1 */}
            <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Imtehan ("Service"), you accept and agree to be bound by the terms
                    and provisions of this agreement. If you do not agree to these terms, please do not use the Service.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Description of Service</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We provide an online platform for CSS and other competitive exam preparation. The Service includes:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Practice quizzes and mock tests</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Past papers and MCQs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Progress tracking and analytics</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Study materials and resources</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">User Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To use certain features, you must create an account. You agree to:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Provide accurate and complete information</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Maintain the security of your account credentials</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Notify us immediately of any unauthorized access</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Be responsible for all activities under your account</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Acceptable Use</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">You agree NOT to:</p>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Use the Service for any illegal purpose</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Attempt to gain unauthorized access to the Service</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Copy, scrape, or download content without permission</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Use automated tools (bots) to access the Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining sections in simpler format */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    5
                  </div>
                  <h3 className="text-xl font-bold">Content Ownership</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All content is owned by us, our licensors, or is public domain. You may not reproduce or distribute our content without permission.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    6
                  </div>
                  <h3 className="text-xl font-bold">Disclaimers</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Service provided "AS IS" without warranties. We don't guarantee uninterrupted, secure, or error-free service.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    7
                  </div>
                  <h3 className="text-xl font-bold">Limitation of Liability</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We're not liable for indirect, incidental, or consequential damages from your use of the Service.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    8
                  </div>
                  <h3 className="text-xl font-bold">Termination</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate accounts for violations. You may delete your account anytime.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    9
                  </div>
                  <h3 className="text-xl font-bold">Changes to Terms</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We may modify these terms. Continued use after changes means you accept the new terms.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    10
                  </div>
                  <h3 className="text-xl font-bold">Governing Law</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  These terms are governed by the laws of Pakistan.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-10 border text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Questions about our terms?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have any questions about these Terms of Service, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button size="lg">Contact Us</Button>
                </Link>
                <a href="mailto:asfnd.safi@gmail.com">
                  <Button variant="outline" size="lg">
                    Email Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Links */}
      <section className="py-12 border-t bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              © 2025 Imtehan. All rights reserved.
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
