---
title: Schema Reference
description: Full workflow JSON schema reference
sidebar_position: 5
---

# Workflow Schema Reference

This page documents every field in a `workflow.json` file. For the full TypeScript interface and JSON Schema, see the [API Reference: Workflow Schema](/docs/api-reference/workflow-schema).

## Top-Level Structure

```json
{
  "name": "my-pipeline",
  "description": "A multi-step RAG pipeline",
  "version": "1.0.0",
  "branding": {
    "icon": "search",
    "color": "#00D4AA"
  },
  "inputs": {
    "query": { "type": "string", "required": true }
  },
  "defaults": {
    "db": "mydb",
    "collection": "docs"
  },
  "steps": [ ... ],
  "output": "{{ brief.output.response }}"
}
```

### Top-level fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Human-readable workflow name. |
| `description` | string | No | What this workflow does. |
| `version` | string | No | Semver version (e.g., `"1.0.0"`). |
| `branding` | object | No | Icon and accent color for the Workflow Store. See [Branding](#branding). |
| `inputs` | object | No | Parameterized inputs the user provides at runtime. |
| `defaults` | object | No | Shared default values for `db`, `collection`, and `model`. |
| `steps` | array | Yes | Ordered array of pipeline steps. |
| `output` | object | No | Template expressions defining the final workflow result. |

## Branding

The `branding` field controls how your workflow appears in the Workflow Store UI. It contains two optional properties:

```json
"branding": {
  "icon": "target",
  "color": "#8B5CF6"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `icon` | string | A predefined Lucide icon name (e.g., `"search"`, `"brain"`, `"trophy"`). |
| `color` | string | Hex color code for the icon accent (e.g., `"#00D4AA"`). |

If omitted, the store infers branding from the workflow's category and tools. For the full list of available icon names, see [Publishing Workflows: Available Icons](./publishing-workflows#available-icons).

:::tip
Branding in `workflow.json` is used for built-in workflows. For published npm packages, set branding in `package.json` under `vai.branding` instead. See [Publishing Workflows](./publishing-workflows#branding).
:::

## Inputs

Each key in `inputs` declares a parameter the user can set at runtime with `--input`:

```json
"inputs": {
  "query": {
    "type": "string",
    "required": true,
    "description": "The search query"
  },
  "limit": {
    "type": "number",
    "default": 10,
    "description": "Maximum results to retrieve"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"string"` \| `"number"` \| `"boolean"` | Data type for the input. |
| `required` | boolean | Whether the input must be provided. |
| `default` | any | Default value when not provided. |
| `description` | string | Human-readable description (shown in `vai workflow info`). |

Reference inputs in step definitions with `{{ inputs.query }}`.

## Defaults

Shared defaults that steps inherit when they do not specify their own values:

```json
"defaults": {
  "db": "production",
  "collection": "knowledge",
  "model": "voyage-4-large"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `db` | string | Default MongoDB database name. |
| `collection` | string | Default collection name. |
| `model` | string | Default Voyage AI model. |

## Steps

Each step is an object in the `steps` array:

```json
{
  "id": "search",
  "name": "Search knowledge base",
  "tool": "query",
  "inputs": {
    "query": "{{ inputs.query }}",
    "limit": "{{ inputs.limit }}"
  },
  "condition": "{{ inputs.query }}",
  "continueOnError": false
}
```

### Step fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier. Must match `^[a-zA-Z_][a-zA-Z0-9_]*$`. Referenced by other steps. |
| `name` | string | No | Human-readable label shown during execution. |
| `description` | string | No | Longer description of what this step does. |
| `tool` | string | Yes | The operation to run. See [Step Types](#step-types). |
| `inputs` | object | Yes | Tool-specific inputs. Supports template expressions. |
| `condition` | string | No | Template expression. Step runs only if this evaluates truthy. |
| `forEach` | string | No | Template expression resolving to an array. Step runs once per element. |
| `continueOnError` | boolean | No | If `true`, the workflow continues even if this step fails. Default: `false`. |

### Step types

| Tool | Description |
|------|-------------|
| `query` | Full RAG query with embedding, vector search, and optional reranking. |
| `search` | Raw vector similarity search without reranking. |
| `rerank` | Rerank documents against a query using Voyage AI reranker. |
| `embed` | Generate an embedding vector for text. |
| `similarity` | Compute cosine similarity between two texts. |
| `ingest` | Chunk, embed, and store a document in MongoDB. |
| `collections` | List MongoDB collections. |
| `models` | List available Voyage AI models. |
| `explain` | Get an educational explanation of a topic. |
| `estimate` | Estimate embedding costs. |
| `merge` | Concatenate arrays from multiple steps. |
| `filter` | Filter array items by a condition. |
| `transform` | Transform data with expressions. |
| `generate` | Call the configured LLM. |

For detailed input schemas for each tool, see the [API Reference: Workflow Schema](/docs/api-reference/workflow-schema#tool-input-schemas).

## Output

The `output` field defines what the workflow produces. Use template expressions to reference step results:

```json
"output": "{{ brief.output.response }}"
```

Or return a structured object:

```json
"output": {
  "summary": "{{ brief.output.response }}",
  "sources": "{{ search.output.results }}",
  "cost": "{{ estimate.output.total }}"
}
```

## Validation Rules

- Every step must have a unique `id`
- Step IDs must start with a letter or underscore, followed by letters, digits, or underscores
- Template expressions referencing step outputs (e.g., `{{ search.output }}`) must point to a step that exists
- No circular dependencies allowed
- At least one step is required

Validate any workflow file:

```bash
vai workflow validate my-workflow.json
```

## Further Reading

- [Writing Workflows](./writing-workflows): Authoring guide
- [Template Expressions](./template-expressions): Data passing syntax
- [Publishing Workflows](./publishing-workflows): Package metadata and npm publishing
- [Workflow Schema (API Reference)](/docs/api-reference/workflow-schema): TypeScript interface and JSON Schema
