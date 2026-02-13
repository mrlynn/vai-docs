---
title: Built-in Templates
description: 5 ready-to-use workflow templates
sidebar_position: 4
---

# Built-in Templates

vai ships with 5 workflow templates covering common RAG patterns. List them with:

```bash
vai workflow list
```

## multi-collection-search

Search multiple collections, merge results, and rerank for best relevance.

**Use case:** Your knowledge is split across collections (e.g., API docs and tutorials). Search both, combine results, and get a single ranked list.

**Steps:** `search_1` + `search_2` (parallel) → `merge` → `rerank_all`

```bash
vai workflow run multi-collection-search \
  --input query="how do embeddings work" \
  --input collection1=api_docs \
  --input collection2=tutorials
```

**Required inputs:** `query`, `collection1`, `collection2`
**Optional inputs:** `limit` (default: 10)

## smart-ingest

Check if a document is novel before ingesting to avoid duplicates.

**Use case:** You're continuously ingesting content and want to skip documents that are too similar to existing ones.

**Steps:** `check_existing` → `similarity_check` (conditional) → `ingest_doc` (conditional)

```bash
vai workflow run smart-ingest \
  --input text="New document content here" \
  --input source="article-123.md"
```

**Required inputs:** `text`, `source`
**Optional inputs:** `threshold` (default: 0.85, similarity above this skips ingestion)

## research-and-summarize

Search a knowledge base, then use an LLM to produce a structured summary.

**Use case:** Answer a question by finding relevant documents and generating a coherent summary with citations.

**Steps:** `research` → `summarize` (generate)

```bash
vai workflow run research-and-summarize \
  --input question="What are the best practices for vector search indexing?"
```

**Required inputs:** `question`
**Optional inputs:** `limit` (default: 10)

:::note
This workflow requires an LLM provider. Set `VAI_LLM_PROVIDER` and `VAI_LLM_API_KEY` environment variables, or configure them in `.vai.json`.
:::

## consistency-check

Compare content about the same topic across two collections using semantic similarity.

**Use case:** Detect inconsistencies between documentation sources (e.g., an internal wiki vs. public docs).

**Steps:** `search_source_a` + `search_source_b` (parallel) → `compare` (conditional)

```bash
vai workflow run consistency-check \
  --input topic="authentication setup" \
  --input collection1=internal_wiki \
  --input collection2=public_docs
```

**Required inputs:** `topic`, `collection1`, `collection2`

## cost-analysis

Compare embedding costs across different Voyage AI models and scenarios.

**Use case:** Plan your embedding budget by comparing model costs at your scale.

**Steps:** `cost_large` + `cost_balanced` + `cost_lite` (all parallel)

```bash
vai workflow run cost-analysis \
  --input docs=50000 \
  --input queries=10000
```

**Required inputs:** `docs`
**Optional inputs:** `queries` (default: 1000), `months` (default: 12)

## Validating Templates

Check that a template is valid before running:

```bash
vai workflow validate multi-collection-search
```

This verifies the schema, checks for circular dependencies, and reports the execution plan.

## Dry Run

Preview what a workflow would do without making API calls:

```bash
vai workflow run multi-collection-search --dry-run \
  --input query="test" \
  --input collection1=a \
  --input collection2=b
```

## Next Steps

- **[Writing Workflows](/docs/guides/workflows/writing-workflows)**: Create your own workflows
- **[Schema Reference](/docs/guides/workflows/schema-reference)**: Complete field reference
