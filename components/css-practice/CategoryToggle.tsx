/**
 * Category Toggle Component for CSS Practice
 * Provides buttons to filter subjects by Compulsory/Optional categories
 */

import { type CategoryFilter, type CategoryCounts } from '@/lib/css-subjects/categorization'

interface CategoryToggleProps {
  activeCategory: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
  categoryCounts: CategoryCounts
  className?: string
}

export default function CategoryToggle({
  activeCategory,
  onCategoryChange,
  categoryCounts,
  className = ''
}: CategoryToggleProps) {
  const buttons = [
    {
      key: 'all' as CategoryFilter,
      label: 'All Subjects',
      count: categoryCounts.all,
      shortLabel: 'All',
      gradient: 'from-gray-500 to-gray-600',
      hoverGradient: 'hover:from-gray-600 hover:to-gray-700',
      activeGradient: 'from-gray-600 to-gray-700',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      description: 'Show all available subjects'
    },
    {
      key: 'compulsory' as CategoryFilter,
      label: 'Compulsory',
      count: categoryCounts.compulsory,
      shortLabel: 'Compulsory',
      gradient: 'from-red-500 to-pink-600',
      hoverGradient: 'hover:from-red-600 hover:to-pink-700',
      activeGradient: 'from-red-600 to-pink-700',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      description: 'Core subjects required for all CSS candidates'
    },
    {
      key: 'optional' as CategoryFilter,
      label: 'Optional',
      count: categoryCounts.optional,
      shortLabel: 'Optional',
      gradient: 'from-blue-500 to-indigo-600',
      hoverGradient: 'hover:from-blue-600 hover:to-indigo-700',
      activeGradient: 'from-blue-600 to-indigo-700',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      description: 'Elective subjects you can choose from'
    }
  ]

  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      {/* Mobile: Stacked buttons */}
      <div className="flex flex-col gap-2 sm:hidden">
        {buttons.map((button) => {
          const isActive = activeCategory === button.key
          return (
            <button
              key={button.key}
              onClick={() => onCategoryChange(button.key)}
              className={`
                relative group overflow-hidden rounded-xl transition-all duration-200 
                hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md
                ${isActive 
                  ? `bg-gradient-to-r ${button.activeGradient} text-white shadow-lg` 
                  : `${button.bgColor} ${button.textColor} hover:shadow-lg border-2 border-gray-200 hover:border-gray-300`
                }
              `}
              aria-label={`Filter by ${button.label} (${button.count} subjects)`}
              title={button.description}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-white/25 text-white' 
                      : `bg-gradient-to-br ${button.gradient} text-white shadow-sm`
                    }
                  `}>
                    {button.key === 'all' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : button.key === 'compulsory' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Text */}
                  <div className="text-left">
                    <div className={`font-bold text-sm ${isActive ? 'text-white' : button.textColor}`}>
                      {button.label}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      {button.count} subjects
                    </div>
                  </div>
                </div>
                
                {/* Count Badge */}
                <div className={`
                  px-2 py-1 rounded-full text-xs font-bold
                  ${isActive 
                    ? 'bg-white/20 text-white' 
                    : `${button.bgColor} ${button.textColor}`
                  }
                `}>
                  {button.count}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Desktop: Horizontal buttons */}
      <div className="hidden sm:flex gap-2 flex-1">
        {buttons.map((button) => {
          const isActive = activeCategory === button.key
          return (
            <button
              key={button.key}
              onClick={() => onCategoryChange(button.key)}
              className={`
                relative group overflow-hidden rounded-xl transition-all duration-200 
                hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md flex-1
                ${isActive 
                  ? `bg-gradient-to-r ${button.activeGradient} text-white shadow-lg` 
                  : `${button.bgColor} ${button.textColor} hover:shadow-lg border-2 border-gray-200 hover:border-gray-300`
                }
              `}
              aria-label={`Filter by ${button.label} (${button.count} subjects)`}
              title={button.description}
            >
              <div className="flex items-center justify-center gap-2 p-3">
                {/* Icon */}
                <div className={`
                  w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-200
                  ${isActive 
                    ? 'bg-white/25 text-white' 
                    : `bg-gradient-to-br ${button.gradient} text-white shadow-sm`
                  }
                `}>
                  {button.key === 'all' ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : button.key === 'compulsory' ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                
                {/* Text */}
                <div className="text-center">
                  <div className={`font-bold text-sm ${isActive ? 'text-white' : button.textColor}`}>
                    {button.shortLabel}
                  </div>
                  <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                    {button.count}
                  </div>
                </div>
              </div>
              
              {/* Hover effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Compact version for smaller spaces
 */
export function CompactCategoryToggle({
  activeCategory,
  onCategoryChange,
  categoryCounts,
  className = ''
}: CategoryToggleProps) {
  const buttons = [
    { key: 'all' as CategoryFilter, label: 'All', count: categoryCounts.all },
    { key: 'compulsory' as CategoryFilter, label: 'Core', count: categoryCounts.compulsory },
    { key: 'optional' as CategoryFilter, label: 'Elective', count: categoryCounts.optional }
  ]

  return (
    <div className={`flex gap-1 ${className}`}>
      {buttons.map((button) => {
        const isActive = activeCategory === button.key
        return (
          <button
            key={button.key}
            onClick={() => onCategoryChange(button.key)}
            className={`
              relative px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200
              hover:scale-105 active:scale-95 flex items-center gap-1
              ${isActive 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
            aria-label={`Filter by ${button.label} (${button.count} subjects)`}
          >
            <span>{button.label}</span>
            <span className={`
              px-1.5 py-0.5 rounded-full text-[10px] font-bold
              ${isActive ? 'bg-white/20 text-white' : 'bg-white text-gray-600'}
            `}>
              {button.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/**
 * Sidebar version for contextual placement in subjects sidebar
 */
export function SidebarCategoryToggle({
  activeCategory,
  onCategoryChange,
  categoryCounts,
  className = ''
}: CategoryToggleProps) {
  const buttons = [
    { 
      key: 'all' as CategoryFilter, 
      label: 'All', 
      count: categoryCounts.all,
      activeGradient: 'bg-gradient-to-r from-purple-600 to-indigo-600',
      inactiveGradient: 'bg-gradient-to-r from-purple-50 to-indigo-50',
      hoverGradient: 'hover:from-purple-100 hover:to-indigo-100',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200 hover:border-purple-300'
    },
    { 
      key: 'compulsory' as CategoryFilter, 
      label: 'Compulsory', 
      count: categoryCounts.compulsory,
      activeGradient: 'bg-gradient-to-r from-red-600 to-pink-600',
      inactiveGradient: 'bg-gradient-to-r from-red-50 to-pink-50',
      hoverGradient: 'hover:from-red-100 hover:to-pink-100',
      textColor: 'text-red-700',
      borderColor: 'border-red-200 hover:border-red-300'
    },
    { 
      key: 'optional' as CategoryFilter, 
      label: 'Optional', 
      count: categoryCounts.optional,
      activeGradient: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      inactiveGradient: 'bg-gradient-to-r from-blue-50 to-cyan-50',
      hoverGradient: 'hover:from-blue-100 hover:to-cyan-100',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200 hover:border-blue-300'
    }
  ]

  return (
    <div className={`flex gap-2 ${className}`}>
      {buttons.map((button) => {
        const isActive = activeCategory === button.key
        return (
          <button
            key={button.key}
            onClick={() => onCategoryChange(button.key)}
            className={`
              flex-1 flex flex-col items-center justify-center px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200
              hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden border-2
              ${isActive 
                ? `${button.activeGradient} text-white shadow-lg border-transparent` 
                : `${button.inactiveGradient} ${button.hoverGradient} ${button.textColor} ${button.borderColor} shadow-sm hover:shadow-md`
              }
            `}
            aria-label={`Filter by ${button.label} (${button.count} subjects)`}
          >
            <span className="text-xs font-bold leading-tight">{button.label}</span>
            <span className={`
              text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full transition-all duration-200
              ${isActive 
                ? 'bg-white/25 text-white' 
                : 'bg-white/80 text-gray-700 shadow-sm'
              }
            `}>
              {button.count}
            </span>
            
            {/* Enhanced hover glow for inactive buttons */}
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </button>
        )
      })}
    </div>
  )
}