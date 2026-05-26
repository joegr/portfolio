# Repo Atlas — data pipeline

The atlas visualization (`/gource.html`) consumes a single sorted event
stream that holds **every commit on every tracked repo** plus per-file LOC
deltas. The cursor in the visualization "delivers" that LOC to each repo,
making its rendered radius grow as `r = BASE + sqrt(cumulative_loc) * SCALE`.

This pipeline is **incremental**: only commits newer than the last seen HEAD
are read on subsequent runs.

## Files

| File | Role |
| --- | --- |
| `repos.txt` | One `owner/name` per line. Source of truth for what the workflow tracks. |
| `build-events.py` | Walks each cloned repo, runs `git log --no-merges --reverse --numstat`, emits events. Handles incremental refresh and detects rebased history. |
| `gource.json` | Output: sorted event stream + repo / user summaries. Committed back from CI. |
| `state.json` | Output: per-repo last processed HEAD SHA, drives incremental runs. Committed back from CI. |

## Event schema

```jsonc
{
  "repos": [{"name": "futwm", "count": 1234, "loc": 567890}, ...],
  "users": [{"name": "joegr", "count": 5678}, ...],
  "start": 1640995200,
  "end":   1716595200,
  "events": [
    {
      "t": 1640995200,           // unix seconds (author date)
      "u": "Joe Gruenbaum",      // author name from git
      "a": "A",                  // A=add, M=modify, D=delete (heuristic from numstat)
      "p": "/futwm/src/main.py", // path prefixed with /<repo>/
      "r": "futwm",              // repo name
      "l": 42,                   // added + deleted (the "signal" magnitude)
      "+": 38,                   // added lines
      "-": 4                     // deleted lines
    }
  ]
}
```

Binary files (numstat reports `-` for both columns) are recorded with `l: 0`
so the cursor still flies to the repo but no LOC is added.

## Local usage

```bash
# Default: scan parent of this workspace, incremental refresh
python3 gource/build-events.py

# Explicit parent dir
python3 gource/build-events.py /Users/jg/CascadeProjects

# Force a full rebuild (ignore state.json)
python3 gource/build-events.py --full /Users/jg/CascadeProjects
```

## CI

`.github/workflows/update-gource.yml` runs daily at 07:00 UTC, on manual
dispatch, and whenever `repos.txt`, `build-events.py`, or the workflow
itself changes. It:

1. Clones each repo from `repos.txt` into `/tmp/repos/`, caching the clones
   between runs via `actions/cache@v4` so subsequent runs only fetch new
   commits.
2. Runs `python3 gource/build-events.py /tmp/repos`.
3. Commits both `gource.json` and `state.json` back to the portfolio repo
   if they changed. Each daily run typically appends one day of events.

### Private repos

Generate a fine-grained PAT with `Contents: Read` on the private repos,
add it as the `GOURCE_PAT` repository secret, and uncomment the
`GOURCE_PAT` line in the workflow's `env:` block. The clone URL is rewritten
to inject the token only when the secret is present.

### Editing the tracked list

Edit `gource/repos.txt` and push. The workflow re-runs on push because of
its `paths:` trigger. Adding a new repo causes its full history to be
processed on the next run; existing repos remain incremental.

### Recovering from force-pushes

If a tracked repo is force-pushed and its stored SHA disappears, the script
detects this with `git cat-file -e <sha>^{commit}`, drops that repo's old
events, and reprocesses from scratch on that single repo only.

To force a clean rebuild of everything, delete `gource/state.json` and
`gource/gource.json` and re-run.
