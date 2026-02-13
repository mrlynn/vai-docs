---
title: "vai playground"
description: "Launch the interactive web playground"
sidebar_position: 5
---

# vai playground

Launch a local web-based playground for exploring Voyage AI embeddings, similarity, reranking, and more through an interactive browser UI.

## Synopsis

```bash
vai playground [options]
```

## Description

`vai playground` starts a local HTTP server that serves an interactive web interface with multiple tabs for experimenting with Voyage AI features. The playground connects to the Voyage AI API using your configured API key and provides a visual way to explore embeddings without writing code.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `-p, --port <port>` | Port to serve on | `3333` |
| `--no-open` | Skip auto-opening the browser | — |

## Examples

### Launch the playground

```bash
vai playground
```

### Use a custom port

```bash
vai playground --port 8080
```

### Don't auto-open the browser

```bash
vai playground --no-open
```

## Features

The playground includes 7 interactive tabs:

1. **Embed** — Generate embeddings and inspect vector dimensions
2. **Similarity** — Compare texts and visualize similarity scores
3. **Rerank** — Test reranking with a query and candidate documents
4. **Search** — Vector search against your MongoDB collections
5. **Models** — Browse the model catalog with pricing and specs
6. **Chat** — Conversational RAG interface in the browser
7. **Explain** — Interactive concept explorer

## Tips

- The playground uses your `~/.vai/config.json` settings — make sure your API key is configured with `vai config set api-key`.
- Press `Ctrl+C` to stop the server.
- The playground is for local development only — it binds to localhost and is not designed for production deployment.

## Related Commands

- [`vai demo`](./demo) — Terminal-based interactive walkthrough
- [`vai embed`](../embeddings/embed) — CLI embedding (same functionality)
