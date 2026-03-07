---
title: Local Inference Overview
description: Understand voyage-4-nano, shared space, and the lightweight Python bridge in vai
sidebar_position: 1
---

import RobotMomentCallout from '@site/src/components/RobotMomentCallout';

# Local Inference Overview

`vai v1.31.0` adds local inference with `voyage-4-nano`, giving you a zero-API-key path into Voyage AI embeddings.

Instead of sending every embedding request to the Voyage AI API, vai can now run `voyage-4-nano` on your machine through a lightweight Python bridge. The CLI stays the same. You install the model once with `vai nano setup`, then use `--local` on the commands that support local embedding.

<RobotMomentCallout
  pose="thinking"
  eyebrow="Local-first"
  title="Local inference is the robot's best fit for thoughtful first-run guidance"
  ctaLabel="Open setup and usage"
  ctaTo="/docs/guides/local-inference/setup-and-usage"
>
  <p>
    This part of the docs now carries the same “thinking” energy as the CLI
    because it is the place where users pause to understand what is happening:
    Python under the hood, shared embedding space across Voyage 4, and a clean
    path from local experiments to hosted scale.
  </p>
</RobotMomentCallout>

## Why This Matters

Before nano, getting started with vai usually meant:

- install the CLI
- configure a Voyage API key
- configure MongoDB Atlas
- start embedding

With nano, the first step can be much simpler:

```bash
npm install -g voyageai-cli
vai nano setup
vai embed "What is vector search?" --local
```

That makes local inference the easiest way to try the product, test a workflow, or teach the Voyage 4 model family without requiring a hosted API credential on day one.

## What the Python Bridge Does

vai is a Node.js CLI. `voyage-4-nano` runs in Python. The Python bridge connects those two pieces without changing the overall CLI experience.

The bridge:

- creates and manages an isolated Python environment
- installs the local inference dependencies
- downloads and caches the `voyage-4-nano` model
- receives embedding requests from vai
- returns embeddings back to the CLI

From the user's point of view, the important detail is simple: local inference is built into the normal `vai` workflow, but it relies on Python under the hood.

## Shared Embedding Space

`voyage-4-nano` shares embedding space with the rest of the Voyage 4 family:

- `voyage-4-large`
- `voyage-4`
- `voyage-4-lite`

That means local-first does not trap you in a separate workflow. You can start with nano, then move to API-backed Voyage 4 models later as your workload grows.

Common patterns:

- prototype locally with `voyage-4-nano`
- move to `voyage-4-lite` for lower-cost hosted scale
- move to `voyage-4-large` for best retrieval quality

## What Local Inference Changes

Local inference changes the embedding step. It does not replace the rest of the system.

Local mode gives you:

- local embeddings with no Voyage API key
- a strong onboarding path for development and experimentation
- compatibility with the broader Voyage 4 family story

You may still want hosted services for:

- Voyage AI reranking
- API-backed production embedding throughput
- MongoDB Atlas storage and vector search
- chat workflows that depend on remote providers

## Core Commands

```bash
# One-time setup
vai nano setup

# Check local readiness
vai nano status

# Smoke test local inference
vai nano test

# Embed locally
vai embed "What is vector search?" --local

# Run the ingestion pipeline with local embedding
vai pipeline ./docs/ --local --db myapp --collection knowledge --create-index
```

## When to Use Nano vs API Models

Use `voyage-4-nano` when:

- you want the fastest path to a working embedding
- you want to avoid API setup at the start
- you are prototyping, teaching, or iterating locally
- you want to understand the Voyage 4 family before moving to hosted scale

Use API-backed Voyage 4 models when:

- you want hosted production throughput
- you want the strongest retrieval quality with `voyage-4-large`
- you need a fully hosted retrieval stack
- your workflow depends on API-only capabilities

## Next Steps

- [Local Inference Setup and Usage](./setup-and-usage)
- [`vai embed`](/docs/commands/embeddings/embed)
- [`vai pipeline`](/docs/commands/rag-pipeline/pipeline)
- [Voyage 4 Family](/docs/models/voyage-4-family)
