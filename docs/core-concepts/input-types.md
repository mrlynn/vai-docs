---
title: Input Types
description: Query vs. document input types for asymmetric retrieval
sidebar_position: 6
---

# Input Types

Voyage AI embedding models accept an `input_type` parameter that optimizes how text is embedded. The two types — `query` and `document` — enable **asymmetric retrieval**, where short queries find long documents effectively.

## Why Input Types Matter

Queries and documents are fundamentally different:
- **Queries** are short, often questions: "How do I scale MongoDB?"
- **Documents** are long, informational passages that contain the answer

The model prepends different internal prompts for each type, adjusting the embedding to work better for retrieval. Using the wrong input type (or none) reduces search quality.

## When to Use Each

| Input Type | Use For | vai Commands |
|------------|---------|-------------|
| `query` | Search queries, questions | `vai search`, `vai query`, `vai embed --input-type query` |
| `document` | Corpus text being stored | `vai store`, `vai ingest`, `vai pipeline`, `vai embed --input-type document` |
| *(omit)* | Direct comparison (similarity) | `vai similarity` |

## vai Defaults

Most vai commands set the input type automatically:
- `vai search` uses `query` for the search text
- `vai store`, `vai ingest`, `vai pipeline` use `document` for stored text
- `vai similarity` omits input type (comparing texts directly)
- `vai embed` shows a tip if you don't specify one

```bash
# Explicit input types
vai embed "What is sharding?" --input-type query
vai embed --file chapter.txt --input-type document
```

## Further Reading

- [Embeddings](./embeddings) — How embeddings work
- [Shared Embedding Space](./shared-embedding-space) — Cross-model compatibility
