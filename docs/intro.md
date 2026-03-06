---
title: Welcome to vai
description: The fastest path from documents to semantic search
sidebar_position: 1
slug: /
---

# Welcome to vai

**vai** (voyageai-cli) is a command-line toolkit for building semantic search pipelines with [Voyage AI](https://www.mongodb.com/docs/voyageai/) embeddings and [MongoDB Atlas Vector Search](https://www.mongodb.com/docs/atlas/atlas-vector-search/). It handles the entire RAG workflow: chunking documents, generating embeddings, storing vectors, and querying with two-stage retrieval.

`v1.31.0` introduces `voyage-4-nano` local inference, so you can get started with zero Voyage API keys using a lightweight Python bridge, then scale to API-backed Voyage 4 models later without changing the broader workflow.

:::note Community Tool
vai is an independent, community-built tool, not an official product of MongoDB, Inc. or Voyage AI.
:::

## Quick Install

```bash
npm install -g voyageai-cli
vai nano setup
vai embed "What is vector search?" --local
```

Or start with the API-backed quickstart:

```bash
npx voyageai-cli@latest quickstart
```

## What vai Does

vai provides commands across the full RAG pipeline:

| Stage | What happens | Commands |
|-------|-------------|----------|
| **Chunk** | Split documents into embedding-sized pieces | `vai chunk`, `vai pipeline` |
| **Embed** | Generate vector embeddings locally with nano or via the Voyage AI API | `vai embed`, `vai pipeline`, `vai nano` |
| **Store** | Save vectors to MongoDB Atlas | `vai store`, `vai ingest`, `vai pipeline` |
| **Search** | Find similar documents via vector search | `vai search`, `vai query` |
| **Rerank** | Re-score results with a cross-encoder | `vai rerank`, `vai query` |

Beyond the core pipeline, vai includes:

- **Local Inference**: Run `voyage-4-nano` on your own machine with `vai nano setup` and `--local`
- **Chat**: Conversational RAG with Anthropic, OpenAI, or Ollama (`vai chat`)
- **Workflows**: Composable, multi-step RAG pipelines defined as JSON (`vai workflow run`)
- **MCP Server**: 11 tools for AI-powered editors like Claude, Cursor, and VS Code (`vai mcp`)
- **Benchmarking**: Compare models on your own data (`vai benchmark`)
- **Evaluation**: Measure retrieval quality with MRR, nDCG, and Recall (`vai eval`)
- **Code Generation**: Generate production-ready integration code (`vai generate`, `vai scaffold`)
- **30+ Educational Topics**: Learn embeddings, reranking, RAG, and more (`vai explain`)

## Three Ways to Use vai

### CLI

The primary interface for local and API-backed workflows.

```bash
vai nano setup
vai pipeline ./docs/ --local --db myapp --collection knowledge --create-index
```

### Web Playground

An interactive browser UI with 7 tabs for embedding, comparing, searching, and benchmarking.

```bash
vai playground
```

### Desktop App

A standalone Electron app with secure keychain storage, dark/light themes, and MongoDB LeafyGreen design. [Download from GitHub Releases](https://github.com/mrlynn/voyageai-cli/releases).

## Next Steps

- **[Installation](/docs/getting-started/installation)**: Prerequisites and install options
- **[Local Inference Guide](/docs/guides/local-inference/overview)**: Set up nano and understand the Python bridge
- **[Quickstart](/docs/getting-started/quickstart)**: Your first search in 2 minutes
- **[5-Minute RAG Pipeline](/docs/guides/five-minute-rag)**: End-to-end tutorial
- **[Command Reference](/docs/commands/overview)**: Browse the full CLI surface
