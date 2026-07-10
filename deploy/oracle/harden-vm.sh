#!/usr/bin/env bash
# Post-bootstrap hardening for imtehan-web (Ubuntu 22.04, aarch64).
set -euo pipefail

echo "==> SSH hardening..."
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^#\?PubkeyAuthentication.*/PubkeyAuthentication yes/' /etc/ssh/sshd_config
sudo sed -i 's/^#\?X11Forwarding.*/X11Forwarding no/' /etc/ssh/sshd_config
sudo sed -i 's/^#\?MaxAuthTries.*/MaxAuthTries 3/' /etc/ssh/sshd_config
if ! grep -q '^AllowUsers ubuntu' /etc/ssh/sshd_config; then
  echo 'AllowUsers ubuntu' | sudo tee -a /etc/ssh/sshd_config >/dev/null
fi
sudo systemctl reload sshd

echo "==> fail2ban..."
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq fail2ban
sudo tee /etc/fail2ban/jail.d/sshd.local >/dev/null <<'EOF'
[sshd]
enabled = true
backend = systemd
port = ssh
filter = sshd
maxretry = 5
bantime = 1h
findtime = 10m
EOF
sudo systemctl enable --now fail2ban

echo "==> Unattended security updates..."
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq unattended-upgrades apt-listchanges
sudo dpkg-reconfigure -f noninteractive unattended-upgrades 2>/dev/null || true

echo "==> Docker daemon..."
sudo mkdir -p /etc/docker
if [ ! -f /etc/docker/daemon.json ]; then
  echo '{"live-restore":true,"userland-proxy":false}' | sudo tee /etc/docker/daemon.json >/dev/null
  sudo systemctl restart docker
fi

echo "Hardening done."
