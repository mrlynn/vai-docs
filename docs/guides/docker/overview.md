---
title: Docker Overview
description: Run vai in containers without installing Node.js
sidebar_position: 1
---

# Docker

vai ships with full Docker support, so you can run any vai command without installing Node.js or managing dependencies. The Docker image supports three modes: CLI commands, the web playground, and the MCP server.

## Quick Start

Build the image and run a command:

```bash
docker build -t vai .
docker run --rm -e VOYAGE_API_KEY="your-key" vai embed "hello world"
```

## Three Run Modes

### CLI (one-shot commands)

Run any vai command and exit:

```bash
docker run --rm -e VOYAGE_API_KEY="your-key" vai models
docker run --rm -e VOYAGE_API_KEY="your-key" vai embed "semantic search" --json
docker run --rm -e VOYAGE_API_KEY="your-key" vai explain embeddings
```

### Web Playground

Start the interactive web playground:

```bash
docker run --rm -p 3333:3333 -e VOYAGE_API_KEY="your-key" vai playground --no-open
```

Then open [http://localhost:3333](http://localhost:3333) in your browser.

### MCP Server

Start the MCP server for AI tool integration:

```bash
docker run --rm -p 3100:3100 -e VOYAGE_API_KEY="your-key" vai mcp-server --transport http --host 0.0.0.0 --port 3100
```

AI clients connect to `http://localhost:3100/mcp`.

## Image Details

| Property | Value |
|----------|-------|
| Base image | `node:22-slim` |
| Size | ~180 MB |
| Entrypoint | `vai` |
| Working directory | `/data` |
| Exposed ports | 3333 (playground), 3100 (MCP server) |
| Healthcheck | `vai ping --json` |

The image uses a multi-stage build: the first stage installs vai from npm, and the second stage copies only the installed package into a clean slim runtime.

## Credentials

Pass credentials as environment variables at runtime. Never bake secrets into the image.

| Variable | Required | Description |
|----------|----------|-------------|
| `VOYAGE_API_KEY` | Yes | Voyage AI API key |
| `MONGODB_URI` | For search/store | MongoDB Atlas connection string |
| `VAI_LLM_PROVIDER` | For chat | LLM provider: `anthropic`, `openai`, `ollama` |
| `VAI_LLM_API_KEY` | For chat | LLM provider API key |
| `VAI_LLM_MODEL` | For chat | Model name override |
| `VAI_LLM_BASE_URL` | For Ollama | Ollama API base URL |
| `VAI_MCP_SERVER_KEY` | For MCP auth | Bearer token for HTTP transport |

You can pass these individually with `-e` flags or use an env file:

```bash
# Individual flags
docker run --rm -e VOYAGE_API_KEY="..." -e MONGODB_URI="..." vai search --query "hello" --db mydb --collection docs

# Env file
docker run --rm --env-file .env vai search --query "hello" --db mydb --collection docs
```

## Mounting Local Files

Commands that read files (like `pipeline`, `ingest`, `store`) need access to your local filesystem. Mount your data directory into the container's `/data` path:

```bash
docker run --rm --env-file .env -v "$(pwd):/data:ro" vai pipeline ./docs/ --db myapp --collection knowledge
```

The `:ro` flag mounts read-only, which is recommended for ingestion workloads.

## Pinning a Version

By default, the Dockerfile installs the latest vai release. To pin a specific version:

```bash
docker build -t vai --build-arg VAI_VERSION=1.27.0 .
```

## Next Steps

- [Docker Compose](./compose) for multi-service setups (playground, MCP server, Ollama)
- [Wrapper Script](./wrapper-script) for a native-feeling CLI experience
- [Production Deployment](./production) for reverse proxies, logging, and orchestration
