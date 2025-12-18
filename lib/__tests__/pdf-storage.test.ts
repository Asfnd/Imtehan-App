/**
 * Tests for PDF storage utilities
 */

import { 
  generatePathPatterns, 
  normalizeSubjectKebab, 
  normalizeSubjectUnderscore,
  normalizeSubjectClean,
  validatePath 
} from '../pdf-storage'

describe('PDF Storage Utilities', () => {
  describe('Subject Normalization', () => {
    test('normalizeSubjectKebab handles basic subjects', () => {
      expect(normalizeSubjectKebab('English Essay')).toBe('english-essay')
      expect(normalizeSubjectKebab('Pakistan Affairs')).toBe('pakistan-affairs')
    })

    test('normalizeSubjectKebab handles special characters', () => {
      expect(normalizeSubjectKebab('English (Precis and Composition)')).toBe('english-precis-and-composition')
      expect(normalizeSubjectKebab('Journalism & Mass Communication')).toBe('journalism-mass-communication')
    })

    test('normalizeSubjectUnderscore works correctly', () => {
      expect(normalizeSubjectUnderscore('English Essay')).toBe('english_essay')
      expect(normalizeSubjectUnderscore('International Relations')).toBe('international_relations')
    })

    test('normalizeSubjectClean removes all special characters', () => {
      expect(normalizeSubjectClean('English (Precis & Composition)')).toBe('englishpreciscomposition')
    })
  })

  describe('Path Generation', () => {
    test('generates comprehensive path patterns', () => {
      const paths = generatePathPatterns('English Essay', 2023)
      
      // Should generate many patterns
      expect(paths.length).toBeGreaterThan(20)
      
      // Should include basic patterns
      expect(paths).toContain('english-essay/2023/english-essay-2023.pdf')
      expect(paths).toContain('english-essay-2023.pdf')
      expect(paths).toContain('2023/english-essay.pdf')
      
      // Should include underscore patterns
      expect(paths).toContain('english_essay/2023/english_essay-2023.pdf')
      
      // Should include nested patterns
      expect(paths).toContain('past-papers/english-essay/2023.pdf')
    })

    test('handles complex subject names', () => {
      const paths = generatePathPatterns('Journalism & Mass Communication', 2022)
      
      expect(paths.length).toBeGreaterThan(15)
      expect(paths).toContain('journalism-mass-communication/2022/journalism-mass-communication_2022.pdf')
      expect(paths).toContain('journalism_mass_communication/2022/journalism_mass_communication_2022.pdf')
    })
  })

  describe('Path Validation', () => {
    test('validates correct paths', () => {
      expect(validatePath('english-essay/2023/paper.pdf')).toBe(true)
      expect(validatePath('subject-2022.pdf')).toBe(true)
    })

    test('rejects invalid paths', () => {
      expect(validatePath('')).toBe(false)
      expect(validatePath('path/without/extension')).toBe(false)
      expect(validatePath('path//with//double//slashes.pdf')).toBe(false)
      expect(validatePath('path/../traversal.pdf')).toBe(false)
    })
  })
})