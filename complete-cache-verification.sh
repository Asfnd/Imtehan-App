#!/bin/bash

echo "═══════════════════════════════════════════════════════════"
echo "🔍 COMPLETE CACHE VERIFICATION - imtehan.com"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counter
PASS=0
FAIL=0

# Function to test cache
test_cache() {
    local name="$1"
    local url="$2"
    local expected="$3"

    echo -e "${BLUE}Testing: $name${NC}"
    echo "URL: $url"

    # First request
    echo -n "  Request 1: "
    RESULT1=$(curl -s -I "$url" 2>/dev/null | grep -i "cf-cache-status" | awk '{print $2}' | tr -d '\r')
    echo "$RESULT1"

    # Wait a bit
    sleep 2

    # Second request
    echo -n "  Request 2: "
    RESULT2=$(curl -s -I "$url" 2>/dev/null | grep -i "cf-cache-status" | awk '{print $2}' | tr -d '\r')
    echo "$RESULT2"

    # Check if second request is HIT (or expected status)
    if [[ "$RESULT2" == "$expected" ]]; then
        echo -e "  ${GREEN}✅ PASS${NC} - Cache working as expected"
        ((PASS++))
    else
        echo -e "  ${RED}❌ FAIL${NC} - Expected: $expected, Got: $RESULT2"
        ((FAIL++))
    fi
    echo ""
}

# Test counter
echo "═══════════════════════════════════════════════════════════"
echo "📊 RUNNING TESTS"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Test 1: SVG Files
test_cache "SVG Icon (favicon.svg)" "https://imtehan.com/favicon.svg" "HIT"

# Test 2: Audio Files
test_cache "Audio File (correct.mp3)" "https://imtehan.com/sounds/correct.mp3" "HIT"

# Test 3: More Audio
test_cache "Audio File (quiz-complete.mp3)" "https://imtehan.com/sounds/quiz-complete.mp3" "HIT"

# Test 4: API Past Papers
test_cache "API Past Papers" "https://imtehan.com/api/past-papers" "HIT"

# Test 5: Dynamic API (should bypass)
test_cache "Dynamic API (usage)" "https://imtehan.com/api/usage" "DYNAMIC"

# Test 6: robots.txt
test_cache "Robots.txt" "https://imtehan.com/robots.txt" "HIT"

# Test 7: Sitemap
test_cache "Sitemap.xml" "https://imtehan.com/sitemap.xml" "HIT"

# Test 8: OG Image
test_cache "OG Image SVG" "https://imtehan.com/og-image.svg" "HIT"

# Test 9: Supabase PDF (if you have a public one)
echo -e "${YELLOW}⚠️  Supabase PDF Test - Manual Check Required${NC}"
echo "Test a public PDF URL from your Supabase storage:"
echo "curl -I https://qsrkkvrrxorbgvbgekew.supabase.co/storage/v1/object/public/css-past-papers/[filename].pdf | grep cf-cache-status"
echo ""

# Summary
echo "═══════════════════════════════════════════════════════════"
echo "📈 TEST SUMMARY"
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED! Your caching is working perfectly!${NC}"
else
    echo -e "${YELLOW}⚠️  Some tests failed. Check Cloudflare cache rules.${NC}"
fi

echo "═══════════════════════════════════════════════════════════"
