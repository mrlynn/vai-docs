---
title: Writing Workflows
description: How to author custom workflow definitions
sidebar_position: 2
---

# Writing Workflows

This guide walks through creating a custom vai workflow from scratch.

## Step 1: Scaffold

```bash
vai workflow init -o my-workflow.json
```

This creates a starter file you can edit.

## Step 2: Define Steps

Each step needs:
- **`id`** — Unique identifier (referenced by other steps)
- **`type`** — Operation type (chunk, embed, store, search, rerank, etc.)
- **`depends`** (optional) — Array of step IDs this step depends on
- **`input`** — Step-specific input parameters
- **`config`** (optional) — Step-specific configuration

```json
{
  "name": "documentation-pipeline",
  "steps": [
    {
      "id": "chunk-docs",
      "type": "chunk",
      "input": { "path": "{{docs_path}}" },
      "config": { "strategy": "markdown", "size": 1024, "overlap": 100 }
    },
    {
      "id": "embed-chunks",
      "type": "embed",
      "depends": ["chunk-docs"],
      "input": { "texts": "{{chunk-docs.output}}" },
      "config": { "model": "voyage-4-large" }
    },
    {
      "id": "store-vectors",
      "type": "store",
      "depends": ["embed-chunks"],
      "input": {
        "embeddings": "{{embed-chunks.output}}",
        "db": "{{db}}",
        "collection": "{{collection}}"
      }
    }
  ]
}
```

## Step 3: Add Inputs

Workflow inputs use `{{variable_name}}` syntax. Pass values at runtime:

```bash
vai workflow run my-workflow.json \
  --input docs_path=./docs \
  --input db=myapp \
  --input collection=knowledge
```

## Step 4: Validate

```bash
vai workflow validate my-workflow.json
```

This checks for:
- Valid JSON syntax
- Required fields on each step
- Missing dependencies
- Circular references

## Step 5: Dry Run

```bash
vai workflow run my-workflow.json --dry-run --input docs_path=./docs
```

Shows the execution plan without running anything.

## Step 6: Execute

```bash
vai workflow run my-workflow.json --input docs_path=./docs --input db=myapp
```

## Tips

- Keep step IDs descriptive (`chunk-docs`, not `step1`)
- Use `--verbose` to see step-by-step output
- Steps without mutual dependencies run in parallel automatically
- Validate before running to catch errors early
