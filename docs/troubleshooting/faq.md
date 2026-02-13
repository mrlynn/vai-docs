---
title: FAQ
description: Frequently asked questions about vai
sidebar_position: 3
---

# Frequently Asked Questions

## General

### Is vai an official MongoDB or Voyage AI product?

No. vai is an independent, community-built tool. It's not affiliated with or endorsed by MongoDB, Inc. or Voyage AI.

### How do I get a Voyage AI API key?

Sign up at [dash.voyageai.com](https://dash.voyageai.com/), then copy your API key and set it:

```bash
vai config set api-key YOUR_KEY
```

### Does vai work without MongoDB?

Yes, partially. Commands like `vai embed`, `vai rerank`, `vai similarity`, `vai models`, `vai explain`, and `vai benchmark` work with just a Voyage AI API key. Storage, search, and chat features require MongoDB Atlas.

### What file types does vai support?

For `vai pipeline` and `vai chunk`: `.txt`, `.md`, `.html`, `.json`, `.jsonl`, `.pdf`

For `vai ingest`: JSON, JSONL, CSV, and plain text files.

## Models

### Which model should I use?

- **Best quality**: `voyage-4-large` ($0.12/1M tokens)
- **Balanced**: `voyage-4` ($0.06/1M tokens)
- **Budget**: `voyage-4-lite` ($0.02/1M tokens)
- **Code**: `voyage-code-3` ($0.18/1M tokens)

See [Choosing a Model](/docs/models/choosing-a-model) for a full guide.

### Can I mix models from different families?

Within the Voyage 4 family (`voyage-4-large`, `voyage-4`, `voyage-4-lite`), yes — they share an embedding space. You **cannot** mix Voyage 4 with domain-specific models (`voyage-code-3`, `voyage-finance-2`) or legacy models (`voyage-3.5`).

### What dimensions should I use?

Start with 1024 (the default). Reduce to 256 or 512 only if storage size or search speed is a bottleneck. Run `vai benchmark space` to see the tradeoffs.

## Cost

### How much does vai cost?

vai itself is free (MIT license). You pay for:
1. **Voyage AI API** — per-token pricing for embeddings and reranking
2. **MongoDB Atlas** — standard Atlas pricing for storage and compute

### How do I estimate costs?

```bash
vai estimate --docs 100K --queries 1M --months 12
```

### What's asymmetric retrieval?

Embedding documents with a cheaper model (`voyage-4-lite`) and queries with a better model (`voyage-4-large`). Works because Voyage 4 models share an embedding space. Saves 60-80% on typical workloads.

## MCP Server

### What AI tools does the MCP server support?

Claude Desktop, Claude Code, Cursor, Windsurf, and VS Code.

### How do I set up MCP?

```bash
vai mcp install all
```

See the [MCP Server Guide](/docs/guides/mcp-server/overview) for details.

## Troubleshooting

### My search returns no results

1. Verify documents are stored: `vai search --query "test" --db mydb --collection mycoll --json`
2. Verify the vector index exists: `vai index list --db mydb --collection mycoll`
3. Verify you're using the same model for search as you used for storage

### Embeddings are different sizes than expected

Check the `--dimensions` flag and model. Voyage 4 defaults to 1024. Domain-specific models may have fixed dimensions.
