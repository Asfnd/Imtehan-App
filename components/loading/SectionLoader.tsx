'use client'

interface SectionLoaderProps {
  title: string
  description?: string
  color?: 'blue' | 'orange' | 'green' | 'purple' | 'red'
}

export default function SectionLoader({ 
  title, 
  description = 'Loading content...', 
  color = 'blue' 
}: SectionLoaderProps) {
  const colorClasses = {
    blue: {
      bg: 'from-slate-50 via-blue-50 to-indigo-50',
      spinner: 'border-blue-600',
      text: 'from-blue-600 via-indigo-600 to-purple-600'
    },
    orange: {
      bg: 'from-orange-50 via-red-50 to-pink-50',
      spinner: 'border-orange-600',
      text: 'from-orange-600 via-red-600 to-pink-600'
    },
    green: {
      bg: 'from-green-50 via-emerald-50 to-teal-50',
      spinner: 'border-green-600',
      text: 'from-green-600 via-emerald-600 to-teal-600'
    },
    purple: {
      bg: 'from-purple-50 via-violet-50 to-indigo-50',
      spinner: 'border-purple-600',
      text: 'from-purple-600 via-violet-600 to-indigo-600'
    },
    red: {
      bg: 'from-red-50 via-pink-50 to-rose-50',
      spinner: 'border-red-600',
      text: 'from-red-600 via-pink-600 to-rose-600'
    }
  }

  const colors = colorClasses[color]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex items-center justify-center p-4`}>
      <div className="text-center max-w-md">
        {/* Animated Spinner */}
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 mx-auto"></div>
          <div className={`animate-spin rounded-full h-16 w-16 border-4 border-t-transparent ${colors.spinner} absolute top-0 left-1/2 transform -translate-x-1/2`}></div>
        </div>
        
        {/* Title */}
        <h2 className={`text-2xl font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent mb-2`}>
          {title}
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 text-sm">
          {description}
        </p>
        
        {/* Loading dots animation */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className={`w-2 h-2 ${colors.spinner.replace('border-', 'bg-')} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-2 h-2 ${colors.spinner.replace('border-', 'bg-')} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-2 h-2 ${colors.spinner.replace('border-', 'bg-')} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}