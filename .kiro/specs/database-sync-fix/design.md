# Database Synchronization Fix Design Document

## Overview

The Database Synchronization Fix system replaces hardcoded subject and year data with real-time synchronization between the application UI and the actual Supabase database/storage contents. This ensures users only see subjects and years that have actual papers available, eliminating "PDF not found" errors while maintaining fast loading performance.

## Architecture

The system uses a hybrid approach: real-time database queries with intelligent caching for performance.

```
┌─────────────────────────────────────────────────────────────┐
│                    UI Components                            │
├─────────────────────────────────────────────────────────────┤
│              Real-Time Data API Layer                      │
├─────────────────────────────────────────────────────────────┤
│         Database Query Engine + Smart Cache                │
├─────────────────────────────────────────────────────────────┤
│    Storage Scanner + Database Reader + Cache Manager       │
├─────────────────────────────────────────────────────────────┤
│           Supabase Database + Storage Buckets              │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### Real-Time Data Service
Replaces the hardcoded fast data with live database queries.

```typescript
interface RealTimeDataService {
  getAvailableSubjects(): Promise<SubjectWithRealCounts[]>
  getAvailableYears(subject: string): Promise<YearWithRealCounts[]>
  validateSubjectYear(subject: string, year: number): Promise<boolean>
  refreshCache(): Promise<void>
}

interface SubjectWithRealCounts {
  subject: string
  displayName: string
  slug: string
  actualCount: number
  availableYears: number[]
  lastUpdated: string
}

interface YearWithRealCounts {
  year: number
  actualCount: number
  hasFiles: boolean
  sampleFiles: string[]
}
```

### Storage Scanner
Scans actual Supabase storage to discover real file availability.

```typescript
interface StorageScanner {
  scanAllSubjects(): Promise<StorageScanResult>
  scanSubjectYears(subject: string): Promise<YearScanResult[]>
  validateFileExists(subject: string, year: number): Promise<FileValidationResult>
}

interface StorageScanResult {
  subjects: {
    [subjectSlug: string]: {
      displayName: string
      years: number[]
      totalFiles: number
      lastScanned: string
    }
  }
  totalFiles: number
  scanDuration: number
}
```

### Database Query Engine
Queries actual database tables for paper metadata.

```typescript
interface DatabaseQueryEngine {
  getSubjectsFromDatabase(): Promise<DatabaseSubject[]>
  getYearsFromDatabase(subject: string): Promise<DatabaseYear[]>
  getPaperMetadata(subject: string, year: number): Promise<PaperMetadata[]>
}

interface DatabaseSubject {
  id: string
  name: string
  slug: string
  paperCount: number
  yearRange: [number, number]
}

interface PaperMetadata {
  id: string
  subject: string
  year: number
  filename: string
  storageUrl: string
  verified: boolean
}
```

## Data Models

### Synchronized Subject Data
```typescript
interface SynchronizedSubject {
  subject: string
  displayName: string
  slug: string
  
  // Real counts from storage
  storageCount: number
  storageYears: number[]
  
  // Database metadata
  databaseCount: number
  databaseYears: number[]
  
  // Reconciled data (what UI shows)
  actualCount: number
  availableYears: number[]
  
  // Sync status
  isInSync: boolean
  lastSynced: string
  syncSource: 'storage' | 'database' | 'hybrid'
}
```

### Cache Management
```typescript
interface CacheEntry {
  key: string
  data: any
  timestamp: string
  ttl: number // seconds
  source: 'storage' | 'database'
  isStale: boolean
}

interface CacheManager {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, data: T, ttl?: number): Promise<void>
  invalidate(pattern: string): Promise<void>
  isStale(key: string): Promise<boolean>
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Property 1: Subject data reflects database reality
*For any* database state, the loaded subject data should exactly match the subjects that actually exist in the database
**Validates: Requirements 1.1**

Property 2: Year availability matches storage contents
*For any* subject, the displayed years should exactly match the years that have actual papers in storage
**Validates: Requirements 1.2, 4.2**

Property 3: Selectable years guarantee file existence
*For any* subject/year combination that is marked as available, actual paper files must exist in storage
**Validates: Requirements 1.3**

