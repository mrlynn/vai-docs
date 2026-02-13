---
title: Evaluation Overview
description: Measure and improve retrieval quality
sidebar_position: 1
---

# Evaluation Guide

vai's evaluation tools help you measure retrieval quality, compare configurations, and track improvements over time.

## Quick Start

```bash
# Run evaluation against a test set
vai eval --test-set queries.json --db myapp --collection docs

# Save results for comparison
vai eval --test-set queries.json --rerank --output results-v1.json

# Compare configurations
vai eval compare results-v1.json results-v2.json
```

## Metrics

| Metric | What It Measures | Range |
|--------|-----------------|-------|
| **MRR** | How high is the first relevant result? | 0–1 |
| **nDCG@K** | How well are relevant results ranked? | 0–1 |
| **Recall@K** | What fraction of relevant docs are found? | 0–1 |
| **MAP** | Overall precision across recall levels | 0–1 |
| **Precision@K** | Fraction of top-K that are relevant | 0–1 |

Higher is better for all metrics.

## Workflow

1. **Create a test set** with queries and known relevant documents
2. **Run baseline evaluation** and save results
3. **Change configuration** (model, chunk size, reranking, etc.)
4. **Re-evaluate** and compare against baseline
5. **Iterate** until quality meets your requirements

## Next Steps

- [Test Sets](./test-sets) — Creating evaluation test sets
- [Comparing Configs](./comparing-configs) — Side-by-side comparison
