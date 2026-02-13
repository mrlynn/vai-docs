---
title: "vai query"
description: "Two-stage retrieval: embed query, vector search, rerank results"
sidebar_position: 2
---

# vai query

Search and rerank in one command — the two-stage retrieval pattern. Embeds your query, runs vector search against MongoDB Atlas, and optionally reranks results for higher precision.

## Synopsis

```bash
vai query <text> [options]
```

## Description

`vai query` performs the complete retrieval pipeline:

1. **Embed** — Convert query text to a vector using Voyage AI
2. **Search** — Run `$vectorSearch` against MongoDB Atlas to find candidates
3. **Rerank** — Re-score candidates with a cross-encoder model for higher precision

By default, reranking is enabled. Use `--no-rerank` for vector-search-only results.

Settings are merged from `.vai.json` project config and CLI flags.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<text>` | Search query **(required)** | — |
| `--db <database>` | Database name | From `.vai.json` |
| `--collection <name>` | Collection name | From `.vai.json` |
| `--index <name>` | Vector search index name | `vector_index` |
| `--field <name>` | Embedding field name | `embedding` |
| `-m, --model <model>` | Embedding model for query | From `.vai.json` or `voyage-4-large` |
| `-d, --dimensions <n>` | Output dimensions | From `.vai.json` |
| `-l, --limit <n>` | Vector search candidates to retrieve | `20` |
| `-k, --top-k <n>` | Final results after reranking | `5` |
| `--rerank` | Enable reranking (default) | `true` |
| `--no-rerank` | Skip reranking | — |
| `--rerank-model <model>` | Reranking model | `rerank-2.5` |
| `--text-field <name>` | Document text field for reranking/display | `text` |
| `--filter <json>` | Pre-filter JSON for `$vectorSearch` | — |
| `--num-candidates <n>` | ANN candidates | `limit × 15` |
| `--show-vectors` | Include embedding vectors in output | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Basic two-stage query

```bash
vai query "How do I configure replica sets?"
```

### Vector search only (no reranking)

```bash
vai query "deployment" --no-rerank --limit 10
```

### Query with pre-filter

```bash
vai query "authentication" --filter '{"metadata.source": {"$regex": "security"}}'
```

### JSON output with full metadata

```bash
vai query "scaling strategies" --json | jq '.results[:3]'
```

### Custom models and result counts

```bash
vai query "error handling" --model voyage-4-lite --rerank-model rerank-2.5-lite \
  --limit 50 --top-k 10
```

## Output

Each result shows:
- **Rank and final score** (rerank score if reranked, vector score otherwise)
- **Both scores** when reranking: `vs:` (vector search) and `rr:` (rerank)
- **Text preview** (first 200 characters)
- **Source metadata** and document `_id`
- **Token usage** for embed and rerank stages

## Tips

- The default flow retrieves 20 candidates via vector search, then reranks to the top 5. Adjust `--limit` and `--top-k` based on your precision/recall needs.
- Reranking adds latency but significantly improves result quality. It's especially valuable when vector search returns many plausible matches.
- Use `vai init` to set defaults for `--db`, `--collection`, `--model`, etc., so you only need `vai query "your question"`.

## Related Commands

- [`vai search`](../data-management/search) — Single-stage vector search
- [`vai rerank`](../embeddings/rerank) — Rerank standalone
- [`vai chat`](../advanced/chat) — Conversational RAG interface
- [`vai pipeline`](./pipeline) — Ingest documents to query against
