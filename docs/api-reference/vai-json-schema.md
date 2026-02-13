---
title: vai.json Schema
description: Project configuration file reference
sidebar_position: 3
---

# .vai.json Schema

The `.vai.json` file stores project-level configuration. Created by `vai init`, it's read automatically by all vai commands.

## Full Schema

```json
{
  "model": "voyage-4-large",
  "db": "myapp",
  "collection": "knowledge",
  "field": "embedding",
  "inputType": "document",
  "dimensions": 1024,
  "index": "vector_index",
  "chunk": {
    "strategy": "recursive",
    "size": 512,
    "overlap": 50
  },
  "chat": {
    "mode": "pipeline",
    "systemPrompt": "You are a helpful assistant...",
    "maxContextDocs": 5,
    "maxConversationTurns": 20
  }
}
```

## Fields

### Core Settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `model` | string | `voyage-4-large` | Default embedding model |
| `db` | string | `vai` | MongoDB database name |
| `collection` | string | `embeddings` | MongoDB collection name |
| `field` | string | `embedding` | Embedding field name in documents |
| `inputType` | string | `document` | Default input type for embedding |
| `dimensions` | number | `1024` | Output dimensions |
| `index` | string | `vector_index` | Vector search index name |

### Chunk Settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `chunk.strategy` | string | `recursive` | Chunking strategy: `fixed`, `sentence`, `paragraph`, `recursive`, `markdown` |
| `chunk.size` | number | `512` | Target chunk size in characters |
| `chunk.overlap` | number | `50` | Overlap between chunks in characters |

### Chat Settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `chat.mode` | string | `pipeline` | Chat mode: `pipeline` or `agent` |
| `chat.systemPrompt` | string | — | Custom system prompt for chat |
| `chat.maxContextDocs` | number | `5` | Max documents retrieved per turn |
| `chat.maxConversationTurns` | number | `20` | Max turns before truncation |

## Resolution Order

vai resolves settings in this order (first wins):

1. **CLI flags** (`--model`, `--db`, etc.)
2. **`.vai.json`** (project config)
3. **Environment variables** (`VOYAGE_API_KEY`, `MONGODB_URI`, `VAI_DB`, `VAI_COLLECTION`)
4. **`~/.vai/config.json`** (global config)
5. **Built-in defaults**

## File Location

`.vai.json` is searched starting from the current directory upward to the filesystem root. The first one found is used.

```bash
# Create with interactive wizard
vai init

# Create with defaults
vai init --yes

# Show the resolved config
cat .vai.json
```

## Further Reading

- [`vai init`](/docs/commands/project-setup/init) — Create project config
- [`vai config`](/docs/commands/tools-and-learning/config) — Global config management
- [Environment Variables](./environment-variables) — Environment variable reference
