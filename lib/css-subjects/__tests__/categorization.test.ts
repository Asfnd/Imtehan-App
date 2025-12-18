/**
 * Property-based tests for CSS subject categorization
 * **Feature: css-subject-categorization, Property 2: Compulsory subject inclusion**
 */

import * as fc from 'fast-check'
import {
  COMPULSORY_SUBJECTS,
  isCompulsorySubject,
  categorizeSubject,
  addCategoryToSubject,
  filterSubjectsByCategory,
  filterSubjects,
  calculateCategoryCounts,
  saveCategoryToSession,
  loadCategoryFromSession,
  clearCategoryFromSession,
  CATEGORY_STORAGE_KEY,
  type Subject,
  type CategoryFilter,
  type SubjectCategory
} from '../categorization'

describe('CSS Subject Categorization', () => {
  beforeEach(() => {
    // Clear session storage before each test
    jest.clearAllMocks()
    clearCategoryFromSession()
  })

  describe('Subject Classification', () => {
    /**
     * **Feature: css-subject-categorization, Property 2: Compulsory subject inclusion**
     * **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**
     */
    test('property: compulsory subjects are always classified as compulsory', () => {
      fc.assert(fc.property(
        fc.constantFrom(...COMPULSORY_SUBJECTS),
        (compulsorySubject) => {
          expect(isCompulsorySubject(compulsorySubject)).toBe(true)
          expect(categorizeSubject(compulsorySubject)).toBe('compulsory')
        }
      ), { numRuns: 100 })
    })

    test('property: non-compulsory subjects are always classified as optional', () => {
      fc.assert(fc.property(
        fc.string().filter(s => !COMPULSORY_SUBJECTS.includes(s as any)),
        (nonCompulsorySubject) => {
          expect(isCompulsorySubject(nonCompulsorySubject)).toBe(false)
          expect(categorizeSubject(nonCompulsorySubject)).toBe('optional')
        }
      ), { numRuns: 100 })
    })

    test('property: addCategoryToSubject preserves subject data and adds correct category', () => {
      const subjectArbitrary = fc.record({
        subject: fc.string(),
        count: fc.integer({ min: 0, max: 10000 })
      })

      fc.assert(fc.property(
        subjectArbitrary,
        (subject) => {
          const categorized = addCategoryToSubject(subject)
          
          // Preserves original data
          expect(categorized.subject).toBe(subject.subject)
          expect(categorized.count).toBe(subject.count)
          
          // Adds correct category
          const expectedCategory = isCompulsorySubject(subject.subject) ? 'compulsory' : 'optional'
          expect(categorized.category).toBe(expectedCategory)
        }
      ), { numRuns: 100 })
    })
  })

  describe('Subject Filtering', () => {
    const createSubjectList = () => fc.array(
      fc.record({
        subject: fc.oneof(
          fc.constantFrom(...COMPULSORY_SUBJECTS),
          fc.string().filter(s => !COMPULSORY_SUBJECTS.includes(s as any))
        ),
        count: fc.integer({ min: 1, max: 1000 })
      }),
      { minLength: 0, maxLength: 50 }
    )

    test('property: filtering by "all" returns all subjects unchanged', () => {
      fc.assert(fc.property(
        createSubjectList(),
        (subjects) => {
          const filtered = filterSubjectsByCategory(subjects, 'all')
          expect(filtered).toEqual(subjects)
          expect(filtered.length).toBe(subjects.length)
        }
      ), { numRuns: 100 })
    })

    test('property: filtering by "compulsory" returns only compulsory subjects', () => {
      fc.assert(fc.property(
        createSubjectList(),
        (subjects) => {
          const filtered = filterSubjectsByCategory(subjects, 'compulsory')
          
          // All returned subjects should be compulsory
          filtered.forEach(subject => {
            expect(isCompulsorySubject(subject.subject)).toBe(true)
          })
          
          // Should contain all compulsory subjects from original list
          const originalCompulsory = subjects.filter(s => isCompulsorySubject(s.subject))
          expect(filtered.length).toBe(originalCompulsory.length)
        }
      ), { numRuns: 100 })
    })

    test('property: filtering by "optional" returns only optional subjects', () => {
      fc.assert(fc.property(
        createSubjectList(),
        (subjects) => {
          const filtered = filterSubjectsByCategory(subjects, 'optional')
          
          // All returned subjects should be optional
          filtered.forEach(subject => {
            expect(isCompulsorySubject(subject.subject)).toBe(false)
          })
          
          // Should contain all optional subjects from original list
          const originalOptional = subjects.filter(s => !isCompulsorySubject(s.subject))
          expect(filtered.length).toBe(originalOptional.length)
        }
      ), { numRuns: 100 })
    })

    test('property: combined filtering preserves both search and category constraints', () => {
      fc.assert(fc.property(
        createSubjectList(),
        fc.string(),
        fc.constantFrom('all', 'compulsory', 'optional') as fc.Arbitrary<CategoryFilter>,
        (subjects, searchQuery, category) => {
          const filtered = filterSubjects(subjects, searchQuery, category)
          
          // All results should match search query (if not empty)
          if (searchQuery.trim()) {
            filtered.forEach(subject => {
              expect(subject.subject.toLowerCase()).toContain(searchQuery.toLowerCase())
            })
          }
          
          // All results should match category filter
          if (category !== 'all') {
            filtered.forEach(subject => {
              const expectedCategory = isCompulsorySubject(subject.subject) ? 'compulsory' : 'optional'
              expect(expectedCategory).toBe(category)
            })
          }
        }
      ), { numRuns: 100 })
    })
  })

  describe('Category Counts', () => {
    test('property: category counts sum to total subjects', () => {
      const subjectArbitrary = fc.array(
        fc.record({
          subject: fc.oneof(
            fc.constantFrom(...COMPULSORY_SUBJECTS),
            fc.string().filter(s => !COMPULSORY_SUBJECTS.includes(s as any))
          ),
          count: fc.integer({ min: 1, max: 1000 })
        }),
        { minLength: 0, maxLength: 100 }
      )

      fc.assert(fc.property(
        subjectArbitrary,
        (subjects) => {
          const counts = calculateCategoryCounts(subjects)
          
          expect(counts.compulsory + counts.optional).toBe(counts.all)
          expect(counts.all).toBe(subjects.length)
          expect(counts.compulsory).toBeGreaterThanOrEqual(0)
          expect(counts.optional).toBeGreaterThanOrEqual(0)
        }
      ), { numRuns: 100 })
    })
  })

  describe('Session Persistence', () => {
    test('property: save and load category round trip preserves value', () => {
      // Create a proper mock storage
      const mockStorage: { [key: string]: string } = {}
      const mockSessionStorage = window.sessionStorage as jest.Mocked<Storage>
      mockSessionStorage.setItem.mockImplementation((key, value) => {
        mockStorage[key] = value
      })
      mockSessionStorage.getItem.mockImplementation((key) => {
        return mockStorage[key] || null
      })
      mockSessionStorage.removeItem.mockImplementation((key) => {
        delete mockStorage[key]
      })

      fc.assert(fc.property(
        fc.constantFrom('all', 'compulsory', 'optional') as fc.Arbitrary<CategoryFilter>,
        (category) => {
          saveCategoryToSession(category)
          const loaded = loadCategoryFromSession()
          expect(loaded).toBe(category)
        }
      ), { numRuns: 100 })
    })

    test('loads default "all" when no saved category exists', () => {
      const mockSessionStorage = window.sessionStorage as jest.Mocked<Storage>
      mockSessionStorage.getItem.mockReturnValue(null)
      
      expect(loadCategoryFromSession()).toBe('all')
    })

    test('loads default "all" when invalid category is saved', () => {
      // Mock invalid data in session storage
      const mockSessionStorage = window.sessionStorage as jest.Mocked<Storage>
      mockSessionStorage.getItem.mockReturnValue('invalid-category')
      
      expect(loadCategoryFromSession()).toBe('all')
    })

    test('handles session storage errors gracefully', () => {
      const mockSessionStorage = window.sessionStorage as jest.Mocked<Storage>
      mockSessionStorage.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })
      mockSessionStorage.getItem.mockImplementation(() => {
        throw new Error('Storage access denied')
      })

      // Should not throw errors
      expect(() => saveCategoryToSession('compulsory')).not.toThrow()
      expect(() => loadCategoryFromSession()).not.toThrow()
      expect(loadCategoryFromSession()).toBe('all')
    })
  })

  describe('Edge Cases', () => {
    test('handles empty subject lists', () => {
      const emptyList: Subject[] = []
      
      expect(filterSubjectsByCategory(emptyList, 'all')).toEqual([])
      expect(filterSubjectsByCategory(emptyList, 'compulsory')).toEqual([])
      expect(filterSubjectsByCategory(emptyList, 'optional')).toEqual([])
      
      const counts = calculateCategoryCounts(emptyList)
      expect(counts.all).toBe(0)
      expect(counts.compulsory).toBe(0)
      expect(counts.optional).toBe(0)
    })

    test('handles subjects with empty names', () => {
      const subjectsWithEmpty: Subject[] = [
        { subject: '', count: 10 },
        { subject: 'General Science and Ability', count: 20 }
      ]
      
      const compulsoryFiltered = filterSubjectsByCategory(subjectsWithEmpty, 'compulsory')
      expect(compulsoryFiltered).toHaveLength(1)
      expect(compulsoryFiltered[0].subject).toBe('General Science and Ability')
      
      const optionalFiltered = filterSubjectsByCategory(subjectsWithEmpty, 'optional')
      expect(optionalFiltered).toHaveLength(1)
      expect(optionalFiltered[0].subject).toBe('')
    })

    test('handles case sensitivity in search', () => {
      const subjects: Subject[] = [
        { subject: 'General Science and Ability', count: 100 },
        { subject: 'English Precis and Composition', count: 200 }
      ]
      
      const upperCaseSearch = filterSubjects(subjects, 'GENERAL', 'all')
      const lowerCaseSearch = filterSubjects(subjects, 'general', 'all')
      const mixedCaseSearch = filterSubjects(subjects, 'General', 'all')
      
      expect(upperCaseSearch).toHaveLength(1)
      expect(lowerCaseSearch).toHaveLength(1)
      expect(mixedCaseSearch).toHaveLength(1)
      expect(upperCaseSearch[0].subject).toBe('General Science and Ability')
    })
  })
})