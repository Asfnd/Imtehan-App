import type { Metadata } from 'next'

const SUBJECT_META: Record<string, {
  name: string
  description: string
  keywords: string[]
}> = {
  biology: {
    name: 'Biology',
    description: 'Practice FSc Pre-Medical Biology MCQs chapter-wise. Cell Biology, Genetics, Physiology, Ecology & more aligned with Punjab Board curriculum. Ideal for board exams and MDCAT preparation.',
    keywords: [
      'FSc biology MCQs', 'FSc biology chapter wise MCQs', 'Punjab Board biology MCQs',
      'pre-medical biology MCQs', 'FSc part 1 biology MCQs', 'FSc part 2 biology MCQs',
      'board exam biology practice', 'FSc biology online test', 'MDCAT biology FSc',
    ],
  },
  chemistry: {
    name: 'Chemistry',
    description: 'Practice FSc Pre-Medical Chemistry MCQs chapter-wise. Organic, Inorganic & Physical Chemistry aligned with Punjab Board curriculum for board exams and MDCAT.',
    keywords: [
      'FSc chemistry MCQs', 'FSc chemistry chapter wise MCQs', 'Punjab Board chemistry MCQs',
      'organic chemistry FSc MCQs', 'FSc part 1 chemistry', 'FSc part 2 chemistry MCQs',
      'board exam chemistry practice', 'FSc chemistry online test',
    ],
  },
  physics: {
    name: 'Physics',
    description: 'Practice FSc Pre-Medical Physics MCQs chapter-wise. Mechanics, Waves, Electricity & Modern Physics aligned with Punjab Board curriculum for board exams.',
    keywords: [
      'FSc physics MCQs', 'FSc physics chapter wise MCQs', 'Punjab Board physics MCQs',
      'mechanics FSc MCQs', 'FSc part 1 physics', 'FSc part 2 physics MCQs',
      'board exam physics practice', 'FSc physics online test',
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

  if (!meta) return { title: 'FSc MCQs | Imtehan' }

  return {
    title: `FSc ${meta.name} MCQs : Chapter-wise Practice for Punjab Board | Imtehan`,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://imtehan.com/fsc/${subject}`,
    },
    openGraph: {
      title: `FSc ${meta.name} Chapter-wise MCQs | Imtehan`,
      description: meta.description,
      url: `https://imtehan.com/fsc/${subject}`,
      type: 'website',
    },
  }
}

export default function FSCSubjectLayout({ children }: { children: React.ReactNode }) {
  return children
}
