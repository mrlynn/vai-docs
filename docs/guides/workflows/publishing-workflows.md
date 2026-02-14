---
title: Publishing Workflows
description: Create and share workflow packages on npm
sidebar_position: 7
---

# Publishing Workflows

Share your vai workflows with the community by publishing them as npm packages. Any npm package named `vai-workflow-*` with a valid `workflow.json` is automatically discovered by vai.

## Overview

A vai workflow package is an npm package that contains a reusable workflow definition. No JavaScript, no build step, no dependencies: just a JSON file with metadata.

```
vai-workflow-legal-research/
├── package.json          # npm metadata + vai-specific fields
├── workflow.json         # The workflow definition (required)
├── README.md             # Usage instructions
└── LICENSE               # License file (MIT recommended)
```

## Creating a Package

### From an existing workflow

If you already have a working workflow JSON file, use `vai workflow create` to scaffold a publish-ready package:

```bash
vai workflow create --from ./legal-research.json --name legal-research
```

This creates a `vai-workflow-legal-research/` directory with:

- `package.json` with the `vai` field populated from your workflow (tools extracted from steps, inputs copied, category inferred)
- `workflow.json` copied from your source file
- `README.md` template with input documentation
- `LICENSE` (MIT)

### From scratch

Run `vai workflow create` without `--from` for interactive mode:

```bash
vai workflow create
```

This prompts for a name, description, category, and author, then generates a template you can fill in.

### Options

| Flag | Default | Description |
|------|---------|-------------|
| `--from <file>` | (none) | Existing workflow JSON to package |
| `--name <name>` | derived from workflow | Package name (without `vai-workflow-` prefix) |
| `--author <name>` | from git config | Author name |
| `--output <dir>` | `./vai-workflow-<name>/` | Output directory |

## Package Naming

Package names must start with `vai-workflow-` followed by a lowercase, hyphenated identifier:

```
vai-workflow-legal-research       ✓
vai-workflow-code-review          ✓
vai-workflow-clinical-triage      ✓
vai-legal-workflow                ✗  wrong prefix
vai-workflow-Legal                ✗  no uppercase
```

## The package.json Schema

Your `package.json` extends standard npm metadata with a `vai` field:

```json
{
  "name": "vai-workflow-legal-research",
  "version": "1.0.0",
  "description": "Search a legal knowledge base, rerank results, and generate a structured brief.",
  "main": "workflow.json",
  "keywords": [
    "vai-workflow",
    "voyageai-cli",
    "rag",
    "legal"
  ],
  "vai": {
    "workflowVersion": "1.0",
    "category": "domain-specific",
    "tags": ["legal", "research", "reranking"],
    "minVaiVersion": "1.27.0",
    "tools": ["query", "rerank", "generate"],
    "inputs": {
      "query": {
        "type": "string",
        "required": true,
        "description": "The legal question to research"
      },
      "jurisdiction": {
        "type": "string",
        "required": false,
        "default": "US",
        "description": "Jurisdiction filter for document search"
      }
    },
    "author": {
      "name": "Jane Smith",
      "url": "https://github.com/janesmith"
    },
    "branding": {
      "icon": "scale",
      "color": "#1E40AF"
    }
  },
  "author": "Jane Smith <jane@example.com>",
  "license": "MIT",
  "files": [
    "workflow.json",
    "README.md"
  ]
}
```

