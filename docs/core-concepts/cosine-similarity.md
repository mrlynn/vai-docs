---
title: Cosine Similarity
description: How similarity between vectors is measured
sidebar_position: 5
---

# Cosine Similarity

Cosine similarity measures the angle between two vectors, ignoring their magnitude. It's the default similarity metric for text embeddings and ranges from -1 (opposite) to 1 (identical), though normalized embeddings typically produce scores between 0 and 1.

## The Math

```
cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)
```

Where `A · B` is the dot product and `||A||` is the vector magnitude (L2 norm). In practice, most embedding models produce unit-normalized vectors, so cosine similarity simplifies to just the dot product.

## Interpreting Scores

| Score Range | Meaning |
|-------------|---------|
| 0.90 – 1.00 | Nearly identical meaning |
| 0.75 – 0.90 | Strongly related |
| 0.50 – 0.75 | Somewhat related |
| 0.25 – 0.50 | Loosely related |
| 0.00 – 0.25 | Unrelated |

These ranges are approximate — actual thresholds depend on the model and domain. Use `vai similarity` to develop intuition for your specific use case.

## Why Cosine Over Euclidean?

Cosine similarity measures **direction** (what the text means), while Euclidean distance measures **position** (including magnitude). For text embeddings, direction is what matters — a longer document and a shorter document about the same topic should be considered similar, even if their vector magnitudes differ.

## Try It with vai

```bash
# Compare two texts
vai similarity "king" "queen"
# → High similarity (~0.85)

vai similarity "king" "database"
# → Low similarity (~0.30)

# One-vs-many comparison
vai similarity "machine learning" \
  --against "neural networks" "cooking recipes" "deep learning models"
```

## Further Reading

- [Embeddings](./embeddings) — What vectors represent
- [Vector Search](./vector-search) — Using similarity for retrieval
