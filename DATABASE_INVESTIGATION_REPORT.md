# Database Investigation Report: CSS MCQs Issues

## Summary
Investigation of three reported issues with the CSS MCQs practice module:
1. Years showing 1975 instead of 2007 onwards
2. MPT MCQs appearing in subject practice (should be excluded)
3. Idioms should be in Language category (not separate)

---

## Issue 1: Years Showing 1975 Instead of 2007

### Analysis
**Root Cause: Possible Data Issues in `css_mcqs_enhanced` Table**

The years displayed come directly from the `css_mcqs_enhanced` table via the RPC function `get_enhanced_css_subject_stats()`:

**Location:** `/lib/supabase/migrations/011_enhanced_css_mcqs.sql`

```sql
CREATE OR REPLACE FUNCTION get_enhanced_css_subject_stats()
RETURNS TABLE (
  subject TEXT,
  question_count BIGINT,
  years INTEGER[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.subject,
    COUNT(*) as question_count,
    ARRAY_AGG(DISTINCT m.year ORDER BY m.year DESC) FILTER (WHERE m.year IS NOT NULL) as years
  FROM css_mcqs_enhanced m
  GROUP BY m.subject
  ORDER BY m.subject;
END;
$$ LANGUAGE plpgsql STABLE;
```

### Flow
1. **Frontend** (`/app/css/css-practice/subjects/page.tsx` line 49):
   ```typescript
   const { data, error } = await supabase.rpc('get_enhanced_css_subject_stats')
   ```

2. **Data Processing** (lines 56-61):
   - Fetches RPC data
   - Maps to `subjectList` with subject and count
   - Note: The `years` array from RPC is NOT being used in the UI

3. **Years Fetching** (lines 120-242):
   ```typescript
   const result1 = await supabase
     .from('css_mcqs_enhanced')
     .select('year')
     .eq('subject', subjectQuery)
     .order('year', { ascending: false })
   ```

### Issues Identified
1. **Data Quality Issue**: The `year` column in `css_mcqs_enhanced` table likely contains invalid data
   - Some records may have `year = 1975` (default or corrupted data)
   - CSS exam MCQs should only be from 2007 onwards

2. **No Filtering**: The query does NOT filter out old/invalid years
   - Solution: Add `.gt('year', 2006)` or `.gte('year', 2007)` to filter

### Recommended Fix
Add year filtering to both:
- The RPC function `get_enhanced_css_subject_stats()`
- The year fetching query in the quiz page

---

## Issue 2: MPT MCQs Appearing in Subject Practice

### Analysis
**Root Cause: Possible Data Mixing in `css_mcqs_enhanced` Table**

There are TWO separate tables for different exam types:
1. **css_mcqs_enhanced** - For CSS exam MCQs (used in subject practice)
2. **mpt_mcqs** - For MPT (Management Professional Test) MCQs

**Location of Separation:**
- `/supabase/migrations/011_enhanced_css_mcqs.sql` - CSS table
- `/supabase/migrations/010_mpt_mcqs.sql` - MPT table

### Current Architecture
- **MPT Data**: Uses separate `mpt_mcqs` table (no subject column, uses test_number)
- **CSS Data**: Uses `css_mcqs_enhanced` table (has subject column)

### Potential Issues
1. **Data might be mixed**: Some MCQs with `subject = "MPT"` or similar variations may exist in the `css_mcqs_enhanced` table
2. **No explicit filtering**: The fetch query doesn't exclude MPT subjects

### Recommended Diagnostic Steps
Query the database to check:
```sql
-- Check for MPT-related subjects in CSS table
SELECT DISTINCT subject FROM css_mcqs_enhanced
WHERE LOWER(subject) LIKE '%mpt%'
   OR LOWER(subject) LIKE '%management%';

-- Check for suspicious subject names
SELECT subject, COUNT(*) as count FROM css_mcqs_enhanced
GROUP BY subject
ORDER BY subject;

-- Check for subjects with fewer than 3 distinct years (indicator of non-CSS data)
SELECT subject, COUNT(DISTINCT year) as year_count, COUNT(*) as mcq_count
FROM css_mcqs_enhanced
GROUP BY subject
HAVING COUNT(DISTINCT year) < 3;
```

### Recommended Fix
Add filtering to exclude MPT:

```typescript
// In subjects/page.tsx and quiz/page.tsx
const excludedSubjects = ['MPT', 'Management Professional Test', 'Test Number']

// When fetching subjects
.select('year')
.eq('subject', subjectQuery)
.not('subject', 'like', '%MPT%')
.not('subject', 'like', '%Management%')
```

