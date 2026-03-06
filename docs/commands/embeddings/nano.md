---
title: "vai nano"
description: "Set up and manage local voyage-4-nano inference"
sidebar_position: 1
---

# vai nano

Set up and manage local `voyage-4-nano` inference in vai.

## Synopsis

```bash
vai nano <subcommand>
```

## Description

`vai nano` is the control surface for local inference in `vai v1.31.0`. It manages the Python environment, model download, readiness checks, and cache lifecycle for `voyage-4-nano`.

This command is the entry point for the local-first workflow:

```bash
vai nano setup
vai embed "What is vector search?" --local
```

## Subcommands

| Subcommand | Description |
|-----------|-------------|
| `setup` | Install dependencies, create the local environment, and download the model |
| `status` | Show whether local inference is ready |
| `test` | Run a smoke test against the local model |
| `info` | Show model, cache, and environment details |
| `clear-cache` | Remove cached model files |

## Examples

### Set up local inference

```bash
vai nano setup
```

### Check readiness

```bash
vai nano status
```

### Smoke test the local model

```bash
vai nano test
```

### Show environment details

```bash
vai nano info
```

### Clear cached model files

```bash
vai nano clear-cache
```

## Notes

- `vai nano setup` is the one-time setup step for local `voyage-4-nano` inference
- local inference uses a lightweight Python bridge, so Python `3.9+` is required
- once setup is complete, use `--local` on supported commands such as `vai embed` and `vai pipeline`

## Related Commands

- [`vai embed`](./embed)
- [`vai pipeline`](../rag-pipeline/pipeline)
- [Local Inference Overview](/docs/guides/local-inference/overview)
- [Local Inference Setup and Usage](/docs/guides/local-inference/setup-and-usage)
