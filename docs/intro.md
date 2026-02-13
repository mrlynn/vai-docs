---
title: Welcome to vai
description: The fastest path from documents to semantic search
sidebar_position: 1
slug: /
---

# Welcome to vai

**vai** (voyageai-cli) is a command-line toolkit for building semantic search pipelines with [Voyage AI](https://www.mongodb.com/docs/voyageai/) embeddings and [MongoDB Atlas Vector Search](https://www.mongodb.com/docs/atlas/atlas-vector-search/). It handles the entire RAG workflow: chunking documents, generating embeddings, storing vectors, and querying with two-stage retrieval.

:::note Community Tool
vai is an independent, community-built tool, not an official product of MongoDB, Inc. or Voyage AI.
:::

## Quick Install

```bash
npm install -g voyageai-cli
```

Or run without installing:

```bash
npx voyageai-cli@latest quickstart
```

## What vai Does

vai provides **33 commands** organized around the RAG pipeline:

| Stage | What happens | Commands |
|-------|-------------|----------|
| **Chunk** | Split documents into embedding-sized pieces | `vai chunk`, `vai pipeline` |
| **Embed** | Generate vector embeddings with Voyage AI | `vai embed`, `vai pipeline` |
| **Store** | Save vectors to MongoDB Atlas | `vai store`, `vai ingest`, `vai pipeline` |
| **Search** | Find similar documents via vector search | `vai search`, `vai query` |
| **Rerank** | Re-score results with a cross-encoder | `vai rerank`, `vai query` |

Beyond the core pipeline, vai includes:

- **Chat**: Conversational RAG with Anthropic, OpenAI, or Ollama (`vai chat`)
- **Workflows**: Composable, multi-step RAG pipelines defined as JSON (`vai workflow run`)
- **MCP Server**: 11 tools for AI-powered editors like Claude, Cursor, and VS Code (`vai mcp`)
- **Benchmarking**: Compare models on your own data (`vai benchmark`)
- **Evaluation**: Measure retrieval quality with MRR, nDCG, and Recall (`vai eval`)
- **Code Generation**: Generate production-ready integration code (`vai generate`, `vai scaffold`)
- **30+ Educational Topics**: Learn embeddings, reranking, RAG, and more (`vai explain`)

## Three Ways to Use vai

### CLI

The primary interface. 33 commands for every step of the RAG pipeline.

```bash
vai pipeline ./docs/ --db myapp --collection knowledge --create-index
vai query "How do I configure replica sets?"
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
- **[Quickstart](/docs/getting-started/quickstart)**: Your first search in 2 minutes
- **[5-Minute RAG Pipeline](/docs/guides/five-minute-rag)**: End-to-end tutorial
- **[Command Reference](/docs/commands/overview)**: All 33 commands at a glance
