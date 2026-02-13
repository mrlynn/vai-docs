---
title: Web Playground
description: Interactive browser-based exploration of Voyage AI
sidebar_position: 7
---

# Web Playground

The vai playground is a local web application for exploring Voyage AI features through an interactive browser UI.

## Launch

```bash
vai playground
```

Opens `http://localhost:3333` in your browser with 7 interactive tabs.

## Tabs

### 1. Embed
Enter text and generate embeddings. Inspect vector dimensions, see token counts, and compare models.

### 2. Similarity
Compare two or more texts and see their cosine similarity scores. Useful for developing intuition about how embeddings represent meaning.

### 3. Rerank
Enter a query and candidate documents, then see how reranking re-orders them by relevance.

### 4. Search
Run vector searches against your MongoDB collections. See results with scores and text previews.

### 5. Models
Browse the full Voyage AI model catalog with pricing, dimensions, and benchmark scores.

### 6. Chat
Chat with your knowledge base through a browser interface. Same functionality as `vai chat` but with a visual UI.

### 7. Explain
Browse and read explanations of 30+ embedding and RAG concepts.

## Options

```bash
# Custom port
vai playground --port 8080

# Don't auto-open browser
vai playground --no-open
```

## Prerequisites

- Voyage AI API key configured (`vai config set api-key`)
- MongoDB URI configured (for Search and Chat tabs)

## Tips

- The playground runs entirely locally — no data leaves your machine except API calls to Voyage AI and MongoDB Atlas
- Chat history is in-memory only (not persisted to MongoDB)
- Press `Ctrl+C` to stop the server

## Further Reading

- [`vai playground`](/docs/commands/tools-and-learning/playground) — Command reference
- [`vai demo`](/docs/commands/tools-and-learning/demo) — Terminal-based alternative
