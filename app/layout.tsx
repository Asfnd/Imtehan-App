import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://imtehan.com'),
  title: {
    default: "Imtehan - CSS & MPT Exam Preparation Platform",
    template: "%s | Imtehan"
  },
  description:
    "Master CSS and MPT competitive exams with interactive practice tests, past papers, detailed analytics, and personalized study paths. Join thousands of successful aspirants.",
  keywords: ['CSS exam', 'MPT preparation', 'Pakistan CSS', 'competitive exams', 'past papers', 'MCQs', 'exam preparation'],
  authors: [{ name: 'Imtehan' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imtehan.com',
    siteName: 'Imtehan',
    title: 'Imtehan - CSS & MPT Exam Preparation',
    description: 'Master CSS and MPT competitive exams with interactive practice tests and past papers',
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
    description: 'Master CSS and MPT competitive exams with interactive practice tests',
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
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
