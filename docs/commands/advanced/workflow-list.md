---
title: "vai workflow list"
description: "List built-in workflow templates"
sidebar_position: 4
---

# vai workflow list

List all built-in workflow templates that can be run with `vai workflow run`.

## Synopsis

```bash
vai workflow list [options]
```

## Description

`vai workflow list` shows the available built-in workflow templates, including their names, descriptions, and required inputs. These templates provide pre-built multi-step pipelines for common tasks.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--json` | Output as JSON | — |

## Examples

### List available workflows

```bash
vai workflow list
```

### JSON output

```bash
vai workflow list --json
```

## Related Commands

- [`vai workflow run`](./workflow-run) — Execute a workflow
- [`vai workflow init`](./workflow-init) — Create a custom workflow
