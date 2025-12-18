# Implementation Plan

- [-] 1. Create real-time data service infrastructure
  - Replace hardcoded fast data with live database queries
  - Set up caching layer for performance
  - Create interfaces for storage scanning and database queries
  - _Requirements: 1.1, 2.1, 2.2_

- [x] 1.1 Create storage scanner service
  - Write service to scan Supabase storage buckets for actual files
  - Implement filename parsing to extract subjects and years
  - Add file counting and metadata extraction
  - _Requirements: 2.2, 2.3, 5.1_

- [ ] 1.2 Write property test for storage scanning accuracy
  - **Property 6: Storage scan accuracy**
  - **Validates: Requirements 2.2**

- [ ] 1.3 Create database query engine
  - Write service to query actual database tables for paper metadata
  - Implement subject and year extraction from database records
  - Add paper counting and availability checking
  - _Requirements: 1.1, 3.1_

- [ ] 1.4 Write property test for database query accuracy
  - **Property 1: Subject data reflects database reality**
  - **Validates: Requirements 1.1**

- [ ] 2. Implement data synchronization and reconciliation
  - Create service to compare database vs storage data
  - Implement conflict resolution logic (storage as source of truth)
  - Add data reconciliation and merging capabilities
  - _Requirements: 3.1, 3.2, 3.3, 4.5_

- [ ] 2.1 Create sync diagnostic service
  - Write service to compare cache data with database/storage reality
  - Implement difference detection and reporting
  - Add detailed logging for sync discrepancies
  - _Requirements: 3.1, 3.2_

- [ ] 2.2 Write property test for sync diagnostic completeness
  - **Property 8: Sync diagnostic completeness**
  - **Validates: Requirements 3.1, 3.2**

- [ ] 2.3 Implement cache fix and regeneration tools
  - Write automated tools to regenerate accurate cache data
  - Implement cache invalidation and refresh mechanisms
  - Add validation to ensure cache matches reality after fixes
  - _Requirements: 3.3, 2.5_

- [ ] 2.4 Write property test for cache fix correctness
  - **Property 9: Cache fix correctness**
  - **Validates: Requirements 3.3**

- [ ] 3. Replace hardcoded data with real-time queries
  - Update API routes to use real database/storage data
  - Replace `lib/fast-subjects-data.ts` with dynamic data service
  - Ensure backward compatibility during transition
  - _Requirements: 1.1, 1.2, 1.5, 4.1, 4.2_

- [x] 3.1 Update past papers API route
  - Modify `app/api/past-papers/route.ts` to use real-time data service
  - Replace hardcoded subjects with database queries
  - Add caching for performance while ensuring data accuracy
  - _Requirements: 1.1, 1.4, 1.5_

- [ ] 3.2 Write property test for subject availability
  - **Property 4: No empty subjects displayed**
  - **Validates: Requirements 1.4**

- [ ] 3.3 Write property test for paper count accuracy
  - **Property 5: Paper counts match storage reality**
  - **Validates: Requirements 1.5, 4.1**

- [x] 3.4 Update years API route
  - Modify `app/api/past-papers/years/route.ts` to use real storage data
  - Replace hardcoded year ranges with actual file-based years
  - Ensure only years with actual papers are returned
  - _Requirements: 1.2, 1.3, 4.2, 4.3_

- [ ] 3.5 Write property test for year availability
  - **Property 2: Year availability matches storage contents**
  - **Validates: Requirements 1.2, 4.2**

- [ ] 3.6 Write property test for file existence guarantee
  - **Property 3: Selectable years guarantee file existence**
  - **Validates: Requirements 1.3**

- [ ] 4. Implement robust filename parsing and edge case handling
  - Create comprehensive filename parsing for various formats
  - Handle subjects with special characters and spaces
  - Add support for non-standard naming conventions
  - _Requirements: 5.1, 5.2, 5.4_

- [ ] 4.1 Create robust filename parser
  - Write parser to handle various filename formats and conventions
  - Implement subject name normalization and year extraction
  - Add support for special characters and edge cases
  - _Requirements: 5.1, 2.3_

- [ ]* 4.2 Write property test for filename parsing robustness
  - **Property 13: Filename parsing robustness**
  - **Validates: Requirements 5.1**

- [ ]* 4.3 Write property test for year extraction completeness
  - **Property 7: Year extraction completeness**
  - **Validates: Requirements 2.3**

- [ ] 4.4 Implement sparse year handling
  - Add logic to handle subjects with gaps in year coverage
  - Ensure only years with actual files are displayed
  - Handle duplicate files without double-counting
  - _Requirements: 5.2, 5.4_

- [ ]* 4.5 Write property test for sparse year handling
  - **Property 14: Sparse year handling**
  - **Validates: Requirements 5.2**

- [ ]* 4.6 Write property test for duplicate file handling
  - **Property 15: Duplicate file handling**
  - **Validates: Requirements 5.4**

- [ ] 5. Add caching and performance optimization
  - Implement intelligent caching with TTL-based invalidation
  - Add cache staleness detection and automatic refresh
  - Optimize for fast loading while maintaining data accuracy
  - _Requirements: 2.4, 2.5, 3.5_

- [ ] 5.1 Create cache management system
  - Write cache manager with TTL support and staleness detection
  - Implement cache invalidation patterns and refresh mechanisms
  - Add performance monitoring and cache hit rate tracking
  - _Requirements: 2.5, 3.5_

- [ ]* 5.2 Write unit tests for cache operations
  - Create unit tests for cache get, set, invalidate operations
  - Test TTL expiration and staleness detection
  - Test cache refresh and invalidation scenarios
  - _Requirements: 2.5_

- [ ] 6. Create diagnostic and monitoring tools
  - Build admin tools for sync health monitoring
  - Add diagnostic pages for troubleshooting data issues
  - Implement alerting for data inconsistencies
  - _Requirements: 3.1, 3.2, 3.4, 3.5_

- [ ] 6.1 Create sync diagnostic admin page
  - Build admin interface to compare cache vs database/storage data
  - Add tools to identify and report data discrepancies
  - Include automated fix buttons for common sync issues
  - _Requirements: 3.1, 3.2, 3.3_

- [ ]* 6.2 Write property test for validation invariant
  - **Property 10: Validation invariant**
  - **Validates: Requirements 3.4**

- [ ] 6.3 Add monitoring and alerting
  - Implement sync health monitoring with alerts
  - Add performance tracking for sync operations
  - Create dashboards for data consistency metrics
  - _Requirements: 3.5_

- [ ] 7. Update UI components for error handling
  - Improve error messages when data sync issues occur
  - Add loading states during real-time data fetching
  - Implement graceful fallbacks when sync fails
  - _Requirements: 5.5, 2.4_

- [ ] 7.1 Enhance error handling in PDF viewer
  - Update error messages to indicate data sync issues
  - Add links to diagnostic tools when sync problems occur
  - Implement retry mechanisms with better user feedback
  - _Requirements: 5.5_

- [ ]* 7.2 Write property test for UI-storage consistency
  - **Property 12: UI-storage consistency**
  - **Validates: Requirements 4.5**

- [ ]* 7.3 Write property test for per-year count accuracy
  - **Property 11: Per-year count accuracy**
  - **Validates: Requirements 4.3**

- [ ] 8. Checkpoint - Ensure all tests pass and data synchronization works
  - Ensure all tests pass, ask the user if questions arise.