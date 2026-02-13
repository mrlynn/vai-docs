---
title: Refresh Embeddings
description: Re-embed documents with a new model or settings
sidebar_position: 2
---

# Refreshing Embeddings

When you upgrade to a new model or want to change dimensions, `vai refresh` re-embeds existing documents in-place without re-ingesting from source files.

## When to Refresh

- **Model upgrade**: Migrating from `voyage-3.5-lite` to `voyage-4-large`
- **Dimension change**: Switching from 1024 to 512 dimensions
- **Re-chunking**: Splitting documents into different chunk sizes

## Usage

### Upgrade model

```bash
vai refresh --model voyage-4-large
```

### Change dimensions

```bash
vai refresh --model voyage-4 --dimensions 512
```

### Re-chunk and re-embed

```bash
vai refresh --model voyage-4-large --rechunk --strategy recursive --chunk-size 1024
```

### Refresh only specific documents

```bash
vai refresh --filter '{"_model": "voyage-3.5-lite"}'
```

### Preview the plan

```bash
vai refresh --model voyage-4-large --dry-run
```

## How It Works

1. Reads documents from MongoDB matching the filter
2. Re-generates embeddings with the new model/dimensions
3. Updates each document in-place (preserving `_id` and other fields)
4. Optionally re-chunks text before re-embedding
5. Updates `.vai.json` with the new model/dimensions

## Tips

- Use `--dry-run` first to see how many documents will be affected
- The `--rechunk` flag creates new documents and deletes originals — it's not an in-place update
- After refreshing, update your vector search index if dimensions changed

## Further Reading

- [`vai refresh`](/docs/commands/data-management/refresh) — Full command reference
- [Purge Stale Data](./purge-stale) — Remove old embeddings
