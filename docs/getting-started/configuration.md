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

# Get values (secrets are masked)
vai config get api-key

# List all config
vai config list

# Delete a value
vai config delete api-key

# Show config file path
vai config path

# Reset everything
vai config reset
```

Config is stored at `~/.vai/config.json`. Sensitive values are masked when displayed.

## Credential Resolution

When vai needs a credential (like `VOYAGE_API_KEY`), it checks sources in order:

```
CLI flag → Environment variable → .env file → ~/.vai/config.json
```

The first non-empty value wins. This means you can set project-specific credentials in `.env` files and fall back to global credentials in the config store.

## Next Steps

- **[Project Config](/docs/getting-started/project-config)**: The `.vai.json` project file
- **[Environment Variables Reference](/docs/api-reference/environment-variables)**: Complete variable list
