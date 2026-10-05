#!/usr/bin/env bash
# Jalankan di server (folder repo) setiap kali update: bash deploy/deploy.sh
# Pastikan api.hipmibantul.com sudah online — halaman dipre-render saat build.
set -euo pipefail

git pull --ff-only
npm ci
npm run build
# standalone build butuh aset statis & public disalin manual
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
cp .env.production.local .next/standalone/ 2>/dev/null || true
pm2 reload deploy/ecosystem.config.js --update-env || pm2 start deploy/ecosystem.config.js
echo "✅ Website hipmibantul.com ter-update"
