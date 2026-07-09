import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Profile',
  description: 'View and manage your Imtehan profile, track your CSS and MPT exam preparation progress, and manage your account settings.',
  alternates: {
    canonical: 'https://imtehan.com/profile',
  },
  robots: {
    index: false, // Don't index user profile pages
    follow: true,
  },
  openGraph: {
    title: 'Your Profile',
    description: 'Manage your Imtehan account and track exam preparation progress.',
    url: 'https://imtehan.com/profile',
    type: 'website',
  },
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
