#!/bin/bash

echo "🧹 Starting Imtehan Cleanup..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must run from project root directory"
    exit 1
fi

echo "📁 Creating organizational folders..."
mkdir -p docs/reports
mkdir -p scripts/archive
mkdir -p supabase/archive

echo "🗑️  Deleting empty directories..."
rm -rf components/debug 2>/dev/null && echo "  ✓ Removed components/debug" || echo "  ⊘ components/debug not found"
rm -rf dashboard-samples 2>/dev/null && echo "  ✓ Removed dashboard-samples" || echo "  ⊘ dashboard-samples not found"

echo ""
echo "🗑️  Deleting temporary files..."
rm -f .vercel-trigger && echo "  ✓ Removed .vercel-trigger" || echo "  ⊘ .vercel-trigger not found"
rm -f .webhook-test && echo "  ✓ Removed .webhook-test" || echo "  ⊘ .webhook-test not found"

echo ""
echo "🗑️  Deleting old webpack cache files..."
rm -f .next/cache/webpack/client-production/index.pack.old && echo "  ✓ Removed client cache" || echo "  ⊘ Client cache not found"
rm -f .next/cache/webpack/edge-server-production/index.pack.old && echo "  ✓ Removed edge cache" || echo "  ⊘ Edge cache not found"
rm -f .next/cache/webpack/server-production/index.pack.old && echo "  ✓ Removed server cache" || echo "  ⊘ Server cache not found"

echo ""
echo "🗑️  Deleting unused code..."
rm -f lib/pdf-storage.ts && echo "  ✓ Removed lib/pdf-storage.ts (25KB)" || echo "  ⊘ pdf-storage.ts not found"
rm -f lib/pdf-path-cache.ts && echo "  ✓ Removed lib/pdf-path-cache.ts (3.5KB)" || echo "  ⊘ pdf-path-cache.ts not found"
rm -f types/jest-dom.d.ts && echo "  ✓ Removed types/jest-dom.d.ts" || echo "  ⊘ jest-dom.d.ts not found"

echo ""
echo "🗑️  Deleting duplicate JavaScript files..."
rm -f scripts/upload-files-only.js && echo "  ✓ Removed upload-files-only.js" || echo "  ⊘ upload-files-only.js not found"
rm -f scripts/create-guess-papers-table.js && echo "  ✓ Removed create-guess-papers-table.js" || echo "  ⊘ create-guess-papers-table.js not found"
rm -f scripts/upload-guess-papers.js && echo "  ✓ Removed upload-guess-papers.js" || echo "  ⊘ upload-guess-papers.js not found"

echo ""
echo "📦 Organizing documentation files..."
mv BLOG_ENHANCEMENT_SUMMARY.md docs/reports/ 2>/dev/null && echo "  ✓ Moved BLOG_ENHANCEMENT_SUMMARY.md" || true
mv CLOUDFLARE_GUESS_PAPERS_CACHE.md docs/reports/ 2>/dev/null && echo "  ✓ Moved CLOUDFLARE_GUESS_PAPERS_CACHE.md" || true
mv DATABASE_INVESTIGATION_REPORT.md docs/reports/ 2>/dev/null && echo "  ✓ Moved DATABASE_INVESTIGATION_REPORT.md" || true
mv GUESS_PAPERS_SETUP.md docs/reports/ 2>/dev/null && echo "  ✓ Moved GUESS_PAPERS_SETUP.md" || true
mv PAPER_TYPE_FIX_SUMMARY.md docs/reports/ 2>/dev/null && echo "  ✓ Moved PAPER_TYPE_FIX_SUMMARY.md" || true
mv SEO_OPTIMIZATION_GUIDE.md docs/reports/ 2>/dev/null && echo "  ✓ Moved SEO_OPTIMIZATION_GUIDE.md" || true
mv SEO_QUICK_IMPLEMENTATION.md docs/reports/ 2>/dev/null && echo "  ✓ Moved SEO_QUICK_IMPLEMENTATION.md" || true
mv SEO_SUMMARY.md docs/reports/ 2>/dev/null && echo "  ✓ Moved SEO_SUMMARY.md" || true
mv SEO_TECHNICAL_IMPROVEMENTS.md docs/reports/ 2>/dev/null && echo "  ✓ Moved SEO_TECHNICAL_IMPROVEMENTS.md" || true
mv SUBJECT_VERIFICATION_REPORT.md docs/reports/ 2>/dev/null && echo "  ✓ Moved SUBJECT_VERIFICATION_REPORT.md" || true

