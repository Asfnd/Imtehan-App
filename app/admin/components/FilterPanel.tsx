'use client'

import { useState, useEffect } from 'react'
import { X, Search } from 'lucide-react'

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void
  showRatingFilter?: boolean
  showPageFilter?: boolean
  showTypeFilter?: boolean
  showSubjectFilter?: boolean
  showStatusFilter?: boolean
}

export interface FilterState {
  dateFrom: string
  dateTo: string
  ratingMin: number
  ratingMax: number
  page: string
  type: string
  subject: string
  status: string
  searchQuery: string
}

export default function FilterPanel({
  onFilterChange,
  showRatingFilter = false,
  showPageFilter = false,
  showTypeFilter = false,
  showSubjectFilter = false,
  showStatusFilter = false,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateFrom: '',
    dateTo: '',
    ratingMin: 0.5,
    ratingMax: 5,
    page: 'all',
    type: 'all',
    subject: 'all',
    status: 'all',
    searchQuery: '',
  })

  const [searchDebounce, setSearchDebounce] = useState<NodeJS.Timeout>()

  useEffect(() => {
    if (searchDebounce) clearTimeout(searchDebounce)
    
    const timeout = setTimeout(() => {
      onFilterChange(filters)
    }, 300)
    
    setSearchDebounce(timeout)
    
    return () => clearTimeout(timeout)
  }, [filters])

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, searchQuery: value }))
  }

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      ratingMin: 0.5,
      ratingMax: 5,
      page: 'all',
      type: 'all',
      subject: 'all',
      status: 'all',
      searchQuery: '',
    })
  }

  const hasActiveFilters = 
    filters.dateFrom || 
    filters.dateTo || 
    filters.ratingMin !== 0.5 || 
    filters.ratingMax !== 5 ||
    filters.page !== 'all' ||
    filters.type !== 'all' ||
    filters.subject !== 'all' ||
    filters.status !== 'all' ||
    filters.searchQuery

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Rating Range */}
        {showRatingFilter && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating Range: {filters.ratingMin} - {filters.ratingMax}
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={filters.ratingMin}
                onChange={(e) => setFilters(prev => ({ ...prev, ratingMin: parseFloat(e.target.value) }))}
                className="flex-1"
              />
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={filters.ratingMax}
                onChange={(e) => setFilters(prev => ({ ...prev, ratingMax: parseFloat(e.target.value) }))}
                className="flex-1"
              />
            </div>
          </div>
        )}

        {/* Page Filter */}
        {showPageFilter && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page
            </label>
            <select
              value={filters.page}
              onChange={(e) => setFilters(prev => ({ ...prev, page: e.target.value }))}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Pages</option>
              <option value="dashboard">Dashboard</option>
              <option value="css-practice">CSS Practice</option>
              <option value="mpt-practice">MPT Practice</option>
              <option value="past-papers">Past Papers</option>
            </select>
          </div>
        )}

        {/* Type Filter */}
        {showTypeFilter && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="css">CSS</option>
              <option value="mpt">MPT</option>
              <option value="islamic_history">Islamic History</option>
            </select>
          </div>
        )}

        {/* Status Filter */}
        {showStatusFilter && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="fixed">Fixed</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
