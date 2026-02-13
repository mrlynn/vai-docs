---
title: "vai refresh"
description: "Re-embed documents with a new model or dimensions"
sidebar_position: 6
---

# vai refresh

Re-embed existing documents in MongoDB with a new model, different dimensions, or updated chunk settings — without re-ingesting from source files.

## Synopsis

```bash
vai refresh [options]
```

## Description

`vai refresh` reads documents from your MongoDB collection, re-generates their embeddings with a new model or dimensions, and updates them in-place. Optionally, it can re-chunk the text before re-embedding using the `--rechunk` flag.

This is useful when upgrading to a newer model (e.g., migrating from `voyage-3.5-lite` to `voyage-4-large`) or changing dimensions without needing to re-ingest from source files.

After refreshing, vai updates your `.vai.json` project config with the new model and dimensions.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--db <database>` | Database name | From `.vai.json` or `VAI_DB` |
| `--collection <name>` | Collection name | From `.vai.json` or `VAI_COLLECTION` |
| `--field <name>` | Embedding field name | From `.vai.json` or `embedding` |
| `-m, --model <model>` | New embedding model | From `.vai.json` or `voyage-3.5-lite` |
| `-d, --dimensions <n>` | New dimensions | From `.vai.json` |
| `--rechunk` | Re-chunk text before re-embedding | — |
| `-s, --strategy <strategy>` | Chunk strategy (with `--rechunk`) | `recursive` |
| `-c, --chunk-size <n>` | Chunk size (with `--rechunk`) | `512` |
| `--overlap <n>` | Chunk overlap (with `--rechunk`) | `50` |
| `--batch-size <n>` | Texts per API call | `25` |
| `--filter <json>` | Only refresh matching documents (JSON) | — |
| `--force` | Skip confirmation prompt | — |
| `--dry-run` | Show plan without executing | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Upgrade to a new model

```bash
vai refresh --model voyage-4-large
```

### Refresh with new dimensions

```bash
vai refresh --model voyage-4 --dimensions 512
```

### Re-chunk and re-embed

```bash
vai refresh --model voyage-4-large --rechunk --strategy recursive --chunk-size 1024
```

### Refresh only specific documents

```bash
vai refresh --model voyage-4-large --filter '{"_model": "voyage-3.5-lite"}'
```

### Dry run to see the plan

```bash
vai refresh --model voyage-4-large --dry-run
```

## Tips

- Use `--dry-run` first to see how many documents will be affected.
- The `--rechunk` flag deletes the original documents and inserts new chunked versions. Make sure you have the text stored in the documents.
- Refreshing updates embeddings in-place (via `$set`), preserving `_id` and other fields.
- After a successful refresh, `.vai.json` is automatically updated with the new model and dimensions.

## Related Commands

- [`vai purge`](./purge) — Remove old embeddings instead of refreshing
- [`vai pipeline`](../rag-pipeline/pipeline) — Re-ingest from source files
- [`vai models`](../tools-and-learning/models) — Compare available models
