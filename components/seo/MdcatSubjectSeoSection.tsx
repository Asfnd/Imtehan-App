import Link from 'next/link'
import { getMdcatSubjectSeoContent } from '@/lib/seo/examContent'
import { MDCAT_SUBJECT_TABLES } from '@/lib/seo/topic-indexing'
import { MDCAT_TOPIC_VALUES } from '@/lib/topic-tags'
import { SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'

export function MdcatSubjectShell({
  subject,
  children,
}: {
  subject: string
  children: React.ReactNode
}) {
  const content = getMdcatSubjectSeoContent(subject)
  if (!content) return <>{children}</>

  const table = MDCAT_SUBJECT_TABLES[subject]
  const topicMap = table ? MDCAT_TOPIC_VALUES[table] : undefined

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SeoPageHeader title={content.h1} subtitle={content.intro} />
      <nav aria-label={`MDCAT ${content.subjectName} topics`} className="sr-only">
        <ul>
          {content.topics.map((t) => (
            <li key={t}>
              <Link href={`/mdcat/${subject}/${encodeURIComponent(t)}`}>{t}</Link>
            </li>
          ))}
          {topicMap &&
            Object.values(topicMap).map((dbVal) => (
              <li key={dbVal}>
                <Link href={`/mdcat/${subject}/${encodeURIComponent(dbVal)}`}>{dbVal}</Link>
              </li>
            ))}
          {['easy', 'medium', 'hard'].map((d) => (
            <li key={d}>
              <Link href={`/mdcat/${subject}/${d}`}>{d} difficulty</Link>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </>
  )
}

export default function MdcatSubjectSeoSection({ subject }: { subject: string }) {
  return <MdcatSubjectShell subject={subject}>{null}</MdcatSubjectShell>
}
