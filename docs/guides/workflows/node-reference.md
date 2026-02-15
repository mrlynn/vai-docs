---
title: Node Reference
description: Complete reference for all 21 workflow node types
sidebar_position: 3
---

# Workflow Node Reference

Every workflow step uses a `tool` field that selects one of the node types listed below. Nodes are organized into eight categories: Retrieval, Embedding, Processing, Control Flow, Generation, Integration, Management, and Utility.

Each node section documents what it does, its inputs and outputs, and practical tips for using it in pipelines.

## Retrieval

### query

Performs a full RAG query: embeds your question with Voyage AI, runs vector search against MongoDB Atlas, and reranks the results for maximum relevance.

**How it works:** Takes your natural language query, converts it to a vector embedding using a Voyage AI model, then performs an approximate nearest neighbor search against the specified MongoDB Atlas collection. The initial candidates are reranked using a neural reranker to surface the most relevant documents.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | The natural language question or search text. |
| `collection` | string | No | MongoDB collection name. Falls back to project default if omitted. |
| `db` | string | No | MongoDB database name. Falls back to project default if omitted. |
| `limit` | number | No | Maximum number of results to return (default: 5). |
| `filter` | object | No | MongoDB pre-filter applied during vector search to narrow candidates. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `results` | array | Array of matched documents, each with text, source, relevanceScore, and metadata. |
| `query` | string | The original query string. |
| `model` | string | The embedding model used. |

#### Example

```json
{
  "id": "find_docs",
  "tool": "query",
  "name": "Find relevant docs",
  "inputs": {
    "query": "{{ inputs.question }}",
    "collection": "knowledge",
    "limit": 5,
    "filter": { "metadata.type": "api-doc" }
  }
}
```

:::tip
Use the `filter` parameter to narrow results by metadata fields before vector search runs, improving both relevance and speed. Pair with a `generate` node to build a complete RAG pipeline.
:::

### search

Raw vector similarity search without reranking. Faster than RAG Query but results are ordered by vector distance only.

**How it works:** Embeds your query text using a Voyage AI model, then performs an approximate nearest neighbor search against the specified MongoDB Atlas vector index. Returns results ordered by cosine similarity score, without applying a neural reranker.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | The search query text. |
| `collection` | string | No | MongoDB collection name. |
| `db` | string | No | MongoDB database name. |
| `limit` | number | No | Maximum results to return (default: 10). |
| `filter` | object | No | MongoDB pre-filter for vector search. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `results` | array | Array of matched documents with text, source, and similarity score. |
| `query` | string | The original query string. |

#### Example

```json
{
  "id": "vec_search",
  "tool": "search",
  "name": "Vector search",
  "inputs": {
    "query": "{{ inputs.question }}",
    "limit": 20
  }
}
```

:::tip
Use `search` instead of `query` when speed matters more than precision, or when you plan to rerank separately with a downstream `rerank` node.
:::

### rerank

Reorders a list of documents by relevance to a query using a Voyage AI neural reranker.

**How it works:** Takes a query and an array of document texts, then uses a Voyage AI reranking model to score each document against the query. Returns the documents sorted by relevance score, with the most relevant first.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | The query to rank documents against. |
| `documents` | array | Yes | Array of document text strings to rerank. |
| `model` | string | No | Reranking model (default: `rerank-2.5`). Use `rerank-2.5-lite` for faster results. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `results` | array | Reranked documents with `index` and `relevance_score` fields. |
| `model` | string | The reranking model used. |

#### Example

```json
{
  "id": "rerank_results",
  "tool": "rerank",
  "name": "Rerank search results",
  "inputs": {
    "query": "{{ inputs.question }}",
    "documents": "{{ vec_search.output.results }}"
  }
}
```

:::tip
Feed the output of a `search` node into `rerank` for a two-stage retrieval pipeline. Reranking works best with 10 to 50 candidate documents.
:::

### ingest

Chunks text, embeds each chunk with Voyage AI, and stores the vectors in MongoDB Atlas.

