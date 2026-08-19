---
title: MCP Tool Parameters
description: Detailed parameter schemas for MCP tools
sidebar_position: 2
---

# MCP Tool Parameters

JSON-oriented shapes for MCP tool inputs. The live server uses Zod schemas in [voyageai-cli](https://github.com/mrlynn/voyageai-cli) (`src/mcp/schemas/index.js`); this page tracks the same fields agents and integrators care about.

## vai_query

```json
{
  "type": "object",
  "properties": {
    "query": { "type": "string", "description": "Search query text" },
    "db": { "type": "string", "description": "MongoDB database name" },
    "collection": { "type": "string", "description": "MongoDB collection name" },
    "limit": { "type": "number", "description": "Max results (1–50)", "default": 5 },
    "model": { "type": "string", "description": "Voyage AI embedding model" },
    "rerank": { "type": "boolean", "description": "Rerank with Voyage reranker", "default": true },
    "filter": { "type": "object", "description": "MongoDB pre-filter for vector search" }
  },
  "required": ["query"]
}
```

## vai_search

```json
{
  "type": "object",
  "properties": {
    "query": { "type": "string", "description": "Search query text" },
    "db": { "type": "string", "description": "MongoDB database name" },
    "collection": { "type": "string", "description": "MongoDB collection name" },
    "limit": { "type": "number", "description": "Max results (1–100)", "default": 10 },
    "model": { "type": "string", "description": "Embedding model" },
    "filter": { "type": "object", "description": "MongoDB pre-filter" }
  },
  "required": ["query"]
}
```

## vai_rerank

```json
{
  "type": "object",
  "properties": {
    "query": { "type": "string", "description": "Query to rank documents against" },
    "documents": { "type": "array", "items": { "type": "string" }, "description": "Candidate texts (1–100)" },
    "model": { "type": "string", "enum": ["rerank-2.5", "rerank-2.5-lite"], "default": "rerank-2.5" }
  },
  "required": ["query", "documents"]
}
```

## vai_embed

```json
{
  "type": "object",
  "properties": {
    "text": { "type": "string", "description": "Text to embed" },
    "model": { "type": "string", "description": "Embedding model", "default": "voyage-4-large" },
    "inputType": { "type": "string", "enum": ["document", "query"], "default": "query" },
    "dimensions": { "type": "number", "description": "Output dimensions (Matryoshka models)" }
  },
  "required": ["text"]
}
```

## vai_similarity

```json
{
  "type": "object",
  "properties": {
    "text1": { "type": "string", "description": "First text" },
    "text2": { "type": "string", "description": "Second text" },
    "model": { "type": "string", "description": "Embedding model", "default": "voyage-4-large" }
  },
  "required": ["text1", "text2"]
}
```

## vai_multimodal_embed

```json
{
  "type": "object",
  "properties": {
    "text": { "type": "string", "description": "Optional text" },
    "image_base64": { "type": "string", "description": "Image data URL (e.g. data:image/jpeg;base64,...)" },
    "video_base64": { "type": "string", "description": "Video data URL" },
    "model": { "type": "string", "default": "voyage-multimodal-3.5" },
    "inputType": { "type": "string", "enum": ["document", "query"] },
    "outputDimension": { "type": "number", "description": "256, 512, 1024, or 2048" }
  }
}
```

## vai_collections

```json
{
  "type": "object",
  "properties": {
    "db": { "type": "string", "description": "Database name" }
  }
}
```

## vai_models

```json
{
  "type": "object",
  "properties": {
    "category": { "type": "string", "enum": ["embedding", "rerank", "all"], "default": "all" }
  }
}
```

## vai_ingest

```json
{
  "type": "object",
  "properties": {
    "text": { "type": "string", "description": "Document text to ingest" },
    "source": { "type": "string", "description": "Source identifier" },
    "db": { "type": "string" },
    "collection": { "type": "string" },
    "metadata": { "type": "object", "description": "Additional metadata" },
    "chunkStrategy": { "type": "string", "enum": ["fixed", "sentence", "paragraph", "recursive", "markdown"] },
    "chunkSize": { "type": "number", "default": 512 },
    "model": { "type": "string", "default": "voyage-4-large" }
  },
  "required": ["text"]
}
```

## vai_topics

```json
{
  "type": "object",
  "properties": {
    "search": { "type": "string", "description": "Optional keyword filter when listing topics" }
  }
}
```

## vai_explain

```json
{
  "type": "object",
  "properties": {
    "topic": { "type": "string", "description": "Topic key to explain" }
  },
  "required": ["topic"]
}
```

## vai_estimate

```json
{
  "type": "object",
  "properties": {
    "docs": { "type": "number", "description": "Number of documents to embed" },
    "queries": { "type": "number", "description": "Queries per month", "default": 0 },
    "months": { "type": "number", "description": "Time horizon (1–60)", "default": 12 }
  },
  "required": ["docs"]
}
```

## vai_index_workspace

```json
{
  "type": "object",
  "properties": {
    "path": { "type": "string", "description": "Workspace directory" },
    "db": { "type": "string" },
    "collection": { "type": "string" },
    "contentType": { "type": "string", "enum": ["code", "docs", "config", "all"], "default": "code" },
    "model": { "type": "string", "default": "voyage-4-large" },
    "maxFiles": { "type": "number", "default": 1000 },
    "maxFileSize": { "type": "number", "default": 100000 },
    "chunkSize": { "type": "number", "default": 512 },
    "chunkOverlap": { "type": "number", "default": 50 },
    "batchSize": { "type": "number", "default": 10 }
  }
}
```

## vai_search_code

```json
{
  "type": "object",
  "properties": {
    "query": { "type": "string" },
    "db": { "type": "string" },
    "collection": { "type": "string" },
    "limit": { "type": "number", "default": 10 },
    "language": { "type": "string" },
    "category": { "type": "string", "enum": ["code", "docs", "config"] },
    "model": { "type": "string" },
    "filter": { "type": "object" }
  },
  "required": ["query"]
}
```

## vai_explain_code

```json
{
  "type": "object",
  "properties": {
    "code": { "type": "string" },
    "language": { "type": "string" },
    "db": { "type": "string" },
    "collection": { "type": "string" },
    "contextLimit": { "type": "number", "default": 5 },
    "model": { "type": "string" }
  },
  "required": ["code"]
}
```

## vai_code_index

```json
{
  "type": "object",
  "properties": {
    "source": { "type": "string", "description": "Local path or GitHub repo URL" },
    "db": { "type": "string" },
    "collection": { "type": "string" },
    "model": { "type": "string" },
    "branch": { "type": "string", "default": "main" },
    "maxFiles": { "type": "number", "default": 5000 },
    "maxFileSize": { "type": "number", "default": 100000 },
    "chunkSize": { "type": "number", "default": 512 },
    "chunkOverlap": { "type": "number", "default": 50 },
    "batchSize": { "type": "number", "default": 20 },
    "refresh": { "type": "boolean", "default": false },
    "forceReindex": { "type": "boolean", "default": false },
    "contentType": { "type": "string", "enum": ["code", "docs", "config", "all"], "default": "code" }
  },
  "required": ["source"]
}
```

## vai_code_search

```json
{
  "type": "object",
  "properties": {
    "query": { "type": "string" },
    "db": { "type": "string" },
    "collection": { "type": "string" },
    "limit": { "type": "number", "default": 10 },
    "language": { "type": "string" },
    "category": { "type": "string", "enum": ["code", "docs", "config"] },
    "rerank": { "type": "boolean", "default": true },
    "rerankModel": { "type": "string", "enum": ["rerank-2.5", "rerank-2.5-lite"], "default": "rerank-2.5" },
    "model": { "type": "string" },
    "filter": { "type": "object" }
  },
  "required": ["query"]
}
```

## vai_code_query

```json
{
  "type": "object",
  "properties": {
    "query": { "type": "string" },
    "db": { "type": "string" },
    "collection": { "type": "string" },
    "limit": { "type": "number", "default": 5 },
    "language": { "type": "string" },
    "model": { "type": "string" },
    "filter": { "type": "object" }
  },
  "required": ["query"]
}
```

## vai_code_find_similar

```json
{
  "type": "object",
  "properties": {
    "code": { "type": "string" },
    "db": { "type": "string" },
    "collection": { "type": "string" },
    "limit": { "type": "number", "default": 10 },
    "language": { "type": "string" },
    "model": { "type": "string" },
    "threshold": { "type": "number", "default": 0.5 },
    "filter": { "type": "object" }
  },
  "required": ["code"]
}
```

## vai_code_status

```json
{
  "type": "object",
  "properties": {
    "db": { "type": "string" },
    "collection": { "type": "string" }
  }
}
```

## vai_generate_workflow

```json
{
  "type": "object",
  "properties": {
    "description": { "type": "string" },
    "category": {
      "type": "string",
      "enum": ["retrieval", "analysis", "ingestion", "domain-specific", "utility", "integration"]
    },
    "tools": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["description"]
}
```

## vai_validate_workflow

```json
{
  "type": "object",
  "properties": {
    "workflow": {
      "type": "object",
      "description": "Workflow JSON with steps[] (id, tool, inputs, …)"
    }
  },
  "required": ["workflow"]
}
```

## Further reading

- [MCP Tools](./mcp-tools) — What each tool does
- [`vai mcp`](/docs/commands/mcp) — Server command reference
