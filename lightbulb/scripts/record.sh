#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

npm run build
mkdir -p /opt/cursor/artifacts/videos

# Serve demo page with built bundle
pkill -f "http.server 5199" 2>/dev/null || true
python3 -m http.server 5199 --bind 127.0.0.1 --directory "$ROOT" >/tmp/lightbulb-http.log 2>&1 &
sleep 1

# Chrome CDP (reuse if already running)
if ! curl -sf http://127.0.0.1:9333/json/version >/dev/null 2>&1; then
  TS=$(date +%s)
  google-chrome --headless=new --no-sandbox --disable-gpu \
    --remote-debugging-port=9333 \
    --user-data-dir="/tmp/chrome-cdp-$TS" about:blank &
  sleep 2
fi

PREVIEW_URL=http://127.0.0.1:5199/demo/record.html \
RECORD_MS=5000 \
node scripts/record.mjs

cp /opt/cursor/artifacts/videos/lightbulb-desktop.mp4 /opt/cursor/artifacts/videos/lightbulb.mp4
echo "✓ /opt/cursor/artifacts/videos/lightbulb.mp4"
echo "✓ /opt/cursor/artifacts/videos/lightbulb-mobile.mp4"
