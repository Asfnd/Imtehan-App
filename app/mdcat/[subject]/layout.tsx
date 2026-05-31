import type { Metadata } from 'next'

const SUBJECT_META: Record<string, {
  name: string
  description: string
  keywords: string[]
}> = {
  biology: {
    name: 'Biology',
    description: 'Practice MDCAT Biology MCQs topic-wise: Cell Biology, Genetics, Physiology, Ecology & more. 5,900+ questions with difficulty levels and detailed explanations for PMC, ETEA & NUMS.',
    keywords: [
      'MDCAT biology MCQs', 'MDCAT biology preparation 2026', 'PMC MDCAT biology',
      'cell biology MCQs MDCAT', 'genetics MCQs MDCAT', 'physiology MCQs MDCAT',
      'MDCAT biology topics', 'medical entry test biology Pakistan',
      'MDCAT biology past papers', 'MDCAT biology practice test',
    ],
  },
  chemistry: {
    name: 'Chemistry',
    description: 'Practice MDCAT Chemistry MCQs topic-wise: Organic, Inorganic, Physical Chemistry & more. 6,200+ questions with difficulty levels and detailed explanations.',
    keywords: [
      'MDCAT chemistry MCQs', 'MDCAT chemistry preparation 2026', 'organic chemistry MCQs MDCAT',
      'inorganic chemistry MCQs', 'PMC MDCAT chemistry', 'physical chemistry MCQs MDCAT',
      'medical entry test chemistry Pakistan', 'MDCAT chemistry practice test',
    ],
  },
  physics: {
    name: 'Physics',
    description: 'Practice MDCAT Physics MCQs topic-wise: Mechanics, Electricity, Waves, Modern Physics & more. 4,700+ questions with difficulty levels and detailed explanations.',
    keywords: [
      'MDCAT physics MCQs', 'MDCAT physics preparation 2026', 'mechanics MCQs MDCAT',
      'electricity MCQs MDCAT', 'PMC MDCAT physics', 'waves MCQs MDCAT',
      'medical entry test physics Pakistan', 'MDCAT physics practice test',
    ],
  },
  english: {
    name: 'English',
    description: 'Practice MDCAT English MCQs: Vocabulary, Reading Comprehension, Grammar & more. 900+ questions with detailed answers for PMC and ETEA English section.',
    keywords: [
      'MDCAT english MCQs', 'MDCAT vocabulary MCQs', 'MDCAT comprehension questions',
      'PMC MDCAT english section', 'MDCAT grammar MCQs', 'medical entry test english Pakistan',
    ],
  },
  'logical-reasoning': {
    name: 'Logical Reasoning',
    description: 'Practice MDCAT Logical Reasoning MCQs with topic-wise sets. 1,200+ questions covering analytical and critical reasoning for PMC, ETEA & NUMS entry tests.',
    keywords: [
      'MDCAT logical reasoning MCQs', 'MDCAT reasoning practice', 'PMC logical reasoning',
      'MDCAT analytical reasoning', 'medical entry test reasoning Pakistan',
      'MDCAT critical thinking MCQs',
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>
}): Promise<Metadata> {
  const { subject } = await params
  const meta = SUBJECT_META[subject]

  if (!meta) return { title: 'MDCAT MCQs | Imtehan' }

  return {
    title: `MDCAT ${meta.name} MCQs 2026 : Topic-wise Practice with Answers | Imtehan`,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://imtehan.com/mdcat/${subject}`,
    },
    openGraph: {
      title: `MDCAT ${meta.name} MCQs 2026 : Topic-wise Practice | Imtehan`,
      description: meta.description,
      url: `https://imtehan.com/mdcat/${subject}`,
      type: 'website',
    },
  }
}

export default function MDCATSubjectLayout({ children }: { children: React.ReactNode }) {
  return children
}
