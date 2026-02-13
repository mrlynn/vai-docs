---
title: "vai ingest"
description: "Bulk import documents with progress tracking"
sidebar_position: 2
---

# vai ingest

Bulk import documents from files into MongoDB Atlas with batched embedding, progress tracking, and error handling.

## Synopsis

```bash
vai ingest --file <path> --db <database> --collection <name> --field <name> [options]
```

## Description

`vai ingest` reads documents from a file (JSON, JSONL, CSV, or plain text), embeds them in batches via the Voyage AI API, and inserts them into MongoDB Atlas. It auto-detects the file format and provides a real-time progress bar during ingestion.

Supported formats:
- **JSONL** (`.jsonl`, `.ndjson`): One JSON object per line with a text field
- **JSON** (`.json`): Array of objects with a text field
- **CSV** (`.csv`): Requires `--text-column` to specify which column to embed
- **Plain text**: One document per non-empty line

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--file <path>` | Input file **(required)** | — |
| `--db <database>` | Database name **(required)** | — |
| `--collection <name>` | Collection name **(required)** | — |
| `--field <name>` | Embedding field name **(required)** | — |
| `-m, --model <model>` | Embedding model | `voyage-4-large` |
| `--input-type <type>` | Input type: `query` or `document` | `document` |
| `-d, --dimensions <n>` | Output dimensions | Model default |
| `--batch-size <n>` | Documents per API batch (max 128) | `50` |
| `--text-column <name>` | CSV column to embed (required for CSV) | — |
| `--text-field <name>` | JSON/JSONL field containing text | `text` |
| `--dry-run` | Parse file and show stats without embedding | — |
| `--strict` | Abort on first batch error | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress progress, show only summary | — |

## Examples

### Ingest a JSONL file

```bash
vai ingest --file documents.jsonl --db myapp --collection knowledge --field embedding
```

### Ingest CSV with a specific text column

```bash
vai ingest --file products.csv --db store --collection items --field embedding --text-column description
```

### Dry run to check file parsing

```bash
vai ingest --file data.json --db myapp --collection docs --field embedding --dry-run
```

### Strict mode with smaller batches

```bash
vai ingest --file corpus.jsonl --db myapp --collection docs --field embedding \
  --batch-size 25 --strict
```

### JSON output for CI pipelines

```bash
vai ingest --file data.jsonl --db myapp --collection docs --field embedding --json
```

## Output

On completion, shows a summary with:
- Documents succeeded/failed
- Total batches processed
- Token count and model used
- Duration and throughput (docs/sec)

## Tips

- The Voyage AI API limits batches to 128 texts. The default batch size of 50 balances throughput and reliability.
- Use `--dry-run` first to validate your file format and see estimated token counts before spending API credits.
- Failed batches are skipped by default; use `--strict` to abort on the first error.
- For simple single-document storage, use [`vai store`](./store) instead.

## Related Commands

- [`vai store`](./store) — Store a single document
- [`vai pipeline`](../rag-pipeline/pipeline) — End-to-end chunk → embed → store
- [`vai purge`](./purge) — Remove stored embeddings
- [`vai refresh`](./refresh) — Re-embed with a new model
