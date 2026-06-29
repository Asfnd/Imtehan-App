#!/usr/bin/env npx tsx
/** Export per-exam guide copy from web config → mobile JSON (run after web exam-configs changes). */
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { EXAM_CONFIGS } from '../lib/exam-configs'

const out: Record<string, unknown> = {}
for (const [slug, cfg] of Object.entries(EXAM_CONFIGS)) {
  if (cfg.guide) out[slug] = cfg.guide
}

const dest = resolve(__dirname, '../../quiz-app-mobile/src/data/exam-guide-copy.json')
writeFileSync(dest, JSON.stringify(out, null, 2) + '\n')
console.log(`Wrote ${Object.keys(out).length} exam guides → ${dest}`)
