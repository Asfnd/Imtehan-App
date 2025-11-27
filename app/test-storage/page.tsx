'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function TestStoragePage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()

  async function testStorage() {
    setLoading(true)
    try {
      console.log('Testing storage access...')
      
      // Test 1: Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      console.log('User:', user ? `Logged in as ${user.email}` : 'Not logged in')
      
      // Test 2: List buckets (may not work due to RLS)
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
      console.log('Buckets:', { buckets, bucketsError })
      
      // Test 3: List files in css-past-papers (this should work if policies are correct)
      const { data: files, error: filesError } = await supabase.storage
        .from('css-past-papers')
        .list('', {
          limit: 100,
          offset: 0,
        })
      
      console.log('Files in css-past-papers root:', { files, filesError })
      
      // Test 4: Try to list a specific folder if root is empty
      let testFolder = null
      if (files && files.length > 0) {
        const firstFolder = files[0]
        const { data: folderContents, error: folderError } = await supabase.storage
          .from('css-past-papers')
          .list(firstFolder.name)
        
        testFolder = { folder: firstFolder.name, contents: folderContents, error: folderError }
        console.log('First folder contents:', testFolder)
      }
      
      setResult({
        user: user ? { email: user.email, id: user.id } : null,
        buckets: { data: buckets, error: bucketsError },
        files: { data: files, error: filesError },
        testFolder
      })
    } catch (error: any) {
      console.error('Test error:', error)
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Storage Test</h1>
        
        <button
          onClick={testStorage}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Storage Access'}
        </button>
        
        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Results:</h2>
            <pre className="bg-white p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-bold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Make sure you're logged in</li>
            <li>Click "Test Storage Access"</li>
            <li>Check the results below AND browser console (F12)</li>
            <li>Share the results with me</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
