# Database Synchronization Fix Requirements

## Introduction

The CSS Past Papers application currently displays incorrect year ranges and subject availability that don't match the actual data in the Supabase database and storage. Users see years like 2025 for subjects, but when they try to access these papers, they get "PDF not found" errors because the data is hardcoded and not synchronized with the real database.

## Glossary

- **Fast_Data_Cache**: Hardcoded subject and year data in `lib/fast-subjects-data.ts`
- **Database_Reality**: Actual data stored in Supabase tables and storage buckets
- **Sync_Service**: System that ensures UI data matches database reality
- **Year_Range_Generator**: System that creates accurate year lists based on actual data
- **Subject_Validator**: System that verifies subject availability against real data

## Requirements

### Requirement 1

**User Story:** As a student, I want to see only the years and subjects that actually have papers available, so that I don't encounter "PDF not found" errors.

#### Acceptance Criteria

1. WHEN the application loads subject data THEN the Sync_Service SHALL query the actual database for available subjects
2. WHEN displaying year options for a subject THEN the Year_Range_Generator SHALL show only years that have actual papers in storage
3. WHEN a user selects a year THEN the system SHALL guarantee that papers exist for that year
4. WHEN subjects are listed THEN the Subject_Validator SHALL verify each subject has actual papers before displaying
5. WHEN paper counts are shown THEN the system SHALL reflect the real number of papers in storage

### Requirement 2

**User Story:** As a developer, I want the fast data cache to be automatically synchronized with the database, so that performance remains high while data stays accurate.

#### Acceptance Criteria

1. WHEN the database is updated THEN the Fast_Data_Cache SHALL be regenerated to match the new data
2. WHEN generating fast data THEN the Sync_Service SHALL scan actual storage buckets for real file counts
3. WHEN creating year ranges THEN the Year_Range_Generator SHALL extract years from actual filenames in storage
4. WHEN updating cache data THEN the system SHALL preserve the fast loading performance
5. WHEN cache is stale THEN the system SHALL detect and refresh the data automatically

### Requirement 3

**User Story:** As a system administrator, I want tools to verify and fix data synchronization issues, so that I can maintain data accuracy.

#### Acceptance Criteria

1. WHEN running sync diagnostics THEN the system SHALL compare fast cache data with database reality
2. WHEN discrepancies are found THEN the system SHALL report specific differences between cache and database
3. WHEN fixing sync issues THEN the system SHALL provide automated tools to regenerate accurate cache data
4. WHEN validating data THEN the system SHALL check that every cached subject/year combination has actual files
5. WHEN monitoring sync health THEN the system SHALL provide alerts when cache becomes outdated

### Requirement 4

**User Story:** As a student, I want accurate paper counts and availability information, so that I can plan my study schedule effectively.

#### Acceptance Criteria

1. WHEN viewing subject lists THEN the system SHALL show accurate paper counts based on actual files
2. WHEN selecting a subject THEN the system SHALL display only years that contain actual papers
3. WHEN browsing years THEN the system SHALL indicate how many papers are available for each year
4. WHEN papers are added or removed THEN the displayed counts SHALL update to reflect changes
5. WHEN storage is modified THEN the UI data SHALL remain consistent with storage contents

### Requirement 5

**User Story:** As a developer, I want a robust synchronization system that handles edge cases, so that data integrity is maintained even with irregular data patterns.

#### Acceptance Criteria

1. WHEN storage contains files with non-standard naming THEN the Sync_Service SHALL parse and categorize them correctly
2. WHEN subjects have gaps in year coverage THEN the Year_Range_Generator SHALL show only available years
3. WHEN storage buckets are reorganized THEN the system SHALL adapt to new file structures
4. WHEN duplicate files exist THEN the system SHALL handle them gracefully without double-counting
5. WHEN storage is temporarily unavailable THEN the system SHALL use cached data with appropriate staleness warnings