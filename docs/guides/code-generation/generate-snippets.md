---
title: Generate Snippets
description: Generate production code for RAG integration
sidebar_position: 1
---

# Generating Code Snippets

`vai generate` creates production-ready code files for integrating Voyage AI embeddings and MongoDB Atlas Vector Search into your application.

## Prerequisites

- Initialize your project: `vai init`
- This ensures generated code uses your actual model, database, and collection settings

## Generate Components

### Voyage AI Client

```bash
vai generate client
```

Creates a client initialization module with your configured API key and model.

### MongoDB Connection

```bash
vai generate connection
```

Creates a connection module with your MongoDB URI and database settings.

### Retrieval Logic

```bash
vai generate retrieval
```

Creates a retrieval module with vector search and optional reranking.

### Ingest Pipeline

```bash
vai generate ingest
```

Creates a document ingestion module with chunking and embedding.

### Search API Endpoint

```bash
vai generate search-api
```

Creates an API endpoint for search.

## Framework Targets

```bash
# Plain Node.js
vai generate retrieval --target vanilla

# Next.js App Router
vai generate search-api --target nextjs

# Python Flask
vai generate retrieval --target python
```

Auto-detection: vai checks for `next.config.js`, `requirements.txt`, etc.

## Preview Without Writing

```bash
vai generate retrieval --dry-run
```

## Further Reading

- [`vai generate`](/docs/commands/project-setup/generate) — Full command reference
- [Scaffold Projects](./scaffold-projects) — Create complete starter projects
