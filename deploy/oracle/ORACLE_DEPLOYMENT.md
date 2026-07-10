# Imtehan — Oracle Cloud deployment

Second VM (`imtehan-web`), separate from Vita. Stack: **Docker + Caddy + Next.js standalone**. Supabase stays cloud.

## VM spec (this instance)

| Field | Value |
|-------|--------|
| Name | imtehan |
| IP | `140.238.254.59` |
| Shape | A1.Flex 2 OCPU / 12 GB |
| OS | Ubuntu 22.04 Minimal aarch64 |
| SSH | `ssh ubuntu@140.238.254.59` |

## Backup status (Vercel still primary)

Oracle VM is a **hot backup** until DNS cutover:

| Field | Value |
|-------|--------|
| IP | `140.238.254.59` |
| Shape | A1.Flex **1 OCPU / 6 GB** |
| Stack | Docker web + Caddy (running) |

Keep Vercel live; sync code with `rsync` / `git pull` on the VM when you want the backup current. Cut over Cloudflare A → this IP only if Vercel pauses or you decide to shift.

---

## Quick deploy (on VM)

```bash
cd ~/CSS-App/deploy/oracle
cp .env.example .env   # fill from Vercel env vars
bash setup-vm.sh       # once: Docker + ufw
# log out/in after setup-vm
bash harden-vm.sh      # once: SSH + fail2ban
docker compose up -d --build
bash install-cron.sh   # after site is live
```

## Environment (`.env`)

Copy all production values from **Vercel → Settings → Environment Variables** into `deploy/oracle/.env`.

Required at minimum:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL=https://imtehan.com`
- `JWT_SECRET`, `CSRF_SECRET`, `CRON_SECRET`
- `RESEND_API_KEY`, `OPENROUTER_API_KEY` (if using those features)

`NEXT_PUBLIC_*` are also passed as **Docker build args** — rebuild after changing them.

## HTTPS / Cloudflare

**Option A — Grey cloud (easiest):** Cloudflare DNS → `imtehan.com` A record → `140.238.254.59`, **proxy OFF**. Caddy gets Let's Encrypt automatically (`Caddyfile`).

**Option B — Orange cloud:** Create **Cloudflare Origin Certificate**, save as `certs/origin.crt` + `certs/origin.key`, use `Caddyfile.cloudflare-origin`, mount certs in `docker-compose.yml`:

```yaml
volumes:
  - ./Caddyfile.cloudflare-origin:/etc/caddy/Caddyfile:ro
  - ./certs:/etc/caddy/certs:ro
```

Cloudflare SSL mode: **Full (strict)**.

## DNS cutover

1. Deploy and test on IP: `curl -I http://140.238.254.59` (before DNS) or use `/etc/hosts` locally.
2. Point `imtehan.com` A → `140.238.254.59`.
3. Verify home, sign-in, `/sitemap.xml`, quiz flow.
4. `bash install-cron.sh` on VM.
5. Pause Vercel project.

## Updates

```bash
cd ~/CSS-App && git pull   # or rsync from laptop
cd deploy/oracle && docker compose up -d --build
```

## Crons (replaces vercel.json)

| Job | Schedule | Command |
|-----|----------|---------|
| Deactivate expired premium | Daily 02:00 UTC | `run-cron.sh deactivate` |
| Ping search engines | Sun 06:00 UTC | `run-cron.sh ping` |

## Mobile app

No change — still uses `https://imtehan.com` + Supabase.

## Resize shape

Stop instance → Actions → Edit shape → change OCPU/RAM → Start. Free pool: 4 OCPU / 24 GB total across all A1 VMs (Vita + imtehan).
