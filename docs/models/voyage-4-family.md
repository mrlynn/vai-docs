---
title: Voyage 4 Family
description: Deep dive into voyage-4-large, voyage-4, voyage-4-lite, and voyage-4-nano
sidebar_position: 3
---

# Voyage 4 Family

The Voyage 4 family is Voyage AI's latest generation of embedding models, released in January 2026. All models share the same embedding space and support flexible dimensions.

## Model Comparison

| Model | Architecture | RTEB Score | Price/1M tokens | Best For |
|-------|-------------|------------|-----------------|----------|
| `voyage-4-large` | MoE | 71.41 | $0.12 | Best quality, production search |
| `voyage-4` | Dense | 70.07 | $0.06 | Balanced quality and cost |
| `voyage-4-lite` | Dense | 68.10 | $0.02 | High-volume, cost-sensitive |
| `voyage-4-nano` | Dense | TBD | Free (open-weight) | Edge, local, offline |

## Key Features

### Shared Embedding Space

All Voyage 4 models produce vectors in the same semantic space. You can:
- Embed documents with `voyage-4-lite` and query with `voyage-4-large`
- Mix models across different parts of your pipeline
- Upgrade models without re-embedding your entire corpus (within the family)

### Flexible Dimensions (Matryoshka)

All models support: **256**, **512**, **1024** (default), **2048**

Matryoshka representation learning means embeddings are structured so that the first N dimensions carry the most information. You can truncate to fewer dimensions without retraining — trading some accuracy for smaller storage and faster search.

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
# Compare all Voyage 4 models
vai benchmark embed --models voyage-4-large,voyage-4,voyage-4-lite

# Test the shared embedding space
vai benchmark asymmetric

# Compare costs
vai estimate --doc-model voyage-4-lite --query-model voyage-4-large
```
