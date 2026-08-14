import { EXAM_CONFIGS, getExamConfig } from '@/lib/exam-configs'
import { getTopicsForExamSection } from '@/lib/exam-syllabus-map'
import { slugifyTopic } from '@/lib/notes/slugify'
import type { NoteTrack, NotesModule, NotesModuleSection } from '@/lib/notes/types'
import { getRegisteredTopicForSubject, listRegisteredTopics } from '@/lib/notes/topic-registry'

const WRITTEN_TRACK_SLUGS = new Set(['css-written', 'pms-competitive'])

const CSS_WRITTEN_SECTIONS: NotesModuleSection[] = [
  { slug: 'pakistan-affairs', label: 'Pakistan Affairs', dbTable: 'pakistan_studies' },
  { slug: 'current-affairs', label: 'Current Affairs', dbTable: 'current_affairs' },
  { slug: 'islamic-studies', label: 'Islamic Studies', dbTable: 'islamiat' },
  { slug: 'english-essay', label: 'English Essay', dbTable: 'english' },
  { slug: 'english-precis', label: 'Precis and Composition', dbTable: 'english' },
  { slug: 'geography', label: 'Geography', dbTable: 'geography' },
  { slug: 'ethics-civics', label: 'Ethics and Governance', dbTable: 'ethics_civics' },
]

/** FPSC Pakistan Affairs compulsory outline (CE-2016 onwards), Phase 1 nodes. */
export const CSS_WRITTEN_PA_TOPICS: string[] = [
  'Ideology of Pakistan: definition, history, Iqbal and Quaid',
  'Lahore Resolution (Pakistan Resolution) 1940',
  'Land and people of Pakistan: geography, society, resources',
  'Constitutional development: 1956, 1962, 1973 and amendments',
  '1973 Constitution of Pakistan',
  'Objectives Resolution and Article 2A',
  '18th Amendment (2010)',
  'Recent constitutional and legal debates (syllabus XXVII)',
  'Political evolution since 1971',
  'Evolution of democratic system in Pakistan',
  'Civil-military relations in Pakistan',
  'Foreign policy of Pakistan post 9/11',
  'Pakistan and India relations since 1947',
  'Economic conditions and Economic Survey',
  'Prevailing social problems: poverty, education, health',
]

function trackForExam(slug: string, category: string): NoteTrack {
  if (WRITTEN_TRACK_SLUGS.has(slug)) return 'written'
  if (category === 'css' || category === 'pms') return 'fact'
  return 'fact'
}

function buildCssWrittenModule(): NotesModule {
  return {
    slug: 'css-written',
    name: 'CSS Written (Compulsory)',
    category: 'css',
    track: 'written',
    hasMcqPractice: false,
    sections: CSS_WRITTEN_SECTIONS,
  }
}

export function getNotesModule(examSlug: string): NotesModule | null {
  if (examSlug === 'css-written') return buildCssWrittenModule()
  const config = getExamConfig(examSlug)
  if (!config) return null
  return {
    slug: examSlug,
    name: config.name,
    category: config.category,
    track: trackForExam(examSlug, config.category),
    hasMcqPractice: true,
    sections: config.sections.map((s) => ({
      slug: s.slug,
      label: s.label,
      dbTable: s.dbTable,
    })),
  }
}

export function listNotesModules(): NotesModule[] {
  const fromConfigs = Object.entries(EXAM_CONFIGS).map(([slug, config]) => ({
    slug,
    name: config.name,
    category: config.category,
    track: trackForExam(slug, config.category),
    hasMcqPractice: true,
    sections: config.sections.map((s) => ({
      slug: s.slug,
      label: s.label,
      dbTable: s.dbTable,
    })),
  }))
  return [buildCssWrittenModule(), ...fromConfigs]
}

