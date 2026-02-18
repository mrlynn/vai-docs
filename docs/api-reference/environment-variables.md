---
title: Environment Variables
description: Complete reference for vai environment variables and configuration
sidebar_position: 3
---

# Environment Variables

vai reads configuration from multiple sources in this priority order:

1. **CLI flags** (highest priority)
2. **Environment variables**
3. **`.env` file** in the current directory
4. **`~/.vai/config.json`** (persistent config store)
5. **`.vai.json`** project config (defaults)

The first non-empty value wins. This page documents every environment variable vai recognizes.

## Core Credentials

| Variable | Required For | Description |
|----------|-------------|-------------|
| `VOYAGE_API_KEY` | All embedding and reranking operations | Your [Voyage AI API key](https://www.mongodb.com/docs/voyageai/management/api-keys/) from MongoDB Atlas |
| `MONGODB_URI` | store, search, query, pipeline, index, ingest, purge, refresh | MongoDB Atlas connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net`) |

### Setting Credentials

**Environment variables:**

```bash
export VOYAGE_API_KEY="pa-..."
export MONGODB_URI="mongodb+srv://..."
```

**`.env` file** (project-specific):

```bash
VOYAGE_API_KEY=pa-...
MONGODB_URI=mongodb+srv://...
```

**Config store** (persisted globally):

```bash
vai config set api-key "pa-..."
vai config set mongodb-uri "mongodb+srv://..."
```

**Read from stdin** (avoids key in shell history):

```bash
echo "pa-..." | vai config set api-key --stdin
```

## Database Defaults

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VAI_DEFAULT_DB` | No | None | Default database name for all operations |
| `VAI_DEFAULT_COLLECTION` | No | None | Default collection name for all operations |

When set, these values are used whenever `--db` or `--collection` flags are not explicitly provided. They can also be set in `.vai.json`:

```json
{
  "db": "myapp",
  "collection": "knowledge"
}
```

## Chat Configuration

These variables configure `vai chat` and the `generate` step in workflows.

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VAI_LLM_PROVIDER` | For chat | None | LLM provider: `anthropic`, `openai`, or `ollama` |
| `VAI_LLM_API_KEY` | For cloud LLMs | None | API key for the LLM provider (not needed for Ollama) |
| `VAI_LLM_MODEL` | For chat | None | Model name (e.g., `claude-sonnet-4-20250514`, `gpt-4o`, `llama3.2`) |
| `VAI_LLM_BASE_URL` | For Ollama | `http://localhost:11434` | Ollama server base URL |

### Provider Examples

**Anthropic:**

```bash
export VAI_LLM_PROVIDER=anthropic
export VAI_LLM_API_KEY=sk-ant-...
export VAI_LLM_MODEL=claude-sonnet-4-20250514
```

**OpenAI:**

```bash
export VAI_LLM_PROVIDER=openai
export VAI_LLM_API_KEY=sk-...
export VAI_LLM_MODEL=gpt-4o
```

**Ollama (local):**

```bash
export VAI_LLM_PROVIDER=ollama
export VAI_LLM_MODEL=llama3.2
export VAI_LLM_BASE_URL=http://localhost:11434
```

## Chat History

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VAI_CHAT_HISTORY` | No | `false` | Enable chat history persistence (`true` or `false`) |
| `VAI_CHAT_HISTORY_DB` | No | Same as `VAI_DEFAULT_DB` | Database for storing chat history |
| `VAI_CHAT_MAX_DOCS` | No | `5` | Maximum documents to retrieve per query in chat |
| `VAI_CHAT_MAX_TURNS` | No | `10` | Maximum conversation turns to include as context |

## MCP Server

These variables configure `vai mcp` (the MCP server mode).

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VAI_MCP_VERBOSE` | No | `false` | Enable verbose MCP server logging |
| `VAI_MCP_SERVER_KEY` | For HTTP transport | None | Bearer token for HTTP transport authentication |

### MCP Transport Modes

The MCP server supports two transport modes:

**stdio** (default): Used by Claude Desktop, Cursor, and other MCP-compatible editors. No additional configuration needed.

**HTTP with SSE**: Used for remote access or custom integrations. Requires `VAI_MCP_SERVER_KEY` for authentication:

```bash
export VAI_MCP_SERVER_KEY="your-secret-key"
vai mcp --transport http --port 3100
```

## All Variables Summary

| Variable | Category | Config Key Equivalent | Description |
|----------|----------|----------------------|-------------|
| `VOYAGE_API_KEY` | Core | `api-key` | Voyage AI API key |
| `VOYAGE_API_BASE` | Core | `base-url` | API endpoint override |
| `MONGODB_URI` | Core | `mongodb-uri` | MongoDB Atlas connection string |
| `VAI_DEFAULT_DB` | Database | `default-db` | Default database name |
| `VAI_DEFAULT_COLLECTION` | Database | `default-collection` | Default collection name |
| `VAI_LLM_PROVIDER` | Chat | `llm-provider` | LLM provider (anthropic, openai, ollama) |
| `VAI_LLM_API_KEY` | Chat | `llm-api-key` | LLM provider API key |
| `VAI_LLM_MODEL` | Chat | `llm-model` | LLM model name |
| `VAI_LLM_BASE_URL` | Chat | `llm-base-url` | Ollama server URL |
| `VAI_CHAT_HISTORY` | Chat | — | Enable chat history persistence |
| `VAI_CHAT_HISTORY_DB` | Chat | — | Database for chat history |
| `VAI_CHAT_MAX_DOCS` | Chat | — | Max documents per query |
| `VAI_CHAT_MAX_TURNS` | Chat | — | Max conversation turns |
| `VAI_TELEMETRY` | Privacy | `telemetry` | Disable telemetry (`0` or `false`) |
| `VAI_MCP_VERBOSE` | MCP | — | Verbose MCP logging |
| `VAI_MCP_SERVER_KEY` | MCP | — | HTTP transport auth token |

:::note
Variables marked with **—** in the Config Key column are environment-variable-only settings with no `vai config set` equivalent. Chat history and MCP settings are typically set per-environment rather than globally.
:::

## Config Store Commands

The built-in config store persists values at `~/.vai/config.json`:

```bash
# Set values
vai config set api-key "your-voyage-key"
vai config set mongodb-uri "mongodb+srv://..."

# Read from stdin
echo "your-key" | vai config set api-key --stdin

# Get values (secrets are masked)
vai config get api-key

# Get all config values
vai config get

# Delete a value
vai config delete api-key

# Show config file path
vai config path

# Reset everything
vai config reset
```

## Credential Resolution

When vai needs a credential, it checks sources in priority order:

```
CLI flag  →  Environment variable  →  .env file  →  ~/.vai/config.json
```

This means you can:
- Set global credentials in `~/.vai/config.json`
- Override per-project with `.env` files
- Override per-command with CLI flags

## Next Steps

- **[Configuration Guide](/docs/getting-started/configuration)**: Setup walkthrough
- **[Project Config](/docs/getting-started/project-config)**: The `.vai.json` project file
- **[Workflow Schema](/docs/api-reference/workflow-schema)**: Workflow JSON schema reference
