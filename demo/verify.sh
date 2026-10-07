#!/usr/bin/env bash
# Part 2 of the demo: independent verification with "vibium check".
# Run it from the repository root while "npm run dev" serves the app.
#   demo/verify.sh [label]
# Recordings go to evidence/ and are never overwritten: each run needs a new
# label. Without one, the current date and time are used.
set -euo pipefail

label="${1:-$(date +%Y%m%d-%H%M%S)}"
base="http://localhost:5173"
out="evidence"
mkdir -p "$out"
echo "Label: $label"

check() {
  local n="$1" claim="$2"
  echo "[start $(date +%T)]"
  vibium check "$claim" --base-url "$base" -o "$out/claim-$n-$label.zip"
  echo "[end $(date +%T)]"
}

check 1 "A banner at the bottom of the screen announces the promo code EARLYBIRD with 20% off until 31 October 2026"
read -rp "Press Enter to continue..."
check 2 "Registering with name Ada Example, email ada@example.com, a General ticket, promo code EARLYBIRD and the privacy policy accepted shows Registration confirmed with a final price of 96 euros"
read -rp "Press Enter to continue..."
check 3 "The user can dismiss the promo banner"

echo
echo "Part 3: drop $out/claim-2-$label.zip into https://player.vibium.dev"