export function listNotesModulesByCategory(): Array<{
  category: string
  modules: NotesModule[]
}> {
  const groups = new Map<string, NotesModule[]>()
  for (const mod of listNotesModules()) {
    const list = groups.get(mod.category) ?? []
    list.push(mod)
    groups.set(mod.category, list)
  }
  const preferred = [
    'css',
    'pms',
    'ppsc',
    'fpsc',
    'nts',
    'provincial',
    'medical',
    'engineering',
  ]
  const keys = [
    ...preferred.filter((k) => groups.has(k)),
    ...[...groups.keys()].filter((k) => !preferred.includes(k)).sort(),
  ]
  return keys.map((category) => ({
    category,
    modules: (groups.get(category) ?? []).sort((a, b) => a.name.localeCompare(b.name)),
  }))
}

export type SyllabusTopicRow = {
  slug: string
  title: string
  hasKit: boolean
  contentId?: string
}

function topicsForWrittenPa(): SyllabusTopicRow[] {
  const registered = listRegisteredTopics().filter((t) =>
    t.subjectSlugs.includes('pakistan-affairs')
  )
  const rows: SyllabusTopicRow[] = CSS_WRITTEN_PA_TOPICS.map((title) => {
    const slug = slugifyTopic(title)
    const hit = registered.find(
      (t) =>
        t.slug === slug ||
        t.syllabusHints.some((h) => title.toLowerCase().includes(h.toLowerCase()))
    )
    return {
      slug: hit?.slug ?? slug,
      title: hit?.title ?? title,
      hasKit: Boolean(hit),
      contentId: hit?.contentId,
    }
  })
  // Ensure registered kits appear even if not exact syllabus string match
  for (const hit of registered) {
    if (!rows.some((r) => r.slug === hit.slug)) {
      rows.unshift({
        slug: hit.slug,
        title: hit.title,
        hasKit: true,
        contentId: hit.contentId,
      })
    }
  }
  return rows
}

export function listSyllabusTopicsForSection(
  examSlug: string,
  subjectSlug: string
): SyllabusTopicRow[] {
  const mod = getNotesModule(examSlug)
  if (!mod) return []
  const section = mod.sections.find((s) => s.slug === subjectSlug)
  if (!section) return []

  if (examSlug === 'css-written' && subjectSlug === 'pakistan-affairs') {
    return topicsForWrittenPa()
  }

  const titles = getTopicsForExamSection(examSlug, section.dbTable)
  const registered = getRegisteredTopicForSubject(subjectSlug)
  const rows: SyllabusTopicRow[] = titles.map((title) => {
    const slug = slugifyTopic(title)
    const hit = registered.find(
      (t) =>
        t.slug === slug ||
        t.syllabusHints.some((h) => title.toLowerCase().includes(h.toLowerCase()))
    )
    return {
      slug: hit?.slug ?? slug,
      title: hit && hit.syllabusHints.some((h) => title.toLowerCase().includes(h.toLowerCase()))
        ? hit.title
        : title,
      hasKit: Boolean(hit),
      contentId: hit?.contentId,
    }
  })

  for (const hit of registered) {
    if (!rows.some((r) => r.slug === hit.slug || r.contentId === hit.contentId)) {
      rows.unshift({
        slug: hit.slug,
        title: hit.title,
        hasKit: true,
        contentId: hit.contentId,
      })
    }
  }

  // De-dupe by slug
  const seen = new Set<string>()
  return rows.filter((r) => {
    if (seen.has(r.slug)) return false
    seen.add(r.slug)
    return true
  })
}

export function countKitsForModule(examSlug: string): number {
  const mod = getNotesModule(examSlug)
  if (!mod) return 0
  let n = 0
  for (const section of mod.sections) {
    n += listSyllabusTopicsForSection(examSlug, section.slug).filter((t) => t.hasKit).length
  }
  return n
}

export function categoryLabel(category: string): string {
  const map: Record<string, string> = {
    css: 'CSS',
    pms: 'PMS',
    ppsc: 'PPSC',
    fpsc: 'FPSC',
    nts: 'NTS',
    provincial: 'Provincial PSC',
    medical: 'Medical / MDCAT',
    engineering: 'Engineering',
    educators: 'Educators',
    police: 'Police',
  }
  return map[category] ?? category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
