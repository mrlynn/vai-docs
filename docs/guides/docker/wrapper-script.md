---
title: Wrapper Script
description: Use vai through Docker as if it were installed natively
sidebar_position: 3
---

# Wrapper Script

The `scripts/vai-docker.sh` wrapper makes Docker usage feel like a native install. It handles image building, environment setup, port mapping, and volume mounting automatically.

## Setup

```bash
# Option 1: alias in your shell profile
alias vai="./scripts/vai-docker.sh"

# Option 2: symlink to a directory on your PATH
ln -s "$(pwd)/scripts/vai-docker.sh" /usr/local/bin/vai
```

After either option, you can use `vai` directly:

```bash
vai embed "hello world"
vai models --json
vai playground
```

## How It Works

The wrapper script:

1. **Auto-builds** the Docker image on first run (if `vai:latest` doesn't exist)
2. **Loads credentials** from a `.env` file in the script's directory
3. **Passes through** host environment variables (`VOYAGE_API_KEY`, `MONGODB_URI`, etc.)
4. **Detects the command** and applies the right Docker flags:

| Command | Behavior |
|---------|----------|
| `playground` | Exposes port 3333, runs in foreground |
| `mcp-server` | Exposes port 3100, runs in foreground |
| `pipeline`, `ingest`, `store` | Mounts current directory as `/data:ro` |
| Everything else | Standard container run |

## Examples

### Generate embeddings

```bash
vai embed "What is vector search?" --json
```

### Start the playground

```bash
vai playground
# Starting vai playground on http://localhost:3333
```

### Run an ingestion pipeline

The script mounts your current directory automatically for file commands:

```bash
cd /path/to/my/docs
vai pipeline . --db myapp --collection knowledge
```

### Start the MCP server

```bash
vai mcp-server --transport http
# Starting vai MCP server on http://localhost:3100
```

## Environment Variables

The wrapper checks for these variables in your shell environment and forwards them to the container:

- `VOYAGE_API_KEY`
- `MONGODB_URI`
- `VAI_LLM_PROVIDER`
- `VAI_LLM_API_KEY`
- `VAI_LLM_MODEL`
- `VAI_LLM_BASE_URL`
- `VAI_MCP_SERVER_KEY`

It also reads from a `.env` file if one exists alongside the script.

## Customizing Ports

Override the default ports with environment variables:

```bash
PLAYGROUND_PORT=8080 vai playground    # http://localhost:8080
MCP_PORT=9100 vai mcp-server           # http://localhost:9100
```

## Config Persistence

The wrapper uses a Docker volume (`vai-config`) to persist `~/.vai/config.json` between runs. Configuration set with `vai config set` inside the container carries over to future runs:

```bash
vai config set api-key "your-key"    # persisted in vai-config volume
vai config list                       # shows the saved key
```

## Further Reading

- [Docker Overview](./overview) for direct `docker run` usage
- [Docker Compose](./compose) for multi-service orchestration
