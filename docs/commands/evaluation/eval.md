---
title: "vai eval"
description: "Evaluate retrieval quality with standard metrics"
sidebar_position: 1
---

# vai eval

Evaluate retrieval quality by running queries against your collection and computing standard IR metrics: MRR, nDCG, Recall, MAP, and Precision.

## Synopsis

```bash
vai eval [options]
```

## Description

`vai eval` takes a test set of queries with known relevant documents, runs each query through your retrieval pipeline (vector search + optional reranking), and computes information retrieval metrics to measure quality.

Metrics computed:
- **MRR** (Mean Reciprocal Rank) — How high is the first relevant result?
- **nDCG** (Normalized Discounted Cumulative Gain) — How well are relevant results ranked?
- **Recall@K** — What fraction of relevant documents are retrieved?
- **MAP** (Mean Average Precision) — Overall precision across recall levels
- **Precision@K** — Fraction of top-K results that are relevant

Results can be saved to a file and compared against a baseline.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--test-set <path>` | Path to test set file (JSON) | — |
| `--db <database>` | Database name | From `.vai.json` |
| `--collection <name>` | Collection name | From `.vai.json` |
| `-m, --model <model>` | Embedding model | From `.vai.json` |
| `-k, --top-k <n>` | Results to evaluate | `5` |
| `--rerank` | Enable reranking | — |
| `--rerank-model <model>` | Reranking model | `rerank-2.5` |
| `-o, --output <path>` | Save results to file | — |
| `--baseline <path>` | Compare against baseline results file | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Run evaluation

```bash
vai eval --test-set test-queries.json --db myapp --collection docs
```

### Evaluate with reranking and save results

```bash
vai eval --test-set queries.json --rerank --output results-v1.json
```

### Compare against a baseline

```bash
vai eval --test-set queries.json --model voyage-4-large --baseline results-v1.json
```

## Test Set Format

```json
[
  {
    "query": "How do I configure authentication?",
    "relevant": ["doc_id_1", "doc_id_2"]
  },
  {
    "query": "What are replica sets?",
    "relevant": ["doc_id_3"]
  }
]
```

## Tips

- Start with a small test set (10-20 queries) to iterate quickly, then expand.
- Save results with `--output` to track quality over time as you change models or settings.
- The `--baseline` flag shows deltas and highlights regressions — useful for CI pipelines.

## Related Commands

- [`vai eval compare`](./eval-compare) — Compare multiple evaluation runs
- [`vai benchmark`](./benchmark) — Benchmark embedding/reranking performance
- [`vai query`](../rag-pipeline/query) — Run individual queries
