import { notFound } from 'next/navigation'
import Link from 'next/link'
import NavigationBar from '@/components/NavigationBar'
import { getCategorySeoContent } from '@/lib/seo/categoryContent'
import { CategoryHubShell } from '@/components/seo/CategoryHubSeoSection'

export default async function CategoryHubPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const content = getCategorySeoContent(category)
  if (!content) notFound()

  return (
    <CategoryHubShell category={category}>
      <main className="min-h-screen bg-gray-50">
        <NavigationBar />

        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <nav className="mb-4 text-sm text-gray-500">
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

          <p className="mb-6 text-sm text-gray-500">{content.exams.length} exams · MCQs & mock tests</p>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.exams.map((exam) => (
              <li key={exam.slug}>
                <Link
                  href={`/exams/${exam.slug}`}
                  className="block rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <span className="text-sm font-semibold text-gray-900">{exam.name}</span>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    {exam.subjectCount} subjects
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </CategoryHubShell>
  )
}
