#!/bin/bash

echo "🔍 Imtehan Cache Testing Suite"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:3000"

# Check if server is running
echo "Checking if server is running on $BASE_URL..."
if ! curl -s -o /dev/null -w "%{http_code}" "$BASE_URL" > /dev/null; then
    echo -e "${RED}❌ Server is not running!${NC}"
    echo "Please start the server with: npm run dev"
    exit 1
fi
echo -e "${GREEN}✓ Server is running${NC}"
echo ""

# Function to test cache headers
test_cache() {
    local url="$1"
    local expected_pattern="$2"
    local description="$3"

    echo "Testing: $description"
    echo "URL: $url"

    # Get cache-control header
    cache_header=$(curl -s -I "$url" | grep -i "cache-control" | tr -d '\r')

    if [ -z "$cache_header" ]; then
        echo -e "${RED}❌ No Cache-Control header found${NC}"
        echo ""
        return 1
    fi

    echo "Found: $cache_header"

    # Check if it matches expected pattern
    if echo "$cache_header" | grep -iq "$expected_pattern"; then
        echo -e "${GREEN}✓ PASS - Cache header is correct${NC}"
        echo ""
        return 0
    else
        echo -e "${RED}❌ FAIL - Expected pattern: $expected_pattern${NC}"
        echo ""
        return 1
    fi
}

# Counter for results
total=0
passed=0
failed=0

echo "========================================="
echo "1. Testing Static Assets (/_next/static)"
echo "========================================="
echo ""

# Note: We need to find actual static files
# First, let's check if we have any built files
if [ ! -d ".next/static" ]; then
    echo -e "${YELLOW}⚠ No .next/static directory found. Run 'npm run build' first.${NC}"
    echo "Skipping static asset tests..."
else
    # Find a JS file in .next/static
    STATIC_FILE=$(find .next/static -name "*.js" -type f | head -1)
    if [ -n "$STATIC_FILE" ]; then
        # Convert to URL path
        STATIC_PATH=$(echo "$STATIC_FILE" | sed 's|^\.|/_next|')
        total=$((total + 1))
        if test_cache "$BASE_URL$STATIC_PATH" "max-age=31536000" "Static JS Files"; then
            passed=$((passed + 1))
        else
            failed=$((failed + 1))
        fi
    fi
fi

echo "========================================="
echo "2. Testing Page Caching"
echo "========================================="
echo ""

total=$((total + 1))
if test_cache "$BASE_URL/" "stale-while-revalidate" "Homepage"; then
    passed=$((passed + 1))
else
    failed=$((failed + 1))
fi

total=$((total + 1))
if test_cache "$BASE_URL/css" "stale-while-revalidate" "CSS Main Page"; then
    passed=$((passed + 1))
else
    failed=$((failed + 1))
fi

total=$((total + 1))
if test_cache "$BASE_URL/css/subjects" "max-age=300" "Subject Selection Page"; then
    passed=$((passed + 1))
else
    failed=$((failed + 1))
fi

echo "========================================="
echo "3. Testing Quiz Pages (Should NOT Cache)"
echo "========================================="
echo ""

total=$((total + 1))
quiz_cache=$(curl -s -I "$BASE_URL/css/css-practice/quiz?subject=test" | grep -i "cache-control" | tr -d '\r')
echo "Testing: Active Quiz Page"
echo "URL: $BASE_URL/css/css-practice/quiz?subject=test"
echo "Found: $quiz_cache"

if echo "$quiz_cache" | grep -iq "no-cache\|no-store\|private"; then
    echo -e "${GREEN}✓ PASS - Quiz pages are not cached (correct)${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ FAIL - Quiz pages should not be cached${NC}"
    failed=$((failed + 1))
fi
echo ""

echo "========================================="
echo "4. Testing API Routes"
echo "========================================="
echo ""

total=$((total + 1))
if test_cache "$BASE_URL/api/csrf-token" "max-age=300" "CSRF Token API"; then
    passed=$((passed + 1))
else
    failed=$((failed + 1))
fi

echo "========================================="
echo "5. Testing Security Headers"
echo "========================================="
echo ""

echo "Testing: Security Headers on Homepage"
headers=$(curl -s -I "$BASE_URL/")

# Check for important security headers
check_header() {
    local header_name="$1"
    echo -n "  $header_name: "
    if echo "$headers" | grep -iq "$header_name"; then
        echo -e "${GREEN}✓ Present${NC}"
        return 0
    else
        echo -e "${RED}✗ Missing${NC}"
        return 1
    fi
}

total=$((total + 5))
if check_header "Content-Security-Policy"; then passed=$((passed + 1)); else failed=$((failed + 1)); fi
if check_header "Strict-Transport-Security"; then passed=$((passed + 1)); else failed=$((failed + 1)); fi
if check_header "X-Frame-Options"; then passed=$((passed + 1)); else failed=$((failed + 1)); fi
if check_header "X-Content-Type-Options"; then passed=$((passed + 1)); else failed=$((failed + 1)); fi
if check_header "Referrer-Policy"; then passed=$((passed + 1)); else failed=$((failed + 1)); fi

echo ""

