/**
 * CSS Subject Categorization Configuration
 * Defines which subjects are compulsory vs optional for CSS examination
 */

export type SubjectCategory = 'compulsory' | 'optional'
export type CategoryFilter = 'all' | 'compulsory' | 'optional'

export interface Subject {
  subject: string
  count: number
}

export interface CategorizedSubject extends Subject {
  category: SubjectCategory
}

export interface CategoryFilterState {
  activeCategory: CategoryFilter
  filteredSubjects: Subject[]
}

export interface CategoryCounts {
  all: number
  compulsory: number
  optional: number
}

/**
 * Static configuration defining compulsory subjects for CSS examination
 */
export const COMPULSORY_SUBJECTS: readonly string[] = [
  "English Essay",
  "English (Precis and Composition)",
  "English Precis and Composition", // Legacy name support
  "English Precis And Composition", // Database format with capital "And"
  "English Precis & Composition", // Alternative with ampersand
  "English (Precis & Composition)", // Alternative with ampersand and parentheses
  "Precis and Composition", // Short form
  "General Science & Ability",
  "General Science and Ability", // Legacy name support
  "General Science Ability", // Database format without connector
  "Current Affairs",
  "Pakistan Affairs",
  "Islamic Studies",
  "Islamic Studies OR Comparative Study of Major Religions (For non muslim candidates)",
  "Comparative Study Of Major Religions" // Alternative name from database
] as const

/**
 * Determines if a subject is compulsory based on the predefined list
 */
export function isCompulsorySubject(subjectName: string): boolean {
  return COMPULSORY_SUBJECTS.includes(subjectName as any)
}

/**
 * Categorizes a subject as compulsory or optional
 */
export function categorizeSubject(subjectName: string): SubjectCategory {
  return isCompulsorySubject(subjectName) ? 'compulsory' : 'optional'
}

/**
 * Adds category information to a subject
 */
export function addCategoryToSubject(subject: Subject): CategorizedSubject {
  return {
    ...subject,
    category: categorizeSubject(subject.subject)
  }
}

/**
 * Filters subjects based on the selected category
 */
export function filterSubjectsByCategory(
  subjects: Subject[], 
  category: CategoryFilter
): Subject[] {
  if (category === 'all') {
    return subjects
  }
  
  return subjects.filter(subject => {
    const subjectCategory = categorizeSubject(subject.subject)
    return subjectCategory === category
  })
}

/**
 * Combines category filtering with search filtering
 */
export function filterSubjects(
  subjects: Subject[],
  searchQuery: string,
  category: CategoryFilter
): Subject[] {
  // First apply category filter
  let filtered = filterSubjectsByCategory(subjects, category)
  
  // Then apply search filter if query exists
  if (searchQuery.trim()) {
    filtered = filtered.filter(subject =>
      subject.subject.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
  
  return filtered
}

/**
 * Calculates counts for each category
 */
export function calculateCategoryCounts(subjects: Subject[]): CategoryCounts {
  const compulsoryCount = subjects.filter(s => isCompulsorySubject(s.subject)).length
  const optionalCount = subjects.length - compulsoryCount
  
  return {
    all: subjects.length,
    compulsory: compulsoryCount,
    optional: optionalCount
  }
}

/**
 * Session storage key for persisting category selection
 */
export const CATEGORY_STORAGE_KEY = 'css-practice-category-filter'

/**
 * Saves the selected category to session storage
 */
export function saveCategoryToSession(category: CategoryFilter): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(CATEGORY_STORAGE_KEY, category)
    }
  } catch (error) {
    console.warn('Failed to save category to session storage:', error)
  }
}

/**
 * Loads the selected category from session storage
 */
export function loadCategoryFromSession(): CategoryFilter {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const saved = sessionStorage.getItem(CATEGORY_STORAGE_KEY)
      if (saved && ['all', 'compulsory', 'optional'].includes(saved)) {
        return saved as CategoryFilter
      }
    }
  } catch (error) {
    console.warn('Failed to load category from session storage:', error)
  }
  
  return 'all' // Default fallback
}

/**
 * Clears the category selection from session storage
 */
export function clearCategoryFromSession(): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem(CATEGORY_STORAGE_KEY)
    }
  } catch (error) {
    console.warn('Failed to clear category from session storage:', error)
  }
}