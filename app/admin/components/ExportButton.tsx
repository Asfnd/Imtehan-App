'use client'

import { Download } from 'lucide-react'
import { useState } from 'react'

interface ExportButtonProps {
  data: any[]
  filename: string
  label?: string
}

export default function ExportButton({ data, filename, label = 'Export CSV' }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const exportToCSV = () => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    setExporting(true)

    try {
      // Get headers from first object
      const headers = Object.keys(data[0])
      
      // Create CSV content
      const csvContent = [
        headers.join(','),
        ...data.map(row =>
          headers.map(header => {
            const value = row[header]
            // Handle null/undefined
            if (value === null || value === undefined) return ''
            // Escape quotes and wrap in quotes if contains comma or newline
            const stringValue = String(value)
            if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
              return `"${stringValue.replace(/"/g, '""')}"`
            }
            return stringValue
          }).join(',')
        )
      ].join('\n')

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data')
    } finally {
      setExporting(false)
    }
  }

  return (
    <button
      onClick={exportToCSV}
      disabled={exporting || !data || data.length === 0}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    >
      <Download className={`w-4 h-4 ${exporting ? 'animate-bounce' : ''}`} />
      {exporting ? 'Exporting...' : label}
    </button>
  )
}
