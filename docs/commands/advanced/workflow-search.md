---
title: "vai workflow search"
description: "Search npm for community workflow packages"
sidebar_position: 8
---

# vai workflow search

Search the npm registry for community workflow packages.

## Synopsis

```bash
vai workflow search <query> [options]
```

## Description

`vai workflow search` queries the npm registry for packages matching the `vai-workflow-*` naming convention. Results include the package name, version, description, author, weekly download count, and tags.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<query>` | Search terms **(required)** | — |
| `--limit <n>` | Maximum number of results | `10` |
| `--json` | Output as JSON | `false` |

## Examples

### Search by keyword

```bash
vai workflow search legal
```

Output:

```
Searching npm for vai-workflow packages matching "legal"...

  vai-workflow-legal-research  v1.0.0
    Legal KB search + rerank + brief generation
    by Jane Smith | 1,247 downloads/week | legal, research

  vai-workflow-legal-discovery  v0.3.0
    E-discovery document search and classification
    by LegalTech Tools | 89 downloads/week | legal, ediscovery

Install: vai workflow install <package-name>
```

### Limit results

```bash
vai workflow search healthcare --limit 5
```

### JSON output

```bash
vai workflow search analysis --json
```

## Related Commands

- [`vai workflow install`](./workflow-install) — Install a workflow from the results
- [`vai workflow info`](./workflow-info) — Get details about a specific package
- [`vai workflow list`](./workflow-list) — List locally installed workflows
- [Community Workflows Guide](/docs/guides/workflows/community-workflows) — Full guide
