---
title: Schema Reference
description: Full workflow JSON schema
sidebar_position: 5
---

# Workflow Schema Reference

## Top-Level Structure

```json
{
  "name": "string (required)",
  "description": "string (optional)",
  "steps": [
    {
      "id": "string (required, unique)",
      "type": "string (required)",
      "depends": ["string[] (optional, step IDs)"],
      "input": "object (step-specific)",
      "config": "object (step-specific, optional)"
    }
  ]
}
```

## Step Types

| Type | Description | Key Inputs |
|------|-------------|------------|
| `chunk` | Split text into chunks | `path`, `text` |
| `embed` | Generate embeddings | `texts`, `model` |
| `store` | Store in MongoDB | `embeddings`, `db`, `collection` |
| `search` | Vector search | `query`, `db`, `collection` |
| `rerank` | Rerank results | `query`, `documents` |
| `query` | Full RAG query | `query`, `db`, `collection` |

## Validation Rules

- Every step must have a unique `id`
- `depends` must reference existing step IDs
- No circular dependencies allowed
- Required fields must be present on each step

## Validate

```bash
vai workflow validate my-workflow.json
```

## Further Reading

- [Writing Workflows](./writing-workflows) — Authoring guide
- [Template Expressions](./template-expressions) — Data passing syntax
