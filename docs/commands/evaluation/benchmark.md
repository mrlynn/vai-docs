---
title: "vai benchmark"
description: "Run benchmarks for embedding, reranking, and more"
sidebar_position: 3
---

# vai benchmark

Run performance benchmarks for embeddings, reranking, asymmetric retrieval, quantization, cost, batch throughput, and end-to-end pipelines.

## Synopsis

```bash
vai benchmark <type> [options]
```

## Description

`vai benchmark` runs performance tests against the Voyage AI API using built-in sample data (no setup required). It measures latency, throughput, and quality across different models and configurations.

### Benchmark Types

| Type | What It Measures |
|------|-----------------|
| `embed` | Embedding latency across models |
| `rerank` | Reranking latency and score distribution |
| `asymmetric` | Cross-model similarity in the shared embedding space |
| `quantization` | Quality impact of int8/binary output types |
| `cost` | Cost per 1M tokens across models |
| `batch` | Throughput at different batch sizes |
| `space` | Storage size at different dimensions |
| `e2e` | End-to-end pipeline latency |

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<type>` | Benchmark type **(required)** | — |
| `--models <list>` | Comma-separated model list | All Voyage 4 models |
| `--iterations <n>` | Iterations per measurement | Varies by type |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Benchmark embedding latency

```bash
vai benchmark embed
```

### Benchmark specific models

```bash
vai benchmark embed --models voyage-4-large,voyage-4-lite
```

### Asymmetric retrieval benchmark

```bash
vai benchmark asymmetric
```

### Cost comparison

```bash
vai benchmark cost
```

### JSON output for dashboards

```bash
vai benchmark embed --json
```

## Tips

- Benchmarks use built-in sample texts — no database or file setup required.
- Run `vai benchmark asymmetric` to see how well different Voyage 4 models work together in the shared embedding space.
- The `quantization` benchmark shows how int8/binary output types affect similarity scores compared to float.

## Related Commands

- [`vai eval`](./eval) — Evaluate retrieval quality (not just performance)
- [`vai models`](../tools-and-learning/models) — View model specs and pricing
- [`vai estimate`](../rag-pipeline/estimate) — Project costs for your workload
