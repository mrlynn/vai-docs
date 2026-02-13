---
title: Embedding Benchmark
description: Measure embedding latency across models
sidebar_position: 2
---

# Embedding Benchmark

Measure embedding latency, throughput, and dimensions across Voyage AI models.

## Run

```bash
vai benchmark embed
```

## What It Measures

- **Latency** per embedding call (p50, p95, p99)
- **Throughput** (tokens per second)
- **Output dimensions** per model
- **Comparison** across multiple models

## Customize

```bash
# Test specific models
vai benchmark embed --models voyage-4-large,voyage-4-lite

# More iterations for reliable results
vai benchmark embed --iterations 10

# JSON output
vai benchmark embed --json
```

## Sample Output

The benchmark uses built-in sample texts (10 documents about common tech topics) so you don't need any setup. Results show a formatted table comparing each model's performance.

## Tips

- Run benchmarks multiple times — API latency varies with server load
- Network latency dominates for single-text embeds; batch throughput is a better measure of model speed
- Use `--json` to track performance over time
