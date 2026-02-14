---
title: Workflows Overview
description: Composable multi-step RAG pipelines
sidebar_position: 1
---

# Workflows Guide

vai workflows let you define multi-step RAG pipelines as JSON files. Steps execute in dependency order with automatic parallelization of independent steps.

## Quick Start

```bash
# List built-in and community workflows
vai workflow list

# Run a built-in workflow
vai workflow run ingest-and-index --input path=./docs --input db=myapp

# Create a custom workflow
vai workflow init -o my-pipeline.json

# Validate before running
vai workflow validate my-pipeline.json

# Execute
vai workflow run my-pipeline.json --input query="How does auth work?"
```

## Workflow Structure

A workflow JSON file has a name, optional description, and an array of steps:

```json
{
  "name": "my-rag-pipeline",
  "description": "Chunk, embed, store, and query",
  "steps": [
    {
      "id": "chunk",
      "type": "chunk",
      "input": { "path": "{{path}}" },
      "config": { "strategy": "recursive", "size": 512 }
    },
    {
      "id": "embed",
      "type": "embed",
      "depends": ["chunk"],
      "input": { "texts": "{{chunk.output}}" }
    },
    {
      "id": "store",
      "type": "store",
      "depends": ["embed"],
      "input": { "embeddings": "{{embed.output}}" }
    }
  ]
}
```

## Key Concepts

- **Steps** execute operations (chunk, embed, store, search, rerank, etc.)
- **Dependencies** (`depends`) control execution order
- **Template expressions** (`{{variable}}`) pass data between steps
- **Parallel execution**: Steps without dependencies on each other run concurrently

## Two-Tier Workflow Library

Workflows come from two sources:

| Tier | Source | Description |
|------|--------|-------------|
| **Built-in** | Ships with vai | Maintained by the vai project, tested against every release |
| **Community** | Installed from npm | Community-contributed packages following the `vai-workflow-*` convention |

Use `vai workflow list` to see both tiers. Use `vai workflow search` to find community workflows on npm, and `vai workflow install` to add them to your project.

## Next Steps

- [Writing Workflows](./writing-workflows) — Authoring guide
- [Template Expressions](./template-expressions) — Data passing between steps
- [Built-in Templates](./built-in-templates) — Pre-built workflows
- [Schema Reference](./schema-reference) — Full workflow JSON schema
- [Community Workflows](./community-workflows) — Browse and install community workflows
- [Publishing Workflows](./publishing-workflows) — Share your workflows on npm
