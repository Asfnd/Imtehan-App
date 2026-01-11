import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Imtehan',
  description: 'Sign in to Imtehan to access CSS and MPT exam preparation resources, track your progress, and unlock premium features.',
  alternates: {
    canonical: 'https://imtehan.com/signin',
  },
  robots: {
    index: false, // Don't index sign-in page
    follow: true,
  },
  openGraph: {
    title: 'Sign In | Imtehan',
    description: 'Sign in to access CSS and MPT exam preparation resources.',
    url: 'https://imtehan.com/signin',
    type: 'website',
  },
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
