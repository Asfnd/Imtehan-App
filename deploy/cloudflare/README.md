# Imtehan Cloudflare Worker (Azure origin)

Proxies `imtehan.com` HTML/API/SEO → Azure (`20.205.110.177` via `resolveOverride`). Static = CDN → Azure, **no Worker**.

## Long-term (Azure + Free Cloudflare)

- Keep DNS A → Azure IP, SSL **Flexible** (or Origin Cert + **Full strict** when ready).
- Never re-add `imtehan.com/*` Worker catch-all — static must stay off Worker.
- Weekly host cron: search ping + `docker builder prune` (disk).
- IndexNow snapshot volume: `seo_data` on the VM (survives rebuilds).
- Credit ≠ forever: student credits last months; paid always-on is ~VM monthly cost. Traffic scaling is fine with this edge cache split.

## Free-plan reality (100k Worker requests/day)

**Every request that matches a Worker route counts** — including CSS/JS — even on Cache API HIT.

| Mode | Static path | Worker req / pageview (approx) | Headroom |
|------|-------------|-------------------------------|----------|
| **Now** (DNS A → Azure + SSL Flexible) | CDN → Azure, **no Worker** | ~3–8 (HTML/API/RSC only) | Comfortable on Free |
| **Avoid** | Worker catch-all / `_next*` | ~25–40 | Burns Free 100k fast |

### SEO edge behaviour (v23+)

- `www` → apex **301**
- Trailing slash → bare path **301**
- `utm_*` / `fbclid` / `gclid` / `ref` stripped **301** (ranking signal consolidation)
- `Link: rel=canonical` on HTML responses
- Homepage `/?utm=…` must hit Worker (route `imtehan.com/` alone does **not** match query strings — catch-all required until DNS→Azure)

### Unlock Free headroom (Cloudflare Dashboard — one-time)

Wrangler OAuth can deploy Workers but **cannot** edit DNS:

1. **DNS** → `imtehan.com` **A** → `20.205.110.177`, proxy **ON**. Same for `www`.
2. **SSL/TLS** → **Flexible** (origin HTTP :80), or Origin Cert + **Full (strict)**.
3. Confirm badge/CSS: `via: Caddy`, no `x-vercel-*`.
4. Remove `imtehan.com/*` catch-all + `_next*` / brand routes from `wrangler.toml`, redeploy, `verify.sh`.

## Cache tiers (v23+)

| Tier | Paths | Strategy |
|------|--------|----------|
| **ASSET** | `/_next/*`, icons, brand (while routed) | Worker Cache API; hashed files immutable |
| **SEO** | robots/sitemap/manifest | Worker Cache; long TTL; keyed by `CACHE_VER` |
| **HTML HIT/STALE/MISS** | marketing + exam hubs | Worker Cache; fresh **1h**, stale up to **24h** + background refresh. Never CF CDN-by-URL |
| **API-HIT/MISS** | public count/stats APIs | Worker Cache **6h** |
| **BYPASS** | RSC, auth, quiz | `no-store` |
| **REDIRECT** | `www.imtehan.com/*` | **301 →** apex |

### Why HTML cannot use normal CDN cache

Next.js App Router uses the **same URL** for `text/html` and RSC. URL-keyed CDN cache poisons flight responses.

## Deploy

```bash
cd deploy/cloudflare
# or: cp worker.js wrangler.toml /tmp/imtehan-cf-proxy && cd /tmp/imtehan-cf-proxy
npx wrangler@3.114.0 deploy
bash ./verify.sh https://imtehan.com
```

## Verify

`verify.sh` checks www→apex, robots/sitemap, HTML vs RSC, HTML HIT/STALE, CSS/image, `/exams`, public API cache path.
