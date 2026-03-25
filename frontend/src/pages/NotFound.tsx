import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  )
}
