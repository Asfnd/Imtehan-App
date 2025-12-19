import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ToastContainer } from '@/components/ui/Toast'
import AuthProvider from '@/components/auth/AuthProvider'
import GlobalSecurity from '@/components/security/GlobalSecurity'
import ContentProtection from '@/components/security/ContentProtection'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@/lib/analytics/GoogleAnalytics'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://css-practice-hub.vercel.app'),
  title: 'CSS Practice Hub - Master Your CSS Exam Preparation',
  description:
    'Complete CSS exam preparation platform with 10,000+ practice questions, past papers, and mock tests. Prepare for CSS 2025 with confidence.',
  keywords: 'CSS exam, CSS preparation, CSS practice, CSS mock test, CSS past papers, Central Superior Services, Pakistan CSS, CSS 2025, government jobs Pakistan',
  authors: [{ name: 'CSS Practice Hub' }],
  creator: 'CSS Practice Hub',
  publisher: 'CSS Practice Hub',
  robots: 'index, follow',
  openGraph: {
    title: 'CSS Practice Hub - Master Your CSS Exam Preparation',
    description: 'Complete CSS exam preparation platform with 10,000+ practice questions, past papers, and mock tests.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'CSS Practice Hub - Complete CSS Exam Preparation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS Practice Hub - Master Your CSS Exam Preparation',
    description: 'Complete CSS exam preparation platform with 10,000+ practice questions, past papers, and mock tests.',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance: Preconnect to critical origins */}
        <link rel="preconnect" href="https://qsrkkvrrxorbgvbgekew.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://qsrkkvrrxorbgvbgekew.supabase.co" />
        
        {/* Performance: Preconnect to Google profile images for instant loading */}
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        
        {/* Performance: Preconnect to Google Analytics */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Performance: Prefetch critical resources */}
        <link rel="prefetch" href="/dashboard" />
        <link rel="prefetch" href="/css-practice" />
        
        {/* Viewport optimization for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Theme color for better perceived performance */}
        <meta name="theme-color" content="#6366f1" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.svg" sizes="32x32" type="image/svg+xml" />
        <link rel="icon" href="/favicon-16x16.svg" sizes="16x16" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon-32x32.svg" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Additional meta tags for better social sharing */}
        <meta property="og:image" content="/og-image.svg" />
        <meta name="twitter:image" content="/og-image.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GlobalSecurity />
        <ContentProtection />
        <AuthProvider>
          {children}
          <ToastContainer />
        </AuthProvider>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
