'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

interface Report {
  id: number
  question_id: number
  question_type: string
  subject: string
  reported_at: string
  status: string
  admin_notes: string | null
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    // SECURITY: Check if user is authenticated and has admin role
    const checkAuthorization = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
          // Not authenticated
          router.push('/signin')
          return
        }

        // Check if user has admin role (from user metadata or custom claims)
        const userRole = user.user_metadata?.role || 'user'
        const isAdmin = userRole === 'admin' || user.email?.includes('admin')

        if (!isAdmin) {
          // Check if email is in admin list (backup check)
          const { data: adminUser, error: adminError } = await supabase
            .from('admin_users')
            .select('id')
            .eq('user_id', user.id)
            .single()

          if (adminError || !adminUser) {
            // Not an admin
            router.push('/')
            return
          }
        }

        setIsAuthorized(true)
      } catch (error) {
        console.error('Authorization check failed:', error)
        router.push('/')
      }
    }

    checkAuthorization()
  }, [supabase, router])

  useEffect(() => {
    if (isAuthorized) {
      fetchReports()
    }
  }, [filter, isAuthorized])

  const fetchReports = async () => {
    try {
      // OPTIMIZATION: Select only needed columns instead of '*' and limit to 100 recent
      let query = supabase
        .from('question_reports')
        .select('id, question_id, question_type, subject, reported_at, status, admin_notes')
        .order('reported_at', { ascending: false })
        .limit(100) // Only fetch 100 most recent, pagination can load more

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setReports(data || [])
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase
        .from('question_reports')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      fetchReports()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (isAuthorized === null || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{isAuthorized === null ? 'Checking authorization...' : 'Loading reports...'}</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-2 border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Question Reports</h2>
          <p className="text-gray-600 text-sm mt-1">
            {reports.length} total reports
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {['all', 'pending', 'reviewed', 'fixed', 'dismissed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === status
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      {reports.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-12 text-center border-2 border-gray-100">
          <p className="text-gray-500">No reports found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-gray-100"
            >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {report.question_type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">
                        Question ID: {report.question_id}
                      </span>
                      {report.subject && (
                        <span className="text-sm text-gray-600">
                          • {report.subject}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Reported: {new Date(report.reported_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={report.status}
                      onChange={(e) => updateStatus(report.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 ${
                        report.status === 'pending'
                          ? 'border-yellow-300 bg-yellow-50 text-yellow-700'
                          : report.status === 'reviewed'
                          ? 'border-blue-300 bg-blue-50 text-blue-700'
                          : report.status === 'fixed'
                          ? 'border-green-300 bg-green-50 text-green-700'
                          : 'border-gray-300 bg-gray-50 text-gray-700'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="fixed">Fixed</option>
                      <option value="dismissed">Dismissed</option>
                    </select>
                  </div>
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  )
}
