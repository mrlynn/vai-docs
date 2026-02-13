---
title: "vai workflow validate"
description: "Validate workflow syntax and detect issues"
sidebar_position: 3
---

# vai workflow validate

Validate a workflow definition for syntax errors, missing dependencies, and circular references.

## Synopsis

```bash
vai workflow validate <file> [options]
```

## Description

`vai workflow validate` loads a workflow file and checks it for:
- Valid JSON syntax
- Required fields on each step
- Missing step dependencies (steps referencing non-existent step IDs)
- Circular dependency detection
- Valid step types

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<file>` | Workflow file to validate **(required)** | — |
| `--json` | Output validation results as JSON | — |

## Examples

### Validate a workflow

```bash
vai workflow validate my-pipeline.json
```

### JSON output for CI

```bash
vai workflow validate my-pipeline.json --json
```

## Related Commands

- [`vai workflow run`](./workflow-run) — Execute a validated workflow
- [`vai workflow init`](./workflow-init) — Create a new workflow file
