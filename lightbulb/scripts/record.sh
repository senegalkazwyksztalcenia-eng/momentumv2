#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p /opt/cursor/artifacts/videos

# Serve built bundle for recording (stable, no HMR)
cp -f dist/index.html dist/index.html.bak 2>/dev/null || true
cat > dist/index.html <<'HTML'
<!doctype html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Żarówka — nagrywanie</title>
  <link rel="stylesheet" href="./lightbulb.css" />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { margin:0; min-height:100vh; display:grid; place-items:center;
      background: radial-gradient(ellipse 80% 55% at 50% 18%, rgba(0,80,180,.14), transparent 62%), #020611; }
  </style>
</head>
<body>
  <div id="bulb-mount"></div>
  <script src="./lightbulb.js"></script>
  <script>MomentumLightbulb.mount('#bulb-mount', { ctaText: 'ODKRYJ TERAZ', ctaHref: '#', autoplay: true });</script>
</body>
</html>
HTML

# HTTP server for dist
if ! curl -sf http://127.0.0.1:5199/ >/dev/null 2>&1; then
  python3 -m http.server 5199 --bind 127.0.0.1 --directory dist >/tmp/lightbulb-http.log 2>&1 &
  sleep 1
fi

PREVIEW_URL=http://127.0.0.1:5199/ RECORD_MS=9000 node scripts/record.mjs
echo "Videos: /opt/cursor/artifacts/videos/lightbulb-desktop.mp4"
