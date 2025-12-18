'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Star, Mail, Calendar } from 'lucide-react'

interface Feedback {
  id: number
  page: string
  rating: number
  message: string
  user_email: string | null
  created_at: string
}

export default function FeedbackAdminPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    fetchFeedback()
  }, [filter])

  const fetchFeedback = async () => {
    try {
      let query = supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('page', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setFeedback(data || [])
    } catch (error) {
      console.error('Error fetching feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = star <= Math.floor(rating)
          const isHalf = star === Math.ceil(rating) && rating % 1 !== 0
          
          return (
            <div key={star} className="relative w-5 h-5">
              <Star className="absolute inset-0 w-5 h-5 fill-gray-200 text-gray-300" />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: isFull ? '100%' : isHalf ? '50%' : '0%' }}
              >
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const getPageColor = (page: string) => {
    switch (page) {
      case 'dashboard': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'css-practice': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'mpt-practice': return 'bg-indigo-100 text-indigo-700 border-indigo-200'
      case 'past-papers': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const stats = {
    total: feedback.length,
    avgRating: feedback.length > 0 
      ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
      : '0',
    byPage: {
      dashboard: feedback.filter(f => f.page === 'dashboard').length,
      'css-practice': feedback.filter(f => f.page === 'css-practice').length,
      'mpt-practice': feedback.filter(f => f.page === 'mpt-practice').length,
      'past-papers': feedback.filter(f => f.page === 'past-papers').length,
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading feedback...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 border-2 border-purple-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">User Feedback</h2>
          <p className="text-gray-600 text-sm mt-1">
            {stats.total} total submissions
          </p>
        </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600 font-medium">Avg Rating</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.avgRating}</p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <p className="text-sm text-gray-600 font-medium mb-2">Dashboard</p>
              <p className="text-3xl font-bold text-blue-600">{stats.byPage.dashboard}</p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
              <p className="text-sm text-gray-600 font-medium mb-2">CSS</p>
              <p className="text-3xl font-bold text-purple-600">{stats.byPage['css-practice']}</p>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-200">
              <p className="text-sm text-gray-600 font-medium mb-2">MPT</p>
              <p className="text-3xl font-bold text-indigo-600">{stats.byPage['mpt-practice']}</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <p className="text-sm text-gray-600 font-medium mb-2">Papers</p>
              <p className="text-3xl font-bold text-green-600">{stats.byPage['past-papers']}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-6">
            {['all', 'dashboard', 'css-practice', 'mpt-practice', 'past-papers'].map((page) => (
              <button
                key={page}
                onClick={() => setFilter(page)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === page
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {page === 'all' ? 'All' : page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

      {/* Feedback List */}
      {feedback.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border-2 border-gray-100">
          <p className="text-gray-500 text-lg">No feedback yet</p>
        </div>
      ) : (
        <div className="space-y-4 animate-stagger">
          {feedback.map((item, index) => (
            <div
              key={item.id}
              className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-gray-100 animate-slide-up"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 ${getPageColor(item.page)}`}>
                    {item.page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                  {renderStars(item.rating)}
                  <span className="text-sm font-bold text-gray-700">
                    {item.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(item.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              <p className="text-gray-800 mb-3 leading-relaxed">
                {item.message}
              </p>

              {item.user_email && (
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg w-fit">
                  <Mail className="w-4 h-4" />
                  {item.user_email}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
