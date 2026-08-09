# Imtehan — Azure VM deployment

Primary production host (Cloudflare → Azure origin).

| Field | Value |
|-------|--------|
| IP | `20.205.110.177` |
| User | `azureuser` |
| SSH key | `~/Downloads/Imtehan_key.pem` |
| App path | `~/CSS-App` |
| Git remote | `https://github.com/Asfnd/Imtehan-App.git` |
| Stack | Docker (`deploy/oracle`) + Caddy `:80` + Next.js |

Cloudflare: DNS A → `20.205.110.177`, SSL **Flexible**. Origin stays HTTP.

## Deploy (from Mac)

```bash
bash deploy/oracle/azure-deploy-remote.sh
```

## Deploy (on the VM)

```bash
bash ~/CSS-App/deploy/oracle/azure-deploy.sh
```

That script: `git fetch` + `reset --hard origin/main`, restores `Caddyfile.azure-flexible`, rebuilds Docker.

## First-time / reconnect git

Already done on the live VM (clone of `Asfnd/Imtehan-App`). Secrets live only in `deploy/oracle/.env` (never commit).

## Smoke

```bash
curl -I http://20.205.110.177/exams/police-ict-assistant
curl -I https://imtehan.com/exams/police-ict-assistant
```
