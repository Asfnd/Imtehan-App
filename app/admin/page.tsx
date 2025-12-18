'use client'

import dynamic from 'next/dynamic'
import SectionLoader from '@/components/loading/SectionLoader'

// Dynamically import the main admin dashboard component
const AdminDashboardMain = dynamic(
  () => import('./components/AdminDashboardMain'),
  {
    loading: () => (
      <SectionLoader 
        title="Admin Dashboard" 
        description="Loading analytics and reports..."
        color="purple"
      />
    ),
    ssr: false
  }
)

export default function AdminDashboard() {
  return <AdminDashboardMain />
}