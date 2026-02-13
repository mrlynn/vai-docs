---
title: "vai chunk"
description: "Split documents into chunks for embedding"
sidebar_position: 3
---

# vai chunk

Split documents into embedding-sized chunks using one of five strategies. Outputs JSONL by default for piping into other commands.

## Synopsis

```bash
vai chunk [input] [options]
```

## Description

`vai chunk` reads files or directories, splits text into chunks, and outputs them as JSONL (one JSON object per line) with text and metadata. Each chunk includes the source file, chunk index, and total chunks from that file.

Five chunking strategies are available:

| Strategy | Description |
|----------|-------------|
| `fixed` | Split every N characters |
| `sentence` | Split on sentence boundaries |
| `paragraph` | Split on paragraph boundaries (double newlines) |
| `recursive` | Split recursively by paragraphs → sentences → characters |
| `markdown` | Split on Markdown headings, preserving document structure |

When using `recursive` on `.md` files, vai automatically switches to the `markdown` strategy.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `[input]` | File or directory to chunk | — |
| `-s, --strategy <strategy>` | Chunking strategy | `recursive` |
| `-c, --chunk-size <n>` | Target chunk size in characters | From `.vai.json` |
| `--overlap <n>` | Overlap between chunks in characters | From `.vai.json` |
| `--min-size <n>` | Minimum chunk size (drop smaller) | — |
| `-o, --output <path>` | Output file (JSONL). Omit for stdout | — |
| `--text-field <name>` | Text field for JSON/JSONL input | `text` |
| `--extensions <exts>` | File extensions to include (comma-separated) | All supported |
| `--ignore <dirs>` | Directory names to skip | `node_modules,.git,__pycache__` |
| `--dry-run` | Show what would be chunked without processing | — |
| `--stats` | Show chunking statistics after processing | — |
| `--json` | Full JSON output (includes stats + chunks) | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Chunk a single file

```bash
vai chunk README.md
```

### Chunk a directory with custom settings

```bash
vai chunk ./docs/ --strategy markdown --chunk-size 1024 --overlap 100
```

### Save chunks to a file

```bash
vai chunk ./docs/ -o chunks.jsonl
```

### Dry run to preview files

```bash
vai chunk ./src/ --dry-run --extensions ".js,.ts"
```

### Pipe chunks into ingest

```bash
vai chunk ./docs/ -o chunks.jsonl
vai ingest --file chunks.jsonl --db myapp --collection docs --field embedding
```

## Output Format

Each line of JSONL output:

```json
{"text": "chunk content here...", "metadata": {"source": "docs/intro.md", "chunk_index": 0, "total_chunks": 5}}
```

With `--json`, outputs a single JSON object with `totalChunks`, `totalTokens`, `strategy`, `files` array, and `chunks` array.

With `--stats`, shows a summary including file count, total input characters, chunk count, average chunk size, estimated tokens, and estimated cost.

## Tips

- Use `--strategy markdown` for Markdown files to split on headings. The `recursive` strategy auto-detects `.md` files and does this automatically.
- The `--min-size` option drops chunks smaller than the threshold — useful for filtering out heading-only chunks.
- Settings from `.vai.json` (chunk strategy, size, overlap) are used as defaults when available.
- For the full pipeline (chunk → embed → store), use [`vai pipeline`](./pipeline) instead.

## Related Commands

- [`vai pipeline`](./pipeline) — Chunk, embed, and store in one step
- [`vai estimate`](./estimate) — Estimate embedding costs for chunks
- [`vai ingest`](../data-management/ingest) — Import chunked JSONL into MongoDB
