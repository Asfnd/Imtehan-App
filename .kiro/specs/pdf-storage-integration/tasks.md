# Implementation Plan

- [x] 1. Enhance PDF storage utilities with better path resolution
  - Improve the `getPastPaperUrl` function in `lib/pdf-storage.ts`
  - Add comprehensive path pattern generation
  - Implement fuzzy matching as fallback
  - _Requirements: 3.1, 3.2, 3.4_

- [x] 1.1 Add comprehensive path pattern generation
  - Create function to generate all possible path variations
  - Include kebab-case, underscore, and nested folder patterns
  - Add support for different filename conventions
  - _Requirements: 3.2, 3.4_

- [x] 1.2 Implement enhanced subject name normalization
  - Handle special characters, parentheses, and ampersands
  - Create consistent kebab-case and underscore conversions
  - Add validation for generated paths
  - _Requirements: 3.1, 3.3_

- [x] 1.3 Add fuzzy matching fallback system
  - Implement keyword-based file search when exact paths fail
  - Add file listing and filtering capabilities
  - Create scoring system for best match selection
  - _Requirements: 3.4, 2.1_

- [x] 2. Improve error handling and debugging
  - Enhance error messages with detailed path information
  - Add comprehensive logging for troubleshooting
  - Improve the storage test page functionality
  - _Requirements: 2.1, 2.2, 2.5, 4.1, 4.3, 4.5_

- [x] 2.1 Enhance error reporting
  - Return detailed information about searched paths
  - Include specific error reasons for each failed attempt
  - Add suggestions for file organization
  - _Requirements: 2.1, 2.2_

- [x] 2.2 Improve storage debugging tools
  - Enhance the test storage page with better diagnostics
  - Add real-time path testing functionality
  - Include storage health checks and file listing
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 3. Update PDF viewer component for better error handling
  - Improve error display in the viewer component
  - Add retry mechanisms for failed loads
  - Enhance mobile fallback handling
  - _Requirements: 1.1, 1.2, 2.1, 5.3_

- [x] 3.1 Enhance PDF viewer error states
  - Update error messages to show searched paths
  - Add direct links to storage testing tools
  - Improve retry functionality with better UX
  - _Requirements: 2.1, 2.3_

- [x] 3.2 Improve mobile PDF handling
  - Ensure fallback mechanisms work properly
  - Test native PDF viewer integration
  - Optimize for different mobile browsers
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 4. Test and validate the complete system
  - Test with actual storage files
  - Verify all path patterns work correctly
  - Ensure error handling is comprehensive
  - _Requirements: All_

- [x] 4.1 Test path resolution with real data
  - Test with various subject name formats
  - Verify all generated paths are valid
  - Test fuzzy matching with actual files
  - _Requirements: 3.1, 3.2, 3.4_

- [x] 4.2 Validate error handling scenarios
  - Test behavior when storage is inaccessible
  - Verify error messages are helpful and accurate
  - Test retry mechanisms work properly
  - _Requirements: 2.1, 2.4, 2.5_

- [ ] 5. Checkpoint - Ensure all tests pass and PDFs load correctly
  - Ensure all tests pass, ask the user if questions arise.