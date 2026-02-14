---
title: "vai workflow info"
description: "Show detailed information about a workflow package"
sidebar_position: 10
---

# vai workflow info

Display detailed information about an installed community workflow package.

## Synopsis

```bash
vai workflow info <name>
```

## Description

`vai workflow info` shows comprehensive metadata for an installed community workflow, including the description, author, license, category, tags, compatibility requirements, tools used, step count, input parameters, install location, and npm URL.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<name>` | Workflow package name **(required)** | — |

## Examples

### View workflow details

```bash
vai workflow info vai-workflow-legal-research
```

Output:

```
vai-workflow-legal-research v1.0.0
  Legal KB search + rerank + brief generation

  Author:     Jane Smith <jane@example.com>
  License:    MIT
  Category:   domain-specific
  Tags:       legal, research, reranking
  Min vai:    v1.27.0
  Tools:      query, rerank, generate
  Steps:      3

  Inputs:
    query         string   (required)   The legal question to research
    jurisdiction  string   (default: US) Jurisdiction filter
    limit         number   (default: 10) Maximum documents to retrieve

  Source: ./node_modules/vai-workflow-legal-research/
  npm:    https://www.npmjs.com/package/vai-workflow-legal-research
```

## Related Commands

- [`vai workflow list`](./workflow-list) — List all workflows
- [`vai workflow run`](./workflow-run) — Execute a workflow
- [`vai workflow search`](./workflow-search) — Search npm for workflows
- [Community Workflows Guide](/docs/guides/workflows/community-workflows) — Full guide
