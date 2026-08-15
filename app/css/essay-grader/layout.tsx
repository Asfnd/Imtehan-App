import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI CSS Essay Checker : Instant Marking & Examiner Feedback',
  description: 'Grade your CSS essay instantly with AI that marks like a real FPSC examiner. Official length 1,000-1,200 words. Get scores, line-by-line feedback, and improvement tips for Essay, Précis, and all CSS written subjects. Import handwritten pages from camera or gallery.',
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
    title: 'AI CSS Essay Checker : Grade My Essay',
    description: 'The first AI that marks your CSS essays like a real FPSC examiner. Official length 1,000-1,200 words. Instant score with detailed feedback. Import handwritten pages from camera or gallery.',
    url: 'https://imtehan.com/css/essay-grader',
    type: 'website',
  },
}

export default function EssayGraderLayout({ children }: { children: React.ReactNode }) {
  return children
}