**How it works:** Takes raw text content and a source identifier, splits the text into chunks using the specified strategy, generates vector embeddings for each chunk via the Voyage AI API, and inserts the embedded chunks into the target MongoDB Atlas collection.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | The text content to ingest. |
| `collection` | string | No | Target MongoDB collection. |
| `db` | string | No | Target MongoDB database. |
| `source` | string | No | Source identifier attached to each chunk for citation tracking. |
| `chunkSize` | number | No | Target chunk size in characters (default: 512). |
| `chunkStrategy` | string | No | Chunking strategy: `fixed`, `sentence`, `paragraph`, `recursive`, or `markdown`. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `chunksCreated` | number | Number of chunks created and stored. |
| `source` | string | The source identifier used. |

#### Example

```json
{
  "id": "store_doc",
  "tool": "ingest",
  "name": "Ingest document",
  "inputs": {
    "text": "{{ inputs.document }}",
    "source": "{{ inputs.filename }}",
    "chunkStrategy": "markdown",
    "chunkSize": 512
  }
}
```

:::tip
Use the `markdown` strategy for structured documents with headings to preserve section boundaries. If you need to inspect or filter chunks before embedding, use the `chunk` node first.
:::

## Embedding

### embed

Generates a vector embedding for a piece of text using a Voyage AI embedding model.

**How it works:** Sends the input text to the Voyage AI embeddings API, which returns a high-dimensional vector representation. The vector captures the semantic meaning of the text and can be used for similarity comparisons, clustering, or storage.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | The text to embed. |
| `model` | string | No | Voyage AI embedding model (default: `voyage-3-large`). |
| `inputType` | string | No | Whether this text is a `document` or a `query`. Affects embedding optimization. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `embedding` | array | The vector embedding as an array of floating-point numbers. |
| `model` | string | The model used for embedding. |
| `dimensions` | number | Number of dimensions in the embedding vector. |

#### Example

```json
{
  "id": "get_vector",
  "tool": "embed",
  "name": "Embed the query",
  "inputs": {
    "text": "{{ inputs.question }}",
    "inputType": "query"
  }
}
```

:::tip
Set `inputType` to `query` for search queries and `document` for content being indexed. Embeddings from different models are not comparable: always use the same model for queries and documents.
:::

### similarity

Compares two texts semantically by embedding both and computing cosine similarity.

**How it works:** Embeds both input texts using the same Voyage AI model, then computes the cosine similarity between the two vectors. Returns a score from -1 (opposite meaning) to 1 (identical meaning).

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text1` | string | Yes | The first text to compare. |
| `text2` | string | Yes | The second text to compare. |
| `model` | string | No | Voyage AI embedding model to use for both texts. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `similarity` | number | Cosine similarity score between -1 and 1. |
| `model` | string | The embedding model used. |

#### Example

```json
{
  "id": "check_dup",
  "tool": "similarity",
  "name": "Check for duplicate",
  "inputs": {
    "text1": "{{ inputs.new_doc }}",
    "text2": "{{ existing.output.text }}"
  }
}
```

:::tip
Scores above 0.8 generally indicate high semantic similarity. Combine with a `conditional` node to branch based on similarity thresholds for deduplication workflows.
:::

## Processing

### chunk

Splits text into smaller chunks using configurable strategies, without embedding. Useful for inspecting or filtering chunks before storage.

**How it works:** Takes raw text and splits it into chunks using one of five strategies: `fixed` (character count), `sentence`, `paragraph`, `recursive` (smart splitting), or `markdown` (heading-aware). Returns the chunks with metadata but does not embed or store them.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | The text content to split into chunks. |
| `strategy` | string | No | Chunking strategy: `fixed`, `sentence`, `paragraph`, `recursive` (default), or `markdown`. |
| `size` | number | No | Target chunk size in characters (default: 512). |
| `overlap` | number | No | Overlap between adjacent chunks in characters (default: 50). |
| `source` | string | No | Source identifier attached to each chunk for tracking. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `chunks` | array | Array of chunk objects, each with `index`, `content`, `charCount`, and `metadata`. |
| `totalChunks` | number | Total number of chunks produced. |
| `strategy` | string | The chunking strategy used. |
| `avgChunkSize` | number | Average character count per chunk. |

#### Example

```json
{
  "id": "split",
  "tool": "chunk",
  "name": "Chunk the document",
  "inputs": {
    "text": "{{ inputs.document_text }}",
    "strategy": "markdown",
    "size": 512,
    "overlap": 50,
    "source": "architecture-overview.md"
  }
}
```

:::tip
Separating chunking from embedding (vs. using `ingest`) gives you more control. Combine with a `filter` node to remove boilerplate or short chunks before embedding.
:::

### aggregate

Runs a MongoDB aggregation pipeline for analytics, grouping, counting, and structured data queries.

**How it works:** Executes a MongoDB aggregation pipeline against the specified collection. Supports all standard aggregation stages (`$match`, `$group`, `$sort`, `$project`, `$limit`, etc.) for flexible data analysis beyond vector search.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pipeline` | array | Yes | MongoDB aggregation pipeline stages as a JSON array. |
| `collection` | string | No | MongoDB collection to aggregate. |
| `db` | string | No | MongoDB database name. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `results` | array | Array of aggregation result documents. |
| `count` | number | Number of result documents. |
| `durationMs` | number | Execution time in milliseconds. |

