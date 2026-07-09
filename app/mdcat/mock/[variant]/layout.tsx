import type { Metadata } from 'next'

const VARIANT_META: Record<string, {
  name: string
  description: string
  keywords: string[]
}> = {
  pmc: {
    name: 'PMC MDCAT',
    description: 'Practice full PMC MDCAT mock tests: 180 MCQs covering Biology, Chemistry, Physics, English & Logical Reasoning. Timed tests to simulate the real PMC entry test experience.',
    keywords: [
      'PMC MDCAT mock test', 'PMC MDCAT practice test', 'MDCAT 2026 mock test',
      'PMC entry test simulation', 'MDCAT full mock test', 'PMC 180 MCQs',
      'MDCAT biology chemistry physics mock',
    ],
  },
  etea: {
    name: 'ETEA Entry Test',
    description: 'Practice full ETEA mock tests: 200 MCQs with negative marking. Covers Biology, Chemistry, Physics, English for KPK medical college admission. Timed simulation tests.',
    keywords: [
      'ETEA mock test', 'ETEA entry test practice', 'ETEA 2026 preparation',
      'ETEA 200 MCQs', 'KPK medical entry test', 'ETEA negative marking practice',
      'ETEA biology chemistry physics',
    ],
  },
  nums: {
    name: 'NUMS Entry Test',
    description: 'Practice full NUMS (National University of Medical Sciences) mock tests: 150 MCQs covering Biology, Chemistry, Physics & English. Timed tests for military medical colleges.',
    keywords: [
      'NUMS mock test', 'NUMS entry test practice', 'NUMS 2026 preparation',
      'NUMS 150 MCQs', 'military medical college test', 'NUMS biology chemistry physics',
      'AMC SMC CMH entry test',
    ],
  },
  aku: {
    name: 'AKU Entry Test',
    description: 'Practice full AKU (Aga Khan University) entry test mock: 100 MCQs covering Biology, Chemistry, Physics & English. Preparation for Pakistan\'s most prestigious private medical university.',
    keywords: [
      'AKU mock test', 'Aga Khan University entry test', 'AKU 2026 preparation',
      'AKU 100 MCQs', 'AKU medical college test', 'AKU biology chemistry physics',
      'AKU MBBS entry test',
    ],
  },
  uhs: {
    name: 'UHS Punjab MDCAT',
    description: 'Practice full UHS Punjab MDCAT mock tests: 180 MCQs covering Biology, Chemistry, Physics, English & Logical Reasoning for MBBS/BDS admissions in Punjab.',
    keywords: [
      'UHS MDCAT mock test', 'Punjab MDCAT practice', 'UHS MBBS BDS entry test',
      'UHS 180 MCQs', 'Punjab medical colleges entry test', 'UHS medical admission test',
    ],
  },
  szabmu: {
    name: 'SZABMU MDCAT',
    description: 'Practice full SZABMU MDCAT mock tests: 180 MCQs with complete subject distribution and timed simulation.',
    keywords: [
      'SZABMU MDCAT mock test', 'SZABMU entry test practice', 'federal MDCAT mock',
      'SZABMU MBBS BDS test', 'MDCAT 180 MCQs practice',
    ],
  },
  siba: {
    name: 'SIBA MDCAT',
    description: 'Practice full SIBA MDCAT mock tests: 180 MCQs covering Biology, Chemistry, Physics, English & Logical Reasoning for Sindh admissions.',
    keywords: [
      'SIBA MDCAT mock test', 'Sukkur IBA MDCAT practice', 'Sindh MDCAT mock',
      'SIBA MBBS BDS entry test', 'MDCAT 180 MCQs',
    ],
  },
  bumhs: {
    name: 'BUMHS MDCAT',
    description: 'Practice full BUMHS MDCAT mock tests: 180 MCQs with complete timed simulations for medical and dental admissions.',
    keywords: [
      'BUMHS MDCAT mock test', 'Bolan University MDCAT', 'Balochistan MDCAT practice',
      'BUMHS MBBS BDS entry test', 'MDCAT 180 MCQs',
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>
}): Promise<Metadata> {
  const { variant } = await params
  const meta = VARIANT_META[variant]

  if (!meta) return { title: 'MDCAT Mock Test' }

  return {
    title: `${meta.name} Mock Test 2026: Full Practice Tests with Answers`,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://imtehan.com/mdcat/mock/${variant}`,
    },
    openGraph: {
      title: `${meta.name} Mock Test 2026`,
      description: meta.description,
      url: `https://imtehan.com/mdcat/mock/${variant}`,
      type: 'website',
    },
  }
}

export default function MDCATMockVariantLayout({ children }: { children: React.ReactNode }) {
  return children
}
