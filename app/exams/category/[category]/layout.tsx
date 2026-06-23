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
  return {
    title: `${content.h1} | Imtehan`,
    description: content.intro.slice(0, 155),
    alternates: { canonical: url },
    openGraph: { title: content.h1, description: content.intro.slice(0, 155), url, type: 'website' },
  }
}

export default async function CategoryHubLayout({ children }: { children: React.ReactNode }) {
  return children
}
