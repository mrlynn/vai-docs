---
title: Developer Documentation
description: Make your engineering docs actually searchable with semantic search powered by voyage-code-3 and MongoDB Atlas Vector Search.
sidebar_position: 1
---

# Make Your Engineering Docs Actually Searchable

**Model:** `voyage-code-3` · Internal docs, API references, and runbooks: semantic search in minutes.

## Problem

Engineering documentation is scattered across Confluence, Notion, GitHub wikis, README files, and Slack threads. When a new engineer needs to set up their local environment or understand the deployment process, they spend hours piecing together information from a dozen sources.

Keyword search makes this worse. One team writes "authentication," another writes "auth," and a third writes "login flow." Searching for any single term misses the others. The information exists — it's just unfindable.

## Solution

`vai pipeline` takes a directory of documents, chunks them intelligently, generates embeddings with Voyage AI's `voyage-code-3` model (optimized for code and technical content), and indexes everything in MongoDB Atlas Vector Search. The result is a semantic search layer over your engineering knowledge that understands what you mean, not just what you typed.

## Sample Documents

We provide 16 sample engineering documents (~40KB total) that represent a realistic internal documentation set:

| Document | Description |
|---|---|
| `architecture-overview` | System architecture and component diagram |
| `api-authentication` | Auth flows and token management |
| `api-endpoints-users` | User API reference |
| `api-endpoints-orders` | Orders API reference |
| `local-dev-setup` | Local development environment setup |
| `deployment-guide` | Deployment procedures and checklists |
| `database-schema` | Schema design and migration notes |
| `monitoring-runbook` | Monitoring, alerting, and escalation |
| `incident-response` | Incident response procedures |
| `onboarding-checklist` | New engineer onboarding |
| `testing-strategy` | Testing approach and tooling |
| `feature-flags` | Feature flag system and usage |
| `error-handling` | Error handling patterns and conventions |
| `caching-strategy` | Caching layers and invalidation |
| `adr-001-event-sourcing` | Architecture Decision Record: event sourcing |
| `adr-002-graphql` | Architecture Decision Record: GraphQL adoption |

[Download sample documents](https://vai.mlynn.org/use-cases/devdocs/sample-docs/sample-docs.zip)

## Walkthrough

### 1. Install vai

```bash
npm install -g voyageai-cli
```

### 2. Configure credentials

You need a [Voyage AI API key](https://dash.voyageai.com/) and a [MongoDB Atlas connection string](https://www.mongodb.com/atlas).

```bash
vai configure
```

### 3. Download and extract sample docs

Download the sample documents and extract them to a `sample-docs/` directory.

### 4. Run the pipeline

```bash
vai pipeline ./sample-docs/ \
  --model voyage-code-3 \
  --db devdocs_demo \
  --collection engineering_knowledge \
  --create-index
```

This processes all 16 documents into **127 chunks**, generates embeddings, stores them in MongoDB Atlas, and creates a vector search index.

### 5. Search your docs

```bash
vai search "How do I set up my local dev environment?" \
  --db devdocs_demo \
  --collection engineering_knowledge
```

### 6. Explore in the playground

```bash
vai playground --db devdocs_demo --collection engineering_knowledge
```

## Example Queries

### "How do I get the development environment running on my laptop?"

| Source | Score |
|---|---|
| `local-dev-setup` | 94% |
| `onboarding-checklist` | 87% |
| `deployment-guide` | 72% |

The search correctly identifies the local dev setup guide as the primary match, surfaces the onboarding checklist (which references environment setup), and includes the deployment guide for additional context.

### "What happens when an API request fails?"

| Source | Score |
|---|---|
| `error-handling` | 93% |
| `api-authentication` | 82% |
| `monitoring-runbook` | 76% |

Even though the query doesn't mention "error handling" by name, the semantic search understands the intent and surfaces the right documents.

## Model Comparison

| Model | Relevance Score | Notes |
|---|---|---|
| **`voyage-code-3`** | **94%** | **Recommended** — trained on code and technical content |
| `voyage-4-large` | 89% | Strong general-purpose alternative |
| `voyage-4-lite` | 82% | Lower cost, lower accuracy |

`voyage-code-3` is the recommended model for engineering documentation because it understands code snippets, technical terminology, and the relationship between concepts like "deployment" and "CI/CD pipeline."

## Scaling to Production

### Source diversity

In practice, your docs live in multiple systems. You can run `vai pipeline` against different directories and merge everything into a single collection, or use separate collections with metadata filtering.

### Keeping docs current

Re-run the pipeline when documents change. For frequently updated docs, consider automating the pipeline as part of your CI/CD process or a cron job.

### Cost at scale

`voyage-code-3` pricing scales with token volume. For most engineering doc sets (hundreds of documents), embedding costs are negligible — typically under $1 for the initial run.

### MCP server integration

Use `vai mcp-server` to expose your indexed documents as a tool for AI coding assistants, enabling them to search your internal docs directly.

### Conversational interface

Once your documents are indexed, use `vai chat` to have a conversation with your engineering knowledge base:

```bash
vai chat --db devdocs_demo --collection engineering_knowledge
```

## Next Steps

- **`vai playground`** — Interactive web UI for exploring your indexed documents
- **`vai chat`** — Conversational interface over your knowledge base
- **[Healthcare & Clinical](./healthcare)** — Clinical knowledge base with `voyage-4-large`
- **[Legal & Compliance](./legal)** — Contract search with `voyage-law-2`
- **[Financial Services](./finance)** — Financial document search with `voyage-finance-2`
