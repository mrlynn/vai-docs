---
title: MCP Tool Parameters
description: Detailed parameter schemas for MCP tools
sidebar_position: 2
---

# MCP Tool Parameters

Detailed JSON schemas for each MCP tool's input parameters. These schemas are used by MCP clients to validate tool calls.

## vai_query

```json
{
  "type": "object",
  "properties": {
    "query": { "type": "string", "description": "Search query text" },
    "db": { "type": "string", "description": "MongoDB database name" },
    "collection": { "type": "string", "description": "MongoDB collection name" },
    "model": { "type": "string", "description": "Voyage AI embedding model" },
    "limit": { "type": "number", "description": "Number of results to return", "default": 5 }
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
    "limit": { "type": "number", "description": "Number of results", "default": 5 }
  },
  "required": ["query"]
}
```

## vai_embed

```json
{
  "type": "object",
  "properties": {
    "text": { "type": "string", "description": "Text to embed" },
    "model": { "type": "string", "description": "Embedding model", "default": "voyage-4-large" },
    "inputType": { "type": "string", "enum": ["query", "document"], "default": "document" },
    "dimensions": { "type": "number", "description": "Output dimensions" }
  },
  "required": ["text"]
}
```

## vai_similarity

```json
{
  "type": "object",
  "properties": {
    "text1": { "type": "string", "description": "First text to compare" },
    "text2": { "type": "string", "description": "Second text to compare" },
    "model": { "type": "string", "description": "Embedding model", "default": "voyage-4-large" }
  },
  "required": ["text1", "text2"]
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
    "category": { "type": "string", "enum": ["embedding", "reranking", "all"], "default": "all" }
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
    "db": { "type": "string", "description": "Database name" },
    "collection": { "type": "string", "description": "Collection name" },
    "model": { "type": "string", "description": "Embedding model" },
    "chunkStrategy": { "type": "string", "enum": ["fixed", "sentence", "paragraph", "recursive", "markdown"] },
    "chunkSize": { "type": "number", "description": "Chunk size in characters", "default": 512 }
  },
  "required": ["text"]
}
```

## vai_topics

```json
{
  "type": "object",
  "properties": {
    "query": { "type": "string", "description": "Filter topics by keyword" }
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

## Further Reading

- [MCP Tools](./mcp-tools) — Tool descriptions and usage
- [`vai mcp`](/docs/commands/mcp/mcp) — Server command reference
