---
title: "vai store"
description: "Embed and store a single document in MongoDB Atlas"
sidebar_position: 1
---

# vai store

Embed text and store it directly in a MongoDB Atlas collection. Supports single documents and batch mode via JSONL files.

## Synopsis

```bash
vai store --db <database> --collection <name> [options]
```

## Description

`vai store` takes text (from `--text`, `--file`, or stdin), generates an embedding via the Voyage AI API, and inserts the document into MongoDB Atlas. Each stored document includes the text, embedding vector, model name, dimensions, and a `createdAt` timestamp.

For batch storage, pass a `.jsonl` file where each line has a `"text"` field and optional `"metadata"` object.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--db <database>` | Database name **(required)** | — |
| `--collection <name>` | Collection name **(required)** | — |
| `--field <name>` | Embedding field name | `embedding` |
| `--text <text>` | Text to embed and store | — |
| `-f, --file <path>` | File to embed (text file, or `.jsonl` for batch) | — |
| `-m, --model <model>` | Embedding model | `voyage-4-large` |
| `--input-type <type>` | Input type: `query` or `document` | `document` |
| `-d, --dimensions <n>` | Output dimensions | Model default |
| `--output-dtype <type>` | Output data type: `float`, `int8`, `uint8`, `binary`, `ubinary` | `float` |
| `--metadata <json>` | Additional metadata as JSON string | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Store a single document

```bash
vai store --text "MongoDB Atlas provides vector search" --db myapp --collection docs
```

### Store from a file with metadata

```bash
vai store --file article.txt --db myapp --collection docs \
  --metadata '{"source": "blog", "author": "Jane"}'
```

### Batch store from JSONL

```bash
vai store --file documents.jsonl --db myapp --collection docs
```

The JSONL file format:

```json
{"text": "First document content", "metadata": {"source": "file1.md"}}
{"text": "Second document content", "metadata": {"source": "file2.md"}}
```

### Store with a lighter model

```bash
vai store --text "quick test" --db test --collection embeddings --model voyage-4-lite
```

## Tips

- For bulk imports with progress tracking and error handling, use [`vai ingest`](./ingest) instead.
- The `--metadata` JSON is merged into the top-level document — use it for tags, sources, or any fields you want to filter on later.
- Batch mode (`.jsonl`) embeds all texts in a single API call, which is more efficient than storing one at a time.

## Related Commands

- [`vai ingest`](./ingest) — Bulk import with batching and progress
- [`vai search`](./search) — Search stored documents
- [`vai pipeline`](../rag-pipeline/pipeline) — End-to-end chunk → embed → store
- [`vai index`](./index-cmd) — Create vector search indexes
