/**
 * End-to-end validation for static MCQ banks.
 *   npx tsx scripts/validate-static-banks.ts
 *   npx tsx scripts/validate-static-banks.ts --live
 */

import { promises as fs } from 'fs'
import path from 'path'
import { bankPoolId, BANKS_VERSION, type BankManifest, type BankSetFile } from '@/lib/banks-pool'

const ANSWERS = new Set(['A', 'B', 'C', 'D'])

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`))
  return hit?.slice(name.length + 3)
}

function hasFlag(name: string): boolean {
  return process.argv.includes(`--${name}`)
}

async function auditLocal(root: string) {
  const v1 = path.join(root, BANKS_VERSION)
  const pools = await fs.readdir(v1)
  let ok = 0
  let empty = 0
  let bad = 0
  let totalQ = 0
  const failures: string[] = []

  for (const id of pools) {
    const manPath = path.join(v1, id, 'manifest.json')
    let man: BankManifest
    try {
      man = JSON.parse(await fs.readFile(manPath, 'utf8'))
    } catch {
      bad++
      failures.push(`${id}: missing/invalid manifest`)
      continue
    }
    if (!man.total || !man.setCount) {
      empty++
      failures.push(`${id}: empty manifest (${man.key?.kind} ${man.key?.dbTable})`)
      continue
    }
    totalQ += man.total

    // Spot-check first, middle, last set
    const samples = [1, Math.ceil(man.setCount / 2), man.setCount].filter(
      (n, i, a) => a.indexOf(n) === i
    )
    for (const n of samples) {
      const setPath = path.join(v1, id, 's', `${n}.json`)
      let file: BankSetFile
      try {
        file = JSON.parse(await fs.readFile(setPath, 'utf8'))
      } catch {
        bad++
        failures.push(`${id}: missing set ${n}`)
        continue
      }
      const mcqs = file.mcqs || []
      if (!mcqs.length) {
        bad++
        failures.push(`${id}/s/${n}: no mcqs`)
        continue
      }
      for (const q of mcqs) {
        const ans = String(q.correct_answer || '').charAt(0).toUpperCase()
        if (
          !q.question ||
          !q.option_a ||
          !q.option_b ||
          !q.option_c ||
          !q.option_d ||
          !ANSWERS.has(ans)
        ) {
          bad++
          failures.push(`${id}/s/${n}: bad mcq id=${q.id}`)
          break
        }
      }
    }
    ok++
  }

  return { pools: pools.length, ok, empty, bad, totalQ, failures }
}

async function liveProbe(base: string, poolIds: string[]) {
  const results: { url: string; status: number; mcqs?: number }[] = []
  for (const id of poolIds.slice(0, 8)) {
    const manUrl = `${base}/${id}/manifest.json`
    const setUrl = `${base}/${id}/s/1.json`
    for (const url of [manUrl, setUrl]) {
      try {
        const res = await fetch(url, { headers: { Accept: 'application/json' } })
        let mcqs: number | undefined
        if (url.endsWith('.json') && res.ok && url.includes('/s/')) {
          const j = (await res.json()) as BankSetFile
          mcqs = j.mcqs?.length
        }
        results.push({ url, status: res.status, mcqs })
      } catch (e) {
        results.push({ url, status: 0 })
      }
    }
  }
  return results
}

async function practiceApiProbe(apiBase: string) {
  const bodies = [
    {
      name: 'css-english-past-set1',
      body: {
        source: 'exam',
        examSlug: 'css-mpt',
        subjectSlug: 'english',
        mode: 'past-papers',
        setNumber: 1,
      },
    },
    {
      name: 'css-english-practice-set1',
      body: {
        source: 'exam',
        examSlug: 'css-mpt',
        subjectSlug: 'english',
        mode: 'practice',
        setNumber: 1,
      },
    },
    {
      name: 'mdcat-biology-set1',
      body: {
        source: 'mdcat',
        dbTable: 'mdcat_biology',
        setNumber: 1,
      },
    },
    {
      name: 'mdcat-biology-easy-set1',
      body: {
        source: 'difficulty',
        dbTable: 'mdcat_biology',
        difficulty: 'Easy',
        examSlug: 'mdcat',
        setNumber: 1,
      },
    },
  ]

  const out: { name: string; status: number; count: number; error?: string }[] = []
  for (const { name, body } of bodies) {
    try {
      const res = await fetch(`${apiBase}/api/practice/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      })
      const j = (await res.json().catch(() => ({}))) as {
        mcqs?: unknown[]
        error?: string
        code?: string
      }
      out.push({
        name,
        status: res.status,
        count: Array.isArray(j.mcqs) ? j.mcqs.length : 0,
        error: j.error || j.code,
      })
    } catch (e) {
      out.push({ name, status: 0, count: 0, error: String(e) })
    }
  }
  return out
}

async function main() {
  const root = path.resolve(arg('out') || path.join(process.cwd(), 'data', 'banks'))
  const live = hasFlag('live')
  const apiBase = (arg('api') || 'https://imtehan.com').replace(/\/$/, '')
  const banksBase = (arg('banks') || `${apiBase}/banks/v1`).replace(/\/$/, '')

  console.log('=== Local bank audit ===')
  const audit = await auditLocal(root)
  console.log(
    JSON.stringify(
      {
        pools: audit.pools,
        ok: audit.ok,
        empty: audit.empty,
        bad: audit.bad,
        totalQ: audit.totalQ,
        failSample: audit.failures.slice(0, 15),
      },
      null,
      2
    )
  )

  // Stable pool ids we know should exist after CSS/MDCAT export
  const known = [
    bankPoolId({
      kind: 'mode',
      dbTable: 'english',
      mode: 'practice',
      noTypeFilter: true,
      examSlug: 'css-mpt',
    }),
    bankPoolId({
      kind: 'mode',
      dbTable: 'english',
      mode: 'practice',
      noTypeFilter: false,
      examSlug: 'css-mpt',
    }),
    bankPoolId({
      kind: 'mdcat',
      dbTable: 'mdcat_biology',
      noTypeFilter: true,
    }),
  ]
  console.log('known pool ids', known)

  if (live) {
    console.log('\n=== Live CDN probe ===')
    const probes = await liveProbe(banksBase, known)
    console.log(JSON.stringify(probes, null, 2))

    console.log('\n=== Practice API probe ===')
    const api = await practiceApiProbe(apiBase)
    console.log(JSON.stringify(api, null, 2))
  }

  const failed =
    audit.empty > 0 ||
    audit.bad > 0 ||
    audit.ok === 0
  if (failed) {
    console.error('\nVALIDATION FAILED')
    process.exit(1)
  }
  console.log('\nVALIDATION OK')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
