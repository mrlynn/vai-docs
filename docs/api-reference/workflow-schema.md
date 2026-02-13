---
title: Workflow Schema
description: Complete JSON schema for vai workflow definition files
sidebar_position: 5
---

# Workflow Schema

This page provides the complete schema for vai workflow JSON files. Workflow files define multi-step RAG pipelines as portable, declarative configurations.

## TypeScript Interface

```typescript
interface VaiWorkflow {
  // Identity
  $schema?: string;
  name: string;
  description?: string;
  version?: string;

  // Parameterization
  inputs?: Record<string, WorkflowInput>;

  // Shared defaults
  defaults?: WorkflowDefaults;

  // The pipeline
  steps: WorkflowStep[];

  // What the workflow produces
  output?: Record<string, any>;
}

interface WorkflowInput {
  type: "string" | "number" | "boolean";
  description?: string;
  required?: boolean;
  default?: any;
}

interface WorkflowDefaults {
  db?: string;
  collection?: string;
  model?: string;
}

interface WorkflowStep {
  id: string;
  name?: string;
  description?: string;
  tool: StepTool;
  inputs: Record<string, any>;
  condition?: string;
  forEach?: string;
  continueOnError?: boolean;
}

type StepTool =
  // VAI tools
  | "query"
  | "search"
  | "rerank"
  | "embed"
  | "similarity"
  | "ingest"
  | "collections"
  | "models"
  | "explain"
  | "estimate"
  // Control flow
  | "merge"
  | "filter"
  | "transform"
  // LLM
  | "generate";
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "vai Workflow",
  "description": "A multi-step RAG pipeline definition for vai",
  "type": "object",
  "required": ["name", "steps"],
  "properties": {
    "$schema": {
      "type": "string",
      "description": "Schema URL for IDE validation"
    },
    "name": {
      "type": "string",
      "description": "Human-readable workflow name"
    },
    "description": {
      "type": "string",
      "description": "What this workflow does"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Semver version"
    },
    "inputs": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "required": ["type"],
        "properties": {
          "type": {
            "type": "string",
            "enum": ["string", "number", "boolean"]
          },
          "description": { "type": "string" },
          "required": { "type": "boolean" },
          "default": {}
        }
      }
    },
    "defaults": {
      "type": "object",
      "properties": {
        "db": { "type": "string" },
        "collection": { "type": "string" },
        "model": { "type": "string" }
      }
    },
    "steps": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["id", "tool", "inputs"],
        "properties": {
          "id": {
            "type": "string",
            "pattern": "^[a-zA-Z_][a-zA-Z0-9_]*$",
            "description": "Unique step identifier"
          },
          "name": {
            "type": "string",
            "description": "Human-readable label"
          },
          "description": {
            "type": "string"
          },
          "tool": {
            "type": "string",
            "enum": [
              "query", "search", "rerank", "embed",
              "similarity", "ingest", "collections",
              "models", "explain", "estimate",
              "merge", "filter", "transform",
              "generate"
            ]
          },
          "inputs": {
            "type": "object",
            "description": "Tool-specific inputs with template expression support"
          },
          "condition": {
            "type": "string",
            "description": "Template expression; step runs only if truthy"
          },
          "forEach": {
            "type": "string",
            "description": "Template expression resolving to an array"
          },
          "continueOnError": {
            "type": "boolean",
            "default": false
          }
        }
      }
    },
    "output": {
      "type": "object",
      "description": "Template expressions defining workflow result"
    }
  }
}
```

## Tool Input Schemas

### query

Full RAG query with optional reranking.

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | **Yes** | The search query |
| `db` | string | No | Database name (uses defaults) |
| `collection` | string | No | Collection name (uses defaults) |
| `limit` | number | No | Max results (default: 5) |
| `filter` | object | No | MongoDB pre-filter for vector search |
| `rerank` | boolean | No | Whether to rerank results (default: true) |
| `model` | string | No | Voyage AI embedding model |

### search

Raw vector similarity search without reranking.

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | **Yes** | The search query |
| `db` | string | No | Database name |
| `collection` | string | No | Collection name |
| `limit` | number | No | Max results (default: 10) |
| `filter` | object | No | MongoDB pre-filter |
| `model` | string | No | Embedding model |

### rerank

Rerank documents against a query.

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | **Yes** | The query to rank against |
| `documents` | array | **Yes** | Documents to rerank |
| `model` | string | No | Reranking model (default: rerank-2.5) |

### embed

Generate an embedding vector.

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | **Yes** | Text to embed |
| `model` | string | No | Embedding model |
| `inputType` | `"document"` \| `"query"` | No | Whether text is a document or query |
| `dimensions` | number | No | Output dimensions for Matryoshka models |

### similarity

Compare two texts semantically.

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `text1` | string | **Yes** | First text |
| `text2` | string | **Yes** | Second text |
| `model` | string | No | Embedding model |

### ingest

Chunk, embed, and store a document.

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | **Yes** | Document text |
| `source` | string | No | Source identifier for citations |
| `db` | string | No | Database name |
| `collection` | string | No | Collection name |
| `chunkSize` | number | No | Target chunk size in characters (default: 512) |
| `chunkStrategy` | string | No | Chunking strategy: fixed, sentence, paragraph, recursive, markdown |
| `model` | string | No | Embedding model |
| `metadata` | object | No | Additional metadata to store |

### estimate

Estimate embedding costs.

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `docs` | number | **Yes** | Number of documents to embed |
| `queries` | number | No | Queries per month (default: 0) |
| `months` | number | No | Time horizon in months (default: 12) |

### merge

Concatenate arrays from multiple steps.

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `arrays` | array | **Yes** | Template expressions resolving to arrays |
| `dedup` | boolean | No | Remove duplicates (default: false) |
| `dedup_field` | string | No | Field to use for dedup comparison |

### filter

Filter array items by condition.

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `array` | string | **Yes** | Template expression resolving to an array |
| `condition` | string | **Yes** | Condition using `item` as current element |

### generate

Call the configured LLM.

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `prompt` | string | **Yes** | The user prompt |
| `context` | any | No | Context data for the LLM |
| `systemPrompt` | string | No | System message |

## Validation

Validate any workflow file against this schema:

```bash
vai workflow validate my-workflow.json
```

The validator checks:
- JSON syntax
- Schema conformance
- Step ID uniqueness and naming conventions
- Template expression validity
- Circular dependency detection
- Step reference resolution
- Execution plan generation

## Next Steps

- **[Schema Reference](/docs/guides/workflows/schema-reference)**: Field-by-field documentation
- **[Template Expressions](/docs/guides/workflows/template-expressions)**: Expression grammar
- **[Built-in Templates](/docs/guides/workflows/built-in-templates)**: See the schema in practice
