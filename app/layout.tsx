import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ToastContainer } from '@/components/ui/Toast'
import AuthProvider from '@/components/auth/AuthProvider'
import GlobalSecurity from '@/components/security/GlobalSecurity'
import ContentProtection from '@/components/security/ContentProtection'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AI Quiz Platform - Personalized Learning',
  description:
    'AI-powered quiz platform that adapts to your skill level and helps you learn effectively',
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
        
        {/* Performance: Prefetch critical resources */}
        <link rel="prefetch" href="/dashboard" />
        <link rel="prefetch" href="/css-practice" />
        
        {/* Viewport optimization for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Theme color for better perceived performance */}
        <meta name="theme-color" content="#8b5cf6" />
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
      </body>
    </html>
  )
}
