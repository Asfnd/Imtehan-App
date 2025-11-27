'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Star, MessageSquare, AlertTriangle, TrendingUp, Clock } from 'lucide-react'
import StatsCard from './components/StatsCard'
import { motion } from 'framer-motion'

interface AdminStats {
  totalFeedback: number
  avgRating: number
  totalReports: number
  pendingReports: number
  feedbackTrend: number
  reportsTrend: number
}

interface Activity {
  id: number
  type: 'feedback' | 'report'
  page?: string
  rating?: number
  status?: string
  message?: string
  timestamp: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalFeedback: 0,
    avgRating: 0,
    totalReports: 0,
    pendingReports: 0,
    feedbackTrend: 0,
    reportsTrend: 0,
  })
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch feedback stats
      const { data: feedbackData, error: feedbackError } = await supabase
        .from('feedback')
        .select('rating, created_at, page, message')
        .order('created_at', { ascending: false })

      if (feedbackError) throw feedbackError

      // Fetch reports stats
      const { data: reportsData, error: reportsError } = await supabase
        .from('question_reports')
        .select('status, reported_at, question_type, question_id')
        .order('reported_at', { ascending: false })

      if (reportsError) throw reportsError

      // Calculate stats
      const totalFeedback = feedbackData?.length || 0
      const avgRating = totalFeedback > 0
        ? feedbackData!.reduce((sum, f) => sum + f.rating, 0) / totalFeedback
        : 0
      
      const totalReports = reportsData?.length || 0
      const pendingReports = reportsData?.filter(r => r.status === 'pending').length || 0

      // Calculate trends (last 7 days vs previous 7 days)
      const now = new Date()
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

      const recentFeedback = feedbackData?.filter(f => new Date(f.created_at) >= sevenDaysAgo).length || 0
      const previousFeedback = feedbackData?.filter(f => {
        const date = new Date(f.created_at)
        return date >= fourteenDaysAgo && date < sevenDaysAgo
      }).length || 0

      const recentReports = reportsData?.filter(r => new Date(r.reported_at) >= sevenDaysAgo).length || 0
      const previousReports = reportsData?.filter(r => {
        const date = new Date(r.reported_at)
        return date >= fourteenDaysAgo && date < sevenDaysAgo
      }).length || 0

      const feedbackTrend = previousFeedback > 0
        ? ((recentFeedback - previousFeedback) / previousFeedback) * 100
        : 0

      const reportsTrend = previousReports > 0
        ? ((recentReports - previousReports) / previousReports) * 100
        : 0

      setStats({
        totalFeedback,
        avgRating,
        totalReports,
        pendingReports,
        feedbackTrend,
        reportsTrend,
      })

      // Prepare recent activity
      const feedbackActivity: Activity[] = (feedbackData?.slice(0, 5) || []).map(f => ({
        id: Math.random(),
        type: 'feedback' as const,
        page: f.page,
        rating: f.rating,
        message: f.message,
        timestamp: f.created_at,
      }))

      const reportsActivity: Activity[] = (reportsData?.slice(0, 5) || []).map(r => ({
        id: Math.random(),
        type: 'report' as const,
        status: r.status,
        timestamp: r.reported_at,
      }))

      const combined = [...feedbackActivity, ...reportsActivity]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10)

      setRecentActivity(combined)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Feedback"
          value={stats.totalFeedback}
          icon={MessageSquare}
          color="blue"
          trend={{
            value: Math.round(stats.feedbackTrend),
            direction: stats.feedbackTrend >= 0 ? 'up' : 'down'
          }}
          onClick={() => router.push('/admin/feedback')}
        />
        
        <StatsCard
          title="Average Rating"
          value={stats.avgRating.toFixed(1)}
          icon={Star}
          color="yellow"
          onClick={() => router.push('/admin/feedback')}
        />
        
        <StatsCard
          title="Total Reports"
          value={stats.totalReports}
          icon={AlertTriangle}
          color="purple"
          trend={{
            value: Math.round(stats.reportsTrend),
            direction: stats.reportsTrend >= 0 ? 'up' : 'down'
          }}
          onClick={() => router.push('/admin/reports')}
        />
        
        <StatsCard
          title="Pending Reports"
          value={stats.pendingReports}
          icon={Clock}
          color={stats.pendingReports > 10 ? 'red' : 'green'}
          onClick={() => router.push('/admin/reports')}
        />
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => router.push('/admin/feedback')}
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-200 cursor-pointer hover:shadow-xl transition-all"
        >
          <MessageSquare className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">View Feedback</h3>
          <p className="text-gray-600 text-sm">
            Browse and analyze user feedback from all pages
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => router.push('/admin/reports')}
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-200 cursor-pointer hover:shadow-xl transition-all"
        >
          <AlertTriangle className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Reports</h3>
          <p className="text-gray-600 text-sm">
            Review and update question reports
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => router.push('/admin/analytics')}
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-green-200 cursor-pointer hover:shadow-xl transition-all"
        >
          <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">View Analytics</h3>
          <p className="text-gray-600 text-sm">
            Explore trends and insights with charts
          </p>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        
        {recentActivity.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {activity.type === 'feedback' ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        New feedback on {activity.page?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </p>
                      <p className="text-sm text-gray-600 truncate">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(activity.rating || 0)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'fill-gray-200 text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Question reported
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          activity.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : activity.status === 'fixed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {activity.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
