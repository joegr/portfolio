#!/usr/bin/env python3
"""Build / refresh the atlas event stream from a set of git repos.

Outputs:
    gource/gource.json  - sorted event stream + repo & user summaries
    gource/state.json   - per-repo last processed HEAD SHA (for incremental runs)

Each event records a single file change inside a non-merge commit and carries
the LOC delta (added + deleted) from `git log --numstat`. The LOC is the
"signal" the cursor delivers to a repo so its rendered radius can grow.

Incremental: subsequent runs use `<last_sha>..HEAD` per repo so we only ever
parse new commits. If a force-push invalidates the stored SHA, that repo's
events are dropped and reprocessed from scratch.

Usage:
    ./build-events.py                     # scan parent of this workspace
    ./build-events.py /path/to/parent     # explicit parent dir
    ./build-events.py --full /path/...    # force full rebuild (ignore state)
"""
from __future__ import annotations
import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parent
REPOS_FILE = ROOT / "repos.txt"
EVENTS_FILE = ROOT / "gource.json"
STATE_FILE = ROOT / "state.json"


# ---------- Repo discovery ----------
def parse_repos_file() -> list[str]:
    if not REPOS_FILE.exists():
        return []
    out = []
    for raw in REPOS_FILE.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        out.append(line)
    return out


def discover_repos(parent: Path) -> list[tuple[str, Path]]:
    """Return [(display_name, path_to_repo), ...]."""
    listed = parse_repos_file()
    found: list[tuple[str, Path]] = []
    if listed:
        # Use the configured list; expect each to live as parent/<basename>
        for full in listed:
            name = full.rsplit("/", 1)[-1]
            p = parent / name
            if (p / ".git").is_dir():
                found.append((name, p))
            else:
                print(f"  warn: {full} not found at {p}", file=sys.stderr)
    else:
        # Fall back to scanning the parent dir for any git repo.
        for d in sorted(parent.iterdir()):
            if d.is_dir() and (d / ".git").is_dir():
                found.append((d.name, d))
    return found


# ---------- Git plumbing ----------
def git(repo: Path, *args: str) -> str:
    return subprocess.check_output(
        ["git", "-C", str(repo), *args], text=True, errors="replace"
    )


def commit_exists(repo: Path, sha: str) -> bool:
    try:
        subprocess.check_call(
            ["git", "-C", str(repo), "cat-file", "-e", f"{sha}^{{commit}}"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        return True
    except subprocess.CalledProcessError:
        return False


def head_sha(repo: Path) -> str:
    return git(repo, "rev-parse", "HEAD").strip()


def parse_git_log(repo_name: str, repo: Path, since: str | None) -> list[dict]:
    """Return events for commits in (since..HEAD] (or all of HEAD if since=None)."""
    rev_range = f"{since}..HEAD" if since else "HEAD"
    fmt = "--pretty=format:COMMIT|%H|%at|%an"
    cmd = [
        "log",
        "--no-merges",
        "--reverse",
        "--numstat",
        fmt,
        rev_range,
    ]
    try:
        raw = git(repo, *cmd)
    except subprocess.CalledProcessError as e:
        print(f"  warn: git log failed for {repo_name}: {e}", file=sys.stderr)
        return []

    events: list[dict] = []
    cur_t: int | None = None
    cur_u: str | None = None
    for line in raw.splitlines():
        if not line.strip():
            continue
        if line.startswith("COMMIT|"):
            try:
                _, _sha, ts, author = line.split("|", 3)
                cur_t = int(ts)
                cur_u = author
            except ValueError:
                cur_t = cur_u = None
            continue
        if cur_t is None:
            continue
        parts = line.split("\t")
        if len(parts) != 3:
            continue
        added_s, deleted_s, path = parts
        added = int(added_s) if added_s.isdigit() else 0
        deleted = int(deleted_s) if deleted_s.isdigit() else 0
        if added == 0 and deleted == 0:
            # Binary or no-op; still emit an "M" event with l=0 so cursor flies.
            action = "M"
        elif added > 0 and deleted == 0:
            action = "A"
        elif added == 0 and deleted > 0:
            action = "D"
        else:
            action = "M"
        events.append({
            "t": cur_t,
            "u": cur_u or "",
            "a": action,
            "p": f"/{repo_name}/{path}",
            "r": repo_name,
            "l": added + deleted,
            "+": added,
            "-": deleted,
        })
    return events


# ---------- Aggregation ----------
def summarize(events: list[dict]) -> dict:
    repo_count: dict[str, int] = {}
    repo_loc: dict[str, int] = {}
    user_count: dict[str, int] = {}
    for e in events:
        r = e["r"]
        repo_count[r] = repo_count.get(r, 0) + 1
        repo_loc[r] = repo_loc.get(r, 0) + e.get("l", 0)
        u = e["u"]
        user_count[u] = user_count.get(u, 0) + 1
    return {
        "repos": sorted(
            [
                {"name": r, "count": repo_count[r], "loc": repo_loc.get(r, 0)}
                for r in repo_count
            ],
            key=lambda x: -x["count"],
        ),
        "users": sorted(
            [{"name": u, "count": c} for u, c in user_count.items()],
            key=lambda x: -x["count"],
        ),
        "start": events[0]["t"] if events else 0,
        "end": events[-1]["t"] if events else 0,
        "events": events,
    }


# ---------- Main ----------
def main():
    args = sys.argv[1:]
    full_rebuild = False
    if "--full" in args:
        args.remove("--full")
        full_rebuild = True
    parent = Path(args[0]).resolve() if args else (ROOT.parent.parent).resolve()

    repos = discover_repos(parent)
    if not repos:
        print(f"No git repos found under {parent}", file=sys.stderr)
        sys.exit(1)

    # Existing state
    state: dict = {}
    if STATE_FILE.exists() and not full_rebuild:
        try:
            state = json.loads(STATE_FILE.read_text()).get("repos", {})
        except Exception:
            state = {}

    existing: list[dict] = []
    if EVENTS_FILE.exists() and not full_rebuild:
        try:
            existing = json.loads(EVENTS_FILE.read_text()).get("events", [])
        except Exception:
            existing = []

    new_state: dict[str, str] = {}
    new_events_total = 0

    for name, path in repos:
        last = state.get(name)
        head = head_sha(path)
        if last == head:
            print(f"  {name}: up to date ({head[:7]})", file=sys.stderr)
            new_state[name] = head
            continue
        if last and not commit_exists(path, last):
            print(
                f"  {name}: stored SHA {last[:7]} no longer reachable; "
                f"reprocessing from scratch",
                file=sys.stderr,
            )
            existing = [e for e in existing if e["r"] != name]
            last = None

        events = parse_git_log(name, path, last)
        new_events_total += len(events)
        existing.extend(events)
        new_state[name] = head
        print(
            f"  {name}: +{len(events):>5} new events  (HEAD={head[:7]})",
            file=sys.stderr,
        )

    existing.sort(key=lambda e: e["t"])

    out = summarize(existing)
    EVENTS_FILE.write_text(json.dumps(out, separators=(",", ":")))
    STATE_FILE.write_text(
        json.dumps(
            {
                "updated": existing[-1]["t"] if existing else 0,
                "repos": new_state,
            },
            indent=2,
        )
        + "\n"
    )
    print(
        f"Wrote {len(existing)} events ({new_events_total} new) to {EVENTS_FILE}",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
