---
title: Workflows Overview
description: Composable, multi-step RAG pipelines defined as JSON
sidebar_position: 1
---

# Agentic Workflows

vai workflows are composable, multi-step RAG pipelines defined as portable JSON files. Think of them like Docker Compose for search pipelines: you declare the steps, their dependencies, and vai handles execution order, parallelism, and data flow.

## Why Workflows?

Individual vai commands handle single operations well. But real RAG pipelines often need multiple steps:

- Search two collections, merge results, then rerank
- Check if a document already exists before ingesting
- Query a knowledge base, then summarize results with an LLM

Workflows let you define these pipelines once and run them repeatedly with different inputs.

## Key Concepts

### Steps

Each step in a workflow has a unique ID, a tool to execute, and inputs. Steps can reference outputs from other steps using template expressions.

```json
{
  "id": "search_api",
  "tool": "query",
  "inputs": {
    "query": "{{ inputs.query }}",
    "collection": "api_docs",
    "limit": 10
  }
}
```

### Template Expressions

The `{{ }}` syntax lets steps reference workflow inputs, defaults, and outputs from other steps:

- `{{ inputs.query }}`: Workflow input provided at runtime
- `{{ defaults.db }}`: Default value from workflow definition
- `{{ search_api.output.results }}`: Output from a previous step
- `{{ search_api.output.results[0].content }}`: Array indexing

### Parallel Execution

vai analyzes step dependencies and builds an execution plan. Steps with no inter-dependencies run in parallel:

```
Layer 1: search_api, search_arch  (parallel)
Layer 2: merge                     (depends on both searches)
Layer 3: rerank_all               (depends on merge)
```

### Conditional Steps

Steps can include a `condition` that determines whether they execute:

```json
{
  "id": "ingest_doc",
  "tool": "ingest",
  "condition": "{{ similarity_check.output.similarity < 0.85 }}"
}
```

## Available Step Types

### VAI Tools

| Tool | Description |
|------|-------------|
| `query` | Vector search with optional reranking |
| `search` | Vector search without reranking |
| `rerank` | Rerank documents by relevance |
| `embed` | Generate embeddings |
| `similarity` | Compare text similarity |
| `ingest` | Chunk, embed, and store documents |
| `collections` | List MongoDB collections with vector indexes |
| `models` | List available Voyage AI models |
| `explain` | Look up educational topic content |
| `estimate` | Estimate embedding costs |

### Control Flow

| Tool | Description |
|------|-------------|
| `merge` | Concatenate arrays from multiple steps, optional dedup |
| `filter` | Filter arrays by condition |
| `transform` | Reshape data (pick fields, rename) |

### LLM

| Tool | Description |
|------|-------------|
| `generate` | Call an LLM (Anthropic, OpenAI, Ollama) with a prompt |

## Quick Example

Search two collections, merge results, and rerank:

```bash
vai workflow run multi-collection-search \
  --input query="what are embeddings" \
  --input collection1=api_docs \
  --input collection2=tutorials
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `vai workflow list` | Show built-in templates |
| `vai workflow validate <file>` | Check syntax, dependencies, cycles |
| `vai workflow run <file>` | Execute a workflow |
| `vai workflow init` | Scaffold a new workflow file |

## Next Steps

- **[Built-in Templates](/docs/guides/workflows/built-in-templates)**: 5 ready-to-use workflows
- **[Writing Workflows](/docs/guides/workflows/writing-workflows)**: Step-by-step guide
- **[Schema Reference](/docs/guides/workflows/schema-reference)**: Complete field reference
- **[Template Expressions](/docs/guides/workflows/template-expressions)**: Expression grammar
