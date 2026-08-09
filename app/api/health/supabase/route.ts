import { NextResponse } from 'next/server'
import { probeAndMaybeClearSoft } from '@/lib/supabase-soft'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Ops/health: probe Auth and clear auto soft when DB is healthy again. */
export async function GET() {
  const result = await probeAndMaybeClearSoft()
  return NextResponse.json({ ok: true, ...result })
}
