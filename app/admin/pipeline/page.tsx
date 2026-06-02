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

  // Recent activity
  const [{ data: archive }, { data: verification }, { data: dedupeMap }] = await Promise.all([
    supabase.from('mcq_archive').select('archive_id, source_table, original_id, question, action, reason, archived_at').order('archived_at', { ascending: false }).limit(15),
    supabase.from('mcq_verification').select('id, source_table, mcq_id, verdict, actual_answer, reason, confidence, model, tier, verified_at').order('verified_at', { ascending: false }).limit(25),
    supabase.from('mcq_dedupe_map').select('source_table, deleted_id, kept_id, mapped_at').order('mapped_at', { ascending: false }).limit(5),
  ])

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

        {/* Two-column: recent verifications + recent archive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
              Recent verifier verdicts
              <span className="text-xs text-gray-400 font-normal">{verification?.length ?? 0} shown</span>
            </h2>
            <div className="space-y-2 max-h-[480px] overflow-y-auto">
              {(verification ?? []).map((v) => (
                <div key={v.id} className="text-xs border-l-2 pl-3 py-1.5 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-gray-500">{v.source_table}#{v.mcq_id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      v.verdict === 'correct' ? 'bg-emerald-100 text-emerald-700' :
                      v.verdict === 'wrong' ? 'bg-rose-100 text-rose-700' :
                      v.verdict === 'outdated' ? 'bg-amber-100 text-amber-700' :
                      v.verdict === 'none_of_options' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>{v.verdict}</span>
                  </div>
                  {v.reason && <p className="text-gray-600 mt-1 line-clamp-2">{v.reason}</p>}
                  <div className="text-gray-400 mt-1 flex gap-2">
                    <span>tier {v.tier}</span>
                    <span>·</span>
                    <span>{v.confidence ? `conf ${Number(v.confidence).toFixed(2)}` : '—'}</span>
                    <span>·</span>
                    <span>{v.model}</span>
                  </div>
                </div>
              ))}
              {(!verification || verification.length === 0) && (
                <p className="text-gray-400 text-sm">No verifier output yet.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
              Recent destructive changes (archive)
              <span className="text-xs text-gray-400 font-normal">all reversible</span>
            </h2>
            <div className="space-y-2 max-h-[480px] overflow-y-auto">
              {(archive ?? []).map((a) => (
                <div key={a.archive_id} className="text-xs border-l-2 pl-3 py-1.5 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-gray-500">{a.source_table}#{a.original_id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      a.action === 'delete' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>{a.action}</span>
                  </div>
                  <p className="text-gray-700 mt-1 line-clamp-2">{a.question}</p>
                  <div className="text-gray-400 mt-1">{a.reason}</div>
                </div>
              ))}
              {(!archive || archive.length === 0) && (
                <p className="text-gray-400 text-sm">No archived changes yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          Refresh the page to see new verifier output as background agents work.
        </div>
      </div>
    </div>
  )
}
