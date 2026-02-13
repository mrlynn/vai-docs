---
title: Quantization
description: Reducing embedding size with int8 and binary representations
sidebar_position: 9
---

# Quantization

Quantization reduces the storage size of embeddings by converting 32-bit floats to smaller data types like `int8` (8-bit integers) or `binary` (1-bit). This trades a small amount of accuracy for significant storage and memory savings.

## Size Comparison

| Output Type | Bits per Dimension | 1024-dim Vector Size | Relative Size |
|-------------|-------------------|---------------------|---------------|
| `float` | 32 | 4,096 bytes | 100% |
| `int8` | 8 | 1,024 bytes | 25% |
| `uint8` | 8 | 1,024 bytes | 25% |
| `binary` | 1 | 128 bytes | 3.1% |
| `ubinary` | 1 | 128 bytes | 3.1% |

## When to Use Quantization

- **Large corpora** (millions of documents) where storage costs matter
- **Edge deployment** with limited memory
- **Fast approximate search** as a first-pass filter before float-precision reranking

## Quality Impact

Quantization reduces precision but the impact is often small:

- **int8**: Minimal quality loss (~1-2% on retrieval benchmarks). Good default for production.
- **binary**: Larger quality loss (~5-10%) but 32× smaller. Best as a coarse filter with float reranking.

```bash
# Benchmark the impact yourself
vai benchmark quantization
```

## Using Quantization in vai

```bash
# Generate int8 embeddings
vai embed "hello world" --output-dtype int8

# Generate binary embeddings
vai embed "hello world" --output-dtype binary

# Store with quantized embeddings
vai store --text "..." --db myapp --collection docs --output-dtype int8
```

## Further Reading

- [Embeddings](./embeddings) — Embedding fundamentals
- [`vai benchmark`](/docs/commands/evaluation/benchmark) — Measure quantization impact
