import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at Imtehan : Join Our Team | Competitive Exam Edtech',
  description:
    'Join Imtehan and help students across Pakistan prepare for CSS, PPSC, MDCAT, and 200+ competitive exams. Remote roles in engineering, content, design, growth, and operations.',
  alternates: {
    canonical: 'https://imtehan.com/careers',
  },
  openGraph: {
    title: 'Careers at Imtehan',
    description:
      'Join a mission-driven team helping thousands of students prepare for CSS, PPSC, MDCAT, and competitive exams across Pakistan.',
    url: 'https://imtehan.com/careers',
    type: 'website',
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
