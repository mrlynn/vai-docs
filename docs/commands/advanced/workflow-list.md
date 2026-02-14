---
title: "vai workflow list"
description: "List built-in and community workflow templates"
sidebar_position: 4
---

# vai workflow list

List all available workflows, including built-in templates and installed community packages.

## Synopsis

```bash
vai workflow list [options]
```

## Description

`vai workflow list` shows available workflows organized into two tiers: built-in templates that ship with vai, and community workflows installed from npm. Community workflows are discovered by scanning `node_modules` for packages matching the `vai-workflow-*` naming convention.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--json` | Output as JSON | `false` |
| `--built-in` | Show only built-in workflows | `false` |
| `--community` | Show only community workflows | `false` |
| `--category <name>` | Filter by category | (all) |
| `--tag <name>` | Filter by tag | (all) |

## Examples

### List all workflows

```bash
vai workflow list
```

Output:

```
Built-in Workflows (5)
  cost-analysis          Compare costs across voyage-4-large, voyage-4, voyage-4-lite
  research-summarize     Query knowledge base, then LLM summary
  multi-collection       Search 2 collections in parallel, merge, rerank
  smart-ingest           Check similarity before ingesting (dedup)
  consistency-check      Compare same topic across 2 collections

Community Workflows (2)
  vai-workflow-legal-research       Legal KB search + rerank + brief generation
    by Jane Smith | v1.0.0 | legal, research
  vai-workflow-code-review          Code search + similarity check + review summary
    by DevTools Inc. | v2.1.0 | code, review

Use: vai workflow run <name> --input key=value
```

### Show only community workflows

```bash
vai workflow list --community
```

### Filter by category

```bash
vai workflow list --category domain-specific
```

### Filter by tag

```bash
vai workflow list --tag legal
```

### JSON output

```bash
vai workflow list --json
```

## Related Commands

- [`vai workflow run`](./workflow-run) — Execute a workflow
- [`vai workflow install`](./workflow-install) — Install a community workflow
- [`vai workflow search`](./workflow-search) — Search npm for workflows
- [`vai workflow info`](./workflow-info) — Show workflow details
- [`vai workflow init`](./workflow-init) — Create a custom workflow
