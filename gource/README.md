# Gource → D3 pipeline

Generates a combined event log across every git repo under a parent dir and
emits a compact JSON that the standalone D3 visualization (`gource.html` in
the project root) consumes.

## Generate the data

```bash
# Default: scans the parent of this workspace
./build-log.sh

# Or: scan an explicit parent directory
./build-log.sh /Users/jg/CascadeProjects
```

Requires `gource` (`brew install gource`) and `python3`.

The script:

1. Finds every immediate subdirectory of the parent that contains `.git`.
2. Runs `gource --output-custom-log` on each.
3. Prefixes every path with `/<repo_name>/` so all repos share one tree.
4. Concatenates and sorts by timestamp.
5. Emits `gource/gource.json`.

## JSON schema

```jsonc
{
  "repos": [{"name": "futwm", "count": 1234}, ...],
  "users": [{"name": "joegr", "count": 5678}, ...],
  "start": 1640995200,
  "end":   1716595200,
  "events": [
    {"t": 1640995200, "u": "joegr", "a": "A", "p": "/futwm/src/main.py", "r": "futwm"}
  ]
}
```

Action codes: `A` added, `M` modified, `D` deleted.

## Keeping it fresh in CI

`.github/workflows/update-gource.yml` runs daily (07:00 UTC), on manual
dispatch, and whenever `repos.txt` / `build-log.sh` / `log-to-json.py`
change. The workflow:

1. Installs `gource` and `xvfb` on the Ubuntu runner.
2. Reads `gource/repos.txt` — a list of `owner/name` GitHub repos, one per line.
3. Clones each repo into `/tmp/repos/` (cached between runs via
   `actions/cache@v4`, so subsequent runs only fetch new commits).
4. Calls `bash gource/build-log.sh /tmp/repos`.
5. Commits the updated `gource/gource.json` back to the portfolio repo
   if it changed.

### Private repos

Generate a fine-grained PAT with `Contents: Read` on the private repos,
add it as the `GOURCE_PAT` repository secret, and uncomment the
`GOURCE_PAT` line in the workflow's `env:` block. The clone URL is
rewritten to inject the token only when the secret is present, so public
repos still clone anonymously when no token is configured.

### Editing the tracked list

Edit `gource/repos.txt` and push — the workflow re-runs on push because
of its `paths:` trigger.

