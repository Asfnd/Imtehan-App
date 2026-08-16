import { jsonLdString } from '@/lib/seo/jsonld'
import {
  NOTES_BASE,
  NOTES_INDEX_EXAMS,
  kitDateIso,
  kitDateModifiedIso,
  notesFaqItems,
  notesUrl,
  primaryNotesLocation,
  primaryNotesPathForSlug,
} from '@/lib/seo/notes-seo'
import type { NoteKitData, NoteTopicMeta, NotesModule } from '@/lib/notes/types'
import type { ReadyKitButton } from '@/lib/notes/modules'

const ORG_ID = `${NOTES_BASE}/#organization`

function graphScript(graph: object[]) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLdString({
          '@context': 'https://schema.org',
          '@graph': graph,
        }),
      }}
    />
  )
}

function crumbs(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1]?.url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function NotesHubJsonLd() {
  const url = `${NOTES_BASE}/notes`
  return graphScript([
    crumbs([
      { name: 'Home', url: NOTES_BASE },
      { name: 'Notes', url },
    ]),
    {
      '@type': 'CollectionPage',
      '@id': `${url}#page`,
      url,
      name: 'Exam Notes',
      description:
        'Syllabus-mapped notes for CSS, PMS, PPSC, FPSC and NTS. Organised by exam.',
      isPartOf: { '@id': `${NOTES_BASE}/#website` },
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-PK',
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: NOTES_INDEX_EXAMS.length,
        itemListElement: NOTES_INDEX_EXAMS.map((slug, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: notesUrl([slug]),
        })),
      },
    },
  ])
}

function kitAbsUrl(slug: string, examSlug: string, subjectSlug: string): string {
  return `${NOTES_BASE}${primaryNotesPathForSlug(slug) ?? `/notes/${examSlug}/${subjectSlug}/${slug}`}`
}

export function NotesExamJsonLd({
  mod,
  kits,
}: {
  mod: NotesModule
  kits: ReadyKitButton[]
}) {
  const url = notesUrl([mod.slug])
  return graphScript([
    crumbs([
      { name: 'Home', url: NOTES_BASE },
      { name: 'Notes', url: `${NOTES_BASE}/notes` },
      { name: `${mod.name} Notes`, url },
    ]),
    {
      '@type': 'CollectionPage',
      '@id': `${url}#page`,
      url,
      name: `${mod.name} Notes`,
      description: `Subject-wise notes for ${mod.name}.`,
      isPartOf: { '@id': `${NOTES_BASE}/#website` },
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-PK',
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: kits.length,
        itemListElement: kits.slice(0, 12).map((kit, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: kit.title,
          url: kitAbsUrl(kit.slug, mod.slug, kit.subjectSlug),
        })),
      },
    },
  ])
}

export function NotesSubjectJsonLd({
  mod,
  subjectLabel,
  subjectSlug,
  kits,
}: {
  mod: NotesModule
  subjectLabel: string
  subjectSlug: string
  kits: ReadyKitButton[]
}) {
  const url = notesUrl([mod.slug, subjectSlug])
  return graphScript([
    crumbs([
      { name: 'Home', url: NOTES_BASE },
      { name: 'Notes', url: `${NOTES_BASE}/notes` },
      { name: `${mod.name} Notes`, url: notesUrl([mod.slug]) },
      { name: subjectLabel, url },
    ]),
    {
      '@type': 'CollectionPage',
      '@id': `${url}#page`,
      url,
      name: `${subjectLabel} Notes · ${mod.name}`,
      description: `${subjectLabel} notes for ${mod.name}.`,
      isPartOf: { '@id': `${NOTES_BASE}/#website` },
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-PK',
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: kits.length,
        itemListElement: kits.slice(0, 12).map((kit, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: kit.title,
          url: kitAbsUrl(kit.slug, mod.slug, kit.subjectSlug),
        })),
      },
    },
  ])
}

export function NotesTopicJsonLd({
  examSlug,
  examName,
  subjectSlug,
  subjectLabel,
  kit,
  meta,
}: {
  examSlug: string
  examName: string
  subjectSlug: string
  subjectLabel: string
  kit: NoteKitData
  meta: NoteTopicMeta
}) {
  const loc = primaryNotesLocation(meta)
  const canonical = notesUrl([loc.examSlug, loc.subjectSlug, loc.topicSlug])
  const self = notesUrl([examSlug, subjectSlug, meta.slug])
  const modified = kitDateModifiedIso(kit.updated)
  const published = kitDateIso(kit.updated)
  const faqs = notesFaqItems(kit)
  const headline = kit.title.replace(/\s+notes$/i, '').trim()

  const graph: object[] = [
    crumbs([
      { name: 'Home', url: NOTES_BASE },
      { name: 'Notes', url: `${NOTES_BASE}/notes` },
      { name: `${examName} Notes`, url: notesUrl([examSlug]) },
      { name: subjectLabel, url: notesUrl([examSlug, subjectSlug]) },
      { name: kit.title, url: self },
    ]),
    {
      '@type': ['Article', 'LearningResource'],
      '@id': `${canonical}#notes`,
      url: canonical,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      headline: `${headline} Notes`,
      name: kit.title,
      description: kit.subtitle,
      datePublished: published,
      dateModified: modified,
      inLanguage: 'en-PK',
      isAccessibleForFree: true,
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      image: `${NOTES_BASE}/og-image.png`,
      educationalLevel: 'Professional',
      learningResourceType: 'Study notes',
      educationalUse: ['revision', 'exam preparation'],
      teaches: kit.title,
      about: { '@type': 'Thing', name: kit.title },
      keywords: kit.syllabusTags.join(', '),
      isPartOf: { '@id': `${notesUrl([loc.examSlug])}#page` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#one-pager', '.note-onepager', 'h1'],
      },
    },
  ]

  if (faqs.length >= 3) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      url: canonical,
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  return graphScript(graph)
}
