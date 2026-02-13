---
title: "vai purge"
description: "Remove embeddings by model, date, source, or staleness"
sidebar_position: 5
---

# vai purge

Remove embedding documents from MongoDB based on filter criteria. Supports filtering by source pattern, date, model, raw MongoDB filter, or stale source files.

## Synopsis

```bash
vai purge [options]
```

## Description

`vai purge` deletes documents from your embeddings collection based on one or more criteria. At least one filter is required — you can't accidentally purge everything. Before deleting, it shows a preview of matching documents and asks for confirmation (unless `--force` is used).

The `--stale` mode is particularly useful: it finds documents whose `metadata.source` file no longer exists on disk, letting you clean up embeddings for deleted files.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--db <database>` | Database name | From `.vai.json` or `VAI_DB` |
| `--collection <name>` | Collection name | From `.vai.json` or `VAI_COLLECTION` |
| `--source <glob>` | Filter by `metadata.source` pattern (glob-like) | — |
| `--before <date>` | Filter by `_embeddedAt` before date (ISO 8601) | — |
| `-m, --model <model>` | Filter by `_model` field | — |
| `--filter <json>` | Raw MongoDB filter (JSON string) | — |
| `--stale` | Remove docs whose source files no longer exist on disk | — |
| `--force` | Skip confirmation prompt | — |
| `--dry-run` | Show what would be deleted without acting | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Remove embeddings from a specific source

```bash
vai purge --source "docs/old-api/*"
```

### Remove embeddings created before a date

```bash
vai purge --before 2024-01-01
```

### Remove embeddings from a legacy model

```bash
vai purge --model voyage-3-large
```

### Find and remove stale embeddings

```bash
vai purge --stale --dry-run   # preview first
vai purge --stale --force     # then clean up
```

### Combine multiple filters

```bash
vai purge --model voyage-3.5-lite --before 2024-06-01 --force
```

## Tips

- Always use `--dry-run` first to preview what will be deleted.
- The `--stale` flag compares `metadata.source` paths against the filesystem. It resolves relative paths from the project root (or current directory).
- Multiple filter options are combined with `$and` — all conditions must match.
- Purge is permanent. There is no undo.

## Related Commands

- [`vai refresh`](./refresh) — Re-embed documents with a new model instead of deleting
- [`vai ingest`](./ingest) — Add new documents
- [`vai search`](./search) — Verify what's in your collection
