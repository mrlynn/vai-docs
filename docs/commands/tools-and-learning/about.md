---
title: "vai about"
description: "Display version, system info, and project details"
sidebar_position: 8
---

# vai about

Display information about vai, its author, and links to project resources.

## Synopsis

```bash
vai about [options]
```

## Description

`vai about` shows details about the voyageai-cli tool, including the author (Michael Lynn, Principal Staff Developer Advocate at MongoDB), project links, and why Voyage AI was chosen. It highlights key Voyage AI advantages: SOTA embedding quality, cost-effective asymmetric retrieval, shared embedding spaces, domain-specific models, and two-stage retrieval with reranking.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--json` | Machine-readable JSON output | — |

## Examples

### Show about info

```bash
vai about
```

### JSON output

```bash
vai about --json
```

## Output (JSON)

```json
{
  "tool": "voyageai-cli",
  "binary": "vai",
  "author": {
    "name": "Michael Lynn",
    "github": "https://github.com/mrlynn",
    "website": "https://mlynn.org"
  },
  "links": {
    "npm": "https://www.npmjs.com/package/voyageai-cli",
    "github": "https://github.com/mrlynn/voyageai-cli",
    "docs": "https://www.mongodb.com/docs/voyageai/"
  }
}
```

:::note Community Tool
vai is an independent, community-built tool — not an official product of MongoDB, Inc. or Voyage AI.
:::

## Related Commands

- [`vai ping`](./ping) — Test API connectivity
- [`vai models`](./models) — View available models
