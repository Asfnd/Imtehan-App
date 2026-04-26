import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { mergedMetadataOnDeactivate, shouldDeactivateExpiredPremiumInDb } from '@/lib/deactivate-expired-premium'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const header = request.headers.get('authorization')
  return header === `Bearer ${secret}`
}

/**
 * Nightly: scan auth users and set is_premium = false in DB for timed plans past expires_at.
 * Set CRON_SECRET in Vercel + schedule (see vercel.json). Manual: curl with Authorization: Bearer.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const supabase = getAdminClient()
  const perPage = 200
  let nextPage: number | null = 1
  let scanned = 0
  let updated = 0
  const errors: string[] = []

  while (nextPage != null) {
    const { data, error } = await supabase.auth.admin.listUsers({ page: nextPage, perPage })
    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('listUsers:', error)
      }
      return NextResponse.json(
        { error: 'List users failed', detail: error.message, scanned, updated },
        { status: 500 }
      )
    }

    const payload = data as { users: { id: string; user_metadata: Record<string, unknown> | null }[]; nextPage: number | null }
    const { users, nextPage: n } = payload
    if (!users?.length) break

    scanned += users.length

    for (const u of users) {
      if (!shouldDeactivateExpiredPremiumInDb(u.user_metadata)) {
        continue
      }
      const merged = mergedMetadataOnDeactivate(u.user_metadata)
      const { error: upErr } = await supabase.auth.admin.updateUserById(u.id, { user_metadata: merged })
      if (upErr) {
        errors.push(`${u.id}: ${upErr.message}`)
        if (errors.length > 20) break
        continue
      }
      updated += 1
    }
    if (errors.length > 20) {
      return NextResponse.json(
        { ok: false, scanned, updated, errors, message: 'Too many update errors; partial run' },
        { status: 500 }
      )
    }

    nextPage = n ?? null
  }

  return NextResponse.json({ ok: true, scanned, updated, errors: errors.length ? errors : undefined })
}

export const dynamic = 'force-dynamic'
export const maxDuration = 300
