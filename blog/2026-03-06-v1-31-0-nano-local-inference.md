---
slug: v1-31-0-nano-local-inference
title: "vai v1.31.0: voyage-4-nano local inference"
authors: [mrlynn]
tags: [vai, release, local-inference, voyage-4-nano]
---

import RobotMomentCallout from '@site/src/components/RobotMomentCallout';

`vai v1.31.0` adds `voyage-4-nano` local inference, giving developers a zero-API-key path into Voyage AI embeddings through a lightweight Python bridge built directly into the CLI.

<!-- truncate -->

<RobotMomentCallout
  pose="success"
  eyebrow="Release moment"
  title="The docs, CLI, and launch messaging now land as one story"
  ctaLabel="Go to local inference overview"
  ctaTo="/docs/guides/local-inference/overview"
  variant="wide"
>
  <p>
    This release is where the pixel robot and the product story line up cleanly:
    local-first onboarding, a friendly CLI, and documentation that carries the
    same visual cues for getting started, understanding the bridge, and shipping
    a working retrieval flow.
  </p>
</RobotMomentCallout>

## What shipped

This release makes local inference a first-class part of the `vai` story.

Highlights:

- `voyage-4-nano` local embedding in `vai`
- `vai nano setup` for one-time environment and model setup
- `--local` support on core embedding and pipeline workflows
- documentation updates across installation, models, commands, and guides
- a clearer "start local, scale later" path for the Voyage 4 family

## Why nano matters

Before this release, the first-time `vai` experience usually started with an API key. With `voyage-4-nano`, you can now install the CLI, set up the local model, and generate embeddings immediately on your machine.

```bash
npm install -g voyageai-cli
vai nano setup
vai embed "What is vector search?" --local
```

That makes local inference the shortest path to a working embedding while still keeping the broader Voyage 4 workflow intact.

## The Python bridge

`vai` is a Node.js CLI. `voyage-4-nano` runs in Python. This release connects those two pieces with a lightweight Python bridge that:

- creates the local runtime environment
- installs dependencies
- downloads and caches the model
- serves local embedding requests back to the CLI

This is intentionally user-visible. Local inference is easy to use, but it is not magic. Python is part of the local runtime story, and `vai nano setup` handles that setup for you.

## Shared embedding space

The most important product detail is that `voyage-4-nano` shares embedding space with the rest of the Voyage 4 family:

- `voyage-4-large`
- `voyage-4`
- `voyage-4-lite`

That means local-first is not a dead end. You can prototype locally, then move to API-backed Voyage 4 models later as your needs change.

## Try it

```bash
# One-time setup
vai nano setup

# Check readiness
vai nano status

# Smoke test local inference
vai nano test

# Embed locally
vai embed "What is vector search?" --local

# Run the ingestion pipeline with local embedding
vai pipeline ./docs/ --local --db myapp --collection knowledge --create-index
```

## Updated docs

This release also updates the docs site to make local inference easier to discover and understand:

- [Installation](/docs/getting-started/installation)
- [Local Inference Overview](/docs/guides/local-inference/overview)
- [Local Inference Setup and Usage](/docs/guides/local-inference/setup-and-usage)
- [Voyage 4 Family](/docs/models/voyage-4-family)
- [`vai embed`](/docs/commands/embeddings/embed)
- [`vai pipeline`](/docs/commands/rag-pipeline/pipeline)

## What this changes for users

If you are new to vai, local inference is now the simplest way to get started.

If you already use the API-backed Voyage 4 models, nano gives you a local development path that fits into the same family and the same broader product story.
