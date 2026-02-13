---
title: "vai search"
description: "Vector similarity search against MongoDB Atlas"
sidebar_position: 3
---

# vai search

Perform vector similarity search against a MongoDB Atlas collection using `$vectorSearch`.

## Synopsis

```bash
vai search --query <text> --db <database> --collection <name> [options]
```

## Description

`vai search` embeds your query text, then runs a `$vectorSearch` aggregation pipeline against MongoDB Atlas to find the most similar documents. Results are returned with similarity scores, with the embedding vectors stripped from output for readability.

This is a single-stage retrieval command. For two-stage retrieval (search + rerank), use [`vai query`](../rag-pipeline/query).

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--query <text>` | Search query **(required)** | — |
| `--db <database>` | Database name **(required)** | — |
| `--collection <name>` | Collection name **(required)** | — |
| `--index <name>` | Vector search index name | `vector_index` |
| `--field <name>` | Embedding field name | `embedding` |
| `-m, --model <model>` | Embedding model | `voyage-4-large` |
| `--input-type <type>` | Input type for query embedding | `query` |
| `-d, --dimensions <n>` | Output dimensions | Model default |
| `-l, --limit <n>` | Maximum results to return | `10` |
| `--min-score <n>` | Minimum similarity score threshold | — |
| `--num-candidates <n>` | ANN search candidates | `limit × 15` |
| `--filter <json>` | Pre-filter JSON for `$vectorSearch` | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Basic search

```bash
vai search --query "How do I configure replica sets?" --db myapp --collection docs
```

### Search with a filter

```bash
vai search --query "deployment" --db myapp --collection docs \
  --filter '{"category": "operations"}'
```

### Limit results and set minimum score

```bash
vai search --query "authentication" --db myapp --collection docs --limit 5 --min-score 0.7
```

### JSON output for downstream processing

```bash
vai search --query "vector search" --db myapp --collection docs --json | jq '.[0].text'
```

### Use a custom index and field

```bash
vai search --query "scaling" --db myapp --collection docs \
  --index my_custom_index --field content_embedding
```

## Tips

- The `--filter` option maps directly to the `filter` parameter of MongoDB's `$vectorSearch` stage. Use it to narrow results by metadata before vector comparison.
- Increase `--num-candidates` for better recall at the cost of latency. The default (`limit × 15`, capped at 10,000) works well for most use cases.
- For production search with reranking, use [`vai query`](../rag-pipeline/query) instead.

## Related Commands

- [`vai query`](../rag-pipeline/query) — Two-stage retrieval (search + rerank)
- [`vai store`](./store) — Store documents for searching
- [`vai index`](./index-cmd) — Manage vector search indexes
