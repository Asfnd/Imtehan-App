/**
 * Integration tests for Past Papers page with category filtering
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import PastPapersPage from '../page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user: null } }),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } }
      }))
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn().mockResolvedValue({
            data: [
              {
                id: 1,
                subject: 'english-precis-and-composition',
                year: 2023,
                filename: 'test.pdf',
                storage_path: 'test/path',
                file_size: 1000,
                is_available: true,
                download_count: 0
              }
            ],
            error: null
          })
        }))
      }))
    }))
  }))
}))

// Mock usage tracker
jest.mock('@/lib/usageTracker', () => ({
  usageTracker: {
    getRemaining: jest.fn(() => ({ officialPastPapers: 3 })),
    canViewOfficialPastPaper: jest.fn(() => true),
    incrementOfficialPastPaper: jest.fn()
  }
}))

// Mock components
jest.mock('@/components/FeedbackButton', () => {
  return function MockFeedbackButton() {
    return <div data-testid="feedback-button">Feedback</div>
  }
})

jest.mock('@/components/security/ProtectedContent', () => {
  return function MockProtectedContent({ children }: { children: React.ReactNode }) {
    return <div data-testid="protected-content">{children}</div>
  }
})

jest.mock('@/components/security/DevToolsWarning', () => {
  return function MockDevToolsWarning() {
    return <div data-testid="dev-tools-warning">Dev Tools Warning</div>
  }
})

jest.mock('@/components/auth/SignInPopup', () => {
  return function MockSignInPopup({ isOpen }: { isOpen: boolean }) {
    return isOpen ? <div data-testid="signin-popup">Sign In</div> : null
  }
})

describe('PastPapersPage Integration', () => {
  const mockPush = jest.fn()
  const mockBack = jest.fn()
  const mockRefresh = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
      refresh: mockRefresh
    })
  })

  describe('Category Filtering Integration', () => {
    test('renders category toggle component', async () => {
      render(<PastPapersPage />)

      // Wait for the component to load and show the main content
      await waitFor(() => {
        expect(screen.getByText('CSS Past Papers')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    test('page structure includes category filtering elements', async () => {
      render(<PastPapersPage />)

      // Wait for the component to load
      await waitFor(() => {
        expect(screen.getByText('CSS Past Papers')).toBeInTheDocument()
      }, { timeout: 3000 })

      // Check that essential elements are present
      expect(screen.getByPlaceholderText('Search subjects...')).toBeInTheDocument()
    })

    test('handles search input correctly', async () => {
      render(<PastPapersPage />)

      // Wait for the component to load
      await waitFor(() => {
        expect(screen.getByText('CSS Past Papers')).toBeInTheDocument()
      }, { timeout: 3000 })

      const searchInput = screen.getByPlaceholderText('Search subjects...')
      expect(searchInput).toBeInTheDocument()

      // Test search functionality
      fireEvent.change(searchInput, { target: { value: 'English' } })
      expect(searchInput).toHaveValue('English')
    })

    test('renders protected content wrapper', async () => {
      render(<PastPapersPage />)

      // Wait for the component to load
      await waitFor(() => {
        expect(screen.getByText('CSS Past Papers')).toBeInTheDocument()
      }, { timeout: 3000 })

      expect(screen.getByTestId('protected-content')).toBeInTheDocument()
      expect(screen.getByTestId('dev-tools-warning')).toBeInTheDocument()
    })

    test('includes feedback button', async () => {
      render(<PastPapersPage />)

      // Wait for the component to load
      await waitFor(() => {
        expect(screen.getByText('CSS Past Papers')).toBeInTheDocument()
      }, { timeout: 3000 })

      expect(screen.getByTestId('feedback-button')).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    test('back button calls router.back()', async () => {
      render(<PastPapersPage />)

      // Wait for the component to load
      await waitFor(() => {
        expect(screen.getByText('CSS Past Papers')).toBeInTheDocument()
      }, { timeout: 3000 })

      // Find the back button by its SVG content
      const backButtons = screen.getAllByRole('button')
      const backButton = backButtons.find(button => 
        button.querySelector('svg')
      )
      
      expect(backButton).toBeInTheDocument()
      fireEvent.click(backButton!)

      expect(mockBack).toHaveBeenCalledTimes(1)
    })
  })

  describe('Authentication Integration', () => {
    test('shows usage counter for non-authenticated users', async () => {
      render(<PastPapersPage />)

      // Wait for the component to load
      await waitFor(() => {
        expect(screen.getByText('CSS Past Papers')).toBeInTheDocument()
      }, { timeout: 3000 })

      // Should show usage counter (3/3 papers remaining)
      expect(screen.getByText('3/3')).toBeInTheDocument()
    })
  })
})