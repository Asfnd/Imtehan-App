#!/usr/bin/env bash
# Deploy Imtehan to the Azure VM from Asfnd/Imtehan-App (same repo as GitHub).
#
# On the VM:
#   bash ~/CSS-App/deploy/oracle/azure-deploy.sh
#
# From your Mac (needs ~/Downloads/Imtehan_key.pem):
#   bash deploy/oracle/azure-deploy-remote.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

echo "==> Repo: $(git remote get-url origin 2>/dev/null || echo unknown)"
echo "==> Fetch + hard reset to origin/main"
git fetch origin
git checkout main
git reset --hard origin/main

echo "==> Restore Azure Flexible Caddyfile (:80)"
cp -a deploy/oracle/Caddyfile.azure-flexible deploy/oracle/Caddyfile

if [[ ! -f deploy/oracle/.env ]]; then
  echo "ERROR: deploy/oracle/.env missing — copy from backup before building."
  exit 1
fi

echo "==> Docker build + restart"
cd deploy/oracle
sudo docker compose up -d --build --remove-orphans
sudo docker compose ps

echo "==> Smoke"
sleep 5
curl -sS -o /dev/null -w "home %{http_code}\n" --max-time 30 http://127.0.0.1/
curl -sS -o /dev/null -w "assistant %{http_code}\n" --max-time 30 http://127.0.0.1/exams/police-ict-assistant
echo "Done."
