import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Chat',
  description: 'Join the CSS aspirant community. Chat in real time with fellow candidates preparing for CSS examinations.',
  alternates: { canonical: 'https://imtehan.com/community' },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children
}
