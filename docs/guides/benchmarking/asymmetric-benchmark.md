---
title: Asymmetric Benchmark
description: Test cross-model similarity in the shared embedding space
sidebar_position: 4
---

# Asymmetric Benchmark

Validate that Voyage 4 models produce compatible embeddings by measuring cross-model similarity.

## Run

```bash
vai benchmark asymmetric
```

## What It Measures

- Embeds the same texts with different Voyage 4 models
- Computes cosine similarity between embeddings from different models
- Shows how well the shared embedding space works in practice

## Expected Results

Embeddings from different Voyage 4 models should have high cosine similarity (typically 0.95+) for the same input text. This confirms that asymmetric retrieval — embedding documents with one model and queries with another — works reliably.

## Why It Matters

If cross-model similarity is high, you can safely:
- Embed documents with `voyage-4-lite` ($0.02/1M) for cost savings
- Embed queries with `voyage-4-large` ($0.12/1M) for quality
- Mix and match without re-embedding your corpus

## Further Reading

- [Shared Embedding Space](/docs/core-concepts/shared-embedding-space) — How it works
- [`vai estimate`](/docs/commands/rag-pipeline/estimate) — Cost savings calculator
