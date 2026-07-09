import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Trash2, Smartphone, Mail, ShieldCheck, Database } from 'lucide-react'

export const metadata = {
  title: 'Delete Your Account',
  description:
    'How to permanently delete your Imtehan account and all associated data, what data is removed, what is retained, and the retention period.',
  keywords: 'delete account, data deletion, account removal, Imtehan',
}

export default function DeleteAccount() {
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
      <section className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-6">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance leading-[1.1]">
              Delete your
              <br />
              <span className="text-muted-foreground">account</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 text-pretty leading-relaxed max-w-2xl mx-auto">
              Imtehan (<code className="text-base bg-muted px-2 py-0.5 rounded-md">com.imtehan.mobile</code>) lets you
              permanently delete your account and all associated data at any time.
            </p>
            <p className="text-sm text-muted-foreground">Last updated: June 12, 2026</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            {/* Method 1 — In app */}
            <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Delete in the app (instant)</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The fastest way. Your account and data are removed immediately.
                  </p>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                        1
                      </span>
                      <span className="text-muted-foreground">
                        Open Imtehan and go to the <strong className="text-foreground">Profile</strong> tab.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                        2
                      </span>
                      <span className="text-muted-foreground">
                        Scroll down and tap <strong className="text-foreground">Delete account</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                        3
                      </span>
                      <span className="text-muted-foreground">
                        Confirm. Your account and data are permanently deleted.
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Method 2 — Email */}
            <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Or request by email</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you can&apos;t access the app, email{' '}
                    <a
                      href="mailto:info@imtehan.com?subject=Delete%20my%20account"
                      className="font-semibold text-primary hover:underline"
                    >
                      info@imtehan.com
                    </a>{' '}
                    from your account&apos;s email address with the subject{' '}
                    <strong className="text-foreground">&quot;Delete my account&quot;</strong>. We will delete it within{' '}
                    <strong className="text-foreground">7 days</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* What is deleted / kept */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 md:p-8 border shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-100 text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">What gets deleted</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Permanently removed and not recoverable:
                </p>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p>• Account and profile</p>
                  <p>• Quiz history</p>
                  <p>• Scores and XP</p>
                  <p>• Streaks</p>
                  <p>• Bookmarks and saved sets</p>
                  <p>• Community posts</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mt-4">
                  This action cannot be undone.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 border shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">What we keep</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Only anonymized, aggregate records that are no longer linked to you (for example, overall usage
                  statistics).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  Where the law requires us to keep certain records (such as transaction logs), we retain only the
                  minimum necessary for the legally required period, then delete it.
                </p>
              </div>
            </div>

            {/* Commitment */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-10 border text-center">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Your data, your choice</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                You can delete your account at any time, with no questions asked. If you have any trouble, our team is
                here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="mailto:info@imtehan.com?subject=Delete%20my%20account">
                  <Button size="lg">Email Support</Button>
                </a>
                <Link href="/privacy">
                  <Button variant="outline" size="lg">
                    Privacy Policy
                  </Button>
                </Link>
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
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
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
