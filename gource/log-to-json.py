#!/usr/bin/env python3
"""Convert a merged gource custom log to the compact JSON the D3 vis consumes.

Custom log line format (pipe-delimited):
    TIMESTAMP|USERNAME|TYPE|PATH

where TYPE is one of A (added), M (modified), D (deleted), and PATH has
already been prefixed with /<repo_name>/...
"""
import sys
import json
from collections import Counter

if len(sys.argv) < 2:
    print("usage: log-to-json.py <combined.log>", file=sys.stderr)
    sys.exit(1)

events = []
repos = Counter()
users = Counter()

with open(sys.argv[1]) as f:
    for line in f:
        parts = line.rstrip("\n").split("|")
        if len(parts) != 4:
            continue
        ts, user, action, path = parts
        try:
            ts = int(ts)
        except ValueError:
            continue
        segs = path.lstrip("/").split("/", 1)
        repo = segs[0]
        repos[repo] += 1
        users[user] += 1
        events.append({"t": ts, "u": user, "a": action, "p": path, "r": repo})

if not events:
    print(json.dumps({"repos": [], "users": [], "start": 0, "end": 0, "events": []}))
    sys.exit(0)

out = {
    "repos": [{"name": r, "count": c} for r, c in repos.most_common()],
    "users": [{"name": u, "count": c} for u, c in users.most_common()],
    "start": events[0]["t"],
    "end": events[-1]["t"],
    "events": events,
}
# Compact output, no spaces, single line.
json.dump(out, sys.stdout, separators=(",", ":"))
