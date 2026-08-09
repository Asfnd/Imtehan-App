#!/usr/bin/env bash
# Run Azure deploy from your Mac over SSH.
set -euo pipefail

KEY="${IMTEHAN_AZURE_KEY:-$HOME/Downloads/Imtehan_key.pem}"
HOST="${IMTEHAN_AZURE_HOST:-azureuser@20.205.110.177}"

if [[ ! -f "$KEY" ]]; then
  echo "Missing SSH key: $KEY"
  exit 1
fi

ssh -i "$KEY" -o StrictHostKeyChecking=yes "$HOST" 'bash ~/CSS-App/deploy/oracle/azure-deploy.sh'