echo ""
echo "📦 Organizing diagnostic scripts..."
mv scripts/check-subjects.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived check-subjects.ts" || true
mv scripts/check-for-duplicates.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived check-for-duplicates.ts" || true
mv scripts/check-lowercase-subjects.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived check-lowercase-subjects.ts" || true
mv scripts/list-all-subjects.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived list-all-subjects.ts" || true
mv scripts/find-new-subjects.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived find-new-subjects.ts" || true
mv scripts/get-all-subjects-full.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived get-all-subjects-full.ts" || true
mv scripts/get-all-subjects-paginated.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived get-all-subjects-paginated.ts" || true
mv scripts/test-subject-queries.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived test-subject-queries.ts" || true
mv scripts/test-rpc-function.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived test-rpc-function.ts" || true
mv scripts/test-paper-type-filtering.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived test-paper-type-filtering.ts" || true
mv scripts/show-new-subjects-detail.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived show-new-subjects-detail.ts" || true

echo ""
echo "📦 Organizing migration scripts..."
mv scripts/run-migration-paper-type.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived run-migration-paper-type.ts" || true
mv scripts/apply-newsletter-migration.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived apply-newsletter-migration.ts" || true
mv scripts/rename-subjects-to-title-case.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived rename-subjects-to-title-case.ts" || true
mv scripts/delete-old-duplicates.ts scripts/archive/ 2>/dev/null && echo "  ✓ Archived delete-old-duplicates.ts" || true

echo ""
echo "📦 Organizing Supabase files..."
mv supabase/MINIMAL_RLS.sql supabase/archive/ 2>/dev/null && echo "  ✓ Archived MINIMAL_RLS.sql" || true
mv supabase/RLS_POLICIES.sql supabase/archive/ 2>/dev/null && echo "  ✓ Archived RLS_POLICIES.sql" || true
mv supabase/fix-auth.sql supabase/archive/ 2>/dev/null && echo "  ✓ Archived fix-auth.sql" || true

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Summary:"
echo "  - Empty directories removed"
echo "  - Temporary files deleted"
echo "  - Unused code removed (~30KB)"
echo "  - Old cache files deleted (~20MB)"
echo "  - Documentation organized to docs/reports/"
echo "  - Scripts archived to scripts/archive/"
echo "  - SQL files archived to supabase/archive/"
echo ""
echo "📈 Space saved:"
if [ -d "docs/reports" ]; then
    DOC_SIZE=$(du -sh docs/reports/ 2>/dev/null | cut -f1)
    echo "  - Documentation: $DOC_SIZE"
fi
if [ -d "scripts/archive" ]; then
    SCRIPT_SIZE=$(du -sh scripts/archive/ 2>/dev/null | cut -f1)
    echo "  - Archived scripts: $SCRIPT_SIZE"
fi
if [ -d "supabase/archive" ]; then
    SQL_SIZE=$(du -sh supabase/archive/ 2>/dev/null | cut -f1)
    echo "  - Archived SQL: $SQL_SIZE"
fi
echo ""
echo "⚠️  Important Next Steps:"
echo "  1. Verify .env files are not in git: git ls-files | grep .env"
echo "  2. Add rate limiting to API routes (see CLEANUP_AND_SECURITY_AUDIT.md)"
echo "  3. Implement CSRF protection"
echo "  4. Add CAPTCHA to contact form"
echo ""
echo "📖 Read CLEANUP_AND_SECURITY_AUDIT.md for detailed security fixes"
