#!/usr/bin/env npx tsx
/**
 * Regenerate quiz-app-mobile/src/lib/exam-configs.ts from the website's lib/exam-configs.ts.
 * Preserves mobile-only `css` hub (compulsory + optional subjects) and per-exam emojis.
 *
 * Run from quiz-app/:  npm run export:mobile-exams
 */
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { EXAM_CONFIGS as WEB, type ExamConfig as WebExam, type ExamSection as WebSection } from '../lib/exam-configs'
import { EXAM_CONFIGS as CURRENT_MOBILE, type ExamConfig as MobileExam, type ExamSection } from '../../quiz-app-mobile/src/lib/exam-configs'

const DEST = resolve(__dirname, '../../quiz-app-mobile/src/lib/exam-configs.ts')

/** Mobile-only exams not listed on the website (optional CSS subject bank). */
const MOBILE_ONLY_SLUGS = new Set(['css'])

const CATEGORY_FALLBACK_EMOJI: Record<string, string> = {
  medical: '🩺',
  engineering: '⚙️',
  css: '🏛️',
  pms: '📜',
  ppsc: '📋',
  fpsc: '🏛️',
  fia: '🛡️',
  provincial: '🏞️',
  police: '👮',
  military: '🎖️',
  nts: '📝',
  ots: '📄',
  etea: '📚',
  railways: '🚂',
  banks: '🏦',
  judiciary: '⚖️',
  hec: '🎓',
  devauth: '🏗️',
  rescue: '🚑',
  revenue: '💰',
}

function emojiFor(slug: string, category: string): string {
  return CURRENT_MOBILE[slug]?.emoji ?? CATEGORY_FALLBACK_EMOJI[category] ?? '📘'
}

function toMobileSection(s: WebSection): ExamSection {
  const out: ExamSection = { slug: s.slug, label: s.label, dbTable: s.dbTable }
  if (s.noTypeFilter) out.noTypeFilter = true
  if (s.subjectField) out.subjectField = s.subjectField
  if (s.subjectFields?.length) out.subjectFields = [...s.subjectFields]
  if (s.topicFields?.length) out.topicFields = [...s.topicFields]
  if (s.questionNeedles?.length) out.questionNeedles = [...s.questionNeedles]
  return out
}

function toMobileExam(slug: string, w: WebExam): MobileExam {
  const cfg: MobileExam = {
    name: w.name,
    category: w.category,
    emoji: emojiFor(slug, w.category),
    sections: w.sections.map(toMobileSection),
  }
  if (w.totalMCQs) cfg.totalMCQs = w.totalMCQs
  if (w.duration) cfg.duration = w.duration
  if (w.passingPercentage) cfg.passingPercentage = w.passingPercentage
  if (w.negativeMarking) cfg.negativeMarking = w.negativeMarking
  if (w.sourceExam) cfg.sourceExam = w.sourceExam
  if (w.sourceExamLabel) cfg.sourceExamLabel = w.sourceExamLabel
  return cfg
}

function emitSection(s: ExamSection, indent: string): string {
  const parts = [`slug: ${JSON.stringify(s.slug)}`, `label: ${JSON.stringify(s.label)}`, `dbTable: ${JSON.stringify(s.dbTable)}`]
  if (s.noTypeFilter) parts.push('noTypeFilter: true')
  if (s.subjectField) parts.push(`subjectField: ${JSON.stringify(s.subjectField)}`)
  if (s.subjectFields?.length) parts.push(`subjectFields: ${JSON.stringify(s.subjectFields)}`)
  if (s.topicFields?.length) parts.push(`topicFields: ${JSON.stringify(s.topicFields)}`)
  if (s.questionNeedles?.length) parts.push(`questionNeedles: ${JSON.stringify(s.questionNeedles)}`)
  return `${indent}{ ${parts.join(', ')} },`
}

function emitExamBlock(slug: string, cfg: MobileExam): string {
  const lines: string[] = []
  lines.push(`  ${JSON.stringify(slug)}: {`)
  lines.push(` name: ${JSON.stringify(cfg.name)},`)
  lines.push(`    category: ${JSON.stringify(cfg.category)},`)
  lines.push(`    emoji: ${JSON.stringify(cfg.emoji)},`)
  if (cfg.sourceExam) {
    lines.push(`    sourceExam: ${JSON.stringify(cfg.sourceExam)},`)
    if (cfg.sourceExamLabel) lines.push(`    sourceExamLabel: ${JSON.stringify(cfg.sourceExamLabel)},`)
  }
  if (cfg.totalMCQs != null) lines.push(`    totalMCQs: ${cfg.totalMCQs},`)
  if (cfg.duration != null) lines.push(`    duration: ${cfg.duration},`)
  if (cfg.passingPercentage != null) lines.push(`    passingPercentage: ${cfg.passingPercentage},`)
  if (cfg.negativeMarking) lines.push(`    negativeMarking: true,`)
  lines.push(`    sections: [`)
  for (const s of cfg.sections) lines.push(emitSection(s, ' '))
  lines.push(`    ],`)
  lines.push(`  },`)
  return lines.join('\n')
}

// Build ordered slug list: website order + mobile-only extras in category position
const webSlugs = Object.keys(WEB)
const orderedSlugs: string[] = []
for (const slug of webSlugs) {
  orderedSlugs.push(slug)
  if (slug === 'css-mpt' && CURRENT_MOBILE.css) orderedSlugs.push('css')
}
for (const slug of MOBILE_ONLY_SLUGS) {
  if (!orderedSlugs.includes(slug) && CURRENT_MOBILE[slug]) orderedSlugs.push(slug)
}

