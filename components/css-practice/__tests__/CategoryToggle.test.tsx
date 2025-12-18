/**
 * Unit tests for CategoryToggle component
 * Tests button rendering, click handlers, and accessibility features
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoryToggle, { CompactCategoryToggle } from '../CategoryToggle'
import { type CategoryFilter, type CategoryCounts } from '@/lib/css-subjects/categorization'

describe('CategoryToggle', () => {
  const mockCategoryCounts: CategoryCounts = {
    all: 40,
    compulsory: 5,
    optional: 35
  }

  const mockOnCategoryChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('renders all category buttons with correct labels and counts', () => {
      render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      // Check that all buttons are rendered (should have 6 total - 3 categories x 2 versions)
      const allButtons = screen.getAllByRole('button', { name: /all subjects.*40 subjects/i })
      const compulsoryButtons = screen.getAllByRole('button', { name: /compulsory.*5 subjects/i })
      const optionalButtons = screen.getAllByRole('button', { name: /optional.*35 subjects/i })
      
      expect(allButtons).toHaveLength(2) // Mobile + Desktop
      expect(compulsoryButtons).toHaveLength(2)
      expect(optionalButtons).toHaveLength(2)

      // Check count displays (should appear multiple times due to mobile/desktop versions)
      expect(screen.getAllByText('40').length).toBeGreaterThan(0)
      expect(screen.getAllByText('5').length).toBeGreaterThan(0)
      expect(screen.getAllByText('35').length).toBeGreaterThan(0)
    })

    test('highlights active category button', () => {
      render(
        <CategoryToggle
          activeCategory="compulsory"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      const compulsoryButtons = screen.getAllByRole('button', { name: /compulsory.*5 subjects/i })
      const allButtons = screen.getAllByRole('button', { name: /all subjects.*40 subjects/i })

      // Active button should have different styling (we can't easily test CSS classes, but we can test aria attributes)
      expect(compulsoryButtons).toHaveLength(2)
      expect(allButtons).toHaveLength(2)
    })

    test('displays SVG icons for each category', () => {
      const { container } = render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      // Icons are rendered as SVG elements (should appear twice - mobile + desktop)
      const svgElements = container.querySelectorAll('svg')
      expect(svgElements.length).toBe(6) // 3 categories x 2 versions (mobile + desktop)
    })
  })

  describe('Interaction', () => {
    test('calls onCategoryChange when buttons are clicked', async () => {
      const user = userEvent.setup()
      
      render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      const compulsoryButtons = screen.getAllByRole('button', { name: /compulsory.*5 subjects/i })
      const optionalButtons = screen.getAllByRole('button', { name: /optional.*35 subjects/i })

      // Click the first compulsory button (mobile version)
      await user.click(compulsoryButtons[0])
      expect(mockOnCategoryChange).toHaveBeenCalledWith('compulsory')

      // Click the first optional button (mobile version)
      await user.click(optionalButtons[0])
      expect(mockOnCategoryChange).toHaveBeenCalledWith('optional')

      expect(mockOnCategoryChange).toHaveBeenCalledTimes(2)
    })

    test('handles keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      const allButtons = screen.getAllByRole('button', { name: /all subjects.*40 subjects/i })
      
      // Focus and activate with keyboard (use first button)
      allButtons[0].focus()
      await user.keyboard('{Enter}')
      
      expect(mockOnCategoryChange).toHaveBeenCalledWith('all')
    })
  })

  describe('Accessibility', () => {
    test('has proper ARIA labels', () => {
      render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      expect(screen.getAllByLabelText('Filter by All Subjects (40 subjects)')).toHaveLength(2)
      expect(screen.getAllByLabelText('Filter by Compulsory (5 subjects)')).toHaveLength(2)
      expect(screen.getAllByLabelText('Filter by Optional (35 subjects)')).toHaveLength(2)
    })

    test('has descriptive titles for tooltips', () => {
      render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      expect(screen.getAllByTitle('Show all available subjects')).toHaveLength(2)
      expect(screen.getAllByTitle('Core subjects required for all CSS candidates')).toHaveLength(2)
      expect(screen.getAllByTitle('Elective subjects you can choose from')).toHaveLength(2)
    })

    test('buttons are focusable and have proper roles', () => {
      render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(6) // 3 buttons x 2 (mobile + desktop versions)

      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
        expect(button.tagName).toBe('BUTTON')
      })
    })
  })

  describe('Responsive Design', () => {
    test('renders both mobile and desktop versions', () => {
      render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      // Should have 6 buttons total (3 categories x 2 versions)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(6)
    })
  })

  describe('Edge Cases', () => {
    test('handles zero counts gracefully', () => {
      const zeroCounts: CategoryCounts = {
        all: 0,
        compulsory: 0,
        optional: 0
      }

      render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={zeroCounts}
        />
      )

      expect(screen.getAllByText('0')).toHaveLength(6) // 3 counts x 2 versions
    })

    test('handles large counts', () => {
      const largeCounts: CategoryCounts = {
        all: 9999,
        compulsory: 1000,
        optional: 8999
      }

      render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={largeCounts}
        />
      )

      expect(screen.getAllByText('9999')).toHaveLength(2) // 2 versions
      expect(screen.getAllByText('1000')).toHaveLength(2)
      expect(screen.getAllByText('8999')).toHaveLength(2)
    })

    test('applies custom className', () => {
      const { container } = render(
        <CategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
          className="custom-class"
        />
      )

      expect(container.firstChild).toHaveClass('custom-class')
    })
  })
})

describe('CompactCategoryToggle', () => {
  const mockCategoryCounts: CategoryCounts = {
    all: 40,
    compulsory: 5,
    optional: 35
  }

  const mockOnCategoryChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Compact Version', () => {
    test('renders compact buttons with short labels', () => {
      render(
        <CompactCategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      expect(screen.getByRole('button', { name: /all.*40 subjects/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /core.*5 subjects/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /elective.*35 subjects/i })).toBeInTheDocument()

      // Check short labels
      expect(screen.getByText('All')).toBeInTheDocument()
      expect(screen.getByText('Core')).toBeInTheDocument()
      expect(screen.getByText('Elective')).toBeInTheDocument()
    })

    test('handles clicks correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <CompactCategoryToggle
          activeCategory="all"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      const coreButton = screen.getByRole('button', { name: /core.*5 subjects/i })
      await user.click(coreButton)
      
      expect(mockOnCategoryChange).toHaveBeenCalledWith('compulsory')
    })

    test('shows active state correctly', () => {
      render(
        <CompactCategoryToggle
          activeCategory="compulsory"
          onCategoryChange={mockOnCategoryChange}
          categoryCounts={mockCategoryCounts}
        />
      )

      // All buttons should be rendered
      expect(screen.getAllByRole('button')).toHaveLength(3)
    })
  })
})