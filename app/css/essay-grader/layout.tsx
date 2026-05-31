import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI CSS Essay Checker : Instant Marking & Examiner Feedback | Imtehan',
  description: 'Grade your CSS essay instantly with AI that marks like a real FPSC examiner. Get scores out of 20, line-by-line feedback, and improvement tips for Essay, Précis, Pakistan Affairs, IR & all CSS written subjects.',
  keywords: [
    'CSS essay checker', 'CSS essay grader', 'CSS essay AI', 'grade CSS essay',
    'CSS essay marking', 'CSS precis checker', 'FPSC essay feedback',
    'CSS essay score', 'CSS written exam preparation', 'CSS essay tips',
    'CSS essay practice', 'CSS essay AI feedback', 'CSS paper checker',
    'CSS essay out of 20', 'CSS examiner marking',
  ],
  alternates: {
    canonical: 'https://imtehan.com/css/essay-grader',
  },
  openGraph: {
    title: 'AI CSS Essay Checker : Grade My Essay | Imtehan',
    description: 'The first AI that marks your CSS essays like a real FPSC examiner. Instant score out of 20 with detailed feedback. Works for Essay, Précis & all CSS written subjects.',
    url: 'https://imtehan.com/css/essay-grader',
    type: 'website',
  },
}

export default function EssayGraderLayout({ children }: { children: React.ReactNode }) {
  return children
}
