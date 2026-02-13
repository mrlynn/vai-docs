---
title: "vai workflow run"
description: "Execute a workflow definition"
sidebar_position: 2
---

# vai workflow run

Execute a workflow file — a composable, multi-step RAG pipeline defined as JSON.

## Synopsis

```bash
vai workflow run <file> [options]
```

## Description

`vai workflow run` loads a workflow definition (JSON file or built-in template name), validates it, and executes each step in dependency order. Steps can include chunking, embedding, storing, searching, reranking, and custom operations.

Workflows support parallel execution of independent steps and template expressions for passing data between steps.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<file>` | Workflow file path or built-in template name **(required)** | — |
| `--input <key=value>` | Set a workflow input (repeatable) | — |
| `--db <name>` | Override default database | — |
| `--collection <name>` | Override default collection | — |
| `--json` | Output results as JSON | — |
| `--quiet` | Suppress progress output | — |
| `--dry-run` | Show execution plan without running | — |
| `--verbose` | Show step details | — |

## Examples

### Run a built-in workflow

```bash
vai workflow run ingest-and-index --input path=./docs --input db=myapp
```

### Run a custom workflow file

```bash
vai workflow run my-pipeline.json --input query="How does auth work?"
```

### Dry run to see execution plan

```bash
vai workflow run my-pipeline.json --dry-run
```

### Override database

```bash
vai workflow run ingest-and-index --db staging --collection test-docs
```

## Tips

- Use `vai workflow list` to see available built-in templates.
- Use `vai workflow validate` to check syntax before running.
- Use `vai workflow init` to scaffold a new workflow file.
- The `--dry-run` flag shows the execution plan (step order, dependencies, parallelism) without executing anything.

## Related Commands

- [`vai workflow validate`](./workflow-validate) — Validate workflow syntax
- [`vai workflow list`](./workflow-list) — List built-in templates
- [`vai workflow init`](./workflow-init) — Scaffold a new workflow
- [Workflow Guide](/docs/guides/workflows/overview) — Writing custom workflows
