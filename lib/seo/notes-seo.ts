import type { Metadata, MetadataRoute } from 'next'
import { EXAM_CONFIGS } from '@/lib/exam-configs'
import {
  countKitsForModule,
  getNotesModule,
  listReadyKitsForExam,
} from '@/lib/notes/modules'
import {
  listRegisteredTopics,
  resolveTopicKit,
} from '@/lib/notes/topic-registry'
import type { NoteKitData, NoteTopicMeta } from '@/lib/notes/types'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const NOTES_BASE = 'https://imtehan.com'
export const NOTES_OG_IMAGE = '/og-image.png'
export const NOTES_SITEMAP_LASTMOD = '2026-08-15'

/** Exams we index for notes. Same kit body is not indexed under every exam URL. */
export const NOTES_INDEX_EXAMS = [
  'css-written',
  'css-mpt',
  'pms-competitive',
  'ppsc-assistant',
  'ppsc-sub-inspector',
  'fpsc-general',
  'nts-general',
  'nts-gat',
  'fpsc-assistant',
  'ppsc-tehsildar',
] as const

export type NotesIndexExam = (typeof NOTES_INDEX_EXAMS)[number]

const OG_IMAGE = {
  url: NOTES_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: 'Imtehan Notes',
}

export type NotesLocation = {
  examSlug: string
  subjectSlug: string
  topicSlug: string
}

export function isNotesIndexExam(examSlug: string): boolean {
  return (NOTES_INDEX_EXAMS as readonly string[]).includes(examSlug)
}

export function notesPath(parts: string[]): string {
  const rest = parts.filter(Boolean).join('/')
  return rest ? `/notes/${rest}` : '/notes'
}

export function notesUrl(parts: string[]): string {
  return `${NOTES_BASE}${notesPath(parts)}`
}

/** Parse kit display dates like "15 Aug 2026" into ISO date. */
export function kitDateIso(updated: string): string {
  const parsed = Date.parse(updated)
  if (!Number.isNaN(parsed)) return new Date(parsed).toISOString().slice(0, 10)
  return NOTES_SITEMAP_LASTMOD
}

export function kitDateModifiedIso(updated: string): string {
  const parsed = Date.parse(updated)
  if (!Number.isNaN(parsed)) return new Date(parsed).toISOString()
  return `${NOTES_SITEMAP_LASTMOD}T00:00:00+05:00`
}

export function notesReadTime(kit: NoteKitData): string {
  const blob = [
    kit.subtitle,
    ...kit.onePager,
    ...kit.answerSteps,
    ...kit.questionVariants,
    ...kit.flashcards.flatMap((c) => [c.prompt, c.answer]),
    ...kit.citations.map((c) => c.text),
  ].join(' ')
  const words = blob.split(/\s+/).filter(Boolean).length
  const minutes = Math.min(22, Math.max(6, Math.round(words / 160) + 3))
  return `${minutes} min read`
}

function sectionOnExam(examSlug: string, subjectSlug: string): boolean {
  const mod = getNotesModule(examSlug)
  return Boolean(mod?.sections.some((s) => s.slug === subjectSlug))
}

/**
 * One canonical URL per kit. Written-track subjects prefer CSS Written;
 * everything else prefers the first index exam that actually has that subject.
 */
export function primaryNotesLocation(meta: NoteTopicMeta): NotesLocation {
  for (const examSlug of NOTES_INDEX_EXAMS) {
    const subjectSlug = meta.subjectSlugs.find((slug) => sectionOnExam(examSlug, slug))
    if (subjectSlug) {
      return { examSlug, subjectSlug, topicSlug: meta.slug }
    }
  }
  return {
    examSlug: 'css-mpt',
    subjectSlug: meta.subjectSlugs[0] ?? 'pakistan-affairs',
    topicSlug: meta.slug,
  }
}

export function primaryNotesPathForSlug(topicSlug: string): string | null {
  const resolved = resolveTopicKit(topicSlug)
  if (!resolved) return null
  const loc = primaryNotesLocation(resolved.meta)
  return notesPath([loc.examSlug, loc.subjectSlug, loc.topicSlug])
}

export function isPrimaryNotesUrl(
  examSlug: string,
  subjectSlug: string,
  topicSlug: string,
): boolean {
  const resolved = resolveTopicKit(topicSlug)
  if (!resolved) return false
  const loc = primaryNotesLocation(resolved.meta)
  return loc.examSlug === examSlug && loc.subjectSlug === subjectSlug
}

function topicTitle(kit: NoteKitData): string {
  const base = kit.title.replace(/\s+notes$/i, '').trim()
  return `${base} Notes`
}

