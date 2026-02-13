---
title: Schema Reference
description: Complete field reference for vai workflow JSON files
sidebar_position: 2
---

# Workflow Schema Reference

This page documents every field in a vai workflow JSON file. For a step-by-step tutorial, see [Writing Workflows](/docs/guides/workflows/writing-workflows).

## Top-Level Fields

```json
{
  "$schema": "https://vai.dev/schemas/workflow-v1.json",
  "name": "My Workflow",
  "description": "What this workflow does",
  "version": "1.0.0",
  "inputs": { },
  "defaults": { },
  "steps": [ ],
  "output": { }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | No | Schema URL for IDE validation and autocomplete |
| `name` | string | **Yes** | Human-readable workflow name, shown in CLI output |
| `description` | string | No | What the workflow does |
| `version` | string | No | Semver version for the workflow definition |
| `inputs` | object | No | Parameters provided at runtime via `--input` |
| `defaults` | object | No | Shared values available to all steps |
| `steps` | array | **Yes** | Ordered list of workflow steps |
| `output` | object | No | Template expressions defining the workflow result |

## inputs

Each key in the `inputs` object defines a named parameter that can be provided at runtime:

```json
{
  "inputs": {
    "query": {
      "type": "string",
      "description": "The search query",
      "required": true
    },
    "limit": {
      "type": "number",
      "description": "Max results to return",
      "default": 10
    },
    "verbose": {
      "type": "boolean",
      "default": false
    }
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `"string"` \| `"number"` \| `"boolean"` | **Yes** | The parameter type |
| `description` | string | No | Shown in dry-run output |
| `required` | boolean | No | If `true`, workflow fails without this input |
| `default` | any | No | Fallback value when not provided |

Provide inputs at runtime with the `--input` flag:

```bash
vai workflow run my-workflow.json --input query="how does auth work" --input limit=5
```

## defaults

Shared values available to all steps. Steps can reference these with `{{ defaults.fieldName }}`:

```json
{
  "defaults": {
    "db": "myapp",
    "collection": "knowledge",
    "model": "voyage-4-large"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `db` | string | Default MongoDB database name |
| `collection` | string | Default collection name |
| `model` | string | Default Voyage AI embedding model |

Defaults can be overridden per-step. They can also be overridden at runtime with the `--db` and `--collection` flags.

## steps

The `steps` array contains the workflow pipeline. Each step has:

```json
{
  "id": "search_docs",
  "name": "Search documentation",
  "tool": "query",
  "description": "Find relevant docs for the user's question",
  "inputs": {
    "query": "{{ inputs.question }}",
    "db": "{{ defaults.db }}",
    "collection": "{{ defaults.collection }}",
    "limit": 10
  },
  "condition": "{{ inputs.question.length > 0 }}",
  "forEach": null,
  "continueOnError": false
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | **Yes** | Unique identifier. Must match `[a-zA-Z_][a-zA-Z0-9_]*` |
| `name` | string | No | Human-readable label for CLI output |
| `tool` | string | **Yes** | The operation to execute (see [Step Tools](#step-tools)) |
| `description` | string | No | What this step does |
| `inputs` | object | **Yes** | Tool-specific inputs. Supports [template expressions](/docs/guides/workflows/template-expressions) |
| `condition` | string | No | Template expression. Step runs only if this evaluates truthy |
| `forEach` | string | No | Template expression resolving to an array. Step runs once per item |
| `continueOnError` | boolean | No | Default `false`. If `true`, workflow continues when this step fails |

### Step ID Rules

- Must be unique across all steps
- Must start with a letter or underscore
- Can contain letters, digits, and underscores
- Convention: use `snake_case` (e.g., `search_api`, `merge_results`)

### Dependencies

Dependencies between steps are automatically detected from template expressions. If step B references `{{ step_a.output.results }}`, then step A must complete before step B begins.

Steps with no shared dependencies run in parallel:

```
Layer 1: search_api, search_arch  (parallel, no dependencies)
Layer 2: merge                     (depends on both searches)
Layer 3: rerank_all               (depends on merge)
```

## Step Tools

### VAI Tools

These map directly to vai operations:

| Tool | Description | Key Inputs |
|------|-------------|------------|
| `query` | Full RAG query: embed, vector search, rerank | `query`, `db`, `collection`, `limit`, `filter`, `rerank` |
| `search` | Vector similarity search (no reranking) | `query`, `db`, `collection`, `limit`, `filter` |
| `rerank` | Rerank documents against a query | `query`, `documents`, `model` |
| `embed` | Generate an embedding vector | `text`, `model`, `inputType` |
| `similarity` | Compare two texts semantically | `text1`, `text2`, `model` |
| `ingest` | Chunk, embed, and store a document | `text`, `source`, `db`, `collection`, `chunkSize`, `chunkStrategy`, `metadata` |
| `collections` | List collections with vector indexes | `db` |
| `models` | List available Voyage AI models | `category` |
| `explain` | Look up educational topic content | `topic` |
| `estimate` | Estimate embedding costs | `docs`, `queries`, `months` |

### Control Flow Tools

| Tool | Description | Key Inputs |
|------|-------------|------------|
| `merge` | Concatenate arrays from multiple steps | `arrays`, `dedup`, `dedup_field` |
| `filter` | Filter array items by condition | `array`, `condition` |
| `transform` | Reshape data (pick fields, rename) | `data`, `mapping` |

### LLM Tool

| Tool | Description | Key Inputs |
|------|-------------|------------|
| `generate` | Call an LLM with a prompt | `prompt`, `context`, `systemPrompt` |

:::note
The `generate` tool requires an LLM provider to be configured. Set `VAI_LLM_PROVIDER` and `VAI_LLM_API_KEY` environment variables, or configure them in `.vai.json`. If no LLM is configured and a workflow contains a `generate` step, execution fails with a clear error message.
:::

### merge

Combine arrays from multiple steps into one:

```json
{
  "id": "merge_results",
  "tool": "merge",
  "inputs": {
    "arrays": [
      "{{ search_api.output.results }}",
      "{{ search_arch.output.results }}"
    ],
    "dedup": true,
    "dedup_field": "source"
  }
}
```

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `arrays` | array of template expressions | **Yes** | Arrays to concatenate |
| `dedup` | boolean | No | Remove duplicates (default: `false`) |
| `dedup_field` | string | No | Field to use for dedup comparison |

### filter

Keep only items matching a condition:

```json
{
  "id": "high_relevance",
  "tool": "filter",
  "inputs": {
    "array": "{{ search_results.output.results }}",
    "condition": "item.score > 0.8"
  }
}
```

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `array` | template expression | **Yes** | The array to filter |
| `condition` | string | **Yes** | Condition using `item` as the current element |

### generate

Call the configured LLM:

```json
{
  "id": "summarize",
  "tool": "generate",
  "inputs": {
    "prompt": "Summarize these findings about {{ inputs.query }}:",
    "context": "{{ reranked.output.results }}",
    "systemPrompt": "You are a research assistant. Be concise."
  }
}
```

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `prompt` | string | **Yes** | The user prompt sent to the LLM |
| `context` | any | No | Context data passed alongside the prompt |
| `systemPrompt` | string | No | System message for the LLM |

## output

The `output` section defines what the workflow returns. Use template expressions to reference step outputs:

```json
{
  "output": {
    "answer": "{{ summarize.output.text }}",
    "sources": "{{ filter_results.output }}",
    "documentsSearched": "{{ search.output.resultCount }}",
    "metadata": {
      "collections_searched": 2,
      "total_results": "{{ merge_results.output.resultCount }}"
    }
  }
}
```

Output can contain nested objects with a mix of static values and template expressions.

## Conditional Steps

Use the `condition` field to skip steps based on runtime values:

```json
{
  "id": "ingest_doc",
  "tool": "ingest",
  "condition": "{{ similarity_check.output.similarity < 0.85 }}",
  "inputs": {
    "text": "{{ inputs.text }}",
    "source": "{{ inputs.source }}"
  }
}
```

When a condition evaluates to falsy, the step is skipped. Downstream steps that reference a skipped step's output receive `null`.

## forEach

Iterate over arrays:

```json
{
  "id": "embed_each",
  "tool": "embed",
  "forEach": "{{ chunk_step.output.chunks }}",
  "inputs": {
    "text": "{{ item.content }}",
    "model": "voyage-4-large"
  }
}
```

Inside a `forEach` step, `{{ item }}` refers to the current array element. The step's output is an array of results, one per iteration.

## Validation

Check a workflow file for errors:

```bash
vai workflow validate my-workflow.json
```

The validator checks:

- Valid JSON syntax
- Schema conformance (required fields, correct types)
- Step ID uniqueness and naming rules
- Template expression validity (no unresolved references)
- No circular dependencies between steps
- Referenced steps exist
- Execution plan (layer ordering, parallel opportunities)

## Next Steps

- **[Template Expressions](/docs/guides/workflows/template-expressions)**: Expression syntax and examples
- **[Built-in Templates](/docs/guides/workflows/built-in-templates)**: 5 ready-to-use workflows
- **[Writing Workflows](/docs/guides/workflows/writing-workflows)**: Step-by-step tutorial
