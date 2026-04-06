import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import { Inter, Libre_Baskerville } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from "@/lib/contexts/AuthContext"
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/StructuredData"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import { MetaPixel } from "@/components/MetaPixel"
import { MetaPixelRouteTracker } from "@/components/MetaPixelRouteTracker"
import { MetaPixelConversions } from "@/components/MetaPixelConversions"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: 'swap',
  variable: '--font-libre-baskerville',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://imtehan.com'),
  title: {
    default: "Imtehan - Learn smarter, practice better, and compete with confidence",
    template: "%s | Imtehan"
  },
  description:
    "Imtehan - Learn smarter, practice better, and compete with confidence. Master CSS and MPT competitive exams with 10,000+ MCQs and past papers.",
  keywords: [
    'CSS exam', 'MPT preparation', 'Pakistan CSS', 'competitive exams',
    'CSS past papers PDF', 'CSS MCQs with answers', 'CSS Islamic Studies MCQs',
    'Pakistan Affairs MCQs', 'CSS English preparation', 'CSS essay writing',
    'Federal Public Service Commission', 'FPSC preparation',
    'CSS exam syllabus 2025', 'CSS online practice test',
    'CSS mock test free', 'CSS preparation books',
    'MPT test pattern', 'CSS compulsory subjects',
    'CSS current affairs', 'CSS general knowledge', 'CSS exam guide',
    'FPSC CSS', 'CSS competitive exam Pakistan', 'CSS online preparation'
  ],
  authors: [{ name: 'Imtehan' }],
  alternates: {
    canonical: 'https://imtehan.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imtehan.com',
    siteName: 'Imtehan',
    title: 'Imtehan - Learn smarter, practice better, and compete with confidence',
    description: 'Imtehan - Learn smarter, practice better, and compete with confidence. Master CSS and MPT competitive exams with 10,000+ MCQs and past papers.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Imtehan - Exam Preparation Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imtehan - Learn smarter, practice better, and compete with confidence',
    description: 'Imtehan - Learn smarter, practice better, and compete with confidence. Master CSS and MPT competitive exams with 10,000+ MCQs and past papers.',
    images: ['/og-image.svg']
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
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
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
        <GoogleAnalytics />
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className={`${inter.className} ${inter.variable} ${libreBaskerville.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <Suspense fallback={null}>
            <MetaPixelRouteTracker />
          </Suspense>
          <MetaPixelConversions />
          {children}
        </AuthProvider>
        <MetaPixel />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
