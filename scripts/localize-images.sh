#!/usr/bin/env bash
# Optional: copy every Snitch CDN image into ./img and point index.html at the local copies.
# Run once from the repo root on your Mac:  bash scripts/localize-images.sh
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p img
grep -o 'https://d2d5n4ft74bagm\.cloudfront\.net/media/[^"]*' index.html | sort -u | while read -r url; do
  name=$(echo "$url" | awk -F/ '{print $(NF-1)"-"$NF}' | cut -c1-60)
  [ -f "img/$name" ] || curl -fsSL "$url" -o "img/$name"
  perl -pi -e "s#\Q$url\E#img/$name#g" index.html
  echo "saved img/$name"
done
perl -pi -e 's#<link rel="preconnect" href="https://d2d5n4ft74bagm.cloudfront.net">\n##' index.html
echo "Done. Images now load from ./img"
