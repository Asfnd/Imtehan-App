#!/usr/bin/env bash
# Smoke-test Imtehan edge proxy (HTML / RSC / static)
# Until DNS A → Azure: static must show Worker headers (ASSET).
# After DNS cutover + removing `_next*` routes: static must have NO x-imtehan-*.
set -uo pipefail
BASE="${1:-https://imtehan.com}"
OUT="${TMPDIR:-/tmp}/imtehan-verify-$$"
mkdir -p "$OUT"
pass=0
fail=0

ok() { pass=$((pass + 1)); echo "  PASS  $*"; }
bad() { fail=$((fail + 1)); echo "  FAIL  $*"; }

check_hdr() {
  local name="$1" url="$2"
  shift 2
  local hdr="$OUT/$name.hdr" body="$OUT/$name.body"
  curl -sS -D "$hdr" -o "$body" --max-time 30 "$@" "$url" >/dev/null || true
  local code ct cache rsc ver
  code=$(awk 'NR==1{print $2}' "$hdr")
  ct=$(grep -i '^content-type:' "$hdr" | head -1 | tr -d '\r' | awk '{print tolower($0)}')
  cache=$(grep -i '^x-imtehan-cache:' "$hdr" | head -1 | tr -d '\r' | awk '{print $2}')
  rsc=$(grep -i '^x-imtehan-rsc:' "$hdr" | head -1 | tr -d '\r' | awk '{print $2}')
  ver=$(grep -i '^x-imtehan-ver:' "$hdr" | head -1 | tr -d '\r' | awk '{print $2}')
  echo "$code|$ct|$cache|$rsc|$ver|$hdr|$body"
}

echo "== Imtehan edge verify: $BASE =="

# 0) www → apex
www_hdr=$(mktemp)
www_code=$(curl -sS -D "$www_hdr" -o /dev/null --max-time 20 --max-redirs 0 -H 'Accept: text/html' "https://www.imtehan.com/" -w '%{http_code}')
www_loc=$(grep -i '^location:' "$www_hdr" | head -1 | tr -d '\r' | awk '{print $2}')
rm -f "$www_hdr"
if [[ "$www_code" == "301" && "$www_loc" == https://imtehan.com* ]]; then
  ok "www → apex 301 ($www_loc)"
else
  bad "www redirect ($www_code → $www_loc)"
fi

# 0b) Homepage + UTM: Worker 301 strip OR Azure origin 200 (no dead Vercel)
utm_hdr=$(mktemp)
utm_code=$(curl -sS -D "$utm_hdr" -o /dev/null --max-time 20 --max-redirs 0 -H 'Accept: text/html' "https://imtehan.com/?utm_source=verify&fbclid=test" -w '%{http_code}')
utm_loc=$(grep -i '^location:' "$utm_hdr" | head -1 | tr -d '\r' | awk '{print $2}')
utm_ver=$(grep -i '^x-imtehan-ver:' "$utm_hdr" | head -1 | tr -d '\r' | awk '{print $2}')
utm_vercel=$(grep -i '^x-vercel-error:' "$utm_hdr" | head -1 | tr -d '\r' | awk '{print $2}')
rm -f "$utm_hdr"
if [[ "$utm_code" == "301" && "$utm_loc" == "https://imtehan.com/" ]]; then
  ok "UTM/fbclid → clean apex 301 (SEO)"
elif [[ "$utm_code" == "200" && -z "$utm_vercel" ]]; then
  ok "UTM homepage 200 via Azure origin (Worker bypass on query)"
else
  bad "UTM path ($utm_code → $utm_loc ver=$utm_ver vercel=$utm_vercel)"
fi

# trailing slash
ts_code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 --max-redirs 0 -H 'Accept: text/html' "https://imtehan.com/faq/")
ts_loc=$(curl -sSI --max-time 20 --max-redirs 0 -H 'Accept: text/html' "https://imtehan.com/faq/" | tr -d '\r' | grep -i '^location:' | awk '{print $2}')
if [[ "$ts_code" == "301" && ( "$ts_loc" == "https://imtehan.com/faq" || "$ts_loc" == "/faq" ) ]]; then
  ok "trailing slash → bare path ($ts_loc)"
else
  bad "trailing slash ($ts_code → $ts_loc)"
fi

r_code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 25 "$BASE/robots.txt")
s_code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 40 "$BASE/sitemap.xml")
[[ "$r_code" == "200" && "$s_code" == "200" ]] && ok "robots.txt + sitemap.xml 200" || bad "robots/sitemap ($r_code/$s_code)"

