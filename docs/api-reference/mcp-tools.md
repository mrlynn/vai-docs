---
title: MCP Tools
description: Reference for all MCP server tools
sidebar_position: 1
---

# MCP Tools Reference

The vai MCP server exposes 11 tools across 5 domains that AI agents can call via the Model Context Protocol.

## Retrieval Tools

### vai_query

Full RAG query: embed query text, vector search MongoDB, rerank results.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Search query text |
| `db` | string | — | Database name (falls back to project config) |
| `collection` | string | — | Collection name |
| `model` | string | — | Embedding model |
| `limit` | number | — | Number of results |

### vai_search

Vector search without reranking — faster, simpler retrieval.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Search query text |
| `db` | string | — | Database name |
| `collection` | string | — | Collection name |
| `limit` | number | — | Number of results |

## Embedding Tools

### vai_embed

Generate a vector embedding for text.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | ✅ | Text to embed |
| `model` | string | — | Embedding model |
| `inputType` | string | — | `query` or `document` |
| `dimensions` | number | — | Output dimensions |

### vai_similarity

Compare two texts semantically using cosine similarity.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text1` | string | ✅ | First text |
| `text2` | string | ✅ | Second text |
| `model` | string | — | Embedding model |

## Management Tools

### vai_collections

List collections in a database with vector index information.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `db` | string | — | Database name |

### vai_models

List available Voyage AI models.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | — | Filter: `embedding`, `reranking`, or `all` |

## Utility Tools

### vai_topics

List available educational topics from `vai explain`.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | — | Filter/search topics by keyword |

### vai_explain

Get a detailed explanation of an embedding/RAG concept.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `topic` | string | ✅ | Topic key (e.g., `embeddings`, `reranking`) |

## Ingest Tool

### vai_ingest

Chunk, embed, and store a document in MongoDB.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | ✅ | Document text to ingest |
| `source` | string | — | Source identifier for metadata |
| `db` | string | — | Database name |
| `collection` | string | — | Collection name |
| `model` | string | — | Embedding model |
| `chunkStrategy` | string | — | Chunking strategy |
| `chunkSize` | number | — | Chunk size in characters |

## Using MCP Tools

```bash
# Install into your AI tool
vai mcp install all

# Start the server manually (for testing)
vai mcp --verbose
```

Once installed, your AI agent can call these tools directly. For example, in Claude Desktop, you can ask "Search my knowledge base for authentication docs" and Claude will call `vai_query` automatically.

## Further Reading

- [`vai mcp`](/docs/commands/mcp) — MCP server command reference
- [MCP Tool Parameters](./mcp-tool-parameters) — Detailed parameter schemas
- [MCP Server Guide](/docs/guides/mcp-server/overview) — Setup guide
