---
title: "vai init"
description: "Initialize a project with .vai.json config"
sidebar_position: 1
---

# vai init

Create a `.vai.json` project configuration file with an interactive wizard or default values.

## Synopsis

```bash
vai init [options]
```

## Description

`vai init` creates a `.vai.json` file in the current directory that stores project-level defaults for model, database, collection, embedding field, dimensions, index name, and chunking settings. Once initialized, other vai commands automatically use these settings without requiring CLI flags.

In interactive mode (default), a step-by-step wizard guides you through configuration. Use `--yes` to accept all defaults non-interactively.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `-y, --yes` | Accept all defaults (non-interactive) | — |
| `--force` | Overwrite existing `.vai.json` | — |
| `--json` | Output created config as JSON (non-interactive) | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Interactive setup

```bash
vai init
```

### Quick setup with defaults

```bash
vai init --yes
```

### Overwrite existing config

```bash
vai init --force
```

## Default Configuration

```json
{
  "model": "voyage-4-large",
  "db": "vai",
  "collection": "embeddings",
  "field": "embedding",
  "inputType": "document",
  "dimensions": 1024,
  "index": "vector_index",
  "chunk": {
    "strategy": "recursive",
    "size": 512,
    "overlap": 50
  }
}
```

## Tips

- Run `vai init` at the root of your project. All vai commands in subdirectories will find and use the nearest `.vai.json`.
- After init, you can run `vai pipeline ./docs/` without specifying `--db`, `--collection`, or `--model`.
- Edit `.vai.json` directly for advanced settings like chat configuration.

## Related Commands

- [`vai config`](../tools-and-learning/config) — Global config (`~/.vai/config.json`)
- [`vai pipeline`](../rag-pipeline/pipeline) — Uses `.vai.json` settings automatically