const mobileConfigs: Record<string, MobileExam> = {}
for (const slug of webSlugs) mobileConfigs[slug] = toMobileExam(slug, WEB[slug])
for (const slug of MOBILE_ONLY_SLUGS) {
  if (CURRENT_MOBILE[slug]) mobileConfigs[slug] = CURRENT_MOBILE[slug]
}

const examBlocks = orderedSlugs.map((slug) => emitExamBlock(slug, mobileConfigs[slug])).join('\n')
const total = orderedSlugs.length

const file = `// AUTO-GENERATED from the website's lib/exam-configs.ts - ${total} exams across 19 categories.
// Regenerate: cd quiz-app && npm run export:mobile-exams
// Mobile-only "css" hub (optional subjects) is preserved on regen.
export interface ExamSection {
  slug: string;
 label: string;
  dbTable: string;
  noTypeFilter?: boolean;
  subjectField?: string; // shared bank (css_mcqs_enhanced) sliced by its \`subject\` text column
  /** OR of subjects (e.g. Law-GAT Jurisprudence). */
  subjectFields?: string[];
  /** Exact topic match (any of) — preferred for Law-GAT syllabus slices. */
  topicFields?: string[];
  /** Prefer stems matching any needle (ILIKE). Used for specialist slices (e.g. FIA Act). */
  questionNeedles?: string[];
}

export interface ExamConfig {
 name: string;
  category: string;
  emoji: string;
  sections: ExamSection[];
  totalMCQs?: number;
  duration?: number;
  passingPercentage?: number;
  negativeMarking?: boolean;
  sourceExam?: string;
  sourceExamLabel?: string;
}

// Category display order matches the website's app/exams/page.tsx CATEGORY_ORDER exactly.
export const CATEGORY_ORDER = [
  "medical", "engineering", "hec", "css", "pms", "ppsc", "fpsc", "fia", "provincial", "police", "military",
  "nts", "ots", "etea", "railways", "banks", "judiciary", "devauth", "rescue", "revenue",
];

// Per-category accent (tint + soft background) for exam tiles / tabs keeps the
// big exam list colourful and easy to scan.
export const CATEGORY_COLORS: Record<string, { tint: string; bg: string }> = {
  medical:     { tint: "#15966B", bg: "#E7F4EF" },
  engineering: { tint: "#2F6FB0", bg: "#E8F0F8" },
  hec:         { tint: "#1D4ED8", bg: "#E8EEFC" },
  css:         { tint: "#3B5BDB", bg: "#EEF1FC" },
  pms:         { tint: "#7A45D9", bg: "#F2ECFC" },
  ppsc:        { tint: "#E07D00", bg: "#FCF3E6" },
  fpsc:        { tint: "#0E7490", bg: "#E4F1F4" },
  fia:         { tint: "#DC4A4F", bg: "#FBEBEC" },
  provincial:  { tint: "#C2410C", bg: "#FBEEE6" },
  police:      { tint: "#1E4FB6", bg: "#E9EEFB" },
  military:    { tint: "#4D7C0F", bg: "#EEF4E2" },
  nts:         { tint: "#9333EA", bg: "#F4ECFC" },
  ots:         { tint: "#0D9488", bg: "#E4F3F1" },
  etea:        { tint: "#0369A1", bg: "#E5F0F8" },
  railways:    { tint: "#92400E", bg: "#F7EFE6" },
  banks:       { tint: "#15803D", bg: "#E7F3EC" },
  judiciary:   { tint: "#6D28D9", bg: "#F0EBFB" },
  devauth:     { tint: "#2563EB", bg: "#E8EEFC" },
  rescue:      { tint: "#DC2626", bg: "#FBEAEA" },
  revenue:     { tint: "#B45309", bg: "#F8F0E3" },
};
export const categoryColor = (cat: string) => CATEGORY_COLORS[cat] ?? { tint: "#3B5BDB", bg: "#EEF1FC" };

export const CATEGORY_LABELS: Record<string, string> = {
  css: "CSS / Federal",
  pms: "PMS",
  medical: "Medical Entry",
  engineering: "Engineering Entry",
  hec: "HEC / ETC",
  ppsc: "PPSC Punjab",
 fpsc: "FPSC Federal",
  fia: "FIA",
  provincial: "Provincial PSC",
  police: "Police Service",
  military: "Military",
  nts: "NTS",
  ots: "OTS",
  etea: "ETEA",
  railways: "Railways",
  banks: "Banking",
  judiciary: "Judiciary",
  devauth: "Development Authorities",
  rescue: "Rescue 1122",
  revenue: "Revenue",
};

export const EXAM_CONFIGS: Record<string, ExamConfig> = {
${examBlocks}
};

import { plainText } from "./plain-text";
for (const cfg of Object.values(EXAM_CONFIGS)) {
  cfg.name = plainText(cfg.name);
  if (cfg.sourceExamLabel) cfg.sourceExamLabel = plainText(cfg.sourceExamLabel);
}
`

writeFileSync(DEST, file)
console.log(`Wrote ${total} exams (${webSlugs.length} from website + ${MOBILE_ONLY_SLUGS.size} mobile-only) → ${DEST}`)
