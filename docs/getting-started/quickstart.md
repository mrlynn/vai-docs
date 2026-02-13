---
title: Quickstart
description: Your first semantic search in 2 minutes
sidebar_position: 2
---

# Quickstart

The fastest way to get started is the interactive quickstart:

```bash
vai quickstart
```

This walks you through setting up credentials, embedding your first document, and running a search query. If you prefer to do it manually, follow the steps below.

## Step 1: Set Credentials

```bash
export VOYAGE_API_KEY="your-key"
export MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/"
```

Get a free Voyage AI key at [dash.voyageai.com](https://dash.voyageai.com) and a free MongoDB Atlas cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).

## Step 2: Initialize a Project

```bash
vai init --yes
```

This creates a `.vai.json` file with sensible defaults (model, database, collection, chunking settings). Every command reads this file automatically, so you don't need to repeat flags.

## Step 3: Embed a Document

```bash
vai embed "MongoDB Atlas provides fully managed cloud databases with built-in vector search."
```

You should see the embedding vector printed to the terminal, confirming your API key works.

## Step 4: Store and Search

```bash
# Store a few documents
vai store --text "MongoDB Atlas is a cloud database service" --db demo --collection docs
vai store --text "Vector search finds semantically similar documents" --db demo --collection docs
vai store --text "Embeddings convert text into numerical vectors" --db demo --collection docs

# Create a vector search index
vai index create --db demo --collection docs

# Search
vai search --query "cloud database" --db demo --collection docs
```

## Step 5: Try the Full Pipeline

For a complete RAG experience with chunking and two-stage retrieval:

```bash
# Pipeline a directory of files
vai pipeline ./my-docs/ --db demo --collection knowledge --create-index

# Query with reranking
vai query "How does authentication work?" --db demo --collection knowledge
```

## What's Next

- **[5-Minute RAG Pipeline](/docs/guides/five-minute-rag)**: Expanded tutorial with real documents
- **[Configuration](/docs/getting-started/configuration)**: All environment variables and options
- **[Command Reference](/docs/commands/overview)**: Browse all 33 commands
- **[Chat](/docs/guides/chat/overview)**: Talk to your knowledge base with an LLM
