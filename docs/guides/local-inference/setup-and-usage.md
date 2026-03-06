---
title: Local Inference Setup and Usage
description: Set up voyage-4-nano locally and use it from vai commands
sidebar_position: 2
---

# Local Inference Setup and Usage

This guide walks through the practical local inference flow in `vai v1.31.0`.

## Prerequisites

- `vai` installed
- Python `3.9+`
- enough disk space for the model cache and Python environment
- MongoDB Atlas only if you want to store and search embeddings

## Step 1: Install vai

```bash
npm install -g voyageai-cli
```

## Step 2: Run Nano Setup

```bash
vai nano setup
```

This setup flow:

- checks for a compatible Python version
- creates an isolated virtual environment
- installs the local inference dependencies
- downloads and caches `voyage-4-nano`
- runs a smoke test

## Step 3: Check Local Status

```bash
vai nano status
```

This tells you whether Python, dependencies, model cache, and device detection are ready for local inference.

## Step 4: Run a Smoke Test

```bash
vai nano test
```

Use this when you want to confirm that the bridge, model, and embedding path all work before running larger workflows.

## Step 5: Embed Locally

```bash
vai embed "What is vector search?" --local
```

You can also choose dimensions explicitly:

```bash
vai embed "What is vector search?" --local --model voyage-4-nano --dimensions 512
```

And use local precision controls when you want smaller vectors:

```bash
vai embed "What is vector search?" --local --precision int8
```

## Step 6: Run the Pipeline with Local Embedding

```bash
vai pipeline ./docs/ --local --db myapp --collection knowledge --create-index
```

This keeps chunking and MongoDB storage the same, but routes the embedding step through the local nano model.

## Useful Nano Commands

```bash
# Show environment and cache details
vai nano info

# Remove cached model files
vai nano clear-cache
```

Use `clear-cache` when you want to reclaim disk space or force a fresh download of the local model.

## Local Mode and MongoDB

Local inference removes the need for a Voyage API key during embedding, but it does not remove the need for MongoDB Atlas if you want:

- stored embeddings
- vector search
- collection-based retrieval workflows

If you only want to generate embeddings locally, you can do that without MongoDB.

## Local Mode and the Voyage 4 Family

Because `voyage-4-nano` shares embedding space with the rest of the Voyage 4 family, local-first workflows can evolve cleanly:

- embed locally for early experimentation
- keep the same collection structure
- move to API-backed models later when you want hosted scale

## Troubleshooting

### Python not found

Install Python `3.9+`, then run:

```bash
vai nano setup
```

### Setup completed but local inference still fails

Run:

```bash
vai nano status
vai nano test
```

These commands usually tell you whether the problem is Python, dependencies, model cache, or runtime setup.

### I want a full conceptual explanation

Read [Local Inference Overview](./overview) for the product story, shared embedding space explanation, and Python bridge context.

## Related Pages

- [Local Inference Overview](./overview)
- [`vai embed`](/docs/commands/embeddings/embed)
- [`vai pipeline`](/docs/commands/rag-pipeline/pipeline)
- [Installation](/docs/getting-started/installation)
