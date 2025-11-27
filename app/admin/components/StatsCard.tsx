'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  color: 'blue' | 'purple' | 'green' | 'yellow' | 'red'
  onClick?: () => void
}

const colorClasses = {
  blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
  purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-600',
  green: 'from-green-50 to-green-100 border-green-200 text-green-600',
  yellow: 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-600',
  red: 'from-red-50 to-red-100 border-red-200 text-red-600',
}

export default function StatsCard({ title, value, icon: Icon, trend, color, onClick }: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0

  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0
      const duration = 1000
      const increment = numericValue / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= numericValue) {
          setDisplayValue(numericValue)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [value, numericValue])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 border-2 ${
        onClick ? 'cursor-pointer' : ''
      } transition-all hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className={`w-8 h-8 ${color === 'yellow' ? 'text-yellow-500' : ''}`} />
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      
      <p className="text-4xl font-bold text-gray-900">
        {typeof value === 'number' ? displayValue : value}
      </p>
    </motion.div>
  )
}
