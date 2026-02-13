---
title: "vai eval compare"
description: "Compare evaluation results across configurations"
sidebar_position: 2
---

# vai eval compare

Compare evaluation results from multiple `vai eval` runs side by side, highlighting improvements and regressions.

## Synopsis

```bash
vai eval compare <files...> [options]
```

## Description

`vai eval compare` loads multiple evaluation result files (created by `vai eval --output`) and presents them in a comparison table. Each metric shows the value for each configuration, making it easy to see which model/settings combination performs best.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<files...>` | Two or more evaluation result files **(required)** | — |
| `--json` | Machine-readable JSON output | — |

## Examples

### Compare two configurations

```bash
vai eval compare results-lite.json results-large.json
```

### Compare with and without reranking

```bash
vai eval compare no-rerank.json with-rerank.json
```

## Tips

- Label your result files clearly (e.g., `voyage-4-lite-no-rerank.json`) so comparisons are easy to read.
- Use this in CI to detect quality regressions when changing models or chunk settings.

## Related Commands

- [`vai eval`](./eval) — Run evaluations and save results
- [`vai benchmark`](./benchmark) — Performance benchmarking
