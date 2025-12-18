# CSS Subject Categorization Design

## Overview

This feature enhances the CSS practice page by implementing a subject categorization system that divides subjects into Compulsory and Optional categories. The design introduces toggle buttons for category filtering while maintaining compatibility with existing search functionality and preserving user experience consistency.

## Architecture

The categorization system follows a client-side filtering approach that builds upon the existing subject loading mechanism. The architecture consists of:

1. **Category Definition Layer**: Static configuration defining which subjects belong to each category
2. **Filter State Management**: React state management for active category and combined filtering logic
3. **UI Component Layer**: Toggle buttons and visual feedback components
4. **Integration Layer**: Seamless integration with existing search and subject selection functionality

## Components and Interfaces

### Subject Category Configuration

```typescript
interface SubjectCategory {
  compulsory: string[]
  optional: string[]
}

const SUBJECT_CATEGORIES: SubjectCategory = {
  compulsory: [
    "English Precis and Composition",
    "General Science and Ability", 
    "Current Affairs",
    "Pakistan Affairs",
    "Islamic Studies"
  ],
  optional: [] // Dynamically populated with remaining subjects
}
```

### Category Filter State

```typescript
interface CategoryFilterState {
  activeCategory: 'all' | 'compulsory' | 'optional'
  filteredSubjects: Subject[]
}

interface CategoryFilterActions {
  setActiveCategory: (category: 'all' | 'compulsory' | 'optional') => void
  getFilteredSubjects: (subjects: Subject[], searchQuery: string) => Subject[]
}
```

### Category Toggle Component

```typescript
interface CategoryToggleProps {
  activeCategory: 'all' | 'compulsory' | 'optional'
  onCategoryChange: (category: 'all' | 'compulsory' | 'optional') => void
  compulsoryCount: number
  optionalCount: number
  totalCount: number
}
```

## Data Models

### Enhanced Subject Interface

The existing Subject interface remains unchanged, but filtering logic is added:

```typescript
interface Subject {
  subject: string
  count: number
}

interface CategorizedSubject extends Subject {
  category: 'compulsory' | 'optional'
}
```

### Filter State Model

```typescript
interface FilterState {
  searchQuery: string
  activeCategory: 'all' | 'compulsory' | 'optional'
  sessionPersistence: boolean
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After reviewing all properties identified in the prework, I've identified the following consolidations:
- Properties 1.3 and 1.4 can be combined into a single comprehensive filtering property
- Properties 2.1-2.5 and 3.2-3.6 are specific examples that don't need separate properties
- Properties 5.1-5.5 can be combined into a comprehensive search integration property

**Property 1: Category filtering consistency**
*For any* subject list and category selection, filtering by a category should show exactly the subjects that belong to that category and no others
**Validates: Requirements 1.3, 1.4, 3.1**

**Property 2: Compulsory subject inclusion**
*For any* subject list containing compulsory subjects, filtering by "compulsory" should include all and only the predefined compulsory subjects that exist in the list
**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

**Property 3: Optional subject exclusion**
*For any* subject list, filtering by "optional" should exclude all compulsory subjects and include all remaining subjects
**Validates: Requirements 3.2, 3.3, 3.4, 3.5, 3.6**

**Property 4: Reset functionality**
*For any* filtered state, selecting "all" category should display the complete original subject list
**Validates: Requirements 1.5**

**Property 5: Search and category filter combination**
*For any* subject list, search query, and category filter, the combined result should be the intersection of search matches and category matches
**Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

**Property 6: Session persistence round trip**
*For any* category selection, storing the selection and then retrieving it should return the same category value
**Validates: Requirements 6.1, 6.2, 6.3, 6.5**

## Error Handling

### Invalid Category Selection
- Gracefully handle undefined or invalid category values by defaulting to 'all'
- Log warnings for debugging while maintaining user experience

### Missing Subject Data
- Handle cases where compulsory subjects are not present in the database
- Display appropriate messaging when no subjects match the selected category

### Session Storage Failures
- Implement fallback behavior when localStorage is unavailable
- Ensure functionality works without persistence in private browsing modes

## Testing Strategy

### Unit Testing Approach
- Test category classification logic with known subject lists
- Test filter combination logic with various search and category combinations
- Test session persistence with mock localStorage
- Test edge cases like empty subject lists and invalid categories

### Property-Based Testing Approach
Using **fast-check** library for JavaScript property-based testing:

- Generate random subject lists and verify filtering properties hold
- Test search and category filter combinations with random inputs
- Verify session persistence with random category selections
- Test UI state consistency with random user interaction sequences

**Property-based testing requirements:**
- Each property-based test must run a minimum of 100 iterations
- Each test must be tagged with the corresponding design property
- Tests must use smart generators that create realistic subject data
- Edge cases (empty lists, missing subjects) must be included in generators

**Test tagging format:** `**Feature: css-subject-categorization, Property {number}: {property_text}**`

### Integration Testing
- Test complete user workflows from category selection to quiz initiation
- Verify compatibility with existing search functionality
- Test navigation and state preservation across page transitions

## Implementation Notes

### Performance Considerations
- Category filtering is performed client-side to avoid additional database queries
- Subject categorization is computed once when subjects are loaded
- Search and category filters are combined efficiently using array methods

### Accessibility
- Toggle buttons include proper ARIA labels and keyboard navigation
- Screen readers announce category changes and subject counts
- Focus management maintains usability for keyboard users

### Mobile Responsiveness
- Category toggle buttons adapt to smaller screen sizes
- Touch targets meet minimum size requirements
- Layout adjusts gracefully on mobile devices

### Browser Compatibility
- Session persistence uses localStorage with fallback for older browsers
- CSS features degrade gracefully in unsupported browsers
- JavaScript functionality works across modern browser versions