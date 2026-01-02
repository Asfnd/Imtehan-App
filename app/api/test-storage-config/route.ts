import { NextResponse } from 'next/server'
import { STORAGE_CONFIG } from '@/lib/storage-config'

export async function GET() {
  return NextResponse.json({
    customDomain: STORAGE_CONFIG.customDomain,
    supabaseDomain: STORAGE_CONFIG.supabaseDomain,
    activeStorageUrl: STORAGE_CONFIG.getStorageUrl(),
    isCustomDomainEnabled: STORAGE_CONFIG.isCustomDomainEnabled(),
    env: {
      NEXT_PUBLIC_STORAGE_URL: process.env.NEXT_PUBLIC_STORAGE_URL || 'NOT SET',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
    }
  })
}
