/**
 * Integration tests for CSS Practice page with category filtering
 * Tests complete user workflow from category selection to quiz initiation
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoryToggle from '@/components/css-practice/CategoryToggle'
import { 
  filterSubjects, 
  calculateCategoryCounts,
  type CategoryFilter,
  type Subject
} from '@/lib/css-subjects/categorization'

// Mock data for testing
const mockSubjects: Subject[] = [
  { subject: 'English Precis and Composition', count: 428 },
  { subject: 'General Science and Ability', count: 1565 },
  { subject: 'Current Affairs', count: 420 },
  { subject: 'Pakistan Affairs', count: 440 },
  { subject: 'Islamic Studies', count: 410 },
  { subject: 'Computer Science', count: 80 },
  { subject: 'Economics', count: 80 },
]

describe('CSS Practice Integration Workflow', () => {
  const mockOnCategoryChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Category Filtering Integration', () => {
    test('category toggle integrates with filtering logic', async () => {
      const user = userEvent.setup()
      const categoryCounts = calculateCategoryCounts(mockSubjects)
      
      render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={categoryCounts}
        />
      )

      // Should show correct counts
      expect(screen.getAllByText('7')).toHaveLength(2) // Total subjects
      expect(screen.getAllByText('5')).toHaveLength(2) // Compulsory subjects
      expect(screen.getAllByText('2')).toHaveLength(2) // Optional subjects

      // Click compulsory button
      const compulsoryButtons = screen.getAllByRole('button', { name: /compulsory.*5 subjects/i })
      await user.click(compulsoryButtons[0])

      expect(mockOnCategoryChange).toHaveBeenCalledWith('compulsory')
    })

    test('filtering logic works correctly with different categories', () => {
      // Test all subjects
      const allFiltered = filterSubjects(mockSubjects, '', 'all')
      expect(allFiltered).toHaveLength(7)

      // Test compulsory subjects
      const compulsoryFiltered = filterSubjects(mockSubjects, '', 'compulsory')
      expect(compulsoryFiltered).toHaveLength(5)
      expect(compulsoryFiltered.map(s => s.subject)).toEqual([
        'English Precis and Composition',
        'General Science and Ability',
        'Current Affairs',
        'Pakistan Affairs',
        'Islamic Studies'
      ])

      // Test optional subjects
      const optionalFiltered = filterSubjects(mockSubjects, '', 'optional')
      expect(optionalFiltered).toHaveLength(2)
      expect(optionalFiltered.map(s => s.subject)).toEqual([
        'Computer Science',
        'Economics'
      ])
    })

    test('search and category filtering work together', () => {
      // Search for "Science" in compulsory subjects
      const filtered = filterSubjects(mockSubjects, 'Science', 'compulsory')
      expect(filtered).toHaveLength(1)
      expect(filtered[0].subject).toBe('General Science and Ability')

      // Search for "Science" in optional subjects
      const optionalFiltered = filterSubjects(mockSubjects, 'Science', 'optional')
      expect(optionalFiltered).toHaveLength(1)
      expect(optionalFiltered[0].subject).toBe('Computer Science')

      // Search for "English" in all subjects
      const allFiltered = filterSubjects(mockSubjects, 'English', 'all')
      expect(allFiltered).toHaveLength(1)
      expect(allFiltered[0].subject).toBe('English Precis and Composition')
    })
  })

  describe('Category Counts Calculation', () => {
    test('calculates category counts correctly', () => {
      const counts = calculateCategoryCounts(mockSubjects)
      
      expect(counts.all).toBe(7)
      expect(counts.compulsory).toBe(5)
      expect(counts.optional).toBe(2)
    })

    test('handles empty subject list', () => {
      const counts = calculateCategoryCounts([])
      
      expect(counts.all).toBe(0)
      expect(counts.compulsory).toBe(0)
      expect(counts.optional).toBe(0)
    })

    test('handles list with only compulsory subjects', () => {
      const compulsoryOnly = mockSubjects.filter(s => 
        ['English Precis and Composition', 'General Science and Ability'].includes(s.subject)
      )
      const counts = calculateCategoryCounts(compulsoryOnly)
      
      expect(counts.all).toBe(2)
      expect(counts.compulsory).toBe(2)
      expect(counts.optional).toBe(0)
    })

    test('handles list with only optional subjects', () => {
      const optionalOnly = mockSubjects.filter(s => 
        ['Computer Science', 'Economics'].includes(s.subject)
      )
      const counts = calculateCategoryCounts(optionalOnly)
      
      expect(counts.all).toBe(2)
      expect(counts.compulsory).toBe(0)
      expect(counts.optional).toBe(2)
    })
  })

  describe('Edge Cases', () => {
    test('handles case-insensitive search', () => {
      const filtered = filterSubjects(mockSubjects, 'ENGLISH', 'all')
      expect(filtered).toHaveLength(1)
      expect(filtered[0].subject).toBe('English Precis and Composition')
    })

    test('handles partial word search', () => {
      const filtered = filterSubjects(mockSubjects, 'Sci', 'all')
      expect(filtered).toHaveLength(2)
      expect(filtered.map(s => s.subject)).toEqual([
        'General Science and Ability',
        'Computer Science'
      ])
    })

    test('handles search with no results', () => {
      const filtered = filterSubjects(mockSubjects, 'NonExistentSubject', 'all')
      expect(filtered).toHaveLength(0)
    })

    test('handles empty search query', () => {
      const filtered = filterSubjects(mockSubjects, '', 'compulsory')
      expect(filtered).toHaveLength(5) // Should return all compulsory subjects
    })

    test('handles whitespace-only search query', () => {
      const filtered = filterSubjects(mockSubjects, '   ', 'all')
      expect(filtered).toHaveLength(7) // Should return all subjects
    })
  })
})