---
title: "vai generate"
description: "Generate production code snippets"
sidebar_position: 2
---

# vai generate

Generate production-ready code snippets for integrating Voyage AI embeddings and MongoDB Atlas Vector Search into your application.

## Synopsis

```bash
vai generate <component> [options]
```

## Description

`vai generate` creates code files for specific components of a RAG integration. It reads your `.vai.json` project config to populate the generated code with your actual model, database, collection, and field names.

### Components

| Component | Description |
|-----------|-------------|
| `client` | Voyage AI client initialization |
| `connection` | MongoDB connection setup |
| `retrieval` | Vector search retrieval logic |
| `ingest` | Document ingestion pipeline |
| `search-api` | Search API endpoint |

### Targets

| Target | Framework | Output |
|--------|-----------|--------|
| `vanilla` | Plain Node.js | `lib/*.js` files |
| `nextjs` | Next.js (App Router) | Routes, pages, lib files |
| `python` | Python (Flask) | Python modules |

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `<component>` | Component to generate **(required)** | — |
| `-t, --target <target>` | Target framework | Auto-detected or `vanilla` |
| `-o, --output <path>` | Output file path | Default per component |
| `-m, --model <model>` | Override model in generated code | From `.vai.json` |
| `--db <database>` | Override database name | From `.vai.json` |
| `--collection <name>` | Override collection | From `.vai.json` |
| `--field <name>` | Override embedding field | From `.vai.json` |
| `--no-rerank` | Omit reranking from generated code | — |
| `--dry-run` | Show generated code without writing | — |
| `--json` | Output as JSON | — |
| `-q, --quiet` | Suppress non-essential output | — |

## Examples

### Generate a retrieval module

```bash
vai generate retrieval
```

### Generate for Next.js

```bash
vai generate search-api --target nextjs
```

### Generate Python client

```bash
vai generate client --target python
```

### Preview without writing

```bash
vai generate ingest --dry-run
```

## Tips

- Auto-detection checks for `next.config.js`, `requirements.txt`, etc. to pick the right target.
- Run `vai init` first so generated code uses your project's actual settings.
- For complete starter projects (multiple files + package.json), use [`vai scaffold`](./scaffold) instead.

## Related Commands

- [`vai scaffold`](./scaffold) — Create complete starter projects
- [`vai init`](./init) — Initialize project config
