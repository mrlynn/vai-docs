---
title: "vai explain"
description: "Interactive explainer for 30+ embedding and RAG topics"
sidebar_position: 2
---

# vai explain

Learn about embeddings, reranking, RAG, vector search, and more — right from your terminal. Covers 30+ topics with explanations, key points, try-it commands, and links to further reading.

## Synopsis

```bash
vai explain [topic]
```

## Description

`vai explain` is an interactive learning tool built into vai. Run it without arguments to see all available topics, or pass a topic name to get a detailed explanation.

Each explanation includes:
- Clear, formatted content explaining the concept
- Practical "Try it" commands you can run immediately
- Links to official documentation

Topic names support fuzzy matching — you don't need to type the exact key.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `[topic]` | Topic to explain (optional — lists all if omitted) | — |
| `--json` | Machine-readable JSON output | — |

## Examples

### List all topics

```bash
vai explain
```

### Learn about embeddings

```bash
vai explain embeddings
```

### Learn about reranking

```bash
vai explain reranking
```

### Learn about shared embedding spaces

```bash
vai explain shared-space
```

### JSON output

```bash
vai explain embeddings --json
```

## Available Topics

Topics include (non-exhaustive):

- `embeddings` — What are vector embeddings?
- `reranking` — Two-stage retrieval with rerankers
- `shared-space` — Asymmetric retrieval across Voyage 4 models
- `cosine-similarity` — How similarity scoring works
- `input-types` — Query vs. document input types
- `quantization` — Reducing embedding size with int8/binary
- `rag` — Retrieval-augmented generation
- `vector-search` — How ANN search works
- `moe` — Mixture of Experts architecture
- `matryoshka` — Flexible dimensions via Matryoshka learning
- `chunking` — Document chunking strategies
- `two-stage` — The two-stage retrieval pattern

Run `vai explain` to see the full list with summaries.

## Related Commands

- [`vai models`](./models) — See available models
- [`vai demo`](./demo) — Interactive walkthrough of vai features