Property 4: No empty subjects displayed
*For any* subject in the display list, there should be at least one paper file in storage
**Validates: Requirements 1.4**

Property 5: Paper counts match storage reality
*For any* subject, the displayed paper count should equal the actual number of files in storage
**Validates: Requirements 1.5, 4.1**

Property 6: Storage scan accuracy
*For any* storage state, the sync service should generate data that exactly matches the actual storage contents
**Validates: Requirements 2.2**

Property 7: Year extraction completeness
*For any* set of files in storage, the extracted years should match all years found in the filenames
**Validates: Requirements 2.3**

Property 8: Sync diagnostic completeness
*For any* cache state and database state, the diagnostic should identify all differences between them
**Validates: Requirements 3.1, 3.2**

Property 9: Cache fix correctness
*For any* sync issue, after running the fix tool, the cache should match database reality
**Validates: Requirements 3.3**

Property 10: Validation invariant
*For any* cached subject/year combination, corresponding files should exist in storage
**Validates: Requirements 3.4**

Property 11: Per-year count accuracy
*For any* year displayed for a subject, the count should match the actual number of files for that year in storage
**Validates: Requirements 4.3**

Property 12: UI-storage consistency
*For any* storage state, the UI data should reflect the current storage contents
**Validates: Requirements 4.5**

Property 13: Filename parsing robustness
*For any* valid filename format in storage, the sync service should correctly parse and categorize it
**Validates: Requirements 5.1**

Property 14: Sparse year handling
*For any* subject with gaps in year coverage, only years with actual files should be displayed
**Validates: Requirements 5.2**

Property 15: Duplicate file handling
*For any* storage state with duplicate files, the counts should be accurate without double-counting
**Validates: Requirements 5.4**

## Error Handling

### Database Connection Issues
- Graceful fallback to cached data when database is unavailable
- Clear error messages indicating data staleness
- Automatic retry with exponential backoff for transient failures

### Storage Access Problems
- Fallback to database metadata when storage scanning fails
- Partial data loading when some buckets are inaccessible
- User-friendly error messages with troubleshooting guidance

### Data Inconsistency Scenarios
- Automatic reconciliation between database and storage data
- Conflict resolution favoring storage reality over database metadata
- Detailed logging of all data discrepancies for debugging

### Cache Corruption
- Automatic cache invalidation when corruption is detected
- Fallback to fresh database queries when cache is unreliable
- Self-healing cache regeneration

## Testing Strategy

### Unit Testing
- Test individual functions for subject/year extraction from filenames
- Test cache management operations (get, set, invalidate, staleness detection)
- Test error handling scenarios with mocked database/storage failures
- Test data reconciliation logic with conflicting database vs storage data

### Property-Based Testing
Using Jest with fast-check library for property-based testing:

- Generate random storage states and verify sync accuracy
- Generate random subject/year combinations and test availability guarantees
- Generate random filename formats and test parsing robustness
- Test cache consistency across various update scenarios
- Verify count accuracy with randomly generated file sets

Each property-based test will run a minimum of 100 iterations to ensure comprehensive coverage.

### Integration Testing
- Test complete sync workflow from storage scan to UI display
- Test cache invalidation and refresh cycles
- Test real Supabase database and storage integration
- Test performance under various data sizes

## Implementation Notes

### Performance Optimization
- Implement intelligent caching with TTL-based invalidation
- Use batch operations for storage scanning
- Implement incremental sync for large datasets
- Add request debouncing for rapid UI interactions

### Data Reconciliation Strategy
1. **Storage as Source of Truth**: When conflicts exist, storage contents take precedence
2. **Database as Metadata**: Use database for additional metadata like paper titles, descriptions
3. **Hybrid Approach**: Combine storage file lists with database metadata for rich data

### Migration Strategy
1. **Phase 1**: Replace hardcoded data with database queries while keeping cache
2. **Phase 2**: Add storage scanning and reconciliation
3. **Phase 3**: Implement real-time sync and monitoring
4. **Phase 4**: Remove old hardcoded data files

### Monitoring and Alerting
- Track sync success/failure rates
- Monitor cache hit rates and staleness
- Alert on data inconsistencies between database and storage
- Performance monitoring for sync operations