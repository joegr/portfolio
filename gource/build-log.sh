#!/usr/bin/env bash
# Scan a parent directory for git repos, run gource on each, merge + prefix
# their custom logs, and emit a single sorted gource.json for the D3 vis.
#
# Usage:
#   ./build-log.sh                 # defaults to parent of this workspace
#   ./build-log.sh /path/to/dir    # explicit parent dir

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PARENT="${1:-$(cd "$SCRIPT_DIR/../.." && pwd)}"
COMBINED_LOG="$SCRIPT_DIR/combined.log"
COMBINED_JSON="$SCRIPT_DIR/gource.json"
TMP_DIR="$SCRIPT_DIR/.tmp"

if ! command -v gource >/dev/null 2>&1; then
    echo "Error: gource not installed. brew install gource" >&2
    exit 1
fi

mkdir -p "$TMP_DIR"
: > "$COMBINED_LOG"

echo "Scanning $PARENT for git repos..."
found=0
for d in "$PARENT"/*/; do
    repo_name="$(basename "$d")"
    if [ -d "$d/.git" ]; then
        echo "  -> $repo_name"
        tmp_log="$TMP_DIR/$repo_name.log"
        # Suppress gource's own stderr chatter; let real errors surface.
        if ! gource --output-custom-log "$tmp_log" "$d" 2>/dev/null; then
            echo "     (skipped: gource failed on $repo_name)" >&2
            continue
        fi
        # Prefix every path field with /<repo_name> so all repos share one tree.
        awk -F'|' -v repo="/$repo_name" 'BEGIN{OFS="|"} NF==4 {$4 = repo $4; print}' \
            "$tmp_log" >> "$COMBINED_LOG"
        found=$((found + 1))
    fi
done

if [ "$found" -eq 0 ]; then
    echo "No git repos found under $PARENT" >&2
    exit 1
fi

echo "Sorting $(wc -l < "$COMBINED_LOG" | tr -d ' ') events by timestamp..."
sort -n -t'|' -k1,1 "$COMBINED_LOG" -o "$COMBINED_LOG"

echo "Converting to JSON -> $COMBINED_JSON"
python3 "$SCRIPT_DIR/log-to-json.py" "$COMBINED_LOG" > "$COMBINED_JSON"

# Tidy up
rm -rf "$TMP_DIR"
rm -f "$COMBINED_LOG"

echo "Done. Open gource.html (served, not file://) to view."
