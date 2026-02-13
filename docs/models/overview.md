---
title: Models Overview
description: Complete guide to Voyage AI models available in vai
sidebar_position: 1
---

# Voyage AI Models

vai supports the full range of Voyage AI embedding, reranking, and multimodal models. This page provides a complete reference.

## Current Embedding Models

| Model | Architecture | Context | Dimensions | Price/1M tokens | RTEB Score |
|-------|-------------|---------|------------|-----------------|------------|
| `voyage-4-large` | MoE | 32K | 256, 512, **1024**, 2048 | $0.12 | 71.41 |
| `voyage-4` | Dense | 32K | 256, 512, **1024**, 2048 | $0.06 | 70.07 |
| `voyage-4-lite` | Dense | 32K | 256, 512, **1024**, 2048 | $0.02 | 68.10 |

**Bold** = default dimensions. All Voyage 4 models support flexible dimensions via Matryoshka representation learning.

### Shared Embedding Space

All Voyage 4 models share the same embedding space, enabling [asymmetric retrieval](../core-concepts/shared-embedding-space) — embed documents cheaply, queries with the best model.

## Domain-Specific Models

| Model | Context | Dimensions | Price/1M tokens | Domain |
|-------|---------|------------|-----------------|--------|
| `voyage-code-3` | 32K | 256, 512, **1024**, 2048 | $0.18 | Code retrieval |
| `voyage-finance-2` | 32K | 1024 | $0.12 | Financial documents |
| `voyage-law-2` | 16K | 1024 | $0.12 | Legal documents |

## Multimodal Model

| Model | Context | Dimensions | Price | Modalities |
|-------|---------|------------|-------|------------|
| `voyage-multimodal-3.5` | 32K | 256, 512, **1024**, 2048 | $0.12/M tokens + $0.60/B pixels | Text, images, video |

## Reranking Models

| Model | Context | Price/1M tokens | Best For |
|-------|---------|-----------------|----------|
| `rerank-2.5` | 32K | $0.05 | Best quality reranking |
| `rerank-2.5-lite` | 32K | $0.02 | Fast, cost-effective |

## Upcoming Models

| Model | Type | Notes |
|-------|------|-------|
| `voyage-4-nano` | Embedding | Open-weight, free, runs locally. 512d default. |
| `voyage-context-3` | Embedding | Contextualized chunk embeddings |

## Legacy Models

Use `vai models --all` to see legacy models. These include `voyage-3-large`, `voyage-3.5`, `voyage-3.5-lite`, `voyage-code-2`, `voyage-multimodal-3`, `rerank-2`, and `rerank-2-lite`.

## Competitive Landscape (RTEB Benchmarks)

| Model | Provider | NDCG@10 Score |
|-------|----------|---------------|
| voyage-4-large | Voyage AI | **71.41** |
| voyage-4 | Voyage AI | 70.07 |
| Gemini Embedding 001 | Google | 68.66 |
| voyage-4-lite | Voyage AI | 68.10 |
| Cohere Embed v4 | Cohere | 65.75 |
| OpenAI v3 Large | OpenAI | 62.57 |

## Browse Models in vai

```bash
# List all current models
vai models

# Show benchmarks
vai models --benchmarks

# Include legacy models
vai models --all

# JSON output
vai models --json
```

## Further Reading

- [Choosing a Model](./choosing-a-model) — Decision guide
- [Voyage 4 Family](./voyage-4-family) — Deep dive into the Voyage 4 lineup
- [Domain-Specific Models](./domain-specific) — When to use specialized models
