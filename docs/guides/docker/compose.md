---
title: Docker Compose
description: Multi-service setup with playground, MCP server, and Ollama
sidebar_position: 2
---

# Docker Compose

The `docker-compose.yml` in the vai repository defines four services for different use cases. You can run them individually or together.

## Prerequisites

1. [Docker](https://docs.docker.com/get-docker/) and Docker Compose installed
2. A `.env` file with your credentials (see [Configuration](#configuration) below)

## Configuration

Create a `.env` file in the project root:

```bash
# Required
VOYAGE_API_KEY=your-voyage-ai-key

# Required for search, store, pipeline, chat
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/

# Optional: LLM provider for chat
VAI_LLM_PROVIDER=anthropic
VAI_LLM_API_KEY=sk-ant-...
VAI_LLM_MODEL=claude-sonnet-4-20250514

# Optional: MCP server auth
VAI_MCP_SERVER_KEY=your-bearer-token

# Optional: port overrides
PLAYGROUND_PORT=3333
MCP_PORT=3100
```

:::caution
Add `.env` to your `.gitignore`. The `.env` file is already in vai's `.dockerignore` so it won't be baked into the image.
:::

## Services

### vai (CLI)

Run any vai command as a one-shot container:

```bash
docker compose run --rm vai embed "hello world"
docker compose run --rm vai models --json
docker compose run --rm vai pipeline ./docs/ --db myapp --collection knowledge
```

The CLI service mounts the current directory (or `DATA_DIR` from `.env`) to `/data` for file access, and persists vai config in a Docker volume.

### playground

Start the web playground:

```bash
docker compose up playground
```

Opens on [http://localhost:3333](http://localhost:3333) (or `PLAYGROUND_PORT` from `.env`). The service restarts automatically unless stopped.

To run in the background:

```bash
docker compose up playground -d
docker compose logs playground
```

### mcp-server

Start the MCP server with HTTP transport:

```bash
docker compose up mcp-server
```

AI clients connect to `http://localhost:3100/mcp` (or `MCP_PORT` from `.env`). Includes a healthcheck that monitors the `/health` endpoint.

To run in the background:

```bash
docker compose up mcp-server -d
docker compose ps   # check health status
```

### ollama (local LLM)

An optional [Ollama](https://ollama.ai) sidecar for fully local RAG chat with no external LLM API needed. This service uses Docker profiles and only starts when explicitly requested:

```bash
docker compose --profile local up ollama
```

On first start, it pulls the `llama3.1` model (override with `OLLAMA_MODEL` in `.env`). Model files are persisted in the `vai-ollama-models` volume.

## Common Workflows

### Playground + MCP Server

Run both long-running services together:

```bash
docker compose up playground mcp-server -d
```

- Playground: [http://localhost:3333](http://localhost:3333)
- MCP Server: [http://localhost:3100/mcp](http://localhost:3100/mcp)
- MCP Health: [http://localhost:3100/health](http://localhost:3100/health)

### Fully Local RAG Chat

Run the MCP server with a local Ollama instance for AI-powered chat without any external LLM API:

```bash
docker compose --profile local up mcp-server ollama -d
```

Configure vai to use the Ollama sidecar by adding these to your `.env`:

```bash
VAI_LLM_PROVIDER=ollama
VAI_LLM_BASE_URL=http://ollama:11434
VAI_LLM_MODEL=llama3.1
```

The `ollama` hostname resolves automatically within the Docker Compose network.

### Ingest Documents

Mount your documents and run the pipeline:

```bash
# Default: mounts current directory
docker compose run --rm vai pipeline ./my-docs/ --db myapp --collection knowledge

# Override mount point
DATA_DIR=/path/to/docs docker compose run --rm vai pipeline . --db myapp --collection knowledge
```

## Volumes

| Volume | Purpose |
|--------|---------|
| `vai-config` | Persists `~/.vai/config.json` between container runs |
| `vai-ollama-models` | Caches downloaded Ollama models |

To reset vai config:

```bash
docker volume rm vai-config
```

## Stopping Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v
```

## Port Reference

| Service | Internal Port | Default External Port | Override Variable |
|---------|--------------|----------------------|-------------------|
| Playground | 3333 | 3333 | `PLAYGROUND_PORT` |
| MCP Server | 3100 | 3100 | `MCP_PORT` |
| Ollama | 11434 | 11434 | `OLLAMA_PORT` |

## Further Reading

- [Docker Overview](./overview) for single-container usage
- [Wrapper Script](./wrapper-script) for a native-feeling CLI experience
- [Production Deployment](./production) for reverse proxies and orchestration
