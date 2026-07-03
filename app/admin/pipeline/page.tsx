import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import NavigationBar from '@/components/NavigationBar'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'MCQ Quality Pipeline',
  robots: { index: false, follow: true },
}

const BANKS = [
  'current_affairs', 'pakistan_studies', 'general_knowledge', 'everyday_science',
  'islamiat', 'basic_computer', 'english', 'urdu', 'general_math', 'geography',
  'ethics_civics',
] as const

type BankRow = {
  bank: string
  total: number
  verified: number
  unverified: number
  needs_review: number
  needs_tier2: number
  quarantined: number
  time_sensitive: number
  tagged: number
}

async function fetchBankRow(supabase: any, bank: string): Promise<BankRow> {
  const [total, verified, unverified, needs_review, needs_tier2, quarantined, time_sensitive, tagged] = await Promise.all([
    supabase.from(bank).select('id', { count: 'exact', head: true }),
    supabase.from(bank).select('id', { count: 'exact', head: true }).eq('verification_status', 'verified'),
    supabase.from(bank).select('id', { count: 'exact', head: true }).eq('verification_status', 'unverified'),
    supabase.from(bank).select('id', { count: 'exact', head: true }).eq('verification_status', 'needs_review'),
    supabase.from(bank).select('id', { count: 'exact', head: true }).eq('verification_status', 'needs_tier2'),
    supabase.from(bank).select('id', { count: 'exact', head: true }).eq('verification_status', 'quarantined'),
    supabase.from(bank).select('id', { count: 'exact', head: true }).eq('time_sensitive', true),
    supabase.from(bank).select('id', { count: 'exact', head: true }).neq('target_exams', '{}'),
  ])
  return {
    bank,
    total: total.count || 0,
    verified: verified.count || 0,
    unverified: unverified.count || 0,
    needs_review: needs_review.count || 0,
    needs_tier2: needs_tier2.count || 0,
    quarantined: quarantined.count || 0,
    time_sensitive: time_sensitive.count || 0,
    tagged: tagged.count || 0,
  }
}