Or filter at RPC level:
```sql
CREATE OR REPLACE FUNCTION get_enhanced_css_subject_stats()
...
WHERE m.subject NOT LIKE '%MPT%'
  AND m.subject NOT LIKE '%Management%'
```

---

## Issue 3: Idioms Should Be in Language Category (Not Separate)

### Current Implementation
**Location:** `/lib/css-subjects/categorization.ts`

Current categories defined:
```typescript
export type SubjectCategory = 'compulsory' | 'optional' | 'language' | 'idioms'
export type CategoryFilter = 'all' | 'compulsory' | 'optional' | 'language' | 'idioms'
```

### Configuration
Lines 34-46 show four separate categories:
```typescript
// Idioms as SEPARATE category
export const IDIOMS_SUBJECTS: readonly string[] = [
  "Idioms",
  "Idioms & Phrases",
  "English (Idioms)",
  "English Idioms"
]

// Language skills category
export const LANGUAGE_SUBJECTS: readonly string[] = [
  "English Essay"
]
```

### Current Filter UI
**Location:** `/app/css/css-practice/subjects/page.tsx` line 415:
```typescript
<SidebarCategoryToggle
  activeCategory={activeCategory}
  onCategoryChange={handleCategoryChange}
  categoryCounts={categoryCounts}
/>
```

Shows filter options for: `all`, `compulsory`, `optional`, `language`, `idioms`

### Issues with Current Design
1. **Idioms are separate from Language category** - But they should be grouped together
2. **Category counts separately displayed** - Creates UI confusion
3. **Logic conflict** - Idioms are English language skills, belong in Language category

### Recommended Fix
Combine Idioms into Language category:

```typescript
// Updated categorization.ts
export type SubjectCategory = 'compulsory' | 'optional' | 'language'
export type CategoryFilter = 'all' | 'compulsory' | 'optional' | 'language'

export const LANGUAGE_SUBJECTS: readonly string[] = [
  "English Essay",
  "Idioms",
  "Idioms & Phrases",
  "English (Idioms)",
  "English Idioms"
] as const

// Remove IDIOMS_SUBJECTS entirely
// Update categorizeSubject() function:
export function categorizeSubject(subjectName: string): SubjectCategory {
  if (isLanguageSubject(subjectName)) return 'language'  // Idioms now here
  if (isCompulsorySubject(subjectName)) return 'compulsory'
  return 'optional'
}
```

---

## Files Requiring Investigation/Updates

### For Issue 1 (Year Range)
1. `/supabase/migrations/011_enhanced_css_mcqs.sql` - Update RPC function with year filtering
2. `/app/css/css-practice/subjects/page.tsx` (line 120-242) - Add year filtering
3. `/lib/hooks/useLazyLoadMCQs.ts` (line 100-140) - Add year filtering

### For Issue 2 (MPT Exclusion)
1. `/supabase/migrations/011_enhanced_css_mcqs.sql` - Update RPC function with subject filtering
2. `/app/css/css-practice/subjects/page.tsx` (line 46-118) - Add subject filtering
3. `/lib/hooks/useLazyLoadMCQs.ts` (line 100-140) - Add subject filtering
4. Consider using a whitelist of known valid CSS subjects

### For Issue 3 (Idioms Category)
1. `/lib/css-subjects/categorization.ts` - Refactor categories
2. `/app/css/css-practice/subjects/page.tsx` (line 414-420) - Update UI components
3. `/components/css-practice/CategoryToggle.tsx` - Update filter button labels

---

## Data Integrity Recommendations

### Priority 1: Immediate Actions
1. **Query the database** to identify:
   - Records with year = 1975
   - Any MPT-related subjects in css_mcqs_enhanced
   - Outlier years for each subject

2. **Clean data** - Remove or correct invalid records

### Priority 2: Code Updates
1. Add input validation and filtering at database level (RPC functions)
2. Add client-side validation as fallback
3. Update UI to reflect correct category structure

### Priority 3: Testing
1. Verify all CSS exam years are 2007-2024
2. Confirm no MPT data appears in subject practice
3. Validate category filtering works correctly

---

## Next Steps

1. **Database Query**: Run the diagnostic SQL queries above to understand current data state
2. **Data Cleanup**: Remove invalid records
3. **Code Updates**: Apply fixes from each issue section
4. **Testing**: Verify all three issues are resolved
5. **Deployment**: Push changes to production

