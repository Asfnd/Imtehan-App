import type { Metadata } from 'next'
import { getCategorySeoContent, CATEGORY_SLUGS } from '@/lib/seo/categoryContent'

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const content = getCategorySeoContent(category)
  if (!content) return { title: 'Exams | Imtehan' }

  const url = `https://imtehan.com/exams/category/${category}`
  const title = `${content.label} exams`
  const description = `Practice ${content.label} recruitment tests with subject-wise MCQs and mock tests on Imtehan.`
  return {
    title: `${title} | Imtehan`,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  }
}

export default async function CategoryHubLayout({ children }: { children: React.ReactNode }) {
  return children
}
