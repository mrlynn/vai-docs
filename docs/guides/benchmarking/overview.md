---
title: Benchmarking Overview
description: Benchmark embedding and reranking performance
sidebar_position: 1
---

# Benchmarking Guide

vai includes a comprehensive benchmarking suite that measures embedding performance, reranking quality, cross-model compatibility, quantization impact, and cost across different configurations.

## Quick Start

```bash
# Embedding latency benchmark
vai benchmark embed

# Reranking benchmark
vai benchmark rerank

# Cross-model similarity (shared embedding space)
vai benchmark asymmetric

# Cost comparison
vai benchmark cost
```

No setup required — all benchmarks use built-in sample data.

## Available Benchmarks

| Type | What It Measures | When to Use |
|------|-----------------|-------------|
| [`embed`](./embed-benchmark) | Latency per model | Choosing a model for latency-sensitive apps |
| [`cost`](./cost-benchmark) | Cost per 1M tokens | Budget planning |
| [`asymmetric`](./asymmetric-benchmark) | Cross-model similarity | Validating shared embedding space |
| [`quantization`](./quantization-benchmark) | Quality impact of int8/binary | Deciding on output types |

## Interpreting Results

Benchmarks show tables with latency (p50, p95, p99), throughput, and quality metrics. Use `--json` for machine-readable output that you can feed into dashboards or CI pipelines.

```bash
vai benchmark embed --json > benchmark-results.json
```

## Further Reading

- [Embedding Benchmark](./embed-benchmark) — Latency details
- [Cost Benchmark](./cost-benchmark) — Cost comparison
- [Asymmetric Benchmark](./asymmetric-benchmark) — Cross-model tests
- [Quantization Benchmark](./quantization-benchmark) — Output type impact
