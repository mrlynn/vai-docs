---
title: Comparing Configs
description: A/B test retrieval configurations
sidebar_position: 3
---

# Comparing Configurations

Use `vai eval` to A/B test different retrieval configurations and find the best setup for your use case.

## Workflow

### 1. Run Baseline

```bash
vai eval --test-set queries.json --db myapp --collection docs \
  --model voyage-4-lite --output baseline.json
```

### 2. Run Variant

```bash
vai eval --test-set queries.json --db myapp --collection docs \
  --model voyage-4-large --rerank --output with-rerank.json
```

### 3. Compare

```bash
vai eval compare baseline.json with-rerank.json
```

## What to Compare

| Variable | How to Test |
|----------|-------------|
| **Model** | Run with `--model voyage-4-lite` vs. `--model voyage-4-large` |
| **Reranking** | Run with and without `--rerank` |
| **Rerank model** | `--rerank-model rerank-2.5` vs. `--rerank-model rerank-2.5-lite` |
| **Top-K** | Different `--top-k` values |
| **Chunk size** | Re-ingest with different chunk sizes, then evaluate |
| **Dimensions** | Re-embed with different `--dimensions`, then evaluate |

## Reading Comparison Output

The comparison shows each metric side by side with:
- **Current value** for each configuration
- **Delta** (difference)
- **Direction indicator** (improved ↑ / regressed ↓)

## CI Integration

```bash
# Fail CI if quality regresses
vai eval --test-set queries.json --baseline baseline.json --json \
  | jq '.deltas | to_entries[] | select(.value.regressed) | .key'
```

## Further Reading

- [Test Sets](./test-sets) — Creating evaluation data
- [`vai eval`](/docs/commands/evaluation/eval) — Command reference
