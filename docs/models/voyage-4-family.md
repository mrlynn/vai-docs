---
title: Voyage 4 Family
description: Deep dive into voyage-4-large, voyage-4, voyage-4-lite, and voyage-4-nano
sidebar_position: 3
---

# Voyage 4 Family

The Voyage 4 family is Voyage AI's latest generation of embedding models, released in January 2026. All models share the same embedding space and support flexible dimensions. In `vai v1.31.0`, that family now includes a first-class local path through `voyage-4-nano`.

## Model Comparison

| Model | Architecture | RTEB Score | Price/1M tokens | Availability | Best For |
|-------|-------------|------------|-----------------|-------------|----------|
| `voyage-4-large` | MoE | 71.41 | $0.12 | Voyage AI API | Best quality, production search |
| `voyage-4` | Dense | 70.07 | $0.06 | Voyage AI API | Balanced quality and cost |
| `voyage-4-lite` | Dense | 68.10 | $0.02 | Voyage AI API | High-volume, cost-sensitive |
| `voyage-4-nano` | Dense | TBD | Free (open-weight) | Local inference in `vai` | Local development, zero-cost experimentation, offline-friendly workflows |

## Key Features

### Shared Embedding Space

All Voyage 4 models produce vectors in the same semantic space. You can:

- Embed documents with `voyage-4-lite` and query with `voyage-4-large`
- Index locally with `voyage-4-nano`, then query the same collection later with an API-backed Voyage 4 model
- Mix models across different parts of your pipeline
- Upgrade models without re-embedding your entire corpus (within the family)

### Local Inference with Nano

`voyage-4-nano` is the open-weight member of the Voyage 4 family. In `vai`, it runs locally through a lightweight Python bridge that manages the model environment and inference process while keeping the CLI experience intact.

This gives you a new onboarding path:

- install `vai`
- run `vai nano setup`
- embed locally with `vai embed --local`
- move to API-backed models later when you need hosted scale or production throughput

Unlike the API-backed models, nano does not require a Voyage API key for local embedding. It is the fastest way to try `vai` end to end.

### Flexible Dimensions (Matryoshka)

The Voyage 4 family supports: **256**, **512**, **1024** (default), **2048**

Matryoshka representation learning means embeddings are structured so that the first N dimensions carry the most information. You can truncate to fewer dimensions without retraining, trading some accuracy for smaller storage and faster search.

### 32K Context Window

All Voyage 4 models support up to 32K tokens of input context, suitable for long documents without truncation.

## Architecture Details

**voyage-4-large** uses a **Mixture of Experts (MoE)** architecture with multiple specialized sub-networks. A gating mechanism routes inputs to the most relevant experts, giving the model broad expertise without proportionally increasing compute cost.

**voyage-4**, **voyage-4-lite**, and **voyage-4-nano** use traditional **dense** architectures where all parameters are activated for every input.

## RTEB Benchmark Context

The RTEB (Retrieval Text Embedding Benchmark) scores represent NDCG@10 averaged across 29 retrieval datasets. For context:

| Model | Score | vs. voyage-4-large |
|-------|-------|-------------------|
| voyage-4-large | 71.41 | — |
| voyage-4 | 70.07 | -1.34 |
| Gemini Embedding 001 | 68.66 | -2.75 |
| voyage-4-lite | 68.10 | -3.31 |
| Cohere Embed v4 | 65.75 | -5.66 |
| OpenAI v3 Large | 62.57 | -8.84 |

## Try It

```bash
# Set up local inference
vai nano setup

# Embed locally with nano
vai embed "What is vector search?" --local

# Build a local-first pipeline
vai pipeline ./docs/ --local --db myapp --collection knowledge --create-index

# Compare API-backed costs across the family
vai estimate --doc-model voyage-4-lite --query-model voyage-4-large
```