#### Example

```json
{
  "id": "stats",
  "tool": "aggregate",
  "name": "Count docs by source",
  "inputs": {
    "pipeline": [
      { "$group": { "_id": "$metadata.source", "count": { "$sum": 1 } } },
      { "$sort": { "count": -1 } },
      { "$limit": 10 }
    ]
  }
}
```

:::tip
Use for analytics that vector search cannot express: document counts by source, date-range filtering, metadata grouping. The pipeline is read-only by default.
:::

## Control Flow

### merge

Combines outputs from multiple workflow steps into a single array.

**How it works:** Takes references to outputs from previous steps and merges them into one consolidated array. Supports concatenation (append all), interleaving (alternate items), and unique (deduplicate) strategies.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sources` | array | Yes | Array of step output references to merge (e.g., `["step1.output", "step2.output"]`). |
| `strategy` | string | No | Merge strategy: `concat` (default), `interleave`, or `unique`. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `merged` | array | The combined array of items from all sources. |
| `count` | number | Total number of items in the merged result. |

#### Example

```json
{
  "id": "combine",
  "tool": "merge",
  "name": "Combine results",
  "inputs": {
    "sources": ["{{ search_a.output.results }}", "{{ search_b.output.results }}"],
    "strategy": "unique"
  }
}
```

:::tip
Use the `unique` strategy to deduplicate results from multiple search queries. The `interleave` strategy alternates items from each source, useful for balanced sampling.
:::

### filter

Filters an array of items based on a condition expression, keeping only items that match.

**How it works:** Iterates over an input array and evaluates the condition expression for each item. Items where the condition evaluates to true are kept; others are discarded. The expression has access to each item via the `item` variable.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | string | Yes | Reference to an array from a previous step. |
| `condition` | string | Yes | Expression evaluated per item. Use `item` to reference the current element (e.g., `item.score > 0.5`). |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `items` | array | Array of items that passed the filter condition. |
| `count` | number | Number of items that passed. |
| `removed` | number | Number of items that were filtered out. |

#### Example

```json
{
  "id": "quality_filter",
  "tool": "filter",
  "name": "Keep high-relevance results",
  "inputs": {
    "input": "{{ search.output.results }}",
    "condition": "item.score > 0.7"
  }
}
```

:::tip
Combine numeric and string conditions: `item.metadata.type === 'api-doc' && item.score > 0.5`. Use after a `chunk` node to remove boilerplate: `item.charCount > 100`.
:::

### transform

Maps each item in an array through a transformation expression, producing a new array.

**How it works:** Iterates over an input array and evaluates the expression for each item, collecting the results into a new array. The expression has access to each item via the `item` variable and can extract fields, compute values, or reshape data.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | string | Yes | Reference to an array from a previous step. |
| `expression` | string | Yes | Expression evaluated per item (e.g., `item.text` or `{ title: item.metadata.title, score: item.score }`). |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `items` | array | Array of transformed items. |
| `count` | number | Number of items in the result. |

#### Example

```json
{
  "id": "extract_text",
  "tool": "transform",
  "name": "Extract text fields",
  "inputs": {
    "input": "{{ search.output.results }}",
    "expression": "item.text"
  }
}
```

:::tip
Use before a `rerank` node to prepare document strings from complex objects. Reshape objects to keep only relevant fields: `{ text: item.text, source: item.source }`.
:::

### conditional

Branches workflow execution based on a condition. Routes to different paths depending on whether the condition is true or false.

**How it works:** Evaluates a condition expression against the workflow context. If true, enables the steps listed in the `then` branch. If false, enables the steps in the `else` branch (if provided). Steps in the non-taken branch are skipped. Renders as a diamond shape on the canvas to indicate a decision point.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `condition` | string | Yes | Template expression that resolves to a boolean. |
| `then` | array | Yes | Array of step IDs to enable when condition is true. |
| `else` | array | No | Array of step IDs to enable when condition is false. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `conditionResult` | boolean | The evaluated condition result. |
| `branchTaken` | string | `then` or `else`, indicating which branch was activated. |
| `enabledSteps` | array | List of step IDs that were enabled. |

#### Example

```json
{
  "id": "check_results",
  "tool": "conditional",
  "name": "Any results found?",
  "inputs": {
    "condition": "{{ primary_search.output.results.length > 0 }}",
    "then": ["format_results"],
    "else": ["fallback_search", "format_fallback"]
  }
}
```

:::tip
Steps referenced in `then` and `else` must exist in the workflow's `steps` array. The conditional does not define steps inline; it references existing steps by ID. Use to implement fallback patterns or branch on similarity thresholds.
:::

### loop

Iterates over an array, executing a sub-step for each item. Collects all results into an output array.

**How it works:** Resolves the `items` expression to an array, then sequentially executes the inline sub-step for each element. Each iteration has access to the current item via the variable name specified in `as`. Results accumulate into an output array. A safety limit prevents runaway loops.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | string | Yes | Template reference resolving to an array. |
| `as` | string | Yes | Variable name for the current item, accessible in the sub-step. |
| `step` | object | Yes | Inline step definition executed per item (same schema as a regular step, minus the `id`). |
| `maxIterations` | number | No | Safety limit to prevent runaway loops (default: 100). |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `iterations` | number | Number of iterations completed. |
| `results` | array | Array of sub-step outputs, one per iteration. |
| `errors` | array | Errors from failed iterations (if `continueOnError` is true). |

#### Example

```json
{
  "id": "process_each",
  "tool": "loop",
  "name": "Process each result",
  "inputs": {
    "items": "{{ search.output.results }}",
    "as": "doc",
    "step": {
      "tool": "similarity",
      "inputs": {
        "text1": "{{ doc.content }}",
        "text2": "{{ inputs.reference_text }}"
      }
    },
    "maxIterations": 50
  }
}
```

:::tip
Iterations run sequentially, not in parallel, to avoid API rate limits. Set `maxIterations` to a reasonable limit for your use case to prevent unexpected costs.
:::

### template

Composes a text string from multiple step outputs using template interpolation.

**How it works:** Resolves all `{{ }}` template references in the text against the workflow context (previous step outputs, workflow inputs). Produces a single composed text output. Useful for assembling complex prompts before a `generate` step.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Template string with `{{ }}` references to step outputs and workflow inputs. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `text` | string | The resolved text with all template references replaced. |
| `charCount` | number | Character count of the resolved text. |
| `referencedSteps` | array | List of step IDs referenced in the template. |

#### Example

```json
{
  "id": "build_prompt",
  "tool": "template",
  "name": "Compose LLM context",
  "inputs": {
    "text": "## Search Results\n\n{{ search.output.results }}\n\n## Document Stats\n\nTotal documents: {{ stats.output.count }}\n\n## User Question\n\n{{ inputs.query }}"
  }
}
```

:::tip
Use before a `generate` node to assemble context from multiple sources into a single prompt. Template references use the syntax `{{ stepId.output.field }}`.
:::

## Generation

### generate

Generates text using an LLM (Large Language Model), optionally with retrieved context for grounded responses.

**How it works:** Sends a prompt to the configured LLM provider (OpenAI, Anthropic, or Ollama) along with optional context text. The LLM generates a response based on the prompt and context. This is the generation step in a RAG pipeline.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | Yes | The instruction or question for the LLM. |
| `context` | string | No | Additional context text injected into the LLM prompt (e.g., from a search or template step). |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `text` | string | The generated response text. |
| `model` | string | The LLM model used. |
| `provider` | string | The LLM provider (openai, anthropic, ollama). |

#### Example

```json
{
  "id": "answer",
  "tool": "generate",
  "name": "Generate answer",
  "inputs": {
    "prompt": "Answer the user's question based on the context provided.",
    "context": "{{ build_prompt.output.text }}"
  }
}
```

:::tip
Pair with a `query` or `search` node to build a complete RAG pipeline: retrieve context, then generate an answer. The LLM provider and model are configured in your project settings, not per-node.
:::

## Integration

### http

Makes an outbound HTTP request to an external API. The extensibility node for integrating with any HTTP-accessible service.

**How it works:** Sends an HTTP request to the specified URL with configurable method, headers, body, and timeout. Returns the response status, headers, and body. Supports JSON and text response types. Does not follow redirects by default for security.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | The request URL. Supports template resolution for dynamic URLs. |
| `method` | string | No | HTTP method: `GET` (default), `POST`, `PUT`, `PATCH`, or `DELETE`. |
| `headers` | object | No | Request headers as key-value pairs. |
| `body` | object | No | Request body. Objects are JSON-serialized automatically. |
| `timeout` | number | No | Request timeout in milliseconds (default: 30000). |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `status` | number | HTTP response status code (e.g., 200, 404). |
| `statusText` | string | HTTP status text (e.g., "OK", "Not Found"). |
| `headers` | object | Response headers as key-value pairs. |
| `body` | object | Parsed response body (JSON or text depending on responseType). |
| `durationMs` | number | Request duration in milliseconds. |

#### Example

```json
{
  "id": "notify",
  "tool": "http",
  "name": "Send Slack notification",
  "inputs": {
    "url": "https://hooks.slack.com/services/T00/B00/xxxxx",
    "method": "POST",
    "headers": { "Content-Type": "application/json" },
    "body": {
      "text": "Ingested {{ ingest_step.output.chunksCreated }} chunks"
    },
    "timeout": 10000
  }
}
```

:::tip
Set `continueOnError: true` if the HTTP call is optional and should not block the workflow. Response size is limited to 5MB.
:::

## Management

### collections

Lists MongoDB collections in a database, showing document counts and vector index information.

**How it works:** Connects to the specified MongoDB database and enumerates all collections, including their document counts and any vector search indexes configured.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `db` | string | No | MongoDB database name. Uses project default if omitted. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `collections` | array | Array of collection objects with `name`, `documentCount`, and `indexes`. |

#### Example

```json
{
  "id": "list_collections",
  "tool": "collections",
  "name": "List available collections",
  "inputs": { "db": "myapp" }
}
```

:::tip
Use at the start of a workflow to discover what data is available before running queries.
:::

### models

Lists available Voyage AI models with their capabilities, benchmarks, and pricing.

**How it works:** Retrieves the catalog of Voyage AI models, filtered by category. Returns model details including supported dimensions, context length, and per-token pricing.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | No | Filter by category: `embedding`, `rerank`, or `all` (default). |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `models` | array | Array of model objects with `name`, `type`, `dimensions`, `maxTokens`, and `pricing`. |

#### Example

```json
{
  "id": "available_models",
  "tool": "models",
  "name": "List reranking models",
  "inputs": { "category": "rerank" }
}
```

:::tip
Use to programmatically select the best model based on your requirements.
:::

## Utility

### estimate

Estimates costs for Voyage AI embedding and query operations at various scales.

**How it works:** Calculates projected costs based on the number of documents to embed, queries per month, and time horizon. Uses current Voyage AI pricing to provide detailed cost breakdowns.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docs` | number | Yes | Number of documents to embed. |
| `queries` | number | No | Number of queries per month (default: 0). |
| `months` | number | No | Time horizon in months (default: 12). |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `embedding` | object | Embedding cost breakdown with per-document and total costs. |
| `querying` | object | Query cost breakdown with per-query and monthly costs. |
| `total` | object | Total projected cost over the time horizon. |

