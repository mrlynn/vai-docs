---
title: "vai pipeline"
description: "End-to-end: chunk files, embed, store in MongoDB Atlas"
sidebar_position: 1
---

# vai pipeline

The all-in-one command: chunk documents, generate embeddings, and store vectors in MongoDB Atlas in a single step.

## Synopsis

```bash
vai pipeline <input> [options]
```

## Description

`vai pipeline` takes a file or directory as input and runs the complete RAG ingestion pipeline:

1. **Chunk**: Split files into embedding-sized pieces using one of 5 strategies
2. **Embed**: Generate vector embeddings, either via the Voyage AI API or locally with `voyage-4-nano`
3. **Store**: Insert documents with embeddings into MongoDB Atlas

It reads settings from `.vai.json` (created by `vai init`) and merges them with CLI flags. For directories, it recursively scans for supported file types (`.txt`, `.md`, `.html`, `.json`, `.jsonl`, `.pdf`).

Optionally, `--create-index` auto-creates a vector search index after insertion. In `v1.31.0`, `--local` routes the embedding step through `voyage-4-nano` using the lightweight Python bridge while leaving chunking and MongoDB storage unchanged.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<input>` | File or directory to process **(required)** | — |
| `--db <database>` | Database name | From `.vai.json` |
| `--collection <name>` | Collection name | From `.vai.json` |
| `--field <name>` | Embedding field name | `embedding` |
| `--index <name>` | Vector search index name | `vector_index` |
| `-m, --model <model>` | Embedding model | `voyage-4-large` |
| `--local` | Use local `voyage-4-nano` inference for the embedding step | `false` |
| `-d, --dimensions <n>` | Output dimensions | Model default |
| `-s, --strategy <strategy>` | Chunking strategy: `fixed`, `sentence`, `paragraph`, `recursive`, `markdown` | `recursive` |
| `-c, --chunk-size <n>` | Target chunk size in characters | `512` |
| `--overlap <n>` | Overlap between chunks | `50` |
| `--batch-size <n>` | Texts per embedding API call | `25` |
| `--text-field <name>` | Text field for JSON/JSONL input | `text` |
| `--extensions <exts>` | File extensions to include (comma-separated) | All supported |
| `--ignore <dirs>` | Directory names to skip | `node_modules,.git,__pycache__` |
| `--create-index` | Auto-create vector search index | — |
| `--dry-run` | Show what would happen without executing | — |
| `--estimate` | Show cost estimate, optionally switch model | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Ingest a directory of docs

```bash
vai pipeline ./docs/ --db myapp --collection knowledge --create-index
```

### Ingest with local nano inference

```bash
vai nano setup
vai pipeline ./docs/ --local --db myapp --collection knowledge --create-index
```

### Ingest a single file with markdown chunking

```bash
vai pipeline README.md --db myapp --collection docs --strategy markdown
```

### Dry run to preview chunks and cost

```bash
vai pipeline ./docs/ --db myapp --collection knowledge --dry-run
```

### Cost estimate with model comparison

```bash
vai pipeline ./docs/ --db myapp --collection knowledge --estimate
```

### Custom chunking settings

```bash
vai pipeline ./data/ --db myapp --collection docs \
  --strategy recursive --chunk-size 1024 --overlap 100 --batch-size 50
```

## How It Works

1. **File scanning**: Recursively finds supported files in the input directory. `.md` files automatically use the `markdown` chunking strategy when `recursive` is selected.
2. **Chunking**: Each file is read and split into chunks. Metadata (source path, chunk index, total chunks) is attached to each chunk.
3. **Embedding**: Chunks are batched and embedded with `--input-type document`, either through the Voyage AI API or locally with `voyage-4-nano` when `--local` is enabled.
4. **Storage**: Documents (text + embedding + metadata) are inserted into MongoDB via `insertMany`.
5. **Indexing** (optional): A vector search index is created on the embedding field.

## Tips

- Initialize your project with `vai init` first to avoid passing `--db` and `--collection` every time.
- The `--dry-run` flag shows chunk counts and estimated cost without making any API calls or database writes.
- Use `--local` when you want a local-first ingestion path with `voyage-4-nano` and no Voyage API key for embedding.
- After pipeline completes, use `vai query` to search your indexed documents.
- For Markdown files, the `recursive` strategy auto-detects and switches to `markdown` chunking for better section-aware splits.
- Because `voyage-4-nano` shares embedding space with the rest of the Voyage 4 family, a collection indexed locally can still fit into broader Voyage 4 workflows later.

## Related Commands

- [`vai chunk`](./chunk) — Chunk documents without embedding
- [`vai query`](./query) — Search your indexed collection
- [`vai estimate`](./estimate) — Compare costs across models
- [`vai init`](/docs/commands/project-setup/init) — Set up `.vai.json` config
- [Local Inference Guide](/docs/guides/local-inference/setup-and-usage) — Set up nano and run the local-first pipeline
