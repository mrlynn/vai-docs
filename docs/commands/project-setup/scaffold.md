---
title: "vai scaffold"
description: "Create complete starter projects"
sidebar_position: 3
---

# vai scaffold

Create a complete starter project with all files needed for a Voyage AI + MongoDB Atlas Vector Search integration.

## Synopsis

```bash
vai scaffold <name> [options]
```

## Description

`vai scaffold` generates a full project directory with multiple files: client libraries, API routes, configuration, package manifests, and documentation. Unlike `vai generate` (which creates individual files), scaffold creates an entire runnable project.

### Supported Targets

| Target | Creates |
|--------|---------|
| `vanilla` | Node.js project with Express API |
| `nextjs` | Next.js App Router project with search UI |
| `python` | Python Flask project |

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<name>` | Project directory name **(required)** | — |
| `-t, --target <target>` | Target framework: `vanilla`, `nextjs`, `python` | `vanilla` |
| `-m, --model <model>` | Override embedding model | From `.vai.json` |
| `--db <database>` | Override database name | From `.vai.json` |
| `--collection <name>` | Override collection | From `.vai.json` |
| `--field <name>` | Override embedding field | From `.vai.json` |
| `--index <name>` | Override vector index name | From `.vai.json` |
| `-d, --dimensions <n>` | Override dimensions | From `.vai.json` |
| `--no-rerank` | Omit reranking from generated code | — |
| `--rerank-model <model>` | Rerank model to use | — |
| `--force` | Overwrite existing directory | — |
| `--json` | Output file manifest as JSON (no file creation) | — |
| `--dry-run` | Show what would be created | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Create a Node.js project

```bash
vai scaffold my-search-app
```

### Create a Next.js project

```bash
vai scaffold my-search-ui --target nextjs
```

### Create a Python project

```bash
vai scaffold my-api --target python
```

### Preview the file manifest

```bash
vai scaffold my-app --dry-run
```

## Tips

- Generated code uses your `.vai.json` settings (model, db, collection) so it's ready to run.
- The scaffold includes a README with setup instructions specific to the target framework.
- Use `--force` to overwrite an existing directory.

## Related Commands

- [`vai generate`](./generate) — Generate individual code files
- [`vai init`](./init) — Initialize project config before scaffolding
