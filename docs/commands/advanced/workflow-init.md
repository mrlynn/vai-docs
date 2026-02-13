---
title: "vai workflow init"
description: "Scaffold a new workflow JSON file"
sidebar_position: 5
---

# vai workflow init

Create a new workflow JSON file with a starter template.

## Synopsis

```bash
vai workflow init [options]
```

## Description

`vai workflow init` scaffolds a new workflow definition file with example steps and structure. Use it as a starting point for building custom multi-step RAG pipelines.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `-o, --output <path>` | Output file path | `workflow.json` |
| `--json` | Output to stdout instead of file | — |

## Examples

### Create a workflow file

```bash
vai workflow init
```

### Create with a custom name

```bash
vai workflow init -o my-pipeline.json
```

## Related Commands

- [`vai workflow run`](./workflow-run) — Execute the workflow
- [`vai workflow validate`](./workflow-validate) — Validate before running
- [Writing Workflows](/docs/guides/workflows/writing-workflows) — Workflow authoring guide
