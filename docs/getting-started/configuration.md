---
title: Configuration
description: Environment variables, config store, and credential management
sidebar_position: 3
---

# Configuration

vai resolves configuration from multiple sources, in this priority order:

1. **CLI flags** (highest priority)
2. **Environment variables**
3. **`.env` file** in the current directory
4. **`~/.vai/config.json`** (persistent config store)
5. **`.vai.json`** project config (defaults)

## Environment Variables

| Variable | Required For | Description |
|----------|-------------|-------------|
| `VOYAGE_API_KEY` | All embedding/reranking | [API key](https://www.mongodb.com/docs/voyageai/management/api-keys/) from MongoDB Atlas |
| `MONGODB_URI` | store, search, query, pipeline, index | MongoDB Atlas connection string |
| `VAI_DEFAULT_DB` | Optional | Default database name |
| `VAI_DEFAULT_COLLECTION` | Optional | Default collection name |
| `VAI_LLM_PROVIDER` | chat | LLM provider: `anthropic`, `openai`, or `ollama` |
| `VAI_LLM_API_KEY` | chat (cloud) | API key for the LLM provider |
| `VAI_LLM_MODEL` | chat | Model name (e.g., `claude-sonnet-4-20250514`, `gpt-4o`) |
| `VAI_LLM_BASE_URL` | chat (ollama) | Ollama base URL (default: `http://localhost:11434`) |
| `VAI_CHAT_HISTORY` | chat | Enable chat history persistence (`true`/`false`) |
| `VAI_CHAT_HISTORY_DB` | chat | Database for chat history storage |
| `VAI_CHAT_MAX_DOCS` | chat | Max documents to retrieve per query |
| `VAI_CHAT_MAX_TURNS` | chat | Max conversation turns to include as context |
| `VAI_MCP_VERBOSE` | mcp | Enable verbose MCP server logging |
| `VAI_MCP_SERVER_KEY` | mcp (HTTP) | Bearer token for HTTP transport authentication |

## Config Store

The built-in config store persists values across sessions:

```bash
# Set values
vai config set api-key "your-voyage-key"
vai config set mongodb-uri "mongodb+srv://..."

# Read from stdin (avoids key in shell history)
echo "your-key" | vai config set api-key --stdin

# Get a value (secrets are masked)
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

Config is stored at `~/.vai/config.json`. Sensitive values are masked when displayed.

### All Config Keys

| Key | Description | Example |
|-----|-------------|---------|
| `api-key` | Voyage AI API key | `vai config set api-key pa-...` |
| `mongodb-uri` | MongoDB Atlas connection string | `vai config set mongodb-uri "mongodb+srv://..."` |
| `base-url` | Override API endpoint | `vai config set base-url https://ai.mongodb.com/v1` |
| `default-model` | Default embedding model | `vai config set default-model voyage-3` |
| `default-dimensions` | Default output dimensions | `vai config set default-dimensions 512` |
| `default-db` | Default MongoDB database | `vai config set default-db my_knowledge_base` |
| `default-collection` | Default MongoDB collection | `vai config set default-collection documents` |
| `llm-provider` | LLM provider (`anthropic`, `openai`, `ollama`) | `vai config set llm-provider anthropic` |
| `llm-api-key` | LLM provider API key | `vai config set llm-api-key sk-...` |
| `llm-model` | LLM model override | `vai config set llm-model claude-sonnet-4-5-20250929` |
| `llm-base-url` | LLM endpoint override | `vai config set llm-base-url http://localhost:11434` |
| `show-cost` | Show cost estimates after operations | `vai config set show-cost true` |
| `telemetry` | Anonymous usage telemetry | `vai config set telemetry false` |

The `default-db` and `default-collection` keys are particularly useful — set them once and all workflows, `vai query`, `vai store`, and other database commands use them automatically. The desktop app's **Settings → Database** page also reads and writes these values.

## Credential Resolution

When vai needs a credential (like `VOYAGE_API_KEY`), it checks sources in order:

```
CLI flag → Environment variable → .env file → ~/.vai/config.json
```

The first non-empty value wins. This means you can set project-specific credentials in `.env` files and fall back to global credentials in the config store.

## Next Steps

- **[Project Config](/docs/getting-started/project-config)**: The `.vai.json` project file
- **[Environment Variables Reference](/docs/api-reference/environment-variables)**: Complete variable list
