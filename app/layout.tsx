import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from "@/lib/contexts/AuthContext"
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/StructuredData"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import { MetaPixel } from "@/components/MetaPixel"
import { MetaPixelRouteTracker } from "@/components/MetaPixelRouteTracker"
import { DeferredMetaPixelConversions } from "@/components/DeferredMetaPixelConversions"
import { PostAuthFollowPrompt } from "@/components/social/PostAuthFollowPrompt"
import { SoftNavHardFallback } from "@/components/SoftNavHardFallback"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://imtehan.com'),
  title: {
    default: "Imtehan - Learn smarter, practice better, and compete with confidence",
    template: "%s | Imtehan"
  },
  description:
    "Pakistan's exam prep, done right. Practice 150,000+ MCQs, real mock tests and AI scan-to-solve for CSS, PMS, MDCAT, PPSC, FPSC & NTS exams. Free to start.",
  keywords: [
    'CSS exam preparation',
    'PPSC MCQs',
    'FPSC past papers',
    'MDCAT practice',
    'CSS notes',
    'PMS notes',
  ],
  authors: [{ name: 'Imtehan' }],
  alternates: {
    canonical: 'https://imtehan.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://imtehan.com',
    siteName: 'Imtehan',
    title: 'Imtehan - Learn smarter, practice better, and compete with confidence',
    description: 'Pakistan\'s exam prep, done right. Practice 150,000+ MCQs, real mock tests and AI scan-to-solve for CSS, PMS, MDCAT, PPSC, FPSC & NTS exams. Free to start.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Imtehan - Exam Preparation Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@imtehan',
    title: 'Imtehan - Learn smarter, practice better, and compete with confidence',
    description: 'Pakistan\'s exam prep, done right. Practice 150,000+ MCQs, real mock tests and AI scan-to-solve for CSS, PMS, MDCAT, PPSC, FPSC & NTS exams. Free to start.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon-32x32.png", type: "image/png" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: '/manifest.webmanifest',
  category: 'education',
  applicationName: 'Imtehan',
  appleWebApp: {
    capable: true,
    title: 'Imtehan',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: { telephone: false },
}

export const viewport = {
  themeColor: '#3B5BDB',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-PK" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <MetaPixel />
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <SoftNavHardFallback />
          <MetaPixelRouteTracker />
          <PostAuthFollowPrompt />
          <DeferredMetaPixelConversions />
          {children}
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
