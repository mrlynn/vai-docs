---
title: Cost Benchmark
description: Compare embedding costs across models
sidebar_position: 3
---

# Cost Benchmark

Compare the cost per million tokens across all Voyage AI models.

## Run

```bash
vai benchmark cost
```

## What It Shows

- Price per 1M tokens for each model
- Cost to embed the sample corpus
- Relative cost comparison

## For Detailed Cost Projections

Use `vai estimate` for workload-specific projections:

```bash
vai estimate --docs 1M --queries 10M --months 12
```

This compares symmetric vs. asymmetric strategies with your actual document and query volumes.

## Further Reading

- [`vai estimate`](/docs/commands/rag-pipeline/estimate) — Detailed cost projections
- [Models Overview](/docs/models/overview) — Full pricing table