export default async function PipelinePage() {
  const authClient = await createServerSupabaseClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) redirect('/signin?next=/admin/pipeline')

  // Authorization: admin email or admin_users table (uses the user session)
  const isAdmin = user.email?.includes('admin') || user.user_metadata?.role === 'admin'
  if (!isAdmin) {
    const { data: adminRow } = await authClient.from('admin_users').select('id').eq('user_id', user.id).single()
    if (!adminRow) redirect('/')
  }

  // Data reads use the service-role client so they keep working after RLS is
  // locked down on the pipeline tables (mcq_archive/verification/dedupe_map etc.).
  // The admin authorization above already restricts this page to admins.
  const supabase = createAdminSupabaseClient()

  // Per-bank breakdown (parallel)
  const rows = await Promise.all(BANKS.map((b) => fetchBankRow(supabase, b)))

  // Totals
  const totals = rows.reduce(
    (acc, r) => ({
      total: acc.total + r.total,
      verified: acc.verified + r.verified,
      unverified: acc.unverified + r.unverified,
      needs_review: acc.needs_review + r.needs_review,
      needs_tier2: acc.needs_tier2 + r.needs_tier2,
      quarantined: acc.quarantined + r.quarantined,
      time_sensitive: acc.time_sensitive + r.time_sensitive,
      tagged: acc.tagged + r.tagged,
    }),
    { total: 0, verified: 0, unverified: 0, needs_review: 0, needs_tier2: 0, quarantined: 0, time_sensitive: 0, tagged: 0 }
  )

  // User reports + generation activity (pipeline audit tables were removed 2026-06)
  const [
    { count: pendingReports },
    { data: reportsByExam },
    { data: genRuns },
  ] = await Promise.all([
    supabase.from('question_reports').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('question_reports').select('question_type').eq('status', 'pending'),
    supabase.from('mcq_generation_runs').select('id, exam_slug, subject, accepted, started_at, finished_at').order('started_at', { ascending: false }).limit(10),
  ])

  const reportCounts: Record<string, number> = {}
  for (const r of reportsByExam ?? []) {
    const k = (r as { question_type: string }).question_type
    reportCounts[k] = (reportCounts[k] ?? 0) + 1
  }
  const topReportExams = Object.entries(reportCounts).sort((a, b) => b[1] - a[1]).slice(0, 8)

  const pct = (n: number, d: number) => (d ? Math.round((100 * n) / d) : 0)
  const verifiedPct = pct(totals.verified, totals.total)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MCQ Quality Pipeline</h1>
            <p className="text-sm text-gray-500 mt-1">Live status of dedupe + verification + tagging + generation</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/reports" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:border-blue-400">User reports →</Link>
            <Link href="/admin" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:border-blue-400">← Admin</Link>
          </div>
        </div>

        {/* Top-line metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs uppercase text-gray-500 font-semibold">Unique MCQs</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">{totals.total.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">across {BANKS.length} banks</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs uppercase text-gray-500 font-semibold">Verified</div>
            <div className="text-3xl font-bold text-emerald-600 mt-1">{totals.verified.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">{verifiedPct}% of bank</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs uppercase text-gray-500 font-semibold">Quarantined</div>
            <div className="text-3xl font-bold text-amber-600 mt-1">{totals.quarantined.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">outdated or none-of-options</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs uppercase text-gray-500 font-semibold">Needs review</div>
            <div className="text-3xl font-bold text-rose-600 mt-1">{totals.needs_review.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">ambiguous or mid-confidence</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Verification progress</h2>
            <span className="text-xs text-gray-500">{totals.verified.toLocaleString()} / {totals.total.toLocaleString()}</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600" style={{ width: `${verifiedPct}%` }} />
          </div>
          <div className="flex gap-4 text-xs text-gray-500 mt-3">
            <span>🟢 verified {totals.verified.toLocaleString()}</span>
            <span>🟡 needs review {totals.needs_review.toLocaleString()}</span>
            <span>🟠 needs tier-2 {totals.needs_tier2.toLocaleString()}</span>
            <span>🔴 quarantined {totals.quarantined.toLocaleString()}</span>
            <span>⏳ unverified {totals.unverified.toLocaleString()}</span>
            <span>🕒 time-sensitive {totals.time_sensitive.toLocaleString()}</span>
            <span>🏷 tagged {totals.tagged.toLocaleString()}</span>
          </div>
        </div>

        {/* Per-bank table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase text-gray-500">
                <th className="text-left px-4 py-3 font-semibold">Bank</th>
                <th className="text-right px-3 py-3 font-semibold">Total</th>
                <th className="text-right px-3 py-3 font-semibold">Verified</th>
                <th className="text-right px-3 py-3 font-semibold">% done</th>
                <th className="text-right px-3 py-3 font-semibold">Needs review</th>
                <th className="text-right px-3 py-3 font-semibold">Quarantined</th>
                <th className="text-right px-3 py-3 font-semibold">Tagged</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const p = pct(r.verified, r.total)
                return (
                  <tr key={r.bank} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.bank}</td>
                    <td className="text-right px-3 py-3 text-gray-700">{r.total.toLocaleString()}</td>
                    <td className="text-right px-3 py-3 text-emerald-700 font-medium">{r.verified.toLocaleString()}</td>
                    <td className="text-right px-3 py-3 text-gray-600">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${p}%` }} />
                        </div>
                        <span className="text-xs">{p}%</span>
                      </div>
                    </td>
                    <td className="text-right px-3 py-3 text-rose-700">{r.needs_review.toLocaleString()}</td>
                    <td className="text-right px-3 py-3 text-amber-700">{r.quarantined.toLocaleString()}</td>
                    <td className="text-right px-3 py-3 text-blue-700">{r.tagged.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* User reports backlog */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">User-reported questions</h2>
            <Link href="/admin/reports" className="text-xs text-blue-600 hover:underline">
              Triage all →
            </Link>
          </div>
          <div className="text-2xl font-bold text-rose-600">{pendingReports ?? 0} pending</div>
          {topReportExams.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {topReportExams.map(([exam, n]) => (
                <span key={exam} className="text-xs bg-rose-50 text-rose-700 border border-rose-100 px-2 py-1 rounded-full">
                  {exam}: {n}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Generation runs */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Recent generation runs</h2>
          <div className="space-y-2 max-h-[320px] overflow-y-auto">
            {(genRuns ?? []).map((run: { id: number; exam_slug: string; subject: string; accepted: number; started_at: string; finished_at: string | null }) => (
              <div key={run.id} className="text-xs border-l-2 pl-3 py-1.5 border-gray-200">
                <div className="flex justify-between">
                  <span className="font-mono text-gray-700">{run.exam_slug} · {run.subject}</span>
                  <span className="text-gray-400">{new Date(run.started_at).toLocaleDateString()}</span>
                </div>
                <div className="text-gray-500 mt-0.5">{run.accepted ?? 0} accepted{run.finished_at ? '' : ' · in progress'}</div>
              </div>
            ))}
            {(!genRuns || genRuns.length === 0) && (
              <p className="text-gray-400 text-sm">No generation runs logged yet.</p>
            )}
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          Verifier audit tables were retired in June 2026. Use user reports + generation runs for quality triage.
        </div>
      </div>
    </div>
  )
}