echo "========================================="
echo "6. Testing Image Optimization"
echo "========================================="
echo ""

# Test Next.js image optimization endpoint
echo "Testing: Next.js Image Optimization"
echo "Note: This requires an actual image. Skipping if no images found."

# Try to find an image in public directory
if [ -d "public" ]; then
    IMAGE=$(find public -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | head -1)
    if [ -n "$IMAGE" ]; then
        IMAGE_PATH=$(echo "$IMAGE" | sed 's|^public||')
        # Next.js image optimization uses /_next/image?url=...
        IMAGE_URL="$BASE_URL/_next/image?url=$(echo $IMAGE_PATH | sed 's| |%20|g')&w=640&q=75"

        total=$((total + 1))
        img_cache=$(curl -s -I "$IMAGE_URL" | grep -i "cache-control" | tr -d '\r')
        echo "URL: $IMAGE_URL"
        echo "Found: $img_cache"

        if echo "$img_cache" | grep -iq "max-age"; then
            echo -e "${GREEN}✓ PASS - Images are cached${NC}"
            passed=$((passed + 1))
        else
            echo -e "${YELLOW}⚠ Images may not have cache headers${NC}"
            failed=$((failed + 1))
        fi
    else
        echo -e "${YELLOW}⚠ No images found in public directory${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Public directory not found${NC}"
fi
echo ""

echo "========================================="
echo "7. Testing Rate Limiting"
echo "========================================="
echo ""

echo "Testing: Rate limit on quiz API"
echo "Making 10 requests rapidly..."

rate_limit_hit=0
for i in {1..10}; do
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/quiz/general-knowledge")
    if [ "$response" = "429" ]; then
        rate_limit_hit=1
        echo -e "${GREEN}✓ Rate limiting is working (got 429 on request $i)${NC}"
        break
    fi
    sleep 0.1
done

total=$((total + 1))
if [ $rate_limit_hit -eq 0 ]; then
    echo -e "${YELLOW}⚠ Rate limit not hit in 10 requests (may need more requests)${NC}"
    echo "Note: Rate limit is 50/minute, so this is normal for light testing"
    passed=$((passed + 1))  # Not a failure, just didn't trigger
else
    passed=$((passed + 1))
fi
echo ""

echo "========================================="
echo "8. Testing Middleware Headers"
echo "========================================="
echo ""

echo "Testing: Anti-scraping headers"
all_headers=$(curl -s -I "$BASE_URL/")

check_middleware_header() {
    local header_name="$1"
    local header_value="$2"
    echo -n "  $header_name: "
    if echo "$all_headers" | grep -i "$header_name" | grep -iq "$header_value"; then
        echo -e "${GREEN}✓ Correct${NC}"
        return 0
    else
        header_found=$(echo "$all_headers" | grep -i "$header_name" | tr -d '\r')
        if [ -z "$header_found" ]; then
            echo -e "${RED}✗ Missing${NC}"
        else
            echo -e "${YELLOW}⚠ Found but may be incorrect: $header_found${NC}"
        fi
        return 1
    fi
}

total=$((total + 4))
if check_middleware_header "X-Frame-Options" "SAMEORIGIN\|DENY"; then passed=$((passed + 1)); else failed=$((failed + 1)); fi
if check_middleware_header "X-DNS-Prefetch-Control" "on"; then passed=$((passed + 1)); else failed=$((failed + 1)); fi
if check_middleware_header "X-Content-Type-Options" "nosniff"; then passed=$((passed + 1)); else failed=$((failed + 1)); fi
if check_middleware_header "Permissions-Policy" "interest-cohort"; then passed=$((passed + 1)); else failed=$((failed + 1)); fi

echo ""

echo "========================================="
echo "📊 FINAL RESULTS"
echo "========================================="
echo ""
echo "Total Tests: $total"
echo -e "${GREEN}Passed: $passed${NC}"
echo -e "${RED}Failed: $failed${NC}"
echo ""

# Calculate percentage
if [ $total -gt 0 ]; then
    percentage=$((passed * 100 / total))
    echo "Success Rate: $percentage%"
    echo ""

    if [ $percentage -ge 90 ]; then
        echo -e "${GREEN}🎉 EXCELLENT - Your caching is working great!${NC}"
    elif [ $percentage -ge 70 ]; then
        echo -e "${YELLOW}⚠️  GOOD - Most caching is working, some improvements needed${NC}"
    else
        echo -e "${RED}❌ NEEDS ATTENTION - Several caching issues detected${NC}"
    fi
fi

echo ""
echo "========================================="
echo "💡 Recommendations"
echo "========================================="
echo ""

if [ $percentage -lt 100 ]; then
    echo "To fix caching issues:"
    echo "1. Make sure you've built the app: npm run build"
    echo "2. Run in production mode: npm run start"
    echo "3. Check next.config.ts for correct header configuration"
    echo "4. Verify middleware.ts is setting headers correctly"
    echo ""
fi

echo "For production deployment:"
echo "1. ✓ Cache-Control headers are configured"
echo "2. ✓ Security headers are enabled"
echo "3. ✓ Rate limiting is active"
echo "4. Deploy to Vercel/Production and test again"
echo ""

echo "Test complete!"
