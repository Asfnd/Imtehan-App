import type { Metadata } from 'next'
import { getExamConfig } from '@/lib/exam-configs'
import { examIndexingMeta } from '@/lib/seo/sitemap-tiers'

const EXAM_SEO: Record<string, {
  description: string
  keywords: string[]
}> = {
  'css-mpt': {
    description: 'Practice CSS MPT (Mandatory Preliminary Test) MCQs by subject: English, General Knowledge, Pakistan Affairs, Islamic Studies, Current Affairs & more. Topic-wise sets with answers.',
    keywords: [
      'CSS MPT MCQs', 'CSS MPT preparation', 'CSS mandatory preliminary test',
      'CSS screening test MCQs', 'CSS English MCQs', 'CSS general knowledge MCQs',
      'CSS Pakistan affairs MCQs', 'CSS Islamic studies MCQs', 'FPSC CSS MCQ practice',
    ],
  },
  'pms-competitive': {
    description:
      'Practice PMS MCQs by subject and use the PMS Writing Coach for essay, précis, and long-answer feedback: English, GK, Pakistan Affairs, Islamiat, Current Affairs, Everyday Science, Math, Geography.',
    keywords: [
      'PMS MCQs', 'PMS preparation Pakistan', 'PMS screening MCQs',
      'PMS general knowledge', 'PMS Pakistan affairs', 'PMS English MCQs',
      'PMS essay practice', 'PMS précis', 'provincial management services MCQ', 'PMS practice test',
    ],
  },
  'ppsc-assistant': {
    description: 'Practice PPSC Assistant (BS-16) MCQs with subject-wise sets: General Knowledge, Pakistan Affairs, English, Islamic Studies & more. Full mock test preparation.',
    keywords: [
      'PPSC assistant MCQs', 'PPSC BS-16 preparation', 'PPSC assistant past papers',
      'PPSC general knowledge MCQs', 'PPSC pakistan affairs MCQs', 'PPSC english MCQs',
    ],
  },
  'ppsc-sub-inspector': {
    description: 'Practice PPSC Sub Inspector Police MCQs: General Knowledge, Pakistan Affairs, English, Current Affairs & more. Subject-wise sets for complete exam preparation.',
    keywords: [
      'PPSC sub inspector MCQs', 'PPSC police MCQs', 'PPSC sub inspector preparation',
      'PPSC sub inspector past papers', 'Punjab police MCQ test',
    ],
  },
  'ppsc-patwari': {
    description: 'Practice PPSC Patwari (Revenue) MCQs: General Knowledge, Mathematics, Pakistan Affairs, English & more. Subject-wise sets for complete preparation.',
    keywords: [
      'PPSC Patwari MCQs', 'PPSC revenue patwari preparation', 'PPSC patwari past papers',
      'patwari test MCQs Pakistan', 'Punjab patwari MCQ test',
    ],
  },
  'ppsc-tehsildar': {
    description: 'Practice PPSC Tehsildar MCQs: General Knowledge, Pakistan Affairs, Current Affairs, Islamic Studies & more. Subject-wise MCQ sets with answers.',
    keywords: [
      'PPSC tehsildar MCQs', 'PPSC tehsildar preparation', 'PPSC tehsildar past papers',
      'Punjab tehsildar MCQ test', 'PPSC revenue MCQs',
    ],
  },
  'issb-academic': {
    description: 'Practice ISSB academic & intelligence MCQs: English, Mathematics, General Knowledge, Pakistan Affairs, and reasoning. Every question includes a detailed explanation.',
    keywords: [
      'ISSB MCQs', 'ISSB academic test', 'ISSB preparation Pakistan',
      'ISSB English MCQs', 'ISSB intelligence test', 'Pak Army ISSB MCQs',
    ],
  },
  'pharm-d-entry': {
    description: 'Practice Pharm-D entry test MCQs: Chemistry, Biology, Physics, and English. Subject-wise sets with answers for D Pharmacy admission in Pakistan.',
    keywords: [
      'Pharm-D entry test MCQs', 'D Pharmacy entry test', 'pharmacy admission Pakistan',
      'Pharm-D chemistry MCQs', 'pharmacy college entry test',
    ],
  },
  'dpt-entry': {
    description: 'Practice DPT physiotherapy entry test MCQs: Biology, Chemistry, Physics, and English. Timed sets with explanations for university admission.',
    keywords: [
      'DPT entry test MCQs', 'physiotherapy entry test Pakistan', 'DPT admission MCQs',
      'physiotherapy university test', 'DPT biology MCQs',
    ],
  },
  'bds-entry': {
    description: 'Practice BDS dental entry test MCQs: Biology, Chemistry, Physics, and English. MDCAT-style preparation for dental college admission.',
    keywords: [
      'BDS entry test MCQs', 'dental college admission Pakistan', 'BDS MCQ practice',
      'dental entry test preparation', 'BDS biology chemistry MCQs',
    ],
  },
  'punjab-educators': {
    description: 'Practice Punjab Educators MCQs for PST, SST, and EST: Urdu, English, General Knowledge, Pakistan Studies, Mathematics, and Islamic Studies.',
    keywords: [
      'Punjab educators MCQs', 'PPSC educators test', 'PST SST EST MCQs',
      'Punjab teacher recruitment', 'educators entry test Punjab',
    ],
  },
  'hec-lat': {
    description: 'Practice HEC Law Admission Test (LAT) MCQs: English, General Knowledge, Pakistan Studies, Mathematics, and Islamic Studies for LLB admission.',
    keywords: [
      'HEC LAT MCQs', 'law admission test Pakistan', 'LAT preparation',
      'LLB entry test MCQs', 'HEC law test practice',
    ],
  },
  'ned-entry': {
    description: 'Practice NED University entry test MCQs: Mathematics, Physics, Chemistry, and English. Engineering admission preparation for Karachi.',
    keywords: [
      'NED entry test MCQs', 'NED University admission', 'NED engineering test',
      'NED Karachi entry test', 'NED math physics MCQs',
    ],
  },
  'uet-taxila': {
    description: 'Practice UET Taxila entry test MCQs: Physics, Mathematics, Chemistry, and English. ECAT-style preparation for Rawalpindi region engineering colleges.',
    keywords: [
      'UET Taxila entry test MCQs', 'UET Taxila admission', 'ECAT UET Taxila',
      'engineering entry test Taxila', 'UET Rawalpindi MCQs',
    ],
  },
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  css: ['CSS MCQs', 'FPSC MCQ preparation', 'CSS MPT practice', 'competitive exam Pakistan'],
  pms: ['PMS MCQs', 'Provincial Management Services', 'PMS preparation Pakistan', 'PMS screening test'],
  ppsc: ['PPSC MCQs', 'Punjab Public Service Commission', 'PPSC preparation', 'PPSC past papers'],
  fpsc: ['FPSC MCQs', 'Federal Public Service Commission', 'FPSC preparation'],
  medical: ['MDCAT MCQs', 'medical entry test Pakistan', 'PMC MCQ practice', 'KEMU entry test'],
  engineering: ['ECAT MCQs', 'NET entry test', 'engineering admission Pakistan', 'UET Lahore ECAT'],
  hec: ['HEC USAT MCQs', 'HAT test preparation', 'HEC LAT MCQs', 'Law-GAT Pakistan'],
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examSlug: string }>
}): Promise<Metadata> {
  const { examSlug } = await params
  const config = getExamConfig(examSlug)

  if (!config) return { title: 'Exam Practice | Imtehan' }

  const seo = EXAM_SEO[examSlug]
  const categoryKws = CATEGORY_KEYWORDS[config.category] ?? []
  const description = seo?.description
    ?? `Practice ${config.name} MCQs subject-wise. ${config.totalMCQs}+ questions with answers and explanations for complete exam preparation.`
  const selfCanonical = `https://imtehan.com/exams/${examSlug}`
  const indexing = examIndexingMeta(examSlug, config.category, selfCanonical)

  return {
    title: `${config.name} MCQs: Practice Sets with Answers | Imtehan`,
    description,
    keywords: [
      ...(seo?.keywords ?? []),
      ...categoryKws,
      `${config.name} MCQ practice`,
      'MCQ practice Pakistan',
      'Imtehan exam preparation',
    ],
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: {
      title: `${config.name} MCQs | Imtehan`,
      description,
      url: `https://imtehan.com/exams/${examSlug}`,
      type: 'website',
    },
  }
}

export default async function ExamLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ examSlug: string }>
}) {
  const { examSlug } = await params
  const config = getExamConfig(examSlug)

  const examName = config?.name ?? examSlug.replace(/-/g, ' ').toUpperCase()
  const description = config
    ? `Practice ${examName} MCQs subject-wise. ${config.totalMCQs}+ questions with answers and explanations for complete exam preparation.`
    : `Practice ${examName} MCQs with answers on Imtehan.`

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': `${examName} Exam Preparation`,
    'description': description,
    'url': `https://imtehan.com/exams/${examSlug}`,
    'provider': { '@type': 'Organization', 'name': 'Imtehan', 'url': 'https://imtehan.com' },
    'hasCourseInstance': {
      '@type': 'CourseInstance',
      'courseMode': 'online',
      'url': `https://imtehan.com/exams/${examSlug}`,
    },
    ...(config?.sections?.length ? {
      'teaches': config.sections.map(s => s.label),
      'numberOfCredits': config.totalMCQs,
    } : {}),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://imtehan.com' },
      { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://imtehan.com/exams' },
      { '@type': 'ListItem', position: 3, name: examName, item: `https://imtehan.com/exams/${examSlug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
