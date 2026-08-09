#!/usr/bin/env bash
# Sync materialized MCQ banks to Azure (Caddy serves /banks/* from disk).
# Usage: ./scripts/sync-banks-to-azure.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
KEY="${IMTEHAN_SSH_KEY:-$HOME/Downloads/Imtehan_key.pem}"
HOST="${IMTEHAN_SSH_HOST:-azureuser@20.205.110.177}"
SRC="$ROOT/data/banks/"
DEST="$HOST:~/CSS-App/data/banks/"

if [[ ! -d "$SRC/v1" ]]; then
  echo "No banks at $SRC/v1 — run: npm run export:static-banks"
  exit 1
fi
if [[ ! -f "$KEY" ]]; then
  echo "Missing SSH key: $KEY"
  exit 1
fi

ssh -i "$KEY" -o StrictHostKeyChecking=accept-new "$HOST" 'mkdir -p ~/CSS-App/data/banks'
rsync -avz --progress -e "ssh -i $KEY -o StrictHostKeyChecking=accept-new" "$SRC" "$DEST"
echo "Synced. Caddy serves https://imtehan.com/banks/v1/…"
