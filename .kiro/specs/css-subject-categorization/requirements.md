# CSS Subject Categorization Requirements

## Introduction

This feature enhances the CSS practice page by organizing subjects into two distinct categories: Compulsory and Optional subjects. Users will be able to toggle between these categories using dedicated buttons, making it easier to focus on specific types of CSS exam preparation.

## Glossary

- **CSS_Practice_System**: The web application system for CSS MCQ practice
- **Subject_Category**: A classification system dividing subjects into Compulsory and Optional
- **Toggle_Button**: Interactive UI element that switches between subject categories
- **Compulsory_Subjects**: Core subjects required for all CSS candidates
- **Optional_Subjects**: Elective subjects that candidates can choose from
- **Subject_Filter**: Mechanism to display only subjects from selected category

## Requirements

### Requirement 1

**User Story:** As a CSS exam candidate, I want to see subjects organized by category (Compulsory vs Optional), so that I can focus my practice on the appropriate subject types.

#### Acceptance Criteria

1. WHEN a user visits the CSS practice page THEN the CSS_Practice_System SHALL display two category toggle buttons labeled "Compulsory" and "Optional"
2. WHEN the page loads initially THEN the CSS_Practice_System SHALL display all subjects by default
3. WHEN a user clicks the "Compulsory" button THEN the CSS_Practice_System SHALL show only compulsory subjects and highlight the active button
4. WHEN a user clicks the "Optional" button THEN the CSS_Practice_System SHALL show only optional subjects and highlight the active button
5. WHEN a user clicks "All" or deselects current filter THEN the CSS_Practice_System SHALL display all subjects regardless of category

### Requirement 2

**User Story:** As a CSS exam candidate, I want compulsory subjects to include the core exam requirements, so that I can practice the essential subjects for CSS examination.

#### Acceptance Criteria

1. WHEN filtering by compulsory subjects THEN the CSS_Practice_System SHALL display "English Precis and Composition"
2. WHEN filtering by compulsory subjects THEN the CSS_Practice_System SHALL display "General Science and Ability"
3. WHEN filtering by compulsory subjects THEN the CSS_Practice_System SHALL display "Current Affairs"
4. WHEN filtering by compulsory subjects THEN the CSS_Practice_System SHALL display "Pakistan Affairs"
5. WHEN filtering by compulsory subjects THEN the CSS_Practice_System SHALL display "Islamic Studies"

### Requirement 3

**User Story:** As a CSS exam candidate, I want optional subjects to include all non-compulsory subjects, so that I can practice my chosen elective subjects.

#### Acceptance Criteria

1. WHEN filtering by optional subjects THEN the CSS_Practice_System SHALL display all subjects not classified as compulsory
2. WHEN filtering by optional subjects THEN the CSS_Practice_System SHALL exclude "English Precis and Composition" from the display
3. WHEN filtering by optional subjects THEN the CSS_Practice_System SHALL exclude "General Science and Ability" from the display
4. WHEN filtering by optional subjects THEN the CSS_Practice_System SHALL exclude "Current Affairs" from the display
5. WHEN filtering by optional subjects THEN the CSS_Practice_System SHALL exclude "Pakistan Affairs" from the display
6. WHEN filtering by optional subjects THEN the CSS_Practice_System SHALL exclude "Islamic Studies" from the display

### Requirement 4

**User Story:** As a CSS exam candidate, I want the category buttons to provide clear visual feedback, so that I can easily understand which filter is currently active.

#### Acceptance Criteria

1. WHEN no category filter is active THEN the CSS_Practice_System SHALL display both buttons in inactive state
2. WHEN a category button is clicked THEN the CSS_Practice_System SHALL highlight the selected button with distinct styling
3. WHEN a category button is active THEN the CSS_Practice_System SHALL show the button with different background color and text styling
4. WHEN switching between categories THEN the CSS_Practice_System SHALL update button states immediately
5. WHEN a category is active THEN the CSS_Practice_System SHALL display the count of subjects in that category

### Requirement 5

**User Story:** As a CSS exam candidate, I want the filtering to work seamlessly with the existing search functionality, so that I can combine category filtering with text search.

#### Acceptance Criteria

1. WHEN a category filter is active and user searches THEN the CSS_Practice_System SHALL search only within the filtered category
2. WHEN user has searched text and selects a category THEN the CSS_Practice_System SHALL apply both search and category filters
3. WHEN user clears search while category filter is active THEN the CSS_Practice_System SHALL show all subjects in the active category
4. WHEN user clears category filter while search is active THEN the CSS_Practice_System SHALL search across all subjects
5. WHEN both filters are active THEN the CSS_Practice_System SHALL display the combined result count

### Requirement 6

**User Story:** As a CSS exam candidate, I want the subject categorization to persist my selection, so that my preferred view is maintained during my practice session.

#### Acceptance Criteria

1. WHEN a user selects a category filter THEN the CSS_Practice_System SHALL remember the selection during the browser session
2. WHEN a user navigates away and returns to the practice page THEN the CSS_Practice_System SHALL restore the previously selected category
3. WHEN a user refreshes the page THEN the CSS_Practice_System SHALL maintain the active category filter
4. WHEN a user closes and reopens the browser THEN the CSS_Practice_System SHALL reset to show all subjects by default
5. WHEN a user selects a subject from a filtered category THEN the CSS_Practice_System SHALL maintain the category selection when returning from quiz