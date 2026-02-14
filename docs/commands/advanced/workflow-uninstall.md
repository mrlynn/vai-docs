---
title: "vai workflow uninstall"
description: "Remove a community workflow package"
sidebar_position: 7
---

# vai workflow uninstall

Remove an installed community workflow package.

## Synopsis

```bash
vai workflow uninstall <package-name> [options]
```

## Description

`vai workflow uninstall` removes a previously installed community workflow package. This runs `npm uninstall` under the hood. The workflow will no longer appear in `vai workflow list` or the Playground.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<package-name>` | The package name to remove **(required)** | — |
| `--global` | Remove a globally installed package | `false` |

## Examples

### Remove a community workflow

```bash
vai workflow uninstall vai-workflow-legal-research
```

Output:

```
Uninstalling vai-workflow-legal-research...
✔ Removed vai-workflow-legal-research@1.0.0
```

### Remove a globally installed workflow

```bash
vai workflow uninstall vai-workflow-legal-research --global
```

## Related Commands

- [`vai workflow install`](./workflow-install) — Install a community workflow
- [`vai workflow list`](./workflow-list) — List all workflows
- [Community Workflows Guide](/docs/guides/workflows/community-workflows) — Full guide
