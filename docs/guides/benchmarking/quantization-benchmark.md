---
title: Quantization Benchmark
description: Measure quality impact of int8 and binary output types
sidebar_position: 5
---

# Quantization Benchmark

Measure how int8 and binary quantization affect embedding quality compared to float.

## Run

```bash
vai benchmark quantization
```

## What It Measures

- Embeds sample texts with `float`, `int8`, and `binary` output types
- Computes cosine similarity between float and quantized embeddings
- Shows the quality degradation for each quantization level

## Expected Results

- **int8**: Very high correlation with float (~0.99+). Minimal quality loss.
- **binary**: Lower correlation (~0.90-0.95). More quality loss but 32× smaller storage.

## When to Use Quantization

| Scenario | Recommended |
|----------|-------------|
| Standard production | `float` (default) |
| Large corpus, storage-sensitive | `int8` (4× smaller, minimal loss) |
| Coarse first-pass filter | `binary` (32× smaller, rerank with float) |

## Further Reading

- [Quantization](/docs/core-concepts/quantization) — Concept explanation
- [`vai embed --output-dtype`](/docs/commands/embeddings/embed) — Using quantized output
