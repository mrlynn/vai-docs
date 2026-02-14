---
title: "vai workflow install"
description: "Install a community workflow package from npm"
sidebar_position: 6
---

# vai workflow install

Install a community workflow package from npm with automatic validation.

## Synopsis

```bash
vai workflow install <package-name> [options]
```

## Description

`vai workflow install` downloads a community workflow package from the npm registry, validates the workflow definition against vai's schema, and checks compatibility with your vai version. It is a convenience wrapper around `npm install` that provides immediate feedback on whether the workflow is valid and ready to use.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<package-name>` | The npm package name **(required)** | — |
| `--global` | Install globally (available to all projects) | `false` |
| `--json` | Output result as JSON | `false` |

## Examples

### Install a community workflow

```bash
vai workflow install vai-workflow-legal-research
```

Output:

```
Installing vai-workflow-legal-research...
✔ Downloaded vai-workflow-legal-research@1.0.0
✔ Validated workflow definition (3 steps, tools: query, rerank, generate)
✔ Compatible with vai v1.27.0

Installed. Run with:
  vai workflow run vai-workflow-legal-research --input query="..."
```

### Install globally

```bash
vai workflow install vai-workflow-legal-research --global
```

### JSON output

```bash
vai workflow install vai-workflow-code-review --json
```

## Error Cases

| Scenario | Behavior |
|----------|----------|
| Package not found on npm | `Package vai-workflow-xyz not found on npm` |
| Package is not a vai workflow | `vai-workflow-xyz is not a valid vai workflow package (missing "vai" field in package.json)` |
| Workflow definition is invalid | Package installs but is flagged as invalid with details |
| Name missing `vai-workflow-` prefix | `Package name must start with "vai-workflow-"` |

## Related Commands

- [`vai workflow uninstall`](./workflow-uninstall) — Remove a community workflow
- [`vai workflow search`](./workflow-search) — Search npm for workflow packages
- [`vai workflow list`](./workflow-list) — List all workflows
- [`vai workflow info`](./workflow-info) — Show workflow package details
- [Community Workflows Guide](/docs/guides/workflows/community-workflows) — Full guide
