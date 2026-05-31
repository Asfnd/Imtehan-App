import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply : Careers at Imtehan',
  description: 'Submit your application to join the Imtehan team.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Apply : Careers at Imtehan',
    description: 'Submit your application to join the Imtehan team.',
    type: 'website',
  },
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children
}
