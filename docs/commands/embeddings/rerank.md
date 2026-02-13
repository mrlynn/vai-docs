---
title: "vai rerank"
description: "Rerank documents by relevance to a query"
sidebar_position: 2
---

# vai rerank

Rerank a set of documents against a query using Voyage AI's cross-encoder reranking models.

## Synopsis

```bash
vai rerank --query <text> [options]
```

## Description

`vai rerank` takes a query and a set of documents, then re-scores each document by relevance using a cross-attention model. Unlike embedding-based search (which encodes query and document independently), reranking reads the query and each document *together* for higher-precision relevance scores.

Documents can be provided via `--documents`, `--documents-file`, or piped through stdin.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--query <text>` | Search query **(required)** | — |
| `--documents <docs...>` | Documents to rerank (inline, space-separated) | — |
| `--documents-file <path>` | File with documents (JSON array or newline-delimited) | — |
| `-m, --model <model>` | Reranking model | `rerank-2.5` |
| `-k, --top-k <n>` | Return only top K results | All |
| `--truncation` | Enable truncation for long inputs | — |
| `--no-truncation` | Disable truncation | — |
| `--return-documents` | Include document text in results | — |
| `--estimate` | Show estimated tokens and cost without calling the API | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Rerank inline documents

```bash
vai rerank --query "vector search" \
  --documents "MongoDB Atlas supports vector search" \
              "PostgreSQL is a relational database" \
              "Embeddings capture semantic meaning"
```

### Rerank from a file

```bash
vai rerank --query "How do I deploy?" --documents-file candidates.json --top-k 3
```

### Pipe documents from another command

```bash
cat search-results.json | vai rerank --query "deployment best practices"
```

### Use the lite reranker for lower cost

```bash
vai rerank --query "authentication" --documents-file docs.txt --model rerank-2.5-lite
```

### Get JSON output with document text included

```bash
vai rerank --query "scaling" --documents-file docs.json --return-documents --json
```

## Tips

- Reranking is most effective as a second stage after vector search. Use [`vai query`](../rag-pipeline/query) to combine both stages automatically.
- The `--documents-file` accepts JSON arrays, newline-delimited text, or JSONL with a `text` field.
- `rerank-2.5` gives the best quality; `rerank-2.5-lite` is faster and cheaper for high-throughput use cases.

## Related Commands

- [`vai query`](../rag-pipeline/query) — Two-stage retrieval (search + rerank)
- [`vai search`](../data-management/search) — Vector search without reranking
- [`vai embed`](./embed) — Generate embeddings
