'use client'

interface ProfileAvatarProps {
  user: any
  fullName: string
  size?: 'sm' | 'md' | 'lg'
  showOnlineIndicator?: boolean
}

export default function ProfileAvatar({ 
  user, 
  fullName, 
  size = 'md',
  showOnlineIndicator = true 
}: ProfileAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg'
  }

  // Get initials from full name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Get the profile image URL - try all possible locations
  const profileImageUrl = user?.user_metadata?.avatar_url || 
                          user?.user_metadata?.picture || 
                          user?.user_metadata?.photo ||
                          user?.avatar_url ||
                          user?.picture



  return (
    <div className="relative flex-shrink-0">
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden shadow-lg border-2 border-slate-600/50`}>
        {profileImageUrl ? (
          // Try to show the profile image with multiple fallback strategies
          <div className="w-full h-full relative">
            {/* Background with initials as immediate fallback */}
            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <span className={`text-white font-bold drop-shadow-sm ${textSizeClasses[size]}`}>
                {getInitials(fullName)}
              </span>
            </div>
            {/* Profile image overlay */}
            <img 
              src={profileImageUrl}
              alt={fullName}
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
              style={{ opacity: 0, transition: 'opacity 0.2s' }}
            />
          </div>
        ) : (
          // Show initials only
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <span className={`text-white font-bold drop-shadow-sm ${textSizeClasses[size]}`}>
              {getInitials(fullName)}
            </span>
          </div>
        )}
      </div>
      
      {/* Online indicator */}
      {user && showOnlineIndicator && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-700 rounded-full shadow-sm"></div>
      )}
    </div>
  )
}