---
title: Project Config
description: The .vai.json project configuration file
sidebar_position: 4
---

# Project Config

The `.vai.json` file stores project-level defaults so you don't need to repeat flags on every command. Create one with:

```bash
vai init
```

This launches an interactive wizard. For a non-interactive setup with sensible defaults:

```bash
vai init --yes
```

## Schema

```json
{
  "model": "voyage-4-large",
  "db": "myapp",
  "collection": "knowledge",
  "field": "embedding",
  "dimensions": 1024,
  "chunk": {
    "strategy": "recursive",
    "size": 512,
    "overlap": 50
  },
  "chat": {
    "provider": "anthropic",
    "model": "claude-sonnet-4-20250514",
    "maxDocs": 5,
    "maxTurns": 10,
    "systemPrompt": "You are a helpful assistant.",
    "history": true
  }
}
```

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `model` | string | `voyage-4-large` | Voyage AI embedding model |
| `db` | string | — | MongoDB database name |
| `collection` | string | — | MongoDB collection name |
| `field` | string | `embedding` | Field name for storing vectors |
| `dimensions` | number | `1024` | Embedding dimensions |
| `chunk.strategy` | string | `recursive` | Chunking strategy: `fixed`, `sentence`, `paragraph`, `recursive`, `markdown` |
| `chunk.size` | number | `512` | Target chunk size in characters |
| `chunk.overlap` | number | `50` | Overlap between adjacent chunks |
| `chat.provider` | string | — | LLM provider: `anthropic`, `openai`, `ollama` |
| `chat.model` | string | — | LLM model name |
| `chat.maxDocs` | number | `5` | Max documents per query |
| `chat.maxTurns` | number | `10` | Max conversation turns as context |
| `chat.systemPrompt` | string | — | System prompt for the LLM |
| `chat.history` | boolean | `true` | Persist chat history to MongoDB |

## Override Precedence

CLI flags always take priority over `.vai.json`:

```bash
# Uses .vai.json defaults
vai query "how does auth work?"

# Overrides model and collection for this command only
vai query "how does auth work?" --model voyage-4 --collection archive
```

## Next Steps

- **[Shell Completions](/docs/getting-started/shell-completions)**: Tab completion for commands and flags
- **[Configuration](/docs/getting-started/configuration)**: Environment variables and config store
