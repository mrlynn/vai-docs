---
title: 5-Minute RAG Pipeline
description: Go from a folder of documents to searchable vector database
sidebar_position: 1
---

import RobotMomentCallout from '@site/src/components/RobotMomentCallout';

# 5-Minute RAG Pipeline

This guide takes you from a folder of documents to a fully searchable vector database with two-stage retrieval. You'll use four vai commands.

<RobotMomentCallout
  pose="thinking"
  eyebrow="Guide moment"
  title="This is where the robot's thinking and search states make the most sense"
  ctaLabel="Compare with quickstart"
  ctaTo="/docs/getting-started/quickstart"
>
  <p>
    The CLI already signals in-progress work during ingestion and retrieval.
    Using that same robot language in the guide helps the docs feel like a
    continuation of the live product experience instead of a separate manual.
  </p>
</RobotMomentCallout>

## Prerequisites

- vai installed (`npm install -g voyageai-cli`)
- MongoDB Atlas cluster ([free tier](https://www.mongodb.com/atlas))
- Python 3.9+ if you want to use local `voyage-4-nano` inference
- Voyage AI API key ([get one free](https://dash.voyageai.com)) if you want API-backed embedding and reranking

:::tip Local-first option
If you want a zero-API-key ingestion path, run `vai nano setup` first and add `--local` to your `vai pipeline` command.
:::

## Step 1: Set Credentials

```bash
export VOYAGE_API_KEY="your-voyage-ai-key"
export MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/"
```

## Step 2: Initialize the Project

```bash
vai init --yes
```

This creates `.vai.json` with defaults: `voyage-4-large` model, recursive chunking at 512 characters with 50-character overlap.

## Step 3: Run the Pipeline

Point vai at a directory of documents:

```bash
vai pipeline ./docs/ --db myapp --collection knowledge --create-index
```

Or use local nano inference for the embedding step:

```bash
vai pipeline ./docs/ --local --db myapp --collection knowledge --create-index
```

This single command:

1. **Reads** all supported files (`.txt`, `.md`, `.html`, `.json`, `.jsonl`, `.pdf`)
2. **Chunks** each file using the recursive strategy
3. **Embeds** chunks in batches with `voyage-4-large`, or locally with `voyage-4-nano` when `--local` is enabled
4. **Stores** vectors in MongoDB Atlas with source metadata
5. **Creates** a vector search index (with `--create-index`)

You'll see a progress bar as documents are processed.

## Step 4: Search with Two-Stage Retrieval

```bash
vai query "How do I configure replica sets?" --db myapp --collection knowledge
```

This performs two-stage retrieval:

1. **Embed** your query with Voyage AI
2. **Vector search** against MongoDB Atlas to find the top candidates
3. **Rerank** candidates with `rerank-2.5` for precision

Results come back ranked by relevance with scores and source metadata.

## Customizing the Pipeline

### Different Chunking Strategy

For markdown-heavy docs, use heading-aware chunking:

```bash
vai pipeline ./docs/ --strategy markdown --chunk-size 1024 --overlap 100
```

### Preview Without API Calls

```bash
vai pipeline ./docs/ --dry-run
```

Shows how many files would be processed, chunk counts, and estimated cost without making any API calls or writing to the database.

### Custom Model

```bash
vai pipeline ./docs/ --model voyage-4-lite
```

Use `voyage-4-lite` for budget-friendly embedding or `voyage-4` for balanced quality/cost.

### Local model path

```bash
vai nano setup
vai pipeline ./docs/ --local --model voyage-4-nano --db myapp --collection knowledge
```

Use this when you want local embedding with no Voyage API key for ingestion.

### Skip Reranking

```bash
vai query "my question" --no-rerank
```

Runs vector search only, skipping the reranking step. Faster but slightly less precise.

### Add Filters

```bash
vai query "performance tuning" --filter '{"category": "guides"}' --top-k 10
```

Pre-filter documents by metadata before vector search.

## Cost Estimation

Before running the pipeline on a large corpus, estimate costs:

```bash
vai estimate --docs 10000 --queries 1000 --months 12
```

This shows cost breakdowns for every Voyage 4 model, including asymmetric strategies (embed with `voyage-4-large`, query with `voyage-4-lite`).

## Next Steps

- **[Chat](/docs/guides/chat/overview)**: Ask questions about your documents conversationally
- **[Workflows](/docs/guides/workflows/overview)**: Build multi-step RAG pipelines
- **[Evaluation](/docs/guides/evaluation/overview)**: Measure retrieval quality
- **[Benchmarking](/docs/guides/benchmarking/overview)**: Compare models on your data
