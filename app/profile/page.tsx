'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User, Volume2, VolumeX, Sun, Moon, LogOut, ArrowLeft } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    checkUser()
    loadSettings()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/css')
      return
    }
    setUser(user)
    setLoading(false)
  }

  const loadSettings = () => {
    const sound = localStorage.getItem('soundEnabled')
    const theme = localStorage.getItem('darkMode')
    setSoundEnabled(sound !== 'false')
    setDarkMode(theme === 'true')
  }

  const toggleSound = () => {
    const newValue = !soundEnabled
    setSoundEnabled(newValue)
    localStorage.setItem('soundEnabled', String(newValue))
  }

  const toggleDarkMode = () => {
    const newValue = !darkMode
    setDarkMode(newValue)
    localStorage.setItem('darkMode', String(newValue))
    // You can implement actual dark mode styling later
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/css')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Back</span>
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Profile
          </h1>
          <div className="w-20"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 p-8 text-center">
            {/* Profile Picture with Smooth Loading */}
            <div className="relative w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 border-4 border-white/30 overflow-hidden">
              {/* Background with user icon - always visible as fallback */}
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              {/* Profile image overlay - fades in when loaded */}
              {(user?.user_metadata?.avatar_url || user?.user_metadata?.picture) && (
                <img
                  src={user.user_metadata.avatar_url || user.user_metadata.picture}
                  alt="Profile"
                  className="absolute inset-0 w-full h-full object-cover"
                  onLoad={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
                />
              )}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {user?.user_metadata?.name || 'User'}
            </h2>
            <p className="text-white/90 text-sm">{user?.email}</p>
          </div>

          {/* Settings Section */}
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="w-6 h-6 text-purple-600" />
                ) : (
                  <VolumeX className="w-6 h-6 text-gray-400" />
                )}
                <div>
                  <p className="font-semibold text-gray-900">Sound Effects</p>
                  <p className="text-xs text-gray-500">Quiz sounds and celebrations</p>
                </div>
              </div>
              <button
                onClick={toggleSound}
                className={`relative w-14 h-8 rounded-full transition-all ${
                  soundEnabled ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    soundEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-6 h-6 text-indigo-600" />
                ) : (
                  <Sun className="w-6 h-6 text-amber-500" />
                )}
                <div>
                  <p className="font-semibold text-gray-900">Dark Mode</p>
                  <p className="text-xs text-gray-500">Coming soon!</p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative w-14 h-8 rounded-full transition-all ${
                  darkMode ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="p-6 pt-0">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <p className="text-sm text-gray-600 text-center">
            💡 Your settings are saved locally on this device
          </p>
        </div>
      </div>
    </div>
  )
}
