import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/contexts/AuthContext"
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/StructuredData"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://imtehan.com'),
  title: {
    default: "Imtehan - Learn smarter, practice better, and compete with confidence",
    template: "%s | Imtehan"
  },
  description:
    "Master CSS and MPT competitive exams in Pakistan with 10,000+ practice MCQs, past papers (2015-2023), and expert explanations. Free CSS practice tests for Islamic Studies, Pakistan Affairs, Current Affairs, and 25+ subjects.",
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
    title: 'Imtehan - CSS & MPT Exam Preparation',
    description: 'Master CSS and MPT competitive exams in Pakistan with 10,000+ practice MCQs, past papers, and expert explanations. Free CSS preparation platform.',
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
    title: 'Imtehan - CSS & MPT Exam Preparation',
    description: 'Master CSS and MPT competitive exams in Pakistan with 10,000+ practice MCQs, past papers, and expert explanations.',
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
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
