import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MDCAT 2026 Preparation: 18,000+ MCQs & Mock Tests',
  description: 'Prepare for MDCAT 2026 with 18,000+ MCQs in Biology, Chemistry, Physics, English & Logical Reasoning, plus PMC, ETEA, NUMS & AKU mock tests.',
  keywords: [
    'MDCAT preparation', 'MDCAT 2026', 'MDCAT MCQs Pakistan', 'PMC MDCAT',
    'MDCAT biology MCQs', 'MDCAT chemistry MCQs', 'MDCAT physics MCQs',
    'MDCAT online test', 'MDCAT practice', 'ETEA test preparation',
    'NUMS entry test', 'AKU test', 'medical entry test Pakistan',
    'MDCAT past papers', 'MDCAT mock test', 'MDCAT logical reasoning',
  ],
  alternates: {
    canonical: 'https://imtehan.com/mdcat',
  },
  openGraph: {
    title: 'MDCAT 2026 Preparation: 18,000+ MCQs & Mock Tests',
    description: 'Pakistan\'s best MDCAT prep platform. 18,000+ topic-wise MCQs for Biology, Chemistry, Physics, English & Logical Reasoning. PMC, ETEA, NUMS & AKU mock tests.',
    url: 'https://imtehan.com/mdcat',
    type: 'website',
  },
}

export default function MDCATLayout({ children }: { children: React.ReactNode }) {
  return children
}
