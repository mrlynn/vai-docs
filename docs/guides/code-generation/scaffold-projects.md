---
title: Scaffold Projects
description: Create complete starter projects
sidebar_position: 2
---

# Scaffolding Projects

`vai scaffold` creates a complete, runnable starter project with all files needed for a Voyage AI + MongoDB Atlas Vector Search integration.

## Quick Start

```bash
# Node.js project
vai scaffold my-search-app

# Next.js project with search UI
vai scaffold my-search-ui --target nextjs

# Python Flask API
vai scaffold my-api --target python
```

## What Gets Created

### vanilla (Node.js)
- `lib/voyage.js` — Voyage AI client
- `lib/mongodb.js` — MongoDB connection
- `lib/retrieval.js` — Vector search + rerank
- `lib/ingest.js` — Document ingestion
- `lib/search-api.js` — Express search endpoint
- `package.json`, `README.md`, `.env.example`

### nextjs (Next.js)
- `lib/voyage.js`, `lib/mongodb.js` — Client libraries
- `app/api/search/route.js` — Search API route
- `app/api/ingest/route.js` — Ingest API route
- `app/search/page.jsx` — Search page with UI
- `lib/theme.js`, `app/layout.jsx` — MUI theme and layout

### python (Python)
- `voyage_client.py` — Voyage AI client
- `mongo_client.py` — MongoDB connection
- `app.py` — Flask app with search routes
- `chunker.py` — Document chunking
- `requirements.txt`, `README.md`

## Customizing

```bash
vai scaffold my-app --target nextjs \
  --model voyage-4 \
  --db myapp \
  --collection knowledge \
  --dimensions 512
```

## Further Reading

- [`vai scaffold`](/docs/commands/project-setup/scaffold) — Full command reference
- [Generate Snippets](./generate-snippets) — Individual file generation
