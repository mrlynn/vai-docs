---
title: Purge Stale Data
description: Clean up embeddings for deleted source files
sidebar_position: 1
---

# Purging Stale Data

Over time, source files get renamed, moved, or deleted, but their embeddings remain in MongoDB. `vai purge --stale` finds and removes these orphaned embeddings.

## How It Works

1. vai queries all documents with a `metadata.source` field
2. For each document, it checks if the source file still exists on disk
3. Documents whose source files are missing are flagged for deletion

## Usage

### Preview first (always recommended)

```bash
vai purge --stale --dry-run
```

### Delete stale documents

```bash
vai purge --stale --force
```

### Other purge criteria

```bash
# By source pattern
vai purge --source "docs/deprecated/*"

# By model (clean up after migration)
vai purge --model voyage-3.5-lite

# By date
vai purge --before 2024-01-01

# Combine filters
vai purge --model voyage-3.5-lite --before 2024-06-01
```

## Best Practices

- Run `--dry-run` first to review what will be deleted
- Schedule periodic stale purges after document updates
- After purging, re-run your pipeline to re-ingest updated content

## Further Reading

- [`vai purge`](/docs/commands/data-management/purge) — Full command reference
- [Refresh Embeddings](./refresh-embeddings) — Re-embed instead of deleting
