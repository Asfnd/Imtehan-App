/**
 * Materialize stem-deduped MCQ sets to disk so practice traffic never hits Supabase.
 *
 * Output: {out}/v1/{poolId}/manifest.json + s/{n}.json
 *
 *   npx tsx scripts/export-static-mcq-banks.ts
 *   npx tsx scripts/export-static-mcq-banks.ts --exam=css-mpt --out=./data/banks
 *   npx tsx scripts/export-static-mcq-banks.ts --resume --max-pools=50
 *
 * Prefer service role + run when the project is healthy. Re-run anytime; --resume skips
 * pools that already have a manifest.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { promises as fs } from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { EXAM_CONFIGS } from '@/lib/exam-configs'
import {
  bankPoolId,
  BANKS_VERSION,
  type BankManifest,
  type BankPoolKey,
  type BankSetFile,
} from '@/lib/banks-pool'
import { applyBankExamScope } from '@/lib/mcq-bank-scope'
import { mcqSelectCols, normalizeQuizMcqRow } from '@/lib/quiz-fetcher'
import { normalizeQuestionStem, SET_SIZE, type QuizMcqRow } from '@/lib/set-integrity'
import { TABLE_POPULAR_TAGS, isTagArrayTable, difficultyDbValue, topicDbValue } from '@/lib/topic-tags'

dotenv.config({ path: '.env.local' })
dotenv.config()

const BATCH = 400
const SCAN_MAX = 80_000

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`))
  return hit?.slice(name.length + 3)
}

function hasFlag(name: string): boolean {
  return process.argv.includes(`--${name}`)
}

function createClientOrDie(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.error('Need NEXT_PUBLIC_SUPABASE_URL + anon/service key in .env.local')
    process.exit(1)
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Using anon key — export may be slower / RLS-limited.\n')
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

type QueryFactory = () => any

async function loadAllDeduped(buildQuery: QueryFactory): Promise<QuizMcqRow[]> {
  const seen = new Set<string>()
  const out: QuizMcqRow[] = []
  let offset = 0
  while (offset < SCAN_MAX) {
    const { data, error } = await buildQuery()
      .order('id', { ascending: true })
      .range(offset, offset + BATCH - 1)
    if (error) throw new Error(error.message)
    const rows = (data as Record<string, unknown>[] | null) ?? []
    if (rows.length === 0) break
    for (const raw of rows) {
      const m = normalizeQuizMcqRow(raw)
      if (!m) continue
      const stem = normalizeQuestionStem(m.question)
      if (seen.has(stem)) continue
      seen.add(stem)
      out.push(m)
    }
    offset += BATCH
    if (rows.length < BATCH) break
  }
  return out
}

function modeQuery(
  supabase: SupabaseClient,
  key: BankPoolKey
): QueryFactory {
  return () => {
    let query = supabase.from(key.dbTable).select(mcqSelectCols(key.dbTable))
    const mixed =
      !!key.noTypeFilter ||
      !!key.subjectField ||
      !!(key.subjectFields && key.subjectFields.length) ||
      !!(key.topicFields && key.topicFields.length) ||
      key.mode === 'mixed'
    if (!mixed && key.mode) query = query.eq('type', key.mode)
    query = applyBankExamScope(query, {
      dbTable: key.dbTable,
      examSlug: key.examSlug,
      targetExam: key.targetExam,
      subjectField: key.subjectField,
      subjectFields: key.subjectFields,
      subtopicField: key.subtopicField,
      topicFields: key.topicFields,
      questionNeedles: key.questionNeedles,
      scopeMode: 'family',
    })
    return query
  }
}

function difficultyQuery(supabase: SupabaseClient, key: BankPoolKey): QueryFactory {
  const d = key.difficulty || 'easy'
  const variants = Array.from(
    new Set([d, d.charAt(0).toUpperCase() + d.slice(1).toLowerCase(), d.toLowerCase()])
  )
  return () => {
    let query = supabase
      .from(key.dbTable)
      .select(mcqSelectCols(key.dbTable))
      .in('difficulty', variants)
    query = applyBankExamScope(query, {
      dbTable: key.dbTable,
      examSlug: key.examSlug,
      subjectField: key.subjectField,
    })
    return query
  }
}

function topicQuery(supabase: SupabaseClient, key: BankPoolKey): QueryFactory {
  return () => {
    let base = supabase.from(key.dbTable).select(mcqSelectCols(key.dbTable))
    base = key.useTagsArray
      ? base.contains('tags', [key.tag!])
      : base.eq('topic', key.tag!)
    return applyBankExamScope(base, { dbTable: key.dbTable, examSlug: key.examSlug })
  }
}

function mdcatQuery(supabase: SupabaseClient, key: BankPoolKey): QueryFactory {
  return () => {
    let query = supabase.from(key.dbTable).select(mcqSelectCols(key.dbTable))
    if (key.difficulty) {
      const d = key.difficulty
      const variants = Array.from(
        new Set([d, d.charAt(0).toUpperCase() + d.slice(1).toLowerCase(), d.toLowerCase()])
      )
      query = query.in('difficulty', variants)
    } else if (key.tag) {
      query = query.eq('topic', key.tag)
    }
    return query
  }
}

async function materializePool(
  supabase: SupabaseClient,
  key: BankPoolKey,
  outRoot: string
): Promise<{ poolId: string; total: number; setCount: number }> {
  const poolId = bankPoolId(key)
  const dir = path.join(outRoot, BANKS_VERSION, poolId)
  const setDir = path.join(dir, 's')
  await fs.mkdir(setDir, { recursive: true })

  const build =
    key.kind === 'difficulty'
      ? difficultyQuery(supabase, key)
      : key.kind === 'topic'
        ? topicQuery(supabase, key)
        : key.kind === 'mdcat'
          ? mdcatQuery(supabase, key)
          : modeQuery(supabase, key)

  const rows = await loadAllDeduped(build)
  if (rows.length === 0) {
    // Never write empty manifests — they poison counts to 0 and block fallback.
    return { poolId, total: 0, setCount: 0, skippedEmpty: true as const }
  }

  const setCount = Math.ceil(rows.length / SET_SIZE) || 0
  for (let n = 1; n <= setCount; n++) {
    const slice = rows.slice((n - 1) * SET_SIZE, n * SET_SIZE)
    const file: BankSetFile = {
      poolId,
      setNumber: n,
      setSize: SET_SIZE,
      mcqs: slice.map((m) => ({
        id: m.id,
        question: m.question,
        option_a: m.option_a,
        option_b: m.option_b,
        option_c: m.option_c,
        option_d: m.option_d,
        correct_answer: m.correct_answer,
        explanation: m.explanation,
      })),
    }
    await fs.writeFile(path.join(setDir, `${n}.json`), JSON.stringify(file))
  }

  const man: BankManifest = {
    poolId,
    total: rows.length,
    setCount,
    setSize: SET_SIZE,
    key,
    generatedAt: new Date().toISOString(),
  }
  await fs.writeFile(path.join(dir, 'manifest.json'), JSON.stringify(man, null, 2))
  return { poolId, total: rows.length, setCount, skippedEmpty: false as const }
}

function collectPools(examFilter?: string): BankPoolKey[] {
  const map = new Map<string, BankPoolKey>()
  const add = (key: BankPoolKey) => {
    map.set(bankPoolId(key), key)
  }

  for (const [examSlug, config] of Object.entries(EXAM_CONFIGS)) {
    if (examFilter && examSlug !== examFilter) continue
    for (const section of config.sections) {
      const base = {
        dbTable: section.dbTable,
        subjectField: section.subjectField,
        subjectFields: section.subjectFields,
        topicFields: section.topicFields,
        questionNeedles: section.questionNeedles,
        subtopicField: section.subtopicField,
        examSlug,
        targetExam: config.targetExam,
      }

      const sliced =
        !!section.noTypeFilter ||
        !!section.subjectField ||
        !!(section.subjectFields && section.subjectFields.length) ||
        !!(section.topicFields && section.topicFields.length) ||
        !!section.subtopicField

      // Mobile "Practice" module = mixed / no type filter (all types).
      add({ kind: 'mode', ...base, mode: 'practice', noTypeFilter: true })

      if (!sliced) {
        for (const mode of ['practice', 'most_important', 'most_repeated'] as const) {
          add({ kind: 'mode', ...base, mode, noTypeFilter: false })
        }
      }

      // Difficulty hubs (shared tables)
      for (const level of ['easy', 'medium', 'hard'] as const) {
        const d = difficultyDbValue(level, section.dbTable)
        add({
          kind: 'difficulty',
          dbTable: section.dbTable,
          difficulty: d,
          subjectField: section.subjectField,
          examSlug,
          noTypeFilter: true,
        })
      }

      // Popular tags / topics — store DB topic values (not URL slugs) in the pool key.
      const tags = TABLE_POPULAR_TAGS[section.dbTable]
      if (tags?.length) {
        const useTagsArray = isTagArrayTable(section.dbTable)
        for (const tag of tags) {
          const dbTag = useTagsArray ? tag : topicDbValue(tag, section.dbTable)
          add({
            kind: 'topic',
            dbTable: section.dbTable,
            tag: dbTag,
            useTagsArray,
            examSlug,
            noTypeFilter: true,
          })
        }
      }

      // MDCAT-style range pools (subject tables with noTypeFilter)
      if (section.noTypeFilter && !section.subjectField) {
        add({
          kind: 'mdcat',
          dbTable: section.dbTable,
          noTypeFilter: true,
        })
        for (const level of ['easy', 'medium', 'hard'] as const) {
          add({
            kind: 'mdcat',
            dbTable: section.dbTable,
            difficulty: difficultyDbValue(level, section.dbTable),
            noTypeFilter: true,
          })
        }
      }
    }
  }

  return [...map.values()]
}

async function main() {
  const outRoot = path.resolve(arg('out') || path.join(process.cwd(), 'data', 'banks'))
  const examFilter = arg('exam')
  const resume = hasFlag('resume')
  const pruneEmpty = hasFlag('prune-empty') || true
  const maxPools = arg('max-pools') ? Number(arg('max-pools')) : Infinity
  const sleepMs = arg('sleep-ms') ? Number(arg('sleep-ms')) : 50

  if (pruneEmpty) {
    const v1 = path.join(outRoot, BANKS_VERSION)
    try {
      const dirs = await fs.readdir(v1)
      let pruned = 0
      for (const id of dirs) {
        const manPath = path.join(v1, id, 'manifest.json')
        try {
          const man = JSON.parse(await fs.readFile(manPath, 'utf8')) as BankManifest
          if (!man.total || !man.setCount) {
            await fs.rm(path.join(v1, id), { recursive: true, force: true })
            pruned++
          }
        } catch {
          /* ignore */
        }
      }
      if (pruned) console.log(`Pruned ${pruned} empty pool dirs`)
    } catch {
      /* no banks yet */
    }
  }

  const pools = collectPools(examFilter)
  console.log(
    `Pools to export: ${pools.length}${examFilter ? ` (exam=${examFilter})` : ''} → ${outRoot}`
  )

  const supabase = createClientOrDie()
  let done = 0
  let skipped = 0
  let empty = 0
  let failed = 0

  for (const key of pools) {
    if (done >= maxPools) break
    const poolId = bankPoolId(key)
    const manPath = path.join(outRoot, BANKS_VERSION, poolId, 'manifest.json')
    if (resume) {
      try {
        const man = JSON.parse(await fs.readFile(manPath, 'utf8')) as BankManifest
        if (man.total > 0 && man.setCount > 0) {
          skipped++
          continue
        }
      } catch {
        /* export */
      }
    }

    try {
      const r = await materializePool(supabase, key, outRoot)
      if (r.skippedEmpty) {
        empty++
        // Remove any prior empty dir
        await fs.rm(path.join(outRoot, BANKS_VERSION, poolId), { recursive: true, force: true }).catch(() => {})
        console.log(`[skip-empty] ${key.kind} ${key.dbTable} ${key.mode || key.difficulty || key.tag || ''} (${poolId})`)
      } else {
        done++
        console.log(
          `[${done}+${skipped}] ${key.kind} ${key.dbTable} ${key.mode || key.difficulty || key.tag || ''} → ${r.total} Q / ${r.setCount} sets (${poolId})`
        )
      }
    } catch (e) {
      failed++
      console.error(`FAIL ${poolId} ${key.kind} ${key.dbTable}:`, e)
    }

    if (sleepMs > 0) await new Promise((r) => setTimeout(r, sleepMs))
  }

  console.log(`\nDone. exported=${done} skipped=${skipped} empty=${empty} failed=${failed}`)
  console.log(`Serve with Caddy / volume mount, or copy to public/banks/${BANKS_VERSION}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
