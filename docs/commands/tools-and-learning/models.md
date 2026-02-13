---
title: "vai models"
description: "List available models with pricing and benchmarks"
sidebar_position: 1
---

# vai models

List all available Voyage AI models with architecture details, pricing, dimensions, and benchmark scores.

## Synopsis

```bash
vai models [options]
```

## Description

`vai models` displays the full Voyage AI model catalog, including embedding models, reranking models, multimodal models, and domain-specific models. By default, it shows only current models; use `--all` to include legacy models.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --type <type>` | Filter by type: `embedding`, `reranking`, or `all` | `all` |
| `-a, --all` | Show all models including legacy | — |
| `-w, --wide` | Wide output (all columns untruncated) | — |
| `-b, --benchmarks` | Show RTEB benchmark scores | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### List all current models

```bash
vai models
```

### Show only embedding models with benchmarks

```bash
vai models --type embedding --benchmarks
```

### Include legacy models

```bash
vai models --all
```

### JSON output for scripting

```bash
vai models --json | jq '.[].name'
```

## Current Models

| Model | Type | Context | Dimensions | Price | Best For |
|-------|------|---------|------------|-------|----------|
| `voyage-4-large` | Embedding | 32K | 1024* | $0.12/1M | Best quality, MoE |
| `voyage-4` | Embedding | 32K | 1024* | $0.06/1M | Balanced |
| `voyage-4-lite` | Embedding | 32K | 1024* | $0.02/1M | Lowest cost |
| `voyage-code-3` | Embedding | 32K | 1024* | $0.18/1M | Code retrieval |
| `voyage-finance-2` | Embedding | 32K | 1024 | $0.12/1M | Finance |
| `voyage-law-2` | Embedding | 16K | 1024 | $0.12/1M | Legal |
| `voyage-multimodal-3.5` | Multimodal | 32K | 1024* | $0.12/M + $0.60/B px | Text + images |
| `rerank-2.5` | Reranking | 32K | — | $0.05/1M | Best quality reranking |
| `rerank-2.5-lite` | Reranking | 32K | — | $0.02/1M | Fast reranking |

\* Supports flexible dimensions: 256, 512, 1024 (default), 2048

## Related Commands

- [`vai explain`](./explain) — Learn about model architectures and embedding concepts
- [`vai estimate`](../rag-pipeline/estimate) — Compare model costs for your workload
- [`vai embed`](../embeddings/embed) — Generate embeddings with a specific model
