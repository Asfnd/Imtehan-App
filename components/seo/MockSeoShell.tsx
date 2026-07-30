import Link from 'next/link'
import type { ReactNode } from 'react'
import type { ExamConfig } from '@/lib/exam-configs'
import { SeoCrawlNav, SeoCrawlOnly, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'
import { breadcrumbListNode, jsonLdString } from '@/lib/seo/jsonld'

export function MockSeoShell({
  examSlug,
  examName,
  config,
  totalMcqs,
  durationMinutes,
  children,
}: {
  examSlug: string
  examName: string
  config: ExamConfig
  totalMcqs: number
  durationMinutes: number
  children: ReactNode
}) {
  const base = `/exams/${examSlug}`
  const h1 = `${examName} Mock Tests — Full-Length Practice Exams`
  const subtitle = `Take ${examName} mock tests online: ${totalMcqs} MCQs, ${durationMinutes} minutes, timed simulation with instant scoring.`

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: 'Home', url: '/' },
        { name: 'Exams', url: '/exams' },
        { name: examName, url: base },
        { name: 'Mock Tests' },
      ]),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graphJsonLd) }} />
      <SeoCrawlOnly>
        <SeoPageHeader title={h1} subtitle={subtitle} />

        <SeoCrawlNav label="Mock tests">
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <Link href={`${base}/attempt/${n}`}>
                  {examName} Mock Test {n}
                </Link>
              </li>
            ))}
          </ul>
        </SeoCrawlNav>

        {config.sections.length > 0 && (
          <SeoCrawlNav label={`${examName} subjects`}>
            <ul>
              {config.sections.map((s) => (
                <li key={s.slug}>
                  <Link href={`${base}/${s.slug}`}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </SeoCrawlNav>
        )}
      </SeoCrawlOnly>

      {children}
    </>
  )
}
