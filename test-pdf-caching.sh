#!/bin/bash

echo "═══════════════════════════════════════════════════════════"
echo "🔍 PDF CACHING TEST - Supabase Storage"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📋 INSTRUCTIONS:"
echo "1. Open: https://imtehan.com/css/past-papers/view?subject=agriculture-forestry&year=2023"
echo "2. Wait for PDF to load"
echo "3. Right-click on PDF → Inspect Element"
echo "4. Find the <iframe src=\"...\"> tag"
echo "5. Copy the PDF URL (starts with https://)"
echo "6. Paste it below when prompted"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""

# Get PDF URL from user
read -p "📎 Paste the PDF URL here: " PDF_URL

echo ""
echo "Testing PDF caching..."
echo "═══════════════════════════════════════════════════════════"
echo ""

# First request
echo "📥 Request 1 (should be MISS - warming cache):"
curl -s -I "$PDF_URL" | grep -E "HTTP|cf-cache-status|cache-control|content-type|content-length"
echo ""

# Wait 2 seconds
echo "⏳ Waiting 2 seconds..."
sleep 2
echo ""

# Second request
echo "📥 Request 2 (should be HIT - cached!):"
curl -s -I "$PDF_URL" | grep -E "HTTP|cf-cache-status|cache-control|content-type|content-length"
echo ""

# Third request to confirm
echo "⏳ Waiting 1 second..."
sleep 1
echo ""

echo "📥 Request 3 (confirm HIT):"
curl -s -I "$PDF_URL" | grep -E "HTTP|cf-cache-status"
echo ""

echo "═══════════════════════════════════════════════════════════"
echo "📊 RESULTS ANALYSIS"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "✅ GOOD RESULTS:"
echo "   - Request 1: cf-cache-status: MISS or EXPIRED (normal)"
echo "   - Request 2: cf-cache-status: HIT (cached!)"
echo "   - Request 3: cf-cache-status: HIT (stable cache)"
echo ""
echo "❌ BAD RESULTS:"
echo "   - All requests: BYPASS or DYNAMIC → Missing cache rule!"
echo "   - All requests: MISS → Cache not working"
echo ""
echo "💡 If you see BYPASS/DYNAMIC, add this Cloudflare cache rule:"
echo ""
echo "   Hostname: qsrkkvrrxorbgvbgekew.supabase.co"
echo "   URI Path contains: /storage/v1/object/public/"
echo "   Cache: 30 days (2592000 seconds)"
echo ""
echo "═══════════════════════════════════════════════════════════"