### The `vai` field

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `workflowVersion` | string | Yes | Schema version. Currently `"1.0"`. |
| `category` | string | No | One of: `retrieval`, `analysis`, `ingestion`, `domain-specific`, `utility`, `integration`. |
| `tags` | string[] | No | Freeform tags for filtering. Max 10 tags, each max 30 characters. |
| `minVaiVersion` | string | No | Minimum vai version required. |
| `tools` | string[] | Yes | vai tools the workflow uses (e.g., `["query", "rerank", "generate"]`). |
| `inputs` | object | No | Workflow input descriptions for display in the UI. |
| `author` | object | No | Author metadata with `name` (string) and optional `url` (string). |
| `branding` | object | No | Store icon and color. See [Branding](#branding) below. |

## Categories

Choose the category that best fits your workflow:

| Category | Description |
|----------|-------------|
| `retrieval` | Search and retrieval pipelines |
| `analysis` | Comparison, consistency checking |
| `ingestion` | Document processing and storage |
| `domain-specific` | Industry-focused (legal, clinical, financial) |
| `utility` | Cost estimation, benchmarking |
| `integration` | Multi-system workflows |

If omitted, the category defaults to `utility`.

## Branding

Every workflow published to the store gets an icon and accent color displayed in the Workflow Store UI. You control this with the `vai.branding` field in `package.json`.

```json
"vai": {
  "branding": {
    "icon": "scale",
    "color": "#1E40AF"
  }
}
```

### The `branding` field

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `icon` | string | No | inferred from category | A predefined icon name from the list below. |
| `color` | string | No | inferred from category | A hex color code for the icon background (e.g., `"#1E40AF"`). |

If you omit `branding`, vai picks a default icon based on your workflow's tools and category, and assigns a color based on the category.

### How icons are resolved

The store resolves an icon through this chain:

1. **`vai.branding.icon`** from your `package.json` (highest priority)
2. **Default branding** for known official workflows
3. **Category fallback** (e.g., `retrieval` gets `search`, `analysis` gets `activity`)
4. **`zap`** as the ultimate fallback

### Default colors by category

| Category | Default Color |
|----------|--------------|
| `retrieval` | `#00D4AA` |
| `analysis` | `#8B5CF6` |
| `ingestion` | `#059669` |
| `domain-specific` | `#1E40AF` |
| `utility` | `#0D9488` |
| `integration` | `#0EA5E9` |

### Available icons

Choose one of the following icon names. These are [Lucide](https://lucide.dev) icons, rendered as SVGs in the store UI.

| Icon Name | Suggested Use |
|-----------|---------------|
| `activity` | Monitoring, analytics, health checks |
| `bar-chart-3` | Reporting, statistics, dashboards |
| `brain` | AI/ML, generation, reasoning |
| `check-circle` | Validation, verification, testing |
| `clipboard-list` | Auditing, checklists, reviews |
| `code` | Code generation, developer tools |
| `database` | Ingestion, storage, data management |
| `dollar-sign` | Cost estimation, pricing, budgets |
| `file-search` | Document search, file analysis |
| `file-text` | Document processing, text extraction |
| `filter` | Filtering, narrowing, selection |
| `flask-conical` | Experimental, research, lab workflows |
| `globe` | External integrations, HTTP, APIs |
| `heart-pulse` | Healthcare, clinical, vitals |
| `layers` | Multi-step, pipelines, stacking |
| `microscope` | Deep analysis, inspection, detail |
| `package` | Packaging, bundling, distribution |
| `refresh-cw` | Refresh, sync, update cycles |
| `scale` | Legal, compliance, comparison |
| `search` | Search, retrieval, discovery |
| `shield-alert` | Security, safety, alerting |
| `sparkle` | AI generation, magic, highlights |
| `split` | Asymmetric search, branching, A/B |
| `target` | Reranking, precision, targeting |
| `timer` | Scheduling, timing, benchmarks |
| `trophy` | Benchmarking, competitions, scoring |
| `zap` | General purpose, quick actions |

:::tip
When scaffolding with `vai workflow create`, branding is auto-generated based on the tools your workflow uses. You can always override it by editing `package.json`.
:::

## The workflow.json

The `workflow.json` is a standard vai workflow definition, identical to what you create with `vai workflow init` or write by hand. No extensions or modifications needed:

```json
{
  "name": "legal-research",
  "description": "Search a legal KB, rerank, and generate a brief.",
  "version": "1.0.0",
  "inputs": {
    "query": { "type": "string", "required": true },
    "jurisdiction": { "type": "string", "default": "US" },
    "limit": { "type": "number", "default": 10 }
  },
  "steps": [
    {
      "id": "search",
      "tool": "query",
      "name": "Search legal knowledge base",
      "inputs": {
        "query": "{{ inputs.query }}",
        "limit": "{{ inputs.limit }}",
        "filter": { "jurisdiction": "{{ inputs.jurisdiction }}" }
      }
    },
    {
      "id": "rerank",
      "tool": "rerank",
      "name": "Rerank with legal model",
      "inputs": {
        "query": "{{ inputs.query }}",
        "documents": "{{ search.output.results }}",
        "model": "rerank-2.5"
      }
    },
    {
      "id": "brief",
      "tool": "generate",
      "name": "Generate legal brief",
      "inputs": {
        "prompt": "Based on the following legal documents, write a structured legal brief answering: {{ inputs.query }}",
        "context": "{{ rerank.output.results }}"
      }
    }
  ],
  "output": "{{ brief.output.response }}"
}
```

Any workflow that works as a local JSON file can be published as a package with zero modifications.

## Testing Before Publishing

Validate your package locally before publishing:

```bash
# Validate the workflow definition
vai workflow validate ./vai-workflow-my-workflow/workflow.json

# Install locally to test discovery
npm install ./vai-workflow-my-workflow

# Verify it appears in the list
vai workflow list --community

# Test with a dry run
vai workflow run vai-workflow-my-workflow --dry-run --input query="test"

# Run it for real
vai workflow run vai-workflow-my-workflow --input query="test query"
```

## Publishing to npm

Once your package is validated and tested:

```bash
cd vai-workflow-my-workflow
npm publish
```

Your workflow is now available to every vai user. They can find it with `vai workflow search` and install it with `vai workflow install`.

## Updating a Published Workflow

To publish an update:

1. Make your changes to `workflow.json`
2. Bump the version in `package.json`
3. Run `npm publish`

Users update with:

```bash
vai workflow install vai-workflow-my-workflow
```

## README Conventions

A well-structured README helps users understand your workflow. Include:

- A description of what the workflow does
- Prerequisites (required collections, configuration)
- Input parameters with types and descriptions
- Usage examples
- Example output

```markdown
# vai-workflow-legal-research

Search a legal knowledge base, rerank results with a legal-domain model,
and generate a structured legal brief.

## Prerequisites

- A MongoDB collection with embedded legal documents
- An LLM provider configured (`vai config set llm-provider ...`)

## Inputs

| Input | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| query | string | Yes | — | The legal question to research |
| jurisdiction | string | No | US | Filter by jurisdiction |
| limit | number | No | 10 | Maximum documents to retrieve |

## Usage

vai workflow run vai-workflow-legal-research \
  --input query="What are the liability implications of..." \
  --input jurisdiction=EU
```

## Further Reading

- [Community Workflows](./community-workflows) — Browse and install workflows
- [Writing Workflows](./writing-workflows) — Workflow authoring guide
- [Template Expressions](./template-expressions) — Data passing between steps
- [Schema Reference](./schema-reference) — Full workflow JSON schema