function clipDescription(text: string, max = 158): string {
  const compact = text.replace(/\s+/g, ' ').trim()
  if (compact.length <= max) return compact
  const cut = compact.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`
}

function packMeta(opts: {
  title: string
  description: string
  canonical: string
  type?: 'website' | 'article'
  robots?: Metadata['robots']
  modifiedTime?: string
  publishedTime?: string
  keywords?: string[]
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: opts.canonical },
    robots: opts.robots,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: opts.canonical,
      type: opts.type ?? 'website',
      siteName: 'Imtehan',
      locale: 'en_PK',
      images: [OG_IMAGE],
      ...(opts.modifiedTime ? { modifiedTime: opts.modifiedTime } : {}),
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [NOTES_OG_IMAGE],
    },
  }
}

export function notesHubMetadata(): Metadata {
  return packMeta({
    title: 'Exam Notes',
    description:
      'Syllabus-mapped notes for CSS, PMS, PPSC, FPSC and NTS. One-pagers, fact cards, and past-paper angles — organised by exam.',
    canonical: notesUrl([]),
  })
}

export function notesExamMetadata(examSlug: string): Metadata {
  const mod = getNotesModule(examSlug)
  if (!mod) return { title: 'Notes' }
  const kits = countKitsForModule(examSlug)
  const track =
    mod.track === 'written'
      ? 'Written-paper kits with one-pagers, answer flow, and citations.'
      : 'One-pagers, fact cards, and past-paper angles by subject.'
  const ready = kits > 0 ? ` ${kits} kits ready.` : ''
  return packMeta({
    title: `${mod.name} Notes`,
    description: clipDescription(`${mod.name} notes, organised by subject. ${track}${ready}`),
    canonical: notesUrl([examSlug]),
    robots: isNotesIndexExam(examSlug)
      ? { index: true, follow: true }
      : { index: false, follow: true },
  })
}

export function notesSubjectMetadata(examSlug: string, subjectSlug: string): Metadata {
  const mod = getNotesModule(examSlug)
  const section = mod?.sections.find((s) => s.slug === subjectSlug)
  if (!mod || !section) return { title: 'Notes' }
  const kits = listReadyKitsForExam(examSlug, subjectSlug).length
  const ready = kits > 0 ? ` ${kits} revision kits ready.` : ''
  return packMeta({
    title: `${section.label} Notes · ${mod.name}`,
    description: clipDescription(
      `${section.label} notes for ${mod.name}. Open a topic for a one-pager, fact cards, and past-paper angles.${ready}`,
    ),
    canonical: notesUrl([examSlug, subjectSlug]),
    robots: isNotesIndexExam(examSlug)
      ? { index: true, follow: true }
      : { index: false, follow: true },
  })
}

export function notesTopicMetadata(
  examSlug: string,
  subjectSlug: string,
  topicSlug: string,
): Metadata {
  const mod = getNotesModule(examSlug)
  const section = mod?.sections.find((s) => s.slug === subjectSlug)
  if (!mod || !section) return { title: 'Notes' }

  const resolved = resolveTopicKit(topicSlug)
  if (!resolved) {
    return packMeta({
      title: `${topicSlug.replace(/-/g, ' ')} · ${mod.name}`,
      description: `${section.label} syllabus topic in ${mod.name}. Full revision kit is not published yet.`,
      canonical: notesUrl([examSlug, subjectSlug]),
      robots: { index: false, follow: true },
    })
  }

  const loc = primaryNotesLocation(resolved.meta)
  const canonical = notesUrl([loc.examSlug, loc.subjectSlug, loc.topicSlug])
  const modified = kitDateModifiedIso(resolved.kit.updated)
  const published = kitDateIso(resolved.kit.updated)
  return packMeta({
    title: topicTitle(resolved.kit),
    description: clipDescription(resolved.kit.subtitle),
    canonical,
    type: 'article',
    modifiedTime: modified,
    publishedTime: `${published}T00:00:00+05:00`,
    keywords: resolved.kit.syllabusTags.slice(0, 8),
    robots: { index: true, follow: true },
  })
}

export function relatedNotePosts(
  topicSlug: string,
  examSlug: string,
  subjectSlug: string,
  limit = 5,
): RelatedPost[] {
  const siblings = listReadyKitsForExam(examSlug, subjectSlug).filter((k) => k.slug !== topicSlug)
  const extra =
    siblings.length >= limit
      ? []
      : listReadyKitsForExam(examSlug).filter(
          (k) => k.slug !== topicSlug && !siblings.some((s) => s.slug === k.slug),
        )
  return [...siblings, ...extra].slice(0, limit).map((kit) => {
    const resolved = resolveTopicKit(kit.slug)
    const loc = resolved ? primaryNotesLocation(resolved.meta) : null
    const href = loc
      ? notesPath([loc.examSlug, loc.subjectSlug, loc.topicSlug])
      : notesPath([examSlug, kit.subjectSlug, kit.slug])
    return {
      slug: kit.slug,
      title: kit.title,
      date: resolved?.kit.updated ?? '',
      category: kit.subjectLabel,
      href,
    }
  })
}

export type NotesSearchHit = {
  href: string
  title: string
  meta: string
  kind: 'note' | 'exam'
}

export function searchNotesAndExams(query: string, limit = 24): NotesSearchHit[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []

  const notes: NotesSearchHit[] = []
  for (const meta of listRegisteredTopics()) {
    const resolved = resolveTopicKit(meta.slug)
    if (!resolved) continue
    const hay = [
      resolved.kit.title,
      resolved.kit.subtitle,
      ...resolved.kit.syllabusTags,
      ...meta.syllabusHints,
      ...meta.subjectSlugs,
    ]
      .join(' ')
      .toLowerCase()
    if (!hay.includes(q)) continue
    const loc = primaryNotesLocation(meta)
    notes.push({
      kind: 'note',
      href: notesPath([loc.examSlug, loc.subjectSlug, loc.topicSlug]),
      title: resolved.kit.title,
      meta: resolved.kit.subtitle,
    })
  }

  const exams: NotesSearchHit[] = []
  for (const [slug, config] of Object.entries(EXAM_CONFIGS)) {
    const hay = `${config.name} ${slug} ${config.category}`.toLowerCase()
    if (!hay.includes(q)) continue
    exams.push({
      kind: 'exam',
      href: `/exams/${slug}`,
      title: config.name,
      meta: 'MCQ practice',
    })
  }

  const written = getNotesModule('css-written')
  if (written && `${written.name} css written`.toLowerCase().includes(q)) {
    exams.unshift({
      kind: 'exam',
      href: '/notes/css-written',
      title: written.name,
      meta: 'Written notes',
    })
  }

  return [...notes.slice(0, 16), ...exams.slice(0, 8)].slice(0, limit)
}

/** Prerender only canonical kit URLs — not every exam duplicate. */
export function listPrimaryKitStaticParams(): Array<{
  examSlug: string
  subjectSlug: string
  topicSlug: string
}> {
  return listRegisteredTopics().map((meta) => {
    const loc = primaryNotesLocation(meta)
    return {
      examSlug: loc.examSlug,
      subjectSlug: loc.subjectSlug,
      topicSlug: loc.topicSlug,
    }
  })
}

export function primaryHrefByTopicSlug(slugs: string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const slug of slugs) {
    const path = primaryNotesPathForSlug(slug)
    if (path) out[slug] = path
  }
  return out
}

export function buildNotesSitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${NOTES_BASE}/notes`,
      lastModified: NOTES_SITEMAP_LASTMOD,
      changeFrequency: 'weekly',
      priority: 0.92,
    },
  ]

  for (const examSlug of NOTES_INDEX_EXAMS) {
    const mod = getNotesModule(examSlug)
    if (!mod) continue
    entries.push({
      url: notesUrl([examSlug]),
      lastModified: NOTES_SITEMAP_LASTMOD,
      changeFrequency: 'weekly',
      priority: examSlug === 'css-written' || examSlug === 'css-mpt' ? 0.9 : 0.84,
    })
    for (const section of mod.sections) {
      const hasKits = listReadyKitsForExam(examSlug, section.slug).length > 0
      if (!hasKits) continue
      entries.push({
        url: notesUrl([examSlug, section.slug]),
        lastModified: NOTES_SITEMAP_LASTMOD,
        changeFrequency: 'weekly',
        priority: 0.78,
      })
    }
  }

  const seen = new Set<string>()
  for (const meta of listRegisteredTopics()) {
    const resolved = resolveTopicKit(meta.slug)
    if (!resolved) continue
    const loc = primaryNotesLocation(meta)
    const url = notesUrl([loc.examSlug, loc.subjectSlug, loc.topicSlug])
    if (seen.has(url)) continue
    seen.add(url)
    entries.push({
      url,
      lastModified: kitDateIso(resolved.kit.updated),
      changeFrequency: 'monthly',
      priority: 0.82,
    })
  }

  return entries
}

export function notesFaqItems(kit: NoteKitData, max = 6): Array<{ question: string; answer: string }> {
  return kit.flashcards
    .filter((c) => c.prompt.trim().length > 8 && c.answer.trim().length > 1)
    .slice(0, max)
    .map((c) => ({ question: c.prompt.replace(/\?*$/, '?'), answer: c.answer }))
}
