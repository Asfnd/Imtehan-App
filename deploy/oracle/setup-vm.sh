#!/usr/bin/env bash
# One-time Oracle VM bootstrap (Ubuntu 22.04 aarch64). Run as ubuntu with sudo.
set -euo pipefail

echo "==> Installing Docker..."
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"

echo "==> Base packages..."
sudo apt-get update -qq
sudo apt-get install -y -qq git ufw curl

echo "==> Firewall (SSH + HTTP + HTTPS)..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo ""
echo "Done. Log out and SSH back in so docker group applies, then:"
echo "  cd ~/CSS-App/deploy/oracle"
echo "  bash harden-vm.sh"
echo "  cp .env.example .env && nano .env"
echo "  docker compose up -d --build"
