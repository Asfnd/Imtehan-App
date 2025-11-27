'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function TestCSSDataPage() {
  const supabase = createClientComponentClient()
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testAccess()
  }, [])

  const testAccess = async () => {
    const testResults: any = {}

    try {
      // Test 1: Count total MCQs
      console.log('Test 1: Counting total MCQs...')
      const { count: totalCount, error: countError } = await supabase
        .from('css_mcqs')
        .select('*', { count: 'exact', head: true })
      
      testResults.totalCount = { count: totalCount, error: countError?.message }
      console.log('Total count:', totalCount, 'Error:', countError)

      // Test 2: Fetch first 10 MCQs
      console.log('Test 2: Fetching first 10 MCQs...')
      const { data: sampleData, error: sampleError } = await supabase
        .from('css_mcqs')
        .select('*')
        .limit(10)
      
      testResults.sampleData = { 
        count: sampleData?.length, 
        data: sampleData?.slice(0, 3),
        error: sampleError?.message 
      }
      console.log('Sample data:', sampleData?.length, 'rows')

      // Test 3: Count by type
      console.log('Test 3: Counting by type...')
      const types = ['regular', 'mock_test', 'diagnostic']
      const typeCounts: any = {}
      
      for (const type of types) {
        const { count, error } = await supabase
          .from('css_mcqs')
          .select('*', { count: 'exact', head: true })
          .eq('mcq_type', type)
        
        typeCounts[type] = { count, error: error?.message }
        console.log(`${type}:`, count)
      }
      
      testResults.typeCounts = typeCounts

      // Test 4: Get all subjects
      console.log('Test 4: Getting all subjects...')
      const { data: subjectData, error: subjectError } = await supabase
        .from('css_mcqs')
        .select('subject')
        .eq('mcq_type', 'regular')
      
      const subjectCounts = subjectData?.reduce((acc: any, row: any) => {
        acc[row.subject] = (acc[row.subject] || 0) + 1
        return acc
      }, {})

      const subjects = Object.entries(subjectCounts || {})
        .map(([subject, count]) => ({ subject, count }))
        .sort((a: any, b: any) => b.count - a.count)

      testResults.subjects = { 
        count: subjects.length, 
        list: subjects,
        error: subjectError?.message 
      }
      console.log('Subjects found:', subjects.length)

      // Test 5: Get all years
      console.log('Test 5: Getting all years...')
      const { data: yearData, error: yearError } = await supabase
        .from('css_mcqs')
        .select('year')
        .eq('mcq_type', 'regular')
      
      const years = [...new Set(yearData?.map((r: any) => r.year))].sort((a, b) => b - a)
      
      testResults.years = { 
        count: years.length, 
        list: years,
        error: yearError?.message 
      }
      console.log('Years found:', years)

      // Test 6: Try RPC function
      console.log('Test 6: Testing RPC function...')
      try {
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('get_subject_counts', { mcq_type_filter: 'regular' })
        
        testResults.rpcFunction = { 
          available: !rpcError, 
          count: rpcData?.length,
          error: rpcError?.message 
        }
      } catch (e: any) {
        testResults.rpcFunction = { available: false, error: e.message }
      }

    } catch (error: any) {
      console.error('Test error:', error)
      testResults.error = error.message
    }

    setResults(testResults)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Testing CSS MCQ Data Access...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">CSS MCQ Data Access Test Results</h1>

        {/* Total Count */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">1. Total MCQs</h2>
          <div className="text-3xl font-bold text-blue-600">
            {results.totalCount?.count || 0}
          </div>
          {results.totalCount?.error && (
            <div className="text-red-600 mt-2">Error: {results.totalCount.error}</div>
          )}
        </div>

        {/* Sample Data */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">2. Sample MCQs</h2>
          <div className="text-lg mb-2">
            Fetched: {results.sampleData?.count || 0} MCQs
          </div>
          {results.sampleData?.data && (
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-64">
              {JSON.stringify(results.sampleData.data, null, 2)}
            </pre>
          )}
          {results.sampleData?.error && (
            <div className="text-red-600 mt-2">Error: {results.sampleData.error}</div>
          )}
        </div>

        {/* Type Counts */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">3. MCQs by Type</h2>
          <div className="space-y-2">
            {Object.entries(results.typeCounts || {}).map(([type, data]: any) => (
              <div key={type} className="flex justify-between items-center">
                <span className="font-medium capitalize">{type.replace('_', ' ')}:</span>
                <span className="text-lg font-bold text-blue-600">{data.count || 0}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">4. Subjects (Regular MCQs)</h2>
          <div className="text-lg mb-2">
            Total Subjects: {results.subjects?.count || 0}
          </div>
          {results.subjects?.list && (
            <div className="max-h-64 overflow-auto">
              {results.subjects.list.map((s: any, i: number) => (
                <div key={i} className="flex justify-between py-1 border-b">
                  <span>{s.subject}</span>
                  <span className="font-semibold">{s.count}</span>
                </div>
              ))}
            </div>
          )}
          {results.subjects?.error && (
            <div className="text-red-600 mt-2">Error: {results.subjects.error}</div>
          )}
        </div>

        {/* Years */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">5. Years Available</h2>
          <div className="flex gap-2 flex-wrap">
            {results.years?.list?.map((year: number) => (
              <span key={year} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {year}
              </span>
            ))}
          </div>
          {results.years?.error && (
            <div className="text-red-600 mt-2">Error: {results.years.error}</div>
          )}
        </div>

        {/* RPC Function */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">6. RPC Function Test</h2>
          <div className="text-lg">
            Status: {results.rpcFunction?.available ? (
              <span className="text-green-600 font-semibold">✓ Available</span>
            ) : (
              <span className="text-yellow-600 font-semibold">⚠ Not Available (using fallback)</span>
            )}
          </div>
          {results.rpcFunction?.error && (
            <div className="text-sm text-gray-600 mt-2">Note: {results.rpcFunction.error}</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={testAccess}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Run Tests Again
          </button>
          <a
            href="/css-practice"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Go to CSS Practice
          </a>
        </div>
      </div>
    </div>
  )
}