# 1) HTML (Worker)
r=$(check_hdr html "$BASE/" -H 'Accept: text/html')
code=${r%%|*}; rest=${r#*|}; ct=${rest%%|*}; rest=${rest#*|}; cache=${rest%%|*}; rest=${rest#*|}; rsc=${rest%%|*}; rest=${rest#*|}; ver=${rest%%|*}
[[ "$code" == "200" && "$ct" == *text/html* && "$rsc" == "0" && -n "$ver" ]] && ok "HTML 200 text/html (Worker $ver)" || bad "HTML ($code $ct rsc=$rsc ver=$ver)"

# 2) RSC
r=$(check_hdr rsc "$BASE/" -H 'RSC: 1' -H 'Accept: text/x-component' -H 'Next-Router-State-Tree: %5B%22%22%5D')
code=${r%%|*}; rest=${r#*|}; ct=${rest%%|*}; rest=${rest#*|}; cache=${rest%%|*}; rest=${rest#*|}; rsc=${rest%%|*}
body="$OUT/rsc.body"
start=$(head -c 20 "$body")
if [[ "$code" == "200" && "$ct" == *text/x-component* && "$rsc" == "1" && "$start" != "<!DOCTYPE"* && "$start" != "<html"* ]]; then
  ok "RSC 200 text/x-component (not HTML)"
else
  bad "RSC poisoned or wrong ($code $ct rsc=$rsc start=$start)"
fi

# 3) HTML Worker cache HIT/STALE (retry once — multi-edge cold)
check_hdr html_a "$BASE/faq" -H 'Accept: text/html' >/dev/null
sleep 1
r=$(check_hdr html_b "$BASE/faq" -H 'Accept: text/html')
code=${r%%|*}; rest=${r#*|}; ct=${rest%%|*}; rest=${rest#*|}; cache=${rest%%|*}
put=$(grep -i '^x-imtehan-put:' "$OUT/html_a.hdr" 2>/dev/null | tr -d '\r' | awk '{print $2}')
if [[ "$cache" == "MISS" ]]; then
  sleep 1
  r=$(check_hdr html_c "$BASE/faq" -H 'Accept: text/html')
  rest=${r#*|}; rest=${rest#*|}; cache=${rest%%|*}
fi
if [[ "$cache" == "HIT" || "$cache" == "STALE" ]]; then
  ok "HTML Worker cache $cache on /faq"
elif [[ "$cache" == "MISS" ]]; then
  bad "HTML Worker cache still MISS on /faq (put=${put:-unknown})"
else
  bad "HTML Worker cache unexpected: $cache"
fi

# 4) Static CSS — Worker ASSET until DNS→Azure; then expect no x-imtehan-*
HTML=$(curl -sS --max-time 25 -H 'Accept: text/html' "$BASE/")
CSS=$(printf '%s' "$HTML" | tr '"' '\n' | grep '_next/static/css/' | head -1)
if [[ -n "$CSS" ]]; then
  r=$(check_hdr css "$BASE$CSS")
  code=${r%%|*}; rest=${r#*|}; ct=${rest%%|*}; rest=${rest#*|}; cache=${rest%%|*}; rest=${rest#*|}; rsc=${rest%%|*}; rest=${rest#*|}; ver=${rest%%|*}
  if [[ "$code" == "200" && "$ct" == *text/css* && -z "$ver" ]]; then
    ok "CSS Worker-bypass (Free-tier) $CSS"
  elif [[ "$code" == "200" && "$ct" == *text/css* && "$cache" == "ASSET" ]]; then
    bad "CSS still via Worker ($CSS) — delete leftover _next* / catch-all routes"
  else
    bad "CSS ($code $ct cache=$cache ver=$ver) href=$CSS"
  fi
  t1=$(curl -sS -o /dev/null -w '%{time_total}' --max-time 25 "$BASE$CSS")
  t2=$(curl -sS -o /dev/null -w '%{time_total}' --max-time 25 "$BASE$CSS")
  echo "  INFO  CSS timings: ${t1}s → ${t2}s"
else
  bad "Could not discover CSS from homepage"
fi

# 5) Image optimizer or badge
r=$(check_hdr img "$BASE/_next/image?url=%2Fgoogle-play-badge.png&w=640&q=75")
code=${r%%|*}; rest=${r#*|}; ct=${rest%%|*}; rest=${rest#*|}; cache=${rest%%|*}; rest=${rest#*|}; rsc=${rest%%|*}; rest=${rest#*|}; ver=${rest%%|*}
if [[ "$code" == "200" && "$ct" == *image/* && ("$cache" == "ASSET" || -z "$ver") ]]; then
  ok "Image OK (cache=${cache:-cdn})"
else
  bad "Image ($code $ct cache=$cache ver=$ver)"
fi

# 6) exams HTML vs RSC
r=$(check_hdr exams "$BASE/exams" -H 'Accept: text/html')
code=${r%%|*}; rest=${r#*|}; ct=${rest%%|*}
[[ "$code" == "200" && "$ct" == *text/html* ]] && ok "/exams HTML" || bad "/exams HTML ($code)"
r=$(check_hdr exams_rsc "$BASE/exams" -H 'RSC: 1' -H 'Accept: text/x-component')
code=${r%%|*}; rest=${r#*|}; ct=${rest%%|*}
[[ "$code" == "200" && "$ct" == *text/x-component* ]] && ok "/exams RSC" || bad "/exams RSC ($code $ct)"

# 7) Public count API
check_hdr api_a "$BASE/api/practice/exam-hub-counts?examSlug=css-mpt" -H 'Accept: application/json' >/dev/null
sleep 1
r=$(check_hdr api_b "$BASE/api/practice/exam-hub-counts?examSlug=css-mpt" -H 'Accept: application/json')
code=${r%%|*}; rest=${r#*|}; ct=${rest%%|*}; rest=${rest#*|}; cache=${rest%%|*}
if [[ "$code" == "200" && "$cache" == "API-HIT" ]]; then
  ok "API Worker cache HIT"
elif [[ "$code" == "200" && "$cache" == "API-MISS" ]]; then
  ok "API Worker path OK (MISS on this edge)"
else
  bad "API cache path ($code cache=$cache)"
fi

# 8) Notes SEO surfaces
n_code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 25 -H 'Accept: text/html' "$BASE/notes")
ns_code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 40 "$BASE/sitemap/notes.xml")
[[ "$n_code" == "200" && "$ns_code" == "200" ]] && ok "/notes + sitemap/notes.xml 200" || bad "notes ($n_code / sitemap $ns_code)"
if curl -sS --max-time 40 "$BASE/sitemap/notes.xml" | grep -q 'notes/css-written'; then
  ok "notes sitemap lists CSS Written"
else
  bad "notes sitemap missing css-written"
fi

echo
echo "Result: $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]
