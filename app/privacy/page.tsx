import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { BookOpen, ArrowLeft, Shield, Lock, CheckCircle, Eye, Database, Users } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Imtehan',
  description: 'Learn how Imtehan protects your personal data and privacy. Our comprehensive privacy policy explains data collection and usage.',
  keywords: 'privacy policy, data protection, user privacy'
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance leading-[1.1]">
              Privacy
              <br />
              <span className="text-muted-foreground">Policy</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 text-pretty leading-relaxed max-w-2xl mx-auto">
              Your privacy and data security are our top priorities
            </p>
            <p className="text-sm text-muted-foreground">Last updated: June 4, 2026</p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Encrypted</h3>
              <p className="text-xs text-muted-foreground">End-to-end security</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Transparent</h3>
              <p className="text-xs text-muted-foreground">Clear practices</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Secure</h3>
              <p className="text-xs text-muted-foreground">Protected data</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Your Control</h3>
              <p className="text-xs text-muted-foreground">Full data rights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {/* Key sections with more prominence */}
            <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect information that you provide directly to us:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Account Info</p>
                        <p className="text-xs text-muted-foreground">Email and name via Google OAuth</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Usage Data</p>
                        <p className="text-xs text-muted-foreground">Quiz scores, progress, and study history</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Camera &amp; Images</p>
                        <p className="text-xs text-muted-foreground">With your permission, photos of exam questions you scan. Images are sent to AI providers to generate solutions and are not stored as raw images on our servers.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Device Info</p>
                        <p className="text-xs text-muted-foreground">Camera, IP, device type</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Feedback</p>
                        <p className="text-xs text-muted-foreground">Messages you submit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">How We Use Your Information</h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Provide, maintain, and improve our services</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Track your quiz progress and performance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Send you updates (if you opt-in)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Respond to support requests</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Process exam question images using AI to generate solutions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Detect and prevent fraud</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining sections in grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Data Security</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your data is stored securely using Supabase with industry-standard encryption. We implement appropriate measures to protect your information.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  Scanned question images are transmitted over HTTPS and processed in real-time. We do not store raw images, only anonymised solution data for service improvement.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    4
                  </div>
                  <h3 className="text-xl font-bold">Third-Party Services</h3>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                  <p>• Supabase: Database, authentication &amp; backend infrastructure</p>
                  <p>• Google Gemini AI: Processes exam question images to generate solutions</p>
                  <p>• Groq (Meta Llama): Fallback AI provider for question solving</p>
                  <p>• OpenRouter: Fallback AI provider for question solving</p>
                  <p>• Mistral AI: Math verification and study content generation</p>
                  <p>• Google OAuth: Sign-in authentication</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  When you use the Scan feature, your image is transmitted to one of the above AI providers for processing. On Google&apos;s free tier, submitted content may be used to improve Google&apos;s models per their terms. We do not control third-party data practices beyond contractual obligations.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    5
                  </div>
                  <h3 className="text-xl font-bold">Camera &amp; Scan Data</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  The Scan feature requires camera permission to photograph exam questions. Images are:
                </p>
                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                  <p>• Transmitted securely to AI providers for real-time processing</p>
                  <p>• Not stored as images on our servers</p>
                  <p>• Only retained as anonymised text (the extracted question and solution) for service analytics</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You can revoke camera permission at any time in your device settings. Revoking permission disables the Scan feature but does not affect any other functionality.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    6
                  </div>
                  <h3 className="text-xl font-bold">Cookies</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use essential cookies for sessions and preferences. No tracking cookies for advertising.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    7
                  </div>
                  <h3 className="text-xl font-bold">Your Rights</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">You can:</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• Access your data</p>
                  <p>• Request corrections</p>
                  <p>• Delete your account</p>
                  <p>• Export your data</p>
                  <p>• Revoke camera permission via device settings</p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    8
                  </div>
                  <h3 className="text-xl font-bold">Data Sharing</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don&apos;t sell your data. We only share with essential service providers who are contractually obligated to protect it.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    9
                  </div>
                  <h3 className="text-xl font-bold">Updates</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We may update this policy. We&apos;ll notify you of material changes via email or platform notification.
                </p>
              </div>
            </div>

            {/* Commitment Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-10 border text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Our Commitment to You</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're committed to protecting your privacy and being transparent about our data practices. Your trust matters to us.
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
              © 2026 Imtehan. All rights reserved.
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
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
