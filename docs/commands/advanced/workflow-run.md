---
title: "vai workflow run"
description: "Execute a workflow definition"
sidebar_position: 2
---

# vai workflow run

Execute a workflow file, built-in template, or community workflow package.

## Synopsis

```bash
vai workflow run <name> [options]
```

## Description

`vai workflow run` loads a workflow definition, validates it, and executes each step in dependency order. Steps can include chunking, embedding, storing, searching, reranking, and custom operations. Independent steps run in parallel automatically.

The `<name>` argument can be a local file path, a built-in template name, or a community workflow package name. vai resolves the name in this order:

| Priority | Source | Example |
|----------|--------|---------|
| 1 | Local file path | `./my-workflow.json` |
| 2 | Built-in template | `cost-analysis` |
| 3 | Community package (project) | `vai-workflow-legal-research` |
| 4 | Community package (global) | Same name, globally installed |

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<name>` | Workflow file path, template name, or package name **(required)** | — |
| `--input <key=value>` | Set a workflow input (repeatable) | — |
| `--db <name>` | Override default database | — |
| `--collection <name>` | Override default collection | — |
| `--json` | Output results as JSON | — |
| `--quiet` | Suppress progress output | — |
| `--dry-run` | Show execution plan without running | — |
| `--verbose` | Show step details | — |
| `--built-in` | Force resolution to built-in templates only | — |

## Examples

### Run a built-in workflow

```bash
vai workflow run ingest-and-index --input path=./docs --input db=myapp
```

### Run a custom workflow file

```bash
vai workflow run my-pipeline.json --input query="How does auth work?"
```

### Run a community workflow

```bash
vai workflow run vai-workflow-legal-research \
  --input query="What are the liability implications of AI-generated content?" \
  --input jurisdiction=EU
```

When running a community workflow, vai displays a notice showing the package version, author, and tools used.

### Dry run to see execution plan

```bash
vai workflow run vai-workflow-legal-research --dry-run --input query="test"
```

### Override database

```bash
vai workflow run ingest-and-index --db staging --collection test-docs
```

## Tips

- Use `vai workflow list` to see available built-in and community workflows.
- Use `vai workflow validate` to check syntax before running.
- Use `vai workflow init` to scaffold a new workflow file.
- Use `vai workflow search` to find community workflows on npm.
- The `--dry-run` flag shows the execution plan (step order, dependencies, parallelism) without executing anything.

## Related Commands

- [`vai workflow validate`](./workflow-validate) — Validate workflow syntax
- [`vai workflow list`](./workflow-list) — List available workflows
- [`vai workflow init`](./workflow-init) — Scaffold a new workflow
- [`vai workflow install`](./workflow-install) — Install a community workflow
- [`vai workflow search`](./workflow-search) — Search npm for workflows
- [Workflow Guide](/docs/guides/workflows/overview) — Writing custom workflows
- [Community Workflows](/docs/guides/workflows/community-workflows) — Using community workflows
