'use client'

// Auth is handled by Supabase client-side, no store needed
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
