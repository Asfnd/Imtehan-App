# PDF Storage Integration Design Document

## Overview

The PDF Storage Integration system fixes the current Supabase storage access issues for CSS Past Papers. The system ensures proper path resolution, file discovery, and error handling for PDFs stored in the existing Supabase storage buckets.

## Architecture

Simple, focused architecture for Supabase storage access:

```
┌─────────────────────────────────────────────────────────────┐
│                    PDF Viewer Component                     │
├─────────────────────────────────────────────────────────────┤
│                Enhanced Path Resolution                     │
├─────────────────────────────────────────────────────────────┤
│              Supabase Storage Access Layer                 │
├─────────────────────────────────────────────────────────────┤
│                  Error Handling & Debugging                │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### Enhanced PDF Storage Utilities
Improved version of the existing `lib/pdf-storage.ts` with better path resolution.

```typescript
interface PDFResult {
  success: boolean
  url?: string
  error?: string
  searchedPaths?: string[]
  foundAt?: string
}

interface PathPattern {
  pattern: string
  description: string
}
```

### Path Resolution System
Enhanced path generation that covers all common storage patterns.

```typescript
interface PathResolver {
  generateAllPossiblePaths(subject: string, year: number): PathPattern[]
  normalizeSubject(subject: string): string
  testPath(path: string): Promise<boolean>
}
```

## Data Models

### Storage Configuration
```typescript
interface StorageConfig {
  buckets: {
    pastPapers: string // 'css-past-papers'
    solvedPapers: string // 'css-solved-papers'
  }
  pathPatterns: PathPattern[]
  signedUrlExpiry: number // seconds
  maxSearchAttempts: number
}
```

### Debug Information
```typescript
interface StorageDebugInfo {
  bucketAccessible: boolean
  totalFiles: number
  sampleFiles: string[]
  searchResults: {
    subject: string
    year: number
    searchedPaths: string[]
    foundPath?: string
    success: boolean
  }[]
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Property 1: Path Resolution Completeness
*For any* subject and year combination, the system should generate all reasonable path variations that could exist in storage
**Validates: Requirements 3.2, 3.4**

Property 2: Storage Access Reliability  
*For any* accessible PDF file in Supabase storage, the system should be able to find and return a valid signed URL
**Validates: Requirements 1.1, 3.5**

Property 3: Error Information Completeness
*For any* failed PDF lookup, the system should provide detailed information about which paths were searched and why the lookup failed
**Validates: Requirements 2.1, 2.2, 2.5**

Property 4: Subject Name Normalization Consistency
*For any* subject name with special characters or spaces, the normalization should produce consistent, valid storage paths
**Validates: Requirements 3.1, 3.3**

## Error Handling

### Storage Connection Issues
- Graceful degradation when Supabase is unavailable
- Clear error messages with actionable steps
- Automatic retry with exponential backoff

### File Not Found Scenarios
- Comprehensive path search before declaring failure
- Detailed logging of search attempts
- Helpful error messages showing expected file locations

### Path Resolution Failures
- Fallback to fuzzy matching when exact paths fail
- Support for multiple naming conventions
- Case-insensitive matching as last resort

## Testing Strategy

### Unit Testing
- Test path normalization functions with various subject names
- Test signed URL generation and validation
- Test error handling scenarios

### Property-Based Testing
- Generate random subject/year combinations and verify path generation
- Test that all generated paths are valid storage paths
- Verify that normalization is consistent and reversible where possible

### Integration Testing
- Test actual Supabase storage access
- Verify signed URL creation and accessibility
- Test the complete PDF loading workflow

## Implementation Notes

### Path Pattern Priority
1. Exact match patterns (subject-kebab/year/filename.pdf)
2. Common variations (subject_underscore/year.pdf)
3. Nested patterns (past-papers/subject/year.pdf)
4. Fuzzy matching (keyword-based search)

### Performance Considerations
- Cache successful path resolutions
- Limit concurrent storage requests
- Use efficient batch operations for file listing

### Debugging Support
- Enhanced storage test page with detailed diagnostics
- Console logging for development environment
- Storage health check endpoints