#### Example

```json
{
  "id": "cost_check",
  "tool": "estimate",
  "name": "Estimate ingestion cost",
  "inputs": {
    "docs": 10000,
    "queries": 500,
    "months": 6
  }
}
```

:::tip
Use before large ingestion jobs to understand the cost impact. Factor in both embedding (one-time) and querying (ongoing) costs.
:::

### explain

Provides a detailed explanation of a Voyage AI or vector search concept.

**How it works:** Looks up the specified topic in the built-in knowledge base and returns a structured explanation with key points, examples, and related resources.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `topic` | string | Yes | The concept or topic to explain (e.g., `embeddings`, `reranking`, `cosine-similarity`). |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | The topic title. |
| `content` | string | Detailed explanation text. |
| `keyPoints` | array | Key takeaways as bullet points. |

#### Example

```json
{
  "id": "learn",
  "tool": "explain",
  "name": "Explain reranking",
  "inputs": { "topic": "reranking" }
}
```

:::tip
Use the `topics` node first to discover available topics, then `explain` to get the full details.
:::

### topics

Lists available educational topics that can be explored with the `explain` node.

**How it works:** Returns the catalog of available topics with summaries. Optionally filters by a search term to find relevant topics.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | No | Optional search term to filter topics by name or description. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `topics` | array | Array of topic objects with `id`, `title`, and `summary`. |

