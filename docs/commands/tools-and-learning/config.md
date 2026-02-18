---
title: "vai config"
description: "Manage persistent configuration"
sidebar_position: 3
---

# vai config

Manage persistent configuration stored in `~/.vai/config.json`. Set API keys, default models, MongoDB connection strings, and LLM provider settings.

## Synopsis

```bash
vai config set <key> [value]
vai config get [key]
vai config delete <key>
vai config path
vai config reset
```

## Description

`vai config` manages global configuration that persists across sessions. Secrets (API keys, MongoDB URIs) are masked in output. Values can be read from stdin for security (avoids shell history).

### Subcommands

| Subcommand | Description |
|------------|-------------|
| `set <key> [value]` | Set a config value (omit value to read from stdin) |
| `get [key]` | Get a value, or all values if no key is specified |
| `delete <key>` | Remove a config value |
| `path` | Show config file path |
| `reset` | Delete all configuration |

### Config Keys

| Key | Description |
|-----|-------------|
| `api-key` | Voyage AI API key |
| `mongodb-uri` | MongoDB Atlas connection string |
| `base-url` | Voyage AI API base URL (override for Atlas AI endpoint) |
| `default-model` | Default embedding model |
| `default-dimensions` | Default output dimensions |
| `default-db` | Default MongoDB database for workflows and commands |
| `default-collection` | Default MongoDB collection for workflows and commands |
| `llm-provider` | LLM provider for chat: `anthropic`, `openai`, `ollama` |
| `llm-api-key` | LLM API key |
| `llm-model` | LLM model name |
| `llm-base-url` | LLM base URL (for Ollama) |
| `show-cost` | Show cost estimates after operations (`true`/`false`) |
| `telemetry` | Enable/disable anonymous usage telemetry (`true`/`false`) |

## Examples

### Set your API key securely

```bash
vai config set api-key --stdin <<< "your-api-key-here"
```

### Set MongoDB URI

```bash
vai config set mongodb-uri "mongodb+srv://user:pass@cluster.mongodb.net"
```

### Set default model

```bash
vai config set default-model voyage-4-lite
```

### Set default database and collection

```bash
vai config set default-db my_knowledge_base
vai config set default-collection documents
```

This removes the need to specify `--db` and `--collection` on every command. Workflows, `vai query`, `vai store`, and other database commands will use these defaults automatically.

### View all config

```bash
vai config get
```

### Show config file location

```bash
vai config path
```

## Tips

- Use `--stdin` or pipe values to avoid secrets appearing in shell history.
- Config values are overridden by environment variables (`VOYAGE_API_KEY`, `MONGODB_URI`) and CLI flags.
- Project-level settings in `.vai.json` take precedence over global config for project-specific values (model, db, collection).

## Related Commands

- [`vai init`](../project-setup/init) — Create project-level `.vai.json` config
- [`vai ping`](./ping) — Test connectivity with your configured credentials
