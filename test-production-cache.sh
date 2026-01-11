#!/bin/bash

echo "🚀 Production Cache Verification"
echo "=================================="
echo ""

# Check if URL provided
if [ -z "$1" ]; then
    echo "Usage: ./test-production-cache.sh <your-domain>"
    echo ""
    echo "Examples:"
    echo "  ./test-production-cache.sh https://imtehan.com"
    echo "  ./test-production-cache.sh http://localhost:3000 (for production build)"
    echo ""
    exit 1
fi

DOMAIN="$1"

echo "Testing domain: $DOMAIN"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

passed=0
failed=0

test_cache() {
    local url="$1"
    local expected="$2"
    local name="$3"

    echo -n "$name: "

    cache_header=$(curl -s -I "$url" 2>/dev/null | grep -i "cache-control" | tr -d '\r')

    if echo "$cache_header" | grep -iq "$expected"; then
        echo -e "${GREEN}✓ PASS${NC}"
        echo "  $cache_header"
        passed=$((passed + 1))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC}"
        if [ -n "$cache_header" ]; then
            echo "  Found: $cache_header"
            echo "  Expected: $expected"
        else
            echo "  No cache-control header found"
        fi
        failed=$((failed + 1))
        return 1
    fi
}

echo "Testing Cache Headers..."
echo "========================"
echo ""

# Test homepage (should have stale-while-revalidate)
test_cache "$DOMAIN/" "stale-while-revalidate" "Homepage"
echo ""

# Test API route (should have max-age)
test_cache "$DOMAIN/api/csrf-token" "max-age=300" "API Route"
echo ""

# Test subject page (should have max-age)
test_cache "$DOMAIN/css/subjects" "max-age" "Subject Page"
echo ""

# Test quiz page (should NOT be cached)
echo -n "Quiz Page (should NOT cache): "
cache_header=$(curl -s -I "$DOMAIN/css/css-practice/quiz?subject=test" 2>/dev/null | grep -i "cache-control" | tr -d '\r')
if echo "$cache_header" | grep -iq "no-cache\|no-store\|private"; then
    echo -e "${GREEN}✓ PASS${NC}"
    echo "  $cache_header"
    passed=$((passed + 1))
else
    echo -e "${RED}✗ FAIL (should not be cached)${NC}"
    echo "  $cache_header"
    failed=$((failed + 1))
fi
echo ""

echo "Testing Security Headers..."
echo "==========================="
echo ""

headers=$(curl -s -I "$DOMAIN/" 2>/dev/null)

check_security_header() {
    local header="$1"
    echo -n "$header: "
    if echo "$headers" | grep -iq "$header"; then
        echo -e "${GREEN}✓ Present${NC}"
        passed=$((passed + 1))
        return 0
    else
        echo -e "${RED}✗ Missing${NC}"
        failed=$((failed + 1))
        return 1
    fi
}

check_security_header "Content-Security-Policy"
check_security_header "Strict-Transport-Security"
check_security_header "X-Frame-Options"
check_security_header "X-Content-Type-Options"

echo ""
echo "=================================="
echo "Results:"
echo -e "${GREEN}Passed: $passed${NC}"
echo -e "${RED}Failed: $failed${NC}"
echo ""

total=$((passed + failed))
if [ $total -gt 0 ]; then
    percentage=$((passed * 100 / total))
    if [ $percentage -eq 100 ]; then
        echo -e "${GREEN}🎉 Perfect! All caching is working correctly.${NC}"
    elif [ $percentage -ge 75 ]; then
        echo -e "${YELLOW}⚠️  Good, but some improvements needed.${NC}"
    else
        echo -e "${RED}❌ Several issues detected.${NC}"
    fi
fi

echo ""
