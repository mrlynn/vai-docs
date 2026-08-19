---
title: MCP Tools
description: Reference for all MCP server tools
sidebar_position: 1
---

# MCP Tools Reference

The vai MCP server exposes **22 tools** across **eight domains** that AI agents can call via the [Model Context Protocol](https://modelcontextprotocol.io).

| Domain | Tools |
|--------|--------|
| Retrieval | `vai_query`, `vai_search`, `vai_rerank` |
| Embedding | `vai_embed`, `vai_similarity`, `vai_multimodal_embed` |
| Management | `vai_collections`, `vai_models` |
| Utility | `vai_topics`, `vai_explain`, `vai_estimate` |
| Ingest | `vai_ingest` |
| Workspace | `vai_index_workspace`, `vai_search_code`, `vai_explain_code` |
| Code search (MongoDB code index) | `vai_code_index`, `vai_code_search`, `vai_code_query`, `vai_code_find_similar`, `vai_code_status` |
| Authoring | `vai_generate_workflow`, `vai_validate_workflow` |

:::info `vai_search_code` vs `vai_code_search`
**`vai_search_code`** ([workspace tools](#workspace-tools)) searches chunks stored by **`vai_index_workspace`**. **`vai_code_search`** ([code search index](#code-search-tools)) searches chunks stored by **`vai_code_index`**. Use the tool family that matches how the collection was built.
:::

## Retrieval tools

### vai_query

Full RAG query: embed query text, vector search MongoDB Atlas, optionally rerank.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Search query text |
| `db` | string | — | Database name |
| `collection` | string | — | Collection name |
| `limit` | number | — | Max results (1–50, default 5) |
| `model` | string | — | Embedding model |
| `rerank` | boolean | — | Use Voyage reranker (default true) |
| `filter` | object | — | MongoDB pre-filter for `$vectorSearch` |

### vai_search

Vector search **without** reranking — faster, distance-ordered results.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Search query text |
| `db` | string | — | Database name |
| `collection` | string | — | Collection name |
| `limit` | number | — | Max results (1–100, default 10) |
| `model` | string | — | Embedding model |
| `filter` | object | — | MongoDB pre-filter |

### vai_rerank

Rerank arbitrary document strings against a query (does not hit MongoDB).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Query to rank against |
| `documents` | string[] | ✅ | Candidate texts (1–100) |
| `model` | string | — | `rerank-2.5` or `rerank-2.5-lite` |

## Embedding tools

### vai_embed

Generate a vector embedding for text.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | ✅ | Text to embed |
| `model` | string | — | Embedding model |
| `inputType` | string | — | `document` or `query` |
| `dimensions` | number | — | Matryoshka dimensions when supported |

### vai_similarity

Cosine similarity between two texts (−1 to 1).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text1` | string | ✅ | First text |
| `text2` | string | ✅ | Second text |
| `model` | string | — | Embedding model |

### vai_multimodal_embed

Multimodal embedding (`voyage-multimodal-3.5` by default). At least one of text, image, or video payload is required.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | — | Optional text |
| `image_base64` | string | — | Image as base64 data URL |
| `video_base64` | string | — | Video as base64 data URL |
| `model` | string | — | Multimodal model |
| `inputType` | string | — | `document` or `query` |
| `outputDimension` | number | — | e.g. 256 /512 /1024 /2048 |

## Management tools

### vai_collections

List collections (with vector index info when available).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `db` | string | — | Database name |

### vai_models

List Voyage AI models.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | — | `embedding`, `rerank`, or `all` |

## Utility tools

### vai_topics

Discover explainer topics (call before `vai_explain` for best UX).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | — | Filter topics by keyword |

### vai_explain

Long-form explanation for a topic key (fuzzy matching).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `topic` | string | ✅ | Topic to explain |

### vai_estimate

Rough cost estimate for document and query volume.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docs` | number | ✅ | Document count |
| `queries` | number | — | Queries per month |
| `months` | number | — | Horizon (1–60) |

## Ingest tool

### vai_ingest

Chunk, embed, and store a document in MongoDB.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | ✅ | Body to ingest |
| `source` | string | — | Source label |
| `db` / `collection` | string | — | Target |
| `metadata` | object | — | Extra metadata |
| `chunkStrategy` | string | — | Chunking strategy |
| `chunkSize` | number | — | Target chunk size |
| `model` | string | — | Embedding model |

## Workspace tools {#workspace-tools}

Indexed with **`vai_index_workspace`**; search with **`vai_search_code`**; contextual narration with **`vai_explain_code`**.

### vai_index_workspace

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | string | — | Workspace directory |
| `db` / `collection` | string | — | Target |
| `contentType` | string | — | `code`, `docs`, `config`, or `all` |
| `model` | string | — | Embedding model |
| `maxFiles` / `maxFileSize` | number | — | Safety caps |
| `chunkSize` / `chunkOverlap` / `batchSize` | number | — | Chunking & batching |

### vai_search_code

Semantic search over workspace-indexed code (not the `vai_code_*` pipeline).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Search query |
| `db` / `collection` | string | — | Target |
| `limit` | number | — | Max results |
| `language` / `category` | string | — | Metadata filters |
| `model` | string | — | Embedding model |
| `filter` | object | — | Extra MongoDB filter |

### vai_explain_code

Explain a snippet using retrieved context from the indexed workspace.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | ✅ | Code to explain |
| `language` | string | — | Language hint |
| `db` / `collection` | string | — | Where context lives |
| `contextLimit` | number | — | Docs to pull |
| `model` | string | — | Embedding model |

## Code search (MongoDB code index) {#code-search-tools}

These tools operate on collections populated by **`vai_code_index`** (local path or GitHub URL). They use code-oriented embeddings by default and support incremental refresh and status consistent with [`vai code-search`](/docs/commands/data-management/code-search).

### vai_code_index

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `source` | string | ✅ | Local path or GitHub URL |
| `db` / `collection` | string | — | Target |
| `model` | string | — | Embedding model |
| `branch` | string | — | Git branch for remote repos |
| `maxFiles` / `maxFileSize` | number | — | Caps |
| `chunkSize` / `chunkOverlap` / `batchSize` | number | — | Chunking |
| `refresh` | boolean | — | Incremental refresh |
| `forceReindex` | boolean | — | Wipe workspace slice and rebuild |
| `contentType` | string | — | `code`, `docs`, `config`, `all` |

### vai_code_search

Semantic search over the code index (meaning, not grep).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Natural language query |
| `db` / `collection` | string | — | Target |
| `limit` | number | — | Max results |
| `language` / `category` | string | — | Filters |
| `rerank` / `rerankModel` | boolean / string | — | Reranking |
| `model` | string | — | Query embedding model |
| `filter` | object | — | MongoDB filter |

### vai_code_query

RAG-style retrieval + rerank for questions grounded in indexed code.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Question |
| `db` / `collection` | string | — | Target |
| `limit` | number | — | Max chunks |
| `language` | string | — | Filter |
| `model` | string | — | Embedding model |
| `filter` | object | — | MongoDB filter |

### vai_code_find_similar

Embed a pasted snippet; return nearest indexed chunks.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | ✅ | Snippet |
| `db` / `collection` | string | — | Target |
| `limit` | number | — | Max hits |
| `language` | string | — | Filter |
| `model` | string | — | Embedding model |
| `threshold` | number | — | Min similarity 0–1 |
| `filter` | object | — | MongoDB filter |

### vai_code_status

Stats and index health for a code-search collection.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `db` / `collection` | string | — | Target |

## Authoring tools

### vai_generate_workflow

Generate a vai workflow JSON from a natural language description.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `description` | string | ✅ | What the workflow should do |
| `category` | string | — | Hint: retrieval, analysis, etc. |
| `tools` | string[] | — | Explicit tool names |

### vai_validate_workflow

Validate workflow structure, dependencies, and tool references.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflow` | object | ✅ | Full workflow definition |

## Using MCP tools

```bash
# Install into your AI tool
vai mcp install all

# Start the server manually (for testing)
vai mcp --verbose
```

Once installed, your AI agent can call these tools directly.

## Further reading

- [`vai mcp`](/docs/commands/mcp) — MCP server command reference
- [MCP Tool Parameters](./mcp-tool-parameters) — JSON-oriented parameter schemas
- [MCP Server Guide](/docs/guides/mcp-server/overview) — Setup guide
