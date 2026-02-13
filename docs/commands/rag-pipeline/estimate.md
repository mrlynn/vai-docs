---
title: "vai estimate"
description: "Compare embedding costs across models and strategies"
sidebar_position: 4
---

# vai estimate

Estimate and compare embedding costs across different models and strategies (symmetric vs. asymmetric retrieval).

## Synopsis

```bash
vai estimate [options]
```

## Description

`vai estimate` calculates the total cost of embedding a document corpus and serving queries over time, comparing symmetric strategies (same model for docs and queries) against asymmetric strategies (different models for docs vs. queries).

It uses the Voyage 4 model catalog's pricing to project costs over a configurable time period, helping you choose the most cost-effective model combination.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--docs <n>` | Number of documents (supports K/M/B shorthand) | `100K` |
| `--queries <n>` | Queries per month (supports K/M/B shorthand) | `1M` |
| `--doc-tokens <n>` | Average tokens per document | `500` |
| `--query-tokens <n>` | Average tokens per query | `30` |
| `--doc-model <model>` | Model for document embedding (asymmetric) | `voyage-4-large` |
| `--query-model <model>` | Model for query embedding (asymmetric) | `voyage-4-lite` |
| `--months <n>` | Months to project | `12` |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Default estimate (100K docs, 1M queries/month)

```bash
vai estimate
```

### Large-scale estimate

```bash
vai estimate --docs 10M --queries 50M --months 24
```

### Compare specific model combinations

```bash
vai estimate --doc-model voyage-4 --query-model voyage-4-lite --docs 500K --queries 5M
```

### JSON output for dashboards

```bash
vai estimate --docs 1M --queries 10M --json
```

## Output

Shows a strategy comparison table sorted by total cost:

- **Symmetric strategies**: Same model for both documents and queries (one entry per Voyage 4 model)
- **Asymmetric (recommended)**: Your chosen doc-model + query-model combination
- **Asymmetric with local queries**: Doc-model via API + `voyage-4-nano` for free local queries

Each strategy shows:
- One-time document embedding cost
- Monthly query cost
- Projected total over the specified period
- Savings percentage compared to the most expensive option

## Tips

- Numbers support shorthand: `100K`, `1M`, `10B` — no need to type out zeros.
- Asymmetric retrieval works because all Voyage 4 models share the same embedding space. You can embed documents with `voyage-4-large` for quality and queries with `voyage-4-lite` for cost savings.
- Use `vai explain shared-space` to learn more about how asymmetric retrieval works.
- The `voyage-4-nano` option shows $0 query cost because it runs locally as an open-weight model.

## Related Commands

- [`vai models`](../tools-and-learning/models) — View model pricing and specs
- [`vai embed`](../embeddings/embed) — Embed with `--estimate` for per-call cost
- [`vai pipeline`](./pipeline) — Estimate costs with `--estimate` or `--dry-run`
- [`vai explain`](../tools-and-learning/explain) — Learn about shared embedding spaces
