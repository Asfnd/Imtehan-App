import { notFound } from 'next/navigation'
import Link from 'next/link'
import CategoryHubSeoSection from '@/components/seo/CategoryHubSeoSection'
import { getCategorySeoContent } from '@/lib/seo/categoryContent'
import { getFeaturedExams } from '@/lib/seo/related-exams'

export default async function CategoryHubPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const content = getCategorySeoContent(category)
  if (!content) notFound()

  const featured = getFeaturedExams().filter((e) => e.category !== category).slice(0, 6)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/exams" className="hover:text-blue-600">
              Exams
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{content.label}</span>
          </nav>
        </div>
      </div>

      <CategoryHubSeoSection category={category} />

      {featured.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Popular exams on Imtehan</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {featured.map((exam) => (
                <li key={exam.slug}>
                  <Link
                    href={`/exams/${exam.slug}`}
                    className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {exam.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  )
}
