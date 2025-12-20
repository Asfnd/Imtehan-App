'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthDebugPage() {
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    console.log(message)
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    const supabase = createClient()
    
    const checkAuth = async () => {
      addLog('Checking authentication...')
      
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        addLog(`getUser result: ${user ? `User found: ${user.email}` : 'No user'}, Error: ${error?.message || 'None'}`)
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        addLog(`getSession result: ${session ? `Session found, expires: ${session.expires_at}` : 'No session'}, Error: ${sessionError?.message || 'None'}`)
        
        setUser(user)
        setSession(session)
        setLoading(false)
      } catch (err) {
        addLog(`Auth check error: ${err}`)
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      addLog(`Auth state change: ${event}, Session: ${session ? 'Present' : 'None'}`)
      setUser(session?.user || null)
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignIn = async () => {
    const supabase = createClient()
    addLog('Starting Google sign-in...')
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/auth-debug')}`,
        }
      })
      
      addLog(`Sign-in initiated: ${error ? `Error: ${error.message}` : 'Success'}`)
    } catch (err) {
      addLog(`Sign-in error: ${err}`)
    }
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    addLog('Signing out...')
    
    try {
      const { error } = await supabase.auth.signOut()
      addLog(`Sign-out: ${error ? `Error: ${error.message}` : 'Success'}`)
    } catch (err) {
      addLog(`Sign-out error: ${err}`)
    }
  }

  const clearLogs = () => {
    setLogs([])
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Auth Status */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Authentication Status</h2>
          <div className="space-y-2">
            <p><strong>User:</strong> {user ? user.email : 'Not signed in'}</p>
            <p><strong>User ID:</strong> {user?.id || 'None'}</p>
            <p><strong>Session:</strong> {session ? 'Active' : 'None'}</p>
            <p><strong>Session Expires:</strong> {session?.expires_at || 'N/A'}</p>
            <p><strong>Provider:</strong> {user?.app_metadata?.provider || 'None'}</p>
          </div>
          
          <div className="mt-4 space-x-2">
            {user ? (
              <button 
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            ) : (
              <button 
                onClick={handleSignIn}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>

        {/* Debug Logs */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Debug Logs</h2>
            <button 
              onClick={clearLogs}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
          <div className="bg-black text-green-400 p-3 rounded text-xs font-mono h-64 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
            {logs.length === 0 && <div>No logs yet...</div>}
          </div>
        </div>
      </div>

      {/* Raw Data */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Raw Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">User Object:</h3>
            <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-medium mb-2">Session Object:</h3>
            <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}