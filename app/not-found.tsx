import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</p>
          <p className="text-gray-600 mt-2">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/css"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
          >
            Go to CSS Resources
          </Link>
          
          <div className="flex gap-4 justify-center mt-4">
            <Link
              href="/css"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              CSS
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/mpt-practice"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              MPT Practice
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
