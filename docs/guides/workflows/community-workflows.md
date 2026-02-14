---
title: Community Workflows
description: Discover, install, and use community-contributed workflow packages
sidebar_position: 6
---

# Community Workflows

vai workflows can be shared as npm packages. Community workflows extend your pipeline library with domain-specific and specialized RAG pipelines built by other vai users.

## How It Works

Community workflows are npm packages that follow the `vai-workflow-*` naming convention. When you install one, vai automatically discovers it and makes it available alongside built-in templates in both the CLI and the Playground.

| Tier | Source | Trust Level |
|------|--------|-------------|
| **Built-in** | Ships with vai | Maintained by the vai project, tested against every release |
| **Community** | Installed from npm | Maintained by the package author, validated by vai's schema checker |

Built-in workflows are always available. Community workflows must be explicitly installed and can be removed at any time.

## Searching for Workflows

Find community workflows on the npm registry:

```bash
# Search by keyword
vai workflow search legal

# Search with more results
vai workflow search healthcare --limit 20

# JSON output for scripting
vai workflow search analysis --json
```

Search results show the package name, version, description, author, weekly download count, and tags.

## Installing a Workflow

Install community workflows with `vai workflow install`:

```bash
# Install a community workflow
vai workflow install vai-workflow-legal-research

# Install globally (available to all projects)
vai workflow install vai-workflow-legal-research --global
```

vai downloads the package from npm, validates the workflow definition against the workflow schema, and checks compatibility with your vai version. If validation passes, the workflow is immediately available.

You can also use standard npm commands:

```bash
npm install vai-workflow-legal-research
```

## Listing Installed Workflows

The `vai workflow list` command now shows both built-in and community workflows:

```bash
# Show all workflows
vai workflow list

# Show only community workflows
vai workflow list --community

# Show only built-in workflows
vai workflow list --built-in

# Filter by category
vai workflow list --category domain-specific

# Filter by tag
vai workflow list --tag legal
```

## Running a Community Workflow

Run community workflows the same way you run built-in templates:

```bash
vai workflow run vai-workflow-legal-research \
  --input query="What are the liability implications of AI-generated content?" \
  --input jurisdiction=EU
```

When running a community workflow, vai displays a brief notice showing the package name, version, author, and the tools the workflow uses.

Use `--dry-run` to preview the execution plan without running anything:

```bash
vai workflow run vai-workflow-legal-research --dry-run \
  --input query="test query"
```

## Viewing Workflow Details

Get detailed information about an installed community workflow:

```bash
vai workflow info vai-workflow-legal-research
```

This shows the description, author, license, category, tags, minimum vai version, tools used, step count, input parameters, and the npm package URL.

## Removing a Workflow

Uninstall community workflows when you no longer need them:

```bash
vai workflow uninstall vai-workflow-legal-research
```

## Resolution Order

When you run a workflow by name, vai resolves it using this priority:

| Priority | Source | Example |
|----------|--------|---------|
| 1 (highest) | Local file path | `vai workflow run ./my-workflow.json` |
| 2 | Built-in template name | `vai workflow run cost-analysis` |
| 3 | Community package (project-local) | `vai workflow run vai-workflow-legal-research` |
| 4 | Community package (global) | Same name, globally installed |

Built-in templates always take precedence over community packages with the same base name.

## Workflow Categories

Community workflows are organized into categories:

| Category | Description |
|----------|-------------|
| `retrieval` | Search and retrieval pipelines |
| `analysis` | Comparison, consistency checking, evaluation |
| `ingestion` | Document processing and storage |
| `domain-specific` | Industry-focused workflows (legal, clinical, financial) |
| `utility` | Cost estimation, benchmarking, maintenance |
| `integration` | Multi-system and cross-tool workflows |

## Security

Community workflow packages contain JSON definitions, not executable code. vai validates every community workflow against the same schema used for built-in templates and local files. The validation checks:

- All steps reference known vai tools
- No circular dependencies between steps
- All template references resolve correctly
- The workflow is compatible with your vai version

Community packages are npm packages, so apply the same judgment you use when installing any npm dependency. Download counts, package age, author reputation, and linked source repositories are all useful trust signals.

## Playground Integration

Community workflows also appear in the Playground's workflow library under a dedicated "Community" section. You can browse, install, and run community workflows from the visual interface.

## Further Reading

- [Publishing Workflows](./publishing-workflows) — Create and share your own workflows
- [Writing Workflows](./writing-workflows) — Authoring guide
- [Built-in Templates](./built-in-templates) — Pre-built workflows that ship with vai
- [`vai workflow install`](/docs/commands/advanced/workflow-install) — Install command reference
- [`vai workflow search`](/docs/commands/advanced/workflow-search) — Search command reference