#### Example

```json
{
  "id": "find_topics",
  "tool": "topics",
  "name": "List embedding topics",
  "inputs": { "search": "embedding" }
}
```

:::tip
Omit the `search` parameter to list all available topics. Combine with a `loop` node to generate explanations for multiple topics in sequence.
:::

## Quick Reference

| Node | Category | Purpose |
|------|----------|---------|
| `query` | Retrieval | Full RAG query with embedding + search + rerank |
| `search` | Retrieval | Raw vector similarity search |
| `rerank` | Retrieval | Neural reranking of document candidates |
| `ingest` | Retrieval | Chunk, embed, and store text |
| `embed` | Embedding | Generate vector embedding |
| `similarity` | Embedding | Compare two texts semantically |
| `chunk` | Processing | Split text into chunks without embedding |
| `aggregate` | Processing | MongoDB aggregation pipeline |
| `merge` | Control Flow | Combine outputs from multiple steps |
| `filter` | Control Flow | Keep items matching a condition |
| `transform` | Control Flow | Map items through an expression |
| `conditional` | Control Flow | Branch based on a condition |
| `loop` | Control Flow | Iterate over an array |
| `template` | Control Flow | Compose text from multiple sources |
| `generate` | Generation | LLM text generation |
| `http` | Integration | External HTTP request |
| `collections` | Management | List MongoDB collections |
| `models` | Management | List Voyage AI models |
| `estimate` | Utility | Cost estimation |
| `explain` | Utility | Topic explanation |
| `topics` | Utility | Browse available topics |

## Related

- [Writing Workflows](./writing-workflows): Step-by-step authoring guide
- [Schema Reference](./schema-reference): Full workflow JSON schema
- [Template Expressions](./template-expressions): Data passing between steps
- [Built-in Templates](./built-in-templates): Pre-built workflow examples
